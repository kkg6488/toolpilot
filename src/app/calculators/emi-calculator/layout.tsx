import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/calculators/emi-calculator";

export const metadata: Metadata = {
  title: "EMI Calculator — Calculate Your Loan EMI Instantly | ToolPilot",
  description:
    "Free EMI calculator for India: compute monthly EMI, total interest & repayment on home, car & personal loans. Plan loans with accurate Indian rupee figures.",
  openGraph: {
    title: "EMI Calculator — Calculate Your Loan EMI Instantly | ToolPilot",
    description:
      "Free EMI calculator for India: compute monthly EMI, total interest & repayment on home, car & personal loans. Plan loans with accurate Indian rupee figures.",
    type: "website",
    url: `${siteUrl}${pagePath}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ToolPilot EMI Calculator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
      },
      description:
        "Calculate loan EMI, total interest and total payment for Indian loans with instant results.",
      url: `${siteUrl}${pagePath}`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Does this EMI calculator match my bank's quote?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Banks may add processing fees, insurance, or daily/annual rest rules. This tool uses a standard monthly rest EMI formula—use it for planning; confirm final numbers with your lender.",
          },
        },
        {
          "@type": "Question",
          name: "What loan amounts does the EMI calculator support?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can enter principal from ₹1 lakh up to ₹5 crore, with tenure from 1–30 years or 12–360 months and interest between 1% and 30% per annum.",
          },
        },
        {
          "@type": "Question",
          name: "Why is total interest so high on long tenures?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Interest accrues on the outstanding balance each month. Longer tenure means you borrow the bank's money for more months, so total interest increases even if EMI is lower.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use this for home, car, and personal loans?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The same EMI formula applies to any fixed-rate loan amortised in equal monthly payments.",
          },
        },
      ],
    },
  ],
};

export default function EmiCalculatorLayout({
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
