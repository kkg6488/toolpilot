import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/calculators/income-tax-calculator";

export const metadata: Metadata = {
  title: "Income Tax Calculator — Old vs New Regime (FY 2025-26) | ToolPilot",
  description:
    "Free India income tax calculator for FY 2025-26: compare Old and New tax regimes, slabs, 4% Health & Education Cess, effective tax rate, and savings in Indian Rupees.",
  openGraph: {
    title: "Income Tax Calculator — Old vs New Regime (FY 2025-26) | ToolPilot",
    description:
      "Free India income tax calculator for FY 2025-26: compare Old and New tax regimes, slabs, 4% Health & Education Cess, effective tax rate, and savings in Indian Rupees.",
    type: "website",
    url: `${siteUrl}${pagePath}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ToolPilot Income Tax Calculator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
      },
      description:
        "Compare Old and New income tax regimes for India FY 2025-26 with cess and effective tax rate.",
      url: `${siteUrl}${pagePath}`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Does this match the tax on my Form 16 or e-filing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "This tool uses slab math and 4% cess only on full gross income. It does not apply standard deduction, rebate under 87A, Chapter VI-A deductions (80C, 80D, etc.), or surcharge. Use it for quick regime comparison; file using official rules or a CA.",
          },
        },
        {
          "@type": "Question",
          name: "What is the difference between the Old and New tax regimes?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Old regime typically allows more deductions but uses older slab rates. The New regime offers revised slabs (including wider nil-rate bands in recent budgets) with fewer deductions. You can choose each year in many cases, subject to conditions.",
          },
        },
        {
          "@type": "Question",
          name: "What is Health and Education Cess?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It is an additional levy calculated as a percentage of your income tax (not your income). This calculator uses 4% on the tax computed from slabs, as commonly applied for individual taxpayers.",
          },
        },
      ],
    },
  ],
};

export default function IncomeTaxCalculatorLayout({
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
