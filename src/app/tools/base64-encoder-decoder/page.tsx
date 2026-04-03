"use client";

import { useMemo, useState } from "react";

const inputClass =
  "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20";
const btnPrimary =
  "rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50";
const btnSecondary =
  "rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted/60 disabled:pointer-events-none disabled:opacity-50";

function utf8ToBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]!);
  return btoa(binary);
}

function base64ToUtf8(b64: string): string {
  const normalized = b64.replace(/\s/g, "");
  const binary = atob(normalized);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function looksLikeBase64(s: string): boolean {
  const t = s.replace(/\s/g, "");
  if (t.length < 4 || t.length % 4 !== 0) return false;
  if (!/^[A-Za-z0-9+/]+=*$/.test(t)) return false;
  try {
    atob(t);
    return true;
  } catch {
    return false;
  }
}

export default function Base64EncoderDecoderPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const suggestion = useMemo(() => {
    if (!input.trim()) return null;
    return looksLikeBase64(input) ? "decode" as const : null;
  }, [input]);

  function encode() {
    setError(null);
    try {
      setOutput(utf8ToBase64(input));
    } catch {
      setError("Could not encode to Base64.");
    }
  }

  function decode() {
    setError(null);
    try {
      setOutput(base64ToUtf8(input));
    } catch {
      setError("Invalid Base64 or could not decode as UTF-8.");
    }
  }

  async function copyOut() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch {
      /* ignore */
    }
  }

  function clearAll() {
    setInput("");
    setOutput("");
    setError(null);
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">Tools</p>
        <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Base64 encoder &amp; decoder
        </h1>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          Encode plain text to Base64 or decode Base64 back to UTF-8. Everything runs in your browser.
        </p>

        {suggestion && (
          <p className="mt-4 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm text-foreground" role="status">
            This input looks like Base64. Try{" "}
            <button type="button" className="font-semibold text-primary underline" onClick={decode}>
              Decode
            </button>
            .
          </p>
        )}

        <div className="mt-8 space-y-6">
          <section className="rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
            <label htmlFor="b64-in" className="text-sm font-medium text-foreground">
              Input
            </label>
            <textarea
              id="b64-in"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError(null);
              }}
              rows={8}
              className={`mt-2 ${inputClass} min-h-[160px] font-mono text-sm`}
              placeholder="Type or paste text, or Base64 to decode…"
              spellCheck={false}
            />
            <div className="mt-4 flex flex-wrap gap-2">
              <button type="button" className={btnPrimary} onClick={encode}>
                Encode
              </button>
              <button type="button" className={btnPrimary} onClick={decode}>
                Decode
              </button>
              <button type="button" className={btnSecondary} onClick={copyOut} disabled={!output}>
                Copy output
              </button>
              <button type="button" className={btnSecondary} onClick={clearAll}>
                Clear
              </button>
            </div>
            {error && (
              <p className="mt-3 text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
          </section>

          <section className="rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
            <label htmlFor="b64-out" className="text-sm font-medium text-foreground">
              Output
            </label>
            <textarea
              id="b64-out"
              readOnly
              value={output}
              rows={8}
              className={`mt-2 ${inputClass} min-h-[160px] font-mono text-sm`}
              placeholder="Result appears here…"
            />
          </section>
        </div>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-foreground">FAQ</h2>
          <div className="mt-4 space-y-3">
            <details className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-medium text-foreground">
                Why not use btoa/atob directly for Unicode?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                <code className="rounded bg-muted px-1">btoa</code> only accepts binary strings in the Latin-1 range. This tool
                encodes your text as UTF-8 bytes first, then Base64, so emoji and all Unicode work correctly.
              </p>
            </details>
            <details className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-medium text-foreground">
                How does auto-detect work?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                After removing whitespace, if the string length is a multiple of four and only contains Base64 alphabet
                characters with valid padding, we suggest decoding. It is a hint only; invalid payloads still show an error when
                you decode.
              </p>
            </details>
            <details className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-medium text-foreground">
                Is my data sent to a server?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                No. Encoding and decoding happen entirely in your tab using the Web APIs above.
              </p>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}
