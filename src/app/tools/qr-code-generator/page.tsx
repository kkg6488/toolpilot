"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import { cn } from "@/lib/utils";

type InputType = "url" | "text" | "email" | "phone" | "wifi";
type WifiEncryption = "WPA" | "WEP" | "None";

const INPUT_TYPES: { id: InputType; label: string }[] = [
  { id: "url", label: "URL" },
  { id: "text", label: "Text" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "wifi", label: "Wi-Fi" },
];

const SIZES = [200, 300, 400, 500] as const;

const inputClass =
  "mt-1 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20";

const labelClass = "text-sm font-medium text-foreground";

function escapeWifiField(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/"/g, '\\"');
}

function normalizeTel(raw: string): string {
  const t = raw.trim();
  if (!t) return "";
  if (t.startsWith("+")) {
    return `+${t.slice(1).replace(/\D/g, "")}`;
  }
  return t.replace(/\D/g, "");
}

function buildEncodedPayload(
  type: InputType,
  values: {
    url: string;
    text: string;
    email: string;
    phone: string;
    ssid: string;
    wifiPassword: string;
    wifiEnc: WifiEncryption;
  }
): string | null {
  switch (type) {
    case "url": {
      const u = values.url.trim();
      if (!u) return null;
      if (/^https?:\/\//i.test(u)) return u;
      return `https://${u}`;
    }
    case "text": {
      const t = values.text;
      return t.length > 0 ? t : null;
    }
    case "email": {
      const e = values.email.trim();
      if (!e) return null;
      return `mailto:${e}`;
    }
    case "phone": {
      const p = normalizeTel(values.phone);
      if (!p) return null;
      return `tel:${p}`;
    }
    case "wifi": {
      const ssid = values.ssid.trim();
      if (!ssid) return null;
      const s = escapeWifiField(ssid);
      if (values.wifiEnc === "None") {
        return `WIFI:T:nopass;S:${s};;`;
      }
      const enc = values.wifiEnc;
      const p = escapeWifiField(values.wifiPassword);
      return `WIFI:T:${enc};S:${s};P:${p};;`;
    }
    default:
      return null;
  }
}

export default function QrCodeGeneratorPage() {
  const [inputType, setInputType] = useState<InputType>("url");
  const [url, setUrl] = useState("https://tool-pilot.in");
  const [text, setText] = useState("Hello from ToolPilot");
  const [email, setEmail] = useState("hello@example.com");
  const [phone, setPhone] = useState("+1 555 123 4567");
  const [ssid, setSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiEnc, setWifiEnc] = useState<WifiEncryption>("WPA");
  const [size, setSize] = useState<(typeof SIZES)[number]>(300);
  const [genHint, setGenHint] = useState<string | null>(null);
  const [renderError, setRenderError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const encodedPayload = useMemo(
    () =>
      buildEncodedPayload(inputType, {
        url,
        text,
        email,
        phone,
        ssid,
        wifiPassword,
        wifiEnc,
      }),
    [inputType, url, text, email, phone, ssid, wifiPassword, wifiEnc]
  );

  const paintQr = useCallback(
    async (payload: string | null) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!payload) {
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        setRenderError(null);
        return;
      }
      try {
        await QRCode.toCanvas(canvas, payload, { width: size, margin: 2 });
        setRenderError(null);
      } catch {
        setRenderError("Could not generate this QR code. Try shorter or simpler content.");
      }
    },
    [size]
  );

  useEffect(() => {
    const t = window.setTimeout(() => {
      void paintQr(encodedPayload);
      if (encodedPayload) setGenHint(null);
    }, 280);
    return () => window.clearTimeout(t);
  }, [encodedPayload, size, paintQr]);

  const handleGenerate = () => {
    if (!encodedPayload) {
      setGenHint("Add valid content for the selected type to generate a QR code.");
      return;
    }
    setGenHint(null);
    void paintQr(encodedPayload);
  };

  const handleDownload = async () => {
    if (!encodedPayload) {
      setGenHint("Generate a QR code before downloading.");
      return;
    }
    setGenHint(null);
    try {
      const dataUrl = await QRCode.toDataURL(encodedPayload, { width: size, margin: 2 });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "toolpilot-qr-code.png";
      a.click();
    } catch {
      setGenHint("Download failed. Try again or adjust your content.");
    }
  };

  const tabClass = (active: boolean) =>
    cn(
      "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
      active
        ? "bg-primary text-primary-foreground"
        : "bg-muted text-muted-foreground hover:bg-muted/80"
    );

  const sizeBtnClass = (active: boolean) =>
    cn(
      "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
      active
        ? "bg-primary text-primary-foreground"
        : "bg-muted text-muted-foreground hover:bg-muted/80"
    );

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        <p className="text-sm font-medium text-primary">ToolPilot</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          QR code generator
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Create scannable QR codes for links, plain text, contact shortcuts, and Wi-Fi setup
          strings—rendered in your browser and downloadable as PNG.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="rounded-xl border border-border/60 bg-card p-6 shadow-md">
            <p className={labelClass}>Content type</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {INPUT_TYPES.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  className={tabClass(inputType === id)}
                  onClick={() => setInputType(id)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              {inputType === "url" && (
                <div>
                  <label htmlFor="qr-url" className={labelClass}>
                    URL
                  </label>
                  <input
                    id="qr-url"
                    className={inputClass}
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    inputMode="url"
                    autoComplete="url"
                  />
                </div>
              )}

              {inputType === "text" && (
                <div>
                  <label htmlFor="qr-text" className={labelClass}>
                    Text
                  </label>
                  <textarea
                    id="qr-text"
                    className={cn(inputClass, "min-h-[120px] resize-y")}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Any text or notes"
                  />
                </div>
              )}

              {inputType === "email" && (
                <div>
                  <label htmlFor="qr-email" className={labelClass}>
                    Email address
                  </label>
                  <input
                    id="qr-email"
                    type="email"
                    className={inputClass}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>
              )}

              {inputType === "phone" && (
                <div>
                  <label htmlFor="qr-phone" className={labelClass}>
                    Phone number
                  </label>
                  <input
                    id="qr-phone"
                    type="tel"
                    className={inputClass}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 555 000 0000"
                    autoComplete="tel"
                  />
                </div>
              )}

              {inputType === "wifi" && (
                <>
                  <div>
                    <label htmlFor="qr-ssid" className={labelClass}>
                      Network name (SSID)
                    </label>
                    <input
                      id="qr-ssid"
                      className={inputClass}
                      value={ssid}
                      onChange={(e) => setSsid(e.target.value)}
                      placeholder="My Wi-Fi"
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label htmlFor="qr-wifi-enc" className={labelClass}>
                      Encryption
                    </label>
                    <select
                      id="qr-wifi-enc"
                      className={inputClass}
                      value={wifiEnc}
                      onChange={(e) => setWifiEnc(e.target.value as WifiEncryption)}
                    >
                      <option value="WPA">WPA / WPA2</option>
                      <option value="WEP">WEP</option>
                      <option value="None">None (open network)</option>
                    </select>
                  </div>
                  {wifiEnc !== "None" && (
                    <div>
                      <label htmlFor="qr-wifi-pass" className={labelClass}>
                        Password
                      </label>
                      <input
                        id="qr-wifi-pass"
                        type="password"
                        className={inputClass}
                        value={wifiPassword}
                        onChange={(e) => setWifiPassword(e.target.value)}
                        placeholder="Wi-Fi password"
                        autoComplete="off"
                      />
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="mt-6">
              <p className={labelClass}>QR size (px)</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {SIZES.map((px) => (
                  <button
                    key={px}
                    type="button"
                    className={sizeBtnClass(size === px)}
                    onClick={() => setSize(px)}
                  >
                    {px}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleGenerate}
                className="rounded-xl border border-border bg-muted px-8 py-3 text-base font-semibold text-foreground shadow-sm transition-colors hover:bg-muted/80"
              >
                Generate
              </button>
              <button
                type="button"
                onClick={() => void handleDownload()}
                className="rounded-xl bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-md transition-opacity hover:opacity-95"
              >
                Download PNG
              </button>
            </div>

            {(genHint || renderError) && (
              <p
                className={cn(
                  "mt-4 text-sm",
                  renderError ? "text-destructive" : "text-muted-foreground"
                )}
                role={renderError ? "alert" : "status"}
              >
                {renderError ?? genHint}
              </p>
            )}
          </div>

          <div className="rounded-xl border border-border/60 bg-card p-6 shadow-md">
            <p className={labelClass}>Preview</p>
            <div className="mt-4 flex justify-center rounded-xl bg-white p-6">
              <canvas ref={canvasRef} className="max-w-full" aria-label="QR code preview" />
            </div>
            {!encodedPayload && (
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Enter content to see your QR code here.
              </p>
            )}
          </div>
        </div>

        <section className="mt-14 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">How it works</h2>
          <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
            <li>
              Pick a content type (URL, text, email, phone, or Wi-Fi) and fill in the fields. Your
              data stays in this tab—we encode it locally into a QR matrix.
            </li>
            <li>
              The preview updates shortly after you stop typing. Use Generate to redraw immediately,
              or change the pixel size to match print or screen use.
            </li>
            <li>
              Email and phone codes use standard <code className="text-foreground">mailto:</code> and{" "}
              <code className="text-foreground">tel:</code> formats. Wi-Fi codes follow the common{" "}
              <code className="text-foreground">WIFI:</code> string so phones can offer to join the network.
            </li>
            <li>
              Download PNG exports the same encoding at the selected size with a quiet zone (margin)
              for reliable scanning.
            </li>
          </ol>
        </section>

        <section className="mt-12 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">FAQ</h2>
          <div className="space-y-3">
            <details className="rounded-lg border border-border bg-card px-4 py-3">
              <summary className="cursor-pointer font-medium text-foreground">
                What is a QR code used for?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                A QR code stores text that cameras can read quickly. Typical uses include opening a
                website, sharing Wi-Fi details, or starting an email or phone call when the payload
                uses a recognized URI scheme.
              </p>
            </details>
            <details className="rounded-lg border border-border bg-card px-4 py-3">
              <summary className="cursor-pointer font-medium text-foreground">
                Are my URLs or passwords uploaded to ToolPilot?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                No. Generation runs entirely in your browser via the <code className="text-foreground">qrcode</code>{" "}
                library. Nothing you type is sent to our servers for this tool.
              </p>
            </details>
            <details className="rounded-lg border border-border bg-card px-4 py-3">
              <summary className="cursor-pointer font-medium text-foreground">
                Why won&apos;t my QR code scan?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Very long text, low contrast, or a size too small on paper can hurt reliability. Use
                a larger pixel size for printing, keep the code on a white background, and avoid
                cropping the quiet border around the pattern.
              </p>
            </details>
            <details className="rounded-lg border border-border bg-card px-4 py-3">
              <summary className="cursor-pointer font-medium text-foreground">
                Which phones can join Wi-Fi from a QR code?
              </summary>
              <p className="mt-2 text-sm text-muted-foreground">
                Most recent Android and iOS devices recognize <code className="text-foreground">WIFI:</code> QR payloads
                in the camera app. Exact behavior depends on OS version; open networks use{" "}
                <code className="text-foreground">nopass</code> in the encoded string.
              </p>
            </details>
          </div>
        </section>
      </div>
    </div>
  );
}
