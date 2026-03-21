"use client";

import { useMemo, useState } from "react";

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function toISODateLocal(d: Date): string {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function parseISODateLocal(iso: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]) - 1;
  const day = Number(m[3]);
  const dt = new Date(y, mo, day);
  if (dt.getFullYear() !== y || dt.getMonth() !== mo || dt.getDate() !== day) return null;
  return dt;
}

function calendarDaysBetween(a: Date, b: Date): number {
  const ua = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const ub = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((ub - ua) / 86400000);
}

function daysInMonthBefore(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function diffCalendarYMD(from: Date, to: Date): { years: number; months: number; days: number } {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();
  if (days < 0) {
    months--;
    days += daysInMonthBefore(to.getFullYear(), to.getMonth());
  }
  if (months < 0) {
    years--;
    months += 12;
  }
  return { years, months, days };
}

function birthdayOnCalendarYear(year: number, birth: Date): Date {
  const m = birth.getMonth();
  const d = birth.getDate();
  if (m === 1 && d === 29) {
    const feb29 = new Date(year, 1, 29);
    const isLeap = feb29.getMonth() === 1;
    return new Date(year, 1, isLeap ? 29 : 28);
  }
  return new Date(year, m, d);
}

function daysUntilNextBirthday(birth: Date, ref: Date): number {
  const y = ref.getFullYear();
  let next = birthdayOnCalendarYear(y, birth);
  let d = calendarDaysBetween(ref, next);
  if (d < 0) {
    next = birthdayOnCalendarYear(y + 1, birth);
    d = calendarDaysBetween(ref, next);
  }
  return d;
}

const WEEKDAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

export default function AgeCalculatorPage() {
  const [dob, setDob] = useState("");
  const [asOf, setAsOf] = useState(() => toISODateLocal(new Date()));

  const result = useMemo(() => {
    const birth = parseISODateLocal(dob);
    const end = parseISODateLocal(asOf);
    if (!birth || !end) {
      return { error: "Enter a valid date of birth and “calculate age on” date." as const };
    }
    if (calendarDaysBetween(birth, end) < 0) {
      return { error: "The “calculate age on” date must be on or after your date of birth." as const };
    }

    const ymd = diffCalendarYMD(birth, end);
    const totalDays = calendarDaysBetween(birth, end);
    const nextBirthdayDays = daysUntilNextBirthday(birth, end);
    const bornWeekday = WEEKDAYS[birth.getDay()];

    return {
      error: null as null,
      ymd,
      totalDays,
      nextBirthdayDays,
      bornWeekday,
    };
  }, [dob, asOf]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Age calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Enter your date of birth and an optional “as of” date (defaults to today). We show your age in
          years, months, and days, total days lived, the weekday you were born, and a countdown to your
          next birthday from that reference date.
        </p>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Dates</h2>
          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-foreground">
                Date of birth
              </label>
              <input
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>
            <div>
              <label htmlFor="as-of" className="block text-sm font-medium text-foreground">
                Calculate age on <span className="font-normal text-muted-foreground">(optional, defaults to today)</span>
              </label>
              <input
                id="as-of"
                type="date"
                value={asOf}
                onChange={(e) => setAsOf(e.target.value)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Results</h2>
          {!dob ? (
            <p className="mt-4 text-muted-foreground">Choose your date of birth to see results.</p>
          ) : result.error ? (
            <p className="mt-4 text-muted-foreground">{result.error}</p>
          ) : (
            <>
              <div className="mt-4 rounded-lg bg-primary/10 p-4">
                <p className="text-sm font-medium text-primary">Age on selected date</p>
                <p className="mt-2 text-2xl font-bold text-primary sm:text-3xl">
                  {result.ymd.years}{" "}
                  <span className="text-lg font-semibold sm:text-xl">
                    {result.ymd.years === 1 ? "year" : "years"}
                  </span>
                  {", "}
                  {result.ymd.months}{" "}
                  <span className="text-lg font-semibold sm:text-xl">
                    {result.ymd.months === 1 ? "month" : "months"}
                  </span>
                  {", "}
                  {result.ymd.days}{" "}
                  <span className="text-lg font-semibold sm:text-xl">
                    {result.ymd.days === 1 ? "day" : "days"}
                  </span>
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-sm font-medium text-foreground">Total days lived</p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">{result.totalDays.toLocaleString()}</p>
                  <p className="mt-1 text-xs text-muted-foreground">From birth through the “calculate age on” date.</p>
                </div>
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-sm font-medium text-foreground">Next birthday</p>
                  <p className="mt-1 text-2xl font-semibold text-foreground">
                    {result.nextBirthdayDays === 0
                      ? "Today"
                      : `${result.nextBirthdayDays.toLocaleString()} day${result.nextBirthdayDays === 1 ? "" : "s"}`}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Countdown from the same “calculate age on” date.
                  </p>
                </div>
                <div className="rounded-lg bg-muted/50 p-4 sm:col-span-2">
                  <p className="text-sm font-medium text-foreground">Day of week born</p>
                  <p className="mt-1 text-xl font-semibold text-foreground">{result.bornWeekday}</p>
                </div>
              </div>
            </>
          )}
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">How it works</h2>
          <p className="mt-2 text-muted-foreground">
            We treat both inputs as calendar dates in your local time zone. Your age in years, months, and
            days is the difference between those two calendar dates using month-length rules (so day counts
            borrow from the previous month when needed). Total days lived is the number of midnights between
            those dates. The next-birthday countdown finds the next occurrence of your birth month and day
            on or after the “calculate age on” date; leap-day birthdays use February 28 in non-leap years.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
          <div className="mt-4 space-y-2">
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Why can my age in months and days look different from total days divided by 30?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Calendar months are not a fixed length. We show a true calendar difference (years, whole
                months, then remaining days), which will not always match a simple “days ÷ 30” estimate.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                What happens if I was born on February 29?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                In non-leap years we treat your annual birthday as February 28 for the “next birthday”
                countdown, which matches how many official documents and celebrations handle leap-day births.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Does changing “calculate age on” affect the countdown?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Yes. The next-birthday countdown is always measured from that reference date—useful for
                legal cutoffs, planning, or checking what your age was on a past date.
              </p>
            </details>
            <details className="group rounded-lg border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer font-medium text-foreground">
                Is this suitable for official or legal use?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                This page is for general planning and curiosity. Jurisdictions can define “age” or “birthday”
                differently (time zones, cutoffs). Confirm important dates with official sources.
              </p>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}
