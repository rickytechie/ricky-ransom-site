"use client";

import { useEffect, useRef, useState } from "react";

type SamplePad = {
  id: string;
  title: string;
  composer: string;
  frequency: number;
  flavor: string;
};

type DrumLoop = {
  id: string;
  label: string;
  description: string;
  pattern: number[];
  bassFrequency: number;
  snareFrequency: number;
};

const samplePads: SamplePad[] = [
  { id: "beethoven-moonlight", title: "Moonlight Sonata", composer: "Beethoven", frequency: 220, flavor: "Cinematic piano" },
  { id: "beethoven-fur-elise", title: "Für Elise", composer: "Beethoven", frequency: 247, flavor: "Intimate arpeggio" },
  { id: "beethoven-symphony-5", title: "Symphony No.5", composer: "Beethoven", frequency: 196, flavor: "Driving motif" },
  { id: "beethoven-ode-to-joy", title: "Ode to Joy", composer: "Beethoven", frequency: 262, flavor: "Anthemic brass" },
  { id: "beethoven-pathetique", title: "Pathétique", composer: "Beethoven", frequency: 233, flavor: "Dark drama" },
  { id: "mozart-nachtmusik", title: "Eine kleine Nachtmusik", composer: "Mozart", frequency: 311, flavor: "Orchestral polish" },
  { id: "mozart-sonata-11", title: "Piano Sonata No.11", composer: "Mozart", frequency: 330, flavor: "Elegant motion" },
  { id: "mozart-requiem", title: "Requiem", composer: "Mozart", frequency: 294, flavor: "Choir swell" },
  { id: "mozart-symphony-40", title: "Symphony No.40", composer: "Mozart", frequency: 370, flavor: "Urgent strings" },
  { id: "mozart-magic-flute", title: "The Magic Flute", composer: "Mozart", frequency: 294, flavor: "Operatic shimmer" },
  { id: "bach-air-g", title: "Air on the G String", composer: "Bach", frequency: 196, flavor: "Lush bow" },
  { id: "bach-toccata", title: "Toccata & Fugue", composer: "Bach", frequency: 147, flavor: "Cathedral organ" },
  { id: "bach-brandenburg", title: "Brandenburg Concerto", composer: "Bach", frequency: 262, flavor: "Baroque groove" },
  { id: "bach-jesu-joy", title: "Jesu, Joy of Man's Desiring", composer: "Bach", frequency: 220, flavor: "Warm canon" },
  { id: "bach-cello-suite", title: "Cello Suite No.1", composer: "Bach", frequency: 196, flavor: "Solo cello" },
  { id: "chopin-nocturne", title: "Nocturne in E-flat", composer: "Chopin", frequency: 311, flavor: "Velvet melody" },
  { id: "chopin-fantaisie", title: "Fantaisie-Impromptu", composer: "Chopin", frequency: 349, flavor: "Expressive rush" },
  { id: "tchaikovsky-swan-lake", title: "Swan Lake", composer: "Tchaikovsky", frequency: 277, flavor: "Dreamy ballet" },
  { id: "tchaikovsky-1812", title: "1812 Overture", composer: "Tchaikovsky", frequency: 196, flavor: "Triumphant brass" },
  { id: "vivaldi-four-seasons", title: "Four Seasons", composer: "Vivaldi", frequency: 440, flavor: "Seasonal tension" },
  { id: "debussy-clair", title: "Clair de Lune", composer: "Debussy", frequency: 329, flavor: "Moonlit texture" },
  { id: "ravel-bolero", title: "Boléro", composer: "Ravel", frequency: 262, flavor: "Hypnotic rhythm" },
  { id: "handel-messiah", title: "Messiah", composer: "Handel", frequency: 247, flavor: "Choral fire" },
  { id: "schubert-ave-maria", title: "Ave Maria", composer: "Schubert", frequency: 294, flavor: "Serene vocal" },
  { id: "haydn-surprise", title: "Surprise Symphony", composer: "Haydn", frequency: 233, flavor: "Playful cadence" },
];

