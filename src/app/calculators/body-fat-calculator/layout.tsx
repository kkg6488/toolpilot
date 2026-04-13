import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/calculators/body-fat-calculator";

const title = "Body Fat Calculator — US Navy Method | ToolPilot";
const description =
  "Estimate body fat percentage with the US Navy method using height, waist, neck, and hip (women). See fat mass, lean mass, and category in metric or imperial units.";

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
      name: "ToolPilot Body Fat Calculator",
      applicationCategory: "HealthApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "US Navy body fat estimation from circumference measurements; supports cm and inches with fat mass, lean mass, and fitness categories.",
      url: `${siteUrl}${pagePath}`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How accurate is the US Navy method?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It correlates reasonably with lab methods for many people but can be off if measurements are inconsistent, if you are very muscular, or if body shape differs from the populations used to build the equations.",
          },
        },
        {
          "@type": "Question",
          name: "Where exactly should I measure?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Waist is at the navel with a horizontal tape; neck is just below the larynx, sloping slightly down. Hip (women) is the widest part of the hips/buttocks. Keep the tape snug but not compressing skin.",
          },
        },
        {
          "@type": "Question",
          name: "Why must waist be larger than neck (men)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The male formula uses log₁₀(waist − neck). If waist ≤ neck, the math is invalid or meaningless—usually a sign of wrong units or mis-measurement.",
          },
        },
      ],
    },
  ],
};

export default function BodyFatCalculatorLayout({
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
