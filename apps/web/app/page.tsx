import { Button } from "@c4/ui/components/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tight">
          Welcome to <span className="text-primary">C4 Stack</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-md">
          The modern full-stack SaaS scaffold for production applications.
        </p>
      </div>

      <div className="flex gap-4">
        <Button size="lg" asChild>
          <Link href="/dashboard">Get Started</Link>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <a
            href="https://c4stack.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-center">
        <FeatureCard title="Next.js 15" description="Full-stack React" />
        <FeatureCard title="Convex" description="Real-time database" />
        <FeatureCard title="shadcn/ui" description="Beautiful components" />
        <FeatureCard title="Turborepo" description="Monorepo tooling" />
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-4 rounded-lg border bg-card">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
