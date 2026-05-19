"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";

const T = {
  paper:  "#f1ece2",
  paper2: "#e7e1d2",
  mint:   "#dee8e6",
  ink:    "#154f4c",
  ink2:   "#1d3936",
  muted:  "#6a7a78",
  line:   "#154f4c10",
  line2:  "#154f4c1f",
  card:   "#ffffff",
};

export function Logo() {
  return (
    <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
      <img src="/Livoza-Logo-new.png" alt="Livoza" style={{ height: 38, width: "auto", display: "block" }} />
    </Link>
  );
}

export function SharedNav({ onBook }: { onBook?: () => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/properties", label: "Properties" },
    { href: "/#facilities", label: "Facilities" },
    { href: "/about", label: "About" },
    { href: "/#contact", label: "Contact" },
  ];

  const handleBook = onBook ?? (() => { window.location.href = "/#rooms"; });

  return (
    <header
      className="shared-nav"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: `${T.paper}e6`, backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${T.line2}`,
      }}
    >
      <style>{`
        .shared-nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 32px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
        }

        .shared-nav-links {
          display: flex;
          align-items: center;
          gap: 28px;
          font-size: 14px;
        }

        .shared-nav-actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .shared-nav-toggle {
          display: none;
        }

        .shared-nav-mobile-panel {
          background: ${T.paper};
          border-top: 1px solid ${T.line2};
          padding: 10px 20px 18px;
          box-shadow: 0 18px 36px -28px ${T.ink}99;
        }

        .shared-nav-mobile-inner {
          max-width: 480px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .shared-nav-inner {
            height: 64px !important;
            padding: 0 20px !important;
          }

          .shared-nav-links,
          .shared-nav-actions {
            display: none !important;
          }

          .shared-nav-toggle {
            width: 40px !important;
            height: 40px !important;
            border-radius: 999px !important;
            border: 1px solid ${T.line2} !important;
            background: ${T.card} !important;
            display: grid !important;
            place-items: center !important;
            padding: 0 !important;
          }
        }
      `}</style>

      <div className="shared-nav-inner">
        <Logo />

        <nav className="shared-nav-links">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{
              color: T.ink2, fontWeight: 500, textDecoration: "none", opacity: 0.8,
            }}>{l.label}</a>
          ))}
        </nav>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div className="shared-nav-actions desktop-nav-btns">
            <a href="tel:+919353477987" style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "9px 16px", borderRadius: 99,
              border: `1px solid ${T.line2}`, background: T.card,
              fontSize: 13, fontWeight: 500, color: T.ink, textDecoration: "none",
            }}>
              <Phone style={{ width: 13, height: 13 }} />
              +91 9353477987
            </a>
            <button onClick={handleBook} style={{
              padding: "9px 18px", borderRadius: 99, background: T.ink,
              color: "#fff", border: "none", fontSize: 13, fontWeight: 500, cursor: "pointer",
            }}>Book Now</button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              cursor: "pointer", color: T.ink,
            }}
            className="shared-nav-toggle mobile-menu-btn"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X style={{ width: 20, height: 20 }} /> : <Menu style={{ width: 20, height: 20 }} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="shared-nav-mobile-panel">
          <div className="shared-nav-mobile-inner">
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "13px 0", color: T.ink2, fontWeight: 500,
                borderBottom: `1px solid ${T.line}`, textDecoration: "none", fontSize: 15,
              }}>{l.label}</a>
            ))}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 16 }}>
              <a href="tel:+919353477987" style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                padding: "12px 10px", borderRadius: 99,
                border: `1px solid ${T.ink}`, background: T.mint,
                color: T.ink, fontWeight: 600, fontSize: 13.5, textDecoration: "none",
              }}>
                <Phone style={{ width: 14, height: 14, flex: "0 0 auto" }} />
                Call
              </a>
              <button onClick={() => { handleBook(); setMobileOpen(false); }} style={{
                padding: "12px 10px", borderRadius: 99,
                background: T.ink, color: "#fff", border: "none", fontWeight: 600,
                fontSize: 13.5, cursor: "pointer", fontFamily: "inherit",
              }}>Book Now</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
