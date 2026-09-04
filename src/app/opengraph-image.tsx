import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Resumist — AI ATS Resume Builder & Career Vault";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#154539",
          color: "#F7F5F0",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle decorative border */}
        <div
          style={{
            position: "absolute",
            inset: "20px",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            borderRadius: "16px",
            pointerEvents: "none",
          }}
        />

        {/* Top bar: Brand & Badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "#2F5D50",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                color: "#FFFFFF",
                fontWeight: "bold",
              }}
            >
              R
            </div>
            <span style={{ fontSize: "28px", fontWeight: "700", letterSpacing: "-0.5px" }}>
              Resumist
            </span>
          </div>

          <div
            style={{
              padding: "6px 16px",
              borderRadius: "999px",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              fontSize: "14px",
              fontWeight: "600",
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "#A0D1C0",
            }}
          >
            Editorial Career Workspace
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "980px" }}>
          <h1
            style={{
              fontSize: "56px",
              fontWeight: "800",
              lineHeight: 1.15,
              letterSpacing: "-1.5px",
              margin: 0,
              color: "#FFFFFF",
            }}
          >
            AI ATS Resume Builder &amp; Verified Career Vault
          </h1>
          <p
            style={{
              fontSize: "22px",
              lineHeight: 1.4,
              color: "#DEDAD2",
              margin: 0,
              maxWidth: "880px",
            }}
          >
            Workday, Greenhouse &amp; Lever certified diagnostic scoring. Extract keyword gaps, factual bullet point tailoring with STAR/XYZ frameworks, and clean PDF/DOCX exports.
          </p>
        </div>

        {/* Bottom Feature Pill Row */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              fontSize: "14px",
              color: "#F3F0ED",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>✓</span> 100% Parser Safe Single-Column
          </div>
          <div
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              fontSize: "14px",
              color: "#F3F0ED",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>✓</span> Job Description Keyword Matcher
          </div>
          <div
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              fontSize: "14px",
              color: "#F3F0ED",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>✓</span> Zero AI Hallucinations
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
