import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/calculators/salary-calculator";

export const metadata: Metadata = {
  title: "Salary Calculator — Convert Between Pay Periods | ToolPilot",
  description:
    "Convert US salary between hourly, daily, weekly, biweekly, monthly, and annual pay. Includes a simplified federal income tax estimate for take-home planning.",
  openGraph: {
    title: "Salary Calculator — Convert Between Pay Periods | ToolPilot",
    description:
      "Convert US salary between hourly, daily, weekly, biweekly, monthly, and annual pay. Includes a simplified federal income tax estimate for take-home planning.",
    type: "website",
    url: `${siteUrl}${pagePath}`,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "ToolPilot Salary Calculator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Translate wages across pay periods and view a rough US federal tax estimate for single filers.",
      url: `${siteUrl}${pagePath}`,
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Why doesn't take-home match my paycheck?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Real checks include Social Security and Medicare (FICA), state and local tax, pre-tax benefits, retirement deferrals, and withholding allowances. We only model a simplified federal income tax.",
          },
        },
        {
          "@type": "Question",
          name: 'How is "daily" defined?',
          acceptedAnswer: {
            "@type": "Answer",
            text: "We spread annual pay evenly across 365 calendar days. Some employers quote 260 working days instead—that would increase the daily figure.",
          },
        },
        {
          "@type": "Question",
          name: "What if I'm married or head of household?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Brackets and standard deductions differ by filing status. This tool assumes single filer for the rough tax estimate.",
          },
        },
      ],
    },
  ],
};

export default function SalaryCalculatorLayout({
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
