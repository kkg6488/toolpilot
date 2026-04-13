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
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ToolPilot Hash Generator",
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
          name: "What hash algorithms are supported?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The tool supports MD5, SHA-1, SHA-256, and SHA-512 digests computed entirely in the browser.",
          },
        },
        {
          "@type": "Question",
          name: "Is hashing the same as encryption?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Hashing is a one-way function — you cannot reverse a hash to get the original input. Encryption is reversible with the correct key.",
          },
        },
        {
          "@type": "Question",
          name: "Which hash algorithm should I use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "SHA-256 is recommended for most purposes. MD5 and SHA-1 are considered weak for security but are still used for checksums and non-security contexts.",
          },
        },
      ],
    },
  ],
};

export default function HashGeneratorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
