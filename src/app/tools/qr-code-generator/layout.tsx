import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/tools/qr-code-generator";

export const metadata: Metadata = {
  title: "QR Code Generator — Create Free QR Codes Online | ToolPilot",
  description:
    "Free online QR code generator. Create QR codes for URLs, text, email, phone numbers, and Wi-Fi. Download as PNG. No sign-up required.",
  openGraph: {
    title: "QR Code Generator — Create Free QR Codes Online | ToolPilot",
    description: "Create QR codes for URLs, text, email, and more. Download as PNG.",
    type: "website",
    url: `${siteUrl}${pagePath}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ToolPilot QR Code Generator",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Generate QR codes for URLs, text, email, phone numbers, and Wi-Fi networks.",
  url: `${siteUrl}${pagePath}`,
};

export default function QrCodeGeneratorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
