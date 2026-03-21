"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const mono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace]";

const READ_WPM = 200;
const SPEAK_WPM = 130;

function countWords(text: string): number {
  const t = text.trim();
  if (!t) return 0;
  return t.split(/\s+/).length;
}

function countSentences(text: string): number {
  const t = text.trim();
  if (!t) return 0;
  return t.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
}

function countParagraphs(text: string): number {
  const t = text.trim();
  if (!t) return 0;
  const blocks = t.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  return blocks.length;
}

function formatSpeakReadTime(wordCount: number, wpm: number): string {
  if (wordCount === 0) return "—";
  const minutesTotal = wordCount / wpm;
  const m = Math.floor(minutesTotal);
  const s = Math.round((minutesTotal - m) * 60);
  if (m === 0) return `${s} sec`;
  if (s === 0) return `${m} min`;
  return `${m} min ${s} sec`;
}

type WordFreq = { word: string; count: number; density: number };

function topWords(text: string, totalWords: number): WordFreq[] {
  const lower = text.toLowerCase();
  const map = new Map<string, number>();
  const tokenMatches = lower.match(/[a-zA-Z][a-zA-Z0-9']*/g) || [];
  for (const w of tokenMatches) {
    map.set(w, (map.get(w) ?? 0) + 1);
  }
  const denom = totalWords > 0 ? totalWords : 1;
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 5)
    .map(([word, count]) => ({
      word,
      count,
      density: Math.round((count / denom) * 1000) / 10,
    }));
}

export default function WordCounterPage() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const words = countWords(text);
    const charsWith = text.length;
    const charsWithout = text.replace(/\s/g, "").length;
    const sentences = countSentences(text);
    const paragraphs = countParagraphs(text);
    return {
      words,
      charsWith,
      charsWithout,
      sentences,
      paragraphs,
      readTime: formatSpeakReadTime(words, READ_WPM),
      speakTime: formatSpeakReadTime(words, SPEAK_WPM),
      top: topWords(text, words),
    };
  }, [text]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Word counter
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Paste or type text for live word, character, sentence, and paragraph
          counts—plus reading and speaking time and keyword-style frequency.
        </p>

        <div className="mt-8 space-y-6 rounded-xl border border-border/60 bg-card p-6 shadow-md">
          <div className="space-y-2">
            <Label htmlFor="word-counter-input">Your text</Label>
            <Textarea
              id="word-counter-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Start typing or paste content here…"
              spellCheck
              className={cn(
                "min-h-[300px] resize-y bg-muted/50 text-foreground border-input",
                "focus:border-primary focus:ring-2 focus:ring-ring/20 focus-visible:ring-ring/20",
                mono
              )}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" onClick={() => setText("")}>
              Clear
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-primary/10 p-4">
              <p className="text-2xl font-bold text-primary">{stats.words}</p>
              <p className="text-sm text-muted-foreground">Words</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-2xl font-bold text-foreground">
                {stats.charsWith}
              </p>
              <p className="text-sm text-muted-foreground">
                Characters (with spaces)
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-2xl font-bold text-foreground">
                {stats.charsWithout}
              </p>
              <p className="text-sm text-muted-foreground">
                Characters (no spaces)
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-2xl font-bold text-foreground">
                {stats.sentences}
              </p>
              <p className="text-sm text-muted-foreground">Sentences</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-2xl font-bold text-foreground">
                {stats.paragraphs}
              </p>
              <p className="text-sm text-muted-foreground">Paragraphs</p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-2xl font-bold text-foreground">
                {stats.readTime}
              </p>
              <p className="text-sm text-muted-foreground">
                Reading time (~{READ_WPM} wpm)
              </p>
            </div>
            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-2xl font-bold text-foreground">
                {stats.speakTime}
              </p>
              <p className="text-sm text-muted-foreground">
                Speaking time (~{SPEAK_WPM} wpm)
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Top 5 words (keyword density)
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Based on letter/number tokens; density is share of total word
              count.
            </p>
            {stats.words === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">
                Add text to see frequent words.
              </p>
            ) : (
              <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
                {stats.top.map(({ word, count, density }) => (
                  <li
                    key={word}
                    className="rounded-lg border border-border/60 bg-muted/50 px-3 py-2"
                  >
                    <p className="font-mono text-sm font-medium text-foreground">
                      {word}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {count}× · {density}%
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <section className="mt-12 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">
            How it works
          </h2>
          <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
            <li>
              Type or paste your draft into the box—updates run as you edit, with
              nothing uploaded to a server.
            </li>
            <li>
              Words are split on whitespace after trimming; characters include
              everything you typed, with a second count that ignores spaces.
            </li>
            <li>
              Sentences use simple punctuation splits; paragraphs use blank
              lines. Times assume ~{READ_WPM} wpm reading and ~{SPEAK_WPM} wpm
              speaking.
            </li>
            <li>
              Frequent words ignore basic punctuation; density is each
              token&apos;s count divided by the total word count.
            </li>
          </ol>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
          <div className="space-y-3">
            <details className="rounded-lg border border-border bg-card px-4 py-3">
              <summary className="cursor-pointer font-medium text-foreground">
                Is my text stored or sent anywhere?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                No. Counting happens in your browser; we do not persist your
                content or transmit it for this tool.
              </p>
            </details>
            <details className="rounded-lg border border-border bg-card px-4 py-3">
              <summary className="cursor-pointer font-medium text-foreground">
                Why might sentence count differ from my editor?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Sentences are estimated from periods, question marks, and
                exclamation points. Abbreviations and decimals can add noise, so
                treat the number as a quick guide—not a linguistic parse.
              </p>
            </details>
            <details className="rounded-lg border border-border bg-card px-4 py-3">
              <summary className="cursor-pointer font-medium text-foreground">
                How is reading time calculated?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                We divide the word count by {READ_WPM} words per minute and show
                minutes and seconds, rounded to the nearest second for the
                remainder.
              </p>
            </details>
            <details className="rounded-lg border border-border bg-card px-4 py-3">
              <summary className="cursor-pointer font-medium text-foreground">
                What counts as a &quot;word&quot; for keyword density?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Tokens start with a letter (any language) and can include more
                letters, numbers, or apostrophes. The density percentage is that
                token&apos;s count divided by the total whitespace-delimited word
                count shown in the primary stat.
              </p>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}
