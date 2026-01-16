import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // ==========================================================================
  // USERS
  // ==========================================================================
  users: defineTable({
    // External auth provider ID (WorkOS, Clerk, etc.)
    externalId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),

    // Organization membership
    orgId: v.optional(v.id("organizations")),
    role: v.optional(
      v.union(
        v.literal("owner"),
        v.literal("admin"),
        v.literal("member")
      )
    ),

    // Onboarding
    onboardingCompleted: v.optional(v.boolean()),

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_external_id", ["externalId"])
    .index("by_email", ["email"])
    .index("by_org", ["orgId"]),

  // ==========================================================================
  // ORGANIZATIONS
  // ==========================================================================
  organizations: defineTable({
    name: v.string(),
    slug: v.string(),

    // External IDs
    externalId: v.optional(v.string()), // WorkOS org ID
    stripeCustomerId: v.optional(v.string()),

    // Subscription
    subscriptionStatus: v.optional(
      v.union(
        v.literal("trialing"),
        v.literal("active"),
        v.literal("past_due"),
        v.literal("canceled"),
        v.literal("unpaid")
      )
    ),
    subscriptionPlan: v.optional(v.string()),

    // Settings
    settings: v.optional(v.object({
      allowedDomains: v.optional(v.array(v.string())),
    })),

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_external_id", ["externalId"])
    .index("by_stripe_customer", ["stripeCustomerId"]),

  // ==========================================================================
  // SUBSCRIPTIONS
  // ==========================================================================
  subscriptions: defineTable({
    orgId: v.id("organizations"),
    stripeSubscriptionId: v.string(),
    stripePriceId: v.string(),
    status: v.string(),
    currentPeriodStart: v.number(),
    currentPeriodEnd: v.number(),
    cancelAtPeriodEnd: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_org", ["orgId"])
    .index("by_stripe_subscription", ["stripeSubscriptionId"]),

  // ==========================================================================
  // API KEYS
  // ==========================================================================
  apiKeys: defineTable({
    orgId: v.id("organizations"),
    name: v.string(),
    keyHash: v.string(),
    keyPrefix: v.string(), // First 8 chars for display
    scopes: v.optional(v.array(v.string())),
    lastUsedAt: v.optional(v.number()),
    expiresAt: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_org", ["orgId"])
    .index("by_key_hash", ["keyHash"]),
});
