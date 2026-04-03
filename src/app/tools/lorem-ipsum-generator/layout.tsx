import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/tools/lorem-ipsum-generator";

const title = "Lorem Ipsum Generator — Paragraphs & Word Count | ToolPilot";
const description =
  "Generate placeholder Lorem Ipsum text with configurable paragraphs and words per paragraph. Starts with the classic opening. Runs locally in your browser.";

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
  name: "ToolPilot Lorem Ipsum Generator",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description,
  url: `${siteUrl}${pagePath}`,
};

export default function LoremIpsumGeneratorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
