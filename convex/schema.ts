import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  referralUsers: defineTable({
    clerkId: v.string(),
    email: v.optional(v.string()),
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
    paymentQrStorageId: v.optional(v.id("_storage")),
    createdAt: v.number(),
  }).index("by_clerkId", ["clerkId"]),

  referrals: defineTable({
    referrerId: v.string(),
    refereeName: v.string(),
    refereePhone: v.string(),
    refereeEmail: v.optional(v.string()),
    preferredCity: v.string(),
    createdAt: v.number(),
    stage: v.optional(v.union(v.literal("referred"), v.literal("lead_visited"), v.literal("converted"))),
  }).index("by_referrerId", ["referrerId"]),

  bookNowSubmissions: defineTable({
    roomType: v.string(),
    fullName: v.string(),
    phoneNumber: v.string(),
    emailAddress: v.optional(v.string()),
    pgLocation: v.optional(v.string()),
    createdAt: v.number(),

    // Optional: only populated if a user is authenticated (if auth is configured later).
    submittedByAuthTokenIdentifier: v.optional(v.string()),
  }).index("by_createdAt", ["createdAt"]),

  contactSubmissions: defineTable({
    fullName: v.string(),
    phoneNumber: v.string(),
    emailAddress: v.optional(v.string()),
    message: v.optional(v.string()),
    createdAt: v.number(),

    // Optional: only populated if a user is authenticated (if auth is configured later).
    submittedByAuthTokenIdentifier: v.optional(v.string()),
  }).index("by_createdAt", ["createdAt"]),
});

