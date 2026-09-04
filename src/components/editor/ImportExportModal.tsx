"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useResumeStore } from "@/store/useResumeStore";
import {
  X,
  Upload,
  Download,
  Copy,
  Check,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Loader2,
  CheckCircle2,
  FileCheck,
} from "lucide-react";
import confetti from "canvas-confetti";
import { ResumeData } from "@/types/resume";
import { parseResumeFromText, normalizeJsonResume } from "@/lib/resumeParser";

interface ImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ImportExportModal({ isOpen, onClose }: ImportExportModalProps) {
  const router = useRouter();
  const { resume, importResume, getActiveResume, createResumeFromData } = useResumeStore();

  const [activeTab, setActiveTab] = useState<"import" | "export">("import");
  const [importMode, setImportMode] = useState<"file" | "text">("file");
  const [textInput, setTextInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successResult, setSuccessResult] = useState<{
    summary: string;
    data: ResumeData;
    candidateName: string;
    role: string;
    expCount: number;
    skillCount: number;
  } | null>(null);

  const activeDoc = getActiveResume();
  const [destinationMode, setDestinationMode] = useState<"active" | "new_version">("active");

  const fileInputRef = useRef<HTMLInputElement>(null);

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
    const filename = `${resume.personalInfo.fullName.replace(/\s+/g, "_") || "resume"}_ledger_backup.json`;
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleProcessParsedData = (structuredData: ResumeData, summaryMsg: string) => {
    const expCount = structuredData.experiences.length;
    const skillCount = structuredData.skillCategories.reduce(
      (acc, c) => acc + c.skills.length,
      0
    );
    const candidateName = structuredData.personalInfo.fullName || "Candidate";
    const role = structuredData.personalInfo.jobTitle || "Professional";

    setSuccessResult({
      summary: summaryMsg,
      data: structuredData,
      candidateName,
      role,
      expCount,
      skillCount,
    });
    setError(null);
  };

  const handleConfirmApply = () => {
    if (!successResult) return;
    const { data, candidateName, role } = successResult;

    if (destinationMode === "new_version") {
      const title = `${candidateName} (${role})`;
      createResumeFromData(title, role, data);
    } else {
      importResume(data);
    }

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    onClose();
    router.push("/builder");
  };

  // Handle File Upload (PDF, JSON, TXT)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setError(null);
    setSuccessResult(null);

