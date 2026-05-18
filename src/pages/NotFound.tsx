import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[
          [12, 15],
          [25, 70],
          [40, 30],
          [60, 85],
          [75, 20],
          [88, 60],
          [95, 40],
          [5, 50],
          [50, 10],
          [33, 90],
          [67, 45],
          [80, 80],
          [18, 35],
          [55, 65],
        ].map(([x, y], i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: i % 3 === 0 ? "2px" : "1px",
              height: i % 3 === 0 ? "2px" : "1px",
              opacity: 0.3 + (i % 4) * 0.15,
            }}
          />
        ))}
      </div>

      {/* Planète flottante */}
      <div className="relative mb-10">
        <div className="w-36 h-36 rounded-full bg-gradient-to-br from-blue-800 via-violet-800 to-indigo-900 mx-auto shadow-lg shadow-violet-900/40" />
        {/* Anneau */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-violet-400/40 rounded-full"
          style={{ width: "200px", height: "48px" }}
        />
        {/* Astronaute perdu */}
        <div className="absolute -top-4 -right-4 text-4xl animate-bounce">
          🧑‍🚀
        </div>
      </div>

      {/* 404 */}
      <p className="text-violet-400 uppercase tracking-widest text-xs font-semibold mb-3">
        Erreur 404
      </p>
      <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 mb-4 leading-none">
        404
      </h1>
      <h2 className="text-2xl font-bold text-slate-100 mb-4">
        Perdu dans l'espace
      </h2>
      <p className="text-slate-400 max-w-md mb-10 leading-relaxed">
        Cette page s'est échappée dans le cosmos. Elle dérive quelque part entre
        deux galaxies, introuvable pour le moment.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="border border-violet-300 text-violet-200 hover:bg-violet-700 hover:text-white px-8 py-3 rounded-full transition-colors font-semibold text-sm"
        >
          ← Retour à l'accueil
        </Link>
        <Link
          to="/articles"
          className="border border-slate-600 text-slate-400 hover:border-violet-500 hover:text-violet-300 px-8 py-3 rounded-full transition-colors font-semibold text-sm"
        >
          Voir les articles
        </Link>
      </div>
    </div>
  );
}
