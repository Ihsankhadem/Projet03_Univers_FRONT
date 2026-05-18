// // src/pages/DashboardAdmin/AdminUsers/ChangePasswordPage.tsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Lock } from "lucide-react";

// import { api } from "../../services/api";

// export default function ChangePasswordPage() {
//   const navigate = useNavigate();

//   const user = JSON.parse(
//     localStorage.getItem("user") || "{}"
//   );

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] =
//     useState("");

//   const [loading, setLoading] = useState(false);

//   const [error, setError] = useState("");

//   const handleSubmit = async (
//     e: React.FormEvent
//   ) => {
//     e.preventDefault();

//     setError("");

//     if (
//       password.length < 8 ||
//       password.length > 64
//     ) {
//       return setError(
//         "Le mot de passe doit contenir entre 8 et 64 caractères."
//       );
//     }

//     if (password !== confirmPassword) {
//       return setError(
//         "Les mots de passe ne correspondent pas."
//       );
//     }

//     try {
//       setLoading(true);

//       await api.put(
//         "/api/auth/change-password",
//         {
//           userId: user.id,
//           password,
//         }
//       );

//       localStorage.setItem(
//         "mustChangePassword",
//         "false"
//       );

//       navigate("/dashboard");
//     } catch (err) {
//       console.error(err);

//       setError(
//         "Impossible de modifier le mot de passe."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-[#F8F7FF] px-4">

//       <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">

//         <div className="mb-8 text-center">

//           <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">

//             <Lock className="h-8 w-8" />

//           </div>

//           <h1 className="text-2xl font-bold text-slate-800">
//             Nouveau mot de passe
//           </h1>

//           <p className="mt-2 text-sm text-slate-500">
//             Vous devez modifier votre mot de passe temporaire avant de continuer.
//           </p>

//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-5"
//         >

//           <div>
//             <label className="mb-2 block text-sm font-medium text-slate-700">
//               Nouveau mot de passe
//             </label>

//             <input
//               type="password"
//               value={password}
//               onChange={(e) =>
//                 setPassword(e.target.value)
//               }
//               placeholder="********"
//               className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-300 focus:bg-white"
//             />
//           </div>

//           <div>
//             <label className="mb-2 block text-sm font-medium text-slate-700">
//               Confirmer le mot de passe
//             </label>

//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) =>
//                 setConfirmPassword(
//                   e.target.value
//                 )
//               }
//               placeholder="********"
//               className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-violet-300 focus:bg-white"
//             />
//           </div>

//           {error && (
//             <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-500">
//               {error}
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-2xl bg-violet-600 py-3 font-medium text-white transition hover:bg-violet-500 disabled:opacity-50"
//           >
//             {loading
//               ? "Modification..."
//               : "Modifier le mot de passe"}
//           </button>

//         </form>

//       </div>

//     </div>
//   );
// }
