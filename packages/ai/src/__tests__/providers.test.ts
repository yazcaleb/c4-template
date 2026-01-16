import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock environment variables
beforeEach(() => {
  process.env.OPENAI_API_KEY = "test-openai-key";
  process.env.ANTHROPIC_API_KEY = "test-anthropic-key";
});

describe("AI Providers", () => {
  it("should export provider instances", async () => {
    const { openai, anthropic } = await import("../providers");

    expect(openai).toBeDefined();
    expect(anthropic).toBeDefined();
  });

  it("should export model instances", async () => {
    const { defaultChatModel, defaultClaudeModel } = await import("../providers");

    expect(defaultChatModel).toBeDefined();
    expect(defaultClaudeModel).toBeDefined();
  });
});
