
import type { MetadataRoute } from "next";

const BASE_URL = "https://mohema.vercel.app";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const weeks = Array.from({ length: 40 }, (_, index) => {
    const week = index + 1;

    return {
      url: `${BASE_URL}/journey/week_${week}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    };
  });

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/journey`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/product`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...weeks,
  ];
}

