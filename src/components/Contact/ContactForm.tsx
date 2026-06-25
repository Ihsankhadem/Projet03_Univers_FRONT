// ContactForm.tsx
import { useState } from "react";
import { Send } from "lucide-react";
import astronautImg from "../../assets/astronaut.jpg";

type FormState = {
  nom: string;
  email: string;
  sujet: string;
  message: string;
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    nom: "",
    email: "",
    sujet: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputClass =
    "w-full rounded-xl border border-slate-700 bg-white/5 px-4 py-4 text-sm text-white placeholder:text-slate-500 backdrop-blur-md transition-colors focus:outline-none focus:border-indigo-400";

  return (
    <section className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[36px] border border-white/10 bg-[#0F172A] shadow-2xl">
      {/* glow background */}
      <div className="pointer-events-none absolute -top-32 left-10 h-[420px] w-[420px] rounded-full bg-indigo-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-violet-500/20 blur-[120px]" />

      {/* layout */}
      <div className="relative grid grid-cols-1 md:grid-cols-[0.95fr_1.05fr] min-h-[680px]">
        {/* LEFT IMAGE */}
        <div className="relative hidden overflow-hidden border-r border-white/10 md:block">
          {/* overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0F172A]/10 via-[#0F172A]/30 to-[#0F172A]/75" />

          <img
            src={astronautImg}
            alt="Astronaute"
            className="h-full w-full object-cover"
          />

          {/* top text */}
          <div className="absolute top-10 left-10 z-20 max-w-sm">
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-indigo-300">
              Univers
            </p>

            <h2 className="text-4xl font-bold leading-tight text-white">
              Restons en contact.
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-300">
              Une question, une idée ou un projet à partager ? Écrivez-nous.
            </p>
          </div>
        </div>

        <div className="relative flex items-center bg-[#111827]/90 p-8 sm:p-12">
          <div className="absolute left-0 top-0 h-full w-px bg-white/10" />

          <div className="w-full">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-indigo-500/10">
                  <Send className="h-5 w-5 text-indigo-400" />
                </div>

                <h3 className="text-2xl font-semibold text-white">
                  Message envoyé
                </h3>

                <p className="mt-2 text-sm text-slate-400">
                  Nous vous répondrons rapidement.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-10 border-b border-white/10 pb-6">
                  <h2 className="text-4xl font-bold text-white">Contact</h2>

                  <p className="mt-2 text-sm text-slate-400">
                    Nous serions ravis d’échanger avec vous.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <input
                    type="text"
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    placeholder="Nom"
                    required
                    className={inputClass}
                  />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className={inputClass}
                  />

                  <input
                    type="text"
                    name="sujet"
                    value={form.sujet}
                    onChange={handleChange}
                    placeholder="Sujet"
                    required
                    className={inputClass}
                  />

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows={5}
                    required
                    className={`${inputClass} resize-none`}
                  />

                  <button
                    type="submit"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 py-3 font-semibold text-white transition hover:opacity-90"
                  >
                    <Send className="h-4 w-4" />
                    Envoyer
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
