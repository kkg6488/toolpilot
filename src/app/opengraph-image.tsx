import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ToolPilot — Free Online Calculators & Developer Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "#7c3aed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              color: "white",
              fontWeight: 800,
            }}
          >
            T
          </div>
          <span style={{ fontSize: "48px", fontWeight: 800, color: "white" }}>
            ToolPilot
          </span>
        </div>
        <div
          style={{
            fontSize: "28px",
            color: "#a5b4fc",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.4,
          }}
        >
          600+ Free Online Calculators, Converters & Developer Tools
        </div>
        <div
          style={{
            marginTop: "32px",
            display: "flex",
            gap: "16px",
          }}
        >
          {["Unit Converter", "EMI Calculator", "JSON Formatter", "QR Generator", "Password Gen"].map(
            (tool) => (
              <div
                key={tool}
                style={{
                  background: "rgba(124, 58, 237, 0.2)",
                  border: "1px solid rgba(124, 58, 237, 0.4)",
                  borderRadius: "12px",
                  padding: "8px 20px",
                  color: "#c4b5fd",
                  fontSize: "16px",
                }}
              >
                {tool}
              </div>
            )
          )}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            fontSize: "18px",
            color: "#6b7280",
          }}
        >
          tool-pilot.in — No sign-up required
        </div>
      </div>
    ),
    { ...size }
  );
}
