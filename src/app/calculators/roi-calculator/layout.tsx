import type { Metadata } from "next";
const siteUrl = "https://tool-pilot.in";
const pagePath = "/calculators/roi-calculator";
export const metadata: Metadata = {
  title: "ROI Calculator — Calculate Return on Investment | ToolPilot",
  description: "Free ROI calculator to compute return on investment, annualized ROI, and profit from initial and final values. Plan investments with instant results.",
  openGraph: { title: "ROI Calculator — Calculate Return on Investment | ToolPilot", description: "Free ROI calculator to compute return on investment, annualized ROI, and profit.", type: "website", url: `${siteUrl}${pagePath}` },
};
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ToolPilot ROI Calculator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Calculate return on investment, annualized ROI, and net profit from any investment.",
      url: `${siteUrl}${pagePath}`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is ROI and when should I use it?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Return on investment compares profit (or loss) to the original amount invested. Use simple ROI for a quick read on total performance; pair it with annualized ROI when you care how fast money grew over time.",
          },
        },
        {
          "@type": "Question",
          name: "How is annualized ROI different from simple ROI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Simple ROI ignores the holding period. Annualized ROI compresses the same gain or loss into an equivalent per-year compound rate, so you can compare investments held for different lengths of time more fairly.",
          },
        },
        {
          "@type": "Question",
          name: "Does this include dividends, fees, or taxes?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Only if you bake them into Initial and Final. Enter all-in cost basis for Initial and liquidation value after costs for Final if you want an after-fee view. Taxes are not modeled separately.",
          },
        },
      ],
    },
  ],
};
export default function RoiCalculatorLayout({ children }: { children: React.ReactNode }) {
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />{children}</>);
}
