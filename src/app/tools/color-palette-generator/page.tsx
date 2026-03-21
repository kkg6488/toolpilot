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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Lock, LockOpen } from "lucide-react";

const mono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace]";

type HSL = { h: number; s: number; l: number };
type RGB = { r: number; g: number; b: number };

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function hslToRgb({ h, s, l }: HSL): RGB {
  const H = ((h % 360) + 360) % 360;
  const S = clamp(s, 0, 100) / 100;
  const L = clamp(l, 0, 100) / 100;
  const c = (1 - Math.abs(2 * L - 1)) * S;
  const x = c * (1 - Math.abs(((H / 60) % 2) - 1));
  const m = L - c / 2;
  let rp = 0,
    gp = 0,
    bp = 0;
  if (H < 60) [rp, gp, bp] = [c, x, 0];
  else if (H < 120) [rp, gp, bp] = [x, c, 0];
  else if (H < 180) [rp, gp, bp] = [0, c, x];
  else if (H < 240) [rp, gp, bp] = [0, x, c];
  else if (H < 300) [rp, gp, bp] = [x, 0, c];
  else [rp, gp, bp] = [c, 0, x];
  return {
    r: Math.round((rp + m) * 255),
    g: Math.round((gp + m) * 255),
    b: Math.round((bp + m) * 255),
  };
}

function rgbToHex({ r, g, b }: RGB): string {
  const h = (n: number) => n.toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`.toUpperCase();
}

function formatRgb(rgb: RGB) {
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

function formatHsl(hsl: HSL) {
  return `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;
}

function randomInRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

type Mode =
  | "random"
  | "analogous"
  | "complementary"
  | "triadic"
  | "monochromatic";

function generatePalette(mode: Mode, prev?: HSL[]): HSL[] {
  const baseH = randomInRange(0, 360);
  const baseS = randomInRange(52, 78);
  const baseL = randomInRange(42, 58);

  const rot = (h: number, d: number) => ((h + d) % 360 + 360) % 360;

  switch (mode) {
    case "random":
      return Array.from({ length: 5 }, () => ({
        h: randomInRange(0, 360),
        s: randomInRange(45, 85),
        l: randomInRange(38, 62),
      }));
    case "analogous":
      return [
        { h: baseH, s: baseS, l: baseL },
        { h: rot(baseH, 22), s: clamp(baseS + 6, 40, 90), l: baseL - 4 },
        { h: rot(baseH, -22), s: clamp(baseS - 4, 40, 90), l: baseL + 5 },
        { h: rot(baseH, 44), s: clamp(baseS + 2, 40, 90), l: baseL + 2 },
        { h: rot(baseH, -44), s: clamp(baseS - 8, 40, 90), l: baseL - 3 },
      ];
    case "complementary": {
      const h2 = rot(baseH, 180);
      return [
        { h: baseH, s: baseS, l: baseL },
        { h: h2, s: clamp(baseS - 6, 40, 88), l: baseL },
        { h: baseH, s: clamp(baseS + 10, 40, 92), l: clamp(baseL - 10, 30, 70) },
        { h: h2, s: clamp(baseS + 6, 40, 90), l: clamp(baseL + 8, 35, 72) },
        { h: rot(baseH, 90), s: clamp(baseS - 10, 35, 85), l: baseL + 3 },
      ];
    }
    case "triadic": {
      const hB = rot(baseH, 120);
      const hC = rot(baseH, 240);
      return [
        { h: baseH, s: baseS, l: baseL },
        { h: hB, s: clamp(baseS - 4, 42, 88), l: baseL - 2 },
        { h: hC, s: clamp(baseS + 4, 42, 90), l: baseL + 2 },
        { h: baseH, s: clamp(baseS + 12, 45, 92), l: clamp(baseL - 12, 32, 68) },
        { h: hB, s: clamp(baseS + 8, 45, 90), l: clamp(baseL + 10, 38, 70) },
      ];
    }
    case "monochromatic":
      return [
        { h: baseH, s: baseS, l: clamp(baseL - 18, 24, 88) },
        { h: baseH, s: clamp(baseS - 12, 30, 85), l: clamp(baseL - 8, 28, 90) },
        { h: baseH, s: baseS, l: baseL },
        { h: baseH, s: clamp(baseS + 8, 40, 95), l: clamp(baseL + 8, 30, 92) },
        { h: baseH, s: clamp(baseS + 18, 45, 98), l: clamp(baseL + 16, 35, 95) },
      ];
    default:
      return prev ?? [];
  }
}

function mergeWithLocks(
  next: HSL[],
  prev: HSL[],
  locked: boolean[]
): HSL[] {
  return next.map((c, i) => (locked[i] && prev[i] ? prev[i] : c));
}

