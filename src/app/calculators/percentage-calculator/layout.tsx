import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/calculators/percentage-calculator";

export const metadata: Metadata = {
  title: "Percentage Calculator — Calculate %, Increase & Decrease | ToolPilot",
  description:
    "Free online percentage calculator. Calculate percentage of a number, percentage increase/decrease, and what percentage one number is of another. Instant results.",
  openGraph: {
    title: "Percentage Calculator — Calculate %, Increase & Decrease | ToolPilot",
    description: "Free online percentage calculator with multiple calculation modes.",
    type: "website",
    url: `${siteUrl}${pagePath}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ToolPilot Percentage Calculator",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Calculate percentages, percentage increase/decrease, and ratios instantly.",
  url: `${siteUrl}${pagePath}`,
};

export default function PercentageCalculatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
