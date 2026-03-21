"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const mono =
  "[font-family:var(--font-jetbrains-mono),ui-monospace,monospace]";

const DATA_OPTIONS = [
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "address", label: "Address" },
  { id: "payment", label: "Payment information" },
  { id: "usage", label: "Usage data" },
  { id: "cookies", label: "Cookies" },
  { id: "location", label: "Location" },
  { id: "ip", label: "IP address" },
] as const;

const THIRD_PARTY_OPTIONS = [
  { id: "ga", label: "Google Analytics" },
  { id: "fb", label: "Facebook Pixel" },
  { id: "stripe", label: "Stripe" },
  { id: "paypal", label: "PayPal" },
  { id: "mailchimp", label: "Mailchimp" },
  { id: "sentry", label: "Sentry" },
  { id: "intercom", label: "Intercom" },
  { id: "hotjar", label: "Hotjar" },
] as const;

type BusinessType = "website" | "mobile" | "saas" | "ecommerce";

function buildPolicy(opts: {
  name: string;
  url: string;
  email: string;
  business: BusinessType;
  data: Set<string>;
  third: Set<string>;
  cookies: boolean;
  gdpr: boolean;
  ccpa: boolean;
}): string {
  const { name, url, email, business, data, third, cookies, gdpr, ccpa } =
    opts;
  const entity = name.trim() || "Your Company";
  const site = url.trim() || "https://example.com";
  const contact = email.trim() || "privacy@example.com";

  const product =
    business === "website"
      ? "this website"
      : business === "mobile"
        ? "our mobile application"
        : business === "saas"
          ? "our software-as-a-service platform"
          : "our e-commerce services";

  const dataList = DATA_OPTIONS.filter((d) => data.has(d.id)).map(
    (d) => d.label
  );
  const dataSection =
    dataList.length > 0
      ? dataList.join(", ")
      : "limited technical information as described below";

  const thirdList = THIRD_PARTY_OPTIONS.filter((t) => third.has(t.id)).map(
    (t) => t.label
  );

  const lines: string[] = [];

  lines.push(`PRIVACY POLICY`);
  lines.push(`Last updated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`);
  lines.push("");
  lines.push(
    `${entity} ("we", "us", or "our") operates ${product} (the "Service"), accessible at ${site}. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use the Service.`
  );
  lines.push("");
  lines.push(`1. Contact`);
  lines.push(
    `If you have questions about this policy or our practices, contact us at ${contact}.`
  );
  lines.push("");
  lines.push(`2. Information we collect`);
  lines.push(
    `We may collect information that you provide directly, information collected automatically, and information from third parties where permitted by law. Categories relevant to our Service may include: ${dataSection}.`
  );
  if (data.has("usage")) {
    lines.push(
      `Usage data may include device type, browser, pages viewed, referring URLs, and interaction events to operate and improve the Service.`
    );
  }
  if (data.has("payment")) {
    lines.push(
      `Payment information is processed by trusted payment processors. We do not store full payment card numbers on our servers where avoidance is technically feasible.`
    );
  }
  if (data.has("location") || data.has("ip")) {
    lines.push(
      `Technical identifiers such as IP address or approximate location may be used for security, analytics, and regulatory compliance.`
    );
  }
  lines.push("");
  lines.push(`3. How we use information`);
  lines.push(
    `We use collected information to provide, maintain, and improve the Service; communicate with you; process transactions; detect and prevent fraud and abuse; comply with legal obligations; and, where permitted, send relevant notices or marketing (which you may opt out of where required).`
  );
  lines.push("");
  lines.push(`4. Cookies and similar technologies`);
  if (cookies) {
    lines.push(
      `We use cookies and similar technologies to remember preferences, measure performance, and support essential functionality. You can control cookies through your browser settings; disabling cookies may affect certain features.`
    );
  } else {
    lines.push(
      `We limit the use of cookies and similar technologies to what is essential to operate the Service unless we notify you otherwise and obtain consent where required.`
    );
  }
  lines.push("");
  lines.push(`5. Sharing of information`);
  lines.push(
    `We may share information with service providers who assist us in operating the Service, with professional advisers where necessary, and when required by law or to protect rights and safety.`
  );
  if (thirdList.length) {
    lines.push(
      `Third-party tools and processors may include: ${thirdList.join(", ")}. Their use of information is governed by their respective privacy policies.`
    );
  }
  lines.push("");
  lines.push(`6. Data retention`);
  lines.push(
    `We retain information only as long as necessary for the purposes described in this policy, unless a longer period is required or permitted by law.`
  );
  lines.push("");
  lines.push(`7. Security`);
  lines.push(
    `We implement reasonable administrative, technical, and organizational measures designed to protect information. No method of transmission or storage is completely secure.`
  );
  lines.push("");
  lines.push(`8. International transfers`);
  lines.push(
    `If you access the Service from outside the country where we operate, your information may be transferred to and processed in countries that may have different data protection laws.`
  );
  lines.push("");
  lines.push(`9. Children's privacy`);
  lines.push(
    `The Service is not directed to children under 16 (or the minimum age required in your jurisdiction), and we do not knowingly collect personal information from children.`
  );
  lines.push("");
  lines.push(`10. Your choices`);
  lines.push(
    `You may request access, correction, or deletion of certain personal information subject to applicable law. You may unsubscribe from marketing communications using the instructions in those messages.`
  );
  lines.push("");

  let section = 11;
  if (gdpr) {
    lines.push(`${section}. GDPR (EEA/UK users)`);
    section++;
    lines.push(
      `If you are located in the European Economic Area or United Kingdom, we process personal data where we have a lawful basis such as contract performance, legitimate interests, legal obligation, or consent where required.`
    );
    lines.push(
      `You may have rights to access, rectify, erase, restrict, or object to certain processing, and to lodge a complaint with a supervisory authority. To exercise rights, contact ${contact}.`
    );
    lines.push("");
  }

  if (ccpa) {
    lines.push(`${section}. CCPA/CPRA (California residents)`);
    section++;
    lines.push(
      `California residents may have rights to know, delete, and correct personal information, and to opt out of certain sharing for cross-context behavioral advertising where applicable.`
    );
    lines.push(
      `We do not sell personal information as traditionally defined under the CCPA/CPRA. To submit requests, contact ${contact}.`
    );
    lines.push("");
  }

  lines.push(`${section}. Changes`);
  lines.push(
    `We may update this Privacy Policy from time to time. The updated version will be indicated by a revised "Last updated" date.`
  );
  lines.push("");
  lines.push(`Disclaimer`);
  lines.push(
    `This policy is generated for informational purposes and does not constitute legal advice. Have qualified counsel review your final policy.`
  );

  return lines.join("\n");
}

