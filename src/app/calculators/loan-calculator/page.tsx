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

const usdDetailed = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const inputClass =
  "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20";

type TermUnit = "years" | "months";

function buildYearlyAmortization(
  principal: number,
  nMonths: number,
  monthlyPayment: number,
  monthlyRate: number
): { year: number; principal: number; interest: number; endBalance: number }[] {
  if (principal <= 0 || nMonths <= 0) return [];

  const rows: { principal: number; interest: number; balance: number }[] = [];
  let balance = principal;

  for (let m = 1; m <= nMonths; m++) {
    const isLast = m === nMonths;
    const interestPortion = monthlyRate === 0 ? 0 : balance * monthlyRate;
    let principalPortion: number;
    if (isLast) {
      principalPortion = balance;
    } else {
      principalPortion = Math.min(balance, Math.max(0, monthlyPayment - interestPortion));
    }
    balance = Math.max(0, balance - principalPortion);
    rows.push({ principal: principalPortion, interest: interestPortion, balance });
  }

  const numYears = Math.ceil(nMonths / 12);
  const yearly: { year: number; principal: number; interest: number; endBalance: number }[] = [];

  for (let y = 1; y <= numYears; y++) {
    const start = (y - 1) * 12;
    const end = Math.min(y * 12, nMonths) - 1;
    let p = 0;
    let i = 0;
    for (let idx = start; idx <= end; idx++) {
      p += rows[idx].principal;
      i += rows[idx].interest;
    }
    yearly.push({
      year: y,
      principal: p,
      interest: i,
      endBalance: rows[end].balance,
    });
  }

  return yearly;
}

