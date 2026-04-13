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

type Compounding = "monthly" | "quarterly" | "half-yearly" | "yearly";

const COMPOUND: Record<Compounding, { n: number; label: string }> = {
  monthly: { n: 12, label: "Monthly" },
  quarterly: { n: 4, label: "Quarterly" },
  "half-yearly": { n: 2, label: "Half-yearly" },
  yearly: { n: 1, label: "Yearly" },
};

export default function FdCalculatorPage() {
  const [principal, setPrincipal] = useState(5_00_000);
  const [annualRatePct, setAnnualRatePct] = useState(7);
  const [tenureValue, setTenureValue] = useState(3);
  const [tenureUnit, setTenureUnit] = useState<"years" | "months">("years");
  const [compounding, setCompounding] = useState<Compounding>("quarterly");

  const result = useMemo(() => {
    const P = Math.min(10_00_00_000, Math.max(1, principal));
    const rAnnual = Math.min(25, Math.max(0, annualRatePct)) / 100;
    const rawTenure =
      tenureUnit === "years"
        ? Math.min(40, Math.max(0.083333, tenureValue))
        : Math.min(480, Math.max(1, tenureValue));
    const tYears = tenureUnit === "years" ? rawTenure : rawTenure / 12;
    const { n } = COMPOUND[compounding];
    const i = rAnnual / n;
    const periods = n * tYears;

    let maturity: number;
    if (Math.abs(i) < 1e-15) {
      maturity = P;
    } else {
      maturity = P * Math.pow(1 + i, periods);
    }

    const totalInterest = Math.max(0, maturity - P);
    const earDecimal =
      Math.abs(i) < 1e-15 ? 0 : Math.pow(1 + i, n) - 1;
    const earPct = earDecimal * 100;
    const principalPct = maturity > 0 ? (P / maturity) * 100 : 50;
    const interestPct = maturity > 0 ? (totalInterest / maturity) * 100 : 50;

    return {
      maturity,
      totalInterest,
      earPct,
      principal: P,
      principalPct,
      interestPct,
    };
  }, [principal, annualRatePct, tenureValue, tenureUnit, compounding]);

  return (
    <div className="min-h-screen bg-background">
      <TrackPageView name="FD Calculator" type="calculator" />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          FD calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Estimate fixed deposit maturity using compound interest: principal, annual rate, tenure,
          and how often interest is compounded. See maturity, interest earned, and effective annual
          rate (EAR).
        </p>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Inputs</h2>
          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="fd-p" className="block text-sm font-medium text-foreground">
                Principal amount (₹1 – ₹10 Cr)
              </label>
              <input
                id="fd-p"
                type="number"
                min={1}
                max={10_00_00_000}
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
              <p className="mt-1 text-xs text-muted-foreground">{inr.format(principal)}</p>
            </div>
            <div>
              <label htmlFor="fd-rate" className="block text-sm font-medium text-foreground">
                Interest rate (% p.a.)
              </label>
              <input
                id="fd-rate"
                type="number"
                min={0}
                max={25}
                step={0.05}
                value={annualRatePct}
                onChange={(e) => setAnnualRatePct(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="fd-tenure" className="block text-sm font-medium text-foreground">
                  Tenure {tenureUnit === "years" ? "(0.08 – 40 years)" : "(1 – 480 months)"}
                </label>
                <input
                  id="fd-tenure"
                  type="number"
                  min={tenureUnit === "years" ? 0.083333 : 1}
                  max={tenureUnit === "years" ? 40 : 480}
                  step={tenureUnit === "years" ? 0.25 : 1}
                  value={tenureValue}
                  onChange={(e) => setTenureValue(Number(e.target.value) || 0)}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
              <div>
                <label htmlFor="fd-tenure-unit" className="block text-sm font-medium text-foreground">
                  Tenure unit
                </label>
                <select
                  id="fd-tenure-unit"
                  value={tenureUnit}
                  onChange={(e) => setTenureUnit(e.target.value as "years" | "months")}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                >
                  <option value="years">Years</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="fd-comp" className="block text-sm font-medium text-foreground">
                Compounding frequency
              </label>
              <select
                id="fd-comp"
                value={compounding}
                onChange={(e) => setCompounding(e.target.value as Compounding)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              >
                {(Object.keys(COMPOUND) as Compounding[]).map((k) => (
                  <option key={k} value={k}>
                    {COMPOUND[k].label}
                  </option>
                ))}
              </select>
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
              <dt className="text-sm font-medium text-muted-foreground">Total interest earned</dt>
              <dd className="mt-1 text-xl font-bold text-foreground">
                {inr.format(result.totalInterest)}
              </dd>
            </div>
            <div className="rounded-lg bg-muted/50 p-4 sm:col-span-2">
              <dt className="text-sm font-medium text-muted-foreground">
                Effective annual rate (EAR)
              </dt>
              <dd className="mt-1 text-xl font-bold text-foreground">
                {result.earPct.toFixed(2)}% p.a.
              </dd>
              <p className="mt-1 text-xs text-muted-foreground">
                Equivalent yearly growth from compounding at the stated nominal rate.
              </p>
            </div>
          </dl>
        </div>

        <div className="mt-8">
          <AdSlot slot="calc-mid" format="horizontal" className="mx-auto" />
        </div>

        <div className="mt-8 rounded-xl border border-border bg-muted/80 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Principal vs interest</h2>
          <p className="mt-1 text-sm text-muted-foreground">Share of maturity amount</p>
          <div className="mt-6 flex h-10 w-full overflow-hidden rounded-lg">
            <div
              className="flex items-center justify-center bg-primary text-xs font-medium text-primary-foreground"
              style={{ width: `${result.principalPct}%` }}
            >
              {result.principalPct > 12 ? `${result.principalPct.toFixed(1)}%` : ""}
            </div>
            <div
              className="flex items-center justify-center bg-muted-foreground text-xs font-medium text-primary-foreground"
              style={{ width: `${result.interestPct}%` }}
            >
              {result.interestPct > 12 ? `${result.interestPct.toFixed(1)}%` : ""}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-6 text-sm">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-primary" />
              Principal {result.principalPct.toFixed(1)}%
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-muted-foreground" />
              Interest {result.interestPct.toFixed(1)}%
            </span>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">How it works</h2>
          <p className="mt-2 text-muted-foreground">
            Maturity uses the standard compound amount formula:{" "}
            <span className="font-mono text-sm">
              A = P(1 + r/n)<sup>nt</sup>
            </span>
            , where <em>P</em> is principal, <em>r</em> is the nominal annual rate in decimals,{" "}
            <em>n</em> is compounding periods per year, and <em>t</em> is time in years. Total
            interest is <span className="font-mono text-sm">A − P</span>. The effective annual rate
            is{" "}
            <span className="font-mono text-sm">
              (1 + r/n)<sup>n</sup> − 1
            </span>
            , the yearly equivalent yield from <em>n</em> compounding steps. At 0% interest,
            maturity equals principal.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
          <div className="mt-4 space-y-2">
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Does this match my bank&apos;s FD quote exactly?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Banks may use different day-counts, cut-off dates, and rounding. This tool is a
                planning estimate using the standard mathematical formula—not a binding quote.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                What is effective annual rate (EAR)?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                EAR is the annual growth rate you would earn if compounding happened once per year
                but produced the same end result as your bank&apos;s compounding frequency. It is
                higher than the nominal rate when compounding is more than yearly.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Is tax deducted at source (TDS) included?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                No. Maturity and interest shown are before tax. FD interest may attract TDS and
                income tax as per your situation.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Can I model a monthly payout or cumulative FD?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                This page models cumulative compounding to a single maturity. Monthly payout and
                other payout options need different cash-flow assumptions.
              </p>
            </details>
          </div>
        </section>

        <div className="mt-8">
          <AdSlot slot="calc-bottom" format="rectangle" className="mx-auto" />
        </div>

        <RelatedSection items={getRelatedCalculators("fd-calculator")} />
      </div>
    </div>
  );
}
