import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Braces,
  Calculator,
  CheckCircle2,
  Clock,
  Globe,
  IndianRupee,
  Lock,
  Palette,
  Regex,
  Smartphone,
  Sparkles,
  TrendingUp,
  Wrench,
  Zap,
} from "lucide-react";

import { buttonVariants } from "@/lib/button-variants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "ToolPilot — Free Online Calculators & Developer Tools",
  description:
    "ToolPilot offers 20+ free online calculators and developer tools: EMI, SIP, income tax, FD, RD, GST, CGPA to percentage, calorie, body fat, JSON formatter, Base64, UUID generator, and more. No sign-up, mobile-friendly, runs in your browser.",
  alternates: { canonical: "https://tool-pilot.in" },
  openGraph: {
    title: "ToolPilot — Free Online Calculators & Developer Tools",
    description:
      "Financial calculators and dev utilities in one place—fast, free, and easy to use.",
    url: "https://tool-pilot.in",
    siteName: "ToolPilot",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://tool-pilot.in/#organization",
      name: "ToolPilot",
      url: "https://tool-pilot.in",
      description:
        "ToolPilot publishes free online calculators and browser-based developer tools.",
    },
    {
      "@type": "WebSite",
      "@id": "https://tool-pilot.in/#website",
      name: "ToolPilot",
      url: "https://tool-pilot.in",
      inLanguage: "en",
      publisher: { "@id": "https://tool-pilot.in/#organization" },
    },
  ],
};

const featured = [
  {
    href: "/calculators/sip-calculator",
    name: "SIP Calculator",
    description: "Project mutual fund SIP growth with returns and tenure.",
    Icon: TrendingUp,
    color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-500/10",
  },
  {
    href: "/calculators/emi-calculator",
    name: "EMI Calculator",
    description: "Instantly calculate loan EMI, interest, and total payoff.",
    Icon: IndianRupee,
    color: "from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400",
    iconBg: "bg-blue-500/10",
  },
  {
    href: "/tools/json-formatter",
    name: "JSON Formatter",
    description: "Validate, prettify, and minify JSON data instantly.",
    Icon: Braces,
    color: "from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400",
    iconBg: "bg-amber-500/10",
  },
  {
    href: "/calculators/gst-calculator",
    name: "GST Calculator",
    description: "Add or remove GST for Indian invoices in one click.",
    Icon: Calculator,
    color: "from-violet-500/10 to-purple-500/10 text-violet-600 dark:text-violet-400",
    iconBg: "bg-violet-500/10",
  },
  {
    href: "/tools/regex-tester",
    name: "Regex Tester",
    description: "Test regex patterns with live highlighting and match groups.",
    Icon: Regex,
    color: "from-rose-500/10 to-pink-500/10 text-rose-600 dark:text-rose-400",
    iconBg: "bg-rose-500/10",
  },
  {
    href: "/tools/color-palette-generator",
    name: "Color Palettes",
    description: "Generate harmonious color schemes with one click.",
    Icon: Palette,
    color: "from-cyan-500/10 to-sky-500/10 text-cyan-600 dark:text-cyan-400",
    iconBg: "bg-cyan-500/10",
  },
];

const stats = [
  { label: "1,400+ Free Pages", Icon: Sparkles, detail: "Calculators, converters & more" },
  { label: "No Sign-up", Icon: Lock, detail: "Use instantly, no account needed" },
  { label: "Lightning Fast", Icon: Zap, detail: "Runs 100% in your browser" },
  { label: "Mobile Friendly", Icon: Smartphone, detail: "Works on any device" },
];

const allCalculators = [
  { name: "EMI", href: "/calculators/emi-calculator" },
  { name: "SIP", href: "/calculators/sip-calculator" },
  { name: "Income Tax", href: "/calculators/income-tax-calculator" },
  { name: "FD", href: "/calculators/fd-calculator" },
  { name: "RD", href: "/calculators/rd-calculator" },
  { name: "GST", href: "/calculators/gst-calculator" },
  { name: "Loan", href: "/calculators/loan-calculator" },
  { name: "Discount", href: "/calculators/discount-calculator" },
  { name: "PPF", href: "/calculators/ppf-calculator" },
  { name: "HRA", href: "/calculators/hra-calculator" },
  { name: "Mortgage", href: "/calculators/mortgage-calculator" },
  { name: "BMI", href: "/calculators/bmi-calculator" },
  { name: "Calorie", href: "/calculators/calorie-calculator" },
  { name: "Body Fat", href: "/calculators/body-fat-calculator" },
  { name: "CGPA to %", href: "/calculators/cgpa-to-percentage-calculator" },
  { name: "Date", href: "/calculators/date-calculator" },
  { name: "ROI", href: "/calculators/roi-calculator" },
  { name: "Salary", href: "/calculators/salary-calculator" },
  { name: "Age", href: "/calculators/age-calculator" },
  { name: "Percentage", href: "/calculators/percentage-calculator" },
];

