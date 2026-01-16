import { v } from "convex/values";
import { internalMutation } from "./_generated/server";

export const syncUserFromWorkOS = internalMutation({
  args: {
    workosUserId: v.string(),
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    profilePictureUrl: v.optional(v.string()),
    organizationId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    // Find existing user
    const existing = await ctx.db
      .query("users")
      .withIndex("by_external_id", (q) =>
        q.eq("externalId", args.workosUserId)
      )
      .first();

    if (existing) {
      // Update existing user
      await ctx.db.patch(existing._id, {
        email: args.email,
        name:
          args.firstName && args.lastName
            ? `${args.firstName} ${args.lastName}`
            : undefined,
        avatarUrl: args.profilePictureUrl,
        updatedAt: now,
      });
      return existing._id;
    }

    // Create new user
    return await ctx.db.insert("users", {
      externalId: args.workosUserId,
      email: args.email,
      name:
        args.firstName && args.lastName
          ? `${args.firstName} ${args.lastName}`
          : undefined,
      avatarUrl: args.profilePictureUrl,
      createdAt: now,
      updatedAt: now,
    });
  },
});
