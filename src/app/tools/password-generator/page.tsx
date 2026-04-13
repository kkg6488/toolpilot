"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { AdSlot } from "@/components/shared/ad-slot";
import { TrackPageView } from "@/components/shared/track-page-view";
import { RelatedSection } from "@/components/shared/related-items";
import { getRelatedTools } from "@/lib/related-items";
import { cn } from "@/lib/utils";

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";
const SYMBOLS = "!@#$%^&*";

const mono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace]";

function randomIndex(maxExclusive: number): number {
  const max = 256 - (256 % maxExclusive);
  const buf = new Uint8Array(1);
  for (;;) {
    crypto.getRandomValues(buf);
    if (buf[0] < max) return buf[0] % maxExclusive;
  }
}

function pickChar(pool: string): string {
  return pool[randomIndex(pool.length)]!;
}

function shuffleInPlace(arr: string[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1);
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
}

type CharOptions = {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

function buildPools(opts: CharOptions): string[] {
  const pools: string[] = [];
  if (opts.uppercase) pools.push(UPPER);
  if (opts.lowercase) pools.push(LOWER);
  if (opts.numbers) pools.push(DIGITS);
  if (opts.symbols) pools.push(SYMBOLS);
  return pools;
}

function generatePassword(length: number, opts: CharOptions): string | null {
  const pools = buildPools(opts);
  if (!pools.length || length < pools.length) return null;

  const chars: string[] = [];
  for (const pool of pools) {
    chars.push(pickChar(pool));
  }
  const combined = pools.join("");
  while (chars.length < length) {
    chars.push(pickChar(combined));
  }
  shuffleInPlace(chars);
  return chars.join("");
}

function poolSize(opts: CharOptions): number {
  let n = 0;
  if (opts.uppercase) n += UPPER.length;
  if (opts.lowercase) n += LOWER.length;
  if (opts.numbers) n += DIGITS.length;
  if (opts.symbols) n += SYMBOLS.length;
  return n;
}

type StrengthLevel = 0 | 1 | 2 | 3 | 4;

const STRENGTH_META: {
  level: StrengthLevel;
  label: string;
  barClass: string;
  segmentClass: string;
  labelClass: string;
}[] = [
  { level: 0, label: "Weak", barClass: "bg-red-500", segmentClass: "bg-red-500/30", labelClass: "text-red-500" },
  { level: 1, label: "Fair", barClass: "bg-orange-500", segmentClass: "bg-orange-500/30", labelClass: "text-orange-500" },
  { level: 2, label: "Good", barClass: "bg-yellow-500", segmentClass: "bg-yellow-500/30", labelClass: "text-yellow-600" },
  { level: 3, label: "Strong", barClass: "bg-green-500", segmentClass: "bg-green-500/30", labelClass: "text-green-600" },
  { level: 4, label: "Very Strong", barClass: "bg-emerald-500", segmentClass: "bg-emerald-500/30", labelClass: "text-emerald-600" },
];

function strengthForPassword(
  password: string,
  length: number,
  opts: CharOptions
): { level: StrengthLevel; label: string; bits: number } {
  const size = poolSize(opts);
  if (!password || size === 0) {
    return { level: 0, label: STRENGTH_META[0]!.label, bits: 0 };
  }
  const bits = length * (Math.log(size) / Math.LN2);

  let level: StrengthLevel = 0;
  if (bits >= 72 && length >= 12) level = 4;
  else if (bits >= 56 && length >= 10) level = 3;
  else if (bits >= 44 && length >= 8) level = 2;
  else if (bits >= 32) level = 1;
  else level = 0;

  const classes = [
    opts.uppercase,
    opts.lowercase,
    opts.numbers,
    opts.symbols,
  ].filter(Boolean).length;
  if (classes < 2 && level > 1) level = 1;
  if (classes < 3 && level > 2) level = 2;
  if (length < 12 && level > 3) level = 3;
  if (length < 16 && level === 4) level = 3;

  return {
    level,
    label: STRENGTH_META[level]!.label,
    bits,
  };
}

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const opts = useMemo<CharOptions>(
    () => ({ uppercase, lowercase, numbers, symbols }),
    [uppercase, lowercase, numbers, symbols]
  );

  const generate = useCallback(() => {
    const next = generatePassword(length, opts);
    if (next) setPassword(next);
  }, [length, opts]);

  useEffect(() => {
    const next = generatePassword(16, {
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
    });
    if (next) setPassword(next);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(t);
  }, [copied]);

  const strength = strengthForPassword(password, length, opts);
  const strengthStyle = STRENGTH_META[strength.level]!;
  const pools = buildPools(opts);
  const canGenerate = pools.length > 0 && length >= pools.length;

  async function copyPassword() {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="mx-auto min-h-screen max-w-3xl bg-background px-4 py-12 sm:px-6 sm:py-16">
      <TrackPageView name="Password Generator" type="tool" />
      <p className="text-sm font-medium text-primary">Tools</p>
      <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Password generator
      </h1>
      <p className="mt-4 text-pretty text-lg text-muted-foreground">
        Create cryptographically random passwords with adjustable length and character sets. Nothing is sent to a server.
      </p>

      <div className="mt-10 space-y-8">
        <section
          className="rounded-xl border border-border/60 bg-card p-6 shadow-md"
          aria-labelledby="output-heading"
        >
          <h2 id="output-heading" className="sr-only">
            Generated password
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
            <div
              className={cn(
                "min-h-[5rem] flex-1 break-all rounded-xl bg-muted/50 p-6 text-2xl font-semibold leading-relaxed tracking-wide text-foreground sm:text-3xl",
                mono
              )}
              role="status"
              aria-live="polite"
            >
              {password || "—"}
            </div>
            <button
              type="button"
              onClick={copyPassword}
              disabled={!password}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted/60 disabled:pointer-events-none disabled:opacity-50"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-600" aria-hidden />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" aria-hidden />
                  Copy
                </>
              )}
            </button>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-medium text-foreground">Strength</span>
              <span className={cn("text-sm font-semibold", strengthStyle.labelClass)}>
                {strength.label}
              </span>
            </div>
            <div className="mt-2 flex gap-1" role="meter" aria-valuemin={0} aria-valuemax={4} aria-valuenow={strength.level} aria-label={`Password strength: ${strength.label}`}>
              {STRENGTH_META.map(({ level, segmentClass }) => (
                <div
                  key={level}
                  className={cn(
                    "h-2 flex-1 rounded-full transition-colors",
                    level <= strength.level ? strengthStyle.barClass : segmentClass
                  )}
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Estimated entropy: ~{strength.bits.toFixed(0)} bits (length × log₂ of character pool).
            </p>
          </div>
        </section>

        <section
          className="rounded-xl border border-border/60 bg-card p-6 shadow-md"
          aria-labelledby="options-heading"
        >
          <h2 id="options-heading" className="text-lg font-semibold text-foreground">
            Options
          </h2>

          <div className="mt-6">
            <label htmlFor="pw-length" className="text-sm font-medium text-foreground">
              Length: {length}
            </label>
            <input
              id="pw-length"
              type="range"
              min={8}
              max={128}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-[hsl(var(--primary))]"
            />
            <p className="mt-1 text-xs text-muted-foreground">8–128 characters</p>
          </div>

          <fieldset className="mt-6 space-y-3">
            <legend className="text-sm font-medium text-foreground">Character sets</legend>
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="h-4 w-4 rounded border-border accent-[hsl(var(--primary))]"
              />
              <span className="text-sm font-medium text-foreground">Uppercase (A–Z)</span>
            </label>
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={lowercase}
                onChange={(e) => setLowercase(e.target.checked)}
                className="h-4 w-4 rounded border-border accent-[hsl(var(--primary))]"
              />
              <span className="text-sm font-medium text-foreground">Lowercase (a–z)</span>
            </label>
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={numbers}
                onChange={(e) => setNumbers(e.target.checked)}
                className="h-4 w-4 rounded border-border accent-[hsl(var(--primary))]"
              />
              <span className="text-sm font-medium text-foreground">Numbers (0–9)</span>
            </label>
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={symbols}
                onChange={(e) => setSymbols(e.target.checked)}
                className="h-4 w-4 rounded border-border accent-[hsl(var(--primary))]"
              />
              <span className="text-sm font-medium text-foreground">Symbols (!@#$%^&*)</span>
            </label>
          </fieldset>

          {!canGenerate && (
            <p className="mt-4 text-sm text-destructive" role="alert">
              Select at least one character set, and choose a length at least equal to the number of sets selected.
            </p>
          )}

          <button
            type="button"
            onClick={generate}
            disabled={!canGenerate}
            className="mt-6 w-full rounded-xl bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-md transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
          >
            Generate
          </button>
        </section>

        <div className="mt-8">
          <AdSlot slot="tool-mid" format="horizontal" className="mx-auto" />
        </div>

        <section className="rounded-xl border border-border/60 bg-card p-6 shadow-md">
          <h2 className="text-lg font-semibold text-foreground">What makes a password strong?</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-muted-foreground">
            <li>
              <span className="font-medium text-foreground">Length:</span> longer passwords exponentially increase the work needed to guess them.
            </li>
            <li>
              <span className="font-medium text-foreground">Variety:</span> mixing uppercase, lowercase, digits, and symbols enlarges the search space.
            </li>
            <li>
              <span className="font-medium text-foreground">Randomness:</span> truly random strings resist dictionary and pattern-based attacks better than memorable phrases unless you use a vetted passphrase method.
            </li>
            <li>
              <span className="font-medium text-foreground">Uniqueness:</span> use a different strong password (or a password manager) for each account so one breach does not compromise the rest.
            </li>
          </ul>
        </section>

        <section className="rounded-xl border border-border/60 bg-card p-6 shadow-md">
          <h2 className="text-lg font-semibold text-foreground">How it works</h2>
          <ol className="mt-4 list-inside list-decimal space-y-2 text-sm text-muted-foreground">
            <li>Choose how long the password should be and which character sets to include.</li>
            <li>
              The tool uses your browser&apos;s{" "}
              <code className={cn("rounded bg-muted px-1 py-0.5 text-xs", mono)}>crypto.getRandomValues()</code>{" "}
              API so each character is drawn from a uniform random distribution (no{" "}
              <code className={cn("rounded bg-muted px-1 py-0.5 text-xs", mono)}>Math.random()</code>
              ).
            </li>
            <li>At least one character from each selected set is included, then the result is shuffled.</li>
            <li>Copy the password and store it in a password manager; this page does not log or transmit it.</li>
          </ol>
        </section>

        <section aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-lg font-semibold text-foreground">
            FAQ
          </h2>
          <div className="mt-4 space-y-3">
            <details className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-medium text-foreground">
                Is it safe to generate passwords in the browser?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                This tool runs entirely on your device. Random bytes come from the browser&apos;s cryptographic API, and the password is not uploaded to ToolPilot servers. For maximum assurance, use a reputable password manager with its own generator and keep your devices updated.
              </p>
            </details>
            <details className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-medium text-foreground">
                Why avoid predictable passwords and dictionary words?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Attackers try common passwords, leaked lists, and dictionary words first. Random passwords are not guessable by those shortcuts, so they hold up better against automated cracking when a hash leaks.
              </p>
            </details>
            <details className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-medium text-foreground">
                How long should my password be?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                For general web accounts, aim for at least 12–16 random characters with mixed character types. Higher-value accounts (email, banking, crypto) deserve longer secrets or hardware-backed factors. A password manager makes long random passwords practical.
              </p>
            </details>
            <details className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-medium text-foreground">
                Should I reuse passwords across sites?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                No. When one service is breached, reused passwords let attackers try the same login elsewhere. Unique passwords contain the blast radius; pairing them with two-factor authentication adds another layer when available.
              </p>
            </details>
          </div>
        </section>

        <div className="mt-8">
          <AdSlot slot="tool-bottom" format="rectangle" className="mx-auto" />
        </div>

        <RelatedSection items={getRelatedTools("password-generator")} />
      </div>
    </div>
  );
}
