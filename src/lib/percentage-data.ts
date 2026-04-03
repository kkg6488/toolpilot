export const percentValues = [
  1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 18, 20, 22, 25, 28, 30, 33, 35, 40,
  45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
];
export const ofValues = [
  50, 100, 200, 250, 300, 400, 500, 600, 750, 800, 1000, 1200, 1500, 2000,
  2500, 3000, 4000, 5000, 7500, 8000, 10000, 15000, 20000, 25000, 50000, 100000,
];

export function parsePercentageSlug(slug: string): { percent: number; of: number } | null {
  const match = slug.match(/^(\d+(?:\.\d+)?)-percent-of-(\d+(?:\.\d+)?)$/);
  if (!match) return null;
  return { percent: parseFloat(match[1]), of: parseFloat(match[2]) };
}

export function generateAllPercentageSlugs(): string[] {
  const slugs: string[] = [];
  for (const p of percentValues) {
    for (const o of ofValues) {
      slugs.push(`${p}-percent-of-${o}`);
    }
  }
  return slugs;
}

export function formatNumber(n: number): string {
  if (Number.isInteger(n)) return n.toLocaleString("en-US");
  return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

export function getRelatedPercentages(percent: number, of: number): { slug: string; label: string }[] {
  const related: { slug: string; label: string }[] = [];
  const otherPercents = percentValues.filter((p) => p !== percent).slice(0, 5);
  for (const p of otherPercents) {
    related.push({ slug: `${p}-percent-of-${of}`, label: `${p}% of ${of}` });
  }
  const otherOfs = ofValues.filter((o) => o !== of).slice(0, 5);
  for (const o of otherOfs) {
    related.push({ slug: `${percent}-percent-of-${o}`, label: `${percent}% of ${o}` });
  }
  return related;
}

export function getPercentageTable(of: number): { percent: number; result: string }[] {
  return [5, 10, 15, 20, 25, 30, 50, 75, 100].map((p) => ({
    percent: p,
    result: formatNumber((p / 100) * of),
  }));
}
