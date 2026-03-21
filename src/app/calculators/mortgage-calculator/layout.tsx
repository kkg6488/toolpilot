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
