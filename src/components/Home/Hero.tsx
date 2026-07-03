import heroBg from "../../assets/espace3.png";
import Button from "../ui/Buttons";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0F1A]">
      {/* Background image */}
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay premium */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#0B0F1A]/70 to-[#0B0F1A]" />

      {/* subtle glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_60%)]" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Badge */}
        <p className="inline-flex items-center gap-2 text-violet-300 uppercase tracking-[0.3em] text-xs font-semibold mb-6">
          Exploration spatiale & découvertes scientifiques
        </p>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-black text-slate-100 leading-[1.05] tracking-tight mb-6">
          Explorer l’Univers
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-300">
            au-delà de l’imaginaire
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Découvrez les dernières actualités spatiales, les missions en cours,
          les découvertes scientifiques et les projets qui façonnent le futur de
          l’exploration humaine.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button to="/articles">Explorer les articles</Button>
        </div>
      </div>
    </section>
  );
}
