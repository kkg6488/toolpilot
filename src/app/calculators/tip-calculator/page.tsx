"use client";

import { useMemo, useState } from "react";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const PRESETS = [10, 15, 18, 20, 25] as const;

export default function TipCalculatorPage() {
  const [bill, setBill] = useState(48.5);
  const [tipPct, setTipPct] = useState(18);
  const [customMode, setCustomMode] = useState(false);
  const [people, setPeople] = useState(2);

  const { tipAmount, total, perPerson } = useMemo(() => {
    const b = Math.max(0, bill);
    const pct = Math.min(100, Math.max(0, tipPct));
    const tip = b * (pct / 100);
    const tot = b + tip;
    const p = Math.min(20, Math.max(1, Math.round(people)));
    return { tipAmount: tip, total: tot, perPerson: tot / p };
  }, [bill, tipPct, people]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-lg px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Tip calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Enter the bill, tap a tip preset or set your own, and split between 1–20 people.
        </p>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <div>
            <label htmlFor="bill" className="block text-sm font-medium text-foreground">
              Bill amount
            </label>
            <input
              id="bill"
              type="number"
              min={0}
              step={0.01}
              value={bill}
              onChange={(e) => setBill(Number(e.target.value) || 0)}
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-lg text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>

          <div className="mt-6">
            <span className="block text-sm font-medium text-foreground">Tip percentage</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => {
                    setCustomMode(false);
                    setTipPct(p);
                  }}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    !customMode && tipPct === p
                      ? "bg-primary text-primary-foreground"
                      : "border border-input bg-card text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {p}%
                </button>
              ))}
              <button
                type="button"
                onClick={() => setCustomMode(true)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  customMode
                    ? "bg-primary text-primary-foreground"
                    : "border border-input bg-card text-muted-foreground hover:border-primary/40"
                }`}
              >
                Custom
              </button>
            </div>
            {customMode && (
              <input
                type="number"
                min={0}
                max={100}
                step={0.5}
                value={tipPct}
                onChange={(e) => setTipPct(Number(e.target.value) || 0)}
                className="mt-3 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            )}
          </div>

          <div className="mt-6">
            <label htmlFor="people" className="block text-sm font-medium text-foreground">
              Number of people (1–20)
            </label>
            <input
              id="people"
              type="number"
              min={1}
              max={20}
              value={people}
              onChange={(e) => setPeople(Number(e.target.value) || 1)}
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
            />
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Results</h2>
          <dl className="mt-4 space-y-3">
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-sm text-muted-foreground">Tip amount</dt>
              <dd className="text-xl font-bold text-foreground">{usd.format(tipAmount)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 rounded-lg bg-primary/10 px-3 py-3">
              <dt className="text-sm font-medium text-primary">Total with tip</dt>
              <dd className="text-2xl font-bold text-primary">{usd.format(total)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4">
              <dt className="text-sm text-muted-foreground">Each person pays</dt>
              <dd className="text-xl font-bold text-foreground">{usd.format(perPerson)}</dd>
            </div>
          </dl>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">How it works</h2>
          <p className="mt-2 text-muted-foreground">
            Tip = bill × (tip % ÷ 100). Total = bill + tip. Per person = total ÷ party size. Rounding
            in real life may differ by how the POS splits checks.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
          <div className="mt-4 space-y-2">
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Tip on pre-tax or post-tax amount?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                This calculator tips on the bill you enter. Some people tip on the subtotal before tax;
                others on the full ticket—use whichever you prefer.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Does this include sales tax?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Only if you type a bill that already includes tax. Add tax to the bill field first if
                that’s your convention.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                What about cash vs card rounding?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                We show exact cents. Rounding to whole dollars for cash is up to you and the venue.
              </p>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}
