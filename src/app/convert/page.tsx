"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  conversionPairs,
  findPair,
  formatNumber,
  getQuickTable,
  type ConversionPair,
} from "@/lib/unit-conversions";
import { ArrowLeftRight } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

const CATEGORIES = [
  "Weight",
  "Length",
  "Temperature",
  "Volume",
  "Area",
  "Speed",
  "Digital Storage",
] as const;

const POPULAR_CONVERSIONS: { slug: string; label: string }[] = [
  { slug: "100-kg-to-lbs", label: "100 kg to lbs" },
  { slug: "5-miles-to-km", label: "5 miles to km" },
  { slug: "100-celsius-to-fahrenheit", label: "100 celsius to fahrenheit" },
  { slug: "1-liters-to-gallons", label: "1 liter to gallons" },
  { slug: "10-sqm-to-sqft", label: "10 m² to ft²" },
  { slug: "60-kmh-to-mph", label: "60 km/h to mph" },
  { slug: "1024-mb-to-gb", label: "1024 MB to GB" },
  { slug: "32-fahrenheit-to-celsius", label: "32 °F to °C" },
  { slug: "50-kg-to-lbs", label: "50 kg to lbs" },
  { slug: "10-km-to-miles", label: "10 km to miles" },
  { slug: "212-fahrenheit-to-celsius", label: "212 fahrenheit to celsius" },
  { slug: "5-gallons-to-liters", label: "5 gallons to liters" },
];

function pairsForCategory(category: string): ConversionPair[] {
  return conversionPairs.filter((p) => p.category === category);
}

function orderedFromSlugs(pairs: ConversionPair[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const p of pairs) {
    if (!seen.has(p.fromSlug)) {
      seen.add(p.fromSlug);
      out.push(p.fromSlug);
    }
  }
  return out;
}

function fromLabel(pairs: ConversionPair[], slug: string): string {
  const p = pairs.find((x) => x.fromSlug === slug);
  return p ? `${p.fromUnit} (${p.fromSymbol})` : slug;
}

function toLabel(pair: ConversionPair): string {
  return `${pair.toUnit} (${pair.toSymbol})`;
}

