/**
 * URL canónica del sitio. Se usa en metadata, sitemap, robots y datos
 * estructurados.
 *
 * Define NEXT_PUBLIC_SITE_URL con el dominio real en producción. Sin esa
 * variable caemos al dominio que asigna Vercel y, en local, a localhost:
 * preferimos eso antes que quemar un dominio inventado en las etiquetas
 * canónicas.
 */
const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const SITE_URL = rawSiteUrl.replace(/\/+$/, "");

export const EVENT = {
  name: "I Congreso Internacional de Derecho",
  tagline: "Tendencias Globales y Debates Contemporáneos",
  startDate: "2026-09-17T08:00:00-05:00",
  endDate: "2026-09-18T18:00:00-05:00",
  venue: "Club Campestre",
  city: "Popayán",
  region: "Cauca",
  country: "CO",
  organizer: "Corporación Universitaria Autónoma del Cauca",
  organizerUrl: "https://www.uniautonoma.edu.co",
} as const;
