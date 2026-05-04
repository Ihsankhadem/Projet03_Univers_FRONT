import Hero from "../components/Home/Hero";
import EventsSection from "../components/Home/EventsSection";
import QuoteSection from "../components/Home/QuoteSection";
import PopularArticles from "../components/Home/PopularArticles";
import StatsSection from "../components/Home/StatsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <EventsSection />
      <QuoteSection />
      <PopularArticles />
    </>
  );
}
