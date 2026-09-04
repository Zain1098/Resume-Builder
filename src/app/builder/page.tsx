import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/common/Navbar";
import { BuilderClient } from "./BuilderClient";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://careercraft.vercel.app");

export const metadata: Metadata = {
  title: "Professional ATS Resume Builder Studio — 3-Pane Document Workspace",
  description:
    "Build machine-readable, ATS-compliant resumes with live A4 preview, real-time parser score diagnostics, STAR framework bullet point polishing, and vector PDF/DOCX downloads.",
  alternates: {
    canonical: `${siteUrl}/builder`,
  },
  openGraph: {
    title: "Professional ATS Resume Builder Studio | Resumist",
    description:
      "Precision 3-pane editorial resume builder with live ATS verification, section completion tracking, and clean PDF/Word exports.",
    url: `${siteUrl}/builder`,
    siteName: "Resumist",
    type: "website",
  },
};

export default function BuilderPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Resume Builder Studio",
        item: `${siteUrl}/builder`,
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg-canvas text-text-primary">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Interactive 3-Pane Studio */}
      <BuilderClient />

      {/* Crawlable Semantic Summary (for Search Crawlers & AI Discoverability) */}
      <div className="sr-only">
        <h2>About the Resumist 3-Pane Document Workspace</h2>
        <p>
          Resumist provides an editorial resume building studio engineered specifically to pass Applicant Tracking Systems (ATS) including Workday, Greenhouse, Taleo, and Lever.
        </p>
        <h3>Core Features:</h3>
        <ul>
          <li>Interactive 3-pane workspace: Document Outline, Section Editor, and Live A4 Preview</li>
          <li>Real-time ATS parser diagnostic scoring across keyword density, content quality, and format safety</li>
          <li>Factual STAR / XYZ bullet point optimization for quantifiable accomplishments</li>
          <li>Certified single-column machine-readable vector PDF and native DOCX exports</li>
          <li>4 ATS verified templates: Modern, Professional, Minimal, and Technical</li>
        </ul>
      </div>
    </div>
  );
}
