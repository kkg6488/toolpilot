import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/calculators/bmi-calculator";

export const metadata: Metadata = {
  title: "BMI Calculator — Check Your Body Mass Index | ToolPilot",
  description:
    "Free BMI calculator with metric and imperial units. Instantly see your BMI, category, and a visual scale for underweight, normal, overweight, and obese ranges.",
  openGraph: {
    title: "BMI Calculator — Check Your Body Mass Index | ToolPilot",
    description:
      "Free BMI calculator with metric and imperial units. Instantly see your BMI, category, and a visual scale for underweight, normal, overweight, and obese ranges.",
    type: "website",
    url: `${siteUrl}${pagePath}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ToolPilot BMI Calculator",
      applicationCategory: "HealthApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Compute Body Mass Index (BMI) from height and weight in metric or US customary units with category guidance.",
      url: `${siteUrl}${pagePath}`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is a healthy BMI range?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A BMI of 18.5–24.9 is generally considered normal weight. Below 18.5 is underweight, 25–29.9 is overweight, and 30+ is obese. These categories may vary by ethnicity and age.",
          },
        },
        {
          "@type": "Question",
          name: "Is BMI accurate for athletes?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "BMI does not distinguish muscle from fat. Athletes with high muscle mass may have a high BMI despite low body fat. Consider a body fat calculator for a more complete picture.",
          },
        },
        {
          "@type": "Question",
          name: "How is BMI calculated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "BMI = weight (kg) / height (m)². For pounds and inches: BMI = (weight × 703) / height².",
          },
        },
      ],
    },
  ],
};

export default function BmiCalculatorLayout({
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
