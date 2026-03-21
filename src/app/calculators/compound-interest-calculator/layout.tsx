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
