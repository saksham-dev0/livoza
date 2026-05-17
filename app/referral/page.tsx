"use client";

import { SignIn, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReferralPage() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#021210] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#e3bf5f] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-[#021210] flex flex-col items-center justify-center px-4">
        {/* Background gradient */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#3E6B4F]/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 mb-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#3E6B4F]/20 border border-[#3E6B4F]/40 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e3bf5f] animate-pulse" />
            <span className="text-[#e3bf5f] text-xs font-medium tracking-widest uppercase">Referral Program</span>
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold text-[#EAEAEA] mb-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Refer &amp; Earn
          </h1>
          <p className="text-white/50 text-sm max-w-xs mx-auto">
            Sign in to access your referral dashboard and start earning rewards
          </p>
        </div>

        <div className="relative z-10 w-full max-w-sm">
          <div
            className="rounded-2xl p-1"
            style={{
              background: "linear-gradient(135deg, rgba(62,107,79,0.3) 0%, rgba(227,191,95,0.1) 100%)",
            }}
          >
            <div className="rounded-xl overflow-hidden bg-[#021210]">
              <SignIn
                routing="hash"
                fallbackRedirectUrl="/referral"
                signUpFallbackRedirectUrl="/referral/referee"
                signUpForceRedirectUrl="/referral/referee"
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "bg-[#0a1f14] border border-white/[0.07] shadow-none rounded-xl",
                    headerTitle: "text-[#EAEAEA]",
                    headerSubtitle: "text-white/50",
                    socialButtonsBlockButton: "bg-[#061a12] border border-white/[0.1] text-white hover:bg-[#0d2a1a] transition-colors",
                    socialButtonsBlockButtonText: "text-[#EAEAEA]",
                    dividerLine: "bg-white/[0.08]",
                    dividerText: "text-white/30",
                    formFieldLabel: "text-white/50",
                    formFieldInput: "bg-[#061a12] border border-white/[0.1] text-white placeholder:text-white/20 focus:border-[#3E6B4F] focus:ring-[#3E6B4F]/30 rounded-xl",
                    formButtonPrimary: "bg-[#e3bf5f] text-[#021210] hover:bg-[#f0cf77] rounded-full font-semibold shadow-[0_4px_14px_rgba(227,191,95,0.3)]",
                    footerActionLink: "text-[#e3bf5f] hover:text-[#f0cf77]",
                    identityPreviewText: "text-[#EAEAEA]",
                    identityPreviewEditButton: "text-[#e3bf5f]",
                    formResendCodeLink: "text-[#e3bf5f]",
                    otpCodeFieldInput: "bg-[#061a12] border border-white/[0.1] text-white",
                    alertText: "text-red-400",
                  },
                  variables: {
                    colorBackground: "#0a1f14",
                    colorText: "#EAEAEA",
                    colorTextSecondary: "rgba(255,255,255,0.5)",
                    colorPrimary: "#3E6B4F",
                    colorInputBackground: "#061a12",
                    colorInputText: "#EAEAEA",
                    borderRadius: "0.75rem",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <ReferralDashboard />;
}

function ReferralDashboard() {
  const { user } = useUser();
  const router = useRouter();
  const upsertReferralUser = useMutation(api.referrals.upsertReferralUser);
  const referralUser = useQuery(api.referrals.getReferralUser);
  const myReferrals = useQuery(api.referrals.getMyReferrals);
  const [copied, setCopied] = useState(false);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    upsertReferralUser().then(() => setRegistered(true));
  }, [upsertReferralUser]);

  const referralLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/?ref=${user?.id}`
      : "";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#021210] text-[#EAEAEA]">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#3E6B4F]/8 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-[#3E6B4F]/20 border border-[#3E6B4F]/40 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e3bf5f] animate-pulse" />
            <span className="text-[#e3bf5f] text-xs font-medium tracking-widest uppercase">Referral Program</span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-[#EAEAEA] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Refer &amp; Earn
          </h1>
          <p className="text-white/50 max-w-sm mx-auto text-sm">
            Share Livoza with friends. When they book, you both benefit.
          </p>
        </div>

        {/* Main card */}
        <div className="bg-[#0a1f14] border border-white/[0.07] rounded-3xl p-8 mb-6">
          {/* User info */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-white/[0.06]">
            {user?.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.imageUrl}
                alt={user.fullName ?? ""}
                className="w-12 h-12 rounded-full border border-[#3E6B4F]/50"
              />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[#EAEAEA] truncate">{user?.fullName}</p>
              <p className="text-white/40 text-sm truncate">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
            {registered && referralUser && (
              <span className="text-xs bg-[#3E6B4F]/20 text-[#7A9B7E] border border-[#3E6B4F]/30 px-3 py-1 rounded-full shrink-0">
                Referrer
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-[#061a12] rounded-2xl p-5 border border-white/[0.06] text-center">
              <p className="text-3xl font-bold text-[#e3bf5f] mb-1">
                {myReferrals?.length ?? 0}
              </p>
              <p className="text-white/40 text-xs uppercase tracking-wider">Referrals Made</p>
            </div>
            <div className="bg-[#061a12] rounded-2xl p-5 border border-white/[0.06] text-center">
              <p className="text-3xl font-bold text-[#e3bf5f] mb-1">₹0</p>
              <p className="text-white/40 text-xs uppercase tracking-wider">Rewards Earned</p>
            </div>
          </div>

          {/* Referral link */}
          <div className="mb-6">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Your Referral Link</p>
            <div className="flex gap-2">
              <div className="flex-1 bg-[#061a12] border border-white/[0.08] rounded-xl px-4 py-3 text-white/40 text-sm truncate">
                {referralLink || "Loading..."}
              </div>
              <button
                onClick={handleCopy}
                className="px-4 py-3 rounded-xl text-sm font-medium transition-all shrink-0"
                style={{
                  background: copied ? "rgba(62,107,79,0.3)" : "rgba(227,191,95,0.15)",
                  border: copied ? "1px solid rgba(62,107,79,0.5)" : "1px solid rgba(227,191,95,0.3)",
                  color: copied ? "#7A9B7E" : "#e3bf5f",
                }}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <button
            onClick={() => router.push("/referral/referee")}
            className="w-full py-3.5 rounded-full font-semibold text-sm transition-all shadow-[0_4px_14px_rgba(227,191,95,0.25)] hover:shadow-[0_4px_20px_rgba(227,191,95,0.4)]"
            style={{
              background: "linear-gradient(135deg, #e3bf5f, #c9a73e)",
              color: "#021210",
            }}
          >
            Refer Someone
          </button>
        </div>

        {/* Referrals list */}
        {myReferrals && myReferrals.length > 0 && (
          <div className="mb-6">
            <h2 className="text-white/60 text-xs uppercase tracking-wider mb-4 px-1">Your Referrals</h2>
            <div className="space-y-2">
              {myReferrals.map((r) => (
                <div
                  key={r._id}
                  className="bg-[#0a1f14] border border-white/[0.07] rounded-2xl p-4 flex items-center gap-4 hover:border-white/[0.12] transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-[#3E6B4F]/20 border border-[#3E6B4F]/30 flex items-center justify-center shrink-0">
                    <span className="text-[#e3bf5f] text-sm font-bold">
                      {r.refereeName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#EAEAEA] text-sm font-medium truncate">{r.refereeName}</p>
                    <p className="text-white/30 text-xs">{r.refereePhone}</p>
                  </div>
                  <div className="text-right shrink-0">
                    {r.preferredCity && (
                      <p className="text-[#7A9B7E] text-xs font-medium bg-[#3E6B4F]/15 border border-[#3E6B4F]/20 px-2.5 py-1 rounded-full">{r.preferredCity}</p>
                    )}
                    {r.preferredMoveInDate && (
                      <p className="text-white/25 text-xs mt-1">{r.preferredMoveInDate}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* How it works */}
        <div className="bg-[#0a1f14] border border-white/[0.07] rounded-3xl p-8">
          <h2 className="text-white/60 text-xs uppercase tracking-wider mb-6 text-center">
            How it works
          </h2>
          <div className="space-y-5">
            {[
              ["01", "Share your referral link with friends looking for a PG"],
              ["02", "They visit Livoza and book a room"],
              ["03", "You earn rewards once they check in"],
            ].map(([num, text]) => (
              <div key={num} className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full border border-[#3E6B4F]/50 bg-[#3E6B4F]/10 flex items-center justify-center text-[#e3bf5f] text-xs font-bold shrink-0 mt-0.5">
                  {num}
                </span>
                <p className="text-white/50 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
