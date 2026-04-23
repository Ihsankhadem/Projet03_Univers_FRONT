
export default function ArticlesHero() {
  return (
    <div className="relative h-48 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-violet-900/40 to-[#0B0F1A]" />
      <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-6 max-w-7xl mx-auto">
        <p className="text-violet-400 uppercase tracking-widest text-xs font-semibold mb-1">
          Exploration
        </p>
        <h1 className="text-4xl font-black text-slate-100">Articles</h1>
      </div>
    </div>
  );
}