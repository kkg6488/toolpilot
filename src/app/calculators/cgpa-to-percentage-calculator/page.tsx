"use client";

import { useMemo, useState } from "react";

type PresetId = "cbse" | "vtu" | "mumbai" | "anna" | "custom";

type Preset = {
  id: PresetId;
  label: string;
  short: string;
  mode: "multiply" | "linear";
  multiplier?: number;
  linearA?: number;
  linearB?: number;
};

const PRESETS: Preset[] = [
  { id: "cbse", label: "CBSE", short: "× 9.5", mode: "multiply", multiplier: 9.5 },
  { id: "vtu", label: "VTU", short: "× 10", mode: "multiply", multiplier: 10 },
  {
    id: "mumbai",
    label: "Mumbai University",
    short: "7.1× + 11",
    mode: "linear",
    linearA: 7.1,
    linearB: 11,
  },
  { id: "anna", label: "Anna University", short: "× 10", mode: "multiply", multiplier: 10 },
];

const REFERENCE_CGPAS = [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10] as const;

function gradeFromPercentage(p: number): string {
  if (p >= 90) return "O / A+";
  if (p >= 80) return "A";
  if (p >= 70) return "B+";
  if (p >= 60) return "B";
  if (p >= 50) return "C";
  if (p >= 45) return "D";
  if (p >= 40) return "Pass";
  return "Fail";
}

function multiplyPercentage(cgpa: number, multiplier: number): number {
  return cgpa * multiplier;
}

function linearMumbaiPercentage(cgpa: number): number {
  return cgpa * 7.1 + 11;
}

