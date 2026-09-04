"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { PRESET_PROFILES, PresetProfile } from "@/data/presetProfiles";
import { X, ArrowRight, ShieldAlert } from "lucide-react";

interface RoleSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RoleSelectorModal({ isOpen, onClose }: RoleSelectorModalProps) {
  const { importResume, getActiveResume, createResumeFromData } = useResumeStore();
  const [pendingPreset, setPendingPreset] = useState<PresetProfile | null>(null);

  if (!isOpen) return null;

  const activeDoc = getActiveResume();

  const handleSelectProfile = (preset: PresetProfile) => {
    if (activeDoc.isMaster) {
      setPendingPreset(preset);
    } else {
      importResume(preset.data);
      onClose();
    }
  };

  const handleCreateAsNewVersion = () => {
    if (!pendingPreset) return;
    createResumeFromData(pendingPreset.title, pendingPreset.data.personalInfo.jobTitle, pendingPreset.data);
    setPendingPreset(null);
    onClose();
  };

  const handleOverwrite = () => {
    if (!pendingPreset) return;
    importResume(pendingPreset.data);
    setPendingPreset(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl rounded-xl border border-border-default bg-surface p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-border-default">
          <div>
            <h3 className="text-base font-semibold text-text-primary flex items-center gap-2">
              <span>Choose Industry Role Archetype</span>
            </h3>
            <p className="text-xs text-text-muted mt-0.5">
              Select an industry-tailored verified profile to jumpstart your resume instantly.
            </p>
          </div>
          <button
            onClick={() => {
              setPendingPreset(null);
              onClose();
            }}
            className="rounded-lg p-1.5 text-text-muted hover:text-text-primary hover:bg-surface-container-low transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Master Profile Protection Confirmation Dialog */}
        {pendingPreset && (
          <div className="my-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 space-y-3">
            <div className="flex items-start gap-3">
              <ShieldAlert className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-text-primary">
                  Master Career Vault Protection
                </h4>
                <p className="text-xs text-text-muted mt-1 leading-relaxed">
                  You are currently editing your <strong className="text-text-primary">Master Career Vault</strong> (&quot;{activeDoc.title}&quot;). Overwriting it will replace your master records with the sample archetype for &quot;{pendingPreset.title}&quot;.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-border-default">
              <button
                type="button"
                onClick={() => setPendingPreset(null)}
                className="rounded-xl border border-border-default bg-surface px-3 py-1.5 text-xs font-medium text-text-primary hover:bg-surface-container-low transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleOverwrite}
                className="rounded-xl border border-status-error/40 bg-status-error/15 px-3 py-1.5 text-xs font-medium text-status-error hover:bg-status-error/25 transition"
              >
                Overwrite Master
              </button>
              <button
                type="button"
                onClick={handleCreateAsNewVersion}
                className="rounded-xl bg-primary-container text-on-primary px-3.5 py-1.5 text-xs font-medium hover:bg-primary transition shadow-xs"
              >
                Create as New Version (Recommended)
              </button>
            </div>
          </div>
        )}

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {PRESET_PROFILES.map((p) => (
            <div
              key={p.id}
              className="group relative flex flex-col justify-between rounded-xl border border-border-default bg-surface p-4 transition hover:border-primary-container shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{p.icon}</span>
                  <span className="rounded-md bg-surface-container-low border border-border-default px-2 py-0.5 text-[10px] font-semibold text-text-muted">
                    {p.category}
                  </span>
                </div>
                <h4 className="mt-2 text-sm font-semibold text-text-primary group-hover:text-primary transition">
                  {p.title}
                </h4>
                <p className="mt-1 text-xs text-text-muted leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border-default flex items-center justify-between">
                <span className="text-[11px] text-text-muted font-medium">
                  {p.data.styling.template.toUpperCase()} • {p.data.experiences.length} Experiences
                </span>
                <button
                  type="button"
                  onClick={() => handleSelectProfile(p)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
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
