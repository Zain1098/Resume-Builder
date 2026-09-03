"use client";

import React from "react";
import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Award, Briefcase, GraduationCap, Sparkles, BookOpen, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/common/SocialIcons";
import { formatDate } from "@/lib/utils";

interface TemplateProps {
  data: ResumeData;
}

export function ModernTemplate({ data }: TemplateProps) {
  const { personalInfo, experiences, educations, skillCategories, projects, certifications, customSections, styling } = data;
  const accentColor = styling.primaryColor || "#2563eb";
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
    <div className={`w-full bg-white text-slate-800 ${fontClass} leading-relaxed p-8 sm:p-10`} style={{ minHeight: "1050px" }}>
      {/* Header Banner */}
      {isVis("personal") && (
        <header className="border-b-2 pb-5" style={{ borderColor: accentColor }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              {personalInfo.avatarUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={personalInfo.avatarUrl}
                  alt={personalInfo.fullName}
                  className="h-16 w-16 rounded-full object-cover border-2 shadow-sm shrink-0"
                  style={{ borderColor: accentColor }}
                />
              )}
              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900" style={{ color: accentColor }}>
                  {personalInfo.fullName || "Your Full Name"}
                </h1>
                <p className="text-sm sm:text-base font-semibold text-slate-600 mt-0.5">
                  {personalInfo.jobTitle || "Your Professional Title"}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Links Bar */}
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600">
            {personalInfo.email && (
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" style={{ color: accentColor }} />
                <a href={`mailto:${personalInfo.email}`} className="hover:underline">
                  {personalInfo.email}
                </a>
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" style={{ color: accentColor }} />
                <span>{personalInfo.phone}</span>
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" style={{ color: accentColor }} />
                <span>{personalInfo.location}</span>
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" style={{ color: accentColor }} />
                <a href={personalInfo.website} target="_blank" rel="noreferrer" className="hover:underline">
                  {personalInfo.website.replace(/^https?:\/\//, "")}
                </a>
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1.5">
                <LinkedinIcon className="h-3.5 w-3.5" style={{ color: accentColor }} />
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                  {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "in/")}
                </a>
              </span>
            )}
            {personalInfo.github && (
              <span className="flex items-center gap-1.5">
                <GithubIcon className="h-3.5 w-3.5" style={{ color: accentColor }} />
                <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:underline">
                  {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, "github/")}
                </a>
              </span>
            )}
          </div>

          {/* Summary */}
          {isVis("summary") && personalInfo.summary && (
            <p className="mt-3 text-xs sm:text-[13px] text-slate-700 leading-relaxed text-justify">
              {personalInfo.summary}
            </p>
          )}
        </header>
      )}

      {/* 2-Column Body Layout */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left / Main Column (7 cols): Experience & Projects */}
        <div className="md:col-span-8 space-y-6">
          {/* Work Experience */}
          {isVis("experience") && experiences.length > 0 && (
            <section>
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b flex items-center gap-1.5"
                style={{ color: accentColor, borderColor: `${accentColor}40` }}
              >
                <Briefcase className="h-3.5 w-3.5" />
                Work Experience
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="text-xs">
                    <div className="flex items-baseline justify-between">
                      <span className="font-bold text-slate-900 text-xs sm:text-[13px]">
                        {exp.position || "Position"}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500 shrink-0">
                        {formatDate(exp.startDate)} – {exp.current ? "Present" : formatDate(exp.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-600 font-medium text-[11px] mb-1.5">
                      <span>{exp.company}</span>
                      {exp.location && <span>{exp.location}</span>}
                    </div>
                    <ul className="space-y-1 text-slate-700 list-disc pl-4 text-xs">
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

          {/* Key Projects */}
          {isVis("projects") && projects.length > 0 && (
            <section>
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-3 border-b flex items-center gap-1.5"
                style={{ color: accentColor, borderColor: `${accentColor}40` }}
              >
                <Globe className="h-3.5 w-3.5" />
                Key Projects
              </h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs sm:text-[13px]">
                          {proj.name}
                        </span>
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] text-blue-600 hover:underline"
                          >
                            [Live Demo]
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="mt-0.5 text-slate-700 text-xs leading-relaxed">
                      {proj.description}
                    </p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {proj.technologies.map((t, idx) => (
                          <span
                            key={idx}
                            className="rounded bg-slate-100 px-1.5 py-0.2 text-[10px] font-medium text-slate-700"
                          >
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
        </div>

        {/* Right Sidebar Column (4 cols): Skills, Education, Certs, Languages, Awards, Volunteer, Publications */}
        <div className="md:col-span-4 space-y-6">
          {/* Skills */}
          {isVis("skills") && skillCategories.length > 0 && (
            <section>
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b flex items-center gap-1.5"
                style={{ color: accentColor, borderColor: `${accentColor}40` }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                Skills &amp; Stack
              </h2>
              <div className="space-y-2.5 text-xs">
                {skillCategories.map((cat) => (
                  <div key={cat.id}>
                    <span className="font-bold text-slate-800 text-[11px] block">
                      {cat.name}:
                    </span>
                    <p className="text-slate-600 text-xs mt-0.5 leading-snug">
                      {cat.skills.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {isVis("education") && educations.length > 0 && (
            <section>
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b flex items-center gap-1.5"
                style={{ color: accentColor, borderColor: `${accentColor}40` }}
              >
                <GraduationCap className="h-3.5 w-3.5" />
                Education
              </h2>
              <div className="space-y-3 text-xs">
                {educations.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-slate-900 text-xs">
                      {edu.degree}
                    </div>
                    <div className="text-slate-700 font-medium text-[11px]">
                      {edu.institution}
                    </div>
                    {edu.fieldOfStudy && (
                      <div className="text-slate-500 text-[11px]">
                        Major: {edu.fieldOfStudy}
                      </div>
                    )}
                    <div className="text-slate-400 text-[10px] mt-0.5">
                      {formatDate(edu.startDate)} – {edu.endDate ? formatDate(edu.endDate) : "Present"}
                    </div>
                    {edu.gpaOrHonors && (
                      <div className="text-slate-600 text-[10px] italic mt-0.5">
                        {edu.gpaOrHonors}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {isVis("certifications") && certifications.length > 0 && (
            <section>
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b flex items-center gap-1.5"
                style={{ color: accentColor, borderColor: `${accentColor}40` }}
              >
                <Award className="h-3.5 w-3.5" />
                Certifications
              </h2>
              <div className="space-y-2 text-xs">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <div className="font-bold text-slate-900 text-xs">
                      {cert.name}
                    </div>
                    <div className="text-slate-600 text-[11px]">
                      {cert.issuer} {cert.date ? `(${formatDate(cert.date)})` : ""}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {isVis("languages") && data.languages && data.languages.length > 0 && (
            <section>
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b flex items-center gap-1.5"
                style={{ color: accentColor, borderColor: `${accentColor}40` }}
              >
                <Globe className="h-3.5 w-3.5" />
                Languages
              </h2>
              <div className="space-y-1.5 text-xs">
                {data.languages.map((l) => (
                  <div key={l.id} className="flex justify-between">
                    <span className="font-semibold text-slate-800">{l.language}</span>
                    <span className="text-[11px] text-slate-500">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Honors & Awards */}
          {isVis("awards") && data.awards && data.awards.length > 0 && (
            <section>
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b flex items-center gap-1.5"
                style={{ color: accentColor, borderColor: `${accentColor}40` }}
              >
                <Award className="h-3.5 w-3.5" />
                Honors &amp; Awards
              </h2>
              <div className="space-y-1.5 text-xs">
                {data.awards.map((a) => (
                  <div key={a.id}>
                    <span className="font-bold text-slate-900">{a.title}</span>
                    {a.issuer && <span className="text-[11px] text-slate-600 block">by {a.issuer}</span>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Volunteering */}
          {isVis("volunteer") && data.volunteer && data.volunteer.length > 0 && (
            <section>
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b flex items-center gap-1.5"
                style={{ color: accentColor, borderColor: `${accentColor}40` }}
              >
                <Heart className="h-3.5 w-3.5" />
                Volunteering
              </h2>
              <div className="space-y-2 text-xs">
                {data.volunteer.map((v) => (
                  <div key={v.id}>
                    <div className="font-bold text-slate-900 text-xs">{v.role}</div>
                    <div className="text-slate-600 text-[11px]">{v.organization}</div>
                    {v.description && <p className="text-slate-600 text-xs mt-0.5">{v.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Publications */}
          {isVis("publications") && data.publications && data.publications.length > 0 && (
            <section>
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b flex items-center gap-1.5"
                style={{ color: accentColor, borderColor: `${accentColor}40` }}
              >
                <BookOpen className="h-3.5 w-3.5" />
                Publications &amp; Research
              </h2>
              <div className="space-y-2 text-xs">
                {data.publications.map((p) => (
                  <div key={p.id}>
                    <div className="font-bold text-slate-900 text-xs">{p.title}</div>
                    <div className="text-slate-600 text-[11px]">
                      <em>{p.publisher}</em> {p.date ? `(${formatDate(p.date)})` : ""}
                    </div>
                    {p.description && <p className="text-slate-600 text-xs mt-0.5">{p.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Custom Sections */}
          {isVis("custom") && customSections && customSections.length > 0 && customSections.map((sec) => (
            <section key={sec.id}>
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 mb-2.5 border-b"
                style={{ color: accentColor, borderColor: `${accentColor}40` }}
              >
                {sec.heading}
              </h2>
              <div className="space-y-2 text-xs">
                {sec.items.map((it) => (
                  <div key={it.id}>
                    <span className="font-bold text-slate-900">{it.title}</span>
                    {it.subtitle && <span className="text-slate-500 text-[11px] ml-1">({it.subtitle})</span>}
                    {it.description && <p className="text-slate-600 text-xs mt-0.5">{it.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
