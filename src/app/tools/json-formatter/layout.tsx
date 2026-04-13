import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const siteUrl = "https://tool-pilot.in";
const pagePath = "/tools/json-formatter";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator — Free Online Tool | ToolPilot",
  description:
    "Free JSON formatter and validator online. Pretty-print, minify, validate JSON with line errors, indent 2 or 4 spaces, and copy results — fast JSON formatter for developers.",
  keywords: [
    "JSON formatter",
    "JSON validator",
    "format JSON",
    "pretty print JSON",
    "minify JSON",
    "online JSON tool",
  ],
  openGraph: {
    title: "JSON Formatter & Validator — Free Online Tool | ToolPilot",
    description:
      "Pretty-print, minify, and validate JSON instantly. Indent control, syntax-highlighted output, and copy — a free JSON formatter for developers.",
    type: "website",
    url: `${siteUrl}${pagePath}`,
    siteName: "ToolPilot",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ToolPilot JSON Formatter & Validator",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Format, minify, and validate JSON online with syntax highlighting and configurable indentation.",
      url: `${siteUrl}${pagePath}`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is my JSON data sent to a server?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. All formatting and validation happens in your browser. Nothing is uploaded to ToolPilot servers.",
          },
        },
        {
          "@type": "Question",
          name: "What indent sizes are supported?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can choose between 2-space and 4-space indentation for pretty-printing, or minify to remove all whitespace.",
          },
        },
        {
          "@type": "Question",
          name: "Can this tool fix invalid JSON?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The tool validates and shows error locations (line and column) for invalid JSON, but it does not auto-fix syntax errors. You need to correct them manually.",
          },
        },
      ],
    },
  ],
};

export default function JsonFormatterLayout({
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
      <div className={jetbrainsMono.variable}>{children}</div>
    </>
  );
}
