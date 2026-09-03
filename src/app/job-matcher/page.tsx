"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/common/Navbar";
import { useResumeStore } from "@/store/useResumeStore";
import { analyzeJobDescription, matchResumeAgainstJob } from "@/lib/jobAnalyzer";
import { tailorResumeToJob } from "@/lib/aiService";
import { JobAnalysis } from "@/types/resume";
import {
  Target,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Plus,
  ArrowRight,
  GraduationCap,
  Calendar,
  Wand2,
} from "lucide-react";
import confetti from "canvas-confetti";

const SAMPLE_JOB_POSTING = `Senior Full Stack Software Engineer
Company: CloudScale AI Technologies
Location: San Francisco, CA / Remote

About the Role:
We are seeking a high-performing Senior Full Stack Engineer to build next-generation distributed SaaS interfaces and real-time streaming dashboards.

Required Qualifications & Skills:
• 4+ years of professional full-stack development experience
• Strong mastery of React, TypeScript, and Next.js
• Production proficiency with Node.js, Express, and PostgreSQL
• Hands-on experience designing and consuming REST APIs
• Working knowledge of Docker and containerized deployments
• Proven track record with modern Git workflows and CI/CD pipelines
• Bachelor's degree in Computer Science, Software Engineering, or equivalent experience

Preferred / Nice to Have:
• Hands-on experience with AWS (ECS, Lambda, S3)
• Knowledge of Redis caching and Kafka message brokers
• Familiarity with Tailwind CSS and component libraries
• Experience with automated testing frameworks (Jest, Cypress)

Key Responsibilities:
• Architect, implement, and maintain scalable user-facing web applications
• Partner with product designers and backend architects to deliver low-latency user interfaces
• Optimize database queries and frontend bundles for maximum performance
• Participate in code reviews and mentor junior engineering colleagues`;

