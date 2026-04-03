import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/tools/hash-generator";

const title = "Hash Generator — MD5, SHA-1, SHA-256, SHA-512 | ToolPilot";
const description =
  "Compute MD5, SHA-1, SHA-256, and SHA-512 hashes from text in your browser using Web Crypto for SHA and a local MD5 implementation.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: `${siteUrl}${pagePath}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ToolPilot Hash Generator",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description,
  url: `${siteUrl}${pagePath}`,
};

export default function HashGeneratorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
