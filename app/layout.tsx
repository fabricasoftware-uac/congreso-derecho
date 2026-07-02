import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "I Congreso Internacional de Derecho · Popayán 2026",
  description:
    "I Congreso Internacional de Derecho — Tendencias Globales y Debates Contemporáneos. 17 y 18 de septiembre de 2026, Popayán. Ponentes internacionales, seis líneas temáticas y certificación.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bricolageGrotesque.variable} ${inter.variable} ${jetbrainsMono.variable} js`}
    >
      <body>{children}</body>
    </html>
  );
}
