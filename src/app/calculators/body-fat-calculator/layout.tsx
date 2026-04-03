import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/calculators/body-fat-calculator";

const title = "Body Fat Calculator — US Navy Method | ToolPilot";
const description =
  "Estimate body fat percentage with the US Navy method using height, waist, neck, and hip (women). See fat mass, lean mass, and category in metric or imperial units.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: `${siteUrl}${pagePath}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ToolPilot Body Fat Calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "US Navy body fat estimation from circumference measurements; supports cm and inches with fat mass, lean mass, and fitness categories.",
  url: `${siteUrl}${pagePath}`,
};

export default function BodyFatCalculatorLayout({
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
