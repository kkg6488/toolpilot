import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/calculators/bmi-calculator";

export const metadata: Metadata = {
  title: "BMI Calculator — Check Your Body Mass Index | ToolPilot",
  description:
    "Free BMI calculator with metric and imperial units. Instantly see your BMI, category, and a visual scale for underweight, normal, overweight, and obese ranges.",
  openGraph: {
    title: "BMI Calculator — Check Your Body Mass Index | ToolPilot",
    description:
      "Free BMI calculator with metric and imperial units. Instantly see your BMI, category, and a visual scale for underweight, normal, overweight, and obese ranges.",
    type: "website",
    url: `${siteUrl}${pagePath}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ToolPilot BMI Calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Compute Body Mass Index (BMI) from height and weight in metric or US customary units with category guidance.",
  url: `${siteUrl}${pagePath}`,
};

export default function BmiCalculatorLayout({
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