export default function LoanCalculatorPage() {
  const [principal, setPrincipal] = useState(25_000);
  const [annualRate, setAnnualRate] = useState(7.5);
  const [termValue, setTermValue] = useState(5);
  const [termUnit, setTermUnit] = useState<TermUnit>("years");

  const result = useMemo(() => {
    const P = Math.max(0, principal);
    const n =
      termUnit === "years"
        ? Math.max(0, Math.round(termValue * 12))
        : Math.max(0, Math.round(termValue));
    const rAnnual = Math.max(0, annualRate) / 100;
    const r = rAnnual / 12;

    let monthly = 0;
    if (P > 0 && n > 0) {
      if (r === 0) {
        monthly = P / n;
      } else {
        const pow = Math.pow(1 + r, n);
        monthly = (P * r * pow) / (pow - 1);
      }
    }

    const totalPayment = monthly * n;
    const totalInterest = Math.max(0, totalPayment - P);
    const principalShare = totalPayment > 0 ? (P / totalPayment) * 100 : 0;
    const interestShare = totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0;

    const yearly = buildYearlyAmortization(P, n, monthly, r);

    return {
      P,
      n,
      r,
      monthly,
      totalPayment,
      totalInterest,
      principalShare,
      interestShare,
      yearly,
    };
  }, [principal, annualRate, termValue, termUnit]);

  return (
    <div className="min-h-screen bg-background">
      <TrackPageView name="Loan Calculator" type="calculator" />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Loan calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Fixed-rate installment loan: enter principal, annual interest, and term in years or months.
          See your monthly payment, total interest, amortization by year, and how much of what you pay
          is principal versus interest.
        </p>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Loan details</h2>
          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="principal" className="block text-sm font-medium text-foreground">
                Loan amount
              </label>
              <input
                id="principal"
                type="number"
                min={0}
                step={100}
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
                className={`mt-1 ${inputClass}`}
              />
              <p className="mt-1 text-xs text-muted-foreground">{usd.format(principal)}</p>
            </div>

            <div>
              <label htmlFor="rate" className="block text-sm font-medium text-foreground">
                Interest rate (% per year)
              </label>
              <input
                id="rate"
                type="number"
                min={0}
                max={40}
                step={0.01}
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value) || 0)}
                className={`mt-1 ${inputClass}`}
              />
            </div>

            <div>
              <span className="block text-sm font-medium text-foreground">Loan term</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {(["years", "months"] as const).map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setTermUnit(u)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                      termUnit === u
                        ? "bg-primary text-primary-foreground"
                        : "border border-input bg-card text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    {u === "years" ? "Years" : "Months"}
                  </button>
                ))}
              </div>
              <input
                type="number"
                min={1}
                max={termUnit === "years" ? 50 : 600}
                step={1}
                value={termValue}
                onChange={(e) => setTermValue(Number(e.target.value) || 0)}
                className={`mt-3 ${inputClass}`}
                aria-label={termUnit === "years" ? "Term in years" : "Term in months"}
              />
              <p className="mt-1 text-xs text-muted-foreground">
                {result.n} monthly payment{result.n === 1 ? "" : "s"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Results</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Formula:{" "}
            <span className="font-mono text-xs sm:text-sm">
              M = P × r × (1 + r)<sup>n</sup> / ((1 + r)<sup>n</sup> − 1)
            </span>{" "}
            with monthly rate <em>r</em> and <em>n</em> payments.
          </p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-primary/10 p-4 sm:col-span-2">
              <dt className="text-sm font-medium text-primary">Monthly payment</dt>
              <dd className="mt-1 text-2xl font-bold text-primary">
                {result.P > 0 && result.n > 0 ? usdDetailed.format(result.monthly) : usdDetailed.format(0)}
              </dd>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <dt className="text-sm font-medium text-muted-foreground">Total interest</dt>
              <dd className="mt-1 text-xl font-bold text-foreground">{usd.format(result.totalInterest)}</dd>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <dt className="text-sm font-medium text-muted-foreground">Total payment</dt>
              <dd className="mt-1 text-xl font-bold text-foreground">{usd.format(result.totalPayment)}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-8">
          <AdSlot slot="calc-mid" format="horizontal" className="mx-auto" />
        </div>

        <div className="mt-8 rounded-xl border border-border bg-muted/80 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Principal vs interest</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Share of total amount paid over the full term (principal borrowed vs interest charged)
          </p>
          <div className="mt-6 flex h-10 w-full overflow-hidden rounded-lg">
            <div
              className="flex min-w-0 items-center justify-center bg-primary text-xs font-medium text-primary-foreground"
              style={{ width: `${result.principalShare}%` }}
              title="Principal"
            >
              {result.principalShare > 10 ? `${result.principalShare.toFixed(1)}%` : ""}
            </div>
            <div
              className="flex min-w-0 items-center justify-center bg-slate-500 text-xs font-medium text-white"
              style={{ width: `${result.interestShare}%` }}
              title="Interest"
            >
              {result.interestShare > 10 ? `${result.interestShare.toFixed(1)}%` : ""}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-primary" />
              Principal {result.principalShare.toFixed(1)}%
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-slate-500" />
              Interest {result.interestShare.toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Amortization summary</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Principal and interest allocated per year (partial final year if the term is not a multiple
            of 12 months).
          </p>
          {result.yearly.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Enter a positive loan amount and term to see the schedule.
            </p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="py-2 pr-4 font-medium">Year</th>
                    <th className="py-2 pr-4 font-medium">Principal paid</th>
                    <th className="py-2 pr-4 font-medium">Interest paid</th>
                    <th className="py-2 font-medium">End balance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.yearly.map((row) => (
                    <tr key={row.year} className="border-b border-border/60">
                      <td className="py-2 pr-4 text-foreground">{row.year}</td>
                      <td className="py-2 pr-4 text-foreground">{usd.format(row.principal)}</td>
                      <td className="py-2 pr-4 text-foreground">{usd.format(row.interest)}</td>
                      <td className="py-2 text-foreground">{usd.format(row.endBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">How it works</h2>
          <p className="mt-2 text-muted-foreground">
            For a fixed rate and equal monthly payments, the installment{" "}
            <span className="font-mono text-sm">
              M = P × r × (1 + r)<sup>n</sup> / ((1 + r)<sup>n</sup> − 1)
            </span>{" "}
            where <em>P</em> is the loan principal, <em>r</em> is the monthly interest rate (annual
            percentage divided by 12), and <em>n</em> is the number of months. Early payments are
            mostly interest; later ones pay down more principal. The yearly table sums the principal and
            interest portions of each payment within that year and shows the remaining balance after the
            last payment of the year. Display amounts use USD formatting for readability; the math is
            currency-agnostic.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
          <div className="mt-4 space-y-2">
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                What if my interest rate is 0%?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                The tool splits the principal evenly across all payments: monthly payment = loan amount
                ÷ number of months. Total interest is zero.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Does this include fees or insurance?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                No. Origination fees, escrow, credit insurance, and other add-ons are not modeled. Add
                those separately if your lender bundles them into the payment.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Why might tiny rounding differences appear?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Floating-point arithmetic and rounding to cents can leave a few cents of drift on the
                final balance in some edge cases. Lenders apply their own rounding rules on disclosures.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Can I use this for variable-rate loans?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                This calculator assumes a fixed rate for the entire term. Variable or stepped rates need
                a schedule that changes when the rate resets.
              </p>
            </details>
          </div>
        </section>

        <div className="mt-8">
          <AdSlot slot="calc-bottom" format="rectangle" className="mx-auto" />
        </div>

        <RelatedSection items={getRelatedCalculators("loan-calculator")} />
      </div>
    </div>
  );
}
