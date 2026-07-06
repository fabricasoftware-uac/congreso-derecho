"use client";

import { useCallback, useEffect, useRef } from "react";
import type { Speaker } from "./SpeakerData";

const sectionIcons: Record<string, string> = {
  "Formación académica":
    '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/><path d="M8 15h6"/>',
  "Docencia y cargos":
    '<path d="M3 9.5 12 4l9 5.5"/><path d="M5 10v8"/><path d="M9.5 10v8"/><path d="M14.5 10v8"/><path d="M19 10v8"/><path d="M3.5 21h17"/>',
  "Membresías y reconocimientos":
    '<path d="M12 15 8.5 17l.7-3.9-2.9-2.8 3.9-.6L12 6l1.8 3.7 3.9.6-2.9 2.8.7 3.9Z"/><path d="M12 15V6"/>',
  Publicaciones:
    '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/>',
  "Líneas de investigación":
    '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
};

function CVSection({
  title,
  items,
}: {
  title: string;
  items: { text: string }[];
}) {
  if (!items.length) return null;
  const icon = sectionIcons[title];
  return (
    <div className="cv-section">
      <div className="cv-section-head">
        {icon && (
          <span className="cv-section-icon">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              dangerouslySetInnerHTML={{ __html: icon }}
            />
          </span>
        )}
        <h4 className="cv-section-title">{title}</h4>
      </div>
      <ul className="cv-list">
        {items.map((item, i) => (
          <li key={i}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default function SpeakerModal({
  speaker,
  speakerIndex,
  total,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  speaker: Speaker;
  speakerIndex: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) {
        e.preventDefault();
        onPrev();
        bodyRef.current?.scrollTo({ top: 0, behavior: "instant" });
      }
      if (e.key === "ArrowRight" && hasNext) {
        e.preventDefault();
        onNext();
        bodyRef.current?.scrollTo({ top: 0, behavior: "instant" });
      }
    },
    [onClose, onPrev, onNext, hasPrev, hasNext]
  );

  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    requestAnimationFrame(() => {
      modalRef.current?.classList.add("modal--visible");
    });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previousFocus.current?.focus();
    };
  }, [handleKeyDown]);

  const { cv } = speaker;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Perfil completo de ${speaker.name}`}
    >
      <div className="modal-card" ref={modalRef}>
        <div className="modal-topbar">
          <div className="modal-nav-group">
            <button
              className="modal-nav-btn"
              onClick={() => {
                onPrev();
                bodyRef.current?.scrollTo({ top: 0, behavior: "instant" });
              }}
              disabled={!hasPrev}
              aria-label="Conferencista anterior"
              type="button"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <span className="modal-counter">
              {speakerIndex + 1} de {total}
            </span>

            <button
              className="modal-nav-btn"
              onClick={() => {
                onNext();
                bodyRef.current?.scrollTo({ top: 0, behavior: "instant" });
              }}
              disabled={!hasNext}
              aria-label="Siguiente conferencista"
              type="button"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Cerrar perfil"
            type="button"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
            <span className="modal-close-label">Esc</span>
          </button>
        </div>

        <div className="modal-body" ref={bodyRef}>
          <div className="modal-header">
            <div className="modal-header-badges">
              {speaker.credential && (
                <span
                  className="modal-badge modal-badge--credential"
                  style={
                    { "--badge-bg": speaker.tagColor, "--badge-alpha": "0.12" } as React.CSSProperties
                  }
                >
                  {speaker.credential}
                </span>
              )}
              <span className="modal-badge modal-badge--country">{speaker.country}</span>
              <span className="modal-badge modal-badge--institution">
                {speaker.institution}
              </span>
            </div>

            <div className="modal-header-main">
              <div
                className="modal-hero-photo"
                style={
                  {
                    "--c1": speaker.gradientC1,
                    "--c2": speaker.gradientC2,
                  } as React.CSSProperties
                }
              >
                <span className="modal-hero-ini">{speaker.initials}</span>
              </div>
              <div>
                <h2 className="modal-hero-name">{speaker.name}</h2>
                <p
                  className="modal-hero-talk"
                  style={
                    { "--talk-color": speaker.tagColor } as React.CSSProperties
                  }
                >
                  {speaker.talkTitle}
                </p>
              </div>
            </div>
          </div>

          <div className="modal-cv">
            <CVSection title="Formación académica" items={cv.formacion} />
            <CVSection title="Docencia y cargos" items={cv.docencia} />
            <CVSection title="Membresías y reconocimientos" items={cv.membresias} />
            <CVSection title="Publicaciones" items={cv.publicaciones} />
            <CVSection title="Líneas de investigación" items={cv.investigacion || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
