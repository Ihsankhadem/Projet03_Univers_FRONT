// src/pages/DashboardAdminPage/DashboardArticles/ArticleEditorPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { useAuth } from "../../../Hooks/useAuth";
import { dashboardApi } from "../../../services/dashboardApi";
import PopConfirm from "../../../components/ui/PopConfirming";

import ArticleHeader from "../../../components/DashboardAdmin/AdminArticles/form/ArticleHeader";
import ArticleForm from "../../../components/DashboardAdmin/AdminArticles/form/ArticleForm";
import ArticleSidebar from "../../../components/DashboardAdmin/AdminArticles/form/ArticleSidebar";
import ArticleActions from "../../../components/DashboardAdmin/AdminArticles/form/ArticleActions";

import { articleSchema } from "../../../schemas/article.schema";
import { getZodErrors } from "../../../utils/getZodErrors";

import { Category } from "../../../types";

export default function ArticleEditorPage() {
  const { id } = useParams();
  const isEditMode = !!id;

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // FORM STATE
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [status, setStatus] = useState<"publié" | "brouillon" | "suspendu">(
    "brouillon",
  );

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
    categoryId?: string;
    image?: string;
  }>({});

  // LOAD DATA (edit mode)
  useEffect(() => {
    const load = async () => {
      try {
        const cats = await dashboardApi.getCategories();
        setCategories(cats);

        if (id) {
          const article = await dashboardApi.getArticleById(Number(id));

          setTitle(article.title);
          setContent(article.content ?? "");
          setImage(article.image ?? "");
          setCategoryId(article.category_id ?? null);
          setStatus(article.status);
        }
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  // VALIDATION
  const validateForm = () => {
    const result = articleSchema.safeParse({ title, content });

    const newErrors: typeof errors = {};

    if (!result.success) {
      Object.assign(
        newErrors,
        getZodErrors(result.error.flatten().fieldErrors),
      );
    }

    if (!categoryId) newErrors.categoryId = "Sélectionnez une catégorie";
    if (!image) newErrors.image = "Ajoutez une image";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setConfirmOpen(true);
  };

  // CREATE / UPDATE
  const handleConfirm = async () => {
    try {
      if (!user) return;

      if (isEditMode) {
        await dashboardApi.updateArticle(Number(id), {
          title,
          content,
          image,
          status,
          category_id: categoryId!,
        });

        await queryClient.invalidateQueries({ queryKey: ["articles-admin"] });
      } else {
        await dashboardApi.createArticle({
          title,
          content,
          image,
          category_id: categoryId!,
          status,
          author_id: user.id,
        });
      }

      navigate("/dashboard");
    } finally {
      setConfirmOpen(false);
    }
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
        <ArticleHeader isEditMode={isEditMode} />

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-6">
            <div className="xl:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
              <ArticleForm
                title={title}
                content={content}
                setTitle={setTitle}
                setContent={setContent}
                errors={errors}
              />
            </div>

            <div className="space-y-6">
              <ArticleSidebar
                categories={categories}
                categoryId={categoryId}
                author={user?.name || ""}
                status={status}
                image={image}
                setImage={setImage}
                setCategoryId={setCategoryId}
                setStatus={setStatus}
                errors={errors}
              />

              <ArticleActions onCancel={() => navigate("/dashboard")} />
            </div>
          </div>
        </form>

        <PopConfirm
          open={confirmOpen}
          title={isEditMode ? "Modifier l’article" : "Créer l’article"}
          message={
            isEditMode
              ? "Confirmer les modifications ?"
              : "Voulez-vous publier cet article ?"
          }
          confirmLabel={isEditMode ? "Modifier" : "Créer"}
          cancelLabel="Annuler"
          onConfirm={handleConfirm}
          onCancel={() => setConfirmOpen(false)}
        />
      </div>
    </div>
  );
}
