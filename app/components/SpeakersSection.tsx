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
              stagger={["0s", ".08s", ".16s", ".24s", ".32s"][i]}
            >
              <SpeakerCard
                speaker={speaker}
                onOpen={() => openSpeaker(i)}
              />
            </ScrollReveal>
          ))}

          <ScrollReveal stagger=".4s">
            <article className="speaker-card-new speaker-ghost-card">
              <div className="speaker-ghost-visual">
                <span className="ghost-dot ghost-dot--1" style={{ "--dc": "var(--gold)" } as React.CSSProperties} />
                <span className="ghost-dot ghost-dot--2" style={{ "--dc": "var(--orange)" } as React.CSSProperties} />
                <span className="ghost-dot ghost-dot--3" style={{ "--dc": "var(--teal)" } as React.CSSProperties} />
                <span className="ghost-dot ghost-dot--4" style={{ "--dc": "var(--crimson)" } as React.CSSProperties} />
                <span className="ghost-dot ghost-dot--5" style={{ "--dc": "var(--plum)" } as React.CSSProperties} />
                <span className="ghost-dot ghost-dot--6" style={{ "--dc": "var(--blue)" } as React.CSSProperties} />
                <div className="speaker-ghost-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <line x1="19" y1="8" x2="19" y2="14" />
                    <line x1="22" y1="11" x2="16" y2="11" />
                  </svg>
                </div>
              </div>
              <div className="speaker-ghost-text">
                <strong className="speaker-ghost-title">Más ponentes</strong>
                <p className="speaker-ghost-sub">Se sumarán próximamente. La agenda sigue creciendo.</p>
              </div>
            </article>
          </ScrollReveal>
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
