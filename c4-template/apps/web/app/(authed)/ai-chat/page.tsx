import { ChatInterface } from "./chat-interface";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AIChatPage() {
  // Layout handles auth
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Assistant</h1>
        <p className="text-muted-foreground">
          Chat with an AI assistant powered by OpenAI or Anthropic
        </p>
      </div>

      <ChatInterface />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Example Questions</h3>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• What is the C4 Stack?</li>
            <li>• How do I deploy my application?</li>
            <li>• Explain React Server Components</li>
          </ul>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Features</h3>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Real-time streaming responses</li>
            <li>• Conversation history</li>
            <li>• Multiple AI providers</li>
          </ul>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Configuration</h3>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Set OPENAI_API_KEY or</li>
            <li>• Set ANTHROPIC_API_KEY</li>
            <li>• Configure in .env.local</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
