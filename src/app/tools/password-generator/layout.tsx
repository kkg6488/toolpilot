import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/tools/password-generator";

export const metadata: Metadata = {
  title: "Password Generator — Generate Strong & Secure Passwords | ToolPilot",
  description:
    "Free online password generator. Create strong, random, secure passwords with customizable length, uppercase, lowercase, numbers, and symbols. Copy with one click.",
  openGraph: {
    title: "Password Generator — Generate Strong & Secure Passwords | ToolPilot",
    description: "Generate strong, random passwords with customizable options.",
    type: "website",
    url: `${siteUrl}${pagePath}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ToolPilot Password Generator",
  applicationCategory: "SecurityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Generate strong, random, secure passwords with customizable options.",
  url: `${siteUrl}${pagePath}`,
};

export default function PasswordGeneratorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
