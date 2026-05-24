"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ReferralLanding() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const goToSignIn = () => router.push("/sign-in");
  const goToSignUp = () => router.push("/sign-up");

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText("livoza.com/r/your-link");
    } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div
      style={{
        maxWidth: 1440,
        width: "100%",
        margin: "0 auto",
        background: "linear-gradient(180deg, #f1ece2 0%, #e7e1d2 50%, #dee8e6 100%)",
        minHeight: "100vh",
        fontFamily: "'Geist', ui-sans-serif, system-ui, sans-serif",
        WebkitFontSmoothing: "antialiased",
        overflowX: "hidden",
      }}
    >
      {/* Nav */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "16px 20px" : "22px 40px",
          gap: 16,
        }}
      >
        <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img
            src="/Livoza-Logo-new.png"
            alt="Livoza"
            style={{ height: 38, width: "auto", display: "block" }}
          />
        </a>

        <nav style={{ display: isMobile ? "none" : "flex", gap: 28, fontSize: 14.5, color: "#1d3936" }}>
          {/* {["Browse", "Universities", "Roommates", "Hosts"].map((item) => (
            <a
              key={item}
              href="/"
              style={{ opacity: 0.72, fontWeight: 500, textDecoration: "none", color: "inherit" }}
            >
              {item}
            </a>
          ))} */}
          <a
            href="/referral"
            style={{
              opacity: 1,
              fontWeight: 600,
              textDecoration: "none",
              color: "#154f4c",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            Refer
            <span
              style={{
                fontSize: 10,
                padding: "2px 6px",
                borderRadius: 99,
                background: "#dee8e6",
                color: "#154f4c",
                fontWeight: 600,
              }}
            >
              ₹8,000/booking
            </span>
          </a>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={goToSignIn}
            style={{
              padding: "10px 14px",
              border: "1px solid #154f4c1f",
              background: "#fff",
              borderRadius: 99,
              fontSize: 13.5,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Sign in
          </button>
          <button
            onClick={goToSignUp}
            style={{
              padding: "10px 18px",
              borderRadius: 99,
              background: "#154f4c",
              color: "#fff",
              border: "none",
              fontSize: 13.5,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Get started
          </button>
        </div>
      </header>

      {/* Hero */}
      <section style={{ padding: isMobile ? "16px 20px 60px" : "24px 40px 96px" }}>
        {/* Top row */}
        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "flex-end",
            gap: isMobile ? 8 : 24,
            marginBottom: isMobile ? 20 : 28,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#6a7a78", fontSize: 13 }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 10px",
                background: "#ffffffb3",
                border: "1px solid #154f4c1f",
                borderRadius: 99,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 99,
                  background: "#b8744a",
                  boxShadow: "0 0 0 4px #b8744a22",
                  display: "inline-block",
                }}
              />
              Referral program · earn ₹8,000 per booking
            </span>
            {!isMobile && <span style={{ opacity: 0.6 }}>Pays out the day your friend books</span>}
          </div>
          {!isMobile && (
          <div
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: 11,
              color: "#6a7a78",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            ed.01 — section.refer
          </div>
          )}
        </div>

        {/* Headline */}
        <h1
          style={{
            margin: "0 0 28px",
            fontFamily: "'Instrument Serif', serif",
            fontWeight: 400,
            fontSize: "clamp(64px, 9.2vw, 148px)",
            lineHeight: 0.92,
            letterSpacing: "-0.025em",
            color: "#154f4c",
          }}
        >
          Refer a friend,
          <br />
          <span style={{ fontStyle: "italic", color: "#5d8b87" }}>earn ₹8,000 each time.</span>
        </h1>

        {/* Hero grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "minmax(0, 1.55fr) minmax(360px, 1fr)",
            gap: 18,
            alignItems: "stretch",
          }}
        >
          {/* Left: dark share card */}
          <div
            style={{
              position: "relative",
              borderRadius: 24,
              overflow: "hidden",
              background: "radial-gradient(120% 100% at 0% 0%, #1a5e5a 0%, #154f4c 45%, #0e3a37 100%)",
              color: "#fff",
              padding: isMobile ? "24px 20px 20px" : "36px 40px 32px",
              display: "flex",
              flexDirection: "column",
              gap: 28,
              minHeight: 520,
              boxShadow: "0 1px 0 #0000000a, 0 30px 60px -40px #15141033",
            }}
          >
            {/* Diagonal stripes overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "repeating-linear-gradient(135deg, #ffffff0a 0 1px, transparent 1px 14px)",
                pointerEvents: "none",
              }}
            />

            {/* Card header */}
            <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: "flex-start", gap: isMobile ? 8 : 24 }}>
              <div>
                <div
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 11,
                    color: "#ffffff80",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: 6,
                      height: 6,
                      borderRadius: 99,
                      background: "#2eb86c",
                      marginRight: 6,
                      verticalAlign: "middle",
                    }}
                  />
                  Referral program · live
                </div>
                <div
                  style={{
                    marginTop: 10,
                    fontSize: 17,
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Sign in to share your link &amp; earn ₹8,000 per booking.
                </div>
              </div>
              {!isMobile && (
                <div style={{ textAlign: "right", fontSize: 12, color: "#ffffff70", flexShrink: 0 }}>
                  per booking
                  <strong style={{ display: "block", color: "#fff", fontWeight: 600, fontSize: 13, marginTop: 2 }}>
                    earn ₹8,000 cash
                  </strong>
                </div>
              )}
            </div>

            {/* Reward exchange */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr auto 1fr",
                alignItems: "center",
                gap: isMobile ? 12 : 18,
                padding: "22px 0",
              }}
            >
              <div
                style={{
                  background: "#ffffff0d",
                  border: "1px solid #ffffff14",
                  borderRadius: 18,
                  padding: "20px 22px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 10.5,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#ffffff80",
                  }}
                >
                  You earn
                </div>
                <div
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: isMobile ? 40 : 56,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    marginTop: 8,
                  }}
                >
                  ₹8,000
                  <span style={{ fontFamily: "'Geist', sans-serif", fontSize: 14, color: "#ffffff80", marginLeft: 4 }}>
                    cash
                  </span>
                </div>
                <div style={{ fontSize: 12.5, color: "#ffffffa6", marginTop: 10, lineHeight: 1.45 }}>
                  Paid out the day your referred friend books a room.
                </div>
              </div>

              {!isMobile && (
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 99,
                  border: "1px solid #ffffff26",
                  display: "grid",
                  placeItems: "center",
                  color: "#fff",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </div>
              )}

              <div
                style={{
                  background: "#ffffff0d",
                  border: "1px solid #ffffff14",
                  borderRadius: 18,
                  padding: "20px 22px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 10.5,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#ffffff80",
                  }}
                >
                  Per booking
                </div>
                <div
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: isMobile ? 40 : 56,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    marginTop: 8,
                  }}
                >
                  ₹8,000
                  <span style={{ fontFamily: "'Geist', sans-serif", fontSize: 14, color: "#ffffff80", marginLeft: 4 }}>
                    per lead
                  </span>
                </div>
                <div style={{ fontSize: 12.5, color: "#ffffffa6", marginTop: 10, lineHeight: 1.45 }}>
                  Every friend who books earns you ₹8,000. No cap on referrals.
                </div>
              </div>
            </div>

            {/* Share link (blurred / teaser) */}
            {/* <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                gap: 8,
                alignItems: "stretch",
                background: "#ffffff0d",
                border: "1px solid #ffffff1f",
                borderRadius: 14,
                padding: 6,
                filter: "blur(3px)",
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  flex: 1,
                  padding: "12px 14px",
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 13,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span style={{ color: "#ffffff66" }}>livoza.com/r/</span>
                <span style={{ fontWeight: 600, letterSpacing: "0.02em" }}>your-referral-link</span>
              </div>
              <button
                style={{
                  padding: "10px 16px",
                  borderRadius: 10,
                  border: "none",
                  background: "#fff",
                  color: "#154f4c",
                  fontWeight: 600,
                  fontSize: 13.5,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "inherit",
                }}
              >
                Copy link
              </button>
            </div> */}

            {/* CTA channels */}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                gap: 8,
                marginTop: "auto",
                flexWrap: "wrap",
              }}
            >
              {["Email", "Message", "Share"].map((ch) => (
                <button
                  key={ch}
                  onClick={goToSignUp}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 14px",
                    borderRadius: 99,
                    background: "#ffffff0d",
                    border: "1px solid #ffffff1f",
                    fontSize: 13,
                    color: "#fff",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {ch}
                </button>
              ))}
              <button
                onClick={goToSignUp}
                style={{
                  marginLeft: "auto",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 14px",
                  borderRadius: 99,
                  background: "#fff",
                  border: "1px solid #fff",
                  color: "#154f4c",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Refer someone
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: how it works rail */}
          <aside
            style={{
              background: "#fff",
              borderRadius: 24,
              padding: 24,
              border: "1px solid #154f4c1f",
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 11,
                  color: "#6a7a78",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                ⁂ how it works
              </div>
              <h3 style={{ margin: "8px 0 0", fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em" }}>
                Three steps to your credit.
              </h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { n: "i", title: "Refer someone", desc: "Fill the details of the person you are referring.", meta: "30s" },
                { n: "ii", title: "They tour & book", desc: "Friend books any verified Livoza room.", meta: "~9 days" },
                { n: "iii", title: "You earn ₹8,000", desc: "₹8,000 paid to you the day they book. Every time.", meta: "instant" },
              ].map((step) => (
                <div
                  key={step.n}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "36px 1fr auto",
                    alignItems: "center",
                    gap: 14,
                    padding: "12px 14px",
                    background: "#f1ece2",
                    borderRadius: 14,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 99,
                      background: "#fff",
                      border: "1px solid #154f4c1f",
                      display: "grid",
                      placeItems: "center",
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: 18,
                      color: "#154f4c",
                    }}
                  >
                    {step.n}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>{step.title}</div>
                    <div style={{ fontSize: 12.5, color: "#6a7a78", marginTop: 2, lineHeight: 1.45 }}>{step.desc}</div>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: 10.5,
                      color: "#5d8b87",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                  >
                    {step.meta}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: "auto" }}>
              <button
                onClick={goToSignUp}
                style={{
                  width: "100%",
                  padding: "16px 22px",
                  borderRadius: 16,
                  background: "#154f4c",
                  color: "#fff",
                  border: "none",
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  fontFamily: "inherit",
                }}
              >
                <span>Refer someone</span>
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 99,
                    background: "#ffffff14",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </button>
              <div
                style={{
                  marginTop: 12,
                  fontSize: 12,
                  color: "#6a7a78",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>No cap — refer as many as you like.</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#5d8b87">
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                  Terms
                </span>
              </div>
            </div>
          </aside>
        </div>

        {/* Stats strip */}
        <div
          style={{
            marginTop: 24,
            borderTop: "1px solid #154f4c1f",
            borderBottom: "1px solid #154f4c1f",
            padding: "18px 0",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "1.4fr 1fr 1fr 1fr 1fr",
            gap: isMobile ? 16 : 24,
            alignItems: "center",
          }}
        >
          <div style={isMobile ? { gridColumn: "1 / -1" } : {}}>
            <div
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 11,
                color: "#6a7a78",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              ✦ this year on livoza
            </div>
            <div style={{ fontSize: 13.5, color: "#1d3936", marginTop: 8, maxWidth: 280, lineHeight: 1.5 }}>
              Refer friends, earn ₹8,000 per booking — no cap, paid instantly on conversion.
            </div>
          </div>
          {[
            { num: "₹8,000", sub: "earned per friend\nwho books a room" },
            { num: "No cap", sub: "refer as many friends\nas you want" },
            { num: "9.2 days", sub: "average tour-to-keys\nfor referred friends" },
            { num: "94%", sub: "of referred renters\nrenew the next year" },
          ].map((s, i) => (
            <div key={i}>
              <div
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 38,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  color: "#154f4c",
                }}
              >
                {s.num}
              </div>
              <div style={{ fontSize: 12.5, color: "#6a7a78", marginTop: 6, lineHeight: 1.4 }}>
                {s.sub.split("\n").map((line, j) => (
                  <span key={j}>
                    {line}
                    {j === 0 && <br />}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Fine print */}
        <div
          className="rl-fine-print"
          style={{
            marginTop: 28,
            display: "flex",
            gap: 28,
            flexWrap: "wrap",
            color: "#6a7a78",
            fontSize: 13,
          }}
        >
          {[
            "No cap on referrals",
            "₹8,000 pays out on booking",
            "Earn on every converted lead",
            "Open to everyone",
          ].map((item) => (
            <span key={item} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5d8b87" strokeWidth="2.2">
                <path d="m5 12 5 5 9-11" />
              </svg>
              {item}
            </span>
          ))}
        </div>

        {/* Sign-in nudge banner */}
        <div
          style={{
            marginTop: 40,
            background: "#154f4c",
            borderRadius: 20,
            padding: isMobile ? "24px 20px" : "28px 36px",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            gap: 20,
            color: "#fff",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 24,
                lineHeight: 1.2,
                letterSpacing: "-0.01em",
              }}
            >
              Ready to earn ₹8,000? <span style={{ fontStyle: "italic", color: "#9dc3be" }}>Sign in to start.</span>
            </div>
            <div style={{ fontSize: 13.5, color: "#ffffff80", marginTop: 6 }}>
              Get your personal referral link. Earn ₹8,000 for every friend who books.
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexShrink: 0, width: isMobile ? "100%" : "auto" }}>
            <button
              onClick={goToSignIn}
              style={{
                padding: "12px 20px",
                borderRadius: 12,
                background: "#ffffff14",
                border: "1px solid #ffffff26",
                color: "#fff",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "inherit",
                flex: isMobile ? 1 : undefined,
              }}
            >
              Sign in
            </button>
            <button
              onClick={goToSignUp}
              style={{
                padding: "12px 20px",
                borderRadius: 12,
                background: "#fff",
                border: "none",
                color: "#154f4c",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                flex: isMobile ? 1 : undefined,
              }}
            >
              Create account →
            </button>
          </div>
        </div>
      </section>
      {isMobile && (
        <button
          onClick={goToSignUp}
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
