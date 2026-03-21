# ToolPilot — Free Online Calculators & Developer Tools

A micro SaaS tools site built for SEO revenue. Every page targets a high-volume keyword, is statically generated, and optimized for Google ranking.

## Revenue Model

- **Google AdSense / Ezoic / Mediavine** — Ad slots built into every tool page
- **Individual tool pages** target keywords with 100K-500K+ monthly searches
- Stack 15+ tools = compounding organic traffic over time

## Tools Included (15 total)

### Indian Finance Calculators (high search volume in India)
| Calculator | Target Keyword | Monthly Searches |
|------------|---------------|-----------------|
| EMI Calculator | "EMI calculator" | 1M+ |
| SIP Calculator | "SIP calculator" | 500K+ |
| GST Calculator | "GST calculator" | 300K+ |
| PPF Calculator | "PPF calculator" | 200K+ |
| HRA Exemption Calculator | "HRA calculator" | 150K+ |

### Global Calculators (higher RPM from US/UK traffic)
| Calculator | Target Keyword | Monthly Searches |
|------------|---------------|-----------------|
| Mortgage Calculator | "mortgage calculator" | 1M+ |
| BMI Calculator | "BMI calculator" | 500K+ |
| Compound Interest Calculator | "compound interest calculator" | 300K+ |
| Tip Calculator | "tip calculator" | 200K+ |
| Salary Calculator | "salary calculator" | 300K+ |

### Developer/Utility Tools (SaaS potential)
| Tool | Target Keyword | Monthly Searches |
|------|---------------|-----------------|
| JSON Formatter | "JSON formatter" | 500K+ |
| Color Palette Generator | "color palette generator" | 200K+ |
| Regex Tester | "regex tester" | 150K+ |
| Privacy Policy Generator | "privacy policy generator" | 200K+ |
| Cron Expression Builder | "cron expression builder" | 100K+ |

## Tech Stack

- **Next.js 14** (App Router, 100% static generation)
- **Tailwind CSS** + shadcn/ui components
- **Zero backend** — all calculations run client-side
- **Near-zero hosting cost** — Vercel free tier
- **SEO optimized** — sitemap, robots.txt, JSON-LD schema, Open Graph

## Getting Started

```bash
cd toolpilot
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX        # Google Analytics
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXX   # Google AdSense
```

## Deployment

```bash
npm run build  # 100% static — every page prerendered
```

Deploy to **Vercel** (recommended) — zero config, free tier covers this easily.

## Revenue Projections

| Timeline | Visitors | Estimated Revenue |
|----------|---------|-------------------|
| Month 1-2 | 1K-5K | ₹0-2K |
| Month 3-4 | 10K-30K | ₹5-15K/month |
| Month 6 | 50K-100K | ₹20-50K/month |
| Month 12 | 150K-300K | ₹60K-1.5L/month |

**Key:** US/Global traffic pays 3-5x more per ad impression. The mortgage, BMI, and developer tools will drive the highest RPM.

## Adding New Tools

Each tool is a standalone page. To add a new one:

1. Create `src/app/calculators/[name]/page.tsx` (client component)
2. Create `src/app/calculators/[name]/layout.tsx` (metadata + JSON-LD)
3. Add to sitemap, navbar, footer, and index pages
4. Deploy — Vercel rebuilds automatically

## License

MIT
