import type { ChatMessage } from '../types';

export async function* streamMessage(history: ChatMessage[], message: string): AsyncGenerator<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Send only user and model messages as history
        history: history.filter(m => m.role === 'user' || m.role === 'model'),
        message,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.details || `Network response was not ok: ${response.statusText}`);
    }

    if (!response.body) {
      throw new Error("Response body is empty.");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield decoder.decode(value, { stream: true });
    }
  } catch (e) {
    console.error("Error streaming message:", e);
    const message = e instanceof Error ? e.message : String(e);
    throw new Error(`Failed to get response from the model. Please check your connection. Details: ${message}`);
  }
}