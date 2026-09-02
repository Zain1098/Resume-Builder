"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { X, Search, CheckCircle2, AlertCircle, Plus, Sparkles } from "lucide-react";

interface JobDescriptionMatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COMMON_TECH_KEYWORDS = [
  "React", "Next.js", "TypeScript", "JavaScript", "Python", "Java", "C++", "C#", "Go", "Rust",
  "Node.js", "Express", "FastAPI", "Django", "Spring Boot", "GraphQL", "REST", "API", "APIs",
  "HTML5", "CSS3", "Tailwind CSS", "Redux", "Zustand", "Vue", "Angular", "Docker", "Kubernetes",
  "AWS", "Amazon Web Services", "Azure", "GCP", "Google Cloud", "PostgreSQL", "MySQL", "MongoDB",
  "Redis", "Kafka", "Elasticsearch", "CI/CD", "Git", "GitHub", "Linux", "Microservices",
  "Agile", "Scrum", "Jira", "Figma", "Unit Testing", "Jest", "Cypress", "PyTorch", "TensorFlow",
  "Machine Learning", "AI", "NLP", "LLM", "RAG", "SQL", "Snowflake", "BigQuery"
];

export function JobDescriptionMatcherModal({
  isOpen,
  onClose,
}: JobDescriptionMatcherModalProps) {
  const { resume, addSkillToCategory, addSkillCategory } = useResumeStore();
  const [jobText, setJobText] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [matchedKeywords, setMatchedKeywords] = useState<string[]>([]);
  const [missingKeywords, setMissingKeywords] = useState<string[]>([]);
  const [matchScore, setMatchScore] = useState(0);

  if (!isOpen) return null;

  const handleAnalyze = () => {
    if (!jobText.trim()) return;

    // Concatenate all resume text
    const resumeCorpus = [
      resume.personalInfo.fullName,
      resume.personalInfo.jobTitle,
      resume.personalInfo.summary,
      ...resume.experiences.map((e) => `${e.company} ${e.position} ${e.bulletPoints.join(" ")}`),
      ...resume.educations.map((e) => `${e.institution} ${e.degree} ${e.fieldOfStudy}`),
      ...resume.skillCategories.flatMap((c) => c.skills),
      ...resume.projects.map((p) => `${p.name} ${p.description} ${p.technologies.join(" ")}`),
      ...resume.certifications.map((c) => `${c.name} ${c.issuer}`),
    ]
      .join(" ")
      .toLowerCase();

    // Find keywords mentioned in Job Description
    const lowerJob = jobText.toLowerCase();
    const detectedInJob = COMMON_TECH_KEYWORDS.filter((kw) => {
      const regex = new RegExp(`\\b${kw.toLowerCase()}\\b`, "i");
      return regex.test(lowerJob);
    });

    if (detectedInJob.length === 0) {
      // Fallback: extract capitalized word sequences from job description
      const words = jobText.match(/[A-Z][a-zA-Z0-9+#.]+/g) || [];
      const uniqueWords = Array.from(new Set(words)).filter((w) => w.length > 2);
      detectedInJob.push(...uniqueWords.slice(0, 10));
    }

    const matched: string[] = [];
    const missing: string[] = [];

    detectedInJob.forEach((kw) => {
      if (resumeCorpus.includes(kw.toLowerCase())) {
        matched.push(kw);
      } else {
        missing.push(kw);
      }
    });

    const total = matched.length + missing.length;
    const score = total > 0 ? Math.round((matched.length / total) * 100) : 100;

    setMatchedKeywords(matched);
    setMissingKeywords(missing);
    setMatchScore(score);
    setAnalyzed(true);
  };

  const handleAddMissingKeyword = (keyword: string) => {
    const targetCat = resume.skillCategories[0]?.id;
    if (targetCat) {
      addSkillToCategory(targetCat, keyword);
    } else {
      addSkillCategory();
    }
    setMissingKeywords((prev) => prev.filter((k) => k !== keyword));
    setMatchedKeywords((prev) => [...prev, keyword]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Search className="h-5 w-5 text-blue-600" />
              <span>Job Description Matcher & ATS Scanner</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Paste the job posting to find missing keywords and optimize your ATS match rate.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Input Textarea */}
        <div className="mt-4">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Paste Job Description (Requirements, Responsibilities, or Stack):
          </label>
          <textarea
            rows={5}
            value={jobText}
            onChange={(e) => setJobText(e.target.value)}
            placeholder="e.g. We are looking for a Senior Full Stack Engineer with 4+ years experience in React, TypeScript, Next.js, Docker, Kubernetes, and AWS..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white leading-relaxed"
          />

          <div className="mt-2.5 flex justify-end">
            <button
              onClick={handleAnalyze}
              disabled={!jobText.trim()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 active:scale-95 disabled:opacity-50 transition"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              Analyze Match & Scan Keywords
            </button>
          </div>
        </div>

        {/* Analysis Results */}
        {analyzed && (
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
            {/* Match Score */}
            <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3.5 dark:bg-slate-850">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                ATS Keyword Match Rate
              </span>
              <div className="flex items-baseline gap-1">
                <span
                  className={`text-xl font-black ${
                    matchScore >= 75
                      ? "text-emerald-600 dark:text-emerald-400"
                      : matchScore >= 50
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-rose-600 dark:text-rose-400"
                  }`}
                >
                  {matchScore}%
                </span>
                <span className="text-xs text-slate-400">Match</span>
              </div>
            </div>

            {/* Missing Keywords */}
            {missingKeywords.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 mb-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>Missing Keywords ({missingKeywords.length}) — Click to Add:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {missingKeywords.map((kw, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddMissingKeyword(kw)}
                      className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100 transition dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300"
                    >
                      <Plus className="h-3 w-3" />
                      <span>{kw}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Matched Keywords */}
            {matchedKeywords.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Found in Your Resume ({matchedKeywords.length}):</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {matchedKeywords.map((kw, idx) => (
                    <span
                      key={idx}
                      className="rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                    >
                      ✓ {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
