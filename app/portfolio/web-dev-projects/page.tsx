"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type Tile = {
  key: string;
  title: string;
  subtitle: string;
  href: string;
  tag: string;
};

const tiles: Tile[] = [
  {
    key: "real-estate",
    title: "Vanguard Prestige Properties",
    subtitle: "Property Matcher drawer + concierge portfolio output",
    href: "/portfolio/web-dev-projects/real-estate",
    tag: "Autonomous Match",
  },
  {
    key: "personal-trainer",
    title: "Apex Kinetic Performance",
    subtitle: "AI Fitness Planner + onboarding experience",
    href: "/portfolio/web-dev-projects/personal-trainer",
    tag: "Blueprint Agent",
  },
  {
    key: "plumbing",
    title: "HydroForce Commercial & Residential",
    subtitle: "Instant diagnostics + smart dispatch terminal",
    href: "/portfolio/web-dev-projects/plumbing",
    tag: "Dispatch Ready",
  },
  {
    key: "summer-camp",
    title: "Lake Harbor Summer Camp",
    subtitle: "Parent Concierge sliding chat + safety FAQ",
    href: "/portfolio/web-dev-projects/summer-camp",
    tag: "Family First",
  },
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function BackLink() {
  return (
    <Link
      href="/"
      className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10"
    >
      <span className="text-purple-300">←</span>
      Site
    </Link>
  );
}

function PortfolioHubCard({ t, idx }: { t: Tile; idx: number }) {
  return (
    <Link
      key={t.key}
      href={t.href}
      aria-label={`Open ${t.title}`}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(147,51,234,0.08)] transition will-change-transform"
      style={{ transform: "translateZ(0)" }}
    >
      <div
        aria-hidden
        className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#9333ea]/15 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#9333ea]/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
      />

      <motion.div
        className="relative space-y-4"
        initial={false}
        animate={undefined}
        whileHover={{ scale: 1.04 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-[0.35em] text-white/80">
          {t.tag}
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold leading-tight text-white">{t.title}</h2>
          <p className="text-sm text-slate-300">{t.subtitle}</p>
        </div>

        <div
          className={
            "mt-1 flex items-center gap-2 text-sm font-semibold text-purple-200 transition " +
            (idx % 2 === 0 ? "group-hover:translate-x-0.5" : "group-hover:translate-x-0.5")
          }
        >
          Enter showcase <span className="text-purple-300">→</span>
        </div>
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 ring-1 ring-[#9333ea] ring-offset-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ boxShadow: "0 0 22px rgba(147, 51, 234, 0.6)" }}
      />
    </Link>
  );
}

export default function WebDevProjectsHubPage() {
  const reducedMotion = usePrefersReducedMotion();
  const tilesMemo = useMemo(() => tiles, []);

  // Subtle immersive parallax using scroll position.
  const y = useMotionValue(0);
  const ySpring = useSpring(y, { stiffness: 110, damping: 22, mass: 0.6 });

  const heroY = useTransform(ySpring, [0, 1200], [0, -70]);
  const orb1Y = useTransform(ySpring, [0, 1200], [0, -40]);
  const orb2Y = useTransform(ySpring, [0, 1200], [0, 34]);

  useEffect(() => {
    if (reducedMotion) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        y.set(window.scrollY || 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion, y]);

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="relative">
            <motion.div className="absolute -inset-x-10 -top-16 -z-10" style={{ y: heroY }}>
              <div
                className="h-[240px] w-[520px] rounded-[140px] bg-[#9333ea]/15 blur-3xl"
                aria-hidden
              />
            </motion.div>

            <motion.p
              className="text-sm uppercase tracking-[0.4em] text-[#22d3ee]"
              style={{ y: reducedMotion ? 0 : heroY }}
            >
              Next-Gen Small Business Showcase
            </motion.p>

            <motion.h1
              className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl"
              style={{ y: reducedMotion ? 0 : heroY }}
            >
              Next-Gen Small Business Showcase
            </motion.h1>

            <p className="mt-4 max-w-3xl text-slate-300">
              A premium glassmorphic grid with immersive Framer Motion parallax. Hover for electric purple glow
              borders, and open each autonomous sub-showcase.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <BackLink />
            <Link
              href="/portfolio"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10"
            >
              <span className="text-purple-300">↗</span>
              Portfolio
            </Link>
          </div>
        </div>

        <section className="mt-10">
          <div className="relative">
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -left-10 top-0 h-48 w-48 rounded-full bg-[#9333ea]/10 blur-3xl"
              style={{ y: reducedMotion ? 0 : orb1Y }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-10 top-14 h-56 w-56 rounded-full bg-[#22d3ee]/10 blur-3xl"
              style={{ y: reducedMotion ? 0 : orb2Y }}
            />

            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {tilesMemo.map((t, idx) => (
                <PortfolioHubCard key={t.key} t={t} idx={idx} />
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-white/70">Design framework</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">True Black + Electric Purple</h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                Surfaces use subtle glass with white/10 borders. Electric Purple (#9333ea) powers highlights,
                gradients, focus accents, and hover glow borders.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-purple-400/25 bg-gradient-to-br from-[#9333ea]/10 to-transparent p-4 text-sm text-slate-200">
              <div className="font-semibold text-white">Touch-friendly actions</div>
              <div className="mt-1 text-slate-300">Each card uses 44px+ interactive sizing for mobile comfort.</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

