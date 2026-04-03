"use client";

import { useMemo, useState } from "react";

function toLocalDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function diffCalendarYMD(start: Date, end: Date) {
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const prev = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prev.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

function totalDaysBetween(a: Date, b: Date): number {
  const ms = Math.abs(b.getTime() - a.getTime());
  return Math.round(ms / 86400000);
}

function isoString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function DateCalculatorPage() {
  const [mode, setMode] = useState<"between" | "addsubtract">("between");

  const today = isoString(new Date());
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const [baseDate, setBaseDate] = useState(today);
  const [offset, setOffset] = useState(30);

  const betweenResult = useMemo(() => {
    const s = toLocalDate(startDate);
    const e = toLocalDate(endDate);
    if (!s || !e) return null;

    const earlier = s <= e ? s : e;
    const later = s <= e ? e : s;
    const diff = diffCalendarYMD(earlier, later);
    const total = totalDaysBetween(earlier, later);
    const weeks = total / 7;

    return { ...diff, totalDays: total, weeks, swapped: s > e };
  }, [startDate, endDate]);

  const addResult = useMemo(() => {
    const b = toLocalDate(baseDate);
    if (!b) return null;
    const result = new Date(b);
    result.setDate(result.getDate() + offset);
    return result;
  }, [baseDate, offset]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Date calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Find the difference between two dates or add/subtract days from a
          date.
        </p>

        <div className="mt-8 flex gap-2">
          <button
            type="button"
            onClick={() => setMode("between")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              mode === "between"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Days between dates
          </button>
          <button
            type="button"
            onClick={() => setMode("addsubtract")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              mode === "addsubtract"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Add / subtract days
          </button>
        </div>

        {mode === "between" && (
          <div className="mt-6 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
            <h2 className="text-lg font-semibold text-foreground">
              Days between two dates
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="start-date"
                  className="block text-sm font-medium text-foreground"
                >
                  Start date
                </label>
                <input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
              <div>
                <label
                  htmlFor="end-date"
                  className="block text-sm font-medium text-foreground"
                >
                  End date
                </label>
                <input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
            </div>

            {betweenResult && (
              <div className="mt-6 space-y-4">
                {betweenResult.swapped && (
                  <p className="text-sm text-muted-foreground">
                    Start date is after end date — showing difference from
                    earlier to later.
                  </p>
                )}
                <div className="rounded-lg bg-primary/10 p-6">
                  <p className="text-sm font-medium text-muted-foreground">
                    Difference
                  </p>
                  <p className="mt-2 text-3xl font-bold text-primary">
                    {betweenResult.years > 0 &&
                      `${betweenResult.years} year${betweenResult.years !== 1 ? "s" : ""}, `}
                    {betweenResult.months > 0 &&
                      `${betweenResult.months} month${betweenResult.months !== 1 ? "s" : ""}, `}
                    {betweenResult.days} day
                    {betweenResult.days !== 1 ? "s" : ""}
                  </p>
                </div>
                <dl className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg bg-muted/50 p-4">
                    <dt className="text-sm font-medium text-muted-foreground">
                      Total days
                    </dt>
                    <dd className="mt-1 text-xl font-bold text-foreground">
                      {betweenResult.totalDays.toLocaleString()}
                    </dd>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-4">
                    <dt className="text-sm font-medium text-muted-foreground">
                      Weeks
                    </dt>
                    <dd className="mt-1 text-xl font-bold text-foreground">
                      {betweenResult.weeks.toFixed(1)}
                    </dd>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-4">
                    <dt className="text-sm font-medium text-muted-foreground">
                      Full weeks
                    </dt>
                    <dd className="mt-1 text-xl font-bold text-foreground">
                      {Math.floor(betweenResult.weeks)}
                    </dd>
                  </div>
                </dl>
              </div>
            )}
          </div>
        )}

        {mode === "addsubtract" && (
          <div className="mt-6 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
            <h2 className="text-lg font-semibold text-foreground">
              Add or subtract days
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="base-date"
                  className="block text-sm font-medium text-foreground"
                >
                  Start date
                </label>
                <input
                  id="base-date"
                  type="date"
                  value={baseDate}
                  onChange={(e) => setBaseDate(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
              <div>
                <label
                  htmlFor="day-offset"
                  className="block text-sm font-medium text-foreground"
                >
                  Days to add (negative to subtract)
                </label>
                <input
                  id="day-offset"
                  type="number"
                  value={offset}
                  onChange={(e) => setOffset(Number(e.target.value) || 0)}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
              </div>
            </div>

            {addResult && (
              <div className="mt-6 rounded-lg bg-primary/10 p-6">
                <p className="text-sm font-medium text-muted-foreground">
                  Result
                </p>
                <p className="mt-2 text-3xl font-bold text-primary">
                  {formatDate(addResult)}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  ISO: {isoString(addResult)}
                </p>
              </div>
            )}
          </div>
        )}

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">
            How it works
          </h2>
          <p className="mt-2 text-muted-foreground">
            The &quot;days between&quot; mode computes the calendar difference in
            years, months, and days, accounting for varying month lengths. Total
            days uses the absolute millisecond difference divided by 86,400,000.
            The add/subtract mode shifts a date by a given number of days,
            handling month and year rollovers automatically.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
          <div className="mt-4 space-y-2">
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Does this account for leap years?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Yes. The calculator uses JavaScript&apos;s built-in Date object
                which correctly handles leap years and varying month lengths.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                What timezone does this use?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                All calculations use your local timezone. Dates are treated as
                midnight in your local time, so there are no timezone offset
                issues.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Can I subtract days?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Yes. In the &quot;Add / subtract days&quot; mode, enter a
                negative number to go back in time.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                How is &quot;weeks&quot; calculated?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Weeks is total days divided by 7. &quot;Full weeks&quot; is that
                value floored — useful when you need to know how many complete
                7-day periods fit.
              </p>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}
