import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import ArticlesPage from "./pages/Articles/ArticlesPage";
import DetailsArticle from "./pages/Articles/DetailsArticle";
import DetailsSpaceArticle from "./pages/Articles/DetailsSpaceArticle";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import GalleryPage from "./pages/GalleryPage";

import Dashboard from "./pages/DashboardAdminPage/DashboardArticles/DashboardAdmin";
import DashboardRedacteur from "./pages/DashboardRedacteur/DashboardRedacteur";
import CategoryPage from "./pages/DashboardAdminPage/CategoryPage";
import UsersPage from "./pages/DashboardAdminPage/UsersPage";
import AdminEvents from "./pages/DashboardAdminPage/EventsPage";
import ArticleEditorPage from "./pages/DashboardAdminPage/DashboardArticles/ArticleEditorPage";
import ChangePasswordPage from "./pages/DashboardRedacteur/ChangePasswordPage";

import AdminRoutes from "./routes/Admin.routes";
import RequireRedacteur from "./routes/RequireRedacteur";
import RequireDashboard from "./routes/RequireDashboard";

import "./index.css";
 
const AUTH_ROUTES = ["/auth"];

function Layout() {
  const { pathname } = useLocation();
  const isAuthPage = AUTH_ROUTES.includes(pathname);

  return (
    <>
      {!isAuthPage && <Navbar />}

      <main className="min-h-[80vh]">
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:id" element={<DetailsArticle />} />
          <Route path="/nasa/:id" element={<DetailsSpaceArticle />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/auth" element={<Auth />} />

          {/* DASHBOARD ADMIN */}
          <Route
            path="/dashboard"
            element={
              <AdminRoutes>
                <Dashboard />
              </AdminRoutes>
            }
          />

          {/* DASHBOARD REDACTEUR */}
          <Route
            path="/dashboard/redacteur"
            element={
              <RequireRedacteur>
                <DashboardRedacteur />
              </RequireRedacteur>
            }
          />

          {/* ARTICLES : ADMIN + REDACTEUR */}
          <Route
            path="/dashboard/articles/new"
            element={
              <RequireDashboard>
                <ArticleEditorPage />
              </RequireDashboard>
            }
          />

          <Route
            path="/dashboard/articles/:id/edit"
            element={
              <RequireDashboard>
                <ArticleEditorPage />
              </RequireDashboard>
            }
          />

          <Route
            path="/dashboard/change-password"
            element={
              <RequireDashboard>
                <ChangePasswordPage />
              </RequireDashboard>
            }
          />

          {/* ADMIN UNIQUEMENT */}
          <Route
            path="/categories"
            element={
              <AdminRoutes>
                <CategoryPage />
              </AdminRoutes>
            }
          />

          <Route
            path="/categories/:id"
            element={
              <AdminRoutes>
                <CategoryPage />
              </AdminRoutes>
            }
          />

          <Route
            path="/dashboard/users"
            element={
              <AdminRoutes>
                <UsersPage />
              </AdminRoutes>
            }
          />

          <Route
            path="/dashboard/events"
            element={
              <AdminRoutes>
                <AdminEvents />
              </AdminRoutes>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </>
  );
}

export default function App() {
  return <Layout />;
}
