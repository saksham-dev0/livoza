"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Phone, MapPin, ChevronRight, Calendar, Menu, X, CheckCircle2 } from "lucide-react";

// ── Design tokens (brand teal palette) ──
const T = {
  paper:  "#f1ece2",
  paper2: "#e7e1d2",
  mint:   "#dee8e6",
  mint2:  "#c8d6d3",
  sage:   "#5d8b87",
  ink:    "#154f4c",
  ink2:   "#1d3936",
  muted:  "#6a7a78",
  line:   "#154f4c10",
  line2:  "#154f4c1f",
  card:   "#ffffff",
};

// ── Inline-style helpers ──
const serif: React.CSSProperties = {
  fontFamily: "var(--font-instrument), 'Times New Roman', serif",
  fontWeight: 400,
  letterSpacing: "-0.01em",
};
const mono: React.CSSProperties = {
  fontFamily: "'Geist Mono', ui-monospace, monospace",
  letterSpacing: "0.1em",
};

// ── Small Icons ──
const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M5 12h14M13 6l6 6-6 6"/>
  </svg>
);
const Check = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="m5 12 5 5 9-11"/>
  </svg>
);
const Star = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill={T.ink}>
    <path d="m12 3 2.6 6 6.4.5-4.9 4.2 1.5 6.3L12 16.8 6.4 20l1.5-6.3L3 9.5 9.4 9z"/>
  </svg>
);
const Bookmark = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M6 4h12v17l-6-4-6 4z"/>
  </svg>
);

// ── Logo ──
function Logo() {
  return (
    <a href="#" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
      <img src="/Livoza-Logo-new.png" alt="Livoza" style={{ height: 38, width: "auto", display: "block" }} />
    </a>
  );
}

