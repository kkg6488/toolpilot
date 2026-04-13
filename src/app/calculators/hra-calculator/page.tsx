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

type Metro = "metro" | "non-metro";

export default function HraCalculatorPage() {
  const [basic, setBasic] = useState(50_000);
  const [da, setDa] = useState(5_000);
  const [hra, setHra] = useState(20_000);
  const [rent, setRent] = useState(25_000);
  const [city, setCity] = useState<Metro>("metro");

  const analysis = useMemo(() => {
    const basicDA = Math.max(0, basic) + Math.max(0, da);
    const actualHra = Math.max(0, hra);
    const rentPaid = Math.max(0, rent);

    const annualHra = actualHra * 12;
    const salary = basicDA * 12;
    const rentAnnual = rentPaid * 12;

    const pct = city === "metro" ? 0.5 : 0.4;
    const condition1 = annualHra;
    const condition2 = pct * salary;
    const condition3Raw = rentAnnual - 0.1 * salary;
    const condition3 = Math.max(0, condition3Raw);

    const exemption = Math.min(condition1, condition2, condition3);
    const taxable = Math.max(0, annualHra - exemption);

    const values = [
      { key: "c1" as const, label: "Actual HRA received", value: condition1 },
      { key: "c2" as const, label: `${city === "metro" ? "50" : "40"}% of (Basic + DA)`, value: condition2 },
      { key: "c3" as const, label: "Rent paid − 10% of (Basic + DA)", value: condition3 },
    ];
    const minVal = Math.min(condition1, condition2, condition3);
    const binding = values.filter((v) => Math.abs(v.value - minVal) < 0.005);
    const bindingKeys = new Set(binding.map((b) => b.key));

    const bar = [
      { label: "Exempt HRA", pct: annualHra > 0 ? (exemption / annualHra) * 100 : 0, color: "bg-primary" },
      {
        label: "Taxable HRA",
        pct: annualHra > 0 ? (taxable / annualHra) * 100 : 0,
        color: "bg-slate-400",
      },
    ];

    return {
      annualHra,
      salary,
      rentAnnual,
      condition1,
      condition2,
      condition3,
      condition3Raw,
      exemption,
      taxable,
      values,
      bindingKeys,
      bar,
      pctLabel: city === "metro" ? "50%" : "40%",
    };
  }, [basic, da, hra, rent, city]);

  return (
    <div className="min-h-screen bg-background">
      <TrackPageView name="HRA Calculator" type="calculator" />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          HRA exemption calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Estimate exempt and taxable House Rent Allowance under Section 10(13A) using the three
          statutory conditions. Confirm with your employer or tax advisor for your exact pay structure.
        </p>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Salary &amp; rent (monthly)</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="basic" className="block text-sm font-medium text-foreground">
                Basic salary
              </label>
              <input
                id="basic"
                type="number"
                min={0}
                value={basic}
                onChange={(e) => setBasic(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>
            <div>
              <label htmlFor="da" className="block text-sm font-medium text-foreground">
                DA (Dearness Allowance)
              </label>
              <input
                id="da"
                type="number"
                min={0}
                value={da}
                onChange={(e) => setDa(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>
            <div>
              <label htmlFor="hra" className="block text-sm font-medium text-foreground">
                HRA received
              </label>
              <input
                id="hra"
                type="number"
                min={0}
                value={hra}
                onChange={(e) => setHra(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>
            <div>
              <label htmlFor="rent" className="block text-sm font-medium text-foreground">
                Rent paid
              </label>
              <input
                id="rent"
                type="number"
                min={0}
                value={rent}
                onChange={(e) => setRent(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="city" className="block text-sm font-medium text-foreground">
                City type
              </label>
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value as Metro)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20 sm:max-w-xs"
              >
                <option value="metro">Metro (50% of Basic + DA for condition 2)</option>
                <option value="non-metro">Non-metro (40% of Basic + DA)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Results (annual)</h2>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-primary/10 p-4">
              <dt className="text-sm font-medium text-primary">HRA exemption</dt>
              <dd className="mt-1 text-2xl font-bold text-primary">
                {inr.format(analysis.exemption)}
              </dd>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <dt className="text-sm font-medium text-muted-foreground">Taxable HRA</dt>
              <dd className="mt-1 text-2xl font-bold text-foreground">{inr.format(analysis.taxable)}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-8">
          <AdSlot slot="calc-mid" format="horizontal" className="mx-auto" />
        </div>

        <div className="mt-8 rounded-xl border border-border bg-muted/80 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">The three conditions</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Exempt HRA = minimum of the three. The binding condition(s) match the smallest value.
          </p>
          <ul className="mt-4 space-y-3">
            {analysis.values.map((v) => {
              const isBinding = analysis.bindingKeys.has(v.key);
              return (
                <li
                  key={v.key}
                  className={`rounded-lg border p-4 ${
                    isBinding
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-medium text-foreground">{v.label}</span>
                    <span className="text-lg font-bold text-foreground">{inr.format(v.value)}</span>
                  </div>
                  {isBinding && (
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-primary">
                      Applies (ties for minimum)
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
          {analysis.condition3Raw < 0 && (
            <p className="mt-3 text-xs text-amber-800">
              Note: Rent − 10% of salary is negative before the non-negative cap; the capped value
              used in the min is {inr.format(0)}.
            </p>
          )}
        </div>

        <div className="mt-8 rounded-xl border border-border bg-muted/80 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Exempt vs taxable share of HRA</h2>
          <div className="mt-4 flex h-10 w-full overflow-hidden rounded-lg">
            {analysis.bar.map((b) => (
              <div
                key={b.label}
                className={`flex items-center justify-center ${b.color} text-xs font-medium text-white`}
                style={{ width: `${Math.min(100, Math.max(0, b.pct))}%` }}
              >
                {b.pct > 14 ? `${b.pct.toFixed(1)}%` : ""}
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-6 text-sm">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-primary" />
              Exempt {analysis.bar[0].pct.toFixed(1)}%
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded bg-slate-400" />
              Taxable {analysis.bar[1].pct.toFixed(1)}%
            </span>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">How it works</h2>
          <p className="mt-2 text-muted-foreground">
            For employees in rented accommodation receiving HRA, exemption is the{" "}
            <strong>least</strong> of: (1) actual HRA received; (2) {analysis.pctLabel} of salary
            (Basic + DA) for {city === "metro" ? "specified metro" : "non-metro"} cities; (3) rent
            paid minus 10% of salary (Basic + DA). We annualise monthly inputs. If (3) is negative,
            it is treated as zero before taking the minimum—matching common calculator practice.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
          <div className="mt-4 space-y-2">
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Which cities count as metro for this HRA exemption calculator?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Typically Delhi, Mumbai, Chennai, and Kolkata use the 50% rule; others use 40%.
                Employer policies and notifications can vary—verify your city classification.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Do I need rent receipts for HRA exemption?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Employers usually ask for rent receipts and may require landlord PAN above threshold
                limits. This HRA exemption calculator does not check documentation.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                What if I pay no rent—can any HRA be exempt?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Condition (3) becomes zero, so exemption is limited by the minimum of actual HRA,
                percentage of salary, and zero—often resulting in no exemption if you are not renting.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Is DA always included in salary for HRA?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                For these rules, Dearness Allowance that forms part of retirement benefits is
                generally included. Enter zero if DA does not apply to you.
              </p>
            </details>
          </div>
        </section>

        <div className="mt-8">
          <AdSlot slot="calc-bottom" format="rectangle" className="mx-auto" />
        </div>

        <RelatedSection items={getRelatedCalculators("hra-calculator")} />
      </div>
    </div>
  );
}
