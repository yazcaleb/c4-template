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
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">
          Configure WorkOS to enable authentication
        </p>
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
