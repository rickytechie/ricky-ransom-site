"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function ClassyHop() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const [bpm, setBpm] = useState(90);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pads, setPads] = useState(Array.from({ length: 8 }).map(() => false));

  useEffect(() => {
    return () => {
      audioCtxRef.current?.close();
    };
  }, []);

  function ensureAudio() {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtxRef.current;
  }

  function triggerPad(i: number) {
    const ctx = ensureAudio();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = 110 + i * 40;
    g.gain.value = 0.0001;
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    g.gain.exponentialRampToValueAtTime(0.6, ctx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    setPads((prev) => prev.map((_, idx) => idx === i));
    setTimeout(() => setPads((prev) => prev.map(() => false)), 280);
    setTimeout(() => { try { o.stop(); } catch {} }, 900);
  }

  useEffect(() => {
    if (!isPlaying) return;
    const sequence = [0, 3, 1, 5, 2, 4, 0, 6];
    let current = 0;
    const interval = window.setInterval(() => {
      triggerPad(sequence[current % sequence.length]);
      current += 1;
    }, 60000 / bpm);
    return () => window.clearInterval(interval);
  }, [isPlaying, bpm]);

  return (
    <main className="min-h-screen p-8 bg-black text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-semibold">ClassyHop — live DAW</h1>
        <p className="text-slate-300 mt-2">A playable hybrid DAW where classical structure and hip-hop rhythm meet real-time audio response.</p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
          <div className="rounded-2xl bg-[#06121a] p-5 border border-white/10">
            <div className="text-sm text-slate-400">Transport</div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button onClick={() => setIsPlaying((p) => !p)} className="rounded-2xl bg-[#0b1220] px-4 py-2">{isPlaying ? 'Stop' : 'Start'}</button>
              <label className="text-sm">Tempo</label>
              <input type="range" min={60} max={180} value={bpm} onChange={(e) => setBpm(Number(e.target.value))} className="w-full md:w-40" />
              <div className="ml-auto text-sm font-semibold text-slate-200">{bpm} BPM</div>
            </div>
            <p className="mt-4 text-slate-400">Tap pads manually or press play to run a tempo-driven sequence.</p>
          </div>

          <div className="rounded-2xl bg-[#06121a] p-5 border border-white/10">
            <div className="text-sm text-slate-400">Sample Pads</div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  key={i}
                  onClick={() => triggerPad(i)}
                  className={`h-16 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f172a] to-[#081022] flex items-center justify-center text-sm ${pads[i] ? 'ring-2 ring-[#7c3aed] shadow-lg shadow-[#7c3aed]/20' : ''}`}>
                  Pad {i + 1}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-[#06121a] p-6 border border-white/10">
          <h3 className="font-semibold">Score Snippets</h3>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 rounded bg-[#07121a]">"Nocturne Motif" — sampled arpeggio</div>
            <div className="p-3 rounded bg-[#07121a]">"Stretto Bass" — warm analog</div>
            <div className="p-3 rounded bg-[#07121a]">"Cadenza Hit" — orchestral hit</div>
          </div>
        </div>
      </div>
    </main>
  );
}
