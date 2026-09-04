import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import {
  CheckCircle,
  ArrowRight,
  HelpCircle,
  FileSearch,
  CheckCircle2,
  TrendingUp,
  Percent,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free ATS Resume Checker & Score Calculator (2026) | Resumist",
  description:
    "Test your resume with our instant ATS score checker. Audits contact completeness, measurable STAR metrics, section formatting, and role keyword density against enterprise recruiter standards.",
  alternates: {
    canonical: "https://resumist.app/resume-ats-checker",
  },
  openGraph: {
    title: "Free ATS Resume Checker & Score Calculator (2026) | Resumist",
    description:
      "Test your resume with our instant ATS score checker. Audits contact completeness, measurable STAR metrics, section formatting, and role keyword density.",
    url: "https://resumist.app/resume-ats-checker",
  },
};

export default function ResumeAtsCheckerPage() {
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
        name: "ATS Resume Checker",
        item: "https://resumist.app/resume-ats-checker",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is an ATS Resume Score?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An ATS resume score is a quantitative rating (typically from 0 to 100) reflecting how easily an Applicant Tracking System can parse, extract, and match the information on a resume against a target job requisition. It measures contact data extraction, structural section hierarchy, quantifiable achievements, and keyword overlap.",
        },
      },
      {
        "@type": "Question",
        name: "What is considered a good ATS score?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A score of 80 or above is considered competitive for enterprise applicant systems. Scores between 70 and 79 represent valid layouts that typically lack measurable business outcomes or key skills. Scores below 70 indicate high risk of automated filtering due to structural parsing errors or severe keyword deficits.",
        },
      },
      {
        "@type": "Question",
        name: "Does Resumist store or sell my resume when I check my score?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Resumist processes your resume data locally in your browser's persistent client-side storage. Your personal information, employment history, and contact details are never monetized or sold to third-party data brokers.",
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
              <span className="text-primary font-semibold">ATS Resume Checker</span>
            </nav>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-text-primary">
                  Free ATS Resume Score Checker &amp; Diagnostic Audit
                </h1>
                <p className="text-sm sm:text-base text-text-muted max-w-3xl mt-2 leading-relaxed">
                  Evaluate your resume across 4 objective criteria used by Fortune 500 recruiting teams. Get actionable suggestions to achieve an 85+ score.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/ats-analyzer"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-text-inverse hover:opacity-95 shadow-sm transition"
                >
                  <span>Launch Analyzer</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 pt-10 space-y-12">
          {/* Answer-First Definition */}
          <section className="rounded-xl border border-primary-container/30 bg-surface p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
              <FileSearch className="h-4 w-4" />
              <span>Direct Answer Definition</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
              How Does an ATS Score Work?
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              An <strong>ATS Score</strong> is an algorithmic rating calculated by parsing engines to measure whether a candidate&apos;s resume meets essential automated criteria. The score evaluates four core components: <strong>Contact Identity completeness</strong>, <strong>Quantifiable STAR impact metrics</strong> (evidence of data, percentages, and dollar scale), <strong>Standard structural document hierarchy</strong> (single-column reading order and standard headings), and <strong>Role-specific skill keyword density</strong>. A high score guarantees that human recruiters see an accurate, compelling summary of your qualifications.
            </p>
          </section>

          {/* 4 Pillars Breakdown */}
          <section className="space-y-6">
            <div className="border-b border-border-default pb-4">
              <h2 className="text-2xl font-bold tracking-tight text-text-primary">
                The 4 Pillars of the Resumist ATS Diagnostic Engine
              </h2>
              <p className="text-xs sm:text-sm text-text-muted mt-1">
                Our algorithmic engine evaluates your resume against the exact criteria that corporate ATS platforms use to rank candidates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pillar 1 */}
              <div className="rounded-xl border border-border-default bg-surface p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Pillar 1 • 20 Points</span>
                  <span className="text-xs font-semibold text-text-muted">Identity Validation</span>
                </div>
                <h3 className="text-base font-bold text-text-primary">Contact &amp; Personal Ledger Completeness</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  ATS parsers must reliably extract five key fields: candidate full name, professional email address, direct phone number, geographical location (city/state), and verified LinkedIn/portfolio URLs. Resumes missing basic contact data or burying it inside headers/footers lose immediate ranking.
                </p>
                <div className="text-[11px] text-text-muted pt-2 border-t border-border-default flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5 text-status-success" />
                  <span>Resumist audits: Email syntax, Phone digits, Location, Social URLs</span>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="rounded-xl border border-border-default bg-surface p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary">Pillar 2 • 30 Points</span>
                  <span className="text-xs font-semibold text-text-muted">Quantifiable Impact</span>
                </div>
                <h3 className="text-base font-bold text-text-primary">Measurable Achievements &amp; STAR Metrics</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Corporate recruiters flag passive task lists as weak candidates. Resumist scans every bullet point for percentages (%), dollar metrics ($), team sizes, and performance multipliers following the STAR (Situation, Task, Action, Result) methodology.
                </p>
                <div className="text-[11px] text-text-muted pt-2 border-t border-border-default flex items-center gap-1.5">
                  <Percent className="h-3.5 w-3.5 text-secondary" />
                  <span>Resumist audits: Numbers, percentages, scale metrics, action verbs</span>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="rounded-xl border border-border-default bg-surface p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Pillar 3 • 25 Points</span>
                  <span className="text-xs font-semibold text-text-muted">Structural Compliance</span>
                </div>
                <h3 className="text-base font-bold text-text-primary">Layout Hierarchy &amp; Standard Sections</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Ensures all content is organized under recognized canonical section headers (<em>Experience</em>, <em>Education</em>, <em>Skills</em>). Detects and prevents multi-column layouts, tables, embedded graphics, and unusual glyphs that break reading stream order.
                </p>
                <div className="text-[11px] text-text-muted pt-2 border-t border-border-default flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-status-success" />
                  <span>Resumist audits: Canonical headers, chronological dates, single-column order</span>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="rounded-xl border border-border-default bg-surface p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-status-success">Pillar 4 • 25 Points</span>
                  <span className="text-xs font-semibold text-text-muted">Skill Relevancy</span>
                </div>
                <h3 className="text-base font-bold text-text-primary">Core Skill Density &amp; Indexability</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Calculates total technical and industry competencies cataloged on your document. Checks that skills are represented as discrete, searchable text strings rather than flattened images or un-indexed badge graphics.
                </p>
                <div className="text-[11px] text-text-muted pt-2 border-t border-border-default flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5 text-status-success" />
                  <span>Resumist audits: Hard skill counts, tool proficiency, boolean matchability</span>
                </div>
              </div>
            </div>
          </section>

          {/* Score Interpretation Rubric */}
          <section className="rounded-xl border border-border-default bg-surface p-6 sm:p-8 space-y-6">
            <div className="border-b border-border-default pb-4">
              <h2 className="text-lg font-bold text-text-primary">
                Understanding Your Resumist Score Bands
              </h2>
              <p className="text-xs text-text-muted mt-1">
                How recruiters interpret candidate scores across automated application pipelines.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-status-success/30 bg-surface-container-low p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-status-success">85 – 100</span>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-status-success/15 text-status-success">
                    Top Tier
                  </span>
                </div>
                <h3 className="text-xs font-bold text-text-primary">Recruiter Ready</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Flawless single-column hierarchy, robust metric-backed bullet points, complete contact credentials, and rich skill density. High likelihood of clearing automated screening.
                </p>
              </div>

              <div className="rounded-xl border border-secondary/30 bg-surface-container-low p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-secondary">70 – 84</span>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-secondary/15 text-secondary">
                    Moderate
                  </span>
                </div>
                <h3 className="text-xs font-bold text-text-primary">Needs Optimization</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Clean structure and parseable text, but bullet points lack quantifiable impact or key technical skills are missing. Revise bullet points to include percentages and metrics.
                </p>
              </div>

              <div className="rounded-xl border border-status-danger/30 bg-surface-container-low p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-status-danger">Below 70</span>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-status-danger/15 text-status-danger">
                    High Risk
                  </span>
                </div>
                <h3 className="text-xs font-bold text-text-primary">At Risk of Rejection</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Critical contact fields missing, empty sections, or total absence of measurable results. High probability of being ranked in the bottom quartile of applicant pools.
                </p>
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
                  What is an ATS Resume Score?
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  An ATS resume score is a quantitative rating (typically from 0 to 100) reflecting how easily an Applicant Tracking System can parse, extract, and match the information on a resume against a target job requisition. It measures contact data extraction, structural section hierarchy, quantifiable achievements, and keyword overlap.
                </p>
              </div>

              <div className="rounded-xl border border-border-default bg-surface p-5 space-y-2">
                <h3 className="text-sm font-semibold text-text-primary">
                  What is considered a good ATS score?
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  A score of 80 or above is considered competitive for enterprise applicant systems. Scores between 70 and 79 represent valid layouts that typically lack measurable business outcomes or key skills. Scores below 70 indicate high risk of automated filtering due to structural parsing errors or severe keyword deficits.
                </p>
              </div>

              <div className="rounded-xl border border-border-default bg-surface p-5 space-y-2">
                <h3 className="text-sm font-semibold text-text-primary">
                  Does Resumist store or sell my resume when I check my score?
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  No. Resumist processes your resume data locally in your browser&apos;s persistent client-side storage. Your personal information, employment history, and contact details are never monetized or sold to third-party data brokers.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl bg-primary text-text-inverse p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">
                Analyze Your Resume Score Now
              </h2>
              <p className="text-xs sm:text-sm text-text-inverse/85 max-w-xl">
                Get an instant diagnostic report breaking down your score across all 4 ATS pillars. Fix issues with one click in our unified builder.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/ats-analyzer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-surface text-primary px-6 py-3 text-xs font-bold hover:bg-surface-container-low transition shadow-xs"
              >
                <span>Check ATS Score Free</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