export default function CgpaToPercentageCalculatorPage() {
  const [presetId, setPresetId] = useState<PresetId>("cbse");
  const [cgpaInput, setCgpaInput] = useState("8.5");
  const [multiplierInput, setMultiplierInput] = useState("9.5");

  const preset = PRESETS.find((p) => p.id === presetId);

  const result = useMemo(() => {
    const cgpa = Number(String(cgpaInput).replace(",", ".").trim());
    if (!Number.isFinite(cgpa)) {
      return { error: "Enter a valid CGPA number." as const };
    }
    if (cgpa < 0 || cgpa > 10) {
      return { error: "CGPA is expected on a 0–10 scale for this tool." as const };
    }

    let percentageRaw: number;
    let formulaLabel: string;

    if (preset?.mode === "linear") {
      percentageRaw = linearMumbaiPercentage(cgpa);
      formulaLabel = `Percentage = ${preset.linearA} × CGPA + ${preset.linearB}`;
    } else {
      const m = Number(String(multiplierInput).replace(",", ".").trim());
      if (!Number.isFinite(m) || m <= 0) {
        return {
          error:
            presetId === "custom"
              ? ("Enter a positive multiplier." as const)
              : ("Enter a positive multiplier (preset default is filled in; adjust if needed)." as const),
        };
      }
      percentageRaw = multiplyPercentage(cgpa, m);
      formulaLabel = `Percentage = CGPA × ${m}`;
    }

    const grade = gradeFromPercentage(Math.max(0, percentageRaw));

    return {
      error: null as null,
      cgpa,
      percentage: percentageRaw,
      grade,
      formulaLabel,
    };
  }, [cgpaInput, multiplierInput, preset, presetId]);

  const tableRows = useMemo(() => {
    const p = PRESETS.find((x) => x.id === presetId);
    const mult = Number(String(multiplierInput).replace(",", ".").trim());
    const mOk = Number.isFinite(mult) && mult > 0;
    const fallbackM = p?.mode === "multiply" ? p.multiplier ?? 9.5 : 9.5;

    return REFERENCE_CGPAS.map((g) => {
      const pct =
        p?.mode === "linear"
          ? linearMumbaiPercentage(g)
          : multiplyPercentage(g, mOk ? mult : fallbackM);
      return { cgpa: g, percentage: pct, grade: gradeFromPercentage(Math.max(0, pct)) };
    });
  }, [presetId, multiplierInput]);

  const inputClass =
    "mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20";

  const presetBtn = (active: boolean) =>
    `rounded-lg border px-3 py-2 text-left text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring/20 ${
      active
        ? "border-primary bg-primary/10 text-primary"
        : "border-border/60 bg-muted/40 text-foreground hover:bg-muted/70"
    }`;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          CGPA to percentage calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Convert CGPA on a 10-point scale to percentage using rules commonly cited for{" "}
          <strong className="font-medium text-foreground">CBSE</strong>,{" "}
          <strong className="font-medium text-foreground">VTU</strong>,{" "}
          <strong className="font-medium text-foreground">Anna University</strong>, and{" "}
          <strong className="font-medium text-foreground">Mumbai University</strong>. Pick a preset or set your
          own multiplier—built for Indian students searching CGPA to percentage.
        </p>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Presets</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            CBSE &amp; many boards use ×9.5; some universities use ×10. Mumbai University often uses 7.1×CGPA+11
            (verify with your official notification).
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                className={presetBtn(presetId === p.id)}
                onClick={() => {
                  setPresetId(p.id);
                  if (p.mode === "multiply" && p.multiplier != null) {
                    setMultiplierInput(String(p.multiplier));
                  }
                }}
              >
                <span className="block font-semibold">{p.label}</span>
                <span className="text-xs font-normal text-muted-foreground">{p.short}</span>
              </button>
            ))}
            <button
              type="button"
              className={presetBtn(presetId === "custom")}
              onClick={() => setPresetId("custom")}
            >
              <span className="block font-semibold">Custom</span>
              <span className="text-xs font-normal text-muted-foreground">Your multiplier</span>
            </button>
          </div>

          <div className="mt-8 space-y-5">
            <div>
              <label htmlFor="cgpa" className="block text-sm font-medium text-foreground">
                CGPA (0–10 scale)
              </label>
              <input
                id="cgpa"
                type="number"
                inputMode="decimal"
                min={0}
                max={10}
                step={0.01}
                value={cgpaInput}
                onChange={(e) => setCgpaInput(e.target.value)}
                className={inputClass}
              />
            </div>
            {(presetId === "custom" || preset?.mode === "multiply") && (
              <div>
                <label htmlFor="multiplier" className="block text-sm font-medium text-foreground">
                  Multiplier
                  {preset?.mode === "multiply" && presetId !== "custom" && (
                    <span className="font-normal text-muted-foreground"> (from preset; editable)</span>
                  )}
                </label>
                <input
                  id="multiplier"
                  type="number"
                  inputMode="decimal"
                  min={0.01}
                  step={0.1}
                  value={multiplierInput}
                  onChange={(e) => setMultiplierInput(e.target.value)}
                  disabled={preset?.mode === "linear"}
                  className={`${inputClass} disabled:cursor-not-allowed disabled:opacity-60`}
                />
              </div>
            )}
            {preset?.mode === "linear" && (
              <p className="text-sm text-muted-foreground">
                Multiplier field is disabled for Mumbai University; formula is fixed at{" "}
                <span className="font-mono text-foreground">7.1 × CGPA + 11</span>.
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Results</h2>
          {result.error ? (
            <p className="mt-4 text-muted-foreground">{result.error}</p>
          ) : (
            <>
              <div className="mt-4 rounded-lg bg-primary/10 p-4">
                <p className="text-sm font-medium text-primary">Percentage</p>
                <p className="mt-2 text-3xl font-bold text-primary sm:text-4xl">
                  {result.percentage.toFixed(2)}%
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{result.formulaLabel}</p>
              </div>
              <div className="mt-6 rounded-lg bg-muted/50 p-4">
                <p className="text-sm font-medium text-foreground">Grade equivalent (illustrative band)</p>
                <p className="mt-1 text-2xl font-semibold text-foreground">{result.grade}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Bands are a common heuristic (90+ O/A+, 80+ A, …). Your institution’s letter grades may differ.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Reference table</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Sample CGPA values with percentage and grade using the{" "}
            <strong className="font-medium text-foreground">currently selected preset</strong>
            {presetId === "custom" ? " and your custom multiplier" : ""}. Mumbai uses 7.1×+11; multiply presets
            use the preset factor.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[280px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="py-2 pr-4 font-medium">CGPA</th>
                  <th className="py-2 pr-4 font-medium">Percentage</th>
                  <th className="py-2 font-medium">Grade</th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.cgpa} className="border-b border-border/60">
                    <td className="py-2 pr-4 font-mono text-foreground">{row.cgpa}</td>
                    <td className="py-2 pr-4 text-foreground">{row.percentage.toFixed(2)}%</td>
                    <td className="py-2 text-muted-foreground">{row.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">How it works</h2>
          <p className="mt-2 text-muted-foreground">
            For <strong className="font-medium text-foreground">multiply</strong> presets, we compute{" "}
            <span className="font-mono text-foreground">percentage = CGPA × multiplier</span>. CBSE often cites
            9.5 for class 10 conversion; many universities publish ×10 or their own factor—always match your
            official circular.
          </p>
          <p className="mt-3 text-muted-foreground">
            For <strong className="font-medium text-foreground">Mumbai University</strong>, we apply{" "}
            <span className="font-mono text-foreground">7.1 × CGPA + 11</span>, a formula widely referenced for
            older MU schemes—confirm against your year’s ordinance. Grades map from the resulting percentage using
            illustrative cutoffs; institutions vary.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
          <div className="mt-4 space-y-2">
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Is CBSE CGPA always multiplied by 9.5?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Many students use ×9.5 for an approximate percentage from CGPA, but board and university rules
                change by year and program. Use this as a quick estimate and verify with official CBSE or school
                documents.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                VTU says 10—why would I pick a different multiplier?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Some VTU documents equate SGPA/CGPA to percentage differently by regulation or scheme. If your
                marks card already lists percentage, prefer that; otherwise use the multiplier your department
                cites and cross-check.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                My percentage goes above 100% with a ×10 multiplier—is that wrong?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                The product CGPA×10 can exceed 100 for a perfect 10.0. Treat it as a rough equivalence your
                university may still normalize differently on transcripts. Grades here follow the same
                percentage bands for illustration.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Can I use this for jobs and higher studies applications?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Employers and admissions offices often want the conversion method stated by your board or
                university. This calculator is a planning aid—attach official conversion notes or transcripts
                when it matters.
              </p>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}
