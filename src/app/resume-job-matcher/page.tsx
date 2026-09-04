import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import {
  ArrowRight,
  HelpCircle,
  Search,
  CheckCircle2,
  AlertCircle,
  Target,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Resume Job Description Matcher — Keyword Gap & Relevancy Optimizer | Resumist",
  description:
    "Compare your resume against any job description to calculate keyword match rates, identify missing hard skills, and optimize bullet points for enterprise ATS filters.",
  alternates: {
    canonical: "https://resumist.app/resume-job-matcher",
  },
  openGraph: {
    title: "Resume Job Description Matcher — Keyword Gap & Relevancy Optimizer | Resumist",
    description:
      "Compare your resume against any job description to calculate keyword match rates and identify missing hard skills.",
    url: "https://resumist.app/resume-job-matcher",
  },
};

export default function ResumeJobMatcherLandingPage() {
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
        name: "Job Description Matcher",
        item: "https://resumist.app/resume-job-matcher",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does a resume job description matcher work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A resume job description matcher scans both your resume and a target job listing. It uses natural language tokenization to extract required technical competencies, software proficiencies, and domain keywords, then calculates an overlap percentage while flagging specific missing skills required by corporate recruiters.",
        },
      },
      {
        "@type": "Question",
        name: "What keyword match percentage should I aim for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Aim for a 75% to 85% keyword match rate. A 100% match often looks artificially stuffed to recruiters, whereas a match below 60% may cause your application to be filtered out before reaching a hiring manager.",
        },
      },
      {
        "@type": "Question",
        name: "Should I copy-paste keywords verbatim from the job description?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You should integrate keywords naturally within the context of your authentic achievements. Never copy-paste text in white font or list technologies you haven't used, as experienced recruiters and technical screeners quickly identify superficial keyword stuffing.",
        },
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg-canvas text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />

      <main className="flex-1 w-full pb-20">
        {/* Subheader */}
        <div className="w-full bg-surface border-b border-border-default px-4 sm:px-6 lg:px-12 py-5">
          <div className="max-w-5xl mx-auto">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-text-muted text-[11px] font-semibold uppercase tracking-wider mb-2">
              <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
              <span className="text-border-default">/</span>
              <span className="text-primary font-semibold">Resume Job Matcher</span>
            </nav>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-text-primary">
                  Resume Job Description Matcher &amp; Keyword Gap Engine
                </h1>
                <p className="text-sm sm:text-base text-text-muted max-w-3xl mt-2 leading-relaxed">
                  Bridge the gap between your resume and target job requisitions. Uncover missing role keywords and boost your candidate relevance score.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/job-matcher"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-text-inverse hover:opacity-95 shadow-sm transition"
                >
                  <span>Launch Matcher</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 pt-10 space-y-12">
          {/* Answer-First Box */}
          <section className="rounded-xl border border-primary-container/30 bg-surface p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
              <Target className="h-4 w-4" />
              <span>Direct Answer Definition</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
              How Does Resume Job Matching Work?
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              A <strong>Resume Job Matcher</strong> performs automated semantic comparison between a candidate&apos;s resume and a specific job posting. It breaks down the employer&apos;s requirements into three categories: <strong>Hard Technical Competencies</strong>, <strong>Domain Methodologies</strong>, and <strong>Core Responsibilities</strong>. By measuring exact and contextual keyword matches, it provides candidates with a quantitative match percentage and pinpoints exactly which high-priority qualifications are absent from their application.
            </p>
          </section>

          {/* 3-Step Process */}
          <section className="space-y-6">
            <div className="border-b border-border-default pb-4">
              <h2 className="text-2xl font-bold tracking-tight text-text-primary">
                The 3-Step Match &amp; Optimization Architecture
              </h2>
              <p className="text-xs sm:text-sm text-text-muted mt-1">
                How Resumist evaluates your candidate profile against enterprise job descriptions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl border border-border-default bg-surface p-6 space-y-3">
                <div className="h-9 w-9 rounded-lg bg-surface-container-low border border-border-default flex items-center justify-center text-primary">
                  <Search className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-text-primary">1. Requirement Tokenization</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Our system filters out generic boilerplate terms (&ldquo;self-starter&rdquo;, &ldquo;hard worker&rdquo;) to extract substantive criteria: programming frameworks, enterprise tools, industry certifications, and regulatory methodologies.
                </p>
              </div>

              <div className="rounded-xl border border-border-default bg-surface p-6 space-y-3">
                <div className="h-9 w-9 rounded-lg bg-surface-container-low border border-border-default flex items-center justify-center text-secondary">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-text-primary">2. Overlap &amp; Density Analysis</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  We cross-reference every token against your Work Experience, Projects, and Skills ledger to identify both direct matches and contextual equivalents (e.g., matching &ldquo;PostgreSQL&rdquo; to &ldquo;Relational SQL Databases&rdquo;).
                </p>
              </div>

              <div className="rounded-xl border border-border-default bg-surface p-6 space-y-3">
                <div className="h-9 w-9 rounded-lg bg-surface-container-low border border-border-default flex items-center justify-center text-status-danger">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-text-primary">3. Keyword Gap Diagnosis</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  The matcher highlights unmentioned high-priority skills that recruiters are actively searching for. You can incorporate these competencies into your bullet points before submitting.
                </p>
              </div>
            </div>
          </section>

          {/* Tactical Advice for High Match Rates */}
          <section className="rounded-xl border border-border-default bg-surface p-6 sm:p-8 space-y-6">
            <div className="border-b border-border-default pb-4">
              <h2 className="text-lg font-bold text-text-primary">
                3 Rules for Ethical, High-Converting Resume Tailoring
              </h2>
              <p className="text-xs text-text-muted mt-1">
                Maximize automated match rates without resorting to spammy tactics.
              </p>
            </div>

            <div className="space-y-4 text-xs text-text-secondary leading-relaxed">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-status-success shrink-0 mt-0.5" />
                <div>
                  <strong className="text-text-primary">Integrate Keywords Into Bullet Points, Not Just the Skills Section:</strong>
                  <p className="mt-0.5">
                    ATS algorithms and human screeners give higher weight to keywords demonstrated in active employment bullet points than to standalone items in a skills list. If a job emphasizes &ldquo;Kubernetes&rdquo;, describe how you deployed and scaled clusters in your experience section.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-status-success shrink-0 mt-0.5" />
                <div>
                  <strong className="text-text-primary">Mirror Standard Industry Acronyms &amp; Full Terms:</strong>
                  <p className="mt-0.5">
                    Different ATS parsers search for acronyms or spelled-out phrases inconsistently. Use both formats at least once where applicable (e.g., &ldquo;Search Engine Optimization (SEO)&rdquo; or &ldquo;Amazon Web Services (AWS)&rdquo;).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-status-success shrink-0 mt-0.5" />
                <div>
                  <strong className="text-text-primary">Never Use Hidden White-Text Keywords:</strong>
                  <p className="mt-0.5">
                    An outdated internet myth suggests pasting the entire job description in 1pt white font. Modern applicant tracking engines convert PDFs to plain text streams; recruiters immediately see the hidden text block, resulting in instant disqualification.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="space-y-4">
            <div className="border-b border-border-default pb-3">
              <h2 className="text-xl font-bold tracking-tight text-text-primary flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                <span>Frequently Asked Questions</span>
              </h2>
            </div>

            <div className="space-y-3">
              <div className="rounded-xl border border-border-default bg-surface p-5 space-y-2">
                <h3 className="text-sm font-semibold text-text-primary">
                  How does a resume job description matcher work?
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  A resume job description matcher scans both your resume and a target job listing. It uses natural language tokenization to extract required technical competencies, software proficiencies, and domain keywords, then calculates an overlap percentage while flagging specific missing skills required by corporate recruiters.
                </p>
              </div>

              <div className="rounded-xl border border-border-default bg-surface p-5 space-y-2">
                <h3 className="text-sm font-semibold text-text-primary">
                  What keyword match percentage should I aim for?
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Aim for a 75% to 85% keyword match rate. A 100% match often looks artificially stuffed to recruiters, whereas a match below 60% may cause your application to be filtered out before reaching a hiring manager.
                </p>
              </div>

              <div className="rounded-xl border border-border-default bg-surface p-5 space-y-2">
                <h3 className="text-sm font-semibold text-text-primary">
                  Should I copy-paste keywords verbatim from the job description?
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  You should integrate keywords naturally within the context of your authentic achievements. Never copy-paste text in white font or list technologies you haven&apos;t used, as experienced recruiters and technical screeners quickly identify superficial keyword stuffing.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl bg-primary text-text-inverse p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">
                Paste Your Target Job Description
              </h2>
              <p className="text-xs sm:text-sm text-text-inverse/85 max-w-xl">
                Match your resume against any job requisition in seconds. See your match score and uncover critical missing keywords.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/job-matcher"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-surface text-primary px-6 py-3 text-xs font-bold hover:bg-surface-container-low transition shadow-xs"
              >
                <span>Launch Job Matcher</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
