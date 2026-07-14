"use client";

import Link from "next/link";

const REGISTRO_URL = "/inscripcion";

export function RegistrationLink({
  className,
  style,
  children,
}: {
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <Link className={className} href={REGISTRO_URL} style={style}>
      {children}
    </Link>
  );
}
