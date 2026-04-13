"use client";

import { useEffect, useState } from "react";
import { AdSlot } from "@/components/shared/ad-slot";
import { TrackPageView } from "@/components/shared/track-page-view";
import { RelatedSection } from "@/components/shared/related-items";
import { getRelatedTools } from "@/lib/related-items";

const inputClass =
  "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20";
const btnPrimary =
  "rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50";

/** RFC 1321–style MD5 over UTF-8 bytes of `message`. */
function md5(message: string): string {
  const msg = new TextEncoder().encode(message);
  const origLen = msg.length;
  const bitLenLow = (origLen * 8) >>> 0;
  const bitLenHigh = (Math.floor(origLen / 0x20000000) * 8) >>> 0;
  const padBytes = (64 - ((origLen + 9) % 64)) % 64;
  const total = origLen + 1 + padBytes + 8;
  const buf = new Uint8Array(total);
  buf.set(msg);
  buf[origLen] = 0x80;
  const view = new DataView(buf.buffer);
  view.setUint32(total - 8, bitLenLow, true);
  view.setUint32(total - 4, bitLenHigh, true);

  let h0 = 0x67452301;
  let h1 = 0xefcdab89;
  let h2 = 0x98badcfe;
  let h3 = 0x10325476;

  const K = new Uint32Array(64);
  for (let i = 0; i < 64; i++) {
    K[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296) >>> 0;
  }
  const S = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11,
    16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
  ];

  const M = new Uint32Array(16);
  for (let off = 0; off < total; off += 64) {
    for (let i = 0; i < 16; i++) M[i] = view.getUint32(off + i * 4, true);
    let A = h0;
    let B = h1;
    let C = h2;
    let D = h3;
    for (let i = 0; i < 64; i++) {
      let F: number;
      let g: number;
      if (i < 16) {
        F = (B & C) | (~B & D);
        g = i;
      } else if (i < 32) {
        F = (D & B) | (~D & C);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        F = B ^ C ^ D;
        g = (3 * i + 5) % 16;
      } else {
        F = C ^ (B | ~D);
        g = (7 * i) % 16;
      }
      F = (F + A + K[i]! + M[g]!) >>> 0;
      const rot = S[i]!;
      A = D;
      D = C;
      C = B;
      B = (B + ((F << rot) | (F >>> (32 - rot)))) >>> 0;
    }
    h0 = (h0 + A) >>> 0;
    h1 = (h1 + B) >>> 0;
    h2 = (h2 + C) >>> 0;
    h3 = (h3 + D) >>> 0;
  }

  const out = new Uint8Array(16);
  const ov = new DataView(out.buffer);
  ov.setUint32(0, h0, true);
  ov.setUint32(4, h1, true);
  ov.setUint32(8, h2, true);
  ov.setUint32(12, h3, true);
  return Array.from(out, (b) => b.toString(16).padStart(2, "0")).join("");
}

async function subtleDigest(algo: "SHA-1" | "SHA-256" | "SHA-512", text: string): Promise<string | null> {
  if (typeof crypto === "undefined" || !crypto.subtle) return null;
  const data = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest(algo, data);
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

function HashRow({ label, value, onCopy }: { label: string; value: string; onCopy: () => void }) {
  return (
    <div className="rounded-lg border border-border/60 bg-muted/20 p-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <span className="shrink-0 text-sm font-semibold text-foreground">{label}</span>
        <button type="button" className={btnPrimary} onClick={onCopy} disabled={!value}>
          Copy
        </button>
      </div>
      <code className="mt-2 block break-all font-mono text-xs text-foreground sm:text-sm">{value || "—"}</code>
    </div>
  );
}

export default function HashGeneratorPage() {
  const [input, setInput] = useState("");
  const [md5Hex, setMd5Hex] = useState("");
  const [sha1, setSha1] = useState("");
  const [sha256, setSha256] = useState("");
  const [sha512, setSha512] = useState("");
  const [subtleError, setSubtleError] = useState<string | null>(null);

  useEffect(() => {
    setMd5Hex(md5(input));
  }, [input]);

  useEffect(() => {
    let cancelled = false;
    setSubtleError(null);
    (async () => {
      if (typeof crypto === "undefined" || !crypto.subtle) {
        if (!cancelled) {
          setSha1("");
          setSha256("");
          setSha512("");
          setSubtleError("Web Crypto (crypto.subtle) is not available in this context (use HTTPS or localhost).");
        }
        return;
      }
      try {
        const [a1, a256, a512] = await Promise.all([
          subtleDigest("SHA-1", input),
          subtleDigest("SHA-256", input),
          subtleDigest("SHA-512", input),
        ]);
        if (!cancelled) {
          setSha1(a1 ?? "");
          setSha256(a256 ?? "");
          setSha512(a512 ?? "");
        }
      } catch {
        if (!cancelled) {
          setSha1("");
          setSha256("");
          setSha512("");
          setSubtleError("Could not compute SHA hashes.");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [input]);

  async function copy(s: string) {
    if (!s) return;
    try {
      await navigator.clipboard.writeText(s);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <TrackPageView name="Hash Generator" type="tool" />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">Tools</p>
        <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Hash generator
        </h1>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          MD5, SHA-1, SHA-256, and SHA-512 of your text in hex. SHA algorithms use the Web Crypto API; MD5 is implemented in
          JavaScript for compatibility.
        </p>

        <section className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <label htmlFor="hash-input" className="text-sm font-medium text-foreground">
            Input
          </label>
          <textarea
            id="hash-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={6}
            className={`mt-2 ${inputClass} min-h-[140px] font-mono text-sm`}
            placeholder="Enter text to hash…"
            spellCheck={false}
          />
          {subtleError && (
            <p className="mt-3 text-sm text-amber-600 dark:text-amber-500" role="status">
              {subtleError}
            </p>
          )}
        </section>

        <div className="mt-6 space-y-4">
          <HashRow label="MD5" value={md5Hex} onCopy={() => copy(md5Hex)} />
          <HashRow label="SHA-1" value={sha1} onCopy={() => copy(sha1)} />
          <HashRow label="SHA-256" value={sha256} onCopy={() => copy(sha256)} />
          <HashRow label="SHA-512" value={sha512} onCopy={() => copy(sha512)} />
        </div>

        <div className="mt-8">
          <AdSlot slot="tool-mid" format="horizontal" className="mx-auto" />
        </div>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-foreground">FAQ</h2>
          <div className="mt-4 space-y-3">
            <details className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-medium text-foreground">Is MD5 secure for passwords?</summary>
              <p className="mt-2 text-sm text-muted-foreground">
                No. MD5 is fast and vulnerable to collision attacks; never use it for password storage. It remains common for file
                checksums and legacy compatibility, which is why it is included here.
              </p>
            </details>
            <details className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-medium text-foreground">Why are SHA hashes empty?</summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Browsers only expose <code className="rounded bg-muted px-1">crypto.subtle</code> in secure contexts (HTTPS or
                http://localhost). Open the site over HTTPS or from localhost to enable SHA-1, SHA-256, and SHA-512.
              </p>
            </details>
            <details className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-medium text-foreground">Is data sent to ToolPilot?</summary>
              <p className="mt-2 text-sm text-muted-foreground">
                No. Hashing runs entirely in your browser; your input never leaves the page.
              </p>
            </details>
          </div>
        </section>

        <div className="mt-8">
          <AdSlot slot="tool-bottom" format="rectangle" className="mx-auto" />
        </div>

        <RelatedSection items={getRelatedTools("hash-generator")} />
      </div>
    </div>
  );
}
