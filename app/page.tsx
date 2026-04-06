"use client";

import React, { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import {
  Phone,
  Shield,
  Shirt,
  ChevronRight,
  Refrigerator,
  Tv,
  Sofa,
  CookingPot,
  Menu,
  X,
  Calendar,
  MapPin,
  Heart,
  Wrench,
  CreditCard,
  Tag,
  Sparkles,
} from "lucide-react";

function LivozaLogo({ light = false }: { light?: boolean }) {
  return (
    <a href="#" className="flex items-center gap-2">
      <div className="rounded-2xl border-2 border-[#e3bf5f] shadow-[0_0_14px_rgba(227,191,95,0.45)] overflow-hidden bg-white">
        <img
          src="/Livoza_logo-png.png"
          alt="Livoza"
          className="h-10 lg:h-14 w-auto flex-shrink-0 block"
        />
      </div>
    </a>
  );
}

export default function Home() {
  const [bookFormOpen, setBookFormOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalFormSubmitted, setModalFormSubmitted] = useState(false);
  const [contactFormSubmitted, setContactFormSubmitted] = useState(false);

  const [isBookSubmitting, setIsBookSubmitting] = useState(false);
  const [bookFormError, setBookFormError] = useState<string | null>(null);

  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [contactFormError, setContactFormError] = useState<string | null>(null);

  const createBookNowSubmission = useMutation(
    api.forms.createBookNowSubmission,
  );
  const createContactSubmission = useMutation(
    api.forms.createContactSubmission,
  );

  const handleModalFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (isBookSubmitting) return;

    setIsBookSubmitting(true);
    setBookFormError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const roomType = String(formData.get("roomType") ?? "").trim();
      const fullName = String(formData.get("fullName") ?? "").trim();
      const phoneNumber = String(formData.get("phoneNumber") ?? "").trim();
      const emailAddressRaw = formData.get("emailAddress");
      const emailAddress =
        typeof emailAddressRaw === "string" ? emailAddressRaw.trim() : "";

      await createBookNowSubmission({
        roomType,
        fullName,
        phoneNumber,
        emailAddress: emailAddress ? emailAddress : undefined,
      });

      setModalFormSubmitted(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to submit request.";
      setBookFormError(message);
    } finally {
      setIsBookSubmitting(false);
    }
  };

  const handleContactFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (isContactSubmitting) return;

    setIsContactSubmitting(true);
    setContactFormError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const fullName = String(formData.get("fullName") ?? "").trim();
      const phoneNumber = String(formData.get("phoneNumber") ?? "").trim();
      const emailAddressRaw = formData.get("emailAddress");
      const emailAddress =
        typeof emailAddressRaw === "string" ? emailAddressRaw.trim() : "";
      const messageRaw = formData.get("message");
      const message =
        typeof messageRaw === "string" ? messageRaw.trim() : "";

      await createContactSubmission({
        fullName,
        phoneNumber,
        emailAddress: emailAddress ? emailAddress : undefined,
        message: message ? message : undefined,
      });

      setContactFormSubmitted(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to submit request.";
      setContactFormError(message);
    } finally {
      setIsContactSubmitting(false);
    }
  };

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About Us" },
    { href: "#service", label: "Service" },
    { href: "#footer", label: "Contact Us" },
  ];

  const facilities = [
    {
      icon: Shirt,
      title: "Washing Machine",
      desc: "In-room washing machine for your convenience",
    },
    {
      icon: Refrigerator,
      title: "Refrigerator",
      desc: "Personal fridge in every room",
    },
    {
      icon: CookingPot,
      title: "Microwave / Oven",
      desc: "Kitchen appliances for easy cooking",
    },
    {
      icon: Tv,
      title: "Smart TV",
      desc: "Entertainment in every room",
    },
    {
      icon: Sofa,
      title: "Furnished Rooms",
      desc: "Fully furnished with bed, wardrobe, desk & more",
    },
    {
      icon: Shield,
      title: "24/7 Girls-Only Security",
      desc: "Dedicated security for your peace of mind",
    },
  ];

  const properties = [
    {
      type: "Girls",
      name: "Triple Sharing (Non AC)",
      location: "100m from Christ University, Bangalore",
      tags: [
        "Washing Machine",
        "Refrigerator",
        "Microwave/Oven",
        "Smart TV",
        "Furnished Rooms",
        "24/7 Girls-Only Security",
      ],
      price: "₹16,500/mo",
      bookingAdvance: "₹20,000",
      annualTotal: "₹1,98,100",
      desc: "Most affordable option, ideal for students on a budget.",
      image: "/triplebed.jpeg",
      new: true,
      badge: "Best Value",
    },
    {
      type: "Girls",
      name: "Double Sharing (Non AC)",
      location: "100m from Christ University, Bangalore",
      tags: [
        "Washing Machine",
        "Refrigerator",
        "Microwave/Oven",
        "Smart TV",
        "Furnished Rooms",
        "24/7 Girls-Only Security",
      ],
      price: "₹19,000/mo",
      bookingAdvance: "₹20,000",
      annualTotal: "₹2,26,600",
      desc: "A comfortable balance of privacy and affordability.",
      image: "/doublebed.jpeg",
      new: true,
      badge: "Most Popular",
    },
    {
      type: "Girls",
      name: "Single Sharing (Non AC)",
      location: "100m from Christ University, Bangalore",
      tags: [
        "Washing Machine",
        "Refrigerator",
        "Microwave/Oven",
        "Smart TV",
        "Furnished Rooms",
        "24/7 Girls-Only Security",
      ],
      price: "₹35,000/mo",
      bookingAdvance: "₹30,000",
      annualTotal: "₹4,09,000",
      desc: "Complete privacy with a fully furnished private room.",
      image: "/img1.jpeg",
      new: true,
      badge: "Premium",
    },
  ];

  const testimonials = [
    {
      quote:
        "Livoza has become such an important part of my college life. The comfortable rooms and friendly atmosphere made it feel like home.",
      initial: "M",
      name: "Student",
      college: "Christ University",
    },
    {
      quote:
        "Found the perfect PG near campus. The facilities are great and the 2-minute walk to Christ University is a huge plus.",
      initial: "K",
      name: "Student",
      college: "Christ University",
    },
    {
      quote:
        "Secure, clean, and fully equipped. The washing machine and fridge in the room make daily life so much easier.",
      initial: "V",
      name: "Student",
      college: "Christ University",
    },
    {
      quote:
        "Livoza was a lifesaver! Best accommodation I could have found near Christ. Affordable and has everything I need.",
      initial: "S",
      name: "Student",
      college: "Christ University",
    },
  ];

  const openBookForm = () => {
    setModalFormSubmitted(false);
    setBookFormError(null);
    setBookFormOpen(true);
  };

  return (
    <div className="bg-[#021210] text-[#EAEAEA] min-h-screen">
      {/* ── Header ── */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#021210]/80 border-b border-white/[0.07]">
        <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 lg:px-8 py-3">
          <LivozaLogo />
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/70 text-sm font-medium hover:text-[#e3bf5f] transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:+919353477987"
              className="hidden md:flex items-center gap-2 text-white/70 text-sm px-4 py-2 rounded-full border border-white/15 hover:border-white/30 hover:text-white transition-all duration-200"
            >
              <Phone className="w-3.5 h-3.5" />
              +91 9353477987
            </a>
            <button
              onClick={openBookForm}
              className="hidden md:block bg-[#e3bf5f] text-[#021210] px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#f0cf77] transition-colors duration-200 shadow-[0_2px_12px_rgba(227,191,95,0.35)]"
            >
              Book Now
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/60 top-[73px]"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
        <div
          className={`md:hidden fixed top-[73px] right-0 z-50 w-72 bg-[#061a15] border-l border-white/[0.08] shadow-2xl transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col p-5 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-4 text-white/75 hover:text-white hover:bg-white/[0.07] rounded-xl text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="h-px bg-white/[0.08] my-2" />
            <a
              href="tel:+919353477987"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-3 px-4 text-[#e3bf5f] hover:bg-white/[0.07] rounded-xl text-sm font-medium"
            >
              <Phone className="w-4 h-4" />
              +91 9353477987
            </a>
          </nav>
        </div>
      </header>

      {/* ── Book Your Stay Modal ── */}
      {bookFormOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#0a1f14] border border-white/[0.1] rounded-3xl max-w-md w-full p-8 relative shadow-2xl">
            <button
              onClick={() => setBookFormOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white/[0.07] text-white/50 hover:bg-white/[0.12] hover:text-white transition-colors text-lg font-medium"
              aria-label="Close"
            >
              ×
            </button>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-playfair)]">
                Book Your Stay
              </h2>
              <p className="text-white/45 text-sm mt-1">
                We&apos;ll call you back within 24 hours
              </p>
            </div>
            {modalFormSubmitted ? (
              <div className="space-y-4">
                <div className="bg-[#132e1e] rounded-2xl p-4 border border-[#3E6B4F]/40">
                  <p className="text-white font-semibold mb-1">Request received!</p>
                  <p className="text-white/55 text-sm">We&apos;ll call you back within 24 hours.</p>
                </div>
                <a
                  href="tel:+919353477987"
                  className="flex items-center justify-center gap-2 bg-[#3E6B4F] text-white px-6 py-3 rounded-full font-medium hover:bg-[#4d8060] transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  Or call us now: +91 9353477987
                </a>
                <button
                  onClick={() => {
                    setModalFormSubmitted(false);
                    setBookFormError(null);
                    setBookFormOpen(false);
                  }}
                  className="block w-full text-white/35 text-sm hover:text-white/60 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleModalFormSubmit}>
                <div>
                  <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">
                    Room Type
                  </label>
                  <select
                    name="roomType"
                    required
                    className="w-full border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-[#3E6B4F]/50 focus:border-[#3E6B4F] outline-none transition-all bg-[#061a12]"
                  >
                    <option value="" className="bg-[#061a12]">Select room type</option>
                    <option value="Triple Sharing (Non AC)" className="bg-[#061a12]">Triple Sharing (Non AC)</option>
                    <option value="Double Sharing (Non AC)" className="bg-[#061a12]">Double Sharing (Non AC)</option>
                    <option value="Single Sharing (Non AC)" className="bg-[#061a12]">Single Sharing (Non AC)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-[#7A9B7E]">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    className="w-full border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-[#3E6B4F]/50 focus:border-[#3E6B4F] outline-none transition-all bg-[#061a12] placeholder:text-white/20"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">
                    Phone Number <span className="text-[#7A9B7E]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    required
                    className="w-full border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-[#3E6B4F]/50 focus:border-[#3E6B4F] outline-none transition-all bg-[#061a12] placeholder:text-white/20"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="emailAddress"
                    className="w-full border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-[#3E6B4F]/50 focus:border-[#3E6B4F] outline-none transition-all bg-[#061a12] placeholder:text-white/20"
                    placeholder="your@email.com (optional)"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isBookSubmitting}
                  className="w-full bg-[#e3bf5f] text-[#021210] py-3.5 rounded-full font-semibold hover:bg-[#f0cf77] transition-colors disabled:opacity-60 text-sm tracking-wide shadow-[0_4px_14px_rgba(227,191,95,0.3)]"
                >
                  {isBookSubmitting ? "Submitting…" : "Request Callback"}
                </button>
                {bookFormError && (
                  <p className="text-sm text-red-400 bg-red-900/20 border border-red-500/20 px-3 py-2 rounded-lg">{bookFormError}</p>
                )}
              </form>
            )}
          </div>
        </div>
      )}

      <main className="pb-24 md:pb-0">

        {/* ── Hero ── */}
        <section
          id="home"
          className="relative min-h-[calc(100vh-73px)] flex items-center overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <img
              src="/img1.jpeg"
              alt="Livoza Girls PG — Premium furnished rooms"
              className="w-full h-full object-cover"
            />
            {/* Rich layered overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#021210]/75 via-[#021210]/60 to-[#021210]/85" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#021210]/40 via-transparent to-[#021210]/20" />
          </div>
          {/* Bottom fade into next section */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[28vh] bg-gradient-to-b from-transparent to-black"
            aria-hidden
          />

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full text-center pt-20">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 bg-white/[0.08] border border-white/[0.12] backdrop-blur-sm rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e3bf5f] animate-pulse" />
              <span className="text-white/80 text-xs tracking-[0.2em] uppercase font-medium">
                Girls-Only · 100m from Christ University
              </span>
            </div>

            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl lg:text-7xl xl:text-[80px] text-white leading-[1.08] mb-6 tracking-tight">
              Livoza Girls
              <br />
              <span className="text-[#e3bf5f] [text-shadow:0_0_40px_rgba(227,191,95,0.4),0_4px_16px_rgba(0,0,0,0.3)]">
                Premium Living
              </span>
            </h1>

            <p className="text-white/70 text-base md:text-lg max-w-[540px] mx-auto mb-10 leading-relaxed">
              Situated just 100 metres from Christ University — a 2-minute walk to campus.
              Everything you need, right at your doorstep.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/[0.07] backdrop-blur-sm px-7 py-3 text-white text-sm font-medium hover:bg-white/[0.12] transition-all duration-200"
                aria-label="Watch our video"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#e3bf5f]/20 border border-[#e3bf5f]/30">
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                    <path d="M1 1L9 6L1 11V1Z" fill="#e3bf5f" />
                  </svg>
                </span>
                Watch Our Video
              </button>
              <button
                onClick={openBookForm}
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#3E6B4F] px-7 py-3 text-white text-sm font-semibold hover:bg-[#2d5039] transition-all duration-200 shadow-[0_4px_20px_rgba(62,107,79,0.5)]"
              >
                <Phone className="w-4 h-4" />
                Call Us: +91 9353477987
              </button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/50 text-xs">
              {["Girls-Only PG", "Fully Furnished", "24/7 Security", "2 Min Walk to Campus"].map((item, i) => (
                <span key={item} className="flex items-center gap-1.5">
                  {i > 0 && <span className="w-1 h-1 rounded-full bg-white/30" />}
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Facilities Strip ── */}
        <section className="relative z-10 bg-black pb-0 border-b border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
            <div className="rounded-t-[2rem] sm:rounded-t-[2.5rem] bg-gradient-to-b from-[#1a4d35] to-[#0d281c] px-6 py-10 sm:px-10 sm:py-12 border border-white/[0.08] shadow-[0_-12px_48px_rgba(0,0,0,0.5)]">
              {/* Location bar */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 mb-10">
                {["Girls-Only PG", "100m from Christ University", "Bangalore"].map((label, i) => (
                  <span key={label} className="flex items-center gap-2 text-white/60 text-sm">
                    {i === 0 && (
                      <span className="w-4 h-4 rounded-full border border-[#7A9B7E] flex items-center justify-center flex-shrink-0">
                        <svg width="8" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 7L9 1" stroke="#7A9B7E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    )}
                    {i > 0 && <span className="text-white/20">·</span>}
                    {label}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-4">
                {facilities.map((f, i) => (
                  <div key={f.title} className="flex flex-col items-center text-center group">
                    <div className="w-12 h-12 rounded-2xl bg-[#e3bf5f]/10 border border-[#e3bf5f]/20 flex items-center justify-center mb-3 group-hover:bg-[#e3bf5f]/20 transition-colors duration-200">
                      <f.icon className="w-5 h-5 text-[#e3bf5f]" />
                    </div>
                    <span className="text-xs font-medium text-white/80 leading-snug">{f.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Our Facilities ── */}
        <section id="service" className="bg-[#021210] py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-[#e3bf5f] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                Our Facilities
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-white mb-5 tracking-tight">
                Every Room Fully Equipped
              </h2>
              <p className="text-white/50 text-base max-w-xl mx-auto leading-relaxed">
                Washing Machine · Refrigerator · Microwave/Oven · Smart TV · Furnished Rooms · 24/7 Girls-Only Security
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {facilities.map((f, i) => (
                <div
                  key={f.title}
                  className="group relative bg-gradient-to-br from-[#0f2e1e] to-[#0a1f14] rounded-2xl p-7 border border-white/[0.06] hover:border-[#e3bf5f]/25 transition-all duration-300 overflow-hidden"
                >
                  {/* Subtle shimmer on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#e3bf5f]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#e3bf5f]/10 border border-[#e3bf5f]/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#e3bf5f]/15 transition-colors duration-200">
                      <f.icon className="w-5 h-5 text-[#e3bf5f]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-base mb-1.5">{f.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section id="about" className="bg-[#021210] pb-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/[0.08]">
              {[
                { num: "100m", label: "From Christ University" },
                { num: "2 min", label: "Walk to Campus" },
                { num: "3+", label: "Room Types" },
                { num: "24/7", label: "Girls-Only Security" },
              ].map((s) => (
                <div key={s.label} className="text-center md:px-8">
                  <p className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-[#e3bf5f] mb-2">
                    {s.num}
                  </p>
                  <p className="text-white/50 text-sm tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-16" />
          </div>
        </section>

        {/* ── Our Properties ── */}
        <section id="property" className="py-28 bg-[#021210]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-14">
              <p className="text-[#e3bf5f] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                Room Types
              </p>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-white tracking-tight">
                    Choose Your Accommodation
                  </h2>
                  <p className="text-white/50 text-base mt-3 max-w-xl leading-relaxed">
                    Every room fully furnished and equipped — steps from Christ University, Bangalore.
                  </p>
                </div>
                <button
                  onClick={openBookForm}
                  className="hidden md:inline-flex items-center gap-2 text-[#e3bf5f] text-sm font-semibold hover:text-white transition-colors flex-shrink-0"
                >
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((p) => (
                <div
                  key={p.name}
                  className="bg-[#0a1f14] border border-white/[0.07] rounded-3xl overflow-hidden hover:border-white/[0.14] hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)] transition-all duration-300 group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-[#e3bf5f] text-[#021210] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {p.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-medium px-3 py-1 rounded-full">
                        {p.type}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-1 leading-snug">{p.name}</h3>
                    <p className="text-white/40 text-xs mb-4 flex items-center gap-1">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      {p.location}
                    </p>

                    <div className="bg-[#0f2e1e] border border-white/[0.06] rounded-2xl p-4 mb-4">
                      <div className="flex items-baseline gap-1 mb-0.5">
                        <span className="text-2xl font-bold text-[#e3bf5f] font-[family-name:var(--font-playfair)]">{p.price}</span>
                      </div>
                      <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-white/40">
                        <span>Booking: {p.bookingAdvance}</span>
                        <span>·</span>
                        <span>Annual: {p.annualTotal}</span>
                      </div>
                    </div>

                    <p className="text-white/50 text-sm mb-5 leading-relaxed">{p.desc}</p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {p.tags.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-medium text-[#7A9B7E] bg-[#132e1e] border border-white/[0.06] px-2.5 py-1 rounded-full"
                        >
                          {t}
                        </span>
                      ))}
                      {p.tags.length > 4 && (
                        <span className="text-[10px] font-medium text-white/40 bg-white/[0.05] px-2.5 py-1 rounded-full">
                          +{p.tags.length - 4} more
                        </span>
                      )}
                    </div>

                    <button
                      onClick={openBookForm}
                      className="w-full bg-[#3E6B4F] text-white py-3 rounded-full text-sm font-semibold hover:bg-[#4d8060] transition-colors duration-200"
                    >
                      Check Availability
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="py-28 bg-[#021210]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-[#e3bf5f] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                Testimonials
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-white tracking-tight">
                What Our Residents Say
              </h2>
              <p className="text-white/50 text-base mt-4 max-w-xl mx-auto leading-relaxed">
                Hear from students living at Livoza Girls PG near Christ University, Bangalore.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {testimonials.map((t, i) => (
                <div
                  key={`${t.initial}-${i}`}
                  className="relative bg-gradient-to-b from-[#132e1e] to-[#0d1f14] rounded-2xl p-6 border border-white/[0.07] hover:border-white/[0.12] transition-colors duration-300 flex flex-col"
                >
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <svg key={idx} width="12" height="12" viewBox="0 0 24 24" fill="#e3bf5f">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-white/70 text-sm leading-relaxed flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Large decorative quote */}
                  <span className="absolute top-4 right-5 text-[#e3bf5f]/15 text-6xl font-serif leading-none select-none">&rdquo;</span>

                  <div className="mt-6 pt-5 border-t border-white/[0.07] flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#e3bf5f] to-[#c9a43a] text-[#021210] flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {t.initial}
                    </span>
                    <div>
                      <p className="text-white/90 font-semibold text-sm">{t.name}</p>
                      <p className="text-white/40 text-xs">{t.college}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── About Us ── */}
        <section className="py-28 bg-[#061a12]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-[#e3bf5f] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
                  About Us
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-white mb-6 tracking-tight leading-tight">
                  Steps away from
                  <br />
                  Christ University.
                </h2>
                <p className="text-white/55 text-base mb-8 leading-relaxed">
                  Livoza Girls is situated just 100 metres from Christ University — a 2-minute walk to campus.
                  Fully furnished rooms with washing machine, fridge, oven, TV and 24/7 girls-only security.
                </p>
                <ul className="space-y-3 mb-10">
                  {[
                    "Advance Payment — 2 months' rent, adjustable in April & May",
                    "Maintenance — ₹10,000 one-time annual charge",
                    "Booking Advance — ₹20,000–₹30,000 to secure your room",
                    "Annual Discount — 5% off when you pay for the full year upfront",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#3E6B4F] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17L4 12" />
                        </svg>
                      </span>
                      <span className="text-white/55 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={openBookForm}
                  className="inline-flex items-center gap-2 bg-[#e3bf5f] text-[#021210] px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#f0cf77] transition-colors duration-200 shadow-[0_4px_16px_rgba(227,191,95,0.3)]"
                >
                  Book Your Room
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <img
                  src="/img1.jpeg"
                  alt="Livoza Girls PG — Premium furnished room"
                  className="rounded-2xl w-full aspect-[3/4] object-cover shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                />
                <img
                  src="/img2.jpeg"
                  alt="Livoza Girls PG — Room interior"
                  className="rounded-2xl w-full aspect-[3/4] object-cover mt-8 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                />
                <img
                  src="/img3.jpeg"
                  alt="Livoza Girls PG — Furnished accommodation"
                  className="rounded-2xl w-full aspect-[3/4] object-cover -mt-4 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                />
                <img
                  src="/triplebed.jpeg"
                  alt="Livoza Girls PG — Triple sharing room"
                  className="rounded-2xl w-full aspect-[3/4] object-cover mt-4 shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Community CTA ── */}
        <section id="community" className="py-24 bg-gradient-to-b from-[#103925] to-[#0d281c] relative overflow-hidden">
          {/* Background texture */}
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_30%_50%,#e3bf5f_0%,transparent_60%)]" />
          <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_70%_50%,#e3bf5f_0%,transparent_60%)]" />

          <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <p className="text-[#e3bf5f]/70 text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              Join Us
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl text-white mb-5 tracking-tight">
              Be a Part of the<br />Livoza Community
            </h2>
            <p className="text-white/70 text-base mb-10 leading-relaxed">
              Join students at Christ University building memories and friendships — just 100m from campus.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+919353477987"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#1F3D2B] px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-[#F5F1E8] transition-colors duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
              >
                <Phone className="w-4 h-4" />
                +91 9353477987
              </a>
              <a
                href="tel:+918360669796"
                className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-white/[0.08] transition-colors duration-200"
              >
                <Phone className="w-4 h-4" />
                +91 8360669796
              </a>
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="py-28 bg-[#021210]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <p className="text-[#e3bf5f] text-xs font-semibold tracking-[0.25em] uppercase mb-4">
                  Contact Livoza
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-white mb-4 tracking-tight">
                  Request A Callback
                </h2>
                <p className="text-white/50 text-base mb-10 leading-relaxed">
                  Interested in Livoza Girls PG? Fill in the form and our team will call you back within 24 hours.
                </p>

                <div className="space-y-7">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#3E6B4F]/20 border border-white/[0.07] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-[#7A9B7E]" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm mb-1">Location</p>
                      <p className="text-white/45 text-sm">100 metres from Christ University · 2-minute walk · Bangalore</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#3E6B4F]/20 border border-white/[0.07] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-[#7A9B7E]" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm mb-1">Phone</p>
                      <div className="flex flex-col gap-1">
                        <a href="tel:+919353477987" className="text-[#7A9B7E] text-sm hover:text-[#e3bf5f] transition-colors">+91 9353477987</a>
                        <a href="tel:+918360669796" className="text-[#7A9B7E] text-sm hover:text-[#e3bf5f] transition-colors">+91 8360669796</a>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#3E6B4F]/20 border border-white/[0.07] flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[#7A9B7E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm mb-1">Email</p>
                      <a href="mailto:info@livoza.com" className="text-[#7A9B7E] text-sm hover:text-[#e3bf5f] transition-colors">info@livoza.com</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0a1f14] border border-white/[0.08] rounded-3xl p-8">
                {contactFormSubmitted ? (
                  <div className="space-y-4 py-4">
                    <div className="bg-[#132e1e] rounded-2xl p-5 border border-[#3E6B4F]/40">
                      <p className="text-white font-semibold mb-1">Request received!</p>
                      <p className="text-white/55 text-sm">We&apos;ll call you back within 24 hours.</p>
                    </div>
                    <a
                      href="tel:+919353477987"
                      className="flex items-center justify-center gap-2 bg-[#3E6B4F] text-white px-6 py-3.5 rounded-full font-semibold hover:bg-[#4d8060] transition-colors text-sm"
                    >
                      <Phone className="w-4 h-4" />
                      Or call us: +91 9353477987
                    </a>
                    <button
                      onClick={() => { setContactFormSubmitted(false); setContactFormError(null); }}
                      className="block w-full text-white/40 text-sm hover:text-white/70 transition-colors"
                    >
                      Submit another request
                    </button>
                  </div>
                ) : (
                  <form className="space-y-5" onSubmit={handleContactFormSubmit}>
                    <div>
                      <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">
                        Full Name <span className="text-[#7A9B7E]">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        className="w-full border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-[#3E6B4F]/50 focus:border-[#3E6B4F] outline-none transition-all bg-[#061a12] placeholder:text-white/20"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">
                        Phone Number <span className="text-[#7A9B7E]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        required
                        className="w-full border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-[#3E6B4F]/50 focus:border-[#3E6B4F] outline-none transition-all bg-[#061a12] placeholder:text-white/20"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="emailAddress"
                        className="w-full border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-[#3E6B4F]/50 focus:border-[#3E6B4F] outline-none transition-all bg-[#061a12] placeholder:text-white/20"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5">
                        Message
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        className="w-full border border-white/[0.1] rounded-xl px-4 py-3 text-white text-sm focus:ring-2 focus:ring-[#3E6B4F]/50 focus:border-[#3E6B4F] outline-none transition-all bg-[#061a12] resize-none placeholder:text-white/20"
                        placeholder="Tell us about your requirements…"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isContactSubmitting}
                      className="w-full bg-[#e3bf5f] text-[#021210] py-3.5 rounded-full font-semibold hover:bg-[#f0cf77] transition-colors disabled:opacity-60 text-sm tracking-wide shadow-[0_4px_14px_rgba(227,191,95,0.3)]"
                    >
                      {isContactSubmitting ? "Submitting…" : "Request Callback"}
                    </button>
                    {contactFormError && (
                      <p className="text-sm text-red-400 bg-red-900/20 border border-red-500/20 px-3 py-2 rounded-lg">{contactFormError}</p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer id="footer" className="bg-[#0d281c] pt-16 pb-0">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/[0.08]">
              <div className="md:col-span-2">
                <LivozaLogo light />
                <p className="text-white/50 text-sm mt-4 max-w-xs leading-relaxed">
                  Girls-only PG near Christ University — 100m from campus. Fully furnished rooms with washing machine, fridge, oven, and Smart TV.
                </p>
                <div className="flex gap-3 mt-6">
                  <a
                    href="tel:+919353477987"
                    className="inline-flex items-center gap-2 bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 text-white/70 hover:text-white text-xs px-4 py-2 rounded-full transition-all duration-200"
                  >
                    <Phone className="w-3 h-3" />
                    Call Now
                  </a>
                  <a
                    href="mailto:info@livoza.com"
                    className="inline-flex items-center gap-2 bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 text-white/70 hover:text-white text-xs px-4 py-2 rounded-full transition-all duration-200"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </a>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm mb-5 tracking-wide">Quick Links</h4>
                <ul className="space-y-3">
                  {["About", "Property", "Blogs", "Community", "Privacy Policy"].map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white/50 hover:text-white text-sm transition-colors duration-200">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white text-sm mb-5 tracking-wide">Contact</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="tel:+919353477987" className="text-white/50 hover:text-white text-sm transition-colors duration-200">
                      +91 9353477987
                    </a>
                  </li>
                  <li>
                    <a href="tel:+918360669796" className="text-white/50 hover:text-white text-sm transition-colors duration-200">
                      +91 8360669796
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@livoza.com" className="text-white/50 hover:text-white text-sm transition-colors duration-200">
                      info@livoza.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="text-white/35 text-xs">
                Copyright © 2026 Livoza. All rights reserved.
              </p>
              <p className="text-white/35 text-xs">
                Powered by Dragon Ventures
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* ── Mobile Floating CTA ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[70] bg-[#021210]/95 backdrop-blur border-t border-white/[0.08] shadow-[0_-4px_20px_rgba(0,0,0,0.4)] px-4 py-3">
        <div className="flex gap-3 max-w-7xl mx-auto">
          <a
            href="tel:+919353477987"
            className="flex-1 flex items-center justify-center gap-2 bg-[#1F3D2B] text-white py-3 px-4 rounded-full text-sm font-semibold hover:bg-[#3E6B4F] transition-colors shadow-[0_2px_10px_rgba(31,61,43,0.3)]"
          >
            <Phone className="w-4 h-4 flex-shrink-0" />
            Call Now
          </a>
          <button
            onClick={openBookForm}
            className="flex-1 flex items-center justify-center gap-2 bg-[#e3bf5f] text-[#021210] py-3 px-4 rounded-full text-sm font-semibold hover:bg-[#f0cf77] transition-colors shadow-[0_2px_10px_rgba(227,191,95,0.35)]"
          >
            <Calendar className="w-4 h-4 flex-shrink-0" />
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
