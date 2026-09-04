"use client";

import React from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Plus, Trash2, GraduationCap, Award } from "lucide-react";

export function EducationForm() {
  const { resume, addEducation, updateEducation, removeEducation } =
    useResumeStore();

  const educations = resume.educations;

  return (
    <div className="space-y-4">
      {educations.length === 0 && (
        <div className="text-center py-6 px-4 rounded-xl border border-dashed border-border-default bg-surface-container-low">
          <GraduationCap className="h-7 w-7 mx-auto text-text-muted mb-2 opacity-60" />
          <p className="text-xs font-semibold text-text-primary">No education records added yet</p>
          <p className="text-[11px] text-text-muted mt-0.5 mb-3">Click the button below to add your degree, institution, and graduation dates.</p>
        </div>
      )}

      {educations.map((edu, eduIdx) => (
        <div
          key={edu.id}
          className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/50 relative"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Education #{eduIdx + 1} {edu.institution ? `• ${edu.institution}` : ""}
            </span>
            <button
              type="button"
              onClick={() => removeEducation(edu.id)}
              className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Remove</span>
            </button>
          </div>

          <div className="mt-3 space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  School / University *
                </label>
                <div className="relative mt-1">
                  <GraduationCap className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) =>
                      updateEducation(edu.id, { institution: e.target.value })
                    }
                    placeholder="e.g. University of California, Berkeley"
                    className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Degree / Certificate *
                </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) =>
                    updateEducation(edu.id, { degree: e.target.value })
                  }
                  placeholder="e.g. Bachelor of Science"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Field of Study / Major
                </label>
                <input
                  type="text"
                  value={edu.fieldOfStudy}
                  onChange={(e) =>
                    updateEducation(edu.id, { fieldOfStudy: e.target.value })
                  }
                  placeholder="e.g. Computer Science"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Start Date
                </label>
                <input
                  type="text"
                  value={edu.startDate}
                  onChange={(e) =>
                    updateEducation(edu.id, { startDate: e.target.value })
                  }
                  placeholder="e.g. 2017-09"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  End Date (or Expected)
                </label>
                <input
                  type="text"
                  value={edu.endDate}
                  onChange={(e) =>
                    updateEducation(edu.id, { endDate: e.target.value })
                  }
                  placeholder="e.g. 2021-05"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                GPA, Honors or Distinctions (Optional)
              </label>
              <div className="relative mt-1">
                <Award className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  value={edu.gpaOrHonors || ""}
                  onChange={(e) =>
                    updateEducation(edu.id, { gpaOrHonors: e.target.value })
                  }
                  placeholder="e.g. 3.9 GPA • Magna Cum Laude • Dean's Honor List"
                  className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addEducation}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-3 text-xs font-semibold text-slate-700 hover:border-blue-500 hover:bg-blue-50/50 hover:text-blue-600 dark:border-slate-800 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:bg-blue-950/20 transition"
      >
        <Plus className="h-4 w-4" />
        Add Education
      </button>
    </div>
  );
}
