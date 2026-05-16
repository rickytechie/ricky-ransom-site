"use client";

import { motion } from "framer-motion";
import { ServiceGrid } from "../src/components/ServiceGrid";
import { PortfolioGrid } from "../src/components/PortfolioGrid";

export default function Home() {
  return (
    <main className="bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),transparent_26%),radial-gradient(circle_at_80%_10%,_rgba(168,85,247,0.12),transparent_18%),linear-gradient(180deg,_#020617_0%,_#020617_100%)] text-slate-100">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(14,165,233,0.18),transparent_25%),radial-gradient(circle,_rgba(168,85,247,0.14),transparent_22%)] blur-3xl" />
        <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <div className="rounded-full border border-white/10 bg-slate-950/50 px-5 py-3 text-sm font-semibold uppercase tracking-[0.32em] text-cyan-200/90 shadow-lg shadow-cyan-500/5 backdrop-blur-xl">
            RICKY RANSOM
          </div>
          <nav className="hidden items-center gap-8 text-sm text-slate-200 lg:flex">
            {['Services', 'Portfolio', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-cyan-300">
                {item}
              </a>
            ))}
          </nav>
        </header>
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="rounded-[2.5rem] border border-white/10 bg-slate-950/60 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm uppercase tracking-[0.36em] text-cyan-300/80">Ricky Ransom, LLC</p>
                <h1 className="mt-6 text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                  Engineering{' '}
                  <motion.span
                    animate={{ x: [0, 8, -8, 0], opacity: [0.9, 1, 0.9, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror' }}
                    className="bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-500 bg-clip-text text-transparent"
                  >
                    Creativity.
                  </motion.span>
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                  High-end digital experiences blending AI, media, keynote, marketing, and software consulting into a polished, glassmorphism-driven presence.
                </p>
              </div>
              <div className="rounded-[2rem] border border-cyan-400/15 bg-white/5 p-6 text-sm text-slate-200 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl sm:max-w-sm">
                <p className="font-semibold text-cyan-100">Signature service mix</p>
                <ul className="mt-4 space-y-3 text-slate-300">
                  <li>AI strategy for enterprise growth</li>
                  <li>Media production & brand storytelling</li>
                  <li>Software execution with premium polish</li>
                </ul>
              </div>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {['AI Consulting', 'Media Services', 'Digital Marketing', 'Web Design'].map((item) => (
                <div key={item} className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 px-5 py-4 text-sm text-slate-200 shadow-lg shadow-slate-950/20">
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.36em] text-cyan-300/80">Services</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Bento grid services for premium brands.
            </h2>
          </div>
          <p className="max-w-xl text-slate-400">
            A polished service matrix that combines consultancy, creative execution, and engineering support for ambitious teams.
          </p>
        </div>
        <ServiceGrid />
      </section>

      <section id="portfolio" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-[2.5rem] border border-white/10 bg-slate-950/60 p-10 shadow-2xl shadow-fuchsia-500/10 backdrop-blur-2xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.36em] text-cyan-300/80">Portfolio</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                Portfolio cards with a luminous hover glow.
              </h2>
            </div>
            <p className="max-w-xl text-slate-400">
              Selected engagements built to showcase design-led digital transformation and technical craftsmanship.
            </p>
          </div>
          <PortfolioGrid />
        </div>
      </section>

      <footer id="contact" className="border-t border-white/10 bg-slate-950/70 px-6 py-12 text-slate-400 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="uppercase tracking-[0.32em] text-xs text-cyan-300/75">Ricky Ransom, LLC</p>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
              Building refined digital strategies with AI, media, and software expertise for executives who want unforgettable brand momentum.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm sm:text-right">
            <span className="font-semibold text-white">Get in touch</span>
            <a href="mailto:hello@rickyransom.com" className="transition hover:text-cyan-300">
              hello@rickyransom.com
            </a>
            <span>© {new Date().getFullYear()} Ricky Ransom, LLC</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
