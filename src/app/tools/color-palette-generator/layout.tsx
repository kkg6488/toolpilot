import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const siteUrl = "https://tool-pilot.in";
const pagePath = "/tools/color-palette-generator";

export const metadata: Metadata = {
  title: "Color Palette Generator — Create Beautiful Color Schemes | ToolPilot",
  description:
    "Generate harmonious 5-color palettes with HSL math: random, analogous, complementary, triadic, and monochromatic modes. Copy HEX, RGB, HSL; lock swatches; export CSS variables or Tailwind config.",
  keywords: [
    "color palette generator",
    "color scheme",
    "harmonious colors",
    "HSL palette",
    "Tailwind colors",
  ],
  openGraph: {
    title: "Color Palette Generator — Create Beautiful Color Schemes | ToolPilot",
    description:
      "Build beautiful palettes with lockable swatches, multiple harmony modes, and one-click export to CSS or Tailwind.",
    type: "website",
    url: `${siteUrl}${pagePath}`,
    siteName: "ToolPilot",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ToolPilot Color Palette Generator",
  applicationCategory: "DesignApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Create harmonious color palettes with export to CSS variables and Tailwind configuration.",
  url: `${siteUrl}${pagePath}`,
};

export default function ColorPaletteGeneratorLayout({
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
