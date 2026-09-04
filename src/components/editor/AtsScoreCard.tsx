"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useResumeStore } from "@/store/useResumeStore";
import { calculateAtsScore } from "@/lib/atsScoring";
import { Sparkles, ShieldCheck } from "lucide-react";

export function AtsScoreCard() {
  const { resume } = useResumeStore();

  const analysis = useMemo(() => {
    return calculateAtsScore(resume);
  }, [resume]);

  const score = analysis.overallScore;

  const scoreColor =
    score >= 80
      ? "text-emerald-600 dark:text-emerald-400"
      : score >= 60
      ? "text-amber-600 dark:text-amber-400"
      : "text-rose-600 dark:text-rose-400";

  const progressBg =
    score >= 80
      ? "bg-emerald-500"
      : score >= 60
      ? "bg-amber-500"
      : "bg-rose-500";

  return (
    <div className="w-full shrink-0 rounded-xl border border-border-default bg-surface p-4 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-fixed/30 text-primary">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">
              ATS Optimization Score
            </h4>
          </div>
        </div>
        <div className="flex items-baseline gap-1">
          <span className={`text-xl font-black ${scoreColor}`}>{score}</span>
          <span className="text-xs font-semibold text-text-muted">/ 100</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-surface-container-low">
        <div
          className={`h-full transition-all duration-500 ease-out ${progressBg}`}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Factor Pills */}
      <div className="mt-3 grid grid-cols-3 gap-1.5 text-center text-[10px]">
        <div className="rounded bg-surface-container-low py-1 border border-border-default">
          <span className="text-text-muted block">Keywords</span>
          <span className="font-bold text-text-primary">{analysis.keywordMatch}%</span>
        </div>
        <div className="rounded bg-surface-container-low py-1 border border-border-default">
          <span className="text-text-muted block">Quality</span>
          <span className="font-bold text-text-primary">{analysis.contentQuality}%</span>
        </div>
        <div className="rounded bg-surface-container-low py-1 border border-border-default">
          <span className="text-text-muted block">Format</span>
          <span className="font-bold text-text-primary">{analysis.formattingSafety}%</span>
        </div>
      </div>

      {/* Suggestions and link to full analyzer */}
      {analysis.actionableSuggestions.length > 0 && (
        <div className="mt-3 rounded-lg bg-status-warning/10 border border-status-warning/20 p-2.5">
          <div className="flex items-center justify-between text-xs font-medium text-status-warning">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Recommended Improvements:</span>
            </span>
            <Link
              href="/ats-analyzer"
              className="text-[10px] font-bold text-primary hover:underline"
            >
              Full Audit →
            </Link>
          </div>
          <ul className="mt-1 space-y-1 text-xs text-text-muted pl-5 list-disc">
            {analysis.actionableSuggestions.slice(0, 2).map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
