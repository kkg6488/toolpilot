"use client";

import { useMemo, useState } from "react";

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

const RATES = [5, 12, 18, 28] as const;

export default function GstCalculatorPage() {
  const [amount, setAmount] = useState(10_000);
  const [rate, setRate] = useState<(typeof RATES)[number]>(18);
  const [mode, setMode] = useState<"exclusive" | "inclusive">("exclusive");

  const result = useMemo(() => {
    const a = Math.max(0, amount);
    const r = rate / 100;

    if (mode === "exclusive") {
      const base = a;
      const gst = base * r;
      const cgst = gst / 2;
      const sgst = gst / 2;
      const total = base + gst;
      return {
        original: base,
        gst,
        cgst,
        sgst,
        igst: gst,
        total,
        baseShare: total > 0 ? (base / total) * 100 : 100,
        gstShare: total > 0 ? (gst / total) * 100 : 0,
      };
    }

    const total = a;
    const base = total / (1 + r);
    const gst = total - base;
    const cgst = gst / 2;
    const sgst = gst / 2;
    return {
      original: base,
      gst,
      cgst,
      sgst,
      igst: gst,
      total,
      baseShare: total > 0 ? (base / total) * 100 : 100,
      gstShare: total > 0 ? (gst / total) * 100 : 0,
    };
  }, [amount, rate, mode]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          GST calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Add GST to a pre-tax amount or extract GST from a tax-inclusive price. CGST and SGST are
          shown as equal halves (typical intra-state display); IGST equals full GST for inter-state
          reference.
        </p>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Amount &amp; rate</h2>
          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="amt" className="block text-sm font-medium text-foreground">
                Amount (₹)
              </label>
              <input
                id="amt"
                type="number"
                min={0}
                step={0.01}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>
            <div>
              <span className="block text-sm font-medium text-foreground">GST rate</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {RATES.map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setRate(pct)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                      rate === pct
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="block text-sm font-medium text-foreground">Calculation type</span>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setMode("exclusive")}
                  className={`rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition ${
                    mode === "exclusive"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  <span className="block font-semibold">GST exclusive</span>
                  <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                    Amount is before GST — we add GST
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode("inclusive")}
                  className={`rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition ${
                    mode === "inclusive"
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  <span className="block font-semibold">GST inclusive</span>
                  <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                    Amount includes GST — we extract GST
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Results</h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-muted/50 p-4 sm:col-span-2">
              <dt className="text-sm font-medium text-muted-foreground">
                {mode === "exclusive" ? "Original amount (taxable value)" : "Taxable value (ex-GST)"}
              </dt>
              <dd className="mt-1 text-2xl font-bold text-foreground">
                {inr.format(result.original)}
              </dd>
            </div>
            <div className="rounded-lg bg-primary/10 p-4">
              <dt className="text-sm font-medium text-primary">GST amount (total)</dt>
              <dd className="mt-1 text-xl font-bold text-primary">{inr.format(result.gst)}</dd>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <dt className="text-sm font-medium text-muted-foreground">Total amount</dt>
              <dd className="mt-1 text-xl font-bold text-foreground">{inr.format(result.total)}</dd>
            </div>
          </dl>
          <div className="mt-6 rounded-lg border border-border bg-card p-4">
            <h3 className="text-sm font-semibold text-foreground">GST split</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex justify-between">
                <span>CGST ({rate / 2}%)</span>
                <span className="font-medium">{inr.format(result.cgst)}</span>
              </li>
              <li className="flex justify-between">
                <span>SGST ({rate / 2}%)</span>
                <span className="font-medium">{inr.format(result.sgst)}</span>
              </li>
              <li className="flex justify-between border-t border-border/60 pt-2">
                <span>IGST ({rate}% — inter-state)</span>
                <span className="font-medium">{inr.format(result.igst)}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-border bg-muted/80 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Taxable value vs GST</h2>
          <div className="mt-4 flex h-10 w-full overflow-hidden rounded-lg">
            <div
              className="flex items-center justify-center bg-primary text-xs font-medium text-white"
              style={{ width: `${result.baseShare}%` }}
            >
              {result.baseShare > 12 ? `${result.baseShare.toFixed(1)}%` : ""}
            </div>
            <div
              className="flex items-center justify-center bg-amber-500 text-xs font-medium text-white"
              style={{ width: `${result.gstShare}%` }}
            >
              {result.gstShare > 12 ? `${result.gstShare.toFixed(1)}%` : ""}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-6 text-sm">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-primary" />
              Taxable value {result.baseShare.toFixed(1)}%
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-amber-500" />
              GST {result.gstShare.toFixed(1)}%
            </span>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">How it works</h2>
          <p className="mt-2 text-muted-foreground">
            For <strong>GST exclusive</strong>, taxable value is your input; GST = value × (rate ÷
            100); total = value + GST. For <strong>GST inclusive</strong>, total is your input;
            taxable value = total ÷ (1 + rate); GST = total − value. CGST and SGST are each half of
            the total GST for a standard intra-state invoice layout; a single IGST line applies on
            inter-state supplies.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
          <div className="mt-4 space-y-2">
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Why does this GST calculator show both CGST/SGST and IGST?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Intra-state bills split tax into CGST + SGST. Inter-state uses IGST equal to their
                sum. We show both patterns so you can map amounts to common invoice formats.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Is 18% the only rate in this GST calculator?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                You can pick 5%, 12%, 18%, or 28%—the main slab rates. Some goods/services use
                nil/exempt or special rates not listed here.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                What is the difference between GST exclusive and inclusive?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Exclusive means your figure is before tax (add GST). Inclusive means your figure
                already contains GST (we back out taxable value and GST).
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Can I use this GST calculator for TCS or TDS?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                This tool handles GST arithmetic only. TCS on e-commerce and TDS under Section 194Q
                are separate; consult your CA for compliance.
              </p>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}
