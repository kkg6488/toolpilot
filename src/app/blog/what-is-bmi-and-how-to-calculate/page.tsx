import type { Metadata } from "next";
import Link from "next/link";

const canonical = "https://tool-pilot.in/blog/what-is-bmi-and-how-to-calculate";
const title =
  "What is BMI and How to Calculate It — Formula, Chart & Limitations | ToolPilot";
const description =
  "Learn what Body Mass Index (BMI) measures, the metric and imperial formulas, WHO categories, how to read a height–weight chart, and when BMI is misleading.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: {
    title:
      "What is BMI and How to Calculate It — Formula, Chart & Limitations",
    description,
    url: canonical,
    type: "article",
  },
};

const published = "2026-03-25";

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "What is BMI and How to Calculate It — Formula, Chart & Limitations",
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

export default function WhatIsBmiAndHowToCalculatePost() {
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
            <li className="text-foreground font-medium">What Is BMI</li>
          </ol>
        </nav>

        <header className="mt-8">
          <p className="text-sm font-medium text-primary">Health</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What is BMI and How to Calculate It — Formula, Chart &amp;
            Limitations
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            <time dateTime={published}>March 25, 2026</time>
            <span className="mx-2">·</span>7 min read
          </p>
        </header>

        <div className="mt-10 space-y-4 text-base leading-relaxed [&>h2]:mt-10 [&>h2]:scroll-mt-20 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-foreground [&>ul]:my-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:text-muted-foreground [&>ol]:my-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:text-muted-foreground [&>p]:text-muted-foreground [&>p:first-of-type]:text-foreground">
          <p>
            Body Mass Index (BMI) is a simple number derived from your weight and
            height. It is widely used in clinics and public health as a quick
            screening tool for weight categories — not as a diagnosis on its
            own, but as a starting point for conversation about nutrition,
            activity, and overall health risks tied to body weight.
          </p>

          <h2>What BMI measures (and what it does not)</h2>
          <p>
            BMI estimates whether your weight is high or low relative to your
            height. It does{" "}
            <strong className="text-foreground">not</strong> directly measure
            body fat, bone density, or where fat sits on your body. Two people
            with the same BMI can look very different: one might carry more
            muscle, the other more fat. That is why doctors pair BMI with other
            checks — waist circumference, blood pressure, blood tests, and your
            history — when assessing health.
          </p>

          <h2>The BMI formula: metric and imperial</h2>
          <p>
            In metric units (kilograms and metres), BMI is weight divided by
            height squared:
          </p>
          <p className="rounded-md border border-border bg-muted/50 px-4 py-3 font-mono text-sm text-foreground">
            BMI = weight (kg) ÷ height (m)<sup>2</sup>
          </p>
          <p>
            If you use pounds and inches, the standard conversion is:
          </p>
          <p className="rounded-md border border-border bg-muted/50 px-4 py-3 font-mono text-sm text-foreground">
            BMI = (weight (lb) ÷ height (in)<sup>2</sup>) × 703
          </p>
          <p>
            Always use consistent units: convert height to metres (or inches)
            and weight to kg (or lb) before plugging in. A{" "}
            <Link
              href="/calculators/bmi-calculator"
              className="text-primary hover:underline"
            >
              BMI calculator
            </Link>{" "}
            avoids rounding mistakes when you switch between systems.
          </p>

          <h2>WHO adult categories: underweight to obese</h2>
          <p>
            For adults, the World Health Organization groups BMI into broad
            bands used in many countries (exact cutoffs can vary slightly by
            guideline):
          </p>
          <ul>
            <li>
              <strong className="text-foreground">Underweight:</strong> BMI
              below 18.5
            </li>
            <li>
              <strong className="text-foreground">Normal range:</strong> 18.5 to
              24.9
            </li>
            <li>
              <strong className="text-foreground">Overweight:</strong> 25 to 29.9
            </li>
            <li>
              <strong className="text-foreground">Obese (Class I):</strong> 30 to
              34.9
            </li>
            <li>
              Higher classes continue above 35 and 40 with increasing health
              risk discussions in clinical settings.
            </li>
          </ul>
          <p>
            These thresholds are population-level guides. Your doctor may
            interpret them differently if you are pregnant, very muscular, or
            managing a chronic condition.
          </p>

          <h2>Reading a BMI chart by height and weight</h2>
          <p>
            A BMI chart (or table) lists heights along one axis and weights
            along the other; the cell where they meet gives an approximate BMI
            band. Charts are handy for quick lookups but inherit the same limits
            as the formula: they assume average body composition. If your
            measured weight puts you near a category boundary, small measurement
            errors (clothes, time of day, scale calibration) can shift the
            label — so treat the edge of a band as a signal to discuss trends
            over time, not a single fixed verdict.
          </p>

          <h2>Important limitations of BMI</h2>
          <ul>
            <li>
              <strong className="text-foreground">Muscle mass:</strong> Athletes
              and strength trainers often have high BMI with low body fat; the
              index cannot tell muscle from fat.
            </li>
            <li>
              <strong className="text-foreground">Age:</strong> Older adults may
              lose muscle; BMI might sit in the &quot;normal&quot; range while
              fat percentage rises — another reason to use more than one metric.
            </li>
            <li>
              <strong className="text-foreground">Ethnicity and body type:</strong>{" "}
              Some health organizations suggest different action thresholds for
              certain populations because disease risk can rise at lower BMI
              values; follow local clinical guidance.
            </li>
            <li>
              <strong className="text-foreground">Fat distribution:</strong>{" "}
              Visceral fat around organs carries different risk than fat stored
              elsewhere; BMI does not capture that pattern.
            </li>
          </ul>

          <h2>When body fat percentage helps more than BMI</h2>
          <p>
            If you train regularly, are evaluating a fitness program, or want
            a clearer picture of composition,{" "}
            <Link
              href="/calculators/body-fat-calculator"
              className="text-primary hover:underline"
            >
              body fat percentage
            </Link>{" "}
            (from calipers, bioimpedance scales, DEXA, or professional
            assessment) often complements BMI. Body fat targets depend on sex,
            age, and sport; they are still estimates, but they speak more
            directly to adiposity than weight alone.
          </p>

          <h2>BMI for children and teens</h2>
          <p>
            For anyone under 18, BMI is not interpreted with the same adult
            cutoffs. Pediatric BMI is expressed as a percentile for age and sex
            on growth charts: the same number means something different at age 8
            than at age 15. Parents should rely on paediatricians or growth-chart
            tools designed for youth rather than adult WHO bands. If you are
            tracking family health goals, pair professional advice with
            consistent habits — sleep, balanced meals, and activity — rather than
            fixating on a single index.
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
                href="/calculators/bmi-calculator"
                className="text-primary hover:underline"
              >
                BMI Calculator
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — compute BMI from height and weight in metric or imperial
                units.
              </span>
            </li>
            <li>
              <Link
                href="/calculators/body-fat-calculator"
                className="text-primary hover:underline"
              >
                Body Fat Calculator
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — estimate body fat from body measurements.
              </span>
            </li>
            <li>
              <Link
                href="/calculators/calorie-calculator"
                className="text-primary hover:underline"
              >
                Calorie Calculator
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — daily calorie needs for maintenance or goals.
              </span>
            </li>
          </ul>
        </section>
      </article>
    </>
  );
}
