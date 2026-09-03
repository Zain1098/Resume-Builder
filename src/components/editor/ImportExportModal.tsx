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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Import & Export Resume (JSON)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Save a portable backup or restore your previous resume data anytime.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Feedback messages */}
        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs font-medium text-red-700 dark:bg-red-950/40 dark:text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
        {successMsg && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
            <Check className="h-4 w-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Export Section */}
        <div className="mt-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Export Current Data
          </h4>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              onClick={handleDownloadJSON}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-95 transition"
            >
              <Download className="h-3.5 w-3.5" />
              Download .JSON File
            </button>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-slate-500" />
                  Copy JSON Text
                </>
              )}
            </button>
          </div>
        </div>

        {/* Import Section */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Import from File or Text
          </h4>

          {activeDoc.isMaster && (
            <div className="mt-2.5 rounded-lg border border-amber-200 bg-amber-50/80 p-2.5 dark:border-amber-800/80 dark:bg-amber-950/30 flex items-center gap-2">
              <input
                type="checkbox"
                id="protect-master-chk"
                checked={importAsNewVersion}
                onChange={(e) => setImportAsNewVersion(e.target.checked)}
                className="rounded border-amber-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
              />
              <label htmlFor="protect-master-chk" className="text-xs text-amber-900 dark:text-amber-200 font-medium cursor-pointer">
                Import as new version (Recommended to keep Master Career Profile intact)
              </label>
            </div>
          )}

          {/* File Upload Box */}
          <div className="mt-3 flex items-center justify-center rounded-xl border-2 border-dashed border-slate-200 p-4 text-center hover:border-blue-400 dark:border-slate-800 dark:hover:border-blue-500 transition">
            <label className="cursor-pointer flex flex-col items-center">
              <Upload className="h-6 w-6 text-slate-400 mb-1" />
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                Click to upload JSON file
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">
                .json files exported from CareerCraft
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
          <div className="mt-4">
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Or paste raw JSON:
            </label>
            <textarea
              rows={4}
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              placeholder="Paste JSON schema object here..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 font-mono text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:focus:bg-slate-900"
            />
            <div className="mt-2 flex justify-end">
              <button
                onClick={handleImportText}
                className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 transition"
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
