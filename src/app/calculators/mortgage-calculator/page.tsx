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

const MIN_PRICE = 50_000;
const MAX_PRICE = 5_000_000;

type DownMode = "percent" | "dollar";

export default function MortgageCalculatorPage() {
  const [homePrice, setHomePrice] = useState(400_000);
  const [downMode, setDownMode] = useState<DownMode>("percent");
  const [downPercent, setDownPercent] = useState(20);
  const [downDollar, setDownDollar] = useState(80_000);
  const [annualRate, setAnnualRate] = useState(6.5);
  const [termYears, setTermYears] = useState<15 | 30>(30);
  const [propertyTaxPct, setPropertyTaxPct] = useState(1.2);
  const [insuranceYearly, setInsuranceYearly] = useState(1_500);

  const result = useMemo(() => {
    const price = Math.min(MAX_PRICE, Math.max(MIN_PRICE, homePrice));
    const down =
      downMode === "percent"
        ? Math.min(price * 0.5, Math.max(0, (price * Math.min(50, Math.max(0, downPercent))) / 100))
        : Math.min(price * 0.5, Math.max(0, Math.min(price, downDollar)));
    const loan = Math.max(0, price - down);
    const n = termYears * 12;
    const r = annualRate / 100 / 12;

    let pi = 0;
    if (loan > 0 && n > 0) {
      if (r === 0) {
        pi = loan / n;
      } else {
        const pow = Math.pow(1 + r, n);
        pi = (loan * r * pow) / (pow - 1);
      }
    }

    const monthlyTax = (price * (propertyTaxPct / 100)) / 12;
    const monthlyIns = Math.max(0, insuranceYearly) / 12;
    const monthlyTotal = pi + monthlyTax + monthlyIns;

    const totalPI = pi * n;
    const totalInterest = Math.max(0, totalPI - loan);
    const totalTax = monthlyTax * n;
    const totalIns = monthlyIns * n;
    const totalCost = down + totalPI + totalTax + totalIns;

    const spend = totalCost > 0 ? totalCost : 1;
    const principalShare = (loan / spend) * 100;
    const interestShare = (totalInterest / spend) * 100;
    const taxShare = (totalTax / spend) * 100;
    const insShare = (totalIns / spend) * 100;

    return {
      price,
      down,
      loan,
      pi,
      monthlyTax,
      monthlyIns,
      monthlyTotal,
      totalInterest,
      totalCost,
      principalShare,
      interestShare,
      taxShare,
      insShare,
      n,
    };
  }, [
    homePrice,
    downMode,
    downPercent,
    downDollar,
    annualRate,
    termYears,
    propertyTaxPct,
    insuranceYearly,
  ]);

  const segments = [
    { label: "Principal", pct: result.principalShare, className: "bg-primary" },
    { label: "Interest", pct: result.interestShare, className: "bg-slate-500" },
    { label: "Property tax", pct: result.taxShare, className: "bg-amber-500" },
    { label: "Insurance", pct: result.insShare, className: "bg-sky-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Mortgage calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Estimate your monthly US mortgage payment with principal &amp; interest, property tax, and
          homeowners insurance. See total interest and lifetime cost.
        </p>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Home &amp; loan details</h2>
          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-foreground">
                Home price ($50K – $5M)
              </label>
              <input
                id="price"
                type="number"
                min={MIN_PRICE}
                max={MAX_PRICE}
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
              <p className="mt-1 text-xs text-muted-foreground">{usd.format(homePrice)}</p>
            </div>

            <div>
              <span className="block text-sm font-medium text-foreground">Down payment</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {(["percent", "dollar"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setDownMode(m)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                      downMode === m
                        ? "bg-primary text-primary-foreground"
                        : "border border-input bg-card text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    {m === "percent" ? "Percent (%)" : "Dollar ($)"}
                  </button>
                ))}
              </div>
              {downMode === "percent" ? (
                <input
                  type="number"
                  min={0}
                  max={50}
                  step={0.5}
                  value={downPercent}
                  onChange={(e) => setDownPercent(Number(e.target.value) || 0)}
                  className="mt-3 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              ) : (
                <input
                  type="number"
                  min={0}
                  value={downDollar}
                  onChange={(e) => setDownDollar(Number(e.target.value) || 0)}
                  className="mt-3 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              )}
              <p className="mt-1 text-xs text-muted-foreground">Down: {usd.format(result.down)}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="rate" className="block text-sm font-medium text-foreground">
                  Interest rate (1% – 15% per year)
                </label>
                <input
                  id="rate"
                  type="number"
                  min={1}
                  max={15}
                  step={0.01}
                  value={annualRate}
                  onChange={(e) => setAnnualRate(Number(e.target.value) || 0)}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
              <div>
                <label htmlFor="term" className="block text-sm font-medium text-foreground">
                  Loan term
                </label>
                <select
                  id="term"
                  value={termYears}
                  onChange={(e) => setTermYears(Number(e.target.value) as 15 | 30)}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                >
                  <option value={15}>15 years</option>
                  <option value={30}>30 years</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="tax" className="block text-sm font-medium text-foreground">
                  Property tax (% of home value / year)
                </label>
                <input
                  id="tax"
                  type="number"
                  min={0}
                  max={5}
                  step={0.05}
                  value={propertyTaxPct}
                  onChange={(e) => setPropertyTaxPct(Number(e.target.value) || 0)}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
              <div>
                <label htmlFor="ins" className="block text-sm font-medium text-foreground">
                  Home insurance ($ / year)
                </label>
                <input
                  id="ins"
                  type="number"
                  min={0}
                  value={insuranceYearly}
                  onChange={(e) => setInsuranceYearly(Number(e.target.value) || 0)}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Results</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Loan {usd.format(result.loan)} · {result.n} payments
          </p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-primary/10 p-4 sm:col-span-2">
              <dt className="text-sm font-medium text-primary">Total monthly payment</dt>
              <dd className="mt-1 text-2xl font-bold text-primary">
                {usdDetailed.format(result.monthlyTotal)}
              </dd>
              <dd className="mt-3 grid gap-2 text-sm text-primary/90 sm:grid-cols-3">
                <span>P&amp;I: {usdDetailed.format(result.pi)}</span>
                <span>Tax: {usdDetailed.format(result.monthlyTax)}</span>
                <span>Insurance: {usdDetailed.format(result.monthlyIns)}</span>
              </dd>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <dt className="text-sm font-medium text-muted-foreground">Total interest (P&amp;I)</dt>
              <dd className="mt-1 text-xl font-bold text-foreground">
                {usd.format(result.totalInterest)}
              </dd>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <dt className="text-sm font-medium text-muted-foreground">Total cost (down + all payments)</dt>
              <dd className="mt-1 text-xl font-bold text-foreground">{usd.format(result.totalCost)}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-8 rounded-xl border border-border bg-muted/80 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Lifetime payment mix</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Share of principal, interest, property tax, and insurance over the loan term
          </p>
          <div className="mt-6 flex h-10 w-full overflow-hidden rounded-lg">
            {segments.map((s) => (
              <div
                key={s.label}
                className={`flex min-w-0 items-center justify-center text-xs font-medium text-white ${s.className}`}
                style={{ width: `${s.pct}%` }}
                title={s.label}
              >
                {s.pct > 8 ? `${s.pct.toFixed(1)}%` : ""}
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            {segments.map((s) => (
              <span key={s.label} className="flex items-center gap-2">
                <span className={`h-3 w-3 rounded ${s.className}`} />
                {s.label} {s.pct.toFixed(1)}%
              </span>
            ))}
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">How it works</h2>
          <p className="mt-2 text-muted-foreground">
            Principal &amp; interest use standard fixed-rate amortization:{" "}
            <span className="font-mono text-sm">
              M = P × r(1 + r)<sup>n</sup> / ((1 + r)<sup>n</sup> − 1)
            </span>
            , where <em>P</em> is the loan amount, <em>r</em> is the monthly rate (annual ÷ 12), and{" "}
            <em>n</em> is months. Monthly property tax is (home value × annual tax %) ÷ 12; insurance is
            annual premium ÷ 12. Total cost includes your down payment plus all monthly payments over
            the term.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
          <div className="mt-4 space-y-2">
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Does this include PMI or HOA?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                No. PMI, HOA fees, and escrow adjustments vary by lender and property. Add those
                separately if they apply.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Is property tax based on purchase price?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                We apply your annual % to the entered home price as a simple estimate. Assessed value
                and mill rates differ by county—use official tax bills for exact amounts.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Why 15- and 30-year terms only?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                These are the most common US fixed-rate terms. Other terms exist; your lender can quote
                payments for any amortization schedule.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Will my payment match the lender’s disclosure?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Close for P&amp;I if the rate and balance match. Final figures depend on closing costs,
                escrow, rounding, and day-count conventions—always rely on your Loan Estimate and
                Closing Disclosure.
              </p>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}
