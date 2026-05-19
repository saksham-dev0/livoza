"use client";

import React, { useState } from "react";
import { BookModal } from "./BookModal";

const PHONE_HREF = "tel:+919353477987";

export function FloatingCTA() {
  const [bookOpen, setBookOpen] = useState(false);

  return (
    <>
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 70,
        background: "#f1ece2f2", backdropFilter: "blur(8px)",
        borderTop: "1px solid #154f4c1f", padding: "12px 16px",
      }}>
        <div style={{ display: "flex", gap: 10, maxWidth: 480, margin: "0 auto" }}>
          <a href={PHONE_HREF} style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            background: "#dee8e6", color: "#154f4c", padding: "13px", borderRadius: 99,
            border: "1px solid #154f4c", fontWeight: 600, fontSize: 14, textDecoration: "none",
            fontFamily: "inherit",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Call Now
          </a>
          <button
            onClick={() => setBookOpen(true)}
            style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              background: "#154f4c", color: "#fff", padding: "13px", borderRadius: 99,
              fontWeight: 600, fontSize: 14, border: "none", cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Book Now
          </button>
        </div>
      </div>

      <BookModal open={bookOpen} onClose={() => setBookOpen(false)} />
    </>
  );
}
