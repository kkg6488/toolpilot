"use client";

import { useCallback, useState } from "react";
import { AdSlot } from "@/components/shared/ad-slot";
import { TrackPageView } from "@/components/shared/track-page-view";
import { RelatedSection } from "@/components/shared/related-items";
import { getRelatedTools } from "@/lib/related-items";

const inputClass =
  "w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20";
const btnPrimary =
  "rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50";
const btnSecondary =
  "rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted/60 disabled:pointer-events-none disabled:opacity-50";

const WORDS = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
  "duis",
  "aute",
  "irure",
  "in",
  "reprehenderit",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "fugiat",
  "nulla",
  "pariatur",
  "excepteur",
  "sint",
  "occaecat",
  "cupidatat",
  "non",
  "proident",
  "sunt",
  "culpa",
  "qui",
  "officia",
  "deserunt",
  "mollit",
  "anim",
  "id",
  "est",
  "laborum",
  "curabitur",
  "vitae",
  "nunc",
  "pretium",
  "vulputate",
  "fusce",
  "placerat",
  "tincidunt",
  "sapien",
  "nec",
  "auctor",
  "mauris",
  "phasellus",
  "feugiat",
  "lectus",
  "integer",
  "bibendum",
  "sollicitudin",
  "metus",
  "suspendisse",
  "potenti",
  "vivamus",
  "condimentum",
  "tortor",
  "eu",
  "mattis",
  "pellentesque",
  "habitant",
  "morbi",
  "tristique",
  "senectus",
  "netus",
  "malesuada",
  "fames",
  "turpis",
  "egestas",
  "aenean",
  "vehicula",
  "diam",
  "ornare",
  "varius",
  "dui",
  "accumsan",
  "interdum",
  "ante",
  "primis",
  "faucibus",
  "orci",
  "luctus",
  "ultrices",
  "posuere",
  "cubilia",
  "curae",
  "donec",
  "fringilla",
  "risus",
  "laoreet",
  "convallis",
  "nam",
  "maximus",
  "ultricies",
  "purus",
  "elementum",
  "hendrerit",
  "eros",
  "cras",
  "dapibus",
  "tellus",
  "gravida",
  "blandit",
  "sodales",
  "ligula",
  "viverra",
  "facilisis",
  "neque",
  "porttitor",
  "scelerisque",
  "justo",
  "pretium",
];

const FIRST_START = ["Lorem", "ipsum", "dolor", "sit", "amet"];

function randomWord(): string {
  return WORDS[Math.floor(Math.random() * WORDS.length)]!;
}

