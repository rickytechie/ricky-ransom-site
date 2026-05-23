"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

const BRASS = '#e3ad2b';

export default function LexisReach() {
  const [intake, setIntake] = useState({ client: '', matter: '', hoursSaved: 45, outreach: 400 });
  const [preview, setPreview] = useState('');
  const [urgency, setUrgency] = useState<'low'|'medium'|'high'>('medium');

  function classifyUrgency(text: string) {
    const t = text.toLowerCase();
    if (t.includes('injunction') || t.includes('emergency') || t.includes('deadline')) return 'high';
    if (t.includes('contract') || t.includes('compliance')) return 'medium';
    return 'low';
  }

  function simulateDraft(seed = '') {
    return `Preview: ${seed || 'new matter'} triage ready. Outreach +${intake.outreach}, ${intake.hoursSaved} hours saved through automated intake and pre-draft workflows.`;
  }

  function handlePreview() {
    setUrgency(classifyUrgency(intake.matter));
    setPreview(simulateDraft(intake.matter || intake.client));
  }

  const metrics = useMemo(
    () => [
      { label: 'Outreach', value: intake.outreach },
      { label: 'Intake Hours Saved', value: intake.hoursSaved },
      { label: 'Active Matters', value: 28 }
    ],
    [intake]
  );

  return (
    <main className="min-h-screen p-8 bg-black text-white">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold">LexisReach AI</h1>
            <p className="mt-2 text-slate-300 max-w-xl">A legal-tech command center built to accelerate intake, triage, and client outreach with brass-era confidence.</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-3xl bg-[#07121a] p-4 text-center border border-white/10">
                <div className="text-sm text-slate-400">{m.label}</div>
                <div className="mt-2 text-2xl font-semibold" style={{ color: m.label === 'Outreach' ? BRASS : 'white' }}>{m.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          <div className="rounded-3xl bg-[#06121a] p-6 border border-white/10 shadow-xl shadow-[#000]/20">
            <h3 className="font-semibold">Intake Simulator</h3>
            <p className="mt-3 text-slate-400">Seed a matter, preview the first draft, and let the dashboard classify urgency before the team even opens the file.</p>
            <div className="mt-6 space-y-4">
              <input placeholder="Client or matter name" value={intake.client} onChange={(e) => setIntake((prev) => ({ ...prev, client: e.target.value }))} className="w-full rounded-2xl bg-[#01121a] p-3 text-white outline-none" />
              <textarea placeholder="Short matter description" value={intake.matter} onChange={(e) => setIntake((prev) => ({ ...prev, matter: e.target.value }))} className="w-full rounded-2xl bg-[#01121a] p-3 text-white outline-none min-h-[140px]" />
              <div className="flex flex-wrap gap-3">
                <button onClick={handlePreview} className="rounded-2xl bg-[rgba(227,173,43,0.95)] px-5 py-3 text-sm font-semibold text-slate-900">Preview Draft</button>
                <button onClick={() => setIntake((prev) => ({ ...prev, outreach: prev.outreach + 50 }))} className="rounded-2xl bg-[#0b1220] px-5 py-3 text-sm">Increase Outreach</button>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#07121a] p-4">
                <div className="text-sm text-slate-400">Urgency</div>
                <div className="mt-2 text-lg font-semibold" style={{ color: urgency === 'high' ? '#f87171' : urgency === 'medium' ? '#fbbf24' : '#94a3b8' }}>{urgency.toUpperCase()}</div>
                {preview && (
                  <div className="mt-4 rounded-2xl bg-[#041018] p-4 text-slate-200">
                    <pre className="whitespace-pre-wrap text-sm">{preview}</pre>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[#06121a] p-6 border border-white/10 shadow-xl shadow-[#000]/20">
            <h3 className="font-semibold">Triage & Outreach</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li>Acme v. Widget — intake routed, outreach sequence activated.</li>
              <li>Greystone Contract Review — compliance intake automated.</li>
              <li>Emergency Injunction — high urgency flagged, fast-track workflow started.</li>
            </ul>
            <div className="mt-6 rounded-2xl bg-[#07121a] p-4 text-slate-200">
              <div className="text-sm text-slate-400">What this page demonstrates</div>
              <div className="mt-2">A polished executive dashboard for legal teams that blends intake motion, AI drafting, and outreach performance into a single command surface.</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
