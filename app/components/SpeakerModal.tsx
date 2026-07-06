"use client";

import { useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Dialog } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
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
  onClose,
}: {
  speaker: Speaker;
  onClose: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const { cv } = speaker;

  return (
    <AnimatePresence>
      <Dialog
        open={true}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-[rgba(11,39,64,.48)] backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        />
        <div className="modal-positioner">
          <motion.div
            key={speaker.name}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] as const }}
            className="modal-card pointer-events-auto"
            role="dialog"
            aria-modal="true"
            aria-label={`Perfil completo de ${speaker.name}`}
          >
            <div className="modal-topbar">
              <span />
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

            <ScrollArea ref={bodyRef} className="modal-body">
              <div className="modal-header">
                <div className="modal-header-badges">
                  {speaker.credential && (
                    <Badge
                      className="modal-badge-credential"
                      style={
                        {
                          color: speaker.tagColor,
                          background: `color-mix(in srgb, ${speaker.tagColor} 12%, transparent)`,
                        } as React.CSSProperties
                      }
                    >
                      {speaker.credential}
                    </Badge>
                  )}
                  <Badge className="modal-badge-country">
                    {speaker.country}
                  </Badge>
                  <Badge variant="outline" className="modal-badge-institution">
                    {speaker.institution}
                  </Badge>
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
                    {speaker.photo ? (
                      <Image
                        src={speaker.photo}
                        alt={speaker.name}
                        fill
                        className="modal-hero-img"
                      />
                    ) : (
                      <span className="modal-hero-ini">
                        {speaker.initials}
                      </span>
                    )}
                  </div>
                  <div>
                    <h2 className="modal-hero-name">{speaker.name}</h2>
                    <p
                      className="modal-hero-talk"
                      style={
                        {
                          "--talk-color": speaker.tagColor,
                        } as React.CSSProperties
                      }
                    >
                      {speaker.talkTitle}
                    </p>
                  </div>
                </div>
              </div>

              <div className="modal-cv">
                <CVSection
                  title="Formación académica"
                  items={cv.formacion}
                />
                <CVSection title="Docencia y cargos" items={cv.docencia} />
                <CVSection
                  title="Membresías y reconocimientos"
                  items={cv.membresias}
                />
                <CVSection title="Publicaciones" items={cv.publicaciones} />
                <CVSection
                  title="Líneas de investigación"
                  items={cv.investigacion || []}
                />
              </div>
            </ScrollArea>
          </motion.div>
        </div>
      </Dialog>
    </AnimatePresence>
  );
}
