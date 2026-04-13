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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdSlot } from "@/components/shared/ad-slot";
import { TrackPageView } from "@/components/shared/track-page-view";
import { RelatedSection } from "@/components/shared/related-items";
import { getRelatedTools } from "@/lib/related-items";
import { cn } from "@/lib/utils";

const mono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace]";

type FieldKind = "star" | "single" | "range" | "starStep" | "rangeStep";

type FieldState = {
  kind: FieldKind;
  a: number;
  b: number;
  step: number;
};

const defaultField = (kind: FieldKind = "star"): FieldState => ({
  kind,
  a: 0,
  b: 1,
  step: 1,
});

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, Math.floor(n)));
}

function encodeField(
  f: FieldState,
  min: number,
  max: number,
  starStepMax: number
): string {
  switch (f.kind) {
    case "star":
      return "*";
    case "single":
      return String(clamp(f.a, min, max));
    case "range":
      return `${clamp(f.a, min, max)}-${clamp(f.b, min, max)}`;
    case "starStep": {
      const s = clamp(f.step, 1, starStepMax);
      return `*/${s}`;
    }
    case "rangeStep": {
      const lo = clamp(f.a, min, max);
      const hi = clamp(f.b, min, max);
      const s = clamp(f.step, 1, starStepMax);
      return `${lo}-${hi}/${s}`;
    }
    default:
      return "*";
  }
}

function matchesPart(
  value: number,
  part: string,
  min: number,
  max: number
): boolean {
  const p = part.trim();
  if (p === "*" || p === "?") return true;
  if (p.includes("/")) {
    const [range, stepStr] = p.split("/");
    const step = parseInt(stepStr, 10);
    if (!Number.isFinite(step) || step <= 0) return false;
    if (range === "*") return value % step === 0;
    if (range.includes("-")) {
      const [a, b] = range.split("-").map((x) => parseInt(x, 10));
      if (!Number.isFinite(a) || !Number.isFinite(b)) return false;
      const lo = Math.min(a, b);
      const hi = Math.max(a, b);
      if (value < lo || value > hi) return false;
      return (value - lo) % step === 0;
    }
    const start = parseInt(range, 10);
    if (!Number.isFinite(start)) return false;
    if (value < start || value > max) return false;
    return (value - start) % step === 0;
  }
  if (p.includes("-")) {
    const [a, b] = p.split("-").map((x) => parseInt(x, 10));
    if (!Number.isFinite(a) || !Number.isFinite(b)) return false;
    return value >= Math.min(a, b) && value <= Math.max(a, b);
  }
  const n = parseInt(p, 10);
  return Number.isFinite(n) && n === value;
}

function matchesField(
  value: number,
  field: string,
  min: number,
  max: number
): boolean {
  const f = field.trim();
  if (f === "*" || f === "?") return true;
  return f.split(",").some((part) => matchesPart(value, part, min, max));
}

function dateMatchesCron(
  d: Date,
  minute: string,
  hour: string,
  dom: string,
  month: string,
  dow: string
): boolean {
  const min = d.getMinutes();
  const h = d.getHours();
  const day = d.getDate();
  const mon = d.getMonth() + 1;
  const wday = d.getDay();

  if (!matchesField(min, minute, 0, 59)) return false;
  if (!matchesField(h, hour, 0, 23)) return false;
  if (!matchesField(mon, month, 1, 12)) return false;

  const domStar = dom === "*" || dom === "?";
  const dowStar = dow === "*" || dow === "?";
  if (!domStar && !dowStar) {
    const domOk = matchesField(day, dom, 1, 31);
    const dowOk = matchesField(wday, dow, 0, 6);
    return domOk || dowOk;
  }
  if (!domStar && !matchesField(day, dom, 1, 31)) return false;
  if (!dowStar && !matchesField(wday, dow, 0, 6)) return false;
  return true;
}

function nextRuns(
  minute: string,
  hour: string,
  dom: string,
  month: string,
  dow: string,
  count: number
): Date[] {
  const out: Date[] = [];
  const start = Date.now();
  const t = new Date();
  t.setSeconds(0, 0);
  let steps = 0;
  const maxSteps = 366 * 24 * 60 + 10;
  while (out.length < count && steps++ < maxSteps) {
    if (t.getTime() >= start && dateMatchesCron(t, minute, hour, dom, month, dow)) {
      out.push(new Date(t));
    }
    t.setMinutes(t.getMinutes() + 1);
  }
  return out;
}

