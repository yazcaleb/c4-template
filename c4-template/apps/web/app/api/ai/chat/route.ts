import { streamText } from "ai";
import { defaultChatModel } from "@c4/ai/providers";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response("Invalid request: messages must be an array", {
        status: 400,
      });
    }

    // Check if API keys are configured
    if (!process.env.OPENAI_API_KEY && !process.env.ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({
          error: "No AI provider configured. Set OPENAI_API_KEY or ANTHROPIC_API_KEY.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const result = streamText({
      model: defaultChatModel,
      messages,
      system: "You are a helpful AI assistant built with the C4 Stack.",
      maxTokens: 2048,
      temperature: 0.7,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("AI chat error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Failed to process chat",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
