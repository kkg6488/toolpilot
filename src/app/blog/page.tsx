import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Calculators, Tools & Tips | ToolPilot",
  description:
    "Guides, tutorials, and tips about online calculators, developer tools, and financial planning. Learn how to calculate EMI, SIP, income tax, and more.",
  alternates: { canonical: "https://tool-pilot.in/blog" },
  openGraph: {
    title: "Blog — Calculators, Tools & Tips | ToolPilot",
    description:
      "Guides, tutorials, and tips about online calculators, developer tools, and financial planning. Learn how to calculate EMI, SIP, income tax, and more.",
    url: "https://tool-pilot.in/blog",
  },
};

const posts = [
  {
    slug: "how-to-calculate-emi",
    title: "How to Calculate EMI Manually — Formula, Examples & Tips",
    description:
      "Understand the EMI formula, walk through a numeric example, and learn when to verify results with an online calculator.",
    date: "2026-03-18",
    readTime: "6 min read",
    category: "Finance",
  },
  {
    slug: "sip-vs-fd-which-is-better",
    title: "SIP vs FD: Which Investment is Better in 2026?",
    description:
      "Compare systematic investment plans and fixed deposits on returns, risk, tax treatment, and liquidity for Indian investors.",
    date: "2026-03-12",
    readTime: "7 min read",
    category: "Investing",
  },
  {
    slug: "income-tax-slabs-2025-26",
    title: "Income Tax Slabs 2025-26: Complete Guide for India",
    description:
      "A clear overview of old versus new tax regime slabs and how to choose what fits your deductions and income pattern.",
    date: "2026-03-05",
    readTime: "8 min read",
    category: "Tax",
  },
  {
    slug: "how-to-calculate-percentage",
    title: "How to Calculate Percentage: 5 Methods Explained",
    description:
      "From basic ratios to change-over-time and compound scenarios — practical methods with everyday examples.",
    date: "2026-02-28",
    readTime: "6 min read",
    category: "Math",
  },
  {
    slug: "best-free-developer-tools-2026",
    title: "Best Free Developer Tools for 2026",
    description:
      "A curated look at essential free utilities for formatting, security, scheduling, and content — including ToolPilot’s own tools.",
    date: "2026-02-20",
    readTime: "7 min read",
    category: "Developer",
  },
] as const;

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-sm font-medium text-primary">Blog</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Calculators, tools & tips
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground">
          Practical guides on loans, investing, tax basics in India, everyday
          math, and developer workflows — written to pair with ToolPilot’s free
          calculators and utilities.
        </p>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-lg border border-border bg-card p-6 shadow-sm transition-colors hover:border-primary/40 hover:bg-accent/30"
              >
                <span className="text-xs font-medium uppercase tracking-wide text-primary">
                  {post.category}
                </span>
                <h2 className="mt-2 text-lg font-semibold leading-snug text-foreground group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {post.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <span aria-hidden>·</span>
                  <span>{post.readTime}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
