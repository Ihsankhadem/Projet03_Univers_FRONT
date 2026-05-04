export default function QuoteSection() {
  return (
    <section className="relative py-20 text-center overflow-hidden bg-gradient-to-r from-blue-900 via-violet-900 to-[#4C1D95]">
      <div className="absolute inset-0 bg-[#0B0F1A]/40" />
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <p className="text-violet-300 uppercase tracking-widest text-xs font-semibold mb-6">
          Citation
        </p>
        <blockquote className="text-2xl md:text-3xl font-semibold italic leading-relaxed text-slate-100">
          "La philosophie est écrite dans ce grand livre qui s'étend chaque jour
          devant nos yeux : l'univers. Mais on ne peut le comprendre si nous
          n'apprenons d'abord son langage et si nous ne comprenons les symboles
          avec lesquels il est écrit."
        </blockquote>
        <p className="mt-6 text-violet-200 font-medium">— Par Galilée</p>
      </div>
    </section>
  );
}
