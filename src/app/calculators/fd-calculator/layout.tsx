import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/calculators/fd-calculator";

const title = "FD Calculator — Fixed Deposit Maturity & Interest | ToolPilot";
const description =
  "Free FD calculator India: compute fixed deposit maturity amount, total interest, and effective annual rate with quarterly, monthly, half-yearly, or yearly compounding.";

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
      name: "ToolPilot FD Calculator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
      },
      description:
        "Calculate fixed deposit maturity, interest earned, and effective annual yield using standard compound interest with configurable compounding frequency.",
      url: `${siteUrl}${pagePath}`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Does this match my bank's FD quote exactly?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Banks may use different day-counts, cut-off dates, and rounding. This tool is a planning estimate using the standard mathematical formula—not a binding quote.",
          },
        },
        {
          "@type": "Question",
          name: "What is effective annual rate (EAR)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "EAR is the annual growth rate you would earn if compounding happened once per year but produced the same end result as your bank's compounding frequency. It is higher than the nominal rate when compounding is more than yearly.",
          },
        },
        {
          "@type": "Question",
          name: "Is tax deducted at source (TDS) included?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Maturity and interest shown are before tax. FD interest may attract TDS and income tax as per your situation.",
          },
        },
      ],
    },
  ],
};

export default function FdCalculatorLayout({
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
