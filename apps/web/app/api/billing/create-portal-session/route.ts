import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2025-02-24.acacia",
  });
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe not configured" },
        { status: 500 }
      );
    }

    // In production, get the user's Stripe customer ID from Convex
    // const { user } = await getSession();
    // const customer = await getStripeCustomer(user.id);
    // if (!customer) {
    //   return NextResponse.json({ error: "No customer found" }, { status: 404 });
    // }

    const session = await stripe.billingPortal.sessions.create({
      customer: "cus_placeholder", // Replace with actual customer ID
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.error("Portal session error:", err);
    return NextResponse.json(
      { error: "Failed to create portal session" },
      { status: 500 }
    );
  }
}
