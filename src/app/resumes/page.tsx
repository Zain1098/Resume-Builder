import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/common/Navbar";
import { ResumesClient } from "./ResumesClient";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://careercraft.vercel.app");

export const metadata: Metadata = {
  title: "Master Career Vault & Multi-Version Resume Ledger",
  description:
    "Maintain an immutable master profile of your complete career history. Branch job-specific tailored resumes, compare skill variances side-by-side, and track ATS scores.",
  alternates: {
    canonical: `${siteUrl}/resumes`,
  },
  openGraph: {
    title: "Master Career Vault & Multi-Version Resume Ledger | Resumist",
    description:
      "Maintain a single source of career truth and branch targeted resumes with side-by-side diff matrices.",
    url: `${siteUrl}/resumes`,
    siteName: "Resumist",
    type: "website",
  },
};

export default function ResumesPage() {
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
        name: "Master Career Vault",
        item: `${siteUrl}/resumes`,
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

      {/* Interactive Versions & Diff Ledger */}
      <ResumesClient />

      <div className="sr-only">
        <h2>About Master Career Vault &amp; Multi-Version Resume Ledger</h2>
        <p>
          Instead of overwriting one single resume document for every job application, Resumist provides a Master Career Vault.
          Candidates maintain their comprehensive career record (every project, role, metric, and skill) in an immutable master profile, and spawn lightweight, tailored copies targeted directly to specific job descriptions.
        </p>
      </div>
    </div>
  );
}
