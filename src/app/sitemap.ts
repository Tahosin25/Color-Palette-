import type { MetadataRoute } from "next";
import { ALL_TAGS, PALETTES } from "@/lib/palettes";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://colorhunt-clone.vercel.app";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paletteUrls = PALETTES.map((palette) => ({
    url: `${siteUrl}/palette/${palette.id}`,
    lastModified: new Date(palette.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const tagUrls = ALL_TAGS.map((tag) => ({
    url: `${siteUrl}/tags/${tag}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/explore`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/create`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ...paletteUrls,
    ...tagUrls,
  ];
}
