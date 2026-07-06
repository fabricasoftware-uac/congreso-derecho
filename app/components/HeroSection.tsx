import Image from "next/image";
import { motion } from "motion/react";
import { RegistrationLink } from "./RegistrationLink";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.2, 0.7, 0.2, 1] as const,
      delay,
    },
  }),
};

export default function HeroSection() {
  return (
    <section className="hero">
      <motion.div
        className="blob b1"
        animate={{ x: [0, 18, 0], y: [0, -16, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="blob b2"
        animate={{ x: [0, 18, 0], y: [0, -16, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="blob b3"
        animate={{ x: [0, 18, 0], y: [0, -16, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="blob b4"
        animate={{ x: [0, 18, 0], y: [0, -16, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="wrap hero-inner">
        <div className="hero-copy">
          <motion.span
            className="eyebrow"
            custom={0.05}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <span className="dots">
              <i style={{ background: "var(--orange)" }} />
              <i style={{ background: "var(--teal)" }} />
              <i style={{ background: "var(--crimson)" }} />
            </span>
            17–18 Sep · Popayán · 2026
          </motion.span>

          <motion.h1
            className="hero-title"
            custom={0.14}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            Dos días para debatir el{" "}
            <span className="hl">Derecho del presente</span>.
          </motion.h1>

          <motion.p
            className="hero-sub"
            custom={0.26}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            I Congreso Internacional de Derecho. Ponentes internacionales,
            seis líneas temáticas y un punto de encuentro entre la academia, la
            justicia y el ejercicio profesional.
          </motion.p>

          <motion.div
            className="hero-actions"
            custom={0.36}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <RegistrationLink className="btn btn-primary" href="#inversion">
              Inscríbete <span className="arr">→</span>
            </RegistrationLink>
            <a className="btn btn-ghost" href="#ponencias">
              Presenta tu ponencia
            </a>
          </motion.div>

          <motion.div
            className="hero-meta"
            custom={0.46}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <span>
              <i className="pin" style={{ background: "var(--blue)" }} />{" "}
              <b>Club Campestre</b>, Popayán
            </span>
            <span>
              <i className="pin" style={{ background: "var(--teal)" }} />{" "}
              Presencial y virtual
            </span>
            <span>
              <i className="pin" style={{ background: "var(--gold)" }} />{" "}
              Con certificación
            </span>
          </motion.div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <motion.div className="art-ring" animate={{ x: [0, 18, 0], y: [0, -16, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="mark-wrapper" animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
            <Image
              className="mark"
              src="/mark.png"
              alt=""
              width={360}
              height={360}
              priority
            />
          </motion.div>
          <motion.span className="chip c1" animate={{ y: [0, -14, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
            Público
          </motion.span>
          <motion.span className="chip c2" animate={{ y: [0, -14, 0] }} transition={{ duration: 6.4, delay: 0.4, repeat: Infinity, ease: "easeInOut" }}>
            Laboral
          </motion.span>
          <motion.span className="chip c3" animate={{ y: [0, -14, 0] }} transition={{ duration: 5.6, delay: 0.8, repeat: Infinity, ease: "easeInOut" }}>
            Familia &amp; Negocios
          </motion.span>
          <motion.span className="chip c4" animate={{ y: [0, -14, 0] }} transition={{ duration: 6, delay: 0.2, repeat: Infinity, ease: "easeInOut" }}>
            Penal
          </motion.span>
          <motion.span className="chip c5" animate={{ y: [0, -14, 0] }} transition={{ duration: 5.3, delay: 1, repeat: Infinity, ease: "easeInOut" }}>
            Ambiental
          </motion.span>
          <motion.span className="chip c6" animate={{ y: [0, -14, 0] }} transition={{ duration: 6.8, delay: 0.6, repeat: Infinity, ease: "easeInOut" }}>
            Tecnología
          </motion.span>
        </div>
      </div>
    </section>
  );
}
