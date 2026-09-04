"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/common/Navbar";
import { useResumeStore } from "@/store/useResumeStore";
import { calculateAtsScore } from "@/lib/atsScoring";
import {
  ShieldCheck,
  Target,
  PenTool,
  Copy,
  Trash2,
  Download,
  Plus,
  Crown,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { ActionPromptModal } from "@/components/common/ActionPromptModal";

export default function DashboardPage() {
  const router = useRouter();
  const {
    resumes,
    activeResumeId,
    masterResumeId,
    switchResume,
    createResume,
    duplicateResume,
    deleteResume,
    resume,
  } = useResumeStore();

  const [isMounted, setIsMounted] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    description?: string;
    mode: "prompt" | "confirm" | "alert";
    defaultValue?: string;
    isDestructive?: boolean;
    confirmText?: string;
    onConfirm: (val?: string) => void;
  }>({
    isOpen: false,
    title: "",
    mode: "prompt",
    onConfirm: () => {},
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-canvas">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-container border-t-transparent" />
          <p className="text-xs font-semibold text-text-muted tracking-wide">
            Loading Career Dashboard...
          </p>
        </div>
      </div>
    );
  }

  const activeDoc = resumes.find((r) => r.id === activeResumeId) || resumes[0];
  const masterDoc = resumes.find((r) => r.id === masterResumeId) || resumes[0];

  // Calculate detailed score breakdown for active document
  const scoreBreakdown = calculateAtsScore(activeDoc ? activeDoc.data : resume);

  const handleCreateNew = () => {
    setModalConfig({
      isOpen: true,
      title: "Create New Resume Version",
      description: "Enter a title for this new targeted resume version.",
      mode: "prompt",
      defaultValue: "Frontend Engineer Resume",
      confirmText: "Create & Open",
      onConfirm: (val) => {
        if (val) {
          createResume(val, "");
          router.push("/builder");
        }
      },
    });
  };

  const handleDuplicate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    duplicateResume(id);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (resumes.length <= 1) {
      setModalConfig({
        isOpen: true,
        title: "Cannot Delete Resume",
        description: "You cannot delete the only remaining resume in your profile.",
        mode: "alert",
        confirmText: "Understood",
        onConfirm: () => {},
      });
      return;
    }
    const target = resumes.find((r) => r.id === id);
    setModalConfig({
      isOpen: true,
      title: "Delete Resume",
      description: `Are you sure you want to delete "${target?.title || "this resume"}"?`,
      mode: "confirm",
      isDestructive: true,
      confirmText: "Delete",
      onConfirm: () => {
        deleteResume(id);
      },
    });
  };

  const handleDownload = (doc: (typeof resumes)[0], e: React.MouseEvent) => {
    e.stopPropagation();
    switchResume(doc.id);
    router.push("/builder");
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg-canvas text-text-primary">
      <Navbar />

      <main className="flex-1 w-full pb-16">
        {/* Top Context Sub-Header Bar */}
        <div className="w-full bg-surface border-b border-border-default px-4 sm:px-6 lg:px-12 py-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-text-muted text-[11px] font-semibold uppercase tracking-wider">
                <span>Workspace</span>
                <span className="text-border-default">/</span>
                <span>{resume.personalInfo.fullName || "Candidate"}</span>
                <span className="text-border-default">/</span>
                <span className="text-primary font-semibold">Executive Dashboard</span>
              </div>
              <div className="flex items-baseline gap-3 mt-1">
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
                  Career Intelligence Dashboard
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-surface-container-low text-text-muted border border-border-default">
                  Live Audit Active
                </span>
              </div>
              <p className="text-xs sm:text-sm text-text-muted max-w-3xl mt-0.5">
                Monitor ATS diagnostic health, manage tailored career variants, and track candidate-led opportunity benchmarks.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center">
              <Link
                href="/job-matcher"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border-default bg-surface px-3.5 py-2 text-xs font-medium text-text-primary hover:bg-surface-container-low transition-colors shadow-xs"
              >
                <Target className="h-3.5 w-3.5 text-primary" />
                <span>Tailor to Job</span>
              </Link>

              <button
                onClick={handleCreateNew}
                className="inline-flex items-center gap-1.5 rounded-xl bg-primary-container text-on-primary px-3.5 py-2 text-xs font-medium hover:bg-primary transition shadow-xs"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>New Resume</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-8 space-y-8">
          {/* Top 4 Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* 1. Overall Score */}
            <div className="bg-surface rounded-xl border border-border-default p-5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-text-muted mb-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider">Overall ATS Score</span>
                <ShieldCheck className="h-4 w-4 text-primary" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-bold tracking-tight text-text-primary">
                  {scoreBreakdown.overallScore}
                </span>
                <span className="text-xs font-semibold text-text-muted">/ 100</span>
              </div>
              <div className="mt-3 h-1.5 w-full bg-surface-container-low rounded-full overflow-hidden border border-border-default">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    scoreBreakdown.overallScore >= 80
                      ? "bg-status-success"
                      : scoreBreakdown.overallScore >= 60
                      ? "bg-status-warning"
                      : "bg-status-error"
                  }`}
                  style={{ width: `${scoreBreakdown.overallScore}%` }}
                />
              </div>
            </div>

            {/* 2. Keyword Match */}
            <div className="bg-surface rounded-xl border border-border-default p-5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-text-muted mb-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider">Keyword Match</span>
                <Target className="h-4 w-4 text-status-success" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight text-text-primary">
                  {scoreBreakdown.keywordMatch}%
                </span>
              </div>
              <p className="text-[11px] text-text-muted mt-2">
                {scoreBreakdown.matchedKeywords.length} core keywords mapped
              </p>
            </div>

            {/* 3. Content Quality */}
            <div className="bg-surface rounded-xl border border-border-default p-5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-text-muted mb-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider">Content Quality</span>
                <Sparkles className="h-4 w-4 text-secondary" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight text-text-primary">
                  {scoreBreakdown.contentQuality}%
                </span>
              </div>
              <p className="text-[11px] text-text-muted mt-2">
                Action verbs &amp; impact metrics
              </p>
            </div>

            {/* 4. Format Safety */}
            <div className="bg-surface rounded-xl border border-border-default p-5 shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between text-text-muted mb-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider">Format Safety</span>
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold tracking-tight text-text-primary">
                  {scoreBreakdown.formattingSafety}%
                </span>
              </div>
              <p className="text-[11px] text-text-muted mt-2">
                Clean single-column standard
              </p>
            </div>
          </div>

          {/* Master Resume Spotlight Banner */}
          {masterDoc && (
            <div className="bg-surface rounded-xl border border-border-default p-6 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0">
                    <Crown className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-text-primary">
                        {masterDoc.title}
                      </h3>
                      <span className="rounded-md bg-surface-container-low border border-border-default px-2 py-0.5 text-[10px] font-bold text-text-muted uppercase tracking-wider">
                        Master Career Vault
                      </span>
                    </div>
                    <p className="text-xs text-text-muted mt-1 max-w-2xl leading-relaxed">
                      This is your comprehensive career archive. Keep all verified work experiences, metrics, and technical competencies updated here. Generate targeted resumes for specific jobs directly from this ledger.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <Link
                    href="/job-matcher"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-primary-container text-on-primary px-3.5 py-2 text-xs font-medium hover:bg-primary transition shadow-xs"
                  >
                    <Target className="h-3.5 w-3.5" />
                    <span>Generate Tailored Copy</span>
                  </Link>
                  <Link
                    href="/builder"
                    onClick={() => switchResume(masterDoc.id)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-border-default bg-surface px-3.5 py-2 text-xs font-medium text-text-primary hover:bg-surface-container-low transition shadow-xs"
                  >
                    <PenTool className="h-3.5 w-3.5" />
                    <span>Open in Studio</span>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Recommended ATS Improvements */}
          {scoreBreakdown.actionableSuggestions.length > 0 && (
            <div className="bg-surface rounded-xl border border-border-default p-5 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-secondary mb-3">
                <AlertTriangle className="h-4 w-4" />
                <span>Recommended Priority Improvements:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {scoreBreakdown.actionableSuggestions.slice(0, 4).map((sug, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-xs text-text-muted p-2.5 rounded-lg bg-surface-container-low border border-border-default"
                  >
                    <span className="text-secondary font-bold">•</span>
                    <span>{sug}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resumes Collection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-text-primary">
                  All Resume Versions ({resumes.length})
                </h2>
                <p className="text-xs text-text-muted mt-0.5">
                  Job-specific tailored variations alongside your master profile.
                </p>
              </div>
              <Link
                href="/resumes"
                className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
              >
                <span>View Career Vault Ledger</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resumes.map((doc) => {
                const isCurrent = doc.id === activeResumeId;
                return (
                  <div
                    key={doc.id}
                    onClick={() => {
                      switchResume(doc.id);
                      router.push("/builder");
                    }}
                    className={`cursor-pointer rounded-xl border p-5 transition-all flex flex-col justify-between shadow-xs bg-surface ${
                      isCurrent
                        ? "border-primary-container ring-1 ring-primary-container"
                        : "border-border-default hover:border-primary-container/40"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          {doc.isMaster ? (
                            <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                              <Crown className="h-3 w-3" />
                              Master
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-md bg-surface-container-low border border-border-default px-2 py-0.5 text-[10px] font-bold text-text-muted">
                              Tailored
                            </span>
                          )}
                          {isCurrent && (
                            <span className="text-[10px] font-semibold text-primary">
                              • Active
                            </span>
                          )}
                        </div>

                        <div className="flex items-baseline gap-1 bg-surface-container-low px-2 py-0.5 rounded border border-border-default">
                          <span
                            className={`text-xs font-bold ${
                              doc.atsScore >= 80
                                ? "text-status-success"
                                : doc.atsScore >= 60
                                ? "text-status-warning"
                                : "text-status-error"
                            }`}
                          >
                            {doc.atsScore}%
                          </span>
                          <span className="text-[10px] text-text-muted">ATS</span>
                        </div>
                      </div>

                      <h3 className="text-sm font-semibold text-text-primary truncate">
                        {doc.title}
                      </h3>
                      <p className="text-xs text-text-muted truncate mt-0.5">
                        {doc.targetRole || "General Application"}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-border-default flex items-center justify-between text-xs">
                      <span className="text-[11px] text-text-muted flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(doc.updatedAt).toLocaleDateString()}
                      </span>

                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={(e) => handleDuplicate(doc.id, e)}
                          title="Duplicate"
                          className="rounded-lg p-1.5 text-text-muted hover:text-text-primary hover:bg-surface-container-low transition"
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleDownload(doc, e)}
                          title="Open in Studio"
                          className="rounded-lg p-1.5 text-text-muted hover:text-text-primary hover:bg-surface-container-low transition"
                        >
                          <Download className="h-3.5 w-3.5" />
                        </button>

                        {!doc.isMaster && (
                          <button
                            type="button"
                            onClick={(e) => handleDelete(doc.id, e)}
                            title="Delete"
                            className="rounded-lg p-1.5 text-text-muted hover:text-status-error hover:bg-status-error/10 transition"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <ActionPromptModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig((prev) => ({ ...prev, isOpen: false }))}
        title={modalConfig.title}
        description={modalConfig.description}
        mode={modalConfig.mode}
        defaultValue={modalConfig.defaultValue}
        isDestructive={modalConfig.isDestructive}
        confirmText={modalConfig.confirmText}
        onConfirm={modalConfig.onConfirm}
      />
    </div>
  );
}
