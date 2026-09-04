"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useResumeStore } from "@/store/useResumeStore";
import { calculateAtsScore } from "@/lib/atsScoring";
import { improveBulletPoint, BulletStyle } from "@/lib/aiService";
import {
  Copy,
  Check,
  Wand2,
  Terminal,
  Search,
  CheckCircle,
  AlertTriangle,
  Edit,
} from "lucide-react";
import confetti from "canvas-confetti";

export function AtsAnalyzerClient() {
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
    ...resume.experiences.map((e) =>
      [
        `${e.position} - ${e.company} (${e.startDate} to ${e.current ? "Present" : e.endDate})`,
        ...e.bulletPoints.map((bp) => `  * ${bp}`),
      ].join("\n")
    ),
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
      status: allSkills.some(
        (s) => s.toLowerCase().includes("microservice") || s.toLowerCase().includes("distributed")
      )
        ? ("matched" as const)
        : ("gap" as const),
      category: "CORE ARCHITECTURE",
      notes: "Critical tier-1 keyword for high-seniority roles",
    },
    {
      name: "Latency SLAs & Performance Metrics",
      status: resume.experiences.some((e) =>
        e.bulletPoints.some((b) => b.includes("%") || b.includes("ms"))
      )
        ? ("matched" as const)
        : ("gap" as const),
      category: "EXECUTION & SCALE",
      notes: "Quantitative benchmark density indicator",
    },
    {
      name: "Cross-Functional Security Audits (SOC2 / PCI)",
      status: allSkills.some(
        (s) => s.toLowerCase().includes("security") || s.toLowerCase().includes("pci")
      )
        ? ("matched" as const)
        : ("gap" as const),
      category: "COMPLIANCE & GOVERNANCE",
      notes: "Enterprise regulatory signal",
    },
  ];

  const filteredKeywords = keywordItems.filter((item) => {
    if (filterTab === "gap" && item.status !== "gap") return false;
    if (filterTab === "matched" && item.status !== "matched") return false;
    if (keywordSearch.trim()) {
      return (
        item.name.toLowerCase().includes(keywordSearch.toLowerCase()) ||
        item.category.toLowerCase().includes(keywordSearch.toLowerCase())
      );
    }
    return true;
  });

  if (!isMounted) {
    return (
      <div className="w-full py-16 flex items-center justify-center bg-bg-canvas text-text-primary">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-xs font-medium text-text-muted">Loading ATS Compliance Studio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Target Context Bar */}
      <section className="w-full bg-surface border-b border-border-default px-4 sm:px-6 lg:px-12 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                ACTIVE DOCUMENT
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-status-success inline-block"></span>
              <span className="text-[11px] font-semibold text-primary">v4.2 Clean Parser Pass</span>
            </div>
            <h1 className="text-lg sm:text-xl font-semibold text-text-primary tracking-tight">
              {resume.personalInfo.fullName || "Candidate Document"} —{" "}
              {resume.personalInfo.jobTitle || "Professional Profile"}
            </h1>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-text-muted">
              <span>Target: {resume.personalInfo.jobTitle || "General ATS Position"}</span>
              <span className="text-border-default">|</span>
              <span>{resume.personalInfo.location || "Location Flexible"}</span>
            </div>
          </div>

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
                <span className="text-[9px] font-bold uppercase tracking-wider text-text-muted">
                  ATS INDEX
                </span>
                <span className="text-xs font-semibold text-text-primary">
                  Workday • Ashby • Lever Calibrated
                </span>
              </div>
            </div>

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
                {copiedText ? (
                  <Check className="h-3.5 w-3.5 text-status-success" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-text-muted" />
                )}
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
          <div className="bg-surface border border-border-default rounded-xl p-4 flex flex-col justify-between shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
              KEYWORD MATCH
            </span>
            <div className="my-2">
              <span className="text-2xl font-bold text-text-primary">
                {analysis.keywordMatch}%
              </span>
            </div>
            <div className="space-y-1">
              <div className="w-full bg-surface-container-low rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: `${analysis.keywordMatch}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-text-muted">Role keyword alignment</p>
            </div>
          </div>

          <div className="bg-surface border border-border-default rounded-xl p-4 flex flex-col justify-between shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
              SEMANTIC DEPTH
            </span>
            <div className="my-2">
              <span className="text-2xl font-bold text-status-success">
                {analysis.skillsMatch}%
              </span>
            </div>
            <div className="space-y-1">
              <div className="w-full bg-surface-container-low rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-status-success h-full rounded-full"
                  style={{ width: `${analysis.skillsMatch}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-text-muted">Technical skill hierarchy</p>
            </div>
          </div>

          <div className="bg-surface border border-border-default rounded-xl p-4 flex flex-col justify-between shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
              PARSER COMPLIANCE
            </span>
            <div className="my-2">
              <span className="text-2xl font-bold text-text-primary">
                {analysis.formattingSafety}%
              </span>
            </div>
            <div className="space-y-1">
              <div className="w-full bg-surface-container-low rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: `${analysis.formattingSafety}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-text-muted">Zero table/glyph errors</p>
            </div>
          </div>

          <div className="bg-surface border border-border-default rounded-xl p-4 flex flex-col justify-between shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
              QUANTIFIED IMPACT
            </span>
            <div className="my-2">
              <span className="text-2xl font-bold text-text-primary">
                {analysis.contentQuality}%
              </span>
            </div>
            <div className="space-y-1">
              <div className="w-full bg-surface-container-low rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: `${analysis.contentQuality}%` }}
                ></div>
              </div>
              <p className="text-[11px] text-text-muted">STAR metric density</p>
            </div>
          </div>
        </div>

        {/* 2-Column Editorial Grid: Semantic Match Matrix + Format Checks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left 7 Columns: Semantic Match Matrix & Bullet Optimizer */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-surface border border-border-default rounded-xl p-5 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border-default">
                <div>
                  <h2 className="text-sm font-semibold text-text-primary">Semantic Match Matrix</h2>
                  <p className="text-xs text-text-muted">
                    Skills and keywords evaluated against modern parser rules
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-surface-container-low px-2.5 py-1 rounded-lg border border-border-default">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="text-[11px] font-semibold text-secondary">
                    {keywordItems.filter((k) => k.status === "gap").length} Gaps Detected
                  </span>
                </div>
              </div>

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

              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {filteredKeywords.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-surface-container-low rounded-lg border border-border-default flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-text-primary truncate">{item.name}</span>
                        <span className="text-[10px] text-text-muted font-mono uppercase">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-text-muted truncate">{item.notes}</p>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold shrink-0 uppercase tracking-wider ${
                        item.status === "matched"
                          ? "bg-status-success/15 text-status-success"
                          : "bg-secondary/15 text-secondary"
                      }`}
                    >
                      {item.status === "matched" ? "Matched" : "Identified Gap"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weak Bullet Point Optimizer */}
            {analysis.weakBulletPoints.length > 0 && (
              <div className="bg-surface border border-border-default rounded-xl p-5 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border-default">
                  <div>
                    <h2 className="text-sm font-semibold text-text-primary">
                      Experience Impact Optimizer (STAR / XYZ)
                    </h2>
                    <p className="text-xs text-text-muted">
                      Strengthen vague bullets with measurable achievements and metric anchors
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-surface-container-low p-1 rounded-lg border border-border-default text-xs">
                    {(["achievement", "metric-driven", "leadership"] as BulletStyle[]).map((st) => (
                      <button
                        key={st}
                        onClick={() => setSelectedStyle(st)}
                        className={`px-2 py-0.5 rounded text-[11px] font-medium capitalize transition ${
                          selectedStyle === st
                            ? "bg-surface text-text-primary font-semibold shadow-xs"
                            : "text-text-muted hover:text-text-primary"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {analysis.weakBulletPoints.map((weak, idx) => {
                    const key = `${weak.experienceId}-${weak.bulletIndex}`;
                    const isFixing = optimizingId === key;
                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-lg border border-border-default bg-surface-container-low space-y-2.5 text-xs"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1 flex-1">
                            <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block">
                              Issue: {weak.reason}
                            </span>
                            <p className="text-text-primary leading-relaxed italic">
                              &ldquo;{weak.text}&rdquo;
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              handleFixBullet(weak.experienceId, weak.bulletIndex, weak.text)
                            }
                            disabled={isFixing}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-container text-on-primary text-xs font-medium hover:bg-primary transition shadow-xs shrink-0 disabled:opacity-50"
                          >
                            <Wand2 className="h-3 w-3" />
                            <span>{isFixing ? "Polishing..." : "1-Click Enhance"}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right 5 Columns: Format Health & Raw OCR Simulation */}
          <div className="lg:col-span-5 space-y-6">
            {/* Format Safety Checklist */}
            <div className="bg-surface border border-border-default rounded-xl p-5 shadow-xs space-y-3">
              <h2 className="text-sm font-semibold text-text-primary pb-3 border-b border-border-default">
                ATS Layout &amp; Parsing Integrity Checks
              </h2>
              <div className="space-y-2.5 text-xs">
                {analysis.formatChecks.map((chk, i) => {
                  const isPass = chk.status === "pass";
                  return (
                    <div
                      key={i}
                      className="flex items-start justify-between gap-3 p-2.5 rounded-lg bg-surface-container-low border border-border-default"
                    >
                      <div className="flex items-start gap-2">
                        {isPass ? (
                          <CheckCircle className="h-4 w-4 text-status-success shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="font-semibold text-text-primary">{chk.name}</p>
                          <p className="text-[11px] text-text-muted">{chk.message}</p>
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase ${
                          isPass ? "text-status-success" : "text-secondary"
                        }`}
                      >
                        {chk.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Raw OCR Text Extraction Stream */}
            <div className="bg-surface border border-border-default rounded-xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-border-default">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-primary" />
                  <h3 className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                    Raw ATS Text Extraction Preview
                  </h3>
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
    </div>
  );
}
