import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const siteUrl = "https://tool-pilot.in";
const pagePath = "/tools/regex-tester";

export const metadata: Metadata = {
  title: "Regex Tester — Test Regular Expressions Online | ToolPilot",
  description:
    "Test JavaScript regular expressions live: flags g, i, m, s, highlighted matches, capture groups, replacement preview, and quick patterns for email, URL, phone, IP, and dates.",
  keywords: [
    "regex tester",
    "regular expression",
    "test regex online",
    "JavaScript regex",
    "pattern matcher",
  ],
  openGraph: {
    title: "Regex Tester — Test Regular Expressions Online | ToolPilot",
    description:
      "Real-time regex matching with highlights, groups, and replace — free online regex tester for developers.",
    type: "website",
    url: `${siteUrl}${pagePath}`,
    siteName: "ToolPilot",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ToolPilot Regex Tester",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Test and debug regular expressions with live highlighting, match details, and replacement output.",
  url: `${siteUrl}${pagePath}`,
};

export default function RegexTesterLayout({
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
