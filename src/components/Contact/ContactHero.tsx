// src/components/Contact/ContactHero.tsx

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-[#070B1A] py-24 px-4">
      {/* glow top right */}
      <div className="absolute -top-32 right-[-120px] h-80 w-80 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 opacity-70 blur-3xl" />

      {/* glow bottom left */}
      <div className="absolute bottom-[-120px] left-[-80px] h-56 w-56 rounded-full bg-cyan-500/30 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.35em] text-violet-400">
          Contact
        </p>

        <h1 className="text-4xl font-black text-white sm:text-5xl md:text-6xl">
          Parlons de votre projet
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
          Une idée, une question ou une collaboration ? Écrivez-nous simplement
          via le formulaire ci-dessous.
        </p>
      </div>
    </section>
  );
}
