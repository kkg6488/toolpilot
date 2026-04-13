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
  "@graph": [
    {
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
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How accurate is Mifflin–St Jeor?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It is among the more accurate BMR estimates for many adults, but individual metabolism, genetics, medications, and lean mass still vary. Treat TDEE as a starting point and adjust based on weight trend over several weeks.",
          },
        },
        {
          "@type": "Question",
          name: "Why are my maintenance calories different from another app?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Apps may use different equations (e.g. Harris–Benedict), different activity labels, or round inputs differently. Small differences are normal; consistency with one method matters more than exact agreement across tools.",
          },
        },
        {
          "@type": "Question",
          name: "Is 2 g protein per kg right for everyone?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Many active people aim for roughly 1.6–2.2 g/kg for muscle retention; 2 g/kg is a simple rule of thumb. Older adults, kidney concerns, or specific diets may need different targets—ask a dietitian or doctor.",
          },
        },
      ],
    },
  ],
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
