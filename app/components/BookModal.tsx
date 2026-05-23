"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const T = {
  paper: "#f1ece2",
  mint: "#dee8e6",
  mint2: "#c8d6d3",
  ink: "#154f4c",
  ink2: "#1d3936",
  muted: "#6a7a78",
  line2: "#154f4c1f",
  card: "#ffffff",
};

const serif: React.CSSProperties = {
  fontFamily: "var(--font-instrument), 'Times New Roman', serif",
  fontWeight: 400,
};
const mono: React.CSSProperties = {
  fontFamily: "'Geist Mono', ui-monospace, monospace",
};

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export function BookModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const createBookNowSubmission = useMutation(api.forms.createBookNowSubmission);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const fd = new FormData(e.currentTarget);
      await createBookNowSubmission({
        roomType: String(fd.get("roomType") ?? "").trim(),
        fullName: String(fd.get("fullName") ?? "").trim(),
        phoneNumber: String(fd.get("phoneNumber") ?? "").trim(),
        emailAddress: String(fd.get("emailAddress") ?? "").trim() || undefined,
        pgLocation: String(fd.get("pgLocation") ?? "").trim() || undefined,
      });
      router.push("/thank-you");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "#00000060", backdropFilter: "blur(4px)", padding: 16,
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: T.paper, borderRadius: 24, maxWidth: 420, width: "100%",
        padding: "32px 28px", position: "relative",
        border: `1px solid ${T.line2}`,
      }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 18, right: 18, width: 32, height: 32,
            borderRadius: 99, background: T.mint, border: "none",
            display: "grid", placeItems: "center", cursor: "pointer", fontSize: 18, color: T.ink,
          }}
        >×</button>

        <div style={{ marginBottom: 22 }}>
          <h2 style={{ ...serif, margin: 0, fontSize: 28, color: T.ink }}>Book Your Stay</h2>
          <p style={{ margin: "6px 0 0", fontSize: 13.5, color: T.muted }}>We&apos;ll call you back within 24 hours</p>
        </div>

        <form style={{ display: "flex", flexDirection: "column", gap: 14 }} onSubmit={handleSubmit}>
          <div>
            <label style={{ ...mono, fontSize: 10, textTransform: "uppercase", color: T.muted, display: "block", marginBottom: 5 }}>
              Room Type
            </label>
            <select name="roomType" required style={{
              width: "100%", padding: "11px 14px", borderRadius: 12,
              border: `1px solid ${T.line2}`, background: T.card,
              fontSize: 14, color: T.ink, fontFamily: "inherit", outline: "none",
            }}>
              <option value="">Select room type</option>
              <option value="Triple Sharing (Non AC)">Triple Sharing (Non AC)</option>
              <option value="Double Sharing (Non AC)">Double Sharing (Non AC)</option>
              <option value="Single Sharing (Non AC)">Single Sharing (Non AC)</option>
            </select>
          </div>

          <div>
            <label style={{ ...mono, fontSize: 10, textTransform: "uppercase", color: T.muted, display: "block", marginBottom: 5 }}>
              PG Location
            </label>
            <select name="pgLocation" style={{
              width: "100%", padding: "11px 14px", borderRadius: 12,
              border: `1px solid ${T.line2}`, background: T.card,
              fontSize: 14, color: T.ink, fontFamily: "inherit", outline: "none",
            }}>
              <option value="">Choose PG location</option>
              <option value="Near Christ University Yeshwanthpur Campus">Near Christ University Yeshwanthpur Campus</option>
              <option value="Near Christ University Central Campus">Near Christ University Central Campus</option>
            </select>
          </div>

          {[
            { label: "Full Name *", name: "fullName", type: "text", required: true, placeholder: "Your name" },
            { label: "Phone Number *", name: "phoneNumber", type: "tel", required: true, placeholder: "+91 XXXXX XXXXX" },
            { label: "Email Address", name: "emailAddress", type: "email", required: false, placeholder: "your@email.com (optional)" },
          ].map(f => (
            <div key={f.name}>
              <label style={{ ...mono, fontSize: 10, textTransform: "uppercase", color: T.muted, display: "block", marginBottom: 5 }}>
                {f.label}
              </label>
              <input
                type={f.type} name={f.name} required={f.required} placeholder={f.placeholder}
                style={{
                  width: "100%", padding: "11px 14px", borderRadius: 12,
                  border: `1px solid ${T.line2}`, background: T.card,
                  fontSize: 14, color: T.ink, fontFamily: "inherit", outline: "none", boxSizing: "border-box",
                }}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: "14px", borderRadius: 99, background: T.ink,
              color: "#fff", border: "none", fontWeight: 500, fontSize: 14.5,
              cursor: "pointer", marginTop: 4, opacity: isSubmitting ? 0.6 : 1,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              fontFamily: "inherit",
            }}
          >
            {isSubmitting ? "Submitting…" : <><span>Request Callback</span><Arrow /></>}
          </button>

          {error && <p style={{ fontSize: 13, color: "#c0392b", margin: 0 }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
