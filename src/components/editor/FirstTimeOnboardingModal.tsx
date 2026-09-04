"use client";

import React, { useState, useEffect } from "react";
import {
  Upload,
  Sparkles,
  FileText,
  X,
  CheckCircle2,
  ArrowRight,
  PlusCircle,
} from "lucide-react";
import { useResumeStore } from "@/store/useResumeStore";

interface FirstTimeOnboardingModalProps {
  onOpenImport: () => void;
}

export function FirstTimeOnboardingModal({
  onOpenImport,
}: FirstTimeOnboardingModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { resume, importResume } = useResumeStore();

  useEffect(() => {
    // Only run on client after mount
    if (typeof window === "undefined") return;

    // Check query params: if already requested import action, don't show welcome modal
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("action") === "import" || urlParams.get("import") === "true") {
      onOpenImport();
      return;
    }

    const hasSeen = localStorage.getItem("resumist_onboarded_v1");
    if (!hasSeen) {
      // Small delay for smooth entry animation
      const timer = setTimeout(() => setIsOpen(true), 400);
      return () => clearTimeout(timer);
    }
  }, [onOpenImport]);

  const handleDismiss = () => {
    localStorage.setItem("resumist_onboarded_v1", "true");
    setIsOpen(false);
  };

  const handleChooseImport = () => {
    handleDismiss();
    onOpenImport();
  };

  const handleChooseSample = () => {
    handleDismiss();
  };

  const handleChooseBlank = () => {
    handleDismiss();
    // Blank slate initial state
    importResume({
      ...resume,
      personalInfo: {
        fullName: "",
        jobTitle: "",
        email: "",
        phone: "",
        location: "",
        website: "",
        linkedin: "",
        github: "",
        summary: "",
        avatarUrl: "",
      },
      experiences: [],
      educations: [],
      skillCategories: [
        { id: "cat-1", name: "Technical Competencies", skills: [] },
      ],
      projects: [],
      certifications: [],
      languages: [],
      volunteer: [],
      awards: [],
      publications: [],
      customSections: [],
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl border border-border-default bg-surface p-6 shadow-2xl transition-all">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-text-muted hover:bg-surface-container-low hover:text-text-primary transition"
          title="Close guide"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-fixed/40 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-text-primary">
              Welcome to Resumist Studio
            </h2>
            <p className="text-xs text-text-muted">
              Choose how you would like to build your ATS-optimized resume today.
            </p>
          </div>
        </div>

        {/* 3 Action Cards */}
        <div className="mt-5 space-y-3">
          {/* Option 1: Upload Existing Resume */}
          <div
            onClick={handleChooseImport}
            className="group flex cursor-pointer items-start gap-4 rounded-xl border border-primary/40 bg-primary-fixed/10 p-4 hover:border-primary hover:bg-primary-fixed/20 transition"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-container text-on-primary shadow-xs">
              <Upload className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-text-primary group-hover:text-primary transition">
                  Upload Existing Resume / CV
                </h3>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                  Fastest (5s)
                </span>
              </div>
              <p className="mt-1 text-xs text-text-muted leading-relaxed">
                Upload your existing PDF, JSON ledger, or text document. We automatically extract and organize your work history into all builder fields.
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-text-muted group-hover:text-primary group-hover:translate-x-0.5 transition shrink-0 mt-1" />
          </div>

          {/* Option 2: Explore Pre-Filled Sample */}
          <div
            onClick={handleChooseSample}
            className="group flex cursor-pointer items-start gap-4 rounded-xl border border-border-default bg-surface p-4 hover:border-border-default/80 hover:bg-surface-container-low transition"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-text-primary group-hover:text-primary transition">
                Explore with Pre-Filled Sample
              </h3>
              <p className="mt-1 text-xs text-text-muted leading-relaxed">
                Start with high-scoring sample content. Experiment with ATS checking, job matching, templates, and replace with your details.
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-text-muted group-hover:text-primary group-hover:translate-x-0.5 transition shrink-0 mt-1" />
          </div>

          {/* Option 3: Clean Blank Slate */}
          <div
            onClick={handleChooseBlank}
            className="group flex cursor-pointer items-start gap-4 rounded-xl border border-border-default bg-surface p-4 hover:border-border-default/80 hover:bg-surface-container-low transition"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-text-primary">
              <PlusCircle className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-text-primary group-hover:text-primary transition">
                Start with a Blank Slate
              </h3>
              <p className="mt-1 text-xs text-text-muted leading-relaxed">
                Empty fields ready for you to enter your own information from scratch step-by-step.
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-text-muted group-hover:text-primary group-hover:translate-x-0.5 transition shrink-0 mt-1" />
          </div>
        </div>

        {/* Footer tip */}
        <div className="mt-5 pt-4 border-t border-border-default flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-text-muted">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-status-success shrink-0" />
            <span>You can always Import or Backup anytime via the top navigation bar.</span>
          </div>
          <button
            onClick={handleDismiss}
            className="font-semibold text-text-primary hover:text-primary transition"
          >
            Skip &amp; Start Editing →
          </button>
        </div>
      </div>
    </div>
  );
}
