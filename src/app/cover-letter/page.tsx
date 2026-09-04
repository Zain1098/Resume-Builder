import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/common/Navbar";
import { CoverLetterClient } from "./CoverLetterClient";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://careercraft.vercel.app");

export const metadata: Metadata = {
  title: "Targeted AI Cover Letter Studio — Factually Grounded",
  description:
    "Generate role-aligned, executive cover letters directly grounded in your verified resume achievements. Four distinct tones with zero AI hallucinations.",
  alternates: {
    canonical: `${siteUrl}/cover-letter`,
  },
  openGraph: {
    title: "Targeted AI Cover Letter Studio | Resumist",
    description:
      "Generate role-aligned, executive cover letters directly grounded in your verified resume achievements.",
    url: `${siteUrl}/cover-letter`,
    siteName: "Resumist",
    type: "website",
  },
};

export default function CoverLetterPage() {
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
        name: "Cover Letter Studio",
        item: `${siteUrl}/cover-letter`,
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

      <CoverLetterClient />

      <div className="sr-only">
        <h2>About Resumist Cover Letter Studio</h2>
        <p>
          Resumist automatically pairs your verified career experiences with job posting specifications to generate high-converting, professional cover letters. Choose from Professional, Confident, Concise, and Traditional writing tones.
        </p>
      </div>
    </div>
  );
}
