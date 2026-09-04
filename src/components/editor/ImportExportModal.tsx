"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { X, Upload, Download, Copy, Check, AlertCircle } from "lucide-react";
import { ResumeData } from "@/types/resume";

interface ImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImportExportModal({ isOpen, onClose }: ImportExportModalProps) {
  const { resume, importResume, getActiveResume, createResumeFromData } = useResumeStore();
  const [jsonText, setJsonText] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const activeDoc = getActiveResume();
  const [importAsNewVersion, setImportAsNewVersion] = useState(activeDoc.isMaster);

  if (!isOpen) return null;

  const currentJsonString = JSON.stringify(resume, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentJsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([currentJsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const filename = `${resume.personalInfo.fullName.replace(/\s+/g, "_") || "resume"}_backup.json`;
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const applyImportedData = (data: ResumeData) => {
    if (importAsNewVersion || activeDoc.isMaster) {
      const title = `${data.personalInfo.fullName || "Imported"} Resume`;
      createResumeFromData(title, data.personalInfo.jobTitle || "", data);
      setSuccessMsg("Imported as a new resume version! Master profile preserved.");
    } else {
      importResume(data);
      setSuccessMsg("Resume data successfully loaded!");
    }
    setError(null);
    setTimeout(() => {
      setSuccessMsg(null);
      onClose();
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (!parsed.personalInfo) {
          throw new Error("Invalid resume format: Missing personalInfo section.");
        }
        applyImportedData(parsed as ResumeData);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to parse JSON file.";
        setError(message);
      }
    };
    reader.readAsText(file);
  };

  const handleImportText = () => {
    try {
      if (!jsonText.trim()) {
        setError("Please paste valid JSON text first.");
        return;
      }
      const parsed = JSON.parse(jsonText);
      if (!parsed.personalInfo) {
        throw new Error("Invalid resume schema: Missing personalInfo.");
      }
      applyImportedData(parsed as ResumeData);
    } catch {
      setError("Invalid JSON format. Please verify the syntax.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-xl border border-border-default bg-surface p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border-default">
          <div>
            <h3 className="text-base font-semibold text-text-primary">
              Import &amp; Export Resume Ledger (JSON)
            </h3>
            <p className="text-xs text-text-muted mt-0.5">
              Save a portable ledger backup or restore previous career profile data.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-text-muted hover:text-text-primary hover:bg-surface-container-low transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Feedback messages */}
        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-status-error/15 border border-status-error/25 p-3 text-xs font-medium text-status-error">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {successMsg && (
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-status-success/15 border border-status-success/25 p-3 text-xs font-medium text-status-success">
            <Check className="h-4 w-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Export Section */}
        <div className="mt-5 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">
            Export Current Data
          </h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleDownloadJSON}
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary-container text-on-primary px-3.5 py-2 text-xs font-medium hover:bg-primary transition shadow-xs"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download .JSON Ledger</span>
            </button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border-default bg-surface px-3.5 py-2 text-xs font-medium text-text-primary hover:bg-surface-container-low transition shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-status-success" />
                  <span className="text-status-success">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-text-muted" />
                  <span>Copy JSON Payload</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Import Section */}
        <div className="mt-6 pt-5 border-t border-border-default">
          <h4 className="text-xs font-bold uppercase tracking-wider text-text-muted">
            Import from Ledger File or Text
          </h4>

          {activeDoc.isMaster && (
            <div className="mt-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 flex items-center gap-2.5">
              <input
                type="checkbox"
                id="protect-master-chk"
                checked={importAsNewVersion}
                onChange={(e) => setImportAsNewVersion(e.target.checked)}
                className="rounded border-border-default text-primary focus:ring-primary h-4 w-4"
              />
              <label htmlFor="protect-master-chk" className="text-xs text-text-primary font-medium cursor-pointer">
                Import as a new version branch (Recommended: preserves Master Career Vault intact)
              </label>
            </div>
          )}

          {/* File Upload Box */}
          <div className="mt-3 flex items-center justify-center rounded-xl border border-dashed border-border-default bg-surface-container-low p-5 text-center hover:border-primary-container transition">
            <label className="cursor-pointer flex flex-col items-center">
              <Upload className="h-6 w-6 text-text-muted mb-1" />
              <span className="text-xs font-semibold text-primary">
                Click to upload JSON file
              </span>
              <span className="text-[11px] text-text-muted mt-0.5">
                .json file exported from CareerCraft or Resumist
              </span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Direct Paste JSON */}
          <div className="mt-4 space-y-2">
            <label className="block text-xs font-medium text-text-muted">
              Or paste raw JSON schema:
            </label>
            <textarea
              rows={4}
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              placeholder="Paste JSON schema object here..."
              className="w-full rounded-xl border border-border-default bg-surface-container-low p-3 font-mono text-xs text-text-primary focus:border-primary-container focus:outline-none transition-colors"
            />
            <div className="flex justify-end">
              <button
                onClick={handleImportText}
                className="rounded-xl bg-primary-container text-on-primary px-4 py-2 text-xs font-medium hover:bg-primary transition shadow-xs"
              >
                Apply Imported Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
