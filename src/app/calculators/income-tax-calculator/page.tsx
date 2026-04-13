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

const CESS_RATE = 0.04;

function taxOldRegimeSlabs(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  const l1 = 2_50_000;
  const l2 = 5_00_000;
  const l3 = 10_00_000;
  let tax = 0;
  tax += Math.max(0, Math.min(taxableIncome, l2) - l1) * 0.05;
  tax += Math.max(0, Math.min(taxableIncome, l3) - l2) * 0.2;
  if (taxableIncome > l3) tax += (taxableIncome - l3) * 0.3;
  return tax;
}

function taxNewRegimeSlabs(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;
  const s0 = 4_00_000;
  const s1 = 8_00_000;
  const s2 = 12_00_000;
  const s3 = 16_00_000;
  const s4 = 20_00_000;
  const s5 = 24_00_000;
  let tax = 0;
  tax += Math.max(0, Math.min(taxableIncome, s1) - s0) * 0.05;
  tax += Math.max(0, Math.min(taxableIncome, s2) - s1) * 0.1;
  tax += Math.max(0, Math.min(taxableIncome, s3) - s2) * 0.15;
  tax += Math.max(0, Math.min(taxableIncome, s4) - s3) * 0.2;
  tax += Math.max(0, Math.min(taxableIncome, s5) - s4) * 0.25;
  if (taxableIncome > s5) tax += (taxableIncome - s5) * 0.3;
  return tax;
}

function withCess(baseTax: number) {
  const cess = baseTax * CESS_RATE;
  return { baseTax, cess, total: baseTax + cess };
}

