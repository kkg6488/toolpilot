"use client";

import { useMemo, useState } from "react";

import { TrackPageView } from "@/components/shared/track-page-view";
import { RelatedSection } from "@/components/shared/related-items";
import { getRelatedCalculators } from "@/lib/related-items";
import { AdSlot } from "@/components/shared/ad-slot";

const num = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

const inputClass =
  "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20";

type Mode = "single" | "double";

export default function DiscountCalculatorPage() {
  const [mode, setMode] = useState<Mode>("single");
  const [original, setOriginal] = useState(199.99);
  const [discountPct, setDiscountPct] = useState(20);
  const [discount2Pct, setDiscount2Pct] = useState(10);
  const [taxPct, setTaxPct] = useState(8.25);
  const [applyTax, setApplyTax] = useState(false);

  const result = useMemo(() => {
    const price = Math.max(0, original);
    const d1 = Math.min(100, Math.max(0, discountPct));
    const d2 = Math.min(100, Math.max(0, discount2Pct));
    const tax = applyTax ? Math.min(100, Math.max(0, taxPct)) : 0;

    if (mode === "single") {
      const discountAmount = price * (d1 / 100);
      const afterDiscount = price - discountAmount;
      const taxAmount = afterDiscount * (tax / 100);
      const afterTax = afterDiscount + taxAmount;
      return {
        mode: "single" as const,
        discountAmount,
        afterDiscount,
        taxAmount,
        afterTax,
        totalOffFromOriginal: discountAmount,
        intermediateAfterFirst: null as number | null,
      };
    }

    const afterFirst = price * (1 - d1 / 100);
    const offSecond = afterFirst * (d2 / 100);
    const afterSecond = afterFirst - offSecond;
    const totalDiscountAmount = price - afterSecond;
    const taxAmount = afterSecond * (tax / 100);
    const afterTax = afterSecond + taxAmount;

    return {
      mode: "double" as const,
      discountAmount: totalDiscountAmount,
      afterDiscount: afterSecond,
      taxAmount,
      afterTax,
      totalOffFromOriginal: totalDiscountAmount,
      intermediateAfterFirst: afterFirst,
      firstStepOff: price - afterFirst,
      secondStepOff: offSecond,
    };
  }, [mode, original, discountPct, discount2Pct, taxPct, applyTax]);

  return (
    <div className="min-h-screen bg-background">
      <TrackPageView name="Discount Calculator" type="calculator" />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Discount calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Apply a percentage off the original price, optionally add tax on the discounted amount, or
          switch to double discount mode to chain two sequential reductions—common for stacked promotions.
        </p>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Mode</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {(["single", "double"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  mode === m
                    ? "bg-primary text-primary-foreground"
                    : "border border-input bg-card text-muted-foreground hover:border-primary/40"
                }`}
              >
                {m === "single" ? "Single discount" : "Double discount"}
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "double"
              ? "Second discount applies to the price after the first discount (not the original list price)."
              : "One discount percentage is taken from the original price."}
          </p>
        </div>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Inputs</h2>
          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="original" className="block text-sm font-medium text-foreground">
                Original price
              </label>
              <input
                id="original"
                type="number"
                min={0}
                step={0.01}
                value={original}
                onChange={(e) => setOriginal(Number(e.target.value) || 0)}
                className={`mt-1 ${inputClass}`}
              />
            </div>

            <div>
              <label htmlFor="disc1" className="block text-sm font-medium text-foreground">
                {mode === "double" ? "First discount (%)" : "Discount (%)"}
              </label>
              <input
                id="disc1"
                type="number"
                min={0}
                max={100}
                step={0.01}
                value={discountPct}
                onChange={(e) => setDiscountPct(Number(e.target.value) || 0)}
                className={`mt-1 ${inputClass}`}
              />
            </div>

            {mode === "double" && (
              <div>
                <label htmlFor="disc2" className="block text-sm font-medium text-foreground">
                  Second discount (%)
                </label>
                <input
                  id="disc2"
                  type="number"
                  min={0}
                  max={100}
                  step={0.01}
                  value={discount2Pct}
                  onChange={(e) => setDiscount2Pct(Number(e.target.value) || 0)}
                  className={`mt-1 ${inputClass}`}
                />
              </div>
            )}

            <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={applyTax}
                  onChange={(e) => setApplyTax(e.target.checked)}
                  className="h-4 w-4 rounded border-input text-primary focus:ring-ring/20"
                />
                <span className="text-sm font-medium text-foreground">Apply tax on discounted price</span>
              </label>
              {applyTax && (
                <div className="mt-4">
                  <label htmlFor="tax" className="block text-sm font-medium text-foreground">
                    Tax rate (%)
                  </label>
                  <input
                    id="tax"
                    type="number"
                    min={0}
                    max={100}
                    step={0.01}
                    value={taxPct}
                    onChange={(e) => setTaxPct(Number(e.target.value) || 0)}
                    className={`mt-1 ${inputClass}`}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Results</h2>
          <dl className="mt-6 space-y-4">
            {result.mode === "double" && result.intermediateAfterFirst !== null && (
              <div className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
                <p>
                  After first discount ({num.format(discountPct)}%):{" "}
                  <span className="font-semibold text-foreground">
                    {num.format(result.intermediateAfterFirst)}
                  </span>
                </p>
                <p className="mt-1">
                  Off from original (first step): {num.format(result.firstStepOff ?? 0)}
                </p>
                <p className="mt-1">
                  Off from intermediate (second step): {num.format(result.secondStepOff ?? 0)}
                </p>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-primary/10 p-4">
                <dt className="text-sm font-medium text-primary">Total discount amount</dt>
                <dd className="mt-1 text-2xl font-bold text-primary">
                  {num.format(result.discountAmount)}
                </dd>
                <dd className="mt-1 text-xs text-primary/80">Versus original list price</dd>
              </div>
              <div className="rounded-lg bg-muted/50 p-4">
                <dt className="text-sm font-medium text-muted-foreground">Final price after discount</dt>
                <dd className="mt-1 text-xl font-bold text-foreground">
                  {num.format(result.afterDiscount)}
                </dd>
              </div>
            </div>

            <div className="rounded-lg bg-primary/10 p-4 sm:col-span-2">
              <dt className="text-sm font-medium text-primary">
                Final price after tax{applyTax ? "" : " (no tax)"}
              </dt>
              <dd className="mt-1 text-2xl font-bold text-primary">{num.format(result.afterTax)}</dd>
              {applyTax && (
                <dd className="mt-2 text-sm text-primary/90">Tax portion: {num.format(result.taxAmount)}</dd>
              )}
            </div>
          </dl>
        </div>

        <div className="mt-8">
          <AdSlot slot="calc-mid" format="horizontal" className="mx-auto" />
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">How it works</h2>
          <p className="mt-2 text-muted-foreground">
            <strong className="font-medium text-foreground">Single discount:</strong> discount amount =
            original × (discount ÷ 100). Final after discount = original − discount amount.{" "}
            <strong className="font-medium text-foreground">Tax:</strong> when enabled, tax is applied
            to the discounted subtotal only: tax = after discount × (tax rate ÷ 100), and final with tax =
            after discount + tax. <strong className="font-medium text-foreground">Double discount:</strong>{" "}
            first reduce the list price by the first percentage; then apply the second percentage to that
            new amount—not to the original price. That is why two 50% offs do not make the item free.
            Numbers are formatted with commas and up to two decimal places, without a currency symbol, so
            you can read them in any currency.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
          <div className="mt-4 space-y-2">
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Is tax calculated before or after the discount?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Tax uses the post-discount price as the base. If your jurisdiction taxes the pre-discount
                amount, adjust outside this tool or enter numbers that match your receipt rules.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Why is “20% + 10% off” not the same as 30% off?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Sequential discounts multiply remaining price by (1 − each rate). Thirty percent off the
                original is a single step. Stacked promos almost always apply in order on the running
                price.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Can I enter more than two discounts?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                This page supports one or two chained percentages. For three or more, multiply by each{" "}
                <span className="font-mono text-xs">(1 − p/100)</span> factor in order, or use the single
                mode repeatedly by hand.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Does this include shipping or fees?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                No. Add shipping, service fees, and rounding from the retailer separately. This calculator
                only handles list price, percentage discounts, and optional simple tax on the discounted
                subtotal.
              </p>
            </details>
          </div>
        </section>

        <div className="mt-8">
          <AdSlot slot="calc-bottom" format="rectangle" className="mx-auto" />
        </div>

        <RelatedSection items={getRelatedCalculators("discount-calculator")} />
      </div>
    </div>
  );
}
