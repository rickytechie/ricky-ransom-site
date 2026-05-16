"use client";

import { motion } from "framer-motion";
import { projects } from "@/src/data/projects";

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export function PortfolioGrid() {
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project, index) => (
        <motion.article
          key={project.title}
          className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-2xl shadow-cyan-500/5 transition duration-500 hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-[0_30px_80px_-40px_rgba(34,211,238,0.55)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
          transition={{ duration: 0.65, delay: index * 0.06 }}
        >
          <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-400/10 via-violet-500/5 to-fuchsia-400/10 opacity-0 transition duration-500 group-hover:opacity-100" />
          <div className="relative z-10 flex items-center justify-between text-xs uppercase tracking-[0.35em] text-cyan-300/80">
            <span>{project.category}</span>
            <span className="text-slate-400">Case Study</span>
          </div>
          <h3 className="relative z-10 mt-6 text-2xl font-semibold text-white">{project.title}</h3>
          <p className="relative z-10 mt-4 text-sm leading-7 text-slate-300">{project.description}</p>
          {project.link ? (
            <a
              href={project.link}
              className="relative z-10 mt-6 inline-flex text-sm font-semibold text-cyan-300 transition hover:text-cyan-100"
            >
              View details →
            </a>
          ) : null}
        </motion.article>
      ))}
    </div>
  );
}
