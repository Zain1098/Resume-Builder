"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import {
  FileText,
  Download,
  Sparkles,
  RotateCcw,
  FileCode,
  Target,
  Printer,
  Loader2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { ImportExportModal } from "@/components/editor/ImportExportModal";
import { RoleSelectorModal } from "@/components/editor/RoleSelectorModal";
import { JobDescriptionMatcherModal } from "@/components/editor/JobDescriptionMatcherModal";
import { exportResumeToPdf } from "@/lib/pdfExport";

export function Navbar() {
  const { resume, clearResume, previewTab, setPreviewTab } = useResumeStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [jdModalOpen, setJdModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Direct High-Resolution PDF File Download
  const handleDownloadPdf = async () => {
    try {
      setIsExporting(true);
      const filename = `${resume.personalInfo.fullName.replace(/\s+/g, "_") || "Resume"}_CV.pdf`;
      const success = await exportResumeToPdf("resume-print-canvas", filename);

      if (success) {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        // Fallback to native print if canvas export fails
        window.print();
      }
    } catch {
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  // Browser Print Dialog
  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to clear your resume? You can load sample data anytime."
      )
    ) {
      clearResume();
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-slate-800 dark:bg-slate-900/90 print:hidden">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/20">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                  CareerCraft
                </span>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                  ATS Pro
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Production-Ready Live Resume Builder
              </p>
            </div>
          </div>

          {/* Mobile / Tablet Tab Switcher */}
          <div className="flex lg:hidden rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
            <button
              onClick={() => setPreviewTab("edit")}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                previewTab === "edit"
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              Editor
            </button>
            <button
              onClick={() => setPreviewTab("preview")}
              className={`rounded-md px-3 py-1 text-xs font-semibold transition-all ${
                previewTab === "preview"
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              Preview
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Role Profiles Picker */}
            <button
              onClick={() => setRoleModalOpen(true)}
              title="Choose a tailored role preset (Dev, AI, UI/UX, Grad)"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span className="hidden sm:inline">Role Presets</span>
            </button>

            {/* Target Job Matcher */}
            <button
              onClick={() => setJdModalOpen(true)}
              title="Match resume against Job Description keywords"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <Target className="h-3.5 w-3.5 text-emerald-500" />
              <span className="hidden md:inline">JD Matcher</span>
            </button>

            {/* Import / Export JSON */}
            <button
              onClick={() => setModalOpen(true)}
              title="Import or Export JSON"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <FileCode className="h-3.5 w-3.5 text-blue-500" />
              <span className="hidden lg:inline">Backup</span>
            </button>

            {/* Reset */}
            <button
              onClick={handleReset}
              title="Reset all fields"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-medium text-red-600 shadow-sm transition hover:bg-red-50 dark:border-slate-700 dark:bg-slate-800 dark:text-red-400 dark:hover:bg-red-950/30"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden xl:inline">Reset</span>
            </button>

            {/* Print button */}
            <button
              onClick={handlePrint}
              title="Print via browser dialog"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              <Printer className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
              <span>Print</span>
            </button>

            {/* Download PDF Button */}
            <button
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white shadow-md shadow-blue-500/25 transition hover:from-blue-700 hover:to-indigo-700 active:scale-95 disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  <span>Download PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Modals */}
      <ImportExportModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <RoleSelectorModal
        isOpen={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
      />

      <JobDescriptionMatcherModal
        isOpen={jdModalOpen}
        onClose={() => setJdModalOpen(false)}
      />
    </>
  );
}
