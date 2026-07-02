"use client";

import Image from "next/image";
import Link from "next/link";
import { RegistrationLink } from "./RegistrationLink";

export default function Navbar() {
  return (
    <header className="site-nav">
      <div className="wrap nav-inner">
        <Link className="nav-logo" href="#top" aria-label="I Congreso Internacional de Derecho">
          <Image src="/logo.png" alt="" width={184} height={42} priority />
        </Link>
        <nav className="nav-links" aria-label="Secciones">
          <Link href="#ponentes">Ponentes</Link>
          <Link href="#lineas">Líneas temáticas</Link>
          <Link href="#agenda">Agenda</Link>
          <Link href="#inversion">Inversión</Link>
          <Link href="#ponencias">Ponencias</Link>
        </nav>
        <div className="nav-cta">
          <RegistrationLink className="btn btn-primary" href="#inversion">
            Inscríbete
          </RegistrationLink>
        </div>
      </div>
    </header>
  );
}
