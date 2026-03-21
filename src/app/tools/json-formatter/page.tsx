"use client";

import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const mono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace]";

function lineColumnAtIndex(
  text: string,
  index: number
): { line: number; col: number } {
  let line = 1;
  let col = 1;
  for (let i = 0; i < index && i < text.length; i++) {
    if (text[i] === "\n") {
      line++;
      col = 1;
    } else {
      col++;
    }
  }
  return { line, col };
}

function parseJsonErrorPosition(message: string): number | null {
  const m = message.match(/position (\d+)/i);
  if (m) return parseInt(m[1], 10);
  return null;
}

type JsonTokenType =
  | "whitespace"
  | "string"
  | "number"
  | "boolean"
  | "null"
  | "punctuation"
  | "key";

function highlightJsonString(json: string): React.ReactNode[] {
  const out: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  const push = (type: JsonTokenType, text: string) => {
    if (!text) return;
    const styles: Record<JsonTokenType, string> = {
      whitespace: "text-slate-600",
      string: "text-emerald-700",
      number: "text-amber-700",
      boolean: "text-violet-700",
      null: "text-violet-600",
      punctuation: "text-slate-800",
      key: "text-sky-800",
    };
    out.push(
      <span key={key++} className={styles[type]}>
        {text}
      </span>
    );
  };

  while (i < json.length) {
    const c = json[i];
    if (/\s/.test(c)) {
      let j = i + 1;
      while (j < json.length && /\s/.test(json[j])) j++;
      push("whitespace", json.slice(i, j));
      i = j;
      continue;
    }
    if (c === '"') {
      let j = i + 1;
      let esc = false;
      while (j < json.length) {
        if (esc) {
          esc = false;
          j++;
          continue;
        }
        if (json[j] === "\\") {
          esc = true;
          j++;
          continue;
        }
        if (json[j] === '"') {
          j++;
          break;
        }
        j++;
      }
      const slice = json.slice(i, j);
      const after = json.slice(j).match(/^\s*:/);
      push(after ? "key" : "string", slice);
      i = j;
      continue;
    }
    if (/[-0-9]/.test(c)) {
      let j = i;
      while (j < json.length && /[0-9eE+.\-]/.test(json[j])) j++;
      push("number", json.slice(i, j));
      i = j;
      continue;
    }
    if (json.startsWith("true", i)) {
      push("boolean", "true");
      i += 4;
      continue;
    }
    if (json.startsWith("false", i)) {
      push("boolean", "false");
      i += 5;
      continue;
    }
    if (json.startsWith("null", i)) {
      push("null", "null");
      i += 4;
      continue;
    }
    push("punctuation", c);
    i++;
  }

  return out;
}

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState<2 | 4>(2);
  const [validation, setValidation] = useState<
    | { ok: true }
    | { ok: false; message: string; line?: number; col?: number }
    | null
  >(null);
  const [formatted, setFormatted] = useState("");
  const [copyLabel, setCopyLabel] = useState("Copy");

  const validateAndStringify = useCallback(
    (raw: string, mode: "pretty" | "minify") => {
      const trimmed = raw.trim();
      if (!trimmed) {
        setValidation(null);
        setFormatted("");
        return;
      }
      try {
        const parsed = JSON.parse(trimmed);
        const space = mode === "pretty" ? indent : undefined;
        const out = JSON.stringify(parsed, null, space);
        setValidation({ ok: true });
        setFormatted(out);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        let line: number | undefined;
        let col: number | undefined;
        const pos = parseJsonErrorPosition(msg);
        if (pos != null && pos >= 0 && pos <= raw.length) {
          const lc = lineColumnAtIndex(raw, pos);
          line = lc.line;
          col = lc.col;
        }
        const lineMatch = msg.match(/line (\d+)/i);
        if (lineMatch) line = parseInt(lineMatch[1], 10);
        setValidation({ ok: false, message: msg, line, col });
        setFormatted("");
      }
    },
    [indent]
  );

  const highlighted = useMemo(
    () => (formatted ? highlightJsonString(formatted) : []),
    [formatted]
  );

  const handleFormat = () => validateAndStringify(input, "pretty");
  const handleMinify = () => validateAndStringify(input, "minify");

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text");
    const el = e.currentTarget;
    const start = el.selectionStart ?? 0;
    const end = el.selectionEnd ?? 0;
    const next = input.slice(0, start) + pasted + input.slice(end);
    setInput(next);
    const caret = start + pasted.length;
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(caret, caret);
    });
    queueMicrotask(() => validateAndStringify(next, "pretty"));
  };

  const copyOutput = async () => {
    if (!formatted) return;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopyLabel("Copied!");
      setTimeout(() => setCopyLabel("Copy"), 2000);
    } catch {
      setCopyLabel("Copy");
    }
  };

  const clearAll = () => {
    setInput("");
    setFormatted("");
    setValidation(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          JSON formatter &amp; validator
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Paste or type JSON, then format, minify, validate, and copy —
          with syntax-highlighted output and configurable indentation.
        </p>

        <Card className="mt-8 border-0 bg-card shadow-md">
          <CardHeader>
            <CardTitle>Format JSON online</CardTitle>
            <CardDescription>
              Pretty-print with 2 or 4 spaces, or minify for production payloads.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
              <div className="flex-1 space-y-2">
                <Label htmlFor="json-input">Input</Label>
                <Textarea
                  id="json-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onPaste={handlePaste}
                  placeholder='{"hello": "world"}'
                  className={cn(
                    "min-h-[280px] resize-y bg-muted/50 text-sm",
                    mono
                  )}
                  spellCheck={false}
                />
              </div>
              <div className="flex-1 space-y-2">
                <Label>Output</Label>
                <div
                  className={cn(
                    "min-h-[280px] overflow-auto rounded-md border border-input bg-muted p-4 text-sm leading-relaxed",
                    mono
                  )}
                >
                  {formatted ? (
                    <pre className="m-0 whitespace-pre-wrap break-all">
                      {highlighted}
                    </pre>
                  ) : (
                    <p className="m-0 text-muted-foreground">
                      Valid JSON will appear here with highlighting.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end">
              <div className="space-y-2">
                <Label>Indent</Label>
                <Select
                  value={String(indent)}
                  onValueChange={(v) => setIndent(v === "4" ? 4 : 2)}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 spaces</SelectItem>
                    <SelectItem value="4">4 spaces</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="button" onClick={handleFormat}>
                  Format
                </Button>
                <Button type="button" variant="outline" onClick={handleMinify}>
                  Minify
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={copyOutput}
                  disabled={!formatted}
                >
                  {copyLabel}
                </Button>
                <Button type="button" variant="ghost" onClick={clearAll}>
                  Clear
                </Button>
              </div>
            </div>

            {validation && (
              <div
                role="status"
                className={cn(
                  "rounded-md border px-4 py-3 text-sm",
                  validation.ok
                    ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                    : "border-red-200 bg-red-50 text-red-900"
                )}
              >
                {validation.ok ? (
                  <span className="font-medium">Valid JSON</span>
                ) : (
                  <div>
                    <p className="font-medium">Invalid JSON</p>
                    <p className="mt-1 font-mono text-xs opacity-90">
                      {validation.message}
                    </p>
                    {(validation.line != null || validation.col != null) && (
                      <p className="mt-2 text-xs">
                        {validation.line != null && (
                          <span>Line {validation.line}</span>
                        )}
                        {validation.line != null &&
                          validation.col != null &&
                          ", "}
                        {validation.col != null && (
                          <span>column {validation.col}</span>
                        )}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
