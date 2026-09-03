"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { analyzeJobDescription, matchResumeAgainstJob } from "@/lib/jobAnalyzer";
import { X, Search, CheckCircle2, AlertCircle, Plus, Sparkles, Star } from "lucide-react";

interface JobDescriptionMatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function JobDescriptionMatcherModal({
  isOpen,
  onClose,
}: JobDescriptionMatcherModalProps) {
  const { resume, addSkillToCategory, addSkillCategory } = useResumeStore();
  const [jobText, setJobText] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [matchResult, setMatchResult] = useState<ReturnType<typeof matchResumeAgainstJob> | null>(null);

  if (!isOpen) return null;

  const handleAnalyze = () => {
    if (!jobText.trim()) return;
    const analysis = analyzeJobDescription(jobText);
    const result = matchResumeAgainstJob(resume, analysis);
    setMatchResult(result);
    setAnalyzed(true);
  };

  const handleAddMissingSkill = (skill: string) => {
    const targetCat = resume.skillCategories[0]?.id;
    if (targetCat) {
      addSkillToCategory(targetCat, skill);
    } else {
      addSkillCategory();
    }
    if (matchResult) {
      setMatchResult({
        ...matchResult,
        missingRequired: matchResult.missingRequired.filter((s) => s !== skill),
        matchedRequired: [...matchResult.matchedRequired, skill],
        missingPreferred: matchResult.missingPreferred.filter((s) => s !== skill),
        matchedPreferred: matchResult.missingPreferred.includes(skill)
          ? [...matchResult.matchedPreferred, skill]
          : matchResult.matchedPreferred,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-600" />
              <span>Job Description Matcher & ATS Gap Analysis</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Extract required vs. preferred keywords and discover exact match gaps.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Input Textarea */}
        <div className="mt-4">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Paste Job Description (Requirements, Responsibilities, or Tech Stack):
          </label>
          <textarea
            rows={5}
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
            placeholder="e.g. We are looking for a Senior Full Stack Engineer with 4+ years experience in React, TypeScript, Next.js, Docker, Kubernetes, and AWS..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white leading-relaxed"
          />

          <div className="mt-2.5 flex justify-end">
            <button
              onClick={handleAnalyze}
              disabled={!jobText.trim()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-95 disabled:opacity-50 transition"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              <span>Analyze Match &amp; Scan Keywords</span>
            </button>
          </div>
        </div>

        {/* Analysis Results */}
        {analyzed && matchResult && (
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
            {/* Match Score */}
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3.5 dark:bg-slate-850">
              <div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  ATS Compatibility &amp; Job Match
                </span>
                <span className="text-[10px] text-slate-400">
                  Weighted: 65% Required, 20% Preferred, 15% Soft Competencies
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span
                  className={`text-2xl font-black ${
                    matchResult.matchScore >= 75
                      ? "text-emerald-600 dark:text-emerald-400"
                      : matchResult.matchScore >= 50
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {matchResult.matchScore}%
                </span>
              </div>
            </div>

            {/* 1. Missing Required Skills */}
            {matchResult.missingRequired.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 mb-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>Missing Required Skills ({matchResult.missingRequired.length}) — Click to Add:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {matchResult.missingRequired.map((kw, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddMissingSkill(kw)}
                      className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100 transition dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300"
                    >
                      <Plus className="h-3 w-3" />
                      <span>{kw}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Matched Required Skills */}
            {matchResult.matchedRequired.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Matched Required Skills ({matchResult.matchedRequired.length}):</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {matchResult.matchedRequired.map((kw, idx) => (
                    <span
                      key={idx}
                      className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                    >
                      ✓ {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Preferred / Nice-to-Have Skills */}
            {(matchResult.missingPreferred.length > 0 || matchResult.matchedPreferred.length > 0) && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-850">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  <Star className="h-3.5 w-3.5 text-amber-500" />
                  <span>Preferred / Nice-to-Have Skills:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {matchResult.matchedPreferred.map((kw, idx) => (
                    <span
                      key={`pref-match-${idx}`}
                      className="rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
                    >
                      ✓ {kw}
                    </span>
                  ))}
                  {matchResult.missingPreferred.map((kw, idx) => (
                    <button
                      key={`pref-miss-${idx}`}
                      type="button"
                      onClick={() => handleAddMissingSkill(kw)}
                      className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-600 hover:bg-slate-100 transition dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400"
                    >
                      <Plus className="h-3 w-3" />
                      <span>{kw}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

