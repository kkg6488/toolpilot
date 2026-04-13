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

const inrDetailed = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const MIN_PRINCIPAL = 1_00_000;
const MAX_PRINCIPAL = 5_00_00_000;

export default function EmiCalculatorPage() {
  const [principal, setPrincipal] = useState(25_00_000);
  const [annualRate, setAnnualRate] = useState(10.5);
  const [tenureValue, setTenureValue] = useState(20);
  const [tenureUnit, setTenureUnit] = useState<"years" | "months">("years");

  const { months, emi, totalPayment, totalInterest, principalShare, interestShare } =
    useMemo(() => {
      const n =
        tenureUnit === "years"
          ? Math.round(Math.min(30, Math.max(1, tenureValue)) * 12)
          : Math.round(Math.min(360, Math.max(12, tenureValue)));
      const P = Math.min(MAX_PRINCIPAL, Math.max(MIN_PRINCIPAL, principal));
      const r = annualRate / 100 / 12;

      if (n <= 0 || P <= 0) {
        return {
          months: n,
          emi: 0,
          totalPayment: 0,
          totalInterest: 0,
          principalShare: 50,
          interestShare: 50,
        };
      }

      if (r === 0) {
        const pay = P / n;
        return {
          months: n,
          emi: pay,
          totalPayment: P,
          totalInterest: 0,
          principalShare: 100,
          interestShare: 0,
        };
      }

      const pow = Math.pow(1 + r, n);
      const emiVal = (P * r * pow) / (pow - 1);
      const totalPay = emiVal * n;
      const interest = totalPay - P;
      const total = interest + P;
      const pPct = total > 0 ? (P / total) * 100 : 50;
      const iPct = total > 0 ? (interest / total) * 100 : 50;

      return {
        months: n,
        emi: emiVal,
        totalPayment: totalPay,
        totalInterest: interest,
        principalShare: pPct,
        interestShare: iPct,
      };
    }, [principal, annualRate, tenureValue, tenureUnit]);

  return (
    <div className="min-h-screen bg-background">
      <TrackPageView name="EMI Calculator" type="calculator" />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          EMI calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Enter your loan amount, interest rate, and tenure to see monthly EMI and full repayment
          breakdown in Indian Rupees.
        </p>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Loan details</h2>
          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="principal" className="block text-sm font-medium text-foreground">
                Loan amount (₹1 Lakh – ₹5 Crore)
              </label>
              <input
                id="principal"
                type="number"
                min={MIN_PRINCIPAL}
                max={MAX_PRINCIPAL}
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
              <p className="mt-1 text-xs text-muted-foreground">{inr.format(principal)}</p>
            </div>
            <div>
              <label htmlFor="rate" className="block text-sm font-medium text-foreground">
                Interest rate (% per annum)
              </label>
              <input
                id="rate"
                type="number"
                min={1}
                max={30}
                step={0.05}
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="tenure" className="block text-sm font-medium text-foreground">
                  Loan tenure
                </label>
                <input
                  id="tenure"
                  type="number"
                  min={tenureUnit === "years" ? 1 : 12}
                  max={tenureUnit === "years" ? 30 : 360}
                  value={tenureValue}
                  onChange={(e) => setTenureValue(Number(e.target.value) || 0)}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
              <div>
                <label htmlFor="unit" className="block text-sm font-medium text-foreground">
                  Tenure unit
                </label>
                <select
                  id="unit"
                  value={tenureUnit}
                  onChange={(e) => setTenureUnit(e.target.value as "years" | "months")}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                >
                  <option value="years">Years (1–30)</option>
                  <option value="months">Months (12–360)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Results</h2>
          <p className="mt-1 text-sm text-muted-foreground">{months} monthly instalments</p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-primary/10 p-4">
              <dt className="text-sm font-medium text-primary">Monthly EMI</dt>
              <dd className="mt-1 text-2xl font-bold text-primary">{inrDetailed.format(emi)}</dd>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <dt className="text-sm font-medium text-muted-foreground">Total interest</dt>
              <dd className="mt-1 text-xl font-bold text-foreground">
                {inr.format(totalInterest)}
              </dd>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <dt className="text-sm font-medium text-muted-foreground">Total payment</dt>
              <dd className="mt-1 text-xl font-bold text-foreground">
                {inr.format(totalPayment)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-8">
          <AdSlot slot="calc-mid" format="horizontal" className="mx-auto" />
        </div>

        <div className="mt-8 rounded-xl border border-border bg-muted/80 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Principal vs interest</h2>
          <p className="mt-1 text-sm text-muted-foreground">Share of what you repay over the loan term</p>
          <div className="mt-6 flex h-10 w-full overflow-hidden rounded-lg">
            <div
              className="flex items-center justify-center bg-primary text-xs font-medium text-white"
              style={{ width: `${principalShare}%` }}
              title="Principal"
            >
              {principalShare > 12 ? `${principalShare.toFixed(1)}%` : ""}
            </div>
            <div
              className="flex items-center justify-center bg-slate-500 text-xs font-medium text-white"
              style={{ width: `${interestShare}%` }}
              title="Interest"
            >
              {interestShare > 12 ? `${interestShare.toFixed(1)}%` : ""}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-6 text-sm">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-primary" />
              Principal {principalShare.toFixed(1)}%
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-slate-500" />
              Interest {interestShare.toFixed(1)}%
            </span>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">How it works</h2>
          <p className="mt-2 text-muted-foreground">
            EMI (Equated Monthly Instalment) uses the standard reducing-balance formula:{" "}
            <span className="font-mono text-sm">
              EMI = P × r × (1 + r)<sup>n</sup> / ((1 + r)<sup>n</sup> − 1)
            </span>
            , where <em>P</em> is the loan amount, <em>r</em> is the monthly interest rate (annual
            rate ÷ 12), and <em>n</em> is the number of months. Early in the loan, a larger portion
            of each EMI is interest; over time, more goes toward principal.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
          <div className="mt-4 space-y-2">
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Does this EMI calculator match my bank’s quote?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Banks may add processing fees, insurance, or daily/annual rest rules. This tool uses
                a standard monthly rest EMI formula—use it for planning; confirm final numbers with
                your lender.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                What loan amounts does the EMI calculator support?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                You can enter principal from ₹1 lakh up to ₹5 crore, with tenure from 1–30 years or
                12–360 months and interest between 1% and 30% per annum.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Why is total interest so high on long tenures?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Interest accrues on the outstanding balance each month. Longer tenure means you
                borrow the bank’s money for more months, so total interest increases even if EMI is
                lower.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Can I use this for home, car, and personal loans?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Yes. The same EMI formula applies to any fixed-rate loan amortised in equal monthly
                payments, as long as your product follows this structure.
              </p>
            </details>
          </div>
        </section>

        <div className="mt-8">
          <AdSlot slot="calc-bottom" format="rectangle" className="mx-auto" />
        </div>

        <RelatedSection items={getRelatedCalculators("emi-calculator")} />
      </div>
    </div>
  );
}
