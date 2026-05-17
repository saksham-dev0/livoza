"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function AdminPage() {
  const referrals = useQuery(api.referrals.getAllReferrals);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-2">Admin — Referrals</h1>
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
                <th className="py-3 pr-6">Gender</th>
                <th className="py-3 pr-6">Move-in Date</th>
                <th className="py-3 pr-6">Referred By</th>
                <th className="py-3">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((r) => (
                <tr
                  key={r._id}
                  className="border-b border-gray-800 hover:bg-gray-900 transition-colors"
                >
                  <td className="py-3 pr-6 font-medium">{r.refereeName}</td>
                  <td className="py-3 pr-6">{r.refereePhone}</td>
                  <td className="py-3 pr-6 text-gray-400">{r.refereeEmail ?? "—"}</td>
                  <td className="py-3 pr-6">{r.preferredCity}</td>
                  <td className="py-3 pr-6 capitalize">{r.gender ?? "—"}</td>
                  <td className="py-3 pr-6">{r.preferredMoveInDate ?? "—"}</td>
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
                  <td className="py-3 text-gray-400 text-xs">
                    {new Date(r.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-gray-600 text-xs">{referrals.length} total referral{referrals.length !== 1 ? "s" : ""}</p>
        </div>
      )}
    </div>
  );
}
