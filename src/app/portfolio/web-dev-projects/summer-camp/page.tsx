"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function LuminousNavbar({
  brand,
  menu,
  cta,
}: {
  brand: string;
  menu: string[];
  cta: { label: string; href: string };
}) {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="text-[12px] font-mono uppercase tracking-[0.38em] text-white/90">
          {brand}
        </div>

        <nav className="flex items-center gap-7">
          {menu.map((m) => (
            <Link
              key={m}
              href="#"
              className="text-[12px] font-mono uppercase tracking-[0.28em] text-white/70 hover:text-white transition"
              aria-label={m}
            >
              {m}
            </Link>
          ))}

          <Link
            href={cta.href}
            className="inline-flex min-h-[40px] items-center justify-center rounded-full bg-white px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-black hover:opacity-95 transition"
          >
            {cta.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SandLines() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute left-0 top-0 h-full w-[1px] bg-white/5" />
      <div className="absolute right-0 top-0 h-full w-[1px] bg-white/5" />
      <div className="absolute left-0 top-0 h-[1px] w-full bg-white/5" />
      <div className="absolute bottom-0 left-0 h-[1px] w-full bg-white/5" />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(209,209,199,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(209,209,199,0.10) 1px, transparent 1px)",
          backgroundSize: "48px 48px, 48px 48px",
          maskImage: "radial-gradient(circle at 25% 20%, black 0%, transparent 60%)",
        }}
      />
    </div>
  );
}

function HeroBackdrop() {
  return (
    <div className="absolute inset-0">
      <div className="h-full w-full bg-gradient-to-b from-[#060b0c] via-[#030405] to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.20),transparent_48%),radial-gradient(circle_at_70%_25%,rgba(16,185,129,0.16),transparent_52%),radial-gradient(circle_at_50%_88%,rgba(245,158,11,0.18),transparent_60%)]" />

      <div aria-hidden className="absolute bottom-0 left-0 right-0 h-[52%]">
        <div className="absolute bottom-0 left-0 h-full w-[55%] bg-[linear-gradient(to_right,rgba(0,0,0,0),rgba(0,0,0,0.95))]" />
        <div className="absolute bottom-0 left-0 h-[70%] w-full opacity-90">
          <div className="absolute bottom-0 left-[10%] h-[70%] w-[80px] rounded-full bg-white/6 blur-[0.3px]" />
          <div className="absolute bottom-0 left-[22%] h-[85%] w-[70px] rounded-full bg-white/5" />
          <div className="absolute bottom-0 left-[37%] h-[78%] w-[90px] rounded-full bg-white/4" />
          <div className="absolute bottom-0 left-[58%] h-[88%] w-[80px] rounded-full bg-white/5" />
          <div className="absolute bottom-0 left-[72%] h-[74%] w-[95px] rounded-full bg-white/4" />
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 h-[520px] w-[760px] -translate-x-1/2 rounded-[340px] bg-[radial-gradient(circle_at_50%_60%,rgba(245,158,11,0.20)_0%,rgba(245,158,11,0.08)_35%,rgba(245,158,11,0.00)_70%)] blur-2xl" />
      <div className="absolute bottom-[-30px] left-1/2 h-[240px] w-[360px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_60%,rgba(251,191,36,0.18)_0%,rgba(251,191,36,0.07)_35%,rgba(251,191,36,0.00)_70%)] blur-xl" />

      <div
        aria-hidden
        className="absolute inset-0 opacity-60 mix-blend-overlay"
        style={{
          background:
            "url(/file.svg) repeat",
          filter: "contrast(120%)",
        }}
      />
    </div>
  );
}

function HeroContent({
  heading,
  body,
  primary,
  secondary,
}: {
  heading: string;
  body: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}) {
  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 pt-[84px] sm:px-6">
      <div className="grid min-h-screen place-items-center pb-14">
        <div className="w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.38em] text-white/65">
                DUSK FOREST CORRIDOR
              </span>
            </div>

            <h1 className="mt-5 font-playfair text-6xl leading-[0.98] text-[#FDFBF7]">{heading}</h1>

            <p className="mt-5 max-w-xl font-inter text-sm leading-7 text-[#FDFBF7]/75">{body}</p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href={primary.href}
                className="group inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:opacity-95 transition"
              >
                {primary.label}
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-0.5" size={16} />
              </Link>
              <Link
                href={secondary.href}
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-[#FDFBF7] hover:bg-white/10 transition"
              >
                {secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SummerCampLanding() {
  return (
    <div className="min-h-screen relative bg-black text-white">
      <LuminousNavbar
        brand="CAMP EVERWOOD"
        menu={["PROGRAMS", "PLACEMENT", "ENROLL"]}
        cta={{ label: "ENROLL", href: "/portfolio/web-dev-projects/summer-camp/assistant" }}
      />

      <section className="min-h-screen relative">
        <HeroBackdrop />
        <SandLines />
        <HeroContent
          heading="Camp Everwood"
          body="An immersive, premium brand experience integrating rich natural landscapes with adaptive educational pathways and streamlined placement pipelines."
          primary={{ label: "EXPLORE PROGRAMS", href: "/portfolio/web-dev-projects/summer-camp" }}
          secondary={{ label: "TALK TO ASSISTANT", href: "/portfolio/web-dev-projects/summer-camp/assistant" }}
        />
      </section>
    </div>
  );
}

