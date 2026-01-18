/**
 * Universal Context Schema
 * This schema defines the structure of data transferred between LLMs.
 * It is designed to be model-agnostic and environment-agnostic.
 */

export interface UniversalContext {
  /**
   * The primary intent or objective of the user.
   * Example: "Build a React component for a date picker"
   */
  goal: string;

  /**
   * Key decisions, constraints, or preferences established so far.
   * Example: ["Use Tailwind CSS", "Must satisfy WCAG 2.1", "No external libraries"]
   */
  key_points: string[];

  /**
   * The current status of the conversation/task.
   * Example: "Basic structure implemented, styling pending"
   */
  current_state: string;

  /**
   * The immediate next step to perform.
   * Example: "Implement the calendar grid logic"
   */
  next_task: string;

  /**
   * Preferred style or persona for the model's response.
   * Example: "Concise, technical, providing code examples"
   */
  response_style: string;

  /**
   * Optional: Metadata for tracking provenance.
   */
  metadata?: {
    source_model?: string; // e.g., "ChatGPT-4"
    source_url?: string;
    timestamp?: string;
  };
}
