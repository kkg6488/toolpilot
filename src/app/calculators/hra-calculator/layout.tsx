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
  "@graph": [
    {
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
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Which cities count as metro for this HRA exemption calculator?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Typically Delhi, Mumbai, Chennai, and Kolkata use the 50% rule; others use 40%. Employer policies and notifications can vary—verify your city classification.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need rent receipts for HRA exemption?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Employers usually ask for rent receipts and may require landlord PAN above threshold limits. This HRA exemption calculator does not check documentation.",
          },
        },
        {
          "@type": "Question",
          name: "What if I pay no rent—can any HRA be exempt?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Condition (3) becomes zero, so exemption is limited by the minimum of actual HRA, percentage of salary, and zero—often resulting in no exemption if you are not renting.",
          },
        },
      ],
    },
  ],
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
