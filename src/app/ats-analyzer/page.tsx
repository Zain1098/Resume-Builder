import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/common/Navbar";
import { AtsAnalyzerClient } from "./AtsAnalyzerClient";
import Link from "next/link";
import { ShieldCheck, CheckCircle2, AlertTriangle, FileText, ArrowRight, HelpCircle } from "lucide-react";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://careercraft.vercel.app");

export const metadata: Metadata = {
  title: "Free ATS Resume Checker & Compatibility Score Calculator",
  description:
    "Test your resume against real ATS parsing algorithms (Workday, Greenhouse, Lever). Instant keyword gap analysis, format safety audits, and STAR bullet point optimization.",
  alternates: {
    canonical: `${siteUrl}/ats-analyzer`,
  },
  openGraph: {
    title: "Free ATS Resume Checker & Compatibility Score Calculator | Resumist",
    description:
      "Audit your resume's ATS compatibility score, extract keyword gaps, and inspect raw OCR text stream without formatting traps.",
    url: `${siteUrl}/ats-analyzer`,
    siteName: "Resumist",
    type: "website",
  },
};

const atsFaqs = [
  {
    question: "What is an ATS compatibility score?",
    answer:
      "An ATS compatibility score is a numerical evaluation (0–100%) indicating how effectively automated applicant tracking systems (such as Workday, Greenhouse, and Lever) can parse, categorize, and match your resume's text against specific job requirements.",
  },
  {
    question: "Why do multi-column resumes fail ATS scanners?",
    answer:
      "Most ATS text extractors read documents horizontally from left to right across the entire width of the page. When text is placed in two columns, the parser reads across both columns simultaneously, scrambling phone numbers, job titles, and dates into unreadable garble.",
  },
  {
    question: "How does Resumist detect keyword gaps?",
    answer:
      "Resumist extracts hard skills, software names, and domain certifications from your resume and compares them against target role expectations. Missing required and preferred skills are highlighted with recommendations on where to integrate them.",
  },
];

export default function AtsAnalyzerPage() {
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
        name: "ATS Analyzer",
        item: `${siteUrl}/ats-analyzer`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: atsFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* Interactive Client Studio */}
      <AtsAnalyzerClient />

      {/* Crawlable Answer-First Authority & Educational Section */}
      <section className="w-full bg-surface border-t border-border-default py-16 px-4 sm:px-6 lg:px-12 mt-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Answer-First Section */}
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-primary block">
              DIAGNOSTIC ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
              How Enterprise ATS Parsers Score Your Resume
            </h2>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              Applicant Tracking Systems (ATS) like Workday, Greenhouse, Taleo, and Lever convert uploaded resume files (PDF or DOCX) into raw unicode text streams. They extract sections based on standardized headings (e.g., <em>Experience</em>, <em>Education</em>, <em>Skills</em>) and index terms into structured candidate profiles.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-surface-container-low rounded-xl border border-border-default space-y-2">
              <div className="flex items-center gap-2 font-semibold text-xs text-text-primary">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>1. Single-Column Layout &amp; Text Layer</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Resumist enforces clean, single-column document hierarchies. Tables, canvas rasters, and multi-column CSS grids are eliminated so parsers read chronological dates and company names accurately.
              </p>
            </div>

            <div className="p-5 bg-surface-container-low rounded-xl border border-border-default space-y-2">
              <div className="flex items-center gap-2 font-semibold text-xs text-text-primary">
                <CheckCircle2 className="h-4 w-4 text-status-success" />
                <span>2. Semantic Keyword &amp; Acronym Matching</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Both full-form keywords and standard industry acronyms (e.g., &ldquo;Continuous Integration (CI/CD)&rdquo;, &ldquo;Search Engine Optimization (SEO)&rdquo;) are matched to prevent keyword drop-off during queries.
              </p>
            </div>

            <div className="p-5 bg-surface-container-low rounded-xl border border-border-default space-y-2">
              <div className="flex items-center gap-2 font-semibold text-xs text-text-primary">
                <AlertTriangle className="h-4 w-4 text-status-warning" />
                <span>3. Quantified Impact Metrics (XYZ Formula)</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Modern screening filters prioritize candidates who quantify achievements. Formula: <em>Accomplished [X] as measured by [Y] by doing [Z]</em>. Resumist detects weak bullets and offers 1-click polishing.
              </p>
            </div>

            <div className="p-5 bg-surface-container-low rounded-xl border border-border-default space-y-2">
              <div className="flex items-center gap-2 font-semibold text-xs text-text-primary">
                <FileText className="h-4 w-4 text-secondary" />
                <span>4. Machine-Readable PDF/Word Encoding</span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                Exported files contain selectable, true vector font text without flatten-to-image distortion, guaranteeing instant compliance with Workday OCR and Greenhouse parsers.
              </p>
            </div>
          </div>

          {/* Direct FAQs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">
              Frequently Asked Questions on ATS Compatibility
            </h3>
            <div className="space-y-3">
              {atsFaqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-surface-container-low rounded-xl border border-border-default p-4 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer font-semibold text-xs text-text-primary gap-4">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span>{faq.question}</span>
                    </div>
                    <span className="text-text-muted text-base transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="mt-2.5 pt-2.5 border-t border-border-default text-xs text-text-muted leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Bottom Link Cluster */}
          <div className="pt-6 border-t border-border-default flex flex-wrap items-center justify-between gap-4 text-xs">
            <Link
              href="/builder"
              className="inline-flex items-center gap-1.5 text-primary font-semibold hover:underline"
            >
              <span>Build or Edit Resume in Studio</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/guides/ats-friendly-resume-guide"
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              Read Full 2026 ATS Resume Formatting Guide →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
