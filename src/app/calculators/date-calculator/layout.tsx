import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/calculators/date-calculator";

export const metadata: Metadata = {
  title: "Date Calculator — Days Between Dates & Add/Subtract Days | ToolPilot",
  description:
    "Free date calculator: find the calendar difference between two dates (years, months, days and total days), or add and subtract days from a start date. Works in your browser with native date inputs.",
  openGraph: {
    title: "Date Calculator — Days Between Dates & Add/Subtract Days | ToolPilot",
    description:
      "Compute days between two dates or shift a date by a number of days—clear calendar breakdown and totals.",
    type: "website",
    url: `${siteUrl}${pagePath}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ToolPilot Date Calculator",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Calculate days between two dates with years, months, and days breakdown, or add and subtract days from a given date.",
  url: `${siteUrl}${pagePath}`,
};

export default function DateCalculatorLayout({
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
