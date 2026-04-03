import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  Activity,
  Building2,
  Calculator,
  Calendar,
  CalendarDays,
  Coins,
  Flame,
  GraduationCap,
  Home,
  IndianRupee,
  Landmark,
  LineChart,
  Percent,
  PiggyBank,
  Receipt,
  Repeat2,
  Scale,
  Tag,
  TrendingUp,
  Wallet,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Online Calculators | ToolPilot",
  description:
    "Browse 20+ free online calculators: EMI, SIP, GST, income tax, FD, RD, mortgage, BMI, calorie, body fat, ROI, discount, date, CGPA-to-percentage, and more. Fast, accurate, no sign-up.",
  alternates: { canonical: "https://tool-pilot.in/calculators" },
  openGraph: {
    title: "Free Online Calculators | ToolPilot",
    description:
      "EMI, SIP, GST, mortgage, BMI, and more—all free in your browser.",
    url: "https://tool-pilot.in/calculators",
  },
};

const indianFinance = [
  {
    href: "/calculators/emi-calculator",
    name: "EMI Calculator",
    description:
      "Plan loan repayments with principal, rate, and tenure—see EMI and amortization at a glance.",
    Icon: IndianRupee,
  },
  {
    href: "/calculators/sip-calculator",
    name: "SIP Calculator",
    description:
      "Project mutual fund SIP wealth with expected returns and investment horizon.",
    Icon: TrendingUp,
  },
  {
    href: "/calculators/gst-calculator",
    name: "GST Calculator",
    description:
      "Add or remove Indian GST quickly for invoices and everyday math.",
    Icon: Receipt,
  },
  {
    href: "/calculators/ppf-calculator",
    name: "PPF Calculator",
    description:
      "Estimate Public Provident Fund maturity with contributions and interest.",
    Icon: PiggyBank,
  },
  {
    href: "/calculators/fd-calculator",
    name: "FD Calculator",
    description:
      "Fixed deposit maturity, interest earned, and effective annual rate with flexible compounding.",
    Icon: Landmark,
  },
  {
    href: "/calculators/rd-calculator",
    name: "RD Calculator",
    description:
      "Recurring deposit maturity using Indian bank-style quarterly compounding on monthly instalments.",
    Icon: Repeat2,
  },
  {
    href: "/calculators/income-tax-calculator",
    name: "Income Tax Calculator",
    description:
      "Compare old and new tax regimes for FY 2025-26 with slab-wise breakdown and cess.",
    Icon: Calculator,
  },
  {
    href: "/calculators/hra-calculator",
    name: "HRA Calculator",
    description:
      "Approximate house rent allowance exemption under common Indian tax rules.",
    Icon: Home,
  },
  {
    href: "/calculators/salary-calculator",
    name: "Salary Calculator",
    description:
      "Break down gross salary, deductions, and take-home pay for planning.",
    Icon: Wallet,
  },
];

const globalCalculators = [
  {
    href: "/calculators/mortgage-calculator",
    name: "Mortgage Calculator",
    description:
      "Monthly payment estimates, total interest, and payoff timelines for home loans.",
    Icon: Building2,
  },
  {
    href: "/calculators/bmi-calculator",
    name: "BMI Calculator",
    description:
      "Body mass index from height and weight with standard category guidance.",
    Icon: Activity,
  },
  {
    href: "/calculators/compound-interest-calculator",
    name: "Compound Interest",
    description:
      "See how principal grows with compounding rate, frequency, and time.",
    Icon: Percent,
  },
  {
    href: "/calculators/tip-calculator",
    name: "Tip Calculator",
    description:
      "Split bills, add gratuity, and share totals fairly in seconds.",
    Icon: Coins,
  },
  {
    href: "/calculators/age-calculator",
    name: "Age Calculator",
    description:
      "Calculate exact age in years, months, and days from any date of birth.",
    Icon: Calendar,
  },
  {
    href: "/calculators/percentage-calculator",
    name: "Percentage Calculator",
    description:
      "Calculate percentages, percentage increase/decrease, and ratios instantly.",
    Icon: Percent,
  },
  {
    href: "/calculators/loan-calculator",
    name: "Loan Calculator",
    description:
      "Monthly payment, total interest, and amortization for any fixed-rate loan.",
    Icon: Landmark,
  },
  {
    href: "/calculators/discount-calculator",
    name: "Discount Calculator",
    description:
      "Calculate single or double discounts with optional tax on the final price.",
    Icon: Tag,
  },
  {
    href: "/calculators/date-calculator",
    name: "Date Calculator",
    description:
      "Find days between two dates or add/subtract days from any date.",
    Icon: CalendarDays,
  },
  {
    href: "/calculators/cgpa-to-percentage-calculator",
    name: "CGPA to Percentage",
    description:
      "Convert CGPA to percentage for CBSE, VTU, Mumbai, and Anna University scales.",
    Icon: GraduationCap,
  },
  {
    href: "/calculators/calorie-calculator",
    name: "Calorie Calculator",
    description:
      "Calculate BMR, TDEE, and daily calorie targets for weight loss or gain.",
    Icon: Flame,
  },
  {
    href: "/calculators/body-fat-calculator",
    name: "Body Fat Calculator",
    description:
      "Estimate body fat percentage using the US Navy method with category guidance.",
    Icon: Scale,
  },
  {
    href: "/calculators/roi-calculator",
    name: "ROI Calculator",
    description:
      "Compute return on investment, annualized ROI, and net profit from any investment.",
    Icon: LineChart,
  },
];

function CalculatorGrid({
  items,
}: {
  items: {
    href: string;
    name: string;
    description: string;
    Icon: LucideIcon;
  }[];
}) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ href, name, description, Icon }) => (
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
              Open calculator →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function CalculatorsIndexPage() {
  return (
    <div className="mx-auto min-h-screen max-w-6xl bg-background px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-medium text-primary">Calculators</p>
      <h1 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Free online calculators
      </h1>
      <p className="mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
        Fast, accurate calculators for Indian finance and everyday global
        scenarios—run entirely in your browser with no account required.
      </p>

      <section className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Indian finance
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          EMI, SIP, GST, PPF, HRA, and salary tools tailored to common India use
          cases.
        </p>
        <div className="mt-6">
          <CalculatorGrid items={indianFinance} />
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">
          Global
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Mortgage, health, compounding, and tipping—handy wherever you are.
        </p>
        <div className="mt-6">
          <CalculatorGrid items={globalCalculators} />
        </div>
      </section>

      <p className="mt-14 text-center text-sm text-muted-foreground">
        Looking for JSON, regex, and dev utilities?{" "}
        <Link href="/tools" className="font-medium text-primary hover:underline">
          Browse developer tools
        </Link>
        .
      </p>
    </div>
  );
}
