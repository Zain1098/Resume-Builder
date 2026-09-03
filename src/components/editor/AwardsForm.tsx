"use client";

import React from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Plus, Trash2 } from "lucide-react";

export function AwardsForm() {
  const { resume, addAward, updateAward, removeAward } = useResumeStore();
  const awards = resume.awards || [];

  return (
    <div className="space-y-4">
      {awards.map((awd, idx) => (
        <div
          key={awd.id}
          className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/50 relative"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Award #{idx + 1} {awd.title ? `• ${awd.title}` : ""}
            </span>
            <button
              type="button"
              onClick={() => removeAward(awd.id)}
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
                  Award / Honor Title
                </label>
                <input
                  type="text"
                  value={awd.title}
                  onChange={(e) => updateAward(awd.id, { title: e.target.value })}
                  placeholder="e.g. Employee of the Year / Hackathon 1st Place"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Issuer / Organization
                </label>
                <input
                  type="text"
                  value={awd.issuer}
                  onChange={(e) => updateAward(awd.id, { issuer: e.target.value })}
                  placeholder="e.g. Microsoft / MIT / IEEE"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                Summary / Achievement Context
              </label>
              <input
                type="text"
                value={awd.description || ""}
                onChange={(e) => updateAward(awd.id, { description: e.target.value })}
                placeholder="Selected out of 200+ global teams for innovative AI architecture..."
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addAward}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-3 text-xs font-semibold text-slate-700 hover:border-blue-500 hover:bg-blue-50/50 hover:text-blue-600 dark:border-slate-800 dark:text-slate-300 transition"
      >
        <Plus className="h-4 w-4" />
        <span>Add Honor or Award</span>
      </button>
    </div>
  );
}
