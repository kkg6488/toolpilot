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
  "@graph": [
    {
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
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How are color palettes generated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Palettes are generated using color theory harmonies (complementary, analogous, triadic, etc.) from your chosen base color.",
          },
        },
        {
          "@type": "Question",
          name: "Can I export the palette?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. You can copy individual hex codes or the full palette for use in your CSS, design tools, or brand guidelines.",
          },
        },
        {
          "@type": "Question",
          name: "What color formats are supported?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The generator works with hex color codes and displays results in hex format, which is compatible with CSS, Figma, and most design tools.",
          },
        },
      ],
    },
  ],
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
