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
          maskImage: "radial-gradient(circle at 30% 20%, black 0%, transparent 60%)",
        }}
      />
    </div>
  );
}

function HeroBackdrop({ variant }: { variant: "estate" | "plumbing" | "camp" }) {
  if (variant === "estate") {
    return (
      <>
        <div className="absolute inset-0">
          <div className="h-full w-full bg-gradient-to-b from-[#0b1220] via-[#05070a] to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(147,51,234,0.22),transparent_45%),radial-gradient(circle_at_70%_25%,rgba(34,211,238,0.16),transparent_50%),radial-gradient(circle_at_50%_85%,rgba(227,173,43,0.14),transparent_55%)]" />
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "linear-gradient(transparent 0 45%, rgba(0,0,0,0.65) 68%, rgba(0,0,0,0.95) 100%), repeating-linear-gradient(90deg, rgba(209,209,199,0.06) 0, rgba(209,209,199,0.06) 1px, transparent 1px, transparent 16px)"
            }}
          />

          {/* Concrete/glass pavilion silhouette */}
          <div className="absolute bottom-0 left-1/2 h-[62%] w-[92%] -translate-x-1/2">
            <div className="absolute bottom-0 left-1/2 h-full w-[70%] -translate-x-1/2 rounded-[28px] bg-gradient-to-b from-white/8 to-black/70" />
            <div className="absolute bottom-10 left-[14%] h-[38%] w-[26%] rounded-[20px] bg-gradient-to-b from-white/10 to-black/60" />
            <div className="absolute bottom-14 right-[12%] h-[34%] w-[24%] rounded-[20px] bg-gradient-to-b from-white/10 to-black/65" />
            <div className="absolute bottom-0 left-[18%] h-2 w-[64%] rounded-full bg-white/10 blur-[2px]" />

            {/* Fire pit glow at bottom center */}
            <div className="absolute bottom-2 left-1/2 h-[170px] w-[170px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18)_0%,rgba(255,163,77,0.10)_25%,rgba(255,94,58,0.00)_65%)] blur-xl" />
            <div className="absolute bottom-6 left-1/2 h-[80px] w-[80px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.30)_0%,rgba(255,188,80,0.16)_28%,rgba(255,94,58,0.00)_70%)] blur-lg" />
          </div>
        </div>

        <div
          aria-hidden
          className="absolute inset-0 mix-blend-overlay opacity-60"
          style={{
            background:
              "url(/file.svg) repeat" /* grain fallback */,
            filter: "contrast(120%) brightness(100%)",
          }}
        />
      </>
    );
  }

  if (variant === "plumbing") {
    return (
      <>
        <div className="absolute inset-0">
          <div className="h-full w-full bg-gradient-to-b from-[#05070b] via-[#000000] to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(103,232,249,0.22),transparent_48%),radial-gradient(circle_at_75%_30%,rgba(6,182,212,0.18),transparent_52%),radial-gradient(circle_at_50%_80%,rgba(147,51,234,0.12),transparent_60%)]" />

          {/* Mechanical layout grid */}
          <div
            className="absolute inset-0 opacity-90"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 26px), repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 26px)"
            }}
          />

          {/* Terminal telemetry glow filter */}
          <div className="absolute inset-0">
            <div className="absolute left-1/2 top-[20%] h-[360px] w-[520px] -translate-x-1/2 rounded-[32px] bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.30)_0%,rgba(34,211,238,0.12)_30%,rgba(34,211,238,0.00)_70%)] blur-2xl" />
            <div className="absolute left-1/2 top-[35%] h-[240px] w-[360px] -translate-x-1/2 rounded-[28px] bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.20)_0%,rgba(6,182,212,0.08)_35%,rgba(6,182,212,0.00)_70%)] blur-xl" />
          </div>

          {/* Mechanical pipes strokes */}
          <div aria-hidden className="absolute inset-0">
            <div className="absolute left-[10%] top-[28%] h-[2px] w-[78%] bg-white/10" />
            <div className="absolute left-[12%] top-[36%] h-[2px] w-[52%] bg-white/8" />
            <div className="absolute left-[28%] top-[18%] h-[40%] w-[2px] bg-white/7" />
            <div className="absolute right-[18%] top-[22%] h-[52%] w-[2px] bg-white/6" />
            <div className="absolute bottom-[18%] left-[22%] h-[120px] w-[520px] rounded-[100px] border border-[#22d3ee]/20" />
          </div>
        </div>

        <div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "linear-gradient(90deg, rgba(34,211,238,0.00), rgba(34,211,238,0.10), rgba(34,211,238,0.00))",
            transform: "skewX(-14deg)",
          }}
        />
      </>
    );
  }

  // camp
  return (
    <>
      <div className="absolute inset-0">
        <div className="h-full w-full bg-gradient-to-b from-[#060b0c] via-[#030405] to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.20),transparent_48%),radial-gradient(circle_at_70%_25%,rgba(16,185,129,0.16),transparent_52%),radial-gradient(circle_at_50%_88%,rgba(245,158,11,0.18),transparent_60%)]" />

        {/* forest silhouettes */}
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

        {/* warm organic corridor */}
        <div className="absolute bottom-0 left-1/2 h-[520px] w-[760px] -translate-x-1/2 rounded-[340px] bg-[radial-gradient(circle_at_50%_60%,rgba(245,158,11,0.20)_0%,rgba(245,158,11,0.08)_35%,rgba(245,158,11,0.00)_70%)] blur-2xl" />
        <div className="absolute bottom-[-30px] left-1/2 h-[240px] w-[360px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_60%,rgba(251,191,36,0.18)_0%,rgba(251,191,36,0.07)_35%,rgba(251,191,36,0.00)_70%)] blur-xl" />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 opacity-60 mix-blend-overlay"
        style={{
          background:
            "url(/file.svg) repeat",
          filter: "contrast(120%)",
        }}
      />
    </>
  );
}

function HeroContent({
  eyebrow,
  heading,
  body,
  primary,
  secondary,
}: {
  eyebrow: string;
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
                {eyebrow}
              </span>
            </div>

            <h1 className="mt-5 font-playfair text-6xl leading-[0.98] text-[#FDFBF7]">
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

export default function RealEstateLanding() {
  return (
    <div className="min-h-screen relative bg-black text-white">
      <LuminousNavbar
        brand="LUMINOUS PEDIGREE"
        menu={["COLLECTION", "ABOUT", "INQUIRE"]}
        cta={{ label: "INQUIRE", href: "/portfolio/web-dev-projects/real-estate/about" }}
      />

      <section className="min-h-screen relative pt-0">
        <HeroBackdrop variant="estate" />
        <SandLines />
        <HeroContent
          eyebrow="COASTAL PAVILION EDITORIAL"
          heading="Montauk Overlook"
          body="Perched on Montauk's dramatic bluffs, this concrete-and-glass pavilion offers 180-degree ocean views from every room. Raw, elemental architecture at land's end."
          primary={{ label: "EXPLORE ESTATE", href: "/portfolio/web-dev-projects/real-estate/collection" }}
          secondary={{ label: "INQUIRE NOW", href: "/portfolio/web-dev-projects/real-estate/about" }}
        />
      </section>
    </div>
  );
}

