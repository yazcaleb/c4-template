import { v } from "convex/values";
import { mutation, query, internalQuery } from "./_generated/server";

// =============================================================================
// QUERIES
// =============================================================================

export const get = query({
  args: { id: v.id("organizations") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("organizations")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const getByStripeCustomer = internalQuery({
  args: { stripeCustomerId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("organizations")
      .withIndex("by_stripe_customer", (q) =>
        q.eq("stripeCustomerId", args.stripeCustomerId)
      )
      .first();
  },
});

// =============================================================================
// MUTATIONS
// =============================================================================

export const create = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
    ownerId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Check slug uniqueness
    const existing = await ctx.db
      .query("organizations")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (existing) {
      throw new Error("Organization slug already exists");
    }

    const now = Date.now();

    // Create org
    const orgId = await ctx.db.insert("organizations", {
      name: args.name,
      slug: args.slug,
      createdAt: now,
      updatedAt: now,
    });

    // Add owner to org
    await ctx.db.patch(args.ownerId, {
      orgId,
      role: "owner",
      updatedAt: now,
    });

    return orgId;
  },
});

export const updateStripeCustomer = mutation({
  args: {
    orgId: v.id("organizations"),
    stripeCustomerId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.orgId, {
      stripeCustomerId: args.stripeCustomerId,
      updatedAt: Date.now(),
    });
  },
});

export const updateSubscription = mutation({
  args: {
    orgId: v.id("organizations"),
    status: v.union(
      v.literal("trialing"),
      v.literal("active"),
      v.literal("past_due"),
      v.literal("canceled"),
      v.literal("unpaid")
    ),
    plan: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.orgId, {
      subscriptionStatus: args.status,
      subscriptionPlan: args.plan,
      updatedAt: Date.now(),
    });
  },
});
