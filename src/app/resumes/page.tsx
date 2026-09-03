"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/common/Navbar";
import { useResumeStore } from "@/store/useResumeStore";
import {
  Files,
  Plus,
  Crown,
  Copy,
  PenTool,
  Trash2,
  ArrowRightLeft,
} from "lucide-react";

export default function ResumesManagerPage() {
  const router = useRouter();
  const {
    resumes,
    activeResumeId,
    switchResume,
    createResume,
    duplicateResume,
    renameResume,
    deleteResume,
    setMasterResume,
  } = useResumeStore();

  const [isMounted, setIsMounted] = useState(false);
  const [comparing, setComparing] = useState(false);
  const [resumeAId, setResumeAId] = useState<string>("");
  const [resumeBId, setResumeBId] = useState<string>("");

  useEffect(() => {
    setIsMounted(true);
    if (resumes.length > 0) {
      setResumeAId(resumes[0].id);
      setResumeBId(resumes[1]?.id || resumes[0].id);
    }
  }, [resumes]);

  if (!isMounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-xs font-semibold text-slate-500">Loading Resume Versions...</p>
        </div>
      </div>
    );
  }

  const handleCreateNew = () => {
    const title = prompt("Enter a title for this new resume:", "Target Role Resume");
    if (title) {
      createResume(title, "");
      router.push("/builder");
    }
  };

  const handleRename = (id: string, currentTitle: string) => {
    const nextTitle = prompt("Rename resume:", currentTitle);
    if (nextTitle && nextTitle.trim()) {
      renameResume(id, nextTitle.trim());
    }
  };

  const docA = resumes.find((r) => r.id === resumeAId) || resumes[0];
  const docB = resumes.find((r) => r.id === resumeBId) || resumes[1] || resumes[0];

  const skillsA = docA.data.skillCategories.flatMap((c) => c.skills);
  const skillsB = docB.data.skillCategories.flatMap((c) => c.skills);

  const uniqueToA = skillsA.filter((s) => !skillsB.includes(s));
  const uniqueToB = skillsB.filter((s) => !skillsA.includes(s));

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 mb-2">
              <Files className="h-4 w-4" />
              <span>Multi-Version Management</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Resume Versions &amp; Side-by-Side Comparison
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
              Maintain job-specific tailored documents alongside your Master Career Archive.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setComparing(!comparing)}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-xs font-semibold transition ${
                comparing
                  ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              }`}
            >
              <ArrowRightLeft className="h-4 w-4" />
              <span>{comparing ? "Hide Comparison" : "Compare Two Resumes"}</span>
            </button>

            <button
              onClick={handleCreateNew}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-95 transition"
            >
              <Plus className="h-4 w-4" />
              <span>New Resume</span>
            </button>
          </div>
        </div>

        {/* Side-by-Side Comparison Tool (if opened) */}
        {comparing && (
          <div className="rounded-2xl border border-blue-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ArrowRightLeft className="h-5 w-5 text-blue-600" />
                  <span>Resume A vs. Resume B Difference Matrix</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Select any two resumes to compare ATS scores, skills variance, and target positioning.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={resumeAId}
                  onChange={(e) => setResumeAId(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  {resumes.map((r) => (
                    <option key={r.id} value={r.id}>
                      A: {r.title}
                    </option>
                  ))}
                </select>

                <span className="text-xs font-bold text-slate-400">vs</span>

                <select
                  value={resumeBId}
                  onChange={(e) => setResumeBId(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
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
              {/* Document A Column */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-850/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-600 uppercase">Version A</span>
                  <span className="text-base font-black text-slate-900 dark:text-white">
                    {docA.atsScore} ATS
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{docA.title}</h4>
                <div className="text-xs text-slate-500">Target Role: {docA.targetRole}</div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs space-y-1">
                  <div>Experiences: {docA.data.experiences.length} roles</div>
                  <div>Skills: {skillsA.length} competencies</div>
                  <div>Projects: {docA.data.projects.length} portfolio items</div>
                </div>

                {uniqueToA.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                      Unique to Version A ({uniqueToA.length}):
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {uniqueToA.map((s, idx) => (
                        <span key={idx} className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Document B Column */}
              <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-850/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600 uppercase">Version B</span>
                  <span className="text-base font-black text-slate-900 dark:text-white">
                    {docB.atsScore} ATS
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{docB.title}</h4>
                <div className="text-xs text-slate-500">Target Role: {docB.targetRole}</div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs space-y-1">
                  <div>Experiences: {docB.data.experiences.length} roles</div>
                  <div>Skills: {skillsB.length} competencies</div>
                  <div>Projects: {docB.data.projects.length} portfolio items</div>
                </div>

                {uniqueToB.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[11px] font-semibold text-slate-500 block mb-1">
                      Unique to Version B ({uniqueToB.length}):
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {uniqueToB.map((s, idx) => (
                        <span key={idx} className="rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-medium text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
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

        {/* Resumes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {resumes.map((doc) => {
            const isCurrent = doc.id === activeResumeId;
            return (
              <div
                key={doc.id}
                className={`rounded-2xl border p-5 transition-all bg-white dark:bg-slate-900 flex flex-col justify-between ${
                  isCurrent
                    ? "border-blue-500 shadow-md ring-2 ring-blue-500/20"
                    : "border-slate-200 hover:border-slate-300 shadow-sm"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      {doc.isMaster ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                          <Crown className="h-3 w-3" />
                          Master
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setMasterResume(doc.id)}
                          className="text-[10px] font-semibold text-slate-400 hover:text-amber-600 transition"
                          title="Set as Master Resume"
                        >
                          Make Master
                        </button>
                      )}
                      {isCurrent && (
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">
                          • Active
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-black text-slate-900 dark:text-white">
                        {doc.atsScore}
                      </span>
                      <span className="text-[10px] text-slate-400">ATS</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 truncate">
                    {doc.targetRole || "General"}
                  </p>

                  <div className="mt-4 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    <div>{doc.data.experiences.length} Experiences recorded</div>
                    <div>{doc.data.skillCategories.flatMap((c) => c.skills).length} Skills cataloged</div>
                    <div>Template: {doc.data.styling.template.toUpperCase()}</div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        switchResume(doc.id);
                        router.push("/builder");
                      }}
                      className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 dark:bg-blue-950/50 dark:text-blue-300 transition"
                    >
                      <PenTool className="h-3 w-3" />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRename(doc.id, doc.title)}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
                      title="Rename"
                    >
                      Rename
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => duplicateResume(doc.id)}
                      className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
                      title="Duplicate"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>

                    {!doc.isMaster && (
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete '${doc.title}'?`)) {
                            deleteResume(doc.id);
                          }
                        }}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/40"
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
      </main>
    </div>
  );
}
