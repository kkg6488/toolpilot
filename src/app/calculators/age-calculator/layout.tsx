import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/calculators/age-calculator";

export const metadata: Metadata = {
  title: "Age Calculator — Calculate Exact Age in Years, Months & Days | ToolPilot",
  description:
    "Free online age calculator. Enter your date of birth to find your exact age in years, months, and days. Also shows next birthday countdown and total days lived.",
  openGraph: {
    title: "Age Calculator — Calculate Exact Age in Years, Months & Days | ToolPilot",
    description:
      "Free online age calculator. Enter your date of birth to find your exact age in years, months, and days.",
    type: "website",
    url: `${siteUrl}${pagePath}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ToolPilot Age Calculator",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Calculate your exact age in years, months, and days from your date of birth.",
  url: `${siteUrl}${pagePath}`,
};

export default function AgeCalculatorLayout({
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
