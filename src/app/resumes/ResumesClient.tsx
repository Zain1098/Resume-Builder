"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useResumeStore } from "@/store/useResumeStore";
import {
  Files,
  Plus,
  Crown,
  Copy,
  PenTool,
  Trash2,
  ArrowRightLeft,
  ShieldCheck,
  Layers,
  Upload,
} from "lucide-react";
import { ActionPromptModal } from "@/components/common/ActionPromptModal";
import { ImportExportModal } from "@/components/editor/ImportExportModal";

export function ResumesClient() {
  const router = useRouter();
  const {
    resumes,
    activeResumeId,
    switchResume,
    createResume,
    renameResume,
    deleteResume,
    duplicateResume,
    setMasterResume,
    resume,
  } = useResumeStore();

  const [isMounted, setIsMounted] = useState(false);
  const [comparing, setComparing] = useState(false);
  const [resumeAId, setResumeAId] = useState<string>("");
  const [resumeBId, setResumeBId] = useState<string>("");
  const [importModalOpen, setImportModalOpen] = useState(false);

  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    description?: string;
    mode: "prompt" | "confirm";
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
    if (resumes.length > 0) {
      setResumeAId(resumes[0].id);
      setResumeBId(resumes[1]?.id || resumes[0].id);
    }
  }, [resumes]);

  if (!isMounted) {
    return (
      <div className="w-full py-16 flex items-center justify-center bg-bg-canvas">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-container border-t-transparent" />
          <p className="text-xs font-semibold text-text-muted tracking-wide">
            Loading Career Vault &amp; Ledgers...
          </p>
        </div>
      </div>
    );
  }

  const handleCreateNew = () => {
    setModalConfig({
      isOpen: true,
      title: "Create New Resume Version",
      description: "Enter a title for this tailored resume version.",
      mode: "prompt",
      defaultValue: "Target Role Resume",
      confirmText: "Create & Open",
      onConfirm: (val) => {
        if (val) {
          createResume(val, "");
          router.push("/builder");
        }
      },
    });
  };

  const handleRename = (id: string, currentTitle: string) => {
    setModalConfig({
      isOpen: true,
      title: "Rename Resume",
      description: `Enter a new name for "${currentTitle}".`,
      mode: "prompt",
      defaultValue: currentTitle,
      confirmText: "Save Name",
      onConfirm: (val) => {
        if (val) {
          renameResume(id, val);
        }
      },
    });
  };

  const handleDelete = (id: string, title: string) => {
    setModalConfig({
      isOpen: true,
      title: "Delete Resume",
      description: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      mode: "confirm",
      isDestructive: true,
      confirmText: "Delete",
      onConfirm: () => {
        deleteResume(id);
      },
    });
  };

  const docA = resumes.find((r) => r.id === resumeAId) || resumes[0];
  const docB = resumes.find((r) => r.id === resumeBId) || resumes[1] || resumes[0];

  const skillsA = docA?.data.skillCategories.flatMap((c) => c.skills) || [];
  const skillsB = docB?.data.skillCategories.flatMap((c) => c.skills) || [];

  const uniqueToA = skillsA.filter((s) => !skillsB.includes(s));
  const uniqueToB = skillsB.filter((s) => !skillsA.includes(s));

  const avgAts =
    resumes.length > 0
      ? Math.round(resumes.reduce((acc, r) => acc + r.atsScore, 0) / resumes.length)
      : 0;

  return (
    <div className="w-full">
      {/* Top Sub-Header Bar */}
      <div className="w-full bg-surface border-b border-border-default px-4 sm:px-6 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-text-muted text-[11px] font-semibold uppercase tracking-wider">
              <span>Workspace</span>
              <span className="text-border-default">/</span>
              <span>{resume.personalInfo.fullName || "Candidate"}</span>
              <span className="text-border-default">/</span>
              <span className="text-primary font-semibold">Master Career Vault</span>
            </div>
            <div className="flex items-baseline gap-3 mt-1">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
                Master Career Vault &amp; Ledger
              </h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-surface-container-low text-text-muted border border-border-default">
                {resumes.length} Document Versions Active
              </span>
            </div>
            <p className="text-xs sm:text-sm text-text-muted max-w-3xl mt-0.5">
              Maintain and audit job-specific tailored documents alongside your core Master Career Archive. Compare skill variances, ATS scores, and target positioning side-by-side.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-start md:self-center">
            <button
              onClick={() => setComparing(!comparing)}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-medium transition shadow-xs ${
                comparing
                  ? "border-primary-container bg-primary-container text-on-primary"
                  : "border-border-default bg-surface text-text-primary hover:bg-surface-container-low"
              }`}
            >
              <ArrowRightLeft className="h-3.5 w-3.5" />
              <span>{comparing ? "Close Comparison" : "Compare Resumes"}</span>
            </button>

            <button
              onClick={() => setImportModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border-default bg-surface px-3.5 py-2 text-xs font-medium text-text-primary hover:bg-surface-container-low transition shadow-xs"
            >
              <Upload className="h-3.5 w-3.5 text-primary" />
              <span>Import CV (PDF / JSON)</span>
            </button>

            <button
              onClick={handleCreateNew}
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary-container text-on-primary px-3.5 py-2 text-xs font-medium hover:bg-primary transition shadow-xs"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>New Resume Version</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Metrics Ribbon */}
      <section className="w-full bg-surface border-b border-border-default px-4 sm:px-6 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-bg-canvas rounded-xl border border-border-default flex flex-col justify-between">
            <div className="flex items-center justify-between text-text-muted mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider">Total Documents</span>
              <Files className="h-4 w-4 text-primary" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-text-primary">{resumes.length}</span>
              <span className="text-[11px] text-text-muted">Ledger Versions</span>
            </div>
            <p className="text-[11px] text-text-muted mt-1">Multi-branch career archive</p>
          </div>

          <div className="p-4 bg-bg-canvas rounded-xl border border-border-default flex flex-col justify-between">
            <div className="flex items-center justify-between text-text-muted mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider">Average ATS Score</span>
              <ShieldCheck className="h-4 w-4 text-status-success" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-status-success">{avgAts}%</span>
              <span className="text-[11px] text-text-muted">Across all versions</span>
            </div>
            <p className="text-[11px] text-text-muted mt-1">Parser compliance benchmark</p>
          </div>

          <div className="p-4 bg-bg-canvas rounded-xl border border-border-default flex flex-col justify-between">
            <div className="flex items-center justify-between text-text-muted mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider">Master Record</span>
              <Crown className="h-4 w-4 text-amber-500" />
            </div>
            <div className="flex items-baseline gap-2 truncate">
              <span className="text-sm font-bold text-text-primary truncate">
                {resumes.find((r) => r.isMaster)?.title || "Master Archive"}
              </span>
            </div>
            <p className="text-[11px] text-text-muted mt-1">Single source of career truth</p>
          </div>

          <div className="p-4 bg-bg-canvas rounded-xl border border-border-default flex flex-col justify-between">
            <div className="flex items-center justify-between text-text-muted mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider">Tailored Targets</span>
              <Layers className="h-4 w-4 text-secondary" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-text-primary">
                {resumes.filter((r) => !r.isMaster).length}
              </span>
              <span className="text-[11px] text-text-muted">Customized copies</span>
            </div>
            <p className="text-[11px] text-text-muted mt-1">Job-specific alignments</p>
          </div>
        </div>
      </section>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-8 space-y-8 pb-16">
        {/* Side-by-Side Comparison Tool */}
        {comparing && docA && docB && (
          <div className="bg-surface rounded-xl border border-border-default p-6 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border-default gap-4">
              <div>
                <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                  <ArrowRightLeft className="h-4 w-4 text-primary" />
                  <span>Side-by-Side Difference Matrix</span>
                </h3>
                <p className="text-xs text-text-muted mt-0.5">
                  Compare two resume versions to evaluate ATS variance, positioning, and skill overlaps.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={resumeAId}
                  onChange={(e) => setResumeAId(e.target.value)}
                  className="rounded-xl border border-border-default bg-surface px-3 py-1.5 text-xs font-medium text-text-primary focus:border-primary-container focus:outline-none"
                >
                  {resumes.map((r) => (
                    <option key={r.id} value={r.id}>
                      A: {r.title}
                    </option>
                  ))}
                </select>

                <span className="text-xs font-bold text-text-muted">vs</span>

                <select
                  value={resumeBId}
                  onChange={(e) => setResumeBId(e.target.value)}
                  className="rounded-xl border border-border-default bg-surface px-3 py-1.5 text-xs font-medium text-text-primary focus:border-primary-container focus:outline-none"
                >
                  {resumes.map((r) => (
                    <option key={r.id} value={r.id}>
                      B: {r.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Comparison Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-border-default bg-surface-container-low p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                    Version A
                  </span>
                  <span className="text-sm font-bold text-text-primary">
                    {docA.atsScore}% ATS
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-text-primary">{docA.title}</h4>
                <div className="text-xs text-text-muted">Target Role: {docA.targetRole || "General"}</div>

                <div className="pt-2 border-t border-border-default text-xs text-text-muted space-y-1">
                  <div>Experiences: {docA.data.experiences.length} roles</div>
                  <div>Skills: {skillsA.length} competencies cataloged</div>
                  <div>Projects: {docA.data.projects.length} portfolio items</div>
                </div>

                {uniqueToA.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[11px] font-semibold text-text-muted block mb-1">
                      Unique to Version A ({uniqueToA.length}):
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {uniqueToA.map((s, idx) => (
                        <span
                          key={idx}
                          className="rounded-lg bg-surface border border-border-default px-2 py-0.5 text-[11px] font-medium text-primary"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="rounded-xl border border-border-default bg-surface-container-low p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                    Version B
                  </span>
                  <span className="text-sm font-bold text-text-primary">
                    {docB.atsScore}% ATS
                  </span>
                </div>
                <h4 className="text-sm font-semibold text-text-primary">{docB.title}</h4>
                <div className="text-xs text-text-muted">Target Role: {docB.targetRole || "General"}</div>

                <div className="pt-2 border-t border-border-default text-xs text-text-muted space-y-1">
                  <div>Experiences: {docB.data.experiences.length} roles</div>
                  <div>Skills: {skillsB.length} competencies cataloged</div>
                  <div>Projects: {docB.data.projects.length} portfolio items</div>
                </div>

                {uniqueToB.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[11px] font-semibold text-text-muted block mb-1">
                      Unique to Version B ({uniqueToB.length}):
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {uniqueToB.map((s, idx) => (
                        <span
                          key={idx}
                          className="rounded-lg bg-surface border border-border-default px-2 py-0.5 text-[11px] font-medium text-secondary"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Resumes Ledger Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {resumes.map((doc) => {
            const isCurrent = doc.id === activeResumeId;
            return (
              <div
                key={doc.id}
                className={`bg-surface rounded-xl border p-5 transition-all flex flex-col justify-between shadow-xs ${
                  isCurrent
                    ? "border-primary-container ring-1 ring-primary-container"
                    : "border-border-default hover:border-primary-container/40"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      {doc.isMaster ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                          <Crown className="h-3 w-3" />
                          Master Vault
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setMasterResume(doc.id)}
                          className="text-[11px] font-medium text-text-muted hover:text-amber-600 transition"
                          title="Set as Master Resume"
                        >
                          Set Master
                        </button>
                      )}
                      {isCurrent && (
                        <span className="text-[11px] font-semibold text-primary">
                          • Active
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline gap-1 bg-surface-container-low px-2 py-0.5 rounded border border-border-default">
                      <span className="text-xs font-bold text-text-primary">
                        {doc.atsScore}%
                      </span>
                      <span className="text-[10px] text-text-muted">ATS</span>
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-text-primary truncate">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5 truncate">
                    {doc.targetRole || "General Application"}
                  </p>

                  <div className="mt-4 space-y-1.5 text-xs text-text-muted border-t border-border-default pt-3">
                    <div className="flex items-center justify-between">
                      <span>Experiences</span>
                      <span className="font-medium text-text-primary">
                        {doc.data.experiences.length} logged
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Skills Cataloged</span>
                      <span className="font-medium text-text-primary">
                        {doc.data.skillCategories.flatMap((c) => c.skills).length} skills
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Visual Template</span>
                      <span className="font-medium text-text-primary uppercase text-[11px]">
                        {doc.data.styling.template}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border-default flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        switchResume(doc.id);
                        router.push("/builder");
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-primary-container text-on-primary px-3 py-1.5 text-xs font-medium hover:bg-primary transition shadow-xs"
                    >
                      <PenTool className="h-3 w-3" />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRename(doc.id, doc.title)}
                      className="rounded-xl border border-border-default bg-surface px-2.5 py-1.5 text-xs font-medium text-text-muted hover:text-text-primary hover:bg-surface-container-low transition"
                      title="Rename"
                    >
                      Rename
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => duplicateResume(doc.id)}
                      className="rounded-xl p-1.5 text-text-muted hover:text-text-primary hover:bg-surface-container-low transition"
                      title="Duplicate"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>

                    {!doc.isMaster && (
                      <button
                        type="button"
                        onClick={() => handleDelete(doc.id, doc.title)}
                        className="rounded-xl p-1.5 text-text-muted hover:text-status-error hover:bg-status-error/10 transition"
                        title="Delete"
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

      <ImportExportModal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
      />
    </div>
  );
}
