import { MetadataRoute } from "next";
import { generateAllConversionSlugs } from "@/lib/unit-conversions";
import { generateAllPercentageSlugs } from "@/lib/percentage-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tool-pilot.in";

  const staticPages = [
    "/calculators",
    "/tools",
    "/convert",
    "/percentage",
    "/calculators/emi-calculator",
    "/calculators/sip-calculator",
    "/calculators/gst-calculator",
    "/calculators/ppf-calculator",
    "/calculators/hra-calculator",
    "/calculators/mortgage-calculator",
    "/calculators/bmi-calculator",
    "/calculators/compound-interest-calculator",
    "/calculators/tip-calculator",
    "/calculators/salary-calculator",
    "/calculators/age-calculator",
    "/calculators/percentage-calculator",
    "/tools/json-formatter",
    "/tools/color-palette-generator",
    "/tools/regex-tester",
    "/tools/privacy-policy-generator",
    "/tools/cron-expression-builder",
    "/tools/word-counter",
    "/tools/password-generator",
    "/tools/qr-code-generator",
  ];

  const conversionSlugs = generateAllConversionSlugs();
  const percentageSlugs = generateAllPercentageSlugs();

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority:
        path === "/calculators" || path === "/tools" || path === "/convert" || path === "/percentage"
          ? 0.9
          : 0.8,
    })),
    ...conversionSlugs.map((slug) => ({
      url: `${baseUrl}/convert/${slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...percentageSlugs.map((slug) => ({
      url: `${baseUrl}/percentage/${slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
