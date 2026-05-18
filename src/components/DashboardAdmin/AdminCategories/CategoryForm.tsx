// src/components/DashboardAdmin/AdminCategories/CategoryForm.tsx

import DashboardFormField from "../DashboardFormField";

type Props = {
  name: string;
  description?: string;

  setName: (value: string) => void;
  setDescription?: (value: string) => void;
};

export default function CategoryForm({
  name,
  description,
  setName,
  setDescription,
}: Props) {
  return (
    <div className="space-y-6">
      <DashboardFormField
        label="Nom de la catégorie"
        value={name}
        onChange={setName}
        placeholder="Ex : Astronomie"
      />

      {setDescription && (
        <DashboardFormField
          label="Description"
          value={description ?? ""}
          onChange={setDescription}
          placeholder="Décris rapidement cette catégorie..."
          textarea
        />
      )}
    </div>
  );
}
