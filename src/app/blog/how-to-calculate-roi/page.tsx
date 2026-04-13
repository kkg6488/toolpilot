import type { Metadata } from "next";
import Link from "next/link";

const canonical = "https://tool-pilot.in/blog/how-to-calculate-roi";
const title =
  "How to Calculate ROI — Formula, Examples & Common Pitfalls | ToolPilot";
const description =
  "Master return on investment: the basic ROI formula, annualized ROI, real examples, how ROI compares to CAGR, and what ROI leaves out when you compare options.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: {
    title: "How to Calculate ROI — Formula, Examples & Common Pitfalls",
    description,
    url: canonical,
    type: "article",
  },
};

const published = "2026-03-30";

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Calculate ROI — Formula, Examples & Common Pitfalls",
  description,
  datePublished: published,
  dateModified: published,
  author: {
    "@type": "Organization",
    name: "ToolPilot",
    url: "https://tool-pilot.in",
  },
  publisher: {
    "@type": "Organization",
    name: "ToolPilot",
    url: "https://tool-pilot.in",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": canonical,
  },
};

export default function HowToCalculateRoiPost() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />
      <article className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <nav
          aria-label="Breadcrumb"
          className="text-sm text-muted-foreground"
        >
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-foreground hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link
                href="/blog"
                className="hover:text-foreground hover:underline"
              >
                Blog
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-foreground font-medium">How to Calculate ROI</li>
          </ol>
        </nav>

        <header className="mt-8">
          <p className="text-sm font-medium text-primary">Finance</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How to Calculate ROI — Formula, Examples &amp; Common Pitfalls
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            <time dateTime={published}>March 30, 2026</time>
            <span className="mx-2">·</span>6 min read
          </p>
        </header>

        <div className="mt-10 space-y-4 text-base leading-relaxed [&>h2]:mt-10 [&>h2]:scroll-mt-20 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-foreground [&>ul]:my-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:text-muted-foreground [&>ol]:my-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:text-muted-foreground [&>p]:text-muted-foreground [&>p:first-of-type]:text-foreground">
          <p>
            Return on investment (ROI) answers a straightforward question: for
            every unit of money you put in, how much did you get back — net of
            what you spent? It is one of the most quoted figures in investing,
            marketing, and business cases because it compresses performance into
            a single percentage you can compare across ideas, as long as you
            remember what it ignores.
          </p>

          <h2>The basic ROI formula</h2>
          <p>
            Simple ROI compares net gain to original cost:
          </p>
          <p className="rounded-md border border-border bg-muted/50 px-4 py-3 font-mono text-sm text-foreground">
            ROI (%) = ((gain − cost) ÷ cost) × 100
          </p>
          <p>
            Here <strong className="text-foreground">cost</strong> is your total
            outlay (purchase price, fees, renovations — whatever you include in
            the definition), and <strong className="text-foreground">gain</strong>{" "}
            is the ending value (or proceeds) minus that cost, depending on how
            you phrase it. Some writers use{" "}
            <strong className="text-foreground">
              (final value − initial cost) ÷ initial cost × 100
            </strong>
            — algebraically the same if you are consistent. Always state whether
            fees and taxes are inside &quot;cost&quot; so comparisons stay fair.
          </p>
          <p>
            ToolPilot&apos;s{" "}
            <Link
              href="/calculators/roi-calculator"
              className="text-primary hover:underline"
            >
              ROI Calculator
            </Link>{" "}
            helps you run the arithmetic when amounts or holding periods change
            often.
          </p>

          <h2>Annualized ROI: putting time on the clock</h2>
          <p>
            Raw ROI does not care whether you earned 20% in one year or ten.
            <strong className="text-foreground"> Annualized ROI</strong> (or a
            related annualized return) scales the result to a per-year rate so
            you can weigh short flips against long holds. Exact annualization
            formulas vary — some use geometric compounding, others simple
            division by years for rough sketches. For precise multi-year growth
            with reinvestment, investors often pair ROI thinking with CAGR (see
            below) rather than a single naive annualized figure.
          </p>

          <h2>Worked examples: stocks, real estate, and a small business</h2>
          <p>
            <strong className="text-foreground">Stock investment:</strong> You
            buy shares for ₹50,000, pay ₹200 in charges, and sell later for
            ₹58,000. Cost basis might be ₹50,200; net gain ₹7,800. ROI ≈ (7,800
            ÷ 50,200) × 100 ≈ 15.5%. Dividends received before sale belong in
            gain if your definition is total return.
          </p>
          <p>
            <strong className="text-foreground">Real estate:</strong> Include
            down payment, closing costs, and major repairs in cost; include sale
            price net of selling fees in proceeds. Omit mortgage interest only
            if you deliberately measure equity-only ROI — otherwise be explicit.
          </p>
          <p>
            <strong className="text-foreground">Business project:</strong> Sum
            software, inventory, and labour spent to launch; compare to profit
            attributable to that project over your chosen window. ROI here is
            only as good as how cleanly you allocate revenue and costs.
          </p>

          <h2>ROI vs CAGR</h2>
          <p>
            <strong className="text-foreground">ROI</strong> often describes
            total return on one round trip or a fixed period without specifying
            compounding.{" "}
            <strong className="text-foreground">
              Compound Annual Growth Rate (CAGR)
            </strong>{" "}
            is the constant yearly rate that would take a starting value to an
            ending value over n years, assuming profits reinvest. CAGR is ideal
            for comparing long-horizon investments on equal footing; simple ROI
            percentage can mislead if one deal lasted six months and another five
            years. For savings that compound periodically, a{" "}
            <Link
              href="/calculators/compound-interest-calculator"
              className="text-primary hover:underline"
            >
              compound interest calculator
            </Link>{" "}
            shows ending balances that feed back into ROI-style thinking.
          </p>

          <h2>Limitations: time value of money and risk</h2>
          <ul>
            <li>
              <strong className="text-foreground">Time value of money:</strong>{" "}
              A 10% ROI in one year beats 10% over ten years, but raw ROI may not
              show that unless you annualize or discount cash flows.
            </li>
            <li>
              <strong className="text-foreground">Risk and volatility:</strong>{" "}
              Two investments with identical ROI can have wildly different draw
              downs; ROI is silent on sleepless nights.
            </li>
            <li>
              <strong className="text-foreground">Cash flow timing:</strong>{" "}
              Projects with early losses and late gains can share headline ROI
              with smoother alternatives while feeling very different to
              liquidity.
            </li>
          </ul>

          <h2>How to compare investments fairly</h2>
          <p>
            Align the <strong className="text-foreground">time horizon</strong>,{" "}
            <strong className="text-foreground">tax treatment</strong>, and{" "}
            <strong className="text-foreground">fee inclusion</strong> before
            ranking by ROI. Add context with annualized metrics, maximum loss,
            and how the investment fits your goals. For recurring monthly
            investments, also look at{" "}
            <Link
              href="/calculators/sip-calculator"
              className="text-primary hover:underline"
            >
              SIP-style projections
            </Link>{" "}
            because rupee-cost averaging changes path-dependent outcomes that a
            single lump-sum ROI snapshot cannot capture.
          </p>
        </div>

        <section
          aria-labelledby="related-heading"
          className="mt-14 rounded-lg border border-border bg-card p-6"
        >
          <h2
            id="related-heading"
            className="text-lg font-semibold text-foreground"
          >
            Related
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                href="/calculators/roi-calculator"
                className="text-primary hover:underline"
              >
                ROI Calculator
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — compute return on investment from cost and gain.
              </span>
            </li>
            <li>
              <Link
                href="/calculators/compound-interest-calculator"
                className="text-primary hover:underline"
              >
                Compound Interest Calculator
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — project growth with compounding over time.
              </span>
            </li>
            <li>
              <Link
                href="/calculators/sip-calculator"
                className="text-primary hover:underline"
              >
                SIP Calculator
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — model systematic investment plan outcomes.
              </span>
            </li>
          </ul>
        </section>
      </article>
    </>
  );
}
