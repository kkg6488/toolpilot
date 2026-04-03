import type { Metadata } from "next";
const siteUrl = "https://tool-pilot.in";
const pagePath = "/calculators/roi-calculator";
export const metadata: Metadata = {
  title: "ROI Calculator — Calculate Return on Investment | ToolPilot",
  description: "Free ROI calculator to compute return on investment, annualized ROI, and profit from initial and final values. Plan investments with instant results.",
  openGraph: { title: "ROI Calculator — Calculate Return on Investment | ToolPilot", description: "Free ROI calculator to compute return on investment, annualized ROI, and profit.", type: "website", url: `${siteUrl}${pagePath}` },
};
const jsonLd = { "@context": "https://schema.org", "@type": "WebApplication", name: "ToolPilot ROI Calculator", applicationCategory: "FinanceApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, description: "Calculate return on investment, annualized ROI, and net profit from any investment.", url: `${siteUrl}${pagePath}` };
export default function RoiCalculatorLayout({ children }: { children: React.ReactNode }) {
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />{children}</>);
}
