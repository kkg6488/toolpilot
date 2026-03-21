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
