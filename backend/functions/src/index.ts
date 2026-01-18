import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from "cors";
import { UniversalContext } from "../../../shared/schema";

admin.initializeApp();
const db = admin.firestore();
const corsHandler = cors({ origin: true });

// NOTE: In a real deployment, use functions.config().gemini.key
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "YOUR_API_KEY_HERE";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// --- Prompts ---

const EXTRACTION_PROMPT = `
You are an expert AI Assistant Context Analyzer.
Your goal is to extract a 'Universal Context' from a chat transcript.
The output MUST be valid JSON adhering to this schema:
{
  "goal": "string",
  "key_points": ["string", "string"],
  "current_state": "string",
  "next_task": "string",
  "response_style": "string"
}

Analyze the conversation below and extract the context.
`;

const RECONSTRUCTION_PROMPT = `
You are an expert AI Prompt Engineer.
Your goal is to create a "Continuation Prompt" for an LLM (like ChatGPT, Claude, or Gemini) based on a structured context.
The prompt should allow the new LLM to seamlessly pick up the conversation where the previous one left off.
Do NOT just paste the JSON. Write a natural language summary that sets the scene for the AI.

Format the output to be directly pasted into the LLM.
Start with: "SYSTEM HANDOFF: Here is the context of the previous conversation..."
`;

// --- Functions ---

export const extractContext = functions.https.onRequest((req, res) => {
    corsHandler(req, res, async () => {
        try {
            if (req.method !== 'POST') {
                res.status(405).send('Method Not Allowed');
                return;
            }

            const { chatTranscript } = req.body;
            if (!chatTranscript) {
                res.status(400).send('Missing chatTranscript');
                return;
            }

            // Call Gemini to extract context
            // For the hackathon/demo without a live key, we might need a fallback.
            // Assuming the user will provide a key or we mock it for specific demo input.

            let universalContext: UniversalContext;

            if (GEMINI_API_KEY === "YOUR_API_KEY_HERE") {
                // MOCK RESPONSE for Demo purposes if no key provided
                universalContext = {
                    goal: "Mocked Goal from Backend",
                    key_points: ["Mocked decision 1", "Mocked constraint 2"],
                    current_state: "Mocked state",
                    next_task: "Mocked next task",
                    response_style: "Mocked style"
                };
            } else {
                const result = await model.generateContent([
                    EXTRACTION_PROMPT,
                    "--- START CONVERSATION ---",
                    chatTranscript,
                    "--- END CONVERSATION ---"
                ]);
                const response = await result.response;
                const text = response.text();
                // Naive JSON clean up
                const jsonStr = text.replace(/```json/g, '').replace(/```/g, '');
                universalContext = JSON.parse(jsonStr);
            }

            // Store in Firestore
            const docRef = await db.collection("contexts").add({
                ...universalContext,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                sourceTranscript: chatTranscript.substring(0, 500) // snippet
            });

            res.status(200).json({ contextId: docRef.id, context: universalContext });
        } catch (error) {
            console.error("Error extracting context:", error);
            res.status(500).json({ error: (error as Error).message });
        }
    });
});

export const reconstructPrompt = functions.https.onRequest((req, res) => {
    corsHandler(req, res, async () => {
        try {
            if (req.method !== 'POST') {
                res.status(405).send('Method Not Allowed');
                return;
            }

            const { contextId, contextData } = req.body;

            let contextToUse = contextData;

            if (contextId) {
                const doc = await db.collection("contexts").doc(contextId).get();
                if (!doc.exists) {
                    res.status(404).send("Context not found");
                    return;
                }
                contextToUse = doc.data() as UniversalContext;
            }

            if (!contextToUse) {
                res.status(400).send("No context provided");
                return;
            }

            let reconstructedPrompt = "";

            if (GEMINI_API_KEY === "YOUR_API_KEY_HERE") {
                reconstructedPrompt = `SYSTEM HANDOFF: The user is working on "${contextToUse.goal}".\nKey decisions: ${contextToUse.key_points.join(", ")}.\nCurrent State: ${contextToUse.current_state}.\nPlease continue assisting with: ${contextToUse.next_task}.`;
            } else {
                const result = await model.generateContent([
                    RECONSTRUCTION_PROMPT,
                    JSON.stringify(contextToUse, null, 2)
                ]);
                const response = await result.response;
                reconstructedPrompt = response.text();
            }

            res.status(200).json({ prompt: reconstructedPrompt });
        } catch (error) {
            console.error("Error reconstructing prompt:", error);
            res.status(500).json({ error: (error as Error).message });
        }
    });
});

export const getContext = functions.https.onRequest((req, res) => {
    corsHandler(req, res, async () => {
        try {
            const { contextId } = req.query;
            if (!contextId) {
                res.status(400).send("Missing contextId");
                return;
            }
            const doc = await db.collection("contexts").doc(String(contextId)).get();
            if (!doc.exists) {
                res.status(404).send("Context not found");
                return;
            }
            res.status(200).json(doc.data());
        } catch (error) {
            res.status(500).send((error as Error).message);
        }
    });
});
