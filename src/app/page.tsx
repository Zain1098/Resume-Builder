"use client";

import React from "react";
import Link from "next/link";
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
  BarChart3,
  PlusCircle,
  Database,
  Search,
  ArrowLeftRight,
} from "lucide-react";

export default function LandingPage() {
  const steps = [
    {
      num: "01",
      title: "Master Profile",
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
      proof: "Validated against 40+ parsing variations",
    },
    {
      category: "MASTER PROFILE",
      icon: FolderLock,
      title: "Single Source Career Repository",
      desc: "Never start from a blank sheet again. Maintain every project, promotion, and quantitative win in a centralized vault and branch targeted resumes with one click.",
      proof: "Full revision history and delta tracking",
    },
    {
      category: "PRECISION REWRITING",
      icon: Edit3,
      title: "Evidence-Based Bullet Refinement",
      desc: "Transforms passive duty descriptions into high-impact Google XYZ and STAR format achievements without synthetic, robotic hallucination or exaggerated phrasing.",
      proof: "Maintains exact candidate metrics",
    },
    {
      category: "TYPOGRAPHIC INTEGRITY",
      icon: FileText,
      title: "Publication-Grade Export (PDF & DOCX)",
      desc: "Flawlessly kerned, single and multi-page layouts formatted to strict human recruiter readability benchmarks. Clean text layers for automated scanners.",
      proof: "Zero table structures that scramble parsers",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-bg-canvas text-text-primary">
      <Navbar />

      <main className="w-full flex-1">
        {/* HERO SECTION */}
        <section className="w-full px-4 sm:px-6 lg:px-12 pt-10 sm:pt-14 pb-14 max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10">
            {/* Version Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border-default mb-5 text-[11px] font-semibold text-text-muted uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-status-success inline-block"></span>
              <span>VERSION 2.4 CALIBRATED FOR 2024 ATS ENGINES</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-text-primary mb-4 leading-[1.15]">
              Build a Resume That Matches the Job.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-text-muted max-w-2xl mb-8 leading-relaxed">
              Precision tailoring, ATS diagnostic scoring, and master profile management. Built for experienced candidates who need substance over generic AI buzzwords.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-6 w-full sm:w-auto">
              <Link
                href="/builder"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-primary-container text-on-primary text-xs sm:text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-primary transition-colors shadow-xs"
              >
                Build Resume
              </Link>
              <Link
                href="/ats-analyzer"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-surface border border-border-default text-text-primary text-xs sm:text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-surface-container-low transition-colors shadow-xs"
              >
                Analyze Job / Check ATS
              </Link>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-text-muted text-xs">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-status-success" />
                Export clean PDF & DOCX
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-status-success" />
                ATS parser verified
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-status-success" />
                Privacy-first workspace
              </span>
            </div>
          </div>

          {/* AUTHENTIC WORKSPACE PREVIEW CONTAINER */}
          <div className="w-full bg-surface border border-border-default rounded-xl overflow-hidden shadow-sm max-w-5xl mx-auto">
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
                    <h2 className="text-lg font-semibold tracking-tight text-text-primary">
                      Elena Rostova
                    </h2>
                    <span className="text-text-muted text-[11px]">
                      New York, NY • elena.rostova@gmail.com
                    </span>
                  </div>
                  <p className="text-primary font-medium text-xs mt-0.5">
                    Staff Product Manager • Platform Systems & Monetization
                  </p>
                </div>

                {/* Section 1: Summary */}
                <div className="mb-4">
                  <h3 className="text-[10px] font-bold text-text-muted tracking-wider uppercase mb-1">
                    PROFESSIONAL SUMMARY
                  </h3>
                  <p className="text-text-primary">
                    Product lead with 8+ years scaling financial checkout infrastructure and multi-tenant ledger services. Led cross-functional platform teams handling{" "}
                    <span className="bg-primary-fixed/30 text-primary px-1 rounded font-medium">
                      $4.2B in annual GMV
                    </span>{" "}
                    with 99.995% uptime availability across high-concurrency API integrations.
                  </p>
                </div>

                {/* Section 2: Experience */}
                <div className="mb-4">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-[10px] font-bold text-text-muted tracking-wider uppercase">
                      WORK EXPERIENCE
                    </h3>
                    <span className="text-text-muted text-[11px]">2021 – Present</span>
                  </div>
                  <div className="flex justify-between items-baseline mb-1.5 font-medium text-text-primary">
                    <span>Datadog • Senior Product Manager (Billing)</span>
                    <span className="text-text-muted text-[11px]">New York, NY</span>
                  </div>
                  <ul className="space-y-1.5 list-disc list-outside ml-3.5 text-text-primary">
                    <li>
                      Architected high-throughput{" "}
                      <span className="bg-primary-fixed/30 text-primary px-1 rounded font-medium">
                        metering and rating pipeline
                      </span>{" "}
                      supporting 35,000+ enterprise accounts, reducing tickets by 42%.
                    </li>
                    <li>
                      Spearheaded adoption of{" "}
                      <span className="bg-primary-fixed/30 text-primary px-1 rounded font-medium">
                        idempotent transaction protocols
                      </span>
                      , preventing duplicate charge anomalies during timeouts.
                    </li>
                    <li>
                      Maintained rigorous PCI-DSS Level 1 compliance across microservices without latency regressions.
                    </li>
                  </ul>
                </div>

                {/* Section 3: Skills */}
                <div>
                  <h3 className="text-[10px] font-bold text-text-muted tracking-wider uppercase mb-1.5">
                    CORE COMPETENCIES & SYSTEMS
                  </h3>
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    <span className="px-2 py-0.5 bg-surface-container-low rounded text-text-primary border border-border-default">
                      Distributed Architecture
                    </span>
                    <span className="px-2 py-0.5 bg-surface-container-low rounded text-text-primary border border-border-default">
                      Payment Gateway Routing
                    </span>
                    <span className="px-2 py-0.5 bg-surface-container-low rounded text-text-primary border border-border-default">
                      Ledger Reconciliation
                    </span>
                    <span className="px-2 py-0.5 bg-surface-container-low rounded text-text-primary border border-border-default">
                      Kafka Stream Processing
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Inspection & ATS Diagnostic Panel (5 Cols) */}
              <div className="lg:col-span-5 p-5 bg-surface-container-low/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-border-default pb-2.5 mb-3.5">
                    <div className="flex items-center gap-1.5">
                      <BarChart3 className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-text-primary text-xs">
                        ATS Gap Analysis
                      </span>
                    </div>
                    <span className="text-[11px] text-text-muted">Target: Stripe PM II</span>
                  </div>

                  {/* Score Progress Bar */}
                  <div className="p-3 bg-surface rounded-lg border border-border-default mb-3.5">
                    <div className="flex justify-between items-baseline mb-1.5 text-xs">
                      <span className="font-medium text-text-primary">Role Relevance Match</span>
                      <span className="font-bold text-status-success">94%</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                      <div className="h-full bg-status-success rounded-full" style={{ width: "94%" }}></div>
                    </div>
                    <p className="text-[11px] text-text-muted mt-1.5 leading-normal">
                      Strong alignment with technical payment platform and high-scale transaction processing competencies.
                    </p>
                  </div>

                  {/* Matched Keywords */}
                  <div className="mb-3.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase">
                        MATCHED KEYWORDS (18/20)
                      </span>
                      <CheckCircle2 className="h-3.5 w-3.5 text-status-success" />
                    </div>
                    <div className="flex flex-wrap gap-1 text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-primary-fixed/30 text-primary border border-primary/20 font-medium">
                        Idempotent APIs
                      </span>
                      <span className="px-2 py-0.5 rounded bg-primary-fixed/30 text-primary border border-primary/20 font-medium">
                        Ledger Reconciliation
                      </span>
                      <span className="px-2 py-0.5 rounded bg-primary-fixed/30 text-primary border border-primary/20 font-medium">
                        PCI-DSS
                      </span>
                      <span className="px-2 py-0.5 rounded bg-primary-fixed/30 text-primary border border-primary/20 font-medium">
                        High Concurrency
                      </span>
                    </div>
                  </div>

                  {/* Gaps to Address */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold text-secondary tracking-wider uppercase">
                        GAPS TO ADDRESS (2 DETECTED)
                      </span>
                      <span className="text-[10px] text-secondary font-semibold">Priority</span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div className="p-2 bg-surface rounded border border-border-default flex items-start gap-2">
                        <PlusCircle className="h-3.5 w-3.5 text-secondary shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-text-primary text-[11px]">Distributed Systems Resilience</span>
                          <p className="text-text-muted text-[10px]">Add specific mention of multi-region disaster recovery.</p>
                        </div>
                      </div>
                      <div className="p-2 bg-surface rounded border border-border-default flex items-start gap-2">
                        <PlusCircle className="h-3.5 w-3.5 text-secondary shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-text-primary text-[11px]">SOC2 Compliance Audits</span>
                          <p className="text-text-muted text-[10px]">Mention cross-functional partnership with security leadership.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Hook */}
                <div className="pt-2.5 border-t border-border-default flex items-center justify-between text-xs">
                  <span className="text-text-muted text-[11px]">Master profile contains 4 relevant achievements</span>
                  <Link href="/builder" className="text-primary hover:underline font-medium text-[11px]">
                    Insert from Profile →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WORKFLOW LOOP (THE INTELLIGENT WORKFLOW) */}
        <section className="w-full bg-surface border-y border-border-default py-14 px-4 sm:px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center sm:text-left">
              <span className="text-[11px] font-bold tracking-wider text-text-muted uppercase">
                METHODOLOGY
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary mt-1 mb-2">
                The Intelligent Workflow
              </h2>
              <p className="text-xs sm:text-sm text-text-muted max-w-xl">
                From master career history to job-specific tailoring in four disciplined steps.
              </p>
            </div>

            {/* 4 Compact Step Cards in Horizontal Sequence */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-border-default border border-border-default rounded-xl overflow-hidden">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.num} className="bg-surface p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-primary">{step.num}</span>
                        <Icon className="h-4 w-4 text-text-muted" />
                      </div>
                      <h3 className="text-base font-semibold text-text-primary mb-2">
                        {step.title}
                      </h3>
                      <p className="text-xs text-text-muted leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                    <div className="mt-6 pt-3.5 border-t border-border-default/60 text-[11px] text-text-muted">
                      {step.badge}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* EDITORIAL FEATURE GRID */}
        <section className="w-full py-14 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="mb-10 text-center sm:text-left">
            <span className="text-[11px] font-bold tracking-wider text-text-muted uppercase">
              CORE CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary mt-1 mb-2">
              Engineered for Candidate Calibration
            </h2>
            <p className="text-xs sm:text-sm text-text-muted max-w-xl">
              Every feature exists to eliminate human friction and machine parsing errors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div
                  key={idx}
                  className="bg-surface border border-border-default rounded-xl p-6 sm:p-7 flex flex-col justify-between hover:border-text-muted/60 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold text-text-muted tracking-wider uppercase">
                        {f.category}
                      </span>
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold text-text-primary mb-2">
                      {f.title}
                    </h3>
                    <p className="text-xs text-text-muted leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-3.5 border-t border-border-default flex items-center gap-2 text-xs text-text-primary">
                    <Check className="h-3.5 w-3.5 text-status-success shrink-0" />
                    <span>{f.proof}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* PRACTICAL COMPARISON TABLE */}
        <section className="w-full bg-surface border-t border-border-default py-14 px-4 sm:px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 text-center sm:text-left">
              <span className="text-[11px] font-bold tracking-wider text-text-muted uppercase">
                THE DIFFERENCE
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-text-primary mt-1">
                Standard AI Resume Tools vs. Resumist
              </h2>
            </div>

            <div className="border border-border-default rounded-xl overflow-hidden bg-surface">
              <div className="grid grid-cols-12 bg-surface-container-low border-b border-border-default p-3.5 text-[11px] font-bold text-text-muted tracking-wider uppercase">
                <div className="col-span-4 sm:col-span-3">CRITERIA</div>
                <div className="col-span-4 sm:col-span-4 text-text-muted">GENERIC AI GENERATORS</div>
                <div className="col-span-4 sm:col-span-5 text-primary">RESUMIST EDITORIAL</div>
              </div>

              {/* Row 1 */}
              <div className="grid grid-cols-12 border-b border-border-default p-3.5 text-xs items-center">
                <div className="col-span-4 sm:col-span-3 font-medium text-text-primary">Content Quality</div>
                <div className="col-span-4 sm:col-span-4 text-text-muted text-[11px] sm:text-xs">Fluffy buzzwords, generic claims, fabricated metrics</div>
                <div className="col-span-4 sm:col-span-5 text-text-primary text-[11px] sm:text-xs font-medium flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-status-success shrink-0" />
                  <span>Evidence-based STAR framing from your raw logs</span>
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-12 border-b border-border-default p-3.5 text-xs items-center bg-surface-container-low/30">
                <div className="col-span-4 sm:col-span-3 font-medium text-text-primary">Layout Format</div>
                <div className="col-span-4 sm:col-span-4 text-text-muted text-[11px] sm:text-xs">Multi-column templates with nested tables that choke ATS OCR</div>
                <div className="col-span-4 sm:col-span-5 text-text-primary text-[11px] sm:text-xs font-medium flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-status-success shrink-0" />
                  <span>Editorial single-column hierarchy approved by recruiters</span>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-12 border-b border-border-default p-3.5 text-xs items-center">
                <div className="col-span-4 sm:col-span-3 font-medium text-text-primary">Targeting Precision</div>
                <div className="col-span-4 sm:col-span-4 text-text-muted text-[11px] sm:text-xs">Blind keyword stuffing without contextual semantic relevance</div>
                <div className="col-span-4 sm:col-span-5 text-text-primary text-[11px] sm:text-xs font-medium flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-status-success shrink-0" />
                  <span>Semantic gap diagnostic scoring against the actual JD</span>
                </div>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-12 p-3.5 text-xs items-center bg-surface-container-low/30">
                <div className="col-span-4 sm:col-span-3 font-medium text-text-primary">Data Sovereignty</div>
                <div className="col-span-4 sm:col-span-4 text-text-muted text-[11px] sm:text-xs">Data shared with third-party LLM training pipelines</div>
                <div className="col-span-4 sm:col-span-5 text-text-primary text-[11px] sm:text-xs font-medium flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-status-success shrink-0" />
                  <span>Zero AI training on your personal career history</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL ACTION BANNER */}
        <section className="w-full py-14 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
          <div className="bg-surface border border-border-default rounded-xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-xl sm:text-2xl font-semibold text-text-primary tracking-tight mb-2">
                Ready to submit a resume that gets interviews?
              </h2>
              <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                Join senior operators, engineers, and product leaders who rely on Resumist for rigorous career document management.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <Link
                href="/builder"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-primary-container text-on-primary text-xs sm:text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-primary transition-colors shadow-xs"
              >
                Create Resume Now
              </Link>
              <Link
                href="/ats-analyzer"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-surface border border-border-default text-text-primary text-xs sm:text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-surface-container-low transition-colors shadow-xs"
              >
                Check ATS Score
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* EDITORIAL FOOTER */}
      <footer className="w-full bg-surface border-t border-border-default mt-auto py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>© 2024 Resumist Editorial Workspace. All rights reserved.</p>
            <span className="hidden sm:inline text-border-default">|</span>
            <p>PDF & DOCX structural standard compliance certified.</p>
          </div>
          <div className="flex items-center flex-wrap justify-center gap-4 sm:gap-6">
            <Link href="/resumes" className="hover:text-text-primary transition-colors">
              Master Profile
            </Link>
            <Link href="/ats-analyzer" className="hover:text-text-primary transition-colors">
              ATS Checker
            </Link>
            <Link href="/builder" className="hover:text-text-primary transition-colors">
              Resume Builder
            </Link>
            <Link href="/job-matcher" className="hover:text-text-primary transition-colors">
              Job Matcher
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
