"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useMemo } from "react";

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

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}