import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/calculators/compound-interest-calculator";

export const metadata: Metadata = {
  title: "Compound Interest Calculator — See Your Money Grow | ToolPilot",
  description:
    "Project future value with compound interest: initial investment, monthly contributions, rate, time, and compounding frequency. See total contributions vs interest earned.",
  openGraph: {
    title: "Compound Interest Calculator — See Your Money Grow | ToolPilot",
    description:
      "Project future value with compound interest: initial investment, monthly contributions, rate, time, and compounding frequency. See total contributions vs interest earned.",
    type: "website",
    url: `${siteUrl}${pagePath}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ToolPilot Compound Interest Calculator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Calculate future value with periodic compounding and regular contributions using standard compound growth formulas.",
      url: `${siteUrl}${pagePath}`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is daily compounding exactly how my bank works?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Institutions differ on day-count, posting dates, and tiers. This is a standard mathematical model for planning—not a specific product quote.",
          },
        },
        {
          "@type": "Question",
          name: "Why convert monthly deposits for quarterly compounding?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The closed-form formula needs one payment per compounding period. We use 3× your monthly amount per quarter as a simple aggregation; some accounts instead compound monthly on a running balance.",
          },
        },
        {
          "@type": "Question",
          name: "Does this include taxes or inflation?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Reported future value is nominal. After-tax returns and real purchasing power can be lower.",
          },
        },
      ],
    },
  ],
};

export default function CompoundInterestCalculatorLayout({
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