    try {
      const fileName = file.name.toLowerCase();

      // For JSON files, we can also parse client-side for zero-latency
      if (fileName.endsWith(".json")) {
        const text = await file.text();
        const json = JSON.parse(text);
        const structured = normalizeJsonResume(json);
        handleProcessParsedData(
          structured,
          `Successfully parsed ${file.name} JSON schema.`
        );
        setIsProcessing(false);
        return;
      }

      // For PDF and TXT, send to server API for high-fidelity extraction
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/resume/parse", {
        method: "POST",
        body: formData,
      });

      const resJson = await response.json();

      if (!response.ok || !resJson.success) {
        throw new Error(resJson.error || "Failed to extract resume data from file.");
      }

      handleProcessParsedData(resJson.data, resJson.summary);
    } catch (err) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Error processing resume file.";
      setError(msg);
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Handle Pasted Text or JSON
  const handleProcessText = async () => {
    const trimmed = textInput.trim();
    if (!trimmed) {
      setError("Please paste your resume text or JSON schema first.");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setSuccessResult(null);

    try {
      // Check if it's JSON
      if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
        try {
          const parsed = JSON.parse(trimmed);
          const structured = normalizeJsonResume(parsed);
          handleProcessParsedData(structured, "Successfully parsed JSON resume schema.");
          setIsProcessing(false);
          return;
        } catch {
          // Fall through to plain text
        }
      }

      // Plain text extraction
      const structured = parseResumeFromText(trimmed);
      handleProcessParsedData(
        structured,
        `Extracted ${structured.experiences.length} experience entries and ${structured.skillCategories.reduce((acc, c) => acc + c.skills.length, 0)} skills.`
      );
    } catch (err) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Error parsing pasted text.";
      setError(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl rounded-2xl border border-border-default bg-surface p-6 sm:p-7 shadow-2xl max-h-[92vh] overflow-y-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-border-default">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-container text-on-primary">
                <FileCheck className="h-4 w-4" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">
                Resume Ledger &amp; Import Studio
              </h3>
            </div>
            <p className="text-xs text-text-muted">
              Import your existing CV (PDF, JSON, or Text) or export portable career backups.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-text-muted hover:text-text-primary hover:bg-surface-container-low transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-xl bg-surface-container-low p-1 border border-border-default">
          <button
            type="button"
            onClick={() => {
              setActiveTab("import");
              setError(null);
            }}
            className={`flex-1 rounded-lg py-2 text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
              activeTab === "import"
                ? "bg-surface text-primary shadow-xs font-bold"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Import Existing Resume (PDF / JSON / Text)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("export");
              setError(null);
            }}
            className={`flex-1 rounded-lg py-2 text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
              activeTab === "export"
                ? "bg-surface text-primary shadow-xs font-bold"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <Download className="h-3.5 w-3.5" />
            <span>Backup &amp; Export</span>
          </button>
        </div>

        {/* Feedback Alert */}
        {error && (
          <div className="flex items-start gap-2.5 rounded-xl bg-status-error/15 border border-status-error/25 p-3 text-xs font-medium text-status-error">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* TAB 1: IMPORT RESUME */}
        {activeTab === "import" && (
          <div className="space-y-5">
            {/* Success Extraction Preview Card */}
            {successResult ? (
              <div className="rounded-xl border border-primary-container/40 bg-surface-container-low p-5 space-y-4 shadow-xs animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-border-default pb-3">
                  <div className="flex items-center gap-2 text-status-success font-bold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Resume Successfully Parsed!</span>
                  </div>
                  <span className="text-[11px] text-text-muted">
                    Ready to set into editor
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="rounded-lg bg-surface border border-border-default p-2.5">
                    <span className="text-[10px] text-text-muted block uppercase font-semibold">Candidate</span>
                    <span className="font-bold text-text-primary truncate block">{successResult.candidateName}</span>
                  </div>
                  <div className="rounded-lg bg-surface border border-border-default p-2.5">
                    <span className="text-[10px] text-text-muted block uppercase font-semibold">Detected Role</span>
                    <span className="font-bold text-text-primary truncate block">{successResult.role}</span>
                  </div>
                  <div className="rounded-lg bg-surface border border-border-default p-2.5">
                    <span className="text-[10px] text-text-muted block uppercase font-semibold">Experiences</span>
                    <span className="font-bold text-primary">{successResult.expCount} entries</span>
                  </div>
                  <div className="rounded-lg bg-surface border border-border-default p-2.5">
                    <span className="text-[10px] text-text-muted block uppercase font-semibold">Skills Extracted</span>
                    <span className="font-bold text-status-success">{successResult.skillCount} skills</span>
                  </div>
                </div>

                <p className="text-xs text-text-muted leading-relaxed">
                  {successResult.summary}
                </p>

                {/* Destination Choice */}
                <div className="space-y-2 pt-2 border-t border-border-default">
                  <span className="text-xs font-semibold text-text-primary block">
                    Where would you like to load this resume?
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <label
                      className={`flex items-start gap-2.5 rounded-xl border p-3 cursor-pointer transition ${
                        destinationMode === "active"
                          ? "border-primary-container bg-surface shadow-xs"
                          : "border-border-default bg-surface/50 opacity-80"
                      }`}
                    >
                      <input
                        type="radio"
                        name="destination"
                        checked={destinationMode === "active"}
                        onChange={() => setDestinationMode("active")}
                        className="mt-0.5 text-primary focus:ring-primary"
                      />
                      <div className="text-xs">
                        <strong className="text-text-primary block">Set as Active Resume</strong>
                        <span className="text-text-muted text-[11px]">
                          Replaces current editor document so you can immediately edit and calculate ATS score.
                        </span>
                      </div>
                    </label>

                    <label
                      className={`flex items-start gap-2.5 rounded-xl border p-3 cursor-pointer transition ${
                        destinationMode === "new_version"
                          ? "border-primary-container bg-surface shadow-xs"
                          : "border-border-default bg-surface/50 opacity-80"
                      }`}
                    >
                      <input
                        type="radio"
                        name="destination"
                        checked={destinationMode === "new_version"}
                        onChange={() => setDestinationMode("new_version")}
                        className="mt-0.5 text-primary focus:ring-primary"
                      />
                      <div className="text-xs">
                        <strong className="text-text-primary block">Save as New Version Branch</strong>
                        <span className="text-text-muted text-[11px]">
                          Keeps current Master Profile intact and creates a dedicated version in Career Vault.
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Confirm Action Button */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSuccessResult(null)}
                    className="rounded-xl border border-border-default bg-surface px-4 py-2 text-xs font-medium text-text-primary hover:bg-surface-container-low transition"
                  >
                    Upload Different File
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmApply}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#154539] hover:bg-[#1d5547] text-white font-bold px-5 py-2.5 text-xs shadow-md transition-all active:scale-[0.98]"
                  >
                    <span>Open in Resume Builder</span>
                    <ArrowRight className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* File vs Paste Text sub-toggle */}
                <div className="flex items-center gap-4 text-xs font-medium border-b border-border-default pb-2">
                  <button
                    type="button"
                    onClick={() => setImportMode("file")}
                    className={`pb-1 transition border-b-2 ${
                      importMode === "file"
                        ? "border-primary-container text-primary font-bold"
                        : "border-transparent text-text-muted hover:text-text-primary"
                    }`}
                  >
                    Upload Document (PDF or JSON)
                  </button>
                  <button
                    type="button"
                    onClick={() => setImportMode("text")}
                    className={`pb-1 transition border-b-2 ${
                      importMode === "text"
                        ? "border-primary-container text-primary font-bold"
                        : "border-transparent text-text-muted hover:text-text-primary"
                    }`}
                  >
                    Paste Text or JSON
                  </button>
                </div>

                {importMode === "file" ? (
                  <div className="space-y-3">
                    {/* Drag & Drop Upload Zone */}
                    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border-default bg-surface-container-low p-8 text-center hover:border-primary-container transition group cursor-pointer relative">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.json,.txt,application/pdf,application/json,text/plain"
                        onChange={handleFileUpload}
                        disabled={isProcessing}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                      />

                      {isProcessing ? (
                        <div className="flex flex-col items-center gap-3 py-4">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-text-primary">
                              Analyzing Document with Resume Parser...
                            </p>
                            <p className="text-[11px] text-text-muted">
                              Extracting contact details, career experiences, and skill keywords
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <div className="h-12 w-12 rounded-xl bg-surface border border-border-default flex items-center justify-center text-primary group-hover:scale-105 transition shadow-xs">
                            <Upload className="h-6 w-6" />
                          </div>
                          <div className="space-y-0.5 mt-1">
                            <p className="text-xs font-bold text-text-primary">
                              Click or drop your existing resume here
                            </p>
                            <p className="text-[11px] text-text-muted">
                              Supports standard PDF documents (.pdf), JSON ledgers (.json), or text files (.txt)
                            </p>
                          </div>
                          <span className="mt-2 inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold bg-primary-fixed/20 text-primary border border-primary/20">
                            Automatic Extraction &amp; ATS Structuring
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Paste Text Mode */
                  <div className="space-y-3">
                    <label className="block text-xs font-semibold text-text-primary">
                      Paste Raw Resume Text or JSON:
                    </label>
                    <textarea
                      rows={8}
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Paste your resume content from LinkedIn, Word, or plain text here:

Jane Doe
Senior Full Stack Engineer
jane@example.com | (555) 123-4567 | San Francisco, CA

EXPERIENCE
Acme Corp — Lead Frontend Engineer (2021 - Present)
• Architected scalable Next.js and TypeScript web applications.
• Increased system conversion rate by 24% across 1M monthly users.

EDUCATION
University of California — B.S. in Computer Science (2017 - 2021)

SKILLS
TypeScript, React, Node.js, Python, PostgreSQL, AWS, Docker"
                      className="w-full rounded-xl border border-border-default bg-surface-container-low p-3.5 font-mono text-xs text-text-primary focus:border-primary-container focus:outline-none transition-colors leading-relaxed"
                    />

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={handleProcessText}
                        disabled={isProcessing || !textInput.trim()}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#154539] hover:bg-[#1d5547] text-white px-5 py-2.5 text-xs font-bold shadow-md transition disabled:opacity-50 active:scale-[0.98]"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 animate-spin text-white" />
                            <span>Parsing Text...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                            <span>Extract &amp; Structure Resume</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* TAB 2: EXPORT & BACKUP */}
        {activeTab === "export" && (
          <div className="space-y-5">
            <div className="rounded-xl border border-border-default bg-surface-container-low p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-text-primary">
                    Active Document Snapshot
                  </h4>
                  <p className="text-[11px] text-text-muted mt-0.5">
                    {resume.personalInfo.fullName || "Candidate"} &bull; {activeDoc.title}
                  </p>
                </div>
                <span className="rounded bg-status-success/15 px-2 py-0.5 text-[10px] font-bold text-status-success">
                  {activeDoc.atsScore}% ATS Verified
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadJSON}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#154539] hover:bg-[#1d5547] text-white px-4 py-2.5 text-xs font-bold transition shadow-md active:scale-[0.98]"
                >
                  <Download className="h-3.5 w-3.5 text-white" />
                  <span>Download .JSON Backup File</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-border-default bg-surface px-4 py-2.5 text-xs font-medium text-text-primary hover:bg-surface-container-low transition shadow-xs"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-status-success" />
                      <span className="text-status-success">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-text-muted" />
                      <span>Copy JSON Schema</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* JSON Schema Preview */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-text-muted">
                Portable JSON Schema Payload:
              </label>
              <pre className="max-h-56 overflow-y-auto rounded-xl border border-border-default bg-surface-container-low p-3 font-mono text-[11px] text-text-muted leading-relaxed">
                {currentJsonString}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

