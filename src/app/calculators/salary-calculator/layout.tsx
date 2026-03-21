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