const allTools = [
  { name: "JSON Formatter", href: "/tools/json-formatter" },
  { name: "Base64 Encode/Decode", href: "/tools/base64-encoder-decoder" },
  { name: "UUID Generator", href: "/tools/uuid-generator" },
  { name: "Hash Generator", href: "/tools/hash-generator" },
  { name: "Timestamp Converter", href: "/tools/timestamp-converter" },
  { name: "Lorem Ipsum", href: "/tools/lorem-ipsum-generator" },
  { name: "Color Palette", href: "/tools/color-palette-generator" },
  { name: "Regex Tester", href: "/tools/regex-tester" },
  { name: "Cron Builder", href: "/tools/cron-expression-builder" },
  { name: "Word Counter", href: "/tools/word-counter" },
  { name: "Password Generator", href: "/tools/password-generator" },
  { name: "QR Code Generator", href: "/tools/qr-code-generator" },
  { name: "Unit Converter", href: "/convert" },
  { name: "Percentage Calc", href: "/percentage" },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-primary/[0.02] to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/[0.08] rounded-full blur-3xl" />
          <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-violet-400/10 rounded-full blur-3xl" />
          <div className="absolute top-40 left-0 w-[200px] h-[200px] bg-blue-400/10 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              1,400+ free tools & converters — no sign-up required
            </div>

            <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Free Online{" "}
              <span className="bg-gradient-to-r from-primary via-violet-500 to-purple-600 bg-clip-text text-transparent">
                Calculators
              </span>
              {" & "}
              <span className="bg-gradient-to-r from-primary via-violet-500 to-purple-600 bg-clip-text text-transparent">
                Developer Tools
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
              Plan loans, project investments, format JSON, test regex, generate
              color palettes — all in your browser, instantly.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/calculators"
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-primary px-10 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98] w-full sm:w-auto"
              >
                Browse Calculators
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center justify-center gap-3 rounded-2xl border-2 border-primary/30 bg-white/80 px-10 py-4 text-base font-semibold text-foreground shadow-sm transition-all duration-200 hover:border-primary/50 hover:bg-primary/5 hover:shadow-md active:scale-[0.98] dark:bg-background/80 w-full sm:w-auto"
              >
                <Wrench className="h-5 w-5 text-primary" />
                Developer Tools
              </Link>
            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                100% Free
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="h-4 w-4 text-blue-500" />
                Works Offline
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-amber-500" />
                Instant Results
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border/50 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map(({ label, Icon, detail }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Most Popular Tools
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Jump into our most-used calculators and utilities.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map(({ href, name, description, Icon, color, iconBg }) => (
            <Link
              key={href}
              href={href}
              className="group relative flex flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/30"
            >
              <div className={cn("mb-4 flex h-12 w-12 items-center justify-center rounded-xl", iconBg)}>
                <Icon className={cn("h-6 w-6", color.split(" ").slice(2).join(" "))} />
              </div>
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                {name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-primary opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                Open tool <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Category Blocks */}
      <section className="bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Financial Calculators */}
            <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 text-emerald-600">
                <Calculator className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-2xl font-bold">Financial Calculators</h2>
              <p className="mt-3 text-muted-foreground">
                EMI, SIP, GST, PPF, HRA for India. Mortgage, compound interest, tips for global use.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {allCalculators.map((calc) => (
                  <Link
                    key={calc.href}
                    href={calc.href}
                    className="rounded-lg border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                  >
                    {calc.name}
                  </Link>
                ))}
              </div>
              <Link
                href="/calculators"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all duration-200 hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
              >
                View All Calculators
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Developer Tools */}
            <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 text-violet-600">
                <Wrench className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-2xl font-bold">Developer Tools</h2>
              <p className="mt-3 text-muted-foreground">
                JSON formatting, regex testing, palette generation, cron scheduling, and policy drafting.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {allTools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="rounded-lg border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
              <Link
                href="/tools"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all duration-200 hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
              >
                View All Tools
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border/60 bg-gradient-to-br from-primary/[0.03] to-violet-500/[0.03] p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold">Why people use ToolPilot</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            ToolPilot is a collection of free, fast online calculators and
            developer tools. Whether you&apos;re comparing loan EMIs, checking SIP projections,
            formatting API payloads, or testing regular expressions — every tool runs
            entirely in your browser with zero latency. No accounts, no paywalls, no
            data sent to servers. Just tools you can open, use, and close.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/calculators"
              className={cn(buttonVariants({ size: "lg" }), "gap-2")}
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
