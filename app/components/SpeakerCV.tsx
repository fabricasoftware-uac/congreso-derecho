import type { SectionItem, Speaker } from "./SpeakerData";

const sectionIcons: Record<string, string> = {
  "Perfil destacado":
    '<path d="M12 2v4"/><path d="M12 18v4"/><path d="m4.9 4.9 2.9 2.9"/><path d="m16.2 16.2 2.9 2.9"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="m4.9 19.1 2.9-2.9"/><path d="m16.2 7.8 2.9-2.9"/>',
  "Formación académica":
    '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/><path d="M8 15h6"/>',
  "Docencia y cargos":
    '<path d="M3 9.5 12 4l9 5.5"/><path d="M5 10v8"/><path d="M9.5 10v8"/><path d="M14.5 10v8"/><path d="M19 10v8"/><path d="M3.5 21h17"/>',
  "Trayectoria profesional":
    '<path d="M20 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><path d="M2 12h20"/>',
  "Membresías y reconocimientos":
    '<path d="M12 15 8.5 17l.7-3.9-2.9-2.8 3.9-.6L12 6l1.8 3.7 3.9.6-2.9 2.8.7 3.9Z"/><path d="M12 15V6"/>',
  Publicaciones:
    '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M8 7h6"/><path d="M8 11h8"/>',
  "Líneas de investigación":
    '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  "Especialidades y áreas de trabajo":
    '<path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.2l5.9-.9Z"/>',
};

export function CVSection({
  title,
  items,
}: {
  title: string;
  items?: SectionItem[];
}) {
  if (!items?.length) return null;
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
        <h2 className="cv-section-title">{title}</h2>
      </div>
      <ul className="cv-list">
        {items.map((item, i) => (
          <li key={i}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Todo el contenido de un ponente. Es un componente de servidor: el HTML sale
 * completo en la respuesta, que es justamente lo que el modal no hacía.
 */
export default function SpeakerCV({ speaker }: { speaker: Speaker }) {
  const { cv } = speaker;

  return (
    <div className="modal-cv">
      {speaker.bio && <p className="modal-bio">{speaker.bio}</p>}
      <CVSection
        title="Perfil destacado"
        items={speaker.highlights?.map((text) => ({ text }))}
      />
      {cv && (
        <>
          <CVSection title="Formación académica" items={cv.formacion} />
          <CVSection title="Docencia y cargos" items={cv.docencia} />
          <CVSection title="Trayectoria profesional" items={cv.experiencia} />
          <CVSection title="Membresías y reconocimientos" items={cv.membresias} />
          <CVSection title="Publicaciones" items={cv.publicaciones} />
          <CVSection title="Líneas de investigación" items={cv.investigacion} />
          <CVSection
            title="Especialidades y áreas de trabajo"
            items={cv.especialidades}
          />
        </>
      )}
    </div>
  );
}
