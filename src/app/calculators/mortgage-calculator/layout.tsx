import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/calculators/mortgage-calculator";

export const metadata: Metadata = {
  title: "Mortgage Calculator — Calculate Your Monthly Home Payment | ToolPilot",
  description:
    "Free US mortgage calculator: estimate monthly payment with principal & interest, property tax, and insurance. See total interest, total cost, and payment breakdown.",
  openGraph: {
    title: "Mortgage Calculator — Calculate Your Monthly Home Payment | ToolPilot",
    description:
      "Free US mortgage calculator: estimate monthly payment with principal & interest, property tax, and insurance. See total interest, total cost, and payment breakdown.",
    type: "website",
    url: `${siteUrl}${pagePath}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ToolPilot Mortgage Calculator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Calculate US mortgage payments including P&I, property tax, and homeowners insurance with amortization-style results.",
      url: `${siteUrl}${pagePath}`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How is mortgage payment calculated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The mortgage calculator uses the standard amortization formula: M = P × [r(1+r)^n] / [(1+r)^n – 1], where P is principal, r is monthly rate, and n is total payments.",
          },
        },
        {
          "@type": "Question",
          name: "Does this include taxes and insurance?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "This calculator computes principal and interest only. Property taxes, homeowner's insurance, and PMI are additional costs to budget separately.",
          },
        },
        {
          "@type": "Question",
          name: "Should I choose a 15-year or 30-year mortgage?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A 15-year mortgage has higher monthly payments but much less total interest. A 30-year has lower payments but costs more over the life of the loan. Use this calculator to compare both.",
          },
        },
      ],
    },
  ],
};

export default function MortgageCalculatorLayout({
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
