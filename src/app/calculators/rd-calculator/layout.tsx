import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/calculators/rd-calculator";

export const metadata: Metadata = {
  title: "RD Calculator — Recurring Deposit Maturity Calculator | ToolPilot",
  description:
    "Free RD calculator for India: compute recurring deposit maturity amount, total interest earned, and deposits using quarterly compounding. Plan your savings with accurate results.",
  openGraph: {
    title: "RD Calculator — Recurring Deposit Maturity Calculator | ToolPilot",
    description:
      "Free RD calculator for India: compute recurring deposit maturity, total interest, and deposits with quarterly compounding.",
    type: "website",
    url: `${siteUrl}${pagePath}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ToolPilot RD Calculator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
      },
      description:
        "Calculate recurring deposit maturity amount, total interest, and deposits using Indian bank-style quarterly compounding.",
      url: `${siteUrl}${pagePath}`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is this exactly what SBI, HDFC, or ICICI will pay?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The structure matches the widely published Indian RD closed form with quarterly compounding. Individual banks may round instalments, dates, or use minor variant rules—use this as a close estimate, not a final passbook figure.",
          },
        },
        {
          "@type": "Question",
          name: "What about TDS and tax on RD interest?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "This calculator shows pre-tax maturity. RD interest may be subject to TDS and income tax depending on your profile and bank thresholds.",
          },
        },
        {
          "@type": "Question",
          name: "Can tenure be partial months or odd lengths?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We treat tenure as a whole number of months and set n = months / 3 (including fractional quarters), which aligns with common calculator implementations. Your bank may round quarters differently for very short tenures.",
          },
        },
      ],
    },
  ],
};

export default function RdCalculatorLayout({
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
