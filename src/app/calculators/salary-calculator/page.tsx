"use client";

import { useMemo, useState } from "react";

import { TrackPageView } from "@/components/shared/track-page-view";
import { RelatedSection } from "@/components/shared/related-items";
import { getRelatedCalculators } from "@/lib/related-items";
import { AdSlot } from "@/components/shared/ad-slot";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

type PayPeriod = "hourly" | "weekly" | "biweekly" | "monthly" | "annually";

/** Simplified US federal ordinary income tax for single filer: 2024-ish brackets on taxable income after standard deduction. */
const STANDARD_DEDUCTION = 14_600;
const BRACKETS: { top: number; rate: number }[] = [
  { top: 11_600, rate: 0.1 },
  { top: 47_150, rate: 0.12 },
  { top: 100_525, rate: 0.22 },
  { top: 191_950, rate: 0.24 },
  { top: 243_725, rate: 0.32 },
  { top: 609_350, rate: 0.35 },
  { top: Number.POSITIVE_INFINITY, rate: 0.37 },
];

function federalTaxSimplified(grossAnnual: number): number {
  const taxable = Math.max(0, grossAnnual - STANDARD_DEDUCTION);
  let tax = 0;
  let prev = 0;
  for (const { top, rate } of BRACKETS) {
    if (taxable <= prev) break;
    const slice = Math.min(taxable, top) - prev;
    if (slice > 0) tax += slice * rate;
    prev = top;
  }
  return tax;
}

