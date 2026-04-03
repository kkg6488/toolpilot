import type { Metadata } from "next";
import Link from "next/link";

const canonical = "https://tool-pilot.in/blog/how-to-calculate-percentage";
const title = "How to Calculate Percentage: 5 Methods Explained | ToolPilot";
const description =
  "Master five practical ways to calculate percentages: basic ratios, change, part-of-whole, reverse, and successive changes — with examples and tool links.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: {
    title: "How to Calculate Percentage: 5 Methods Explained",
    description,
    url: canonical,
    type: "article",
  },
};

const published = "2026-02-28";

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Calculate Percentage: 5 Methods Explained",
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

export default function HowToCalculatePercentagePost() {
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
            <li className="font-medium text-foreground">
              How to Calculate Percentage
            </li>
          </ol>
        </nav>

        <header className="mt-8">
          <p className="text-sm font-medium text-primary">Math</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How to Calculate Percentage: 5 Methods Explained
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            <time dateTime={published}>February 28, 2026</time>
            <span className="mx-2">·</span>6 min read
          </p>
        </header>

        <div className="mt-10 space-y-4 text-base leading-relaxed [&>h2]:mt-10 [&>h2]:scroll-mt-20 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-foreground [&>ul]:my-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:text-muted-foreground [&>ol]:my-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:text-muted-foreground [&>p]:text-muted-foreground [&>p:first-of-type]:text-foreground">
          <p>
            Percentages express a number as parts per hundred. They show up in
            discounts, grades, tax rates, growth metrics, and data dashboards.
            Below are five methods you can reuse almost anywhere — each answers
            a slightly different question.
          </p>

          <h2>1. Basic &quot;what percent is A of B?&quot;</h2>
          <p>
            Divide the part by the whole, then multiply by 100. Example: if you
            scored 42 marks out of 50, your percentage is (42 ÷ 50) × 100 = 84%.
            Guard against dividing by zero when the whole is zero or missing.
          </p>

          <h2>2. Percentage change (before → after)</h2>
          <p>
            Use ((new − old) ÷ old) × 100. If a shirt’s price rises from ₹800 to
            ₹920, the change is (120 ÷ 800) × 100 = 15% increase. A negative
            result means a decrease. This is the standard way to report month
            over month or year over year movement.
          </p>

          <h2>3. Finding the part from a percent of a whole</h2>
          <p>
            Multiply the whole by (percent ÷ 100). Example: 12.5% of 240 is 240
            × 0.125 = 30. This is how you compute GST components, tips, or
            commission when the rate is known.
          </p>

          <h2>4. Reverse percentage (&quot;30 is 15% of what?&quot;)</h2>
          <p>
            Rearrange: whole = part ÷ (percent ÷ 100). If 30 is 15% of an
            unknown total, total = 30 ÷ 0.15 = 200. Handy when you only know the
            discounted price and the discount rate and need the original MRP.
          </p>

          <h2>5. Successive percentage changes</h2>
          <p>
            Apply multipliers in sequence rather than adding percentages blindly.
            A 10% increase followed by a 10% decrease is{" "}
            <strong className="text-foreground">not</strong> a return to the
            start: 1.10 × 0.90 = 0.99, i.e. a net 1% drop. Compound interest
            and repeated fees work the same way — chaining factors keeps you
            aligned with reality.
          </p>

          <h2>Everyday use cases</h2>
          <ul>
            <li>Shopping: compare discount vs cashback as effective percent off.</li>
            <li>Work: interpret conversion rates and error rates from counts.</li>
            <li>Health and fitness: body-fat or macro targets often use ratios.</li>
            <li>Finance: returns, fees, and allocation weights are percentage-based.</li>
          </ul>

          <h2>Let tools handle repetition</h2>
          <p>
            Once the method is clear, calculators save time when you swap
            numbers often. ToolPilot offers a dedicated percentage calculator
            plus hundreds of pre-built percentage conversions on the percentage
            hub for common “X% of Y” and related queries.
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
                href="/calculators/percentage-calculator"
                className="text-primary hover:underline"
              >
                Percentage Calculator
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — quick percent-of, change, and ratio style calculations.
              </span>
            </li>
            <li>
              <Link href="/percentage" className="text-primary hover:underline">
                Percentage hub
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — browse ready-made percentage pages and conversions.
              </span>
            </li>
            <li>
              <Link
                href="/calculators/cgpa-to-percentage-calculator"
                className="text-primary hover:underline"
              >
                CGPA to Percentage Calculator
              </Link>
            </li>
          </ul>
        </section>
      </article>
    </>
  );
}
