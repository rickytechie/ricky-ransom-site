"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function NativeNavigation() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between bg-zinc-950/40 backdrop-blur-md border-b border-stone-800">
      <div className="flex items-center">
        <div className="text-white/90 uppercase tracking-[0.3em] font-mono">LUMINOUS PEDIGREE</div>
      </div>

      <nav className="flex items-center gap-6">
        <Link
          href="/portfolio/web-dev-projects/real-estate/collection"
          className="tracking-widest text-xs text-stone-400 hover:text-white transition-colors"
        >
          COLLECTION
        </Link>
        <Link
          href="/portfolio/web-dev-projects/real-estate/about"
          className="tracking-widest text-xs text-stone-400 hover:text-white transition-colors"
        >
          ABOUT
        </Link>

        <Link
          href="/portfolio/web-dev-projects/real-estate/about"
          className="bg-white text-black px-6 py-2.5 text-xs font-mono uppercase font-bold tracking-wider hover:bg-stone-200 transition-all"
        >
          INQUIRE
        </Link>
      </nav>
    </header>
  );
}

function CinematicBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0">
      <div className="absolute inset-0 bg-zinc-950" />

      {/* Atmospheric coastal concrete landscape overlay panel */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1220] via-[#05070a] to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(147,51,234,0.22),transparent_45%),radial-gradient(circle_at_72%_20%,rgba(34,211,238,0.16),transparent_52%),radial-gradient(circle_at_55%_85%,rgba(227,173,43,0.14),transparent_58%)]" />

        {/* Concrete massing blocks */}
        <div className="absolute bottom-0 left-1/2 h-[62%] w-[92%] -translate-x-1/2">
          <div className="absolute bottom-0 left-1/2 h-full w-[74%] -translate-x-1/2 rounded-[30px] bg-gradient-to-b from-white/10 to-black/70" />
          <div className="absolute bottom-10 left-[12%] h-[40%] w-[26%] rounded-[22px] bg-gradient-to-b from-white/10 to-black/60" />
          <div className="absolute bottom-14 right-[10%] h-[34%] w-[24%] rounded-[22px] bg-gradient-to-b from-white/12 to-black/65" />
          <div className="absolute bottom-2 left-[18%] h-2 w-[64%] rounded-full bg-white/10 blur-[2px]" />

          {/* Subtle horizontal architectural seams */}
          <div
            className="absolute inset-x-0 bottom-[8%] h-[2px] bg-[linear-gradient(to_right,transparent,rgba(209,209,199,0.18),transparent)] opacity-60"
          />
          <div
            className="absolute inset-x-0 bottom-[22%] h-[1px] bg-[linear-gradient(to_right,transparent,rgba(209,209,199,0.14),transparent)] opacity-60"
          />
          <div
            className="absolute inset-x-0 bottom-[34%] h-[1px] bg-[linear-gradient(to_right,transparent,rgba(209,209,199,0.10),transparent)] opacity-50"
          />
        </div>

        {/* Ocean haze */}
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(transparent 0 46%, rgba(0,0,0,0.65) 70%, rgba(0,0,0,0.95) 100%), repeating-linear-gradient(90deg, rgba(209,209,199,0.06) 0, rgba(209,209,199,0.06) 1px, transparent 1px, transparent 16px)",
          }}
        />
      </div>

      {/* Warm fire pit element centered at the bottom */}
      <div className="absolute bottom-8 left-1/2 h-[200px] w-[200px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.20)_0%,rgba(255,163,77,0.10)_26%,rgba(255,94,58,0.00)_68%)] blur-xl" />
      <div className="absolute bottom-2 left-1/2 h-[96px] w-[96px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.32)_0%,rgba(255,188,80,0.18)_26%,rgba(255,94,58,0.00)_70%)] blur-lg" />

      {/* Grain */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-60 mix-blend-overlay"
        style={{
          background: "url(/file.svg) repeat",
          filter: "contrast(120%) brightness(100%)",
        }}
      />
    </div>
  );
}

function HeroForeground() {
  return (
    <div className="relative z-10 flex flex-col justify-end w-full">
      <div className="flex flex-col max-w-[76rem]">
        <div className="mb-2 text-[10px] font-mono tracking-[0.4em] text-stone-400 block">
          FEATURED ESTATE
        </div>

        <h1 className="font-serif text-6xl md:text-8xl text-white tracking-tight leading-none mb-6">
          Montauk Overlook
        </h1>

        <p className="max-w-2xl font-sans text-stone-300 text-sm md:text-base font-light leading-relaxed tracking-wide mb-10">
          Perched on Montauk's dramatic bluffs, this concrete-and-glass pavilion offers 180-degree ocean views
          from every room. Raw, elemental architecture at land's end.
        </p>

        <div className="flex items-stretch gap-4">
          <Link
            href="/portfolio/web-dev-projects/real-estate/collection"
            className="bg-white text-black px-8 py-4 text-xs font-mono uppercase font-semibold tracking-widest hover:bg-stone-200 transition-all inline-flex items-center gap-2"
          >
            EXPLORE ESTATE <ArrowRight size={14} />
          </Link>

          <Link
            href="/portfolio/web-dev-projects/real-estate/about"
            className="border border-stone-700 backdrop-blur-sm text-white px-8 py-4 text-xs font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-all"
          >
            INQUIRE NOW
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RealEstateLanding() {
  return (
    <div className="min-h-screen relative flex flex-col justify-end px-12 pb-24 overflow-hidden bg-zinc-950">
      <NativeNavigation />
      <CinematicBackdrop />
      <div className="absolute inset-0" />

      <div className="relative z-10 w-full">
        <HeroForeground />
      </div>
    </div>
  );
}


