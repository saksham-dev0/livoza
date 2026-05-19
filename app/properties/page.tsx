"use client";

import React, { useRef, useState } from "react";
import { SharedNav } from "../components/SharedNav";
import { FloatingCTA } from "../components/FloatingCTA";
import Link from "next/link";

const T = {
  ink: "#154f4c",
  ink2: "#1d3936",
  muted: "#6a7a78",
  line: "#154f4c10",
  line2: "#154f4c1f",
  paper: "#f1ece2",
  paper2: "#e7e1d2",
  mint: "#dee8e6",
  mint2: "#c8d6d3",
  sage: "#5d8b87",
  hot: "#b8744a",
  card: "#ffffff",
};

const serifStyle: React.CSSProperties = {
  fontFamily: "'Instrument Serif', 'Times New Roman', serif",
  fontWeight: 400,
};

const monoStyle: React.CSSProperties = {
  fontFamily: "'Geist Mono', ui-monospace, monospace",
};

const monoEyebrow: React.CSSProperties = {
  ...monoStyle,
  fontSize: 11,
  color: T.muted,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
};

const PHONE_NUMBER_DISPLAY = "+91 9353477987";
const PHONE_NUMBER_YPR = "tel:+919353477987";

const MAP_LINKS = {
  yeshwanthpur:
    "https://maps.app.goo.gl/DcWGBtLFgNR5WueK7?g_st=ic",
  koramangala:
    "https://www.google.com/maps/dir//Livoza+PG,+21,+Christ+Ln,+next+to+Christ+University,+Koramangala+Industrial+Layout,+S.G.+Palya,+Bengaluru,+Karnataka+560029/@12.9344758,77.6192442,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bae15c53323c6c1:0x599eeade63085d63!2m2!1d77.6084032!2d12.9351023?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D",
};

function CheckIcon({ size = 11 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="m5 12 5 5 9-11" />
    </svg>
  );
}

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 22s8-7.4 8-13a8 8 0 1 0-16 0c0 5.6 8 13 8 13Z" />
      <circle cx="12" cy="9" r="2.6" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9Z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 12v8h16v-8M16 6l-4-4-4 4M12 2v14" />
    </svg>
  );
}

interface PropertyCardProps {
  reverse?: boolean;
  photoBg: string;
  thumbColors: string[];
  id: string;
  propertyNum: string;
  neighborhood: string;
  name: React.ReactNode;
  address: string;
  price: string;
  priceNote: string;
  mapUrl: string;
  description: React.ReactNode;
  specs: { k: string; v: string; small: string }[];
  amenities: string[];
  hostQuote: string;
  badgeLabel: string;
  liveLabel: string;
}

