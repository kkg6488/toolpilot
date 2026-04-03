import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/calculators/cgpa-to-percentage-calculator";

export const metadata: Metadata = {
  title: "CGPA to Percentage Calculator — CBSE, VTU, Anna & Mumbai | ToolPilot",
  description:
    "Convert CGPA to percentage for Indian boards and universities. Presets for CBSE (9.5), VTU (10), Anna University (10), and Mumbai University (7.1×CGPA+11). Custom multiplier, grade band, and reference table—instant, free.",
  openGraph: {
    title: "CGPA to Percentage Calculator — CBSE, VTU, Anna & Mumbai | ToolPilot",
    description:
      "CGPA to percentage with university presets, custom multiplier, grades, and a quick reference table for students.",
    type: "website",
    url: `${siteUrl}${pagePath}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ToolPilot CGPA to Percentage Calculator",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Convert CGPA on a 10-point scale to percentage using common Indian conversion rules and custom multipliers.",
  url: `${siteUrl}${pagePath}`,
};

export default function CgpaToPercentageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
