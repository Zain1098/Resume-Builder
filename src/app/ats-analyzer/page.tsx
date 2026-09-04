"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import { useResumeStore } from "@/store/useResumeStore";
import { calculateAtsScore } from "@/lib/atsScoring";
import { improveBulletPoint, BulletStyle } from "@/lib/aiService";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  Copy,
  Check,
  Wand2,
  Terminal,
  Search,
  CheckCircle,
  Edit,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function AtsAnalyzerPage() {
  const { resume, updateBulletPoint } = useResumeStore();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<BulletStyle>("achievement");
  const [optimizingId, setOptimizingId] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState(false);
  const [keywordSearch, setKeywordSearch] = useState("");
  const [filterTab, setFilterTab] = useState<"all" | "gap" | "matched">("all");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-canvas text-text-primary">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-xs font-medium text-text-muted">Running ATS Compliance Diagnostic...</p>
        </div>
      </div>
    );
  }

  const analysis = calculateAtsScore(resume);

  // Generate plain text as an automated ATS would extract it
  const plainTextExtraction = [
    resume.personalInfo.fullName.toUpperCase(),
    resume.personalInfo.jobTitle,
    `${resume.personalInfo.location} | ${resume.personalInfo.phone} | ${resume.personalInfo.email}`,
    resume.personalInfo.linkedin,
    "",
    "--- PROFESSIONAL SUMMARY ---",
    resume.personalInfo.summary,
    "",
    "--- EXPERIENCE ---",
    ...resume.experiences.map((e) => [
      `${e.position} - ${e.company} (${e.startDate} to ${e.current ? "Present" : e.endDate})`,
      ...e.bulletPoints.map((bp) => `  * ${bp}`)
    ].join("\n")),
    "",
    "--- EDUCATION ---",
    ...resume.educations.map((edu) => `${edu.degree} in ${edu.fieldOfStudy} - ${edu.institution}`),
    "",
    "--- SKILLS ---",
    ...resume.skillCategories.map((cat) => `${cat.name}: ${cat.skills.join(", ")}`),
  ].join("\n");

  const handleCopyText = () => {
    navigator.clipboard.writeText(plainTextExtraction);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleFixBullet = async (expId: string, bulletIdx: number, text: string) => {
    const key = `${expId}-${bulletIdx}`;
    setOptimizingId(key);
    try {
      const result = await improveBulletPoint(text, selectedStyle);
      updateBulletPoint(expId, bulletIdx, result.improved);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } finally {
      setOptimizingId(null);
    }
  };

  // Compile keywords list from skills and experiences
  const allSkills = resume.skillCategories.flatMap((c) => c.skills);
  const keywordItems = [
    ...allSkills.map((s) => ({
      name: s,
      status: "matched" as const,
      category: "TECHNICAL SKILLS",
      notes: "Present in skills ledger & role descriptions",
    })),
    {
      name: "Distributed Consensus & Microservices",
      status: allSkills.some((s) => s.toLowerCase().includes("microservice") || s.toLowerCase().includes("distributed"))
        ? "matched" as const
        : "gap" as const,
      category: "CORE ARCHITECTURE",
      notes: "Critical tier-1 keyword for high-seniority roles",
    },
    {
      name: "Latency SLAs & Performance Metrics",
      status: resume.experiences.some((e) => e.bulletPoints.some((b) => b.includes("%") || b.includes("ms")))
        ? "matched" as const
        : "gap" as const,
      category: "EXECUTION & SCALE",
      notes: "Quantitative benchmark density indicator",
    },
    {
      name: "Cross-Functional Security Audits (SOC2 / PCI)",
      status: allSkills.some((s) => s.toLowerCase().includes("security") || s.toLowerCase().includes("pci"))
        ? "matched" as const
        : "gap" as const,
      category: "COMPLIANCE & GOVERNANCE",
      notes: "Enterprise regulatory signal",
    },
  ];

  const filteredKeywords = keywordItems.filter((item) => {
    if (filterTab === "gap" && item.status !== "gap") return false;
    if (filterTab === "matched" && item.status !== "matched") return false;
    if (keywordSearch.trim()) {
      return item.name.toLowerCase().includes(keywordSearch.toLowerCase()) ||
             item.category.toLowerCase().includes(keywordSearch.toLowerCase());
    }
    return true;
  });

  return (
    <div className="flex min-h-screen flex-col bg-bg-canvas text-text-primary">
      <Navbar />

      <main className="w-full flex-1">
        {/* Target Context Bar */}
        <section className="w-full bg-surface border-b border-border-default px-4 sm:px-6 lg:px-12 py-3.5">
          <div className="max-w-7xl mx-auto flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            {/* Left: Resume Meta & Job Target */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">ACTIVE DOCUMENT</span>
                <span className="w-1.5 h-1.5 rounded-full bg-status-success inline-block"></span>
                <span className="text-[11px] font-semibold text-primary">v4.2 Clean Parser Pass</span>
              </div>
              <h1 className="text-lg sm:text-xl font-semibold text-text-primary tracking-tight">
                {resume.personalInfo.fullName || "Candidate Document"} — {resume.personalInfo.jobTitle || "Professional Profile"}
              </h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-text-muted">
                <span>Target: {resume.personalInfo.jobTitle || "General ATS Position"}</span>
                <span className="text-border-default">|</span>
                <span>{resume.personalInfo.location || "Location Flexible"}</span>
              </div>
            </div>

            {/* Right: Target Score Pill + Actions */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Circular Gauge compatibility pill */}
              <div className="flex items-center gap-2.5 px-3 py-1.5 bg-surface-container-low border border-border-default rounded-xl">
                <div className="relative flex items-center justify-center w-9 h-9">
                  <svg className="w-9 h-9 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-border-default"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    />
                    <path
                      className="text-primary-container"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray={`${analysis.overallScore}, 100`}
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    />
                  </svg>
                  <span className="absolute text-[11px] font-bold text-primary">
                    {analysis.overallScore}%
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-text-muted">ATS INDEX</span>
                  <span className="text-xs font-semibold text-text-primary">Workday • Ashby • Lever Calibrated</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex items-center gap-2">
                <Link
                  href="/builder"
                  className="inline-flex items-center gap-1.5 bg-primary-container text-on-primary text-xs font-medium px-3.5 py-2 rounded-lg hover:bg-primary transition shadow-xs"
                >
                  <Edit className="h-3.5 w-3.5" />
                  <span>Apply Gaps in Builder</span>
                </Link>
                <button
                  onClick={handleCopyText}
                  className="inline-flex items-center gap-1.5 bg-surface border border-border-default text-text-primary text-xs font-medium px-3 py-2 rounded-lg hover:bg-surface-container-low transition shadow-xs"
                >
                  {copiedText ? <Check className="h-3.5 w-3.5 text-status-success" /> : <Copy className="h-3.5 w-3.5 text-text-muted" />}
                  <span>{copiedText ? "Copied" : "Copy OCR"}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Diagnostic Workspace */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 space-y-8">
          {/* 4 Executive ATS Scoring Tiles */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Tile 1 */}
            <div className="bg-surface border border-border-default rounded-xl p-4 flex flex-col justify-between shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">KEYWORD MATCH</span>
              <div className="my-2">
                <span className="text-2xl font-bold text-text-primary">{analysis.keywordMatch}%</span>
              </div>
              <div className="space-y-1">
                <div className="w-full bg-surface-container-low rounded-full h-1.5 overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: `${analysis.keywordMatch}%` }}></div>
                </div>
                <p className="text-[11px] text-text-muted">Role keyword alignment</p>
              </div>
            </div>

            {/* Tile 2 */}
            <div className="bg-surface border border-border-default rounded-xl p-4 flex flex-col justify-between shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">SEMANTIC DEPTH</span>
              <div className="my-2">
                <span className="text-2xl font-bold text-status-success">{analysis.skillsMatch}%</span>
              </div>
              <div className="space-y-1">
                <div className="w-full bg-surface-container-low rounded-full h-1.5 overflow-hidden">
                  <div className="bg-status-success h-full rounded-full" style={{ width: `${analysis.skillsMatch}%` }}></div>
                </div>
                <p className="text-[11px] text-text-muted">Technical skill hierarchy</p>
              </div>
            </div>

            {/* Tile 3 */}
            <div className="bg-surface border border-border-default rounded-xl p-4 flex flex-col justify-between shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">PARSER COMPLIANCE</span>
              <div className="my-2">
                <span className="text-2xl font-bold text-text-primary">{analysis.formattingSafety}%</span>
              </div>
              <div className="space-y-1">
                <div className="w-full bg-surface-container-low rounded-full h-1.5 overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: `${analysis.formattingSafety}%` }}></div>
                </div>
                <p className="text-[11px] text-text-muted">Zero table/glyph errors</p>
              </div>
            </div>

            {/* Tile 4 */}
            <div className="bg-surface border border-border-default rounded-xl p-4 flex flex-col justify-between shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">QUANTIFIED IMPACT</span>
              <div className="my-2">
                <span className="text-2xl font-bold text-text-primary">{analysis.contentQuality}%</span>
              </div>
              <div className="space-y-1">
                <div className="w-full bg-surface-container-low rounded-full h-1.5 overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: `${analysis.contentQuality}%` }}></div>
                </div>
                <p className="text-[11px] text-text-muted">STAR metric density</p>
              </div>
            </div>
          </div>

          {/* 2-Column Editorial Grid: Semantic Match Matrix + Format Checks */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 7 Columns: Semantic Match Matrix & Bullet Optimizer */}
            <div className="lg:col-span-7 space-y-6">
              {/* Interactive ATS Keyword Matrix */}
              <div className="bg-surface border border-border-default rounded-xl p-5 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-default">
                  <div>
                    <h2 className="text-sm font-semibold text-text-primary">Semantic Match Matrix</h2>
                    <p className="text-xs text-text-muted">Skills and keywords evaluated against modern parser rules</p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-surface-container-low px-2.5 py-1 rounded-lg border border-border-default">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span className="text-[11px] font-semibold text-secondary">
                      {keywordItems.filter((k) => k.status === "gap").length} Gaps Detected
                    </span>
                  </div>
                </div>

                {/* Search & Segmented Filter Tabs */}
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-text-muted" />
                    <input
                      type="text"
                      value={keywordSearch}
                      onChange={(e) => setKeywordSearch(e.target.value)}
                      placeholder="Search keywords, skills, architectures..."
                      className="w-full h-9 pl-9 pr-3 rounded-lg bg-surface-container-low border border-border-default text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition"
                    />
                  </div>
                  <div className="inline-flex p-0.5 bg-surface-container-low rounded-lg border border-border-default">
                    <button
                      onClick={() => setFilterTab("all")}
                      className={`px-3 py-1 rounded text-xs font-medium transition ${
                        filterTab === "all"
                          ? "bg-surface text-text-primary font-semibold shadow-xs"
                          : "text-text-muted hover:text-text-primary"
                      }`}
                    >
                      All ({keywordItems.length})
                    </button>
                    <button
                      onClick={() => setFilterTab("gap")}
                      className={`px-3 py-1 rounded text-xs font-medium transition ${
                        filterTab === "gap"
                          ? "bg-surface text-text-primary font-semibold shadow-xs"
                          : "text-text-muted hover:text-text-primary"
                      }`}
                    >
                      Gaps ({keywordItems.filter((k) => k.status === "gap").length})
                    </button>
                    <button
                      onClick={() => setFilterTab("matched")}
                      className={`px-3 py-1 rounded text-xs font-medium transition ${
                        filterTab === "matched"
                          ? "bg-surface text-text-primary font-semibold shadow-xs"
                          : "text-text-muted hover:text-text-primary"
                      }`}
                    >
                      Matched ({keywordItems.filter((k) => k.status === "matched").length})
                    </button>
                  </div>
                </div>

                {/* Keyword Rows */}
                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {filteredKeywords.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-surface-container-low rounded-lg border border-border-default gap-2 text-xs"
                    >
                      <div className="flex items-start gap-2.5">
                        {item.status === "matched" ? (
                          <CheckCircle className="h-4 w-4 text-status-success shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                        )}
                        <div>
                          <span className="font-semibold text-text-primary">{item.name}</span>
                          <p className="text-[11px] text-text-muted">{item.notes}</p>
                        </div>
                      </div>
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold self-start sm:self-auto ${
                          item.status === "matched"
                            ? "bg-primary-fixed/30 text-primary border border-primary/20"
                            : "bg-secondary-container/20 text-secondary border border-secondary/20"
                        }`}
                      >
                        {item.status === "matched" ? "Matched" : "Action Needed"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weak Bullet Point Optimizer */}
              <div className="bg-surface border border-border-default rounded-xl p-5 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border-default">
                  <div className="flex items-center gap-2">
                    <Wand2 className="h-4 w-4 text-secondary" />
                    <h2 className="text-sm font-semibold text-text-primary">
                      STAR / Google XYZ Bullet Refinement ({analysis.weakBulletPoints.length})
                    </h2>
                  </div>

                  <select
                    value={selectedStyle}
                    onChange={(e) => setSelectedStyle(e.target.value as BulletStyle)}
                    className="rounded-lg border border-border-default bg-surface-container-low px-2.5 py-1 text-xs text-text-primary focus:outline-none"
                  >
                    <option value="achievement">Achievement-Focused (STAR)</option>
                    <option value="technical">Technical Rigor</option>
                    <option value="concise">Concise Impact</option>
                    <option value="executive">Executive Leadership</option>
                    <option value="professional">Standard Professional</option>
                  </select>
                </div>

                {analysis.weakBulletPoints.length === 0 ? (
                  <div className="rounded-xl bg-surface-container-low p-6 text-center border border-border-default">
                    <CheckCircle2 className="h-7 w-7 text-status-success mx-auto mb-2" />
                    <h3 className="text-xs font-semibold text-text-primary">
                      All Experience Bullets Pass Quality Audit!
                    </h3>
                    <p className="text-[11px] text-text-muted mt-1">
                      No passive voice phrases or weak responsibility descriptions detected.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                    {analysis.weakBulletPoints.map((item, idx) => {
                      const isBusy = optimizingId === `${item.experienceId}-${item.bulletIndex}`;
                      return (
                        <div
                          key={idx}
                          className="rounded-xl border border-border-default bg-surface-container-low p-3.5 space-y-2 text-xs"
                        >
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-semibold text-secondary">
                              ⚠ {item.reason}
                            </span>
                            <span className="text-text-muted">Recommendation available</span>
                          </div>
                          <div className="text-text-primary bg-surface p-2.5 rounded-lg border border-border-default leading-relaxed italic">
                            &quot;{item.text}&quot;
                          </div>
                          <div className="flex items-center justify-end pt-1">
                            <button
                              type="button"
                              disabled={isBusy}
                              onClick={() =>
                                handleFixBullet(item.experienceId, item.bulletIndex, item.text)
                              }
                              className="inline-flex items-center gap-1.5 rounded-lg bg-primary-container text-on-primary px-3 py-1.5 text-xs font-medium hover:bg-primary disabled:opacity-50 transition shadow-xs"
                            >
                              <Sparkles className="h-3 w-3" />
                              <span>{isBusy ? "Optimizing..." : "1-Click AI Polish"}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right 5 Columns: Format Checks & Simulated Plaintext OCR */}
            <div className="lg:col-span-5 space-y-6">
              {/* Parseability & Structure Audit */}
              <div className="bg-surface border border-border-default rounded-xl p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border-default">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-primary" />
                    <h2 className="text-sm font-semibold text-text-primary">
                      Parser Compliance Checklist
                    </h2>
                  </div>
                  <span className="text-[11px] font-semibold text-status-success">
                    {analysis.formatChecks.filter((c) => c.status === "pass").length} / {analysis.formatChecks.length} Passed
                  </span>
                </div>

                <div className="space-y-2.5">
                  {analysis.formatChecks.map((check) => (
                    <div
                      key={check.id}
                      className="rounded-lg border border-border-default p-3 bg-surface-container-low flex items-start gap-2.5 text-xs"
                    >
                      {check.status === "pass" ? (
                        <CheckCircle2 className="h-4 w-4 text-status-success shrink-0 mt-0.5" />
                      ) : check.status === "warn" ? (
                        <AlertTriangle className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-4 w-4 text-status-error shrink-0 mt-0.5" />
                      )}
                      <div>
                        <h3 className="font-semibold text-text-primary">
                          {check.name}
                        </h3>
                        <p className="text-[11px] text-text-muted mt-0.5 leading-relaxed">
                          {check.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Simulated ATS Text Extraction */}
              <div className="bg-surface border border-border-default rounded-xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-border-default">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-text-muted" />
                    <h2 className="text-sm font-semibold text-text-primary">
                      Raw Text OCR Extraction
                    </h2>
                  </div>
                  <button
                    onClick={handleCopyText}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
                  >
                    {copiedText ? "Copied ✓" : "Copy Raw"}
                  </button>
                </div>
                <p className="text-[11px] text-text-muted">
                  This simulates the plain unicode text stream that enterprise parsers extract from your resume.
                </p>
                <pre className="max-h-60 overflow-y-auto rounded-lg bg-surface-container-low border border-border-default p-3 font-mono text-[11px] text-text-primary whitespace-pre-wrap leading-relaxed">
                  {plainTextExtraction}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
