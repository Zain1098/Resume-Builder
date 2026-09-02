"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Plus, Trash2, FolderGit2, Globe, X } from "lucide-react";
import { GithubIcon } from "@/components/common/SocialIcons";

export function ProjectsForm() {
  const { resume, addProject, updateProject, removeProject } = useResumeStore();
  const [techInput, setTechInput] = useState<{ [projId: string]: string }>({});

  const projects = resume.projects;

  const handleAddTech = (projId: string) => {
    const text = techInput[projId]?.trim();
    if (!text) return;
    const project = projects.find((p) => p.id === projId);
    if (project && !project.technologies.includes(text)) {
      updateProject(projId, {
        technologies: [...project.technologies, text],
      });
    }
    setTechInput((prev) => ({ ...prev, [projId]: "" }));
  };

  const handleRemoveTech = (projId: string, techIdx: number) => {
    const project = projects.find((p) => p.id === projId);
    if (project) {
      updateProject(projId, {
        technologies: project.technologies.filter((_, i) => i !== techIdx),
      });
    }
  };

  return (
    <div className="space-y-4">
      {projects.map((proj, pIdx) => (
        <div
          key={proj.id}
          className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/50"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Project #{pIdx + 1} {proj.name ? `• ${proj.name}` : ""}
            </span>
            <button
              type="button"
              onClick={() => removeProject(proj.id)}
              className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Remove</span>
            </button>
          </div>

          <div className="mt-3 space-y-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                Project Name *
              </label>
              <div className="relative mt-1">
                <FolderGit2 className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  value={proj.name}
                  onChange={(e) =>
                    updateProject(proj.id, { name: e.target.value })
                  }
                  placeholder="e.g. CloudMetrics Monitoring Tool"
                  className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Live Demo URL (Optional)
                </label>
                <div className="relative mt-1">
                  <Globe className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="url"
                    value={proj.liveUrl || ""}
                    onChange={(e) =>
                      updateProject(proj.id, { liveUrl: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  GitHub Repository URL (Optional)
                </label>
                <div className="relative mt-1">
                  <span className="absolute left-2.5 top-2 text-slate-400">
                    <GithubIcon className="h-3.5 w-3.5" />
                  </span>
                  <input
                    type="url"
                    value={proj.githubUrl || ""}
                    onChange={(e) =>
                      updateProject(proj.id, { githubUrl: e.target.value })
                    }
                    placeholder="https://github.com/..."
                    className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                Project Description & Impact
              </label>
              <textarea
                rows={2}
                value={proj.description}
                onChange={(e) =>
                  updateProject(proj.id, { description: e.target.value })
                }
                placeholder="Brief summary highlighting the problem solved, architecture used, and results achieved..."
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white leading-relaxed"
              />
            </div>

            {/* Tech Stack Tags */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Technologies Used
              </label>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {proj.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 rounded bg-slate-200/80 px-2 py-0.5 text-[11px] font-medium text-slate-800 dark:bg-slate-800 dark:text-slate-300"
                  >
                    <span>{t}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(proj.id, idx)}
                      className="hover:text-red-500"
                    >
                      <X className="h-2.5 w-2.5" />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={techInput[proj.id] || ""}
                  onChange={(e) =>
                    setTechInput((prev) => ({
                      ...prev,
                      [proj.id]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTech(proj.id);
                    }
                  }}
                  placeholder="e.g. Next.js, Redis, Tailwind..."
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => handleAddTech(proj.id)}
                  className="rounded-lg bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-800 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
                >
                  + Add Tag
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addProject}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-3 text-xs font-semibold text-slate-700 hover:border-blue-500 hover:bg-blue-50/50 hover:text-blue-600 dark:border-slate-800 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:bg-blue-950/20 transition"
      >
        <Plus className="h-4 w-4" />
        Add Project
      </button>
    </div>
  );
}
