import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/tools/password-generator";

export const metadata: Metadata = {
  title: "Password Generator — Generate Strong & Secure Passwords | ToolPilot",
  description:
    "Free online password generator. Create strong, random, secure passwords with customizable length, uppercase, lowercase, numbers, and symbols. Copy with one click.",
  openGraph: {
    title: "Password Generator — Generate Strong & Secure Passwords | ToolPilot",
    description: "Generate strong, random passwords with customizable options.",
    type: "website",
    url: `${siteUrl}${pagePath}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ToolPilot Password Generator",
      applicationCategory: "SecurityApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "Generate strong, random, secure passwords with customizable options.",
      url: `${siteUrl}${pagePath}`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is it safe to generate passwords in the browser?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "This tool runs entirely on your device. Random bytes come from the browser's cryptographic API, and the password is not uploaded to any server.",
          },
        },
        {
          "@type": "Question",
          name: "How long should my password be?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For general web accounts, aim for at least 12–16 random characters with mixed character types. Higher-value accounts deserve longer secrets or hardware-backed factors.",
          },
        },
        {
          "@type": "Question",
          name: "Should I reuse passwords across sites?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. When one service is breached, reused passwords let attackers try the same login elsewhere. Unique passwords contain the blast radius.",
          },
        },
      ],
    },
  ],
};

export default function PasswordGeneratorLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
