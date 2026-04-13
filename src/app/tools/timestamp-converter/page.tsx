"use client";

import { useEffect, useMemo, useState } from "react";
import { AdSlot } from "@/components/shared/ad-slot";
import { TrackPageView } from "@/components/shared/track-page-view";
import { RelatedSection } from "@/components/shared/related-items";
import { getRelatedTools } from "@/lib/related-items";

const inputClass =
  "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20";
const btnPrimary =
  "rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50";

function parseTimestampInput(raw: string): Date | null {
  const t = raw.trim();
  if (!t) return null;

  if (/^-?\d+(\.\d+)?$/.test(t)) {
    const n = Number(t);
    if (!Number.isFinite(n)) return null;
    const intPart = Math.trunc(n);
    const abs = Math.abs(intPart);
    const ms = abs >= 1e11 ? n : n * 1000;
    const d = new Date(ms);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  const ms = Date.parse(t);
  if (Number.isNaN(ms)) return null;
  return new Date(ms);
}

function formatHuman(d: Date, timeZone: "UTC" | undefined) {
  return new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
    ...(timeZone === "UTC" ? { timeZone: "UTC" } : {}),
  }).format(d);
}

type ResultBlockProps = { label: string; value: string; mono?: boolean };

function ResultBlock({ label, value, mono }: ResultBlockProps) {
  return (
    <div className="rounded-lg border border-border/60 bg-muted/20 px-4 py-3">
      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className={`mt-1 text-sm text-foreground ${mono ? "font-mono break-all" : ""}`}>{value}</div>
    </div>
  );
}

export default function TimestampConverterPage() {
  const [input, setInput] = useState("");
  const [parsed, setParsed] = useState<Date | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const nowDate = useMemo(() => new Date(now), [now]);

  function convert() {
    const d = parseTimestampInput(input);
    if (!input.trim()) {
      setParsed(null);
      setParseError(null);
      return;
    }
    if (!d) {
      setParsed(null);
      setParseError("Could not parse that value. Try a Unix number, ISO 8601, or a date string your browser understands.");
      return;
    }
    setParsed(d);
    setParseError(null);
  }

  const ms = parsed ? parsed.getTime() : null;
  const sec = ms !== null ? Math.floor(ms / 1000) : null;

  return (
    <div className="min-h-screen bg-background">
      <TrackPageView name="Timestamp Converter" type="tool" />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">Tools</p>
        <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Timestamp converter
        </h1>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          Convert between Unix time (seconds or milliseconds), ISO 8601, and readable dates. Numeric values with absolute part
          below 10<sup>11</sup> are treated as <strong>seconds</strong>; larger values as <strong>milliseconds</strong>.
        </p>

        <section className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Current time</h2>
          <p className="mt-2 text-sm text-muted-foreground">Updates every second.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <ResultBlock label="Unix (seconds)" value={String(Math.floor(now / 1000))} mono />
            <ResultBlock label="Unix (milliseconds)" value={String(now)} mono />
            <ResultBlock label="ISO 8601 (UTC)" value={nowDate.toISOString()} mono />
            <ResultBlock label="Human (local)" value={formatHuman(nowDate, undefined)} />
            <ResultBlock label="Human (UTC)" value={formatHuman(nowDate, "UTC")} />
          </div>
        </section>

        <section className="mt-6 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Convert</h2>
          <label htmlFor="ts-in" className="mt-4 block text-sm font-medium text-foreground">
            Unix timestamp (seconds or ms) or date/time string
          </label>
          <input
            id="ts-in"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && convert()}
            className={`mt-2 ${inputClass} font-mono text-sm`}
            placeholder='e.g. 1712000000, 1712000000000, 2024-04-01T12:00:00Z, "Apr 3, 2026 14:30"'
            spellCheck={false}
          />
          <button type="button" className={`mt-4 ${btnPrimary}`} onClick={convert}>
            Convert
          </button>
          {parseError && (
            <p className="mt-3 text-sm text-destructive" role="alert">
              {parseError}
            </p>
          )}
        </section>

        {parsed && ms !== null && sec !== null && (
          <section className="mt-6 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
            <h2 className="text-lg font-semibold text-foreground">Result</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <ResultBlock label="Unix (seconds)" value={String(sec)} mono />
              <ResultBlock label="Unix (milliseconds)" value={String(ms)} mono />
              <ResultBlock label="ISO 8601 (UTC)" value={parsed.toISOString()} mono />
              <ResultBlock label="Local (locale string)" value={parsed.toString()} />
              <ResultBlock label="Human (local timezone)" value={formatHuman(parsed, undefined)} />
              <ResultBlock label="Human (UTC)" value={formatHuman(parsed, "UTC")} />
            </div>
          </section>
        )}

        <div className="mt-8">
          <AdSlot slot="tool-mid" format="horizontal" className="mx-auto" />
        </div>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-foreground">FAQ</h2>
          <div className="mt-4 space-y-3">
            <details className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-medium text-foreground">
                When is a number seconds versus milliseconds?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                If the absolute integer part is at least 10<sup>11</sup>, the value is read as milliseconds (typical for{" "}
                <code className="rounded bg-muted px-1">Date.now()</code>). Smaller integers are multiplied by 1000 and treated as
                Unix seconds. You can always paste an ISO string like <code className="rounded bg-muted px-1">2026-04-03T12:00:00Z</code>{" "}
                to avoid ambiguity.
              </p>
            </details>
            <details className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-medium text-foreground">Why do local and UTC differ?</summary>
              <p className="mt-2 text-sm text-muted-foreground">
                The same instant is shown with your system&apos;s time zone rules (local) and with the UTC zone. ISO 8601 output
                uses UTC with a trailing <code className="rounded bg-muted px-1">Z</code>.
              </p>
            </details>
            <details className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-medium text-foreground">Does this call a server?</summary>
              <p className="mt-2 text-sm text-muted-foreground">
                No. Parsing and formatting use your browser&apos;s <code className="rounded bg-muted px-1">Date</code> and{" "}
                <code className="rounded bg-muted px-1">Intl</code> APIs only.
              </p>
            </details>
          </div>
        </section>

        <div className="mt-8">
          <AdSlot slot="tool-bottom" format="rectangle" className="mx-auto" />
        </div>

        <RelatedSection items={getRelatedTools("timestamp-converter")} />
      </div>
    </div>
  );
}
