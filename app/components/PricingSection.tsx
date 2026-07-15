import ScrollReveal from "./ScrollReveal";
import { RegistrationLink } from "./RegistrationLink";

export default function PricingSection() {
  return (
    <section className="section alt" id="inversion">
      <div className="wrap">
        <ScrollReveal>
          <div className="section-head">
            <span className="eyebrow">
              <span className="dots">
                <i style={{ background: "var(--crimson)" }}></i>
                <i style={{ background: "var(--gold)" }}></i>
              </span>{" "}
              Inversión
            </span>
            <h2 className="section-title">Asegura tu cupo</h2>
            <p className="section-intro">
              Toda inscripción incluye certificación con el 70% de participación. La tarifa ordinaria es la más económica: aplica hasta el 16 de septiembre.
            </p>
          </div>
        </ScrollReveal>

        <div className="price-grid">
          <ScrollReveal>
            <div className="price-card price-card--feat">
              <span className="price-badge">Mejor precio</span>
              <span className="price-kicker">Tarifa ordinaria</span>
              <div className="price-when">Hasta el 16 de septiembre</div>
              <ul className="price-rows">
                <li className="price-row">
                  <span className="price-cat">Familia Uniautónoma — estudiantes, administrativos y egresados</span>
                  <span className="price-amt">$120.000</span>
                </li>
                <li className="price-row">
                  <span className="price-cat">Estudiantes de otras instituciones</span>
                  <span className="price-amt">$135.000</span>
                </li>
                <li className="price-row">
                  <span className="price-cat">Público general</span>
                  <span className="price-amt">$150.000</span>
                </li>
              </ul>
              <div className="price-foot">
                <RegistrationLink className="btn btn-primary" style={{ width: "100%" }}>
                  Inscríbete ahora <span className="arr">→</span>
                </RegistrationLink>
                <span className="price-note">Pago de inscripción desde el 3 de agosto de 2026. Financiación disponible.</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger=".08s">
            <div className="price-card">
              <span className="price-kicker">Tarifa extemporánea</span>
              <div className="price-when">17 y 18 de septiembre</div>
              <ul className="price-rows">
                <li className="price-row">
                  <span className="price-cat">Familia Uniautónoma — estudiantes, administrativos y egresados</span>
                  <span className="price-amt">$140.000</span>
                </li>
                <li className="price-row">
                  <span className="price-cat">Estudiantes de otras instituciones</span>
                  <span className="price-amt">Pendiente</span>
                </li>
                <li className="price-row">
                  <span className="price-cat">Público general</span>
                  <span className="price-amt">Pendiente</span>
                </li>
              </ul>
              <div className="price-foot">
                <RegistrationLink className="btn btn-ghost" style={{ width: "100%" } as React.CSSProperties}>
                  Inscríbete
                </RegistrationLink>
                <span className="price-note">Aplica solo durante los días del evento.</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <p className="section-intro" style={{ marginTop: "26px", fontSize: ".92rem" }}>
            Requisitos de inscripción: formulario diligenciado, copia del recibo de pago y copia de la cédula ampliada.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
