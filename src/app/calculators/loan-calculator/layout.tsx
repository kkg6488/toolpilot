import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/calculators/loan-calculator";

const title = "Loan Calculator — Monthly Payment & Amortization | ToolPilot";
const description =
  "Free generic loan calculator: enter amount, annual interest rate, and term in years or months. See monthly payment, total interest, total paid, amortization summary, and principal vs interest breakdown.";

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
      name: "ToolPilot Loan Calculator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
      },
      description:
        "Calculate fixed-rate loan payments, total interest, and amortization with principal and interest visualization.",
      url: `${siteUrl}${pagePath}`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What if my interest rate is 0%?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The tool splits the principal evenly across all payments: monthly payment = loan amount ÷ number of months. Total interest is zero.",
          },
        },
        {
          "@type": "Question",
          name: "Does this include fees or insurance?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Origination fees, escrow, credit insurance, and other add-ons are not modeled. Add those separately if your lender bundles them into the payment.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use this for variable-rate loans?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "This calculator assumes a fixed rate for the entire term. Variable or stepped rates need a schedule that changes when the rate resets.",
          },
        },
      ],
    },
  ],
};

export default function LoanCalculatorLayout({
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
