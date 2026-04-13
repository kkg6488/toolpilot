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

const MIN_YEARLY = 500;
const MAX_YEARLY = 1_50_000;

type YearRow = { year: number; opening: number; investment: number; interest: number; closing: number };

function buildPpfRows(
  yearly: number,
  ratePct: number,
  years: number
): { rows: YearRow[]; totalInvested: number; totalInterest: number; maturity: number } {
  const y = Math.min(50, Math.max(15, years));
  const inv = Math.min(MAX_YEARLY, Math.max(MIN_YEARLY, yearly));
  const r = ratePct / 100;
  const rows: YearRow[] = [];
  let balance = 0;
  let invested = 0;

  for (let year = 1; year <= y; year++) {
    const opening = balance;
    balance += inv;
    invested += inv;
    const interest = balance * r;
    balance += interest;
    rows.push({
      year,
      opening,
      investment: inv,
      interest,
      closing: balance,
    });
  }

  const totalInterest = balance - invested;
  return {
    rows,
    totalInvested: invested,
    totalInterest,
    maturity: balance,
  };
}

export default function PpfCalculatorPage() {
  const [yearly, setYearly] = useState(1_50_000);
  const [rate, setRate] = useState(7.1);
  const [years, setYears] = useState(15);

  const { rows, totalInvested, totalInterest, maturity, intPct, invPct } = useMemo(() => {
    const data = buildPpfRows(yearly, rate, years);
    const sum = data.maturity;
    const ip = sum > 0 ? (data.totalInvested / sum) * 100 : 50;
    const tp = sum > 0 ? (data.totalInterest / sum) * 100 : 50;
    return { ...data, invPct: ip, intPct: tp };
  }, [yearly, rate, years]);

  const displayRows = useMemo(() => {
    if (rows.length === 0) return [];
    const first = rows.slice(0, 5);
    const last = rows[rows.length - 1];
    const hasLastInFirst = first.some((r) => r.year === last.year);
    if (hasLastInFirst) return first;
    return [...first, last];
  }, [rows]);

  return (
    <div className="min-h-screen bg-background">
      <TrackPageView name="PPF Calculator" type="calculator" />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          PPF calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Model Public Provident Fund growth with a yearly lump-sum deposit and annual compounding.
          Actual PPF credits interest as per government rules; this is a simplified planner.
        </p>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">PPF inputs</h2>
          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="ppf-inv" className="block text-sm font-medium text-foreground">
                Yearly investment (₹500 – ₹1.5 Lakh)
              </label>
              <input
                id="ppf-inv"
                type="number"
                min={MIN_YEARLY}
                max={MAX_YEARLY}
                value={yearly}
                onChange={(e) => setYearly(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
              <p className="mt-1 text-xs text-muted-foreground">{inr.format(yearly)}/year</p>
            </div>
            <div>
              <label htmlFor="ppf-rate" className="block text-sm font-medium text-foreground">
                Interest rate (% per annum, compounded yearly)
              </label>
              <input
                id="ppf-rate"
                type="number"
                min={0}
                max={20}
                step={0.05}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
              <p className="mt-1 text-xs text-muted-foreground">Default 7.1% reflects recent PPF rates; change as needed.</p>
            </div>
            <div>
              <label htmlFor="ppf-yrs" className="block text-sm font-medium text-foreground">
                Time period (years, 15–50)
              </label>
              <input
                id="ppf-yrs"
                type="number"
                min={15}
                max={50}
                value={years}
                onChange={(e) => setYears(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Results</h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-muted/50 p-4">
              <dt className="text-sm font-medium text-muted-foreground">Total investment</dt>
              <dd className="mt-1 text-xl font-bold text-foreground">{inr.format(totalInvested)}</dd>
            </div>
            <div className="rounded-lg bg-primary/10 p-4">
              <dt className="text-sm font-medium text-primary">Total interest</dt>
              <dd className="mt-1 text-xl font-bold text-primary">{inr.format(totalInterest)}</dd>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <dt className="text-sm font-medium text-muted-foreground">Maturity value</dt>
              <dd className="mt-1 text-2xl font-bold text-foreground">{inr.format(maturity)}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-8">
          <AdSlot slot="calc-mid" format="horizontal" className="mx-auto" />
        </div>

        <div className="mt-8 rounded-xl border border-border bg-muted/80 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Investment vs interest at maturity</h2>
          <div className="mt-4 flex h-10 w-full overflow-hidden rounded-lg">
            <div
              className="flex items-center justify-center bg-primary text-xs font-medium text-white"
              style={{ width: `${invPct}%` }}
            >
              {invPct > 12 ? `${invPct.toFixed(1)}%` : ""}
            </div>
            <div
              className="flex items-center justify-center bg-teal-600 text-xs font-medium text-white"
              style={{ width: `${intPct}%` }}
            >
              {intPct > 12 ? `${intPct.toFixed(1)}%` : ""}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-6 text-sm">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-primary" />
              Deposits {invPct.toFixed(1)}%
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-teal-600" />
              Interest {intPct.toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card shadow-md">
          <div className="border-b border-border bg-muted px-4 py-3 sm:px-6">
            <h2 className="text-lg font-semibold text-foreground">Year-by-year breakdown</h2>
            <p className="text-sm text-muted-foreground">
              First 5 years and final year (simplified annual model)
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-muted/50 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 sm:px-6">Year</th>
                  <th className="px-4 py-3 sm:px-6">Opening</th>
                  <th className="px-4 py-3 sm:px-6">Deposit</th>
                  <th className="px-4 py-3 sm:px-6">Interest</th>
                  <th className="px-4 py-3 sm:px-6">Closing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {displayRows.map((row) => (
                  <tr key={row.year} className="hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium text-foreground sm:px-6">{row.year}</td>
                    <td className="px-4 py-3 text-muted-foreground sm:px-6">{inr.format(row.opening)}</td>
                    <td className="px-4 py-3 text-muted-foreground sm:px-6">{inr.format(row.investment)}</td>
                    <td className="px-4 py-3 text-muted-foreground sm:px-6">{inr.format(row.interest)}</td>
                    <td className="px-4 py-3 font-medium text-foreground sm:px-6">
                      {inr.format(row.closing)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">How it works</h2>
          <p className="mt-2 text-muted-foreground">
            Each year we add your yearly investment to the balance, then apply annual interest on the
            combined amount (simplified compounding). Government PPF uses a declared rate and specific
            interest-credit rules; adjust the rate field when notifications change.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
          <div className="mt-4 space-y-2">
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Why might this PPF calculator differ from my passbook?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Real PPF interest is credited per RBI/Finance Ministry rules and depends on deposit
                dates within the month. We use one yearly deposit and year-end compounding for
                clarity.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                What is the maximum yearly investment in PPF?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Currently ₹1.5 lakh per financial year across your PPF accounts is the usual ceiling
                for tax-efficient contributions—this PPF calculator caps yearly input there.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Can I extend PPF beyond 15 years in this calculator?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Yes—set tenure up to 50 years to approximate blocks of extension with continued
                deposits, subject to actual extension rules at your bank/post office.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Is PPF interest fixed for the whole tenure?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                The government revises the PPF rate quarterly. Use this PPF calculator with updated
                rates to re-run scenarios as notifications change.
              </p>
            </details>
          </div>
        </section>

        <div className="mt-8">
          <AdSlot slot="calc-bottom" format="rectangle" className="mx-auto" />
        </div>

        <RelatedSection items={getRelatedCalculators("ppf-calculator")} />
      </div>
    </div>
  );
}
