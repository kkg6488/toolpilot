import Link from "next/link";
import { Wrench } from "lucide-react";

const calculatorLinks = [
  { label: "EMI Calculator", href: "/calculators/emi-calculator" },
  { label: "SIP Calculator", href: "/calculators/sip-calculator" },
  { label: "GST Calculator", href: "/calculators/gst-calculator" },
  { label: "PPF Calculator", href: "/calculators/ppf-calculator" },
  { label: "HRA Calculator", href: "/calculators/hra-calculator" },
  { label: "Mortgage Calculator", href: "/calculators/mortgage-calculator" },
  { label: "BMI Calculator", href: "/calculators/bmi-calculator" },
  { label: "Compound Interest", href: "/calculators/compound-interest-calculator" },
  { label: "Tip Calculator", href: "/calculators/tip-calculator" },
  { label: "Salary Calculator", href: "/calculators/salary-calculator" },
  { label: "Age Calculator", href: "/calculators/age-calculator" },
  { label: "Percentage Calculator", href: "/calculators/percentage-calculator" },
];

const toolLinks = [
  { label: "JSON Formatter", href: "/tools/json-formatter" },
  { label: "Color Palette Generator", href: "/tools/color-palette-generator" },
  { label: "Regex Tester", href: "/tools/regex-tester" },
  { label: "Privacy Policy Generator", href: "/tools/privacy-policy-generator" },
  { label: "Cron Expression Builder", href: "/tools/cron-expression-builder" },
  { label: "Word Counter", href: "/tools/word-counter" },
  { label: "Password Generator", href: "/tools/password-generator" },
  { label: "QR Code Generator", href: "/tools/qr-code-generator" },
  { label: "Unit Converter", href: "/convert" },
  { label: "Percentage Calculator", href: "/percentage" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
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
