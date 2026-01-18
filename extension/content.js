// ContinuumAI Content Script

console.log("ContinuumAI Content Script Loaded");

// --- Selectors for different LLMs ---
const PLATFORMS = {
    chatgpt: {
        host: "chatgpt.com",
        messageSelector: ".text-message", // Simplified, needs verification
        inputSelector: "#prompt-textarea",
        submitSelector: "button[data-testid='send-button']"
    },
    gemini: {
        host: "gemini.google.com",
        messageSelector: "message-content",
        inputSelector: "div[contenteditable='true']", // Rich text editor
        submitSelector: ".send-button"
    },
    claude: {
        host: "claude.ai",
        messageSelector: ".font-claude-message",
        inputSelector: "div[contenteditable='true']",
        submitSelector: "button[aria-label='Send Message']"
    }
};

function getPlatform() {
    const host = window.location.hostname;
    if (host.includes("chatgpt")) return PLATFORMS.chatgpt;
    if (host.includes("gemini")) return PLATFORMS.gemini;
    if (host.includes("claude")) return PLATFORMS.claude;
    return null;
}

function extractConversation() {
    const platform = getPlatform();
    if (!platform) return null;

    // Generic scraper attempt - dependent on class names which change often
    // For Hackathon, we try to grab visible text or specific containers
    let text = "";

    if (platform === PLATFORMS.chatgpt) {
        document.querySelectorAll('div[data-message-author-role]').forEach(el => {
            text += el.textContent + "\n\n";
        });
    } else if (platform === PLATFORMS.gemini) {
        document.querySelectorAll('message-content').forEach(el => {
            text += el.textContent + "\n\n";
        });
    } else if (platform === PLATFORMS.claude) {
        document.querySelectorAll('.font-claude-message').forEach(el => {
            text += el.textContent + "\n\n";
        });
    }

    // Fallback if specific selectors fail: grab body text (noisy but works)
    if (text.length < 50) {
        text = document.body.innerText.substring(0, 10000); // limit size
    }

    return text;
}

function injectPrompt(promptText) {
    const platform = getPlatform();
    if (!platform) {
        alert("Unsupported platform for injection");
        return;
    }

    const inputEl = document.querySelector(platform.inputSelector);
    if (inputEl) {
        inputEl.focus();
        // For contenteditable div
        if (inputEl.tagName === 'DIV' || inputEl.isContentEditable) {
            inputEl.innerText = promptText;
        } else {
            inputEl.value = promptText;
        }

        // Dispatch input events
        inputEl.dispatchEvent(new Event('input', { bubbles: true }));
        inputEl.dispatchEvent(new Event('change', { bubbles: true }));

        console.log("ContinuumAI: Prompt injected");
    } else {
        console.error("ContinuumAI: Input field not found");
        alert("ContinuumAI: Could not auto-inject. Please paste manualy.");
    }
}

// --- Message Listener ---
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "capture") {
        const transcript = extractConversation();
        sendResponse({ transcript });
    } else if (request.action === "inject") {
        injectPrompt(request.prompt);
        sendResponse({ success: true });
    }
});
