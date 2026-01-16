# C4 Stack

> **The modern, full-stack TypeScript framework that makes T3 Stack look like 2022.**

Build production-ready SaaS applications in minutes, not months. C4 Stack combines the best tools in the React ecosystem with batteries-included integrations for auth, billing, emails, AI, and more.

```bash
npx create-c4-app@latest
```

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)

---

## Why C4 Stack?

### T3 Stack is Great, But...

T3 Stack pioneered type-safe full-stack development. C4 Stack takes it further:

| Feature | T3 Stack | C4 Stack |
|---------|----------|----------|
| **Type Safety** | ✅ tRPC + Prisma | ✅ **Convex (end-to-end reactivity)** |
| **Auth** | NextAuth.js (DIY) | ✅ **WorkOS AuthKit (enterprise-grade)** |
| **Database** | Prisma + Postgres | ✅ **Convex (realtime, functions, files)** |
| **Billing** | ❌ Not included | ✅ **Stripe + Autumn (built-in)** |
| **Emails** | ❌ Not included | ✅ **Resend + React Email** |
| **Background Jobs** | ❌ Not included | ✅ **Inngest (durable workflows)** |
| **AI Integration** | ❌ Not included | ✅ **Vercel AI SDK (streaming)** |
| **Analytics** | ❌ Not included | ✅ **PostHog (product analytics)** |
| **Deployment** | Vercel only | ✅ **Cloudflare + Cloud Run + Vercel** |
| **Real-time** | Manual setup | ✅ **Built-in with Convex** |
| **Monorepo** | Basic | ✅ **Turborepo with shared packages** |

### What Makes C4 "Steroids"?

1. **Zero Boilerplate** - Auth, billing, emails work out of the box
2. **Real-time by Default** - Convex gives you live queries with zero config
3. **Enterprise Ready** - WorkOS, Stripe, and Resend are production-grade from day one
4. **AI Native** - Streaming chat, RAG, embeddings included
5. **Type-Safe Everything** - From database to UI, full type safety
6. **Actually Scales** - Built for Cloudflare edge and serverless

---

## What's Included?

### Core Stack

- **Next.js 15** - React 19, App Router, Server Components, Streaming
- **TypeScript** - Strict mode, path aliases, shared types
- **Tailwind CSS v4** - Latest alpha with improved DX
- **shadcn/ui** - Beautiful, accessible components
- **Turborepo** - Monorepo with caching and parallel execution

### Backend & Database

- **Convex** - Real-time database + serverless functions + file storage
  - Live queries that auto-update
  - Scheduled functions
  - Full-text search
  - Vector embeddings for AI

### Authentication

- **WorkOS AuthKit** - Enterprise SSO, MFA, user management
  - Passwordless auth
  - Social providers (Google, GitHub, etc.)
  - SAML SSO for enterprises
  - Admin portal included

### Billing

- **Stripe** - Subscriptions, one-time payments, invoicing
- **Autumn** - Managed pricing tables and feature gates
  - Usage-based billing
  - Tiered plans
  - Feature flags
  - Customer portal

### Email

- **Resend** - Transactional emails with deliverability
- **React Email** - Type-safe email templates
- **Inngest Integration** - Async email delivery with retries

### Background Jobs

- **Inngest** - Durable workflows with retries and observability
  - Multi-step functions
  - Delays and schedules
  - Error handling
  - Event-driven architecture

### AI & ML

- **Vercel AI SDK** - Streaming AI responses
  - OpenAI GPT-4
  - Anthropic Claude
  - Custom models
  - Streaming UI

### Analytics

- **PostHog** - Product analytics and feature flags
  - Event tracking
  - Session replay
  - A/B testing
  - Funnels and cohorts

### Infrastructure

- **Cloudflare** - Edge deployment and CDN
- **Google Cloud Run** - Container deployment
- **Docker Compose** - Local development

---

## Quick Start

### 1. Create Your App

