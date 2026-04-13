export type RelatedItem = {
  href: string;
  label: string;
  description: string;
};

const calculatorItems: Record<string, RelatedItem[]> = {
  "emi-calculator": [
    { href: "/calculators/loan-calculator", label: "Loan Calculator", description: "Explore principal, rate, and tenure together." },
    { href: "/calculators/mortgage-calculator", label: "Mortgage Calculator", description: "Monthly payment estimates for home loans." },
    { href: "/calculators/compound-interest-calculator", label: "Compound Interest", description: "See how principal grows over time." },
    { href: "/calculators/sip-calculator", label: "SIP Calculator", description: "Project mutual fund SIP wealth." },
    { href: "/tools/json-formatter", label: "JSON Formatter", description: "Format and validate JSON online." },
  ],
  "sip-calculator": [
    { href: "/calculators/ppf-calculator", label: "PPF Calculator", description: "Estimate Public Provident Fund maturity." },
    { href: "/calculators/fd-calculator", label: "FD Calculator", description: "Fixed deposit maturity and interest earned." },
    { href: "/calculators/rd-calculator", label: "RD Calculator", description: "Recurring deposit maturity with quarterly compounding." },
    { href: "/calculators/compound-interest-calculator", label: "Compound Interest", description: "See how compounding grows wealth." },
    { href: "/calculators/roi-calculator", label: "ROI Calculator", description: "Compute return on any investment." },
  ],
  "gst-calculator": [
    { href: "/calculators/income-tax-calculator", label: "Income Tax Calculator", description: "Compare old and new tax regimes." },
    { href: "/calculators/discount-calculator", label: "Discount Calculator", description: "Calculate discounts with optional tax." },
    { href: "/calculators/salary-calculator", label: "Salary Calculator", description: "Break down gross salary and take-home pay." },
    { href: "/calculators/emi-calculator", label: "EMI Calculator", description: "Plan loan repayments instantly." },
    { href: "/calculators/percentage-calculator", label: "Percentage Calculator", description: "Calculate percentages instantly." },
  ],
  "ppf-calculator": [
    { href: "/calculators/sip-calculator", label: "SIP Calculator", description: "Project mutual fund SIP wealth." },
    { href: "/calculators/fd-calculator", label: "FD Calculator", description: "Fixed deposit maturity and interest earned." },
    { href: "/calculators/rd-calculator", label: "RD Calculator", description: "Recurring deposit maturity calculator." },
    { href: "/calculators/compound-interest-calculator", label: "Compound Interest", description: "Understand compounding with any rate." },
    { href: "/calculators/roi-calculator", label: "ROI Calculator", description: "Compute return on any investment." },
  ],
  "fd-calculator": [
    { href: "/calculators/rd-calculator", label: "RD Calculator", description: "Recurring deposit maturity calculator." },
    { href: "/calculators/ppf-calculator", label: "PPF Calculator", description: "Estimate PPF maturity value." },
    { href: "/calculators/sip-calculator", label: "SIP Calculator", description: "Compare SIP returns vs FD." },
    { href: "/calculators/compound-interest-calculator", label: "Compound Interest", description: "See how compounding works at any frequency." },
    { href: "/calculators/income-tax-calculator", label: "Income Tax Calculator", description: "Check tax on FD interest income." },
  ],
  "rd-calculator": [
    { href: "/calculators/fd-calculator", label: "FD Calculator", description: "Fixed deposit maturity calculator." },
    { href: "/calculators/sip-calculator", label: "SIP Calculator", description: "Compare SIP vs RD returns." },
    { href: "/calculators/ppf-calculator", label: "PPF Calculator", description: "Estimate PPF maturity." },
    { href: "/calculators/compound-interest-calculator", label: "Compound Interest", description: "Understand quarterly compounding." },
    { href: "/calculators/emi-calculator", label: "EMI Calculator", description: "Plan loan EMI payments." },
  ],
  "income-tax-calculator": [
    { href: "/calculators/hra-calculator", label: "HRA Calculator", description: "Estimate house rent allowance exemption." },
    { href: "/calculators/salary-calculator", label: "Salary Calculator", description: "Break down gross salary and deductions." },
    { href: "/calculators/gst-calculator", label: "GST Calculator", description: "Add or remove GST quickly." },
    { href: "/calculators/sip-calculator", label: "SIP Calculator", description: "Plan tax-saving ELSS investments." },
    { href: "/calculators/ppf-calculator", label: "PPF Calculator", description: "PPF qualifies for Section 80C deduction." },
  ],
  "hra-calculator": [
    { href: "/calculators/income-tax-calculator", label: "Income Tax Calculator", description: "Compare old and new tax regimes." },
    { href: "/calculators/salary-calculator", label: "Salary Calculator", description: "Full salary breakdown with deductions." },
    { href: "/calculators/gst-calculator", label: "GST Calculator", description: "Quick GST calculations." },
    { href: "/calculators/emi-calculator", label: "EMI Calculator", description: "Plan home loan repayments." },
    { href: "/calculators/percentage-calculator", label: "Percentage Calculator", description: "Calculate percentages easily." },
  ],
  "salary-calculator": [
    { href: "/calculators/income-tax-calculator", label: "Income Tax Calculator", description: "Tax on your salary income." },
    { href: "/calculators/hra-calculator", label: "HRA Calculator", description: "HRA exemption estimation." },
    { href: "/calculators/sip-calculator", label: "SIP Calculator", description: "Invest a portion of your salary." },
    { href: "/calculators/emi-calculator", label: "EMI Calculator", description: "What EMI fits your take-home pay?" },
    { href: "/calculators/gst-calculator", label: "GST Calculator", description: "GST on freelance invoices." },
  ],
  "mortgage-calculator": [
    { href: "/calculators/emi-calculator", label: "EMI Calculator", description: "Indian loan EMI calculator." },
    { href: "/calculators/loan-calculator", label: "Loan Calculator", description: "General fixed-rate loan calculator." },
    { href: "/calculators/compound-interest-calculator", label: "Compound Interest", description: "Understand interest compounding." },
    { href: "/calculators/roi-calculator", label: "ROI Calculator", description: "Is buying vs renting worth it?" },
    { href: "/calculators/discount-calculator", label: "Discount Calculator", description: "Calculate discounts on purchases." },
  ],
  "bmi-calculator": [
    { href: "/calculators/body-fat-calculator", label: "Body Fat Calculator", description: "Estimate body fat percentage." },
    { href: "/calculators/calorie-calculator", label: "Calorie Calculator", description: "Daily calorie targets for your goals." },
    { href: "/calculators/age-calculator", label: "Age Calculator", description: "Calculate exact age from date of birth." },
    { href: "/calculators/percentage-calculator", label: "Percentage Calculator", description: "Calculate percentages easily." },
    { href: "/tools/word-counter", label: "Word Counter", description: "Count words and reading time." },
  ],
  "compound-interest-calculator": [
    { href: "/calculators/sip-calculator", label: "SIP Calculator", description: "Monthly SIP with compounding." },
    { href: "/calculators/fd-calculator", label: "FD Calculator", description: "FD with different compounding frequencies." },
    { href: "/calculators/ppf-calculator", label: "PPF Calculator", description: "PPF with annual compounding." },
    { href: "/calculators/roi-calculator", label: "ROI Calculator", description: "Overall return on investment." },
    { href: "/calculators/emi-calculator", label: "EMI Calculator", description: "Loan EMI with compound interest." },
  ],
  "tip-calculator": [
    { href: "/calculators/discount-calculator", label: "Discount Calculator", description: "Calculate discounts on bills." },
    { href: "/calculators/percentage-calculator", label: "Percentage Calculator", description: "Quick percentage calculations." },
    { href: "/calculators/gst-calculator", label: "GST Calculator", description: "Add tax to bill amounts." },
    { href: "/calculators/salary-calculator", label: "Salary Calculator", description: "Break down your salary." },
    { href: "/calculators/bmi-calculator", label: "BMI Calculator", description: "Check your BMI." },
  ],
  "age-calculator": [
    { href: "/calculators/date-calculator", label: "Date Calculator", description: "Find days between two dates." },
    { href: "/calculators/bmi-calculator", label: "BMI Calculator", description: "Body mass index by age." },
    { href: "/calculators/calorie-calculator", label: "Calorie Calculator", description: "Age affects calorie needs." },
    { href: "/calculators/percentage-calculator", label: "Percentage Calculator", description: "Quick percentage math." },
    { href: "/calculators/body-fat-calculator", label: "Body Fat Calculator", description: "Estimate body fat percentage." },
  ],
  "percentage-calculator": [
    { href: "/calculators/discount-calculator", label: "Discount Calculator", description: "Apply percentage discounts." },
    { href: "/calculators/gst-calculator", label: "GST Calculator", description: "GST is a percentage of price." },
    { href: "/calculators/tip-calculator", label: "Tip Calculator", description: "Tips are a percentage of the bill." },
    { href: "/calculators/cgpa-to-percentage-calculator", label: "CGPA to Percentage", description: "Convert CGPA to percentage." },
    { href: "/calculators/roi-calculator", label: "ROI Calculator", description: "ROI as a percentage of investment." },
  ],
  "loan-calculator": [
    { href: "/calculators/emi-calculator", label: "EMI Calculator", description: "Indian EMI calculator with INR." },
    { href: "/calculators/mortgage-calculator", label: "Mortgage Calculator", description: "Home loan specific calculator." },
    { href: "/calculators/compound-interest-calculator", label: "Compound Interest", description: "How interest compounds on loans." },
    { href: "/calculators/roi-calculator", label: "ROI Calculator", description: "Return on your investments." },
    { href: "/calculators/discount-calculator", label: "Discount Calculator", description: "Calculate discounts easily." },
  ],
  "discount-calculator": [
    { href: "/calculators/percentage-calculator", label: "Percentage Calculator", description: "Discounts are percentage off." },
    { href: "/calculators/gst-calculator", label: "GST Calculator", description: "Tax after discount." },
    { href: "/calculators/tip-calculator", label: "Tip Calculator", description: "Add tip to discounted bill." },
    { href: "/calculators/salary-calculator", label: "Salary Calculator", description: "Understand salary deductions." },
    { href: "/calculators/roi-calculator", label: "ROI Calculator", description: "ROI on discounted purchases." },
  ],
  "date-calculator": [
    { href: "/calculators/age-calculator", label: "Age Calculator", description: "Calculate exact age from DOB." },
    { href: "/calculators/sip-calculator", label: "SIP Calculator", description: "Plan investments by date range." },
    { href: "/calculators/emi-calculator", label: "EMI Calculator", description: "Loan tenure by dates." },
    { href: "/calculators/percentage-calculator", label: "Percentage Calculator", description: "Quick percentage math." },
    { href: "/tools/timestamp-converter", label: "Timestamp Converter", description: "Convert dates to Unix timestamps." },
  ],
  "cgpa-to-percentage-calculator": [
    { href: "/calculators/percentage-calculator", label: "Percentage Calculator", description: "General percentage calculations." },
    { href: "/calculators/gst-calculator", label: "GST Calculator", description: "Quick tax calculations." },
    { href: "/calculators/discount-calculator", label: "Discount Calculator", description: "Apply percentage discounts." },
    { href: "/calculators/age-calculator", label: "Age Calculator", description: "Calculate your age." },
    { href: "/calculators/bmi-calculator", label: "BMI Calculator", description: "Check your BMI." },
  ],
  "calorie-calculator": [
    { href: "/calculators/bmi-calculator", label: "BMI Calculator", description: "Body mass index calculator." },
    { href: "/calculators/body-fat-calculator", label: "Body Fat Calculator", description: "Estimate body fat percentage." },
    { href: "/calculators/age-calculator", label: "Age Calculator", description: "Age affects calorie needs." },
    { href: "/calculators/percentage-calculator", label: "Percentage Calculator", description: "Calculate macro percentages." },
    { href: "/calculators/tip-calculator", label: "Tip Calculator", description: "Split restaurant bills." },
  ],
  "body-fat-calculator": [
    { href: "/calculators/bmi-calculator", label: "BMI Calculator", description: "Compare with BMI." },
    { href: "/calculators/calorie-calculator", label: "Calorie Calculator", description: "Calorie targets for body composition." },
    { href: "/calculators/age-calculator", label: "Age Calculator", description: "Age affects body fat ranges." },
    { href: "/calculators/percentage-calculator", label: "Percentage Calculator", description: "Body fat is a percentage." },
    { href: "/calculators/discount-calculator", label: "Discount Calculator", description: "Calculate discounts." },
  ],
  "roi-calculator": [
    { href: "/calculators/sip-calculator", label: "SIP Calculator", description: "ROI from systematic investments." },
    { href: "/calculators/compound-interest-calculator", label: "Compound Interest", description: "Compounding drives ROI." },
    { href: "/calculators/fd-calculator", label: "FD Calculator", description: "FD returns calculation." },
    { href: "/calculators/loan-calculator", label: "Loan Calculator", description: "Cost of borrowing vs ROI." },
    { href: "/calculators/percentage-calculator", label: "Percentage Calculator", description: "ROI as a percentage." },
  ],
};

