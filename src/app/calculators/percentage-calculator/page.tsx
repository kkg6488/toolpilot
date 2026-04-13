"use client";

import { useMemo, useState } from "react";

import { TrackPageView } from "@/components/shared/track-page-view";
import { RelatedSection } from "@/components/shared/related-items";
import { getRelatedCalculators } from "@/lib/related-items";
import { AdSlot } from "@/components/shared/ad-slot";

const inputClass =
  "mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20";

const numberFmt = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 8,
  minimumFractionDigits: 0,
});

const pctFmt = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 4,
  minimumFractionDigits: 0,
});

export default function PercentageCalculatorPage() {
  const [pctOf, setPctOf] = useState({ pct: 15, num: 200 });
  const [partWhole, setPartWhole] = useState({ part: 45, whole: 180 });
  const [change, setChange] = useState({ from: 100, to: 125 });
  const [adjust, setAdjust] = useState({ num: 80, pct: 10 });
  const [adjustMode, setAdjustMode] = useState<"add" | "subtract">("add");

  const ofResult = useMemo(() => {
    const p = pctOf.pct;
    const n = pctOf.num;
    if (!Number.isFinite(p) || !Number.isFinite(n)) return null;
    return n * (p / 100);
  }, [pctOf]);

  const ratioResult = useMemo(() => {
    const { part, whole } = partWhole;
    if (!Number.isFinite(part) || !Number.isFinite(whole) || whole === 0) return null;
    return (part / whole) * 100;
  }, [partWhole]);

  const changeResult = useMemo(() => {
    const { from, to } = change;
    if (!Number.isFinite(from) || !Number.isFinite(to) || from === 0) return null;
    const raw = ((to - from) / from) * 100;
    return { pct: raw, direction: raw > 0 ? "increase" : raw < 0 ? "decrease" : "no change" as const };
  }, [change]);

  const adjustResult = useMemo(() => {
    const { num, pct } = adjust;
    if (!Number.isFinite(num) || !Number.isFinite(pct)) return null;
    const factor = adjustMode === "add" ? 1 + pct / 100 : 1 - pct / 100;
    return num * factor;
  }, [adjust, adjustMode]);

  return (
    <div className="min-h-screen bg-background">
      <TrackPageView name="Percentage Calculator" type="calculator" />
      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Percentage calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Find a percentage of a number, express one value as a percent of another, measure percent
          change, or add or subtract a percentage—all with instant results.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-border/60 bg-card p-6 shadow-md">
            <h2 className="text-lg font-semibold text-foreground">What is X% of Y?</h2>
            <p className="mt-1 text-sm text-muted-foreground">Multiply Y by X ÷ 100.</p>
            <div className="mt-4">
              <label htmlFor="pct-of-x" className="block text-sm font-medium text-foreground">
                Percentage (X)
              </label>
              <input
                id="pct-of-x"
                type="number"
                inputMode="decimal"
                value={pctOf.pct}
                onChange={(e) => setPctOf((s) => ({ ...s, pct: Number(e.target.value) }))}
                className={inputClass}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="pct-of-y" className="block text-sm font-medium text-foreground">
                Number (Y)
              </label>
              <input
                id="pct-of-y"
                type="number"
                inputMode="decimal"
                value={pctOf.num}
                onChange={(e) => setPctOf((s) => ({ ...s, num: Number(e.target.value) }))}
                className={inputClass}
              />
            </div>
            <div className="mt-4 rounded-lg bg-primary/10 p-4">
              <p className="text-sm font-medium text-foreground">Result</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {ofResult !== null ? numberFmt.format(ofResult) : "—"}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border/60 bg-card p-6 shadow-md">
            <h2 className="text-lg font-semibold text-foreground">X is what % of Y?</h2>
            <p className="mt-1 text-sm text-muted-foreground">Divide X by Y, then × 100.</p>
            <div className="mt-4">
              <label htmlFor="part" className="block text-sm font-medium text-foreground">
                Part (X)
              </label>
              <input
                id="part"
                type="number"
                inputMode="decimal"
                value={partWhole.part}
                onChange={(e) => setPartWhole((s) => ({ ...s, part: Number(e.target.value) }))}
                className={inputClass}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="whole" className="block text-sm font-medium text-foreground">
                Whole (Y)
              </label>
              <input
                id="whole"
                type="number"
                inputMode="decimal"
                value={partWhole.whole}
                onChange={(e) => setPartWhole((s) => ({ ...s, whole: Number(e.target.value) }))}
                className={inputClass}
              />
            </div>
            <div className="mt-4 rounded-lg bg-primary/10 p-4">
              <p className="text-sm font-medium text-foreground">Percentage</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {ratioResult !== null ? `${pctFmt.format(ratioResult)}%` : "—"}
              </p>
              {partWhole.whole === 0 && (
                <p className="mt-2 text-sm text-muted-foreground">Whole cannot be zero.</p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border/60 bg-card p-6 shadow-md">
            <h2 className="text-lg font-semibold text-foreground">Percentage increase / decrease</h2>
            <p className="mt-1 text-sm text-muted-foreground">Change from an old value to a new value.</p>
            <div className="mt-4">
              <label htmlFor="from-val" className="block text-sm font-medium text-foreground">
                From (old)
              </label>
              <input
                id="from-val"
                type="number"
                inputMode="decimal"
                value={change.from}
                onChange={(e) => setChange((s) => ({ ...s, from: Number(e.target.value) }))}
                className={inputClass}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="to-val" className="block text-sm font-medium text-foreground">
                To (new)
              </label>
              <input
                id="to-val"
                type="number"
                inputMode="decimal"
                value={change.to}
                onChange={(e) => setChange((s) => ({ ...s, to: Number(e.target.value) }))}
                className={inputClass}
              />
            </div>
            <div className="mt-4 rounded-lg bg-primary/10 p-4">
              <p className="text-sm font-medium text-foreground">Percent change</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {changeResult !== null
                  ? `${changeResult.pct >= 0 ? "+" : ""}${pctFmt.format(changeResult.pct)}%`
                  : "—"}
              </p>
              {changeResult && (
                <p className="mt-2 text-sm capitalize text-muted-foreground">
                  {changeResult.direction === "increase" && "Increase"}
                  {changeResult.direction === "decrease" && "Decrease"}
                  {changeResult.direction === "no change" && "No change"}
                </p>
              )}
              {change.from === 0 && (
                <p className="mt-2 text-sm text-muted-foreground">&quot;From&quot; cannot be zero.</p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border/60 bg-card p-6 shadow-md">
            <h2 className="text-lg font-semibold text-foreground">Add or subtract percentage</h2>
            <p className="mt-1 text-sm text-muted-foreground">Apply a percent on top of or off a base number.</p>
            <div className="mt-4">
              <span className="block text-sm font-medium text-foreground">Operation</span>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setAdjustMode("add")}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    adjustMode === "add"
                      ? "bg-primary text-primary-foreground"
                      : "border border-input bg-card text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  Add %
                </button>
                <button
                  type="button"
                  onClick={() => setAdjustMode("subtract")}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    adjustMode === "subtract"
                      ? "bg-primary text-primary-foreground"
                      : "border border-input bg-card text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  Subtract %
                </button>
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="adjust-num" className="block text-sm font-medium text-foreground">
                Number
              </label>
              <input
                id="adjust-num"
                type="number"
                inputMode="decimal"
                value={adjust.num}
                onChange={(e) => setAdjust((s) => ({ ...s, num: Number(e.target.value) }))}
                className={inputClass}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="adjust-pct" className="block text-sm font-medium text-foreground">
                Percentage
              </label>
              <input
                id="adjust-pct"
                type="number"
                inputMode="decimal"
                value={adjust.pct}
                onChange={(e) => setAdjust((s) => ({ ...s, pct: Number(e.target.value) }))}
                className={inputClass}
              />
            </div>
            <div className="mt-4 rounded-lg bg-primary/10 p-4">
              <p className="text-sm font-medium text-foreground">Result</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {adjustResult !== null ? numberFmt.format(adjustResult) : "—"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <AdSlot slot="calc-mid" format="horizontal" className="mx-auto" />
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">How it works</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>
              <strong className="font-medium text-foreground">X% of Y:</strong> multiply Y by X ÷ 100
              (e.g. 20% of 50 is 50 × 0.2 = 10).
            </li>
            <li>
              <strong className="font-medium text-foreground">X as % of Y:</strong> divide X by Y and
              multiply by 100 (e.g. 15 of 60 is (15 ÷ 60) × 100 = 25%).
            </li>
            <li>
              <strong className="font-medium text-foreground">Increase or decrease:</strong> use
              ((new − old) ÷ old) × 100. Positive means growth; negative means a drop.
            </li>
            <li>
              <strong className="font-medium text-foreground">Add or subtract %:</strong> multiply the
              number by (1 ± percentage ÷ 100)—add increases the base; subtract reduces it.
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
          <div className="mt-4 space-y-2">
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                What is the difference between percentage points and percent change?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Percentage points compare two percentages directly (e.g. 5% to 8% is a 3 percentage
                point rise). Percent change is relative to a starting value (here, from old to new
                numbers).
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Why can&apos;t the &quot;whole&quot; or &quot;from&quot; value be zero?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Dividing by zero is undefined. For &quot;X is what % of Y?&quot;, Y must be non-zero. For
                percent change, the old value must be non-zero so the relative change is meaningful.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                How do I increase a price by 10% then decrease it by 10%?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                They don&apos;t cancel out because the second step uses a new base. Example: 100 + 10% =
                110; 110 − 10% = 99. Use this calculator twice, or chain the formulas manually.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Are results rounded?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                We format with a reasonable number of decimal places for display. Under the hood,
                calculations use JavaScript floating-point math; for money or legal use, round using
                your own rules after copying the value.
              </p>
            </details>
          </div>
        </section>

        <div className="mt-8">
          <AdSlot slot="calc-bottom" format="rectangle" className="mx-auto" />
        </div>

        <RelatedSection items={getRelatedCalculators("percentage-calculator")} />
      </div>
    </div>
  );
}
