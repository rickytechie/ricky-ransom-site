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

export default function HomePage() {
  // FORCE IMMEDIATE CLIENT COOLDOWN SWITCH
  const [mounted, setMounted] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Loading sequence
  const [progress, setProgress] = useState(0);
  const [terminalLog, setTerminalLog] = useState<string[]>(["INITIALIZING SYSTEM ARCHITECTURE..."]);

  // Navigation state
  const [showHome, setShowHome] = useState(false);
  const [dashboardView, setDashboardView] = useState<"home" | "projects">("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const projectsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  // Enforce loading sequence
  useEffect(() => {
    if (!mounted || hasLoaded) return;

    let phaseIndex = 0;
    const t = window.setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(100, prev + Math.floor(Math.random() * 6) + 3);
        if (phaseIndex < bootMessages.length && next >= bootMessages[phaseIndex].threshold) {
          setTerminalLog((logs) => [...logs, bootMessages[phaseIndex].message]);
          phaseIndex += 1;
        }

        if (next === 100) {
          clearInterval(t);
          setTimeout(() => {
            setHasLoaded(true);
            setTerminalLog((logs) => [...logs, "SYSTEM BOOT SEQUENCE COMPLETE. USER INTERFACE READY."]);
          }, 500);
        }

        return next;
      });
    }, 75);

    return () => clearInterval(t);
  }, [mounted, hasLoaded]);

  // Prevent any content render until client mount
  if (!mounted) return <div className="bg-black min-h-screen" />;

  const enterHome = () => {
    setShowHome(true);
    setDashboardView("home");
  };

  const showProjects = () => {
    setShowHome(true);
    setDashboardView("projects");
    setTimeout(() => projectsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 400);
  };

  return (
    <main className="min-h-screen bg-black text-green-500 font-mono">
      {/* If loading not completed, ONLY render the boot UI */}
      {!hasLoaded && (
        <section className="flex min-h-screen items-center justify-center px-6">
          <div className="w-full max-w-3xl p-8">
            <div className="text-xs uppercase tracking-[0.55em] text-green-400">INITIALIZING SYSTEM ARCHITECTURE...</div>

            <div className="mt-8 rounded-[18px] border border-green-500/20 bg-black p-6">
              <div className="flex items-center justify-between text-sm uppercase tracking-[0.35em] text-green-300">
                <span>BOOT CALIBRATION</span>
                <span>{progress}%</span>
              </div>

              <div className="mt-4 h-4 overflow-hidden rounded-full border border-green-500/25 bg-black">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="h-full bg-green-500"
                />
              </div>

              <div className="mt-6 space-y-3 text-[13px] leading-6 text-green-200">
                {terminalLog.slice(-5).map((line, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Once boot completes, reveal menu inside same boot screen */}
            {hasLoaded && (
              <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mt-10 grid gap-4 sm:grid-cols-3">
                <button onClick={enterHome} className="rounded-2xl border border-green-500/20 bg-black px-4 py-4 text-sm uppercase tracking-[0.35em] hover:border-green-400">
                  ENTER HOME
                </button>
                <button onClick={showProjects} className="rounded-2xl border border-green-500/20 bg-black px-4 py-4 text-sm uppercase tracking-[0.35em] hover:border-green-400">
                  PROJECTS
                </button>
                <button onClick={() => setDrawerOpen(true)} className="rounded-2xl border border-green-500/20 bg-black px-4 py-4 text-sm uppercase tracking-[0.35em] hover:border-green-400">
                  CONTACT
                </button>
              </motion.div>
            )}

            {drawerOpen && (
              <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/95 px-4 py-10">
                <div className="w-full max-w-xl rounded-[20px] border border-green-500/20 bg-[#021006] p-6">
                  <div className="flex justify-end">
                    <button onClick={() => setDrawerOpen(false)} className="text-sm text-green-300">close</button>
                  </div>
                  <ContactDrawer onClose={() => setDrawerOpen(false)} />
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Only render main content after user explicitly enters HOME */}
      {hasLoaded && showHome && (
        <section className="bg-black text-green-500">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="grid gap-10 lg:grid-cols-[1.25fr_0.85fr]">
              <div className="space-y-6">
                <div className="text-xs uppercase tracking-[0.45em] text-green-300">RICKY RANSOM, LLC</div>
                <h1 className="text-5xl font-semibold leading-tight text-white">Dark-mode command launch for strategic product, AI, and brand experiences.</h1>
                <p className="max-w-2xl text-green-200">A high-fidelity interface that bends bold creative systems, commercial momentum, and enterprise storytelling into a seamless launch matrix.</p>
              </div>

              <div className="rounded-[20px] border border-green-500/10 bg-[#071210]/95 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.35em] text-green-300">COMMAND STATUS</div>
                    <p className="mt-3 text-2xl font-semibold text-white">Operational. Ready for briefing.</p>
                  </div>
                  <div className="rounded-3xl bg-[#08150f] px-4 py-3 text-sm text-green-200">LIVE</div>
                </div>
              </div>
            </div>

            <section className="mt-16 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {serviceGrid.map((service) => (
                <ServiceCard key={service.title} title={service.title} detail={service.detail} />
              ))}
            </section>

            <section className="mt-20 space-y-6" ref={projectsRef}>
              <div>
                <p className="text-xs uppercase tracking-[0.45em] text-green-300">PROJECTS</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Project decks & launch storyboards</h2>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {portfolioDeck.map((item) => (
                  <ProjectCard key={item.title} title={item.title} role={item.role} accent={item.accent} />
                ))}
              </div>
            </section>
          </div>

          {drawerOpen && (
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/95 px-4 py-10">
              <div className="w-full max-w-xl rounded-[20px] border border-green-500/20 bg-[#021006] p-6">
                <div className="flex justify-end">
                  <button onClick={() => setDrawerOpen(false)} className="text-sm text-green-300">close</button>
                </div>
                <ContactDrawer onClose={() => setDrawerOpen(false)} />
              </div>
            </div>
          )}
        </section>
      )}
    </main>
  );
}

function ServiceCard({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-[12px] border border-green-500/10 bg-[#07120f] p-6">
      <p className="text-xs uppercase tracking-[0.35em] text-green-300">SERVICE</p>
      <h2 className="mt-4 text-xl font-semibold text-white">{title}</h2>
      <p className="mt-3 text-green-200">{detail}</p>
    </div>
  );
}

function ProjectCard({ title, role, accent }: { title: string; role: string; accent: string }) {
  return (
    <div className="rounded-[12px] border border-green-500/10 bg-[#08130f] p-6">
      <span className="text-xs uppercase tracking-[0.35em] text-green-300">{title}</span>
      <h3 className="mt-4 text-2xl font-semibold text-white">{role}</h3>
      <p className="mt-3 text-green-200">{accent}</p>
    </div>
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
    }, 1400);
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col gap-5">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-green-300">Contact / Booking</p>
        <h2 className="mt-2 text-2xl font-semibold text-white">Service Request Portal</h2>
      </div>

      <div className="grid gap-4">
        <label className="block">
          <span className="text-xs uppercase tracking-[0.25em] text-green-300">Full Name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} required className="mt-2 w-full rounded-3xl border border-green-500/15 bg-[#08120f] px-4 py-3 text-sm text-white outline-none focus:border-green-400" />
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-[0.25em] text-green-300">Company Name</span>
          <input value={company} onChange={(e) => setCompany(e.target.value)} className="mt-2 w-full rounded-3xl border border-green-500/15 bg-[#08120f] px-4 py-3 text-sm text-white outline-none focus:border-green-400" />
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-[0.25em] text-green-300">Email Address</span>
          <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" className="mt-2 w-full rounded-3xl border border-green-500/15 bg-[#08120f] px-4 py-3 text-sm text-white outline-none focus:border-green-400" />
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-[0.25em] text-green-300">Project Budget Tier</span>
          <select value={budget} onChange={(e) => setBudget(e.target.value)} className="mt-2 w-full rounded-3xl border border-green-500/15 bg-[#08120f] px-4 py-3 text-sm text-white outline-none focus:border-green-400">
            <option>$5k - $10k</option>
            <option>$10k - $50k</option>
            <option>$50k - $150k</option>
            <option>$150k+</option>
          </select>
        </label>

        <label className="block">
          <span className="text-xs uppercase tracking-[0.25em] text-green-300">Service Request Type</span>
          <select value={service} onChange={(e) => setService(e.target.value)} className="mt-2 w-full rounded-3xl border border-green-500/15 bg-[#08120f] px-4 py-3 text-sm text-white outline-none focus:border-green-400">
            <option>Book Ricky for Keynote Speaking</option>
            <option>AI Consulting & Workflows</option>
            <option>Custom Web & Software Architecture</option>
          </select>
        </label>
      </div>

      <div className="mt-4 space-y-4">
        <button type="submit" disabled={submitted} className="w-full rounded-3xl bg-green-500 px-5 py-4 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-70">
          {submitted ? "SUBMITTING SIGNAL…" : "SUBMIT SIGNAL"}
        </button>
        {confirmation ? (
          <div className="rounded-3xl border border-green-500/20 bg-[#08120f] px-4 py-3 text-sm text-green-200">
            <p className="text-green-400">{confirmation}</p>
          </div>
        ) : null}
      </div>
    </form>
  );
}
