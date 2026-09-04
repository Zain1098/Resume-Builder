"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useResumeStore } from "@/store/useResumeStore";
import {
  Download,
  Sparkles,
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
  FileText,
  Upload,
} from "lucide-react";
import confetti from "canvas-confetti";
import { ImportExportModal } from "@/components/editor/ImportExportModal";
import { RoleSelectorModal } from "@/components/editor/RoleSelectorModal";
import { ActionPromptModal } from "@/components/common/ActionPromptModal";
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
  const [newResumeModalOpen, setNewResumeModalOpen] = useState(false);

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

  // Handle open-resume-import event or ?action=import url param
  useEffect(() => {
    const handleOpen = () => setModalOpen(true);
    window.addEventListener("open-resume-import", handleOpen);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("action") === "import" || params.get("import") === "true") {
        setModalOpen(true);
      }
    }

    return () => window.removeEventListener("open-resume-import", handleOpen);
  }, [pathname]);

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
    setResumeMenuOpen(false);
    setNewResumeModalOpen(true);
  };

  const handleConfirmCreateNew = (title?: string) => {
    if (title) {
      createResume(title, "");
      router.push("/builder");
    }
  };

  const navLinks = [
    { href: "/builder", label: "Builder" },
    { href: "/resume-templates", label: "Templates" },
    { href: "/ats-analyzer", label: "ATS Checker" },
    { href: "/job-matcher", label: "Job Matcher" },
    { href: "/cover-letter", label: "Cover Letter" },
    { href: "/linkedin", label: "LinkedIn" },
    { href: "/guides/ats-friendly-resume-guide", label: "ATS Guide" },
    { href: "/resumes", label: "My Resumes" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border-default bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/85 print:hidden">
        <div className="mx-auto flex h-16 max-w-[1720px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand & Resume Selector */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-container text-on-primary shadow-sm transition-transform group-hover:scale-105">
                <FileText className="h-5 w-5" />
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-semibold tracking-tight text-text-primary">
                    Resumist
                  </span>
                  <span className="rounded bg-primary-fixed/30 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                    Editorial
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
                  className="flex items-center gap-2 rounded-lg border border-border-default bg-surface-container-low px-2.5 py-1.5 text-xs font-medium text-text-primary hover:bg-surface hover:border-text-muted/40 transition"
                  title="Switch or manage resume versions"
                >
                  {activeDoc.isMaster ? (
                    <Crown className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                  ) : (
                    <Layers className="h-3.5 w-3.5 text-primary shrink-0" />
                  )}
                  <span className="max-w-[110px] sm:max-w-[150px] truncate">
                    {activeDoc.title}
                  </span>
                  <span className="hidden sm:inline rounded bg-status-success/15 px-1.5 py-0.5 text-[10px] font-semibold text-status-success">
                    {activeDoc.atsScore}% ATS
                  </span>
                  <ChevronDown className="h-3 w-3 text-text-muted" />
                </button>

                {resumeMenuOpen && (
                  <div className="absolute left-0 top-full mt-1.5 w-72 rounded-xl border border-border-default bg-surface p-2 shadow-xl z-50">
                    <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-text-muted">
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
                                ? "bg-surface-container-low text-primary font-semibold border border-primary/20"
                                : "text-text-primary hover:bg-surface-container-low"
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              {doc.isMaster && (
                                <Crown className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                              )}
                              <span className="truncate">{doc.title}</span>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="text-[10px] text-text-muted">
                                {doc.atsScore}%
                              </span>
                              {isCurrent && <Check className="h-3.5 w-3.5 text-primary" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    <div className="mt-2 pt-2 border-t border-border-default flex items-center justify-between">
                      <button
                        type="button"
                        onClick={handleCreateNew}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline p-1"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>New Resume</span>
                      </button>
                      <Link
                        href="/resumes"
                        onClick={() => setResumeMenuOpen(false)}
                        className="text-xs font-medium text-text-muted hover:text-text-primary p-1"
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
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-medium transition-colors pb-1 border-b-2 ${
                    isActive
                      ? "text-text-primary font-semibold border-primary-container"
                      : "text-text-muted hover:text-text-primary border-transparent"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Mobile / Tablet Tab Switcher (Only visible in /builder) */}
            {pathname === "/builder" && (
              <div className="flex lg:hidden rounded-lg bg-surface-container-low p-0.5 border border-border-default">
                <button
                  onClick={() => setPreviewTab("edit")}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                    previewTab === "edit"
                      ? "bg-surface text-text-primary shadow-xs font-semibold"
                      : "text-text-muted"
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => setPreviewTab("preview")}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                    previewTab === "preview"
                      ? "bg-surface text-text-primary shadow-xs font-semibold"
                      : "text-text-muted"
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
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-border-default bg-surface px-2.5 py-1.5 text-xs font-medium text-text-primary hover:bg-surface-container-low transition"
            >
              <Sparkles className="h-3.5 w-3.5 text-secondary" />
              <span>Presets</span>
            </button>

            <button
              onClick={() => setModalOpen(true)}
              title="Import Resume (PDF, JSON, Text) or Backup"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border-default bg-surface px-2.5 py-1.5 text-xs font-medium text-text-primary hover:bg-surface-container-low hover:border-primary-container transition shadow-xs"
            >
              <Upload className="h-3.5 w-3.5 text-primary" />
              <span className="hidden sm:inline">Import / Backup</span>
              <span className="sm:hidden">Import</span>
            </button>

            <ThemeToggle />

            {/* Export Dropdown */}
            <div className="relative" ref={downloadMenuRef}>
              <button
                type="button"
                onClick={() => setDownloadMenuOpen(!downloadMenuOpen)}
                disabled={isExporting}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary-container text-on-primary px-3.5 py-1.5 text-xs font-medium hover:bg-primary transition shadow-xs disabled:opacity-50"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span className="hidden sm:inline">Exporting...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-3.5 w-3.5" />
                    <span>Export</span>
                    <ChevronDown className="h-3 w-3" />
                  </>
                )}
              </button>

              {downloadMenuOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-60 rounded-xl border border-border-default bg-surface p-1.5 shadow-xl z-50">
                  <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-text-muted">
                    Export Format
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDownloadPdf("vector")}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-text-primary hover:bg-surface-container-low transition"
                  >
                    <Download className="h-4 w-4 text-primary" />
                    <div>
                      <div className="font-semibold">Vector PDF (ATS Standard)</div>
                      <div className="text-[10px] text-text-muted">100% clean selectable text layer</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadDocx}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-text-primary hover:bg-surface-container-low transition"
                  >
                    <FileDown className="h-4 w-4 text-secondary" />
                    <div>
                      <div className="font-semibold">Word Document (.DOCX)</div>
                      <div className="text-[10px] text-text-muted">Clean single-table Word document</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownloadPdf("canvas")}
                    className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-text-primary hover:bg-surface-container-low transition"
                  >
                    <Share2 className="h-4 w-4 text-status-success" />
                    <div>
                      <div className="font-semibold">High-Res Canvas Snapshot</div>
                      <div className="text-[10px] text-text-muted">Visual print fidelity</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Drawer Toggle */}
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              className="rounded-lg p-2 text-text-muted hover:text-text-primary hover:bg-surface-container-low xl:hidden transition"
              aria-label="Toggle navigation menu"
            >
              {mobileDrawerOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-out Drawer */}
        {mobileDrawerOpen && (
          <div className="xl:hidden border-t border-border-default bg-surface px-4 py-3 shadow-lg space-y-1">
            <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-text-muted">
              Navigation
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileDrawerOpen(false)}
                className={`block rounded-lg px-3 py-2 text-xs font-medium transition ${
                  pathname === link.href
                    ? "bg-surface-container-low text-primary font-semibold"
                    : "text-text-primary hover:bg-surface-container-low"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-border-default flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setRoleModalOpen(true);
                  setMobileDrawerOpen(false);
                }}
                className="flex-1 rounded-lg border border-border-default bg-surface py-2 text-center text-xs font-medium text-text-primary hover:bg-surface-container-low"
              >
                Role Presets
              </button>
              <button
                type="button"
                onClick={() => {
                  setModalOpen(true);
                  setMobileDrawerOpen(false);
                }}
                className="flex-1 rounded-lg border border-border-default bg-surface py-2 text-center text-xs font-medium text-text-primary hover:bg-surface-container-low"
              >
                Import / Backup
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

      <ActionPromptModal
        isOpen={newResumeModalOpen}
        onClose={() => setNewResumeModalOpen(false)}
        title="Create New Resume Version"
        description="Provide a descriptive name (e.g. role title or target company) for this tailored resume."
        mode="prompt"
        inputLabel="Resume Title"
        inputPlaceholder="e.g. Senior Frontend Engineer (Fintech)"
        defaultValue="Tailored Software Engineer"
        confirmText="Create & Open"
        onConfirm={handleConfirmCreateNew}
      />
    </>
  );
}
