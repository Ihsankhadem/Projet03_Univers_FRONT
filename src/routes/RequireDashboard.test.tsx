import { describe, it, expect, vi } from "vitest";

// render = permet d'afficher le composant dans un environnement de test
// screen = permet de récupérer des éléments rendus (getByText, queryByText, etc.)
import { render, screen } from "@testing-library/react";

import RequireDashboard from "./RequireDashboard";

// On MOCK le hook useAuth = on simule UseAuth pour contrôler ce qu'il renvoie dans les tests.
vi.mock("../Hooks/useAuth", () => ({
  useAuth: vi.fn(), // on remplace useAuth par une fonction mockée
}));

// On importe le hook mocké pour pouvoir définir ce qu'il renvoie
import { useAuth } from "../Hooks/useAuth";

// MemoryRouter = version simplifiée de React Router pour les tests
// Nécessaire uniquement quand le composant utilise <Navigate> ou <Link>
import { MemoryRouter } from "react-router-dom";

describe("RequireDashboard", () => {
  // Cas 1 : l'utilisateur est administrateur → accès autorisé
  it("affiche les enfants si l'utilisateur est administrateur", () => {
    // On simule un user admin
    vi.mocked(useAuth).mockReturnValue({
      user: {
        role: "administrateur",
      },
    } as any);

    // On rend le composant
    render(
      <RequireDashboard>
        <div>Dashboard</div>
      </RequireDashboard>,
    );

    // Le texte "Dashboard" doit être présent → accès OK
    expect(screen.getByText("Dashboard")).toBeTruthy();
  });

  // Cas 2 : l'utilisateur est rédacteur → accès autorisé
  it("affiche les enfants si l'utilisateur est rédacteur", () => {
    // On simule un user rédacteur
    vi.mocked(useAuth).mockReturnValue({
      user: {
        role: "rédacteur",
      },
    } as any);

    render(
      <RequireDashboard>
        <div>Dashboard</div>
      </RequireDashboard>,
    );

    // Le texte doit être affiché → rédacteur autorisé
    expect(screen.getByText("Dashboard")).toBeTruthy();
  });

  // Cas 3 : aucun utilisateur → accès refusé
  it("refuse l'accès si aucun utilisateur", () => {
    // On simule un user null → pas connecté
    vi.mocked(useAuth).mockReturnValue({
      user: null,
    } as any);

    // Ici on doit envelopper dans MemoryRouter
    // car RequireDashboard utilise probablement <Navigate />
    render(
      <MemoryRouter>
        <RequireDashboard>
          <div>Dashboard</div>
        </RequireDashboard>
      </MemoryRouter>,
    );

    // Le texte ne doit PAS apparaître → accès refusé
    expect(screen.queryByText("Dashboard")).toBeNull();
  });
});
