"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "AI Consulting",
    label: "Strategy",
    description:
      "AI-first strategy, model selection, and product roadmaps built for executive-level growth.",
  },
  {
    title: "Media Services",
    label: "Production",
    description:
      "Premium media production, visual storytelling, and distribution planning for modern brands.",
  },
  {
    title: "Keynote Speaking",
    label: "Presence",
    description:
      "High-impact stage narratives, keynote design, and audience-led delivery for executive forums.",
  },
  {
    title: "Digital Marketing",
    label: "Growth",
    description:
      "Demand generation, campaign architecture, and brand activation across performance channels.",
  },
  {
    title: "Web Design",
    label: "Experience",
    description:
      "Responsive product experiences, premium design systems, and conversion-focused digital presence.",
  },
  {
    title: "Software Consulting",
    label: "Engineering",
    description:
      "Architecture reviews, SaaS strategy, and full-stack engineering guidance for complex launches.",
  },
];

const gridVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const layoutClasses = [
  "lg:col-span-2 lg:row-span-2",
  "",
  "lg:row-span-2",
  "lg:col-span-2",
  "",
  "",
];

export function ServiceGrid() {
  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <motion.article
          key={service.title}
          className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/75 p-8 shadow-2xl shadow-cyan-500/5 backdrop-blur-xl transition duration-500 ${layoutClasses[index]}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridVariants}
          transition={{ duration: 0.7, delay: index * 0.07 }}
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-fuchsia-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />
          <span className="relative inline-flex rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/85">
            {service.label}
          </span>
          <h3 className="relative mt-6 text-2xl font-semibold text-white">{service.title}</h3>
          <p className="relative mt-4 text-sm leading-7 text-slate-300">{service.description}</p>
        </motion.article>
      ))}
    </div>
  );
}
