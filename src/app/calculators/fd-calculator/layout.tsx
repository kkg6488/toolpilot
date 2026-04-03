import type { Metadata } from "next";

const siteUrl = "https://tool-pilot.in";
const pagePath = "/calculators/fd-calculator";

const title = "FD Calculator — Fixed Deposit Maturity & Interest | ToolPilot";
const description =
  "Free FD calculator India: compute fixed deposit maturity amount, total interest, and effective annual rate with quarterly, monthly, half-yearly, or yearly compounding.";

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
  "@type": "WebApplication",
  name: "ToolPilot FD Calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  description:
    "Calculate fixed deposit maturity, interest earned, and effective annual yield using standard compound interest with configurable compounding frequency.",
  url: `${siteUrl}${pagePath}`,
};

export default function FdCalculatorLayout({
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
