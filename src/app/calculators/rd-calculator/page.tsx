"use client";

import { useMemo, useState } from "react";

import { TrackPageView } from "@/components/shared/track-page-view";
import { RelatedSection } from "@/components/shared/related-items";
import { getRelatedCalculators } from "@/lib/related-items";
import { AdSlot } from "@/components/shared/ad-slot";

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/**
 * Indian RD maturity with quarterly compounding on monthly instalments.
 * i = annual_rate / 400 (quarterly rate), n = tenure in months / 3 (quarters).
 * M = R × [ (1+i)^n − 1 ] / [ 1 − (1+i)^(−1/3) ]
 */
function rdMaturityIndian(
  monthly: number,
  annualRatePct: number,
  tenureMonths: number
): { maturity: number; totalDeposits: number; interest: number } {
  const R = monthly;
  const m = Math.max(1, Math.min(600, tenureMonths));
  const i = annualRatePct / 400;
  const n = m / 3;
  const totalDeposits = R * m;

  if (Math.abs(i) < 1e-14) {
    return { maturity: totalDeposits, totalDeposits, interest: 0 };
  }

  const onePlus = 1 + i;
  const numerator = Math.pow(onePlus, n) - 1;
  const denominator = 1 - Math.pow(onePlus, -1 / 3);

  if (Math.abs(denominator) < 1e-14) {
    return { maturity: totalDeposits, totalDeposits, interest: 0 };
  }

  const maturity = R * (numerator / denominator);
  const interest = Math.max(0, maturity - totalDeposits);

  return { maturity, totalDeposits, interest };
}

