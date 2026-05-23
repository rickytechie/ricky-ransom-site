"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type TrackState = {
  id: string;
  name: string;
  instrument: "drum" | "bass" | "keys" | "fx";
  color: string;
  volume: number;
  muted: boolean;
  solo: boolean;
  pattern: boolean[];
  clips: boolean[];
  clipLabels: string[];
};

const sceneLabels = ["A", "B", "C", "D"];

const initialTracks: TrackState[] = [
  {
    id: "drums",
    name: "Drums",
    instrument: "drum",
    color: "#fb923c",
    volume: 0.9,
    muted: false,
    solo: false,
    pattern: [true, false, false, true, false, true, false, false, true, false, false, true, false, true, false, false],
    clips: [true, true, true, false],
    clipLabels: ["Kick Pulse", "Snare Flow", "Hat Groove", "Fill"],
  },
  {
    id: "bass",
    name: "Bass",
    instrument: "bass",
    color: "#4ade80",
    volume: 0.78,
    muted: false,
    solo: false,
    pattern: [true, false, true, true, false, false, true, false, true, false, true, true, false, false, true, false],
    clips: [true, true, false, false],
    clipLabels: ["Soul Stab", "808 Slide", "Sub Pulse", "Low Loop"],
  },
  {
    id: "keys",
    name: "Keys",
    instrument: "keys",
    color: "#38bdf8",
    volume: 0.75,
    muted: false,
    solo: false,
    pattern: [false, true, false, true, true, false, true, false, false, true, false, true, true, false, true, false],
    clips: [true, false, true, false],
    clipLabels: ["Chamber Pad", "Arpeggio", "Lead Stack", "Glow Wash"],
  },
  {
    id: "fx",
    name: "Textures",
    instrument: "fx",
    color: "#a855f7",
    volume: 0.55,
    muted: false,
    solo: false,
    pattern: [false, false, true, false, true, false, false, true, false, false, true, false, true, false, false, true],
    clips: [false, true, true, true],
    clipLabels: ["Reverb Sweep", "Vocal Chop", "Noise Rise", "Space Drop"],
  },
];

