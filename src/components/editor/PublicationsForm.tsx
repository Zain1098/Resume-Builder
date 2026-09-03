"use client";

import React from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Plus, Trash2 } from "lucide-react";

export function PublicationsForm() {
  const { resume, addPublication, updatePublication, removePublication } = useResumeStore();
  const publications = resume.publications || [];

  return (
    <div className="space-y-4">
      {publications.map((pub, idx) => (
        <div
          key={pub.id}
          className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/50 relative"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Publication #{idx + 1} {pub.title ? `• ${pub.title}` : ""}
            </span>
            <button
              type="button"
              onClick={() => removePublication(pub.id)}
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
                  Paper / Article / Patent Title
                </label>
                <input
                  type="text"
                  value={pub.title}
                  onChange={(e) => updatePublication(pub.id, { title: e.target.value })}
                  placeholder="e.g. Distributed Consensus in Edge Compute Clusters"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Publisher / Journal / Conference
                </label>
                <input
                  type="text"
                  value={pub.publisher}
                  onChange={(e) => updatePublication(pub.id, { publisher: e.target.value })}
                  placeholder="e.g. IEEE Transactions on Cloud Computing / ACM"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Publication Date
                </label>
                <input
                  type="month"
                  value={pub.date || ""}
                  onChange={(e) => updatePublication(pub.id, { date: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  DOI / Article Link (Optional)
                </label>
                <input
                  type="url"
                  value={pub.url || ""}
                  onChange={(e) => updatePublication(pub.id, { url: e.target.value })}
                  placeholder="https://doi.org/10.1145/..."
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                Abstract / Key Contribution Summary
              </label>
              <textarea
                rows={2}
                value={pub.description || ""}
                onChange={(e) => updatePublication(pub.id, { description: e.target.value })}
                placeholder="Introduced a novel low-overhead replication algorithm improving throughput by 32% across distributed nodes..."
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addPublication}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-3 text-xs font-semibold text-slate-700 hover:border-blue-500 hover:bg-blue-50/50 hover:text-blue-600 dark:border-slate-800 dark:text-slate-300 transition"
      >
        <Plus className="h-4 w-4" />
        <span>Add Publication or Patent</span>
      </button>
    </div>
  );
}