```bash
npx create-c4-app@latest my-saas
cd my-saas
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Add your API keys:
- [Convex](https://dashboard.convex.dev) - Database
- [WorkOS](https://dashboard.workos.com) - Auth
- [Stripe](https://dashboard.stripe.com) - Billing
- [Resend](https://resend.com) - Email
- [PostHog](https://app.posthog.com) - Analytics
- [Inngest](https://app.inngest.com) - Background jobs

### 3. Install & Run

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and you're running!

**The app works without any API keys configured.** You can explore the codebase, see the UI, and understand the structure immediately. When you're ready to enable features, add your API keys to `.env.local` and restart the dev server.

The home page shows which services are configured with visual indicators (green dot = configured). Protected routes show helpful setup instructions instead of crashing.

Once configured, you'll have:
- ✅ Authentication with WorkOS
- ✅ Real-time database with Convex
- ✅ Billing with Stripe
- ✅ Email sending with Resend
- ✅ AI chat interface
- ✅ Analytics with PostHog

---

## Project Structure

```
my-saas/
├── apps/
│   └── web/                    # Next.js 15 app
│       ├── app/
│       │   ├── (authed)/       # Protected routes
│       │   │   ├── dashboard/
│       │   │   ├── billing/    # Stripe integration
│       │   │   ├── settings/   # User settings + email test
│       │   │   ├── team/       # Team management
│       │   │   └── ai-chat/    # AI chat interface
│       │   └── api/
│       │       ├── ai/chat/    # Streaming AI
│       │       ├── email/send/ # Resend integration
│       │       ├── billing/    # Stripe webhooks
│       │       └── inngest/    # Background jobs
│       └── middleware.ts       # WorkOS auth
├── packages/
│   ├── convex/                 # Database schema & functions
│   ├── inngest/                # Background job definitions
│   ├── email/                  # React Email templates
│   ├── ai/                     # AI providers (OpenAI, Anthropic)
│   ├── ui/                     # shadcn/ui components
│   └── config/                 # Shared configs
└── infrastructure/
    ├── cloudflare/             # Edge deployment
    ├── cloud-run/              # Container deployment
    └── docker-compose.yml      # Local services
```

---

## Example: Build a Feature in 5 Minutes

### Add a "Send Welcome Email" Button

**1. Use the Inngest function (already included):**

```typescript
import { inngest } from "@c4/inngest";

// Trigger async email
await inngest.send({
  name: "email/send",
  data: {
    to: user.email,
    subject: "Welcome to My SaaS!",
    template: "welcome",
    data: { name: user.name }
  }
});
```

**2. Email is sent asynchronously with automatic retries. Done.**

### Add Real-time Chat

**1. Query is already set up:**

```typescript
"use client";
import { useChat } from "ai/react";

export function Chat() {
  const { messages, input, handleSubmit } = useChat({
    api: "/api/ai/chat"
  });

  return (/* UI renders streaming responses */)
}
```

**2. Route at `/api/ai/chat` streams from OpenAI/Anthropic. Done.**

---

## Key Features in Detail

### Real-time Everything

Convex gives you live queries out of the box:

```typescript
// This automatically re-renders when data changes
const messages = useQuery(api.messages.list, { channelId });
```

No WebSocket setup, no polling, no manual cache invalidation.

### Background Jobs That Don't Fail

Inngest handles retries, delays, and error recovery:

```typescript
export const processPayment = inngest.createFunction(
  { id: "process-payment" },
  { event: "payment/received" },
  async ({ event, step }) => {
    // Each step is retried independently
    await step.run("verify", () => verifyPayment(event.data));
    await step.sleep("wait", "1h");
    await step.run("notify", () => sendReceipt(event.data));
  }
);
```

### Enterprise Auth (No DIY Required)

```typescript
// WorkOS handles everything
import { getSession } from "@workos-inc/authkit-nextjs";

