import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | ToolPilot",
  description:
    "How ToolPilot collects, uses, and protects your information when you use our free online calculators and developer tools.",
  alternates: { canonical: "https://tool-pilot.in/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-sm font-medium text-primary">Legal</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated: March 21, 2026
      </p>

      <div className="mt-10 space-y-4 text-base leading-relaxed [&>h2]:mt-10 [&>h2]:scroll-mt-20 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-foreground [&>p:not(:first-of-type)]:text-muted-foreground">
        <p className="text-foreground">
          ToolPilot (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates{" "}
          <Link href="/" className="font-medium text-primary hover:underline">
            tool-pilot.in
          </Link>
          , a website that offers free online calculators and utility tools. This
          Privacy Policy explains how we handle information when you visit or use
          our services.
        </p>

        <h2>Data Collection</h2>
        <p>
          We design our tools to run primarily in your browser. Inputs you enter
          into calculators and utilities are processed locally when possible and
          are not intentionally stored on our servers as part of using the tool.
        </p>
        <p>
          Like most websites, we may automatically receive certain technical
          information when you access ToolPilot, such as your IP address, browser
          type, device type, general location derived from IP, referring URLs,
          and dates and times of access. This information helps us operate,
          secure, and improve the site.
        </p>
        <p>
          If you contact us by email or a form, we collect the information you
          choose to send (such as your name, email address, and message content)
          so we can respond.
        </p>

        <h2>Cookies &amp; Ads</h2>
        <p>
          We and our partners may use cookies, pixels, and similar technologies
          to remember preferences, measure traffic, and deliver relevant
          advertising.
        </p>
        <p>
          <strong className="text-foreground">Google AdSense:</strong> We may use
          Google AdSense to show ads. Google may use cookies and other
          technologies to serve ads based on your visits to ToolPilot and other
          sites. You can learn how Google uses data in Google&apos;s advertising
          policies and opt out of personalized ads through your Google account
          settings or industry opt-out tools where available.
        </p>
        <p>
          <strong className="text-foreground">Google Analytics:</strong> We may
          use Google Analytics to understand how visitors use our site (for
          example, pages viewed and general usage patterns). Google Analytics
          may set cookies and collect information as described in Google&apos;s
          privacy documentation. You can use browser settings, extensions, or
          Google&apos;s opt-out tools to limit analytics cookies.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          Our site may include links to third-party websites, embeds, or
          services that are not controlled by ToolPilot. Their collection and use
          of information are governed by their own privacy policies. We
          encourage you to review those policies when you leave our site or
          interact with third-party content.
        </p>

        <h2>Data Security</h2>
        <p>
          We take reasonable measures to protect information we hold against
          unauthorized access, loss, or misuse. No method of transmission over
          the internet or electronic storage is completely secure; we cannot
          guarantee absolute security.
        </p>

        <h2>Your Rights</h2>
        <p>
          Depending on where you live, you may have rights to access, correct,
          delete, or restrict certain processing of your personal information, or
          to object to processing or request portability. To exercise rights
          that apply to you, contact us using the details below. You may also
          have the right to lodge a complaint with a data protection authority.
        </p>

        <h2>Contact</h2>
        <p>
          If you have questions about this Privacy Policy or our data practices,
          please contact us at{" "}
          <a
            href="mailto:privacy@tool-pilot.in"
            className="font-medium text-primary hover:underline"
          >
            privacy@tool-pilot.in
          </a>
          .
        </p>
        <p>
          We may update this policy from time to time. The &quot;Last
          updated&quot; date at the top will change when we post revisions.
          Continued use of ToolPilot after changes means you accept the updated
          policy.
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
