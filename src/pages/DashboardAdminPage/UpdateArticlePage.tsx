import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { dashboardApi } from "../../services/dashboardApi";
import PopConfirm from "../../components/ui/PopConfirming";

import UpdateArticleHeader from "../../components/DashboardAdmin/AdminArticles/UpdateArticle/UpdateArticleHeader";
import UpdateArticleForm from "../../components/DashboardAdmin/AdminArticles/UpdateArticle/UpdateArticleForm";
import UpdateArticleSidebar from "../../components/DashboardAdmin/AdminArticles/UpdateArticle/UpdateArticleSidebar";
import UpdateArticleImage from "../../components/DashboardAdmin/AdminArticles/UpdateArticle/UpdateArticleImage";
import UpdateArticleActions from "../../components/DashboardAdmin/AdminArticles/UpdateArticle/UpdateArticleActions";
import { Category } from "../../types";

export default function UpdateArticle() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [authorName, setAuthorName] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [status, setStatus] = useState<"publié" | "brouillon" | "suspendu">(
    "brouillon",
  );

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const article = await dashboardApi.getArticleById(Number(id));
        const categoriesList = await dashboardApi.getCategories();

        setCategories(categoriesList);

        setTitle(article.title);
        setContent(article.content ?? "");
        setImage(article.image ?? null);
        setAuthorName(article.author);
        setCategoryId(article.category_id ?? null);
        setStatus(article.status);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmOpen(true);
  };

  const confirmUpdate = async () => {
    const result = await dashboardApi.updateArticle(Number(id), {
      title,
      content,
      status,
      category_id: categoryId!,
    });

    if (result.success) {
      navigate("/dashboard");
    }

    setConfirmOpen(false);
  };

  if (loading) {
    return <div className="text-center py-20">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8F7FF] px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <UpdateArticleHeader />

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <UpdateArticleForm
              title={title}
              content={content}
              setTitle={setTitle}
              setContent={setContent}
            />

            <div className="space-y-6">
              <UpdateArticleSidebar
                authorName={authorName}
                categoryId={categoryId}
                categories={categories}
                status={status}
                setCategoryId={setCategoryId}
                setStatus={setStatus}
              />

              {image && <UpdateArticleImage image={image} />}

              <UpdateArticleActions navigate={navigate} />
            </div>
          </div>
        </form>

        <PopConfirm
          open={confirmOpen}
          title="Mettre à jour l’article"
          message="Voulez-vous vraiment enregistrer ces modifications ?"
          confirmLabel="Confirmer"
          cancelLabel="Annuler"
          onConfirm={confirmUpdate}
          onCancel={() => setConfirmOpen(false)}
        />
      </div>
    </div>
  );
}
