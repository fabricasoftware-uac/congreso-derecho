import Image from "next/image";
import { RegistrationLink } from "./RegistrationLink";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="blob b1"></div>
      <div className="blob b2"></div>
      <div className="blob b3"></div>
      <div className="blob b4"></div>
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <span className="eyebrow" data-anim style={{ "--d": ".05s" } as React.CSSProperties}>
            <span className="dots">
              <i style={{ background: "var(--orange)" }}></i>
              <i style={{ background: "var(--teal)" }}></i>
              <i style={{ background: "var(--crimson)" }}></i>
            </span>
            17–18 Sep · Popayán · 2026
          </span>
          <h1 className="hero-title" data-anim style={{ "--d": ".14s" } as React.CSSProperties}>
            Dos días para debatir el{" "}
            <span className="hl">Derecho del presente</span>.
          </h1>
          <p className="hero-sub" data-anim style={{ "--d": ".26s" } as React.CSSProperties}>
            I Congreso Internacional de Derecho. Ponentes internacionales, seis líneas temáticas y un punto de encuentro entre la academia, la justicia y el ejercicio profesional.
          </p>
          <div className="hero-actions" data-anim style={{ "--d": ".36s" } as React.CSSProperties}>
            <RegistrationLink className="btn btn-primary" href="#inversion">
              Inscríbete <span className="arr">→</span>
            </RegistrationLink>
            <a className="btn btn-ghost" href="#ponencias">
              Presenta tu ponencia
            </a>
          </div>
          <div className="hero-meta" data-anim style={{ "--d": ".46s" } as React.CSSProperties}>
            <span>
              <i className="pin" style={{ background: "var(--blue)" }}></i>{" "}
              <b>Club Campestre</b>, Popayán
            </span>
            <span>
              <i className="pin" style={{ background: "var(--teal)" }}></i>{" "}
              Presencial y virtual
            </span>
            <span>
              <i className="pin" style={{ background: "var(--gold)" }}></i>{" "}
              Con certificación
            </span>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-ring"></div>
          <Image className="mark" src="/mark.png" alt="" width={360} height={360} priority />
          <span className="chip c1">Público</span>
          <span className="chip c2">Laboral</span>
          <span className="chip c3">Familia &amp; Negocios</span>
          <span className="chip c4">Penal</span>
          <span className="chip c5">Ambiental</span>
          <span className="chip c6">Tecnología</span>
        </div>
      </div>
    </section>
  );
}
