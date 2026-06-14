"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function LexisReachPage() {
  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8">
        <div className="flex flex-col gap-6">
          <header className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-6 sm:p-10">
            <div
              aria-hidden
              className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#9333ea]/20 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#22d3ee]/10 blur-3xl"
            />

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#9333ea]/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-purple-200">
                Enterprise Case Study
              </div>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
                LexisReach Automation
              </h1>

              <p className="mt-4 max-w-3xl text-slate-300">
                Corporate law firm automation concept: a fast, reliable pipeline intelligence layer with polished dark
                UI, high-confidence workflow outputs, and conversion-ready client reporting.
              </p>
            </motion.div>
          </header>

          <nav className="flex flex-wrap items-center gap-3">
            <Link
              href="/#projects"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/10"
            >
              <span className="text-purple-300">←</span>
              Back to System Hub
            </Link>
          </nav>

          <section className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Core Focus",
                desc: "Enterprise-scale legal workflow orchestration with structured automation steps.",
              },
              {
                title: "Aesthetic Core",
                desc: "True Black surfaces with matte slate contrast and Electric Purple signal highlights.",
              },
              {
                title: "Architecture",
                desc: "Decoupled UI state + simulated agent outputs designed for fast, reliable rendering.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 shadow-[0_0_0_1px_rgba(147,51,234,0.08)]"
              >
                <div className="text-sm uppercase tracking-[0.35em] text-white/60">{c.title}</div>
                <div className="mt-3 text-lg font-semibold text-white">{c.title}</div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{c.desc}</p>
              </div>
            ))}
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
              <div className="space-y-3">
                <div className="text-sm uppercase tracking-[0.35em] text-white/60">What the case study demonstrates</div>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li>• Contract intake → structured extraction → consistent output templates.</li>
                  <li>• Agent-like pipeline steps (simulated) with responsive, hardware-accelerated motion.</li>
                  <li>• Client-friendly summaries designed for quick review and action.</li>
                </ul>
              </div>
              <div className="rounded-[1.75rem] border border-purple-400/20 bg-gradient-to-br from-[#9333ea]/12 to-transparent p-5">
                <div className="text-sm font-semibold text-white">UI contract</div>
                <p className="mt-2 text-sm leading-6 text-slate-200">
                  The layout is self-contained and safe: no external imports beyond Next + Framer Motion, and stable,
                  deterministic client rendering.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

