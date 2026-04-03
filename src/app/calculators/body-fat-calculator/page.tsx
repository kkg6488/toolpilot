"use client";

import { useMemo, useState } from "react";

type Gender = "male" | "female";
type LenUnit = "cm" | "in";
type MassUnit = "kg" | "lbs";

/** US Navy formula: all lengths in inches. */
function bodyFatPercentNavy(
  gender: Gender,
  heightIn: number,
  waistIn: number,
  neckIn: number,
  hipIn: number
): number | null {
  if (heightIn <= 0 || neckIn <= 0 || waistIn <= 0) return null;
  if (gender === "male") {
    const diff = waistIn - neckIn;
    if (diff <= 0) return null;
    const bf =
      86.010 * Math.log10(diff) - 70.041 * Math.log10(heightIn) + 36.76;
    return bf;
  }
  const sum = waistIn + hipIn - neckIn;
  if (sum <= 0 || hipIn <= 0) return null;
  const bf =
    163.205 * Math.log10(sum) - 97.684 * Math.log10(heightIn) - 78.387;
  return bf;
}

type BodyFatResult =
  | { status: "error"; message: string }
  | { status: "ok"; bf: number; fatKg: number; leanKg: number; category: string };

function categoryForBf(gender: Gender, pct: number): string {
  if (gender === "male") {
    if (pct < 2) return "Below typical range (check measurements)";
    if (pct <= 5) return "Essential fat";
    if (pct <= 13) return "Athletes";
    if (pct <= 17) return "Fitness";
    if (pct <= 24) return "Average";
    return "Obese";
  }
  if (pct < 10) return "Below typical range (check measurements)";
  if (pct <= 13) return "Essential fat";
  if (pct <= 20) return "Athletes";
  if (pct <= 24) return "Fitness";
  if (pct <= 31) return "Average";
  return "Obese";
}

