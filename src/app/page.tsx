"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent } from "react";

const bootMessages = [
  { threshold: 12, message: "Loading AI Consultation Core..." },
  { threshold: 28, message: "Connecting Creative Asset Frameworks..." },
  { threshold: 46, message: "Validating narrative systems and brand anchors..." },
  { threshold: 65, message: "Encrypting commerce flows and launch telemetry..." },
  { threshold: 84, message: "System Decryption Successful." },
  { threshold: 100, message: "USER INTERFACE READY." },
];

const serviceGrid = [
  { title: "Brand Systems", detail: "Premium identity workflows for digital-first launches." },
  { title: "AI Strategy", detail: "Generative pipelines, automation design, and insight engines." },
  { title: "Software Design", detail: "Dark-mode interfaces built for performance and clarity." },
  { title: "Launch Growth", detail: "Positioning, product motion, and executive storytelling." },
  { title: "Creative Ops", detail: "Studio-grade production systems for high-performing teams." },
  { title: "Live Consulting", detail: "Keynote, advisory, and on-demand product leadership." },
];

const portfolioDeck = [
  { title: "LexisReach", role: "Legal-tech dashboard & intake system", accent: "AI-driven workflow optimization" },
  { title: "ClassyHop", role: "Live session lab & brand audio experience", accent: "Ableton-inspired production interface" },
  { title: "Paws & Pixel", role: "Pet tech growth story", accent: "Conversion-led product storytelling" },
];

type BootPhase = "boot" | "menu" | "dashboard";

