import type { MetadataRoute } from "next";

const BASE_URL = "https://mohema.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/journey/", "/product/"],
        disallow: ["/api/", "/dashboard/", "/login/", "/register/"],
      },
    ],

    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