function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

const DOW_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function describeCron(
  minute: string,
  hour: string,
  dom: string,
  month: string,
  dow: string
): string {
  const parts: string[] = [];
  if (minute === "*" && hour === "*" && dom === "*" && month === "*" && dow === "*") {
    return "Runs every minute.";
  }
  if (minute.startsWith("*/") && hour === "*" && dom === "*" && month === "*" && dow === "*") {
    return `Runs every ${minute.slice(2)} minutes.`;
  }
  if (minute === "0" && hour.startsWith("*/") && dom === "*" && month === "*" && dow === "*") {
    return `Runs at minute 0 of every ${hour.slice(2)} hours.`;
  }
  if (
    minute === "0" &&
    hour === "0" &&
    dom === "*" &&
    month === "*" &&
    dow === "*"
  ) {
    return "Runs every day at midnight (00:00).";
  }
  if (
    /^\d+$/.test(minute) &&
    /^\d+$/.test(hour) &&
    dom === "*" &&
    month === "*" &&
    dow === "*"
  ) {
    const h = parseInt(hour, 10);
    const m = parseInt(minute, 10);
    const hh = String(h).padStart(2, "0");
    const mm = String(m).padStart(2, "0");
    return `Runs every day at ${hh}:${mm}.`;
  }
  if (
    minute === "0" &&
    hour === "0" &&
    dom === "*" &&
    month === "*" &&
    /^\d+$/.test(dow)
  ) {
    const d = parseInt(dow, 10);
    const name = DOW_NAMES[d] ?? `weekday ${d}`;
    return `Runs every ${name} at midnight.`;
  }
  if (
    minute === "0" &&
    hour === "0" &&
    /^\d+$/.test(dom) &&
    month === "*" &&
    dow === "*"
  ) {
    const d = parseInt(dom, 10);
    return `Runs at midnight on the ${ordinal(d)} of every month.`;
  }
  if (
    minute === "0" &&
    hour === "0" &&
    dom === "*" &&
    /^\d+$/.test(month) &&
    dow === "*"
  ) {
    return `Runs at midnight every day in month ${month}.`;
  }
  parts.push(`Minute: ${minute}`);
  parts.push(`Hour: ${hour}`);
  parts.push(`Day of month: ${dom}`);
  parts.push(`Month: ${month}`);
  parts.push(`Day of week: ${dow}`);
  return `Cron schedule (${parts.join("; ")}). Interpretation uses standard 5-field UNIX rules with day-of-month / day-of-week OR when both are set.`;
}

function FieldEditor({
  label,
  min,
  max,
  stepMax,
  state,
  onChange,
  hints,
}: {
  label: string;
  min: number;
  max: number;
  stepMax: number;
  state: FieldState;
  onChange: (s: FieldState) => void;
  hints?: string;
}) {
  return (
    <div className="space-y-2 rounded-lg border border-border bg-muted/80 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Label className="text-base">{label}</Label>
        <span className="text-xs text-muted-foreground">{hints}</span>
      </div>
      <Select
        value={state.kind}
        onValueChange={(v) =>
          onChange({ ...state, kind: v as FieldKind })
        }
      >
        <SelectTrigger className="bg-background">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="star">Wildcard (*)</SelectItem>
          <SelectItem value="single">Specific value</SelectItem>
          <SelectItem value="range">Range (start–end)</SelectItem>
          <SelectItem value="starStep">Every n (* /n)</SelectItem>
          <SelectItem value="rangeStep">Range with step (a–b/n)</SelectItem>
        </SelectContent>
      </Select>
      {state.kind === "single" && (
        <Input
          type="number"
          min={min}
          max={max}
          value={state.a}
          onChange={(e) =>
            onChange({ ...state, a: parseInt(e.target.value, 10) || min })
          }
          className="bg-background"
        />
      )}
      {state.kind === "range" && (
        <div className="flex flex-wrap items-center gap-2">
          <Input
            type="number"
            min={min}
            max={max}
            value={state.a}
            onChange={(e) =>
              onChange({ ...state, a: parseInt(e.target.value, 10) || min })
            }
            className="bg-background"
          />
          <span>to</span>
          <Input
            type="number"
            min={min}
            max={max}
            value={state.b}
            onChange={(e) =>
              onChange({ ...state, b: parseInt(e.target.value, 10) || min })
            }
            className="bg-background"
          />
        </div>
      )}
      {state.kind === "starStep" && (
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Step</Label>
          <Input
            type="number"
            min={1}
            max={stepMax}
            value={state.step}
            onChange={(e) =>
              onChange({
                ...state,
                step: parseInt(e.target.value, 10) || 1,
              })
            }
            className="bg-background"
          />
        </div>
      )}
      {state.kind === "rangeStep" && (
        <div className="grid gap-2 sm:grid-cols-3">
          <div>
            <Label className="text-xs text-muted-foreground">From</Label>
            <Input
              type="number"
              min={min}
              max={max}
              value={state.a}
              onChange={(e) =>
                onChange({ ...state, a: parseInt(e.target.value, 10) || min })
              }
              className="bg-background"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">To</Label>
            <Input
              type="number"
              min={min}
              max={max}
              value={state.b}
              onChange={(e) =>
                onChange({ ...state, b: parseInt(e.target.value, 10) || min })
              }
              className="bg-background"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Step</Label>
            <Input
              type="number"
              min={1}
              max={stepMax}
              value={state.step}
              onChange={(e) =>
                onChange({
                  ...state,
                  step: parseInt(e.target.value, 10) || 1,
                })
              }
              className="bg-background"
            />
          </div>
        </div>
      )}
    </div>
  );
}

