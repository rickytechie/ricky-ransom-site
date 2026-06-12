"use client";

import { useState } from "react";

const CONTENT_ENDPOINT = "http://127.0.0.1:8000/api/run-content-agent";
const LEAD_ENDPOINT = "http://127.0.0.1:8000/api/run-lead-agent";

export default function AgenticProjects() {
  const [companyDescription, setCompanyDescription] = useState("");
  const [targetMarket, setTargetMarket] = useState("");
  const [contentOutput, setContentOutput] = useState("");
  const [leadOutput, setLeadOutput] = useState("");
  const [loadingContent, setLoadingContent] = useState(false);
  const [loadingLead, setLoadingLead] = useState(false);
  const [contentError, setContentError] = useState("");
  const [leadError, setLeadError] = useState("");

  const runContentAgent = async () => {
    setContentError("");
    setContentOutput("");
    if (!companyDescription.trim()) {
      setContentError("Please enter a company description to run the Content Ideation Agent.");
      return;
    }

    setLoadingContent(true);
    try {
      const response = await fetch(CONTENT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company_description: companyDescription }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Content agent failed.");
      }
      setContentOutput(data.result ?? "No content returned.");
    } catch (error) {
      setContentError(error instanceof Error ? error.message : "Unexpected error from content agent.");
    } finally {
      setLoadingContent(false);
    }
  };

  const runLeadAgent = async () => {
    setLeadError("");
    setLeadOutput("");
    if (!targetMarket.trim()) {
      setLeadError("Please enter a target market to run the Lead Research Agent.");
      return;
    }

    setLoadingLead(true);
    try {
      const response = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target_market: targetMarket }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Lead agent failed.");
      }
      setLeadOutput(data.result ?? "No lead research output returned.");
    } catch (error) {
      setLeadError(error instanceof Error ? error.message : "Unexpected error from lead agent.");
    } finally {
      setLoadingLead(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
        <div className="space-y-6 border-b border-white/10 pb-8">
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-300">Agentic Projects</p>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">
            Dual-agent AI experimentation for modern growth workflows
          </h1>
          <p className="max-w-3xl text-slate-400 sm:text-lg">
            Use the CrewAI + Groq backend to simulate two autonomous workflows in one dedicated page: a high-converting
            LinkedIn content strategist and an intelligent B2B lead research assistant.
          </p>
        </div>

        <div className="mt-12 grid gap-8 xl:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-xl shadow-black/20 backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Content Ideation Agent</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Social Media Strategist</h2>
              </div>
              <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                CrewAI + Groq</span>
            </div>

            <p className="mt-5 text-slate-400">Enter a business or brand description and generate three custom LinkedIn hooks designed for conversion.</p>

            <label className="mt-8 block text-sm font-medium text-slate-300">Company / Brand Description</label>
            <textarea
              value={companyDescription}
              onChange={(event) => setCompanyDescription(event.target.value)}
              rows={6}
              className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-950/90 px-5 py-4 text-sm text-slate-100 outline-none transition focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/20"
              placeholder="Describe the business, audience, product, and growth objective..."
            />

            <button
              type="button"
              onClick={runContentAgent}
              disabled={loadingContent}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loadingContent ? "Running content agent..." : "Simulate Run"}
            </button>

            {contentError ? (
              <div className="mt-6 rounded-3xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
                {contentError}
              </div>
            ) : null}

            {contentOutput ? (
              <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/90 p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">AI Output</p>
                <pre className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-100">{contentOutput}</pre>
              </div>
            ) : null}
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-xl shadow-black/20 backdrop-blur-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-violet-300">Lead Research Agent</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Autonomous B2B Researcher</h2>
              </div>
              <span className="rounded-full bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                Targeted prospect discovery</span>
            </div>

            <p className="mt-5 text-slate-400">Enter your target market and receive three tailored B2B profiles with bottlenecks and outreach angles.</p>

            <label className="mt-8 block text-sm font-medium text-slate-300">Target Market</label>
            <input
              value={targetMarket}
              onChange={(event) => setTargetMarket(event.target.value)}
              className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-950/90 px-5 py-4 text-sm text-slate-100 outline-none transition focus:border-violet-400/70 focus:ring-2 focus:ring-violet-400/20"
              placeholder="e.g. mid-market fintech founders, SMB hospitality operators, or ecommerce logistics teams"
            />

            <button
              type="button"
              onClick={runLeadAgent}
              disabled={loadingLead}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-violet-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loadingLead ? "Running lead researcher..." : "Simulate Run"}
            </button>

            {leadError ? (
              <div className="mt-6 rounded-3xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
                {leadError}
              </div>
            ) : null}

            {leadOutput ? (
              <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/90 p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">AI Output</p>
                <pre className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-100">{leadOutput}</pre>
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </main>
  );
}
