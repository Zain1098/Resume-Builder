"use client";

import React from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { PRESET_PROFILES, PresetProfile } from "@/data/presetProfiles";
import { X, ArrowRight } from "lucide-react";

interface RoleSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RoleSelectorModal({ isOpen, onClose }: RoleSelectorModalProps) {
  const { importResume } = useResumeStore();

  if (!isOpen) return null;

  const handleSelectProfile = (preset: PresetProfile) => {
    importResume(preset.data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Choose a Role Template</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select an industry-tailored sample profile to jumpstart your resume instantly.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {PRESET_PROFILES.map((p) => (
            <div
              key={p.id}
              className="group relative flex flex-col justify-between rounded-xl border border-slate-200 p-4 transition hover:border-blue-500 hover:shadow-md dark:border-slate-800 dark:hover:border-blue-500 dark:bg-slate-850 bg-white"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{p.icon}</span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {p.category}
                  </span>
                </div>
                <h4 className="mt-2 text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                  {p.title}
                </h4>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium">
                  {p.data.styling.template.toUpperCase()} • {p.data.experiences.length} Experiences
                </span>
                <button
                  type="button"
                  onClick={() => handleSelectProfile(p)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                >
                  <span>Load Profile</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