const PRESETS: { label: string; m: string; h: string; dom: string; mon: string; dow: string }[] =
  [
    { label: "Every minute", m: "*", h: "*", dom: "*", mon: "*", dow: "*" },
    { label: "Every hour (at :00)", m: "0", h: "*", dom: "*", mon: "*", dow: "*" },
    { label: "Every day at midnight", m: "0", h: "0", dom: "*", mon: "*", dow: "*" },
    { label: "Every day at 3:00 AM", m: "0", h: "3", dom: "*", mon: "*", dow: "*" },
    { label: "Every Monday at midnight", m: "0", h: "0", dom: "*", mon: "*", dow: "1" },
    { label: "Every month (1st, midnight)", m: "0", h: "0", dom: "1", mon: "*", dow: "*" },
    { label: "Weekdays at 9:00 AM", m: "0", h: "9", dom: "*", mon: "*", dow: "1-5" },
  ];

export default function CronExpressionBuilderPage() {
  const [minute, setMinute] = useState<FieldState>(defaultField());
  const [hour, setHour] = useState<FieldState>(defaultField());
  const [dom, setDom] = useState<FieldState>(() => ({
    ...defaultField(),
    a: 1,
    b: 15,
    step: 1,
  }));
  const [month, setMonth] = useState<FieldState>(() => ({
    ...defaultField(),
    a: 1,
    b: 6,
    step: 1,
  }));
  const [dow, setDow] = useState<FieldState>(() => ({
    ...defaultField(),
    a: 1,
    b: 5,
    step: 1,
  }));
  const [copyCron, setCopyCron] = useState("Copy");

  const minuteS = useMemo(
    () => encodeField(minute, 0, 59, 59),
    [minute]
  );
  const hourS = useMemo(() => encodeField(hour, 0, 23, 23), [hour]);
  const domS = useMemo(() => encodeField(dom, 1, 31, 31), [dom]);
  const monthS = useMemo(() => encodeField(month, 1, 12, 12), [month]);
  const dowS = useMemo(() => encodeField(dow, 0, 6, 6), [dow]);

  const cronLine = `${minuteS} ${hourS} ${domS} ${monthS} ${dowS}`;

  const description = useMemo(
    () => describeCron(minuteS, hourS, domS, monthS, dowS),
    [minuteS, hourS, domS, monthS, dowS]
  );

  const upcoming = useMemo(
    () => nextRuns(minuteS, hourS, domS, monthS, dowS, 5),
    [minuteS, hourS, domS, monthS, dowS]
  );

  const applyPreset = useCallback(
    (label: string) => {
      const p = PRESETS.find((x) => x.label === label);
      if (!p) return;
      const parse = (s: string, min: number, max: number): FieldState => {
        if (s === "*") return defaultField("star");
        if (s.startsWith("*/"))
          return {
            kind: "starStep",
            a: min,
            b: max,
            step: parseInt(s.slice(2), 10) || 1,
          };
        if (s.includes("-") && !s.includes("/")) {
          const [a, b] = s.split("-").map((x) => parseInt(x, 10));
          return {
            kind: "range",
            a: Number.isFinite(a) ? a : min,
            b: Number.isFinite(b) ? b : max,
            step: 1,
          };
        }
        const n = parseInt(s, 10);
        return {
          kind: "single",
          a: Number.isFinite(n) ? n : min,
          b: min,
          step: 1,
        };
      };
      setMinute(parse(p.m, 0, 59));
      setHour(parse(p.h, 0, 23));
      setDom(parse(p.dom, 1, 31));
      setMonth(parse(p.mon, 1, 12));
      setDow(parse(p.dow, 0, 6));
    },
    []
  );

  const copyExpression = async () => {
    try {
      await navigator.clipboard.writeText(cronLine);
      setCopyCron("Copied!");
      setTimeout(() => setCopyCron("Copy"), 2000);
    } catch {
      setCopyCron("Copy");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <TrackPageView name="Cron Expression Builder" type="tool" />
      <div className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Cron expression builder
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Build standard five-field UNIX cron strings visually, preview the next
          runs, and copy the expression to your crontab or scheduler.
        </p>

        <Card className="mt-8 border-0 bg-card shadow-md">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <CardTitle>Schedule</CardTitle>
              <CardDescription>
                Day of week uses 0 = Sunday through 6 = Saturday.
              </CardDescription>
            </div>
            <div className="flex flex-col gap-2 sm:w-72">
              <Label>Quick presets</Label>
              <Select onValueChange={applyPreset}>
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Apply preset…" />
                </SelectTrigger>
                <SelectContent>
                  {PRESETS.map((p) => (
                    <SelectItem key={p.label} value={p.label}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FieldEditor
                label="Minute"
                min={0}
                max={59}
                stepMax={59}
                state={minute}
                onChange={setMinute}
                hints="0–59"
              />
              <FieldEditor
                label="Hour"
                min={0}
                max={23}
                stepMax={23}
                state={hour}
                onChange={setHour}
                hints="0–23"
              />
              <FieldEditor
                label="Day of month"
                min={1}
                max={31}
                stepMax={31}
                state={dom}
                onChange={setDom}
                hints="1–31"
              />
              <FieldEditor
                label="Month"
                min={1}
                max={12}
                stepMax={12}
                state={month}
                onChange={setMonth}
                hints="1–12"
              />
              <FieldEditor
                label="Day of week"
                min={0}
                max={6}
                stepMax={6}
                state={dow}
                onChange={setDow}
                hints="0 Sun – 6 Sat"
              />
            </div>

            <div className="space-y-2">
              <Label>Cron expression</Label>
              <div
                className={cn(
                  "relative rounded-md border border-input bg-muted px-4 py-4 text-lg",
                  mono
                )}
              >
                <code className="break-all">{cronLine}</code>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="absolute right-3 top-3 bg-background"
                  onClick={copyExpression}
                >
                  {copyCron}
                </Button>
              </div>
            </div>

            <div className="rounded-md border border-border bg-muted/50 px-4 py-3 text-sm leading-relaxed">
              <span className="font-medium text-foreground">Summary: </span>
              {description}
            </div>

            <div className="space-y-2">
              <Label>Next 5 execution times (local)</Label>
              <ul
                className={cn(
                  "m-0 list-none space-y-2 rounded-md border border-input bg-muted p-4 text-sm",
                  mono
                )}
              >
                {upcoming.length === 0 && (
                  <li className="text-muted-foreground">
                    No matches in the next search window — try a broader
                    schedule.
                  </li>
                )}
                {upcoming.map((d, i) => (
                  <li key={i}>
                    {d.toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8">
          <AdSlot slot="tool-mid" format="horizontal" className="mx-auto" />
        </div>

        <div className="mt-8">
          <AdSlot slot="tool-bottom" format="rectangle" className="mx-auto" />
        </div>

        <RelatedSection items={getRelatedTools("cron-expression-builder")} />
      </div>
    </div>
  );
}