export default function IncomeTaxCalculatorPage() {
  const [annualIncome, setAnnualIncome] = useState(12_00_000);
  const [focusRegime, setFocusRegime] = useState<"old" | "new">("new");

  const result = useMemo(() => {
    const income = Math.max(0, annualIncome);
    const oldBase = taxOldRegimeSlabs(income);
    const newBase = taxNewRegimeSlabs(income);
    const old = withCess(oldBase);
    const neu = withCess(newBase);
    const diff = old.total - neu.total;
    const better: "old" | "new" | "tie" =
      old.total < neu.total ? "old" : neu.total < old.total ? "new" : "tie";
    const effOld = income > 0 ? (old.total / income) * 100 : 0;
    const effNew = income > 0 ? (neu.total / income) * 100 : 0;

    return {
      income,
      old,
      neu,
      diff,
      better,
      effOld,
      effNew,
    };
  }, [annualIncome]);

  const { income, old, neu, diff, better, effOld, effNew } = result;

  return (
    <div className="min-h-screen bg-background">
      <TrackPageView name="Income Tax Calculator" type="calculator" />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Income tax calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Estimate tax for India <strong className="font-medium text-foreground">FY 2025-26</strong>{" "}
          on gross annual salary: compare the Old and New regimes, including 4% Health &amp;
          Education Cess on tax.
        </p>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Your details</h2>
          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="income" className="block text-sm font-medium text-foreground">
                Annual gross salary / income (₹)
              </label>
              <input
                id="income"
                type="number"
                min={0}
                step={10000}
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
              <p className="mt-1 text-xs text-muted-foreground">{inr.format(income)}</p>
            </div>
            <div>
              <span className="block text-sm font-medium text-foreground">Highlight regime</span>
              <p className="mt-1 text-xs text-muted-foreground">
                Both regimes are always calculated; pick which card to emphasise in the summary.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setFocusRegime("old")}
                  className={`rounded-lg border px-4 py-2.5 text-sm font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring/20 ${
                    focusRegime === "old"
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-background text-foreground hover:bg-muted/50"
                  }`}
                >
                  Old regime
                </button>
                <button
                  type="button"
                  onClick={() => setFocusRegime("new")}
                  className={`rounded-lg border px-4 py-2.5 text-sm font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring/20 ${
                    focusRegime === "new"
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-input bg-background text-foreground hover:bg-muted/50"
                  }`}
                >
                  New regime
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Results</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Tax before cess, 4% cess, and total liability under each regime
          </p>

          <div className="mt-6 rounded-lg bg-primary/10 p-6">
            <p className="text-sm font-medium text-primary">Comparison</p>
            {better === "tie" ? (
              <p className="mt-2 text-foreground">
                Under these simplified slab assumptions, total tax (including cess) is the same for
                both regimes at <span className="font-semibold">{inr.format(old.total)}</span>.
              </p>
            ) : (
              <p className="mt-2 text-foreground">
                The{" "}
                <span className="font-semibold">
                  {better === "new" ? "New" : "Old"} regime
                </span>{" "}
                is lower by{" "}
                <span className="font-semibold text-primary">
                  {inr.format(Math.abs(diff))}
                </span>{" "}
                for this income (including cess).
              </p>
            )}
          </div>

          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div
              className={`rounded-lg border p-4 ${
                focusRegime === "old"
                  ? "border-primary/40 bg-primary/10"
                  : "border-border/60 bg-muted/50"
              }`}
            >
              <dt className="text-sm font-medium text-muted-foreground">Old regime — total tax</dt>
              <dd className="mt-1 text-2xl font-bold text-foreground">{inr.format(old.total)}</dd>
              <dd className="mt-2 text-xs text-muted-foreground">
                Base {inr.format(old.baseTax)} + cess {inr.format(old.cess)} · Effective rate{" "}
                {effOld.toFixed(2)}%
              </dd>
            </div>
            <div
              className={`rounded-lg border p-4 ${
                focusRegime === "new"
                  ? "border-primary/40 bg-primary/10"
                  : "border-border/60 bg-muted/50"
              }`}
            >
              <dt className="text-sm font-medium text-muted-foreground">New regime — total tax</dt>
              <dd className="mt-1 text-2xl font-bold text-foreground">{inr.format(neu.total)}</dd>
              <dd className="mt-2 text-xs text-muted-foreground">
                Base {inr.format(neu.baseTax)} + cess {inr.format(neu.cess)} · Effective rate{" "}
                {effNew.toFixed(2)}%
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-8">
          <AdSlot slot="calc-mid" format="horizontal" className="mx-auto" />
        </div>

        <div className="mt-8 rounded-xl border border-border bg-muted/80 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Slabs used (simplified)</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Progressive tax on income in each slab; cess is 4% of tax, not of income.
          </p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Old regime</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>Up to ₹2.5L — 0%</li>
                <li>₹2.5L – ₹5L — 5%</li>
                <li>₹5L – ₹10L — 20%</li>
                <li>Above ₹10L — 30%</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">New regime (Budget 2025 slabs)</h3>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li>Up to ₹4L — 0%</li>
                <li>₹4L – ₹8L — 5%</li>
                <li>₹8L – ₹12L — 10%</li>
                <li>₹12L – ₹16L — 15%</li>
                <li>₹16L – ₹20L — 20%</li>
                <li>₹20L – ₹24L — 25%</li>
                <li>Above ₹24L — 30%</li>
              </ul>
            </div>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">How it works</h2>
          <p className="mt-2 text-muted-foreground">
            Your annual income is split across tax slabs from zero upward: only the portion falling
            in each band is taxed at that band&apos;s rate (progressive slabs). We compute{" "}
            <em>base tax</em> as the sum of slab taxes, then add{" "}
            <strong className="font-medium text-foreground">Health and Education Cess</strong> at 4%
            on that base tax to get <em>total tax</em>.{" "}
            <strong className="font-medium text-foreground">Effective tax rate</strong> is total
            tax divided by your gross income, shown as a percentage. The Old and New regimes use
            different slab breakpoints and rates; comparing both helps you see which structure would
            yield lower liability for the same gross figure—actual returns depend on deductions,
            rebates, and other provisions.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
          <div className="mt-4 space-y-2">
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Does this match the tax on my Form 16 or e-filing?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                This tool uses slab math and 4% cess only on full gross income. It does not apply
                standard deduction, rebate under 87A, Chapter VI-A deductions (80C, 80D, etc.), or
                surcharge. Use it for quick regime comparison; file using official rules or a CA.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                What is the difference between the Old and New tax regimes?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                The Old regime typically allows more deductions but uses older slab rates. The New
                regime offers revised slabs (including wider nil-rate bands in recent budgets) with
                fewer deductions. You can choose each year in many cases, subject to conditions.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                What is Health and Education Cess?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                It is an additional levy calculated as a percentage of your income tax (not your
                income). This calculator uses 4% on the tax computed from slabs, as commonly applied
                for individual taxpayers.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Which regime should I choose for FY 2025-26?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                It depends on your income, eligible deductions, and rebates. If you claim large
                deductions, the Old regime may win; if you have minimal deductions, the New regime
                slabs may be better. Compare both here, then validate with detailed computation or
                professional advice.
              </p>
            </details>
          </div>
        </section>

        <div className="mt-8">
          <AdSlot slot="calc-bottom" format="rectangle" className="mx-auto" />
        </div>

        <RelatedSection items={getRelatedCalculators("income-tax-calculator")} />
      </div>
    </div>
  );
}
