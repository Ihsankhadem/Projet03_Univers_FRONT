import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import ArticlesPage from "./pages/ArticlesPage";
import DetailsArticle from "./pages/DetailsArticle";
import DetailsSpaceArticle from "./pages/DetailsSpaceArticle";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/DashboardAdminPage/DashboardAdmin";
import UpdateArticle from "./pages/DashboardAdminPage/UpdateArticlePage";
import CategoryPage from "./pages/DashboardAdminPage/CategoryPage";

import AdminRoutes from "./routes/Admin.routes";
import "./index.css";
import AddArticle from "./pages/DashboardAdminPage/AddArticlePage";

const AUTH_ROUTES = ["/auth"];

function Layout() {
  const { pathname } = useLocation();
  const isAuthPage = AUTH_ROUTES.includes(pathname);

  return (
    <>
      {!isAuthPage && <Navbar />}

      <main className="min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:id" element={<DetailsArticle />} />
          <Route path="/nasa/:id" element={<DetailsSpaceArticle />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<Auth />} />

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <AdminRoutes>
                <Dashboard />
              </AdminRoutes>
            }
          />

          <Route
            path="/dashboard/articles/add"
            element={
              <AdminRoutes>
                <AddArticle />
              </AdminRoutes>
            }
          />

          <Route
            path="/dashboard/articles/:id/edit"
            element={
              <AdminRoutes>
                <UpdateArticle />
              </AdminRoutes>
            }
          />

          {/* CATEGORIES */}
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
