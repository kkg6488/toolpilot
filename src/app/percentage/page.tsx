import type { Metadata } from "next";
import Link from "next/link";
import { percentValues, ofValues } from "@/lib/percentage-data";

export const metadata: Metadata = {
  title: {
    absolute: "Percentage Calculator — What is X% of Y? | ToolPilot",
  },
  description:
    "Calculate any percentage instantly. Find what is X% of Y for hundreds of common combinations. Free, fast, no sign-up required.",
  alternates: { canonical: "https://tool-pilot.in/percentage" },
};

export default function PercentageIndexPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Percentage calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Jump to a precomputed answer for common &quot;what is X% of Y&quot; pairs. Each link opens
          a dedicated page with the result, steps, and a reference table.
        </p>

        <div className="mt-10 space-y-10">
          {ofValues.map((base) => (
            <section key={base} aria-labelledby={`group-${base}`}>
              <h2
                id={`group-${base}`}
                className="text-lg font-semibold text-foreground"
              >
                Popular percentages of {base.toLocaleString("en-US")}
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {percentValues.map((pct) => (
                  <li key={`${pct}-${base}`}>
                    <Link
                      href={`/percentage/${pct}-percent-of-${base}`}
                      className="block rounded-lg border border-border bg-card p-3 text-sm text-foreground shadow-sm hover:border-primary/40"
                    >
                      {pct}% of {base.toLocaleString("en-US")}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
