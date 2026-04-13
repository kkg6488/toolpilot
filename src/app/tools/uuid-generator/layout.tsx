import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/tools/uuid-generator";

const title = "UUID v4 Generator — Bulk, Format Options | ToolPilot";
const description =
  "Generate cryptographically random UUID v4 identifiers in your browser. Choose count, case, and hyphen style. Copy one or all.";

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
      name: "ToolPilot UUID Generator",
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
          name: "What UUID version does this generate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "This tool generates version 4 UUIDs, which are randomly generated and suitable for most use cases requiring unique identifiers.",
          },
        },
        {
          "@type": "Question",
          name: "Are generated UUIDs truly unique?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "v4 UUIDs use 122 random bits, making collisions astronomically unlikely. They are safe for database keys, session IDs, and distributed systems.",
          },
        },
        {
          "@type": "Question",
          name: "Can I generate UUIDs in bulk?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. You can generate multiple UUIDs at once with options for uppercase, lowercase, and with or without hyphens.",
          },
        },
      ],
    },
  ],
};

export default function UuidGeneratorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