export default function ClassyHop() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);
  const tracksRef = useRef<TrackState[]>(initialTracks);
  const [tracks, setTracks] = useState<TrackState[]>(initialTracks);
  const [activeScene, setActiveScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(94);
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<"SESSION" | "PERFORMANCE">("SESSION");

  useEffect(() => {
    tracksRef.current = tracks;
  }, [tracks]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      audioCtxRef.current?.close();
    };
  }, []);

  function ensureAudio() {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtxRef.current;
  }

  function isSoloActive() {
    return tracksRef.current.some((track) => track.solo);
  }

  function triggerInstrument(track: TrackState, stepIndex: number) {
    if (!track.clips[activeScene] || !track.pattern[stepIndex]) return;
    if (isSoloActive() && !track.solo) return;
    if (!isSoloActive() && track.muted) return;

    const ctx = ensureAudio();
    const now = ctx.currentTime;
    const gain = ctx.createGain();
    const oscillator = ctx.createOscillator();

    oscillator.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.0001, now);

    const velocity = track.volume * 0.6;
    if (track.instrument === "drum") {
      oscillator.type = "square";
      oscillator.frequency.setValueAtTime(72 + Math.random() * 32, now);
      gain.gain.exponentialRampToValueAtTime(velocity, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
    } else if (track.instrument === "bass") {
      oscillator.type = "sawtooth";
      const notes = [48, 52, 55, 60];
      oscillator.frequency.setValueAtTime(notes[stepIndex % notes.length], now);
      gain.gain.exponentialRampToValueAtTime(velocity * 0.7, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.48);
    } else if (track.instrument === "keys") {
      oscillator.type = "triangle";
      const notes = [72, 76, 79, 83];
      oscillator.frequency.setValueAtTime(notes[(stepIndex + 1) % notes.length], now);
      gain.gain.exponentialRampToValueAtTime(velocity * 0.35, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.52);
    } else {
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(150 + stepIndex * 5, now);
      gain.gain.exponentialRampToValueAtTime(velocity * 0.22, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
    }

    oscillator.start(now);
    oscillator.stop(now + 0.6);
  }

  function scheduleStep(stepIndex: number) {
    tracksRef.current.forEach((track) => {
      triggerInstrument(track, stepIndex);
    });
  }

  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      return;
    }

    const intervalMs = 60000 / bpm / 4;
    let currentStep = step;

    intervalRef.current = window.setInterval(() => {
      currentStep = (currentStep + 1) % 16;
      setStep(currentStep);
      scheduleStep(currentStep);
    }, intervalMs);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [isPlaying, bpm, activeScene]);

  function updateTrack(index: number, changes: Partial<TrackState>) {
    setTracks((previous) => previous.map((track, trackIndex) => (trackIndex === index ? { ...track, ...changes } : track)));
  }

  function toggleClip(trackIndex: number, sceneIndex: number) {
    setTracks((previous) =>
      previous.map((track, trackIndex) =>
        trackIndex === trackIndex
          ? { ...track, clips: track.clips.map((active, clipIndex) => (clipIndex === sceneIndex ? !active : active)) }
          : track,
      ),
    );
  }

  function toggleMute(index: number) {
    updateTrack(index, { muted: !tracks[index].muted });
  }

  function toggleSolo(index: number) {
    updateTrack(index, { solo: !tracks[index].solo });
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-5 py-8">
        <div className="rounded-[32px] border border-white/10 bg-[#070b11]/90 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.28)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Ableton Session View</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight">ClassyHop Live Production Lab</h1>
              <p className="mt-3 max-w-2xl text-slate-300">Launch scenes, route clips, and perform with a hybrid hip-hop studio interface inspired by Ableton Live.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <button
                onClick={() => setIsPlaying((value) => !value)}
                className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${isPlaying ? "bg-emerald-500 text-slate-950" : "bg-slate-900 text-slate-200"}`}
              >
                {isPlaying ? "STOP" : "PLAY"}
              </button>
              <button
                onClick={() => setMode((value) => (value === "SESSION" ? "PERFORMANCE" : "SESSION"))}
                className="rounded-2xl border border-white/10 bg-[#08101a] px-4 py-3 text-sm"
              >
                MODE {mode}
              </button>
              <div className="rounded-2xl border border-white/10 bg-[#08101a] px-4 py-3">
                <div className="text-[11px] uppercase tracking-[0.35em] text-slate-400">TEMPO</div>
                <div className="mt-2 text-lg font-semibold">{bpm}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#08101a] px-4 py-3">
                <div className="text-[11px] uppercase tracking-[0.35em] text-slate-400">STEP</div>
                <div className="mt-2 text-lg font-semibold">{step + 1}/16</div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-[28px] border border-white/10 bg-[#08111b]/90 p-5">
            <div className="grid gap-4 lg:grid-cols-[1.75fr_0.95fr]">
              <section className="space-y-5">
                <div className="grid gap-3 md:grid-cols-4">
                  {sceneLabels.map((scene, index) => (
                    <button
                      key={scene}
                      onClick={() => setActiveScene(index)}
                      className={`rounded-3xl border px-4 py-3 text-left transition ${activeScene === index ? "border-emerald-400 bg-[#11221b]" : "border-white/10 bg-[#08101a]"}`}
                    >
                      <div className="text-xs uppercase tracking-[0.35em] text-slate-400">Scene {scene}</div>
                      <div className="mt-2 text-sm font-semibold">{tracks.filter((track) => track.clips[index]).length} clips live</div>
                      <div className="mt-2 text-xs text-slate-500">{tracks.filter((track) => track.clips[index]).map((track) => track.name).join(" · ") || "Empty slot"}</div>
                    </button>
                  ))}
                </div>

                <div className="overflow-x-auto rounded-[28px] border border-white/10 bg-[#091118] p-4">
                  <div className="space-y-3">
                    {tracks.map((track, trackIndex) => (
                      <div key={track.id} className="rounded-3xl border border-white/10 bg-[#071019] p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="inline-flex h-2.5 w-2.5 rounded-full" style={{ backgroundColor: track.color }} />
                            <div>
                              <p className="text-sm font-semibold">{track.name}</p>
                              <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">{track.instrument}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-slate-400">
                            <span className={track.muted ? "text-rose-400" : "text-slate-400"}>{track.muted ? "MUTED" : "LIVE"}</span>
                            {track.solo && <span className="text-emerald-400">SOLO</span>}
                          </div>
                        </div>
                        <div className="mt-4 grid gap-2 md:grid-cols-4">
                          {sceneLabels.map((scene, sceneIndex) => (
                            <button
                              key={`${track.id}-${scene}`}
                              onClick={() => toggleClip(trackIndex, sceneIndex)}
                              className={`rounded-2xl border px-3 py-3 text-left text-sm transition ${track.clips[sceneIndex] ? "border-emerald-400 bg-[#0c2417]" : "border-white/10 bg-[#09111d]"}`}
                            >
                              <div className="flex items-center justify-between gap-3">
                                <span className="font-semibold">
                                  {track.clips[sceneIndex] ? track.clipLabels[sceneIndex] : `Clip ${scene}`}
                                </span>
                                <span className="text-[11px] uppercase tracking-[0.35em] text-slate-500">{scene}</span>
                              </div>
                              <p className="mt-2 text-xs text-slate-500">{track.clips[sceneIndex] ? "Ready to launch" : "Inactive"}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <aside className="space-y-5">
                <div className="rounded-3xl border border-white/10 bg-[#08111b] p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Mixer strips</p>
                    <span className="text-xs text-slate-500">LIVE</span>
                  </div>
                  <div className="mt-5 space-y-4">
                    {tracks.map((track, trackIndex) => (
                      <div key={track.id} className="rounded-3xl border border-white/10 bg-[#07101a] p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold">{track.name}</p>
                            <p className="text-[11px] uppercase tracking-[0.35em] text-slate-500">VOL {Math.round(track.volume * 100)}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => toggleMute(trackIndex)}
                              className={`rounded-full px-3 py-1 text-xs ${track.muted ? "bg-rose-500 text-slate-950" : "bg-slate-800 text-slate-200"}`}
                            >
                              MUTE
                            </button>
                            <button
                              onClick={() => toggleSolo(trackIndex)}
                              className={`rounded-full px-3 py-1 text-xs ${track.solo ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-200"}`}
                            >
                              SOLO
                            </button>
                          </div>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.01}
                          value={track.volume}
                          onChange={(event) => updateTrack(trackIndex, { volume: Number(event.target.value) })}
                          className="mt-4 w-full accent-emerald-400"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-[#08111b] p-5">
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Performance mixer</p>
                  <div className="mt-4 space-y-4">
                    <div className="rounded-3xl bg-[#06121a] p-4">
                      <p className="text-sm font-semibold">Clip engine</p>
                      <p className="mt-2 text-sm text-slate-400">Scene {sceneLabels[activeScene]} is live with {tracks.filter((track) => track.clips[activeScene]).length} active lanes.</p>
                    </div>
                    <div className="rounded-3xl bg-[#06121a] p-4">
                      <p className="text-sm font-semibold">Rhythm sync</p>
                      <p className="mt-2 text-sm text-slate-400">{Math.round(60000 / bpm / 4)} ms step resolution</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-[#08151e] p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Live sequencer</p>
              <div className="mt-4 grid grid-cols-16 gap-1">
                {Array.from({ length: 16 }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-12 rounded-xl border ${step === index ? "border-emerald-400 bg-emerald-500/25" : "border-white/10 bg-slate-950/90"} flex items-center justify-center text-[11px] uppercase tracking-[0.35em] text-slate-300`}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-[#08111b] p-5">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Session summary</p>
                <div className="mt-3 text-slate-300">
                  <p>Hybrid clip-based workflow built for live arrangement and real-time beat sculpting.</p>
                  <p className="mt-3">Modern hip-hop sound design with classical polish across drums, bass, keys, and texture layers.</p>
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-[#08111b] p-5">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Mini transport</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-slate-900 px-3 py-2 text-xs uppercase tracking-[0.35em]">{isPlaying ? "RUNNING" : "IDLE"}</span>
                  <span className="rounded-full bg-slate-900 px-3 py-2 text-xs uppercase tracking-[0.35em]">{tracks.some((track) => track.solo) ? "SOLO MODE" : "FULL MIX"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
