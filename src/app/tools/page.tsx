import type { Metadata } from "next";
import Link from "next/link";
import {
  Braces,
  Clock3,
  FileText,
  KeyRound,
  LetterText,
  Palette,
  QrCode,
  Regex,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Online Developer Tools | ToolPilot",
  description:
    "Free online tools for developers and builders: JSON formatter, regex tester, color palette generator, cron expression builder, and privacy policy generator—no install, no sign-up.",
  alternates: { canonical: "https://tool-pilot.in/tools" },
  openGraph: {
    title: "Free Online Developer Tools | ToolPilot",
    description:
      "Format JSON, test regex, build palettes and cron jobs in the browser.",
    url: "https://tool-pilot.in/tools",
  },
};

const tools = [
  {
    href: "/tools/json-formatter",
    name: "JSON Formatter",
    description:
      "Validate, prettify, and minify JSON with clear error feedback for broken payloads.",
    Icon: Braces,
  },
  {
    href: "/tools/color-palette-generator",
    name: "Color Palette Generator",
    description:
      "Create harmonious palettes from a base color for UI and brand work.",
    Icon: Palette,
  },
  {
    href: "/tools/regex-tester",
    name: "Regex Tester",
    description:
      "Try patterns against sample text with flags and instant match highlighting.",
    Icon: Regex,
  },
  {
    href: "/tools/privacy-policy-generator",
    name: "Privacy Policy Generator",
    description:
      "Draft a structured privacy policy template you can customize for your product.",
    Icon: FileText,
  },
  {
    href: "/tools/cron-expression-builder",
    name: "Cron Expression Builder",
    description:
      "Compose and decode cron schedules with human-readable explanations.",
    Icon: Clock3,
  },
  {
    href: "/tools/word-counter",
    name: "Word Counter",
    description:
      "Count words, characters, sentences, and paragraphs with reading time estimates.",
    Icon: LetterText,
  },
  {
    href: "/tools/password-generator",
    name: "Password Generator",
    description:
      "Generate strong, random passwords with customizable length and character options.",
    Icon: KeyRound,
  },
  {
    href: "/tools/qr-code-generator",
    name: "QR Code Generator",
    description:
      "Create QR codes for URLs, text, email, phone, and Wi-Fi. Download as PNG.",
    Icon: QrCode,
  },
];

export default function ToolsIndexPage() {
  return (
    <div className="mx-auto min-h-screen max-w-6xl bg-background px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-medium text-primary">Tools</p>
      <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Free online tools
      </h1>
      <p className="mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
        Lightweight utilities that run in your browser—ideal for quick JSON
        cleanup, regex checks, design tokens, schedules, and policy drafts.
      </p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map(({ href, name, description, Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-colors hover:border-primary/40 hover:bg-primary/[0.03]"
            >
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <span className="text-lg font-semibold text-foreground group-hover:text-primary">
                {name}
              </span>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">
                {description}
              </p>
              <span className="mt-4 text-sm font-medium text-primary">
                Open tool →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-14 text-center text-sm text-muted-foreground">
        Need EMI, SIP, or GST calculators?{" "}
        <Link
          href="/calculators"
          className="font-medium text-primary hover:underline"
        >
          Browse calculators
        </Link>
        .
      </p>
    </div>
  );
}
