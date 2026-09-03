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
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-xs font-semibold text-slate-500">Loading Dashboard...</p>
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

  const handleDownload = (doc: typeof resumes[0], e: React.MouseEvent) => {
    e.stopPropagation();
    switchResume(doc.id);
    router.push("/builder");
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Career Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
              Monitor your resume health, manage tailored versions, and inspect ATS compatibility.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/job-matcher"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
            >
              <Target className="h-4 w-4 text-emerald-500" />
              <span>Tailor to Job</span>
            </Link>

            <button
              onClick={handleCreateNew}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 active:scale-95 transition"
            >
              <Plus className="h-4 w-4" />
              <span>New Resume</span>
            </button>
          </div>
        </div>

        {/* Top Metric Cards: Resume Health Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* 1. Overall Score */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
              <span className="text-xs font-semibold">Overall ATS Score</span>
              <ShieldCheck className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {scoreBreakdown.overallScore}
              </span>
              <span className="text-xs font-bold text-slate-400">/ 100</span>
            </div>
            <div className="mt-2.5 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden dark:bg-slate-800">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  scoreBreakdown.overallScore >= 80
                    ? "bg-emerald-500"
                    : scoreBreakdown.overallScore >= 60
                    ? "bg-amber-500"
                    : "bg-rose-500"
                }`}
                style={{ width: `${scoreBreakdown.overallScore}%` }}
              />
            </div>
          </div>

          {/* 2. Keyword Match */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
              <span className="text-xs font-semibold">Keyword Match</span>
              <Target className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {scoreBreakdown.keywordMatch}%
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              {scoreBreakdown.matchedKeywords.length} keywords identified
            </p>
          </div>

          {/* 3. Content Quality */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
              <span className="text-xs font-semibold">Content Quality</span>
              <Sparkles className="h-4 w-4 text-amber-500" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {scoreBreakdown.contentQuality}%
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Action verbs & impact metrics
            </p>
          </div>

          {/* 4. Formatting Safety */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
              <span className="text-xs font-semibold">Format Safety</span>
              <CheckCircle2 className="h-4 w-4 text-sky-500" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-slate-900 dark:text-white">
                {scoreBreakdown.formattingSafety}%
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Clean standard headings
            </p>
          </div>
        </div>

        {/* Master Resume Spotlight Banner */}
        {masterDoc && (
          <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/70 via-indigo-50/30 to-white p-6 dark:border-blue-900/50 dark:from-blue-950/30 dark:via-slate-900 dark:to-slate-900 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md shadow-amber-500/20 shrink-0">
                  <Crown className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {masterDoc.title}
                    </h3>
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950/80 dark:text-amber-300">
                      MASTER RESUME
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
                    This is your comprehensive career archive. Keep all your work experiences, projects, and skills up to date here. Generate tailored resumes for specific job descriptions directly from this profile.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href="/job-matcher"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 shadow-sm transition"
                >
                  <Target className="h-3.5 w-3.5" />
                  <span>Generate Tailored Copy</span>
                </Link>
                <Link
                  href="/builder"
                  onClick={() => switchResume(masterDoc.id)}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 transition"
                >
                  <PenTool className="h-3.5 w-3.5" />
                  <span>Edit Master</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Actionable Suggestions Callout */}
        {scoreBreakdown.actionableSuggestions.length > 0 && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5 dark:border-amber-900/40 dark:bg-amber-950/20">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Recommended Immediate ATS Improvements:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {scoreBreakdown.actionableSuggestions.slice(0, 4).map((sug, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-amber-900 dark:text-amber-200/90">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{sug}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resumes Collection */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                All Resume Versions ({resumes.length})
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Job-specific tailored variations and master profile.
              </p>
            </div>
            <Link
              href="/resumes"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              Compare &amp; Manage All →
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
                  className={`cursor-pointer rounded-2xl border p-5 transition-all relative group flex flex-col justify-between ${
                    isCurrent
                      ? "border-blue-500 bg-white shadow-md ring-2 ring-blue-500/20 dark:border-blue-500 dark:bg-slate-900"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {doc.isMaster ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                            <Crown className="h-3 w-3" />
                            Master
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
                            Tailored
                          </span>
                        )}
                        {isCurrent && (
                          <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                            • Active in Editor
                          </span>
                        )}
                      </div>

                      <div className="flex items-baseline gap-1">
                        <span
                          className={`text-base font-black ${
                            doc.atsScore >= 80
                              ? "text-emerald-600 dark:text-emerald-400"
                              : doc.atsScore >= 60
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-rose-600 dark:text-rose-400"
                          }`}
                        >
                          {doc.atsScore}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">ATS</span>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {doc.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {doc.targetRole || "General Position"}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(doc.updatedAt).toLocaleDateString()}
                    </span>

                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={(e) => handleDuplicate(doc.id, e)}
                        title="Duplicate"
                        className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleDownload(doc, e)}
                        title="Download"
                        className="rounded p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </button>

                      {!doc.isMaster && (
                        <button
                          type="button"
                          onClick={(e) => handleDelete(doc.id, e)}
                          title="Delete"
                          className="rounded p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/40"
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
