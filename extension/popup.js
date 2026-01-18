// Popup Logic

// Placeholder for the actual deployed function URL
// In development, this might be http://127.0.0.1:5001/...
const API_BASE = "http://localhost:5001/continuum-ai/us-central1";

document.getElementById('save-btn').addEventListener('click', async () => {
    updateStatus("Capturing conversation...", true);

    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        // 1. Capture text from DOM
        const response = await chrome.tabs.sendMessage(tab.id, { action: "capture" });
        if (!response || !response.transcript) {
            throw new Error("Could not capture transcript. Is this a supported chat UI?");
        }

        updateStatus("Extracting context (Gemini)...", true);

        // 2. Send to Backend
        const res = await fetch(`${API_BASE}/extractContext`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chatTranscript: response.transcript })
        });

        if (!res.ok) throw new Error("Backend extraction failed");
        const data = await res.json();

        // 3. Save Context ID to local storage
        await chrome.storage.local.set({ 'lastContextId': data.contextId, 'lastContext': data.context });

        updateStatus("Context Saved! Ready to transfer.", false);
    } catch (err) {
        updateStatus(`Error: ${err.message}`, false);
    }
});

document.getElementById('load-btn').addEventListener('click', async () => {
    updateStatus("Loading context...", true);

    try {
        const { lastContextId, lastContext } = await chrome.storage.local.get(['lastContextId', 'lastContext']);

        if (!lastContextId) {
            throw new Error("No context saved.");
        }

        updateStatus("Reconstructing prompt (Gemini)...", true);

        // 1. Get Reconstructed Prompt
        const res = await fetch(`${API_BASE}/reconstructPrompt`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contextId: lastContextId, contextData: lastContext })
        });

        if (!res.ok) throw new Error("Backend reconstruction failed");
        const data = await res.json();

        // 2. Inject into current tab
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        await chrome.tabs.sendMessage(tab.id, { action: "inject", prompt: data.prompt });

        updateStatus("Context injected! You can send now.", false);
        window.close(); // Close popup on success
    } catch (err) {
        updateStatus(`Error: ${err.message}`, false);
    }
});

function updateStatus(msg, loading) {
    const el = document.getElementById('status');
    el.innerHTML = loading ? `${msg} <span class="loader">⏳</span>` : msg;
}
