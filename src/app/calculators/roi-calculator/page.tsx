"use client";

import { useMemo, useState } from "react";

import { TrackPageView } from "@/components/shared/track-page-view";
import { RelatedSection } from "@/components/shared/related-items";
import { getRelatedCalculators } from "@/lib/related-items";
import { AdSlot } from "@/components/shared/ad-slot";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const pct = new Intl.NumberFormat("en-US", {
  style: "percent",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatPct(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return pct.format(value / 100);
}

export default function RoiCalculatorPage() {
  const [initialRaw, setInitialRaw] = useState(10_000);
  const [finalRaw, setFinalRaw] = useState(15_000);
  const [yearsRaw, setYearsRaw] = useState(5);

  const result = useMemo(() => {
    const initial = Math.min(100_000_000, Math.max(1, initialRaw));
    const final = Math.min(1_000_000_000_000, Math.max(0, finalRaw));
    const years = Math.min(100, Math.max(0.01, yearsRaw));

    const netProfit = final - initial;
    const roiPct = ((final - initial) / initial) * 100;
    const ratio = final / initial;
    const annualizedPct =
      ratio > 0 && Number.isFinite(ratio) && years > 0
        ? (Math.pow(ratio, 1 / years) - 1) * 100
        : Number.NaN;

    let bar:
      | { mode: "gain"; initialPct: number; profitPct: number }
      | { mode: "loss"; remainingPct: number; lossPct: number }
      | { mode: "neutral" };

    if (initial <= 0) {
      bar = { mode: "neutral" };
    } else if (final >= initial && final > 0) {
      bar = {
        mode: "gain",
        initialPct: (initial / final) * 100,
        profitPct: (netProfit / final) * 100,
      };
    } else if (final < initial) {
      bar = {
        mode: "loss",
        remainingPct: (final / initial) * 100,
        lossPct: (Math.abs(netProfit) / initial) * 100,
      };
    } else {
      bar = { mode: "neutral" };
    }

    return {
      initial,
      final,
      years,
      netProfit,
      roiPct,
      annualizedPct,
      bar,
    };
  }, [initialRaw, finalRaw, yearsRaw]);

  return (
    <div className="min-h-screen bg-background">
      <TrackPageView name="ROI Calculator" type="calculator" />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          ROI calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Enter what you invested, what it is worth now, and how long you held it. We compute simple
          ROI, annualized return (CAGR-style), and net profit—updated as you type.
        </p>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Inputs</h2>
          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="roi-initial" className="block text-sm font-medium text-foreground">
                Initial investment ($1 – $100M)
              </label>
              <input
                id="roi-initial"
                type="number"
                min={1}
                max={100_000_000}
                value={initialRaw}
                onChange={(e) => setInitialRaw(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
              <p className="mt-1 text-xs text-muted-foreground">{usd.format(result.initial)}</p>
            </div>
            <div>
              <label htmlFor="roi-final" className="block text-sm font-medium text-foreground">
                Final value ($0 – $1T)
              </label>
              <input
                id="roi-final"
                type="number"
                min={0}
                max={1_000_000_000_000}
                value={finalRaw}
                onChange={(e) => setFinalRaw(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
              <p className="mt-1 text-xs text-muted-foreground">{usd.format(result.final)}</p>
            </div>
            <div>
              <label htmlFor="roi-years" className="block text-sm font-medium text-foreground">
                Investment duration (0.01 – 100 years)
              </label>
              <input
                id="roi-years"
                type="number"
                min={0.01}
                max={100}
                step={0.01}
                value={yearsRaw}
                onChange={(e) => setYearsRaw(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Used for annualized ROI:{" "}
                <span className="font-mono">
                  ((Final ÷ Initial)<sup>1 ÷ years</sup> − 1) × 100
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Results</h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-primary/10 p-4">
              <dt className="text-sm font-medium text-primary">ROI</dt>
              <dd className="mt-1 text-2xl font-bold text-primary">
                {formatPct(result.roiPct)}
              </dd>
              <dd className="mt-1 text-xs text-muted-foreground">
                ((Final − Initial) ÷ Initial) × 100
              </dd>
            </div>
            <div className="rounded-lg bg-primary/10 p-4">
              <dt className="text-sm font-medium text-primary">Annualized ROI</dt>
              <dd className="mt-1 text-2xl font-bold text-primary">
                {formatPct(result.annualizedPct)}
              </dd>
              <dd className="mt-1 text-xs text-muted-foreground">Compound growth rate per year</dd>
            </div>
            <div className="rounded-lg bg-primary/10 p-4">
              <dt className="text-sm font-medium text-primary">Net profit</dt>
              <dd
                className={`mt-1 text-2xl font-bold ${
                  result.netProfit >= 0 ? "text-primary" : "text-destructive"
                }`}
              >
                {usd.format(result.netProfit)}
              </dd>
              <dd className="mt-1 text-xs text-muted-foreground">Final − Initial</dd>
            </div>
          </dl>
        </div>

        <div className="mt-8">
          <AdSlot slot="calc-mid" format="horizontal" className="mx-auto" />
        </div>

        <div className="mt-8 rounded-xl border border-border bg-muted/80 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Initial vs outcome</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Visual split: principal versus gain (or remaining value versus loss).
          </p>
          {result.bar.mode === "gain" && (
            <>
              <div
                className="mt-6 flex h-10 w-full overflow-hidden rounded-lg"
                role="img"
                aria-label={`Ending value split: ${result.bar.initialPct.toFixed(1)}% initial principal, ${result.bar.profitPct.toFixed(1)}% gain`}
              >
                <div
                  className="flex min-w-0 items-center justify-center bg-primary text-xs font-medium text-primary-foreground"
                  style={{ width: `${result.bar.initialPct}%` }}
                >
                  {result.bar.initialPct > 14 ? "Principal" : ""}
                </div>
                <div
                  className="flex min-w-0 items-center justify-center bg-emerald-600 text-xs font-medium text-white dark:bg-emerald-500"
                  style={{ width: `${result.bar.profitPct}%` }}
                >
                  {result.bar.profitPct > 14 ? "Gain" : ""}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-6 text-sm">
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded bg-primary" />
                  Principal {result.bar.initialPct.toFixed(1)}%
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded bg-emerald-600 dark:bg-emerald-500" />
                  Gain {result.bar.profitPct.toFixed(1)}%
                </span>
              </div>
            </>
          )}
          {result.bar.mode === "loss" && (
            <>
              <div
                className="mt-6 flex h-10 w-full overflow-hidden rounded-lg"
                role="img"
                aria-label={`Initial capital split: ${result.bar.remainingPct.toFixed(1)}% remaining value, ${result.bar.lossPct.toFixed(1)}% loss`}
              >
                <div
                  className="flex min-w-0 items-center justify-center bg-muted-foreground text-xs font-medium text-primary-foreground"
                  style={{ width: `${result.bar.remainingPct}%` }}
                >
                  {result.bar.remainingPct > 14 ? "Remaining" : ""}
                </div>
                <div
                  className="flex min-w-0 items-center justify-center bg-destructive text-xs font-medium text-destructive-foreground"
                  style={{ width: `${result.bar.lossPct}%` }}
                >
                  {result.bar.lossPct > 14 ? "Loss" : ""}
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-6 text-sm">
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded bg-muted-foreground" />
                  Remaining {result.bar.remainingPct.toFixed(1)}%
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded bg-destructive" />
                  Loss {result.bar.lossPct.toFixed(1)}%
                </span>
              </div>
            </>
          )}
          {result.bar.mode === "neutral" && (
            <p className="mt-4 text-sm text-muted-foreground">
              Adjust initial and final values to see a proportional bar (e.g. final greater than
              initial for a gain split).
            </p>
          )}
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">How it works</h2>
          <ul className="mt-3 list-inside list-disc space-y-2 text-muted-foreground">
            <li>
              <strong className="text-foreground">ROI (%)</strong> measures total return relative to
              what you put in:{" "}
              <span className="font-mono text-sm">
                ((Final − Initial) ÷ Initial) × 100
              </span>
              . It does not depend on time—doubling your money in one year or ten years gives the
              same simple ROI if the multiple is identical.
            </li>
            <li>
              <strong className="text-foreground">Annualized ROI</strong> answers “what steady yearly
              rate would get me from Initial to Final in <em>n</em> years?” using{" "}
              <span className="font-mono text-sm">
                ((Final ÷ Initial)<sup>1 ÷ n</sup> − 1) × 100
              </span>
              . This matches the usual CAGR when cash flows only at the start and end. Final must be
              positive for a real-valued result.
            </li>
            <li>
              <strong className="text-foreground">Net profit</strong> is simply{" "}
              <span className="font-mono text-sm">Final − Initial</span>—your dollar gain or loss
              before fees, taxes, or inflation.
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
          <div className="mt-4 space-y-2">
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                What is ROI and when should I use it?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Return on investment compares profit (or loss) to the original amount invested. Use
                simple ROI for a quick read on total performance; pair it with annualized ROI when
                you care how fast money grew over time.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                How is annualized ROI different from simple ROI?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Simple ROI ignores the holding period. Annualized ROI compresses the same gain or
                loss into an equivalent per-year compound rate, so you can compare investments held
                for different lengths of time more fairly.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Does this include dividends, fees, or taxes?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Only if you bake them into Initial and Final. Enter all-in cost basis for Initial and
                liquidation value after costs for Final if you want an after-fee view. Taxes are not
                modeled separately.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Can ROI be negative?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Yes. If Final is below Initial, ROI and net profit are negative. Annualized ROI still
                summarizes the average compound decline per year over your holding period (when Final
                is positive).
              </p>
            </details>
          </div>
        </section>

        <div className="mt-8">
          <AdSlot slot="calc-bottom" format="rectangle" className="mx-auto" />
        </div>

        <RelatedSection items={getRelatedCalculators("roi-calculator")} />
      </div>
    </div>
  );
}
