"use client";

import { ResumeData } from "@/types/resume";
import { formatDate } from "./utils";

/**
 * Generates a clean, selectable-text, single-column ATS-friendly PDF using jsPDF.
 */
async function generateVectorPdfFromData(
  resume: ResumeData,
  fileName: string
): Promise<boolean> {
  const { jsPDF } = await import("jspdf");
  const isLetter = resume.styling?.paperSize === "letter";
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: isLetter ? "letter" : "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const ensureSpace = (neededMm: number) => {
    if (y + neededMm > pageHeight - margin) {
      pdf.addPage();
      y = margin;
    }
  };

  const addWrappedText = (
    text: string,
    x: number,
    maxWidth: number,
    fontSize: number,
    style: "normal" | "bold" | "italic" = "normal",
    color: [number, number, number] = [30, 41, 59],
    lineHeightFactor = 1.35
  ) => {
    if (!text.trim()) return;
    pdf.setFont("helvetica", style);
    pdf.setFontSize(fontSize);
    pdf.setTextColor(color[0], color[1], color[2]);
    const lines = pdf.splitTextToSize(text, maxWidth) as string[];
    const lineH = (fontSize * 0.352778) * lineHeightFactor;
    for (const line of lines) {
      ensureSpace(lineH + 1);
      pdf.text(line, x, y);
      y += lineH;
    }
  };

  const addSectionHeading = (title: string) => {
    ensureSpace(10);
    y += 3;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10.5);
    pdf.setTextColor(15, 23, 42);
    pdf.text(title.toUpperCase(), margin, y);
    y += 1.5;
    pdf.setDrawColor(203, 213, 225);
    pdf.setLineWidth(0.3);
    pdf.line(margin, y, pageWidth - margin, y);
    y += 4;
  };

  const isVis = (key: string) => resume.sectionVisibility?.[key] !== false;
  const { personalInfo } = resume;

  // Header
  if (isVis("personal")) {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.setTextColor(15, 23, 42);
    pdf.text(personalInfo.fullName || "Resume", margin, y);
    y += 6.5;

    if (personalInfo.jobTitle) {
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      pdf.setTextColor(51, 65, 85);
      pdf.text(personalInfo.jobTitle, margin, y);
      y += 5;
    }

    const contactParts = [
      personalInfo.location,
      personalInfo.phone,
      personalInfo.email,
      personalInfo.linkedin,
      personalInfo.github,
      personalInfo.website,
    ].filter(Boolean);

    if (contactParts.length > 0) {
      addWrappedText(
        contactParts.join("  •  "),
        margin,
        contentWidth,
        8.5,
        "normal",
        [71, 85, 105]
      );
      y += 2;
    }
  }

  // Summary
  if (isVis("summary") && personalInfo.summary) {
    addSectionHeading("Professional Summary");
    addWrappedText(personalInfo.summary, margin, contentWidth, 9.5, "normal", [30, 41, 59]);
  }

  // Experience
  if (isVis("experience") && resume.experiences.length > 0) {
    addSectionHeading("Professional Experience");
    for (const exp of resume.experiences) {
      ensureSpace(14);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.setTextColor(15, 23, 42);
      const titleLine = `${exp.position || "Role"} — ${exp.company || "Company"}`;
      const dateStr = `${formatDate(exp.startDate)} – ${exp.current ? "Present" : formatDate(exp.endDate)}`;
      pdf.text(titleLine, margin, y);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.setTextColor(71, 85, 105);
      pdf.text(dateStr, pageWidth - margin, y, { align: "right" });
      y += 4.2;

      if (exp.location) {
        pdf.setFont("helvetica", "italic");
        pdf.setFontSize(8.5);
        pdf.text(exp.location, margin, y);
        y += 3.8;
      }

      for (const bp of exp.bulletPoints) {
        if (!bp.trim()) continue;
        addWrappedText(`•  ${bp}`, margin + 2, contentWidth - 2, 9.2, "normal", [30, 41, 59]);
      }
      y += 2;
    }
  }

  // Education
  if (isVis("education") && resume.educations.length > 0) {
    addSectionHeading("Education");
    for (const edu of resume.educations) {
      ensureSpace(10);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.setTextColor(15, 23, 42);
      const degLine = `${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}`;
      const dateStr = `${formatDate(edu.startDate)} – ${edu.endDate ? formatDate(edu.endDate) : "Present"}`;
      pdf.text(degLine, margin, y);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.setTextColor(71, 85, 105);
      pdf.text(dateStr, pageWidth - margin, y, { align: "right" });
      y += 4.2;

      const instLine = `${edu.institution}${edu.gpaOrHonors ? `  •  ${edu.gpaOrHonors}` : ""}`;
      addWrappedText(instLine, margin, contentWidth, 9, "italic", [71, 85, 105]);
      if (edu.description) {
        addWrappedText(edu.description, margin, contentWidth, 8.8, "normal", [51, 65, 85]);
      }
      y += 1.5;
    }
  }

  // Skills
  if (isVis("skills") && resume.skillCategories.length > 0) {
    const nonEmpty = resume.skillCategories.filter((c) => c.skills.length > 0);
    if (nonEmpty.length > 0) {
      addSectionHeading("Skills & Competencies");
      for (const cat of nonEmpty) {
        addWrappedText(
          `${cat.name}: ${cat.skills.join(", ")}`,
          margin,
          contentWidth,
          9.2,
          "normal",
          [30, 41, 59]
        );
      }
    }
  }

  // Projects
  if (isVis("projects") && resume.projects.length > 0) {
    addSectionHeading("Projects");
    for (const proj of resume.projects) {
      ensureSpace(10);
      const header = proj.technologies?.length
        ? `${proj.name} (${proj.technologies.join(", ")})`
        : proj.name;
      addWrappedText(header, margin, contentWidth, 9.8, "bold", [15, 23, 42]);
      if (proj.description) {
        addWrappedText(proj.description, margin, contentWidth, 9, "normal", [30, 41, 59]);
      }
      y += 1.5;
    }
  }

  // Certifications
  if (isVis("certifications") && resume.certifications.length > 0) {
    addSectionHeading("Certifications");
    for (const cert of resume.certifications) {
      addWrappedText(
        `${cert.name}${cert.issuer ? ` — ${cert.issuer}` : ""}${cert.date ? ` (${formatDate(cert.date)})` : ""}`,
        margin,
        contentWidth,
        9.2,
        "normal",
        [30, 41, 59]
      );
    }
  }

  // Languages
  if (isVis("languages") && resume.languages && resume.languages.length > 0) {
    addSectionHeading("Languages");
    addWrappedText(
      resume.languages.map((l) => `${l.language} (${l.proficiency})`).join("  •  "),
      margin,
      contentWidth,
      9.2,
      "normal",
      [30, 41, 59]
    );
  }

  // Awards
  if (isVis("awards") && resume.awards && resume.awards.length > 0) {
    addSectionHeading("Honors & Awards");
    for (const award of resume.awards) {
      addWrappedText(
        `${award.title}${award.issuer ? ` — ${award.issuer}` : ""}${award.date ? ` (${formatDate(award.date)})` : ""}`,
        margin,
        contentWidth,
        9.2,
        "normal",
        [30, 41, 59]
      );
    }
  }

  pdf.save(fileName);
  return true;
}

