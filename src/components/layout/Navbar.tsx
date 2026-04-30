import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import logo from "../../assets/astronaute.png";
import { useAuth } from "../../Hooks/useAuth";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const avatarLetter = user?.name?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <nav className="sticky top-0 z-50 bg-[#0B1120]/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-2 border-b border-slate-800">

      <div className="w-full px-6 lg:px-10 flex items-center justify-between h-20">

        {/* LEFT — LOGO */}
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} className="w-11 h-11 rounded-full" />
          <span className="text-lg font-bold text-white">
            Blog de l<span className="text-violet-400">'Univers</span>
          </span>
        </Link>

        {/* CENTER — NAV LINKS */}
      <div className="hidden md:flex items-center gap-10">

        <NavLink
          to="/"
          className="text-slate-300 hover:text-white transition font-semibold"
        >
          Accueil
        </NavLink>

        <NavLink
          to="/articles"
          className="text-slate-300 hover:text-white transition font-semibold"
        >
          Articles
        </NavLink>

        <NavLink
          to="/contact"
          className="text-slate-300 hover:text-white transition font-semibold"
        >
          Contact
        </NavLink>

        {user?.role === "administrateur" && (
          <NavLink
            to="/dashboard"
            className="text-violet-300 hover:text-violet-200 transition font-semibold"
          >
            Dashboard
          </NavLink>
        )}

      </div>


        {/* RIGHT — USER */}
        <div className="hidden md:flex items-center gap-4">

          {isAuthenticated ? (
            <div className="flex items-center gap-3">

              {/* Avatar */}
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white font-semibold">
                {avatarLetter}
              </div>

              {/* Name + role */}
              <div className="flex flex-col leading-tight">
                <span className="text-sm text-slate-200">{user?.name}</span>
                <span className="text-xs text-violet-400">
                  {user?.role}
                </span>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 transition"
              >
                <LogOut className="w-4 h-4" />
              </button>

            </div>
          ) : (
            <Link
              to="/auth"
              className="px-5 py-2 rounded-full border border-violet-400 text-violet-300 hover:bg-violet-600 hover:text-white transition"
            >
              Connexion
            </Link>
          )}

        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>

      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-800 px-6 py-5 space-y-4 animate-fade-in">

          {isAuthenticated && (
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">

              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-semibold">
                {avatarLetter}
              </div>

              <div>
                <p className="text-slate-200 font-medium">{user?.name}</p>
                <p className="text-xs text-violet-400">{user?.role}</p>
              </div>

            </div>
          )}

          <NavLink to="/" onClick={() => setIsMenuOpen(false)} className="block text-slate-300 hover:text-white">
            Accueil
          </NavLink>

          <NavLink to="/articles" onClick={() => setIsMenuOpen(false)} className="block text-slate-300 hover:text-white">
            Articles
          </NavLink>

          <NavLink to="/contact" onClick={() => setIsMenuOpen(false)} className="block text-slate-300 hover:text-white">
            Contact
          </NavLink>

          {user?.role === "administrateur" && (
            <NavLink to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block text-violet-300">
              Dashboard
            </NavLink>
          )}

          {isAuthenticated ? (
            <button onClick={handleLogout} className="flex items-center gap-2 text-red-400">
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          ) : (
            <Link to="/auth" onClick={() => setIsMenuOpen(false)} className="block text-violet-300">
              Connexion
            </Link>
          )}

        </div>
      )}

    </nav>
  );
}
