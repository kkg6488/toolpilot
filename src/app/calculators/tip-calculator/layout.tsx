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
  "@graph": [
    {
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
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Tip on pre-tax or post-tax amount?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "This calculator tips on the bill you enter. Some people tip on the subtotal before tax; others on the full ticket—use whichever you prefer.",
          },
        },
        {
          "@type": "Question",
          name: "Does this include sales tax?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Only if you type a bill that already includes tax. Add tax to the bill field first if that's your convention.",
          },
        },
        {
          "@type": "Question",
          name: "What about cash vs card rounding?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We show exact cents. Rounding to whole dollars for cash is up to you and the venue.",
          },
        },
      ],
    },
  ],
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
