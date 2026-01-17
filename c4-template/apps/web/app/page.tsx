import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#0a0a0a] to-[#1a1a2e]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        {/* Logo */}
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
          <span className="text-4xl font-bold bg-gradient-to-br from-violet-400 to-violet-600 bg-clip-text text-transparent">
            C4
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          Create <span className="bg-gradient-to-r from-violet-400 to-violet-600 bg-clip-text text-transparent">C4</span> App
        </h1>

        {/* Tagline */}
        <p className="text-xl text-zinc-400 max-w-2xl text-center">
          The modern TypeScript stack for production SaaS. Auth, billing, emails, AI, and real-time — all wired up.
        </p>

        {/* Install command */}
        <div className="flex items-center gap-2 rounded-xl bg-white/5 px-6 py-4 font-mono text-sm text-zinc-300 border border-white/10 backdrop-blur-sm">
          <span className="text-zinc-500">$</span>
          <code>npx create-c4-app@latest</code>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-4">
          <Link
            href="/dashboard"
            className="rounded-xl bg-violet-600 px-8 py-3 font-semibold text-white transition hover:bg-violet-500"
          >
            Get Started
          </Link>
          <a
            href="https://github.com/yazcaleb/c4-template"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-white/5 px-8 py-3 font-semibold text-white border border-white/10 transition hover:bg-white/10"
          >
            GitHub
          </a>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mt-8">
          <FeatureCard name="Next.js 15" description="React 19 & App Router" />
          <FeatureCard name="WorkOS" description="Enterprise SSO" />
          <FeatureCard name="Convex" description="Real-time Database" />
          <FeatureCard name="Stripe" description="Billing & Payments" />
          <FeatureCard name="Resend" description="Transactional Email" />
          <FeatureCard name="AI SDK" description="Streaming Chat" />
          <FeatureCard name="Inngest" description="Background Jobs" />
          <FeatureCard name="PostHog" description="Analytics" />
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ name, description }: { name: string; description: string }) {
  return (
    <div className="group rounded-xl bg-white/5 p-4 border border-white/10 transition hover:bg-white/10 hover:border-violet-500/50">
      <h3 className="font-semibold text-white">{name}</h3>
      <p className="text-sm text-zinc-500">{description}</p>
    </div>
  );
}
