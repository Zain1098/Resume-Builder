"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  Check,
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

export function JobMatcherClient() {
  const router = useRouter();
  const { resume, addSkillToCategory, addSkillCategory, createTailoredResume, saveJobAnalysis } =
    useResumeStore();

  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobText, setJobText] = useState("");
  const [analysis, setAnalysis] = useState<JobAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isTailoring, setIsTailoring] = useState(false);

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

  if (!isMounted) {
    return (
      <div className="w-full py-16 flex items-center justify-center bg-bg-canvas text-text-primary">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-container border-t-transparent" />
          <p className="text-xs font-semibold text-text-muted tracking-wide">
            Loading Job Intelligence Studio...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Top Context Subheader */}
      <div className="w-full bg-surface border-b border-border-default px-4 sm:px-6 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-text-muted text-[11px] font-semibold uppercase tracking-wider">
              <span>Workspace</span>
              <span className="text-border-default">/</span>
              <span>{resume.personalInfo.fullName || "Candidate"}</span>
              <span className="text-border-default">/</span>
              <span className="text-primary font-semibold">Job Matcher &amp; Tailor</span>
            </div>
            <div className="flex items-baseline gap-3 mt-1">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
                Job Matcher &amp; Diagnostic
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-surface-container-low text-text-muted border border-border-default">
                Live Match Loop
              </span>
            </div>
            <p className="text-xs sm:text-sm text-text-muted max-w-3xl mt-0.5">
              Evaluate candidate-led parity between your resume and live job postings. Extract syntax benchmarks, identify keyword gaps, and generate factually tailored versions.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center">
            <button
              type="button"
              onClick={handleLoadSample}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border-default bg-surface px-3.5 py-2 text-xs font-medium text-text-primary hover:bg-surface-container-low transition-colors shadow-xs"
            >
              <Sparkles className="h-3.5 w-3.5 text-secondary" />
              <span>Load Sample Job</span>
            </button>
          </div>
        </div>
      </div>

      {/* Body Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-8 space-y-8">
        {/* Input Specification Card */}
        <div className="bg-surface rounded-xl border border-border-default p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-border-default pb-3">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold text-text-primary uppercase tracking-wider text-[12px]">
                Target Opportunity Specification
              </h2>
            </div>
            <span className="text-[11px] text-text-muted">
              Paste any job posting or requirements
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1.5">
                Target Job Title (Optional)
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Senior Full Stack Software Engineer"
                className="w-full rounded-xl border border-border-default bg-surface px-3.5 py-2 text-xs text-text-primary focus:border-primary-container focus:outline-none transition-colors placeholder:text-text-muted"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-muted mb-1.5">
                Company Name (Optional)
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. CloudScale AI Technologies"
                className="w-full rounded-xl border border-border-default bg-surface px-3.5 py-2 text-xs text-text-primary focus:border-primary-container focus:outline-none transition-colors placeholder:text-text-muted"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-muted mb-1.5">
              Job Description &amp; Requirements Text *
            </label>
            <textarea
              rows={7}
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              placeholder="Paste the target job posting here (Role overview, Required tech stack, Qualifications, Core responsibilities)..."
              className="w-full rounded-xl border border-border-default bg-surface p-3.5 text-xs text-text-primary focus:border-primary-container focus:outline-none leading-relaxed font-sans transition-colors placeholder:text-text-muted"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-text-muted">
              {jobText.trim()
                ? `${jobText.trim().split(/\s+/).length} words detected`
                : "Requires job posting text to compute parity"}
            </span>

            <button
              onClick={handleAnalyze}
              disabled={!jobText.trim() || isAnalyzing}
              className="inline-flex items-center gap-2 rounded-xl bg-primary-container text-on-primary px-5 py-2.5 text-xs sm:text-sm font-medium hover:bg-primary active:scale-[0.98] disabled:opacity-50 transition shadow-xs"
            >
              <Target className="h-4 w-4" />
              <span>{isAnalyzing ? "Analyzing Specification..." : "Analyze Job & Calculate Match"}</span>
            </button>
          </div>
        </div>

        {/* Tailored Result Success Banner */}
        {tailorResult && (
          <div className="rounded-xl border border-status-success/30 bg-surface p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-status-success/15 text-status-success flex items-center justify-center shrink-0 border border-status-success/20">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">
                    Tailored Resume Generated &amp; Saved to Vault
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5">
                    A customized resume copy has been produced and added to your versions ledger.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-surface-container-low px-4 py-2 rounded-xl border border-border-default shrink-0">
                <div className="text-center">
                  <div className="text-[10px] text-text-muted uppercase font-bold tracking-wider">Before</div>
                  <div className="text-base font-semibold text-text-muted">
                    {tailorResult.beforeScore}%
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-primary" />
                <div className="text-center">
                  <div className="text-[10px] text-status-success uppercase font-bold tracking-wider">
                    After Tailoring
                  </div>
                  <div className="text-lg font-bold text-status-success">
                    {tailorResult.afterScore}%
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-4 border border-border-default space-y-2">
              <h4 className="text-xs font-semibold text-text-primary">
                Optimizations Applied to Tailored Copy:
              </h4>
              <ul className="space-y-1 text-xs text-text-muted pl-4 list-disc">
                {tailorResult.changesMade.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => router.push("/builder")}
                className="inline-flex items-center gap-1.5 rounded-xl bg-primary-container text-on-primary px-4 py-2 text-xs font-medium hover:bg-primary transition shadow-xs"
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
            <div className="bg-surface rounded-xl border border-border-default p-6 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                    System Keyword &amp; Competency Parity
                  </div>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span
                      className={`text-4xl font-bold tracking-tight ${
                        matchData.matchScore >= 75
                          ? "text-status-success"
                          : matchData.matchScore >= 50
                          ? "text-status-warning"
                          : "text-status-error"
                      }`}
                    >
                      {matchData.matchScore}%
                    </span>
                    <span className="text-xs font-medium text-text-muted">
                      Match for &quot;{analysis.title || "Target Role"}&quot;
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleTailorResume}
                  disabled={isTailoring}
                  className="inline-flex items-center gap-2 rounded-xl bg-primary-container text-on-primary px-5 py-2.5 text-xs sm:text-sm font-medium hover:bg-primary active:scale-[0.98] disabled:opacity-50 transition shadow-xs shrink-0"
                >
                  <Wand2 className="h-4 w-4" />
                  <span>{isTailoring ? "Tailoring Resume..." : "Tailor Resume to This Job"}</span>
                </button>
              </div>

              <div className="mt-4 h-2 w-full bg-surface-container-low rounded-full overflow-hidden border border-border-default">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    matchData.matchScore >= 75
                      ? "bg-status-success"
                      : matchData.matchScore >= 50
                      ? "bg-status-warning"
                      : "bg-status-error"
                  }`}
                  style={{ width: `${matchData.matchScore}%` }}
                />
              </div>
            </div>

            {/* Keyword Gap Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface rounded-xl border border-border-default p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border-default">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-status-error" />
                    <span>Mandatory Qualifications ({analysis.requiredSkills.length})</span>
                  </h3>
                  <span className="text-[11px] font-semibold text-text-muted">
                    {matchData.matchedRequired.length} of {analysis.requiredSkills.length} Matched
                  </span>
                </div>

                {matchData.missingRequired.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-status-error mb-2">
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
                          className="inline-flex items-center gap-1 rounded-lg border border-border-default bg-surface-container-low px-2.5 py-1 text-xs font-medium text-status-error hover:border-status-error transition"
                        >
                          <Plus className="h-3 w-3" />
                          <span>{skill}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {matchData.matchedRequired.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-status-success mb-2">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Found in Resume ({matchData.matchedRequired.length}):</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {matchData.matchedRequired.map((skill, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 rounded-lg bg-surface-container-low border border-border-default px-2.5 py-1 text-xs font-medium text-status-success"
                        >
                          <Check className="h-3 w-3" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-surface rounded-xl border border-border-default p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border-default">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <span>Preferred / Nice-to-Have Skills ({analysis.preferredSkills.length})</span>
                  </h3>
                  <span className="text-[11px] font-semibold text-text-muted">
                    {matchData.matchedPreferred.length} of {analysis.preferredSkills.length} Matched
                  </span>
                </div>

                {matchData.missingPreferred.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-text-muted mb-2">
                      <span>Missing Preferred Skills:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {matchData.missingPreferred.map((skill, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleAddMissingSkill(skill)}
                          className="inline-flex items-center gap-1 rounded-lg border border-border-default bg-surface-container-low px-2.5 py-1 text-xs font-medium text-text-muted hover:text-text-primary hover:border-primary transition"
                        >
                          <Plus className="h-3 w-3" />
                          <span>{skill}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {matchData.matchedPreferred.length > 0 && (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-status-success mb-2">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Found in Resume ({matchData.matchedPreferred.length}):</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {matchData.matchedPreferred.map((skill, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 rounded-lg bg-surface-container-low border border-border-default px-2.5 py-1 text-xs font-medium text-status-success"
                        >
                          <Check className="h-3 w-3" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Experience & Education Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.experienceRequirements.length > 0 && (
                <div className="bg-surface rounded-xl border border-border-default p-4 shadow-xs">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary flex items-center gap-1.5 mb-2">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    <span>Experience Requirements</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-text-muted pl-4 list-disc">
                    {analysis.experienceRequirements.map((exp, i) => (
                      <li key={i}>{exp}</li>
                    ))}
                  </ul>
                </div>
              )}

              {analysis.educationRequirements.length > 0 && (
                <div className="bg-surface rounded-xl border border-border-default p-4 shadow-xs">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-text-primary flex items-center gap-1.5 mb-2">
                    <GraduationCap className="h-3.5 w-3.5 text-secondary" />
                    <span>Education Requirements</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-text-muted pl-4 list-disc">
                    {analysis.educationRequirements.map((edu, i) => (
                      <li key={i}>{edu}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
