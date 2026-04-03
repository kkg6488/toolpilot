import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/tools/base64-encoder-decoder";

const title = "Base64 Encoder & Decoder — UTF-8 Safe | ToolPilot";
const description =
  "Encode and decode Base64 in the browser with correct UTF-8 handling. Copy results instantly. Nothing is uploaded.";

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
  name: "ToolPilot Base64 Encoder & Decoder",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description,
  url: `${siteUrl}${pagePath}`,
};

export default function Base64EncoderDecoderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
