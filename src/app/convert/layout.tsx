import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";

export const metadata: Metadata = {
  title: "Unit Converter — Convert Length, Weight, Temperature & More | ToolPilot",
  description:
    "Free online unit converter. Convert between kg and lbs, km and miles, celsius and fahrenheit, liters and gallons, and 200+ other unit conversions instantly.",
  alternates: { canonical: `${siteUrl}/convert` },
  openGraph: {
    title: "Unit Converter — Convert Length, Weight, Temperature & More | ToolPilot",
    description: "Free online unit converter with 200+ conversion combinations.",
    type: "website",
    url: `${siteUrl}/convert`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ToolPilot Unit Converter",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Convert between hundreds of units for weight, length, temperature, volume, area, speed, and digital storage.",
  url: `${siteUrl}/convert`,
};

export default function ConvertLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
