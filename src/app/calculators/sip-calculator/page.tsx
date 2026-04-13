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

const MIN_MONTHLY = 500;
const MAX_MONTHLY = 1_00_000;

export default function SipCalculatorPage() {
  const [monthly, setMonthly] = useState(10_000);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [years, setYears] = useState(15);

  const { invested, fv, returns, invPct, retPct } = useMemo(() => {
    const P = Math.min(MAX_MONTHLY, Math.max(MIN_MONTHLY, monthly));
    const n = Math.round(Math.min(40, Math.max(1, years)) * 12);
    const r = annualReturn / 100 / 12;
    const totalInvested = P * n;

    if (n <= 0) {
      return { invested: 0, fv: 0, returns: 0, invPct: 50, retPct: 50 };
    }

    let future: number;
    if (r === 0) {
      future = totalInvested;
    } else {
      const pow = Math.pow(1 + r, n);
      future = (P * (pow - 1)) / r * (1 + r);
    }

    const estReturns = Math.max(0, future - totalInvested);
    const sum = future;
    const ip = sum > 0 ? (totalInvested / sum) * 100 : 50;
    const rp = sum > 0 ? (estReturns / sum) * 100 : 50;

    return {
      invested: totalInvested,
      fv: future,
      returns: estReturns,
      invPct: ip,
      retPct: rp,
    };
  }, [monthly, annualReturn, years]);

  return (
    <div className="min-h-screen bg-background">
      <TrackPageView name="SIP Calculator" type="calculator" />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          SIP calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Project wealth from a monthly SIP using expected return and duration. Figures are
          illustrative and not investment advice.
        </p>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">SIP inputs</h2>
          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="sip" className="block text-sm font-medium text-foreground">
                Monthly investment (₹500 – ₹1 Lakh)
              </label>
              <input
                id="sip"
                type="number"
                min={MIN_MONTHLY}
                max={MAX_MONTHLY}
                value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
              <p className="mt-1 text-xs text-muted-foreground">{inr.format(monthly)}/month</p>
            </div>
            <div>
              <label htmlFor="ret" className="block text-sm font-medium text-foreground">
                Expected annual return (%)
              </label>
              <input
                id="ret"
                type="number"
                min={1}
                max={30}
                step={0.1}
                value={annualReturn}
                onChange={(e) => setAnnualReturn(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>
            <div>
              <label htmlFor="yrs" className="block text-sm font-medium text-foreground">
                Time period (years, 1–40)
              </label>
              <input
                id="yrs"
                type="number"
                min={1}
                max={40}
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
              <dt className="text-sm font-medium text-muted-foreground">Invested amount</dt>
              <dd className="mt-1 text-xl font-bold text-foreground">{inr.format(invested)}</dd>
            </div>
            <div className="rounded-lg bg-primary/10 p-4">
              <dt className="text-sm font-medium text-primary">Est. returns</dt>
              <dd className="mt-1 text-xl font-bold text-primary">{inr.format(returns)}</dd>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <dt className="text-sm font-medium text-muted-foreground">Total value</dt>
              <dd className="mt-1 text-2xl font-bold text-foreground">{inr.format(fv)}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-8">
          <AdSlot slot="calc-mid" format="horizontal" className="mx-auto" />
        </div>

        <div className="mt-8 rounded-xl border border-border bg-muted/80 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Investment vs returns</h2>
          <p className="mt-1 text-sm text-muted-foreground">Illustrative split at maturity</p>
          <div className="mt-6 flex h-10 w-full overflow-hidden rounded-lg">
            <div
              className="flex items-center justify-center bg-primary text-xs font-medium text-white"
              style={{ width: `${invPct}%` }}
            >
              {invPct > 14 ? `${invPct.toFixed(1)}%` : ""}
            </div>
            <div
              className="flex items-center justify-center bg-emerald-600 text-xs font-medium text-white"
              style={{ width: `${retPct}%` }}
            >
              {retPct > 14 ? `${retPct.toFixed(1)}%` : ""}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-6 text-sm">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-primary" />
              Your investment {invPct.toFixed(1)}%
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-emerald-600" />
              Est. returns {retPct.toFixed(1)}%
            </span>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">How it works</h2>
          <p className="mt-2 text-muted-foreground">
            We use the SIP future-value formula for instalments at the <strong>start</strong> of
            each month:{" "}
            <span className="font-mono text-sm">
              FV = P × [((1 + r)<sup>n</sup> − 1) / r] × (1 + r)
            </span>
            , where <em>P</em> is the monthly SIP, <em>r</em> is the monthly rate (annual ÷ 12),
            and <em>n</em> is months. Returns are compounded monthly at the rate you enter—actual
            mutual fund returns vary.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
          <div className="mt-4 space-y-2">
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Is the SIP calculator guaranteed to match my fund statement?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                No. NAV changes daily, loads/taxes may apply, and some SIPs debit at month-end. This
                SIP calculator uses a smooth assumed return for planning only.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                What return should I enter in the SIP calculator?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Use a conservative long-term assumption (e.g. 8–12% for hybrid/equity blends) rather
                than recent bumper years. Stress-test with lower rates to see downside.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Does this SIP calculator include tax on withdrawals?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                It shows gross maturity value. LTCG/STCG rules for equity/debt funds apply at
                redemption and are not modeled here.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Why use monthly SIP from ₹500 to ₹1 Lakh?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Those limits match common retail SIP ranges in India and keep inputs realistic for
                this free SIP calculator tool.
              </p>
            </details>
          </div>
        </section>

        <div className="mt-8">
          <AdSlot slot="calc-bottom" format="rectangle" className="mx-auto" />
        </div>

        <RelatedSection items={getRelatedCalculators("sip-calculator")} />
      </div>
    </div>
  );
}
