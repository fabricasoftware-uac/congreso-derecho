import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { EVENT, SITE_URL } from "@/lib/site";
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

const description =
  "I Congreso Internacional de Derecho — Tendencias Globales y Debates Contemporáneos. 17 y 18 de septiembre de 2026, Popayán. Ponentes internacionales, seis líneas temáticas y certificación.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "I Congreso Internacional de Derecho · Popayán 2026",
  description,
  alternates: { canonical: "/" },
  keywords: [
    "congreso internacional de derecho",
    "Popayán 2026",
    "derecho del trabajo",
    "derecho constitucional",
    "inteligencia artificial y justicia",
    "Corporación Universitaria Autónoma del Cauca",
  ],
  authors: [{ name: EVENT.organizer, url: EVENT.organizerUrl }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "/",
    siteName: "I Congreso Internacional de Derecho",
    title: "I Congreso Internacional de Derecho · Popayán 2026",
    description,
    images: [{ url: "/logo.png", width: 1000, height: 335, alt: EVENT.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "I Congreso Internacional de Derecho · Popayán 2026",
    description,
    images: ["/logo.png"],
  },
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