export async function exportResumeToPdf(
  elementId: string = "resume-print-canvas",
  fileName: string = "Resume.pdf",
  mode: "vector" | "canvas" = "vector",
  resumeData?: ResumeData
): Promise<boolean> {
  // Vector mode: generate real selectable-text PDF directly via jsPDF (no blocking window.print)
  if (mode === "vector" && resumeData) {
    try {
      return await generateVectorPdfFromData(resumeData, fileName);
    } catch (err) {
      console.error("Vector PDF generation failed, falling back to canvas:", err);
    }
  }

  try {
    const target = document.getElementById(elementId);
    if (!target) {
      if (resumeData) {
        return await generateVectorPdfFromData(resumeData, fileName);
      }
      return false;
    }

    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");

    const originalTransform = target.style.transform;
    target.style.transform = "none";

    const canvas = await html2canvas(target, {
      scale: 2.5,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: 1000,
    });

    target.style.transform = originalTransform;

    const imgData = canvas.toDataURL("image/jpeg", 0.98);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = 210;
    const pdfHeight = 297;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgHeight, undefined, "FAST");
    heightLeft -= pdfHeight;

    while (heightLeft > 5) {
      position = position - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgHeight, undefined, "FAST");
      heightLeft -= pdfHeight;
    }

    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error("Canvas PDF export failed:", error);
    return false;
  }
}
