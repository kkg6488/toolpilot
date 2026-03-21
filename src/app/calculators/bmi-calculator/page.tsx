"use client";

import { useMemo, useState } from "react";

type Unit = "metric" | "imperial";

type BmiCategory = {
  key: string;
  label: string;
  min: number;
  max: number;
  color: string;
  textClass: string;
};

const CATEGORIES: BmiCategory[] = [
  { key: "under", label: "Underweight", min: 0, max: 18.5, color: "bg-sky-500", textClass: "text-sky-700" },
  { key: "normal", label: "Normal", min: 18.5, max: 25, color: "bg-emerald-500", textClass: "text-emerald-700" },
  { key: "over", label: "Overweight", min: 25, max: 30, color: "bg-amber-500", textClass: "text-amber-800" },
  { key: "obese", label: "Obese", min: 30, max: 100, color: "bg-rose-500", textClass: "text-rose-700" },
];

function categoryForBmi(bmi: number): BmiCategory {
  if (bmi < 18.5) return CATEGORIES[0];
  if (bmi < 25) return CATEGORIES[1];
  if (bmi < 30) return CATEGORIES[2];
  return CATEGORIES[3];
}

export default function BmiCalculatorPage() {
  const [unit, setUnit] = useState<Unit>("metric");
  const [weightKg, setWeightKg] = useState(70);
  const [heightCm, setHeightCm] = useState(175);
  const [weightLb, setWeightLb] = useState(160);
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(10);

  const bmi = useMemo(() => {
    if (unit === "metric") {
      const hM = heightCm / 100;
      if (hM <= 0 || weightKg <= 0) return null;
      return weightKg / (hM * hM);
    }
    const totalIn = feet * 12 + inches;
    if (totalIn <= 0 || weightLb <= 0) return null;
    return (703 * weightLb) / (totalIn * totalIn);
  }, [unit, weightKg, heightCm, weightLb, feet, inches]);

  const cat = bmi != null ? categoryForBmi(bmi) : null;

  const scaleMin = 15;
  const scaleMax = 40;
  const markerPct =
    bmi != null
      ? Math.min(100, Math.max(0, ((bmi - scaleMin) / (scaleMax - scaleMin)) * 100))
      : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          BMI calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Enter your height and weight using metric or US units. BMI is weight (kg) divided by height
          (m) squared; we show your category and position on a simple scale.
        </p>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Your measurements</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {(["metric", "imperial"] as const).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setUnit(u)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition ${
                  unit === u
                    ? "bg-primary text-primary-foreground"
                    : "border border-input bg-card text-muted-foreground hover:border-primary/40"
                }`}
              >
                {u}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-5">
            {unit === "metric" ? (
              <>
                <div>
                  <label htmlFor="kg" className="block text-sm font-medium text-foreground">
                    Weight (kg)
                  </label>
                  <input
                    id="kg"
                    type="number"
                    min={1}
                    max={500}
                    step={0.1}
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value) || 0)}
                    className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                  />
                </div>
                <div>
                  <label htmlFor="cm" className="block text-sm font-medium text-foreground">
                    Height (cm)
                  </label>
                  <input
                    id="cm"
                    type="number"
                    min={50}
                    max={280}
                    step={0.5}
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value) || 0)}
                    className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="lb" className="block text-sm font-medium text-foreground">
                    Weight (lbs)
                  </label>
                  <input
                    id="lb"
                    type="number"
                    min={1}
                    max={1000}
                    step={0.1}
                    value={weightLb}
                    onChange={(e) => setWeightLb(Number(e.target.value) || 0)}
                    className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="ft" className="block text-sm font-medium text-foreground">
                      Height — feet
                    </label>
                    <input
                      id="ft"
                      type="number"
                      min={3}
                      max={8}
                      value={feet}
                      onChange={(e) => setFeet(Number(e.target.value) || 0)}
                      className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="in" className="block text-sm font-medium text-foreground">
                      Height — inches
                    </label>
                    <input
                      id="in"
                      type="number"
                      min={0}
                      max={11}
                      value={inches}
                      onChange={(e) => setInches(Number(e.target.value) || 0)}
                      className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Results</h2>
          {bmi == null || !Number.isFinite(bmi) ? (
            <p className="mt-4 text-muted-foreground">Enter valid height and weight to see your BMI.</p>
          ) : (
            <>
              <div className="mt-4 rounded-lg bg-primary/10 p-4">
                <p className="text-sm font-medium text-primary">Body Mass Index</p>
                <p className="mt-1 text-4xl font-bold text-primary">{bmi.toFixed(1)}</p>
                <p className={`mt-2 text-lg font-semibold ${cat?.textClass ?? ""}`}>{cat?.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Underweight &lt;18.5 · Normal 18.5–24.9 · Overweight 25–29.9 · Obese 30+
                </p>
              </div>

              <div className="mt-8">
                <p className="text-sm font-medium text-foreground">BMI scale (15–40)</p>
                <div className="relative mt-3">
                  <div className="flex h-8 w-full overflow-hidden rounded-lg text-[10px] font-medium text-white">
                    <div className="flex w-[14%] items-center justify-center bg-sky-500">&lt;18.5</div>
                    <div className="flex w-[26%] items-center justify-center bg-emerald-500">18.5–25</div>
                    <div className="flex w-[20%] items-center justify-center bg-amber-500">25–30</div>
                    <div className="flex flex-1 items-center justify-center bg-rose-500">30+</div>
                  </div>
                  <div
                    className="absolute top-0 h-8 w-0.5 -translate-x-1/2 bg-slate-900 shadow-sm"
                    style={{ left: `${markerPct}%` }}
                    title={`BMI ${bmi.toFixed(1)}`}
                  />
                  <div
                    className="absolute -top-1 h-2 w-2 -translate-x-1/2 rounded-full border-2 border-white bg-slate-900 shadow"
                    style={{ left: `${markerPct}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Marker shows your BMI on a fixed 15–40 scale (values outside are clamped for display).
                </p>
              </div>
            </>
          )}
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">How it works</h2>
          <p className="mt-2 text-muted-foreground">
            BMI = weight (kg) ÷ height (m)<sup>2</sup>. In imperial units, an equivalent form is{" "}
            <span className="font-mono text-sm">703 × weight(lb) ÷ height(in)²</span>. Categories follow
            common WHO-style cutoffs for adults; they are screening tools, not diagnoses.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
          <div className="mt-4 space-y-2">
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Is BMI accurate for everyone?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                BMI does not distinguish muscle from fat and can misclassify very muscular people. Older
                adults and some ethnic groups may use adjusted interpretations—ask a clinician.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Should children use this calculator?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                This tool uses adult thresholds. For children and teens, BMI is compared to age- and
                sex-specific growth charts—not the fixed 18.5–25 bands.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                What if my height is feet and inches only?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                In imperial mode, enter whole feet and inches (0–11) separately; we combine them for the
                calculation.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Does this replace medical advice?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                No. Use results for general awareness and discuss health goals with a qualified
                professional.
              </p>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}
