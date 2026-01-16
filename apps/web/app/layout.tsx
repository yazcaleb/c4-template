import type { Metadata } from "next";
import "./styles/globals.css";
import { AuthKitProvider } from "@workos-inc/authkit-nextjs";
import { ConvexClientProvider } from "./lib/convex";
import { PostHogProvider, PostHogPageView } from "./lib/posthog";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "C4 App",
  description: "Production-ready SaaS application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthKitProvider>
      <ConvexClientProvider>
        <PostHogProvider>
          <html lang="en" suppressHydrationWarning>
            <body className="min-h-screen bg-background font-sans antialiased">
              <Suspense fallback={null}>
                <PostHogPageView />
              </Suspense>
              {children}
            </body>
          </html>
        </PostHogProvider>
      </ConvexClientProvider>
    </AuthKitProvider>
  );
}
