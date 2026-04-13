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
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ToolPilot Age Calculator",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Calculate your exact age in years, months, and days from your date of birth.",
      url: `${siteUrl}${pagePath}`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Why can my age in months and days look different from total days divided by 30?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Calendar months are not a fixed length. We show a true calendar difference (years, whole months, then remaining days), which will not always match a simple “days ÷ 30” estimate.",
          },
        },
        {
          "@type": "Question",
          name: "What happens if I was born on February 29?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "In non-leap years we treat your annual birthday as February 28 for the “next birthday” countdown, which matches how many official documents and celebrations handle leap-day births.",
          },
        },
        {
          "@type": "Question",
          name: 'Does changing "calculate age on" affect the countdown?',
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The next-birthday countdown is always measured from that reference date—useful for legal cutoffs, planning, or checking what your age was on a past date.",
          },
        },
      ],
    },
  ],
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
