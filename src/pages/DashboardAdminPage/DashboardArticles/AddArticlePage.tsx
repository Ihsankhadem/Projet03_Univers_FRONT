import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../Hooks/useAuth";
import { dashboardApi } from "../../../services/dashboardApi";
import PopConfirm from "../../../components/ui/PopConfirming";

import AddArticleHeader from "../../../components/DashboardAdmin/AdminArticles/AddArticle/AddArticleHeader";
import AddArticleForm from "../../../components/DashboardAdmin/AdminArticles/AddArticle/AddArticleForm";
import AddArticleSidebar from "../../../components/DashboardAdmin/AdminArticles/AddArticle/AddArticleSidebar";
import AddArticleActions from "../../../components/DashboardAdmin/AdminArticles/AddArticle/AddArticleActions";

import { Category } from "../../../types";

export default function AddArticle() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const [categoryId, setCategoryId] = useState<number | null>(null);

  const [status, setStatus] = useState<
    "publié" | "brouillon" | "suspendu"
  >("brouillon");

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await dashboardApi.getCategories();
        setCategories(data);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmOpen(true);
  };

  const confirmCreate = async () => {
    if (!user || !categoryId) return;

    const result = await dashboardApi.createArticle({
      title,
      content,
      image,
      category_id: categoryId,
      status,
      author_id: user.id,
    });

    if (result.success) {
      navigate("/dashboard");
    }

    setConfirmOpen(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 bg-white">
        Chargement...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7FF] px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <AddArticleHeader />

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-6">
            <div className="xl:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
              <AddArticleForm
                title={title}
                content={content}
                setTitle={setTitle}
                setContent={setContent}
              />
            </div>

            <div className="space-y-6">
              <AddArticleSidebar
                categories={categories}
                categoryId={categoryId}
                author={user?.name || ""}
                status={status}
                image={image}
                setImage={setImage}
                setCategoryId={setCategoryId}
                setStatus={setStatus}
              />

              <AddArticleActions
                onCancel={() => navigate("/dashboard")}
              />
            </div>
          </div>
        </form>
      </div>

      <PopConfirm
        open={confirmOpen}
        title="Créer l’article"
        message="Voulez-vous publier cet article ?"
        confirmLabel="Créer"
        cancelLabel="Annuler"
        onConfirm={confirmCreate}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
}