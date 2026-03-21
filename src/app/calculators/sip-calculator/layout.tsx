import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/calculators/sip-calculator";

export const metadata: Metadata = {
  title: "SIP Calculator — Mutual Fund SIP Returns & Wealth Planner | ToolPilot",
  description:
    "Free SIP calculator India: estimate mutual fund SIP maturity, invested amount vs returns over 1–40 years. Plan monthly SIP with Indian rupee formatting.",
  openGraph: {
    title: "SIP Calculator — Mutual Fund SIP Returns & Wealth Planner | ToolPilot",
    description:
      "Free SIP calculator India: estimate mutual fund SIP maturity, invested amount vs returns over 1–40 years. Plan monthly SIP with Indian rupee formatting.",
    type: "website",
    url: `${siteUrl}${pagePath}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ToolPilot SIP Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  description:
    "Calculate SIP future value, invested amount and estimated returns for monthly mutual fund investments in India.",
  url: `${siteUrl}${pagePath}`,
};

export default function SipCalculatorLayout({
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
