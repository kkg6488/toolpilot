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
    slug: "qr-code-uses-and-how-to-create",
    title: "QR Code Uses and How to Create One for Free",
    description:
      "What QR codes are, static vs dynamic types, everyday uses, design best practices, and how to generate and test codes with ToolPilot.",
    date: "2026-04-11",
    readTime: "6 min read",
    category: "Tools",
  },
  {
    slug: "cron-expressions-explained",
    title: "Cron Expressions Explained: A Complete Guide to Scheduling Jobs",
    description:
      "Cron basics, the five-field format, special characters, common patterns, CI/CD scheduling, timezones, and testing expressions safely.",
    date: "2026-04-10",
    readTime: "8 min read",
    category: "Developer",
  },
  {
    slug: "mortgage-vs-rent-calculator-comparison",
    title: "Mortgage vs Rent: How to Decide Using a Calculator",
    description:
      "Pros and cons of buying vs renting, opportunity cost of a down payment, total mortgage cost, break-even analysis, and 2026 market conditions.",
    date: "2026-04-09",
    readTime: "8 min read",
    category: "Finance",
  },
  {
    slug: "unit-conversion-guide",
    title: "Complete Unit Conversion Guide: Length, Weight, Temperature & More",
    description:
      "Formulas for length, weight, temperature, and volume; metric vs imperial; mental shortcuts; precision; and quick reference tables.",
    date: "2026-04-08",
    readTime: "8 min read",
    category: "Math",
  },
  {
    slug: "how-ppf-interest-is-calculated",
    title: "How PPF Interest is Calculated — Monthly Balance Method Explained",
    description:
      "PPF interest calculation using the monthly balance method, why depositing before the 5th matters, 15-year maturity, and EEE tax benefits.",
    date: "2026-04-07",
    readTime: "7 min read",
    category: "Finance",
  },
  {
    slug: "password-security-tips-2026",
    title:
      "Password Security Tips: How to Create and Manage Strong Passwords in 2026",
    description:
      "Why weak passwords fail, strong password anatomy, password managers, 2FA, common mistakes, breach checks, and passkeys.",
    date: "2026-04-06",
    readTime: "7 min read",
    category: "Security",
  },
  {
    slug: "gst-calculation-guide-india",
    title: "GST Calculation Guide: How to Add and Remove GST in India",
    description:
      "The four GST slabs, add/remove formulas, CGST/SGST vs IGST, worked examples for every slab, and common calculation mistakes.",
    date: "2026-04-05",
    readTime: "6 min read",
    category: "Tax",
  },
  {
    slug: "how-to-use-regex-beginners-guide",
    title: "How to Use Regex: A Beginner's Guide with Examples",
    description:
      "Regex fundamentals — character classes, quantifiers, anchors, groups, common patterns for email and URLs, flags, and testing tips.",
    date: "2026-04-04",
    readTime: "9 min read",
    category: "Developer",
  },
  {
    slug: "fd-vs-rd-which-is-better",
    title: "FD vs RD: Which Fixed-Income Investment is Better in 2026?",
    description:
      "Compare Fixed Deposits and Recurring Deposits on returns, flexibility, TDS, premature withdrawal, and ideal use cases.",
    date: "2026-04-03",
    readTime: "6 min read",
    category: "Investing",
  },
  {
    slug: "json-formatting-best-practices",
    title: "JSON Formatting Best Practices for Developers",
    description:
      "Why consistent JSON formatting matters, indent choices, minification, common syntax errors, JSON vs YAML, and CI/CD automation tips.",
    date: "2026-04-02",
    readTime: "6 min read",
    category: "Developer",
  },
  {
    slug: "how-to-calculate-compound-interest",
    title: "How to Calculate Compound Interest — Formula, Examples & Calculator",
    description:
      "The compound interest formula, daily to annual compounding, a worked example in INR, the Rule of 72, and when to use a calculator.",
    date: "2026-04-01",
    readTime: "7 min read",
    category: "Finance",
  },
  {
    slug: "how-to-calculate-roi",
    title: "How to Calculate ROI — Formula, Examples & Common Pitfalls",
    description:
      "ROI formula, annualized ROI, real-world examples in stocks and real estate, ROI vs CAGR, and common pitfalls to avoid.",
    date: "2026-03-30",
    readTime: "6 min read",
    category: "Finance",
  },
  {
    slug: "calorie-deficit-explained",
    title: "Calorie Deficit Explained: How to Calculate for Weight Loss",
    description:
      "What a calorie deficit is, BMR vs TDEE, the Mifflin-St Jeor equation, safe deficit ranges, macros, and tracking tips.",
    date: "2026-03-28",
    readTime: "8 min read",
    category: "Health",
  },
  {
    slug: "what-is-bmi-and-how-to-calculate",
    title: "What is BMI and How to Calculate It — Formula, Chart & Limitations",
    description:
      "BMI definition, formula, WHO categories, a quick reference chart, limitations for athletes, and when to check body fat instead.",
    date: "2026-03-25",
    readTime: "7 min read",
    category: "Health",
  },
  {
    slug: "how-to-calculate-body-fat-percentage",
    title:
      "How to Calculate Body Fat Percentage — Methods, Formulas & Healthy Ranges",
    description:
      "US Navy and other methods, healthy ranges, body fat vs BMI, and how to measure composition consistently at home.",
    date: "2026-03-22",
    readTime: "7 min read",
    category: "Health",
  },
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
      "A curated look at essential free utilities for formatting, security, scheduling, and content — including ToolPilot's own tools.",
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
          math, and developer workflows — written to pair with ToolPilot&apos;s free
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
