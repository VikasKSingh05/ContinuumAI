/**
 * API Service for ContinuumAI Backend
 * Handles communication with Firebase Cloud Functions
 */

// For local development, use Firebase emulator
// For production, this will be the deployed Firebase Functions URL
const API_BASE_URL = import.meta.env.VITE_FIREBASE_FUNCTIONS_URL || 
  'http://127.0.0.1:5001/continuumai/us-central1';

/**
 * Extract context from a chat transcript
 * @param {string} chatTranscript - The conversation text to extract context from
 * @returns {Promise<{contextId: string, context: object}>}
 */
export const extractContext = async (chatTranscript) => {
  try {
    const response = await fetch(`${API_BASE_URL}/extractContext`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatTranscript }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to extract context: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error extracting context:', error);
    throw error;
  }
};

/**
 * Reconstruct a prompt from stored context
 * @param {string|null} contextId - The ID of the stored context (optional)
 * @param {object|null} contextData - The context data object (optional, used if contextId not provided)
 * @returns {Promise<{prompt: string}>}
 */
export const reconstructPrompt = async (contextId = null, contextData = null) => {
  try {
    const body = {};
    if (contextId) {
      body.contextId = contextId;
    } else if (contextData) {
      body.contextData = contextData;
    } else {
      throw new Error('Either contextId or contextData must be provided');
    }

    const response = await fetch(`${API_BASE_URL}/reconstructPrompt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to reconstruct prompt: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error reconstructing prompt:', error);
    throw error;
  }
};

/**
 * Get context by ID
 * @param {string} contextId - The ID of the context to retrieve
 * @returns {Promise<object>}
 */
export const getContext = async (contextId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/getContext?contextId=${encodeURIComponent(contextId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to get context: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting context:', error);
    throw error;
  }
};

/**
 * Convert chat messages array to transcript string
 * @param {Array<{role: string, content: string}>} messages - Array of chat messages
 * @returns {string} - Formatted transcript
 */
export const formatChatTranscript = (messages) => {
  return messages.map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`).join('\n\n');
};