export default function SalaryCalculatorPage() {
  const [amount, setAmount] = useState(35);
  const [period, setPeriod] = useState<PayPeriod>("hourly");
  const [hoursPerWeek, setHoursPerWeek] = useState(40);

  const derived = useMemo(() => {
    const raw = Math.max(0, amount);
    const h = Math.min(80, Math.max(1, hoursPerWeek));

    let annual = 0;
    if (period === "hourly") annual = raw * h * 52;
    else if (period === "weekly") annual = raw * 52;
    else if (period === "biweekly") annual = raw * 26;
    else if (period === "monthly") annual = raw * 12;
    else annual = raw;

    const hoursForEquiv = period === "hourly" ? h : 40;
    const hourly = annual / (hoursForEquiv * 52);
    const daily = annual / 365;
    const weekly = annual / 52;
    const biweekly = annual / 26;
    const monthly = annual / 12;

    const fed = federalTaxSimplified(annual);
    const takeHomeAnnual = Math.max(0, annual - fed);
    const takeHomeMonthly = takeHomeAnnual / 12;
    const takeHomeBiweekly = takeHomeAnnual / 26;
    const takeHomeWeekly = takeHomeAnnual / 52;
    const takeHomeDaily = takeHomeAnnual / 365;
    const takeHomeHourly = takeHomeAnnual / (hoursForEquiv * 52);

    return {
      annual,
      hourly,
      daily,
      weekly,
      biweekly,
      monthly,
      fed,
      takeHomeAnnual,
      takeHomeMonthly,
      takeHomeBiweekly,
      takeHomeWeekly,
      takeHomeDaily,
      takeHomeHourly,
      hoursForEquiv,
    };
  }, [amount, period, hoursPerWeek]);

  const rows: { label: string; gross: number; takeHome: number }[] = [
    { label: "Hourly", gross: derived.hourly, takeHome: derived.takeHomeHourly },
    { label: "Daily", gross: derived.daily, takeHome: derived.takeHomeDaily },
    { label: "Weekly", gross: derived.weekly, takeHome: derived.takeHomeWeekly },
    { label: "Biweekly", gross: derived.biweekly, takeHome: derived.takeHomeBiweekly },
    { label: "Monthly", gross: derived.monthly, takeHome: derived.takeHomeMonthly },
    { label: "Annually", gross: derived.annual, takeHome: derived.takeHomeAnnual },
  ];

  return (
    <div className="min-h-screen bg-background">
      <TrackPageView name="Salary Calculator" type="calculator" />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Salary calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Enter pay in any common period; we convert to all others. Take-home uses a rough US federal
          income tax for a single filer (standard deduction + progressive brackets)—not payroll taxes
          or state tax.
        </p>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Your pay</h2>
          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="period" className="block text-sm font-medium text-foreground">
                Pay period
              </label>
              <select
                id="period"
                value={period}
                onChange={(e) => setPeriod(e.target.value as PayPeriod)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              >
                <option value="hourly">Hourly</option>
                <option value="weekly">Weekly</option>
                <option value="biweekly">Biweekly (every 2 weeks)</option>
                <option value="monthly">Monthly</option>
                <option value="annually">Annually</option>
              </select>
            </div>
            <div>
              <label htmlFor="amt" className="block text-sm font-medium text-foreground">
                {period === "hourly"
                  ? "Hourly rate ($)"
                  : period === "weekly"
                    ? "Weekly salary ($)"
                    : period === "biweekly"
                      ? "Biweekly salary ($)"
                      : period === "monthly"
                        ? "Monthly salary ($)"
                        : "Annual salary ($)"}
              </label>
              <input
                id="amt"
                type="number"
                min={0}
                step={period === "hourly" ? 0.01 : 1}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>
            {period === "hourly" && (
              <div>
                <label htmlFor="hrs" className="block text-sm font-medium text-foreground">
                  Hours per week
                </label>
                <input
                  id="hrs"
                  type="number"
                  min={1}
                  max={80}
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value) || 1)}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Equivalent pay</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Hourly equivalents use {derived.hoursForEquiv} hours/week × 52 weeks (40 when not hourly).
            Daily = annual ÷ 365.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[320px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-2 pr-4 font-medium">Period</th>
                  <th className="py-2 pr-4 font-medium">Gross</th>
                  <th className="py-2 font-medium">Est. take-home*</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label} className="border-b border-border/60">
                    <td className="py-3 pr-4 font-medium text-foreground">{r.label}</td>
                    <td className="py-3 pr-4 font-semibold text-foreground">{usd.format(r.gross)}</td>
                    <td className="py-3 text-foreground">{usd.format(r.takeHome)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            *Simplified federal income tax only ({usd.format(STANDARD_DEDUCTION)} standard deduction,
            single filer brackets). Excludes FICA, state/local tax, credits, and other adjustments.
          </p>
        </div>

        <div className="mt-6 rounded-xl border border-border bg-muted/80 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Tax snapshot</h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-card p-4 shadow-sm">
              <dt className="text-sm text-muted-foreground">Est. federal tax (annual)</dt>
              <dd className="mt-1 text-xl font-bold text-foreground">{usd.format(derived.fed)}</dd>
            </div>
            <div className="rounded-lg bg-primary/10 p-4">
              <dt className="text-sm font-medium text-primary">Est. take-home (annual)</dt>
              <dd className="mt-1 text-2xl font-bold text-primary">
                {usd.format(derived.takeHomeAnnual)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-8">
          <AdSlot slot="calc-mid" format="horizontal" className="mx-auto" />
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">How it works</h2>
          <p className="mt-2 text-muted-foreground">
            We normalize everything to an annual salary, then divide by 52 (weeks), 26 (biweeks), 12
            (months), 365 (calendar days), or (hours/week × 52) for hourly. Federal tax applies
            progressive rates to taxable income after a fixed standard deduction—an educational
            shortcut, not tax advice.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
          <div className="mt-4 space-y-2">
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Why doesn’t take-home match my paycheck?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Real checks include Social Security and Medicare (FICA), state and local tax,
                pre-tax benefits, retirement deferrals, and withholding allowances. We only model a
                simplified federal income tax.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                How is “daily” defined?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                We spread annual pay evenly across 365 calendar days. Some employers quote 260 working
                days instead—that would increase the daily figure.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                What if I’m married or head of household?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Brackets and standard deductions differ by filing status. This tool assumes single
                filer for the rough tax estimate.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Biweekly vs semi-monthly?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Biweekly is 26 pay periods per year. Semi-monthly (twice per month) is 24 periods;
                monthly equivalents differ slightly—choose the input that matches your pay stub.
              </p>
            </details>
          </div>
        </section>

        <div className="mt-8">
          <AdSlot slot="calc-bottom" format="rectangle" className="mx-auto" />
        </div>

        <RelatedSection items={getRelatedCalculators("salary-calculator")} />
      </div>
    </div>
  );
}
