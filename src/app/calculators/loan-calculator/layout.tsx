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
