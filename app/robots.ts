import type { MetadataRoute } from "next";

const siteUrl = "https://portfolio-liart-iota-82.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
