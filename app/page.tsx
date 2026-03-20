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
  const textColor = light ? "text-white" : "text-[#222222]";
  return (
    <a href="#" className="flex items-center gap-2">
      <img
        src="/logo.png"
        alt="Livoza"
        className="h-10 w-auto flex-shrink-0"
      />
      {/* <div className={`flex flex-col ${textColor}`}>
        <span className="font-bold text-lg tracking-tight leading-tight">
          LIVOZA
        </span>
        <span className="text-sm font-light tracking-[0.2em] opacity-90">
          GIRLS
        </span>
      </div> */}
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
    },
  ];

  const whyChoose = [
    {
      icon: Calendar,
      title: "Advance Payment",
      desc: "2 months' rent, fully adjustable in April & May.",
    },
    {
      icon: Wrench,
      title: "Maintenance",
      desc: "₹10,000 one-time annual charge covers upkeep and repairs.",
    },
    {
      icon: CreditCard,
      title: "Booking Advance",
      desc: "Secure your room with ₹20,000–₹30,000 upfront.",
    },
    {
      icon: Tag,
      title: "Annual Discount",
      desc: "5% off when you pay for the full year upfront.",
    },
    {
      icon: Sparkles,
      title: "Fully Furnished",
      desc: "Every room comes fully equipped for comfortable living.",
    },
    {
      icon: MapPin,
      title: "Prime Location",
      desc: "Steps away from Christ University, in the heart of Bangalore.",
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
    {
      quote:
        "The prime location and fully furnished rooms make Livoza the ideal choice for any Christ University student.",
      initial: "S",
      name: "Student",
      college: "Christ University",
    },
  ];

  const blogPosts = [
    {
      title: "Discovering the Ideal PG Near Christ University: Livoza Girls",
      date: "15 January 2024",
      readTime: "5 min read",
      excerpt:
        "Looking for comfortable, convenient, and affordable accommodation near Christ University? Livoza Girls PG is the preferred choice for students in Bangalore — just 100m from campus.",
    },
    {
      title: "Welcome to Livoza Girls: Your Premier PG near Christ University",
      date: "3 February 2024",
      readTime: "4 min read",
      excerpt:
        "Livoza Girls provides premium PG facilities with furnished rooms, washing machine, fridge, TV, and 24/7 security — steps away from Christ University Bangalore.",
    },
  ];

  return (
    <div className="bg-[#021210] text-[#EAEAEA] min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-transparent border-b border-white/10 backdrop-blur">
        <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <LivozaLogo />
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={
                  link.label === "Home"
                    ? "text-white/80 font-medium hover:text-[#e3bf5f]"
                    : "text-white/80 hover:text-[#e3bf5f] transition-colors"
                }
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:+919353477987"
              className="hidden md:flex items-center gap-2 bg-white/10 text-white px-5 py-2.5 rounded-full font-medium hover:bg-white/15 transition-colors"
            >
              <Phone className="w-4 h-4" />
              +91 9353477987
            </a>
            <button
              onClick={() => { setModalFormSubmitted(false); setBookFormError(null); setBookFormOpen(true); }}
              className="hidden md:block bg-[#e3bf5f] text-[#021210] px-6 py-2.5 rounded-full font-medium hover:bg-[#e3bf5f] transition-colors"
            >
              Book Now
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 z-40 bg-black/50 top-[73px]"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
        <div
          className={`md:hidden fixed top-[73px] right-0 z-50 w-full max-w-xs bg-[#021210] border-l border-white/10 shadow-xl transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col p-6 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-4 text-white/80 hover:bg-white/10 rounded-lg font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:+919353477987"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 flex items-center gap-2 py-3 px-4 text-[#e3bf5f] hover:bg-white/10 rounded-lg font-medium"
            >
              <Phone className="w-4 h-4" />
              +91 9353477987
            </a>
          </nav>
        </div>
      </header>

      {/* Book Your Stay Modal */}
      {bookFormOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-[#FFFFFF] rounded-2xl max-w-md w-full p-8 relative shadow-xl">
            <button
              onClick={() => setBookFormOpen(false)}
              className="absolute top-4 right-4 text-[#7A9B7E] hover:text-[#7A9B7E] text-2xl"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-[#222222] mb-1">
              Book Your Stay
            </h2>
            <p className="text-[#7A9B7E] text-sm mb-6">
              We&apos;ll call you back within 24 hours
            </p>
            {modalFormSubmitted ? (
              <div className="space-y-4">
                <p className="text-[#222222] font-medium">
                  Thank you! We&apos;ll call you back within 24 hours.
                </p>
                <a
                  href="tel:+919353477987"
                  className="inline-flex items-center gap-2 bg-[#1F3D2B] text-white px-6 py-3 rounded-full font-medium hover:bg-[#3E6B4F] transition-colors"
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
                  className="block w-full text-[#3E6B4F] font-medium hover:underline"
                >
                  Close
                </button>
              </div>
            ) : (
            <form className="space-y-4" onSubmit={handleModalFormSubmit}>
              <div>
                <label className="block text-sm font-medium text-[#7A9B7E] mb-1">
                  Room Type
                </label>
                <select
                  name="roomType"
                  required
                  className="w-full border border-[#EAEAEA] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#3E6B4F] focus:border-transparent"
                >
                  <option value="">Select room type</option>
                  <option value="Triple Sharing (Non AC)">
                    Triple Sharing (Non AC)
                  </option>
                  <option value="Double Sharing (Non AC)">
                    Double Sharing (Non AC)
                  </option>
                  <option value="Single Sharing (Non AC)">
                    Single Sharing (Non AC)
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#7A9B7E] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  className="w-full border border-[#EAEAEA] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#3E6B4F] focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#7A9B7E] mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  required
                  className="w-full border border-[#EAEAEA] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#3E6B4F] focus:border-transparent"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#7A9B7E] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="emailAddress"
                  className="w-full border border-[#EAEAEA] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#3E6B4F] focus:border-transparent"
                  placeholder="your@email.com (optional)"
                />
              </div>
              <button
                type="submit"
                disabled={isBookSubmitting}
                className="w-full bg-[#1F3D2B] text-white py-3 rounded-full font-medium hover:bg-[#3E6B4F] transition-colors disabled:opacity-70"
              >
                {isBookSubmitting ? "Submitting..." : "Request Callback"}
              </button>
              {bookFormError ? (
                <p className="text-sm text-red-600">{bookFormError}</p>
              ) : null}
            </form>
            )}
          </div>
        </div>
      )}

      <main className="pb-24 md:pb-0">
        {/* Hero Section */}
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
            <div className="absolute inset-0 bg-[#021210]/70" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full text-center">
            <p className="text-white/70 text-sm tracking-[0.2em] uppercase mb-4">
              Only For Girls · 100m from Christ University
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
              Livoza Girls
              <br />
              <span
                className="font-bold text-[#e3bf5f] drop-shadow-[0_6px_14px_rgba(0,0,0,0.30)]"
              >
                Premium Living
              </span>
            </h1>
            <p className="text-white/80 text-base md:text-lg max-w-[560px] mx-auto mb-8 leading-relaxed">
              Livoza Girls is situated just 100 metres from Christ University — a
              2-minute walk to campus. Everything you need is at your doorstep.
            </p>
            <div className="mt-2 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-3 text-white hover:bg-white/10 transition-colors"
                aria-label="Watch our video"
              >
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/10">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18V6L21 12L9 18Z" fill="#e3bf5f" />
                  </svg>
                </span>
                Watch Our Video
              </button>
              <button
                onClick={() => { setModalFormSubmitted(false); setBookFormError(null); setBookFormOpen(true); }}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#3E6B4F] px-8 py-3 text-white hover:bg-[#1F3D2B] transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Us Now: +91 9353477987
              </button>
            </div>
          </div>
        </section>

        {/* Search Form Bar */}
        <section className="hidden bg-[#e3bf5f] py-4 -mt-1 relative z-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8" />
        </section>

        {/* Facilities Icon Bar */}
        <section className="bg-[#FFFFFF] py-12 border-b border-[#EAEAEA]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <p className="text-center text-[#7A9B7E] text-sm mb-10 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
              <span className="inline-flex items-center justify-center gap-2">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-[#7A9B7E] flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="#7A9B7E"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span>Girls-Only PG</span>
              </span>
              <span className="text-[#D9D9D9] hidden sm:inline">·</span>
              <span>100m from Christ University</span>
              <span className="text-[#D9D9D9] hidden sm:inline">·</span>
              <span>Bangalore</span>
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {facilities.slice(0, 6).map((f) => (
                <div
                  key={f.title}
                  className="flex flex-col items-center text-center"
                >
                  <f.icon className="w-8 h-8 text-[#3E6B4F] mb-2" />
                  <span className="text-sm font-medium text-[#222222]">
                    {f.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service We Provide */}
        <section id="service" className="bg-[#021210] py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="text-white/60 text-sm tracking-[0.2em] uppercase mb-2 text-center">
              OUR FACILITIES
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[#F7F7F7] mb-4 text-center">
              Every Room Fully Equipped
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-16 text-center">
              Every room comes fully equipped for comfortable living. Washing Machine
              <br />
              - Refrigerator · Microwave/Oven · Smart TV · Furnished Rooms · 24/7 Girls-Only Security.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {facilities.slice(0, 6).map((f) => (
                <div
                  key={f.title}
                  className="bg-gradient-to-br from-[#195A3A] to-[#103925] rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors relative overflow-hidden"
                >
                  <div
                    className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_55%)]"
                    aria-hidden
                  />
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <f.icon className="w-10 h-10 text-[#e3bf5f] mb-4" />
                    <h3 className="text-[#F7F7F7] font-semibold text-lg mb-2">
                      {f.title}
                    </h3>
                    <p className="text-white/70 text-sm">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats (About section repurposed) */}
        <section id="about" className="py-24 bg-[#021210]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="hidden grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-[#3E6B4F] text-sm font-medium tracking-[0.2em] uppercase mb-2">
                  About Us
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-4xl text-[#222222] mb-6">
                  Steps away from Christ University, in the heart of Bangalore.
                </h2>
                <p className="text-[#7A9B7E] text-lg mb-8">
                  Livoza Girls is situated just 100 metres from Christ University
                  — a 2-minute walk to campus. Everything you need is at your
                  doorstep.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "01. Advance Payment — 2 months' rent, fully adjustable in April & May",
                    "02. Maintenance — ₹10,000 one-time annual charge covers upkeep and repairs",
                    "03. Booking Advance — Secure your room with ₹20,000–₹30,000 upfront",
                    "04. Annual Discount — 5% off when you pay for the full year upfront",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#3E6B4F] flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                      <span className="text-[#7A9B7E]">{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => { setModalFormSubmitted(false); setBookFormError(null); setBookFormOpen(true); }}
                  className="inline-flex items-center gap-2 bg-[#1F3D2B] text-white px-6 py-3 rounded-full font-medium hover:bg-[#3E6B4F] transition-colors"
                >
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/img-74fee9ff-d738-4933-b56e-5f2281417268.png"
                  alt="Livoza Girls PG — Premium furnished room"
                  className="rounded-2xl w-full aspect-[3/4] object-cover"
                />
                <img
                  src="/img-74fee9ff-d738-4933-b56e-5f2281417268.png"
                  alt="Livoza Girls PG — Room interior"
                  className="rounded-2xl w-full aspect-[3/4] object-cover mt-8"
                />
                <img
                  src="/img-74fee9ff-d738-4933-b56e-5f2281417268.png"
                  alt="Livoza Girls PG — Furnished accommodation"
                  className="rounded-2xl w-full aspect-[3/4] object-cover -mt-4"
                />
                <img
                  src="/img-74fee9ff-d738-4933-b56e-5f2281417268.png"
                  alt="Livoza Girls PG — Triple sharing room"
                  className="rounded-2xl w-full aspect-[3/4] object-cover mt-4"
                />
              </div>
            </div>
            <div className="mb-12 hidden">
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[#EAEAEA] mb-4">
                We Achieved Best
                <br />
                From Gardening
              </h2>
            </div>
            {/* Stats */}
            <div className="h-px bg-white/10 mb-10" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              {[
                { num: "100m", label: "From Christ University" },
                { num: "2 min", label: "Walk to Campus" },
                { num: "3+", label: "Room Types" },
                { num: "24/7", label: "Girls-Only Security" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#e3bf5f] mb-1">
                    {s.num}
                  </p>
                  <p className="text-white/70">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Properties */}
        <section id="property" className="py-24 bg-[#F5F1E8]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="text-[#3E6B4F] text-sm font-medium tracking-[0.2em] uppercase mb-2">
              Room Types
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl text-[#222222] mb-4">
              Choose Your Accommodation
            </h2>
            <p className="text-[#7A9B7E] text-lg mb-16 max-w-2xl">
              Every room comes fully equipped for comfortable living. Steps away
              from Christ University, in the heart of Bangalore — just 100 metres
              from campus (a 2-minute walk).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((p) => (
                <div
                  key={p.name}
                  className="bg-[#FFFFFF] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-[4/3]">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {p.new && (
                        <span className="bg-[#A3B18A] text-white text-xs px-2 py-1 rounded">
                          New
                        </span>
                      )}
                      <span className="bg-[#F5F1E8]/90 text-[#222222] text-xs px-2 py-1 rounded">
                        {p.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-[#7A9B7E] text-sm mb-2">{p.location}</p>
                    <h3 className="text-xl font-bold text-[#222222] mb-3">
                      {p.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs text-[#000000] bg-[#C8D5C0] px-2 py-1 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="font-semibold text-[#3E6B4F] mb-1">
                      Rent: {p.price} · Booking: {p.bookingAdvance} · Annual: {p.annualTotal}
                    </p>
                    <p className="text-[#7A9B7E] text-sm mb-4">{p.desc}</p>
                    <button
                      onClick={() => { setModalFormSubmitted(false); setBookFormError(null); setBookFormOpen(true); }}
                      className="inline-block bg-[#1F3D2B] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#3E6B4F] transition-colors"
                    >
                      Check Availability
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button
                onClick={() => { setModalFormSubmitted(false); setBookFormError(null); setBookFormOpen(true); }}
                className="inline-flex items-center gap-2 text-[#3E6B4F] font-medium hover:underline"
              >
                View All Properties
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="hidden py-24 bg-[#FFFFFF]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="text-[#3E6B4F] text-sm font-medium tracking-[0.2em] uppercase mb-2">
              Why Choose Us
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl text-[#222222] mb-4">
              Why Choose Livoza Girls?
            </h2>
            <p className="text-[#7A9B7E] text-lg mb-16 max-w-2xl">
              Transparent pricing, fully furnished rooms, and a prime location
              — everything you need for a comfortable stay near Christ University.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChoose.map((w) => {
                const Icon = w.icon;
                return (
                <div
                  key={w.title}
                    className="p-6 rounded-xl border border-[#EAEAEA] hover:border-[#3E6B4F]/30 hover:shadow-lg transition-all"
                >
                    <Icon className="w-8 h-8 text-[#3E6B4F] mb-4" />
                    <h3 className="text-xl font-bold text-[#222222] mb-2">
                    {w.title}
                  </h3>
                    <p className="text-[#7A9B7E]">{w.desc}</p>
                </div>
              );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-[#021210]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[#EAEAEA]">
                What They Say About Us?
              </h2>
              <p className="text-white/60 text-base md:text-lg mt-4 max-w-2xl mx-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>
            </div>

            <div className="bg-[#195A3A]/85 rounded-2xl p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {testimonials.slice(0, 4).map((t, i) => (
                  <div
                    key={`${t.initial}-${i}`}
                    className="relative bg-[#103925]/55 rounded-2xl p-6 min-h-[220px]"
                  >
                    <div className="flex gap-1 text-[#e3bf5f] text-xs mb-4">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <span key={idx}>★</span>
                      ))}
                    </div>

                    <p className="text-white/70 text-sm leading-relaxed">
                      &quot;{t.quote}&quot;
                    </p>

                    <span className="absolute bottom-6 right-6 text-[#e3bf5f] text-3xl leading-none">
                      ”
                    </span>

                    <div className="mt-6 flex items-center gap-3">
                      <span className="w-11 h-11 rounded-full bg-[#e3bf5f] text-[#021210] flex items-center justify-center font-bold">
                        {t.initial}
                      </span>
                      <div>
                        <p className="text-[#F7F7F7] font-bold text-sm">
                          {t.name}
                        </p>
                        <p className="text-white/60 text-xs">{t.college}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Us (Inserted after Testimonials) */}
        <section className="py-24 bg-[#F5F1E8]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-[#3E6B4F] text-sm font-medium tracking-[0.2em] uppercase mb-2">
                  ABOUT US
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-4xl text-[#222222] mb-6">
                  Steps away from Christ University,
                  <br />
                  in the heart of Bangalore.
                </h2>
                <p className="text-[#7A9B7E] text-lg mb-8">
                  Livoza Girls is situated just 100 metres from Christ University
                  — a 2-minute walk to campus. Everything you need is at your
                  doorstep. Fully furnished rooms with washing machine, fridge,
                  oven, TV and 24/7 girls-only security.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Advance Payment — 2 months' rent, adjustable in April & May",
                    "Maintenance — ₹10,000 one-time annual charge",
                    "Booking Advance — ₹20,000–₹30,000 to secure your room",
                    "Annual Discount — 5% off when you pay for the full year upfront",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#3E6B4F] flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17L4 12" />
                        </svg>
                      </span>
                      <span className="text-[#7A9B7E]">{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => { setModalFormSubmitted(false); setBookFormError(null); setBookFormOpen(true); }}
                  className="inline-flex items-center gap-2 bg-[#1F3D2B] text-white px-6 py-3 rounded-full font-medium hover:bg-[#3E6B4F] transition-colors"
                >
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/img1.jpeg"
                  alt="Livoza Girls PG — Premium furnished room"
                  className="rounded-2xl w-full aspect-[3/4] object-cover"
                />
                <img
                  src="/img2.jpeg"
                  alt="Livoza Girls PG — Room interior"
                  className="rounded-2xl w-full aspect-[3/4] object-cover mt-8"
                />
                <img
                  src="/img3.jpeg"
                  alt="Livoza Girls PG — Furnished accommodation"
                  className="rounded-2xl w-full aspect-[3/4] object-cover -mt-4"
                />
                <img
                  src="/triplebed.jpeg"
                  alt="Livoza Girls PG — Triple sharing room"
                  className="rounded-2xl w-full aspect-[3/4] object-cover mt-4"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Blog */}
        {/* <section id="blogs" className="py-24 bg-[#021210]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-[#e3bf5f] text-sm font-medium tracking-[0.2em] uppercase mb-2">
                  Our latest blog
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-4xl text-[#F7F7F7]">
                  Latest from Our Blog
                </h2>
              </div>
              <a
                href="#"
                className="text-[#e3bf5f] font-medium hover:underline hidden md:block"
              >
                View All Posts
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...blogPosts, blogPosts[0]].slice(0, 3).map((b, idx) => (
                <a
                  key={`${b.title}-${idx}`}
                  href="#"
                  className="group block bg-[#195A3A]/20 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow border border-white/5"
                >
                  <div className="relative aspect-video bg-[#103925]">
                    <img
                      src={idx === 0 ? "/img2.jpeg" : idx === 1 ? "/img3.jpeg" : "/img1.jpeg"}
                      alt={b.title}
                      className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-[#021210]/30" />
                  </div>
                  <div className="p-6 relative">
                    <h3 className="text-xl font-bold text-[#F7F7F7] mb-2 group-hover:text-[#e3bf5f] transition-colors">
                      {b.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-2">
                      {b.date} · {b.readTime}
                    </p>
                    <p className="text-white/70">{b.excerpt}</p>
                    <span className="inline-block mt-4 text-[#e3bf5f] font-medium">
                      Read More →
                    </span>
                  </div>
                </a>
              ))}
            </div>
            <a
              href="#"
              className="text-[#e3bf5f] font-medium hover:underline mt-8 md:hidden"
            >
              View All Posts
            </a>
          </div>
        </section> */}

        {/* Community CTA */}
        <section id="community" className="py-16 bg-[#103925]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-white mb-4">
              Be a Part of the Livoza Community
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Join students at Christ University building memories and
              friendships — just 100m from campus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919353477987"
                className="inline-block bg-[#FFFFFF] text-[#222222] px-8 py-3 rounded-full font-medium hover:bg-[#F5F1E8] transition-colors"
              >
                Call +91 9353477987
              </a>
              <a
                href="tel:+918360669796"
                className="inline-block border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                Call +91 8360669796
              </a>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 bg-[#F5F1E8]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <p className="text-[#3E6B4F] text-sm font-medium tracking-[0.2em] uppercase mb-2">
                  CONTACT LIVOZA
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-4xl text-[#222222] mb-4">
                  Request A Callback
                </h2>
                <p className="text-[#7A9B7E] mb-8">
                  Interested in Livoza Girls PG? Fill in the form and our team
                  will call you back within 24 hours to help you find your
                  perfect room.
                </p>
                <div className="space-y-6">
                  <div>
                    <p className="font-semibold text-[#222222] mb-1">
                      Location
                    </p>
                    <p className="text-[#7A9B7E]">
                      100 metres from Christ University · 2-minute walk · Bangalore
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#222222] mb-1">Phone</p>
                    <div className="flex flex-col gap-1">
                      <a
                        href="tel:+919353477987"
                        className="text-[#3E6B4F] hover:underline"
                      >
                        +91 9353477987
                      </a>
                      <a
                        href="tel:+918360669796"
                        className="text-[#3E6B4F] hover:underline"
                      >
                        +91 8360669796
                      </a>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-[#222222] mb-1">Email</p>
                    <a
                      href="mailto:info@livoza.com"
                      className="text-[#3E6B4F] hover:underline"
                    >
                      info@livoza.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="bg-[#FFFFFF] p-8 rounded-2xl shadow-sm">
                {contactFormSubmitted ? (
                  <div className="space-y-4">
                    <p className="text-[#222222] font-medium">
                      Thank you! We&apos;ll call you back within 24 hours.
                    </p>
                    <a
                      href="tel:+919353477987"
                      className="inline-flex items-center gap-2 bg-[#1F3D2B] text-white px-6 py-3 rounded-full font-medium hover:bg-[#3E6B4F] transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      Or call us now: +91 9353477987
                    </a>
                    <button
                      onClick={() => { setContactFormSubmitted(false); setContactFormError(null); }}
                      className="block w-full text-[#3E6B4F] font-medium hover:underline"
                    >
                      Submit another request
                    </button>
                  </div>
                ) : (
                <form className="space-y-4" onSubmit={handleContactFormSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-[#7A9B7E] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      className="w-full border border-[#EAEAEA] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#3E6B4F] focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#7A9B7E] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      required
                      className="w-full border border-[#EAEAEA] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#3E6B4F] focus:border-transparent"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#7A9B7E] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="emailAddress"
                      className="w-full border border-[#EAEAEA] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#3E6B4F] focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#7A9B7E] mb-1">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      className="w-full border border-[#EAEAEA] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#3E6B4F] focus:border-transparent"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isContactSubmitting}
                    className="w-full bg-[#1F3D2B] text-white py-3 rounded-full font-medium hover:bg-[#3E6B4F] transition-colors disabled:opacity-70"
                  >
                    {isContactSubmitting ? "Submitting..." : "Request Callback"}
                  </button>
                  {contactFormError ? (
                    <p className="text-sm text-red-600">{contactFormError}</p>
                  ) : null}
                </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="footer" className="bg-[#103925] py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="md:col-span-2">
                <LivozaLogo light />
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-white/60">Livoza Girls PG</span>
                </div>
                <p className="text-white/60 text-sm mt-4 max-w-sm">
                  Girls-only PG near Christ University — 100m from campus. Fully
                  furnished rooms with washing machine, fridge, oven, TV.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">Quick Link</h4>
                <ul className="space-y-3">
                  {["About", "Property", "Blogs", "Community", "Privacy Policy"].map(
                    (link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-white/60 hover:text-white transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">More Inquiry</h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="tel:+919353477987"
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      +91 9353477987
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+918360669796"
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      +91 8360669796
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:info@livoza.com"
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      info@livoza.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-16 bg-[#e3bf5f] px-6 py-4 text-center rounded-xl">
              <p className="text-[#021210] text-sm">
                Copyright © 2026 Livoza | Powered by Dragon Ventures
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* Mobile Floating CTA Buttons */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[70] bg-[#FFFFFF] border-t border-[#EAEAEA] shadow-2xl px-4 py-4">
        <div className="flex gap-3 max-w-7xl mx-auto">
          <a
            href="tel:+919353477987"
            className="flex-1 flex items-center justify-center gap-2 bg-[#1F3D2B] text-white py-3.5 px-4 rounded-full font-medium hover:bg-[#3E6B4F] transition-colors"
          >
            <Phone className="w-5 h-5 flex-shrink-0" />
            Call Now
          </a>
          <button
            onClick={() => { setModalFormSubmitted(false); setBookFormError(null); setBookFormOpen(true); }}
            className="flex-1 flex items-center justify-center gap-2 bg-[#3E6B4F] text-white py-3.5 px-4 rounded-full font-medium hover:bg-[#1F3D2B] transition-colors"
          >
            <Calendar className="w-5 h-5 flex-shrink-0" />
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
