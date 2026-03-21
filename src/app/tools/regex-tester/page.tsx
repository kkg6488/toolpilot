"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const mono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace]";

const QUICK_PATTERNS: { label: string; pattern: string; flags: string }[] = [
  { label: "Email", pattern: String.raw`[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}`, flags: "g" },
  { label: "URL", pattern: String.raw`https?:\/\/[^\s]+`, flags: "gi" },
  { label: "Phone (US)", pattern: String.raw`\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b`, flags: "g" },
  { label: "IPv4", pattern: String.raw`\b(?:(?:25[0-5]|2[0-4]\d|1?\d{1,2})\.){3}(?:25[0-5]|2[0-4]\d|1?\d{1,2})\b`, flags: "g" },
  { label: "Date (YYYY-MM-DD)", pattern: String.raw`\b\d{4}-\d{2}-\d{2}\b`, flags: "g" },
  { label: "Hex color", pattern: String.raw`#(?:[0-9a-fA-F]{3}){1,2}\b`, flags: "g" },
  { label: "UUID", pattern: String.raw`\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}\b`, flags: "g" },
  { label: "Digits", pattern: String.raw`\d+`, flags: "g" },
];

type MatchRow = {
  index: number;
  match: string;
  groups: string[];
};

function collectMatches(
  pattern: string,
  flagStr: string,
  text: string
): { error?: string; matches: MatchRow[] } {
  if (!pattern) return { matches: [] };
  let re: RegExp;
  try {
    re = new RegExp(pattern, flagStr);
  } catch (e) {
    return {
      error: e instanceof Error ? e.message : String(e),
      matches: [],
    };
  }
  const matches: MatchRow[] = [];
  const global = re.global;
  if (global) {
    re.lastIndex = 0;
    let m: RegExpExecArray | null;
    let guard = 0;
    const max = Math.max(text.length * 4, 5000);
    while ((m = re.exec(text)) !== null && guard++ < max) {
      matches.push({
        index: m.index,
        match: m[0],
        groups: m.slice(1),
      });
      if (m[0].length === 0) re.lastIndex++;
    }
  } else {
    re.lastIndex = 0;
    const m = re.exec(text);
    if (m) {
      matches.push({
        index: m.index,
        match: m[0],
        groups: m.slice(1),
      });
    }
  }
  return { matches };
}

