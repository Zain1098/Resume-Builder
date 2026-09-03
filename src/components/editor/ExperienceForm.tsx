"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Plus, Trash2, Sparkles, Building2, MapPin } from "lucide-react";
import { improveBulletPoint, BulletStyle } from "@/lib/aiService";

export function ExperienceForm() {
  const {
    resume,
    addExperience,
    updateExperience,
    removeExperience,
    addBulletPoint,
    updateBulletPoint,
    removeBulletPoint,
  } = useResumeStore();

  const [activeStyle, setActiveStyle] = useState<BulletStyle>("achievement");
  const [loadingIdx, setLoadingIdx] = useState<string | null>(null);

  const experiences = resume.experiences;

  const handleAiActionVerb = async (expId: string, bulletIdx: number, currentText: string) => {
    const key = `${expId}-${bulletIdx}`;
    setLoadingIdx(key);
    try {
      const result = await improveBulletPoint(currentText, activeStyle);
      updateBulletPoint(expId, bulletIdx, result.improved);
    } finally {
      setLoadingIdx(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Bullet Style Picker Bar */}
      <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 bg-slate-50 dark:border-slate-800 dark:bg-slate-850">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          <span>AI Bullet Improver Mode:</span>
        </div>
        <select
          value={activeStyle}
          onChange={(e) => setActiveStyle(e.target.value as BulletStyle)}
          className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
        >
          <option value="achievement">Achievement-Focused</option>
          <option value="technical">Technical Rigor</option>
          <option value="concise">Concise Impact</option>
          <option value="executive">Executive Leadership</option>
          <option value="professional">Standard Professional</option>
        </select>
      </div>

      {experiences.map((exp, expIdx) => (
        <div
          key={exp.id}
          className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/50 relative group"
        >
          {/* Header with delete action */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Experience #{expIdx + 1} {exp.company ? `• ${exp.company}` : ""}
            </span>
            <button
              type="button"
              onClick={() => removeExperience(exp.id)}
              className="inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition"
              title="Delete this role"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Remove</span>
            </button>
          </div>

          {/* Job details form */}
          <div className="mt-3 space-y-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Job Position / Title *
                </label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) =>
                    updateExperience(exp.id, { position: e.target.value })
                  }
                  placeholder="e.g. Senior Frontend Developer"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Company Name *
                </label>
                <div className="relative mt-1">
                  <Building2 className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(exp.id, { company: e.target.value })
                    }
                    placeholder="e.g. Google / Microsoft"
                    className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Location (City, Country or Remote)
                </label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) =>
                      updateExperience(exp.id, { location: e.target.value })
                    }
                    placeholder="e.g. San Francisco, CA or Remote"
                    className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Start Date
                </label>
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) =>
                    updateExperience(exp.id, { startDate: e.target.value })
                  }
                  placeholder="e.g. 2021-05 or May 2021"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  End Date
                </label>
                <input
                  type="text"
                  disabled={exp.current}
                  value={exp.current ? "Present" : exp.endDate}
                  onChange={(e) =>
                    updateExperience(exp.id, { endDate: e.target.value })
                  }
                  placeholder="e.g. 2023-12 or Present"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none disabled:bg-slate-100 disabled:text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:disabled:bg-slate-800/40"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id={`current-${exp.id}`}
                checked={exp.current}
                onChange={(e) =>
                  updateExperience(exp.id, {
                    current: e.target.checked,
                    endDate: e.target.checked ? "Present" : "",
                  })
                }
                className="h-3.5 w-3.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor={`current-${exp.id}`}
                className="text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                I currently work here
              </label>
            </div>

            {/* Bullet Points */}
            <div className="mt-3 pt-2">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Key Responsibilities &amp; Achievements
              </label>
              <div className="space-y-2">
                {exp.bulletPoints.map((bullet, bIdx) => {
                  const isBusy = loadingIdx === `${exp.id}-${bIdx}`;
                  return (
                    <div key={bIdx} className="flex items-start gap-2">
                      <span className="text-slate-400 text-xs mt-2">•</span>
                      <textarea
                        rows={2}
                        value={bullet}
                        onChange={(e) =>
                          updateBulletPoint(exp.id, bIdx, e.target.value)
                        }
                        placeholder="Start with an action verb (e.g. Spearheaded, Engineered, Scaled...)"
                        className="w-full rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                      />
                      <div className="flex flex-col gap-1 shrink-0">
                        <button
                          type="button"
                          disabled={isBusy}
                          onClick={() => handleAiActionVerb(exp.id, bIdx, bullet)}
                          title={`Enhance with AI (${activeStyle})`}
                          className="rounded p-1 text-slate-400 hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-950/40 dark:hover:text-amber-400 disabled:opacity-50"
                        >
                          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                        </button>
                        {exp.bulletPoints.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeBulletPoint(exp.id, bIdx)}
                            title="Remove Bullet Point"
                            className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/40"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => addBulletPoint(exp.id)}
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Bullet Point
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addExperience}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-3 text-xs font-semibold text-slate-700 hover:border-blue-500 hover:bg-blue-50/50 hover:text-blue-600 dark:border-slate-800 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:bg-blue-950/20 transition"
      >
        <Plus className="h-4 w-4" />
        Add Work Experience
      </button>
    </div>
  );
}
