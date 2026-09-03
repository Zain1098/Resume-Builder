"use client";

import { ResumeData } from "@/types/resume";
import { formatDate } from "./utils";

export function exportResumeToDocx(
  resume: ResumeData,
  fileName: string = "Resume.doc"
): boolean {
  try {
    const { personalInfo, experiences, educations, skillCategories, projects, certifications, customSections } = resume;

    // Word-compliant HTML with Office XML namespaces for seamless Word / ATS import
    const docContent = `
<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset="utf-8">
  <title>${personalInfo.fullName || "Resume"}</title>
  <!--[if gte mso 9]>
  <xml>
    <w:WordDocument>
      <w:View>Print</w:View>
      <w:Zoom>100</w:Zoom>
      <w:DoNotOptimizeForBrowser/>
    </w:WordDocument>
  </xml>
  <![endif]-->
  <style>
    @page {
      size: 8.5in 11.0in;
      margin: 0.75in 0.75in 0.75in 0.75in;
      mso-header-margin: 0.5in;
      mso-footer-margin: 0.5in;
    }
    body {
      font-family: 'Calibri', 'Arial', sans-serif;
      font-size: 11pt;
      line-height: 1.25;
      color: #111827;
      margin: 0;
      padding: 0;
    }
    h1 {
      font-size: 20pt;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 2pt;
      color: #0f172a;
    }
    .subtitle {
      font-size: 12pt;
      font-weight: bold;
      color: #374151;
      margin-bottom: 4pt;
    }
    .contact {
      font-size: 9.5pt;
      color: #4b5563;
      margin-bottom: 12pt;
      padding-bottom: 6pt;
      border-bottom: 1.5pt solid #0f172a;
    }
    h2 {
      font-size: 11.5pt;
      font-weight: bold;
      text-transform: uppercase;
      color: #0f172a;
      border-bottom: 1pt solid #cbd5e1;
      padding-bottom: 2pt;
      margin-top: 10pt;
      margin-bottom: 4pt;
    }
    .item-title {
      font-size: 10.5pt;
      font-weight: bold;
      color: #111827;
    }
    .item-meta {
      font-size: 9.5pt;
      color: #4b5563;
      font-style: italic;
      margin-bottom: 2pt;
    }
    ul {
      margin-top: 2pt;
      margin-bottom: 6pt;
      padding-left: 18pt;
    }
    li {
      font-size: 10pt;
      line-height: 1.25;
      margin-bottom: 2pt;
      color: #1f2937;
    }
    .skills-line {
      font-size: 10pt;
      margin-bottom: 3pt;
    }
    .skills-label {
      font-weight: bold;
      color: #111827;
    }
  </style>
</head>
<body>

  <!-- Header -->
  <div style="text-align: center;">
    <h1>${personalInfo.fullName || "Your Full Name"}</h1>
    ${personalInfo.jobTitle ? `<div class="subtitle">${personalInfo.jobTitle}</div>` : ""}
    <div class="contact">
      ${[
        personalInfo.location,
        personalInfo.phone,
        personalInfo.email,
        personalInfo.linkedin,
        personalInfo.website,
        personalInfo.github
      ].filter(Boolean).join("  •  ")}
    </div>
  </div>

  <!-- Professional Summary -->
  ${personalInfo.summary ? `
    <h2>Professional Summary</h2>
    <p style="font-size: 10pt; line-height: 1.35; margin-top: 2pt; margin-bottom: 8pt; text-align: justify;">
      ${personalInfo.summary}
    </p>
  ` : ""}

  <!-- Experience -->
  ${experiences.length > 0 ? `
    <h2>Professional Experience</h2>
    ${experiences.map(exp => `
      <div style="margin-bottom: 6pt;">
        <table style="width: 100%; border: none; margin: 0; padding: 0;">
          <tr>
            <td class="item-title" style="text-align: left;">${exp.position} — <span style="font-weight: normal;">${exp.company}</span></td>
            <td style="text-align: right; font-size: 9.5pt; color: #4b5563;">${formatDate(exp.startDate)} – ${exp.current ? "Present" : formatDate(exp.endDate)}</td>
          </tr>
        </table>
        ${exp.location ? `<div class="item-meta">${exp.location}</div>` : ""}
        <ul>
          ${exp.bulletPoints.map(bp => `<li>${bp}</li>`).join("")}
        </ul>
      </div>
    `).join("")}
  ` : ""}

  <!-- Education -->
  ${educations.length > 0 ? `
    <h2>Education</h2>
    ${educations.map(edu => `
      <div style="margin-bottom: 4pt;">
        <table style="width: 100%; border: none; margin: 0; padding: 0;">
          <tr>
            <td class="item-title" style="text-align: left;">${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}</td>
            <td style="text-align: right; font-size: 9.5pt; color: #4b5563;">${formatDate(edu.startDate)} – ${edu.endDate ? formatDate(edu.endDate) : "Present"}</td>
          </tr>
        </table>
        <div class="item-meta">${edu.institution}${edu.gpaOrHonors ? `  •  ${edu.gpaOrHonors}` : ""}</div>
        ${edu.description ? `<p style="font-size: 9.5pt; margin: 2pt 0;">${edu.description}</p>` : ""}
      </div>
    `).join("")}
  ` : ""}

  <!-- Skills -->
  ${skillCategories.length > 0 ? `
    <h2>Skills & Competencies</h2>
    ${skillCategories.map(cat => `
      <div class="skills-line">
        <span class="skills-label">${cat.name}: </span>
        <span>${cat.skills.join(", ")}</span>
      </div>
    `).join("")}
  ` : ""}

  <!-- Projects -->
  ${projects.length > 0 ? `
    <h2>Projects</h2>
    ${projects.map(p => `
      <div style="margin-bottom: 4pt;">
        <span class="item-title">${p.name}</span>
        ${p.technologies?.length ? `<span style="font-size: 9pt; color: #4b5563;"> (${p.technologies.join(", ")})</span>` : ""}
        <p style="font-size: 9.5pt; margin: 2pt 0;">${p.description}</p>
      </div>
    `).join("")}
  ` : ""}

  <!-- Certifications -->
  ${certifications.length > 0 ? `
    <h2>Certifications</h2>
    ${certifications.map(c => `
      <div style="font-size: 10pt; margin-bottom: 2pt;">
        <strong>${c.name}</strong> — ${c.issuer} ${c.date ? `(${formatDate(c.date)})` : ""}
      </div>
    `).join("")}
  ` : ""}

  <!-- Custom Sections -->
  ${customSections?.map(sec => `
    <h2>${sec.heading}</h2>
    ${sec.items.map(it => `
      <div style="margin-bottom: 3pt; font-size: 10pt;">
        <strong>${it.title}</strong> ${it.subtitle ? `<em>(${it.subtitle})</em>` : ""}
        ${it.description ? `<div style="font-size: 9.5pt; margin-top: 1pt;">${it.description}</div>` : ""}
      </div>
    `).join("")}
  `).join("") || ""}

</body>
</html>
    `;

    const blob = new Blob(["\ufeff", docContent], {
      type: "application/msword",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName.endsWith(".doc") || fileName.endsWith(".docx") ? fileName : `${fileName}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch (err) {
    console.error("DOCX Export Error:", err);
    return false;
  }
}
