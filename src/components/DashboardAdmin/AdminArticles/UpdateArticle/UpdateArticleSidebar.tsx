import { Category } from "../../../../types";

type Props = {
  authorName: string;

  categoryId: number | null;
  categories: Category[];

  status: "publié" | "brouillon" | "suspendu";

  image: string;
  setImage: (value: string) => void;

  setCategoryId: (value: number) => void;
  setStatus: (value: "publié" | "brouillon" | "suspendu") => void;
};

export default function UpdateArticleSidebar({
  authorName,
  categoryId,
  categories,
  status,
  image,
  setImage,
  setCategoryId,
  setStatus,
}: Props) {
  const uploadImage = async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "univers");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dqm1kobls/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      setImage(data.secure_url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-5">
      <h3 className="text-lg font-bold text-slate-800">Informations</h3>

      {/* IMAGE */}
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

            uploadImage(file);
          }}
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm"
        />

        {image && (
          <img src={image} className="mt-3 w-full rounded-2xl object-cover" />
        )}
      </div>

      {/* AUTHOR */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Auteur
        </label>

        <input
          value={authorName}
          readOnly
          className="w-full bg-slate-100 border border-slate-200 rounded-2xl px-4 py-3 text-sm"
        />
      </div>

      {/* CATEGORY */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Catégorie
        </label>

        <select
          value={categoryId ?? ""}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm"
        >
          <option value="">Sélectionner</option>

          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* STATUS */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Statut
        </label>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as "publié" | "brouillon" | "suspendu")
          }
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
