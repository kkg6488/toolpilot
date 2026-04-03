import Link from "next/link";
import { Wrench } from "lucide-react";

const calculatorLinks = [
  { label: "EMI Calculator", href: "/calculators/emi-calculator" },
  { label: "SIP Calculator", href: "/calculators/sip-calculator" },
  { label: "Income Tax Calculator", href: "/calculators/income-tax-calculator" },
  { label: "FD Calculator", href: "/calculators/fd-calculator" },
  { label: "RD Calculator", href: "/calculators/rd-calculator" },
  { label: "GST Calculator", href: "/calculators/gst-calculator" },
  { label: "Loan Calculator", href: "/calculators/loan-calculator" },
  { label: "Discount Calculator", href: "/calculators/discount-calculator" },
  { label: "PPF Calculator", href: "/calculators/ppf-calculator" },
  { label: "HRA Calculator", href: "/calculators/hra-calculator" },
  { label: "Mortgage Calculator", href: "/calculators/mortgage-calculator" },
  { label: "BMI Calculator", href: "/calculators/bmi-calculator" },
  { label: "Calorie Calculator", href: "/calculators/calorie-calculator" },
  { label: "Body Fat Calculator", href: "/calculators/body-fat-calculator" },
  { label: "CGPA to Percentage", href: "/calculators/cgpa-to-percentage-calculator" },
  { label: "Date Calculator", href: "/calculators/date-calculator" },
  { label: "ROI Calculator", href: "/calculators/roi-calculator" },
  { label: "Salary Calculator", href: "/calculators/salary-calculator" },
  { label: "Age Calculator", href: "/calculators/age-calculator" },
  { label: "Percentage Calculator", href: "/calculators/percentage-calculator" },
];

const toolLinks = [
  { label: "JSON Formatter", href: "/tools/json-formatter" },
  { label: "Base64 Encoder/Decoder", href: "/tools/base64-encoder-decoder" },
  { label: "UUID Generator", href: "/tools/uuid-generator" },
  { label: "Hash Generator", href: "/tools/hash-generator" },
  { label: "Timestamp Converter", href: "/tools/timestamp-converter" },
  { label: "Lorem Ipsum Generator", href: "/tools/lorem-ipsum-generator" },
  { label: "Color Palette Generator", href: "/tools/color-palette-generator" },
  { label: "Regex Tester", href: "/tools/regex-tester" },
  { label: "Cron Expression Builder", href: "/tools/cron-expression-builder" },
  { label: "Word Counter", href: "/tools/word-counter" },
  { label: "Password Generator", href: "/tools/password-generator" },
  { label: "QR Code Generator", href: "/tools/qr-code-generator" },
  { label: "Unit Converter", href: "/convert" },
  { label: "Percentage Calculator", href: "/percentage" },
];

const blogLinks = [
  { label: "How to Calculate EMI", href: "/blog/how-to-calculate-emi" },
  { label: "SIP vs FD: Which is Better?", href: "/blog/sip-vs-fd-which-is-better" },
  { label: "Income Tax Slabs 2025-26", href: "/blog/income-tax-slabs-2025-26" },
  { label: "How to Calculate Percentage", href: "/blog/how-to-calculate-percentage" },
  { label: "Best Dev Tools 2026", href: "/blog/best-free-developer-tools-2026" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-semibold mb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Wrench className="h-4 w-4" />
              </span>
              <span>ToolPilot</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Free online calculators and developer tools. Fast, accurate, no sign-up required.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Calculators</h3>
            <ul className="space-y-2">
              {calculatorLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Tools</h3>
            <ul className="space-y-2">
              {toolLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Blog</h3>
            <ul className="space-y-2">
              {blogLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ToolPilot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
