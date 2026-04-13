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
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ToolPilot Percentage Calculator",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Calculate percentages, percentage increase/decrease, and ratios instantly.",
      url: `${siteUrl}${pagePath}`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the difference between percentage points and percent change?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Percentage points compare two percentages directly (e.g. 5% to 8% is a 3 percentage point rise). Percent change is relative to a starting value (here, from old to new numbers).",
          },
        },
        {
          "@type": "Question",
          name: 'Why can\'t the "whole" or "from" value be zero?',
          acceptedAnswer: {
            "@type": "Answer",
            text: "Dividing by zero is undefined. For \"X is what % of Y?\", Y must be non-zero. For percent change, the old value must be non-zero so the relative change is meaningful.",
          },
        },
        {
          "@type": "Question",
          name: "How do I increase a price by 10% then decrease it by 10%?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "They don't cancel out because the second step uses a new base. Example: 100 + 10% = 110; 110 − 10% = 99. Use this calculator twice, or chain the formulas manually.",
          },
        },
      ],
    },
  ],
};

export default function PercentageCalculatorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
