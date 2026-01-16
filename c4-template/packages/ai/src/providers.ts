import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";

export const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const defaultChatModel = openai("gpt-4o");
export const defaultFastModel = openai("gpt-4o-mini");
export const defaultClaudeModel = anthropic("claude-sonnet-4-20250514");
