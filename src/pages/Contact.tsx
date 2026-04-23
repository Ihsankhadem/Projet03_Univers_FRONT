import ContactHero from "../components/Contact/ContactHero";
import ContactForm from "../components/Contact/ContactForm";
import ContactInfoCard from "../components/Contact/ContactInfoCard";
// import HorairesCard from "../components/Contact/HoraireCard";


export default function Contact() {
  return (
    <div className="min-h-screen bg-[#0B0F1A]">
      <ContactHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Colonne gauche */}
          <div className="flex flex-col gap-4">
            <ContactInfoCard />
            {/* <HorairesCard /> */}
          </div>

          {/* Colonne droite */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <ContactForm />

          </div>

        </div>
      </div>
    </div>
  );
}