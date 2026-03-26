import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/kunal", "/kunal-resume", "/kunal-portfolio"],
      },
    ],
    sitemap: "https://tool-pilot.in/sitemap.xml",
  };
}