const drumLoops: DrumLoop[] = [
  {
    id: "hiphop",
    label: "Hip Hop",
    description: "Thumping kicks, crisp snares, modern bounce.",
    pattern: [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    bassFrequency: 60,
    snareFrequency: 250,
  },
  {
    id: "pop",
    label: "Pop",
    description: "Punchy backbeat and bright hat pulses.",
    pattern: [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0],
    bassFrequency: 80,
    snareFrequency: 300,
  },
  {
    id: "jazz",
    label: "Jazz",
    description: "Swinging rim clicks mixed with warm kick motion.",
    pattern: [1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
    bassFrequency: 90,
    snareFrequency: 240,
  },
];

const padAccentClasses = [
  "from-violet-500/20 to-purple-800/30",
  "from-fuchsia-500/20 to-violet-900/30",
  "from-cyan-500/20 to-slate-900/20",
  "from-fuchsia-400/15 to-slate-800/30",
  "from-violet-400/15 to-slate-900/20",
];

export default function ClassyHopPage() {
  const [bpm, setBpm] = useState(108);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activePads, setActivePads] = useState<string[]>(["beethoven-moonlight", "bach-air-g"]);
  const [activeDrums, setActiveDrums] = useState<string[]>(["hiphop"]);
  const [currentStep, setCurrentStep] = useState(1);
  const [sessionText, setSessionText] = useState("Ready to compose your hybrid sonic palette.");

  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const nextBarTimeRef = useRef<number>(0);
  const schedulerTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frequencyDataRef = useRef<Uint8Array | null>(null);

  const selectedDrumObjects = drumLoops.filter((loop) => activeDrums.includes(loop.id));
  const activePadCount = activePads.length;
  const activeDrumCount = activeDrums.length;

  const padToggle = (padId: string) => {
    setActivePads((current) =>
      current.includes(padId) ? current.filter((id) => id !== padId) : [...current, padId]
    );
  };

  const drumToggle = (loopId: string) => {
    setActiveDrums((current) =>
      current.includes(loopId) ? current.filter((id) => id !== loopId) : [...current, loopId]
    );
  };

  const initializeAudio = async () => {
    if (audioContextRef.current) return audioContextRef.current;

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const masterGain = audioContext.createGain();
      const analyser = audioContext.createAnalyser();

      analyser.fftSize = 256;
      masterGain.gain.value = 0.75;
      masterGain.connect(analyser);
      analyser.connect(audioContext.destination);

      audioContextRef.current = audioContext;
      masterGainRef.current = masterGain;
      analyserRef.current = analyser;
      frequencyDataRef.current = new Uint8Array(analyser.frequencyBinCount);

      return audioContext;
    } catch {
      setSessionText("Audio initialization failed. Please allow audio playback in your browser.");
      throw new Error("AudioContext unavailable");
    }
  };

  const scheduleClassicalPhrase = (context: AudioContext, when: number, sampleId: string) => {
    const sample = samplePads.find((pad) => pad.id === sampleId);
    if (!sample) return;

    const oscillator = context.createOscillator();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(sample.frequency, when);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1200, when);
    filter.Q.value = 1.2;

    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.exponentialRampToValueAtTime(0.075, when + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.002, when + 0.9);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + 1.5);

    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(masterGainRef.current!);

    oscillator.start(when);
    oscillator.stop(when + 1.5);
  };

  const scheduleDrumHit = (context: AudioContext, when: number, type: "kick" | "snare" | "hat", frequency: number) => {
    if (type === "kick") {
      const osc = context.createOscillator();
      const gain = context.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, when);
      osc.frequency.exponentialRampToValueAtTime(40, when + 0.15);
      gain.gain.setValueAtTime(0.0001, when);
      gain.gain.exponentialRampToValueAtTime(0.18, when + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.18);

      osc.connect(gain);
      gain.connect(masterGainRef.current!);
      osc.start(when);
      osc.stop(when + 0.18);
      return;
    }

    const bufferSize = context.sampleRate * 0.1;
    const noiseBuffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = context.createBufferSource();
    noise.buffer = noiseBuffer;
    const filter = context.createBiquadFilter();
    const gain = context.createGain();

    filter.type = type === "hat" ? "highpass" : "bandpass";
    filter.frequency.setValueAtTime(type === "hat" ? 8000 : frequency, when);
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.exponentialRampToValueAtTime(type === "hat" ? 0.05 : 0.15, when + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.1);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(masterGainRef.current!);
    noise.start(when);
    noise.stop(when + 0.1);
  };

  const scheduleDrumLoop = (context: AudioContext, when: number, loop: DrumLoop) => {
    const sixteenth = (60 / bpm) / 4;
    loop.pattern.forEach((hit, index) => {
      if (hit === 1) {
        const stepTime = when + index * sixteenth;
        scheduleDrumHit(context, stepTime, "kick", loop.bassFrequency);
        if (index % 4 === 2) {
          scheduleDrumHit(context, stepTime + sixteenth * 0.2, "snare", loop.snareFrequency);
        }
        if (index % 2 === 0) {
          scheduleDrumHit(context, stepTime + sixteenth * 0.1, "hat", loop.snareFrequency + 4200);
        }
      }
    });
  };

  const scheduler = (context: AudioContext) => {
    const lookahead = 0.18;
    const barLength = (60 / bpm) * 4;
    while (nextBarTimeRef.current < context.currentTime + lookahead) {
      const startTime = nextBarTimeRef.current;
      activePads.forEach((padId, index) => {
        scheduleClassicalPhrase(context, startTime + index * 0.03, padId);
      });
      selectedDrumObjects.forEach((drum) => scheduleDrumLoop(context, startTime, drum));
      nextBarTimeRef.current += barLength;
      setCurrentStep((value) => (value % 4) + 1);
    }
  };

  const drawVisualizer = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;
    if (!canvas || !analyser) {
      rafRef.current = window.requestAnimationFrame(drawVisualizer);
      return;
    }
    const data = new Uint8Array(new ArrayBuffer(analyser.frequencyBinCount));

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      rafRef.current = window.requestAnimationFrame(drawVisualizer);
      return;
    }

    const width = canvas.clientWidth * window.devicePixelRatio;
    const height = canvas.clientHeight * window.devicePixelRatio;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    analyser.getByteFrequencyData(data);
    ctx.clearRect(0, 0, width, height);

    const barWidth = width / 24;
    const barCount = 20;
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "rgba(131, 56, 236, 0.9)");
    gradient.addColorStop(0.5, "rgba(192, 132, 252, 0.7)");
    gradient.addColorStop(1, "rgba(168, 85, 247, 0.4)");

    for (let i = 0; i < barCount; i += 1) {
      const index = Math.floor((i / barCount) * data.length);
      const value = data[index] / 255;
      const barHeight = value * height * 0.9;
      ctx.fillStyle = gradient;
      ctx.fillRect(barWidth * i * 1.15, height - barHeight, barWidth, barHeight);
    }

    rafRef.current = window.requestAnimationFrame(drawVisualizer);
  };

  const stopPlayback = () => {
    if (schedulerTimerRef.current) {
      window.clearInterval(schedulerTimerRef.current);
      schedulerTimerRef.current = null;
    }
    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setIsPlaying(false);
    setSessionText("Playback stopped. Ready for the next arrangement.");
    nextBarTimeRef.current = 0;
    setCurrentStep(1);
  };

  const startPlayback = async () => {
    try {
      const audioContext = await initializeAudio();
      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }
      setIsPlaying(true);
      setSessionText("Studio engine live. Press stop to reset the arrangement.");
      nextBarTimeRef.current = audioContext.currentTime + 0.05;
      if (schedulerTimerRef.current) {
        window.clearInterval(schedulerTimerRef.current);
      }
      schedulerTimerRef.current = window.setInterval(() => scheduler(audioContext), 80);
      if (!rafRef.current) {
        rafRef.current = window.requestAnimationFrame(drawVisualizer);
      }
    } catch {
      setSessionText("Audio playback could not start. Check browser settings.");
      setIsPlaying(false);
    }
  };

  const pausePlayback = () => {
    setIsPlaying(false);
    setSessionText("Paused — the master session is waiting.");
    if (schedulerTimerRef.current) {
      window.clearInterval(schedulerTimerRef.current);
      schedulerTimerRef.current = null;
    }
    if (rafRef.current) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (schedulerTimerRef.current) window.clearInterval(schedulerTimerRef.current);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#09070f] text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10 lg:py-14">
        <header className="mb-10 rounded-[2rem] border border-violet-500/20 bg-[#0d0c16]/90 p-8 shadow-[0_30px_80px_-40px_rgba(109,40,217,0.35)] backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">ClassyHop Studio</p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Browser DAW for Classical-to-Modern audio design.</h1>
              <p className="max-w-3xl text-base leading-8 text-slate-400 sm:text-lg">
                Build hybrid arrangements by layering legendary classical samples with contemporary Hip Hop, Pop, and Jazz loop engines — all inside a premium dark studio interface.
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-violet-500/20 bg-slate-950/80 p-6 shadow-xl shadow-violet-500/10">
              <p className="text-xs uppercase tracking-[0.32em] text-violet-200/80">Session Status</p>
              <p className="mt-4 text-xl font-semibold text-white">{isPlaying ? "Playing live" : "Studio ready"}</p>
              <p className="mt-3 text-sm text-slate-400">{sessionText}</p>
            </div>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <div className="rounded-[2rem] border border-violet-500/10 bg-[#100e1b]/80 p-6 shadow-[0_20px_60px_-30px_rgba(99,102,241,0.4)]">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">Transport Controls</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">Play the studio session.</h2>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <button
                    type="button"
                    onClick={startPlayback}
                    className="inline-flex items-center justify-center rounded-full bg-violet-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-400"
                  >
                    Play
                  </button>
                  <button
                    type="button"
                    onClick={pausePlayback}
                    className="inline-flex items-center justify-center rounded-full border border-violet-500/60 bg-white/5 px-5 py-3 text-sm font-semibold text-violet-100 transition hover:bg-white/10"
                  >
                    Pause
                  </button>
                  <button
                    type="button"
                    onClick={stopPlayback}
                    className="inline-flex items-center justify-center rounded-full border border-rose-400/40 bg-rose-500/10 px-5 py-3 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/20"
                  >
                    Stop
                  </button>
                </div>
              </div>

              <div className="mt-8 grid gap-6 rounded-[1.75rem] border border-violet-500/10 bg-[#0d0b18]/80 p-6 sm:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Tempo</p>
                    <p className="text-sm font-semibold text-white">{bpm} BPM</p>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="140"
                    value={bpm}
                    onChange={(event) => setBpm(Number(event.target.value))}
                    className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-violet-500/20 accent-violet-400"
                  />
                </div>
                <div className="rounded-[1.75rem] bg-[#130f1f]/90 p-5">
                  <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Live clock</p>
                  <div className="mt-4 flex items-center justify-between rounded-[1.5rem] bg-[#0c0a15]/90 px-4 py-5 text-white">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Current Step</p>
                      <p className="mt-2 text-2xl font-semibold">{currentStep}</p>
                    </div>
                    <div className="rounded-3xl bg-violet-500/10 px-4 py-3 text-sm text-violet-200">
                      {activePadCount} Classical Pads • {activeDrumCount} Drum Banks
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-violet-500/10 bg-[#100c1c]/90 p-6 shadow-[0_25px_80px_-35px_rgba(147,51,234,0.25)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">Classical-to-Modern Sample Matrix</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">25 legendary pads for modern production.</h2>
                </div>
                <p className="max-w-xl text-sm text-slate-400">
                  Tap any sample to lock it into the mix, then layer a modern drum bank for a premium hybrid arrangement.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {drumLoops.map((loop) => (
                  <button
                    key={loop.id}
                    type="button"
                    onClick={() => drumToggle(loop.id)}
                    className={`rounded-[1.75rem] border p-5 text-left transition ${
                      activeDrums.includes(loop.id)
                        ? "border-violet-300/40 bg-violet-500/10 text-white shadow-xl shadow-violet-500/15"
                        : "border-white/10 bg-white/5 text-slate-300 hover:border-violet-300/30 hover:bg-white/10"
                    }`}
                  >
                    <p className="text-sm uppercase tracking-[0.32em] text-violet-200">{loop.label}</p>
                    <h3 className="mt-3 text-xl font-semibold">{loop.description}</h3>
                    <p className="mt-4 text-sm leading-6 text-slate-400">Syncs instantly with the BPM transport and the active classical pad matrix.</p>
                  </button>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {samplePads.map((pad, index) => (
                  <button
                    key={pad.id}
                    type="button"
                    onClick={() => padToggle(pad.id)}
                    className={`group overflow-hidden rounded-[1.8rem] border p-4 text-left transition ${
                      activePads.includes(pad.id)
                        ? "border-violet-400/50 bg-violet-500/10 text-white shadow-[0_20px_70px_-45px_rgba(147,51,234,0.35)]"
                        : "border-white/10 bg-white/5 text-slate-200 hover:border-violet-400/30 hover:bg-white/10"
                    } ${padAccentClasses[index % padAccentClasses.length]}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-slate-400">{pad.composer}</p>
                        <h3 className="mt-2 text-lg font-semibold">{pad.title}</h3>
                      </div>
                      <div className="rounded-full bg-violet-500/20 px-3 py-1 text-xs uppercase tracking-[0.3em] text-violet-200">
                        {pad.flavor}
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-400">{activePads.includes(pad.id) ? "Active in session" : "Tap to enable this sample."}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-8">
            <div className="rounded-[2rem] border border-violet-500/10 bg-[#0f0d1f]/90 p-6 shadow-[0_25px_70px_-35px_rgba(129, 35, 255,0.25)]">
              <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">Live Audio Engine</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Studio mix console</h2>
              <div className="mt-6 space-y-4 text-slate-300">
                <div className="rounded-[1.75rem] bg-white/5 p-4">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Session status</p>
                  <p className="mt-3 text-base text-slate-200">{isPlaying ? "Transport engaged — loops playing in sync." : "Transport idle. Press play to launch the session."}</p>
                </div>
                <div className="rounded-[1.75rem] bg-white/5 p-4">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Active sources</p>
                  <p className="mt-3 text-base text-slate-200">{activePadCount} classical phrases • {activeDrumCount} modern drum banks</p>
                </div>
                <div className="rounded-[1.75rem] bg-white/5 p-4">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Sync engine</p>
                  <p className="mt-3 text-base text-slate-200">Tempo-synced loop scheduling with Web Audio timing and real-time frequency visualization.</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-violet-500/10 bg-[#120f22]/90 p-6 shadow-[0_25px_70px_-35px_rgba(147,51,234,0.22)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">Frequency Visualizer</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Pulse of the mix</h2>
                </div>
                <span className="rounded-full bg-violet-500/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-violet-200">
                  {isPlaying ? "Live" : "Standby"}
                </span>
              </div>
              <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-violet-500/10 bg-[#0d0b16]/80 p-4">
                <canvas ref={canvasRef} className="h-56 w-full" aria-label="Audio frequency visualizer" />
                <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
                  <span>Analog-style spectrum</span>
                  <span>{bpm} BPM</span>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-violet-500/10 bg-[#0a0814]/90 p-6 text-slate-300 shadow-[0_20px_70px_-35px_rgba(147,51,234,0.2)]">
              <p className="text-sm uppercase tracking-[0.35em] text-violet-300/80">How it works</p>
              <ul className="mt-6 space-y-4 text-sm leading-7">
                <li className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <strong className="text-white">1. Choose classical pads</strong> — each pad is a compositional phrase that can layer with modern percussion.
                </li>
                <li className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <strong className="text-white">2. Activate drum banks</strong> — Hip Hop, Pop, and Jazz loops sync automatically to your BPM.
                </li>
                <li className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <strong className="text-white">3. Hit play</strong> — the audio engine schedules loops in sync while the visualizer pulses to the frequency spectrum.
                </li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
