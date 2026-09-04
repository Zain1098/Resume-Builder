import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/common/Navbar";
import {
  CheckCircle2,
  Check,
  Download,
  FileText,
  SlidersHorizontal,
  ShieldCheck,
  FolderLock,
  Edit3,
  FileCheck,
  Database,
  Search,
  ArrowLeftRight,
  ArrowRight,
  HelpCircle,
  BookOpen,
  Upload,
} from "lucide-react";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://careercraft.vercel.app");

export const metadata: Metadata = {
  title: "Resumist — AI ATS Resume Builder, Score Checker & Job Tailor",
  description:
    "Build high-scoring ATS-friendly resumes in minutes. Real-time ATS parser diagnostic scoring, job description keyword gap matching, factual STAR/XYZ tailoring, and clean PDF/DOCX exports.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Resumist — AI ATS Resume Builder, Score Checker & Job Tailor",
    description:
      "Transform your career search with certified ATS resume scoring, job description keyword gap matching, and clean PDF/Word exports.",
    url: siteUrl,
    siteName: "Resumist",
    type: "website",
  },
};

const faqs = [
  {
    question: "What is an ATS Resume Builder?",
    answer:
      "An ATS (Applicant Tracking System) resume builder structures, formats, and checks your resume so enterprise recruiting software (such as Workday, Greenhouse, Taleo, and Lever) can parse your text accurately. It ensures single-column layout, standard heading hierarchies, machine-readable text layers, and accurate keyword alignment.",
  },
  {
    question: "How does Resumist analyze and score my resume?",
    answer:
      "Resumist scores your resume across four core diagnostic dimensions: (1) Keyword Parity against target job descriptions, (2) Content Quality evaluated by action verbs and quantifiable metrics, (3) Format Safety verifying standard headings and parser-safe structures, and (4) Competency Alignment separating required from preferred skills.",
  },
  {
    question: "Can I export my resume to PDF and DOCX without formatting breakage?",
    answer:
      "Yes. Resumist generates clean, single-layer vector PDFs with selectable, parseable text, as well as native DOCX files configured specifically for strict enterprise applicant tracking systems with zero table clipping or OCR distortion.",
  },
  {
    question: "Does the AI invent or hallucinate career experience?",
    answer:
      "No. Resumist adheres strictly to a fact-grounded architecture. The AI only reorganizes, polishes, and aligns your authentic, verified career history using the STAR (Situation, Task, Action, Result) and XYZ frameworks. It never fabricates companies, degrees, dates, or false skills.",
  },
  {
    question: "What is the difference between a Master Career Vault and Tailored Resumes?",
    answer:
      "Your Master Career Vault is your comprehensive repository containing every position, project, and metric from your entire career. When applying for a job, Resumist lets you branch off targeted resumes tailored to that specific job description while keeping your master records pristine.",
  },
  {
    question: "Is Resumist free to build and export resumes?",
    answer:
      "Yes. Resumist provides full access to resume building, real-time ATS compatibility scoring, job description matching, and vector PDF/DOCX downloads with zero watermarks or hidden export paywalls.",
  },
];

