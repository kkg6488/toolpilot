import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/calculators/cgpa-to-percentage-calculator";

export const metadata: Metadata = {
  title: "CGPA to Percentage Calculator — CBSE, VTU, Anna & Mumbai | ToolPilot",
  description:
    "Convert CGPA to percentage for Indian boards and universities. Presets for CBSE (9.5), VTU (10), Anna University (10), and Mumbai University (7.1×CGPA+11). Custom multiplier, grade band, and reference table—instant, free.",
  openGraph: {
    title: "CGPA to Percentage Calculator — CBSE, VTU, Anna & Mumbai | ToolPilot",
    description:
      "CGPA to percentage with university presets, custom multiplier, grades, and a quick reference table for students.",
    type: "website",
    url: `${siteUrl}${pagePath}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ToolPilot CGPA to Percentage Calculator",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Convert CGPA on a 10-point scale to percentage using common Indian conversion rules and custom multipliers.",
      url: `${siteUrl}${pagePath}`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is CBSE CGPA always multiplied by 9.5?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Many students use ×9.5 for an approximate percentage from CGPA, but board and university rules change by year and program. Use this as a quick estimate and verify with official CBSE or school documents.",
          },
        },
        {
          "@type": "Question",
          name: "VTU says 10—why would I pick a different multiplier?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Some VTU documents equate SGPA/CGPA to percentage differently by regulation or scheme. If your marks card already lists percentage, prefer that; otherwise use the multiplier your department cites and cross-check.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use this for jobs and higher studies applications?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Employers and admissions offices often want the conversion method stated by your board or university. This calculator is a planning aid—attach official conversion notes or transcripts when it matters.",
          },
        },
      ],
    },
  ],
};

export default function CgpaToPercentageCalculatorLayout({
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
