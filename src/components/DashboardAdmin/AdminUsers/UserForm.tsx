import DashboardFormField from "../DashboardFormField";

type Props = {
  name: string;
  setName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  role: "rédacteur" | "administrateur";
  setRole: (v: "rédacteur" | "administrateur") => void;
};

export default function UserForm({
  name,
  setName,
  email,
  setEmail,
  role,
  setRole,
}: Props) {
  return (
    <div className="space-y-6">
      <DashboardFormField
        label="Nom"
        value={name}
        onChange={setName}
        placeholder="Ex : Nashi"
      />

      <DashboardFormField
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="email@gmail.com"
      />

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Rôle
        </label>
        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value as "rédacteur" | "administrateur")
          }
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-300 focus:bg-white"
        >
          <option value="rédacteur">Rédacteur</option>
          <option value="administrateur">Administrateur</option>
        </select>
      </div>
    </div>
  );
}
