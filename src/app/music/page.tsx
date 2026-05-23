"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function MusicHub() {
  const [playing, setPlaying] = useState(false);

  return (
    <main className="min-h-screen p-8 bg-black text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-semibold">The Sonic Identity Hub</h1>
        <p className="text-slate-300 mt-2">Design systems for sound, voice identity, and immersive audio-first experiences.</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <motion.div whileHover={{ scale: 1.02 }} className="rounded-2xl bg-[#06121a] p-6 border border-white/10 shadow-lg shadow-[#000]/20">
            <h3 className="font-semibold">Vinyl Demo</h3>
            <div className="mt-4 flex items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0f172a] to-[#02111a] flex items-center justify-center">
                <motion.div animate={{ rotate: playing ? 360 : 0 }} transition={{ repeat: Infinity, duration: 8, ease: 'linear' }} className="w-16 h-16 bg-gradient-to-br from-[#7c3aed] to-[#9333ea] rounded-full" />
              </div>
              <div>
                <div className="text-sm text-slate-400">Audio brand token</div>
                <button onClick={() => setPlaying((s) => !s)} className="mt-4 rounded-2xl bg-[#0b1220] px-4 py-2 text-sm">{playing ? 'Pause' : 'Animate'}</button>
              </div>
            </div>
            <p className="mt-5 text-slate-300">Pulse-driven motion that matches the mood of premium sound design.</p>
          </motion.div>

          <div className="rounded-2xl bg-[#06121a] p-6 border border-white/10 shadow-lg shadow-[#000]/20">
            <h3 className="font-semibold">SoundCloud Demo</h3>
            <p className="mt-3 text-slate-400">A live audio embed for a polished sonic portfolio.</p>
            <div className="mt-4 overflow-hidden rounded-3xl border border-white/10">
              <iframe
                title="soundcloud"
                width="100%"
                height="180"
                scrolling="no"
                frameBorder="0"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/forss/flickermood&color=%23000000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false"
              ></iframe>
            </div>
          </div>

          <div className="rounded-2xl bg-[#06121a] p-6 border border-white/10 shadow-lg shadow-[#000]/20">
            <h3 className="font-semibold">Voice Design</h3>
            <p className="mt-3 text-slate-300">Sonic identity systems for brand audio, launch sequences, and adaptive voice experiences.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
