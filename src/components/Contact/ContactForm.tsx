// src/components/Contact/ContactForm.tsx - formulaire de contact avec gestion d'état local et message de confirmation
import { useState } from "react";
import { Send } from "lucide-react";
// FormState définit la structure de l'état du formulaire , on type les champs
type FormState = { nom: string; email: string; sujet: string; message: string };

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    nom: "",
    email: "",
    sujet: "",
    message: "",
  });
  // sent = true si le message a été envoyé, sinon false
  const [sent, setSent] = useState(false);
  // f = form, e.target.name = nom, email, sujet, message, e.target.value = la valeur de l'input
  // onChange appelle handleChange à chaque changement dans les inputs, qui met à jour l'état du formulaire
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputClass =
    "w-full bg-[#0B0F1A] border border-slate-600 text-slate-200 placeholder-slate-600 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-violet-500 transition-colors";

  return (
    <div className="bg-[#1E293B] border border-slate-700 rounded-xl p-6">
      <h2 className="text-xl font-bold text-slate-100 mb-6">
        Envoyez-nous un message
      </h2>

      {sent ? (
        <div className="text-center py-12">
          <div className="bg-violet-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-7 h-7 text-violet-400" />
          </div>
          <p className="text-slate-100 font-semibold text-lg mb-1">
            Message envoyé !
          </p>
          <p className="text-slate-400 text-sm">
            Nous vous répondrons dans les plus brefs délais.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">
                Nom complet *
              </label>
              <input
                name="nom"
                value={form.nom}
                onChange={handleChange}
                placeholder="nom"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1.5">
                Email *
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="emailt@gmail.com"
                required
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1.5">
              Sujet *
            </label>
            <input
              name="sujet"
              value={form.sujet}
              onChange={handleChange}
              placeholder="Comment puis-je vous aider ?"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-1.5">
              Message *
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Écrivez votre message ici..."
              required
              rows={6}
              className={`${inputClass} resize-none`}
            />
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
            Envoyer le message
          </button>
        </form>
      )}
    </div>
  );
}
