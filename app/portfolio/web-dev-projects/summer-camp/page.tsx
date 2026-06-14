"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronDown, MessageSquare, Sparkles } from "lucide-react";

function BackToShowcase() {
  return (
    <Link
      href="/portfolio/web-dev-projects"
      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white/10"
    >
      <ArrowLeft className="h-4 w-4 text-purple-300" />
      Back to Showcase
    </Link>
  );
}

const anchors = [
  { id: "activities", label: "Activities" },
  { id: "safety", label: "Safety" },
  { id: "concierge", label: "Concierge" },
];

function StickySubNav() {
  return (
    <nav className="sticky top-0 z-20 mt-6 rounded-[1.5rem] border border-white/10 bg-black/55 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
            <MessageSquare className="h-4 w-4 text-purple-300" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.35em] text-white/60">Lake Harbor</div>
            <div className="text-sm font-semibold text-white">Parent Concierge</div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {anchors.map((a) => (
            <a
              key={a.id}
              href={`#${a.id}`}
              className="min-h-[44px] rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/80 transition hover:bg-white/[0.06] hover:border-purple-400/30"
            >
              {a.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

type FAQ = {
  key: string;
  q: string;
  a: string;
};

const faqItems: FAQ[] = [
  {
    key: "allergies",
    q: "How are allergies handled?",
    a: "Counselors receive allergy notes. Meals and snack stations use clear labels, and staff coordinate with the medic for response steps.",
  },
  {
    key: "medications",
    q: "What about medications and dosages?",
    a: "Parents provide dosage instructions. Our medic team logs medication schedules and confirms consent before drop-off.",
  },
  {
    key: "pickup",
    q: "What’s the pickup & late drop-off process?",
    a: "We use a simple check-in/out flow. If you’re delayed, call the concierge desk and we’ll update your counselor route.",
  },
  {
    key: "weather",
    q: "What happens if it rains or storms?",
    a: "We switch to cabin-friendly activities and monitor conditions continuously. For severe weather, we follow safety-first protocols.",
  },
];

function FAQAccordion({ active, onToggle }: { active: string; onToggle: (k: string) => void }) {
  return (
    <div className="space-y-3">
      {faqItems.map((f) => {
        const isOpen = active === f.key;
        return (
          <button
            key={f.key}
            type="button"
            onClick={() => onToggle(isOpen ? "" : f.key)}
            className="w-full rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 text-left"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-white">{f.q}</div>
              <ChevronDown className={"h-4 w-4 text-purple-200 transition-transform " + (isOpen ? "rotate-180" : "rotate-0")} />
            </div>
            <AnimatePresence>
              {isOpen ? (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22 }}
                  className="mt-3 overflow-hidden text-sm leading-6 text-slate-300"
                >
                  {f.a}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
}

function SlidingChatDrawer() {
  const [open, setOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<string>(faqItems[0].key);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [typed, setTyped] = useState("");

  const presets = useMemo(
    () => [
      "How do you handle allergies?",
      "What is the weekly schedule?",
      "What should I pack for cabin life?",
      "What’s your rain plan?",
    ],
    []
  );

  const selectedFaq = faqItems.find((f) => f.key === activeFaq);

  const compose = (q: string) => {
    const safe = q.trim() || "(no question provided)";
    const faqLine = selectedFaq ? `

Quick FAQ guidance:
- ${selectedFaq.q}
- ${selectedFaq.a}` : "";

    return `Parent Concierge (Sample Response)

Parent question:
- ${safe}${faqLine}

Instant personalized answer:
• Safety protocols: explained in simple terms
• Weekly cadence: morning activities · lunch · afternoon specialty sessions · evening traditions
• Packing guidance: must-haves + weather-ready recommendations

Suggested next step:
- Concierge generates a printable checklist + a counselor-ready script.`;
  };

  const run = async (qOverride?: string) => {
    setThinking(true);
    setTyped("");
    await new Promise((r) => setTimeout(r, 650));

    const q = qOverride ?? input;
    const result = compose(q);

    const text = result;
    let i = 0;
    const step = 16;
    const id = window.setInterval(() => {
      i = Math.min(text.length, i + step);
      setTyped(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
        setThinking(false);
      }
    }, 18);
  };

  return (
    <div id="concierge" className="relative mt-8">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#9333ea]/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-purple-200">
              <Sparkles className="h-4 w-4 text-purple-200" />
              Parent Concierge
            </div>
            <h2 className="mt-4 text-3xl font-semibold">Sliding Chat Drawer Simulation</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              A client-side concierge drawer with preset interactive parental safety FAQ toggles and a sample animated
              response output.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="min-h-[44px] rounded-2xl bg-[#9333ea]/90 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9333ea]"
          >
            Open Concierge Drawer
          </button>
        </div>

        <div id="safety" className="mt-6 rounded-[1.75rem] border border-white/10 bg-black/20 p-4 sm:p-6">
          <div className="text-sm uppercase tracking-[0.35em] text-slate-500">Safety FAQ toggles</div>
          <div className="mt-2 text-sm font-semibold text-white">Tap to expand (sample policy)</div>
          <div className="mt-4">
            <FAQAccordion active={activeFaq} onToggle={setActiveFaq} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Close concierge drawer"
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 220, damping: 30 }}
              className="absolute right-0 top-0 h-full w-full max-w-md border-l border-white/10 bg-black/80 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.35em] text-slate-500">Lake Harbor</div>
                  <div className="text-sm font-semibold text-white">Concierge Desk</div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="min-h-[44px] rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/90 transition hover:bg-white/[0.06]"
                >
                  Close
                </button>
              </div>

              <div className="h-[calc(100%-76px)] overflow-y-auto px-5 py-5">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-xs uppercase tracking-[0.35em] text-slate-500">Preset questions</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {presets.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => {
                          setInput(p);
                          run(p);
                        }}
                        className="min-h-[44px] rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/80 transition hover:border-purple-400/30 hover:bg-black/15"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-xs uppercase tracking-[0.35em] text-slate-500">Ask concierge</label>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows={4}
                    className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-purple-400/40"
                    placeholder="e.g. What’s the weekly schedule?"
                  />
                  <button
                    type="button"
                    onClick={() => run()}
                    disabled={thinking}
                    className="mt-4 min-h-[44px] w-full rounded-2xl bg-[#9333ea]/90 px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#9333ea] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {thinking ? "Answering…" : "Get Instant Answers"}
                  </button>
                </div>

                <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs uppercase tracking-[0.35em] text-slate-500">Concierge response</div>
                      <div className="mt-2 text-sm font-semibold text-white">Counselor-ready summary</div>
                    </div>
                    <div className="text-xs text-slate-500">{typed.length ? `${typed.length} chars` : "—"}</div>
                  </div>

                  <pre className="mt-4 whitespace-pre-wrap font-mono text-xs leading-relaxed text-slate-200">{typed}</pre>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div id="activities" className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <div className="text-sm uppercase tracking-[0.35em] text-slate-500">Activities</div>
        <div className="mt-2 text-2xl font-semibold text-white">Warm, nostalgic, modern panels</div>
        <div className="mt-2 text-sm leading-6 text-slate-300">
          Rounded organic containers with earthy greens and deep ambers. This section provides sample scheduling
          context for the concierge drawer.
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { t: "Lakefront Arts", b: "Sunrise sketch sessions + cabin murals." },
            { t: "Trail Adventures", b: "Nature walks, badge hunts, and photo logs." },
            { t: "Campfire Nights", b: "Stories, songs, and counselor Q&A." },
          ].map((c) => (
            <div key={c.t} className="rounded-[2rem] border border-white/10 bg-black/20 p-5">
              <div className="text-sm font-semibold text-white">{c.t}</div>
              <div className="mt-2 text-sm text-slate-300">{c.b}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <BackToShowcase />
      </div>
    </div>
  );
}

export default function SummerCampShowcasePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-8">
        <div className="flex flex-col gap-6">
          <header className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-amber-900/20 via-black to-[#9333ea]/10 p-6 sm:p-10">
            <div aria-hidden className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#9333ea]/20 blur-3xl" />
            <div aria-hidden className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#22d3ee]/10 blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#9333ea]/10 px-3 py-1 text-xs uppercase tracking-[0.35em] text-purple-200">
                <span>Lake Harbor Summer Camp</span>
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Parent Concierge Experience</h1>
              <p className="mt-4 max-w-3xl text-slate-300">
                Warm, nostalgic but modern aesthetic with earthy greens, deep ambers, heavily rounded organic panel
                containers, and a sliding concierge drawer simulation.
              </p>
            </div>
          </header>

          <BackToShowcase />
          <StickySubNav />

          <SlidingChatDrawer />
        </div>
      </div>
    </main>
  );
}

