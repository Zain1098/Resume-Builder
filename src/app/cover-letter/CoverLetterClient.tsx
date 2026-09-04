"use client";

import React, { useState, useEffect } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { generateCoverLetter, CoverLetterTone } from "@/lib/aiService";
import {
  Sparkles,
  Copy,
  Check,
  Download,
  Printer,
  Layers,
} from "lucide-react";
import confetti from "canvas-confetti";

export function CoverLetterClient() {
  const { resume } = useResumeStore();
  const [jobText, setJobText] = useState("");
  const [tone, setTone] = useState<CoverLetterTone>("professional");
  const [letterContent, setLetterContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    generateCoverLetter(resume, "", "professional").then((txt) => {
      setLetterContent(txt);
    });
  }, [resume]);

  if (!isMounted) {
    return (
      <div className="w-full py-16 flex items-center justify-center bg-bg-canvas">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-container border-t-transparent" />
          <p className="text-xs font-semibold text-text-muted tracking-wide">
            Loading Cover Letter Studio...
          </p>
        </div>
      </div>
    );
  }

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const generated = await generateCoverLetter(resume, jobText, tone);
      setLetterContent(generated);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(letterContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([letterContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${resume.personalInfo.fullName.replace(/\s+/g, "_") || "Applicant"}_Cover_Letter.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const wordCount = letterContent.trim().split(/\s+/).filter(Boolean).length;

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
              <span className="text-primary font-semibold">Cover Letter Studio</span>
            </div>
            <div className="flex items-baseline gap-3 mt-1">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
                Targeted Cover Letter Studio
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-surface-container-low text-text-muted border border-border-default">
                Grounded in Active Vault
              </span>
            </div>
            <p className="text-xs sm:text-sm text-text-muted max-w-3xl mt-0.5">
              Generate an executive, factually grounded cover letter directly synced with your verified career ledger. Fact-checks prevent AI hallucinations or unwarranted seniority claims.
            </p>
          </div>
        </div>
      </div>

      {/* Workspace Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-surface rounded-xl border border-border-default p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-border-default pb-3">
                <h2 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                  1. Target Opportunity
                </h2>
                <span className="text-[11px] text-text-muted">Optional Context</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-muted mb-1.5">
                  Paste Job Posting or Role Description
                </label>
                <textarea
                  rows={5}
                  value={jobText}
                  onChange={(e) => setJobText(e.target.value)}
                  placeholder="Paste job posting here to auto-extract company requirements, core tone, and role demands..."
                  className="w-full rounded-xl border border-border-default bg-surface p-3 text-xs text-text-primary focus:border-primary-container focus:outline-none leading-relaxed transition-colors placeholder:text-text-muted"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-muted mb-2">
                  2. Editorial Tone &amp; Style
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["professional", "confident", "concise", "traditional"] as CoverLetterTone[]).map(
                    (t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTone(t)}
                        className={`rounded-xl border p-2.5 text-left text-xs font-medium capitalize transition shadow-xs ${
                          tone === t
                            ? "border-primary-container bg-primary-container text-on-primary"
                            : "border-border-default bg-surface text-text-primary hover:bg-surface-container-low"
                        }`}
                      >
                        {t}
                      </button>
                    )
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary-container text-on-primary py-2.5 text-xs sm:text-sm font-medium hover:bg-primary active:scale-[0.98] disabled:opacity-50 transition shadow-xs"
              >
                <Sparkles className="h-4 w-4" />
                <span>{isGenerating ? "Synthesizing Letter..." : "Generate AI Cover Letter"}</span>
              </button>
            </div>

            {/* Grounding Source Context Pill */}
            <div className="rounded-xl border border-border-default bg-surface p-4 shadow-xs text-xs text-text-muted space-y-1">
              <div className="flex items-center gap-1.5 text-text-primary font-semibold">
                <Layers className="h-3.5 w-3.5 text-primary" />
                <span>Verified Grounding Source:</span>
              </div>
              <p className="leading-relaxed">
                Active Profile: <strong className="text-text-primary">{resume.personalInfo.fullName || "Candidate"}</strong> ({resume.experiences.length} logged roles, {resume.skillCategories.flatMap((c) => c.skills).length} competencies). Verifiable metrics are strictly preserved.
              </p>
            </div>
          </div>

          {/* Letter Editor Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-surface rounded-xl border border-border-default p-6 shadow-xs flex flex-col justify-between min-h-[560px]">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border-default gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                      Document Draft
                    </span>
                    <span className="text-[11px] text-text-muted">
                      ({wordCount} words)
                    </span>
                  </div>

                  <div className="flex items-center flex-wrap gap-1.5">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1 rounded-xl border border-border-default bg-surface px-2.5 py-1.5 text-xs font-medium text-text-primary hover:bg-surface-container-low transition shadow-xs"
                    >
                      {copied ? (
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

                    <button
                      type="button"
                      onClick={handleDownloadTxt}
                      className="inline-flex items-center gap-1 rounded-xl border border-border-default bg-surface px-2.5 py-1.5 text-xs font-medium text-text-primary hover:bg-surface-container-low transition shadow-xs"
                    >
                      <Download className="h-3.5 w-3.5 text-text-muted" />
                      <span>Download .TXT</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-1 rounded-xl border border-border-default bg-surface px-2.5 py-1.5 text-xs font-medium text-text-primary hover:bg-surface-container-low transition shadow-xs"
                    >
                      <Printer className="h-3.5 w-3.5 text-text-muted" />
                      <span>Print</span>
                    </button>
                  </div>
                </div>

                <textarea
                  rows={20}
                  value={letterContent}
                  onChange={(e) => setLetterContent(e.target.value)}
                  className="w-full resize-y rounded-xl border border-border-default bg-surface-container-low p-4 font-sans text-xs sm:text-sm text-text-primary focus:border-primary-container focus:outline-none leading-relaxed transition-colors"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
