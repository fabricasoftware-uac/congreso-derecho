import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import SpeakersSection from "./components/SpeakersSection";
import ThematicLinesSection from "./components/ThematicLinesSection";
import AgendaSection from "./components/AgendaSection";
import PricingSection from "./components/PricingSection";
import CFPSection from "./components/CFPSection";
import FinalCTASection from "./components/FinalCTASection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">
        <span id="top"></span>
        <HeroSection />
        <StatsSection />
        <SpeakersSection />
        <ThematicLinesSection />
        <AgendaSection />
        <PricingSection />
        <CFPSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
