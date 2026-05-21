"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import ReferralLanding from "./ReferralLanding";

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
    return <ReferralLanding />;
  }

  return <ReferralDashboard />;
}


const AV_GRADIENTS = [
  "linear-gradient(135deg,#5d8b87,#154f4c)",
  "linear-gradient(135deg,#b8744a,#7a3e1f)",
  "linear-gradient(135deg,#2e8b6a,#154f4c)",
  "linear-gradient(135deg,#a8b48a,#5d8b87)",
  "linear-gradient(135deg,#d9a06b,#b8744a)",
  "linear-gradient(135deg,#7a8c8a,#1d3936)",
  "linear-gradient(135deg,#1a5e5a,#0e3a37)",
];

function ReferralDashboard() {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const upsertReferralUser = useMutation(api.referrals.upsertReferralUser);
  const myReferrals = useQuery(api.referrals.getMyReferrals);
  const referralUser = useQuery(api.referrals.getReferralUser);
  const updateDetails = useMutation(api.referrals.updateReferralUserDetails);
  const generateUploadUrl = useMutation(api.referrals.generateUploadUrl);
  const [copied, setCopied] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isMobile, setIsMobile] = useState(false);
  const [phoneInput, setPhoneInput] = useState("");
  const [qrFile, setQrFile] = useState<File | null>(null);
  const [qrPreview, setQrPreview] = useState<string | null>(null);
  const [detailsSaving, setDetailsSaving] = useState(false);
  const [detailsSaved, setDetailsSaved] = useState(false);

  useEffect(() => {
    upsertReferralUser();
  }, [upsertReferralUser]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 820);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (referralUser?.phone) setPhoneInput(referralUser.phone);
  }, [referralUser?.phone]);

  const qrStorageId = referralUser?.paymentQrStorageId ?? null;
  const qrImageUrl = useQuery(
    api.referrals.getQrImageUrl,
    qrStorageId ? { storageId: qrStorageId } : "skip"
  );

  const handleSaveDetails = async () => {
    setDetailsSaving(true);
    try {
      let storageId = referralUser?.paymentQrStorageId;
      if (qrFile) {
        const uploadUrl = await generateUploadUrl();
        const res = await fetch(uploadUrl, { method: "POST", body: qrFile, headers: { "Content-Type": qrFile.type } });
        const { storageId: newId } = await res.json();
        storageId = newId;
      }
      await updateDetails({ phone: phoneInput || undefined, paymentQrStorageId: storageId });
      setDetailsSaved(true);
      setTimeout(() => setDetailsSaved(false), 2000);
    } finally {
      setDetailsSaving(false);
    }
  };

  const firstName = user?.firstName ?? user?.fullName?.split(" ")[0] ?? "you";
  const userSlug = user?.username ?? user?.id?.slice(-8) ?? "your-link";
  const referralLink = typeof window !== "undefined"
    ? `${window.location.origin}/?ref=${user?.id}`
    : `livoza.com/r/${userSlug}`;

  const handleCopy = () => {
    try { navigator.clipboard.writeText(referralLink); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const total = myReferrals?.length ?? 0;
  const potentialPayout = total * 3000;

  const shell: React.CSSProperties = {
    maxWidth: 1440, margin: "0 auto",
    background: "linear-gradient(180deg, #f1ece2 0%, #e7e1d2 60%, #dee8e6 100%)",
    minHeight: "100vh",
    fontFamily: "'Geist', ui-sans-serif, system-ui, sans-serif",
    WebkitFontSmoothing: "antialiased",
    color: "#154f4c",
    overflowX: "hidden",
  };

  return (
    <div style={shell}>
      {/* Nav */}
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "16px 18px" : "22px 40px", gap: isMobile ? 10 : 24 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img src="/Livoza-Logo-new.png" alt="Livoza" style={{ height: 38, width: "auto", display: "block" }} />
        </Link>
        <nav style={{ display: isMobile ? "none" : "flex", gap: 28, fontSize: 14.5, color: "#1d3936" }}>
          <Link href="/referral" style={{ opacity: 1, fontWeight: 600, textDecoration: "none", color: "#154f4c", display: "flex", alignItems: "center", gap: 6 }}>
            Refer
            <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 99, background: "#dee8e6", color: "#154f4c", fontWeight: 600 }}>₹3,000/booking</span>
          </Link>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: isMobile ? "4px 8px 4px 4px" : "4px 14px 4px 4px", background: "#fff", border: "1px solid #154f4c1f", borderRadius: 99, fontSize: 13.5, fontWeight: 500, minWidth: 0, maxWidth: isMobile ? 120 : 220 }}>
            <span style={{ width: 26, height: 26, borderRadius: 99, background: "linear-gradient(135deg,#5d8b87,#154f4c)", color: "#fff", fontFamily: "'Instrument Serif', serif", fontStyle: "italic", display: "grid", placeItems: "center", fontSize: 14, flexShrink: 0 }}>
              {firstName.charAt(0).toLowerCase()}
            </span>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{firstName}</span>
          </span>
          <button
            onClick={() => signOut({ redirectUrl: "/" })}
            title="Sign out"
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: 99, background: "#fff", border: "1px solid #154f4c1f", cursor: "pointer", color: "#6a7a78", flexShrink: 0 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
          </button>
        </div>
      </header>

      {/* Page */}
      <section style={{ padding: isMobile ? "10px 18px 118px" : "8px 40px 80px" }}>
        {/* Page head */}
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "stretch" : "flex-end", gap: isMobile ? 20 : 24, margin: isMobile ? "12px 0 20px" : "14px 0 22px" }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6a7a78", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              <Link href="/referral" style={{ color: "inherit", textDecoration: "none" }}>Refer</Link>
              <span style={{ opacity: 0.35, margin: "0 6px" }}>/</span>
              <span style={{ color: "#154f4c" }}>Dashboard</span>
            </div>
            <h1 style={{ margin: "12px 0 0", fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: isMobile ? "clamp(50px, 15vw, 64px)" : "clamp(48px, 6.4vw, 92px)", lineHeight: 0.95, letterSpacing: "-0.025em", color: "#154f4c" }}>
              Your referrals,<br />
              <span style={{ fontStyle: "italic", color: "#5d8b87" }}>earning instantly.</span>
            </h1>
            <p style={{ marginTop: 14, maxWidth: 560, color: "#1d3936", fontSize: isMobile ? 16 : 15, lineHeight: 1.5 }}>
              {total > 0
                ? <>You&apos;ve referred <strong>{total} friend{total !== 1 ? "s" : ""}</strong> to Livoza. <span style={{ color: "#6a7a78" }}>You earn ₹3,000 instantly when they book a room.</span></>
                : <>Share your link and earn <strong>₹3,000</strong> when your friend books a room. <span style={{ color: "#6a7a78" }}>Paid instantly after conversion.</span></>
              }
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: isMobile ? "stretch" : "flex-end", gap: 10, minWidth: isMobile ? 0 : 320, width: isMobile ? "100%" : undefined }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 10px", background: "#ffffffb3", border: "1px solid #154f4c1f", borderRadius: 99, fontSize: 13, color: "#6a7a78", width: isMobile ? "fit-content" : undefined, maxWidth: "100%", lineHeight: 1.25 }}>
              <span style={{ width: 6, height: 6, borderRadius: 99, background: "#2e8b6a", boxShadow: "0 0 0 4px #2e8b6a22" }} />
              Program active · closes Sep 30, 2026
            </span>
            {/* Quick share */}
            {/* <div style={{ display: "flex", gap: 8, background: "#fff", border: "1px solid #154f4c1f", borderRadius: 14, padding: 6, width: "100%" }}>
              <div style={{ flex: 1, padding: "10px 12px", minWidth: 0, fontFamily: "'Geist Mono', monospace", fontSize: 12.5, color: "#1d3936", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "#6a7a78" }}>livoza.com/r/</span>
                <span style={{ fontWeight: 600, color: "#154f4c" }}>{userSlug}</span>
              </div>
              <button onClick={handleCopy} style={{ padding: "9px 14px", borderRadius: 9, border: "none", background: "#154f4c", color: "#fff", fontWeight: 600, fontSize: 13, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "inherit" }}>
                {copied ? (
                  <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="m5 12 5 5 9-11" /></svg> Copied</>
                ) : (
                  <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg> Copy link</>
                )}
              </button>
            </div> */}
            {/* Invite btn */}
            <button onClick={() => router.push("/referral/referee")} style={{ width: "100%", display: "grid", gridTemplateColumns: isMobile ? "38px minmax(0, 1fr) 26px" : "40px 1fr 28px", alignItems: "center", gap: isMobile ? 12 : 14, padding: isMobile ? "12px" : "12px 14px 12px 12px", background: "#154f4c", color: "#fff", border: "none", borderRadius: 14, cursor: "pointer", textAlign: "left", fontFamily: "inherit", boxShadow: "0 1px 0 #0000000a, 0 18px 30px -22px #15141066" }}>
              <span style={{ width: 40, height: 40, borderRadius: 11, background: "#ffffff14", display: "grid", placeItems: "center", color: "#fff" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M19 8v6M22 11h-6" /></svg>
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                <span style={{ fontSize: 14.5, fontWeight: 600, letterSpacing: "-0.01em" }}>Invite friend</span>
                <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10.5, color: "#ffffff80", letterSpacing: "0.1em", textTransform: "uppercase" }}>Email, message or share link</span>
              </span>
              <span style={{ width: 28, height: 28, borderRadius: 99, background: "#ffffff14", display: "grid", placeItems: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </span>
            </button>
          </div>
        </div>

        {/* Top grid */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "minmax(0, 1fr)" : "minmax(0, 1.55fr) minmax(360px, 1fr)", gap: 18, alignItems: "stretch", marginTop: isMobile ? 20 : 28 }}>
          {/* Earnings hero card */}
          <div style={{ position: "relative", borderRadius: isMobile ? 20 : 24, overflow: "hidden", background: "radial-gradient(120% 100% at 0% 0%, #1a5e5a 0%, #154f4c 45%, #0e3a37 100%)", color: "#fff", padding: isMobile ? "24px 20px 22px" : "32px 36px 28px", display: "flex", flexDirection: "column", gap: isMobile ? 20 : 22, minHeight: isMobile ? 0 : 460, boxShadow: "0 1px 0 #0000000a, 0 30px 60px -40px #15141033" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(135deg, #ffffff08 0 1px, transparent 1px 14px)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: "flex-start", gap: isMobile ? 8 : 16 }}>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#ffffff80", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: 99, background: "#2eb86c", marginRight: 6, verticalAlign: "middle" }} />
                Potential payout · all time
              </div>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#ffffff60", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                fall &apos;26
              </div>
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginTop: 4 }}>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: isMobile ? "clamp(58px, 18vw, 82px)" : "clamp(80px, 9vw, 124px)", lineHeight: 0.92, letterSpacing: "-0.025em", wordBreak: "break-word" }}>
                  ₹{potentialPayout.toLocaleString()}<span style={{ fontFamily: "'Geist', sans-serif", fontSize: isMobile ? 15 : 18, color: "#ffffff80", marginLeft: 6 }}>possible</span>
                </div>
              </div>
              <p style={{ color: "#ffffffb3", fontSize: 14, lineHeight: 1.5, maxWidth: 480, marginTop: 12 }}>
                {total > 0
                  ? <>If your {total} referred friend{total !== 1 ? "s" : ""} book{total === 1 ? "s" : ""} a room, you receive <strong>₹3,000</strong> per booking instantly. Keep sharing — no cap.</>
                  : <>No bookings yet. Share your link and earn <strong>₹3,000 instantly</strong> when your friend books a room.</>
                }
              </p>
            </div>
            <div style={{ position: "relative", zIndex: 1, marginTop: isMobile ? 2 : "auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", borderTop: "1px solid #ffffff1f", paddingTop: 20, gap: isMobile ? 18 : 24 }}>
              <div>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "#ffffff80" }}>⁂ potential payout</div>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 36, lineHeight: 1, letterSpacing: "-0.02em", marginTop: 8 }}>₹0<span style={{ fontFamily: "'Geist', sans-serif", fontSize: 13, color: "#ffffff80", marginLeft: 4 }}>in flight</span></div>
                <div style={{ color: "#ffffffa6", fontSize: 12, marginTop: 8, lineHeight: 1.45 }}>Friends who book unlock instant payouts</div>
              </div>
              <div>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "#ffffff80" }}>∆ referral value</div>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 36, lineHeight: 1, letterSpacing: "-0.02em", marginTop: 8 }}>₹{potentialPayout.toLocaleString()}</div>
                <div style={{ color: "#ffffffa6", fontSize: 12, marginTop: 8, lineHeight: 1.45 }}>if every referral books</div>
              </div>
              <div>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "#ffffff80" }}>⌖ per referral</div>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 36, lineHeight: 1, letterSpacing: "-0.02em", marginTop: 8 }}>₹3,000</div>
                <div style={{ color: "#ffffffa6", fontSize: 12, marginTop: 8, lineHeight: 1.45 }}>paid instantly after booking</div>
              </div>
            </div>
          </div>

          {/* Ring card */}
          <aside style={{ background: "#fff", border: "1px solid #154f4c1f", borderRadius: isMobile ? 20 : 24, padding: isMobile ? 20 : 24, display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6a7a78", letterSpacing: "0.12em", textTransform: "uppercase" }}>⁂ referrals · all time</div>
              <h3 style={{ margin: "8px 0 0", fontSize: 20, fontWeight: 600, letterSpacing: "-0.01em", color: "#154f4c" }}>
                {total > 0 ? `${total} friend${total !== 1 ? "s" : ""} referred.` : "No referrals yet."}
              </h3>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "148px 1fr", gap: 18, alignItems: "center", justifyItems: isMobile ? "center" : "stretch" }}>
              <div style={{ width: isMobile ? 164 : 148, height: isMobile ? 164 : 148, borderRadius: 99, background: total > 0 ? `conic-gradient(#154f4c 0 100%)` : "#dee8e6", display: "grid", placeItems: "center", position: "relative" }}>
                <div style={{ position: "absolute", inset: isMobile ? 15 : 14, background: "#fff", borderRadius: 99 }} />
                <div style={{ position: "relative", textAlign: "center" }}>
                  <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 42, lineHeight: 1, color: "#154f4c" }}>{total}</div>
                  <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: "#6a7a78", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 4 }}>referred</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
                {[
                  { color: "#154f4c", label: "Referred", count: total },
                  { color: "#5d8b87", label: "Booked room", count: 0 },
                  { color: "#b8744a", label: "Payout sent", count: 0 },
                  { color: "#c8d6d3", label: "In review", count: 0 },
                ].map((leg) => (
                  <div key={leg.label} style={{ display: "grid", gridTemplateColumns: "12px 1fr auto", gap: 10, alignItems: "center" }}>
                    <span style={{ width: 10, height: 10, borderRadius: 3, background: leg.color, display: "inline-block" }} />
                    <span style={{ fontSize: 13.5, color: "#1d3936", fontWeight: 500 }}>{leg.label}</span>
                    <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, color: "#6a7a78" }}>{leg.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderTop: "1px dashed #154f4c1f", paddingTop: 16, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
              <div>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10.5, color: "#6a7a78", letterSpacing: "0.1em", textTransform: "uppercase" }}>Conversion</div>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, lineHeight: 1, marginTop: 6, color: "#154f4c" }}>
                  0<span style={{ fontFamily: "'Geist', sans-serif", fontSize: 12, color: "#6a7a78", marginLeft: 4 }}>% booked</span>
                </div>
              </div>
              <div>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10.5, color: "#6a7a78", letterSpacing: "0.1em", textTransform: "uppercase" }}>Avg time to book</div>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, lineHeight: 1, marginTop: 6, color: "#154f4c" }}>
                  9.2<span style={{ fontFamily: "'Geist', sans-serif", fontSize: 12, color: "#6a7a78", marginLeft: 4 }}>days</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Economics strip */}
        <div style={{ marginTop: 18, background: "#fff", border: "1px solid #154f4c1f", borderRadius: 20, padding: isMobile ? "20px" : "20px 24px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr 1fr 1fr", gap: isMobile ? 18 : 24, alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6a7a78", letterSpacing: "0.12em", textTransform: "uppercase" }}>⁕ what you earn</div>
            <h4 style={{ margin: "6px 0 0", fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", color: "#154f4c" }}>Each converted booking</h4>
            <div style={{ color: "#6a7a78", fontSize: 12.5, marginTop: 6, lineHeight: 1.45 }}>You receive ₹3,000 instantly when the person you referred books a room — no caps, no claim form.</div>
          </div>
          <div>
            <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6a7a78", letterSpacing: "0.12em", textTransform: "uppercase" }}>per referral</div>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 38, lineHeight: 1, letterSpacing: "-0.02em", color: "#154f4c", marginTop: 6 }}>₹3,000<span style={{ fontFamily: "'Geist', sans-serif", fontSize: 13, color: "#6a7a78", marginLeft: 4 }}>/ booking</span></div>
          </div>
          <div>
            <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6a7a78", letterSpacing: "0.12em", textTransform: "uppercase" }}>they get</div>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 38, lineHeight: 1, letterSpacing: "-0.02em", color: "#154f4c", marginTop: 6 }}>a room<span style={{ fontFamily: "'Geist', sans-serif", fontSize: 13, color: "#6a7a78", marginLeft: 4 }}>at Livoza</span></div>
          </div>
          <div>
            <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6a7a78", letterSpacing: "0.12em", textTransform: "uppercase" }}>potential total</div>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 38, lineHeight: 1, letterSpacing: "-0.02em", color: "#154f4c", marginTop: 6 }}>
              ₹{potentialPayout.toLocaleString()}<span style={{ fontStyle: "italic", color: "#5d8b87" }}>{total > 0 ? "↑" : ""}</span>
            </div>
          </div>
        </div>

        {/* Payout details card */}
        <div style={{ marginTop: 18, background: "#fff", border: "1px solid #154f4c1f", borderRadius: isMobile ? 20 : 24, padding: isMobile ? "20px" : "24px 28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6a7a78", letterSpacing: "0.12em", textTransform: "uppercase" }}>⁕ your payout details</div>
            {(referralUser?.phone || referralUser?.paymentQrStorageId) && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "2px 8px", borderRadius: 99, background: "#e8f3ed", border: "1px solid #2e8b6a33", fontSize: 11, color: "#1d6a4f", fontWeight: 500 }}>
                <span style={{ width: 5, height: 5, borderRadius: 99, background: "#2e8b6a", display: "inline-block" }} />
                Saved
              </span>
            )}
          </div>
          <h3 style={{ margin: "6px 0 4px", fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em", color: "#154f4c" }}>Add your details to receive incentives</h3>
          <p style={{ margin: "0 0 20px", fontSize: 13.5, color: "#6a7a78", lineHeight: 1.5 }}>We need your contact number and UPI QR code to send your ₹3,000 payout instantly when your referral books.</p>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20, alignItems: "start" }}>
            {/* Phone */}
            <div>
              <label style={{ display: "block", fontFamily: "'Geist Mono', monospace", fontSize: 10.5, color: "#6a7a78", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>Contact number</label>
              <input
                type="tel"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="+91 98765 43210"
                style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1px solid #154f4c22", background: "#f7f5f0", fontSize: 14.5, color: "#154f4c", fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
              />
            </div>
            {/* QR upload */}
            <div>
              <label style={{ display: "block", fontFamily: "'Geist Mono', monospace", fontSize: 10.5, color: "#6a7a78", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>UPI / payment QR code</label>
              <label style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 14px", borderRadius: 10, border: "1px dashed #154f4c44", background: "#f7f5f0", cursor: "pointer" }}>
                {(qrPreview || qrImageUrl) ? (
                  <img src={qrPreview ?? qrImageUrl ?? undefined} alt="QR" style={{ width: 52, height: 52, objectFit: "contain", borderRadius: 6, border: "1px solid #154f4c1f" }} />
                ) : (
                  <div style={{ width: 52, height: 52, borderRadius: 6, background: "#dee8e6", display: "grid", placeItems: "center" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5d8b87" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
                  </div>
                )}
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 500, color: "#154f4c" }}>{qrFile ? qrFile.name : (qrImageUrl ? "QR saved · tap to replace" : "Upload QR image")}</div>
                  <div style={{ fontSize: 12, color: "#6a7a78", marginTop: 2 }}>PNG, JPG or WEBP</div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const f = e.target.files?.[0] ?? null;
                    setQrFile(f);
                    if (f) setQrPreview(URL.createObjectURL(f));
                  }}
                />
              </label>
            </div>
          </div>
          <div style={{ marginTop: 18, display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={handleSaveDetails}
              disabled={detailsSaving || (!phoneInput && !qrFile)}
              style={{ padding: "11px 22px", borderRadius: 99, background: detailsSaved ? "#2e8b6a" : "#154f4c", color: "#fff", border: "none", fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 8, opacity: (!phoneInput && !qrFile) ? 0.5 : 1, transition: "background 0.2s" }}
            >
              {detailsSaving ? (
                <><span style={{ width: 14, height: 14, borderRadius: 99, border: "2px solid #ffffff55", borderTopColor: "#fff", display: "inline-block", animation: "spin 0.7s linear infinite" }} />Saving…</>
              ) : detailsSaved ? (
                <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="m5 12 5 5 9-11" /></svg>Saved!</>
              ) : "Save details"}
            </button>
          </div>
        </div>

        {/* Referrals list */}
        <div style={{ marginTop: 28 }}>
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "stretch" : "flex-end", gap: 14, marginBottom: 14 }}>
            <div>
              <h2 style={{ margin: 0, fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: isMobile ? 34 : 42, lineHeight: 1, letterSpacing: "-0.02em", color: "#154f4c" }}>
                The people you <span style={{ fontStyle: "italic", color: "#5d8b87" }}>brought home.</span>
              </h2>
              <div style={{ marginTop: 10, fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#6a7a78", letterSpacing: "0.12em", textTransform: "uppercase" }}>⁂ {total} referral{total !== 1 ? "s" : ""} · ₹3,000 per booking</div>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["All"].map((f) => (
                <button key={f} onClick={() => setActiveFilter(f)} style={{ padding: "8px 12px", borderRadius: 99, background: activeFilter === f ? "#154f4c" : "#fff", border: `1px solid ${activeFilter === f ? "#154f4c" : "#154f4c1f"}`, fontSize: 13, color: activeFilter === f ? "#fff" : "#1d3936", fontWeight: 500, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "inherit" }}>
                  All <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, opacity: 0.8 }}>{total}</span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ background: "#fff", border: "1px solid #154f4c1f", borderRadius: 20, overflow: "hidden" }}>
            {/* Table head */}
            <div style={{ display: isMobile ? "none" : "grid", gridTemplateColumns: "minmax(220px, 1.4fr) 1fr 1.2fr 1.5fr 1fr", alignItems: "center", gap: 16, padding: "12px 22px", background: "#f1ece2", fontFamily: "'Geist Mono', monospace", fontSize: 10.5, color: "#6a7a78", letterSpacing: "0.14em", textTransform: "uppercase" }}>
              <div>Friend</div>
              <div>Channel</div>
              <div>Status</div>
              <div>Stage</div>
              <div>Your payout</div>
            </div>

            {myReferrals && myReferrals.length > 0 ? myReferrals.map((r, i) => (
              <div key={r._id} style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "minmax(220px, 1.4fr) 1fr 1.2fr 1.5fr 1fr", alignItems: "center", gap: isMobile ? 14 : 16, padding: isMobile ? "18px" : "16px 22px", borderTop: "1px solid #154f4c10" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 99, background: AV_GRADIENTS[i % AV_GRADIENTS.length], display: "grid", placeItems: "center", color: "#fff", fontFamily: "'Instrument Serif', serif", fontSize: 16, flexShrink: 0 }}>
                    {r.refereeName.charAt(0).toLowerCase()}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 600, letterSpacing: "-0.01em", color: "#154f4c", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.refereeName}</div>
                    <div style={{ fontSize: 12, color: "#6a7a78", marginTop: 2 }}>{r.refereePhone}</div>
                  </div>
                </div>
                <div style={{ fontSize: 13.5, color: "#1d3936", display: "flex", alignItems: "center", gap: 8, justifyContent: isMobile ? "space-between" : "flex-start" }}>
                  {isMobile && <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10.5, color: "#6a7a78", letterSpacing: "0.12em", textTransform: "uppercase" }}>Channel</span>}
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 99, background: "#c8d6d3", display: "inline-block" }} />
                    Link
                  </span>
                </div>
                <div style={{ display: isMobile ? "flex" : "block", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  {isMobile && <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10.5, color: "#6a7a78", letterSpacing: "0.12em", textTransform: "uppercase" }}>Status</span>}
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 99, background: "#e8f3ed", border: "1px solid #2e8b6a33", fontSize: 12.5, color: "#1d6a4f", fontWeight: 500 }}>
                    <span style={{ width: 6, height: 6, borderRadius: 99, background: "#2e8b6a", boxShadow: "0 0 0 3px #2e8b6a22", display: "inline-block" }} />
                    Referred
                  </span>
                </div>
                <div style={{ display: isMobile ? "grid" : "block", gridTemplateColumns: isMobile ? "auto minmax(0, 1fr)" : undefined, gap: isMobile ? 12 : 0, alignItems: "center", minWidth: 0 }}>
                  {isMobile && <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10.5, color: "#6a7a78", letterSpacing: "0.12em", textTransform: "uppercase" }}>Stage</span>}
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 0 }}>
                    {(() => {
                      const stageOrder = ["referred", "lead_visited", "converted"];
                      const stageLabels = ["Referred", "Lead visited", "Converted"];
                      const currentStage = r.stage ?? "referred";
                      const currentIdx = stageOrder.indexOf(currentStage);
                      return (
                        <>
                          <div style={{ display: "flex", gap: 4 }}>
                            {stageOrder.map((_, s) => (
                              <span key={s} style={{ flex: 1, height: 5, borderRadius: 99, background: s <= currentIdx ? "#154f4c" : "#e7e1d2" }} />
                            ))}
                          </div>
                          <div style={{ display: "flex", gap: 4 }}>
                            {stageLabels.map((label, s) => (
                              <span key={s} style={{ flex: 1, fontFamily: "'Geist Mono', monospace", fontSize: 9, color: s <= currentIdx ? "#154f4c" : "#a8b8b6", letterSpacing: "0.06em", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</span>
                            ))}
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, letterSpacing: "-0.01em", color: "#154f4c", display: isMobile ? "flex" : "block", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                  {isMobile && <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10.5, color: "#6a7a78", letterSpacing: "0.12em", textTransform: "uppercase" }}>Payout</span>}
                  <span>
                    ₹3,000<span style={{ fontFamily: "'Geist', sans-serif", fontSize: 12, color: "#6a7a78", marginLeft: 4 }}>on booking</span>
                  </span>
                </div>
              </div>
            )) : (
              <div style={{ padding: isMobile ? "36px 20px" : "48px 24px", textAlign: "center", color: "#6a7a78" }}>
                <div style={{ fontFamily: "'Instrument Serif', serif", fontSize: isMobile ? 26 : 28, color: "#154f4c", marginBottom: 8 }}>No referrals yet.</div>
                <div style={{ fontSize: 14 }}>Share your link to get started — every converted booking earns you ₹3,000 instantly.</div>
              </div>
            )}
          </div>
        </div>

        {/* Footer band */}
        <div style={{ marginTop: 36, padding: isMobile ? "24px 20px" : "28px 32px", background: "#dee8e6", border: "1px solid #154f4c1f", borderRadius: isMobile ? 20 : 24, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr auto", gap: 18, alignItems: "center" }}>
          <div>
            <h4 style={{ margin: 0, fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: isMobile ? 30 : 32, letterSpacing: "-0.02em", color: "#154f4c" }}>
              {total > 0 ? <>Keep the momentum <span style={{ fontStyle: "italic", color: "#5d8b87" }}>going.</span></> : <>Start earning <span style={{ fontStyle: "italic", color: "#5d8b87" }}>today.</span></>}
            </h4>
            <p style={{ margin: "6px 0 0", color: "#1d3936", fontSize: 14, maxWidth: 520, lineHeight: 1.5 }}>
              {total > 0
                ? "Refer more friends and keep earning ₹3,000 for every room booking. No cap, no claim form."
                : "Share your referral link with anyone looking for student housing. When they book a room, you receive ₹3,000 instantly."
              }
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 8, alignItems: "stretch" }}>
            {/* <button onClick={handleCopy} style={{ padding: "12px 18px", borderRadius: 99, background: "#fff", border: "1px solid #154f4c1f", color: "#154f4c", fontSize: 13.5, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>
              {copied ? "Copied!" : "Copy link"}
            </button> */}
            <button onClick={() => router.push("/referral/referee")} style={{ padding: "12px 20px", borderRadius: 99, background: "#154f4c", color: "#fff", border: "none", fontSize: 13.5, fontWeight: 500, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "inherit" }}>
              Refer someone
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </button>
          </div>
        </div>
      </section>
      {isMobile && (
        <button
          onClick={() => router.push("/referral/referee")}
          style={{
            position: "fixed",
            left: 20,
            right: 20,
            bottom: "calc(16px + env(safe-area-inset-bottom))",
            zIndex: 50,
            height: 54,
            borderRadius: 99,
            border: "1px solid #ffffff33",
            background: "#154f4c",
            color: "#fff",
            boxShadow: "0 18px 40px -18px #0e3a37cc",
            fontFamily: "inherit",
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "0.01em",
            cursor: "pointer",
          }}
          aria-label="Refer someone"
        >
          Refer someone
        </button>
      )}
    </div>
  );
}
