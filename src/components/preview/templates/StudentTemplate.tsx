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
  const isVis = (key: string) => data.sectionVisibility?.[key] !== false;

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
      {isVis("personal") && (
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

          {isVis("summary") && personalInfo.summary && (
            <p className="mt-3 text-xs text-slate-700 leading-relaxed max-w-2xl mx-auto text-center">
              {personalInfo.summary}
            </p>
          )}
        </header>
      )}

      {/* 1. EDUCATION (At the top for students/graduates) */}
      {isVis("education") && educations.length > 0 && (
        <section className="mt-5">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b"
            style={{ color: accentColor, borderColor: `${accentColor}40` }}
          >
            Education &amp; Academic Credentials
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
      {isVis("skills") && skillCategories.length > 0 && (
        <section className="mt-5">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b"
            style={{ color: accentColor, borderColor: `${accentColor}40` }}
          >
            Technical Stack &amp; Core Skills
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
      {isVis("projects") && projects.length > 0 && (
        <section className="mt-5">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b"
            style={{ color: accentColor, borderColor: `${accentColor}40` }}
          >
            Software &amp; Academic Projects
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
      {isVis("experience") && experiences.length > 0 && (
        <section className="mt-5">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b"
            style={{ color: accentColor, borderColor: `${accentColor}40` }}
          >
            Internship &amp; Work Experience
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
      {isVis("certifications") && certifications.length > 0 && (
        <section className="mt-5">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b"
            style={{ color: accentColor, borderColor: `${accentColor}40` }}
          >
            Certifications &amp; Online Credentials
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

      {/* 6. LANGUAGES & AWARDS */}
      {((isVis("languages") && data.languages && data.languages.length > 0) ||
        (isVis("awards") && data.awards && data.awards.length > 0)) && (
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {isVis("languages") && data.languages && data.languages.length > 0 && (
            <div>
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b"
                style={{ color: accentColor, borderColor: `${accentColor}40` }}
              >
                Languages
              </h2>
              <div className="space-y-1 text-xs">
                {data.languages.map((l) => (
                  <div key={l.id} className="flex justify-between">
                    <span className="font-semibold text-slate-800">{l.language}</span>
                    <span className="text-slate-500 text-[11px]">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isVis("awards") && data.awards && data.awards.length > 0 && (
            <div>
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b"
                style={{ color: accentColor, borderColor: `${accentColor}40` }}
              >
                Academic Honors &amp; Scholarships
              </h2>
              <div className="space-y-1 text-xs">
                {data.awards.map((a) => (
                  <div key={a.id}>
                    <div className="font-bold text-slate-900">{a.title}</div>
                    {a.issuer && <div className="text-slate-500 text-[11px]">{a.issuer}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 7. VOLUNTEERING & STUDENT LEADERSHIP */}
      {isVis("volunteer") && data.volunteer && data.volunteer.length > 0 && (
        <section className="mt-5">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b"
            style={{ color: accentColor, borderColor: `${accentColor}40` }}
          >
            Campus Leadership &amp; Community Service
          </h2>
          <div className="space-y-2 text-xs">
            {data.volunteer.map((v) => (
              <div key={v.id}>
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{v.role} — <span className="font-semibold text-slate-700">{v.organization}</span></span>
                  <span className="font-normal text-slate-500 text-[11px]">
                    {v.startDate ? formatDate(v.startDate) : ""} {v.endDate ? `– ${formatDate(v.endDate)}` : v.current ? "– Present" : ""}
                  </span>
                </div>
                {v.description && <p className="text-slate-700 text-xs mt-0.5">{v.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. RESEARCH & PUBLICATIONS */}
      {isVis("publications") && data.publications && data.publications.length > 0 && (
        <section className="mt-5">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b"
            style={{ color: accentColor, borderColor: `${accentColor}40` }}
          >
            Research Papers &amp; Academic Publications
          </h2>
          <div className="space-y-2 text-xs">
            {data.publications.map((p) => (
              <div key={p.id}>
                <span className="font-bold text-slate-900">{p.title}</span> — <span className="italic">{p.publisher}</span> {p.date ? `(${formatDate(p.date)})` : ""}
                {p.description && <p className="text-slate-700 text-xs mt-0.5">{p.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 9. CUSTOM SECTIONS */}
      {isVis("custom") && customSections && customSections.length > 0 && (
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
