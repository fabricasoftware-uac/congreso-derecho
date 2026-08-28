import Image from "next/image";
import type { Speaker } from "./SpeakerData";
import { Badge } from "@/components/ui/badge";

export default function SpeakerCard({
  speaker,
  onOpen,
}: {
  speaker: Speaker;
  onOpen: () => void;
}) {
  return (
    <article className="speaker-card-new">
      <div
        className="speaker-photo"
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
            width={400}
            height={400}
            /* Anchos reales de la card tras pasar el grid a auto-fill:
               ~45vw a 2 columnas, ~30vw a 3, ~22vw a 4. */
            sizes="(max-width:640px) 48vw, (max-width:1140px) 32vw, 23vw"
            className="object-cover"
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <span className="ini">{speaker.initials}</span>
        )}
        <span className="ph-tag">Conferencista</span>
      </div>

      <Badge
        className="speaker-badge-tag"
        style={
          {
            backgroundColor: "color-mix(in srgb, var(--tagc, var(--blue)) 12%, transparent)",
            color: "var(--tagc, var(--blue))",
            "--tagc": speaker.tagColor,
          } as React.CSSProperties
        }
      >
        {speaker.credential}
      </Badge>

      <h3 className="speaker-name">{speaker.name}</h3>
      <p className="speaker-institution">
        {speaker.institution ? `${speaker.institution} · ` : ""}
        {speaker.country}
        {speaker.modality && (
          <span className="speaker-modality">
            {speaker.modality === "presencial" ? "Presencial" : "Virtual"}
          </span>
        )}
      </p>

      {/* Se pinta siempre, aun sin ponencia definida: reserva el alto que
          mantiene alineadas las cards de la fila. */}
      <p
        className={`speaker-talk-new${speaker.talkTitle ? "" : " is-empty"}`}
        title={speaker.talkTitle || undefined}
        style={{ "--tagc": speaker.tagColor } as React.CSSProperties}
      >
        {speaker.talkTitle}
      </p>

      <button
        className="btn btn-ghost speaker-more"
        onClick={onOpen}
        type="button"
      >
        Ver perfil
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </article>
  );
}