// ── Nav ──
function Nav({ onBook, mobileOpen, setMobileOpen }: {
  onBook: () => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}) {
  const links = [
    { href: "#rooms", label: "Rooms" },
    { href: "#facilities", label: "Facilities" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: `${T.paper}e6`, backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${T.line2}`,
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "0 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 68,
      }}>
        <Logo />

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: 28, fontSize: 14 }}>
          {links.map(l => (
            <a key={l.href} href={l.href} style={{
              color: T.ink2, fontWeight: 500, textDecoration: "none",
              opacity: 0.8,
            }}>{l.label}</a>
          ))}
        </nav>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div className="desktop-nav-btns" style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <a href="tel:+919353477987" style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "9px 16px", borderRadius: 99,
              border: `1px solid ${T.line2}`, background: T.card,
              fontSize: 13, fontWeight: 500, color: T.ink, textDecoration: "none",
            }}>
              <Phone style={{ width: 13, height: 13 }} />
              +91 9353477987
            </a>
            <button onClick={onBook} style={{
              padding: "9px 18px", borderRadius: 99, background: T.ink,
              color: "#fff", border: "none", fontSize: 13, fontWeight: 500, cursor: "pointer",
            }}>Book Now</button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: "none", padding: 8, background: "none", border: "none",
              cursor: "pointer", color: T.ink,
            }}
            className="mobile-menu-btn"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X style={{ width: 20, height: 20 }} /> : <Menu style={{ width: 20, height: 20 }} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{
          background: T.paper, borderTop: `1px solid ${T.line2}`,
          padding: "16px 24px 24px",
        }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{
              display: "block", padding: "12px 0", color: T.ink2, fontWeight: 500,
              borderBottom: `1px solid ${T.line}`, textDecoration: "none", fontSize: 15,
            }}>{l.label}</a>
          ))}
          <a href="tel:+919353477987" style={{
            display: "flex", alignItems: "center", gap: 8, marginTop: 16,
            color: T.ink, fontWeight: 600, fontSize: 15, textDecoration: "none",
          }}>
            <Phone style={{ width: 16, height: 16 }} />+91 9353477987
          </a>
          <button onClick={() => { onBook(); setMobileOpen(false); }} style={{
            marginTop: 12, width: "100%", padding: "12px", borderRadius: 99,
            background: T.ink, color: "#fff", border: "none", fontWeight: 600,
            fontSize: 15, cursor: "pointer",
          }}>Book Now</button>
        </div>
      )}
    </header>
  );
}

// ── Hero inline booking form ──
function HeroBookForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const createBookNowSubmission = useMutation(api.forms.createBookNowSubmission);

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
      });
      router.push("/thank-you");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div style={{ marginBottom: 4 }}>
        <h2 style={{ ...serif, margin: 0, fontSize: 26, color: T.ink }}>Book Your Stay</h2>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: T.muted }}>We&apos;ll call you back within 24 hours</p>
      </div>
      <form style={{ display: "flex", flexDirection: "column", gap: 12 }} onSubmit={handleSubmit}>
        <div>
          <label style={{ ...mono, fontSize: 10, textTransform: "uppercase", color: T.muted, display: "block", marginBottom: 5 }}>Room Type</label>
          <select name="roomType" required style={{
            width: "100%", padding: "11px 36px 11px 14px", borderRadius: 12,
            border: `1px solid ${T.line2}`, background: T.paper,
            fontSize: 14, color: T.ink, fontFamily: "inherit", outline: "none",
            appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236a7a78' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat", backgroundPosition: "calc(100% - 14px) center",
          }}>
            <option value="">Select room type</option>
            <option value="Triple Sharing (Non AC)">Triple Sharing (Non AC)</option>
            <option value="Double Sharing (Non AC)">Double Sharing (Non AC)</option>
            <option value="Single Sharing (Non AC)">Single Sharing (Non AC)</option>
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
                border: `1px solid ${T.line2}`, background: T.paper,
                fontSize: 14, color: T.ink, fontFamily: "inherit", outline: "none", boxSizing: "border-box",
              }}
            />
          </div>
        ))}
        <button type="submit" disabled={isSubmitting} style={{
          padding: "14px", borderRadius: 99, background: T.ink,
          color: "#fff", border: "none", fontWeight: 500, fontSize: 14.5,
          cursor: "pointer", marginTop: 4, opacity: isSubmitting ? 0.6 : 1,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          {isSubmitting ? "Submitting…" : <><span>Request Callback</span><Arrow /></>}
        </button>
        {error && <p style={{ fontSize: 13, color: "#c0392b", margin: 0 }}>{error}</p>}
      </form>
      <a href="tel:+919353477987" style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        padding: "12px", borderRadius: 99, background: T.paper,
        border: `1px solid ${T.line2}`, color: T.ink, textDecoration: "none",
        fontWeight: 500, fontSize: 13.5,
      }}>
        <Phone style={{ width: 14, height: 14 }} /> Call +91 9353477987
      </a>
    </>
  );
}

// ── Hero ──
function Hero({ onBook }: { onBook: () => void }) {

  return (
    <section style={{ padding: "100px 32px 0", maxWidth: 1280, margin: "0 auto" }}>
      {/* Eyebrow — full width */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "6px 12px", background: `${T.card}cc`, border: `1px solid ${T.line2}`,
          borderRadius: 99, fontSize: 13, color: T.muted,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: 99, background: "#2eb86c" }} />
          Girls-Only · 100m from Christ University, Bangalore
        </span>
        <div style={{ ...mono, fontSize: 11, color: T.muted, textTransform: "uppercase" }}>
          est. 2026 — premium student living
        </div>
      </div>

      {/* Single 2-column grid: left = headline + image, right = floating card + featured card */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.55fr) minmax(320px, 1fr)",
        gridTemplateRows: "auto 1fr",
        gap: 18,
      }} className="hero-grid">

        {/* LEFT TOP — Headline */}
        <div style={{ gridColumn: 1, gridRow: 1, alignSelf: "end", paddingBottom: 18 }}>
          <h1 style={{
            ...serif,
            fontSize: "clamp(56px, 7.5vw, 112px)",
            lineHeight: 0.93, letterSpacing: "-0.025em",
            color: T.ink, margin: 0,
          }}>
            Premium Living.<br />
            <span style={{ fontStyle: "italic", color: T.sage }}>A stay that matters.</span>
          </h1>
        </div>

        {/* RIGHT TOP — Floating offer card */}
        <div style={{ gridColumn: 2, gridRow: 1, display: "flex", alignItems: "flex-end" }}>
          <div className="float-card" style={{
            background: T.ink, color: "#fff",
            borderRadius: 24, padding: "24px 26px",
            boxShadow: `0 24px 64px -12px ${T.ink}60, 0 8px 24px -8px ${T.ink}30`,
            width: "100%",
          }}>
            <div style={{ fontSize: 26, marginBottom: 10 }}>🎉</div>
            <div style={{ ...serif, fontSize: 34, fontStyle: "italic", lineHeight: 1.05, marginBottom: 10, color: T.mint }}>
              1 Month<br />Stay FREE
            </div>
            <div style={{ fontSize: 13, opacity: 0.75, lineHeight: 1.6, marginBottom: 18 }}>
              Pay for 11 months and get your 12th month absolutely free. No hidden fees.
            </div>
          </div>
        </div>

        {/* LEFT BOTTOM — Hero image */}
        <div style={{ gridColumn: 1, gridRow: 2, position: "relative", borderRadius: 24, overflow: "hidden", minHeight: 460 }}>
          <img
            src="/img1.jpeg"
            alt="Livoza Girls PG — Premium furnished room near Christ University"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div style={{ position: "absolute", top: 18, left: 18, display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{
              padding: "7px 12px", borderRadius: 99,
              background: "#ffffffd9", backdropFilter: "blur(8px)",
              fontSize: 12.5, fontWeight: 500, color: T.ink,
              display: "inline-flex", alignItems: "center", gap: 6,
            }}>
              <MapPin style={{ width: 13, height: 13 }} /> 2 min walk to campus
            </span>
            <span style={{
              padding: "7px 12px", borderRadius: 99,
              background: "#ffffffd9", backdropFilter: "blur(8px)",
              fontSize: 12.5, fontWeight: 500, color: T.ink,
            }}>Girls-Only</span>
          </div>
          <div style={{ position: "absolute", bottom: 18, left: 18, display: "flex", gap: 6 }}>
            {[0,1,2,3].map(i => (
              <span key={i} style={{
                width: i === 0 ? 24 : 6, height: 6, borderRadius: 99,
                background: i === 0 ? T.mint : `${T.mint}80`,
              }} />
            ))}
          </div>
        </div>

        {/* RIGHT BOTTOM — Inline booking form */}
        <aside style={{
          gridColumn: 2, gridRow: 2,
          background: T.card, borderRadius: 24, padding: "24px 22px",
          display: "flex", flexDirection: "column", gap: 14,
          border: `1px solid ${T.line2}`,
        }}>
          <HeroBookForm />
        </aside>
      </div>
    </section>
  );
}

// ── Trustbar ──
function Trustbar() {
  const items = ["Girls-Only PG", "100m from Christ University", "Fully Furnished Rooms", "24/7 Security", "1 Month Free"];
  return (
    <div style={{
      maxWidth: 1280, margin: "28px auto 0", padding: "0 32px",
    }}>
      <div style={{
        borderTop: `1px solid ${T.line2}`, borderBottom: `1px solid ${T.line2}`,
        padding: "14px 0",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        gap: 20, color: T.muted, fontSize: 13.5, flexWrap: "wrap",
      }}>
        <span style={{ ...mono, fontSize: 11, textTransform: "uppercase", color: T.sage }}>
          ✦ premium girls pg · bangalore
        </span>
        <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
          {items.map(x => (
            <span key={x} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: T.sage }}><Check /></span> {x}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Facilities ──
function Facilities() {
  const facilities = [
    { icon: "🫧", title: "Washing Machine", desc: "In-room for your convenience" },
    { icon: "🥶", title: "Refrigerator", desc: "Personal fridge in every room" },
    { icon: "🍳", title: "Microwave / Oven", desc: "Kitchen appliances for easy cooking" },
    { icon: "📺", title: "Smart TV", desc: "Entertainment in every room" },
    { icon: "🛋️", title: "Furnished Rooms", desc: "Bed, wardrobe, desk & more" },
    { icon: "🛡️", title: "24/7 Security", desc: "Girls-only security always on" },
    { icon: "🌿", title: "Balcony", desc: "Every room has a balcony" },
    { icon: "⚡", title: "Power Backup", desc: "Uninterrupted electricity" },
    { icon: "📶", title: "High-Speed WiFi", desc: "Fast internet throughout" },
  ];

  return (
    <section id="facilities" style={{ padding: "80px 32px 0", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, gap: 24, flexWrap: "wrap" }}>
        <div>
          <div style={{ ...mono, fontSize: 11, color: T.muted, textTransform: "uppercase", marginBottom: 8 }}>
            ⁂ facilities
          </div>
          <h2 style={{ ...serif, margin: 0, fontSize: "clamp(44px, 7vw, 80px)", lineHeight: 1, letterSpacing: "-0.02em", color: T.ink }}>
            Every room,{" "}
            <span style={{ fontStyle: "italic", color: T.sage }}>fully equipped.</span>
          </h2>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 }} className="facilities-grid">
        {facilities.map(f => (
          <div key={f.title} style={{
            background: T.card, borderRadius: 20, padding: "20px 22px",
            border: `1px solid ${T.line2}`,
            display: "flex", gap: 16, alignItems: "flex-start",
          }}>
            <span style={{
              width: 44, height: 44, borderRadius: 14, background: T.mint,
              display: "grid", placeItems: "center", fontSize: 22, flexShrink: 0,
            }}>{f.icon}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, color: T.ink, letterSpacing: "-0.01em" }}>{f.title}</div>
              <div style={{ color: T.muted, fontSize: 13, marginTop: 3, lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── How it works ──
function HowItWorks() {
  const steps = [
    {
      n: "01", title: "Pick your room type",
      body: "Choose between triple, double, or single sharing. All rooms are fully furnished and steps from Christ University.",
      img: "/triplebed.jpeg",
    },
    {
      n: "02", title: "Book your slot",
      body: "Fill the form or call us. Pay the booking advance to secure your room — refundable if plans change.",
      img: "/doublebed.jpeg",
    },
    {
      n: "03", title: "Move in & settle",
      body: "Sign the agreement and move in. Everything's ready — bed, appliances, security. Focus on your studies.",
      img: "/img1.jpeg",
    },
  ];

  return (
    <section style={{ padding: "80px 32px 0", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, gap: 24, flexWrap: "wrap" }}>
        <div>
          <div style={{ ...mono, fontSize: 11, color: T.muted, textTransform: "uppercase", marginBottom: 8 }}>⁂ how it works</div>
          <h2 style={{ ...serif, margin: 0, fontSize: "clamp(44px, 7vw, 80px)", lineHeight: 1, letterSpacing: "-0.02em", color: T.ink }}>
            Three steps,{" "}
            <span style={{ fontStyle: "italic", color: T.sage }}>keys in hand.</span>
          </h2>
        </div>
        <p style={{ maxWidth: 300, color: T.muted, fontSize: 14, lineHeight: 1.6, margin: 0 }}>
          Built for students coming to Christ University. We handle the parts your parents keep worrying about.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }} className="steps-grid">
        {steps.map(s => (
          <div key={s.n} style={{
            background: T.card, borderRadius: 22, overflow: "hidden",
            border: `1px solid ${T.line2}`,
            display: "flex", flexDirection: "column", gap: 0,
          }}>
            <div style={{ height: 180 }}>
              <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
            <div style={{ padding: "18px 20px 22px" }}>
              <div style={{ ...mono, fontSize: 11, color: T.sage, marginBottom: 6 }}>{s.n}</div>
              <h3 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", color: T.ink }}>{s.title}</h3>
              <p style={{ margin: 0, color: T.muted, fontSize: 13.5, lineHeight: 1.6 }}>{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Room card ──
function RoomCard({ room, onBook }: {
  room: {
    name: string; badge: string; image: string; advancePayment: string;
    maintenance: string; bookingAdvance: string; totalInitial: string;
    moveInAmount: string; annualTotal: string; desc: string;
  };
  onBook: () => void;
}) {
  return (
    <article style={{
      background: T.card, borderRadius: 22, overflow: "hidden",
      border: `1px solid ${T.line2}`,
      display: "flex", flexDirection: "column",
    }}>
      <div style={{ position: "relative", height: 220 }}>
        <img src={room.image} alt={room.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 6 }}>
          <span style={{
            background: T.ink, color: "#fff", padding: "5px 10px",
            borderRadius: 99, fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
          }}>{room.badge}</span>
          <span style={{
            background: "#ffffffd9", color: T.ink, padding: "5px 10px",
            borderRadius: 99, fontSize: 11, fontWeight: 600,
          }}>🎉 1 Month Free</span>
        </div>
        <button style={{
          position: "absolute", top: 12, right: 12, width: 34, height: 34, borderRadius: 99,
          background: "#ffffffd9", border: "none", display: "grid", placeItems: "center", cursor: "pointer",
          color: T.ink,
        }}><Bookmark /></button>
        <div style={{
          position: "absolute", bottom: 12, right: 12,
          padding: "5px 10px", borderRadius: 99, background: "#1d393699",
          color: "#fff", fontSize: 11.5, fontWeight: 500,
        }}>Girls Only</div>
      </div>

      <div style={{ padding: "18px 18px 20px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em", color: T.ink }}>{room.name}</h3>
          <div style={{ ...serif, fontSize: 24, letterSpacing: "-0.02em", lineHeight: 1, color: T.ink }}>
            ₹ *<span style={{ fontSize: 11, color: T.muted, fontFamily: "inherit" }}></span>
          </div>
        </div>

        <div style={{ color: T.muted, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
          <MapPin style={{ width: 13, height: 13 }} /> Christ University · 100m
        </div>

        {/* Pricing table */}
        {/* <div style={{
          background: T.paper, borderRadius: 14, padding: "12px 14px",
          display: "flex", flexDirection: "column", gap: 6,
        }}>
          {[
            ["Advance Payment", room.advancePayment, false],
            ["Maintenance (one-time)", room.maintenance, false],
            ["Booking Advance", room.bookingAdvance, false],
            ["Total Initial", room.totalInitial, false],
          ].map(([k, v, bold]) => (
            <div key={String(k)} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5 }}>
              <span style={{ color: T.muted }}>{k}</span>
              <span style={{ fontWeight: bold ? 700 : 600, color: T.ink2 }}>{v}</span>
            </div>
          ))}
          <div style={{ height: 1, background: T.line2, margin: "4px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 700 }}>
            <span style={{ color: T.sage }}>Annual Total</span>
            <span style={{ color: T.ink }}>{room.annualTotal}</span>
          </div>
        </div> */}

        <p style={{ color: T.muted, fontSize: 13, margin: 0, lineHeight: 1.5 }}>{room.desc}</p>

        <button onClick={onBook} style={{
          marginTop: "auto", padding: "13px", borderRadius: 99, background: T.ink,
          color: "#fff", border: "none", fontWeight: 500, fontSize: 13.5, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          Check Availability <Arrow />
        </button>
      </div>
    </article>
  );
}

// ── Rooms section ──
function Rooms({ onBook }: { onBook: () => void }) {
  const rooms = [
    {
      name: "Triple Sharing (Non AC)",
      badge: "Best Value",
      image: "/triplebed.jpeg",
      advancePayment: "₹33,000",
      maintenance: "₹10,000",
      bookingAdvance: "₹20,000",
      totalInitial: "₹59,500",
      moveInAmount: "₹39,500",
      annualTotal: "₹1,98,100",
      desc: "Most affordable option, ideal for students on a budget.",
    },
    {
      name: "Double Sharing (Non AC)",
      badge: "Most Popular",
      image: "/doublebed.jpeg",
      advancePayment: "₹38,000",
      maintenance: "₹10,000",
      bookingAdvance: "₹20,000",
      totalInitial: "₹67,000",
      moveInAmount: "₹47,000",
      annualTotal: "₹2,26,600",
      desc: "A comfortable balance of privacy and affordability.",
    },
    {
      name: "Single Sharing (Non AC)",
      badge: "Premium",
      image: "/img1.jpeg",
      advancePayment: "₹70,000",
      maintenance: "₹10,000",
      bookingAdvance: "₹30,000",
      totalInitial: "₹1,15,000",
      moveInAmount: "₹85,000",
      annualTotal: "₹4,09,000",
      desc: "Complete privacy with a fully furnished private room.",
    },
  ];

  return (
    <section id="rooms" style={{ padding: "80px 32px 0", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, gap: 24, flexWrap: "wrap" }}>
        <div>
          <div style={{ ...mono, fontSize: 11, color: T.muted, textTransform: "uppercase", marginBottom: 8 }}>
            ⁂ room types
          </div>
          <h2 style={{ ...serif, margin: 0, fontSize: "clamp(44px, 7vw, 80px)", lineHeight: 1, letterSpacing: "-0.02em", color: T.ink }}>
            Choose your room,{" "}
            <span style={{ fontStyle: "italic", color: T.sage }}>your space.</span>
          </h2>
        </div>
        <button onClick={onBook} style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          fontSize: 14, fontWeight: 500, background: "none", border: "none",
          cursor: "pointer", color: T.ink,
        }}>
          Book a room <Arrow />
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 18 }} className="rooms-grid">
        {rooms.map(r => <RoomCard key={r.name} room={r} onBook={onBook} />)}
      </div>
    </section>
  );
}

// // ── Facilities ──
// function Facilities() {
//   const facilities = [
//     { icon: "🫧", title: "Washing Machine", desc: "In-room for your convenience" },
//     { icon: "🥶", title: "Refrigerator", desc: "Personal fridge in every room" },
//     { icon: "🍳", title: "Microwave / Oven", desc: "Kitchen appliances for easy cooking" },
//     { icon: "📺", title: "Smart TV", desc: "Entertainment in every room" },
//     { icon: "🛋️", title: "Furnished Rooms", desc: "Bed, wardrobe, desk & more" },
//     { icon: "🛡️", title: "24/7 Security", desc: "Girls-only security always on" },
//     { icon: "🌿", title: "Balcony", desc: "Every room has a balcony" },
//     { icon: "⚡", title: "Power Backup", desc: "Uninterrupted electricity" },
//     { icon: "📶", title: "High-Speed WiFi", desc: "Fast internet throughout" },
//   ];

//   return (
//     <section id="facilities" style={{ padding: "80px 32px 0", maxWidth: 1280, margin: "0 auto" }}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, gap: 24, flexWrap: "wrap" }}>
//         <div>
//           <div style={{ ...mono, fontSize: 11, color: T.muted, textTransform: "uppercase", marginBottom: 8 }}>
//             ⁂ facilities
//           </div>
//           <h2 style={{ ...serif, margin: 0, fontSize: "clamp(44px, 7vw, 80px)", lineHeight: 1, letterSpacing: "-0.02em", color: T.ink }}>
//             Every room,{" "}
//             <span style={{ fontStyle: "italic", color: T.sage }}>fully equipped.</span>
//           </h2>
//         </div>
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16 }} className="facilities-grid">
//         {facilities.map(f => (
//           <div key={f.title} style={{
//             background: T.card, borderRadius: 20, padding: "20px 22px",
//             border: `1px solid ${T.line2}`,
//             display: "flex", gap: 16, alignItems: "flex-start",
//           }}>
//             <span style={{
//               width: 44, height: 44, borderRadius: 14, background: T.mint,
//               display: "grid", placeItems: "center", fontSize: 22, flexShrink: 0,
//             }}>{f.icon}</span>
//             <div>
//               <div style={{ fontWeight: 600, fontSize: 15, color: T.ink, letterSpacing: "-0.01em" }}>{f.title}</div>
//               <div style={{ color: T.muted, fontSize: 13, marginTop: 3, lineHeight: 1.5 }}>{f.desc}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// // ── How it works ──
// function HowItWorks() {
//   const steps = [
//     {
//       n: "01", title: "Pick your room type",
//       body: "Choose between triple, double, or single sharing. All rooms are fully furnished and steps from Christ University.",
//       img: "/triplebed.jpeg",
//     },
//     {
//       n: "02", title: "Book your slot",
//       body: "Fill the form or call us. Pay the booking advance to secure your room — refundable if plans change.",
//       img: "/doublebed.jpeg",
//     },
//     {
//       n: "03", title: "Move in & settle",
//       body: "Sign the agreement and move in. Everything's ready — bed, appliances, security. Focus on your studies.",
//       img: "/img1.jpeg",
//     },
//   ];

//   return (
//     <section style={{ padding: "80px 32px 0", maxWidth: 1280, margin: "0 auto" }}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, gap: 24, flexWrap: "wrap" }}>
//         <div>
//           <div style={{ ...mono, fontSize: 11, color: T.muted, textTransform: "uppercase", marginBottom: 8 }}>⁂ how it works</div>
//           <h2 style={{ ...serif, margin: 0, fontSize: "clamp(44px, 7vw, 80px)", lineHeight: 1, letterSpacing: "-0.02em", color: T.ink }}>
//             Three steps,{" "}
//             <span style={{ fontStyle: "italic", color: T.sage }}>keys in hand.</span>
//           </h2>
//         </div>
//         <p style={{ maxWidth: 300, color: T.muted, fontSize: 14, lineHeight: 1.6, margin: 0 }}>
//           Built for students coming to Christ University. We handle the parts your parents keep worrying about.
//         </p>
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }} className="steps-grid">
//         {steps.map(s => (
//           <div key={s.n} style={{
//             background: T.card, borderRadius: 22, overflow: "hidden",
//             border: `1px solid ${T.line2}`,
//             display: "flex", flexDirection: "column", gap: 0,
//           }}>
//             <div style={{ height: 180 }}>
//               <img src={s.img} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
//             </div>
//             <div style={{ padding: "18px 20px 22px" }}>
//               <div style={{ ...mono, fontSize: 11, color: T.sage, marginBottom: 6 }}>{s.n}</div>
//               <h3 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em", color: T.ink }}>{s.title}</h3>
//               <p style={{ margin: 0, color: T.muted, fontSize: 13.5, lineHeight: 1.6 }}>{s.body}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

// ── Stats ──
function Stats() {
  return (
    <section id="about" style={{ padding: "80px 32px 0", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{
        background: T.ink, borderRadius: 28, padding: "48px 56px",
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        gap: 0, position: "relative", overflow: "hidden",
      }} className="stats-grid">
        {[
          { num: "100m", label: "From Christ University" },
          { num: "2 min", label: "Walk to Campus" },
          { num: "3+", label: "Room Types Available" },
          { num: "24/7", label: "Girls-Only Security" },
        ].map((s, i) => (
          <div key={s.label} style={{
            textAlign: "center", padding: "0 24px",
            borderRight: i < 3 ? `1px solid #ffffff1a` : "none",
          }}>
            <div style={{ ...serif, fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1, color: T.mint, marginBottom: 8, fontStyle: "italic" }}>
              {s.num}
            </div>
            <div style={{ fontSize: 13, color: "#ffffff80", letterSpacing: "0.04em" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Testimonials ──
function Testimonials() {
  return (
    <section style={{ padding: "80px 32px 0", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{
        background: T.ink, color: "#fff", borderRadius: 28,
        padding: "56px 56px 48px",
        display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 48,
        position: "relative", overflow: "hidden",
      }} className="testimonial-grid">
        <div>
          <div style={{ ...mono, fontSize: 11, opacity: 0.55, letterSpacing: ".12em", textTransform: "uppercase" }}>
            resident · christ university, bangalore
          </div>
          <p style={{
            ...serif,
            fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1.08, letterSpacing: "-0.02em",
            margin: "18px 0 0", fontStyle: "italic", color: "#fff",
          }}>
            "Found a fully furnished room 100 metres from campus. Everything appliances, security, community all sorted before my first lecture."
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 32 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 99,
              background: `linear-gradient(135deg, ${T.mint}, ${T.sage})`,
            }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>Meera S.</div>
              <div style={{ fontSize: 12, opacity: 0.6 }}>Moved in 2025 · Christ University student</div>
            </div>
          </div>
        </div>

        <div style={{
          background: "#ffffff0d", borderRadius: 20, padding: 28,
          display: "flex", flexDirection: "column", gap: 20,
          border: "1px solid #ffffff1a",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ ...mono, fontSize: 11, opacity: 0.6, letterSpacing: ".1em", textTransform: "uppercase" }}>
              Livoza at a glance
            </div>
            <span style={{ fontSize: 11, padding: "3px 8px", background: "#ffffff14", borderRadius: 99 }}>2026–27</span>
          </div>
          {[
            ["₹0", "broker or hidden fees — ever"],
            ["12 months", "lease with 1 month free"],
            ["100m", "from Christ University campus"],
            ["24/7", "girls-only security & support"],
          ].map(([k, v]) => (
            <div key={String(k)} style={{
              display: "flex", justifyContent: "space-between", alignItems: "baseline",
              borderBottom: "1px solid #ffffff14", paddingBottom: 14,
            }}>
              <span style={{ ...serif, fontSize: 32, letterSpacing: "-0.02em", color: T.mint }}>{k}</span>
              <span style={{ fontSize: 12.5, opacity: 0.7, textAlign: "right", maxWidth: 140 }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Final CTA ──
function FinalCTA({ onBook }: { onBook: () => void }) {
  return (
    <section style={{ padding: "80px 32px 60px", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{
        position: "relative", padding: "80px 56px",
        background: `linear-gradient(180deg, ${T.paper2} 0%, ${T.mint} 100%)`,
        borderRadius: 28, overflow: "hidden",
        border: `1px solid ${T.line2}`,
      }}>
        <div style={{ ...mono, fontSize: 11, color: T.muted, textTransform: "uppercase", opacity: 0.7 }}>
          ✦ rooms available now
        </div>
        <h2 style={{
          ...serif,
          margin: "14px 0 0",
          fontSize: "clamp(60px, 10vw, 160px)", lineHeight: 0.9,
          letterSpacing: "-0.03em", color: T.ink,
        }}>
          Find your room,<br /><span style={{ fontStyle: "italic", color: T.sage }}>by this Friday.</span>
        </h2>

        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          marginTop: 48, gap: 24, flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={onBook} style={{
              padding: "16px 28px", borderRadius: 99, background: T.ink,
              color: "#fff", border: "none", fontWeight: 500, fontSize: 15,
              display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
            }}>Book a room now <Arrow /></button>
            <a href="tel:+919353477987" style={{
              padding: "16px 24px", borderRadius: 99, background: "transparent",
              border: `1px solid ${T.ink}44`, fontWeight: 500, fontSize: 15, cursor: "pointer",
              color: T.ink, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8,
            }}>
              <Phone style={{ width: 16, height: 16 }} /> Call +91 9353477987
            </a>
          </div>
          <div style={{ maxWidth: 280, color: T.muted, fontSize: 13.5, lineHeight: 1.5 }}>
            Free to enquire. Pay the booking advance only when you're ready to confirm. No hidden fees.
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Contact ──
function Contact({
  onSubmit, isSubmitting, error, submitted,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean; error: string | null; submitted: boolean;
}) {
  return (
    <section id="contact" style={{ padding: "0 32px 80px", maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="contact-grid">
        <div>
          <div style={{ ...mono, fontSize: 11, color: T.muted, textTransform: "uppercase", marginBottom: 8 }}>
            contact livoza
          </div>
          <h2 style={{ ...serif, margin: "0 0 14px", fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1, letterSpacing: "-0.02em", color: T.ink }}>
            Request a<br /><span style={{ fontStyle: "italic", color: T.sage }}>callback.</span>
          </h2>
          <p style={{ color: T.muted, fontSize: 14.5, lineHeight: 1.6, margin: "0 0 32px" }}>
            Interested in Livoza Girls PG? Fill the form and our team will call back within 24 hours.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { icon: "📍", label: "Location", value: "100m from Christ University, Bangalore" },
              { icon: "📞", label: "Phone", value: "+91 9353477987 · +91 8360669796" },
              { icon: "✉️", label: "Email", value: "info@livoza.com" },
            ].map(c => (
              <div key={c.label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{
                  width: 40, height: 40, borderRadius: 12, background: T.mint,
                  display: "grid", placeItems: "center", fontSize: 18, flexShrink: 0,
                }}>{c.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: T.ink }}>{c.label}</div>
                  <div style={{ color: T.muted, fontSize: 13.5, marginTop: 2 }}>{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: T.card, borderRadius: 24, padding: "32px 28px",
          border: `1px solid ${T.line2}`,
        }}>
          {submitted ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingTop: 16 }}>
              <div style={{ background: T.mint, borderRadius: 16, padding: "18px 20px", border: `1px solid ${T.mint2}` }}>
                <div style={{ fontWeight: 600, fontSize: 15, color: T.ink, marginBottom: 4 }}>Request received!</div>
                <div style={{ color: T.muted, fontSize: 13.5 }}>We&apos;ll call you back within 24 hours.</div>
              </div>
              <a href="tel:+919353477987" style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                background: T.ink, color: "#fff", padding: "14px 24px", borderRadius: 99,
                fontWeight: 500, fontSize: 14, textDecoration: "none",
              }}>
                <Phone style={{ width: 16, height: 16 }} /> Or call us: +91 9353477987
              </a>
            </div>
          ) : (
            <form style={{ display: "flex", flexDirection: "column", gap: 16 }} onSubmit={onSubmit}>
              {[
                { label: "Full Name *", name: "fullName", type: "text", required: true, placeholder: "Your full name" },
                { label: "Phone Number *", name: "phoneNumber", type: "tel", required: true, placeholder: "+91 XXXXX XXXXX" },
                { label: "Email Address", name: "emailAddress", type: "email", required: false, placeholder: "your@email.com" },
              ].map(f => (
                <div key={f.name}>
                  <label style={{ ...mono, fontSize: 10, textTransform: "uppercase", color: T.muted, display: "block", marginBottom: 6 }}>
                    {f.label}
                  </label>
                  <input
                    type={f.type} name={f.name} required={f.required} placeholder={f.placeholder}
                    style={{
                      width: "100%", padding: "12px 16px", borderRadius: 12,
                      border: `1px solid ${T.line2}`, background: T.paper,
                      fontSize: 14, color: T.ink, outline: "none",
                      fontFamily: "inherit", boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}
              <div>
                <label style={{ ...mono, fontSize: 10, textTransform: "uppercase", color: T.muted, display: "block", marginBottom: 6 }}>
                  Message
                </label>
                <textarea
                  name="message" rows={3} placeholder="Tell us your requirements…"
                  style={{
                    width: "100%", padding: "12px 16px", borderRadius: 12,
                    border: `1px solid ${T.line2}`, background: T.paper,
                    fontSize: 14, color: T.ink, outline: "none",
                    fontFamily: "inherit", resize: "none", boxSizing: "border-box",
                  }}
                />
              </div>
              <button type="submit" disabled={isSubmitting} style={{
                padding: "14px", borderRadius: 99, background: T.ink,
                color: "#fff", border: "none", fontWeight: 500, fontSize: 14.5,
                cursor: "pointer", opacity: isSubmitting ? 0.6 : 1,
              }}>
                {isSubmitting ? "Submitting…" : "Request Callback"}
              </button>
              {error && (
                <p style={{ fontSize: 13, color: "#c0392b", margin: 0 }}>{error}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ── Footer ──
function Footer() {
  const cols = [
    ["Quick Links", ["Rooms", "Facilities", "About", "Contact"]],
    ["Room Types", ["Triple Sharing", "Double Sharing", "Single Sharing"]],
    ["Contact", ["+91 9353477987", "+91 8360669796", "info@livoza.com"]],
  ];
  return (
    <footer style={{ borderTop: `1px solid ${T.line2}`, padding: "40px 32px 28px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 32 }} className="footer-grid">
          <div>
            <Logo />
            <p style={{ color: T.muted, fontSize: 13.5, lineHeight: 1.6, margin: "16px 0 0", maxWidth: 280 }}>
              Girls-only PG near Christ University — 100m from campus. Fully furnished with washing machine, fridge, oven, Smart TV, and 24/7 security.
            </p>
            <div style={{ ...mono, marginTop: 24, fontSize: 11, color: T.muted, textTransform: "uppercase" }}>
              © 2026 — all rights reserved
            </div>
          </div>
          {cols.map(([h, items]) => (
            <div key={String(h)}>
              <div style={{ ...mono, fontSize: 11, color: T.muted, textTransform: "uppercase", marginBottom: 14 }}>{h}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {(items as string[]).map(x => (
                  <li key={x}><a href="#" style={{ fontSize: 14, color: T.ink2, textDecoration: "none", opacity: 0.8 }}>{x}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{
          paddingTop: 18, borderTop: `1px solid ${T.line2}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: 12, color: T.muted, flexWrap: "wrap", gap: 8,
        }}>
          <span>Privacy Policy · Terms</span>
          <span style={{ ...mono }}>Powered by Dragon Ventures</span>
        </div>
      </div>
    </footer>
  );
}

// ── Book Modal ──
function BookModal({ open, onClose }: { open: boolean; onClose: () => void }) {
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
      });
      router.push("/thank-you");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "#00000060", backdropFilter: "blur(4px)", padding: 16,
    }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        background: T.paper, borderRadius: 24, maxWidth: 420, width: "100%",
        padding: "32px 28px", position: "relative",
        border: `1px solid ${T.line2}`,
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 18, right: 18, width: 32, height: 32,
          borderRadius: 99, background: T.mint, border: "none",
          display: "grid", placeItems: "center", cursor: "pointer", fontSize: 18, color: T.ink,
        }}>×</button>
        <div style={{ marginBottom: 22 }}>
          <h2 style={{ ...serif, margin: 0, fontSize: 28, color: T.ink }}>Book Your Stay</h2>
          <p style={{ margin: "6px 0 0", fontSize: 13.5, color: T.muted }}>We&apos;ll call you back within 24 hours</p>
        </div>
        <form style={{ display: "flex", flexDirection: "column", gap: 14 }} onSubmit={handleSubmit}>
          <div>
            <label style={{ ...mono, fontSize: 10, textTransform: "uppercase", color: T.muted, display: "block", marginBottom: 5 }}>Room Type</label>
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
          <button type="submit" disabled={isSubmitting} style={{
            padding: "14px", borderRadius: 99, background: T.ink,
            color: "#fff", border: "none", fontWeight: 500, fontSize: 14.5,
            cursor: "pointer", marginTop: 4, opacity: isSubmitting ? 0.6 : 1,
          }}>
            {isSubmitting ? "Submitting…" : "Request Callback"}
          </button>
          {error && <p style={{ fontSize: 13, color: "#c0392b", margin: 0 }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

// ── Main page ──
export default function Home() {
  const router = useRouter();
  const [bookOpen, setBookOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);

  const createContactSubmission = useMutation(api.forms.createContactSubmission);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isContactSubmitting) return;
    setIsContactSubmitting(true);
    setContactError(null);
    try {
      const fd = new FormData(e.currentTarget);
      await createContactSubmission({
        fullName: String(fd.get("fullName") ?? "").trim(),
        phoneNumber: String(fd.get("phoneNumber") ?? "").trim(),
        emailAddress: String(fd.get("emailAddress") ?? "").trim() || undefined,
        message: String(fd.get("message") ?? "").trim() || undefined,
      });
      router.push("/thank-you");
    } catch (err) {
      setContactError(err instanceof Error ? err.message : "Failed to submit.");
    } finally {
      setIsContactSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        body { background: ${T.paper}; }
        @keyframes floatBob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .float-card {
          animation: floatBob 4s ease-in-out infinite;
        }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; grid-template-rows: auto !important; }
          .hero-grid > * { grid-column: 1 !important; grid-row: auto !important; }
          .rooms-grid { grid-template-columns: 1fr !important; }
          .facilities-grid { grid-template-columns: 1fr 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; padding: 32px 24px !important; }
          .testimonial-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .mobile-menu-btn { display: grid !important; }
          .mobile-cta { display: block !important; }
          nav { display: none !important; }
          .desktop-nav-btns { display: none !important; }
          .float-card { max-width: 100% !important; }
        }
        @media (max-width: 480px) {
          .facilities-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ background: T.paper, minHeight: "100vh", color: T.ink, fontFamily: "var(--font-poppins), ui-sans-serif, system-ui, sans-serif" }}>
        <Nav onBook={() => setBookOpen(true)} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <Hero onBook={() => setBookOpen(true)} />
        <Trustbar />
        <Facilities />
        <Rooms onBook={() => setBookOpen(true)} />
        <Stats />
        <HowItWorks />
        <Testimonials />
        <FinalCTA onBook={() => setBookOpen(true)} />
        <Contact
          onSubmit={handleContactSubmit}
          isSubmitting={isContactSubmitting}
          error={contactError}
          submitted={contactSubmitted}
        />
        <Footer />

        {/* Mobile floating CTA */}
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 70,
          background: `${T.paper}f2`, backdropFilter: "blur(8px)",
          borderTop: `1px solid ${T.line2}`, padding: "12px 16px",
          display: "none",
        }} className="mobile-cta">
          <div style={{ display: "flex", gap: 10, maxWidth: 480, margin: "0 auto" }}>
            <a href="tel:+919353477987" style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              background: T.mint, color: T.ink, padding: "13px", borderRadius: 99,
              fontWeight: 600, fontSize: 14, textDecoration: "none",
            }}>
              <Phone style={{ width: 16, height: 16 }} /> Call Now
            </a>
            <button onClick={() => setBookOpen(true)} style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              background: T.ink, color: "#fff", padding: "13px", borderRadius: 99,
              fontWeight: 600, fontSize: 14, border: "none", cursor: "pointer",
            }}>
              <Calendar style={{ width: 16, height: 16 }} /> Book Now
            </button>
          </div>
        </div>

        <BookModal open={bookOpen} onClose={() => setBookOpen(false)} />
      </div>
    </>
  );
}
