import { MetadataRoute } from "next";
import { generateAllConversionSlugs } from "@/lib/unit-conversions";
import { generateAllPercentageSlugs } from "@/lib/percentage-data";

const CONTENT_LAST_UPDATED = "2026-04-12T00:00:00.000Z";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://tool-pilot.in";
  const stableDate = new Date(CONTENT_LAST_UPDATED);

  const hubPages = ["/calculators", "/tools", "/convert", "/percentage"];

  const calculatorPages = [
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
    "/calculators/income-tax-calculator",
    "/calculators/fd-calculator",
    "/calculators/rd-calculator",
    "/calculators/loan-calculator",
    "/calculators/discount-calculator",
    "/calculators/date-calculator",
    "/calculators/cgpa-to-percentage-calculator",
    "/calculators/calorie-calculator",
    "/calculators/body-fat-calculator",
    "/calculators/roi-calculator",
  ];

  const toolPages = [
    "/tools/json-formatter",
    "/tools/color-palette-generator",
    "/tools/regex-tester",
    "/tools/privacy-policy-generator",
    "/tools/cron-expression-builder",
    "/tools/word-counter",
    "/tools/password-generator",
    "/tools/qr-code-generator",
    "/tools/base64-encoder-decoder",
    "/tools/uuid-generator",
    "/tools/hash-generator",
    "/tools/lorem-ipsum-generator",
    "/tools/timestamp-converter",
  ];

  const conversionSlugs = generateAllConversionSlugs();
  const percentageSlugs = generateAllPercentageSlugs();

  return [
    {
      url: baseUrl,
      lastModified: stableDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...hubPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: stableDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...[...calculatorPages, ...toolPages].map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: stableDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...conversionSlugs.map((slug) => ({
      url: `${baseUrl}/convert/${slug}`,
      lastModified: stableDate,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...percentageSlugs.map((slug) => ({
      url: `${baseUrl}/percentage/${slug}`,
      lastModified: stableDate,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    {
      url: `${baseUrl}/blog`,
      lastModified: stableDate,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...[
      "how-to-calculate-emi",
      "sip-vs-fd-which-is-better",
      "income-tax-slabs-2025-26",
      "how-to-calculate-percentage",
      "best-free-developer-tools-2026",
      "how-to-calculate-compound-interest",
      "fd-vs-rd-which-is-better",
      "gst-calculation-guide-india",
      "how-ppf-interest-is-calculated",
      "mortgage-vs-rent-calculator-comparison",
      "what-is-bmi-and-how-to-calculate",
      "calorie-deficit-explained",
      "how-to-calculate-roi",
      "json-formatting-best-practices",
      "how-to-use-regex-beginners-guide",
      "password-security-tips-2026",
      "unit-conversion-guide",
      "cron-expressions-explained",
      "how-to-calculate-body-fat-percentage",
      "qr-code-uses-and-how-to-create",
    ].map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: stableDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${baseUrl}/privacy`,
      lastModified: stableDate,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: stableDate,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
