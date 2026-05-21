"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const T = {
  paper: "#f1ece2",
  paper2: "#e7e1d2",
  mint: "#dee8e6",
  sage: "#5d8b87",
  ink: "#154f4c",
  ink2: "#1d3936",
  muted: "#6a7a78",
  line: "#154f4c1f",
  rust: "#b8744a",
  white: "#fff",
};

const mono = "'Geist Mono', ui-monospace, monospace";
const serif = "'Instrument Serif', serif";

export default function RefereePage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const submitReferral = useMutation(api.referrals.submitReferral);

  const [form, setForm] = useState({
    refereeName: "",
    refereePhone: "",
    refereeEmail: "",
    preferredCity: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 820);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isLoaded && !isSignedIn) router.replace("/referral");
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#021210] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#e3bf5f] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isSignedIn) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.refereeName.trim() || !form.refereePhone.trim() || !form.preferredCity) {
      setError("Name, phone, and PG location are required.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      await submitReferral({
        refereeName: form.refereeName.trim(),
        refereePhone: form.refereePhone.trim(),
        refereeEmail: form.refereeEmail.trim() || undefined,
        preferredCity: form.preferredCity,
      });
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSuccess(false);
    setForm({
      refereeName: "",
      refereePhone: "",
      refereeEmail: "",
      preferredCity: "",
    });
  };

  const shell: React.CSSProperties = {
    maxWidth: 1440,
    width: "100%",
    margin: "0 auto",
    minHeight: "100vh",
    background: `linear-gradient(180deg, ${T.paper} 0%, ${T.paper2} 58%, ${T.mint} 100%)`,
    color: T.ink,
    fontFamily: "'Geist', ui-sans-serif, system-ui, sans-serif",
    WebkitFontSmoothing: "antialiased",
    overflowX: "hidden",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: 7,
    fontFamily: mono,
    fontSize: 10.5,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: T.muted,
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    border: `1px solid ${T.line}`,
    borderRadius: 13,
    background: "#fbfaf7",
    color: T.ink2,
    padding: "12px 14px",
    fontSize: 14,
    fontFamily: "inherit",
    outline: "none",
    boxShadow: "0 1px 0 #00000005",
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    appearance: "none",
    paddingRight: 40,
  };

  const field = (
    label: string,
    required: boolean,
    node: React.ReactNode,
    helper?: string
  ) => (
    <div>
      <label style={labelStyle}>
        {label}{" "}
        <span style={{ color: required ? T.rust : "#9aa6a3", fontFamily: "'Geist', sans-serif", letterSpacing: 0, textTransform: "none" }}>
          {required ? "*" : "(optional)"}
        </span>
      </label>
      {node}
      {helper && <p style={{ margin: "7px 0 0", color: T.muted, fontSize: 12.5, lineHeight: 1.45 }}>{helper}</p>}
    </div>
  );

  const nav = (
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: isMobile ? "16px 18px" : "22px 40px", gap: 16 }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, color: "inherit", textDecoration: "none" }}>
        <span style={{ width: 28, height: 28, borderRadius: 8, background: T.ink, color: T.white, display: "grid", placeItems: "center", fontFamily: serif, fontStyle: "italic", fontSize: 18 }}>l</span>
        <span style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em" }}>Livoza</span>
      </Link>
      <Link href="/referral" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "9px 12px", borderRadius: 99, background: T.white, border: `1px solid ${T.line}`, color: T.ink, textDecoration: "none", fontSize: 13.5, fontWeight: 600 }}>
        Referral dashboard
      </Link>
    </header>
  );

  if (success) {
    return (
      <div style={shell}>
        {nav}
        <main style={{ minHeight: "calc(100vh - 76px)", display: "grid", placeItems: "center", padding: isMobile ? "22px 18px 56px" : "32px 40px 80px" }}>
          <section style={{ width: "100%", maxWidth: 760, textAlign: "center", background: T.white, border: `1px solid ${T.line}`, borderRadius: isMobile ? 22 : 28, padding: isMobile ? "34px 22px" : "46px 54px", boxShadow: "0 1px 0 #0000000a, 0 30px 70px -52px #15141066" }}>
            <div style={{ width: 66, height: 66, borderRadius: 99, background: T.mint, color: T.ink, display: "grid", placeItems: "center", margin: "0 auto 22px", border: `1px solid ${T.line}` }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                <path d="m5 12 5 5 9-11" />
              </svg>
            </div>
            <div style={{ fontFamily: mono, fontSize: 11, color: T.muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>Referral submitted</div>
            <h1 style={{ margin: "10px auto 0", maxWidth: 560, fontFamily: serif, fontWeight: 400, fontSize: isMobile ? 46 : 62, lineHeight: 0.96, letterSpacing: "-0.025em", color: T.ink }}>
              We&apos;ll take it <span style={{ fontStyle: "italic", color: T.sage }}>from here.</span>
            </h1>
            <p style={{ margin: "18px auto 0", maxWidth: 500, color: T.ink2, fontSize: 15, lineHeight: 1.55 }}>
              We&apos;ll reach out to <strong>{form.refereeName}</strong>. If they book a room, your ₹3,000 referral payout is unlocked instantly.
            </p>
            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "center", gap: 10, marginTop: 28 }}>
              <button onClick={resetForm} style={{ padding: "12px 18px", borderRadius: 99, border: "none", background: T.ink, color: T.white, fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                Refer another
              </button>
              <button onClick={() => router.push("/referral")} style={{ padding: "12px 18px", borderRadius: 99, border: `1px solid ${T.line}`, background: T.white, color: T.ink, fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                Back to dashboard
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div style={shell}>
      {nav}
      <main style={{ padding: isMobile ? "10px 18px 56px" : "18px 40px 82px" }}>
        <section style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 0.92fr) minmax(420px, 0.78fr)", gap: isMobile ? 20 : 24, alignItems: "stretch", maxWidth: 1180, margin: "0 auto" }}>
          <div style={{ position: "relative", overflow: "hidden", borderRadius: isMobile ? 22 : 28, background: "radial-gradient(120% 100% at 0% 0%, #1a5e5a 0%, #154f4c 48%, #0e3a37 100%)", color: T.white, padding: isMobile ? "28px 22px" : "40px", minHeight: isMobile ? 0 : 640, display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 34, boxShadow: "0 1px 0 #0000000a, 0 30px 70px -52px #15141066" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(135deg, #ffffff0a 0 1px, transparent 1px 14px)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 11px", borderRadius: 99, background: "#ffffff12", border: "1px solid #ffffff1f", color: "#ffffffb3", fontSize: 13 }}>
                <span style={{ width: 7, height: 7, borderRadius: 99, background: "#2eb86c", boxShadow: "0 0 0 4px #2eb86c22" }} />
                Referral program · ₹3,000 per booking
              </div>
              <h1 style={{ margin: "22px 0 0", maxWidth: 650, fontFamily: serif, fontWeight: 400, fontSize: isMobile ? "clamp(52px, 15vw, 70px)" : "clamp(72px, 7.6vw, 108px)", lineHeight: 0.92, letterSpacing: "-0.025em" }}>
                Add your <br />
                friend&apos;s details.
              </h1>
              <p style={{ margin: "20px 0 0", maxWidth: 470, color: "#ffffffb3", fontSize: 15, lineHeight: 1.6 }}>
                We&apos;ll contact them, help them find the right Livoza room, and unlock your instant ₹3,000 payout when they book.
              </p>
            </div>

            <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 12, borderTop: "1px solid #ffffff1f", paddingTop: 22 }}>
              {[
                ["01", "Share the lead"],
                ["02", "We help them book"],
                ["03", "You get ₹3,000"],
              ].map(([num, text]) => (
                <div key={num} style={{ border: "1px solid #ffffff1a", borderRadius: 16, padding: "14px 15px", background: "#ffffff0d" }}>
                  <div style={{ fontFamily: mono, fontSize: 10.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "#ffffff80" }}>{num}</div>
                  <div style={{ marginTop: 8, color: T.white, fontSize: 13.5, fontWeight: 600 }}>{text}</div>
                </div>
              ))}
            </div>
          </div>

          <section style={{ background: T.white, border: `1px solid ${T.line}`, borderRadius: isMobile ? 22 : 28, padding: isMobile ? "24px 20px" : "30px", boxShadow: "0 1px 0 #0000000a, 0 30px 70px -58px #15141066" }}>
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontFamily: mono, fontSize: 11, color: T.muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>Refer / Friend details</div>
              <h2 style={{ margin: "8px 0 0", fontFamily: serif, fontWeight: 400, fontSize: isMobile ? 38 : 46, lineHeight: 1, letterSpacing: "-0.02em", color: T.ink }}>
                Who should we call?
              </h2>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16 }}>
              {field(
                "Full name",
                true,
                <input
                  type="text"
                  required
                  placeholder="Their full name"
                  value={form.refereeName}
                  onChange={(e) => setForm((f) => ({ ...f, refereeName: e.target.value }))}
                  style={inputStyle}
                />
              )}

              {field(
                "Phone number",
                true,
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={form.refereePhone}
                  onChange={(e) => setForm((f) => ({ ...f, refereePhone: e.target.value }))}
                  style={inputStyle}
                />
              )}

              {field(
                "Email address",
                false,
                <input
                  type="email"
                  placeholder="their@email.com"
                  value={form.refereeEmail}
                  onChange={(e) => setForm((f) => ({ ...f, refereeEmail: e.target.value }))}
                  style={inputStyle}
                />
              )}

              {field(
                "PG location",
                true,
                <div style={{ position: "relative" }}>
                  <select
                    required
                    value={form.preferredCity}
                    onChange={(e) => setForm((f) => ({ ...f, preferredCity: e.target.value }))}
                    style={selectStyle}
                  >
                    <option value="">Select location</option>
                    <option value="YPR">YPR</option>
                    <option value="Koramangala">Koramangala</option>
                  </select>
                  <SelectArrow />
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
                
              </div>

              {error && (
                <div style={{ border: "1px solid #b8744a55", background: "#b8744a12", color: "#7a3e1f", borderRadius: 14, padding: "12px 14px", fontSize: 13.5 }}>
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                style={{ marginTop: 4, width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "13px 18px", borderRadius: 99, border: "none", background: T.ink, color: T.white, fontSize: 14, fontWeight: 700, cursor: submitting ? "wait" : "pointer", opacity: submitting ? 0.72 : 1, fontFamily: "inherit", boxShadow: "0 18px 32px -24px #15141066" }}
              >
                {submitting ? "Submitting..." : "Submit referral"}
                {!submitting && (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                )}
              </button>
            </form>

            <button
              onClick={() => router.back()}
              style={{ width: "100%", marginTop: 14, border: "none", background: "transparent", color: T.muted, fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", padding: 10 }}
            >
              Back
            </button>
          </section>
        </section>
      </main>
    </div>
  );
}

function SelectArrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={T.muted}
      strokeWidth="2"
      style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
