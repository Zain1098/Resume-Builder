"use client";

import React from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Plus, Trash2, Award, Calendar, Link } from "lucide-react";

export function CertificationsForm() {
  const { resume, addCertification, updateCertification, removeCertification } =
    useResumeStore();

  const certs = resume.certifications;

  return (
    <div className="space-y-4">
      {certs.length === 0 && (
        <div className="text-center py-6 px-4 rounded-xl border border-dashed border-border-default bg-surface-container-low">
          <Award className="h-7 w-7 mx-auto text-text-muted mb-2 opacity-60" />
          <p className="text-xs font-semibold text-text-primary">No certifications added yet</p>
          <p className="text-[11px] text-text-muted mt-0.5 mb-3">Click the button below to add credentials (e.g. AWS, Google Cloud, PMP).</p>
        </div>
      )}

      {certs.map((cert, cIdx) => (
        <div
          key={cert.id}
          className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/50"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Certification #{cIdx + 1} {cert.name ? `• ${cert.name}` : ""}
            </span>
            <button
              type="button"
              onClick={() => removeCertification(cert.id)}
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
                  Certificate Name *
                </label>
                <div className="relative mt-1">
                  <Award className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) =>
                      updateCertification(cert.id, { name: e.target.value })
                    }
                    placeholder="e.g. AWS Solutions Architect Associate"
                    className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Issuing Organization *
                </label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) =>
                    updateCertification(cert.id, { issuer: e.target.value })
                  }
                  placeholder="e.g. Amazon Web Services (AWS) / Google / Meta"
                  className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Issue Date / Year
                </label>
                <div className="relative mt-1">
                  <Calendar className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={cert.date}
                    onChange={(e) =>
                      updateCertification(cert.id, { date: e.target.value })
                    }
                    placeholder="e.g. 2023-08 or Aug 2023"
                    className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                  Credential Verification URL (Optional)
                </label>
                <div className="relative mt-1">
                  <Link className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="url"
                    value={cert.url || ""}
                    onChange={(e) =>
                      updateCertification(cert.id, { url: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addCertification}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-3 text-xs font-semibold text-slate-700 hover:border-blue-500 hover:bg-blue-50/50 hover:text-blue-600 dark:border-slate-800 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:bg-blue-950/20 transition"
      >
        <Plus className="h-4 w-4" />
        Add Certificate
      </button>
    </div>
  );
}
