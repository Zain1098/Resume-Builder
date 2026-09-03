"use client";

import React from "react";
import { ResumeData } from "@/types/resume";
import { formatDate } from "@/lib/utils";

interface TemplateProps {
  data: ResumeData;
}

export function StudentTemplate({ data }: TemplateProps) {
  const { personalInfo, experiences, educations, skillCategories, projects, certifications, customSections, styling } = data;
  const accentColor = styling.primaryColor || "#0284c7";

  const fontClass =
    styling.fontFamily === "serif"
      ? "font-serif"
      : styling.fontFamily === "poppins"
      ? "font-sans font-medium"
      : styling.fontFamily === "mono"
      ? "font-mono"
      : "font-sans";

  return (
    <div className={`w-full bg-white text-slate-900 ${fontClass} p-8 sm:p-10 leading-relaxed`} style={{ minHeight: "1050px" }}>
      {/* Header */}
      <header className="text-center pb-4 border-b-2" style={{ borderColor: accentColor }}>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          {personalInfo.fullName || "Student / Graduate Name"}
        </h1>
        <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">
          {personalInfo.jobTitle || "Computer Science Graduate / Junior Software Engineer"}
        </p>

        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-600">
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.location && personalInfo.phone && <span>•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.phone && personalInfo.email && <span>•</span>}
          {personalInfo.email && <span className="font-medium">{personalInfo.email}</span>}
          {personalInfo.github && (
            <>
              <span>•</span>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="underline text-blue-600">
                GitHub
              </a>
            </>
          )}
          {personalInfo.linkedin && (
            <>
              <span>•</span>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="underline text-blue-600">
                LinkedIn
              </a>
            </>
          )}
        </div>

        {personalInfo.summary && (
          <p className="mt-3 text-xs text-slate-700 leading-relaxed max-w-2xl mx-auto text-center">
            {personalInfo.summary}
          </p>
        )}
      </header>

      {/* 1. EDUCATION (At the top for students/graduates) */}
      {educations.length > 0 && (
        <section className="mt-5">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b"
            style={{ color: accentColor, borderColor: `${accentColor}40` }}
          >
            Education & Academic Credentials
          </h2>
          <div className="space-y-3">
            {educations.map((edu) => (
              <div key={edu.id} className="text-xs">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{edu.institution}</span>
                  <span className="font-normal text-slate-500 text-[11px]">
                    {formatDate(edu.startDate)} – {edu.endDate ? formatDate(edu.endDate) : "Expected"}
                  </span>
                </div>
                <div className="flex justify-between text-slate-700 font-medium">
                  <span>
                    {edu.degree} in {edu.fieldOfStudy}
                  </span>
                  {edu.gpaOrHonors && (
                    <span className="font-semibold text-slate-900">{edu.gpaOrHonors}</span>
                  )}
                </div>
                {edu.description && (
                  <p className="text-slate-600 text-[11px] mt-0.5">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2. TECHNICAL SKILLS */}
      {skillCategories.length > 0 && (
        <section className="mt-5">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b"
            style={{ color: accentColor, borderColor: `${accentColor}40` }}
          >
            Technical Stack & Core Skills
          </h2>
          <div className="space-y-1.5 text-xs">
            {skillCategories.map((cat) => (
              <div key={cat.id}>
                <span className="font-bold text-slate-900">{cat.name}: </span>
                <span className="text-slate-700">{cat.skills.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. ACADEMIC & FEATURED PROJECTS */}
      {projects.length > 0 && (
        <section className="mt-5">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b"
            style={{ color: accentColor, borderColor: `${accentColor}40` }}
          >
            Software & Academic Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="text-xs">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-bold text-slate-900 text-xs sm:text-[13px]">
                      {proj.name}
                    </span>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <span className="text-[11px] text-slate-600 ml-2">
                        | {proj.technologies.join(", ")}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2 text-[11px]">
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                        Code
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-slate-700 mt-1 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. WORK & INTERNSHIP EXPERIENCE */}
      {experiences.length > 0 && (
        <section className="mt-5">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b"
            style={{ color: accentColor, borderColor: `${accentColor}40` }}
          >
            Internship & Work Experience
          </h2>
          <div className="space-y-3.5">
            {experiences.map((exp) => (
              <div key={exp.id} className="text-xs">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>
                    {exp.position} — <span className="font-semibold text-slate-700">{exp.company}</span>
                  </span>
                  <span className="font-normal text-slate-500 text-[11px]">
                    {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <ul className="mt-1 space-y-1 text-slate-700 list-disc pl-4 text-xs">
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

      {/* 5. CERTIFICATIONS & HONORS */}
      {certifications.length > 0 && (
        <section className="mt-5">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b"
            style={{ color: accentColor, borderColor: `${accentColor}40` }}
          >
            Certifications & Online Credentials
          </h2>
          <div className="space-y-1 text-xs">
            {certifications.map((c) => (
              <div key={c.id} className="flex justify-between">
                <span>
                  <strong className="text-slate-900">{c.name}</strong> • {c.issuer}
                </span>
                {c.date && <span className="text-slate-500 text-[11px]">{formatDate(c.date)}</span>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. CUSTOM / AWARDS */}
      {customSections && customSections.length > 0 && (
        <div className="space-y-3 mt-4">
          {customSections.map((sec) => (
            <section key={sec.id}>
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b"
                style={{ color: accentColor, borderColor: `${accentColor}40` }}
              >
                {sec.heading}
              </h2>
              <div className="space-y-1.5 text-xs">
                {sec.items.map((it) => (
                  <div key={it.id}>
                    <span className="font-bold text-slate-900">{it.title}</span>
                    {it.subtitle && <span className="text-slate-600 ml-1">({it.subtitle})</span>}
                    {it.description && <p className="text-slate-700 mt-0.5">{it.description}</p>}
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
