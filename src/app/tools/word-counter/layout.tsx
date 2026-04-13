import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/tools/word-counter";

export const metadata: Metadata = {
  title: "Word Counter — Count Words, Characters & Sentences Online | ToolPilot",
  description:
    "Free online word counter. Paste or type text to instantly count words, characters (with/without spaces), sentences, paragraphs, and estimated reading time.",
  openGraph: {
    title: "Word Counter — Count Words, Characters & Sentences Online | ToolPilot",
    description:
      "Free online word counter with reading time estimation.",
    type: "website",
    url: `${siteUrl}${pagePath}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ToolPilot Word Counter",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Count words, characters, sentences, paragraphs, and reading time instantly.",
      url: `${siteUrl}${pagePath}`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How is reading time calculated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Reading time is estimated at approximately 200–250 words per minute, the average adult reading speed for non-technical content.",
          },
        },
        {
          "@type": "Question",
          name: "Does this count HTML tags as words?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Paste plain text for accurate counts. HTML tags would be counted as words if included in the input.",
          },
        },
        {
          "@type": "Question",
          name: "Is there a character limit?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "There is no hard limit. The tool processes text in the browser, so very large documents may slow down depending on your device.",
          },
        },
      ],
    },
  ],
};

export default function WordCounterLayout({
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
      {children}
    </>
  );
}
