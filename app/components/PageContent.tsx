import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";
import SpeakersSection from "./SpeakersSection";
import ThematicLinesSection from "./ThematicLinesSection";
import AgendaSection from "./AgendaSection";
import PricingSection from "./PricingSection";
import CFPSection from "./CFPSection";
import FinalCTASection from "./FinalCTASection";

export default function PageContent() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <SpeakersSection />
      <ThematicLinesSection />
      <AgendaSection />
      <PricingSection />
      <CFPSection />
      <FinalCTASection />
    </>
  );
}
