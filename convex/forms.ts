import { v } from "convex/values";
import { internal } from "./_generated/api";
import { mutation } from "./_generated/server";

function normalizeOptionalString(input: string | null | undefined) {
  const s = input?.trim();
  return s && s.length > 0 ? s : undefined;
}

export const createBookNowSubmission = mutation({
  args: {
    roomType: v.string(),
    fullName: v.string(),
    phoneNumber: v.string(),
    emailAddress: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const roomType = args.roomType.trim();
    const fullName = args.fullName.trim();
    const phoneNumber = args.phoneNumber.trim();
    const emailAddress = normalizeOptionalString(args.emailAddress);

    if (roomType.length === 0) {
      throw new Error("roomType is required");
    }
    if (fullName.length === 0) {
      throw new Error("fullName is required");
    }
    if (phoneNumber.length === 0) {
      throw new Error("phoneNumber is required");
    }

    // If you later add Convex auth config, this will store the caller identity.
    // Without auth configured, `getUserIdentity()` will resolve to null.
    const identity = await ctx.auth.getUserIdentity();
    const submittedByAuthTokenIdentifier =
      identity?.tokenIdentifier ?? undefined;

    const id = await ctx.db.insert("bookNowSubmissions", {
      roomType,
      fullName,
      phoneNumber,
      emailAddress,
      createdAt: Date.now(),
      submittedByAuthTokenIdentifier,
    });

    // Best-effort email scheduling; submission should still be stored even if email scheduling fails.
    try {
      await ctx.scheduler.runAfter(0, internal.sendLeadEmailsNode.sendBookNowEmail, {
        roomType,
        fullName,
        phoneNumber,
        emailAddress,
      });
    } catch (err) {
      console.error("Failed to schedule BOOK NOW email", err);
    }

    return id;
  },
});

export const createContactSubmission = mutation({
  args: {
    fullName: v.string(),
    phoneNumber: v.string(),
    emailAddress: v.optional(v.string()),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const fullName = args.fullName.trim();
    const phoneNumber = args.phoneNumber.trim();
    const emailAddress = normalizeOptionalString(args.emailAddress);
    const message = normalizeOptionalString(args.message);

    if (fullName.length === 0) {
      throw new Error("fullName is required");
    }
    if (phoneNumber.length === 0) {
      throw new Error("phoneNumber is required");
    }

    const identity = await ctx.auth.getUserIdentity();
    const submittedByAuthTokenIdentifier =
      identity?.tokenIdentifier ?? undefined;

    const id = await ctx.db.insert("contactSubmissions", {
      fullName,
      phoneNumber,
      emailAddress,
      message,
      createdAt: Date.now(),
      submittedByAuthTokenIdentifier,
    });

    try {
      await ctx.scheduler.runAfter(0, internal.sendLeadEmailsNode.sendContactEmail, {
        fullName,
        phoneNumber,
        emailAddress,
        message,
      });
    } catch (err) {
      console.error("Failed to schedule CONTACT email", err);
    }

    return id;
  },
});

