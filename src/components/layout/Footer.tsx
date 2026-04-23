import { Link } from "react-router-dom";
import { Rocket, Mail, Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0B0F1A] text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
              <Rocket className="w-7 h-7 text-violet-400" />
              <span className="text-xl font-bold text-slate-100">Blog de l'Univers</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Explorez les mystères du cosmos, les missions spatiales et les
              dernières découvertes de la NASA. L'espace pour tous, gratuitement.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Accueil", path: "/" },
                { label: "Articles", path: "/articles" },
                { label: "Espace Enfants", path: "/kids" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-slate-400 hover:text-violet-300 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Ressources</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "NASA.gov", href: "https://www.nasa.gov" },
                { label: "ESA.int", href: "https://www.esa.int" },
                { label: "FAQ", href: "/faq" },
                { label: "Connexion rédacteur", href: "/connexion" },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-slate-400 hover:text-violet-300 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">
            &copy; {new Date().getFullYear()} Blog de l'Univers. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <a href="mailto:contact@univers-blog.fr" className="text-slate-500 hover:text-violet-300 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" className="text-slate-500 hover:text-violet-300 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://github.com" className="text-slate-500 hover:text-violet-300 transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}