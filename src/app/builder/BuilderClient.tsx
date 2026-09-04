"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { EditorPanel } from "@/components/editor/EditorPanel";
import { PreviewPanel } from "@/components/preview/PreviewPanel";
import { useResumeStore } from "@/store/useResumeStore";
import { calculateAtsScore } from "@/lib/atsScoring";
import {
  User,
  Briefcase,
  GraduationCap,
  Sparkles,
  FolderGit2,
  Award,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Database,
  Edit3,
} from "lucide-react";

export function BuilderClient() {
  const { resume, previewTab, setPreviewTab, setActiveSection } = useResumeStore();
  const [isMounted, setIsMounted] = useState(false);
  const [activeView, setActiveView] = useState<"split" | "editor" | "preview" | "outline">("split");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sync mobile view with previewTab (e.g. from Navbar Edit/Preview buttons)
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setActiveView(previewTab === "preview" ? "preview" : "editor");
    }
  }, [previewTab]);

  const handleMobileSwitch = (view: "outline" | "editor" | "preview") => {
    setActiveView(view);
    if (view === "editor") setPreviewTab("edit");
    if (view === "preview") setPreviewTab("preview");
  };

  const handleOutlineClick = (secId: string) => {
    setActiveView("editor");
    setPreviewTab("edit");
    setActiveSection(secId);
    setTimeout(() => {
      const el = document.getElementById(secId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 60);
  };

  const atsScore = calculateAtsScore(resume);
  const totalSkills = resume.skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);

  const cleanedFullName = (resume.personalInfo.fullName || "")
    .replace(/^["'\s]*(name|fullName)\s*["']?\s*:\s*["']?/i, "")
    .replace(/["',}]+$/g, "")
    .trim() || "Untitled Candidate";

  const outlineSections = [
    {
      id: "personal",
      label: "Contact & Information",
      count: resume.personalInfo.fullName ? "Ready" : "Incomplete",
      icon: User,
      done: !!resume.personalInfo.fullName,
    },
    {
      id: "summary",
      label: "Executive Profile",
      count: resume.personalInfo.summary ? "Ready" : "Empty",
      icon: Edit3,
      done: !!resume.personalInfo.summary,
    },
    {
      id: "experience",
      label: "Work Experience",
      count: `${resume.experiences.length} roles`,
      icon: Briefcase,
      done: resume.experiences.length > 0,
    },
    {
      id: "skills",
      label: "Core Competencies",
      count: `${totalSkills} skills`,
      icon: Sparkles,
      done: totalSkills > 0,
    },
    {
      id: "education",
      label: "Education & Degrees",
      count: `${resume.educations.length} records`,
      icon: GraduationCap,
      done: resume.educations.length > 0,
    },
    {
      id: "projects",
      label: "Projects & Architecture",
      count: `${resume.projects.length} entries`,
      icon: FolderGit2,
      done: resume.projects.length > 0,
    },
    {
      id: "certifications",
      label: "Certifications",
      count: `${resume.certifications.length} verified`,
      icon: Award,
      done: resume.certifications.length > 0,
    },
  ];

  if (!isMounted) {
    return (
      <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center bg-bg-canvas text-text-primary">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-xs font-medium text-text-muted">Loading Editorial Workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] w-full">
      {/* Subheader / Document Context Bar */}
      <div className="w-full bg-surface shadow-xs border-b border-border-default z-30 sticky top-16 print:hidden">
        <div className="max-w-[1720px] mx-auto px-4 lg:px-8 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 min-w-0 w-full md:w-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-status-success shrink-0"></span>
            <div className="min-w-0 flex items-center gap-2">
              <span className="font-semibold text-text-primary truncate">
                {cleanedFullName}
              </span>
              <span className="text-text-muted hidden sm:inline truncate">
                — {resume.personalInfo.jobTitle || "Executive Candidate"}
              </span>
              <span className="text-border-default hidden sm:inline">|</span>
              <span className="text-text-muted text-[11px] truncate hidden lg:inline">
                Target: {resume.personalInfo.jobTitle || "General ATS Role"}
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-fixed/30 text-primary font-semibold text-[11px] shrink-0 ml-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span>{atsScore.overallScore}% ATS Match</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
            {/* Desktop View Switcher */}
            <div className="hidden lg:flex items-center bg-surface-container-low p-0.5 rounded-lg border border-border-default">
              <button
                onClick={() => setActiveView("split")}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition ${
                  activeView === "split"
                    ? "bg-surface text-text-primary shadow-xs font-semibold"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                Split View
              </button>
              <button
                onClick={() => setActiveView("editor")}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition ${
                  activeView === "editor"
                    ? "bg-surface text-text-primary shadow-xs font-semibold"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                Editor Only
              </button>
              <button
                onClick={() => setActiveView("preview")}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition ${
                  activeView === "preview"
                    ? "bg-surface text-text-primary shadow-xs font-semibold"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                Preview Only
              </button>
            </div>

            {/* Mobile / Tablet Segmented Switcher */}
            <div className="flex lg:hidden items-center bg-surface-container-low p-0.5 rounded-lg border border-border-default">
              <button
                onClick={() => handleMobileSwitch("editor")}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition ${
                  activeView === "editor"
                    ? "bg-surface text-primary shadow-xs font-bold"
                    : "text-text-muted"
                }`}
              >
                Edit Form
              </button>
              <button
                onClick={() => handleMobileSwitch("preview")}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition ${
                  activeView === "preview"
                    ? "bg-surface text-primary shadow-xs font-bold"
                    : "text-text-muted"
                }`}
              >
                Live Preview
              </button>
              <button
                onClick={() => handleMobileSwitch("outline")}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition ${
                  activeView === "outline"
                    ? "bg-surface text-primary shadow-xs font-bold"
                    : "text-text-muted"
                }`}
              >
                Outline
              </button>
            </div>

            <Link
              href="/ats-analyzer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-low text-secondary border border-border-default hover:bg-surface transition-colors font-medium text-[11px]"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-secondary" />
              <span>ATS Gaps ({atsScore.overallScore < 85 ? "Action Required" : "Optimized"})</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main 3-Pane Document Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT PANE: Document Outline */}
        <aside
          className={`w-full lg:w-64 xl:w-72 border-r border-border-default bg-surface flex-col p-4 overflow-y-auto ${
            activeView === "outline" ? "flex" : "hidden xl:flex"
          }`}
        >
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-default">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
              Document Outline
            </span>
            <span className="text-[10px] font-semibold text-primary bg-primary-fixed/30 px-2 py-0.5 rounded-full">
              {outlineSections.filter((s) => s.done).length} / {outlineSections.length} Ready
            </span>
          </div>

          <nav className="space-y-1">
            {outlineSections.map((sec) => {
              const Icon = sec.icon;
              return (
                <div
                  key={sec.id}
                  onClick={() => handleOutlineClick(sec.id)}
                  className="flex items-center justify-between p-2 rounded-lg text-xs hover:bg-surface-container-low cursor-pointer transition text-text-primary group"
                >
                  <div className="flex items-center gap-2 truncate">
                    <Icon className="h-3.5 w-3.5 text-text-muted group-hover:text-primary shrink-0" />
                    <span className="truncate font-medium">{sec.label}</span>
                  </div>
                  {sec.done ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-status-success shrink-0" />
                  ) : (
                    <span className="text-[10px] text-text-muted">{sec.count}</span>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="mt-auto pt-4">
            <div className="rounded-xl border border-border-default bg-surface-container-low p-3.5">
              <div className="flex items-center gap-2 mb-1.5">
                <Database className="h-4 w-4 text-primary" />
                <span className="text-xs font-semibold text-text-primary">Master Career Vault</span>
              </div>
              <p className="text-[11px] text-text-muted mb-2.5 leading-relaxed">
                Centralize your complete career history and branch targeted resumes anytime.
              </p>
              <Link
                href="/resumes"
                className="w-full py-1.5 px-2 bg-surface text-primary text-xs font-semibold rounded-lg hover:bg-surface-container transition-colors shadow-xs flex items-center justify-center gap-1 border border-border-default"
              >
                <span>Manage Versions</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </aside>

        {/* CENTER PANE: Dynamic Editor Form Panel */}
        <section
          id="editor-panel-section"
          className={`w-full lg:w-auto lg:flex-1 overflow-y-auto border-r border-border-default bg-surface flex-col h-full ${
            activeView === "editor"
              ? "flex"
              : activeView === "split"
              ? "hidden lg:flex"
              : "hidden"
          }`}
        >
          <EditorPanel />
        </section>

        {/* RIGHT PANE: Live A4 Document Preview */}
        <section
          id="resume-preview-container"
          className={`w-full lg:w-auto lg:flex-1 overflow-hidden bg-bg-canvas flex-col h-full ${
            activeView === "preview"
              ? "flex"
              : activeView === "split"
              ? "hidden lg:flex"
              : "hidden"
          }`}
        >
          <PreviewPanel />
        </section>
      </div>
    </div>
  );
}
