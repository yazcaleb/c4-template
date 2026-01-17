import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  // If WorkOS is not configured, allow all requests through
  // Protected routes will handle missing auth in their page components
  if (!process.env.WORKOS_API_KEY) {
    return NextResponse.next();
  }

  // Only dynamically import WorkOS when API key is present
  // This prevents the module from loading and throwing during startup
  const { authkitMiddleware } = await import("@workos-inc/authkit-nextjs");
  return authkitMiddleware()(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
