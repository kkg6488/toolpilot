import type { Metadata } from "next";
import Link from "next/link";

const canonical =
  "https://tool-pilot.in/blog/how-to-calculate-compound-interest";
const title =
  "How to Calculate Compound Interest — Formula, Examples & Calculator | ToolPilot";
const description =
  "Master the compound interest formula A = P(1+r/n)^(nt), compare daily, monthly, quarterly, and annual compounding, and learn when to verify with ToolPilot’s compound interest calculator.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: {
    title:
      "How to Calculate Compound Interest — Formula, Examples & Calculator",
    description,
    url: canonical,
    type: "article",
  },
};

const published = "2026-04-01";

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "How to Calculate Compound Interest — Formula, Examples & Calculator",
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

export default function HowToCalculateCompoundInterestPost() {
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
            <li className="text-foreground font-medium">
              How to Calculate Compound Interest
            </li>
          </ol>
        </nav>

        <header className="mt-8">
          <p className="text-sm font-medium text-primary">Finance</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How to Calculate Compound Interest — Formula, Examples &amp;
            Calculator
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            <time dateTime={published}>April 1, 2026</time>
            <span className="mx-2">·</span>7 min read
          </p>
        </header>

        <div className="mt-10 space-y-4 text-base leading-relaxed [&>h2]:mt-10 [&>h2]:scroll-mt-20 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-foreground [&>ul]:my-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:text-muted-foreground [&>ol]:my-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:text-muted-foreground [&>p]:text-muted-foreground [&>p:first-of-type]:text-foreground">
          <p>
            <strong className="text-foreground">Compound interest</strong> is
            interest earned on both your original principal and on interest that
            has already been credited. Unlike simple interest, which grows in a
            straight line, compound interest accelerates over time because each
            period&apos;s return applies to a larger balance. Banks, mutual
            funds, and fixed-income products all use variants of the same
            mathematical idea — which is why learning how to calculate compound
            interest helps you compare savings, FDs, and long-term investments on
            a like-for-like basis.
          </p>

          <h2>The compound interest formula</h2>
          <p>
            The standard formula for the future value of a lump sum with
            periodic compounding is:
          </p>
          <p className="rounded-md border border-border bg-muted/50 px-4 py-3 font-mono text-sm text-foreground">
            A = P(1 + r/n)<sup>nt</sup>
          </p>
          <p>
            Here, <strong className="text-foreground">A</strong> is the amount
            after time <strong className="text-foreground">t</strong>,{" "}
            <strong className="text-foreground">P</strong> is the principal,{" "}
            <strong className="text-foreground">r</strong> is the annual
            nominal rate expressed as a decimal (for example, 8% → 0.08),{" "}
            <strong className="text-foreground">n</strong> is how many times
            interest compounds per year, and{" "}
            <strong className="text-foreground">t</strong> is the number of
            years. Total compound interest earned is simply{" "}
            <em>A − P</em>. This form is ideal for comparing{" "}
            <Link
              href="/calculators/compound-interest-calculator"
              className="text-primary hover:underline"
            >
              compound interest calculator
            </Link>{" "}
            outputs with your own scratch work.
          </p>

          <h2>Daily, monthly, quarterly, and annual compounding</h2>
          <p>
            The exponent <strong className="text-foreground">nt</strong> counts
            total compounding periods: for monthly compounding over 5 years,{" "}
            <em>n = 12</em> and <em>t = 5</em>, so <em>nt = 60</em>. More
            frequent compounding (daily vs quarterly) increases the effective
            yield slightly when the quoted annual rate is the same, because
            interest is credited sooner and begins earning its own return.
          </p>
          <ul>
            <li>
              <strong className="text-foreground">Annual:</strong>{" "}
              <em>n = 1</em> — one compounding event per year; easiest for mental
              math but often understates what you get when banks compound more
              often.
            </li>
            <li>
              <strong className="text-foreground">Quarterly:</strong>{" "}
              <em>n = 4</em> — common on many retail fixed deposits in India.
            </li>
            <li>
              <strong className="text-foreground">Monthly:</strong>{" "}
              <em>n = 12</em> — typical for savings accounts and some debt
              instruments.
            </li>
            <li>
              <strong className="text-foreground">Daily:</strong>{" "}
              <em>n = 365</em> (or 360 in some conventions) — small incremental
              gain versus monthly for the same nominal rate, but worth modeling
              if you are optimizing cash balances.
            </li>
          </ul>
          <p>
            Always confirm whether the rate you see is{" "}
            <strong className="text-foreground">nominal</strong> or{" "}
            <strong className="text-foreground">effective annual</strong>; the
            formula above assumes <em>r</em> is the nominal rate per year with{" "}
            <em>n</em> compounding periods per year.
          </p>

          <h2>Step-by-step example: ₹1,00,000 at 8% for 5 years</h2>
          <p>
            Suppose you invest <strong className="text-foreground">₹1,00,000</strong>{" "}
            at <strong className="text-foreground">8% per annum</strong> for{" "}
            <strong className="text-foreground">5 years</strong>, with interest
            compounded <strong className="text-foreground">annually</strong>. Then{" "}
            <em>P = 100000</em>, <em>r = 0.08</em>, <em>n = 1</em>,{" "}
            <em>t = 5</em>, so <em>nt = 5</em>.
          </p>
          <ol>
            <li>
              Compute the growth factor: (1 + r/n) = 1 + 0.08 ={" "}
              <strong className="text-foreground">1.08</strong>.
            </li>
            <li>
              Raise it to the fifth power: 1.08<sup>5</sup> ≈{" "}
              <strong className="text-foreground">1.4693</strong>.
            </li>
            <li>
              Multiply by principal: A ≈ 100000 × 1.4693 ≈{" "}
              <strong className="text-foreground">₹1,46,930</strong> (rounded).
            </li>
            <li>
              Compound interest ≈ A − P ≈{" "}
              <strong className="text-foreground">₹46,930</strong>.
            </li>
          </ol>
          <p>
            If the same 8% were compounded monthly instead, you would use{" "}
            <em>n = 12</em>, <em>r/n = 0.08/12</em>, and{" "}
            <em>nt = 60</em>; the ending balance would be slightly higher than
            the annual case. Running both scenarios in a{" "}
            <Link
              href="/calculators/compound-interest-calculator"
              className="text-primary hover:underline"
            >
              compound interest calculator
            </Link>{" "}
            avoids hand errors on large exponents.
          </p>

          <h2>The Rule of 72</h2>
          <p>
            The <strong className="text-foreground">Rule of 72</strong> is a
            quick approximation: divide 72 by the annual percentage rate (not
            expressed as a decimal) to estimate how many years it takes money to
            roughly double at compound growth. At 8%, 72 ÷ 8 ≈ 9 years — close
            to the true doubling time for continuous or frequent compounding.
          </p>
          <p>
            The rule is a teaching shortcut, not a substitute for exact formulas
            when you need rupee-level accuracy for loans, tax, or regulatory
            disclosures. It shines in conversations about long-term SIPs and
            retirement, where intuition matters as much as the last rupee.
          </p>

          <h2>Real-world scenarios</h2>
          <p>
            <strong className="text-foreground">Fixed deposits</strong> often
            quote annual rates but compound quarterly; your maturity value
            reflects that schedule.{" "}
            <Link href="/calculators/fd-calculator" className="text-primary hover:underline">
              FD calculators
            </Link>{" "}
            encode bank-style assumptions so you do not have to look up{" "}
            <em>n</em> every time.
          </p>
          <p>
            <strong className="text-foreground">Mutual fund SIPs</strong> add
            monthly contributions; the lump-sum formula extends to series, but
            spreadsheets or a{" "}
            <Link href="/calculators/sip-calculator" className="text-primary hover:underline">
              SIP calculator
            </Link>{" "}
            handle varying cash flows and growth rates more cleanly.
          </p>
          <p>
            <strong className="text-foreground">Inflation</strong> is compound
            erosion of purchasing power — the same mathematics in reverse when
            you plan real (inflation-adjusted) goals.
          </p>

          <h2>When to use a compound interest calculator</h2>
          <p>
            Manual calculation builds understanding, but changing rate, tenure,
            or compounding frequency repeatedly is tedious and error-prone.
            After you have verified one scenario by hand, use ToolPilot&apos;s{" "}
            <Link
              href="/calculators/compound-interest-calculator"
              className="text-primary hover:underline"
            >
              Compound Interest Calculator
            </Link>{" "}
            to stress-test goals, compare FD versus market return assumptions,
            and share consistent numbers with family or advisors.
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
                href="/calculators/compound-interest-calculator"
                className="text-primary hover:underline"
              >
                Compound Interest Calculator
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — future value, interest earned, and compounding frequency in one
                place.
              </span>
            </li>
            <li>
              <Link
                href="/calculators/fd-calculator"
                className="text-primary hover:underline"
              >
                FD Calculator
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — maturity amount for fixed deposits with typical bank
                conventions.
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
                — project wealth from regular monthly investments.
              </span>
            </li>
          </ul>
        </section>
      </article>
    </>
  );
}
