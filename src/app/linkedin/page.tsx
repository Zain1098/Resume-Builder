import type { Metadata } from "next";
import { Navbar } from "@/components/common/Navbar";
import { LinkedInClient } from "./LinkedInClient";
import Link from "next/link";
import { ArrowRight, Search, CheckCircle2, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "AI LinkedIn Profile & Headline Studio — Recruiter Search Optimization | Resumist",
  description:
    "Transform your resume into high-impact LinkedIn headlines, recruiter-optimized About narratives, and endorsement keywords aligned directly with your career ledger.",
  alternates: {
    canonical: "https://resumist.app/linkedin",
  },
  openGraph: {
    title: "AI LinkedIn Profile & Headline Studio — Recruiter Search Optimization | Resumist",
    description:
      "Transform your resume into high-impact LinkedIn headlines, recruiter-optimized About narratives, and endorsement keywords.",
    url: "https://resumist.app/linkedin",
  },
};

export default function LinkedInPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://resumist.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "LinkedIn Studio",
        item: "https://resumist.app/linkedin",
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg-canvas text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar />

      <main className="flex-1 w-full pb-16">
        {/* Top Context Subheader */}
        <div className="w-full bg-surface border-b border-border-default px-4 sm:px-6 lg:px-12 py-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-text-muted text-[11px] font-semibold uppercase tracking-wider">
                <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
                <span className="text-border-default">/</span>
                <span className="text-primary font-semibold">LinkedIn Optimizer</span>
              </nav>
              <div className="flex items-baseline gap-3 mt-1">
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
                  LinkedIn Profile &amp; Headline Studio
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-surface-container-low text-text-muted border border-border-default">
                  Recruiter SEO
                </span>
              </div>
              <p className="text-xs sm:text-sm text-text-muted max-w-3xl mt-0.5">
                Generate factually grounded LinkedIn headlines, recruiter-optimized About narratives, and endorsement keywords aligned directly with your career ledger.
              </p>
            </div>
          </div>
        </div>

        {/* Studio Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 pt-8 space-y-8">
          <LinkedInClient />

          {/* Recruiter Search Engine Optimization Guide */}
          <section className="mt-12 rounded-xl border border-border-default bg-surface p-6 sm:p-8 space-y-6">
            <div className="border-b border-border-default pb-4">
              <h2 className="text-lg font-bold text-text-primary">
                How LinkedIn Recruiter Search Works: 3 Mechanics for Top Visibility
              </h2>
              <p className="text-xs text-text-muted mt-1">
                LinkedIn operates an internal search engine prioritizing profile completeness, keyword density in key fields, and headline click-through rates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-text-secondary leading-relaxed">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-semibold text-text-primary">
                  <Search className="h-4 w-4 text-primary" />
                  <span>1. Boolean Headline Indexing</span>
                </div>
                <p>
                  Recruiters search using boolean strings (e.g., &ldquo;Senior Frontend&rdquo; AND &ldquo;Next.js&rdquo;). Your headline is weighted heavily in initial ranking passes; include specific technical stacks and business outcomes rather than generic buzzwords.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 font-semibold text-text-primary">
                  <CheckCircle2 className="h-4 w-4 text-secondary" />
                  <span>2. The 3-Line Hook Rule</span>
                </div>
                <p>
                  On desktop and mobile, LinkedIn truncates the &lsquo;About&rsquo; section after approximately 3 lines (250 characters). Resumist crafts an immediate executive hook highlighting your core discipline, career metrics, and current focus before the &ldquo;see more&rdquo; fold.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 font-semibold text-text-primary">
                  <ShieldCheck className="h-4 w-4 text-status-success" />
                  <span>3. Skill Graph Verification</span>
                </div>
                <p>
                  LinkedIn&apos;s candidate matching matches job post requirements directly to the top 50 skills on your profile. Resumist extracts prioritized technical competencies from your resume to maximize your match percentage on automated job postings.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-border-default flex flex-wrap gap-4 items-center justify-between text-xs">
              <span className="text-text-muted">Explore synchronized career tools:</span>
              <div className="flex items-center gap-4 font-semibold">
                <Link href="/ats-analyzer" className="text-primary hover:underline inline-flex items-center gap-1">
                  ATS Resume Checker <ArrowRight className="h-3 w-3" />
                </Link>
                <Link href="/job-matcher" className="text-primary hover:underline inline-flex items-center gap-1">
                  Job Matcher <ArrowRight className="h-3 w-3" />
                </Link>
                <Link href="/builder" className="text-primary hover:underline inline-flex items-center gap-1">
                  Resume Builder <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

