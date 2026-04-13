import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/tools/timestamp-converter";

const title = "Unix Timestamp Converter — ISO, Local & UTC | ToolPilot";
const description =
  "Convert between Unix seconds, milliseconds, ISO 8601, and readable dates. See the current time updating live. All processing happens in your browser.";

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
      name: "ToolPilot Timestamp Converter",
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
          name: "What timestamp formats are supported?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can convert Unix timestamps in seconds or milliseconds, ISO 8601 strings, and human-readable date formats.",
          },
        },
        {
          "@type": "Question",
          name: "Does the converter account for time zones?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The tool shows both UTC and your local time zone. You can see the offset and convert between them.",
          },
        },
        {
          "@type": "Question",
          name: "What is a Unix timestamp?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A Unix timestamp is the number of seconds elapsed since January 1, 1970 00:00:00 UTC. It is widely used in programming and databases.",
          },
        },
      ],
    },
  ],
};

export default function TimestampConverterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
