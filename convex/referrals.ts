import { mutation, query } from "./_generated/server";
import { internal } from "./_generated/api";
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
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const id = await ctx.db.insert("referrals", {
      referrerId: identity.subject,
      refereeName: args.refereeName,
      refereePhone: args.refereePhone,
      refereeEmail: args.refereeEmail,
      preferredCity: args.preferredCity,
      createdAt: Date.now(),
    });

    await ctx.scheduler.runAfter(0, internal.sendLeadEmailsNode.sendReferralEmail, {
      referrerName: identity.name ?? identity.email ?? "Unknown",
      referrerEmail: identity.email,
      refereeName: args.refereeName,
      refereePhone: args.refereePhone,
      refereeEmail: args.refereeEmail,
      preferredCity: args.preferredCity,
    });

    return id;
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

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    return await ctx.storage.generateUploadUrl();
  },
});

export const updateReferralUserDetails = mutation({
  args: {
    phone: v.optional(v.string()),
    paymentQrStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("referralUsers")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!existing) throw new Error("Referral user not found");

    const patch: Record<string, unknown> = {};
    if (args.phone !== undefined) patch.phone = args.phone;
    if (args.paymentQrStorageId !== undefined) patch.paymentQrStorageId = args.paymentQrStorageId;

    await ctx.db.patch(existing._id, patch);
  },
});

export const updateReferralStage = mutation({
  args: {
    referralId: v.id("referrals"),
    stage: v.union(v.literal("referred"), v.literal("lead_visited"), v.literal("converted")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.referralId, { stage: args.stage });
  },
});

export const getQrImageUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
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
