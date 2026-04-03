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
