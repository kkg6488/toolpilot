import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/calculators/gst-calculator";

export const metadata: Metadata = {
  title: "GST Calculator — CGST, SGST, IGST & Inclusive/Exclusive | ToolPilot",
  description:
    "Free GST calculator India: add or extract 5%, 12%, 18%, 28% GST. View CGST/SGST split, totals & base amount in Indian Rupees—instant, accurate results.",
  openGraph: {
    title: "GST Calculator — CGST, SGST, IGST & Inclusive/Exclusive | ToolPilot",
    description:
      "Free GST calculator India: add or extract 5%, 12%, 18%, 28% GST. View CGST/SGST split, totals & base amount in Indian Rupees—instant, accurate results.",
    type: "website",
    url: `${siteUrl}${pagePath}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ToolPilot GST Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  description:
    "Calculate GST inclusive and exclusive amounts with CGST and SGST split for Indian tax planning.",
  url: `${siteUrl}${pagePath}`,
};

export default function GstCalculatorLayout({
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
