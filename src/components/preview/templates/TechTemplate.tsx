"use client";

import React from "react";
import { ResumeData } from "@/types/resume";
import { Terminal, Code, Cpu, Link as LinkIcon, GitBranch, Briefcase, GraduationCap, Globe, Award, Heart, BookOpen } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface TemplateProps {
  data: ResumeData;
}

export function TechTemplate({ data }: TemplateProps) {
  const { personalInfo, experiences, educations, skillCategories, projects, certifications, customSections, styling } = data;
  const accentColor = styling.primaryColor || "#4f46e5";
  const isVis = (key: string) => data.sectionVisibility?.[key] !== false;

  return (
    <div className="w-full bg-white text-slate-800 font-sans p-8 sm:p-10 leading-relaxed" style={{ minHeight: "1050px" }}>
      {/* Dev Header */}
      {isVis("personal") && (
        <header className="rounded-xl bg-slate-900 p-6 text-white shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono mb-1">
                <Terminal className="h-4 w-4" />
                <span>~/resume/profile.ts</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {personalInfo.fullName || "Developer Name"}
              </h1>
              <p className="text-sm font-semibold text-slate-300 mt-0.5">
                {personalInfo.jobTitle || "Software Engineer"}
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-1 text-xs text-slate-300 font-mono">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
              {personalInfo.location && <span>{personalInfo.location}</span>}
              {personalInfo.github && (
                <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-indigo-300 hover:underline">
                  github: {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}
                </a>
              )}
              {personalInfo.website && (
                <a href={personalInfo.website} target="_blank" rel="noreferrer" className="text-indigo-300 hover:underline">
                  {personalInfo.website.replace(/^https?:\/\//, "")}
                </a>
              )}
            </div>
          </div>

          {isVis("summary") && personalInfo.summary && (
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-300 leading-relaxed">
              {personalInfo.summary}
            </div>
          )}
        </header>
      )}

      {/* Skills Bar */}
      {isVis("skills") && skillCategories.length > 0 && (
        <section className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            <Cpu className="h-4 w-4 text-indigo-600" />
            <span>Technical Stack &amp; Tools</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {skillCategories.map((cat) => (
              <div key={cat.id} className="rounded-lg bg-white p-2.5 border border-slate-200/80">
                <span className="font-bold text-slate-900 text-[11px] block mb-1">
                  {cat.name}
                </span>
                <div className="flex flex-wrap gap-1">
                  {cat.skills.map((s, idx) => (
                    <span
                      key={idx}
                      className="rounded bg-indigo-50 px-1.5 py-0.5 text-[10px] font-mono font-medium text-indigo-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {isVis("experience") && experiences.length > 0 && (
        <section className="mt-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 pb-1 mb-3 border-b-2" style={{ borderColor: accentColor }}>
            <Briefcase className="h-4 w-4" style={{ color: accentColor }} />
            <span>Engineering Experience</span>
          </div>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id} className="text-xs">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-bold text-slate-900 text-[13px]">{exp.position}</span>
                    <span className="text-slate-600 font-semibold ml-2">@ {exp.company}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <ul className="mt-1.5 space-y-1 text-slate-700 list-disc pl-4 text-xs">
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

      {/* Projects */}
      {isVis("projects") && projects.length > 0 && (
        <section className="mt-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 pb-1 mb-3 border-b-2" style={{ borderColor: accentColor }}>
            <Code className="h-4 w-4" style={{ color: accentColor }} />
            <span>Featured Open Source &amp; Software Projects</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {projects.map((proj) => (
              <div key={proj.id} className="rounded-xl border border-slate-200 p-3.5 bg-white">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>{proj.name}</span>
                  <div className="flex items-center gap-2">
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-900">
                        <GitBranch className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-indigo-600 hover:text-indigo-800">
                        <LinkIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="mt-1 text-slate-600 text-[11px] leading-relaxed">
                  {proj.description}
                </p>
                {proj.technologies && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {proj.technologies.map((t, idx) => (
                      <span key={idx} className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-mono text-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Certs */}
      {((isVis("education") && educations.length > 0) || (isVis("certifications") && certifications.length > 0)) && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200">
          {isVis("education") && educations.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                <GraduationCap className="h-3.5 w-3.5" />
                <span>Education</span>
              </div>
              {educations.map((edu) => (
                <div key={edu.id} className="text-xs mb-2">
                  <div className="font-bold text-slate-900">{edu.degree}</div>
                  <div className="text-slate-600 text-[11px]">{edu.institution}</div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {formatDate(edu.startDate)} – {edu.endDate ? formatDate(edu.endDate) : "Present"}
                  </div>
                </div>
              ))}
            </div>
          )}

          {isVis("certifications") && certifications.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                <Award className="h-3.5 w-3.5" />
                <span>Certifications</span>
              </div>
              {certifications.map((c) => (
                <div key={c.id} className="text-xs mb-1.5">
                  <div className="font-bold text-slate-900">{c.name}</div>
                  <div className="text-slate-600 text-[11px]">{c.issuer}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Languages & Awards */}
      {((isVis("languages") && data.languages && data.languages.length > 0) ||
        (isVis("awards") && data.awards && data.awards.length > 0)) && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200">
          {isVis("languages") && data.languages && data.languages.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                <Globe className="h-3.5 w-3.5" />
                <span>Languages</span>
              </div>
              <div className="space-y-1 text-xs">
                {data.languages.map((l) => (
                  <div key={l.id} className="flex justify-between">
                    <span className="font-medium text-slate-900">{l.language}</span>
                    <span className="text-slate-500 font-mono text-[11px]">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isVis("awards") && data.awards && data.awards.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                <Award className="h-3.5 w-3.5" />
                <span>Honors &amp; Hackathons</span>
              </div>
              <div className="space-y-1.5 text-xs">
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

      {/* Volunteering & Community */}
      {isVis("volunteer") && data.volunteer && data.volunteer.length > 0 && (
        <section className="mt-6 pt-3 border-t border-slate-200">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
            <Heart className="h-3.5 w-3.5" />
            <span>Open Source Community &amp; Mentorship</span>
          </div>
          <div className="space-y-2.5 text-xs">
            {data.volunteer.map((v) => (
              <div key={v.id}>
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{v.role} <span className="font-normal text-slate-600">@ {v.organization}</span></span>
                  <span className="font-normal text-[11px] text-slate-500 font-mono">
                    {v.startDate ? formatDate(v.startDate) : ""} {v.endDate ? `– ${formatDate(v.endDate)}` : v.current ? "– Present" : ""}
                  </span>
                </div>
                {v.description && <p className="text-slate-600 text-xs mt-0.5">{v.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Publications & Whitepapers */}
      {isVis("publications") && data.publications && data.publications.length > 0 && (
        <section className="mt-6 pt-3 border-t border-slate-200">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
            <BookOpen className="h-3.5 w-3.5" />
            <span>Technical Papers &amp; Publications</span>
          </div>
          <div className="space-y-2 text-xs">
            {data.publications.map((p) => (
              <div key={p.id}>
                <span className="font-bold text-slate-900">{p.title}</span> — <span className="italic">{p.publisher}</span> {p.date ? `(${formatDate(p.date)})` : ""}
                {p.description && <p className="text-slate-600 text-xs mt-0.5">{p.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {isVis("custom") && customSections && customSections.length > 0 && (
        <div className="space-y-3 mt-4 pt-3 border-t border-slate-200">
          {customSections.map((sec) => (
            <div key={sec.id}>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {sec.heading}
              </div>
              <div className="space-y-1 text-xs">
                {sec.items.map((it) => (
                  <div key={it.id}>
                    <span className="font-semibold text-slate-900">{it.title}</span>
                    {it.subtitle && <span className="text-slate-500 text-[11px] ml-1">({it.subtitle})</span>}
                    {it.description && <p className="text-slate-600 text-[11px] mt-0.5">{it.description}</p>}
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
