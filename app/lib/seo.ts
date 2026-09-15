import type { Metadata } from "next";

export const BASE_URL = "https://mohema.vercel.app";
export const SITE_NAME = "مهمة";
export const DEFAULT_DESCRIPTION =
  "مهمة تساعدك في متابعة الحمل أسبوعًا بأسبوع، ومعرفة تطورات الجنين وأهم النصائح والمعلومات خلال رحلة الحمل والأمومة.";

export const SOCIAL_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "مهمة - دليلك في رحلة الحمل والأمومة",
};

const defaultKeywords = [
  "مهمة",
  "الحمل",
  "متابعة الحمل",
  "الحمل أسبوعًا بأسبوع",
  "تطور الجنين",
  "مراحل الحمل",
  "أعراض الحمل",
  "نصائح الحمل",
  "الأمومة",
];

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: Metadata["openGraph"] extends infer OpenGraph
    ? OpenGraph extends { images?: infer Images }
      ? Images
      : never
    : never;
  type?: "website" | "article";
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  image = [SOCIAL_IMAGE],
  type = "website",
}: PageMetadataOptions): Metadata {
  const url = new URL(path, BASE_URL).toString();

  return {
    title,
    description,
    keywords: [...new Set([...keywords, ...defaultKeywords])],
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "ar_AR",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: image,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image,
    },
  };
}

export const privateMetadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};
