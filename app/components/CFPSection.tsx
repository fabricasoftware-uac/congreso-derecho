import ScrollReveal from "./ScrollReveal";

export default function CFPSection() {
  return (
    <section className="section cfp" id="ponencias">
      <div className="wrap">
        <ScrollReveal>
          <div className="cfp-card">
            <div className="cfp-blob x"></div>
            <div className="cfp-blob y"></div>
            <div className="cfp-grid">
              <div>
                <h2>¿Tienes una investigación que compartir?</h2>
                <p className="lede">
                  Postula tu ponencia en cualquiera de las seis líneas temáticas. Modalidad presencial o virtual.
                </p>
                <div className="cfp-deadline">
                  🗓 Resúmenes: 3 – 24 de agosto de 2026
                </div>
                <div className="cfp-actions">
                  <a
                    className="btn btn-primary"
                    href="mailto:escueladederecho@uniautonoma.edu.co?subject=POSTULACI%C3%93N%20PONENCIA%20I%20CONGRESO%20INTERNACIONAL%20DE%20DERECHO"
                  >
                    Enviar mi resumen
                  </a>
                </div>
              </div>
              <ul className="req">
                <li>
                  <span className="k">01</span>
                  <span>
                    <b>Título</b> claro y breve, en español e inglés (máx. 2 líneas).
                  </span>
                </li>
                <li>
                  <span className="k">02</span>
                  <span>
                    <b>Resumen</b> estructurado de máx. 300 palabras: introducción, objetivo, métodos, resultados y conclusiones.
                  </span>
                </li>
                <li>
                  <span className="k">03</span>
                  <span>
                    <b>3 a 5 palabras clave</b> en español e inglés.
                  </span>
                </li>
                <li>
                  <span className="k">04</span>
                  <span>
                    <b>Datos de los autores</b>: nombres, formación, ORCID, filiación y correo institucional.
                  </span>
                </li>
                <li>
                  <span className="k">05</span>
                  <span>
                    Envía en <b>Word</b> e indica tu <b>modalidad</b> de participación.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
