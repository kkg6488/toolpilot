import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const siteUrl = "https://tool-pilot.in";
const pagePath = "/tools/cron-expression-builder";

export const metadata: Metadata = {
  title: "Cron Expression Builder — Generate Cron Jobs Visually | ToolPilot",
  description:
    "Build standard 5-field cron expressions visually: minute, hour, day, month, weekday. Human-readable summary, next run times, and presets — free cron expression builder.",
  keywords: [
    "cron expression builder",
    "cron generator",
    "crontab",
    "schedule builder",
    "cron job",
  ],
  openGraph: {
    title: "Cron Expression Builder — Generate Cron Jobs Visually | ToolPilot",
    description:
      "Visual cron builder with presets, plain-English descriptions, and next execution preview.",
    type: "website",
    url: `${siteUrl}${pagePath}`,
    siteName: "ToolPilot",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "ToolPilot Cron Expression Builder",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  description:
    "Generate and understand UNIX-style five-field cron schedules with next-run preview.",
  url: `${siteUrl}${pagePath}`,
};

export default function CronExpressionBuilderLayout({
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
