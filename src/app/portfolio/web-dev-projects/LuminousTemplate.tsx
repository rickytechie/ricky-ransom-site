"use client";
import React from "react";
export default function LuminousTemplate({ title, subtitle, desc, bg }: { title: string, subtitle: string, desc: string, bg: string }) {
  return (
    <div className="bg-zinc-950 text-white min-h-screen relative overflow-hidden font-sans">
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex items-center justify-between bg-zinc-950/40 backdrop-blur-md border-b border-stone-800">
        <div className="text-white/90 font-mono uppercase tracking-[0.3em] text-sm font-semibold">LUMINOUS</div>
      </nav>
      <div className="min-h-screen flex flex-col justify-end px-12 pb-24 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(to bottom, rgba(9,9,11,0.3), rgba(9,9,11,0.95)), url('${bg}')` }}>
        <span className="text-[10px] font-mono tracking-[0.4em] text-stone-400 mb-2 uppercase">{subtitle}</span>
        <h1 className="font-serif text-8xl text-white tracking-tight leading-none mb-6">{title}</h1>
        <p className="max-w-2xl text-stone-300 text-lg mb-10">{desc}</p>
        <button className="bg-white text-black px-8 py-4 text-xs font-mono uppercase font-semibold w-max">EXPLORE PROJECT</button>
      </div>
    </div>
  );
}
