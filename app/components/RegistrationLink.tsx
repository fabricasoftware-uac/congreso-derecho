"use client";

import Link from "next/link";

const REGISTRO_URL = "#inversion";

export function RegistrationLink({
  href,
  className,
  style,
  children,
}: {
  href: string;
  className: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const url = REGISTRO_URL !== "#inversion" ? REGISTRO_URL : href;
  const isExternal =
    REGISTRO_URL !== "#inversion" || url.startsWith("http");

  if (isExternal && url.startsWith("http")) {
    return (
      <a
        className={className}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={style}
      >
        {children}
      </a>
    );
  }

  if (url.startsWith("mailto:") || url.startsWith("https://wa.me")) {
    return (
      <a
        className={className}
        href={url}
        style={style}
        {...(url.startsWith("https://wa.me")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={url} style={style}>
      {children}
    </Link>
  );
}
