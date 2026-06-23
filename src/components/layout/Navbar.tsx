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
        <div className="hidden md:flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `pb-1 border-b-2 transition-all duration-200 font-medium ${
                isActive
                  ? "text-white border-white"
                  : "text-slate-400 border-transparent hover:text-slate-100"
              }`
            }
          >
            Accueil
          </NavLink>

          <NavLink
            to="/articles"
            className={({ isActive }) =>
              `pb-1 border-b-2 transition-all duration-200 font-medium ${
                isActive
                  ? "text-white border-white"
                  : "text-slate-400 border-transparent hover:text-slate-100"
              }`
            }
          >
            Articles
          </NavLink>

          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              `pb-1 border-b-2 transition-all duration-200 font-medium ${
                isActive
                  ? "text-white border-white"
                  : "text-slate-400 border-transparent hover:text-slate-100"
              }`
            }
          >
            Galerie
          </NavLink>

          {!isAuthenticated && (
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `pb-1 border-b-2 transition-all duration-200 font-medium ${
                  isActive
                    ? "text-white border-white"
                    : "text-slate-400 border-transparent hover:text-slate-100"
                }`
              }
            >
              Contact
            </NavLink>
          )}

          {/* DASHBOARD ADMIN */}
          {user?.role === "administrateur" && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-5 py-2 rounded-xl border transition-all duration-200 font-semibold ${
                  isActive
                    ? "bg-white text-slate-900 border-white"
                    : "bg-slate-800/70 text-slate-100 border-slate-700 hover:bg-slate-700"
                }`
              }
            >
              Dashboard Admin
            </NavLink>
          )}

          {/* DASHBOARD REDACTEUR */}
          {user?.role === "rédacteur" && (
            <NavLink
              to="/dashboard/redacteur"
              className={({ isActive }) =>
                `px-5 py-2 rounded-xl border transition-all duration-200 font-semibold ${
                  isActive
                    ? "bg-white text-slate-900 border-white"
                    : "bg-slate-800/70 text-slate-100 border-slate-700 hover:bg-slate-700"
                }`
              }
            >
              Dashboard Rédacteur
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
                <span className="text-xs text-violet-400">{user?.role}</span>
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
              className="px-5 py-2 rounded-full font-semibold
             bg-gradient-to-r from-violet-600 to-indigo-600
             text-white shadow-md
             hover:shadow-lg hover:from-violet-500 hover:to-indigo-500
             transition-all duration-200"
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
        <div className="md:hidden border-t border-slate-800 px-6 py-5 space-y-5 bg-[#0B1120]">
          {isAuthenticated && (
            <div className="flex items-center gap-3 pb-5 border-b border-slate-800">
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-semibold">
                {avatarLetter}
              </div>

              <div>
                <p className="text-slate-100 font-medium">{user?.name}</p>
                <p className="text-xs text-slate-400">{user?.role}</p>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <NavLink
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl transition font-medium ${
                  isActive
                    ? "bg-white text-slate-900"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              Accueil
            </NavLink>

            <NavLink
              to="/articles"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl transition font-medium ${
                  isActive
                    ? "bg-white text-slate-900"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              Articles
            </NavLink>

            <NavLink
              to="/gallery"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3 rounded-xl transition font-medium ${
                  isActive
                    ? "bg-white text-slate-900"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              Galerie
            </NavLink>

            {!isAuthenticated && (
              <NavLink
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl transition font-medium ${
                    isActive
                      ? "bg-white text-slate-900"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                Contact
              </NavLink>
            )}

            {user?.role === "administrateur" && (
              <NavLink
                to="/dashboard"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl border transition font-semibold ${
                    isActive
                      ? "bg-white text-slate-900 border-white"
                      : "bg-slate-800 text-slate-100 border-slate-700"
                  }`
                }
              >
                Dashboard
              </NavLink>
            )}
          </div>

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-400 pt-4"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          ) : (
            <Link
              to="/auth"
              onClick={() => setIsMenuOpen(false)}
              className="block pt-4 text-slate-300"
            >
              Connexion
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
