import DashboardFormField from "../DashboardFormField";

type Props = {
  name: string;
  setName: (value: string) => void;
  error?: string;
};

export default function CategoryForm({ name, setName, error }: Props) {
  return (
    <div className="space-y-6">
      <DashboardFormField
        label="Nom de la catégorie"
        value={name}
        onChange={setName}
        placeholder="Ex : Astronomie"
        error={error}
      />
    </div>
  );
}
