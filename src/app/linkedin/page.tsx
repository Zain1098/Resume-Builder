"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/common/Navbar";
import { useResumeStore } from "@/store/useResumeStore";
import { generateLinkedInProfile } from "@/lib/aiService";
import {
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
      <div className="flex min-h-screen items-center justify-center bg-bg-canvas">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-container border-t-transparent" />
          <p className="text-xs font-semibold text-text-muted tracking-wide">
            Loading LinkedIn Studio...
          </p>
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
    <div className="flex min-h-screen flex-col bg-bg-canvas text-text-primary">
      <Navbar />

      <main className="flex-1 w-full pb-16">
        {/* Top Context Subheader */}
        <div className="w-full bg-surface border-b border-border-default px-4 sm:px-6 lg:px-12 py-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-text-muted text-[11px] font-semibold uppercase tracking-wider">
                <span>Workspace</span>
                <span className="text-border-default">/</span>
                <span>{resume.personalInfo.fullName || "Candidate"}</span>
                <span className="text-border-default">/</span>
                <span className="text-primary font-semibold">LinkedIn Optimizer</span>
              </div>
              <div className="flex items-baseline gap-3 mt-1">
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
                  LinkedIn Profile &amp; Headline Studio
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-surface-container-low text-text-muted border border-border-default">
                  Executive Presence
                </span>
              </div>
              <p className="text-xs sm:text-sm text-text-muted max-w-3xl mt-0.5">
                Generate factually grounded LinkedIn headlines, recruiter-optimized About narratives, and endorsement keywords aligned directly with your career ledger.
              </p>
            </div>
          </div>
        </div>

        {/* Studio Content */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 pt-8 space-y-6">
          {/* Target Job Position Input Card */}
          <div className="bg-surface rounded-xl border border-border-default p-5 shadow-xs flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-1 w-full">
              <label className="block text-xs font-semibold text-text-muted mb-1.5">
                Target Headline Role / Archetype:
              </label>
              <input
                type="text"
                value={targetJob}
                onChange={(e) => setTargetJob(e.target.value)}
                placeholder="e.g. Senior Full Stack Engineer / Distributed Systems Architect"
                className="w-full rounded-xl border border-border-default bg-surface px-3.5 py-2 text-xs text-text-primary focus:border-primary-container focus:outline-none transition-colors placeholder:text-text-muted"
              />
            </div>
          </div>

          {/* 1. Optimized Headlines */}
          <div className="bg-surface rounded-xl border border-border-default p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border-default pb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-secondary" />
                <span>High-Click-Through Executive Headlines</span>
              </h2>
              <span className="text-[11px] text-text-muted">Algorithm-optimized</span>
            </div>

            <div className="space-y-3">
              {profile.headlines.map((hl, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border-default bg-surface-container-low p-4 hover:border-primary-container transition shadow-xs"
                >
                  <div className="text-xs font-medium text-text-primary leading-relaxed">
                    {hl}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(hl, `hl-${idx}`)}
                    className="inline-flex items-center gap-1 self-end sm:self-center rounded-xl border border-border-default bg-surface px-3 py-1.5 text-xs font-medium text-text-primary hover:bg-surface-container-low transition shadow-xs shrink-0"
                  >
                    {copiedKey === `hl-${idx}` ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-status-success" />
                        <span className="text-status-success">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-text-muted" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 2. About Section */}
          <div className="bg-surface rounded-xl border border-border-default p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-border-default pb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" />
                <span>Optimized LinkedIn &apos;About&apos; Narrative</span>
              </h2>

              <button
                type="button"
                onClick={() => handleCopy(profile.aboutSection, "about")}
                className="inline-flex items-center gap-1 rounded-xl border border-border-default bg-surface px-3 py-1.5 text-xs font-medium text-text-primary hover:bg-surface-container-low transition shadow-xs"
              >
                {copiedKey === "about" ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-status-success" />
                    <span className="text-status-success">Copied About</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-text-muted" />
                    <span>Copy Text</span>
                  </>
                )}
              </button>
            </div>

            <pre className="rounded-xl bg-surface-container-low p-4 font-sans text-xs text-text-primary whitespace-pre-wrap leading-relaxed border border-border-default">
              {profile.aboutSection}
            </pre>
          </div>

          {/* 3. Suggested Skills for Endorsements */}
          <div className="bg-surface rounded-xl border border-border-default p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-border-default pb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-2">
                <Tag className="h-4 w-4 text-status-success" />
                <span>Recommended Skills for Profile Endorsements</span>
              </h2>
              <span className="text-[11px] text-text-muted">Top keywords</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {profile.suggestedSkills.map((sk, idx) => (
                <span
                  key={idx}
                  className="rounded-lg bg-surface-container-low border border-border-default px-3 py-1 text-xs font-medium text-text-primary"
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
