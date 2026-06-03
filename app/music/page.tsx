export default function MusicHub() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-16 text-center">
        <div className="space-y-8">
          <p className="text-sm uppercase tracking-[0.35em] text-violet-300">Music & Sound Design</p>
          <h1 className="text-5xl font-black uppercase tracking-[0.2em] text-white sm:text-6xl">Ricky Ransom Music</h1>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-slate-300">
            Explore original tracks, soundscapes, and production work designed for modern brands, campaigns, and immersive experiences.
            Stream the latest sessions on SoundCloud and hear how rhythm, texture, and narrative come together.
          </p>

          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <a
              href="https://soundcloud.com/rickyransommusic"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-violet-500/10 px-6 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:border-violet-300/40 hover:bg-violet-500/20"
            >
              Open SoundCloud
            </a>
            <a
              href="/"
              className="rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-white/10"
            >
              Back to Ricky Ransom
            </a>
          </div>
        </div>

        <div className="mt-16 w-full overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-violet-500/10 sm:p-10">
          <iframe
            title="Ricky Ransom SoundCloud Player"
            width="100%"
            height="450"
            className="rounded-[1.5rem] border border-white/10 bg-black"
            scrolling="no"
            frameBorder="0"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/rickyransommusic&color=%23000000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false"
          />
        </div>
      </div>
    </main>
  );
}
