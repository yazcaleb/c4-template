"use client";

import { useChat } from "ai/react";
import { Button } from "@c4/ui/components/button";
import { Input } from "@c4/ui/components/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@c4/ui/components/card";

export function ChatInterface() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/ai/chat",
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>AI Chat</CardTitle>
          <CardDescription>
            Powered by the Vercel AI SDK with streaming responses
            {!process.env.NEXT_PUBLIC_AI_ENABLED && (
              <span className="block mt-2 text-yellow-600">
                ⚠️ Configure OPENAI_API_KEY or ANTHROPIC_API_KEY to enable
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col h-[500px]">
            {/* Messages container */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 border rounded-md bg-muted/10">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <p>Start a conversation with the AI assistant</p>
                  <p className="text-sm mt-2">Try asking: "What is the C4 Stack?"</p>
                </div>
              )}
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm font-medium mb-1">
                      {message.role === "user" ? "You" : "AI"}
                    </p>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                    <p className="text-sm font-medium mb-1">AI</p>
                    <p className="text-sm text-muted-foreground">Thinking...</p>
                  </div>
                </div>
              )}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                  <p className="text-sm text-red-800">
                    Error: {error.message}
                  </p>
                </div>
              )}
            </div>

            {/* Input form */}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                {isLoading ? "Sending..." : "Send"}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