const toolItems: Record<string, RelatedItem[]> = {
  "json-formatter": [
    { href: "/tools/base64-encoder-decoder", label: "Base64 Encoder & Decoder", description: "Encode or decode Base64 strings." },
    { href: "/tools/hash-generator", label: "Hash Generator", description: "Compute MD5, SHA-256, and more." },
    { href: "/tools/regex-tester", label: "Regex Tester", description: "Test patterns with match highlighting." },
    { href: "/tools/uuid-generator", label: "UUID Generator", description: "Generate v4 UUIDs in bulk." },
    { href: "/tools/word-counter", label: "Word Counter", description: "Count words and characters." },
  ],
  "color-palette-generator": [
    { href: "/tools/qr-code-generator", label: "QR Code Generator", description: "Create QR codes for URLs." },
    { href: "/tools/lorem-ipsum-generator", label: "Lorem Ipsum Generator", description: "Placeholder text for designs." },
    { href: "/tools/password-generator", label: "Password Generator", description: "Generate strong passwords." },
    { href: "/tools/json-formatter", label: "JSON Formatter", description: "Format design token JSON." },
    { href: "/tools/word-counter", label: "Word Counter", description: "Count words in copy." },
  ],
  "regex-tester": [
    { href: "/tools/json-formatter", label: "JSON Formatter", description: "Format and validate JSON." },
    { href: "/tools/cron-expression-builder", label: "Cron Expression Builder", description: "Build cron schedules." },
    { href: "/tools/base64-encoder-decoder", label: "Base64 Encoder & Decoder", description: "Encode/decode Base64." },
    { href: "/tools/hash-generator", label: "Hash Generator", description: "Hash text with SHA-256." },
    { href: "/tools/word-counter", label: "Word Counter", description: "Count words and characters." },
  ],
  "privacy-policy-generator": [
    { href: "/tools/word-counter", label: "Word Counter", description: "Check policy word count." },
    { href: "/tools/lorem-ipsum-generator", label: "Lorem Ipsum Generator", description: "Placeholder text for drafts." },
    { href: "/tools/qr-code-generator", label: "QR Code Generator", description: "QR code to your privacy page." },
    { href: "/tools/json-formatter", label: "JSON Formatter", description: "Format structured data." },
    { href: "/tools/password-generator", label: "Password Generator", description: "Generate secure passwords." },
  ],
  "cron-expression-builder": [
    { href: "/tools/regex-tester", label: "Regex Tester", description: "Test patterns and expressions." },
    { href: "/tools/json-formatter", label: "JSON Formatter", description: "Format config JSON." },
    { href: "/tools/timestamp-converter", label: "Timestamp Converter", description: "Convert timestamps." },
    { href: "/tools/uuid-generator", label: "UUID Generator", description: "Generate unique IDs." },
    { href: "/tools/hash-generator", label: "Hash Generator", description: "Hash strings." },
  ],
  "word-counter": [
    { href: "/tools/lorem-ipsum-generator", label: "Lorem Ipsum Generator", description: "Generate placeholder text to count." },
    { href: "/tools/json-formatter", label: "JSON Formatter", description: "Format text-based data." },
    { href: "/tools/regex-tester", label: "Regex Tester", description: "Find patterns in text." },
    { href: "/tools/base64-encoder-decoder", label: "Base64 Encoder & Decoder", description: "Encode text to Base64." },
    { href: "/tools/privacy-policy-generator", label: "Privacy Policy Generator", description: "Generate policy documents." },
  ],
  "password-generator": [
    { href: "/tools/hash-generator", label: "Hash Generator", description: "Hash passwords with SHA-256." },
    { href: "/tools/uuid-generator", label: "UUID Generator", description: "Generate unique identifiers." },
    { href: "/tools/base64-encoder-decoder", label: "Base64 Encoder & Decoder", description: "Encode credentials safely." },
    { href: "/tools/qr-code-generator", label: "QR Code Generator", description: "Share credentials via QR." },
    { href: "/tools/regex-tester", label: "Regex Tester", description: "Validate password patterns." },
  ],
  "qr-code-generator": [
    { href: "/tools/password-generator", label: "Password Generator", description: "Generate Wi-Fi passwords." },
    { href: "/tools/base64-encoder-decoder", label: "Base64 Encoder & Decoder", description: "Encode QR data." },
    { href: "/tools/uuid-generator", label: "UUID Generator", description: "Unique IDs for QR tracking." },
    { href: "/tools/color-palette-generator", label: "Color Palette Generator", description: "Match QR colors to brand." },
    { href: "/tools/json-formatter", label: "JSON Formatter", description: "Format QR payload data." },
  ],
  "base64-encoder-decoder": [
    { href: "/tools/hash-generator", label: "Hash Generator", description: "Hash strings with SHA." },
    { href: "/tools/json-formatter", label: "JSON Formatter", description: "Format Base64-decoded JSON." },
    { href: "/tools/uuid-generator", label: "UUID Generator", description: "Generate UUIDs." },
    { href: "/tools/password-generator", label: "Password Generator", description: "Generate strong passwords." },
    { href: "/tools/regex-tester", label: "Regex Tester", description: "Validate encoded patterns." },
  ],
  "uuid-generator": [
    { href: "/tools/hash-generator", label: "Hash Generator", description: "Hash UUIDs for keys." },
    { href: "/tools/password-generator", label: "Password Generator", description: "Random strings for security." },
    { href: "/tools/base64-encoder-decoder", label: "Base64 Encoder & Decoder", description: "Encode UUIDs in Base64." },
    { href: "/tools/json-formatter", label: "JSON Formatter", description: "Format UUID JSON arrays." },
    { href: "/tools/timestamp-converter", label: "Timestamp Converter", description: "UUID v7 includes timestamps." },
  ],
  "hash-generator": [
    { href: "/tools/base64-encoder-decoder", label: "Base64 Encoder & Decoder", description: "Encode hash output." },
    { href: "/tools/password-generator", label: "Password Generator", description: "Generate passwords to hash." },
    { href: "/tools/uuid-generator", label: "UUID Generator", description: "Generate unique IDs." },
    { href: "/tools/json-formatter", label: "JSON Formatter", description: "Format hash data." },
    { href: "/tools/regex-tester", label: "Regex Tester", description: "Validate hash formats." },
  ],
  "lorem-ipsum-generator": [
    { href: "/tools/word-counter", label: "Word Counter", description: "Count generated placeholder words." },
    { href: "/tools/color-palette-generator", label: "Color Palette Generator", description: "Design palettes for mockups." },
    { href: "/tools/json-formatter", label: "JSON Formatter", description: "Format placeholder data." },
    { href: "/tools/privacy-policy-generator", label: "Privacy Policy Generator", description: "Generate policy templates." },
    { href: "/tools/qr-code-generator", label: "QR Code Generator", description: "Create QR codes." },
  ],
  "timestamp-converter": [
    { href: "/tools/cron-expression-builder", label: "Cron Expression Builder", description: "Schedule with cron." },
    { href: "/tools/json-formatter", label: "JSON Formatter", description: "Format API timestamps." },
    { href: "/tools/uuid-generator", label: "UUID Generator", description: "UUID v7 embeds timestamps." },
    { href: "/tools/base64-encoder-decoder", label: "Base64 Encoder & Decoder", description: "Encode date strings." },
    { href: "/tools/hash-generator", label: "Hash Generator", description: "Hash timestamped data." },
  ],
};

export function getRelatedCalculators(slug: string): RelatedItem[] {
  return calculatorItems[slug] ?? [];
}

export function getRelatedTools(slug: string): RelatedItem[] {
  return toolItems[slug] ?? [];
}
