"use client";

import React, { useState, useEffect } from "react";
import { SharedNav } from "../components/SharedNav";

// ── Design tokens ──
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
  hot:    "#b8744a",
};

const serif: React.CSSProperties = {
  fontFamily: "var(--font-instrument), 'Times New Roman', serif",
  fontWeight: 400,
  letterSpacing: "-0.01em",
};
const mono: React.CSSProperties = {
  fontFamily: "'Geist Mono', ui-monospace, monospace",
};

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M5 12h14M13 6l6 6-6 6"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.sage} strokeWidth="2.2">
    <path d="m5 12 5 5 9-11"/>
  </svg>
);

export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const px = isMobile ? "20px" : "40px";
  const sectionPad = isMobile ? "56px 20px 0" : "96px 40px 0";

  return (
    <div style={{
      maxWidth: 1440,
      margin: "0 auto",
      background: `linear-gradient(180deg, ${T.paper} 0%, ${T.paper2} 50%, ${T.mint} 100%)`,
      minHeight: "100vh",
      fontFamily: "var(--font-poppins), ui-sans-serif, system-ui, sans-serif",
      color: T.ink,
      WebkitFontSmoothing: "antialiased",
      overflowX: "hidden",
    }}>

      <SharedNav />

      {/* ── HERO ── */}
      <section style={{ padding: `76px ${px} 0` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 12px", background: "#ffffffb3", border: `1px solid ${T.line2}`,
            borderRadius: 99, fontSize: 13, color: T.muted,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: 99, background: "#2eb86c", display: "inline-block" }}/>
            Try living the Livoza way.
          </span>
          {!isMobile && (
            <span style={{ ...mono, fontSize: 11, color: T.muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              about livoza
            </span>
          )}
        </div>

        <h1 style={{
          margin: "0 0 28px",
          ...serif,
          fontSize: isMobile ? "clamp(44px, 12vw, 72px)" : "clamp(56px, 8.6vw, 132px)",
          lineHeight: 0.92,
          letterSpacing: "-0.025em",
          color: T.ink,
        }}>
          Because you deserve more<br/>
          <em style={{ fontStyle: "italic", color: T.sage }}>than just a place to sleep.</em>
        </h1>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "minmax(0,1.55fr) minmax(360px,1fr)",
          gap: 18, alignItems: "stretch",
        }}>
          {/* Hero photo */}
          <div style={{
            position: "relative", borderRadius: 24, overflow: "hidden",
            minHeight: isMobile ? 300 : 520,
            background: "linear-gradient(160deg,#e3d4b6 0%,#b89066 30%,#6f4a2b 60%,#2e1d12 100%)",
            boxShadow: "inset 0 0 0 1px #0000000d",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "repeating-linear-gradient(135deg, #ffffff14 0 1px, transparent 1px 14px)",
            }}/>
            {!isMobile && (
              <div style={{ position: "absolute", left: 20, top: 20, display: "flex", gap: 8 }}>
                {["Koramangala · Yeshwanthpur", " 2 Hubs"].map(t => (
                  <span key={t} style={{
                    padding: "7px 12px", borderRadius: 99, background: "#ffffffe6",
                    backdropFilter: "blur(8px)", fontSize: 12.5, fontWeight: 500,
                    display: "inline-flex", alignItems: "center", gap: 6,
                  }}>{t}</span>
                ))}
              </div>
            )}
            <div style={{ position: "absolute", left: isMobile ? 20 : 28, right: isMobile ? 20 : 28, bottom: isMobile ? 40 : 60, color: "#fff", maxWidth: 520 }}>
              <q style={{
                ...serif, fontStyle: "italic", fontSize: isMobile ? 18 : 30,
                lineHeight: 1.2, letterSpacing: "-0.01em", quotes: "none", display: "block",
              }}>Moving away from home is big. And the last thing you need is a space that makes it harder. At Livoza, we set out to build something that actually feels good to come back to, every single day.</q>
              <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10, fontSize: 12.5 }}>
              </div>
            </div>
            {!isMobile && (
              <div style={{ position: "absolute", left: 18, bottom: 14, ...mono, fontSize: 10.5, letterSpacing: "0.08em", color: "#ffffffb3", textTransform: "uppercase" }}>
                Livoza Girls PG, YPR
              </div>
            )}
          </div>

          {/* Mission card */}
          <aside style={{
            background: T.card, borderRadius: 24, padding: isMobile ? "22px 20px 20px" : "26px 24px 22px",
            display: "flex", flexDirection: "column", gap: 16,
            border: `1px solid ${T.line2}`,
          }}>
            <div>
              <div style={{ ...mono, fontSize: 11, letterSpacing: "0.1em", color: T.muted, textTransform: "uppercase" }}>⁂ our mission</div>
              <h2 style={{ margin: "8px 0 0", ...serif, fontSize: isMobile ? 28 : 38, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
                Live well, spend smart<em style={{ fontStyle: "italic", color: T.sage }}>, and actually feel at peace like Nature.</em>
              </h2>
            </div>
            <p style={{ margin: 0, color: T.ink2, fontSize: 14.5, lineHeight: 1.6 }}>
              At Livoza, we create premium yet affordable living spaces that blend modern design with the warmth of nature, because good living shouldn't cost you peace of mind. <br/>
              We believe the space you live in matters more than most people admit. That's why every Livoza property is built at the intersection of comfort, design, and nature with sunlight, a balcony to just exist on, and a price that never makes you choose between living well and living smart.
            </p>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8,
              background: T.paper, borderRadius: 14, padding: "14px",
            }}>
              {[
                { k: "Founded", v: "2025", s: "· Yeshwanthpur" },
                { k: "Happy residents", v: "150+", s: "· to date" },
                { k: "Properties", v: "2", s: "· & growing" },
              ].map(({ k, v, s }) => (
                <div key={k}>
                  <div style={{ ...mono, fontSize: 10, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>{k}</div>
                  <div style={{ ...serif, fontSize: 24, letterSpacing: "-0.02em", lineHeight: 1, marginTop: 4 }}>
                    {v}<small style={{ fontFamily: "var(--font-poppins), sans-serif", fontSize: 12, color: T.muted, marginLeft: 4 }}>{s}</small>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: "auto" }}>
              <button style={{
                padding: "12px 10px", borderRadius: 99, background: T.ink,
                color: "#fff", border: "none", fontWeight: 500, fontSize: isMobile ? 13 : 14,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer",
                fontFamily: "inherit",
              }}>Read our story <Arrow/></button>
              <a href="/referral">
                <button style={{
                  padding: "12px 10px", borderRadius: 99, background: "#fff",
                  color: T.ink, border: "1px solid #0000001a", fontWeight: 500, fontSize: isMobile ? 13 : 14,
                  cursor: "pointer", fontFamily: "inherit",
                }}>Refer & Earn</button>
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* ── TRUSTBAR ── */}
      <div style={{
        margin: `32px ${px} 0`,
        borderTop: `1px solid ${T.line2}`, borderBottom: `1px solid ${T.line2}`,
        padding: "14px 0",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center",
        gap: isMobile ? 12 : 20, color: T.muted, fontSize: 13.5,
      }}>
        <span style={{ ...mono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>✦ what livoza promises every student</span>
        <div style={{
          display: "flex", flexWrap: "wrap" as const, gap: isMobile ? 10 : 32,
        }}>
          {["Verified hosts only","Zero broker fees","Fair-housing audited","Always student-first"].map(t => (
            <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13 }}><CheckIcon/> {t}</span>
          ))}
        </div>
      </div>

      {/* ── MANIFESTO ── */}
      <section style={{ padding: sectionPad }}>
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end",
          gap: isMobile ? 12 : 32, marginBottom: 32,
        }}>
          <div>
            <div style={{ ...mono, fontSize: 11, color: T.muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>⁂ section.01 — the why</div>
            <h2 style={{ margin: "6px 0 0", ...serif, fontSize: isMobile ? 40 : 64, lineHeight: 1, letterSpacing: "-0.02em" }}>
              Housing is the first<br/><em style={{ fontStyle: "italic", color: T.sage }}>real adult thing</em> students do.
            </h2>
          </div>
          <p style={{ maxWidth: 360, color: T.muted, fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>
            And it shouldn&apos;t come with a broker fee, three credit checks, and a roommate you matched with on a stranger&apos;s Instagram story.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr",
          gap: isMobile ? 24 : 60, alignItems: "start",
        }}>
          <p style={{ ...serif, fontSize: isMobile ? 28 : 44, lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0, color: T.ink }}>
            We didn't find the kind of <em style={{ fontStyle: "italic", color: T.sage }}>place</em> we'd actually want to live in, so we built it.
          </p>
          <div style={{ color: T.ink2, fontSize: 15, lineHeight: 1.7 }}>
            <p style={{ margin: "0 0 16px" }}>It started with a frustration most of us know too well. Searching for a PG or a co-living space and walking into room after room that felt like an afterthought, cramped, dull, and nowhere close to worth what was being charged. We kept asking ourselves: why does this have to be the standard?</p>
            <p style={{ margin: "0 0 16px" }}>We saw a gap that was too big to ignore. Students moving cities for the first time, young professionals trying to find their footing, all of them quietly settling for less because the options simply weren't good enough. That didn't sit right with us.</p>
            <p style={{ margin: 0 }}>So Livoza became our answer to that. Not just a business, but something we genuinely wanted to exist in the world. Every design choice, every meal, every balcony, it all comes from that same place of knowing exactly what it feels like to want more from the space you live in. We built Livoza for the version of us that needed it back then. And for everyone who needs it right now.</p>
            
          </div>
        </div>
      </section>

      {/* ── PRINCIPLES ── */}
      <section style={{ padding: sectionPad }}>
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end",
          gap: isMobile ? 12 : 32, marginBottom: 32,
        }}>
          <div>
            <div style={{ ...mono, fontSize: 11, color: T.muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>⁂ section.03 — principles</div>
            <h2 style={{ margin: "6px 0 0", ...serif, fontSize: isMobile ? 40 : 64, lineHeight: 1, letterSpacing: "-0.02em" }}>
              Four things we<br/><em style={{ fontStyle: "italic", color: T.sage }}>refuse to compromise.</em>
            </h2>
          </div>
          <p style={{ maxWidth: 360, color: T.muted, fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>
            Decisions were made early and we drew a line. And haven't moved it since. 
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)",
          gap: 0,
          border: `1px solid ${T.line2}`, borderRadius: 22, overflow: "hidden", background: "#fff",
        }}>
          {[
            { n: "i", title: <>Your <em style={{ fontStyle: "italic", color: T.sage }}>safety</em></>, desc: "Non-negotiable, always, because peace of mind isn't an add-on, it's the foundation everything else is built on.", tag: "— safety" },
            { n: "ii", title: <>Your <em style={{ fontStyle: "italic", color: T.sage }}>comfort.</em></>, desc: "Premium living at a price that respects you, because modern, beautiful spaces shouldn't be a privilege reserved for a few.", tag: "— ease" },
            { n: "iii", title: <>Your connection to <em style={{ fontStyle: "italic", color: T.sage }}>nature,</em> not vibes.</>, desc: "Green spaces, open balconies, and natural light, because the environment you live in quietly shapes the person you're becoming.", tag: "— nature" },
            { n: "iv", title: <>Your value for <em style={{ fontStyle: "italic", color: T.sage }}>money.</em></>, desc: "Thoughtfully designed, honestly priced, because affording a good life and living a good life should never be two different things.", tag: "— affordable" },
          ].map(({ n, title, desc, tag }, i, arr) => (
            <div key={n} style={{
              padding: "28px 24px 30px",
              display: "flex", flexDirection: "column", gap: 14, minHeight: isMobile ? "auto" : 280,
              borderRight: !isMobile && i < arr.length - 1 ? `1px solid ${T.line2}` : "none",
              borderBottom: isMobile && i < arr.length - 1 ? `1px solid ${T.line2}` : "none",
            }}>
              <div style={{ ...mono, fontSize: 11, color: T.muted, letterSpacing: "0.12em" }}>{n}</div>
              <h3 style={{ ...serif, fontWeight: 400, fontSize: 26, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.05 }}>{title}</h3>
              <p style={{ margin: 0, color: T.muted, fontSize: 13.5, lineHeight: 1.6 }}>{desc}</p>
              <div style={{ marginTop: "auto", ...mono, fontSize: 10.5, letterSpacing: "0.12em", color: T.ink2, textTransform: "uppercase" }}>{tag}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHERE ── */}
      <section style={{ padding: sectionPad }}>
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end",
          gap: isMobile ? 12 : 32, marginBottom: 32,
        }}>
          <div>
            <div style={{ ...mono, fontSize: 11, color: T.muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>⁂ section.04 — footprint</div>
            <h2 style={{ margin: "6px 0 0", ...serif, fontSize: isMobile ? 40 : 64, lineHeight: 1, letterSpacing: "-0.02em" }}>
              One State,<br/><em style={{ fontStyle: "italic", color: T.sage }}>2 hotspots</em>
            </h2>
          </div>
          <p style={{ maxWidth: 360, color: T.muted, fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>
            We move slowly on purpose. A new city doesn&apos;t open until we have student-ambassadors on every campus inside it.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(6, 1fr)",
          gap: 0,
          border: `1px solid ${T.line2}`, borderRadius: 20, overflow: "hidden", background: "#fff",
        }}>
          {[
            { city: "Koramangala", uni: "Bengaluru · Behind Christ Central Campus", year: "2025", count: "150 live" },
            { city: "Yeshwanthpur", uni: "Bengaluru · Christ Yeshwanthpur Campus", year: "2026", count: "100 live" },
            { city: "Up next", uni: "Where do you want to see us next?", year: "Fall '26", count: "soon", upcoming: true },
          ].map(({ city, uni, year, count, upcoming }, i) => {
            const cols = isMobile ? 2 : 6;
            const isLastCol = (i + 1) % cols === 0;
            const isFirstRow = i < cols;
            return (
              <div key={city} style={{
                padding: "18px 16px 16px",
                borderRight: isLastCol ? "none" : `1px solid ${T.line2}`,
                borderTop: isFirstRow ? "none" : `1px solid ${T.line2}`,
                display: "flex", flexDirection: "column", gap: 8, minHeight: isMobile ? 110 : 140,
                background: upcoming ? T.paper : "transparent",
              }}>
                <div style={{ ...serif, fontSize: isMobile ? 18 : 22, letterSpacing: "-0.01em", color: upcoming ? T.sage : T.ink }}>{city}</div>
                <div style={{ fontSize: 11.5, color: T.muted, lineHeight: 1.5 }}>{uni}</div>
                <div style={{ marginTop: "auto", ...mono, fontSize: 10, color: T.ink2, letterSpacing: "0.08em", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>{year}</span>
                  <span style={{
                    background: upcoming ? "#fff" : T.mint,
                    border: upcoming ? `1px solid ${T.line2}` : "none",
                    padding: "2px 7px", borderRadius: 99, fontSize: 10,
                  }}>{count}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: sectionPad }}>
        <div style={{
          position: "relative",
          padding: isMobile ? "48px 24px" : "80px 56px",
          background: `linear-gradient(180deg, ${T.paper2} 0%, ${T.mint} 100%)`,
          borderRadius: 28, overflow: "hidden", border: `1px solid ${T.line2}`,
        }}>
          <div style={{ ...mono, fontSize: 11, color: T.muted, letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.7 }}>✦ move in or refer with us</div>
          <h2 style={{ margin: "14px 0 0", ...serif, fontSize: isMobile ? "clamp(56px, 16vw, 96px)" : "clamp(72px, 11vw, 184px)", lineHeight: 0.9, letterSpacing: "-0.03em" }}>
            Make room<br/><em style={{ fontStyle: "italic", color: T.sage }}>for what&apos;s next.</em>
          </h2>
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end",
            marginTop: isMobile ? 32 : 48, gap: 20, flexWrap: "wrap" as const,
          }}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" as const }}>
              <a href="/">
                <button style={{
                  padding: isMobile ? "14px 24px" : "18px 32px", borderRadius: 99, background: T.ink,
                  color: "#fff", border: "none", fontWeight: 500, fontSize: 15,
                  display: "inline-flex", alignItems: "center", gap: 10, cursor: "pointer", fontFamily: "inherit",
                }}>Browse homes <Arrow/></button>
              </a>
              <button style={{
                padding: isMobile ? "14px 20px" : "18px 28px", borderRadius: 99, background: "transparent",
                border: "1px solid #15141033", fontWeight: 500, fontSize: 15, cursor: "pointer", fontFamily: "inherit",
              }}>Refer & Earn →</button>
            </div>
            <div style={{ maxWidth: 320, color: T.ink2, fontSize: 13.5, lineHeight: 1.5 }}>
              Free to search. Pay nothing until you sign. Livoza is just what you might be looking for !!!
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: isMobile ? `40px ${px} 32px` : `40px ${px} 32px`, borderTop: `1px solid ${T.line2}`, marginTop: isMobile ? 56 : 96 }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "2fr 1fr 1fr 1fr 1fr", gap: isMobile ? 28 : 40 }}>
          <div style={{ gridColumn: isMobile ? "1 / -1" : "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 28, height: 28, borderRadius: 8, background: T.ink, display: "grid", placeItems: "center", color: "#fff", ...serif, fontStyle: "italic", fontSize: 18 }}>l</span>
              <span style={{ fontWeight: 600, fontSize: 17, letterSpacing: "-0.01em" }}>Livoza</span>
            </div>
            <p style={{ margin: "14px 0 0", color: T.muted, fontSize: 13.5, lineHeight: 1.55, maxWidth: 280 }}>Premium yet affordable housing. <br/> Built in Bengaluru.</p>
            <div style={{ ...mono, fontSize: 11, color: T.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 20 }}>© Livoza 2025 — all rights reserved</div>
          </div>
          {[
            { h: "For students", links: [["Browse rooms","/"],["Move-in checklist","#"],["Student discounts","#"],["Refer a friend","/referral"]] },
            { h: "Company", links: [["About","/about"],["The Why?","#"],["Non-negotiables","#"],["Properties","#"]] },
            { h: "Help", links: [["Contact support","#"],["Cancellation policy","#"],["Status","#"],["Sitemap","#"]] },
          ].map(({ h, links }) => (
            <div key={h}>
              <div style={{ ...mono, fontSize: 11, color: T.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>{h}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                {links.map(([label, href]) => (
                  <li key={label}><a href={href} style={{ fontSize: 13.5, color: "inherit", textDecoration: "none" }}>{label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 32, paddingTop: 18, borderTop: `1px solid ${T.line2}`, fontSize: 12, color: T.muted, display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", gap: 8 }}>
          <span>Privacy · Terms · Fair-housing policy</span>
          <span style={{ ...mono, letterSpacing: "0.1em" }}>v.2.1</span>
        </div>
      </footer>

    </div>
  );
}
