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
