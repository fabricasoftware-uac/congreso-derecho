import Navbar from "./components/Navbar";
import PageContent from "./components/PageContent";
import Footer from "./components/Footer";
import { speakers } from "./components/SpeakerData";
import { EVENT, SITE_URL } from "@/lib/site";

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: `${EVENT.name} — ${EVENT.tagline}`,
  startDate: EVENT.startDate,
  endDate: EVENT.endDate,
  eventStatus: "https://schema.org/EventScheduled",
  // El congreso se transmite además en modalidad virtual.
  eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/logo.png`,
  description:
    "Congreso internacional con ponentes de Uruguay, España, Alemania y Colombia sobre derecho del trabajo, derecho constitucional, derechos humanos e inteligencia artificial aplicada a la justicia.",
  location: {
    "@type": "Place",
    name: EVENT.venue,
    address: {
      "@type": "PostalAddress",
      addressLocality: EVENT.city,
      addressRegion: EVENT.region,
      addressCountry: EVENT.country,
    },
  },
  organizer: {
    "@type": "CollegeOrUniversity",
    name: EVENT.organizer,
    url: EVENT.organizerUrl,
  },
  performer: speakers.map((s) => ({
    "@type": "Person",
    name: s.name,
    ...(s.institution && {
      affiliation: { "@type": "Organization", name: s.institution },
    }),
  })),
  offers: {
    "@type": "Offer",
    url: `${SITE_URL}/inscripcion`,
    price: "120000",
    priceCurrency: "COP",
    availability: "https://schema.org/InStock",
    validThrough: "2026-09-11T23:59:59-05:00",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">
        <span id="top"></span>
        <PageContent />
      </main>
      <Footer />
    </>
  );
}
