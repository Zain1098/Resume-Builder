"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useResumeStore } from "@/store/useResumeStore";
import {
  FileText,
  Download,
  Sparkles,
  FileCode,
  Loader2,
  ChevronDown,
  Plus,
  Check,
  FileDown,
  Menu,
  X,
  Layers,
  Crown,
  Share2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { ImportExportModal } from "@/components/editor/ImportExportModal";
import { RoleSelectorModal } from "@/components/editor/RoleSelectorModal";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { exportResumeToPdf } from "@/lib/pdfExport";
import { exportResumeToDocx } from "@/lib/docxExport";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    resumes,
    activeResumeId,
    switchResume,
    createResume,
    resume,
    previewTab,
    setPreviewTab,
  } = useResumeStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [resumeMenuOpen, setResumeMenuOpen] = useState(false);
  const [downloadMenuOpen, setDownloadMenuOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const resumeMenuRef = useRef<HTMLDivElement>(null);
  const downloadMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (resumeMenuRef.current && !resumeMenuRef.current.contains(e.target as Node)) {
        setResumeMenuOpen(false);
      }
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(e.target as Node)) {
        setDownloadMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const activeDoc = resumes.find((r) => r.id === activeResumeId) || resumes[0];

  const handleDownloadPdf = async (mode: "vector" | "canvas" = "vector") => {
    try {
      setIsExporting(true);
      setDownloadMenuOpen(false);
      const filename = `${resume.personalInfo.fullName.replace(/\s+/g, "_") || "Resume"}_CV.pdf`;
      const success = await exportResumeToPdf("resume-print-canvas", filename, mode);

      if (success) {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } catch {
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadDocx = () => {
    setDownloadMenuOpen(false);
    const filename = `${resume.personalInfo.fullName.replace(/\s+/g, "_") || "Resume"}_ATS.doc`;
    exportResumeToDocx(resume, filename);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const handleCreateNew = () => {
    const title = prompt("Enter a title for the new resume version:", "Tailored Software Engineer");
    if (title) {
      createResume(title, "");
      setResumeMenuOpen(false);
      router.push("/builder");
    }
  };

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/resumes", label: "My Resumes" },
    { href: "/builder", label: "Builder" },
    { href: "/ats-analyzer", label: "ATS Analyzer" },
    { href: "/job-matcher", label: "Job Matcher" },
    { href: "/cover-letter", label: "Cover Letter" },
    { href: "/linkedin", label: "LinkedIn" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85 dark:border-slate-800 dark:bg-slate-900/90 print:hidden">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
          {/* Brand & Resume Selector */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <FileText className="h-5 w-5" />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                    CareerCraft
                  </span>
                  <span className="rounded-full bg-blue-100 px-2 py-0.2 text-[10px] font-bold text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                    ATS AI
                  </span>
                </div>
              </div>
            </Link>

            {/* Active Resume Selector Dropdown */}
            {activeDoc && (
              <div className="relative" ref={resumeMenuRef}>
                <button
                  type="button"
                  onClick={() => setResumeMenuOpen(!resumeMenuOpen)}
                  className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-800 hover:bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
                  title="Switch or manage resume versions"
                >
                  {activeDoc.isMaster ? (
                    <Crown className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                  ) : (
                    <Layers className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                  )}
                  <span className="max-w-[110px] sm:max-w-[150px] truncate">
                    {activeDoc.title}
                  </span>
                  <span className="hidden sm:inline rounded bg-emerald-100 px-1.5 py-0.2 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                    {activeDoc.atsScore} ATS
                  </span>
                  <ChevronDown className="h-3 w-3 text-slate-400" />
                </button>

                {resumeMenuOpen && (
                  <div className="absolute left-0 top-full mt-1.5 w-72 rounded-xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-800 dark:bg-slate-900 z-50">
                    <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Select Resume Version
                    </div>
                    <div className="max-h-60 overflow-y-auto space-y-1">
                      {resumes.map((doc) => {
                        const isCurrent = doc.id === activeResumeId;
                        return (
                          <button
                            key={doc.id}
                            type="button"
                            onClick={() => {
                              switchResume(doc.id);
                              setResumeMenuOpen(false);
                            }}
                            className={`flex w-full items-center justify-between rounded-lg p-2 text-left text-xs transition ${
                              isCurrent
                                ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-bold"
                                : "text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              {doc.isMaster && (
                                <Crown className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                              )}
                              <span className="truncate">{doc.title}</span>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="text-[10px] font-semibold text-slate-500">
                                {doc.atsScore}%
                              </span>
                              {isCurrent && <Check className="h-3.5 w-3.5 text-blue-600" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handleCreateNew}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 p-1 dark:text-blue-400"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>New Resume</span>
                      </button>
                      <Link
                        href="/resumes"
                        onClick={() => setResumeMenuOpen(false)}
                        className="text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white p-1"
                      >
                        Manage All →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                    isActive
                      ? "bg-slate-100 text-blue-600 dark:bg-slate-800 dark:text-blue-400"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Mobile / Tablet Tab Switcher (Only visible in /builder) */}
            {pathname === "/builder" && (
              <div className="flex lg:hidden rounded-lg bg-slate-100 p-0.5 dark:bg-slate-800">
                <button
                  onClick={() => setPreviewTab("edit")}
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                    previewTab === "edit"
                      ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => setPreviewTab("preview")}
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                    previewTab === "preview"
                      ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Preview
                </button>
              </div>
            )}

            {/* Quick Modals */}
            <button
              onClick={() => setRoleModalOpen(true)}
              title="Tailored role presets"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Presets</span>
            </button>

            <button
              onClick={() => setModalOpen(true)}
              title="Backup JSON"
              className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              <FileCode className="h-3.5 w-3.5 text-blue-500" />
              <span>Backup</span>
            </button>

            <ThemeToggle />

            {/* Export Dropdown */}
            <div className="relative" ref={downloadMenuRef}>
              <button
                type="button"
                onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
                disabled={isExporting}
                className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-md shadow-blue-500/25 transition hover:from-blue-700 hover:to-indigo-700 active:scale-95 disabled:opacity-50"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="hidden sm:inline">Exporting...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-3.5 w-3.5" />
                    <span>Download</span>
                    <ChevronDown className="h-3 w-3" />
                  </>
                )}
              </button>

              {downloadMenuOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-60 rounded-xl border border-slate-200 bg-white p-1.5 shadow-2xl dark:border-slate-800 dark:bg-slate-900 z-50">
                  <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Export Options
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDownloadPdf("vector")}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <Download className="h-4 w-4 text-blue-600" />
                    <div>
                      <div>Vector PDF (ATS Standard)</div>
                      <div className="text-[10px] font-normal text-slate-400">100% selectable text for ATS</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadDocx}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <FileDown className="h-4 w-4 text-indigo-600" />
                    <div>
                      <div>Word Document (.DOCX)</div>
                      <div className="text-[10px] font-normal text-slate-400">Editable Microsoft Word format</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownloadPdf("canvas")}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    <Share2 className="h-4 w-4 text-emerald-600" />
                    <div>
                      <div>High-Res Canvas Snapshot</div>
                      <div className="text-[10px] font-normal text-slate-400">Visual PDF rendering</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Drawer Toggle */}
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 xl:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileDrawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-out Drawer */}
        {mobileDrawerOpen && (
          <div className="xl:hidden border-t border-slate-200 bg-white px-4 py-3 shadow-lg dark:border-slate-800 dark:bg-slate-900 space-y-1">
            <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Navigation
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileDrawerOpen(false)}
                className={`block rounded-lg px-3 py-2 text-xs font-semibold ${
                  pathname === link.href
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setRoleModalOpen(true);
                  setMobileDrawerOpen(false);
                }}
                className="flex-1 rounded-lg border border-slate-200 py-2 text-center text-xs font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-300"
              >
                Role Presets
              </button>
              <button
                type="button"
                onClick={() => {
                  setModalOpen(true);
                  setMobileDrawerOpen(false);
                }}
                className="flex-1 rounded-lg border border-slate-200 py-2 text-center text-xs font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-300"
              >
                JSON Backup
              </button>
            </div>
          </div>
        )}
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
    </>
  );
}