export default function HomePage() {
  const [bootPhase, setBootPhase] = useState<BootPhase>("boot");
  const [progress, setProgress] = useState(0);
  const [terminalLog, setTerminalLog] = useState<string[]>(["INITIALIZING SYSTEM ARCHITECTURE..."]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dashboardView, setDashboardView] = useState<"home" | "projects">("home");
  const projectsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bootPhase !== "boot") return;

    let phaseIndex = 0;
    const timer = window.setInterval(() => {
      setProgress((previous) => {
        const next = Math.min(100, previous + Math.floor(Math.random() * 5) + 4);
        if (phaseIndex < bootMessages.length && next >= bootMessages[phaseIndex].threshold) {
          setTerminalLog((logs) => [...logs, bootMessages[phaseIndex].message]);
          phaseIndex += 1;
        }

        if (next === 100) {
          window.clearInterval(timer);
          setTimeout(() => {
            setBootPhase("menu");
            setTerminalLog((logs) => [...logs, "SYSTEM BOOT SEQUENCE COMPLETE. USER INTERFACE READY."]);
          }, 700);
        }

        return next;
      });
    }, 90);

    return () => window.clearInterval(timer);
  }, [bootPhase]);

  function handleEnterHome() {
    setBootPhase("dashboard");
    setDashboardView("home");
  }

  function handleProjects() {
    setBootPhase("dashboard");
    setDashboardView("projects");
    setTimeout(() => projectsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 500);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black font-mono text-[#22c55e]">
      <div className="absolute inset-0 bg-black" />

      <AnimatePresence mode="wait">
        {bootPhase !== "dashboard" && (
          <motion.section
            key="boot"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55 }}
            className="absolute inset-0 z-30 flex items-center justify-center px-6 py-12"
          >
            <div className="w-full max-w-4xl rounded-[36px] border border-[#22c55e]/20 bg-[#07110d]/95 p-8 shadow-[0_0_90px_rgba(34,197,94,0.18)] backdrop-blur-sm">
              <div className="text-xs uppercase tracking-[0.55em] text-[#86efac]/95">INITIALIZING SYSTEM ARCHITECTURE...</div>

              <div className="mt-8 rounded-[28px] border border-[#22c55e]/15 bg-[#08110d] p-6">
                <div className="flex items-center justify-between text-sm uppercase tracking-[0.35em] text-[#86efac]/90">
                  <span>BOOT CALIBRATION</span>
                  <span>{progress}%</span>
                </div>

                <div className="mt-4 h-4 overflow-hidden rounded-full border border-[#22c55e]/25 bg-[#061007]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="h-full bg-[#22c55e]"
                  />
                </div>

                <div className="mt-6 space-y-3 text-[13px] leading-6 text-[#c7f9d2]">
                  {terminalLog.slice(-5).map((line, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>

              {bootPhase === "menu" && (
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.1 }}
                  className="mt-12 grid gap-4 sm:grid-cols-3"
                >
                  <button
                    onClick={handleEnterHome}
                    className="rounded-3xl border border-[#22c55e]/25 bg-[#08100f] px-5 py-5 text-sm uppercase tracking-[0.35em] transition hover:border-[#22c55e]/40 hover:bg-[#0e180f]"
                  >
                    ENTER HOME
                  </button>
                  <button
                    onClick={handleProjects}
                    className="rounded-3xl border border-[#22c55e]/25 bg-[#08100f] px-5 py-5 text-sm uppercase tracking-[0.35em] transition hover:border-[#22c55e]/40 hover:bg-[#0e180f]"
                  >
                    PROJECTS
                  </button>
                  <button
                    onClick={() => setDrawerOpen(true)}
                    className="rounded-3xl border border-[#22c55e]/25 bg-[#08100f] px-5 py-5 text-sm uppercase tracking-[0.35em] transition hover:border-[#22c55e]/40 hover:bg-[#0e180f]"
                  >
                    CONTACT / BOOKING
                  </button>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: bootPhase === "dashboard" ? 1 : 0, y: bootPhase === "dashboard" ? 0 : 18 }}
        transition={{ duration: 0.7 }}
        className="relative z-10"
      >
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.85fr]">
            <div className="space-y-6">
              <div className="text-xs uppercase tracking-[0.45em] text-[#86efac]/80">RICKY RANSOM, LLC</div>
              <h1 className="text-5xl font-semibold leading-tight text-white">Dark-mode command launch for strategic product, AI, and brand experiences.</h1>
              <p className="max-w-2xl text-slate-300">A high-fidelity interface that bends bold creative systems, commercial momentum, and enterprise storytelling into a seamless launch matrix.</p>

              <div className="grid gap-4 sm:grid-cols-3">
                <button onClick={handleEnterHome} className="rounded-[28px] border border-[#22c55e]/20 bg-[#081010] px-6 py-4 text-left transition hover:bg-[#0f1910]">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#86efac]/90">CORE</p>
                  <p className="mt-2 text-lg font-semibold">ENTER HOME</p>
                </button>
                <button onClick={handleProjects} className="rounded-[28px] border border-[#22c55e]/20 bg-[#081010] px-6 py-4 text-left transition hover:bg-[#0f1910]">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#86efac]/90">DECK</p>
                  <p className="mt-2 text-lg font-semibold">PROJECTS</p>
                </button>
                <button onClick={() => setDrawerOpen(true)} className="rounded-[28px] border border-[#22c55e]/20 bg-[#081010] px-6 py-4 text-left transition hover:bg-[#0f1910]">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#86efac]/90">SIGNAL</p>
                  <p className="mt-2 text-lg font-semibold">CONTACT / BOOKING</p>
                </button>
              </div>
            </div>

            <div className="rounded-[32px] border border-[#22c55e]/10 bg-[#071210]/95 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.16)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.35em] text-[#86efac]/80">COMMAND STATUS</div>
                  <p className="mt-3 text-2xl font-semibold text-white">Operational. Ready for briefing.</p>
                </div>
                <div className="rounded-3xl bg-[#08150f] px-4 py-3 text-sm text-[#c7f9d2]">LIVE</div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-[#22c55e]/10 bg-[#08120f] p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#86efac]/80">Pulse</p>
                  <p className="mt-3 text-lg font-semibold">Focused launch cadence</p>
                </div>
                <div className="rounded-3xl border border-[#22c55e]/10 bg-[#08120f] p-4">
                  <p className="text-xs uppercase tracking-[0.35em] text-[#86efac]/80">Signal</p>
                  <p className="mt-3 text-lg font-semibold">Premium inbound pipeline</p>
                </div>
              </div>
            </div>
          </div>

          <section className="mt-16 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {serviceGrid.map((service) => (
              <div key={service.title} className="rounded-[28px] border border-[#22c55e]/10 bg-[#07120f] p-6 transition hover:border-[#22c55e]/30">
                <p className="text-xs uppercase tracking-[0.35em] text-[#86efac]/80">SERVICE</p>
                <h2 className="mt-4 text-xl font-semibold text-white">{service.title}</h2>
                <p className="mt-3 text-slate-300">{service.detail}</p>
              </div>
            ))}
          </section>

          <section ref={projectsRef} className="mt-20 space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.45em] text-[#86efac]/70">THE LAB</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Project decks & launch storyboards</h2>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {portfolioDeck.map((item) => (
                <div key={item.title} className="rounded-[32px] border border-[#22c55e]/10 bg-[#08130f] p-6">
                  <span className="text-xs uppercase tracking-[0.35em] text-[#86efac]/80">{item.title}</span>
                  <h3 className="mt-4 text-2xl font-semibold text-white">{item.role}</h3>
                  <p className="mt-3 text-slate-300">{item.accent}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </motion.section>

      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="fixed right-0 top-0 z-50 h-full w-full md:w-[420px]"
          >
            <div className="h-full overflow-hidden rounded-l-[36px] border-l border-[#22c55e]/20 bg-[#071210] shadow-[0_0_60px_rgba(0,0,0,0.25)]">
              <ContactDrawer onClose={() => setDrawerOpen(false)} />
            </div>
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
  const [service, setService] = useState("Book Ricky for Keynote Speaking");
  const [submitted, setSubmitted] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (submitted) return;
    setSubmitted(true);
    setConfirmation("SUBMIT SIGNAL RECEIVED — REQUEST QUEUED FOR REVIEW.");
    window.setTimeout(() => {
      setSubmitted(false);
      setConfirmation("");
      onClose();
    }, 1600);
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[#86efac]/85">Contact / Booking</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Service Request Portal</h2>
        </div>
        <button type="button" onClick={onClose} className="rounded-2xl border border-[#22c55e]/20 bg-[#08120f] px-4 py-2 text-sm text-[#c7f9d2] transition hover:bg-[#0f1910]">CLOSE</button>
      </div>

      <div className="mt-6 flex-1 space-y-4 overflow-auto pr-1">
        <label className="block">
          <span className="text-xs uppercase tracking-[0.25em] text-[#86efac]/80">Full Name</span>
          <input required value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-3xl border border-[#22c55e]/15 bg-[#08120f] px-4 py-3 text-sm text-white outline-none focus:border-[#22c55e]" />
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-[0.25em] text-[#86efac]/80">Company Name</span>
          <input value={company} onChange={(event) => setCompany(event.target.value)} className="mt-2 w-full rounded-3xl border border-[#22c55e]/15 bg-[#08120f] px-4 py-3 text-sm text-white outline-none focus:border-[#22c55e]" />
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-[0.25em] text-[#86efac]/80">Email Address</span>
          <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-3xl border border-[#22c55e]/15 bg-[#08120f] px-4 py-3 text-sm text-white outline-none focus:border-[#22c55e]" />
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-[0.25em] text-[#86efac]/80">Project Budget Tier</span>
          <select value={budget} onChange={(event) => setBudget(event.target.value)} className="mt-2 w-full rounded-3xl border border-[#22c55e]/15 bg-[#08120f] px-4 py-3 text-sm text-white outline-none focus:border-[#22c55e]">
            <option>$5k - $10k</option>
            <option>$10k - $50k</option>
            <option>$50k - $150k</option>
            <option>$150k+</option>
          </select>
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-[0.25em] text-[#86efac]/80">Service Request Type</span>
          <select value={service} onChange={(event) => setService(event.target.value)} className="mt-2 w-full rounded-3xl border border-[#22c55e]/15 bg-[#08120f] px-4 py-3 text-sm text-white outline-none focus:border-[#22c55e]">
            <option>Book Ricky for Keynote Speaking</option>
            <option>AI Consulting & Workflows</option>
            <option>Custom Web & Software Architecture</option>
          </select>
        </label>
      </div>

      <div className="mt-6 space-y-4">
        <button type="submit" disabled={submitted} className="w-full rounded-3xl bg-[#22c55e] px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-[#86efac] disabled:opacity-70">{submitted ? "SUBMITTING SIGNAL…" : "SUBMIT SIGNAL"}</button>
        {confirmation ? (
          <div className="rounded-3xl border border-[#22c55e]/20 bg-[#08120f] px-4 py-3 text-sm text-[#c7f9d2]">
            <p className="text-[#22c55e]">{confirmation}</p>
          </div>
        ) : null}
      </div>
    </form>
  );
}
