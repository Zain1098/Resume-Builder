"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { analyzeJobDescription, matchResumeAgainstJob } from "@/lib/jobAnalyzer";
import { X, Search, CheckCircle2, AlertCircle, Plus, Sparkles, Star, Check } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-xl border border-border-default bg-surface p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-border-default">
          <div>
            <h3 className="text-base font-semibold text-text-primary flex items-center gap-2">
              <Search className="h-4 w-4 text-primary" />
              <span>Job Description Matcher &amp; ATS Gap Analysis</span>
            </h3>
            <p className="text-xs text-text-muted mt-0.5">
              Extract required vs. preferred keywords and discover exact match gaps against your resume.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-text-muted hover:text-text-primary hover:bg-surface-container-low transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Input Textarea */}
        <div className="mt-4 space-y-2">
          <label className="block text-xs font-semibold text-text-muted">
            Paste Job Description (Requirements, Responsibilities, or Stack):
          </label>
          <textarea
            rows={5}
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
            placeholder="e.g. We are looking for a Senior Full Stack Engineer with 4+ years experience in React, TypeScript, Next.js, Docker, Kubernetes, and AWS..."
            className="w-full rounded-xl border border-border-default bg-surface-container-low p-3 text-xs text-text-primary focus:border-primary-container focus:outline-none leading-relaxed transition-colors placeholder:text-text-muted"
          />

          <div className="flex justify-end">
            <button
              onClick={handleAnalyze}
              disabled={!jobText.trim()}
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary-container text-on-primary px-4 py-2 text-xs font-medium hover:bg-primary active:scale-[0.98] disabled:opacity-50 transition shadow-xs"
            >
              <Sparkles className="h-3.5 w-3.5 text-secondary" />
              <span>Analyze Match &amp; Scan Keywords</span>
            </button>
          </div>
        </div>

        {/* Analysis Results */}
        {analyzed && matchResult && (
          <div className="mt-5 pt-4 border-t border-border-default space-y-4">
            {/* Match Score */}
            <div className="flex items-center justify-between rounded-xl bg-surface-container-low p-4 border border-border-default">
              <div>
                <span className="text-xs font-semibold text-text-primary block">
                  ATS Parity &amp; Keyword Match
                </span>
                <span className="text-[10px] text-text-muted">
                  Weighted: 65% Required, 20% Preferred, 15% Soft Competencies
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span
                  className={`text-2xl font-bold ${
                    matchResult.matchScore >= 75
                      ? "text-status-success"
                      : matchResult.matchScore >= 50
                      ? "text-status-warning"
                      : "text-status-error"
                  }`}
                >
                  {matchResult.matchScore}%
                </span>
              </div>
            </div>

            {/* 1. Missing Required Skills */}
            {matchResult.missingRequired.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-status-error mb-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>Missing Required Skills ({matchResult.missingRequired.length}) — Click to Add:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {matchResult.missingRequired.map((kw, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddMissingSkill(kw)}
                      className="inline-flex items-center gap-1 rounded-lg border border-border-default bg-surface-container-low px-2.5 py-1 text-xs font-medium text-status-error hover:border-status-error transition"
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
                <div className="flex items-center gap-1.5 text-xs font-semibold text-status-success mb-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Matched Required Skills ({matchResult.matchedRequired.length}):</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {matchResult.matchedRequired.map((kw, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 rounded-lg bg-surface-container-low border border-border-default px-2.5 py-1 text-xs font-medium text-status-success"
                    >
                      <Check className="h-3 w-3" />
                      <span>{kw}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Preferred / Nice-to-Have Skills */}
            {(matchResult.missingPreferred.length > 0 || matchResult.matchedPreferred.length > 0) && (
              <div className="pt-2 border-t border-border-default">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-text-muted mb-2">
                  <Star className="h-3.5 w-3.5 text-secondary" />
                  <span>Preferred / Nice-to-Have Skills:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {matchResult.matchedPreferred.map((kw, idx) => (
                    <span
                      key={`pref-match-${idx}`}
                      className="inline-flex items-center gap-1 rounded-lg bg-surface-container-low border border-border-default px-2 py-0.5 text-xs font-medium text-primary"
                    >
                      <Check className="h-3 w-3" />
                      <span>{kw}</span>
                    </span>
                  ))}
                  {matchResult.missingPreferred.map((kw, idx) => (
                    <button
                      key={`pref-miss-${idx}`}
                      type="button"
                      onClick={() => handleAddMissingSkill(kw)}
                      className="inline-flex items-center gap-1 rounded-lg border border-border-default bg-surface px-2 py-0.5 text-xs text-text-muted hover:text-text-primary hover:border-primary transition"
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
