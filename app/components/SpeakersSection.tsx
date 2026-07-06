"use client";

import { useState, useCallback } from "react";
import ScrollReveal from "./ScrollReveal";
import SpeakerCard from "./SpeakerCard";
import SpeakerModal from "./SpeakerModal";
import { speakers } from "./SpeakerData";

export default function SpeakersSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openSpeaker = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const closeModal = useCallback(() => {
    setActiveIndex(null);
  }, []);

  return (
    <section className="section" id="ponentes">
      <div className="wrap">
        <ScrollReveal>
          <div className="section-head">
            <span className="eyebrow">
              <span className="dots">
                <i style={{ background: "var(--blue)" }}></i>
                <i style={{ background: "var(--crimson)" }}></i>
              </span>{" "}
              Conferencistas
            </span>
            <h2 className="section-title">Las voces del Congreso</h2>
            <p className="section-intro">
              Especialistas que están marcando la conversación jurídica, dentro y fuera del país.
            </p>
          </div>
        </ScrollReveal>

        <div className="speakers-grid-v2">
          {speakers.map((speaker, i) => (
            <ScrollReveal
              key={speaker.initials}
              stagger={["0s", ".08s", ".16s", ".24s"][i]}
            >
              <SpeakerCard
                speaker={speaker}
                onOpen={() => openSpeaker(i)}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <SpeakerModal
          speaker={speakers[activeIndex]}
          onClose={closeModal}
        />
      )}
    </section>
  );
}
