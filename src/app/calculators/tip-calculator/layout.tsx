import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/calculators/tip-calculator";

export const metadata: Metadata = {
  title: "Tip Calculator — Split Bills & Calculate Tips | ToolPilot",
  description:
    "Quick US tip calculator: enter your bill, pick 10–25% or a custom tip, and split among up to 20 people. See tip amount, total, and per-person share instantly.",
  openGraph: {
    title: "Tip Calculator — Split Bills & Calculate Tips | ToolPilot",
    description:
      "Quick US tip calculator: enter your bill, pick 10–25% or a custom tip, and split among up to 20 people. See tip amount, total, and per-person share instantly.",
    type: "website",
    url: `${siteUrl}${pagePath}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ToolPilot Tip Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Calculate restaurant tips and split checks with preset percentages or a custom rate.",
  url: `${siteUrl}${pagePath}`,
};

export default function TipCalculatorLayout({
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