function randomInt(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

/** Build one paragraph with `targetWords` words; first paragraph starts with the classic opening. */
function buildParagraph(targetWords: number, isFirst: boolean): string {
  const words: string[] = [];
  if (isFirst) {
    words.push(...FIRST_START);
    while (words.length < targetWords) {
      words.push(randomWord());
    }
  } else {
    while (words.length < targetWords) {
      words.push(randomWord());
    }
    words[0] = words[0]!.charAt(0).toUpperCase() + words[0]!.slice(1);
  }

  const parts: string[] = [];
  let i = 0;
  while (i < words.length) {
    const sentenceLen = Math.min(randomInt(8, 15), words.length - i);
    const slice = words.slice(i, i + sentenceLen);
    let sentence = slice.join(" ");
    sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
    if (!/[.!?]$/.test(sentence)) sentence += ".";
    parts.push(sentence);
    i += sentenceLen;
  }
  return parts.join(" ");
}

export default function LoremIpsumGeneratorPage() {
  const [paragraphs, setParagraphs] = useState(3);
  const [minWords, setMinWords] = useState(40);
  const [maxWords, setMaxWords] = useState(80);
  const [output, setOutput] = useState("");

  const generate = useCallback(() => {
    const p = Math.min(20, Math.max(1, paragraphs));
    const lo = Math.min(minWords, maxWords);
    const hi = Math.max(minWords, maxWords);
    const paras: string[] = [];
    for (let i = 0; i < p; i++) {
      const n = randomInt(lo, hi);
      paras.push(buildParagraph(n, i === 0));
    }
    setOutput(paras.join("\n\n"));
  }, [paragraphs, minWords, maxWords]);

  async function copy() {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch {
      /* ignore */
    }
  }

  const invalidRange = minWords < 5 || maxWords > 200 || minWords > maxWords;

  return (
    <div className="min-h-screen bg-background">
      <TrackPageView name="Lorem Ipsum Generator" type="tool" />
      <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">Tools</p>
        <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Lorem ipsum generator
        </h1>
        <p className="mt-4 text-pretty text-lg text-muted-foreground">
          Placeholder paragraphs built from a Latin-style word list. The first paragraph always begins with &quot;Lorem ipsum
          dolor sit amet&quot;.
        </p>

        <section className="mt-8 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <h2 className="text-lg font-semibold text-foreground">Options</h2>
          <div className="mt-4">
            <label htmlFor="lorem-p" className="text-sm font-medium text-foreground">
              Paragraphs (1–20): {paragraphs}
            </label>
            <input
              id="lorem-p"
              type="range"
              min={1}
              max={20}
              value={paragraphs}
              onChange={(e) => setParagraphs(Number(e.target.value))}
              className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-[hsl(var(--primary))]"
            />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="lorem-min" className="text-sm font-medium text-foreground">
                Min words per paragraph
              </label>
              <input
                id="lorem-min"
                type="number"
                min={5}
                max={200}
                value={minWords}
                onChange={(e) => setMinWords(Number(e.target.value))}
                className={`mt-2 ${inputClass}`}
              />
            </div>
            <div>
              <label htmlFor="lorem-max" className="text-sm font-medium text-foreground">
                Max words per paragraph
              </label>
              <input
                id="lorem-max"
                type="number"
                min={5}
                max={200}
                value={maxWords}
                onChange={(e) => setMaxWords(Number(e.target.value))}
                className={`mt-2 ${inputClass}`}
              />
            </div>
          </div>
          {invalidRange && (
            <p className="mt-3 text-sm text-destructive" role="alert">
              Use 5–200 words per paragraph and ensure min ≤ max.
            </p>
          )}
          <button type="button" className={`mt-6 ${btnPrimary}`} onClick={generate} disabled={invalidRange}>
            Generate
          </button>
        </section>

        <section className="mt-6 rounded-xl border border-border/60 bg-card p-6 shadow-md sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-foreground">Output</h2>
            <button type="button" className={btnSecondary} onClick={copy} disabled={!output}>
              Copy
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            rows={14}
            className={`mt-4 ${inputClass} min-h-[280px] text-sm leading-relaxed`}
            placeholder="Click Generate to create placeholder text…"
          />
        </section>

        <div className="mt-8">
          <AdSlot slot="tool-mid" format="horizontal" className="mx-auto" />
        </div>

        <section className="mt-10">
          <h2 className="text-lg font-semibold text-foreground">FAQ</h2>
          <div className="mt-4 space-y-3">
            <details className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-medium text-foreground">Why Lorem ipsum?</summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Designers use pseudo-Latin filler so viewers focus on layout and typography instead of reading meaning. It has
                roughly Latin letter frequency for a natural-looking block.
              </p>
            </details>
            <details className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-medium text-foreground">Is this the original Cicero text?</summary>
              <p className="mt-2 text-sm text-muted-foreground">
                This tool stitches words from a common Lorem-style pool. The first paragraph is anchored to the familiar opening;
                later sentences are randomly composed for variety.
              </p>
            </details>
            <details className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <summary className="cursor-pointer text-sm font-medium text-foreground">Can I use this in production copy?</summary>
              <p className="mt-2 text-sm text-muted-foreground">
                It is placeholder content only—replace with real copy before launch. Some generators produce nonsensical Latin;
                always review for your brand and locale.
              </p>
            </details>
          </div>
        </section>

        <div className="mt-8">
          <AdSlot slot="tool-bottom" format="rectangle" className="mx-auto" />
        </div>

        <RelatedSection items={getRelatedTools("lorem-ipsum-generator")} />
      </div>
    </div>
  );
}
