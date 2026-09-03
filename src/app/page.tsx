"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import {
  Sparkles,
  ShieldCheck,
  Target,
  FileDown,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  FileCheck,
  Layout,
} from "lucide-react";

export default function LandingPage() {
  const steps = [
    {
      num: "01",
      title: "Master Profile",
      desc: "Maintain one comprehensive career archive containing all your experiences, skills, projects, and achievements.",
      icon: Layers,
    },
    {
      num: "02",
      title: "Target Job Analysis",
      desc: "Paste any job posting. The analyzer extracts required skills, preferred qualifications, and experience seniority.",
      icon: Target,
    },
    {
      num: "03",
      title: "ATS Gap Analysis",
      desc: "Instant breakdown across 8 compliance factors. Identify missing keywords and weak bullet points with 1-click remedies.",
      icon: ShieldCheck,
    },
    {
      num: "04",
      title: "AI Tailoring & Export",
      desc: "Generate a job-specific version with tailored bullets and summary. Export as ATS-safe vector PDF or Word DOCX.",
      icon: FileCheck,
    },
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: "Transparent 8-Factor ATS Score",
      desc: "Explainable compliance scoring based on keyword relevance, metric density, action verbs, and formatting safety. No fake percentage claims.",
    },
    {
      icon: Target,
      title: "Conservative Semantic Matcher",
      desc: "Recognizes legitimate skill synonyms (e.g. React.js = React, RESTful = REST APIs) without assuming unrelated tech are interchangeable.",
    },
    {
      icon: Cpu,
      title: "Factually Grounded AI Polish",
      desc: "Rewrite bullets for maximum impact with 5 distinct styles (Concise, Technical, Executive). We never fabricate metrics or unverified numbers.",
    },
    {
      icon: Layers,
      title: "Master vs. Tailored Resumes",
      desc: "Never start from scratch for each job application. Derive targeted resumes from your master archive while keeping everything organized.",
    },
    {
      icon: Layout,
      title: "6 ATS-Verified Templates",
      desc: "Harvard Classic, Modern Pro, Minimalist Executive, Developer Tech, Leadership Executive, and Student/Grad. Tested on standard parsers.",
    },
    {
      icon: FileDown,
      title: "Dual Format Export (PDF & DOCX)",
      desc: "High-fidelity vector PDF with selectable text and clean pagination, plus native Microsoft Word (.DOCX) for corporate recruiters.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-slate-200/80 dark:border-slate-800">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>Intelligent Career Document Optimization Platform</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Build a Resume That{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
              Matches the Job
            </span>
          </h1>

          {/* Subheading */}
          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Move beyond generic templates. Analyze any job description, pinpoint ATS keyword gaps, rewrite achievements factually with AI, and export production-ready PDFs.
          </p>

          {/* Primary CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/builder"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 active:scale-95 transition"
            >
              <span>Build My Resume</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/ats-analyzer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-850 dark:text-white dark:hover:bg-slate-800 transition"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Check ATS Score</span>
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100/70 px-5 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-750 transition"
            >
              <span>Open Dashboard</span>
            </Link>
          </div>

          {/* Value Badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              100% Vector Selectable PDF
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Word (.DOCX) Export
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Explainable ATS Audit
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              Zero Hallucinated Metrics
            </span>
          </div>
        </div>
      </section>

      {/* Core Feedback Loop Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              The Intelligent Loop
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              From &quot;I Have a Resume&quot; to &quot;Job-Specific &amp; Ready to Submit&quot;
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Stop blasting the same static PDF to 100 jobs. Tailor your application directly to each role&apos;s specific requirements in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-850/50 flex flex-col justify-between hover:shadow-md transition"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-slate-400 dark:text-slate-500">
                        {step.num}
                      </span>
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/80 dark:text-blue-400">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              Engineered for Quality
            </h2>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Built Like Serious Career Infrastructure
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Designed with strict privacy standards, zero fake statistics, and deep ATS parseability checks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-700 transition"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-50 to-indigo-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {f.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive CTA Banner */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            Ready to Optimize Your Resume for Your Next Role?
          </h3>
          <p className="mt-3 max-w-xl mx-auto text-sm text-blue-100">
            Open the live studio now, paste a job posting, and see your exact keyword gap analysis in real-time.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-xs sm:text-sm font-bold text-blue-700 shadow-lg shadow-black/10 hover:bg-blue-50 active:scale-95 transition"
            >
              <span>Launch Resume Studio</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/job-matcher"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-xs sm:text-sm font-bold text-white hover:bg-white/20 active:scale-95 transition"
            >
              <Target className="h-4 w-4" />
              <span>Job Description Matcher</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-blue-600 text-white flex items-center justify-center text-[10px] font-black">
              CC
            </div>
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              CareerCraft ATS Platform
            </span>
          </div>
          <p className="text-xs">
            Privacy-First • Local Storage Persistence • No Personal Data Selling
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/builder" className="hover:underline">
              Builder
            </Link>
            <Link href="/ats-analyzer" className="hover:underline">
              ATS Audit
            </Link>
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
