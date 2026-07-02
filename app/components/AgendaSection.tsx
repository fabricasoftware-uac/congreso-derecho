import ScrollReveal from "./ScrollReveal";
import { RegistrationLink } from "./RegistrationLink";

interface TimelineItem {
  date: string;
  text: string;
  note?: string;
  nodeColor: string;
}

const timelineItems: TimelineItem[] = [
  {
    date: "15 jul 2026",
    text: "Divulgación oficial del evento",
    nodeColor: "var(--blue)",
  },
  {
    date: "3 – 24 ago 2026",
    text: "Convocatoria de ponencias",
    note: "Envío de resúmenes (modalidad presencial o virtual)",
    nodeColor: "var(--orange)",
  },
  {
    date: "29 ago 2026",
    text: "Revisión por el comité científico",
    nodeColor: "var(--gold)",
  },
  {
    date: "31 ago 2026",
    text: "Publicación de ponencias aceptadas",
    note: "Envío de cartas de aceptación",
    nodeColor: "var(--teal)",
  },
  {
    date: "3 ago – 16 sep 2026",
    text: "Inscripción en tarifa ordinaria",
    nodeColor: "var(--crimson)",
  },
  {
    date: "17 – 18 sep 2026",
    text: "¡Congreso! & inscripción extemporánea",
    nodeColor: "var(--plum)",
  },
];

export default function AgendaSection() {
  return (
    <section className="section" id="agenda">
      <div className="wrap agenda-inner">
        <ScrollReveal>
          <div className="agenda-side">
            <span className="eyebrow">
              <span className="dots">
                <i style={{ background: "var(--gold)" }}></i>
                <i style={{ background: "var(--blue)" }}></i>
              </span>{" "}
              Fechas clave
            </span>
            <div className="big-date" style={{ marginTop: ".7rem" }}>
              17–18<span>Septiembre de 2026 · Popayán</span>
            </div>
            <p>
              Dos jornadas de ponencias, presentación de libro y agenda cultural. Marca tu calendario: los cupos de la tarifa ordinaria cierran el 16 de septiembre.
            </p>
            <div style={{ marginTop: "1.6rem" }}>
              <RegistrationLink className="btn btn-primary" href="#inversion">
                Reserva tu cupo <span className="arr">→</span>
              </RegistrationLink>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="timeline">
            {timelineItems.map((item) => (
              <div className="tl-item" key={item.date}>
                <span
                  className="tl-node"
                  style={{ "--nc": item.nodeColor } as React.CSSProperties}
                ></span>
                <div className="tl-date">{item.date}</div>
                <div className="tl-text">{item.text}</div>
                {item.note && <div className="tl-note">{item.note}</div>}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
