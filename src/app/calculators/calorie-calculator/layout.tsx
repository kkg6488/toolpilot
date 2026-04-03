import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/calculators/calorie-calculator";

const title = "Calorie Calculator — BMR & TDEE | ToolPilot";
const description =
  "Free calorie calculator using Mifflin–St Jeor: BMR, maintenance calories (TDEE), weight-loss and gain targets, plus macro suggestions from activity level.";

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
  name: "ToolPilot Calorie Calculator",
  applicationCategory: "HealthApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Estimate daily calories: basal metabolic rate, total daily energy expenditure by activity, and suggested deficits or surpluses with protein and macro guidance.",
  url: `${siteUrl}${pagePath}`,
};

export default function CalorieCalculatorLayout({
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
