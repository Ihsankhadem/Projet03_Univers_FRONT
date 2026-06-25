// Hero.tsx
import heroBg from "../../assets/espace.jpg";
import Button from "../ui/Buttons";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-[#0B0F1A]">
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-violet-900/30 to-[#0B0F1A]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <p className="text-violet-300 uppercase tracking-widest text-sm font-semibold mb-4">
          Il était une fois l'Espace
        </p>
        <h1 className="text-5xl md:text-7xl font-black text-slate-100 leading-none tracking-tight mb-4 drop-shadow-2xl">
          Vers l'Infini <br />
          <span className="text-blue-400">et l'au-delà</span>
        </h1>
        <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">
          Découvrez les dernières actualités spatiales, les missions de la NASA
          et les merveilles du cosmos.
        </p>
        <Button to="/articles">Découvrir les Articles →</Button>
      </div>
    </section>
  );
}
