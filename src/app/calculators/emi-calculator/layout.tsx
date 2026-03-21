import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/calculators/emi-calculator";

export const metadata: Metadata = {
  title: "EMI Calculator — Calculate Your Loan EMI Instantly | ToolPilot",
  description:
    "Free EMI calculator for India: compute monthly EMI, total interest & repayment on home, car & personal loans. Plan loans with accurate Indian rupee figures.",
  openGraph: {
    title: "EMI Calculator — Calculate Your Loan EMI Instantly | ToolPilot",
    description:
      "Free EMI calculator for India: compute monthly EMI, total interest & repayment on home, car & personal loans. Plan loans with accurate Indian rupee figures.",
    type: "website",
    url: `${siteUrl}${pagePath}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ToolPilot EMI Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  description:
    "Calculate loan EMI, total interest and total payment for Indian loans with instant results.",
  url: `${siteUrl}${pagePath}`,
};

export default function EmiCalculatorLayout({
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
