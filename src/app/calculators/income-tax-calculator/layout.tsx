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
