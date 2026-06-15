"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Home, Shield, Trees } from "lucide-react";
import Link from "next/link";

const COMMERCIAL_ENGINES = [
  {
    id: "nyc-luxury-real-estate",
    title: "Luminous Pedigree",
    subtitle: "Boutique NYC & Long Island Brokerage Engine",
    description:
      "A premium digital platform tailored for elite real estate markets. Features real-time live MLS listing data feeds, advanced spatial mapping components, and an immersive editorial UI built for maximum property aesthetic value.",
    tech: ["Next.js 14", "Live MLS API Grid", "Framer Motion", "Tailwind CSS"],
    icon: Home,
    accent: "#9333ea",
    gridClass: "md:col-span-2 md:row-span-2",
    liveUrl: "/portfolio/web-dev-projects/real-estate",
    benchmarks: ["Live MLS Data Processing", "Spatial Property Sorting", "Premium Asset Architecture"]
  },
  {
    id: "hvac-plumbing-matrix",
    title: "Hydroflow Matrix",
    subtitle: "Commercial Plumbing & HVAC Contractor Ecosystem",
    description:
      "A data-dense, high-performance contractor framework built to capture enterprise client leads. Showcases clean operational dashboards and highlights an integrated AI Field Assistant Copilot tool engineered to run diagnostics and real-time mechanical calculations.",
    tech: ["TypeScript", "AI Automation API", "Tailwind CSS", "Recharts"],
    icon: Shield,
    accent: "#06b6d4",
    gridClass: "md:col-span-1 md:row-span-1",
    liveUrl: "/portfolio/web-dev-projects/plumbing",
    benchmarks: ["Integrated Tech AI Assistant", "Contractor Funnel Optimization", "Telemetry Analytics"]
  },
  {
    id: "summer-camp-portal",
    title: "Camp Everwood",
    subtitle: "Organic Youth Adventure Hub Platform",
    description:
      "A warm, fluid branding system engineered for modern educational and recreational ecosystems. Integrates high-speed registration booking pipelines, dynamic program schedule matrices, and interactive rich media galleries.",
    tech: ["React 18", "Payload CMS Engine", "Tailwind CSS", "Stripe API"],
    icon: Trees,
    accent: "#22c55e",
    gridClass: "md:col-span-3 md:row-span-1",
    liveUrl: "/portfolio/web-dev-projects/summer-camp",
    benchmarks: ["Frictionless Booking Pipelines", "Dynamic Schedule Layouts", "Optimized Asset Scaling"]
  }
];

export default function WebDevPortfolioHub() {
  return (
    <div className="min-h-screen bg-[#000000] text-white p-6 md:p-12 selection:bg-[#9333ea]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-8 gap-4">
          <div>
            <span className="text-xs font-mono text-[#9333ea] uppercase tracking-widest block mb-1">
              // RICKY RANSOM LLC // WEB PRODUCTION CORES
            </span>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Premium Web Architecture
            </h1>
            <p className="text-zinc-500 text-sm mt-1">
              Select an active architectural engine below to launch full-fledged, standalone production blueprints engineered to convert.
            </p>
          </div>
          <Link
            href="/#projects"
            className="text-xs font-mono tracking-widest text-zinc-400 hover:text-white transition-colors border border-zinc-800 px-4 py-2 uppercase bg-zinc-950"
          >
            ← Back to Main Hub
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[260px] gap-6">
          {COMMERCIAL_ENGINES.map((engine) => {
            const Icon = engine.icon;
            return (
              <a
                key={engine.id}
                href={engine.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${engine.gridClass} group`}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  className="w-full h-full bg-zinc-950 border border-zinc-900 hover:border-zinc-800 p-6 flex flex-col justify-between overflow-hidden cursor-pointer relative transition-all duration-300"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 50%, ${engine.accent}, transparent 60%)`,
                    }}
                  />

                  <div className="flex justify-between items-start relative z-10">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
                        {engine.subtitle}
                      </span>
                      <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                        {engine.title}
                      </h3>
                    </div>
                    <div className="p-2.5 bg-zinc-900/50 border border-zinc-800 text-zinc-400 group-hover:text-white transition-colors">
                      <Icon size={16} style={{ color: engine.accent }} />
                    </div>
                  </div>

                  <div className="my-2 relative z-10 space-y-3">
                    <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl group-hover:text-zinc-300 transition-colors">
                      {engine.description}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] font-mono text-zinc-500">
                      {engine.benchmarks.map((b, i) => (
                        <span key={i} className="flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-zinc-700" />
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-900 relative z-10">
                    <div className="flex flex-wrap gap-1.5">
                      {engine.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[9px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-zinc-500 group-hover:text-white transition-colors uppercase">
                      Launch Standalone Model
                      <ArrowUpRight size={12} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
