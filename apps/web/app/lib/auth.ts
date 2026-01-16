import {
  getSession,
  getSignInUrl,
  getSignUpUrl,
  signOut,
} from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";

export { getSession, getSignInUrl, getSignUpUrl, signOut };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function requireAuth(returnPath?: string): Promise<any> {
  const session = await getSession();

  if (!session || !session.user) {
    const signInUrl = await getSignInUrl();
    redirect(signInUrl);
  }

  return session.user!;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function requireOrg(returnPath?: string): Promise<any> {
  const session = await getSession();

  if (!session || !session.user) {
    const signInUrl = await getSignInUrl();
    redirect(signInUrl);
  }

  // TODO: Add organization support when WorkOS AuthKit Next.js supports getUserOrganization
  // For now, return user only
  return { user: session.user!, org: null as null };
}
