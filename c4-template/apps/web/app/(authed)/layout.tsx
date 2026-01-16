import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function AuthedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Skip auth during build when no API key is present
  if (!process.env.WORKOS_API_KEY) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/20">
        <div className="max-w-2xl space-y-6 rounded-lg border bg-card p-8 shadow-sm">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">🔐 Authentication Not Configured</h1>
            <p className="text-muted-foreground">
              This page requires authentication with WorkOS AuthKit. To enable it:
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-md bg-muted p-4">
              <p className="mb-2 font-semibold">1. Get your WorkOS API keys</p>
              <p className="text-sm text-muted-foreground">
                Sign up at{" "}
                <a
                  href="https://dashboard.workos.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground"
                >
                  dashboard.workos.com
                </a>
              </p>
            </div>

            <div className="rounded-md bg-muted p-4">
              <p className="mb-2 font-semibold">2. Add to .env.local</p>
              <pre className="mt-2 overflow-x-auto rounded bg-black/80 p-3 text-xs text-white">
                {`WORKOS_API_KEY=sk_test_...
WORKOS_CLIENT_ID=client_...
WORKOS_REDIRECT_URI=http://localhost:3000/api/auth/callback
WORKOS_COOKIE_PASSWORD=$(openssl rand -base64 24)`}
              </pre>
            </div>

            <div className="rounded-md bg-muted p-4">
              <p className="mb-2 font-semibold">3. Restart the dev server</p>
              <pre className="mt-2 overflow-x-auto rounded bg-black/80 p-3 text-xs text-white">
                pnpm dev
              </pre>
            </div>
          </div>

          <div className="border-t pt-6">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> You can explore the codebase without authentication configured.
              Check out the{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">packages/</code> directory
              to see how integrations are set up.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Dynamic import to avoid loading WorkOS at build time
  const { getSession, getSignInUrl } = await import(
    "@workos-inc/authkit-nextjs"
  );

  const session = await getSession();

  if (!session || !session.user) {
    const signInUrl = await getSignInUrl();
    redirect(signInUrl);
  }

  const { user } = session;

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-muted/40 p-4">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            {user.profilePictureUrl && (
              <img
                src={user.profilePictureUrl}
                alt={user.firstName || "User"}
                className="h-10 w-10 rounded-full"
              />
            )}
            <div>
              <p className="font-medium">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          <Link
            href="/dashboard"
            className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
          >
            Dashboard
          </Link>
          <Link
            href="/settings"
            className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
          >
            Settings
          </Link>
          <Link
            href="/billing"
            className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
          >
            Billing
          </Link>
          <Link
            href="/team"
            className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
          >
            Team
          </Link>
        </nav>

        <div className="mt-6 border-t pt-6">
          <form action="/api/auth/signout" method="post">
            <button
              type="submit"
              className="block w-full rounded-md px-3 py-2 text-left text-sm hover:bg-accent"
            >
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
