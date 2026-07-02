import ScrollReveal from "./ScrollReveal";

interface ThematicLine {
  icon: React.ReactNode;
  title: string;
  items: string[];
  color: string;
}

const lines: ThematicLine[] = [
  {
    color: "var(--blue)",
    title: "Derecho público y filosofía",
    items: [
      "Constitución, democracia y Estado de derecho",
      "Derechos humanos, justicia constitucional y garantías fundamentales",
      "Filosofía y teoría jurídica ante las transformaciones institucionales",
    ],
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 9.5 12 4l9 5.5" />
        <path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8" />
        <path d="M3.5 21h17" />
      </svg>
    ),
  },
  {
    color: "var(--orange)",
    title: "Derecho laboral",
    items: [
      "Transformaciones del trabajo y nuevas formas de vinculación",
      "Derecho laboral individual, colectivo y seguridad social",
      "Gestión humana, relaciones laborales y desafíos empresariales",
    ],
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="7.5" width="18" height="12" rx="2" />
        <path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5" />
        <path d="M3 12.5h18" />
      </svg>
    ),
  },
  {
    color: "#d68a14",
    title: "Derecho privado: familia y negocios",
    items: [
      "Familia, infancia y relaciones familiares contemporáneas",
      "Derecho contractual, responsabilidad civil y patrimonio",
      "Empresa, negocios jurídicos y derecho comercial",
    ],
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="8" cy="8" r="2.6" />
        <circle cx="16" cy="8.4" r="2.2" />
        <path d="M3.5 19c0-2.9 2-4.7 4.5-4.7S12.5 16.1 12.5 19" />
        <path d="M13.7 19c.3-2.1 1.6-3.5 3.3-3.5s3 1.4 3.3 3.5" />
      </svg>
    ),
  },
  {
    color: "var(--crimson)",
    title: "Derecho penal y criminal",
    items: [
      "Política criminal, sistema penal y garantías procesales",
      "Criminalidad contemporánea y nuevas formas de delincuencia",
      "Víctimas, justicia restaurativa y control social",
    ],
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 3.5 19 6v5.4c0 4.5-3 7.5-7 9.1-4-1.6-7-4.6-7-9.1V6z" />
        <path d="M9.2 12l2 2 3.6-3.9" />
      </svg>
    ),
  },
  {
    color: "var(--teal)",
    title: "Derecho ambiental y animal",
    items: [
      "Protección jurídica del ambiente y de los recursos naturales",
      "Justicia ambiental, territorio y conflictos socioambientales",
      "Derecho animal y protección de los seres sintientes",
    ],
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M5 19c0-8 5.5-14 15-14 0 9.6-6 15.2-15 14z" />
        <path d="M5 19C8 14 12 11 17 9" />
      </svg>
    ),
  },
  {
    color: "var(--plum)",
    title: "Derecho y tecnología",
    items: [
      "Inteligencia artificial, regulación y responsabilidad jurídica",
      "Protección de datos, privacidad y ciberseguridad",
      "Transformación digital de la justicia y la profesión",
    ],
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="7" y="7" width="10" height="10" rx="1.5" />
        <path d="M10 3.5v3M14 3.5v3M10 17.5v3M14 17.5v3M3.5 10h3M3.5 14h3M17.5 10h3M17.5 14h3" />
      </svg>
    ),
  },
];

const staggerDelays = ["0s", ".07s", ".14s", "0s", ".07s", ".14s"];

export default function ThematicLinesSection() {
  return (
    <section className="section alt" id="lineas">
      <div className="wrap">
        <ScrollReveal>
          <div className="section-head">
            <span className="eyebrow">
              <span className="dots">
                <i style={{ background: "var(--teal)" }}></i>
                <i style={{ background: "var(--plum)" }}></i>
              </span>{" "}
              Líneas temáticas
            </span>
            <h2 className="section-title">Seis frentes de debate</h2>
            <p className="section-intro">
              Las grandes preguntas del Derecho contemporáneo, organizadas para que elijas dónde sumar tu voz.
            </p>
          </div>
        </ScrollReveal>

        <div className="line-grid">
          {lines.map((line, i) => (
            <ScrollReveal key={line.title} stagger={staggerDelays[i]}>
              <article
                className="line-bubble"
                style={{ "--lc": line.color } as React.CSSProperties}
              >
                <div className="line-ic">{line.icon}</div>
                <h3 className="line-title">{line.title}</h3>
                <ul className="line-list">
                  {line.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