function PropertyCard({
  reverse,
  photoBg,
  thumbColors,
  propertyNum,
  neighborhood,
  name,
  address,
  price,
  priceNote,
  mapUrl,
  description,
  specs,
  amenities,
  hostQuote,
  badgeLabel,
  liveLabel,
}: PropertyCardProps) {
  const allBgs = [photoBg, ...thumbColors];
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const pointerStartX = useRef<number | null>(null);
  const pointerDeltaX = useRef(0);
  const pointerWasTouch = useRef(false);
  const suppressNextClick = useRef(false);
  const activeBg = allBgs[activeIndex];

  const showNextPhoto = () => {
    setActiveIndex((current) => (current + 1) % allBgs.length);
  };

  const showPreviousPhoto = () => {
    setActiveIndex((current) => (current - 1 + allBgs.length) % allBgs.length);
  };

  const blockNextClick = () => {
    suppressNextClick.current = true;
    window.setTimeout(() => {
      suppressNextClick.current = false;
    }, 300);
  };

  const handlePhotoClick = () => {
    if (suppressNextClick.current) {
      suppressNextClick.current = false;
      return;
    }
    showNextPhoto();
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary) return;
    pointerStartX.current = event.clientX;
    pointerDeltaX.current = 0;
    pointerWasTouch.current = event.pointerType === "touch";
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerStartX.current === null) return;
    pointerDeltaX.current = event.clientX - pointerStartX.current;
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || pointerStartX.current === null) return;
    const swipeDistance = pointerDeltaX.current;
    const wasTouch = pointerWasTouch.current;
    pointerStartX.current = null;
    pointerDeltaX.current = 0;
    pointerWasTouch.current = false;

    if (wasTouch) blockNextClick();
    if (Math.abs(swipeDistance) < 45) return;
    if (swipeDistance < 0) showNextPhoto();
    else showPreviousPhoto();
  };

  const handlePointerCancel = () => {
    pointerStartX.current = null;
    pointerDeltaX.current = 0;
    pointerWasTouch.current = false;
  };

  return (
    <>
      <style>{`
        .prop-card {
          background: #fff;
          border: 1px solid ${T.line2};
          border-radius: 28px;
          padding: 16px;
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 22px;
        }
        .prop-card.reverse {
          grid-template-columns: 1fr 1.15fr;
        }
        .prop-card.reverse .photo-col-inner {
          order: 2;
        }
        @media (max-width: 768px) {
          .prop-card, .prop-card.reverse {
            grid-template-columns: 1fr !important;
          }
          .prop-card.reverse .photo-col-inner {
            order: 0 !important;
          }
        }
      `}</style>
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#000000cc", display: "grid", placeItems: "center",
            cursor: "zoom-out",
          }}
        >
          <div
            style={{
              width: "min(90vw, 1100px)", height: "min(85vh, 800px)",
              borderRadius: 16, backgroundImage: lightbox,
              backgroundColor: "#111",
              backgroundSize: "contain", backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              boxShadow: "0 32px 80px #00000088",
            }}
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: "fixed", top: 24, right: 28,
              background: "#fff", border: "none", borderRadius: 99,
              width: 40, height: 40, fontSize: 20, cursor: "pointer",
              display: "grid", placeItems: "center", color: "#222",
              boxShadow: "0 2px 12px #0004",
            }}
          >×</button>
        </div>
      )}

      <article className={`prop-card${reverse ? " reverse" : ""}`}>
        {/* Photo column */}
        <div
          className="photo-col-inner prop-photo"
          onClick={handlePhotoClick}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerCancel}
          role="button"
          tabIndex={0}
          aria-label="Show next property photo"
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              showNextPhoto();
            }
            if (event.key === "ArrowLeft") showPreviousPhoto();
            if (event.key === "ArrowRight") showNextPhoto();
          }}
          style={{
            position: "relative",
            borderRadius: 20,
            overflow: "hidden",
            minHeight: 560,
            backgroundImage: activeBg,
            backgroundColor: T.paper,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            boxShadow: "inset 0 0 0 1px #0000000d",
            cursor: "pointer",
            touchAction: "pan-y",
          }}
        >
          <div className="prop-photo-badges" style={{
            position: "absolute", top: 16, left: 16, right: 16,
            display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap",
          }}>
            <div className="prop-photo-chips" style={{ display: "flex", gap: 6 }}>
              <span style={{
                padding: "6px 12px", borderRadius: 99, background: "#ffffffe6",
                backdropFilter: "blur(8px)", fontSize: 12, fontWeight: 500,
                display: "inline-flex", alignItems: "center", gap: 6,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: 99, background: "#2eb86c", display: "inline-block" }} />
                {liveLabel}
              </span>
              <span style={{
                padding: "6px 12px", borderRadius: 99, background: "#ffffffe6",
                backdropFilter: "blur(8px)", fontSize: 12, fontWeight: 500,
                display: "inline-flex", alignItems: "center", gap: 6,
              }}>
                <CheckIcon size={12} /> Walked &amp; verified
              </span>
            </div>
            <div style={{
              width: 36, height: 36, borderRadius: 99, background: "#ffffffe6",
              display: "grid", placeItems: "center", color: T.ink, cursor: "pointer",
            }}
              onClick={e => e.stopPropagation()}
              onPointerDown={e => e.stopPropagation()}
            >
              <HeartIcon />
            </div>
          </div>

          <div className="prop-photo-id" style={{
            position: "absolute", left: 16, bottom: 14,
            ...monoStyle, fontSize: 10.5, letterSpacing: "0.08em",
            color: "#ffffffb3", textTransform: "uppercase",
          }}>
            {/* {id} · {activeIndex + 1}/{allBgs.length} ·  */}
          </div>

          <div className="prop-thumbs" style={{
            position: "absolute", right: 16, bottom: 14,
            display: "flex", gap: 6,
          }}
            onClick={e => e.stopPropagation()}
            onPointerDown={e => e.stopPropagation()}
          >
            {allBgs.map((bg, i) => (
              <button
                key={i}
                type="button"
                className="prop-thumb"
                aria-label={`Show property photo ${i + 1}`}
                onClick={() => setActiveIndex(i)}
                style={{
                  width: 56, height: 56, borderRadius: 10,
                  padding: 0,
                  border: activeBg === bg ? "2px solid #fff" : "2px solid #ffffff66",
                  backgroundImage: bg, backgroundSize: "cover", backgroundPosition: "center",
                  cursor: "pointer", outline: activeBg === bg ? "2px solid #154f4c" : "none",
                  outlineOffset: 1, transition: "outline 0.15s, border 0.15s",
                }}
              />
            ))}
          </div>
        </div>

        {/* Details column */}
        <div className="prop-details" style={{ padding: "14px 14px 12px", display: "flex", flexDirection: "column", gap: 18 }}>
          {/* topline */}
          <div className="prop-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
            <div style={{ flex: 1 }}>
              <div style={{ ...monoStyle, fontSize: 11, color: T.muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                ⁂ {propertyNum} · {neighborhood}
              </div>
              <h2 className="prop-title" style={{ margin: "8px 0 0", ...serifStyle, fontSize: "clamp(32px, 4vw, 44px)", lineHeight: 1.02, letterSpacing: "-0.02em" }}>
                {name}
              </h2>
              <div className="prop-address" style={{ color: T.ink2, fontSize: 14, marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: T.sage }}><PinIcon /></span>
                {address}
              </div>
            </div>
            <div className="prop-price" style={{ textAlign: "right", minWidth: 130 }}>
              <div>
                <span style={{ ...serifStyle, fontSize: "clamp(32px, 4vw, 44px)", letterSpacing: "-0.02em", lineHeight: 1 }}>{price}</span>
                <span style={{ fontSize: 13.5, color: T.muted, marginLeft: 4 }}>/mo</span>
              </div>
              <div style={{ ...monoStyle, fontSize: 10.5, color: T.sage, marginTop: 6, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {priceNote}
              </div>
            </div>
          </div>

          {/* description */}
          <p style={{ color: T.ink2, fontSize: 14.5, lineHeight: 1.65, margin: 0 }}>
            {description}
          </p>

          {/* specs */}
          <div className="prop-spec-grid" style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            background: T.paper, borderRadius: 16, padding: 4,
          }}>
            {specs.map((spec, i) => (
              <div key={i} className="prop-spec" style={{
                padding: "14px 12px",
                borderRight: i < specs.length - 1 ? `1px dashed ${T.line2}` : "none",
                display: "flex", flexDirection: "column", gap: 4,
              }}>
                <div style={{ ...monoStyle, fontSize: 10, color: T.muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>{spec.k}</div>
                <div style={{ ...serifStyle, fontSize: 24, letterSpacing: "-0.02em", lineHeight: 1 }}>
                  {spec.v}<small style={{ fontFamily: "inherit", fontWeight: 400, fontSize: 11.5, color: T.muted, marginLeft: 3, fontStyle: "normal" }}>{spec.small}</small>
                </div>
              </div>
            ))}
          </div>

          {/* amenities */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ ...monoStyle, fontSize: 10.5, color: T.muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              amenities — verified
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {amenities.map((a, i) => (
                <span key={i} style={{
                  padding: "7px 12px", borderRadius: 99, background: T.mint,
                  color: T.ink, fontSize: 12.5, display: "inline-flex", alignItems: "center", gap: 6,
                }}>
                  <span style={{ color: T.sage }}><CheckIcon /></span> {a}
                </span>
              ))}
            </div>
          </div>

          {/* host note */}
          <div className="prop-host" style={{
            padding: 16, background: T.paper, borderRadius: 16,
          }}>
            <div style={{ ...monoStyle, fontSize: 10, color: T.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
              {badgeLabel}
            </div>
            <div style={{ color: T.ink2, fontSize: 16, lineHeight: 1.5, ...serifStyle, fontStyle: "italic" }}>
              &quot;{hostQuote}&quot;
            </div>
          </div>

          {/* actions */}
          <div className="prop-actions" style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 8, marginTop: "auto" }}>
            <a href={PHONE_NUMBER_YPR} style={{
              padding: "10px 14px", borderRadius: 99, background: T.ink, color: "#fff",
              border: "none", fontWeight: 500, fontSize: 14,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2,
              cursor: "pointer", fontFamily: "inherit", textDecoration: "none", lineHeight: 1.1,
            }} aria-label={`Request a visit by calling ${PHONE_NUMBER_DISPLAY}`}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                Request a visit <ArrowRight />
              </span>
              {/* <span style={{ ...monoStyle, fontSize: 10.5, color: "#ffffffcc", letterSpacing: "0.04em" }}>
                {PHONE_NUMBER_DISPLAY}
              </span> */}
            </a>
            <a href={mapUrl} target="_blank" rel="noreferrer" style={{
              padding: 14, borderRadius: 99, background: "#fff",
              color: T.ink, border: `1px solid ${T.line2}`, fontWeight: 500, fontSize: 14,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              cursor: "pointer", fontFamily: "inherit", textDecoration: "none",
            }}>
              <PinIcon /> View on Maps
            </a>
            <button style={{
              width: 48, borderRadius: 99, background: "#fff", border: `1px solid ${T.line2}`,
              display: "grid", placeItems: "center", color: T.ink2, cursor: "pointer",
            }}>
              <ShareIcon />
            </button>
          </div>
        </div>
      </article>
    </>
  );
}

const FILTER_CHIPS = ["All", "Koramangala", "Yeshwanthpur", "Girls PG", "Co-living", "Under ₹20,000"];

export default function PropertiesPage() {
  const [activeFilter, setActiveFilter] = useState(0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap');

        .properties-shell {
          max-width: 1440px;
          width: 100%;
          margin: 0 auto;
          background: linear-gradient(180deg, ${T.paper} 0%, ${T.paper2} 60%, ${T.mint} 100%);
          min-height: 100vh;
          font-family: 'Geist', ui-sans-serif, system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }

        .properties-shell,
        .properties-shell * {
          box-sizing: border-box;
        }

        .properties-shell * {
          min-width: 0;
        }

        .hero-meta-grid {
          margin-top: 28px;
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          border-top: 1px solid ${T.line2};
          border-bottom: 1px solid ${T.line2};
        }
        @media (max-width: 768px) {
          .hero-meta-grid { grid-template-columns: 1fr 1fr; }
          .hero-meta-grid > div {
            border-right: none !important;
            border-bottom: 1px dashed ${T.line2};
            padding: 16px 0 !important;
          }
          .hero-meta-grid > div:last-child {
            border-bottom: none;
          }
        }
        @media (max-width: 480px) {
          .hero-meta-grid { grid-template-columns: 1fr; }
        }

        .filterbar-wrap {
          margin: 32px 40px 0;
          background: #fff;
          border: 1px solid ${T.line2};
          border-radius: 99px;
          padding: 8px 8px 8px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }
        @media (max-width: 768px) {
          .filterbar-wrap {
            margin: 24px 20px 0;
            padding: 10px 14px;
            border-radius: 20px;
            flex-direction: column;
            align-items: flex-start;
          }
          .filterbar-left {
            width: 100%;
            gap: 10px !important;
          }
          .filterbar-right { display: none !important; }
        }

        .filterbar-chips {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        @media (max-width: 768px) {
          .filterbar-chips {
            width: 100%;
            flex-wrap: nowrap;
            overflow-x: auto;
            padding-bottom: 2px;
            -webkit-overflow-scrolling: touch;
          }
          .filterbar-chips button {
            flex: 0 0 auto;
            white-space: nowrap;
          }
        }

        .promise-grid {
          display: grid;
          grid-template-columns: 1fr 2.4fr;
          gap: 32px;
          align-items: center;
        }
        @media (max-width: 900px) {
          .promise-grid { grid-template-columns: 1fr; }
        }

        .promise-items {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0;
        }
        @media (max-width: 768px) {
          .promise-items { grid-template-columns: 1fr 1fr; gap: 16px; }
          .promise-items .pit { border-left: none !important; padding-left: 0 !important; }
        }
        @media (max-width: 480px) {
          .promise-items { grid-template-columns: 1fr; }
        }

        .cmp-row-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
        }
        @media (max-width: 768px) {
          .cmp-row-grid { grid-template-columns: 1fr; }
          .cmp-cell { border-right: none !important; border-top: 1px solid ${T.line2}; }
          .cmp-cell:first-child { border-top: none; }
        }

        .soon-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        @media (max-width: 900px) {
          .soon-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .soon-grid { grid-template-columns: 1fr; }
        }

        .inquire-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 56px;
          align-items: end;
        }
        @media (max-width: 768px) {
          .inquire-grid { grid-template-columns: 1fr; gap: 32px; }
        }

        .foot-grid-inner {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          gap: 40px;
        }
        @media (max-width: 900px) {
          .foot-grid-inner { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .foot-grid-inner { grid-template-columns: 1fr; }
        }

        .px-section {
          padding-left: 40px;
          padding-right: 40px;
        }
        @media (max-width: 768px) {
          .px-section { padding-left: 20px; padding-right: 20px; }
        }

        .properties-list {
          padding: 28px 40px 0;
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        @media (max-width: 768px) {
          .properties-list { padding: 20px 20px 0; }
        }

        @media (max-width: 768px) {
          .prop-card {
            border-radius: 20px !important;
            padding: 10px !important;
            gap: 14px !important;
          }
          .prop-photo {
            min-height: 360px !important;
            border-radius: 16px !important;
          }
          .prop-photo-badges {
            top: 10px !important;
            left: 10px !important;
            right: 10px !important;
          }
          .prop-photo-chips {
            max-width: calc(100% - 46px);
            flex-wrap: wrap;
          }
          .prop-photo-chips > span {
            padding: 6px 9px !important;
            font-size: 11px !important;
          }
          .prop-photo-id {
            left: 10px !important;
            bottom: 60px !important;
            max-width: calc(100% - 20px);
            line-height: 1.35;
          }
          .prop-thumbs {
            right: 10px !important;
            bottom: 10px !important;
            max-width: calc(100% - 20px);
          }
          .prop-thumb {
            width: 42px !important;
            height: 42px !important;
            border-radius: 8px !important;
          }
          .prop-details {
            padding: 8px 4px 6px !important;
            gap: 14px !important;
          }
          .prop-head {
            gap: 12px !important;
          }
          .prop-title {
            font-size: clamp(30px, 11vw, 42px) !important;
            line-height: 1.02 !important;
          }
          .prop-address {
            align-items: flex-start !important;
            line-height: 1.45;
            overflow-wrap: anywhere;
          }
          .prop-address span {
            flex: 0 0 auto;
            margin-top: 2px;
          }
          .prop-price {
            width: 100%;
            min-width: 0 !important;
            text-align: left !important;
          }
          .prop-spec-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
          .prop-spec {
            border-right: none !important;
            padding: 12px 10px !important;
          }
          .prop-spec:nth-child(odd) {
            border-right: 1px dashed ${T.line2} !important;
          }
          .prop-spec:nth-child(n + 3) {
            border-top: 1px dashed ${T.line2};
          }
          .prop-host {
            align-items: flex-start !important;
            flex-wrap: wrap;
          }
          .prop-actions {
            grid-template-columns: 1fr !important;
          }
          .prop-actions a,
          .prop-actions button {
            width: 100% !important;
            min-height: 48px;
          }
          .mobile-panel {
            padding: 28px 18px !important;
            border-radius: 20px !important;
          }
          .inquire-form {
            flex-direction: column !important;
          }
          .inquire-form input,
          .inquire-form button {
            width: 100% !important;
          }
        }

        @media (max-width: 480px) {
          .px-section {
            padding-left: 16px;
            padding-right: 16px;
          }
          .properties-list {
            padding-left: 16px;
            padding-right: 16px;
          }
          .filterbar-wrap {
            margin-left: 16px;
            margin-right: 16px;
          }
          .properties-hero-title {
            font-size: clamp(40px, 15vw, 58px) !important;
            line-height: 0.98 !important;
          }
          .prop-photo {
            min-height: 310px !important;
          }
          .prop-spec-grid {
            grid-template-columns: 1fr !important;
          }
          .prop-spec:nth-child(odd) {
            border-right: none !important;
          }
          .prop-spec:nth-child(n + 2) {
            border-top: 1px dashed ${T.line2};
          }
        }
      `}</style>

      <SharedNav />
      <FloatingCTA />

      <div className="properties-shell" style={{ paddingTop: 68 }}>

        {/* ===== HERO ===== */}
        <section className="px-section" style={{ paddingTop: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: 22, flexWrap: "wrap" }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "6px 12px", background: "#ffffffb3", border: `1px solid ${T.line2}`,
              borderRadius: 99, fontSize: 13, color: T.muted,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: 99, background: "#2eb86c", display: "inline-block" }} />
              Live now · accepting visits
            </span>
            <span style={monoEyebrow}>ed.02 — the properties</span>
          </div>

          <h1 className="properties-hero-title" style={{
            margin: 0,
            fontFamily: "'Instrument Serif', serif",
            fontWeight: 400,
            fontSize: "clamp(48px, 8vw, 124px)",
            lineHeight: 0.94,
            letterSpacing: "-0.025em",
            color: T.ink,
          }}>
            Two properties.<br />
            <span style={{ fontStyle: "italic", color: T.sage }}>Walked, lived in, kept honest.</span>
          </h1>

          <div className="hero-meta-grid">
            <div style={{ padding: "18px 22px 18px 0", borderRight: `1px dashed ${T.line2}` }}>
              <p style={{ color: T.ink2, fontSize: 13.5, lineHeight: 1.55, margin: 0, maxWidth: 520 }}>
                We open every Livoza property the same way we opened the first one — by making sure we&apos;d want to live there ourselves. Today there are exactly two on Livoza, with more currently being prepared.{" "}
                <strong style={{ color: T.ink, fontWeight: 600 }}>No hidden charges</strong> on any of them, ever.
              </p>
            </div>
            {[
              { k: "Live now", v: "2", small: "verified properties" },
              { k: "In onboarding", v: "3+", small: "est. early '26" },
              { k: "Avg. enquiry closed in", v: "48", small: "hours" },
            ].map((cell, i, arr) => (
              <div key={i} style={{
                padding: "18px 22px 18px 22px",
                borderRight: i < arr.length - 1 ? `1px dashed ${T.line2}` : "none",
              }}>
                <div style={monoEyebrow}>{cell.k}</div>
                <div style={{ ...serifStyle, fontSize: 26, letterSpacing: "-0.02em", lineHeight: 1.05, marginTop: 6 }}>
                  {cell.v}<small style={{ fontFamily: "'Geist', sans-serif", fontSize: 12.5, color: T.muted, marginLeft: 6 }}>{cell.small}</small>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== FILTERBAR ===== */}
        <div className="filterbar-wrap">
          <div className="filterbar-left" style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 13.5, flexWrap: "wrap" }}>
            <span style={{ ...monoStyle, fontSize: 10.5, color: T.muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>Showing</span>
            <div className="filterbar-chips">
              {FILTER_CHIPS.map((chip, i) => (
                <button
                  key={i}
                  onClick={() => setActiveFilter(i)}
                  style={{
                    padding: "8px 14px", borderRadius: 99,
                    background: activeFilter === i ? T.mint : "transparent",
                    border: `1px solid ${activeFilter === i ? T.mint2 : "transparent"}`,
                    fontSize: 13, color: activeFilter === i ? T.ink : T.ink2,
                    fontWeight: activeFilter === i ? 600 : 400,
                    cursor: "pointer", fontFamily: "inherit",
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
          <div className="filterbar-right" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button style={{
              padding: "10px 16px", borderRadius: 99, background: T.ink, color: "#fff",
              border: "none", fontSize: 13.5, display: "inline-flex", alignItems: "center", gap: 8,
              cursor: "pointer", fontFamily: "inherit",
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 3 3 6v15l6-3 6 3 6-3V3l-6 3-6-3Z" /><path d="M9 3v15M15 6v15" /></svg>
              Open map view
            </button>
          </div>
        </div>

        {/* ===== PROPERTIES ===== */}
        <section className="properties-list">

          {/* Property 01 — Yashwanthpur */}
          <PropertyCard
            reverse
            photoBg="url('/livoza-ypr-entrance.jpeg')"
            thumbColors={[
              "url('/img3.jpeg')",
              "url('/triplebed.jpeg')",
              "url('/doublebed.jpeg')",
            ]}
            id="livoza · #0002-YPR"
            propertyNum="property · 01"
            neighborhood="yeshwanthpur"
            name={<>The Livoza For <em style={{ fontStyle: "italic", color: T.sage }}>Girls</em></>}
            address="Near Christ Yeshwanthpur Campus, Yeshwanthpur, Bengaluru"
            price="₹XX,XXX"
            priceNote="no brokerage · ₹0 hidden fees"
            mapUrl={MAP_LINKS.yeshwanthpur}
            description={
              <>
                Less than 100 metres from the Christ YPR campus gate and yes, we measured. This is the one that started it all for Livoza.{" "}
                <em style={{ color: T.sage, fontStyle: "italic", fontFamily: "'Instrument Serif', serif", fontSize: 17 }}>Built for girls who wanted a space that actually reflected how they live.</em>{" "}
                A balcony to breathe on, a fridge that&apos;s actually yours, food that shows up four times a day, and security that means it when it says 24/7. Rooms available in single, double, and triple sharing because not everyone wants the same thing, and that&apos;s okay.
              </>
            }
            specs={[
              { k: "Room type", v: "Private", small: "/ shared" },
              { k: "Sharing", v: "Single", small: "/ double / triple" },
              { k: "Move-in", v: "Now", small: "immediately" },
              { k: "Security", v: "24/7", small: "" },
            ]}
            amenities={[
              "Balcony in every room",
              "Personal fridge",
              "Smart TV",
              "4 meals/day",
              "Washing machine",
              "Microwave & oven",
              "24/7 security",
              "Wi-Fi",
            ]}
            hostQuote="Two minutes from the gate. Ten minutes to feel completely at ease."
            badgeLabel="host note"
            liveLabel="Live · verified"
          />

          {/* Property 02 — Koramangala */}
          <PropertyCard
            photoBg="url('/livoza-kora-main.jpeg')"
            thumbColors={[
              "url('/img1.jpeg')",
              "url('/img2.jpeg')",
              "url('/img3.jpeg')",
            ]}
            id="livoza · #0001-KOR"
            propertyNum="property · 02"
            neighborhood="koramangala"
            name={<>The Livoza <em style={{ fontStyle: "italic", color: T.sage }}>Co-living</em></>}
            address="Behind Christ Central Campus, Koramangala, Bengaluru"
            price="₹XX,XXX"
            priceNote="no brokerage · ₹0 hidden fees"
            mapUrl={MAP_LINKS.koramangala}
            description={
              <>
                A thoughtfully designed co-living PG tucked quietly behind Christ Central Campus close enough that you&apos;ll hear the bell, far enough that you&apos;ll actually sleep.{" "}
                <em style={{ color: T.sage, fontStyle: "italic", fontFamily: "'Instrument Serif', serif", fontSize: 17 }}>Every room has enough sunlight to make mornings feel less painful.</em>{" "}
                Four meals a day, around-the-clock security, and a building that was designed to feel like something, not just function like something.
              </>
            }
            specs={[
              { k: "Room type", v: "Private", small: "/ shared" },
              { k: "Sharing", v: "Single", small: "/ double / triple" },
              { k: "Move-in", v: "Now", small: "immediately" },
              { k: "Security", v: "24/7", small: "" },
            ]}
            amenities={[
              "Balcony",
              "fridge",
              "Pool Table",
              "4 meals/day",
              "Washing machine",
              "Microwave & oven",
              "24/7 security",
              "Wi-Fi",
            ]}
            hostQuote="Quiet floors, a kitchen that smells like something good, and a balcony worth waking up early for."
            badgeLabel="host note"
            liveLabel="Live · verified"
          />
        </section>

        {/* ===== PROMISE BAND ===== */}
        <div className="px-section" style={{ marginTop: 56 }}>
          <div className="mobile-panel" style={{
            background: T.ink, color: "#fff",
            borderRadius: 24, padding: "28px 32px",
          }}>
            <div className="promise-grid">
              <div>
                <div style={{ ...monoStyle, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#ffffff88" }}>
                  ⁂ on every livoza door
                </div>
                <h3 style={{ margin: "10px 0 0", ...serifStyle, fontSize: 32, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
                  The promise is the{" "}
                  <em style={{ fontStyle: "italic", color: "#c8d6d3" }}>same</em> for both.
                </h3>
              </div>
              <div className="promise-items">
                {[
                  "Photographed in person, no staging",
                  "Verified amenities, no surprises",
                  "Zero brokerage, ever",
                  "Fully refundable until move-in",
                  "Your room confirmed within 48 hours",
                ].map((item, i) => (
                  <div key={i} className="pit" style={{
                    padding: "0 18px",
                    borderLeft: i === 0 ? "none" : "1px solid #ffffff1f",
                    paddingLeft: i === 0 ? 0 : 18,
                  }}>
                    <div style={{ ...monoStyle, fontSize: 10.5, color: "#c8d6d3", letterSpacing: "0.1em" }}>0{i + 1}</div>
                    <div style={{ marginTop: 8, fontWeight: 500, fontSize: 14.5, lineHeight: 1.35 }}>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== COMPARE TABLE ===== */}
        <section className="px-section" style={{ paddingTop: 88 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 32, marginBottom: 32, flexWrap: "wrap" }}>
            <div>
              <div style={monoEyebrow}>⁂ section.02 — side by side</div>
              <h2 style={{ margin: "6px 0 0", ...serifStyle, fontSize: "clamp(36px, 5vw, 60px)", lineHeight: 1, letterSpacing: "-0.02em" }}>
                Two very different<br />
                <em style={{ fontStyle: "italic", color: T.sage }}>kinds of space.</em>
              </h2>
            </div>
            <p style={{ maxWidth: 380, color: T.muted, fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>
              Choosing between Koramangala and Yeshwanthpur really comes down to your campus, your commute, and whether you want to be in the middle of everything or just steps from class. Here&apos;s how they compare.
            </p>
          </div>

          <div style={{ background: "#fff", border: `1px solid ${T.line2}`, borderRadius: 24, overflow: "hidden" }}>
            {/* header row */}
            <div className="cmp-row-grid" style={{ borderBottom: `1px solid ${T.line2}` }}>
              {[
                { lab: "comparing", name: <span style={{ color: T.muted }}>Side by side</span>, sub: "All figures verified." },
                { lab: "⁂ property · 02 · koramangala", name: "The Livoza Co-living", sub: "Behind Christ Central Campus" },
                { lab: "⁂ property · 01 · yeshwanthpur", name: "The Livoza for girls", sub: "Near Christ Yeshwanthpur Campus" },
              ].map((col, i, arr) => (
                <div key={i} className="cmp-cell" style={{
                  padding: "22px 24px",
                  borderRight: i < arr.length - 1 ? `1px solid ${T.line2}` : "none",
                }}>
                  <div style={{ ...monoStyle, fontSize: 10.5, color: T.muted, letterSpacing: "0.12em", textTransform: "uppercase" }}>{col.lab}</div>
                  <div style={{ marginTop: 6, ...serifStyle, fontSize: 24, letterSpacing: "-0.02em", lineHeight: 1.05 }}>{col.name}</div>
                  <div style={{ color: T.muted, fontSize: 13, marginTop: 4 }}>{col.sub}</div>
                </div>
              ))}
            </div>

            {/* data rows */}
            {[
              {
                key: "Monthly rent",
                a: <><span style={{ ...serifStyle, fontSize: 22, letterSpacing: "-0.02em" }}>₹XX,XXX</span><span style={{ color: T.muted }}>/mo</span></>,
                b: <><span style={{ ...serifStyle, fontSize: 22, letterSpacing: "-0.02em" }}>₹XX,XXX</span><span style={{ color: T.muted }}>/mo</span></>,
              },
              { key: "Location", a: "Behind Christ Central", b: "<100m from Christ YPR gate" },
              { key: "Sharing options", a: "Single / Double ", b: "Single / Double / Triple" },
              { key: "Balcony", a: <><span style={{ color: T.sage, fontWeight: 600 }}>●</span> Common /floor</>, b: <><span style={{ color: T.sage, fontWeight: 600 }}>●</span> Every room</> },
              { key: "Meals", a: "4 meals/day", b: "4 meals/day" },
              { key: "Fridge", a: <><span style={{ color: T.sage, fontWeight: 600 }}>●</span> Common /floor</>, b: <><span style={{ color: T.sage, fontWeight: 600 }}>●</span> In every room</> },
              { key: "Security", a: "24/7", b: "24/7" },
              { key: "Smart TV", a: "Yes", b: "Yes" },
              { key: "Best for", a: "Christ Central students", b: "Christ YPR students" },
            ].map((row, ri) => (
              <div key={ri} className="cmp-row-grid" style={{ borderTop: `1px solid ${T.line2}` }}>
                <div className="cmp-cell" style={{
                  padding: "18px 24px", borderRight: `1px solid ${T.line2}`,
                  ...monoStyle, fontSize: 11, color: T.muted, letterSpacing: "0.1em", textTransform: "uppercase",
                  display: "flex", alignItems: "center", gap: 8,
                }}>{row.key}</div>
                <div className="cmp-cell" style={{ padding: "18px 24px", borderRight: `1px solid ${T.line2}`, fontSize: 14.5, color: T.ink2, lineHeight: 1.5 }}>{row.a}</div>
                <div className="cmp-cell" style={{ padding: "18px 24px", fontSize: 14.5, color: T.ink2, lineHeight: 1.5 }}>{row.b}</div>
              </div>
            ))}

            {/* footer row */}
            <div className="cmp-row-grid" style={{ borderTop: `1px solid ${T.line2}` }}>
              <div className="cmp-cell" style={{ padding: "18px 24px", borderRight: `1px solid ${T.line2}`, background: "#fff" }}>
                <div style={{ ...monoStyle, fontSize: 10.5, color: T.muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>⁂ both properties</div>
                <div style={{ ...serifStyle, fontSize: 18, letterSpacing: "-0.02em", marginTop: 4, lineHeight: 1.4 }}>Zero brokerage · Verified amenities · Immediate move-in</div>
              </div>
              {["Visit Koramangala →", "Visit Yeshwanthpur →"].map((label, i, arr) => (
                <div key={i} className="cmp-cell" style={{
                  padding: "18px 24px",
                  borderRight: i < arr.length - 1 ? `1px solid ${T.line2}` : "none",
                  background: T.paper,
                }}>
                  <button style={{
                    width: "100%", padding: 12, borderRadius: 99, background: T.ink,
                    color: "#fff", border: "none", fontWeight: 500, fontSize: 14,
                    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                    cursor: "pointer", fontFamily: "inherit",
                  }}>{label}</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== INQUIRE CTA ===== */}
        <div className="px-section" style={{ marginTop: 88 }}>
          <div className="mobile-panel" style={{
            background: `linear-gradient(180deg, ${T.paper2} 0%, ${T.mint} 100%)`,
            border: `1px solid ${T.line2}`, borderRadius: 28,
            padding: "56px",
          }}>
            <div className="inquire-grid">
              <div>
                <div style={monoEyebrow}>⁂ can&apos;t decide? we&apos;ll help.</div>
                <h2 style={{ margin: "14px 0 0", ...serifStyle, fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 0.95, letterSpacing: "-0.03em" }}>
                  Visit both<br />
                  <em style={{ fontStyle: "italic", color: T.sage }}>in one afternoon.</em>
                </h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <p style={{ color: T.ink2, fontSize: 14.5, lineHeight: 1.6, margin: 0 }}>
                  Our team will walk you through Koramangala in the morning and Yeshwanthpur by afternoon — so you can feel the difference yourself and decide with confidence. Just drop your number and we&apos;ll sort the rest.
                </p>
                <div className="inquire-form" style={{ display: "flex", gap: 10 }}>
                  <input
                    type="tel"
                    placeholder="Your phone number"
                    style={{
                      flex: 1, padding: "14px 18px", borderRadius: 99, border: `1px solid ${T.line2}`,
                      background: "#fff", font: "inherit", fontSize: 14, color: T.ink,
                      outline: "none",
                    }}
                  />
                  <button style={{
                    padding: "14px 22px", borderRadius: 99, background: T.ink, color: "#fff",
                    border: "none", fontWeight: 500, fontSize: 14,
                    display: "inline-flex", alignItems: "center", gap: 8,
                    cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap",
                  }}>
                    Book a visit <ArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <footer className="px-section" style={{ paddingTop: 40, paddingBottom: 32, borderTop: `1px solid ${T.line2}`, marginTop: 88 }}>
          <div className="foot-grid-inner">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Logo />
              </div>
              <p style={{ margin: "16px 0 0", color: T.muted, fontSize: 13.5, lineHeight: 1.55, maxWidth: 280 }}>
                Student living, done properly. Built in Bengaluru by people who got tired of settling for less.
              </p>
              <div style={{ ...monoStyle, fontSize: 11, color: T.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 24 }}>
                © 2026 — all rights reserved
              </div>
            </div>
            {[
              { h: "For residents", links: ["Browse properties", "Sharing options", "What's included", "Refer a friend"] },
              { h: "For enquiries", links: ["Contact us", "Schedule a visit", "Pricing", "FAQs"] },
              { h: "Company", links: ["About Livoza", "Our properties", "The Why", "Careers"] },
              { h: "Help", links: ["WhatsApp us", "Cancellation policy", "Privacy", "Terms"] },
            ].map((col, i) => (
              <div key={i}>
                <div style={{ ...monoStyle, fontSize: 11, color: T.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>{col.h}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {col.links.map((link, li) => (
                    <li key={li}><a href="#" style={{ fontSize: 14, color: T.ink2, textDecoration: "none" }}>{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 36, paddingTop: 18, borderTop: `1px solid ${T.line2}`,
            fontSize: 12, color: T.muted, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8,
          }}>
            <span>Privacy · Terms · Fair-housing policy</span>
            <span style={{ ...monoStyle, letterSpacing: "0.1em" }}>v.26.05 — ed.02 · properties</span>
          </div>
        </footer>

      </div>
    </>
  );
}

export function Logo() {
  return (
    <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
      <img src="/Livoza-Logo-new.png" alt="Livoza" style={{ height: 38, width: "auto", display: "block" }} />
    </Link>
  );
}