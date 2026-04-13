import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const siteUrl = "https://tool-pilot.in";
const pagePath = "/tools/privacy-policy-generator";

export const metadata: Metadata = {
  title: "Privacy Policy Generator — Create Free Privacy Policy | ToolPilot",
  description:
    "Generate a professional privacy policy from a simple form: business type, data collected, third parties, cookies, GDPR and CCPA. Copy or download as .txt — free privacy policy generator.",
  keywords: [
    "privacy policy generator",
    "free privacy policy",
    "GDPR privacy policy",
    "CCPA policy",
    "website privacy policy",
  ],
  openGraph: {
    title: "Privacy Policy Generator — Create Free Privacy Policy | ToolPilot",
    description:
      "Step-by-step privacy policy builder with GDPR/CCPA sections, third-party disclosures, and instant download.",
    type: "website",
    url: `${siteUrl}${pagePath}`,
    siteName: "ToolPilot",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ToolPilot Privacy Policy Generator",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Create customizable privacy policy text for websites, apps, and SaaS with compliance-oriented sections.",
      url: `${siteUrl}${pagePath}`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is the generated privacy policy legally binding?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The generator creates a template based on common practices. You should review it with a legal professional to ensure compliance with applicable laws like GDPR or CCPA.",
          },
        },
        {
          "@type": "Question",
          name: "Can I customise the generated policy?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The output is a fully editable template. Modify it to match your specific data practices, jurisdiction, and business requirements.",
          },
        },
        {
          "@type": "Question",
          name: "Does this tool store my information?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. All generation happens in your browser. Your inputs are not stored or transmitted to any server.",
          },
        },
      ],
    },
  ],
};

export default function PrivacyPolicyGeneratorLayout({
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
      <div className={jetbrainsMono.variable}>{children}</div>
    </>
  );
}
