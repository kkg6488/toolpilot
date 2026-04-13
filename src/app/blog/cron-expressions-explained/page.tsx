import type { Metadata } from "next";
import Link from "next/link";

const canonical = "https://tool-pilot.in/blog/cron-expressions-explained";
const title =
  "Cron Expressions Explained: A Complete Guide to Scheduling Jobs | ToolPilot";
const description =
  "Learn what cron is, how the five-field schedule works, special characters, common patterns, CI/CD usage, timezones, and how to test cron expressions safely.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: {
    title: "Cron Expressions Explained: A Complete Guide to Scheduling Jobs",
    description,
    url: canonical,
    type: "article",
  },
};

const published = "2026-04-10";

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Cron Expressions Explained: A Complete Guide to Scheduling Jobs",
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

export default function CronExpressionsExplainedPost() {
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
              Cron Expressions Explained
            </li>
          </ol>
        </nav>

        <header className="mt-8">
          <p className="text-sm font-medium text-primary">Developer</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Cron Expressions Explained: A Complete Guide to Scheduling Jobs
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            <time dateTime={published}>April 10, 2026</time>
            <span className="mx-2">·</span>8 min read
          </p>
        </header>

        <div className="mt-10 space-y-4 text-base leading-relaxed [&>h2]:mt-10 [&>h2]:scroll-mt-20 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-foreground [&>ul]:my-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:text-muted-foreground [&>ol]:my-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:text-muted-foreground [&>p]:text-muted-foreground [&>p:first-of-type]:text-foreground">
          <p>
            Cron is the de facto language for recurring schedules on servers and
            in automation platforms. Whether you are rotating logs at midnight,
            triggering backups, or running a nightly data pipeline, cron
            expressions turn a compact string into a precise timetable. This
            guide walks the classic five-field format, the punctuation that
            modifies it, and how modern CI systems adapt the same ideas — with
            tooling like ToolPilot&apos;s{" "}
            <Link
              href="/tools/cron-expression-builder"
              className="text-primary hover:underline"
            >
              cron expression builder
            </Link>{" "}
            to validate what you write.
          </p>

          <h2>What is cron?</h2>
          <p>
            Originally tied to the Unix <strong className="text-foreground">cron</strong>{" "}
            daemon, &quot;cron&quot; now refers both to the scheduler and the
            mini-language describing when jobs run. A user or system defines a
            schedule string; the scheduler wakes the command or webhook at those
            instants. Cron excels at repetitive maintenance — cache warming,
            certificate renewal checks, report generation — while one-off tasks
            are often better as queued jobs or manual runs.
          </p>

          <h2>The five-field format</h2>
          <p>
            The most common Unix-style cron expression has{" "}
            <strong className="text-foreground">five fields</strong>, read left
            to right:
          </p>
          <ol>
            <li>
              <strong className="text-foreground">Minute</strong> (0–59)
            </li>
            <li>
              <strong className="text-foreground">Hour</strong> (0–23)
            </li>
            <li>
              <strong className="text-foreground">Day of month</strong> (1–31)
            </li>
            <li>
              <strong className="text-foreground">Month</strong> (1–12 or names)
            </li>
            <li>
              <strong className="text-foreground">Weekday</strong> (0–7, where 0
              and 7 often both mean Sunday — check your platform&apos;s docs)
            </li>
          </ol>
          <p>
            Some systems add a seconds field or use six fields including seconds;
            always read the product documentation when moving cron expressions
            between environments. A mismatch there is a frequent source of
            &quot;runs at the wrong time&quot; bugs.
          </p>

          <h2>Special characters: *, /, -, and comma</h2>
          <ul>
            <li>
              <strong className="text-foreground">Asterisk (*):</strong> every
              valid value in that field — &quot;any&quot; minute, hour, etc.
            </li>
            <li>
              <strong className="text-foreground">Slash (/):</strong> steps;
              <code className="mx-1 rounded bg-muted px-1 py-0.5 text-sm">
                */5
              </code>{" "}
              in the minute field means every five minutes.
            </li>
            <li>
              <strong className="text-foreground">Hyphen (-):</strong> ranges;
              <code className="mx-1 rounded bg-muted px-1 py-0.5 text-sm">
                9-17
              </code>{" "}
              in the hour field covers 9am through 5pm.
            </li>
            <li>
              <strong className="text-foreground">Comma (,):</strong> lists;
              <code className="mx-1 rounded bg-muted px-1 py-0.5 text-sm">
                1,15
              </code>{" "}
              on day-of-month runs on the 1st and 15th.
            </li>
          </ul>
          <p>
            When day-of-month and weekday are both restricted (neither is
            <code className="mx-1 rounded bg-muted px-1 py-0.5 text-sm">*</code>
            ), many implementations treat the job as matching{" "}
            <em>either</em> condition — another detail to confirm per engine.
          </p>

          <h2>Common cron patterns</h2>
          <ul>
            <li>
              <strong className="text-foreground">Every 5 minutes:</strong>{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-sm">
                */5 * * * *
              </code>
            </li>
            <li>
              <strong className="text-foreground">Daily at midnight (server local):</strong>{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-sm">
                0 0 * * *
              </code>
            </li>
            <li>
              <strong className="text-foreground">Weekly on Monday at 09:00:</strong>{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-sm">
                0 9 * * 1
              </code>{" "}
              (if Monday = 1 in your environment).
            </li>
            <li>
              <strong className="text-foreground">Monthly on the 1st at 06:30:</strong>{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-sm">
                30 6 1 * *
              </code>
            </li>
          </ul>
          <p>
            Copy-paste patterns only after verifying weekday numbering and
            whether the platform uses UTC or the runner&apos;s local timezone.
          </p>

          <h2>Cron in CI/CD: GitHub Actions and GitLab CI</h2>
          <p>
            Continuous integration systems reuse cron syntax for scheduled
            workflows. GitHub Actions{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">
              schedule
            </code>{" "}
            triggers accept cron expressions in UTC. GitLab CI scheduled
            pipelines similarly interpret cron strings on the server side. That
            means your &quot;9am&quot; job might be 9am UTC unless you offset the
            hours in the expression or configure a runner timezone explicitly.
          </p>
          <p>
            Keep CI schedules idempotent: if a nightly job overlaps a deployment,
            use locks or queue semantics so double-fires from manual re-runs do
            not corrupt data. Pair schedules with observability so missed runs
            surface as alerts, not silent gaps.
          </p>

          <h2>Timezone considerations</h2>
          <p>
            Server cron typically uses the machine&apos;s local timezone; cloud
            schedulers often standardize on UTC. Daylight saving shifts can make
            &quot;2:30am every day&quot; ambiguous — some local times do not exist
            or occur twice when clocks change. For global products, UTC plus
            explicit user-facing labels tends to be clearer than scattering
            implicit local zones across cron expressions.
          </p>
          <p>
            When correlating logs with external APIs, convert instants with a{" "}
            <Link
              href="/tools/timestamp-converter"
              className="text-primary hover:underline"
            >
              timestamp converter
            </Link>{" "}
            so incident timelines line up across systems.
          </p>

          <h2>Testing cron expressions</h2>
          <p>
            Before promoting a schedule to production, enumerate the next
            several run times with a trusted parser, run the job in a staging
            environment, and watch for off-by-one weekday or month errors.
            Document the intended timezone next to the expression in your
            infrastructure repo so future edits preserve meaning.
          </p>
          <p>
            For payload-heavy automations, validate JSON configs and webhook
            bodies with ToolPilot&apos;s{" "}
            <Link
              href="/tools/json-formatter"
              className="text-primary hover:underline"
            >
              JSON formatter
            </Link>{" "}
            before they are embedded in scheduled tasks — syntax errors should
            fail in preview, not at 2am on Saturday.
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
                href="/tools/cron-expression-builder"
                className="text-primary hover:underline"
              >
                Cron Expression Builder
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — compose and sanity-check schedule strings interactively.
              </span>
            </li>
            <li>
              <Link
                href="/tools/timestamp-converter"
                className="text-primary hover:underline"
              >
                Timestamp Converter
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — align epochs and human-readable times across timezones.
              </span>
            </li>
            <li>
              <Link
                href="/tools/json-formatter"
                className="text-primary hover:underline"
              >
                JSON Formatter
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — format and validate JSON for configs and CI payloads.
              </span>
            </li>
          </ul>
        </section>
      </article>
    </>
  );
}
