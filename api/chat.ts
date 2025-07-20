import { GoogleGenAI, Chat } from "@google/genai";

export const config = {
  runtime: 'edge',
};

const faqContent = `
---
**Question**: What do I do with the assignment?
**Answer**: You are not required to submit the assignment. The assignment is for you to keep and go over it in the future.

**Question**: How do I qualify for an attendance point?
**Answer**: To qualify for an attendance point, you must have spent up to 90 minutes on a call or spend 90 minutes watching the session you missed.

**Question**: When is the in-person event?
**Answer**: That will be communicated by the end of the year.

**Question**: How do I get the program recording?
**Answer**: You can find the recording here: https://community.vitalvoices.org/c/resources-tools-community-hub/

**Question**: How do I find workbooks?
**Answer**: You can find workbooks here: https://community.vitalvoices.org/c/resources-tools-community-hub/

**Question**: How do I find social media banners?
**Answer**: You can find social media banners here: https://community.vitalvoices.org/c/resources-tools-community-hub/
---
`;

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API_KEY environment variable not set' }), { status: 500 });
  }

  try {
    const { history, message } = await req.json();

    const ai = new GoogleGenAI({ apiKey });

    const chat: Chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are a helpful assistant for the Vital Voices (VV) Cohort 9 program. Answer questions based on the following FAQ. If a question is outside the FAQ's scope, politely say you can only answer questions about the provided topics.\n\n${faqContent}`,
        thinkingConfig: { thinkingBudget: 0 }
      },
      history: history || [],
    });

    const result = await chat.sendMessageStream({ message });

    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result) {
          const text = chunk.text;
          controller.enqueue(new TextEncoder().encode(text));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
      },
    });

  } catch (error) {
    console.error('Error in chat handler:', error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return new Response(JSON.stringify({ error: 'Failed to get response from model.', details: errorMessage }), { status: 500 });
  }
}
