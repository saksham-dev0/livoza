import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  bookNowSubmissions: defineTable({
    roomType: v.string(),
    fullName: v.string(),
    phoneNumber: v.string(),
    emailAddress: v.optional(v.string()),
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

