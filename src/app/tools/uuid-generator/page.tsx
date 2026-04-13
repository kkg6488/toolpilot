"use client";

import { useCallback, useState } from "react";
import { AdSlot } from "@/components/shared/ad-slot";
import { TrackPageView } from "@/components/shared/track-page-view";
import { RelatedSection } from "@/components/shared/related-items";
import { getRelatedTools } from "@/lib/related-items";

const btnPrimary =
  "rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50";
const btnSecondary =
  "rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted/60 disabled:pointer-events-none disabled:opacity-50";

function randomUUIDv4(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6]! & 0x0f) | 0x40;
  bytes[8] = (bytes[8]! & 0x3f) | 0x80;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function formatUuid(raw: string, uppercase: boolean, withHyphens: boolean): string {
  const hex = raw.replace(/-/g, "").toLowerCase();
  let s = withHyphens
    ? `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
    : hex;
  if (uppercase) s = s.toUpperCase();
  return s;
}

export default function UuidGeneratorPage() {
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [withHyphens, setWithHyphens] = useState(true);
  const [uuids, setUuids] = useState<string[]>([]);

  const generate = useCallback(() => {
    const n = Math.min(100, Math.max(1, count));
    const next: string[] = [];
    for (let i = 0; i < n; i++) {
      next.push(formatUuid(randomUUIDv4(), uppercase, withHyphens));
    }
    setUuids(next);
  }, [count, uppercase, withHyphens]);

  async function copyOne(u: string) {
    try {
      await navigator.clipboard.writeText(u);
    } catch {
      /* ignore */
    }
  }

  async function copyAll() {
    if (!uuids.length) return;
    try {
      await navigator.clipboard.writeText(uuids.join("\n"));
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <TrackPageView name="UUID Generator" type="tool" />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">Tools</p>
        <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          UUID v4 generator
        </h1>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          Create version 4 (random) UUIDs using <code className="rounded bg-muted px-1 text-sm">crypto.randomUUID()</code> when
          available, with a secure fallback. Up to 100 at once.
        </p>

        <div className="mt-8 space-y-6">
          <section className="rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
            <h2 className="text-lg font-semibold text-foreground">Options</h2>
            <div className="mt-4">
              <label htmlFor="uuid-count" className="text-sm font-medium text-foreground">
                Number of UUIDs (1–100): {count}
              </label>
              <input
                id="uuid-count"
                type="range"
                min={1}
                max={100}
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-[hsl(var(--primary))]"
              />
            </div>
            <fieldset className="mt-6 space-y-3">
              <legend className="text-sm font-medium text-foreground">Format</legend>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                  className="h-4 w-4 rounded border-border accent-[hsl(var(--primary))]"
                />
                <span className="text-sm text-foreground">Uppercase hex</span>
              </label>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={withHyphens}
                  onChange={(e) => setWithHyphens(e.target.checked)}
                  className="h-4 w-4 rounded border-border accent-[hsl(var(--primary))]"
                />
                <span className="text-sm text-foreground">Include hyphens</span>
              </label>
            </fieldset>
            <button type="button" className={`mt-6 ${btnPrimary}`} onClick={generate}>
              Generate
            </button>
          </section>

          <section className="rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-semibold text-foreground">Results</h2>
              <button type="button" className={btnSecondary} onClick={copyAll} disabled={!uuids.length}>
                Copy all
              </button>
            </div>
            {uuids.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">Click Generate to create UUIDs.</p>
            ) : (
              <ul className="mt-4 space-y-2">
                {uuids.map((u, i) => (
                  <li
                    key={`${u}-${i}`}
                    className="flex flex-col gap-2 rounded-lg border border-border/60 bg-muted/30 p-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <code className="break-all font-mono text-sm text-foreground">{u}</code>
                    <button type="button" className={`shrink-0 ${btnSecondary}`} onClick={() => copyOne(u)}>
                      Copy
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <div className="mt-8">
          <AdSlot slot="tool-mid" format="horizontal" className="mx-auto" />
        </div>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-foreground">FAQ</h2>
          <div className="mt-4 space-y-3">
            <details className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-medium text-foreground">What is a UUID v4?</summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Version 4 UUIDs are 128-bit identifiers where most bits are random, with version and variant bits set per RFC 4122.
                They are useful for client-side IDs, logs, and test data.
              </p>
            </details>
            <details className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-medium text-foreground">Is the fallback as secure as randomUUID?</summary>
              <p className="mt-2 text-sm text-muted-foreground">
                The fallback uses <code className="rounded bg-muted px-1">crypto.getRandomValues</code> to fill 16 bytes, then sets
                the version and variant fields. Avoid <code className="rounded bg-muted px-1">Math.random</code> for UUIDs; this tool
                does not use it.
              </p>
            </details>
            <details className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-medium text-foreground">Are these guaranteed unique?</summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Collisions are astronomically unlikely for random v4 UUIDs, but not mathematically impossible. For database primary
                keys, still use your engine&apos;s uniqueness constraints.
              </p>
            </details>
          </div>
        </section>

        <div className="mt-8">
          <AdSlot slot="tool-bottom" format="rectangle" className="mx-auto" />
        </div>

        <RelatedSection items={getRelatedTools("uuid-generator")} />
      </div>
    </div>
  );
}
