import { Button } from "@c4/ui/components/button";
import Link from "next/link";

export default function HomePage() {
  // Check which services are configured
  const servicesStatus = {
    workos: !!process.env.WORKOS_API_KEY,
    convex: !!process.env.NEXT_PUBLIC_CONVEX_URL,
    stripe: !!process.env.STRIPE_SECRET_KEY,
    resend: !!process.env.RESEND_API_KEY,
    openai: !!process.env.OPENAI_API_KEY,
    anthropic: !!process.env.ANTHROPIC_API_KEY,
    inngest: !!process.env.INNGEST_EVENT_KEY,
    posthog: !!process.env.NEXT_PUBLIC_POSTHOG_KEY,
  };

  const configuredCount = Object.values(servicesStatus).filter(Boolean).length;
  const totalServices = Object.keys(servicesStatus).length;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tight">
          Welcome to <span className="text-primary">C4 Stack</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          The modern full-stack TypeScript framework that makes T3 Stack look like 2022.
          Build production-ready SaaS in minutes with batteries-included integrations.
        </p>
      </div>

      {configuredCount === 0 && (
        <div className="max-w-2xl rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-6">
          <h2 className="mb-2 text-lg font-semibold">🚀 Quick Start</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Your app is running! No services are configured yet. To enable features:
          </p>
          <ol className="space-y-2 text-sm">
            <li>1. Copy <code className="rounded bg-muted px-1 py-0.5">.env.example</code> to <code className="rounded bg-muted px-1 py-0.5">.env.local</code></li>
            <li>2. Add your API keys (see README.md for links)</li>
            <li>3. Restart <code className="rounded bg-muted px-1 py-0.5">pnpm dev</code></li>
          </ol>
        </div>
      )}

      {configuredCount > 0 && configuredCount < totalServices && (
        <div className="max-w-2xl rounded-lg border bg-card p-6">
          <h2 className="mb-2 text-lg font-semibold">
            ⚙️ Configuration ({configuredCount}/{totalServices} services)
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Some services are configured. Add more API keys to unlock all features.
          </p>
        </div>
      )}

      <div className="flex gap-4">
        <Button size="lg" asChild>
          <Link href="/dashboard">
            {servicesStatus.workos ? "Go to Dashboard" : "Try Dashboard"}
          </Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <a
            href="https://github.com/yazcaleb/c4-template"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </Button>
      </div>

      <div className="mt-12 w-full max-w-4xl">
        <h2 className="mb-6 text-center text-2xl font-semibold">What's Included?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FeatureCard
            title="Next.js 15"
            description="React 19 + App Router"
            configured={true}
          />
          <FeatureCard
            title="WorkOS"
            description="Enterprise auth + SSO"
            configured={servicesStatus.workos}
          />
          <FeatureCard
            title="Convex"
            description="Real-time database"
            configured={servicesStatus.convex}
          />
          <FeatureCard
            title="Stripe"
            description="Billing + subscriptions"
            configured={servicesStatus.stripe}
          />
          <FeatureCard
            title="Resend"
            description="Transactional emails"
            configured={servicesStatus.resend}
          />
          <FeatureCard
            title="AI SDK"
            description="Streaming AI chat"
            configured={servicesStatus.openai || servicesStatus.anthropic}
          />
          <FeatureCard
            title="Inngest"
            description="Background jobs"
            configured={servicesStatus.inngest}
          />
          <FeatureCard
            title="PostHog"
            description="Product analytics"
            configured={servicesStatus.posthog}
          />
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          Read the{" "}
          <a href="/README.md" className="underline hover:text-foreground">
            README
          </a>
          {" "}for setup instructions and comparison with T3 Stack
        </p>
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  configured,
}: {
  title: string;
  description: string;
  configured: boolean;
}) {
  return (
    <div className={`p-4 rounded-lg border bg-card relative ${configured ? 'border-green-500/50' : 'border-muted'}`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className={`h-2 w-2 rounded-full ${configured ? 'bg-green-500' : 'bg-muted'}`} title={configured ? 'Configured' : 'Not configured'} />
      </div>
    </div>
  );
}
