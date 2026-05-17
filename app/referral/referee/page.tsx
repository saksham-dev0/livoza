"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RefereePage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const submitReferral = useMutation(api.referrals.submitReferral);

  const [form, setForm] = useState({
    refereeName: "",
    refereePhone: "",
    refereeEmail: "",
    preferredCity: "",
    preferredMoveInDate: "",
    gender: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#021210] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#e3bf5f] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isSignedIn) {
    router.replace("/referral");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
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
        preferredMoveInDate: form.preferredMoveInDate || undefined,
        gender: form.gender || undefined,
      });
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#021210] flex flex-col items-center justify-center px-4">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#3E6B4F]/10 rounded-full blur-[120px]" />
        </div>
        <div className="relative z-10 text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-[#3E6B4F]/20 border border-[#3E6B4F]/40 flex items-center justify-center mx-auto mb-8">
            <svg className="w-7 h-7 text-[#e3bf5f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#EAEAEA] mb-3"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Referral Submitted
          </h2>
          <p className="text-white/50 mb-10 text-sm leading-relaxed">
            We&apos;ll reach out to <span className="text-[#EAEAEA]">{form.refereeName}</span> soon and keep you posted.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => {
                setSuccess(false);
                setForm({ refereeName: "", refereePhone: "", refereeEmail: "", preferredCity: "", preferredMoveInDate: "", gender: "" });
              }}
              className="px-6 py-3 rounded-full text-sm font-semibold transition-all"
              style={{
                background: "linear-gradient(135deg, #e3bf5f, #c9a73e)",
                color: "#021210",
              }}
            >
              Refer Another
            </button>
            <button
              onClick={() => router.push("/referral")}
              className="px-6 py-3 rounded-full text-sm font-medium bg-[#0a1f14] border border-white/[0.08] text-white/60 hover:text-white/80 transition-colors"
            >
              Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const inputClass = "w-full bg-[#061a12] border border-white/[0.1] rounded-xl px-4 py-3 text-[#EAEAEA] text-sm focus:ring-2 focus:ring-[#3E6B4F]/50 focus:border-[#3E6B4F] outline-none transition-all placeholder:text-white/20";
  const selectClass = "w-full bg-[#061a12] border border-white/[0.1] rounded-xl pl-4 pr-10 py-3 text-[#EAEAEA] text-sm focus:ring-2 focus:ring-[#3E6B4F]/50 focus:border-[#3E6B4F] outline-none transition-all appearance-none [color-scheme:dark]";
  const labelClass = "text-white/40 text-xs uppercase tracking-wider mb-2 block";

  return (
    <div className="min-h-screen bg-[#021210] flex flex-col items-center justify-center px-4 py-16">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#3E6B4F]/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#3E6B4F]/20 border border-[#3E6B4F]/40 rounded-full px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e3bf5f] animate-pulse" />
            <span className="text-[#e3bf5f] text-xs font-medium tracking-widest uppercase">Refer a Friend</span>
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold text-[#EAEAEA] mb-2"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Who are you referring?
          </h1>
          <p className="text-white/40 text-sm">
            Fill in their details and we&apos;ll get in touch
          </p>
        </div>

        {/* Form card */}
        <div className="bg-[#0a1f14] border border-white/[0.07] rounded-3xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={labelClass}>
                Full Name <span className="text-[#e3bf5f] normal-case tracking-normal">*</span>
              </label>
              <input
                type="text"
                placeholder="Their full name"
                value={form.refereeName}
                onChange={(e) => setForm((f) => ({ ...f, refereeName: e.target.value }))}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Phone Number <span className="text-[#e3bf5f] normal-case tracking-normal">*</span>
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={form.refereePhone}
                onChange={(e) => setForm((f) => ({ ...f, refereePhone: e.target.value }))}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Email Address <span className="text-white/25 normal-case tracking-normal">(optional)</span>
              </label>
              <input
                type="email"
                placeholder="their@email.com"
                value={form.refereeEmail}
                onChange={(e) => setForm((f) => ({ ...f, refereeEmail: e.target.value }))}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                PG Location <span className="text-[#e3bf5f] normal-case tracking-normal">*</span>
              </label>
              <div className="relative">
                <select
                  value={form.preferredCity}
                  onChange={(e) => {
                    const city = e.target.value;
                    setForm((f) => ({
                      ...f,
                      preferredCity: city,
                      gender: city === "YPR" ? "female" : f.gender,
                    }));
                  }}
                  className={selectClass}
                >
                  <option value="">Select location</option>
                  <option value="YPR">YPR</option>
                  <option value="Koramangala">Koramangala</option>
                </select>
                <svg className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Preferred Move-in Date <span className="text-white/25 normal-case tracking-normal">(optional)</span>
              </label>
              <input
                type="date"
                value={form.preferredMoveInDate}
                onChange={(e) => setForm((f) => ({ ...f, preferredMoveInDate: e.target.value }))}
                className={inputClass + " [color-scheme:dark]"}
              />
            </div>

            <div>
              <label className={labelClass}>
                Gender <span className="text-white/25 normal-case tracking-normal">(optional)</span>
              </label>
              <div className="relative">
                <select
                  value={form.gender}
                  disabled={form.preferredCity === "YPR"}
                  onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value }))}
                  className={selectClass + " disabled:opacity-40 disabled:cursor-not-allowed"}
                >
                  <option value="">Select gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
                <svg className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {form.preferredCity === "YPR" && (
                <p className="text-white/30 text-xs mt-1.5">YPR is a girls-only property</p>
              )}
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-full font-semibold text-sm transition-all disabled:opacity-50 shadow-[0_4px_14px_rgba(227,191,95,0.25)] hover:shadow-[0_4px_20px_rgba(227,191,95,0.4)]"
              style={{
                background: "linear-gradient(135deg, #e3bf5f, #c9a73e)",
                color: "#021210",
              }}
            >
              {submitting ? "Submitting..." : "Submit Referral"}
            </button>
          </form>
        </div>

        <button
          onClick={() => router.back()}
          className="mt-4 w-full flex items-center justify-center gap-2 text-white/25 text-sm hover:text-white/50 transition-colors py-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>
    </div>
  );
}
