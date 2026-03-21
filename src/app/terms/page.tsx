import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | ToolPilot",
  description:
    "Terms governing your use of ToolPilot’s free online calculators and developer tools, including disclaimers and limitations of liability.",
  alternates: { canonical: "https://tool-pilot.in/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-medium text-primary">Legal</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: March 21, 2026
      </p>

      <div className="mt-10 space-y-4 text-base leading-relaxed [&>h2]:mt-10 [&>h2]:scroll-mt-20 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-foreground [&>p:not(:first-of-type)]:text-muted-foreground">
        <p className="text-foreground">
          These Terms of Service (&quot;Terms&quot;) govern your access to and
          use of ToolPilot at{" "}
          <Link href="/" className="font-medium text-primary hover:underline">
            tool-pilot.in
          </Link>{" "}
          and any related services (collectively, the &quot;Service&quot;). By
          using the Service, you agree to these Terms.
        </p>

        <h2>Acceptance</h2>
        <p>
          If you do not agree to these Terms, do not use the Service. We may
          update these Terms from time to time; the &quot;Last updated&quot; date
          reflects the latest version. Your continued use after changes become
          effective constitutes acceptance of the revised Terms.
        </p>

        <h2>Service Description</h2>
        <p>
          ToolPilot provides free, browser-based calculators and utility tools
          for personal and professional convenience. Features, tools, and content
          may change or be discontinued without notice.
        </p>

        <h2>Use of Tools</h2>
        <p>
          You may use the Service only in compliance with applicable laws and
          these Terms. You agree not to misuse the Service, including by
          attempting to disrupt, overload, scrape, or reverse engineer the site
          in ways that harm performance or security, or to use automated means to
          access the Service in violation of our robots.txt or reasonable use
          expectations.
        </p>
        <p>
          Calculator and tool outputs are for informational purposes only and are
          not professional financial, legal, medical, or tax advice. You are
          responsible for verifying results and for any decisions you make based
          on the Service.
        </p>

        <h2>Ads</h2>
        <p>
          The Service may display advertisements provided by third parties,
          including through Google AdSense. We do not control third-party ads and
          are not responsible for their content or any sites or services they
          link to. Advertising partners may use cookies and similar technologies
          as described in our Privacy Policy.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          The Service, including its design, text, graphics, logos, and software
          (except open-source components), is owned by ToolPilot or its
          licensors and is protected by intellectual property laws. You receive a
          limited, non-exclusive, non-transferable license to access and use the
          Service for personal, non-commercial purposes. You may not copy,
          modify, distribute, or create derivative works from our materials
          without prior written permission, except as allowed by law.
        </p>

        <h2>Disclaimer</h2>
        <p>
          THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot;
          WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING
          IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
          PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL
          BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, TOOLPILOT AND ITS AFFILIATES,
          OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS WILL NOT BE LIABLE FOR ANY
          INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR
          ANY LOSS OF PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES,
          ARISING FROM YOUR USE OF OR INABILITY TO USE THE SERVICE, EVEN IF WE
          HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR TOTAL
          LIABILITY FOR ANY CLAIM ARISING OUT OF OR RELATING TO THE SERVICE WILL
          NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID US TO USE THE SERVICE
          IN THE TWELVE MONTHS BEFORE THE CLAIM (TYPICALLY ZERO FOR FREE USE) OR
          (B) ONE HUNDRED U.S. DOLLARS (USD $100), UNLESS APPLICABLE LAW REQUIRES
          OTHERWISE.
        </p>

        <h2>Changes</h2>
        <p>
          We may modify, suspend, or discontinue the Service or these Terms at
          any time. Where required by law, we will provide notice of material
          changes. Your continued use after changes take effect constitutes
          acceptance unless applicable law requires a different process.
        </p>

        <h2>Contact</h2>
        <p>
          For questions about these Terms, contact us at{" "}
          <a
            href="mailto:legal@tool-pilot.in"
            className="font-medium text-primary hover:underline"
          >
            legal@tool-pilot.in
          </a>
          .
        </p>
      </div>

      <p className="mt-10 text-sm text-muted-foreground">
        <Link href="/" className="text-primary hover:underline">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}
