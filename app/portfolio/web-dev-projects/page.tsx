"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Home, Shield, Activity, Trees } from "lucide-react";
import Link from "next/link";

const LIVE_PROJECTS = [
  {
    id: "real-estate",
    title: "Luminous Pedigree",
    subtitle: "Luxury Hamptons Real Estate Template",
    description:
      "High-end real estate portal featuring cinematic imagery, immersive editorial layouts, and premium interactive property filtering.",
    tech: ["Next.js 14", "Framer Motion", "Tailwind CSS"],
    icon: Home,
    accent: "#9333ea",
    gridClass: "md:col-span-2 md:row-span-2",
    liveUrl: "/portfolio/web-dev-projects/real-estate",
  },
  {
    id: "plumbing",
    title: "Hydroflow Matrix",
    subtitle: "Industrial Mechanical Systems UI",
    description:
      "Data-dense dashboard environment tailored for modern B2B infrastructure and asset monitoring logistics.",
    tech: ["TypeScript", "Recharts", "Tailwind"],
    icon: Shield,
    accent: "#06b6d4",
    gridClass: "md:col-span-1 md:row-span-1",
    liveUrl: "/portfolio/web-dev-projects/plumbing",
  },
  {
    id: "personal-trainer",
    title: "VibeVault Fitness",
    subtitle: "High-Octane Athletic Coaching",
    description:
      "Ultra-modern, dark-mode landing page designed for premium performance training with aggressive typography and seamless conversion funnels.",
    tech: ["Next.js", "Tailwind", "GSAP"],
    icon: Activity,
    accent: "#a3e635",
    gridClass: "md:col-span-1 md:row-span-1",
    liveUrl: "/portfolio/web-dev-projects/personal-trainer",
  },
  {
    id: "summer-camp",
    title: "Camp Everwood",
    subtitle: "Organic Adventure Hub Portal",
    description:
      "A warm, premium brand experience for educational and recreational systems, integrating booking pipelines and rich media galleries.",
    tech: ["React", "Tailwind CSS", "Payload CMS"],
    icon: Trees,
    accent: "#22c55e",
    gridClass: "md:col-span-3 md:row-span-1",
    liveUrl: "/portfolio/web-dev-projects/summer-camp",
  },
];

export default function WebDevPortfolioHub() {
  return (
    <div className="min-h-screen bg-[#000000] text-white p-6 md:p-12 selection:bg-[#9333ea]">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-900 pb-8 gap-4">
          <div>
            <span className="text-xs font-mono text-[#9333ea] uppercase tracking-widest block mb-1">
              // PRODUCTION-READY SYSTEMS
            </span>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Premium Web Architecture
            </h1>
          </div>
          <Link
            href="/#projects"
            className="text-xs font-mono tracking-widest text-zinc-400 hover:text-white transition-colors border border-zinc-800 px-4 py-2 uppercase bg-zinc-950"
          >
             Back to Main
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[260px] gap-6">
          {LIVE_PROJECTS.map((project) => {
            const Icon = project.icon;
            return (
              <Link
                key={project.id}
                href={project.liveUrl}
                className={project.gridClass}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  className="w-full h-full bg-zinc-950 border border-zinc-900 hover:border-zinc-800 p-6 flex flex-col justify-between overflow-hidden cursor-pointer relative transition-all duration-300"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 pointer-events-none"
                    style={{
                      backgroundImage: `radial-gradient(circle at 50% 50%, ${project.accent}, transparent 60%)`,
                    }}
                  />

                  <div className="flex justify-between items-start relative z-10">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block">
                        {project.subtitle}
                      </span>
                      <h3 className="text-xl font-bold tracking-tight text-white hover:text-zinc-200 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <div className="p-2.5 bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white transition-colors">
                      <Icon size={16} style={{ color: project.accent }} />
                    </div>
                  </div>

                  <div className="my-4 relative z-10">
                    <p className="text-xs text-zinc-400 leading-relaxed max-w-xl">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-900 relative z-10">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[9px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-400 px-2 py-0.5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
                      Launch Live Experience
                      <ArrowUpRight size={12} />
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