const session = await getSession();
// User is authenticated, org memberships loaded
```

- SSO (SAML, OIDC)
- MFA
- Session management
- Admin portal
- User impersonation

### Type-Safe Billing

```typescript
import { autumn } from "autumn";

// Feature gates based on subscription
const canAccessAI = await autumn.checkFeature(userId, "ai_chat");

// Usage-based billing
await autumn.recordUsage(userId, "api_calls", 1);
```

---

## Deployment Options

### Vercel (Recommended)

```bash
vercel deploy
```

### Cloudflare Pages

```bash
pnpm run deploy:cloudflare
```

### Google Cloud Run

```bash
pnpm run deploy:gcloud
```

### Docker

```bash
docker build -t my-saas .
docker run -p 3000:3000 my-saas
```

---

## Customization

### Remove Features You Don't Need

```bash
# Remove AI integration
rm -rf packages/ai apps/web/app/(authed)/ai-chat apps/web/app/api/ai

# Remove Inngest
rm -rf packages/inngest apps/web/app/api/inngest

# Update package.json to remove dependencies
```

### Add Your Own Integrations

```bash
# Add a new package
mkdir packages/my-feature
pnpm add my-lib --filter @c4/my-feature

# Use in web app
import { myUtil } from "@c4/my-feature";
```

---

## Performance

- **Cold Start**: < 300ms (Convex + Edge functions)
- **Time to Interactive**: < 1s (Next.js 15 optimizations)
- **Real-time Updates**: < 100ms (Convex WebSocket)
- **Build Time**: ~30s (Turborepo caching)

---

## Community & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/yazcaleb/c4-template/issues)
- **Discussions**: [Ask questions](https://github.com/yazcaleb/c4-template/discussions)
- **Twitter**: [@c4stack](https://twitter.com/c4stack)

---

## Comparison with Other Stacks

### vs T3 Stack

- ✅ **More batteries included** (billing, email, AI, jobs)
- ✅ **Real-time by default** (Convex vs manual setup)
- ✅ **Enterprise auth** (WorkOS vs NextAuth DIY)
- ✅ **Better DX** (fewer config files, more conventions)

### vs create-next-app

- ✅ **Production-ready integrations** (not just a starter)
- ✅ **Monorepo structure** (shared packages from day one)
- ✅ **Type-safe backend** (Convex vs manual API routes)

### vs Supabase Starter

- ✅ **More flexible** (not locked to Supabase)
- ✅ **Better background jobs** (Inngest vs pg_cron)
- ✅ **Enterprise auth** (WorkOS vs Supabase Auth)

---

## FAQ

**Q: Why not tRPC?**
A: Convex provides end-to-end type safety with real-time subscriptions built-in. It's tRPC + live queries + storage in one package.

**Q: Can I use Postgres instead of Convex?**
A: Yes! Replace the `packages/convex` with Prisma + Postgres. You'll lose real-time queries but gain SQL flexibility.

**Q: Is this production-ready?**
A: Yes. All integrations (WorkOS, Stripe, Convex, Resend) are used by thousands of production apps.

**Q: What about SEO?**
A: Next.js 15 App Router with Server Components gives you excellent SEO out of the box. All pages are server-rendered by default.

**Q: Can I self-host everything?**
A: Most services offer self-hosted options. Use the Docker Compose setup for local dev, and deploy to Cloud Run or your own servers.

---

## License

MIT - Build whatever you want, no attribution required.

---

## Acknowledgments

Built on the shoulders of giants:
- [Next.js](https://nextjs.org) by Vercel
- [Convex](https://convex.dev)
- [WorkOS](https://workos.com)
- [Stripe](https://stripe.com)
- [Inngest](https://inngest.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Vercel AI SDK](https://sdk.vercel.ai)

Inspired by [T3 Stack](https://create.t3.gg) - thank you Theo for pioneering type-safe full-stack development.

---

**Ready to build?**

```bash
npx create-c4-app@latest
```

Let's ship something great. 🚀
