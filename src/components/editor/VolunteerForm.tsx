"use client";

import React from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Plus, Trash2 } from "lucide-react";

export function VolunteerForm() {
  const { resume, addVolunteer, updateVolunteer, removeVolunteer } = useResumeStore();
  const volunteers = resume.volunteer || [];

  return (
    <div className="space-y-4">
      {volunteers.map((vol, idx) => (
        <div
          key={vol.id}
          className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/50 relative"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Activity #{idx + 1} {vol.organization ? `• ${vol.organization}` : ""}
            </span>
            <button
              type="button"
              onClick={() => removeVolunteer(vol.id)}
              className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Remove</span>
            </button>
          </div>

          <div className="mt-3 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Role / Title
                </label>
                <input
                  type="text"
                  value={vol.role}
                  onChange={(e) => updateVolunteer(vol.id, { role: e.target.value })}
                  placeholder="e.g. Volunteer Coding Instructor"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Organization
                </label>
                <input
                  type="text"
                  value={vol.organization}
                  onChange={(e) => updateVolunteer(vol.id, { organization: e.target.value })}
                  placeholder="e.g. Code2040 / Girls Who Code"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                Brief Description of Impact
              </label>
              <textarea
                rows={2}
                value={vol.description || ""}
                onChange={(e) => updateVolunteer(vol.id, { description: e.target.value })}
                placeholder="Mentored 20+ underrepresented students in fundamental algorithms and web development..."
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addVolunteer}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-3 text-xs font-semibold text-slate-700 hover:border-blue-500 hover:bg-blue-50/50 hover:text-blue-600 dark:border-slate-800 dark:text-slate-300 transition"
      >
        <Plus className="h-4 w-4" />
        <span>Add Volunteer / Community Experience</span>
      </button>
    </div>
  );
}
