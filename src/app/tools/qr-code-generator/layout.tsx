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
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ToolPilot QR Code Generator",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Generate QR codes for URLs, text, email, phone numbers, and Wi-Fi networks.",
      url: `${siteUrl}${pagePath}`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What can I encode in a QR code?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can encode URLs, plain text, email addresses, phone numbers, and Wi-Fi network credentials.",
          },
        },
        {
          "@type": "Question",
          name: "Can I download the QR code?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Generated QR codes can be downloaded as PNG images for use in print or digital materials.",
          },
        },
        {
          "@type": "Question",
          name: "Is there a limit on QR code content?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "QR codes can hold up to about 4,296 alphanumeric characters, but shorter content produces cleaner, more scannable codes.",
          },
        },
      ],
    },
  ],
};

export default function QrCodeGeneratorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
