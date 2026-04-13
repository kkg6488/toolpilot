import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/calculators/ppf-calculator";

export const metadata: Metadata = {
  title: "PPF Calculator — Maturity, Interest & Year-wise Growth | ToolPilot",
  description:
    "Free PPF calculator India: project Public Provident Fund maturity with annual compounding, yearly investment ₹500–₹1.5L, tenure 15–50 years & Indian rupees.",
  openGraph: {
    title: "PPF Calculator — Maturity, Interest & Year-wise Growth | ToolPilot",
    description:
      "Free PPF calculator India: project Public Provident Fund maturity with annual compounding, yearly investment ₹500–₹1.5L, tenure 15–50 years & Indian rupees.",
    type: "website",
    url: `${siteUrl}${pagePath}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ToolPilot PPF Calculator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
      },
      description:
        "Calculate PPF maturity value, total investment and interest with annual compounding for Indian investors.",
      url: `${siteUrl}${pagePath}`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is the current PPF interest rate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The PPF rate is set by the government quarterly. Check the latest rate on the RBI or post office website. This calculator lets you enter any rate.",
          },
        },
        {
          "@type": "Question",
          name: "What is the PPF lock-in period?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "PPF has a 15-year lock-in period with partial withdrawal allowed from the 7th year. Extensions are possible in blocks of 5 years.",
          },
        },
        {
          "@type": "Question",
          name: "Is PPF interest taxable?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. PPF enjoys EEE (Exempt-Exempt-Exempt) status—contributions qualify for Section 80C, and both interest and maturity are tax-free.",
          },
        },
      ],
    },
  ],
};

export default function PpfCalculatorLayout({
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
