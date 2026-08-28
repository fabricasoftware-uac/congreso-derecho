import type { MetadataRoute } from "next";
import { speakerSlug, speakers } from "@/app/components/SpeakerData";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/inscripcion`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...speakers.map((s) => ({
      url: `${SITE_URL}/ponentes/${speakerSlug(s.name)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
