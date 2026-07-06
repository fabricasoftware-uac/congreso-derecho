"use client";

import dynamic from "next/dynamic";
import StatsSection from "./StatsSection";

const HeroSection = dynamic(() => import("./HeroSection"), { ssr: false });
const SpeakersSection = dynamic(() => import("./SpeakersSection"), { ssr: false });
const ThematicLinesSection = dynamic(() => import("./ThematicLinesSection"), { ssr: false });
const AgendaSection = dynamic(() => import("./AgendaSection"), { ssr: false });
const PricingSection = dynamic(() => import("./PricingSection"), { ssr: false });
const CFPSection = dynamic(() => import("./CFPSection"), { ssr: false });
const FinalCTASection = dynamic(() => import("./FinalCTASection"), { ssr: false });

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
