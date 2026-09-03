"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/common/Navbar";
import { useResumeStore } from "@/store/useResumeStore";
import { generateLinkedInProfile } from "@/lib/aiService";
import {
  Share2,
  Copy,
  Check,
  Sparkles,
  Tag,
  Briefcase,
} from "lucide-react";

export default function LinkedInToolsPage() {
  const { resume } = useResumeStore();
  const [targetJob, setTargetJob] = useState(resume.personalInfo.jobTitle || "");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-xs font-semibold text-slate-500">Loading LinkedIn Studio...</p>
        </div>
      </div>
    );
  }

  const profile = generateLinkedInProfile(resume, targetJob);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 mb-2">
              <Share2 className="h-4 w-4" />
              <span>Career Presence Suite</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              LinkedIn Profile &amp; Headline Optimizer
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
              Generate factually grounded LinkedIn headlines, About summaries, and skill recommendations.
            </p>
          </div>
        </div>

        {/* Target Job Position Input */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 w-full">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Target Headline Role:
            </label>
            <input
              type="text"
              value={targetJob}
              onChange={(e) => setTargetJob(e.target.value)}
              placeholder="e.g. Senior Frontend Engineer / Full Stack Architect"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        {/* 1. Optimized Headlines */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>High-Click-Through LinkedIn Headlines</span>
          </h2>

          <div className="space-y-3">
            {profile.headlines.map((hl, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-850/50 hover:border-blue-300 transition"
              >
                <div className="text-xs font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                  {hl}
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(hl, `hl-${idx}`)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 shrink-0"
                >
                  {copiedKey === `hl-${idx}` ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 2. About Section */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-blue-600" />
              <span>Optimized LinkedIn &apos;About&apos; Summary</span>
            </h2>

            <button
              type="button"
              onClick={() => handleCopy(profile.aboutSection, "about")}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              {copiedKey === "about" ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Copied About</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
          </div>

          <pre className="rounded-xl bg-slate-50 p-4 font-sans text-xs text-slate-800 dark:bg-slate-950 dark:text-slate-200 whitespace-pre-wrap leading-relaxed border border-slate-100 dark:border-slate-800">
            {profile.aboutSection}
          </pre>
        </div>

        {/* 3. Suggested Skills for Endorsements */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <Tag className="h-4 w-4 text-emerald-600" />
            <span>Recommended Skills for LinkedIn Endorsements</span>
          </h2>
          <div className="flex flex-wrap gap-2 pt-1">
            {profile.suggestedSkills.map((sk, idx) => (
              <span
                key={idx}
                className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-100 dark:border-blue-900/40"
              >
                {sk}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
