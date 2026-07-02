// components/DashboardAdmin/AdminArticles/AddArticle/ArticleSidebar.tsx

import { useAuth } from "../../../../Hooks/useAuth";
import type { Category } from "../../../../types";
import { uploadImage } from "../../../../services/upload.service";

type Status = "publié" | "brouillon" | "suspendu";
interface Props {
  categories: Category[];

  categoryId: number | null;
  setCategoryId: (id: number | null) => void;

  author: string;

  status: Status;
  setStatus: (status: Status) => void;

  image: string;
  setImage: (image: string) => void;

  errors: {
    categoryId?: string;
    image?: string;
  };
}

export default function AddArticleSidebar({
  categories,
  categoryId,
  setCategoryId,
  status,
  image,
  setImage,
  setStatus,
  author,
  errors,
}: Props) {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Status;
    setStatus(value);
  };

  const { token } = useAuth();
  const handleUpload = async (file: File) => {
    if (!token) {
      console.error("No token available");
      return;
    }

    try {
      const url = await uploadImage(file, token);

      setImage(url);
    } catch (err) {
      console.error("Upload error", err);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-5">
      <h3 className="text-lg font-bold text-slate-800">Informations</h3>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (!file) return;

            handleUpload(file);
          }}
          className={`w-full bg-slate-50 border rounded-2xl px-4 py-3 text-sm ${
            errors.image ? "border-red-400" : "border-slate-200"
          }`}
        />

        {errors.image && (
          <p className="mt-2 text-sm text-red-500">{errors.image}</p>
        )}

        {image && (
          <img src={image} className="mt-3 w-full rounded-2xl object-cover" />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Auteur
        </label>

        <input
          value={author}
          readOnly
          className="w-full bg-slate-100 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-600"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Catégorie
        </label>

        <select
          value={categoryId ?? ""}
          onChange={(e) => {
            const value = e.target.value;

            setCategoryId(value ? Number(value) : null);
          }}
          className={`w-full bg-slate-50 border rounded-2xl px-4 py-3 text-sm ${
            errors.categoryId ? "border-red-400" : "border-slate-200"
          }`}
        >
          <option value="">Sélectionner</option>

          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {errors.categoryId && (
          <p className="mt-2 text-sm text-red-500">{errors.categoryId}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Statut
        </label>

        <select
          value={status}
          onChange={handleStatusChange}
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm"
        >
          <option value="publié">Publié</option>
          <option value="brouillon">Brouillon</option>
          <option value="suspendu">Suspendu</option>
        </select>
      </div>
    </div>
  );
}
