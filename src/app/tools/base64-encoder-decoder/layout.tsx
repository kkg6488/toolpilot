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
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ToolPilot Base64 Encoder & Decoder",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description,
      url: `${siteUrl}${pagePath}`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Base64 encoding?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Base64 converts binary data into ASCII text using 64 characters. It is commonly used for embedding images in CSS, encoding email attachments, and transmitting data in URLs.",
          },
        },
        {
          "@type": "Question",
          name: "Is Base64 encoding the same as encryption?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Base64 is an encoding scheme, not encryption. Anyone can decode Base64 data. Do not use it to protect sensitive information.",
          },
        },
        {
          "@type": "Question",
          name: "Does this tool handle UTF-8 text?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The encoder handles UTF-8 text safely, encoding multi-byte characters correctly.",
          },
        },
      ],
    },
  ],
};

export default function Base64EncoderDecoderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
