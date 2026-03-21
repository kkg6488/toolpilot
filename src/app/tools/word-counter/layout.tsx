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
  "@type": "WebApplication",
  name: "ToolPilot Word Counter",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "Count words, characters, sentences, paragraphs, and reading time instantly.",
  url: `${siteUrl}${pagePath}`,
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
