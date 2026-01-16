export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function DashboardPage() {
  // Layout handles auth, safe to get session here if WorkOS is configured
  let user = null;

  if (process.env.WORKOS_API_KEY) {
    const { getSession } = await import("@workos-inc/authkit-nextjs");
    const session = await getSession();
    user = session?.user;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">
        Welcome back, {user?.firstName || user?.email || "there"}!
      </p>
    </div>
  );
}