function highlightText(
  text: string,
  matches: MatchRow[]
): React.ReactNode {
  if (!matches.length) return text;
  const sorted = [...matches].sort((a, b) => a.index - b.index);
  const parts: React.ReactNode[] = [];
  let pos = 0;
  let k = 0;
  for (const m of sorted) {
    if (m.index < pos) continue;
    if (m.index > pos) {
      parts.push(
        <span key={`t-${k++}`}>{text.slice(pos, m.index)}</span>
      );
    }
    parts.push(
      <mark
        key={`m-${k++}`}
        className="rounded-sm bg-amber-200 px-0.5 text-inherit dark:bg-amber-900/60"
      >
        {text.slice(m.index, m.index + m.match.length)}
      </mark>
    );
    pos = m.index + m.match.length;
  }
  if (pos < text.length) {
    parts.push(<span key={`t-${k++}`}>{text.slice(pos)}</span>);
  }
  return parts;
}

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("\\w+");
  const [g, setG] = useState(true);
  const [i, setI] = useState(false);
  const [m, setM] = useState(false);
  const [s, setS] = useState(false);
  const [testText, setTestText] = useState(
    "Contact us at hello@example.com or visit https://tool-pilot.in today."
  );
  const [replacement, setReplacement] = useState("[match]");
  const [copyReplace, setCopyReplace] = useState("Copy");

  const flags = `${g ? "g" : ""}${i ? "i" : ""}${m ? "m" : ""}${s ? "s" : ""}`;

  const { error, matches } = useMemo(
    () => collectMatches(pattern, flags, testText),
    [pattern, flags, testText]
  );

  const highlighted = useMemo(
    () => highlightText(testText, matches),
    [testText, matches]
  );

  const replaceResult = useMemo(() => {
    if (!pattern || error) return "";
    try {
      const re = new RegExp(pattern, flags);
      return testText.replace(re, replacement);
    } catch {
      return "";
    }
  }, [pattern, flags, testText, replacement, error]);

  const applyQuick = (label: string) => {
    const item = QUICK_PATTERNS.find((p) => p.label === label);
    if (!item) return;
    setPattern(item.pattern);
    setG(item.flags.includes("g"));
    setI(item.flags.includes("i"));
    setM(item.flags.includes("m"));
    setS(item.flags.includes("s"));
  };

  const copyReplaceOut = async () => {
    if (!replaceResult) return;
    try {
      await navigator.clipboard.writeText(replaceResult);
      setCopyReplace("Copied!");
      setTimeout(() => setCopyReplace("Copy"), 2000);
    } catch {
      setCopyReplace("Copy");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Regex tester
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Live JavaScript RegExp testing: highlighted matches, capture groups,
          and replacement preview with common pattern presets.
        </p>

        <Card className="mt-8 border-0 bg-card shadow-md">
          <CardHeader>
            <CardTitle>Pattern &amp; flags</CardTitle>
            <CardDescription>
              Uses JavaScript <code className={mono}>RegExp</code> syntax.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="flex-1 space-y-2">
                <Label htmlFor="pattern">Regular expression</Label>
                <Input
                  id="pattern"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  className={cn(mono, "bg-muted/50")}
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
              <div className="space-y-2 lg:w-56">
                <Label>Quick patterns</Label>
                <Select onValueChange={applyQuick}>
                  <SelectTrigger>
                    <SelectValue placeholder="Insert preset…" />
                  </SelectTrigger>
                  <SelectContent>
                    {QUICK_PATTERNS.map((p) => (
                      <SelectItem key={p.label} value={p.label}>
                        {p.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <fieldset className="space-y-2">
              <legend className="text-sm font-medium">Flags</legend>
              <div className="flex flex-wrap gap-4">
                <label className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={g}
                    onChange={(e) => setG(e.target.checked)}
                    className="rounded border-input"
                  />
                  <span className={mono}>g</span>
                  <span className="text-muted-foreground">global</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={i}
                    onChange={(e) => setI(e.target.checked)}
                    className="rounded border-input"
                  />
                  <span className={mono}>i</span>
                  <span className="text-muted-foreground">ignore case</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={m}
                    onChange={(e) => setM(e.target.checked)}
                    className="rounded border-input"
                  />
                  <span className={mono}>m</span>
                  <span className="text-muted-foreground">multiline</span>
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={s}
                    onChange={(e) => setS(e.target.checked)}
                    className="rounded border-input"
                  />
                  <span className={mono}>s</span>
                  <span className="text-muted-foreground">dotAll</span>
                </label>
              </div>
            </fieldset>

            <div className="space-y-2">
              <Label htmlFor="test">Test string</Label>
              <div
                className={cn(
                  "min-h-[160px] whitespace-pre-wrap break-words rounded-md border border-input bg-muted p-4 text-sm leading-relaxed",
                  mono
                )}
              >
                {testText ? (
                  highlighted
                ) : (
                  <span className="text-muted-foreground">No text</span>
                )}
              </div>
              <Textarea
                id="test"
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                className={cn("min-h-[120px] bg-muted/50", mono)}
                spellCheck={false}
              />
            </div>

            <div
              className={cn(
                "rounded-md border border-input bg-muted p-4 text-sm",
                mono
              )}
            >
              {error ? (
                <p className="m-0 text-destructive">{error}</p>
              ) : (
                <>
                  <p className="m-0 font-sans text-base font-semibold text-foreground">
                    {matches.length} match{matches.length === 1 ? "" : "es"}
                  </p>
                  <ul className="mt-3 list-none space-y-3 p-0">
                    {matches.slice(0, 50).map((row, idx) => (
                      <li key={`${row.index}-${idx}`} className="border-t border-border pt-3 first:border-t-0 first:pt-0">
                        <div className="font-sans text-xs text-muted-foreground">
                          #{idx + 1} at index {row.index}
                        </div>
                        <div className="mt-1 break-all">{row.match}</div>
                        {row.groups.length > 0 && (
                          <div className="mt-2 space-y-1">
                            <span className="font-sans text-xs font-medium text-foreground">
                              Capture groups
                            </span>
                            <ol className="m-0 list-decimal pl-5 text-xs">
                              {row.groups.map((gval, gi) => (
                                <li key={gi} className="break-all">
                                  {gval === "" ? (
                                    <em className="text-muted-foreground">
                                      empty
                                    </em>
                                  ) : (
                                    gval
                                  )}
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                  {matches.length > 50 && (
                    <p className="mt-2 font-sans text-xs text-muted-foreground">
                      Showing first 50 matches.
                    </p>
                  )}
                </>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="repl">Replacement</Label>
                <Input
                  id="repl"
                  value={replacement}
                  onChange={(e) => setReplacement(e.target.value)}
                  className={cn(mono, "bg-muted/50")}
                  placeholder="$& or $1…"
                />
                <p className="text-xs text-muted-foreground">
                  Supports <span className={mono}>{"$&"}</span>,{" "}
                  <span className={mono}>$1</span>, and backtick segments per JS
                  replace rules.
                </p>
              </div>
              <div className="space-y-2">
                <Label>Replace result</Label>
                <div
                  className={cn(
                    "min-h-[100px] rounded-md border border-input bg-muted p-3 text-sm",
                    mono
                  )}
                >
                  <pre className="m-0 whitespace-pre-wrap break-all">
                    {replaceResult || (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </pre>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={!replaceResult}
                  onClick={copyReplaceOut}
                >
                  {copyReplace}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
