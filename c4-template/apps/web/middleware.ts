import { authkitMiddleware } from "@workos-inc/authkit-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Only initialize WorkOS middleware if API key is configured
const isWorkOSConfigured = !!process.env.WORKOS_API_KEY;

export default function middleware(request: NextRequest) {
  // If WorkOS is not configured, allow all requests through
  // Protected routes will handle missing auth in their page components
  if (!isWorkOSConfigured) {
    return NextResponse.next();
  }

  // If WorkOS is configured, use the authkit middleware
  return authkitMiddleware()(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
