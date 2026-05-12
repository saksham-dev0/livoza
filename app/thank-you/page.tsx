"use client";

import { useRouter } from "next/navigation";
import { Phone } from "lucide-react";

export default function ThankYou() {
  const router = useRouter();

  return (
    <div className="bg-[#021210] text-[#EAEAEA] min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <img
          src="/partying_face_3d.webp"
          alt="Celebration"
          className="w-28 h-28 mx-auto mb-6 drop-shadow-[0_0_24px_rgba(227,191,95,0.4)]"
        />

        <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-white mb-4 tracking-tight">
          You&apos;re all set!
        </h1>

        <p className="text-white/55 text-base mb-2 leading-relaxed">
          Your request has been received.
        </p>
        <p className="text-white/55 text-base mb-10 leading-relaxed">
          Our team will call you back within{" "}
          <span className="text-[#e3bf5f] font-semibold">24 hours</span>.
        </p>

        <div className="bg-[#0a1f14] border border-white/[0.08] rounded-2xl p-6 mb-8">
          <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-4">
            Can&apos;t wait? Call us now
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="tel:+919353477987"
              className="flex items-center justify-center gap-2 bg-[#3E6B4F] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#4d8060] transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              +91 9353477987
            </a>
            <a
              href="tel:+918360669796"
              className="flex items-center justify-center gap-2 border border-white/15 text-white/70 px-6 py-3 rounded-full font-medium hover:bg-white/[0.07] transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              +91 8360669796
            </a>
          </div>
        </div>

        <button
          onClick={() => router.push("/")}
          className="text-white/40 text-sm hover:text-white/70 transition-colors"
        >
          ← Back to Livoza
        </button>
      </div>
    </div>
  );
}
