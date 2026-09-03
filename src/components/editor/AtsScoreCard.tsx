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
    <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:to-slate-900/60">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              ATS Optimization Score
            </h4>
          </div>
        </div>
        <div className="flex items-baseline gap-1">
          <span className={`text-xl font-black ${scoreColor}`}>{score}</span>
          <span className="text-xs font-semibold text-slate-400">/ 100</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className={`h-full transition-all duration-500 ease-out ${progressBg}`}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Factor Pills */}
      <div className="mt-3 grid grid-cols-3 gap-1.5 text-center text-[10px]">
        <div className="rounded bg-white dark:bg-slate-800 py-1 border border-slate-100 dark:border-slate-800">
          <span className="text-slate-400 block">Keywords</span>
          <span className="font-bold text-slate-700 dark:text-slate-300">{analysis.keywordMatch}%</span>
        </div>
        <div className="rounded bg-white dark:bg-slate-800 py-1 border border-slate-100 dark:border-slate-800">
          <span className="text-slate-400 block">Quality</span>
          <span className="font-bold text-slate-700 dark:text-slate-300">{analysis.contentQuality}%</span>
        </div>
        <div className="rounded bg-white dark:bg-slate-800 py-1 border border-slate-100 dark:border-slate-800">
          <span className="text-slate-400 block">Format</span>
          <span className="font-bold text-slate-700 dark:text-slate-300">{analysis.formattingSafety}%</span>
        </div>
      </div>

      {/* Suggestions and link to full analyzer */}
      {analysis.actionableSuggestions.length > 0 && (
        <div className="mt-3 rounded-lg bg-amber-50/70 p-2.5 dark:bg-amber-950/30">
          <div className="flex items-center justify-between text-xs font-medium text-amber-800 dark:text-amber-300">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Recommended Improvements:</span>
            </span>
            <Link
              href="/ats-analyzer"
              className="text-[10px] font-bold text-blue-600 hover:underline dark:text-blue-400"
            >
              Full Audit →
            </Link>
          </div>
          <ul className="mt-1 space-y-1 text-xs text-amber-700 dark:text-amber-400/90 pl-5 list-disc">
            {analysis.actionableSuggestions.slice(0, 2).map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
