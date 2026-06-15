import React from "react";
import Link from "next/link";

export default function AboutRealEstate() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <div className="rounded-[2rem] border border-[#D1D1C7]/40 bg-zinc-950/40 p-6 sm:p-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <div className="text-xs font-mono uppercase tracking-[0.35em] text-[#D1D1C7]/70">
              Philosophy
            </div>
            <h1 className="mt-3 font-playfair text-4xl leading-[1.05] text-[#FDFBF7]">
              A luxury brokerage that feels like an editorial.
            </h1>
            <p className="mt-4 font-inter text-[#FDFBF7]/75">
              Luminous Pedigree is designed for high-intent buyers. The UI is built
              around fast selection, clarity over density, and a ledger-style
              inquiry experience that makes every next step feel inevitable.
            </p>
          </div>

          <div className="w-full max-w-sm rounded-[1.75rem] border border-[#D1D1C7]/40 bg-black/30 p-5">
            <div className="text-xs font-mono uppercase tracking-[0.35em] text-[#D1D1C7]/70">
              Brand Rules
            </div>
            <ul className="mt-4 space-y-3 font-inter text-sm text-[#FDFBF7]/80">
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#D1D1C7]" />
                Sand-line borders (0.5px) for calm structure.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#D1D1C7]" />
                Frosted anchors for layered navigation.
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#D1D1C7]" />
                Time-based lighting grade for a premium “living” feel.
              </li>
            </ul>
            <Link
              href="/portfolio/web-dev-projects/real-estate/collection"
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#FDFBF7] px-5 py-3 text-sm font-semibold text-black hover:opacity-95 transition"
            >
              Explore Collection
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              k: "Curator-led discovery",
              v: "Filter like a conversation, not a spreadsheet. The UI turns preferences into an MLS-style ranked ledger.",
            },
            {
              k: "Property aesthetic first",
              v: "Every property card reserves space for narrative, media, and technical notes—so nothing feels bolted on.",
            },
            {
              k: "No-friction inquiry",
              v: "A detail page that reads like an intake sheet. Buyers know what to do next, immediately.",
            },
          ].map((x) => (
            <div
              key={x.k}
              className="rounded-[1.75rem] border border-[#D1D1C7]/40 bg-black/25 p-6"
            >
              <div className="font-mono text-xs uppercase tracking-[0.35em] text-[#D1D1C7]/70">
                {x.k}
              </div>
              <p className="mt-3 font-inter text-sm leading-6 text-[#FDFBF7]/80">
                {x.v}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

