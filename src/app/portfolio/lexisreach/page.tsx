"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

type IntakeForm = {
  firm: string;
  contact: string;
  email: string;
  matter: string;
  urgency?: "Low" | "Medium" | "High";
};

const BRASS = "#e3ad2b";

export default function LexisReachPage() {
  const [selectedStep, setSelectedStep] = useState<string>("semantic");
  const [generating, setGenerating] = useState(false);
  const [draft, setDraft] = useState<string>("No draft yet — click a stage to begin.");
  const [form, setForm] = useState<IntakeForm>({
    firm: "LexisReach Legal",
    contact: "Avery Chen",
    email: "avery@lexisreach.ai",
    matter: "IP Dispute",
    urgency: "High",
  });

  const metrics = useMemo(
    () => ({ outreach: 412, intakeHoursSaved: 48, responseRate: 72 }),
    []
  );

  useEffect(() => {
    setDraft("No draft yet — click a stage to begin.");
    setGenerating(false);
  }, [selectedStep]);

  const simulateDraft = (seed: string) => {
    setGenerating(true);
    setDraft("Preparing draft...");
    window.setTimeout(() => {
      setDraft(
        `LexisReach AI Draft (${seed})\n\nThis executive outreach template is tuned for ${form.matter} matters and presents an automated intake triage workflow. It highlights firm responsiveness, compliance confidence, and early-case qualification steps for modern corporate counsel.`
      );
      setGenerating(false);
    }, 750);
  };

  const classifyUrgency = (matter: string) => {
    const urgent = ["IP Dispute", "M&A Litigation", "SEC Inquiry"];
    const moderate = ["Employment", "Contract breach", "Privacy"];
    return urgent.includes(matter) ? "High" : moderate.includes(matter) ? "Medium" : "Low";
  };

  const handleIntakePreview = () => {
    setGenerating(true);
    setDraft("Generating intake preview...");
    window.setTimeout(() => {
      const urgency = classifyUrgency(form.matter);
      setForm((current) => ({ ...current, urgency }));
      setDraft(
        `Intake preview for ${form.matter} (Urgency: ${urgency})\n\nSummary: This matter is classified with ${urgency} priority. LexisReach automates lead qualification, pre-populates engagement needs, and routes higher-value work to senior counsel.`
      );
      setGenerating(false);
    }, 650);
  };

  return (
    <main className="min-h-screen bg-[#041025] text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="rounded-3xl border border-white/10 bg-[#061429]/95 p-8 shadow-2xl"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400" style={{ color: BRASS }}>
                LexisReach AI
              </p>
              <h1 className="text-4xl font-semibold text-white sm:text-5xl">
                Legal Outreach & Intake Executive Dashboard
              </h1>
              <p className="text-slate-300">
                A modern law firm dashboard demo that blends intake automation, AI-driven outreach templates, and executive KPI tracking.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-[#02101c] p-5 shadow-inner shadow-black/20">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Outreach lift</p>
                <p className="mt-2 text-3xl font-semibold text-white">+{metrics.outreach}%</p>
              </div>
              <div className="rounded-3xl bg-[#02101c] p-5 shadow-inner shadow-black/20">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Intake hours saved</p>
                <p className="mt-2 text-3xl font-semibold text-white">{metrics.intakeHoursSaved} hrs</p>
              </div>
            </div>
          </div>
        </motion.header>

        <section className="mt-8 grid gap-6 xl:grid-cols-[1.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-[#061a2d]/95 p-6 shadow-lg">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Interactive Workflow Tracker</h2>
                  <p className="mt-2 text-sm text-slate-400">Explore LexisReach’s staged intake and conversion flow.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {[
                    { id: "semantic", label: "Semantic Engine" },
                    { id: "intake", label: "Intake Bot" },
                    { id: "conversion", label: "Conversion" },
                    { id: "retention", label: "Retention" },
                  ].map((step) => (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => setSelectedStep(step.id)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                        selectedStep === step.id
                          ? "border-[rgba(227,173,43,0.9)] bg-[#0d2739]"
                          : "border-white/10 bg-[#01111d] hover:border-white/20 hover:bg-[#031a2c]"
                      }`}
                    >
                      {step.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-white/10 bg-[#021524] p-5">
                {selectedStep === "semantic" && (
                  <div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">AI Semantic Outreach</h3>
                        <p className="mt-2 text-sm text-slate-400">
                          Generate compliant outreach templates and executive summaries for matter-specific campaigns.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => simulateDraft("semantic")}
                        className="inline-flex items-center rounded-2xl bg-[rgba(227,173,43,0.96)] px-4 py-2 text-sm font-semibold text-slate-900"
                      >
                        {generating ? "Generating…" : "Generate Draft"}
                      </button>
                    </div>
                    <pre className="mt-5 whitespace-pre-wrap rounded-2xl bg-[#01101b] p-4 text-sm leading-6 text-slate-200">
                      {draft}
                    </pre>
                  </div>
                )}

                {selectedStep === "intake" && (
                  <div>
                    <h3 className="text-xl font-semibold">Intent-Driven Intake</h3>
                    <p className="mt-2 text-sm text-slate-400">
                      Preview automated urgency classification and consultation agreement drafts.
                    </p>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="text-xs text-slate-400">Matter type</span>
                        <select
                          value={form.matter}
                          onChange={(event) => setForm((current) => ({ ...current, matter: event.target.value }))}
                          className="mt-2 w-full rounded-2xl border border-white/10 bg-[#01131f] px-3 py-3 text-sm text-white outline-none"
                        >
                          <option>IP Dispute</option>
                          <option>Employment</option>
                          <option>Contract breach</option>
                          <option>M&A Litigation</option>
                          <option>Privacy</option>
                        </select>
                      </label>
                      <label className="block">
                        <span className="text-xs text-slate-400">Client contact</span>
                        <input
                          value={form.contact}
                          onChange={(event) => setForm((current) => ({ ...current, contact: event.target.value }))}
                          className="mt-2 w-full rounded-2xl border border-white/10 bg-[#01131f] px-3 py-3 text-sm text-white outline-none"
                        />
                      </label>
                    </div>
                    <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <button
                        type="button"
                        onClick={handleIntakePreview}
                        className="rounded-2xl bg-[rgba(227,173,43,0.96)] px-5 py-3 text-sm font-semibold text-slate-900"
                      >
                        {generating ? "Preparing preview…" : "Preview Intake"}
                      </button>
                      <div className="text-sm text-slate-400">Urgency will update automatically.</div>
                    </div>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl bg-[#01101b] p-4 text-sm text-slate-200">
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Auto urgency</p>
                        <p className="mt-3 text-lg font-semibold text-white">{form.urgency}</p>
                      </div>
                      <div className="rounded-2xl bg-[#01101b] p-4 text-sm text-slate-200">
                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Draft preview</p>
                        <div className="mt-3 min-h-[120px] whitespace-pre-wrap text-sm leading-6 text-slate-300">
                          {draft}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedStep === "conversion" && (
                  <div>
                    <h3 className="text-xl font-semibold">Conversion Pipeline</h3>
                    <p className="mt-2 text-sm text-slate-400">Route qualified leads into case onboarding, retainers, and scheduling.</p>
                    <ul className="mt-4 list-disc space-y-3 pl-5 text-slate-200">
                      <li>Automated qualification scoring for every intake submission.</li>
                      <li>Retainer sequence with e-sign and contract summarization.</li>
                      <li>Priority handoff to partner counsel for high-value matters.</li>
                    </ul>
                  </div>
                )}

                {selectedStep === "retention" && (
                  <div>
                    <h3 className="text-xl font-semibold">Retention Engine</h3>
                    <p className="mt-2 text-sm text-slate-400">Keep clients engaged with lifecycle follow-up automation.</p>
                    <ol className="mt-4 list-decimal space-y-3 pl-5 text-slate-200">
                      <li>Automated check-ins after intake completion.</li>
                      <li>Case milestone alerts for counsel and clients.</li>
                      <li>Renewal, upsell, and premium services outreach.</li>
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-[#021624]/95 p-6 shadow-xl">
              <h3 className="text-sm uppercase tracking-[0.3em] text-slate-400">Quick Insights</h3>
              <div className="mt-5 space-y-4 text-sm text-slate-300">
                <div className="rounded-2xl bg-[#01101b] p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Average lead time</p>
                  <p className="mt-2 text-lg font-semibold text-white">1.4 days</p>
                </div>
                <div className="rounded-2xl bg-[#01101b] p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Conversion lift</p>
                  <p className="mt-2 text-lg font-semibold text-white">27%</p>
                </div>
                <div className="rounded-2xl bg-[#01101b] p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Workflow efficiency</p>
                  <p className="mt-2 text-lg font-semibold text-white">60% faster intake</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[#021624]/95 p-6 shadow-xl">
              <h3 className="text-sm uppercase tracking-[0.3em] text-slate-400">Deployable Architecture</h3>
              <ul className="mt-5 space-y-3 text-sm text-slate-200">
                <li>AI-driven intake API with urgency classification.</li>
                <li>Automated lead qualification and routing engine.</li>
                <li>Secure scheduling and contract preview workflow.</li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