export default function RdCalculatorPage() {
  const [monthly, setMonthly] = useState(5_000);
  const [annualRatePct, setAnnualRatePct] = useState(6.5);
  const [tenureMonths, setTenureMonths] = useState(24);

  const result = useMemo(() => {
    const R = Math.min(10_00_000, Math.max(100, monthly));
    const rate = Math.min(20, Math.max(0, annualRatePct));
    const months = Math.min(600, Math.max(1, tenureMonths));
    const { maturity, totalDeposits, interest } = rdMaturityIndian(R, rate, months);
    const depPct = maturity > 0 ? (totalDeposits / maturity) * 100 : 50;
    const intPct = maturity > 0 ? (interest / maturity) * 100 : 50;
    return { maturity, totalDeposits, interest, depPct, intPct };
  }, [monthly, annualRatePct, tenureMonths]);

  return (
    <div className="min-h-screen bg-background">
      <TrackPageView name="RD Calculator" type="calculator" />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          RD calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Estimate recurring deposit maturity in India using the usual bank formula: monthly
          instalments, interest compounded quarterly (<em>i = r / 400</em>), and tenure in months.
        </p>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Inputs</h2>
          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="rd-pmt" className="block text-sm font-medium text-foreground">
                Monthly deposit (₹100 – ₹10 Lakh)
              </label>
              <input
                id="rd-pmt"
                type="number"
                min={100}
                max={10_00_000}
                value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
              <p className="mt-1 text-xs text-muted-foreground">{inr.format(monthly)}/month</p>
            </div>
            <div>
              <label htmlFor="rd-rate" className="block text-sm font-medium text-foreground">
                Interest rate (% p.a., quarterly compounding)
              </label>
              <input
                id="rd-rate"
                type="number"
                min={0}
                max={20}
                step={0.05}
                value={annualRatePct}
                onChange={(e) => setAnnualRatePct(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>
            <div>
              <label htmlFor="rd-months" className="block text-sm font-medium text-foreground">
                Tenure (months, 1 – 600)
              </label>
              <input
                id="rd-months"
                type="number"
                min={1}
                max={600}
                value={tenureMonths}
                onChange={(e) => setTenureMonths(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Results</h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-primary/10 p-4 sm:col-span-3 sm:p-6">
              <dt className="text-sm font-medium text-primary">Maturity amount</dt>
              <dd className="mt-1 text-2xl font-bold text-primary">
                {inr.format(result.maturity)}
              </dd>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <dt className="text-sm font-medium text-muted-foreground">Total deposits</dt>
              <dd className="mt-1 text-xl font-bold text-foreground">
                {inr.format(result.totalDeposits)}
              </dd>
            </div>
            <div className="rounded-lg bg-muted/50 p-4 sm:col-span-2">
              <dt className="text-sm font-medium text-muted-foreground">Total interest earned</dt>
              <dd className="mt-1 text-xl font-bold text-foreground">
                {inr.format(result.interest)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-8">
          <AdSlot slot="calc-mid" format="horizontal" className="mx-auto" />
        </div>

        <div className="mt-8 rounded-xl border border-border bg-muted/80 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Deposits vs interest</h2>
          <p className="mt-1 text-sm text-muted-foreground">Share of maturity amount</p>
          <div className="mt-6 flex h-10 w-full overflow-hidden rounded-lg">
            <div
              className="flex items-center justify-center bg-primary text-xs font-medium text-primary-foreground"
              style={{ width: `${result.depPct}%` }}
            >
              {result.depPct > 12 ? `${result.depPct.toFixed(1)}%` : ""}
            </div>
            <div
              className="flex items-center justify-center bg-muted-foreground text-xs font-medium text-primary-foreground"
              style={{ width: `${result.intPct}%` }}
            >
              {result.intPct > 12 ? `${result.intPct.toFixed(1)}%` : ""}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-6 text-sm">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-primary" />
              Deposits {result.depPct.toFixed(1)}%
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-muted-foreground" />
              Interest {result.intPct.toFixed(1)}%
            </span>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">How it works</h2>
          <p className="mt-2 text-muted-foreground">
            Indian banks typically compound RD interest quarterly while you pay monthly. With{" "}
            <em>R</em> as the monthly instalment, annual rate <em>r</em> in percent, quarterly rate{" "}
            <span className="font-mono text-sm">i = r / 400</span>, and{" "}
            <span className="font-mono text-sm">n</span> as tenure in quarters{" "}
            <span className="font-mono text-sm">(months ÷ 3)</span>, maturity is:
          </p>
          <p className="mt-2 font-mono text-sm text-muted-foreground">
            M = R × [ (1+i)<sup>n</sup> − 1 ] / [ 1 − (1+i)<sup>−1/3</sup> ]
          </p>
          <p className="mt-2 text-muted-foreground">
            Total deposits equal <span className="font-mono text-sm">R × months</span>. Interest is{" "}
            <span className="font-mono text-sm">M −</span> total deposits. At 0% rate, maturity
            equals your deposits.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
          <div className="mt-4 space-y-2">
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Is this exactly what SBI, HDFC, or ICICI will pay?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                The structure matches the widely published Indian RD closed form with quarterly
                compounding. Individual banks may round instalments, dates, or use minor variant
                rules—use this as a close estimate, not a final passbook figure.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Why is there a (1+i)<sup>−1/3</sup> in the denominator?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Monthly payments fall at different points inside each quarter. The standard formula
                bundles that pattern into one expression so you do not need a month-by-month loop.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                What about TDS and tax on RD interest?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                This calculator shows pre-tax maturity. RD interest may be subject to TDS and income
                tax depending on your profile and bank thresholds.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Can tenure be partial months or odd lengths?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                We treat tenure as a whole number of months and set{" "}
                <span className="font-mono text-sm">n = months / 3</span> (including fractional
                quarters), which aligns with common calculator implementations. Your bank may round
                quarters differently for very short tenures.
              </p>
            </details>
          </div>
        </section>

        <div className="mt-8">
          <AdSlot slot="calc-bottom" format="rectangle" className="mx-auto" />
        </div>

        <RelatedSection items={getRelatedCalculators("rd-calculator")} />
      </div>
    </div>
  );
}
