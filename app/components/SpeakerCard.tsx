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
            fill
            sizes="(max-width:640px) 100vw, (max-width:980px) 50vw, 25vw"
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
        {speaker.institution} · {speaker.country}
      </p>

      <p
        className="speaker-talk-new"
        style={{ "--tagc": speaker.tagColor } as React.CSSProperties}
      >
        {speaker.talkTitle}
      </p>

      <ul className="speaker-highlights">
        {speaker.highlights.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>

      <button
        className="btn btn-ghost speaker-more"
        onClick={onOpen}
        type="button"
      >
        Ver perfil completo
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
