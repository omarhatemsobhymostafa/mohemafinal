
import type { MetadataRoute } from "next";

const BASE_URL = "https://mohema.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const weeks = Array.from({ length: 40 }, (_, index) => {
    const week = index + 1;

    return {
      url: `${BASE_URL}/journey/week_${week}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    };
  });

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/journey`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/product`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...weeks,
  ];
}

