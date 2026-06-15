"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function PlumbingPage() {
  return (
    <div className="bg-zinc-950 text-white min-h-screen relative overflow-hidden font-sans">
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between bg-zinc-950/40 backdrop-blur-md border-b border-stone-800">
        <div className="text-white/90 font-mono uppercase tracking-[0.3em] text-sm font-semibold">
          FLOW TELEMETRY
        </div>
        <div className="flex items-center gap-8">
          <Link href="/portfolio/web-dev-projects/plumbing/systems" className="text-xs font-mono tracking-widest text-stone-400 hover:text-white transition-colors">SYSTEMS</Link>
          <Link href="/portfolio/web-dev-projects/plumbing/diagnostics" className="text-xs font-mono tracking-widest text-stone-400 hover:text-white transition-colors">DIAGNOSTICS</Link>
          <button className="bg-white text-black px-6 py-2.5 text-xs font-mono uppercase font-bold tracking-wider hover:bg-stone-200 transition-all">DISPATCH</button>
        </div>
      </nav>
      <div className="min-h-screen relative flex flex-col justify-end px-12 pb-24 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(to bottom, rgba(9,9,11,0.4), rgba(9,9,11,0.95)), url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=80')" }}>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-4xl text-left">
          <span className="text-[10px] font-mono tracking-[0.4em] text-stone-400 mb-2 block uppercase">INFRASTRUCTURE CORE</span>
          <h1 className="font-serif text-6xl md:text-8xl text-white tracking-tight leading-none mb-6">Precision Telemetry</h1>
          <p className="max-w-2xl text-stone-300 text-sm md:text-base font-light leading-relaxed tracking-wide mb-10">Engineered commercial pipe networks monitored in real-time. Automated diagnostic isolation arrays paired with zero-latency priority contractor dispatch infrastructure.</p>
          <div className="flex flex-wrap gap-4 items-center">
            <button className="bg-white text-black px-8 py-4 text-xs font-mono uppercase font-semibold tracking-widest hover:bg-stone-200 transition-all inline-flex items-center gap-2">ACCESS TERMINAL <ArrowRight size={14} /></button>
            <button className="border border-stone-700 backdrop-blur-sm text-white px-8 py-4 text-xs font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-all">RUN CO-PILOT</button>
          </div>
        </div>
      </div>
    </div>
  );
}

