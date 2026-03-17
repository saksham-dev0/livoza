"use client";

import React from "react";

export default function Home() {
  return (
    <div className="bg-[#F9F9F7] text-[#202E29] font-body antialiased">
      {/* Top Navigation */}
      <header className="fixed top-0 w-full z-50 bg-[#F9F9F7]/60 backdrop-blur-md">
        <nav className="flex justify-between items-center max-w-7xl mx-auto px-8 py-6">
          <a
            href="#"
            className="font-headline text-2xl font-bold text-[#202E29]"
          >
            Livoza_logo
          </a>
          <div className="hidden md:flex items-center space-gap-12 gap-x-10 font-headline text-lg tracking-tight">
            <a
              href="#home"
              className="text-primary font-bold border-b-2 border-primary pb-1"
            >
              Home
            </a>
            <a
              href="#rooms"
              className="text-on-surface-variant hover:text-primary transition-colors"
            >
              Rooms
            </a>
            <a
              href="#amenities"
              className="text-on-surface-variant hover:text-primary transition-colors"
            >
              Amenities
            </a>
            <a
              href="#gallery"
              className="text-on-surface-variant hover:text-primary transition-colors"
            >
              Gallery
            </a>
          </div>
          <button className="bg-[#202E29] text-[#F9F9F7] px-6 py-2.5 rounded-md font-medium hover:opacity-90 transition-all active:scale-95 duration-100">
            Book a Visit
          </button>
        </nav>
      </header>

      <main>
        {/* Section 1: Hero */}
        <section
          id="home"
          className="relative min-h-screen flex items-center pt-20 overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <img src="/img1.jpeg" alt="Livoza girls PG premium room" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-[#202E29]/30" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
            <div className="max-w-2xl bg-[#E1DCD3]/60 backdrop-blur-l border border-white/30 rounded-2xl p-12 editorial-shadow">
              <span className="font-label text-sm tracking-[0.2em] text-[#354C48] mb-4 block">
                ONLY FOR GIRLS · 2 MINS FROM CHRIST UNI
              </span>
              <h1 className="font-headline text-5xl md:text-6xl text-[#202E29] leading-tight mb-6 font-bold -tracking-[0.02em]">
                Safe, Sophisticated Living for Christ University Girls
              </h1>
              <p className="text-[#5F5243] text-lg mb-10 leading-relaxed max-w-lg">
                Livoza Girls is a premium PG just 100 metres from Christ
                University. Enjoy fully furnished rooms, modern appliances, and
                a girls-only, security-first environment in the heart of
                Bangalore.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-[#202E29] text-[#F9F9F7] px-8 py-4 rounded-md font-semibold hover:opacity-95 transition-all">
                  Schedule a Visit
                </button>
                <button className="border border-[#C3B7A7]/60 text-[#202E29] px-8 py-4 rounded-md font-semibold hover:bg-[#E1DCD3] transition-all">
                  View Suites
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: About / Location */}
        <section className="py-24 bg-[#F9F9F7]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
              <div className="md:col-span-7 relative">
                <div className="aspect-[4/5] bg-[#E1DCD3] overflow-hidden">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjGw63xdJPOemXVt7zlxoCpJ3zu5AN9JKBgr5Ympf-CKW43NbK6ETJ-s0588oXIUckO_aKX4q6lD-zDJr1AagY1EAi_x1DyVJ1aH4SbyYkpN-4IUuiajGPo1PMjftLj02wTeOwCVjzB3J2B8w2CxegNTl6OUBK53q-yRoTaYv26E695_uRsPLovEUR2x9krxGdmpjEmSE20aAUg-aH-PMkkdnNxLKYhIhPAfvNmBPnIKhcueGmZ9ob8TqjTT5I8Ch0bszIgMj4YBY"
                    alt="Elegant communal kitchen and dining area for residents"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-10 -right-10 hidden lg:block w-72 h-72 bg-tertiary-fixed p-8 flex flex-col justify-end">
                  <p className="font-headline text-xl text-[#202E29] leading-snug">
                    “100 metres from Christ University campus.”
                  </p>
                </div>
              </div>

              <div className="md:col-span-5">
                <h2 className="font-headline text-4xl text-[#202E29] mb-8 leading-tight">
                  A Sanctuary Next to Christ University
                </h2>
                <div className="space-y-6 text-[#796D5D] text-lg leading-relaxed">
                  <p>
                    Livoza Girls is situated just 100 metres from Christ
                    University — a 2-minute walk to campus. No long commutes, no
                    traffic stress. Step out of your room and straight into your
                    college life.
                  </p>
                  <p>
                    Every floor is designed exclusively for women, with
                    dedicated security and CCTV monitoring. From study-friendly
                    rooms to thoughtfully planned common areas, Livoza lets you
                    focus on your academics, career, and friendships while we
                    take care of comfort and safety.
                  </p>
                  <div className="pt-4">
                    <span className="text-[#AA9F91] font-semibold text-sm tracking-[0.2em] uppercase">
                      In the heart of Bangalore, steps away from everything you
                      need.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Rooms & Suites */}
        <section id="rooms" className="py-24 bg-[#E1DCD3]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-16">
              <span className="font-label text-sm tracking-[0.2em] text-[#354C48] mb-2 block uppercase">
                Room Options
              </span>
              <h2 className="font-headline text-4xl text-[#202E29] font-bold">
                Flexible Sharing for Every Budget
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Triple Sharing */}
              <div className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden mb-6">
                  <img
                    src="/triplebed.jpeg"
                    alt="Triple sharing room at Livoza Girls PG"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="border-l border-[#C3B7A7] pl-6">
                  <h3 className="font-headline text-2xl text-[#202E29] mb-2">
                    Triple Sharing (Non AC)
                  </h3>
                  <p className="text-[#796D5D] mb-4">
                    Most affordable option, ideal for students on a budget who
                    want to stay close to campus and live with friends.
                  </p>
                  <span className="text-[#AA9F91] font-bold tracking-tight">
                    Rent: ₹16,500/month · Booking Advance: ₹20,000 · Annual
                    Total: ₹1,98,100
                  </span>
                </div>
              </div>

              {/* Double Sharing */}
              <div className="group cursor-pointer translate-y-8">
                <div className="aspect-[4/4] overflow-hidden mb-2">
                  <img
                    src="/doublebed.jpeg"
                    alt="Double sharing room at Livoza Girls PG"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="border-l border-[#C3B7A7] pl-6">
                  <h3 className="font-headline text-2xl text-[#202E29] mb-2">
                    Double Sharing (Non AC)
                  </h3>
                  <p className="text-[#796D5D] mb-4">
                    A comfortable balance of privacy and affordability with only
                    one roommate sharing the space.
                  </p>
                  <span className="text-[#AA9F91] font-bold tracking-tight">
                    Rent: ₹19,000/month · Booking Advance: ₹20,000 · Annual
                    Total: ₹2,26,600
                  </span>
                </div>
              </div>

              {/* Single Sharing */}
              <div className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden mb-6">
                  <img
                    src="/img3.jpeg"
                    alt="Single sharing room at Livoza Girls PG"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="border-l border-[#C3B7A7] pl-6">
                  <h3 className="font-headline text-2xl text-[#202E29] mb-2">
                    Single Sharing (Non AC)
                  </h3>
                  <p className="text-[#796D5D] mb-4">
                    Complete privacy with a fully furnished room that&apos;s
                    all yours — ideal for focused study and rest.
                  </p>
                  <span className="text-[#AA9F91] font-bold tracking-tight">
                    Rent: ₹35,000/month · Booking Advance: ₹30,000 · Annual
                    Total: ₹4,09,000
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Amenities */}
        <section id="amenities" className="py-24 bg-[#F9F9F7]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-xl">
                <h2 className="font-headline text-4xl text-[#202E29] mb-6">
                  Everything you need to feel at home.
                </h2>
                <p className="text-[#796D5D] text-lg">
                  Every room at Livoza Girls comes fully equipped so you never
                  have to worry about daily essentials — just bring your
                  suitcase and settle in.
                </p>
              </div>
              <button className="text-[#202E29] font-bold border-b-2 border-[#202E29] pb-1 flex items-center gap-2">
                Full Amenity List{" "}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 md:h-[600px]">
              <div className="md:col-span-2 md:row-span-2 bg-[#E1DCD3] p-10 flex flex-col justify-between group">
                <span className="material-symbols-outlined text-4xl text-[#202E29]">
                  restaurant
                </span>
                <div>
                  <h4 className="font-headline text-2xl text-[#202E29] mb-2">
                    Gourmet Kitchen
                  </h4>
                  <p className="text-[#796D5D]">
                    Shared kitchen with refrigerator, microwave/oven and ample
                    storage, making everyday cooking simple and convenient.
                  </p>
                </div>
              </div>

              <div className="bg-[#202E29] text-[#F9F9F7] p-8 flex flex-col justify-between">
                <span className="material-symbols-outlined text-4xl text-[#C3B7A7]">
                  wifi
                </span>
                <h4 className="font-headline text-xl">High-speed Fiber</h4>
              </div>

              <div className="bg-[#E1DCD3] p-8 flex flex-col justify-between">
                <span className="material-symbols-outlined text-4xl text-[#354C48]">
                  concierge
                </span>
                <h4 className="font-headline text-xl text-[#202E29]">
                  24/7 Girls-Only Security
                </h4>
              </div>

              <div className="md:col-span-2 bg-[#C3B7A7] p-8 flex flex-col md:flex-row items-center gap-8">
                <span className="material-symbols-outlined text-5xl text-[#202E29]">
                  Wellness Studio
                </span>
                <div>
                  <p className="text-[#354C48] text-sm mt-1">
                    Peace of mind with CCTV, secure entry, and an all-women
                    living environment focused on comfort and safety.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Gallery */}
        <section id="gallery" className="py-24 bg-[#E1DCD3]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="columns-1 md:columns-3 gap-8 space-y-8">
              <img
                src="/img1.jpeg"
                alt="Livoza girls PG room interior"
                className="w-full rounded-sm editorial-shadow"
              />
              <img
                src="/img2.jpeg"
                alt="Common area and storage at Livoza girls PG"
                className="w-full rounded-sm editorial-shadow"
              />
              <img
                src="/img3.jpeg"
                alt="Premium single room at Livoza girls PG"
                className="w-full rounded-sm editorial-shadow"
              />
              <img
                src="/doublebed.jpeg"
                alt="Double sharing room layout at Livoza girls PG"
                className="w-full rounded-sm editorial-shadow"
              />
              <img
                src="/triplebed.jpeg"
                alt="Triple sharing room overview at Livoza girls PG"
                className="w-full rounded-sm editorial-shadow"
              />
              <img
                src="/logo.png"
                alt="Livoza girls PG logo"
                className="w-full rounded-sm editorial-shadow"
              />
            </div>
          </div>
        </section>

        {/* Section 6: Testimonials */}
        <section className="py-24 bg-[#F9F9F7]">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div>
                <span className="font-label text-sm tracking-[0.2em] text-[#354C48] mb-4 block">
                  LIFE AT LIVOZA
                </span>
                <h2 className="font-headline text-5xl text-[#202E29] leading-tight mb-8 italic">
                  “A sanctuary in the heart of the city.”
                </h2>
              </div>
              <div className="space-y-16">
                <div className="border-l-4 border-[#202E29] pl-10">
                  <p className="text-xl text-[#202E29] mb-6 leading-relaxed">
                    “Moving to Livoza Girls was the best decision for my
                    semester. Being 2 minutes from Christ Uni and having
                    everything set up — Wi‑Fi, TV, washing machine — means I can
                    focus purely on classes and projects.”
                  </p>
                  <h5 className="font-bold text-[#202E29]">
                    — Ananya S., BBA Student
                  </h5>
                </div>
                <div className="border-l-4 border-[#C3B7A7] pl-10">
                  <p className="text-xl text-[#202E29] mb-6 leading-relaxed">
                    “My parents wanted safety, I wanted comfort. Livoza balances
                    both perfectly — girls-only security, neat rooms, and a
                    homely vibe that never feels like a hostel.”
                  </p>
                  <h5 className="font-bold text-[#202E29]">
                    — Rhea K., MBA Student
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: CTA */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-8">
            <div className="bg-[#202E29] rounded-lg p-16 text-center text-[#F9F9F7] relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="font-headline text-5xl mb-6">
                  Ready to Move In?
                </h2>
                <p className="max-w-2xl mx-auto text-[#C3B7A7] text-lg mb-10">
                  Limited beds are available for the upcoming intake. Secure
                  your Triple, Double, or Single sharing room today and start
                  living just 2 minutes away from Christ University.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <button className="bg-[#F9F9F7] text-[#202E29] px-10 py-4 rounded-md font-bold hover:bg-[#E1DCD3] transition-colors">
                    Apply Now
                  </button>
                  <button className="border border-[#C3B7A7] text-[#F9F9F7] px-10 py-4 rounded-md font-bold hover:bg-white/5 transition-colors">
                    Download Brochure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#E1DCD3] py-20">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-headline text-xl font-bold text-[#202E29] mb-6">
              Livoza Girls PG
            </h3>
            <p className="text-[#796D5D] text-sm leading-relaxed mb-6">
              A premium, fully furnished PG exclusively for girls — just 100
              metres from Christ University.
            </p>
            <div className="flex gap-4">
              <span className="material-symbols-outlined text-[#796D5D] hover:text-[#202E29] cursor-pointer">
                share
              </span>
              <span className="material-symbols-outlined text-[#796D5D] hover:text-[#202E29] cursor-pointer">
                mail
              </span>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-[#202E29] mb-6">Explore</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-[#796D5D] hover:text-[#202E29] underline underline-offset-4"
                >
                  Safety Protocol
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#796D5D] hover:text-[#202E29] underline underline-offset-4"
                >
                  Location
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#796D5D] hover:text-[#202E29] underline underline-offset-4"
                >
                  Virtual Tour
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#202E29] mb-6">Support</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-[#796D5D] hover:text-[#202E29] underline underline-offset-4"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#796D5D] hover:text-[#202E29] underline underline-offset-4"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#796D5D] hover:text-[#202E29] underline underline-offset-4"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-[#202E29] mb-6">Stay Informed</h4>
            <p className="text-[#796D5D] text-sm mb-4">
              Receive updates on new room availability, offers, and upcoming
              intakes.
            </p>
            <div className="flex border-b border-[#C3B7A7] py-2">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent border-none focus:ring-0 text-sm w-full"
              />
              <button className="material-symbols-outlined text-[#202E29]">
                arrow_forward
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 mt-16 pt-8 border-t border-[#C3B7A7]/40 text-center">
          <p className="text-[#796D5D] text-sm">
            © 2024 Livoza Girls PG. All rights reserved.
          </p>
        </div>
      </footer>

      <style jsx global>{`
        .material-symbols-outlined {
          font-variation-settings: "FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24;
        }
        .editorial-shadow {
          box-shadow: 0 32px 64px -12px rgba(11, 25, 21, 0.06);
        }
      `}</style>
    </div>
  );
}