export default function PrivacyPolicyGeneratorPage() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("https://");
  const [contactEmail, setContactEmail] = useState("");
  const [business, setBusiness] = useState<BusinessType>("website");
  const [data, setData] = useState<Set<string>>(
    () => new Set(["name", "email", "cookies", "usage", "ip"])
  );
  const [third, setThird] = useState<Set<string>>(() => new Set(["ga"]));
  const [cookies, setCookies] = useState(true);
  const [gdpr, setGdpr] = useState(false);
  const [ccpa, setCcpa] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy policy");

  const policy = useMemo(
    () =>
      buildPolicy({
        name,
        url,
        email: contactEmail,
        business,
        data,
        third,
        cookies,
        gdpr,
        ccpa,
      }),
    [name, url, contactEmail, business, data, third, cookies, gdpr, ccpa]
  );

  const toggle = (set: Set<string>, id: string) => {
    const n = new Set(set);
    if (n.has(id)) n.delete(id);
    else n.add(id);
    return n;
  };

  const copyPolicy = async () => {
    try {
      await navigator.clipboard.writeText(policy);
      setCopyLabel("Copied!");
      setTimeout(() => setCopyLabel("Copy policy"), 2000);
    } catch {
      setCopyLabel("Copy policy");
    }
  };

  const downloadTxt = () => {
    const blob = new Blob([policy], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    const safe = (name.trim() || "privacy-policy")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    a.href = URL.createObjectURL(blob);
    a.download = `${safe || "privacy-policy"}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Privacy policy generator
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Answer a short questionnaire to produce a structured privacy policy
          draft. Review with legal counsel before publishing.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
          <Card className="border-0 bg-card shadow-md">
            <CardHeader>
              <CardTitle>Questionnaire</CardTitle>
              <CardDescription>
                Step through each section — selections update the preview live.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="biz-name">Website / app name</Label>
                <Input
                  id="biz-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Acme Inc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="biz-url">URL</Label>
                <Input
                  id="biz-url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className={mono}
                  placeholder="https://example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="biz-email">Contact email</Label>
                <Input
                  id="biz-email"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className={mono}
                  placeholder="privacy@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label>Business type</Label>
                <Select
                  value={business}
                  onValueChange={(v) => setBusiness(v as BusinessType)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="mobile">Mobile app</SelectItem>
                    <SelectItem value="saas">SaaS</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <fieldset className="space-y-2">
                <legend className="text-sm font-medium">Data collected</legend>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {DATA_OPTIONS.map((d) => (
                    <label
                      key={d.id}
                      className="flex cursor-pointer items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={data.has(d.id)}
                        onChange={() =>
                          setData((s) => toggle(s, d.id))
                        }
                        className="rounded border-input"
                      />
                      {d.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="space-y-2">
                <legend className="text-sm font-medium">
                  Third-party services
                </legend>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {THIRD_PARTY_OPTIONS.map((t) => (
                    <label
                      key={t.id}
                      className="flex cursor-pointer items-center gap-2 text-sm"
                    >
                      <input
                        type="checkbox"
                        checked={third.has(t.id)}
                        onChange={() =>
                          setThird((s) => toggle(s, t.id))
                        }
                        className="rounded border-input"
                      />
                      {t.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="space-y-3">
                <p className="text-sm font-medium">Compliance toggles</p>
                <label className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={cookies}
                    onChange={(e) => setCookies(e.target.checked)}
                    className="rounded border-input"
                  />
                  We use cookies beyond strictly necessary operations
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={gdpr}
                    onChange={(e) => setGdpr(e.target.checked)}
                    className="rounded border-input"
                  />
                  GDPR-focused section (EEA / UK)
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={ccpa}
                    onChange={(e) => setCcpa(e.target.checked)}
                    className="rounded border-input"
                  />
                  CCPA / CPRA section (California)
                </label>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card shadow-md lg:sticky lg:top-8">
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Generated policy</CardTitle>
                <CardDescription>Plain text — ready to edit.</CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="button" onClick={copyPolicy}>
                  {copyLabel}
                </Button>
                <Button type="button" variant="outline" onClick={downloadTxt}>
                  Download .txt
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                readOnly
                value={policy}
                className={cn(
                  "min-h-[520px] resize-y bg-muted text-sm leading-relaxed",
                  mono
                )}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
