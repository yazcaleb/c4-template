import { getSession } from "@workos-inc/authkit-nextjs";
import { Button } from "@c4/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@c4/ui/components/card";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function BillingPage() {
  // Layout handles auth
  let user = null;

  if (process.env.WORKOS_API_KEY) {
    const { getSession } = await import("@workos-inc/authkit-nextjs");
    const session = await getSession();
    user = session?.user;
  }

  // Mock subscription data - in real app, fetch from Convex/Stripe
  const subscription = {
    plan: "Pro",
    status: "active",
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    amount: 2900,
    interval: "month",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="text-muted-foreground">
          Manage your subscription and billing details
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>
              You are currently on the {subscription.plan} plan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">
                ${(subscription.amount / 100).toFixed(2)}
              </span>
              <span className="text-muted-foreground">
                per {subscription.interval}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="capitalize">{subscription.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Renews on</span>
                <span>
                  {subscription.currentPeriodEnd.toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <form action="/api/billing/create-portal-session" method="POST">
                <Button type="submit" variant="outline" className="w-full">
                  Manage Subscription
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upgrade Plan</CardTitle>
            <CardDescription>
              Get access to more features with our Enterprise plan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">$99.00</span>
                <span className="text-muted-foreground">per month</span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>✓ Unlimited projects</li>
                <li>✓ Priority support</li>
                <li>✓ Advanced analytics</li>
                <li>✓ Custom integrations</li>
              </ul>
            </div>
            <form action="/api/billing/create-checkout-session" method="POST">
              <input type="hidden" name="priceId" value="price_enterprise" />
              <Button type="submit" className="w-full">
                Upgrade to Enterprise
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View your past invoices and payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium">Pro Plan - December 2025</p>
                <p className="text-sm text-muted-foreground">
                  Paid on Dec 1, 2025
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-medium">$29.00</span>
                <Button variant="ghost" size="sm">
                  Download
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="font-medium">Pro Plan - November 2025</p>
                <p className="text-sm text-muted-foreground">
                  Paid on Nov 1, 2025
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-medium">$29.00</span>
                <Button variant="ghost" size="sm">
                  Download
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
