import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatNumber,
  generateAllConversionSlugs,
  getQuickTable,
  getRelatedConversions,
  parseConversionSlug,
  type ConversionPair,
} from "@/lib/unit-conversions";
import { TrackPageView } from "@/components/shared/track-page-view";
import { AdSlot } from "@/components/shared/ad-slot";

type PageProps = {
  params: { slug: string };
};

function pluralUnitName(value: number, unit: string): string {
  if (value === 1) return unit;
  if (unit.includes(" per ")) {
    const [first, ...rest] = unit.split(" per ");
    return `${pluralUnitName(2, first)} per ${rest.join(" per ")}`;
  }
  if (unit === "Foot") return "Feet";
  if (unit === "Inch") return "Inches";
  if (unit === "Gallon (US)") return "Gallons (US)";
  if (unit === "Cup (US)") return "Cups (US)";
  if (unit === "Square Foot") return "Square Feet";
  if (unit === "Square Meter") return "Square Meters";
  return `${unit}s`;
}

function quantityForPlural(n: number): number {
  return Math.abs(n - 1) < 1e-9 ? 1 : 2;
}

function conversionHeadline(value: number, pair: ConversionPair): string {
  return `${formatNumber(value)} ${pair.fromSymbol} to ${pair.toSymbol}`;
}

function buildTitle(value: number, pair: ConversionPair): string {
  const result = pair.convert(value);
  const head = conversionHeadline(value, pair);
  const fromPart = pluralUnitName(value, pair.fromUnit);
  const toPart = pluralUnitName(quantityForPlural(result), pair.toUnit);
  return `${head} — ${formatNumber(value)} ${fromPart} in ${toPart}`;
}

function buildDescription(value: number, pair: ConversionPair, result: number): string {
  const fromLower = pluralUnitName(value, pair.fromUnit).toLowerCase();
  const toLower = pluralUnitName(quantityForPlural(result), pair.toUnit).toLowerCase();
  return `${formatNumber(value)} ${pair.fromSymbol} equals ${formatNumber(result)} ${pair.toSymbol}. Convert ${fromLower} to ${toLower} with our free converter. See the formula, quick reference table, and related conversions.`;
}

export function generateStaticParams() {
  return generateAllConversionSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const parsed = parseConversionSlug(params.slug);
  if (!parsed) notFound();
  const { value, pair } = parsed;
  const result = pair.convert(value);
  const slug = params.slug;
  const url = `https://tool-pilot.in/convert/${slug}`;
  const title = buildTitle(value, pair);
  const description = buildDescription(value, pair, result);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "website",
      siteName: "ToolPilot",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/convert/${slug}`,
    },
  };
}

function faqAnswers(value: number, pair: ConversionPair, result: number) {
  const fromPlural = pluralUnitName(value, pair.fromUnit).toLowerCase();
  const toPlural = pluralUnitName(quantityForPlural(result), pair.toUnit).toLowerCase();

  const q1 = `How many ${toPlural} are in ${formatNumber(value)} ${fromPlural}?`;
  const a1 = `${formatNumber(value)} ${pair.fromSymbol} equals ${formatNumber(result)} ${pair.toSymbol}. Use the formula (${pair.formula}) to convert any value.`;

  const q2 = `What is the formula to convert ${pair.fromUnit} to ${pair.toUnit}?`;
  const a2 = `To convert ${pair.fromUnit.toLowerCase()} to ${pair.toUnit.toLowerCase()}, ${pair.formula}. This page applies that formula to ${formatNumber(value)} ${pair.fromSymbol}.`;

  const q3 = `Is ${formatNumber(value)} ${pair.fromSymbol} a lot in ${pair.toSymbol}?`;
  const a3 = `Whether ${formatNumber(value)} ${pair.fromSymbol} is "a lot" depends on context (${pair.category}). As a reference, it converts to about ${formatNumber(result)} ${pair.toSymbol}.`;

  const q4 = `How accurate is this ${pair.fromUnit} to ${pair.toUnit} conversion?`;
  const a4 = `We use standard conversion factors for ${pair.category.toLowerCase()} measurements. Results are suitable for everyday use; for scientific or legal work, verify against official standards.`;

  return [
    { q: q1, a: a1 },
    { q: q2, a: a2 },
    { q: q3, a: a3 },
    { q: q4, a: a4 },
  ];
}

export default function ConversionPage({ params }: PageProps) {
  const parsed = parseConversionSlug(params.slug);
  if (!parsed) {
    notFound();
  }

  const { value, pair } = parsed;
  const result = pair.convert(value);
  const quickRows = getQuickTable(pair);
  const related = getRelatedConversions(pair, value);
  const breadcrumbLabel = conversionHeadline(value, pair);
  const faqs = faqAnswers(value, pair, result);

  const url = `https://tool-pilot.in/convert/${params.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "ToolPilot — Unit converter",
        url,
        description: buildDescription(value, pair, result),
        applicationCategory: "UtilityApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://tool-pilot.in" },
          { "@type": "ListItem", position: 2, name: "Convert", item: "https://tool-pilot.in/convert" },
          { "@type": "ListItem", position: 3, name: breadcrumbLabel, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <TrackPageView name={`Convert ${pair.fromSymbol} to ${pair.toSymbol}`} type="conversion" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="text-primary hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/convert" className="text-primary hover:underline">
                Convert
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground">{breadcrumbLabel}</li>
          </ol>
        </nav>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {breadcrumbLabel}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Instant {pair.category.toLowerCase()} conversion: {pair.fromUnit} to {pair.toUnit}.
        </p>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-8 shadow-md">
          <p className="text-4xl font-bold text-primary">
            {formatNumber(value)} {pair.fromSymbol} = {formatNumber(result)} {pair.toSymbol}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Formula:</span> {pair.formula}
          </p>
          <p className="mt-3 text-muted-foreground">{pair.explanation}</p>
        </div>

        <section className="mt-10" aria-labelledby="quick-table-heading">
          <h2 id="quick-table-heading" className="text-xl font-semibold text-foreground">
            Quick reference
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Common values for {pair.fromUnit} → {pair.toUnit}.
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[280px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-3 text-left font-medium text-foreground">
                    {pair.fromSymbol}
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-foreground">
                    {pair.toSymbol}
                  </th>
                </tr>
              </thead>
              <tbody>
                {quickRows.map((row, i) => (
                  <tr
                    key={row.value}
                    className={`border-b border-border last:border-b-0 ${
                      i % 2 === 1 ? "bg-muted/30" : ""
                    }`}
                  >
                    <td className="px-4 py-3 text-foreground">{formatNumber(row.value)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-xl font-semibold text-foreground">
            Related conversions
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/convert/${item.slug}`}
                  className="block rounded-lg border border-border bg-card p-3 text-sm text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-xl font-semibold text-foreground">
            Frequently asked questions
          </h2>
          <div className="mt-4 space-y-3">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group border border-border bg-card rounded-lg p-4"
              >
                <summary className="cursor-pointer list-none font-medium text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="group-open:text-primary">{item.q}</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-10">
          <AdSlot slot="conversion-bottom" format="horizontal" className="mx-auto" />
        </div>
      </div>
    </div>
  );
}
