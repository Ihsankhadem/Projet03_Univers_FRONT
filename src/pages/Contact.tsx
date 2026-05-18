import ContactForm from "../components/Contact/ContactForm";

export default function Contact() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B0F1A] px-4 py-12 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-indigo-300/30 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-violet-400/20 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/2 left-0 h-[320px] w-[320px] -translate-y-1/2 rounded-full bg-blue-300/20 blur-[120px]" />
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#4338ca10_1px,transparent_1px),linear-gradient(to_bottom,#4338ca10_1px,transparent_1px)] bg-[size:80px_80px]" />
      <div className="relative mx-auto max-w-3xl">
        <ContactForm />
      </div>
    </main>
  );
}
