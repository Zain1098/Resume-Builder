"use client";

import React from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Plus, Trash2 } from "lucide-react";

export function CustomSectionForm() {
  const {
    resume,
    addCustomSection,
    updateCustomSection,
    removeCustomSection,
    addCustomSectionItem,
    updateCustomSectionItem,
    removeCustomSectionItem,
  } = useResumeStore();

  const sections = resume.customSections;

  return (
    <div className="space-y-4">
      {sections.map((sec) => (
        <div
          key={sec.id}
          className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/50"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800">
            <div className="flex-1 mr-4">
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                Custom Section Title
              </label>
              <input
                type="text"
                value={sec.heading}
                onChange={(e) =>
                  updateCustomSection(sec.id, { heading: e.target.value })
                }
                placeholder="e.g. Languages, Publications, Volunteering"
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <button
              type="button"
              onClick={() => removeCustomSection(sec.id)}
              className="mt-4 text-slate-400 hover:text-red-500 transition"
              title="Delete this entire section"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {/* Items in custom section */}
          <div className="mt-3 space-y-3">
            {sec.items.map((item, itIdx) => (
              <div
                key={item.id}
                className="rounded-lg border border-slate-200/80 bg-white p-3 dark:border-slate-800 dark:bg-slate-800/60"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-bold text-slate-500">
                    Item #{itIdx + 1}
                  </span>
                  {sec.items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCustomSectionItem(sec.id, item.id)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) =>
                        updateCustomSectionItem(sec.id, item.id, {
                          title: e.target.value,
                        })
                      }
                      placeholder="Title / Role / Language..."
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={item.subtitle || ""}
                      onChange={(e) =>
                        updateCustomSectionItem(sec.id, item.id, {
                          subtitle: e.target.value,
                        })
                      }
                      placeholder="Subtitle / Level (e.g. Native / Fluent)..."
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <textarea
                    rows={2}
                    value={item.description}
                    onChange={(e) =>
                      updateCustomSectionItem(sec.id, item.id, {
                        description: e.target.value,
                      })
                    }
                    placeholder="Details or brief summary..."
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addCustomSectionItem(sec.id)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              <Plus className="h-3 w-3" />
              Add Item to Section
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addCustomSection}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-3 text-xs font-semibold text-slate-700 hover:border-blue-500 hover:bg-blue-50/50 hover:text-blue-600 dark:border-slate-800 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:bg-blue-950/20 transition"
      >
        <Plus className="h-4 w-4" />
        Add Custom Section (Languages, Honors, etc.)
      </button>
    </div>
  );
}
