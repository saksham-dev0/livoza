"use client";

import React, { useState } from "react";
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
  const textColor = light ? "text-white" : "text-[#202E29]";
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

  const handleModalFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModalFormSubmitted(true);
  };

  const handleContactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactFormSubmitted(true);
  };

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#property", label: "Property" },
    { href: "#blogs", label: "Blogs" },
    { href: "#community", label: "Community" },
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
      tags: ["Washing Machine", "Fridge", "TV", "Furnished"],
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
      tags: ["Washing Machine", "Fridge", "TV", "Furnished"],
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
      tags: ["Washing Machine", "Fridge", "TV", "Furnished"],
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
      desc: "Every room comes with washing machine, fridge, oven, TV and more.",
    },
    {
      icon: MapPin,
      title: "Prime Location",
      desc: "Steps away from Christ University — just a 2-minute walk to campus.",
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
    <div className="bg-[#F9F9F7] text-[#202E29] min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#F9F9F7] border-b border-[#C3B7A7]">
        <nav className="flex justify-between items-center max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <LivozaLogo />
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={
                  link.label === "Home"
                    ? "text-[#354C48] font-medium hover:text-[#202E29]"
                    : "text-[#202E29] hover:text-[#354C48] transition-colors"
                }
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a
              href="tel:+919353477987"
              className="hidden md:flex items-center gap-2 bg-[#202E29] text-white px-5 py-2.5 rounded-full font-medium hover:bg-[#354C48] transition-colors"
            >
              <Phone className="w-4 h-4" />
              +91 9353477987
            </a>
            <button
              onClick={() => { setModalFormSubmitted(false); setBookFormOpen(true); }}
              className="hidden md:block bg-[#202E29] text-white px-6 py-2.5 rounded-full font-medium hover:bg-[#354C48] transition-colors"
            >
              Book Now
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#202E29] hover:bg-[#E1DCD3] rounded-lg transition-colors"
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
          className={`md:hidden fixed top-[73px] right-0 z-50 w-full max-w-xs bg-[#F9F9F7] border-l border-[#C3B7A7] shadow-xl transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <nav className="flex flex-col p-6 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-4 text-[#202E29] hover:bg-[#E1DCD3] rounded-lg font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:+919353477987"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 flex items-center gap-2 py-3 px-4 text-[#354C48] hover:bg-[#E1DCD3] rounded-lg font-medium"
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
          <div className="bg-[#F9F9F7] rounded-2xl max-w-md w-full p-8 relative shadow-xl">
            <button
              onClick={() => setBookFormOpen(false)}
              className="absolute top-4 right-4 text-[#968A79] hover:text-[#796D5D] text-2xl"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-[#202E29] mb-1">
              Book Your Stay
            </h2>
            <p className="text-[#796D5D] text-sm mb-6">
              We&apos;ll call you back within 24 hours
            </p>
            {modalFormSubmitted ? (
              <div className="space-y-4">
                <p className="text-[#202E29] font-medium">
                  Thank you! We&apos;ll call you back within 24 hours.
                </p>
                <a
                  href="tel:+919353477987"
                  className="inline-flex items-center gap-2 bg-[#202E29] text-white px-6 py-3 rounded-full font-medium hover:bg-[#354C48] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Or call us now: +91 9353477987
                </a>
                <button
                  onClick={() => {
                    setModalFormSubmitted(false);
                    setBookFormOpen(false);
                  }}
                  className="block w-full text-[#354C48] font-medium hover:underline"
                >
                  Close
                </button>
              </div>
            ) : (
            <form className="space-y-4" onSubmit={handleModalFormSubmit}>
              <div>
                <label className="block text-sm font-medium text-[#796D5D] mb-1">
                  Room Type
                </label>
                <select className="w-full border border-[#C3B7A7] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#354C48] focus:border-transparent">
                  <option>Select room type</option>
                  <option>Triple Sharing (Non AC)</option>
                  <option>Double Sharing (Non AC)</option>
                  <option>Single Sharing (Non AC)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#796D5D] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full border border-[#C3B7A7] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#354C48] focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#796D5D] mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  className="w-full border border-[#C3B7A7] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#354C48] focus:border-transparent"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#796D5D] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full border border-[#C3B7A7] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#354C48] focus:border-transparent"
                  placeholder="your@email.com (optional)"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#202E29] text-white py-3 rounded-full font-medium hover:bg-[#354C48] transition-colors"
              >
                Request Callback
              </button>
            </form>
            )}
          </div>
        </div>
      )}

      <main className="pb-24 md:pb-0">
        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-screen flex items-center pt-20 overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <img
              src="/img1.jpeg"
              alt="Livoza Girls PG — Premium furnished rooms"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#202E29]/70" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <p className="text-white/90 text-sm tracking-[0.2em] uppercase mb-4">
              Only For Girls · 100m from Christ University
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
              Livoza Girls
              <br />
              <span
                className="font-bold bg-[linear-gradient(90deg,#D4AF37_0%,#F6E27C_10%,#FFF4B3_28%,#FFF4B3_50%,#FFF4B3_72%,#F6E27C_90%,#D4AF37_100%)] bg-clip-text text-transparent drop-shadow-[0_6px_14px_rgba(0,0,0,0.30)] [text-shadow:0_0_12px_rgba(212,175,55,0.35)]"
              >
                Premium Living
              </span>
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-10">
              Just 100m from Christ University — a 2-minute walk. Fully equipped
              rooms with washing machine, fridge, oven, TV and more.
            </p>
            <button
              onClick={() => { setModalFormSubmitted(false); setBookFormOpen(true); }}
              className="group inline-flex items-center gap-2 rounded-full p-[2px] bg-[linear-gradient(90deg,#AA9F91_0%,#F6E27C_35%,#FFF4B3_50%,#F6E27C_65%,#AA9F91_100%)]"
            >
              <span className="relative z-10 bg-[#202E29] text-white px-8 py-4 rounded-full font-medium transition-colors group-hover:bg-[#354C48] inline-flex items-center gap-2">
                Book Your Stay
              </span>
            </button>
            <p className="mt-8 text-white/80 text-sm flex items-center gap-2">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              2 mins walk · 100m from Christ University
            </p>
          </div>
        </section>

        {/* Search Form Bar */}
        <section className="bg-[#F9F9F7] py-8 border-b border-[#C3B7A7] -mt-1 relative z-10">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            {/* <div className="flex flex-col lg:flex-row gap-4 items-center justify-center">
              <select className="w-full lg:w-40 border border-gray-300 rounded-lg px-4 py-2.5 text-sm">
                <option>Room Type</option>
                <option>Triple Sharing (Non AC)</option>
                <option>Double Sharing (Non AC)</option>
                <option>Single Sharing (Non AC)</option>
              </select>
              <select className="w-full lg:w-56 border border-gray-300 rounded-lg px-4 py-2.5 text-sm">
                <option>Select Campus</option>
                <option>Christ University Main Campus</option>
              </select>
              <select className="w-full lg:w-48 border border-gray-300 rounded-lg px-4 py-2.5 text-sm">
                <option>Location</option>
                <option>100m from Christ University</option>
              </select>
              <button className="w-full lg:w-auto bg-[#202E29] text-white px-8 py-2.5 rounded-full font-medium hover:bg-[#354C48] transition-colors">
                Find Now
              </button>
            </div> */}
            <p className="text-center text-[#796D5D] text-sm mt-4 flex items-center justify-center gap-2 flex-wrap">
              <Heart className="w-4 h-4 flex-shrink-0" />
              Girls-Only PG
              <MapPin className="w-4 h-4 flex-shrink-0" />
              100m from Christ University · Bangalore
            </p>
          </div>
        </section>

        {/* Facilities Icon Bar */}
        <section className="bg-[#F9F9F7] py-12 border-b border-[#C3B7A7]">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {facilities.slice(0, 6).map((f) => (
                <div
                  key={f.title}
                  className="flex flex-col items-center text-center"
                >
                  <f.icon className="w-8 h-8 text-[#354C48] mb-2" />
                  <span className="text-sm font-medium text-[#202E29]">
                    {f.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Facilities - Dark Section */}
        <section className="bg-[#202E29] py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="text-[#C3B7A7] text-sm font-medium tracking-[0.2em] uppercase mb-2">
              Our Facilities
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-white mb-4">
              Every Room Fully{" "}
              <span className="text-[#C3B7A7]">Equipped</span>
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mb-16">
              Every room comes fully equipped for comfortable living. Washing
              Machine · Refrigerator · Microwave/Oven · Smart TV · Furnished Rooms
              · 24/7 Girls-Only Security.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {facilities.map((f) => (
                <div
                  key={f.title}
                  className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-[#C3B7A7]/30 transition-colors"
                >
                  <f.icon className="w-10 h-10 text-[#C3B7A7] mb-4" />
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {f.title}
                  </h3>
                  <p className="text-white/70 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Us */}
        <section id="about" className="py-24 bg-[#F9F9F7]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-[#354C48] text-sm font-medium tracking-[0.2em] uppercase mb-2">
                  About Us
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-4xl text-[#202E29] mb-6">
                  Steps away from Christ University, in the heart of Bangalore.
                </h2>
                <p className="text-[#796D5D] text-lg mb-8">
                  Livoza Girls is situated just 100 metres from Christ
                  University — a 2-minute walk to campus. Everything you need is
                  at your doorstep. Fully furnished rooms with washing machine,
                  fridge, oven, TV and 24/7 girls-only security.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Advance Payment — 2 months' rent, adjustable in April & May",
                    "Maintenance — ₹10,000 one-time annual charge",
                    "Booking Advance — ₹20,000–₹30,000 to secure your room",
                    "Annual Discount — 5% off when you pay for the full year",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#354C48] flex items-center justify-center flex-shrink-0">
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
                      <span className="text-[#796D5D]">{item}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => { setModalFormSubmitted(false); setBookFormOpen(true); }}
                  className="inline-flex items-center gap-2 bg-[#202E29] text-white px-6 py-3 rounded-full font-medium hover:bg-[#354C48] transition-colors"
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
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-16 border-t border-[#C3B7A7]">
              {[
                { num: "100m", label: "From Christ University" },
                { num: "2 min", label: "Walk to Campus" },
                { num: "3", label: "Room Types" },
                { num: "24/7", label: "Girls-Only Security" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-[#354C48] mb-1">
                    {s.num}
                  </p>
                  <p className="text-[#796D5D]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Properties */}
        <section id="property" className="py-24 bg-[#E1DCD3]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="text-[#354C48] text-sm font-medium tracking-[0.2em] uppercase mb-2">
              Room Options
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl text-[#202E29] mb-4">
              Comfortable Accommodation
            </h2>
            <p className="text-[#796D5D] text-lg mb-16 max-w-2xl">
              Fully furnished rooms with washing machine, fridge, oven, TV — 100m
              from Christ University, Bangalore.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((p) => (
                <div
                  key={p.name}
                  className="bg-[#F9F9F7] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-[4/3]">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {p.new && (
                        <span className="bg-[#354C48] text-white text-xs px-2 py-1 rounded">
                          New
                        </span>
                      )}
                      <span className="bg-[#F9F9F7]/90 text-[#202E29] text-xs px-2 py-1 rounded">
                        {p.type}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-[#796D5D] text-sm mb-2">{p.location}</p>
                    <h3 className="text-xl font-bold text-[#202E29] mb-3">
                      {p.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs text-[#796D5D] bg-[#E1DCD3] px-2 py-1 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <p className="font-semibold text-[#354C48] mb-1">
                      Rent: {p.price} · Booking: {p.bookingAdvance} · Annual: {p.annualTotal}
                    </p>
                    <p className="text-[#796D5D] text-sm mb-4">{p.desc}</p>
                    <button
                      onClick={() => { setModalFormSubmitted(false); setBookFormOpen(true); }}
                      className="inline-block bg-[#202E29] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#354C48] transition-colors"
                    >
                      Check Availability
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <button
                onClick={() => { setModalFormSubmitted(false); setBookFormOpen(true); }}
                className="inline-flex items-center gap-2 text-[#354C48] font-medium hover:underline"
              >
                View All Properties
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 bg-[#F9F9F7]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="text-[#354C48] text-sm font-medium tracking-[0.2em] uppercase mb-2">
              Why Choose Us
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl text-[#202E29] mb-4">
              Why Choose Livoza Girls?
            </h2>
            <p className="text-[#796D5D] text-lg mb-16 max-w-2xl">
              Transparent pricing, fully furnished rooms, and a prime location
              — everything you need for a comfortable stay near Christ University.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChoose.map((w) => {
                const Icon = w.icon;
                return (
                <div
                  key={w.title}
                  className="p-6 rounded-xl border border-[#C3B7A7] hover:border-[#354C48]/30 hover:shadow-lg transition-all"
                >
                  <Icon className="w-8 h-8 text-[#354C48] mb-4" />
                  <h3 className="text-xl font-bold text-[#202E29] mb-2">
                    {w.title}
                  </h3>
                  <p className="text-[#796D5D]">{w.desc}</p>
                </div>
              );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-[#E1DCD3]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="text-[#354C48] text-sm font-medium tracking-[0.2em] uppercase mb-2">
              Testimonials
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl text-[#202E29] mb-4">
              What Our Residents Say
            </h2>
            <p className="text-[#796D5D] text-lg mb-16">
              Let&apos;s hear it from our residents.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="bg-[#F9F9F7] p-8 rounded-2xl shadow-sm"
                >
                  <p className="text-[#796D5D] mb-6 italic">&quot;{t.quote}&quot;</p>
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-12 rounded-full bg-[#354C48] text-white flex items-center justify-center font-bold">
                      {t.initial}
                    </span>
                    <div>
                      <p className="font-bold text-[#202E29]">{t.name}</p>
                      <p className="text-sm text-[#796D5D]">{t.college}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog */}
        {/* <section id="blogs" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-[#354C48] text-sm font-medium tracking-[0.2em] uppercase mb-2">
                  Blog
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-4xl text-[#202E29]">
                  Latest from Our Blog
                </h2>
              </div>
              <a
                href="#"
                className="text-[#354C48] font-medium hover:underline hidden md:block"
              >
                View All Posts
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.map((b) => (
                <a
                  key={b.title}
                  href="#"
                  className="group block bg-[#E1DCD3] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-video bg-[#C3B7A7]">
                    <img
                      src="/img2.jpeg"
                      alt={b.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#202E29] mb-2 group-hover:text-[#354C48] transition-colors">
                      {b.title}
                    </h3>
                    <p className="text-[#796D5D] text-sm mb-2">
                      {b.date} · {b.readTime}
                    </p>
                    <p className="text-[#796D5D]">{b.excerpt}</p>
                    <span className="inline-block mt-4 text-[#354C48] font-medium">
                      Read More →
                    </span>
                  </div>
                </a>
              ))}
            </div>
            <a
              href="#"
              className="text-[#354C48] font-medium hover:underline mt-8 md:hidden"
            >
              View All Posts
            </a>
          </div>
        </section> */}

        {/* Community CTA */}
        <section id="community" className="py-16 bg-[#202E29]">
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
                className="inline-block bg-[#F9F9F7] text-[#202E29] px-8 py-3 rounded-full font-medium hover:bg-[#E1DCD3] transition-colors"
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
        <section className="py-24 bg-[#E1DCD3]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <p className="text-[#354C48] text-sm font-medium tracking-[0.2em] uppercase mb-2">
                  Contact Livoza
                </p>
                <h2 className="font-[family-name:var(--font-playfair)] text-4xl text-[#202E29] mb-4">
                  Request A Callback
                </h2>
                <p className="text-[#796D5D] mb-8">
                  Interested in Livoza Girls PG? Fill in the form and our team
                  will call you back within 24 hours to help you find your
                  perfect room.
                </p>
                <div className="space-y-6">
                  <div>
                    <p className="font-semibold text-[#202E29] mb-1">
                      Location
                    </p>
                    <p className="text-[#796D5D]">
                      100 metres from Christ University · 2-minute walk · Bangalore
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#202E29] mb-1">Phone</p>
                    <div className="flex flex-col gap-1">
                      <a
                        href="tel:+919353477987"
                        className="text-[#354C48] hover:underline"
                      >
                        +91 9353477987
                      </a>
                      <a
                        href="tel:+918360669796"
                        className="text-[#354C48] hover:underline"
                      >
                        +91 8360669796
                      </a>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-[#202E29] mb-1">Email</p>
                    <a
                      href="mailto:info@livoza.com"
                      className="text-[#354C48] hover:underline"
                    >
                      info@livoza.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="bg-[#F9F9F7] p-8 rounded-2xl shadow-sm">
                {contactFormSubmitted ? (
                  <div className="space-y-4">
                    <p className="text-[#202E29] font-medium">
                      Thank you! We&apos;ll call you back within 24 hours.
                    </p>
                    <a
                      href="tel:+919353477987"
                      className="inline-flex items-center gap-2 bg-[#202E29] text-white px-6 py-3 rounded-full font-medium hover:bg-[#354C48] transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      Or call us now: +91 9353477987
                    </a>
                    <button
                      onClick={() => setContactFormSubmitted(false)}
                      className="block w-full text-[#354C48] font-medium hover:underline"
                    >
                      Submit another request
                    </button>
                  </div>
                ) : (
                <form className="space-y-4" onSubmit={handleContactFormSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-[#796D5D] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full border border-[#C3B7A7] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#354C48] focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#796D5D] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full border border-[#C3B7A7] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#354C48] focus:border-transparent"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#796D5D] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full border border-[#C3B7A7] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#354C48] focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#796D5D] mb-1">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      className="w-full border border-[#C3B7A7] rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-[#354C48] focus:border-transparent"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#202E29] text-white py-3 rounded-full font-medium hover:bg-[#354C48] transition-colors"
                  >
                    Request Callback
                  </button>
                </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#202E29] py-16">
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
            <div className="mt-16 pt-8 border-t border-white/10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-white/60 text-sm text-center md:text-left">
                  © Livoza Girls 2025 | All Rights Reserved
                </p>
                <p className="text-white/40 text-sm">
                  100m from Christ University · Bangalore
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Mobile Floating CTA Buttons */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[70] bg-[#F9F9F7] border-t border-[#C3B7A7] shadow-2xl px-4 py-4">
        <div className="flex gap-3 max-w-7xl mx-auto">
          <a
            href="tel:+919353477987"
            className="flex-1 flex items-center justify-center gap-2 bg-[#202E29] text-white py-3.5 px-4 rounded-full font-medium hover:bg-[#354C48] transition-colors"
          >
            <Phone className="w-5 h-5 flex-shrink-0" />
            Call Now
          </a>
          <button
            onClick={() => { setModalFormSubmitted(false); setBookFormOpen(true); }}
            className="flex-1 flex items-center justify-center gap-2 bg-[#354C48] text-white py-3.5 px-4 rounded-full font-medium hover:bg-[#202E29] transition-colors"
          >
            <Calendar className="w-5 h-5 flex-shrink-0" />
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
