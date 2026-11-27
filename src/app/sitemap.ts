import type { MetadataRoute } from "next";
import { getLabsForSection } from "../lib/mdx";
import { SITE_URL } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const labs = getLabsForSection("ccna").map((lab) => {
    const date = lab.date ? new Date(lab.date) : undefined;
    return {
      url: `${SITE_URL}/ccna/${lab.slug}`,
      lastModified: date && !isNaN(date.getTime()) ? date : undefined,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    };
  });

  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/ccna`, changeFrequency: "monthly", priority: 0.8 },
    ...labs,
  ];
}
