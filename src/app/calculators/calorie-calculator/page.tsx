"use client";

import { useMemo, useState } from "react";

type Gender = "male" | "female";
type MassUnit = "kg" | "lbs";
type HeightUnit = "cm" | "ftin";
type ActivityKey = "sedentary" | "light" | "moderate" | "active" | "very";

const ACTIVITY: { key: ActivityKey; label: string; mult: number; hint: string }[] = [
  { key: "sedentary", label: "Sedentary", mult: 1.2, hint: "Little or no exercise" },
  { key: "light", label: "Light", mult: 1.375, hint: "Light exercise 1–3 days/week" },
  { key: "moderate", label: "Moderate", mult: 1.55, hint: "Moderate exercise 3–5 days/week" },
  { key: "active", label: "Active", mult: 1.725, hint: "Hard exercise 6–7 days/week" },
  { key: "very", label: "Very active", mult: 1.9, hint: "Very hard exercise & physical job" },
];

function bmrMifflinStJeor(weightKg: number, heightCm: number, age: number, gender: Gender): number {
  const core = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return gender === "male" ? core + 5 : core - 161;
}

export default function CalorieCalculatorPage() {
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState<Gender>("male");
  const [massUnit, setMassUnit] = useState<MassUnit>("kg");
  const [weightKg, setWeightKg] = useState(75);
  const [weightLb, setWeightLb] = useState(165);
  const [heightUnit, setHeightUnit] = useState<HeightUnit>("cm");
  const [heightCm, setHeightCm] = useState(175);
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(10);
  const [activity, setActivity] = useState<ActivityKey>("moderate");

  const weightKgResolved = useMemo(() => {
    if (massUnit === "kg") return weightKg;
    return weightLb * 0.45359237;
  }, [massUnit, weightKg, weightLb]);

  const heightCmResolved = useMemo(() => {
    if (heightUnit === "cm") return heightCm;
    const totalIn = feet * 12 + inches;
    return totalIn * 2.54;
  }, [heightUnit, heightCm, feet, inches]);

  const activityMult = ACTIVITY.find((a) => a.key === activity)?.mult ?? 1.55;

  const results = useMemo(() => {
    if (age < 15 || age > 120 || weightKgResolved <= 0 || heightCmResolved <= 50 || heightCmResolved > 280) {
      return null;
    }
    const bmr = bmrMifflinStJeor(weightKgResolved, heightCmResolved, age, gender);
    if (!Number.isFinite(bmr) || bmr < 500) return null;
    const tdee = bmr * activityMult;
    const proteinG = weightKgResolved * 2;
    const proteinKcal = proteinG * 4;
    let remaining = tdee - proteinKcal;
    let carbRatio = 0.55;
    let fatRatio = 0.45;
    if (remaining <= 0) {
      remaining = Math.max(0, tdee * 0.2);
      carbRatio = 0.5;
      fatRatio = 0.5;
    }
    const carbG = (remaining * carbRatio) / 4;
    const fatG = (remaining * fatRatio) / 9;
    return {
      bmr,
      tdee,
      loss500: tdee - 500,
      loss250: tdee - 250,
      gain500: tdee + 500,
      proteinG,
      carbG,
      fatG,
      proteinCapped: tdee - proteinKcal <= 0,
    };
  }, [age, gender, weightKgResolved, heightCmResolved, activityMult]);

  const inputClass =
    "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20";

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Calorie calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Estimate basal metabolic rate (BMR) with the Mifflin–St Jeor equation, multiply by activity for
          maintenance calories (TDEE), and see example deficits, surpluses, and macro targets based on 2 g
          protein per kg body weight.
        </p>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Your details</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-foreground">
                Age (years)
              </label>
              <input
                id="age"
                type="number"
                min={15}
                max={120}
                value={age}
                onChange={(e) => setAge(Number(e.target.value) || 0)}
                className={`mt-1 ${inputClass}`}
              />
            </div>
            <div>
              <span className="block text-sm font-medium text-foreground">Gender</span>
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
          </div>

          <div className="mt-6">
            <span className="block text-sm font-medium text-foreground">Weight</span>
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
            <div className="mt-3">
              <label htmlFor="weight" className="sr-only">
                Weight
              </label>
              <input
                id="weight"
                type="number"
                min={1}
                step={0.1}
                value={massUnit === "kg" ? weightKg : weightLb}
                onChange={(e) => {
                  const v = Number(e.target.value) || 0;
                  if (massUnit === "kg") setWeightKg(v);
                  else setWeightLb(v);
                }}
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-6">
            <span className="block text-sm font-medium text-foreground">Height</span>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setHeightUnit("cm")}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  heightUnit === "cm"
                    ? "bg-primary text-primary-foreground"
                    : "border border-input bg-card text-muted-foreground hover:border-primary/40"
                }`}
              >
                cm
              </button>
              <button
                type="button"
                onClick={() => setHeightUnit("ftin")}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  heightUnit === "ftin"
                    ? "bg-primary text-primary-foreground"
                    : "border border-input bg-card text-muted-foreground hover:border-primary/40"
                }`}
              >
                ft + in
              </button>
            </div>
            <div className="mt-3 space-y-4">
              {heightUnit === "cm" ? (
                <div>
                  <label htmlFor="hcm" className="block text-sm font-medium text-foreground">
                    Height (cm)
                  </label>
                  <input
                    id="hcm"
                    type="number"
                    min={50}
                    max={280}
                    step={0.5}
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value) || 0)}
                    className={`mt-1 ${inputClass}`}
                  />
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="ft" className="block text-sm font-medium text-foreground">
                      Feet
                    </label>
                    <input
                      id="ft"
                      type="number"
                      min={3}
                      max={8}
                      value={feet}
                      onChange={(e) => setFeet(Number(e.target.value) || 0)}
                      className={`mt-1 ${inputClass}`}
                    />
                  </div>
                  <div>
                    <label htmlFor="hin" className="block text-sm font-medium text-foreground">
                      Inches
                    </label>
                    <input
                      id="hin"
                      type="number"
                      min={0}
                      max={11}
                      value={inches}
                      onChange={(e) => setInches(Number(e.target.value) || 0)}
                      className={`mt-1 ${inputClass}`}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="activity" className="block text-sm font-medium text-foreground">
              Activity level
            </label>
            <select
              id="activity"
              value={activity}
              onChange={(e) => setActivity(e.target.value as ActivityKey)}
              className={`mt-1 ${inputClass}`}
            >
              {ACTIVITY.map((a) => (
                <option key={a.key} value={a.key}>
                  {a.label} ({a.mult}×) — {a.hint}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Results</h2>
          {!results ? (
            <p className="mt-4 text-muted-foreground">
              Enter a realistic age (15–120), positive weight, and height between about 50–280 cm (or
              feet/inches) to see BMR and calorie targets.
            </p>
          ) : (
            <div className="mt-4 space-y-6">
              <div className="rounded-lg bg-primary/10 p-4">
                <p className="text-sm font-medium text-primary">Basal metabolic rate (BMR)</p>
                <p className="mt-1 text-3xl font-bold text-primary">{Math.round(results.bmr)} kcal/day</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Estimated calories at rest before activity.
                </p>
              </div>
              <div className="rounded-lg bg-primary/10 p-4">
                <p className="text-sm font-medium text-primary">Maintenance (TDEE)</p>
                <p className="mt-1 text-3xl font-bold text-primary">{Math.round(results.tdee)} kcal/day</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  BMR × activity multiplier ({activityMult}×).
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Example calorie targets</p>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <span className="font-medium text-foreground">Mild weight loss (−250 kcal):</span>{" "}
                    ~{Math.round(results.loss250)} kcal/day
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Weight loss (−500 kcal):</span>{" "}
                    ~{Math.round(results.loss500)} kcal/day
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Weight gain (+500 kcal):</span>{" "}
                    ~{Math.round(results.gain500)} kcal/day
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Macro suggestion (at maintenance)</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Protein fixed at 2 g/kg; remaining calories split ~55% carbs / 45% fat.
                  {results.proteinCapped && " (TDEE is low vs. protein target—carb/fat split uses a small remainder.)"}
                </p>
                <ul className="mt-3 space-y-1 text-sm text-foreground">
                  <li>Protein: ~{Math.round(results.proteinG)} g (~{Math.round(results.proteinG * 4)} kcal)</li>
                  <li>Carbs: ~{Math.round(results.carbG)} g (~{Math.round(results.carbG * 4)} kcal)</li>
                  <li>Fat: ~{Math.round(results.fatG)} g (~{Math.round(results.fatG * 9)} kcal)</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">How it works</h2>
          <p className="mt-2 text-muted-foreground">
            <strong className="font-medium text-foreground">BMR</strong> uses Mifflin–St Jeor: for men,{" "}
            <span className="font-mono text-xs sm:text-sm">
              10×weight(kg) + 6.25×height(cm) − 5×age + 5
            </span>
            ; for women, the same with <span className="font-mono text-xs sm:text-sm">−161</span> instead of{" "}
            <span className="font-mono text-xs sm:text-sm">+5</span>.{" "}
            <strong className="font-medium text-foreground">TDEE</strong> multiplies BMR by your activity
            factor (1.2 to 1.9). Example ±250/500 kcal adjustments are common starting points—not medical
            prescriptions. Protein is set to 2 g per kg body weight; carbs and fats fill the rest of
            maintenance calories for a balanced split.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
          <div className="mt-4 space-y-2">
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                How accurate is Mifflin–St Jeor?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                It is among the more accurate BMR estimates for many adults, but individual metabolism,
                genetics, medications, and lean mass still vary. Treat TDEE as a starting point and adjust
                based on weight trend over several weeks.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Why are my maintenance calories different from another app?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Apps may use different equations (e.g. Harris–Benedict), different activity labels, or
                round inputs differently. Small differences are normal; consistency with one method
                matters more than exact agreement across tools.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Is 2 g protein per kg right for everyone?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Many active people aim for roughly 1.6–2.2 g/kg for muscle retention; 2 g/kg is a simple
                rule of thumb. Older adults, kidney concerns, or specific diets may need different
                targets—ask a dietitian or doctor.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Does this replace medical or nutrition advice?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                No. This calculator is for general education. Pregnancy, eating disorders, chronic
                illness, and sport-specific needs require personalized professional guidance.
              </p>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}
