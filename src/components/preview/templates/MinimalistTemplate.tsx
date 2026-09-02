"use client";

import React from "react";
import { ResumeData } from "@/types/resume";
import { formatDate } from "@/lib/utils";

interface TemplateProps {
  data: ResumeData;
}

export function MinimalistTemplate({ data }: TemplateProps) {
  const { personalInfo, experiences, educations, skillCategories, projects, certifications, styling } = data;
  const accentColor = styling.primaryColor || "#0f172a";

  const fontClass =
    styling.fontFamily === "serif"
      ? "font-serif"
      : styling.fontFamily === "poppins"
      ? "font-sans font-medium"
      : styling.fontFamily === "mono"
      ? "font-mono"
      : "font-sans";

  return (
    <div className={`w-full bg-white text-slate-800 ${fontClass} p-8 sm:p-12 leading-relaxed`} style={{ minHeight: "1050px" }}>
      {/* Header */}
      <header className="pb-6 border-b border-slate-100">
        <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-slate-900">
          {personalInfo.fullName.split(" ")[0]}{" "}
          <span className="font-bold" style={{ color: accentColor }}>
            {personalInfo.fullName.split(" ").slice(1).join(" ")}
          </span>
        </h1>
        <p className="text-sm font-medium tracking-wide uppercase text-slate-500 mt-1">
          {personalInfo.jobTitle}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && (
            <a href={personalInfo.website} target="_blank" rel="noreferrer" className="text-slate-900 underline">
              {personalInfo.website.replace(/^https?:\/\//, "")}
            </a>
          )}
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-slate-900 underline">
              LinkedIn
            </a>
          )}
        </div>

        {personalInfo.summary && (
          <p className="mt-4 text-xs sm:text-[13px] text-slate-600 leading-relaxed max-w-3xl">
            {personalInfo.summary}
          </p>
        )}
      </header>

      {/* Experience Section */}
      {experiences.length > 0 && (
        <section className="mt-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
            Experience
          </h2>
          <div className="space-y-5">
            {experiences.map((exp) => (
              <div key={exp.id} className="text-xs">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-900 text-[13px]">
                      {exp.position}
                    </span>
                    <span className="text-slate-500 ml-2 font-medium">
                      / {exp.company}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <ul className="mt-2 space-y-1 text-slate-700 list-disc pl-4 text-xs">
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

      {/* Education & Skills Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
        {educations.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
              Education
            </h2>
            <div className="space-y-3 text-xs">
              {educations.map((edu) => (
                <div key={edu.id}>
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-slate-600">{edu.institution}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {formatDate(edu.startDate)} – {edu.endDate ? formatDate(edu.endDate) : "Present"}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {skillCategories.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
              Expertise
            </h2>
            <div className="space-y-2 text-xs">
              {skillCategories.map((cat) => (
                <div key={cat.id}>
                  <span className="font-semibold text-slate-900 block text-[11px]">
                    {cat.name}
                  </span>
                  <span className="text-slate-600 text-xs">{cat.skills.join(", ")}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mt-6 pt-4 border-t border-slate-100">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
            Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {projects.map((p) => (
              <div key={p.id} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <div className="font-bold text-slate-900">{p.name}</div>
                <p className="text-slate-600 text-[11px] mt-1">{p.description}</p>
                {p.technologies && (
                  <div className="mt-2 text-[10px] text-slate-500 font-mono">
                    {p.technologies.join(" • ")}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mt-6 pt-4 border-t border-slate-100">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
            Certifications
          </h2>
          <div className="space-y-2 text-xs">
            {certifications.map((c) => (
              <div key={c.id} className="flex justify-between">
                <span className="font-medium text-slate-800">{c.name} ({c.issuer})</span>
                {c.date && <span className="text-slate-400 font-mono text-[11px]">{formatDate(c.date)}</span>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
