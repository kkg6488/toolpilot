"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Menu, Moon, Sun, Wrench, X } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
  { label: "Compound Interest", href: "/calculators/compound-interest-calculator" },
  { label: "Tip Calculator", href: "/calculators/tip-calculator" },
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
  { label: "Privacy Policy Generator", href: "/tools/privacy-policy-generator" },
  { label: "Cron Expression Builder", href: "/tools/cron-expression-builder" },
  { label: "Word Counter", href: "/tools/word-counter" },
  { label: "Password Generator", href: "/tools/password-generator" },
  { label: "QR Code Generator", href: "/tools/qr-code-generator" },
  { label: "Unit Converter", href: "/convert" },
  { label: "Percentage Calculator", href: "/percentage" },
];

function NavDropdown({
  label,
  items,
  open,
  onToggle,
}: {
  label: string;
  items: { label: string; href: string }[];
  open: boolean;
  onToggle: () => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        if (open) onToggle();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onToggle]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        {label}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 min-w-[15rem] rounded-lg border bg-popover p-1.5 shadow-lg">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onToggle}
              className="block rounded-md px-3 py-2 text-sm text-popover-foreground hover:bg-accent transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-9 w-9" />;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Wrench className="h-4 w-4" />
          </span>
          <span className="text-lg">ToolPilot</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <NavDropdown
            label="Calculators"
            items={calculatorLinks}
            open={openDropdown === "calc"}
            onToggle={() => setOpenDropdown(openDropdown === "calc" ? null : "calc")}
          />
          <NavDropdown
            label="Tools"
            items={toolLinks}
            open={openDropdown === "tools"}
            onToggle={() => setOpenDropdown(openDropdown === "tools" ? null : "tools")}
          />
          <Link
            href="/blog"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            Blog
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t bg-background md:hidden">
          <div className="mx-auto max-w-6xl space-y-4 px-4 py-4">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Calculators
              </p>
              <ul className="grid grid-cols-2 gap-1">
                {calculatorLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-md px-2 py-2 text-sm hover:bg-accent"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Tools
              </p>
              <ul className="grid grid-cols-2 gap-1">
                {toolLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-md px-2 py-2 text-sm hover:bg-accent"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Link
                href="/blog"
                className="block rounded-md px-2 py-2 text-sm font-medium hover:bg-accent"
                onClick={() => setMobileOpen(false)}
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
