import type { MetadataRoute } from "next";

const BASE_URL = "https://mohema.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/journey", "/journey/", "/product", "/product/"],
        disallow: [
          "/api",
          "/dashboard",
          "/panel",
          "/signin",
          "/signup",
        ],
      },
    ],

    sitemap: `${BASE_URL}/sitemap.xml`,
  };
 }

