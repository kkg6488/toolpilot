import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  percentValues,
  ofValues,
  parsePercentageSlug,
  generateAllPercentageSlugs,
  formatNumber,
  getRelatedPercentages,
  getPercentageTable,
} from "@/lib/percentage-data";
import { TrackPageView } from "@/components/shared/track-page-view";
import { AdSlot } from "@/components/shared/ad-slot";

const SITE = "https://tool-pilot.in";

function getValidPair(slug: string): { percent: number; of: number } | null {
  const parsed = parsePercentageSlug(slug);
  if (!parsed) return null;
  if (!percentValues.includes(parsed.percent) || !ofValues.includes(parsed.of)) return null;
  return parsed;
}

export function generateStaticParams() {
  return generateAllPercentageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const pair = getValidPair(params.slug);
  if (!pair) notFound();
  const { percent, of } = pair;
  const result = (percent / 100) * of;
  const title = `What is ${percent}% of ${formatNumber(of)}? Answer: ${formatNumber(result)} | ToolPilot`;
  const description = `${percent}% of ${formatNumber(of)} is ${formatNumber(result)}. Learn how to calculate ${percent} percent of ${formatNumber(of)} with the formula, step-by-step explanation, and a complete percentage reference table.`;
  const url = `${SITE}/percentage/${params.slug}`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "ToolPilot",
      type: "article",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function PercentageSlugPage({ params }: { params: { slug: string } }) {
  const pair = getValidPair(params.slug);
  if (!pair) notFound();

  const { percent, of } = pair;
  const result = (percent / 100) * of;
  const decimal = percent / 100;
  const decimalDisplay = decimal.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  });
  const tableRows = getPercentageTable(of);
  const related = getRelatedPercentages(percent, of);
  const url = `${SITE}/percentage/${params.slug}`;

  const faqItems = [
    {
      q: `What is ${percent}% of ${formatNumber(of)}?`,
      a: `${percent}% of ${formatNumber(of)} is ${formatNumber(result)}. You find it by converting ${percent}% to a decimal (${decimalDisplay}) and multiplying by ${formatNumber(of)}.`,
    },
    {
      q: `How do I calculate ${percent} percent of ${formatNumber(of)}?`,
      a: `Divide ${percent} by 100 to get the decimal form, then multiply that decimal by ${formatNumber(of)}. So (${percent} ÷ 100) × ${formatNumber(of)} = ${formatNumber(result)}.`,
    },
    {
      q: "What is the formula for percentage?",
      a: "To find X% of Y, use (X ÷ 100) × Y. The result is the portion of Y that corresponds to X percent.",
    },
    {
      q: `Why is ${formatNumber(result)} equal to ${percent}% of ${formatNumber(of)}?`,
      a: `Because ${percent}% means ${percent} parts per hundred. Taking that fraction of ${formatNumber(of)} gives (${percent}/100) × ${formatNumber(of)} = ${formatNumber(result)}.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: `What is ${percent}% of ${formatNumber(of)}?`,
        description: `${percent}% of ${formatNumber(of)} is ${formatNumber(result)}. Step-by-step percentage calculation and reference table.`,
        isPartOf: { "@type": "WebSite", name: "ToolPilot", url: SITE },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Percentage", item: `${SITE}/percentage` },
          {
            "@type": "ListItem",
            position: 3,
            name: `${percent}% of ${formatNumber(of)}`,
            item: url,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <TrackPageView name={`${percent}% of ${formatNumber(of)}`} type="conversion" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>

        <nav className="mt-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="text-primary hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/percentage" className="text-primary hover:underline">
                Percentage
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-muted-foreground">
              {percent}% of {formatNumber(of)}
            </li>
          </ol>
        </nav>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          What is {percent}% of {formatNumber(of)}?
        </h1>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-8 shadow-md">
          <p className="text-sm font-medium text-primary">Answer</p>
          <p className="mt-2 text-4xl font-bold text-primary">
            {percent}% of {formatNumber(of)} = {formatNumber(result)}
          </p>

          <div className="mt-8 space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Step-by-step</h2>
            <div className="rounded-lg bg-muted/50 p-4 text-foreground">
              <p>
                <span className="font-medium text-foreground">Step 1:</span> Convert {percent}% to a
                decimal: {percent} ÷ 100 = {decimalDisplay}
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4 text-foreground">
              <p>
                <span className="font-medium text-foreground">Step 2:</span> Multiply by{" "}
                {formatNumber(of)}: {decimalDisplay} × {formatNumber(of)} = {formatNumber(result)}
              </p>
            </div>
          </div>
        </div>

        <section className="mt-10" aria-labelledby="percentage-table-heading">
          <h2 id="percentage-table-heading" className="text-xl font-semibold text-foreground">
            Percentage reference for {formatNumber(of)}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Common percentages of the same base number for quick comparison.
          </p>
          <div className="mt-4 overflow-x-auto rounded-lg border border-border">
            <table className="w-full min-w-[280px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30 text-left">
                  <th className="p-3 font-semibold text-foreground">Percent</th>
                  <th className="p-3 font-semibold text-foreground">Result</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => {
                  const isCurrent = row.percent === percent;
                  return (
                    <tr
                      key={row.percent}
                      className={`border-b border-border last:border-b-0 ${
                        isCurrent ? "bg-primary/10" : i % 2 === 0 ? "bg-muted/30" : "bg-transparent"
                      }`}
                    >
                      <td className="p-3 text-foreground">
                        {isCurrent ? (
                          <span className="font-semibold">{row.percent}%</span>
                        ) : (
                          <Link
                            href={`/percentage/${row.percent}-percent-of-${of}`}
                            className="text-primary hover:underline"
                          >
                            {row.percent}%
                          </Link>
                        )}
                      </td>
                      <td className="p-3 text-foreground">{row.result}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-xl font-semibold text-foreground">
            Related calculations
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/percentage/${item.slug}`}
                  className="block rounded-lg border border-border bg-card p-3 text-sm text-foreground hover:border-primary/40"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10" aria-labelledby="how-it-works-heading">
          <h2 id="how-it-works-heading" className="text-xl font-semibold text-foreground">
            How it works
          </h2>
          <div className="mt-3 rounded-lg border border-border bg-card p-4 text-foreground">
            <p className="text-sm leading-relaxed text-muted-foreground">
              A percentage expresses a number as parts per hundred. To find X% of Y, convert the
              percent to a decimal by dividing X by 100, then multiply by Y. That single rule covers
              discounts, tips, tax portions, and any &quot;what is X percent of Y&quot; problem.
            </p>
          </div>
        </section>

        <section className="mt-10" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-xl font-semibold text-foreground">
            Frequently asked questions
          </h2>
          <ul className="mt-4 space-y-3">
            {faqItems.map((item) => (
              <li
                key={item.q}
                className="rounded-lg border border-border bg-card p-4"
              >
                <p className="font-medium text-foreground">{item.q}</p>
                <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10">
          <AdSlot slot="percentage-bottom" format="horizontal" className="mx-auto" />
        </div>
      </div>
    </div>
  );
}
