"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { useResumeStore } from "@/store/useResumeStore";
import { calculateAtsScore } from "@/lib/atsScoring";
import { improveBulletPoint, BulletStyle } from "@/lib/aiService";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  Wand2,
  Terminal,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function AtsAnalyzerPage() {
  const { resume, updateBulletPoint } = useResumeStore();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<BulletStyle>("achievement");
  const [optimizingId, setOptimizingId] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-xs font-semibold text-slate-500">Running ATS Compliance Audit...</p>
        </div>
      </div>
    );
  }

  const analysis = calculateAtsScore(resume);

  // Generate plain text as an automated ATS would extract it
  const plainTextExtraction = [
    resume.personalInfo.fullName.toUpperCase(),
    resume.personalInfo.jobTitle,
    `${resume.personalInfo.location} | ${resume.personalInfo.phone} | ${resume.personalInfo.email}`,
    resume.personalInfo.linkedin,
    "",
    "--- PROFESSIONAL SUMMARY ---",
    resume.personalInfo.summary,
    "",
    "--- EXPERIENCE ---",
    ...resume.experiences.map((e) => [
      `${e.position} - ${e.company} (${e.startDate} to ${e.current ? "Present" : e.endDate})`,
      ...e.bulletPoints.map((bp) => `  * ${bp}`)
    ].join("\n")),
    "",
    "--- EDUCATION ---",
    ...resume.educations.map((edu) => `${edu.degree} in ${edu.fieldOfStudy} - ${edu.institution}`),
    "",
    "--- SKILLS ---",
    ...resume.skillCategories.map((cat) => `${cat.name}: ${cat.skills.join(", ")}`),
  ].join("\n");

  const handleCopyText = () => {
    navigator.clipboard.writeText(plainTextExtraction);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleFixBullet = async (expId: string, bulletIdx: number, text: string) => {
    const key = `${expId}-${bulletIdx}`;
    setOptimizingId(key);
    try {
      const result = await improveBulletPoint(text, selectedStyle);
      updateBulletPoint(expId, bulletIdx, result.improved);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } finally {
      setOptimizingId(null);
    }
  };

  const scoreGauges = [
    { label: "Overall Match", score: analysis.overallScore, weight: "100%" },
    { label: "Keywords Relevance", score: analysis.keywordMatch, weight: "35%" },
    { label: "Skills Depth", score: analysis.skillsMatch, weight: "20%" },
    { label: "Experience & Impact", score: analysis.experienceRelevance, weight: "15%" },
    { label: "Content Quality", score: analysis.contentQuality, weight: "10%" },
    { label: "Resume Structure", score: analysis.structureScore, weight: "10%" },
    { label: "Education & Credentials", score: analysis.educationMatch, weight: "10%" },
    { label: "Formatting Safety", score: analysis.formattingSafety, weight: "Audit" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 mb-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Full ATS Compatibility &amp; Parseability Audit</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              ATS Compliance Inspector
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
              Transparent, explainable breakdown of how automated applicant tracking systems parse your resume.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/job-matcher"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition"
            >
              <span>Scan Against Job Posting</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* ATS Methodology & Honest Transparency Disclaimer */}
        <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-slate-50 p-4 sm:p-5 dark:border-blue-900/60 dark:bg-gradient-to-r dark:from-blue-950/40 dark:via-slate-900/40 dark:to-slate-900">
          <div className="flex items-start gap-3.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/30 mt-0.5">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="space-y-1 text-xs">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                About Our ATS Score &amp; Scoring Methodology
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Applicant Tracking Systems (such as Greenhouse, Lever, Workday, Taleo, and iCIMS) parse resumes into structured data profiles before recruiter review. CareerCraft&apos;s ATS score is an <strong>explainable compatibility index</strong> measuring standard header labels, single-column parseability, keyword extraction, quantified achievements, and machine readability.
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-[11px] pt-1">
                <strong>Disclaimer:</strong> No software can promise guaranteed interview callbacks or claim to &quot;beat every ATS algorithm.&quot; Hiring decisions are ultimately made by human recruiters and hiring managers. Our scoring evaluates structural compliance, readability, and industry best practices.
              </p>
            </div>
          </div>
        </div>

        {/* 8-Factor Score Card Grid */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Composite Compliance Grade
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span
                  className={`text-5xl font-black ${
                    analysis.overallScore >= 80
                      ? "text-emerald-600 dark:text-emerald-400"
                      : analysis.overallScore >= 60
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {analysis.overallScore}
                </span>
                <span className="text-sm font-semibold text-slate-400">/ 100</span>
                <span className="ml-2 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {analysis.overallScore >= 85
                    ? "ATS Ready"
                    : analysis.overallScore >= 70
                    ? "Competitive"
                    : "Needs Refinement"}
                </span>
              </div>
            </div>

            <div className="max-w-md text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Our scoring formula evaluates your resume using transparent product rules: 35% Keyword alignment, 20% Technical skills depth, 15% Quantified metric density, 10% Action verb strength, 10% Standard structure, and 10% Education &amp; credentials.
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {scoreGauges.map((g, idx) => (
              <div key={idx} className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-850/50">
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                  <span className="truncate">{g.label}</span>
                  <span className="font-mono text-[10px] text-slate-400">{g.weight}</span>
                </div>
                <div className="text-xl font-bold text-slate-900 dark:text-white">
                  {g.score}%
                </div>
                <div className="mt-2 h-1.5 w-full bg-slate-200 rounded-full overflow-hidden dark:bg-slate-700">
                  <div
                    className={`h-full rounded-full ${
                      g.score >= 80 ? "bg-emerald-500" : g.score >= 60 ? "bg-amber-500" : "bg-rose-500"
                    }`}
                    style={{ width: `${g.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable Suggestions & Weak Bullets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Format & Parseability Checks */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <span>ATS Format &amp; Parseability Checks</span>
            </h2>

            <div className="space-y-3">
              {analysis.formatChecks.map((check) => (
                <div
                  key={check.id}
                  className="rounded-xl border border-slate-100 p-3.5 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-850/30 flex items-start gap-3"
                >
                  {check.status === "pass" ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  ) : check.status === "warn" ? (
                    <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                      {check.name}
                    </h3>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                      {check.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weak Bullet Optimizer */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Wand2 className="h-4 w-4 text-amber-500" />
                <span>Weak Bullet Point Optimizer ({analysis.weakBulletPoints.length})</span>
              </h2>

              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value as BulletStyle)}
                className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <option value="achievement">Achievement-Focused</option>
                <option value="technical">Technical Rigor</option>
                <option value="concise">Concise Impact</option>
                <option value="executive">Executive Leadership</option>
                <option value="professional">Standard Professional</option>
              </select>
            </div>

            {analysis.weakBulletPoints.length === 0 ? (
              <div className="rounded-xl bg-emerald-50/70 p-6 text-center dark:bg-emerald-950/20">
                <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                <h3 className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  All Experience Bullets Pass Quality Audit!
                </h3>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1">
                  No passive voice phrases or first-person pronouns detected.
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {analysis.weakBulletPoints.map((item, idx) => {
                  const isBusy = optimizingId === `${item.experienceId}-${item.bulletIndex}`;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-amber-200 bg-amber-50/40 p-3.5 dark:border-amber-900/50 dark:bg-amber-950/20 space-y-2"
                    >
                      <div className="text-[11px] font-semibold text-amber-800 dark:text-amber-300">
                        ⚠ {item.reason}
                      </div>
                      <div className="text-xs text-slate-700 dark:text-slate-300 italic bg-white/80 dark:bg-slate-900/80 p-2 rounded border border-amber-100 dark:border-amber-900/30">
                        &quot;{item.text}&quot;
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-slate-500">
                          Recommended fix ready
                        </span>
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() =>
                            handleFixBullet(item.experienceId, item.bulletIndex, item.text)
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-amber-700 disabled:opacity-50 transition"
                        >
                          <Sparkles className="h-3 w-3" />
                          <span>{isBusy ? "Optimizing..." : "1-Click AI Fix"}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ATS Plain Text Parser Simulator */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Terminal className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                <span>Simulated ATS Text Extraction</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                This is exactly what robotic ATS scanners (Workday, Taleo, Greenhouse) read when extracting your document.
              </p>
            </div>
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              {copiedText ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
          </div>

          <pre className="mt-3 max-h-64 overflow-y-auto rounded-xl bg-slate-900 p-4 font-mono text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
            {plainTextExtraction}
          </pre>
        </div>
      </main>
    </div>
  );
}
