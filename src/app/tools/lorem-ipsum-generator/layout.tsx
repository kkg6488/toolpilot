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
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ToolPilot Lorem Ipsum Generator",
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
          name: "What is Lorem Ipsum?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Lorem Ipsum is placeholder text used in design and typesetting since the 1500s. It helps visualise layouts without the distraction of meaningful content.",
          },
        },
        {
          "@type": "Question",
          name: "Can I control the length of generated text?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. You can adjust the number of paragraphs and the approximate length of each paragraph.",
          },
        },
        {
          "@type": "Question",
          name: "Does this use real Latin text?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The text is based on sections from Cicero's De Finibus Bonorum et Malorum, with some modifications from the traditional Lorem Ipsum corpus.",
          },
        },
      ],
    },
  ],
};

export default function LoremIpsumGeneratorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