export default function BodyFatCalculatorPage() {
  const [gender, setGender] = useState<Gender>("male");
  const [lenUnit, setLenUnit] = useState<LenUnit>("cm");
  const [massUnit, setMassUnit] = useState<MassUnit>("kg");
  const [weightKg, setWeightKg] = useState(75);
  const [weightLb, setWeightLb] = useState(165);

  const [heightCm, setHeightCm] = useState(175);
  const [heightInWhole, setHeightInWhole] = useState(69);
  const [waistCm, setWaistCm] = useState(90);
  const [waistIn, setWaistIn] = useState(35.4);
  const [neckCm, setNeckCm] = useState(38);
  const [neckIn, setNeckIn] = useState(15);
  const [hipCm, setHipCm] = useState(100);
  const [hipIn, setHipIn] = useState(39.4);

  const weightKgResolved = useMemo(() => {
    if (massUnit === "kg") return weightKg;
    return weightLb * 0.45359237;
  }, [massUnit, weightKg, weightLb]);

  const results = useMemo((): BodyFatResult => {
    if (weightKgResolved <= 0) {
      return {
        status: "error",
        message: "Enter a positive body weight to estimate fat mass and lean mass.",
      };
    }

    const heightInches = lenUnit === "cm" ? heightCm / 2.54 : heightInWhole;
    const waistInches = lenUnit === "cm" ? waistCm / 2.54 : waistIn;
    const neckInches = lenUnit === "cm" ? neckCm / 2.54 : neckIn;
    const hipInches =
      gender === "female" ? (lenUnit === "cm" ? hipCm / 2.54 : hipIn) : 0;

    const bfRaw = bodyFatPercentNavy(
      gender,
      heightInches,
      waistInches,
      neckInches,
      hipInches
    );

    if (bfRaw == null || !Number.isFinite(bfRaw)) {
      return {
        status: "error",
        message: "Enter valid measurements. For men, waist must be greater than neck.",
      };
    }
    if (bfRaw < 0 || bfRaw > 75) {
      return {
        status: "error",
        message:
          "Result is outside a plausible range. Double-check units and that tape is level (waist at navel).",
      };
    }

    const fatKg = (weightKgResolved * bfRaw) / 100;
    const leanKg = weightKgResolved - fatKg;
    const category = categoryForBf(gender, bfRaw);

    return {
      status: "ok",
      bf: bfRaw,
      fatKg,
      leanKg,
      category,
    };
  }, [
    gender,
    lenUnit,
    heightCm,
    heightInWhole,
    waistCm,
    waistIn,
    neckCm,
    neckIn,
    hipCm,
    hipIn,
    weightKgResolved,
  ]);

  const inputClass =
    "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20";

  const displayMass = (kg: number) => {
    if (massUnit === "kg") return `${kg.toFixed(1)} kg`;
    return `${(kg / 0.45359237).toFixed(1)} lbs`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Body fat calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          US Navy method from circumference measurements. Men: height, waist (at navel), neck. Women: same
          plus hip. Add weight to estimate fat mass and lean mass. Switch between centimetres and inches.
        </p>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Measurements</h2>

          <div className="mt-4">
            <span className="block text-sm font-medium text-foreground">Sex (formula)</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {(["male", "female"] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition ${
                    gender === g
                      ? "bg-primary text-primary-foreground"
                      : "border border-input bg-card text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-foreground">Length unit</span>
            <div className="flex flex-wrap gap-2">
              {(["cm", "in"] as const).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setLenUnit(u)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                    lenUnit === u
                      ? "bg-primary text-primary-foreground"
                      : "border border-input bg-card text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <span className="block text-sm font-medium text-foreground">Body weight (for mass breakdown)</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {(["kg", "lbs"] as const).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setMassUnit(u)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                    massUnit === u
                      ? "bg-primary text-primary-foreground"
                      : "border border-input bg-card text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
            <input
              type="number"
              min={1}
              step={0.1}
              value={massUnit === "kg" ? weightKg : weightLb}
              onChange={(e) => {
                const v = Number(e.target.value) || 0;
                if (massUnit === "kg") setWeightKg(v);
                else setWeightLb(v);
              }}
              className={`mt-2 ${inputClass}`}
              aria-label="Body weight"
            />
          </div>

          <div className="mt-6 space-y-4">
            {lenUnit === "cm" ? (
              <div>
                <label htmlFor="h" className="block text-sm font-medium text-foreground">
                  Height (cm)
                </label>
                <input
                  id="h"
                  type="number"
                  min={50}
                  max={260}
                  step={0.5}
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value) || 0)}
                  className={`mt-1 ${inputClass}`}
                />
              </div>
            ) : (
              <div>
                <label htmlFor="htin" className="block text-sm font-medium text-foreground">
                  Height (inches, total)
                </label>
                <input
                  id="htin"
                  type="number"
                  min={36}
                  max={96}
                  step={0.25}
                  value={heightInWhole}
                  onChange={(e) => setHeightInWhole(Number(e.target.value) || 0)}
                  className={`mt-1 ${inputClass}`}
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  Enter total height in inches (e.g. 69 for 5 ft 9 in).
                </p>
              </div>
            )}

            <div>
              <label htmlFor="waist" className="block text-sm font-medium text-foreground">
                Waist at navel ({lenUnit})
              </label>
              <input
                id="waist"
                type="number"
                min={1}
                step={0.1}
                value={lenUnit === "cm" ? waistCm : waistIn}
                onChange={(e) => {
                  const v = Number(e.target.value) || 0;
                  if (lenUnit === "cm") setWaistCm(v);
                  else setWaistIn(v);
                }}
                className={`mt-1 ${inputClass}`}
              />
            </div>

            <div>
              <label htmlFor="neck" className="block text-sm font-medium text-foreground">
                Neck ({lenUnit})
              </label>
              <input
                id="neck"
                type="number"
                min={1}
                step={0.1}
                value={lenUnit === "cm" ? neckCm : neckIn}
                onChange={(e) => {
                  const v = Number(e.target.value) || 0;
                  if (lenUnit === "cm") setNeckCm(v);
                  else setNeckIn(v);
                }}
                className={`mt-1 ${inputClass}`}
              />
            </div>

            {gender === "female" && (
              <div>
                <label htmlFor="hip" className="block text-sm font-medium text-foreground">
                  Hip ({lenUnit})
                </label>
                <input
                  id="hip"
                  type="number"
                  min={1}
                  step={0.1}
                  value={lenUnit === "cm" ? hipCm : hipIn}
                  onChange={(e) => {
                    const v = Number(e.target.value) || 0;
                    if (lenUnit === "cm") setHipCm(v);
                    else setHipIn(v);
                  }}
                  className={`mt-1 ${inputClass}`}
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Results</h2>
          {results.status === "error" ? (
            <p className="mt-4 text-muted-foreground">{results.message}</p>
          ) : (
            <div className="mt-4 space-y-4">
              <div className="rounded-lg bg-primary/10 p-4">
                <p className="text-sm font-medium text-primary">Estimated body fat</p>
                <p className="mt-1 text-3xl font-bold text-primary">{results.bf.toFixed(1)}%</p>
                <p className="mt-2 text-sm font-medium text-foreground">Category: {results.category}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Bands are common reference ranges (essential / athletes / fitness / average / obese) and
                  vary by source.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-border/60 bg-background/50 p-4">
                  <p className="text-sm font-medium text-foreground">Fat mass</p>
                  <p className="mt-1 text-xl font-semibold text-primary">
                    {displayMass(results.fatKg)}
                  </p>
                </div>
                <div className="rounded-lg border border-border/60 bg-background/50 p-4">
                  <p className="text-sm font-medium text-foreground">Lean mass</p>
                  <p className="mt-1 text-xl font-semibold text-primary">
                    {displayMass(results.leanKg)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">How it works</h2>
          <p className="mt-2 text-muted-foreground">
            The US Navy estimates body density from circumferences, then maps to body fat %. All terms in
            the published equation use the same length unit—here we use{" "}
            <strong className="font-medium text-foreground">inches</strong> internally (centimetres are
            converted). Men:{" "}
            <span className="font-mono text-xs sm:text-sm">
              86.010×log₁₀(waist−neck) − 70.041×log₁₀(height) + 36.76
            </span>
            . Women add hip:{" "}
            <span className="font-mono text-xs sm:text-sm">
              163.205×log₁₀(waist+hip−neck) − 97.684×log₁₀(height) − 78.387
            </span>
            . Fat mass and lean mass apply your entered weight to that percentage.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
          <div className="mt-4 space-y-2">
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                How accurate is the US Navy method?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                It correlates reasonably with lab methods for many people but can be off if measurements
                are inconsistent, if you are very muscular, or if body shape differs from the populations
                used to build the equations.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Where exactly should I measure?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Waist is at the navel with a horizontal tape; neck is just below the larynx, sloping
                slightly down. Hip (women) is the widest part of the hips/buttocks. Keep the tape snug but
                not compressing skin.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Why must waist be larger than neck (men)?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                The male formula uses log₁₀(waist − neck). If waist ≤ neck, the math is invalid or
                meaningless—usually a sign of wrong units or mis-measurement.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Do categories replace medical advice?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                No. Categories are simplified labels. Health risk depends on many factors; use this tool
                for awareness and discuss goals with a qualified professional if needed.
              </p>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}
