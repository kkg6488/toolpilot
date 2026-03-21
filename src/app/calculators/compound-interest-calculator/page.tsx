"use client";

import { useMemo, useState } from "react";

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

type Frequency = "daily" | "monthly" | "quarterly" | "annually";

const FREQ: Record<Frequency, { n: number; label: string }> = {
  daily: { n: 365, label: "Daily" },
  monthly: { n: 12, label: "Monthly" },
  quarterly: { n: 4, label: "Quarterly" },
  annually: { n: 1, label: "Annually" },
};

function pmtPerCompoundPeriod(monthly: number, freq: Frequency): number {
  switch (freq) {
    case "monthly":
      return monthly;
    case "quarterly":
      return monthly * 3;
    case "annually":
      return monthly * 12;
    case "daily":
      return (monthly * 12) / 365;
    default:
      return monthly;
  }
}

export default function CompoundInterestCalculatorPage() {
  const [principal, setPrincipal] = useState(10_000);
  const [monthly, setMonthly] = useState(200);
  const [annualRatePct, setAnnualRatePct] = useState(7);
  const [years, setYears] = useState(20);
  const [frequency, setFrequency] = useState<Frequency>("monthly");

  const result = useMemo(() => {
    const P = Math.min(10_000_000, Math.max(1, principal));
    const PMTm = Math.min(50_000, Math.max(0, monthly));
    const rAnnual = Math.min(30, Math.max(0.1, annualRatePct)) / 100;
    const t = Math.min(50, Math.max(1, years));
    const { n } = FREQ[frequency];
    const periods = n * t;
    const pmt = pmtPerCompoundPeriod(PMTm, frequency);
    const i = rAnnual / n;

    let compoundPart: number;
    let annuityPart: number;

    if (Math.abs(i) < 1e-15) {
      compoundPart = P;
      annuityPart = pmt * periods;
    } else {
      const factor = Math.pow(1 + i, periods);
      compoundPart = P * factor;
      annuityPart = pmt * ((factor - 1) / i);
    }

    const future = compoundPart + annuityPart;
    const totalContributions = P + PMTm * 12 * t;
    const interestEarned = Math.max(0, future - totalContributions);
    const contribPct = future > 0 ? (totalContributions / future) * 100 : 50;
    const interestPct = future > 0 ? (interestEarned / future) * 100 : 50;

    return { future, totalContributions, interestEarned, contribPct, interestPct };
  }, [principal, monthly, annualRatePct, years, frequency]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Compound interest calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          See how an initial balance plus monthly contributions grow with compound interest. We map
          monthly deposits to each compounding period (e.g. quarterly = 3× monthly per period).
        </p>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Inputs</h2>
          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="p" className="block text-sm font-medium text-foreground">
                Initial investment ($1 – $10M)
              </label>
              <input
                id="p"
                type="number"
                min={1}
                max={10_000_000}
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
              <p className="mt-1 text-xs text-muted-foreground">{usd.format(principal)}</p>
            </div>
            <div>
              <label htmlFor="pmt" className="block text-sm font-medium text-foreground">
                Monthly contribution ($0 – $50K)
              </label>
              <input
                id="pmt"
                type="number"
                min={0}
                max={50_000}
                value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="rate" className="block text-sm font-medium text-foreground">
                  Annual interest rate (0.1% – 30%)
                </label>
                <input
                  id="rate"
                  type="number"
                  min={0.1}
                  max={30}
                  step={0.05}
                  value={annualRatePct}
                  onChange={(e) => setAnnualRatePct(Number(e.target.value) || 0)}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
              <div>
                <label htmlFor="yrs" className="block text-sm font-medium text-foreground">
                  Time period (1 – 50 years)
                </label>
                <input
                  id="yrs"
                  type="number"
                  min={1}
                  max={50}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value) || 0)}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
            </div>
            <div>
              <label htmlFor="freq" className="block text-sm font-medium text-foreground">
                Compounding frequency
              </label>
              <select
                id="freq"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value as Frequency)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              >
                {(Object.keys(FREQ) as Frequency[]).map((k) => (
                  <option key={k} value={k}>
                    {FREQ[k].label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Results</h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-primary/10 p-4 sm:col-span-3 sm:sm:col-span-1">
              <dt className="text-sm font-medium text-primary">Future value</dt>
              <dd className="mt-1 text-2xl font-bold text-primary">
                {usdDetailed.format(result.future)}
              </dd>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <dt className="text-sm font-medium text-muted-foreground">Total contributions</dt>
              <dd className="mt-1 text-xl font-bold text-foreground">
                {usd.format(result.totalContributions)}
              </dd>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <dt className="text-sm font-medium text-muted-foreground">Total interest earned</dt>
              <dd className="mt-1 text-xl font-bold text-foreground">
                {usd.format(result.interestEarned)}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-8 rounded-xl border border-border bg-muted/80 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Contributions vs interest</h2>
          <p className="mt-1 text-sm text-muted-foreground">Share of ending balance</p>
          <div className="mt-6 flex h-10 w-full overflow-hidden rounded-lg">
            <div
              className="flex items-center justify-center bg-primary text-xs font-medium text-primary-foreground"
              style={{ width: `${result.contribPct}%` }}
            >
              {result.contribPct > 12 ? `${result.contribPct.toFixed(1)}%` : ""}
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
              Contributions {result.contribPct.toFixed(1)}%
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
            Future value combines growth on the lump sum and an annuity of deposits each compounding
            period:{" "}
            <span className="font-mono text-sm">
              A = P(1 + r/n)<sup>nt</sup> + PMT × [((1 + r/n)<sup>nt</sup> − 1) / (r/n)]
            </span>
            , where <em>r</em> is the annual rate (decimal), <em>n</em> is compounding periods per
            year, <em>t</em> is years, and <em>PMT</em> is the amount added each compounding period.
            Your monthly contribution is converted to that period (e.g. 3× monthly when compounded
            quarterly). At 0% rate, growth is linear: principal plus all monthly deposits.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
          <div className="mt-4 space-y-2">
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Is daily compounding exactly how my bank works?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Institutions differ on day-count, posting dates, and tiers. This is a standard
                mathematical model for planning—not a specific product quote.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Why convert monthly deposits for quarterly compounding?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                The closed-form formula needs one payment per compounding period. We use 3× your
                monthly amount per quarter as a simple aggregation; some accounts instead compound
                monthly on a running balance.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Does this include taxes or inflation?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                No. Reported future value is nominal. After-tax returns and real purchasing power can
                be lower.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                What if I change contributions over time?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                This model assumes a steady monthly contribution. Lumpy or changing deposits need a
                month-by-month simulation for precision.
              </p>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}
