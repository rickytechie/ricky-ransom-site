"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const labRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(0);
  const [phase, setPhase] = useState<"boot" | "menu" | "home">("boot");
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setLoaded((v) => {
        const n = v + Math.floor(Math.random() * 6) + 2;
        if (n >= 100) {
          clearInterval(id);
          setTimeout(() => setPhase("menu"), 600);
          return 100;
        }
        return n;
      });
    }, 120);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    const cols = Math.floor(window.innerWidth / 14);
    let drops = Array.from({ length: cols }).map(() => 0);

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      ctx.fillStyle = "rgba(0,0,0,0.12)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "14px monospace";
      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(0x30a0 + Math.random() * 96);
        ctx.fillStyle = i % 6 === 0 ? "#7c3aed" : "#1e293b";
        ctx.fillText(text, i * 14, drops[i] * 14);
        if (drops[i] * 14 > canvas.height && Math.random() > 0.98) drops[i] = 0;
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  function handleProjects() {
    setPhase("home");
    setTimeout(() => labRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 450);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <canvas ref={canvasRef} className="canvas-full pointer-events-none" />

      <AnimatePresence>
        {phase !== "home" && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-40 flex items-center justify-center"
          >
            <div className="text-center px-5">
              <div className="mb-6">
                <div className="text-xs tracking-[0.35em] text-slate-500">SYSTEM BOOTING / AI / MEDIA / PRODUCT</div>
                <div className="mt-3 text-5xl font-mono font-semibold">{loaded}%</div>
              </div>

              {phase === "menu" && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                  <button onClick={() => setPhase("home")} className="px-6 py-3 rounded-2xl bg-gradient-to-b from-[#111827] to-[#071029] border border-white/10">LAUNCH CONSOLE</button>
                  <button onClick={handleProjects} className="px-6 py-3 rounded-2xl bg-[#02111a] border border-white/10">EXPLORE PROJECTS</button>
                  <button onClick={() => setContactOpen(true)} className="px-6 py-3 rounded-2xl bg-[#02111a] border border-white/10">OPEN CONTACT</button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.section initial={{ opacity: 0 }} animate={{ opacity: phase === "home" ? 1 : 0 }} transition={{ duration: 0.8 }} className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Ricky Ransom / Systems & Strategy</p>
              <h1 className="mt-4 text-5xl font-semibold text-white">Creative engineering for brand-driven AI products.</h1>
              <p className="mt-4 text-slate-300 max-w-2xl">From startup launches to legal-tech dashboards, I build digital experiences that feel premium and move markets.</p>
            </div>
            <button onClick={() => setContactOpen(true)} className="rounded-3xl bg-[rgba(227,173,43,0.95)] px-6 py-3 text-sm font-semibold text-slate-900">Book a discovery intake</button>
          </div>

          <div ref={labRef} id="lab" className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-[#07121a] p-8 border border-white/10 shadow-xl shadow-[#0b122a]/20">
              <h2 className="text-xl font-semibold">The Lab</h2>
              <p className="mt-3 text-slate-300">High-impact case studies with premium interaction, polish, and product storytelling.</p>
            </div>
            <div className="rounded-3xl bg-[#07121a] p-8 border border-white/10 shadow-xl shadow-[#0b122a]/20">
              <h2 className="text-xl font-semibold">Services</h2>
              <p className="mt-3 text-slate-300">AI strategy, UX systems, content production, and product launch consulting for modern B2B brands.</p>
            </div>
            <div className="rounded-3xl bg-[#07121a] p-8 border border-white/10 shadow-xl shadow-[#0b122a]/20">
              <h2 className="text-xl font-semibold">Contact</h2>
              <p className="mt-3 text-slate-300">Schedule creative direction, keynote strategy, or a custom engagement.</p>
            </div>
          </div>
        </div>
      </motion.section>

      <AnimatePresence>
        {contactOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300 }} className="fixed right-0 top-0 z-50 h-full w-full md:w-96 bg-[#02111a] p-6 shadow-2xl">
            <ContactDrawer onClose={() => setContactOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function ContactDrawer({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("$10k - $50k");
  const [service, setService] = useState("AI Consulting & Workflows");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      alert('Request submitted — a member of the team will follow up.');
      onClose();
    }, 900);
  }

  return (
    <form onSubmit={handleSubmit} className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Contact — Intake</h2>
        <button type="button" onClick={onClose} className="text-sm text-slate-300">Close</button>
      </div>

      <div className="mt-4 space-y-3 flex-1 overflow-auto">
        <label className="block">
          <div className="text-xs text-slate-400">Full name</div>
          <input required value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-md bg-[#01121a] p-2 text-white outline-none" />
        </label>

        <label className="block">
          <div className="text-xs text-slate-400">Company</div>
          <input value={company} onChange={(e) => setCompany(e.target.value)} className="mt-1 w-full rounded-md bg-[#01121a] p-2 text-white outline-none" />
        </label>

        <label className="block">
          <div className="text-xs text-slate-400">Email address</div>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-md bg-[#01121a] p-2 text-white outline-none" />
        </label>

        <label className="block">
          <div className="text-xs text-slate-400">Project budget</div>
          <select value={budget} onChange={(e) => setBudget(e.target.value)} className="mt-1 w-full rounded-md bg-[#01121a] p-2 text-white outline-none">
            <option>$5k - $10k</option>
            <option>$10k - $50k</option>
            <option>$50k - $150k</option>
            <option>$150k+</option>
          </select>
        </label>

        <label className="block">
          <div className="text-xs text-slate-400">Service request</div>
          <select value={service} onChange={(e) => setService(e.target.value)} className="mt-1 w-full rounded-md bg-[#01121a] p-2 text-white outline-none">
            <option>Book Ricky for Keynote Speaking</option>
            <option>AI Consulting & Workflows</option>
            <option>Custom Web & Software Architecture</option>
          </select>
        </label>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-slate-400">Secure routing & confirmation</div>
        <button type="submit" disabled={submitted} className="rounded-2xl bg-[rgba(227,173,43,0.95)] px-4 py-2 font-semibold text-slate-900">{submitted ? 'Submitting…' : 'Submit request'}</button>
      </div>
    </form>
  );
}
