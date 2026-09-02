"use client";

import React, { useMemo } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Sparkles, TrendingUp } from "lucide-react";

export function AtsScoreCard() {
  const { resume } = useResumeStore();

  const { score, suggestions } = useMemo(() => {
    let currentScore = 0;
    const checkList: { label: string; passed: boolean }[] = [];
    const suggestionList: string[] = [];

    // 1. Full name & job title (15 pts)
    const hasNameAndTitle =
      Boolean(resume.personalInfo.fullName?.trim()) &&
      Boolean(resume.personalInfo.jobTitle?.trim());
    if (hasNameAndTitle) {
      currentScore += 15;
      checkList.push({ label: "Name & Target Job Title", passed: true });
    } else {
      checkList.push({ label: "Name & Target Job Title", passed: false });
      suggestionList.push("Add your Full Name and professional Job Title.");
    }

    // 2. Contact details (15 pts)
    const hasContact =
      Boolean(resume.personalInfo.email?.trim()) &&
      Boolean(resume.personalInfo.phone?.trim()) &&
      Boolean(resume.personalInfo.location?.trim());
    if (hasContact) {
      currentScore += 15;
      checkList.push({ label: "Email, Phone & Location", passed: true });
    } else {
      checkList.push({ label: "Email, Phone & Location", passed: false });
      suggestionList.push("Complete your contact information (Email, Phone, Location).");
    }

    // 3. Links (10 pts)
    const hasLinks =
      Boolean(resume.personalInfo.linkedin?.trim()) ||
      Boolean(resume.personalInfo.github?.trim()) ||
      Boolean(resume.personalInfo.website?.trim());
    if (hasLinks) {
      currentScore += 10;
      checkList.push({ label: "Professional Links (LinkedIn / GitHub)", passed: true });
    } else {
      checkList.push({ label: "Professional Links", passed: false });
      suggestionList.push("Add your LinkedIn or Portfolio URL.");
    }

    // 4. Professional Summary (15 pts)
    const summaryWords =
      resume.personalInfo.summary?.trim().split(/\s+/).filter(Boolean).length || 0;
    if (summaryWords >= 20) {
      currentScore += 15;
      checkList.push({ label: "Impactful Summary (>20 words)", passed: true });
    } else {
      checkList.push({ label: "Impactful Summary", passed: false });
      suggestionList.push("Expand your Professional Summary with achievements and tech keywords.");
    }

    // 5. Work Experience (20 pts)
    const validExperiences = resume.experiences.filter(
      (e) => e.company?.trim() && e.position?.trim()
    );
    const hasBullets = validExperiences.some(
      (e) => e.bulletPoints.filter((b) => b.trim().length > 10).length >= 2
    );

    if (validExperiences.length >= 1 && hasBullets) {
      currentScore += 20;
      checkList.push({ label: "Work Experience with Bullet Points", passed: true });
    } else {
      checkList.push({ label: "Work Experience with Bullet Points", passed: false });
      suggestionList.push("Add at least 1 work experience with 2+ descriptive bullet points.");
    }

    // 6. Skills (15 pts)
    const totalSkills = resume.skillCategories.reduce(
      (acc, cat) => acc + cat.skills.length,
      0
    );
    if (totalSkills >= 5) {
      currentScore += 15;
      checkList.push({ label: "5+ Categorized Skills", passed: true });
    } else {
      checkList.push({ label: "5+ Categorized Skills", passed: false });
      suggestionList.push("Add at least 5 relevant skills and industry tools.");
    }

    // 7. Education or Certifications (10 pts)
    const hasEducation = resume.educations.some(
      (e) => e.institution?.trim() && e.degree?.trim()
    );
    const hasCert = resume.certifications.some((c) => c.name?.trim());
    if (hasEducation || hasCert) {
      currentScore += 10;
      checkList.push({ label: "Education / Certifications", passed: true });
    } else {
      checkList.push({ label: "Education / Certifications", passed: false });
      suggestionList.push("Include your highest education degree or certifications.");
    }

    return { score: currentScore, suggestions: suggestionList };
  }, [resume]);

  const scoreColor =
    score >= 80
      ? "text-emerald-600 dark:text-emerald-400"
      : score >= 50
      ? "text-amber-600 dark:text-amber-400"
      : "text-rose-600 dark:text-rose-400";

  const progressBg =
    score >= 80
      ? "bg-emerald-500"
      : score >= 50
      ? "bg-amber-500"
      : "bg-rose-500";

  return (
    <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:to-slate-900/60">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
            <TrendingUp className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              ATS Optimization Score
            </h4>
          </div>
        </div>
        <div className="flex items-baseline gap-1">
          <span className={`text-xl font-black ${scoreColor}`}>{score}</span>
          <span className="text-xs font-semibold text-slate-400">/ 100</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className={`h-full transition-all duration-500 ease-out ${progressBg}`}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Suggestions if any */}
      {suggestions.length > 0 && (
        <div className="mt-3 rounded-lg bg-amber-50/70 p-2.5 dark:bg-amber-950/30">
          <div className="flex items-center gap-1.5 text-xs font-medium text-amber-800 dark:text-amber-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Recommended Improvements:</span>
          </div>
          <ul className="mt-1 space-y-1 text-xs text-amber-700 dark:text-amber-400/90 pl-5 list-disc">
            {suggestions.slice(0, 2).map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