export default function ConvertPage() {
  const [category, setCategory] = useState<string>("Weight");
  const [fromSlug, setFromSlug] = useState("kg");
  const [toSlug, setToSlug] = useState("lbs");
  const [amountStr, setAmountStr] = useState("1");

  const pairsInCategory = useMemo(() => pairsForCategory(category), [category]);
  const fromSlugs = useMemo(() => orderedFromSlugs(pairsInCategory), [pairsInCategory]);
  const toPairs = useMemo(
    () => pairsInCategory.filter((p) => p.fromSlug === fromSlug),
    [pairsInCategory, fromSlug]
  );

  useEffect(() => {
    if (!toPairs.some((p) => p.toSlug === toSlug)) {
      const next = toPairs[0]?.toSlug;
      if (next) setToSlug(next);
    }
  }, [toPairs, toSlug]);

  const pair = findPair(fromSlug, toSlug);
  const amount = parseFloat(amountStr.replace(/,/g, ""));
  const numericAmount = Number.isFinite(amount) ? amount : 0;
  const converted = pair ? pair.convert(numericAmount) : null;
  const resultText =
    converted != null && Number.isFinite(converted) ? formatNumber(converted) : "—";

  const quickRows = pair ? getQuickTable(pair) : [];

  const handleCategoryChange = useCallback((cat: string) => {
    setCategory(cat);
    const next = pairsForCategory(cat);
    const first = next[0];
    if (first) {
      setFromSlug(first.fromSlug);
      setToSlug(first.toSlug);
    }
  }, []);

  const swap = useCallback(() => {
    const reversed = findPair(toSlug, fromSlug);
    if (reversed) {
      setFromSlug(toSlug);
      setToSlug(fromSlug);
    }
  }, [fromSlug, toSlug]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Unit converter
        </h1>
        <p className="mt-2 text-muted-foreground">
          Convert between metric and US customary units across weight, length, temperature, volume,
          area, speed, and digital storage. Pick a category, choose units, and enter a value.
        </p>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Convert</h2>
          <p className="mt-1 text-sm text-muted-foreground">Select a category, then your units.</p>

          <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Conversion category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={category === cat}
                onClick={() => handleCategoryChange(cat)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  category === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="convert-from" className="block text-sm font-medium text-foreground">
                From
              </label>
              <select
                id="convert-from"
                value={fromSlug}
                onChange={(e) => setFromSlug(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              >
                {fromSlugs.map((slug) => (
                  <option key={slug} value={slug}>
                    {fromLabel(pairsInCategory, slug)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="convert-to" className="block text-sm font-medium text-foreground">
                To
              </label>
              <select
                id="convert-to"
                value={toSlug}
                onChange={(e) => setToSlug(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              >
                {toPairs.map((p) => (
                  <option key={p.toSlug} value={p.toSlug}>
                    {toLabel(p)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label htmlFor="convert-value" className="block text-sm font-medium text-foreground">
                Value
              </label>
              <input
                id="convert-value"
                type="text"
                inputMode="decimal"
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                placeholder="0"
              />
            </div>
            <button
              type="button"
              onClick={swap}
              disabled={!findPair(toSlug, fromSlug)}
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-border bg-muted px-4 text-sm font-medium text-foreground transition hover:bg-muted/80 disabled:pointer-events-none disabled:opacity-40"
              aria-label="Swap from and to units"
            >
              <ArrowLeftRight className="h-4 w-4" />
              Swap
            </button>
          </div>

          {pair && (
            <div className="mt-6 rounded-lg bg-primary/10 p-6">
              <p className="text-sm font-medium text-muted-foreground">Result</p>
              <p className="mt-2 text-3xl font-bold text-primary">
                {resultText}{" "}
                <span className="text-xl font-semibold text-primary/90">{pair.toSymbol}</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {formatNumber(numericAmount)} {pair.fromSymbol} → {resultText} {pair.toSymbol}
              </p>
            </div>
          )}
        </div>

        <section className="mt-12" aria-labelledby="popular-heading">
          <h2 id="popular-heading" className="text-xl font-semibold text-foreground">
            Popular conversions
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Open a pre-filled conversion page you can bookmark or share.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {POPULAR_CONVERSIONS.map(({ slug, label }) => (
              <Link
                key={slug}
                href={`/convert/${slug}`}
                className="rounded-lg border border-border bg-card p-3 text-sm font-medium text-foreground transition hover:border-primary/40"
              >
                {label}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="all-conversions-heading">
          <h2 id="all-conversions-heading" className="text-xl font-semibold text-foreground">
            All conversions by category
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse every available conversion across all categories.
          </p>
          {CATEGORIES.map((cat) => {
            const catPairs = conversionPairs.filter((p) => p.category === cat);
            const seen = new Set<string>();
            const uniquePairs = catPairs.filter((p) => {
              const key = `${p.fromSlug}-${p.toSlug}`;
              if (seen.has(key)) return false;
              seen.add(key);
              return true;
            });
            return (
              <div key={cat} className="mt-6">
                <h3 className="text-lg font-medium text-foreground">{cat}</h3>
                <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {uniquePairs.flatMap((p) =>
                    [1, 5, 10, 50, 100].map((v) => {
                      const slug = `${v}-${p.fromSlug}-to-${p.toSlug}`;
                      return (
                        <Link
                          key={slug}
                          href={`/convert/${slug}`}
                          className="rounded-md border border-border/60 bg-card px-3 py-2 text-sm text-foreground transition hover:border-primary/40 hover:text-primary"
                        >
                          {v} {p.fromSymbol} to {p.toSymbol}
                        </Link>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </section>

        {pair && (
          <section className="mt-12" aria-labelledby="quick-ref-heading">
            <h2 id="quick-ref-heading" className="text-xl font-semibold text-foreground">
              Quick reference
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Common values for {pair.fromUnit} to {pair.toUnit} ({pair.formula}).
            </p>
            <div className="mt-4 overflow-x-auto rounded-xl border border-border/60">
              <table className="w-full min-w-[280px] text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50 text-left">
                    <th className="px-4 py-3 font-semibold text-foreground">
                      {pair.fromSymbol}
                    </th>
                    <th className="px-4 py-3 font-semibold text-foreground">{pair.toSymbol}</th>
                  </tr>
                </thead>
                <tbody>
                  {quickRows.map((row) => (
                    <tr key={row.value} className="border-b border-border/60 last:border-0">
                      <td className="px-4 py-2.5 text-foreground">{formatNumber(row.value)}</td>
                      <td className="px-4 py-2.5 font-medium text-foreground">{row.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <section className="mt-12" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-xl font-semibold text-foreground">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="mt-4 w-full">
            <AccordionItem value="q1">
              <AccordionTrigger className="text-left text-foreground">
                Why do US gallons differ from UK (imperial) gallons?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                The US liquid gallon is defined as 231 cubic inches (about 3.785 L). The imperial
                gallon used in the UK is larger (about 4.546 L). ToolPilot uses US gallons for
                liter↔gallon conversions, which matches most US recipes and fuel economy labels.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger className="text-left text-foreground">
                Are temperature conversions exact?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Celsius ↔ Fahrenheit formulas are exact: °F = (°C × 9/5) + 32 and °C = (°F − 32) ×
                5/9. Celsius to Kelvin is K = °C + 273.15. Small floating-point rounding may appear
                in displayed decimals but does not affect practical use.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger className="text-left text-foreground">
                Why is 1 KB sometimes 1000 bytes and sometimes 1024?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Storage marketing often uses decimal (1000-based) kilo/mega/giga. Operating systems
                and memory traditionally use binary prefixes (1024). This converter uses 1024 between
                MB, GB, and TB, which matches how many people estimate file and RAM sizes.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4">
              <AccordionTrigger className="text-left text-foreground">
                How precise are weight and length conversions?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Values use widely accepted conversion factors (for example, the international inch
                of exactly 2.54 cm). For science, engineering, or legal metrology, confirm against
                official standards; for everyday use, the results here are more than accurate enough.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </div>
  );
}