export default function ColorPaletteGeneratorPage() {
  const [mode, setMode] = useState<Mode>("analogous");
  const [colors, setColors] = useState<HSL[]>(() =>
    generatePalette("analogous")
  );
  const [locked, setLocked] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [copyFlash, setCopyFlash] = useState<string | null>(null);

  const rgbColors = useMemo(
    () => colors.map((hsl) => ({ hsl, rgb: hslToRgb(hsl) })),
    [colors]
  );

  const flashCopy = useCallback((key: string) => {
    setCopyFlash(key);
    setTimeout(() => setCopyFlash(null), 2000);
  }, []);

  const copyText = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      flashCopy(key);
    } catch {
      /* ignore */
    }
  };

  const regenerate = () => {
    setColors((prev) =>
      mergeWithLocks(generatePalette(mode, prev), prev, locked)
    );
  };

  const toggleLock = (i: number) => {
    setLocked((L) => {
      const n = [...L];
      n[i] = !n[i];
      return n;
    });
  };

  const cssExport = useMemo(() => {
    const lines = rgbColors.map(
      ({ rgb }, i) => `  --palette-${i + 1}: ${rgbToHex(rgb)};`
    );
    return `:root {\n${lines.join("\n")}\n}`;
  }, [rgbColors]);

  const tailwindExport = useMemo(() => {
    const entries = rgbColors.map(
      ({ rgb }, i) => `    ${i + 1}: "${rgbToHex(rgb)}",`
    );
    return `// tailwind.config.js — extend theme.colors\ncolors: {\n  palette: {\n${entries.join("\n")}\n  },\n},`;
  }, [rgbColors]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Color palette generator
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Harmonious five-color palettes using HSL color theory — lock swatches,
          copy values, and export to CSS or Tailwind.
        </p>

        <Card className="mt-8 border-0 bg-card shadow-md">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <CardTitle>Palette</CardTitle>
              <CardDescription>
                Choose a harmony mode and regenerate; locked colors stay fixed.
              </CardDescription>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="space-y-2">
                <Label>Mode</Label>
                <Select
                  value={mode}
                  onValueChange={(v) => setMode(v as Mode)}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="random">Random</SelectItem>
                    <SelectItem value="analogous">Analogous</SelectItem>
                    <SelectItem value="complementary">Complementary</SelectItem>
                    <SelectItem value="triadic">Triadic</SelectItem>
                    <SelectItem value="monochromatic">Monochromatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="button" onClick={regenerate}>
                Generate new palette
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {rgbColors.map(({ hsl, rgb }, i) => {
                const hex = rgbToHex(rgb);
                const lum = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
                const fg = lum > 0.55 ? "text-foreground" : "text-white";
                return (
                  <div
                    key={i}
                    className="overflow-hidden rounded-xl border border-border shadow-sm"
                  >
                    <button
                      type="button"
                      className="relative flex aspect-[4/3] w-full items-start justify-end p-2 transition hover:opacity-95"
                      style={{ backgroundColor: hex }}
                      onClick={() => copyText(hex, `hex-${i}`)}
                      title="Copy HEX"
                    >
                      <span
                        className={cn(
                          "rounded-md bg-black/20 px-2 py-1 text-xs font-medium backdrop-blur-sm",
                          fg
                        )}
                      >
                        {copyFlash === `hex-${i}` ? "Copied!" : "HEX"}
                      </span>
                    </button>
                    <div className="space-y-2 bg-muted/50 p-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className={cn("text-xs font-semibold", mono)}>
                          {hex}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0"
                          onClick={() => toggleLock(i)}
                          aria-label={locked[i] ? "Unlock color" : "Lock color"}
                        >
                          {locked[i] ? (
                            <Lock className="h-4 w-4" />
                          ) : (
                            <LockOpen className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                      <button
                        type="button"
                        className={cn(
                          "block w-full rounded border border-transparent bg-card px-2 py-1.5 text-left text-xs hover:border-border",
                          mono
                        )}
                        onClick={() => copyText(formatRgb(rgb), `rgb-${i}`)}
                      >
                        {formatRgb(rgb)}
                        {copyFlash === `rgb-${i}` && (
                          <span className="ml-2 text-primary">Copied!</span>
                        )}
                      </button>
                      <button
                        type="button"
                        className={cn(
                          "block w-full rounded border border-transparent bg-card px-2 py-1.5 text-left text-xs hover:border-border",
                          mono
                        )}
                        onClick={() => copyText(formatHsl(hsl), `hsl-${i}`)}
                      >
                        {formatHsl(hsl)}
                        {copyFlash === `hsl-${i}` && (
                          <span className="ml-2 text-primary">Copied!</span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div>
              <Label className="mb-2 block">Export</Label>
              <Tabs defaultValue="css">
                <TabsList>
                  <TabsTrigger value="css">CSS variables</TabsTrigger>
                  <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
                </TabsList>
                <TabsContent value="css" className="mt-3">
                  <div
                    className={cn(
                      "relative rounded-md border border-input bg-muted p-4 text-sm",
                      mono
                    )}
                  >
                    <pre className="m-0 overflow-x-auto whitespace-pre-wrap break-all">
                      {cssExport}
                    </pre>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="absolute right-3 top-3 bg-background"
                      onClick={() => copyText(cssExport, "css-all")}
                    >
                      {copyFlash === "css-all" ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="tailwind" className="mt-3">
                  <div
                    className={cn(
                      "relative rounded-md border border-input bg-muted p-4 text-sm",
                      mono
                    )}
                  >
                    <pre className="m-0 overflow-x-auto whitespace-pre-wrap break-all">
                      {tailwindExport}
                    </pre>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="absolute right-3 top-3 bg-background"
                      onClick={() => copyText(tailwindExport, "tw-all")}
                    >
                      {copyFlash === "tw-all" ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
