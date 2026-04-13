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
  "@graph": [
    {
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
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What GST rates does this calculator support?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can select from standard Indian GST slabs: 5%, 12%, 18%, and 28%, or enter a custom rate.",
          },
        },
        {
          "@type": "Question",
          name: "Can I calculate GST-inclusive and GST-exclusive amounts?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. You can add GST to a base price or remove GST from a GST-inclusive price.",
          },
        },
        {
          "@type": "Question",
          name: "Is this calculator valid for IGST, CGST, and SGST?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The total GST amount is the same regardless of split. For intra-state sales, divide the total equally between CGST and SGST.",
          },
        },
      ],
    },
  ],
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
