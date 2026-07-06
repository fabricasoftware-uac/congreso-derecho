import type { Speaker } from "./SpeakerData";

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
        <span className="ini">{speaker.initials}</span>
        <span className="ph-tag">Foto</span>
      </div>

      <span
        className="speaker-tag"
        style={{ "--tagc": speaker.tagColor } as React.CSSProperties}
      >
        {speaker.credential} · {speaker.country}
      </span>

      <h3 className="speaker-name">{speaker.name}</h3>

      <p className="speaker-institution">{speaker.institution}</p>

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

      <button className="btn btn-ghost speaker-more" onClick={onOpen} type="button">
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
