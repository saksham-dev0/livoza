"use client";

import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { useAuth } from "@clerk/nextjs";
import { ReactNode, useEffect, useMemo } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

function UserSync() {
  const { isSignedIn } = useAuth();
  const upsertReferralUser = useMutation(api.referrals.upsertReferralUser);

  useEffect(() => {
    if (isSignedIn) {
      upsertReferralUser().catch(() => {});
    }
  }, [isSignedIn, upsertReferralUser]);

  return null;
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

  const convex = useMemo(() => {
    if (!convexUrl) {
      return null;
    }
    return new ConvexReactClient(convexUrl);
  }, [convexUrl]);

  if (!convex) {
    throw new Error(
      "Missing NEXT_PUBLIC_CONVEX_URL. Set it in your environment (Vercel Project Settings -> Environment Variables).",
    );
  }

  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      <UserSync />
      {children}
    </ConvexProviderWithClerk>
  );
}