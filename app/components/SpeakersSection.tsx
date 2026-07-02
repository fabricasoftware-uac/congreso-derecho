import ScrollReveal from "./ScrollReveal";

interface Speaker {
  initials: string;
  tag: string;
  tagColor: string;
  name: string;
  talk: string;
  talkColor?: string;
  gradientC1: string;
  gradientC2: string;
  bio: string;
}

const speakers: Speaker[] = [
  {
    initials: "MS",
    tag: "Ética de la investigación",
    tagColor: "var(--orange)",
    name: "Maximilian Sieber",
    talk: "El consentimiento informado en la investigación",
    gradientC1: "var(--orange)",
    gradientC2: "var(--cta)",
    bio: "Semblanza por confirmar.",
  },
  {
    initials: "OP",
    tag: "Filosofía del Derecho",
    tagColor: "var(--blue)",
    name: "Óscar Pérez de la Fuente",
    talk: "Desinformación y virtudes epistémicas",
    gradientC1: "var(--blue)",
    gradientC2: "var(--navy)",
    bio: "Semblanza por confirmar.",
  },
  {
    initials: "MG",
    tag: "Derecho del trabajo",
    tagColor: "#159b8c",
    name: "Mario Garmendia Arigón",
    talk: "Del telar mecánico a la IA: sentido y función del Derecho del Trabajo",
    gradientC1: "var(--teal)",
    gradientC2: "#1d7d86",
    bio: "Semblanza por confirmar.",
  },
  {
    initials: "PF",
    tag: "Privacidad y trabajo",
    tagColor: "#d68a14",
    name: "Paola Frías Ávila",
    talk: "Control empresarial en las organizaciones: derecho a la intimidad y conflictos",
    gradientC1: "var(--gold)",
    gradientC2: "var(--orange)",
    bio: "Semblanza por confirmar.",
  },
  {
    initials: "SC",
    tag: "Derecho penal",
    tagColor: "var(--crimson)",
    name: "Silvio Castrillón Paz",
    talk: "El derecho penal y la criminalidad",
    gradientC1: "var(--crimson)",
    gradientC2: "#8f2742",
    bio: "Semblanza por confirmar.",
  },
  {
    initials: "DS",
    tag: "Presentación de libro",
    tagColor: "var(--plum)",
    name: "Diana Marcela Santacruz",
    talk: "Presentación de libro",
    gradientC1: "var(--plum)",
    gradientC2: "#6f3458",
    bio: "Semblanza por confirmar.",
  },
];

const staggerDelays = ["0s", ".07s", ".14s", "0s", ".07s", ".14s"];

export default function SpeakersSection() {
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
              Ponentes
            </span>
            <h2 className="section-title">Las voces del Congreso</h2>
            <p className="section-intro">
              Especialistas que están marcando la conversación jurídica, dentro y fuera del país. La agenda sigue creciendo.
            </p>
          </div>
        </ScrollReveal>

        <div className="speaker-grid">
          {speakers.map((speaker, i) => (
            <ScrollReveal key={speaker.initials} stagger={staggerDelays[i]}>
              <article className="speaker-card">
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
                  {speaker.tag}
                </span>
                <h3 className="speaker-name">{speaker.name}</h3>
                <p
                  className="speaker-talk"
                  style={
                    {
                      "--tagc": speaker.talkColor || speaker.tagColor,
                    } as React.CSSProperties
                  }
                >
                  {speaker.talk}
                </p>
                <p className="speaker-bio">{speaker.bio}</p>
              </article>
            </ScrollReveal>
          ))}

          <ScrollReveal stagger="0s">
            <article className="speaker-card speaker-ghost">
              <span className="plus">+</span>
              <strong>Más ponentes por confirmar</strong>
              <span style={{ fontSize: ".85rem" }}>
                La agenda se actualiza cada semana
              </span>
            </article>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
