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
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-md supports-[backdrop-filter]:bg-black/50">
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

function HeroBackdrop({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0">
      <div className="h-full w-full bg-gradient-to-b from-[#060b0c] via-[#030405] to-black" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.20),transparent_48%),radial-gradient(circle_at_70%_25%,rgba(16,185,129,0.16),transparent_52%),radial-gradient(circle_at_50%_88%,rgba(245,158,11,0.18),transparent_60%)]"
        style={{
          filter: "saturate(120%)",
        }}
      />

      {/* accent glow */}
      <div
        className="absolute bottom-0 left-1/2 h-[520px] w-[760px] -translate-x-1/2 rounded-[340px] blur-2xl"
        style={{
          background: `radial-gradient(circle_at_50%_60%, ${accent}33 0%, ${accent}14 35%, ${accent}00 70%)`,
        }}
      />
      <div
        className="absolute bottom-[-30px] left-1/2 h-[240px] w-[360px] -translate-x-1/2 rounded-full blur-xl"
        style={{
          background: `radial-gradient(circle_at_50%_60%, ${accent}2e 0%, ${accent}12 35%, ${accent}00 70%)`,
        }}
      />

      <div
        aria-hidden
        className="absolute inset-0 opacity-60 mix-blend-overlay"
        style={{
          background: "url(/file.svg) repeat",
          filter: "contrast(120%)",
        }}
      />
    </div>
  );
}

function GlowOverlayFilter({ accent }: { accent: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-[-10px] left-1/2 h-[260px] w-[620px] -translate-x-1/2"
      style={{
        background: `radial-gradient(circle at 50% 50%, ${accent}33 0%, ${accent}14 38%, transparent 68%)`,
        filter: "blur(24px) saturate(125%)",
      }}
    />
  );
}

function HeroContent({
  tag,
  heading,
  body,
  primary,
  secondary,
}: {
  tag: string;
  heading: string;
  body: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}) {
  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 pt-[84px] sm:px-6">
      <div className="grid min-h-screen place-items-end pb-14">
        <div className="w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.38em] text-white/65">
                {tag}
              </span>
            </div>

            <h1 className="mt-5 font-playfair text-6xl leading-[0.98] text-[#FDFBF7] sm:text-7xl">
              {heading}
            </h1>

            <p className="mt-5 max-w-xl font-inter text-sm leading-7 text-[#FDFBF7]/75">
              {body}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href={primary.href}
                className="group inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:opacity-95 transition"
              >
                {primary.label}
                <ArrowRight
                  className="ml-2 transition-transform group-hover:translate-x-0.5"
                  size={16}
                />
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

export default function PlumbingPage() {
  return (
    <div className="min-h-screen relative bg-black text-white">
      <LuminousNavbar
        brand="FLOW TELEMETRY"
        menu={["SYSTEMS", "DIAGNOSTICS", "DISPATCH"]}
        cta={{ label: "DISPATCH", href: "/portfolio/web-dev-projects/plumbing/copilot" }}
      />

      <section className="relative min-h-screen">
        <HeroBackdrop accent="#06b6d4" />
        <SandLines />
        <GlowOverlayFilter accent="#06b6d4" />

        {/* bottom-left typography stack */}
        <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-44 w-full bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 z-20 px-4 pb-12 sm:px-6">
          <div className="max-w-2xl">
            <div className="font-mono uppercase tracking-[0.46em] text-[10px] text-white/60">
              INFRASTRUCTURE CORE
            </div>
          </div>
        </div>

        <HeroContent
          tag="INFRASTRUCTURE CORE"
          heading="Precision Telemetry"
          body="Engineered commercial pipe networks monitored in real-time. Automated diagnostic isolation arrays paired with zero-latency priority contractor dispatch infrastructure."
          primary={{ label: "ACCESS TERMINAL", href: "/portfolio/web-dev-projects/plumbing/copilot" }}
          secondary={{ label: "RUN CO-PILOT", href: "/portfolio/web-dev-projects/plumbing/copilot" }}
        />
      </section>
    </div>
  );
}

