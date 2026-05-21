"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useState, useEffect } from "react";

type Stage = "referred" | "lead_visited" | "converted";

const STAGE_LABELS: Record<Stage, string> = {
  referred: "Referred",
  lead_visited: "Lead visited",
  converted: "Converted",
};

const STAGE_COLORS: Record<Stage, string> = {
  referred: "#154f4c",
  lead_visited: "#b8744a",
  converted: "#2e8b6a",
};

const SESSION_KEY = "livoza_admin_auth";

function AdminLogin({ onAuth }: { onAuth: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (
        username === process.env.NEXT_PUBLIC_ADMIN_USER &&
        password === process.env.NEXT_PUBLIC_ADMIN_PASS
      ) {
        sessionStorage.setItem(SESSION_KEY, "1");
        onAuth();
      } else {
        setError("Invalid username or password.");
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "ui-sans-serif, system-ui, sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 380, padding: "0 20px" }}>
        <div style={{ marginBottom: 32, textAlign: "center" }}>
          <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "#555", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 10 }}>Livoza · Admin</div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>Sign in</h1>
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, color: "#888", marginBottom: 6, fontWeight: 500 }}>Username</label>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid #2a2a2a", background: "#111", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, color: "#888", marginBottom: 6, fontWeight: 500 }}>Password</label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1px solid #2a2a2a", background: "#111", color: "#fff", fontSize: 14, outline: "none", boxSizing: "border-box" }}
            />
          </div>
          {error && (
            <div style={{ fontSize: 13, color: "#f87171", padding: "10px 14px", borderRadius: 8, background: "#1a0000", border: "1px solid #7f1d1d" }}>{error}</div>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{ marginTop: 4, padding: "12px", borderRadius: 8, background: "#fff", color: "#000", border: "none", fontSize: 14, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Checking…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const referrals = useQuery(api.referrals.getAllReferrals);
  const updateStage = useMutation(api.referrals.updateReferralStage);
  const [updating, setUpdating] = useState<string | null>(null);

  const handleStageChange = async (referralId: Id<"referrals">, stage: Stage) => {
    setUpdating(referralId);
    try {
      await updateStage({ referralId, stage });
    } finally {
      setUpdating(null);
    }
  };

  const handleSignOut = () => {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold">Admin — Referrals</h1>
        <button
          onClick={handleSignOut}
          className="text-xs text-gray-500 hover:text-gray-300 border border-gray-700 rounded px-3 py-1.5 transition-colors"
        >
          Sign out
        </button>
      </div>
      <p className="text-gray-400 mb-8">All submitted referees and who referred them</p>

      {referrals === undefined ? (
        <p className="text-gray-500">Loading…</p>
      ) : referrals.length === 0 ? (
        <p className="text-gray-500">No referrals yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-gray-700 text-left text-gray-400">
                <th className="py-3 pr-6">Referee Name</th>
                <th className="py-3 pr-6">Phone</th>
                <th className="py-3 pr-6">Email</th>
                <th className="py-3 pr-6">City</th>
                <th className="py-3 pr-6">Referred By</th>
                <th className="py-3 pr-6">Submitted</th>
                <th className="py-3">Stage</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((r) => {
                const currentStage: Stage = (r.stage as Stage) ?? "referred";
                return (
                  <tr key={r._id} className="border-b border-gray-800 hover:bg-gray-900 transition-colors">
                    <td className="py-3 pr-6 font-medium">{r.refereeName}</td>
                    <td className="py-3 pr-6">{r.refereePhone}</td>
                    <td className="py-3 pr-6 text-gray-400">{r.refereeEmail ?? "—"}</td>
                    <td className="py-3 pr-6">{r.preferredCity}</td>
                    <td className="py-3 pr-6">
                      {r.referrer ? (
                        <div>
                          <p className="font-medium">{r.referrer.name ?? "—"}</p>
                          <p className="text-gray-400 text-xs">{r.referrer.email ?? r.referrer.clerkId}</p>
                        </div>
                      ) : (
                        <span className="text-gray-600 text-xs">{r.referrerId}</span>
                      )}
                    </td>
                    <td className="py-3 pr-6 text-gray-400 text-xs">
                      {new Date(r.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3">
                      <select
                        value={currentStage}
                        disabled={updating === r._id}
                        onChange={(e) => handleStageChange(r._id, e.target.value as Stage)}
                        style={{ color: STAGE_COLORS[currentStage] }}
                        className="bg-gray-900 border border-gray-700 rounded px-2 py-1 text-xs font-medium cursor-pointer disabled:opacity-50"
                      >
                        {(Object.keys(STAGE_LABELS) as Stage[]).map((s) => (
                          <option key={s} value={s} style={{ color: STAGE_COLORS[s] }}>
                            {STAGE_LABELS[s]}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="mt-4 text-gray-600 text-xs">{referrals.length} total referral{referrals.length !== 1 ? "s" : ""}</p>
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    setAuthed(sessionStorage.getItem(SESSION_KEY) === "1");
  }, []);

  if (authed === null) return null;

  if (!authed) return <AdminLogin onAuth={() => setAuthed(true)} />;

  return <AdminDashboard />;
}
