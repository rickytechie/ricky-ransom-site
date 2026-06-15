"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, Shield, Trees, X, ArrowUpRight, Home } from "lucide-react";
import Link from "next/link";

// --- FULL LIVE TEMPLATE MOCKUPS INTEGRATED DIRECTLY ---
const TEMPLATES = [
  {
    id: "real-estate",
    title: "Luminous Pedigree",
    subtitle: "Luxury Hamptons Real Estate",
    icon: Home,
    accent: "#9333ea",
    gridClass: "md:col-span-2 md:row-span-2",
    previewDOM: (
      <div className="w-full h-full p-6 flex flex-col justify-between font-serif bg-[#FAF7F2] text-black">
        <div className="flex justify-between items-center border-b border-black/10 pb-2 font-mono text-[10px] tracking-widest text-black/60">
          <span>SAGAPONACK, NY</span>
          <span>MLS# 394021A</span>
        </div>
        <div className="my-6 space-y-2">
          <p className="text-[11px] font-mono tracking-widest text-[#9333ea] uppercase font-bold">
            New Exclusive Portfolio
          </p>
          <h3 className="text-2xl md:text-3xl font-light tracking-tight leading-none">The Meadow Pavilion</h3>
          <p className="text-lg font-light text-black/80">$32,500,000</p>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center font-mono text-[9px] bg-black/5 p-2 border border-black/10">
          <div>
            <span className="block text-black/40">SPACE</span>11,200 SF
          </div>
          <div>
            <span className="block text-black/40">LOT</span>3.4 ACRES
          </div>
          <div>
            <span className="block text-black/40">BEDS</span>7 SUITES
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "plumbing",
    title: "Hydroflow Matrix",
    subtitle: "Elite Mechanical Infrastructure",
    icon: Shield,
    accent: "#06b6d4",
    gridClass: "md:col-span-1 md:row-span-1",
    previewDOM: (
      <div className="w-full h-full p-4 flex flex-col justify-between font-mono bg-[#09090b] text-zinc-400 border border-zinc-800">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-2 text-[10px]">
          <span className="text-[#06b6d4] font-bold tracking-wider animate-pulse">● LIVE TELEMETRY</span>
          <span className="opacity-40">SYS_V2.4</span>
        </div>
        <div className="my-2 space-y-1">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Thermal Valve Zone B</h4>
          <div className="h-2 bg-zinc-900 border border-zinc-800 p-0.5">
            <div className="h-full bg-[#06b6d4]" style={{ width: "82%" }} />
          </div>
        </div>
        <div className="text-[9px] space-y-0.5 bg-black p-2 border border-zinc-900">
          <div className="flex justify-between">
            <span className="opacity-40">PRESSURE:</span>
            <span className="text-white">54 PSI</span>
          </div>
          <div className="flex justify-between">
            <span className="opacity-40">FLOW MATRIX:</span>
            <span className="text-white">12.4 GPM</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "personal-trainer",
    title: "VibeVault Fitness",
    subtitle: "High-Octane Athletic Coaching",
    icon: Activity,
    accent: "#a3e635",
    gridClass: "md:col-span-1 md:row-span-1",
    previewDOM: (
      <div className="w-full h-full p-4 flex flex-col justify-between bg-zinc-950 text-white border border-zinc-900 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#a3e635]/10 blur-2xl pointer-events-none" />
        <div className="flex justify-between items-center font-mono text-[9px]">
          <span className="bg-[#a3e635] text-black font-black px-1.5 py-0.5 uppercase tracking-wider">
            PULSE MATRIX
          </span>
          <span className="text-zinc-400 font-bold">142 BPM</span>
        </div>
        <div className="my-2">
          <h4 className="text-base font-black uppercase tracking-tighter italic leading-none text-zinc-100">
            Hypertrophy Engine
          </h4>
          <p className="text-[10px] font-mono text-zinc-500 mt-1">INTERVAL BREAKDOWN: 12:40</p>
        </div>
        <div className="h-7 bg-[#a3e635] text-black font-mono text-[10px] font-black uppercase tracking-wider flex items-center justify-center">
          Execute Sprint Mode
        </div>
      </div>
    ),
  },
  {
    id: "summer-camp",
    title: "Camp Everwood",
    subtitle: "Organic Adventure Hub",
    icon: Trees,
    accent: "#22c55e",
    gridClass: "md:col-span-3 md:row-span-1",
    previewDOM: (
      <div className="w-full h-full p-6 flex flex-col md:flex-row justify-between items-start md:items-center bg-[#FDFBF7] text-[#2D3A22] border border-[#E6E1D5] font-serif">
        <div className="space-y-1 max-w-md">
          <span className="text-[9px] font-mono tracking-widest bg-[#22c55e]/10 text-[#22c55e] px-2 py-0.5 rounded-full font-bold uppercase">
            Enrollment Portal Active
          </span>
          <h3 className="text-xl font-bold tracking-tight">Wilderness Expedition & Tracking Camp</h3>
          <p className="text-xs font-sans text-[#2D3A22]/70 leading-relaxed">
            Ages 8-14 · Summer Session Alpha · Limited Cabin Capacity Remaining
          </p>
        </div>
        <button className="mt-4 md:mt-0 px-6 py-3 bg-[#2D3A22] text-white font-sans text-xs font-bold tracking-wider uppercase hover:opacity-90 transition-opacity">
          Secure Cabin Space
        </button>
      </div>
    ),
  },
];

export default function WebDevPortfolioHub() {
  const [previewId, setPreviewId] = useState<string | null>(null);
  const activeTemplate = TEMPLATES.find((t) => t.id === previewId) || null;

  return (
    <div className="min-h-screen bg-[#000000] text-white p-6 md:p-12 selection:bg-[#9333ea] relative">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Simple Minimal Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Small Business Layout Engines</h1>
          </div>
          <Link
            href="/#projects"
            className="text-xs font-mono tracking-widest text-zinc-400 hover:text-white transition-colors border border-zinc-800 px-4 py-2 uppercase"
          >
            ← Main Hub
          </Link>
        </div>

        {/* TRUE BLACK HIGH-FIDELITY BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[240px] gap-6">
          {TEMPLATES.map((tmpl) => {
            const Icon = tmpl.icon;
            return (
              <motion.div
                key={tmpl.id}
                onClick={() => setPreviewId(tmpl.id)}
                whileHover={{ y: -4 }}
                className={`${tmpl.gridClass} group bg-zinc-950 border border-zinc-900 hover:border-zinc-800 p-4 flex flex-col justify-between overflow-hidden cursor-pointer relative transition-colors`}
              >
                {/* Header Metadata */}
                <div className="flex justify-between items-start z-10">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-0.5">
                      {tmpl.subtitle}
                    </span>
                    <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-zinc-300 transition-colors">
                      {tmpl.title}
                    </h3>
                  </div>
                  <div className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-white transition-colors">
                    <Icon size={14} style={{ color: tmpl.accent }} />
                  </div>
                </div>

                {/* Micro Live Component Viewport Frame */}
                <div className="w-full h-[140px] bg-black border border-zinc-900 rounded-none overflow-hidden p-1.5 relative pointer-events-none group-hover:border-zinc-800 transition-colors">
                  <div className="w-full h-full rounded-none overflow-hidden opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    {tmpl.previewDOM}
                  </div>
                </div>

                {/* Subtle Action Trigger */}
                <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-zinc-500 group-hover:text-white transition-colors uppercase pt-2 border-t border-zinc-900/50 z-10">
                  Initialize Model <ArrowUpRight size={12} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* FULL-SCREEN LIVE COMPONENT PREVIEW INTERACTION OVERLAY */}
      <AnimatePresence>
        {previewId && activeTemplate && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewId(null)}
              className="fixed inset-0 bg-black z-50 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-4 md:inset-12 bg-zinc-950 border border-zinc-800 z-50 flex flex-col overflow-hidden shadow-2xl shadow-black/80"
            >
              {/* Overlay Interactive Header Control */}
              <div className="flex justify-between items-center px-6 py-4 bg-zinc-900 border-b border-zinc-800 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <h2 className="text-sm font-mono tracking-wider text-zinc-300 uppercase">
                    {activeTemplate.title} — Active Viewport Container
                  </h2>
                </div>
                <button
                  onClick={() => setPreviewId(null)}
                  className="flex items-center gap-2 px-3 py-1.5 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 text-xs font-mono tracking-widest text-zinc-400 hover:text-white uppercase transition-all"
                >
                  <X size={14} /> Close Preview
                </button>
              </div>

              {/* Pure Rendered Interactive Target Canvas */}
              <div className="flex-1 bg-black p-4 md:p-12 overflow-y-auto flex items-center justify-center">
                <div className="w-full max-w-4xl aspect-video md:aspect-[16/10] bg-zinc-900 shadow-2xl border border-zinc-800 overflow-hidden relative">
                  {activeTemplate.previewDOM}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

