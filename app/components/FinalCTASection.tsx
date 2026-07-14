import ScrollReveal from "./ScrollReveal";
import { RegistrationLink } from "./RegistrationLink";

export default function FinalCTASection() {
  return (
    <section className="final" id="contacto">
      <div className="wrap final-inner">
        <ScrollReveal>
          <div>
            <span className="eyebrow" style={{ color: "#fff" } as React.CSSProperties}>
              <span className="dots">
                <i style={{ background: "var(--orange)" }}></i>
                <i style={{ background: "var(--teal)" }}></i>
                <i style={{ background: "var(--gold)" }}></i>
              </span>{" "}
              17–18 Sep 2026
            </span>
            <h2 style={{ marginTop: ".7rem" }}>Nos vemos en Popayán.</h2>
            <p className="lede">
              Sé parte del primer gran encuentro internacional del Programa de Derecho de Uniautónoma del Cauca.
            </p>
            <div className="final-actions">
              <RegistrationLink className="btn btn-primary">
                Inscríbete <span className="arr">→</span>
              </RegistrationLink>
              <a
                className="btn btn-ghost-light"
               
                target="_blank"
                rel="noopener noreferrer"
              >
                Escríbenos por WhatsApp
              </a>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal stagger=".08s">
          <div className="contact-card">
            <h3>Informes e inscripciones</h3>
            <div className="contact-list">
              <div className="contact-row">
                <span className="contact-ic">✉</span>
                <a>
                  escueladederecho@uniautonoma.edu.co
                </a>
              </div>
              <div className="contact-row">
                <span className="contact-ic">✆</span>
                <a
                 
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp 310 218 5493
                </a>
              </div>
              <div className="contact-row">
                <span className="contact-ic">☎</span>
                <span>(602) 821 3000 ext. 118</span>
              </div>
              <div className="contact-row">
                <span className="contact-ic">⚲</span>
                <span>Calle 5 # 3-85, Centro Histórico · Popayán</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
