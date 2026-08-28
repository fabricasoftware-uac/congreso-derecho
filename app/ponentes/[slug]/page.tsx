import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SpeakerCV from "@/app/components/SpeakerCV";
import {
  getSpeakerBySlug,
  speakerSlug,
  speakers,
  type Speaker,
} from "@/app/components/SpeakerData";
import { EVENT, SITE_URL } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return speakers.map((s) => ({ slug: speakerSlug(s.name) }));
}

/** Resumen de una línea para metadata: la ponencia, o el inicio de la bio. */
function summarize(speaker: Speaker): string {
  const rol = [speaker.credential, speaker.institution, speaker.country]
    .filter(Boolean)
    .join(" · ");
  if (speaker.talkTitle) {
    return `${rol}. Ponencia: «${speaker.talkTitle}» en el ${EVENT.name}, ${EVENT.city}, 17 y 18 de septiembre de 2026.`;
  }
  return `${rol}. Participa en el ${EVENT.name}, ${EVENT.city}, 17 y 18 de septiembre de 2026.`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const speaker = getSpeakerBySlug(slug);
  if (!speaker) return {};

  const description = summarize(speaker);
  const url = `/ponentes/${slug}`;

  return {
    title: `${speaker.name} · ${EVENT.name}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "profile",
      locale: "es_CO",
      url,
      title: `${speaker.name} · ${EVENT.name}`,
      description,
      images: speaker.photo
        ? [{ url: speaker.photo, alt: speaker.name }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${speaker.name} · ${EVENT.name}`,
      description,
      images: speaker.photo ? [speaker.photo] : undefined,
    },
  };
}

export default async function SpeakerPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const speaker = getSpeakerBySlug(slug);
  if (!speaker) notFound();

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: speaker.name,
    url: `${SITE_URL}/ponentes/${slug}`,
    ...(speaker.photo && { image: `${SITE_URL}${speaker.photo}` }),
    ...(speaker.credential && { honorificPrefix: speaker.credential }),
    ...(speaker.institution && {
      affiliation: { "@type": "Organization", name: speaker.institution },
    }),
    ...(speaker.bio && { description: speaker.bio }),
    performerIn: {
      "@type": "Event",
      name: EVENT.name,
      startDate: EVENT.startDate,
      url: `${SITE_URL}/`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <Navbar />

      <main id="contenido" className="speaker-page">
        <div className="wrap">
          <nav className="speaker-breadcrumb" aria-label="Migas de pan">
            <Link href="/">Inicio</Link>
            <span aria-hidden="true">/</span>
            <Link href="/#ponentes">Conferencistas</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{speaker.name}</span>
          </nav>

          <header className="speaker-hero">
            <div
              className="speaker-hero-photo"
              style={
                {
                  "--c1": speaker.gradientC1,
                  "--c2": speaker.gradientC2,
                } as React.CSSProperties
              }
            >
              {speaker.photo ? (
                <Image
                  src={speaker.photo}
                  alt={speaker.name}
                  width={520}
                  height={520}
                  sizes="(max-width:760px) 92vw, 280px"
                  priority
                />
              ) : (
                <span className="speaker-hero-ini">{speaker.initials}</span>
              )}
            </div>

            <div className="speaker-hero-copy">
              <div className="speaker-hero-tags">
                {speaker.credential && (
                  <span
                    className="speaker-hero-tag"
                    style={
                      {
                        color: speaker.tagColor,
                        background: `color-mix(in srgb, ${speaker.tagColor} 12%, transparent)`,
                      } as React.CSSProperties
                    }
                  >
                    {speaker.credential}
                  </span>
                )}
                <span className="speaker-hero-tag is-plain">
                  {speaker.country}
                </span>
                {speaker.modality && (
                  <span className="speaker-hero-tag is-modality">
                    {speaker.modality === "presencial"
                      ? "Presencial"
                      : "Virtual"}
                  </span>
                )}
              </div>

              <h1 className="speaker-hero-name">{speaker.name}</h1>

              {speaker.institution && (
                <p className="speaker-hero-inst">{speaker.institution}</p>
              )}

              {speaker.talkTitle && (
                <p
                  className="speaker-hero-talk"
                  style={
                    { "--talk-color": speaker.tagColor } as React.CSSProperties
                  }
                >
                  {speaker.talkTitle}
                </p>
              )}

              <Link className="btn btn-primary speaker-hero-cta" href="/inscripcion">
                Inscribirme al Congreso
              </Link>
            </div>
          </header>

          <article className="speaker-body">
            <SpeakerCV speaker={speaker} />
          </article>

          <OtherSpeakers currentSlug={slug} />
        </div>
      </main>

      <Footer />
    </>
  );
}

/** Enlaces laterales: dan a Google rutas para descubrir las 14 fichas. */
function OtherSpeakers({ currentSlug }: { currentSlug: string }) {
  const others = speakers.filter((s) => speakerSlug(s.name) !== currentSlug);

  return (
    <section className="speaker-others" aria-labelledby="otros-ponentes">
      <h2 className="speaker-others-title" id="otros-ponentes">
        Otros conferencistas
      </h2>
      <ul className="speaker-others-list">
        {others.map((s) => (
          <li key={s.name}>
            <Link href={`/ponentes/${speakerSlug(s.name)}`}>
              <span
                className="speaker-others-dot"
                style={{ background: s.tagColor }}
                aria-hidden="true"
              />
              <span className="speaker-others-name">{s.name}</span>
              <span className="speaker-others-meta">
                {s.credential} · {s.country}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Link className="btn btn-ghost speaker-others-back" href="/#ponentes">
        Volver a todos los conferencistas
      </Link>
    </section>
  );
}
