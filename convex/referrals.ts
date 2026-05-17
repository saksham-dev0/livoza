import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const upsertReferralUser = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("referralUsers")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (existing) return existing._id;

    return await ctx.db.insert("referralUsers", {
      clerkId: identity.subject,
      email: identity.email,
      name: identity.name,
      createdAt: Date.now(),
    });
  },
});

export const submitReferral = mutation({
  args: {
    refereeName: v.string(),
    refereePhone: v.string(),
    refereeEmail: v.optional(v.string()),
    preferredCity: v.string(),
    preferredMoveInDate: v.optional(v.string()),
    gender: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    return await ctx.db.insert("referrals", {
      referrerId: identity.subject,
      refereeName: args.refereeName,
      refereePhone: args.refereePhone,
      refereeEmail: args.refereeEmail,
      preferredCity: args.preferredCity,
      preferredMoveInDate: args.preferredMoveInDate,
      gender: args.gender,
      createdAt: Date.now(),
    });
  },
});

export const getMyReferrals = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    return await ctx.db
      .query("referrals")
      .withIndex("by_referrerId", (q) => q.eq("referrerId", identity.subject))
      .collect();
  },
});

export const getAllReferrals = query({
  args: {},
  handler: async (ctx) => {
    const referrals = await ctx.db.query("referrals").order("desc").take(500);

    const withReferrer = await Promise.all(
      referrals.map(async (referral) => {
        const referrer = await ctx.db
          .query("referralUsers")
          .withIndex("by_clerkId", (q) => q.eq("clerkId", referral.referrerId))
          .unique();
        return { ...referral, referrer };
      })
    );

    return withReferrer;
  },
});

export const getReferralUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return await ctx.db
      .query("referralUsers")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();
  },
});