export default function LandingPage() {
  const steps = [
    {
      num: "01",
      title: "Master Career Vault",
      desc: "Store your entire career record, raw achievements, metrics, and skills in one immutable source of truth.",
      badge: "Zero re-typing on future applications",
      icon: Database,
    },
    {
      num: "02",
      title: "Target Job Analysis",
      desc: "Paste job specifications to deconstruct core requirements, seniority signals, and keyword priorities.",
      badge: "Calibrated against JD semantic trees",
      icon: Search,
    },
    {
      num: "03",
      title: "ATS Gap Analysis",
      desc: "Real-time diagnostic comparison highlighting missing competencies, soft phrase traps, and phrasing mismatches.",
      badge: "Verified parsing engine benchmarks",
      icon: ArrowLeftRight,
    },
    {
      num: "04",
      title: "AI Tailoring & Export",
      desc: "Generate contextual, role-aligned resumes exported directly to cleanly styled, machine-readable PDF or DOCX.",
      badge: "Strict single-layer text architecture",
      icon: FileCheck,
    },
  ];

  const features = [
    {
      category: "SEMANTIC ANALYSIS",
      icon: ShieldCheck,
      title: "Context-Aware ATS Diagnostic",
      desc: "Scores against real ATS parsing engines (Workday, Greenhouse, Lever). Pinpoints keyword density, missing technical terminology, and structural formatting errors before you apply.",
      stat: "100% Parser Compliant",
    },
    {
      category: "CAREER REPOSITORY",
      icon: FolderLock,
      title: "Master Career Vault & Ledger",
      desc: "Maintain a single immutable baseline archive of your full professional history. Branch into customized, job-specific tailored documents with version diffing.",
      stat: "Multi-Version Branching",
    },
    {
      category: "EDITORIAL INTEGRITY",
      icon: Edit3,
      title: "STAR / XYZ Impact Optimizer",
      desc: "Transforms passive task descriptions into quantified achievements (Situation, Task, Action, Result) calibrated to senior-level hiring expectations without false claims.",
      stat: "Metric-Driven Proof",
    },
    {
      category: "MACHINE READABLE",
      icon: FileText,
      title: "Deterministic Vector PDF & DOCX",
      desc: "Single-column layouts without nested tables, canvas rasters, or non-standard fonts that break applicant tracking parsers. Guaranteed human and machine readable.",
      stat: "Clean Selectable Text",
    },
  ];

  const comparisonRows = [
    {
      dimension: "Formatting Architecture",
      resumist: "Single-column semantic hierarchy, zero parsing traps",
      generic: "Multi-column tables, text boxes that fail ATS OCR",
    },
    {
      dimension: "Content Tailoring",
      resumist: "Targeted to specific JD keywords via STAR/XYZ formulas",
      generic: "Superficial keyword stuffing or generic AI fluff",
    },
    {
      dimension: "Fact Grounding",
      resumist: "Strict zero-hallucination policy locked to verified Vault",
      generic: "Uncontrolled AI generation inventing false metrics",
    },
    {
      dimension: "Export Integrity",
      resumist: "Direct vector PDF + editable DOCX with clean text layer",
      generic: "Flattened image PDFs or locked paywalled downloads",
    },
    {
      dimension: "Version Control",
      resumist: "Master vault branching with side-by-side delta matrices",
      generic: "Single mutable file that gets overwritten repeatedly",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
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
          __html: JSON.stringify(faqSchema),
        }}
      />

      <main className="flex-1 w-full">
        {/* HERO SECTION */}
        <section className="w-full bg-surface border-b border-border-default pt-14 pb-16 px-4 sm:px-6 lg:px-12">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            {/* Editorial Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low border border-border-default text-text-muted text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>EDITORIAL CAREER WORKSPACE • ATS PARSER CERTIFIED</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-text-primary mb-4 leading-[1.15]">
              Build an ATS-Friendly Resume That Matches the Job.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-text-muted max-w-2xl mb-8 leading-relaxed">
              Precision job description keyword tailoring, real-time ATS diagnostic scoring, and Master Career Vault management. Built for experienced candidates who need factual substance over AI buzzwords.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-6 w-full sm:w-auto">
              <Link
                href="/builder"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-primary-container text-on-primary text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-primary transition-colors shadow-xs"
              >
                Launch Resume Studio
              </Link>
              <Link
                href="/builder?action=import"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-surface border border-primary/40 text-primary hover:bg-primary-fixed/20 text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-xs gap-2"
              >
                <Upload className="h-4 w-4" />
                <span>Upload Existing CV (PDF / JSON)</span>
              </Link>
              <Link
                href="/ats-analyzer"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-surface border border-border-default text-text-primary text-xs sm:text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-surface-container-low transition-colors shadow-xs"
              >
                Run Free ATS Score Audit
              </Link>
            </div>

            {/* New User Guided Flow Steps (SEO + Human Friendly) */}
            <div className="w-full max-w-2xl mx-auto mb-6 p-3.5 sm:p-4 rounded-xl border border-border-default bg-surface/90 text-left shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="text-[11px] font-bold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
                  New Here? How To Build &amp; Optimize in 3 Simple Steps:
                </span>
                <span className="text-[10px] text-text-muted hidden sm:inline">No account required</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-surface-container-low border border-border-default/60">
                  <div className="font-semibold text-primary flex items-center gap-1 mb-0.5">
                    <span className="w-4 h-4 rounded-full bg-primary-fixed/40 text-primary flex items-center justify-center text-[10px] font-bold">1</span>
                    <span>Import or Start Fresh</span>
                  </div>
                  <p className="text-text-muted text-[11px] leading-relaxed">
                    Upload your existing PDF/JSON or pick a clean, single-column ATS template.
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-low border border-border-default/60">
                  <div className="font-semibold text-primary flex items-center gap-1 mb-0.5">
                    <span className="w-4 h-4 rounded-full bg-primary-fixed/40 text-primary flex items-center justify-center text-[10px] font-bold">2</span>
                    <span>Check &amp; Tailor Score</span>
                  </div>
                  <p className="text-text-muted text-[11px] leading-relaxed">
                    Watch your ATS score reach 90%+ with real-time keyword and formatting checks.
                  </p>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container-low border border-border-default/60">
                  <div className="font-semibold text-primary flex items-center gap-1 mb-0.5">
                    <span className="w-4 h-4 rounded-full bg-primary-fixed/40 text-primary flex items-center justify-center text-[10px] font-bold">3</span>
                    <span>Download Clean PDF</span>
                  </div>
                  <p className="text-text-muted text-[11px] leading-relaxed">
                    Export certified single-column vector PDF or portable career ledger JSON.
                  </p>
                </div>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-text-muted text-xs">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-status-success" />
                Single-Column Vector PDF &amp; DOCX
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-status-success" />
                Workday &amp; Greenhouse Verified
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-status-success" />
                Zero Hallucinations Guarantee
              </span>
            </div>
          </div>

          {/* AUTHENTIC WORKSPACE PREVIEW CONTAINER */}
          <div className="w-full bg-surface border border-border-default rounded-xl overflow-hidden shadow-sm max-w-5xl mx-auto mt-12">
            {/* Top Utility Header */}
            <div className="px-4 sm:px-5 py-3 border-b border-border-default bg-surface-container-low flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className="h-4 w-4 text-text-muted shrink-0" />
                <span className="font-medium text-text-primary truncate">
                  Senior Product Manager - Stripe Application.pdf
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-primary-fixed/30 text-primary text-[11px] font-semibold">
                  ATS Match: 94%
                </span>
              </div>
              <div className="flex items-center gap-2 text-text-muted text-xs">
                <span className="hidden md:inline">Target: Payments Infrastructure</span>
                <span className="hidden md:inline text-border-default">|</span>
                <Link
                  href="/builder"
                  className="px-2.5 py-1 bg-surface border border-border-default rounded text-text-primary font-medium hover:bg-surface-container transition-colors inline-flex items-center gap-1 text-[11px]"
                >
                  <Download className="h-3 w-3" /> Export PDF
                </Link>
                <Link
                  href="/builder"
                  className="px-2.5 py-1 bg-surface border border-border-default rounded text-text-primary font-medium hover:bg-surface-container transition-colors inline-flex items-center gap-1 text-[11px]"
                >
                  <SlidersHorizontal className="h-3 w-3" /> Adjust Layout
                </Link>
              </div>
            </div>

            {/* Main Workspace Split Pane */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border-default bg-surface">
              {/* Left Document Sheet Preview (7 Cols) */}
              <div className="lg:col-span-7 p-5 sm:p-7 bg-surface text-text-primary flex flex-col text-xs leading-relaxed">
                <div className="border-b border-border-default pb-3.5 mb-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                    <span className="text-lg font-semibold tracking-tight text-text-primary">
                      Elena Rostova
                    </span>
                    <span className="text-text-muted text-[11px]">
                      New York, NY • elena.rostova@gmail.com
                    </span>
                  </div>
                  <p className="text-primary font-medium text-xs mt-0.5">
                    Staff Product Manager • Platform Systems &amp; Monetization
                  </p>
                </div>

                {/* Section 1: Summary */}
                <div className="mb-4">
                  <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase mb-1 block">
                    PROFESSIONAL SUMMARY
                  </span>
                  <p className="text-text-primary">
                    Product lead with 8+ years scaling financial checkout infrastructure and multi-tenant ledger services. Led cross-functional platform teams handling{" "}
                    <span className="bg-primary-fixed/30 text-primary px-1 rounded font-medium">
                      $4.2B in annual GMV
                    </span>{" "}
                    with 99.995% transaction reliability. Expert in double-entry transactional ledgers, idempotency keys, and PCI-DSS compliance.
                  </p>
                </div>

                {/* Section 2: Experience */}
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase block">
                    VERIFIED EXPERIENCE
                  </span>
                  <div>
                    <div className="flex justify-between font-semibold text-text-primary">
                      <span>Principal Product Manager • Stripe, Inc.</span>
                      <span className="text-text-muted font-normal text-[11px]">2022 - Present</span>
                    </div>
                    <ul className="mt-1 space-y-1 text-text-muted pl-3.5 list-disc">
                      <li>
                        Architected multi-currency settlement engine supporting 45 currencies, reducing foreign FX dispute rate by{" "}
                        <strong className="text-text-primary">31%</strong> across Tier-1 enterprise merchants.
                      </li>
                      <li>
                        Authored unified schema spec for distributed idempotency guarantees, preventing duplicate capture attempts across{" "}
                        <strong className="text-text-primary">14M daily requests</strong>.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Diagnostic Inspector Panel (5 Cols) */}
              <div className="lg:col-span-5 p-5 sm:p-6 bg-surface-container-low flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-border-default">
                    <span className="text-xs font-semibold uppercase tracking-wider text-text-primary flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      ATS Diagnostic Audit
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-status-success/15 text-status-success">
                      Tier 1: Exceptional
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full border-4 border-primary flex items-center justify-center font-bold text-xl text-primary shrink-0">
                      94%
                    </div>
                    <div className="text-xs space-y-0.5">
                      <p className="font-semibold text-text-primary">Parity Verified</p>
                      <p className="text-text-muted text-[11px]">
                        Matches 17 of 18 critical JD terms. Zero parsing anomalies detected.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2.5">
                    <div className="p-2.5 bg-surface rounded-lg border border-border-default text-xs space-y-1">
                      <div className="flex justify-between font-medium">
                        <span className="text-text-muted">Target Keyword Match</span>
                        <span className="text-primary font-bold">96% (17/18)</span>
                      </div>
                      <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: "96%" }} />
                      </div>
                    </div>

                    <div className="p-2.5 bg-surface rounded-lg border border-border-default text-xs space-y-1">
                      <div className="flex justify-between font-medium">
                        <span className="text-text-muted">Format &amp; Layout Health</span>
                        <span className="text-status-success font-bold">100% Safe</span>
                      </div>
                      <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                        <div className="bg-status-success h-full rounded-full" style={{ width: "100%" }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-border-default flex items-center justify-between text-[11px] text-text-muted">
                  <span>Engine: Workday / Greenhouse</span>
                  <Link href="/ats-analyzer" className="text-primary font-semibold hover:underline">
                    View Full Diagnostic →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4-STEP INTELLIGENT WORKFLOW */}
        <section className="w-full py-16 px-4 sm:px-6 lg:px-12 border-b border-border-default bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2 block">
                METHODOLOGY &amp; WORKFLOW
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
                How Modern ATS Optimization Works
              </h2>
              <p className="text-xs sm:text-sm text-text-muted mt-2">
                A structured, four-step pipeline that preserves factual integrity while maximizing parser visibility.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {steps.map((step) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={step.num}
                    className="p-5 bg-surface rounded-xl border border-border-default flex flex-col justify-between shadow-xs space-y-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold font-mono text-primary/40">
                          {step.num}
                        </span>
                        <div className="h-8 w-8 rounded-lg bg-surface-container-low border border-border-default flex items-center justify-center text-primary">
                          <IconComponent className="h-4 w-4" />
                        </div>
                      </div>
                      <h3 className="text-sm font-semibold text-text-primary">{step.title}</h3>
                      <p className="text-xs text-text-muted leading-relaxed">{step.desc}</p>
                    </div>

                    <div className="pt-3 border-t border-border-default">
                      <span className="text-[10px] font-medium text-primary bg-primary-fixed/30 px-2 py-0.5 rounded inline-block">
                        {step.badge}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4-CARD CORE CAPABILITIES GRID */}
        <section className="w-full py-16 px-4 sm:px-6 lg:px-12 border-b border-border-default bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2 block">
                ENGINEERED ARCHITECTURE
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
                Built to Outperform Generic Resume Builders
              </h2>
              <p className="text-xs sm:text-sm text-text-muted mt-2">
                Every component is calibrated for machine parsing compliance and executive readability.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {features.map((feat, idx) => {
                const IconComponent = feat.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 bg-surface-container-low rounded-xl border border-border-default flex flex-col justify-between space-y-4 shadow-xs"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold tracking-wider text-text-muted uppercase">
                          {feat.category}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-surface border border-border-default text-primary">
                          {feat.stat}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-surface border border-border-default flex items-center justify-center text-primary shrink-0">
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <h3 className="text-base font-semibold text-text-primary">{feat.title}</h3>
                      </div>
                      <p className="text-xs text-text-muted leading-relaxed">{feat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* COMPARISON CRITERIA LEDGER */}
        <section className="w-full py-16 px-4 sm:px-6 lg:px-12 border-b border-border-default bg-surface-container-low">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2 block">
                BENCHMARK COMPARISON
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
                Resumist vs. Generic Resume Builders
              </h2>
              <p className="text-xs sm:text-sm text-text-muted mt-2">
                Why standard graphic resume builders fail modern applicant screening systems.
              </p>
            </div>

            <div className="bg-surface rounded-xl border border-border-default overflow-hidden shadow-xs">
              <div className="grid grid-cols-12 bg-surface-container-low border-b border-border-default px-4 sm:px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">
                <div className="col-span-4">Evaluation Dimension</div>
                <div className="col-span-4 text-primary">Resumist Editorial Standard</div>
                <div className="col-span-4 text-text-muted">Generic AI Builders</div>
              </div>

              <div className="divide-y divide-border-default text-xs">
                {comparisonRows.map((row, i) => (
                  <div key={i} className="grid grid-cols-12 px-4 sm:px-6 py-3.5 items-center gap-2">
                    <div className="col-span-4 font-semibold text-text-primary">{row.dimension}</div>
                    <div className="col-span-4 text-primary font-medium flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-status-success shrink-0" />
                      <span>{row.resumist}</span>
                    </div>
                    <div className="col-span-4 text-text-muted">{row.generic}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ANSWER-FIRST FREQUENTLY ASKED QUESTIONS (SEO / AEO / GEO) */}
        <section className="w-full py-16 px-4 sm:px-6 lg:px-12 border-b border-border-default bg-surface">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2 block">
                SEARCH &amp; ANSWER ENGINE DIRECT ANSWERS
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
                Frequently Asked Questions
              </h2>
              <p className="text-xs sm:text-sm text-text-muted mt-2">
                Direct, factual answers to common questions about ATS screening, resume formatting, and tailoring.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-surface-container-low rounded-xl border border-border-default p-5 transition-colors [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer font-semibold text-sm text-text-primary gap-4">
                    <div className="flex items-center gap-2.5">
                      <HelpCircle className="h-4 w-4 text-primary shrink-0" />
                      <span>{faq.question}</span>
                    </div>
                    <span className="text-text-muted text-lg transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="mt-3.5 pt-3 border-t border-border-default text-xs text-text-muted leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* TOPICAL EXPLORATION DIRECTORY (INTERNAL LINKING) */}
        <section className="w-full py-12 px-4 sm:px-6 lg:px-12 border-b border-border-default bg-surface-container-low">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-text-primary flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span>Explore ATS &amp; Career Document Resources</span>
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Deep-dive guides, templates, and specialized tools.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <Link
                href="/ats-resume-builder"
                className="p-3.5 bg-surface rounded-xl border border-border-default hover:border-primary transition group"
              >
                <div className="font-semibold text-text-primary group-hover:text-primary mb-1">
                  ATS Resume Builder →
                </div>
                <p className="text-[11px] text-text-muted">
                  How enterprise ATS screening works and step-by-step compliant construction.
                </p>
              </Link>

              <Link
                href="/resume-ats-checker"
                className="p-3.5 bg-surface rounded-xl border border-border-default hover:border-primary transition group"
              >
                <div className="font-semibold text-text-primary group-hover:text-primary mb-1">
                  ATS Score Checker →
                </div>
                <p className="text-[11px] text-text-muted">
                  Diagnostic scoring rubric for keyword parity, content, and layout safety.
                </p>
              </Link>

              <Link
                href="/resume-job-matcher"
                className="p-3.5 bg-surface rounded-xl border border-border-default hover:border-primary transition group"
              >
                <div className="font-semibold text-text-primary group-hover:text-primary mb-1">
                  Job Matcher &amp; Tailor →
                </div>
                <p className="text-[11px] text-text-muted">
                  Deconstruct job descriptions and close keyword gaps factually.
                </p>
              </Link>

              <Link
                href="/resume-templates"
                className="p-3.5 bg-surface rounded-xl border border-border-default hover:border-primary transition group"
              >
                <div className="font-semibold text-text-primary group-hover:text-primary mb-1">
                  ATS-Friendly Templates →
                </div>
                <p className="text-[11px] text-text-muted">
                  4 verified single-column designs: Modern, Professional, Minimal, Technical.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* FINAL CONVERSION BANNER */}
        <section className="w-full py-16 px-4 sm:px-6 lg:px-12 bg-surface text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-text-primary">
              Ready to Upgrade Your Career Presentation?
            </h2>
            <p className="text-xs sm:text-sm text-text-muted max-w-xl mx-auto leading-relaxed">
              Create your Master Career Vault, calibrate against live job specifications, and download ATS-verified PDF &amp; DOCX resumes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/builder"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-primary-container text-on-primary text-xs sm:text-sm font-medium px-6 py-3 rounded-xl hover:bg-primary transition-colors shadow-xs"
              >
                <span>Launch Free Studio</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
              <Link
                href="/guides/ats-friendly-resume-guide"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-surface border border-border-default text-text-primary text-xs sm:text-sm font-medium px-6 py-3 rounded-xl hover:bg-surface-container-low transition-colors shadow-xs"
              >
                <span>Read 2026 ATS Guide</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* EDITORIAL FOOTER */}
      <footer className="w-full bg-surface border-t border-border-default py-10 px-4 sm:px-6 lg:px-12 text-xs text-text-muted">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-primary-container text-on-primary font-bold text-xs">
              R
            </div>
            <div>
              <span className="font-semibold text-text-primary">Resumist Editorial</span>
              <p className="text-[11px] text-text-muted mt-0.5">
                Precision ATS Resume Engineering &amp; Verified Career Vault
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px]">
            <Link href="/builder" className="hover:text-text-primary transition-colors">
              Resume Studio
            </Link>
            <Link href="/ats-analyzer" className="hover:text-text-primary transition-colors">
              ATS Analyzer
            </Link>
            <Link href="/job-matcher" className="hover:text-text-primary transition-colors">
              Job Matcher
            </Link>
            <Link href="/resume-templates" className="hover:text-text-primary transition-colors">
              ATS Templates
            </Link>
            <Link href="/guides/ats-friendly-resume-guide" className="hover:text-text-primary transition-colors">
              ATS Guide (2026)
            </Link>
          </div>

          <div className="text-[11px] text-text-muted text-center md:text-right">
            <span>© {new Date().getFullYear()} Resumist. Single-Column ATS Standards.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
