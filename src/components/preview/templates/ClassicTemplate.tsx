"use client";

import React from "react";
import { ResumeData } from "@/types/resume";
import { formatDate } from "@/lib/utils";

interface TemplateProps {
  data: ResumeData;
}

export function ClassicTemplate({ data }: TemplateProps) {
  const { personalInfo, experiences, educations, skillCategories, projects, certifications, customSections, styling } = data;
  const accentColor = styling.primaryColor || "#0f172a";

  const fontClass =
    styling.fontFamily === "sans"
      ? "font-sans"
      : styling.fontFamily === "poppins"
      ? "font-sans font-medium"
      : styling.fontFamily === "mono"
      ? "font-mono"
      : "font-serif";

  return (
    <div className={`w-full bg-white text-slate-900 ${fontClass} p-8 sm:p-12 leading-relaxed`} style={{ minHeight: "1050px" }}>
      {/* Header Centered */}
      <header className="text-center pb-4 border-b border-slate-900">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-normal uppercase" style={{ color: accentColor }}>
          {personalInfo.fullName || "Your Full Name"}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-slate-700 mt-0.5">
            {personalInfo.jobTitle}
          </p>
        )}

        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-700">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.location && personalInfo.phone && <span>•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.phone && personalInfo.email && <span>•</span>}
          {personalInfo.email && (
            <a href={`mailto:${personalInfo.email}`} className="underline">
              {personalInfo.email}
            </a>
          )}
          {personalInfo.linkedin && (
            <>
              <span>•</span>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="underline">
                LinkedIn
              </a>
            </>
          )}
          {personalInfo.github && (
            <>
              <span>•</span>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="underline">
                GitHub
              </a>
            </>
          )}
          {personalInfo.website && (
            <>
              <span>•</span>
              <a href={personalInfo.website} target="_blank" rel="noreferrer" className="underline">
                Portfolio
              </a>
            </>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b border-slate-400">
            Professional Summary
          </h2>
          <p className="text-xs text-slate-800 leading-relaxed text-justify">
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Work Experience */}
      {experiences.length > 0 && (
        <section className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-2 border-b border-slate-400">
            Professional Experience
          </h2>
          <div className="space-y-3.5">
            {experiences.map((exp) => (
              <div key={exp.id} className="text-xs">
                <div className="flex items-baseline justify-between font-bold text-slate-900">
                  <span>{exp.position}</span>
                  <span className="font-normal text-[11px] text-slate-600">
                    {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <div className="flex items-baseline justify-between italic text-slate-700 text-[11px] mb-1">
                  <span>{exp.company}</span>
                  {exp.location && <span>{exp.location}</span>}
                </div>
                <ul className="space-y-1 text-slate-800 list-disc pl-5 text-xs">
                  {exp.bulletPoints.map((bp, idx) => (
                    <li key={idx} className="leading-snug">
                      {bp}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {educations.length > 0 && (
        <section className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-2 border-b border-slate-400">
            Education
          </h2>
          <div className="space-y-2">
            {educations.map((edu) => (
              <div key={edu.id} className="text-xs">
                <div className="flex items-baseline justify-between font-bold text-slate-900">
                  <span>{edu.institution}</span>
                  <span className="font-normal text-[11px] text-slate-600">
                    {formatDate(edu.startDate)} – {edu.endDate ? formatDate(edu.endDate) : "Present"}
                  </span>
                </div>
                <div className="flex items-baseline justify-between text-slate-700 text-[11px]">
                  <span>
                    {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ""}
                  </span>
                  {edu.gpaOrHonors && <span className="italic">{edu.gpaOrHonors}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Key Projects */}
      {projects.length > 0 && (
        <section className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-2 border-b border-slate-400">
            Projects & Research
          </h2>
          <div className="space-y-2.5">
            {projects.map((proj) => (
              <div key={proj.id} className="text-xs">
                <div className="flex items-baseline justify-between font-bold text-slate-900">
                  <span>
                    {proj.name}
                    {proj.technologies?.length > 0 && (
                      <span className="font-normal text-slate-600 text-[11px] ml-1.5">
                        | {proj.technologies.join(", ")}
                      </span>
                    )}
                  </span>
                  {proj.liveUrl && (
                    <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-[11px] underline">
                      Link
                    </a>
                  )}
                </div>
                <p className="text-slate-800 text-xs mt-0.5">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skillCategories.length > 0 && (
        <section className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b border-slate-400">
            Skills & Competencies
          </h2>
          <div className="space-y-1 text-xs">
            {skillCategories.map((cat) => (
              <div key={cat.id}>
                <span className="font-bold text-slate-900">{cat.name}: </span>
                <span className="text-slate-800">{cat.skills.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b border-slate-400">
            Certifications
          </h2>
          <div className="space-y-1 text-xs">
            {certifications.map((c) => (
              <div key={c.id} className="flex justify-between">
                <span>
                  <strong className="text-slate-900">{c.name}</strong> – {c.issuer}
                </span>
                {c.date && <span className="text-slate-600 text-[11px]">{formatDate(c.date)}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <section className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b border-slate-400">
            Languages
          </h2>
          <div className="space-y-1 text-xs">
            {data.languages.map((l) => (
              <div key={l.id} className="flex justify-between">
                <span className="font-bold text-slate-900">{l.language}</span>
                <span className="text-slate-700 text-[11px]">{l.proficiency}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Honors & Awards */}
      {data.awards && data.awards.length > 0 && (
        <section className="mt-4">
          <h2 className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b border-slate-400">
            Honors & Awards
          </h2>
          <div className="space-y-1.5 text-xs">
            {data.awards.map((a) => (
              <div key={a.id}>
                <span className="font-bold text-slate-900">{a.title}</span>
                {a.issuer && <span className="text-slate-700 text-[11px]"> — {a.issuer}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {customSections && customSections.length > 0 && (
        <div className="space-y-4 mt-4">
          {customSections.map((sec) => (
            <section key={sec.id}>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 border-b border-slate-400">
                {sec.heading}
              </h2>
              <div className="space-y-1.5 text-xs">
                {sec.items.map((it) => (
                  <div key={it.id}>
                    <span className="font-bold text-slate-900">{it.title}</span>
                    {it.subtitle && <span className="italic text-slate-700 ml-1">({it.subtitle})</span>}
                    {it.description && <p className="text-slate-800 mt-0.5">{it.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
