import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/calculators/hra-calculator";

export const metadata: Metadata = {
  title: "HRA Exemption Calculator — Metro & Non-Metro Tax Savings | ToolPilot",
  description:
    "Free HRA exemption calculator India: compute exempt vs taxable HRA under Section 10(13A)—metro 50%, non-metro 40%, rent less 10% salary rule in Indian rupees.",
  openGraph: {
    title: "HRA Exemption Calculator — Metro & Non-Metro Tax Savings | ToolPilot",
    description:
      "Free HRA exemption calculator India: compute exempt vs taxable HRA under Section 10(13A)—metro 50%, non-metro 40%, rent less 10% salary rule in Indian rupees.",
    type: "website",
    url: `${siteUrl}${pagePath}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ToolPilot HRA Exemption Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  description:
    "Calculate HRA tax exemption and taxable HRA for salaried employees in Indian metro and non-metro cities.",
  url: `${siteUrl}${pagePath}`,
};

export default function HraCalculatorLayout({
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