export default function JobMatcherPage() {
  const router = useRouter();
  const { resume, addSkillToCategory, addSkillCategory, createTailoredResume, saveJobAnalysis } = useResumeStore();

  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobText, setJobText] = useState("");
  const [analysis, setAnalysis] = useState<JobAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isTailoring, setIsTailoring] = useState(false);

  // Tailored Result State
  const [tailorResult, setTailorResult] = useState<{
    tailoredId: string;
    beforeScore: number;
    afterScore: number;
    changesMade: string[];
  } | null>(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-xs font-semibold text-slate-500">Loading Job Matcher...</p>
        </div>
      </div>
    );
  }

  const handleLoadSample = () => {
    setJobTitle("Senior Full Stack Software Engineer");
    setCompany("CloudScale AI Technologies");
    setJobText(SAMPLE_JOB_POSTING);
  };

  const handleAnalyze = () => {
    if (!jobText.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const result = analyzeJobDescription(jobText, jobTitle, company);
      setAnalysis(result);
      saveJobAnalysis(result);
      setIsAnalyzing(false);
    }, 400);
  };

  const handleAddMissingSkill = (skill: string) => {
    const targetCat = resume.skillCategories[0]?.id;
    if (targetCat) {
      addSkillToCategory(targetCat, skill);
    } else {
      addSkillCategory();
    }
  };

  const handleTailorResume = () => {
    if (!analysis) return;
    setIsTailoring(true);

    setTimeout(() => {
      const result = tailorResumeToJob(resume, analysis);
      const newId = createTailoredResume(analysis, result.tailoredResume);
      setTailorResult({
        tailoredId: newId,
        beforeScore: result.beforeScore,
        afterScore: result.afterScore,
        changesMade: result.changesMade,
      });
      setIsTailoring(false);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 600);
  };

  const matchData = analysis ? matchResumeAgainstJob(resume, analysis) : null;

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 mb-2">
              <Target className="h-4 w-4" />
              <span>Job Intelligence &amp; ATS Tailoring Loop</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Job Description Matcher &amp; Resume Tailor
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
              Paste the target job description to reveal keyword gaps, required vs. preferred competencies, and tailor your resume factually.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLoadSample}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Load Sample Job Posting</span>
          </button>
        </div>

        {/* Input Form Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Target Job Title (Optional)
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Senior Full Stack Software Engineer"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Company Name (Optional)
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Stripe / Microsoft / Startup"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Job Description / Requirements Text *
            </label>
            <textarea
              rows={7}
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              placeholder="Paste the complete job posting here (About role, Qualifications, Stack, Responsibilities)..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white leading-relaxed font-sans"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleAnalyze}
              disabled={!jobText.trim() || isAnalyzing}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 active:scale-95 disabled:opacity-50 transition"
            >
              <Target className="h-4 w-4" />
              <span>{isAnalyzing ? "Analyzing Job..." : "Analyze Job & Calculate Match"}</span>
            </button>
          </div>
        </div>

        {/* Tailored Result Success Banner (if created) */}
        {tailorResult && (
          <div className="rounded-2xl border-2 border-emerald-500 bg-emerald-50/70 p-6 dark:bg-emerald-950/30 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                    Tailored Resume Version Generated Successfully!
                  </h3>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300">
                    A dedicated tailored copy has been created and added to your resumes collection.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-emerald-200 dark:border-emerald-800 shrink-0">
                <div className="text-center">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Before</div>
                  <div className="text-base font-black text-slate-600 dark:text-slate-400">
                    {tailorResult.beforeScore}%
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-emerald-500" />
                <div className="text-center">
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-bold">
                    After
                  </div>
                  <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                    {tailorResult.afterScore}%
                  </div>
                </div>
              </div>
            </div>

            {/* Changelog */}
            <div className="bg-white/80 dark:bg-slate-900/80 rounded-xl p-3 border border-emerald-200/60 dark:border-emerald-900/40">
              <h4 className="text-xs font-bold text-emerald-900 dark:text-emerald-300 mb-1">
                Optimizations Applied to Tailored Copy:
              </h4>
              <ul className="space-y-1 text-xs text-emerald-800 dark:text-emerald-400/90 pl-4 list-disc">
                {tailorResult.changesMade.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => router.push("/builder")}
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition"
              >
                <span>Open in Resume Studio</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Analysis Breakdown */}
        {analysis && matchData && (
          <div className="space-y-6">
            {/* Match Score Gauge Banner */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    ATS Job Match Score
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span
                      className={`text-4xl font-black ${
                        matchData.matchScore >= 75
                          ? "text-emerald-600 dark:text-emerald-400"
                          : matchData.matchScore >= 50
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {matchData.matchScore}%
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      for &quot;{analysis.title}&quot;
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleTailorResume}
                  disabled={isTailoring}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-xs sm:text-sm font-semibold text-white shadow-md shadow-blue-500/25 hover:from-blue-700 hover:to-indigo-700 active:scale-95 disabled:opacity-50 transition shrink-0"
                >
                  <Wand2 className="h-4 w-4 text-amber-300" />
                  <span>{isTailoring ? "Tailoring Resume..." : "Tailor Resume to This Job"}</span>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 h-2 w-full bg-slate-100 rounded-full overflow-hidden dark:bg-slate-800">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    matchData.matchScore >= 75
                      ? "bg-emerald-500"
                      : matchData.matchScore >= 50
                      ? "bg-amber-500"
                      : "bg-rose-500"
                  }`}
                  style={{ width: `${matchData.matchScore}%` }}
                />
              </div>
            </div>

            {/* Keyword Gap Analysis: Required vs Preferred */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Required Skills Match */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-rose-500" />
                    <span>Mandatory / Required Skills ({analysis.requiredSkills.length})</span>
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {matchData.matchedRequired.length} of {analysis.requiredSkills.length} Matched
                  </span>
                </div>

                {/* Missing Required */}
                {matchData.missingRequired.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 mb-2">
                      <AlertCircle className="h-3.5 w-3.5" />
                      <span>Missing Required Competencies (Click to add):</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {matchData.missingRequired.map((skill, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleAddMissingSkill(skill)}
                          title="Click to add this skill to your resume"
                          className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300 transition"
                        >
                          <Plus className="h-3 w-3" />
                          <span>{skill}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Matched Required */}
                {matchData.matchedRequired.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Found in Resume ({matchData.matchedRequired.length}):</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {matchData.matchedRequired.map((skill, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                        >
                          ✓ {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Preferred / Bonus Skills Match */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-500" />
                    <span>Preferred / Nice-to-Have Skills ({analysis.preferredSkills.length})</span>
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-500">
                    {matchData.matchedPreferred.length} of {analysis.preferredSkills.length} Matched
                  </span>
                </div>

                {/* Missing Preferred */}
                {matchData.missingPreferred.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 mb-2">
                      <span>Missing Preferred Skills:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {matchData.missingPreferred.map((skill, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleAddMissingSkill(skill)}
                          className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300 transition"
                        >
                          <Plus className="h-3 w-3" />
                          <span>{skill}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Matched Preferred */}
                {matchData.matchedPreferred.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Found in Resume ({matchData.matchedPreferred.length}):</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {matchData.matchedPreferred.map((skill, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                        >
                          ✓ {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Extracted Experience & Education Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.experienceRequirements.length > 0 && (
                <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2">
                    <Calendar className="h-3.5 w-3.5 text-blue-600" />
                    <span>Experience Requirements</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400 pl-4 list-disc">
                    {analysis.experienceRequirements.map((exp, i) => (
                      <li key={i}>{exp}</li>
                    ))}
                  </ul>
                </div>
              )}

              {analysis.educationRequirements.length > 0 && (
                <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2">
                    <GraduationCap className="h-3.5 w-3.5 text-indigo-600" />
                    <span>Education Requirements</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400 pl-4 list-disc">
                    {analysis.educationRequirements.map((edu, i) => (
                      <li key={i}>{edu}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
