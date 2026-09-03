"use client";

import React from "react";
import { ResumeData } from "@/types/resume";
import { formatDate } from "@/lib/utils";

interface TemplateProps {
  data: ResumeData;
}

export function ExecutiveTemplate({ data }: TemplateProps) {
  const { personalInfo, experiences, educations, skillCategories, projects, certifications, customSections, styling } = data;
  const accentColor = styling.primaryColor || "#1e293b";

  const fontClass =
    styling.fontFamily === "serif"
      ? "font-serif"
      : styling.fontFamily === "poppins"
      ? "font-sans font-medium"
      : styling.fontFamily === "mono"
      ? "font-mono"
      : "font-sans";

  return (
    <div className={`w-full bg-white text-slate-900 ${fontClass} p-8 sm:p-12 leading-relaxed`} style={{ minHeight: "1050px" }}>
      {/* Executive Header */}
      <header className="border-b-2 pb-5" style={{ borderColor: accentColor }}>
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase" style={{ color: accentColor }}>
              {personalInfo.fullName || "Executive Name"}
            </h1>
            <p className="text-sm font-semibold tracking-wider uppercase text-slate-600 mt-1">
              {personalInfo.jobTitle || "Executive Leader / Director"}
            </p>
          </div>
          <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-1 text-xs text-slate-600">
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.email && <span className="font-medium">{personalInfo.email}</span>}
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="underline">
                LinkedIn Profile
              </a>
            )}
          </div>
        </div>

        {/* Executive Summary */}
        {personalInfo.summary && (
          <div className="mt-4 pt-3 border-t border-slate-200">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-1">
              Executive Profile
            </h2>
            <p className="text-xs sm:text-[13px] text-slate-800 leading-relaxed text-justify">
              {personalInfo.summary}
            </p>
          </div>
        )}
      </header>

      {/* Core Competencies Grid */}
      {skillCategories.length > 0 && (
        <section className="mt-5 bg-slate-50 p-4 rounded-lg border border-slate-200/80">
          <h2 className="text-xs font-bold uppercase tracking-wider mb-2 text-slate-800" style={{ color: accentColor }}>
            Core Strategic & Technical Competencies
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {skillCategories.flatMap((cat) => cat.skills).map((skill, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-slate-700">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                <span className="font-medium">{skill}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Professional Leadership Experience */}
      {experiences.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b-2" style={{ borderColor: accentColor, color: accentColor }}>
            Executive Leadership & Professional Experience
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="text-xs">
                <div className="flex items-baseline justify-between">
                  <span className="font-bold text-slate-900 text-sm">{exp.position}</span>
                  <span className="text-[11px] font-medium text-slate-500">
                    {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <div className="flex items-center justify-between font-semibold text-slate-700 text-xs mb-1.5">
                  <span>{exp.company}</span>
                  {exp.location && <span className="font-normal text-slate-500">{exp.location}</span>}
                </div>
                <ul className="space-y-1.5 text-slate-800 list-disc pl-5 text-xs">
                  {exp.bulletPoints.map((bp, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {bp}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Strategic Projects & Initiatives */}
      {projects.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b-2" style={{ borderColor: accentColor, color: accentColor }}>
            Key Strategic Programs & Initiatives
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {projects.map((p) => (
              <div key={p.id} className="p-3 rounded-lg border border-slate-200 bg-white">
                <div className="font-bold text-slate-900">{p.name}</div>
                <p className="text-slate-700 text-xs mt-1 leading-snug">{p.description}</p>
                {p.technologies && (
                  <div className="mt-2 text-[10px] text-slate-500 font-semibold">
                    Stack / Governance: {p.technologies.join(", ")}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Credentials */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200">
        {educations.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accentColor }}>
              Education
            </h2>
            {educations.map((edu) => (
              <div key={edu.id} className="text-xs mb-2">
                <div className="font-bold text-slate-900">{edu.degree}</div>
                <div className="text-slate-700">{edu.institution}</div>
                <div className="text-[11px] text-slate-500">
                  {formatDate(edu.startDate)} – {edu.endDate ? formatDate(edu.endDate) : "Present"}
                </div>
                {edu.gpaOrHonors && <div className="text-[11px] italic text-slate-600">{edu.gpaOrHonors}</div>}
              </div>
            ))}
          </div>
        )}

        {certifications.length > 0 && (
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: accentColor }}>
              Executive Credentials & Licenses
            </h2>
            {certifications.map((c) => (
              <div key={c.id} className="text-xs mb-1.5">
                <div className="font-bold text-slate-900">{c.name}</div>
                <div className="text-slate-600 text-[11px]">{c.issuer} {c.date ? `(${formatDate(c.date)})` : ""}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Sections */}
      {customSections && customSections.length > 0 && (
        <div className="space-y-3 mt-4 pt-3 border-t border-slate-200">
          {customSections.map((sec) => (
            <div key={sec.id}>
              <h2 className="text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: accentColor }}>
                {sec.heading}
              </h2>
              <div className="space-y-1 text-xs">
                {sec.items.map((it) => (
                  <div key={it.id}>
                    <span className="font-bold text-slate-900">{it.title}</span>
                    {it.subtitle && <span className="text-slate-600 ml-1">({it.subtitle})</span>}
                    {it.description && <p className="text-slate-700 mt-0.5">{it.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
