import type { Metadata } from "next";
import Link from "next/link";

const canonical = "https://tool-pilot.in/blog/how-to-use-regex-beginners-guide";
const title = "How to Use Regex: A Beginner's Guide with Examples | ToolPilot";
const description =
  "Learn regular expressions from scratch: literals and metacharacters, character classes, quantifiers, anchors, groups, common patterns, flags, and how to test safely.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical },
  openGraph: {
    title: "How to Use Regex: A Beginner's Guide with Examples",
    description,
    url: canonical,
    type: "article",
  },
};

const published = "2026-04-04";

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Use Regex: A Beginner's Guide with Examples",
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

export default function HowToUseRegexBeginnersGuidePost() {
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
            <li className="text-foreground font-medium">Regex Guide</li>
          </ol>
        </nav>

        <header className="mt-8">
          <p className="text-sm font-medium text-primary">Developer</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How to Use Regex: A Beginner&apos;s Guide with Examples
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            <time dateTime={published}>April 4, 2026</time>
            <span className="mx-2">·</span>9 min read
          </p>
        </header>

        <div className="mt-10 space-y-4 text-base leading-relaxed [&>h2]:mt-10 [&>h2]:scroll-mt-20 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-foreground [&>ul]:my-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:text-muted-foreground [&>ol]:my-4 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:text-muted-foreground [&>p]:text-muted-foreground [&>p:first-of-type]:text-foreground">
          <p>
            Regular expressions (regex) are a compact language for describing
            patterns in text — find every email in a log, validate a phone
            field, or strip unwanted characters from user input. They look cryptic
            at first, but most patterns combine a small set of building blocks.
            This guide walks through those pieces and points you to ToolPilot&apos;s{" "}
            <Link
              href="/tools/regex-tester"
              className="text-primary hover:underline"
            >
              Regex Tester
            </Link>{" "}
            so you can experiment safely.
          </p>

          <h2>What regex is (and when not to use it)</h2>
          <p>
            A regex engine scans input left to right, trying to match your
            pattern. It is excellent for{" "}
            <strong className="text-foreground">search, replace, and light
            validation</strong>. It is a poor fit for fully parsing nested
            languages like HTML or arbitrary JSON — use a proper parser for
            structure. For quick checks on strings, regex remains a daily tool in
            editors, grep, and application code.
          </p>

          <h2>Literal characters and metacharacters</h2>
          <p>
            Ordinary characters match themselves:{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">cat</code>{" "}
            matches &quot;cat&quot;. Metacharacters have special meaning:
            <code className="rounded bg-muted px-1 py-0.5 text-sm">. ^ $ * + ? ( ) [ ] {"{"} {"}"} | \</code>.
            To match them literally, escape with a backslash, e.g.{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">\.</code> for
            a dot. Different languages may slightly extend the metacharacter set,
            so check your engine&apos;s docs for edge cases.
          </p>

          <h2>Character classes: [a-z], \d, \w, \s</h2>
          <p>
            Square brackets define a <strong className="text-foreground">set</strong>{" "}
            of allowed characters:{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">[aeiou]</code>{" "}
            matches any single vowel. Ranges like{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">[a-z]</code>{" "}
            match lowercase letters; combine ranges inside one pair of brackets.
            A caret at the start negates the set:{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">[^0-9]</code>{" "}
            means &quot;not a digit.&quot;
          </p>
          <p>
            Common shorthands (in many flavors):{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">\d</code> digit,{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">\w</code>{" "}
            word character (letters, digits, underscore),{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">\s</code>{" "}
            whitespace. Uppercase versions often mean the opposite (
            <code className="rounded bg-muted px-1 py-0.5 text-sm">\D</code>,{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">\S</code>, etc.).
          </p>

          <h2>Quantifiers: *, +, ?, and {"{n}"}</h2>
          <p>
            Quantifiers repeat the preceding element:{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">*</code> zero
            or more,{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">+</code> one or
            more,{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">?</code> zero or
            one. Curly braces specify counts:{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">{"{3}"}</code>{" "}
            exactly three,{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">{"{2,4}"}</code>{" "}
            two to four,{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">{"{2,}"}</code>{" "}
            two or more. By default quantifiers are{" "}
            <strong className="text-foreground">greedy</strong> (take as much as
            possible); a trailing{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">?</code> makes
            them lazy for tighter matches.
          </p>

          <h2>Anchors, groups, and captures</h2>
          <p>
            <code className="rounded bg-muted px-1 py-0.5 text-sm">^</code>{" "}
            asserts the start of a line (or string, depending on mode);{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">$</code>{" "}
            asserts the end. Together they require the whole subject to match:
            <code className="rounded bg-muted px-1 py-0.5 text-sm">^\d+$</code>{" "}
            for an all-digit string with no extra characters. Word boundaries (
            <code className="rounded bg-muted px-1 py-0.5 text-sm">\b</code> in
            many engines) help match whole words without accidental substring hits.
          </p>
          <p>
            Parentheses <code className="rounded bg-muted px-1 py-0.5 text-sm">(...)</code>{" "}
            create a <strong className="text-foreground">capturing group</strong>,
            storing the matched substring for backreferences or replacement
            templates. Non-capturing groups{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">(?:...)</code>{" "}
            group logic without saving a capture when you only need precedence or
            quantifier scope. Alternation{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">|</code>{" "}
            chooses between subpatterns, e.g.{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">cat|dog</code>.
          </p>

          <h2>Common patterns: email, phone, URL</h2>
          <p>
            Real-world validation usually combines regex with normalization and
            server-side checks. Illustrative (not exhaustive) ideas:
          </p>
          <ul>
            <li>
              <strong className="text-foreground">Email:</strong> a local part,
              <code className="rounded bg-muted px-1 py-0.5 text-sm">@</code>, and
              domain with a dot — strict RFC-compliant regex is enormous; prefer
              library validators for production.
            </li>
            <li>
              <strong className="text-foreground">Phone:</strong> optional country
              code, separators, and digit groups — normalize to digits before
              comparing to allowed lengths.
            </li>
            <li>
              <strong className="text-foreground">URL:</strong> scheme, host, and
              path rules vary; parsing with a URL type beats hand-rolled regex for
              security-sensitive code.
            </li>
          </ul>
          <p>
            When cleaning structured text, pair regex with{" "}
            <Link
              href="/tools/json-formatter"
              className="text-primary hover:underline"
            >
              JSON Formatter
            </Link>{" "}
            to verify payloads after extraction.
          </p>

          <h2>Flags, testing tips, and next steps</h2>
          <p>
            Flags modify matching behavior.{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">g</code>{" "}
            (global) finds all matches instead of stopping at the first;{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">i</code>{" "}
            ignores case;{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">m</code>{" "}
            multiline mode often changes how{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">^</code> and{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">$</code>{" "}
            anchor to lines. Engines may add{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">s</code>,{" "}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">u</code>, or
            others — always confirm syntax for JavaScript, Python, Java, or grep.
          </p>
          <p>
            Start with small strings, enable explanation tools where available,
            and add cases that should <strong className="text-foreground">fail</strong>{" "}
            as well as pass. Watch catastrophic backtracking on nested quantifiers
            — simplify patterns or use possessive quantifiers where supported.
            For schedule-like strings, explore{" "}
            <Link
              href="/tools/cron-expression-builder"
              className="text-primary hover:underline"
            >
              Cron Expression Builder
            </Link>{" "}
            alongside regex when you automate jobs; cron fields are structured,
            but regex still helps parse logs that mention those expressions.
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
                href="/tools/regex-tester"
                className="text-primary hover:underline"
              >
                Regex Tester
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — try patterns against sample text interactively.
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
                — validate and format JSON after text extraction.
              </span>
            </li>
            <li>
              <Link
                href="/tools/cron-expression-builder"
                className="text-primary hover:underline"
              >
                Cron Expression Builder
              </Link>
              <span className="text-muted-foreground">
                {" "}
                — build and understand cron schedules visually.
              </span>
            </li>
          </ul>
        </section>
      </article>
    </>
  );
}
