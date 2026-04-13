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
  "@graph": [
    {
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
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is the SIP calculator guaranteed to match my fund statement?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. NAV changes daily, loads/taxes may apply, and some SIPs debit at month-end. This SIP calculator uses a smooth assumed return for planning only.",
          },
        },
        {
          "@type": "Question",
          name: "What return should I enter in the SIP calculator?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Use a conservative long-term assumption (e.g. 8–12% for hybrid/equity blends) rather than recent bumper years.",
          },
        },
        {
          "@type": "Question",
          name: "Does this SIP calculator include tax on withdrawals?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It shows gross maturity value. LTCG/STCG rules for equity/debt funds apply at redemption and are not modeled here.",
          },
        },
      ],
    },
  ],
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
