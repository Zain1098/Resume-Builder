/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ResumeData,
  PersonalInfo,
  Experience,
  Education,
  SkillCategory,
  Project,
  Certification,
} from "@/types/resume";

const DEFAULT_STYLING: ResumeData["styling"] = {
  template: "modern",
  primaryColor: "#154539",
  fontFamily: "sans",
  fontSize: "normal",
  lineSpacing: "normal",
  sectionSpacing: "normal",
  paperSize: "a4",
  showPhoto: false,
};

const DEFAULT_VISIBILITY: ResumeData["sectionVisibility"] = {
  personal: true,
  summary: true,
  experience: true,
  skills: true,
  education: true,
  projects: true,
  certifications: true,
  languages: true,
  volunteer: false,
  publications: false,
  awards: false,
  custom: true,
};

// Known technical keywords to categorize parsed skills
const LANGUAGE_KEYWORDS = new Set([
  "javascript", "typescript", "python", "java", "c++", "c#", "c", "go", "golang",
  "rust", "ruby", "php", "swift", "kotlin", "scala", "sql", "r", "html", "html5",
  "css", "css3", "sass", "bash", "shell", "powershell"
]);

const FRAMEWORK_KEYWORDS = new Set([
  "react", "react.js", "next.js", "nextjs", "vue", "vue.js", "angular", "node.js",
  "nodejs", "express", "express.js", "django", "flask", "fastapi", "spring", "spring boot",
  "asp.net", "laravel", "rails", "tailwind", "tailwind css", "bootstrap", "redux",
  "graphql", "rest", "rest api", "restful apis"
]);

const INFRA_KEYWORDS = new Set([
  "aws", "amazon web services", "docker", "kubernetes", "k8s", "gcp", "google cloud",
  "azure", "ci/cd", "github actions", "gitlab ci", "jenkins", "terraform", "ansible",
  "linux", "nginx", "prometheus", "grafana", "git", "microservices"
]);

const DATABASE_KEYWORDS = new Set([
  "postgresql", "postgres", "mongodb", "mysql", "redis", "elasticsearch",
  "sqlite", "cassandra", "dynamodb", "firebase", "supabase", "oracle", "snowflake", "bigquery"
]);

/**
 * Normalizes any uploaded JSON object into a valid, crash-proof ResumeData
 */
export function normalizeJsonResume(raw: any): ResumeData {
  if (!raw || typeof raw !== "object") {
    throw new Error("Invalid input: Expected a JSON object.");
  }

  // 1. Detect if it's already a native Resumist schema
  if (raw.personalInfo || raw.experiences || raw.educations) {
    const personalInfo: PersonalInfo = {
      fullName: String(raw.personalInfo?.fullName || "Candidate Name"),
      jobTitle: String(raw.personalInfo?.jobTitle || "Professional"),
      email: String(raw.personalInfo?.email || ""),
      phone: String(raw.personalInfo?.phone || ""),
      location: String(raw.personalInfo?.location || ""),
      website: String(raw.personalInfo?.website || ""),
      linkedin: String(raw.personalInfo?.linkedin || ""),
      github: String(raw.personalInfo?.github || ""),
      avatarUrl: String(raw.personalInfo?.avatarUrl || ""),
      summary: String(raw.personalInfo?.summary || ""),
    };

    const experiences: Experience[] = Array.isArray(raw.experiences)
      ? raw.experiences.map((exp: any, i: number) => ({
          id: exp.id || `exp-${Date.now()}-${i}`,
          company: String(exp.company || ""),
          position: String(exp.position || ""),
          location: String(exp.location || ""),
          startDate: String(exp.startDate || ""),
          endDate: String(exp.endDate || ""),
          current: Boolean(exp.current),
          bulletPoints: Array.isArray(exp.bulletPoints)
            ? exp.bulletPoints.map(String).filter((b: string) => b.trim().length > 0)
            : [""],
        }))
      : [];

    const educations: Education[] = Array.isArray(raw.educations)
      ? raw.educations.map((edu: any, i: number) => ({
          id: edu.id || `edu-${Date.now()}-${i}`,
          institution: String(edu.institution || ""),
          degree: String(edu.degree || ""),
          fieldOfStudy: String(edu.fieldOfStudy || ""),
          startDate: String(edu.startDate || ""),
          endDate: String(edu.endDate || ""),
          current: Boolean(edu.current),
          gpaOrHonors: String(edu.gpaOrHonors || ""),
          description: String(edu.description || ""),
        }))
      : [];

    const skillCategories: SkillCategory[] = Array.isArray(raw.skillCategories)
      ? raw.skillCategories.map((cat: any, i: number) => ({
          id: cat.id || `cat-${Date.now()}-${i}`,
          name: String(cat.name || "Skills"),
          skills: Array.isArray(cat.skills)
            ? cat.skills.map(String).filter((s: string) => s.trim().length > 0)
            : [],
        }))
      : [];

    const projects: Project[] = Array.isArray(raw.projects)
      ? raw.projects.map((proj: any, i: number) => {
          const desc = String(
            proj.description ||
              (Array.isArray(proj.bulletPoints) ? proj.bulletPoints.join("\n") : "")
          );
          return {
            id: proj.id || `proj-${Date.now()}-${i}`,
            name: String(proj.name || ""),
            description: desc,
            technologies: Array.isArray(proj.technologies) ? proj.technologies.map(String) : [],
            liveUrl: String(proj.liveUrl || proj.url || ""),
            githubUrl: String(proj.githubUrl || ""),
          };
        })
      : [];

    const certifications: Certification[] = Array.isArray(raw.certifications)
      ? raw.certifications.map((cert: any, i: number) => ({
          id: cert.id || `cert-${Date.now()}-${i}`,
          name: String(cert.name || ""),
          issuer: String(cert.issuer || ""),
          date: String(cert.date || ""),
          url: String(cert.url || ""),
        }))
      : [];

    return {
      personalInfo,
      experiences: experiences.length > 0 ? experiences : [],
      educations: educations.length > 0 ? educations : [],
      skillCategories: skillCategories.length > 0 ? skillCategories : [],
      projects,
      certifications,
      languages: Array.isArray(raw.languages) ? raw.languages : [],
      volunteer: Array.isArray(raw.volunteer) ? raw.volunteer : [],
      publications: Array.isArray(raw.publications) ? raw.publications : [],
      awards: Array.isArray(raw.awards) ? raw.awards : [],
      customSections: Array.isArray(raw.customSections) ? raw.customSections : [],
      styling: { ...DEFAULT_STYLING, ...(raw.styling || {}) },
      sectionVisibility: { ...DEFAULT_VISIBILITY, ...(raw.sectionVisibility || {}) },
      sectionOrder: Array.isArray(raw.sectionOrder) ? raw.sectionOrder : undefined,
    };
  }

  // 2. Standard JSON Resume standard schema (basics, work, education, skills, projects)
  if (raw.basics) {
    const b = raw.basics;
    const profiles = Array.isArray(b.profiles) ? b.profiles : [];
    const linkedinProfile = profiles.find((p: any) =>
      String(p.network || p.url).toLowerCase().includes("linkedin")
    );
    const githubProfile = profiles.find((p: any) =>
      String(p.network || p.url).toLowerCase().includes("github")
    );

    const personalInfo: PersonalInfo = {
      fullName: b.name || "Candidate Name",
      jobTitle: b.label || "Professional",
      email: b.email || "",
      phone: b.phone || "",
      location: b.location?.city
        ? `${b.location.city}${b.location.region ? `, ${b.location.region}` : ""}`
        : "",
      website: b.url || "",
      linkedin: linkedinProfile?.url || "",
      github: githubProfile?.url || "",
      avatarUrl: b.image || "",
      summary: b.summary || "",
    };

    const experiences: Experience[] = Array.isArray(raw.work)
      ? raw.work.map((w: any, i: number) => ({
          id: `exp-${Date.now()}-${i}`,
          company: w.company || w.name || "",
          position: w.position || "",
          location: w.location || "",
          startDate: w.startDate || "",
          endDate: w.endDate || (w.current ? "Present" : ""),
          current: Boolean(w.current || !w.endDate),
          bulletPoints: Array.isArray(w.highlights) && w.highlights.length > 0
            ? w.highlights.map(String)
            : w.summary ? [String(w.summary)] : [""],
        }))
      : [];

    const educations: Education[] = Array.isArray(raw.education)
      ? raw.education.map((e: any, i: number) => ({
          id: `edu-${Date.now()}-${i}`,
          institution: e.institution || "",
          degree: e.studyType || e.degree || "",
          fieldOfStudy: e.area || "",
          startDate: e.startDate || "",
          endDate: e.endDate || "",
          current: Boolean(!e.endDate),
          gpaOrHonors: e.score || "",
          description: Array.isArray(e.courses) ? `Courses: ${e.courses.join(", ")}` : "",
        }))
      : [];

    const skillCategories: SkillCategory[] = [];
    if (Array.isArray(raw.skills)) {
      raw.skills.forEach((sk: any, i: number) => {
        const keywords = Array.isArray(sk.keywords) ? sk.keywords.map(String) : [];
        if (sk.name && keywords.length === 0) {
          keywords.push(sk.name);
        }
        if (keywords.length > 0) {
          skillCategories.push({
            id: `cat-${Date.now()}-${i}`,
            name: sk.name || "Technical Skills",
            skills: keywords,
          });
        }
      });
    }

    const projects: Project[] = Array.isArray(raw.projects)
      ? raw.projects.map((p: any, i: number) => {
          const desc = String(
            p.description ||
              (Array.isArray(p.highlights) ? p.highlights.join("\n") : "")
          );
          return {
            id: `proj-${Date.now()}-${i}`,
            name: p.name || "",
            description: desc,
            technologies: Array.isArray(p.keywords) ? p.keywords.map(String) : [],
            liveUrl: p.url || "",
          };
        })
      : [];

    return {
      personalInfo,
      experiences,
      educations,
      skillCategories: skillCategories.length > 0 ? skillCategories : [
        { id: `cat-${Date.now()}`, name: "Core Skills", skills: [] },
      ],
      projects,
      certifications: [],
      languages: [],
      volunteer: [],
      publications: [],
      awards: [],
      customSections: [],
      styling: DEFAULT_STYLING,
      sectionVisibility: DEFAULT_VISIBILITY,
    };
  }

  throw new Error(
    "Unrecognized resume JSON format. Please check the JSON format or paste as text."
  );
}

/**
 * Intelligent NLP & heuristic resume parser from raw text (extracted from PDF or copied from doc)
 */
export function parseResumeFromText(rawText: string): ResumeData {
  if (!rawText || rawText.trim().length === 0) {
    throw new Error("No resume text was provided for extraction.");
  }

  // Normalize line endings and whitespace
  const cleanText = rawText.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = cleanText
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  // 1. Extract Contact Information
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;
  const phoneRegex = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?|(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/;
  const linkedinRegex = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([A-Za-z0-9_-]+)/i;
  const githubRegex = /(?:https?:\/\/)?(?:www\.)?github\.com\/([A-Za-z0-9_-]+)/i;
  const urlRegex = /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.(?:com|org|io|dev|app|me|net|co))\b/i;

  let email = "";
  let phone = "";
  let linkedin = "";
  let github = "";
  let website = "";
  let location = "";

  const emailMatch = cleanText.match(emailRegex);
  if (emailMatch) email = emailMatch[0];

  const phoneMatch = cleanText.match(phoneRegex);
  if (phoneMatch && phoneMatch[0].length >= 7) phone = phoneMatch[0];

  const linkedinMatch = cleanText.match(linkedinRegex);
  if (linkedinMatch) linkedin = linkedinMatch[0].startsWith("http") ? linkedinMatch[0] : `https://${linkedinMatch[0]}`;

  const githubMatch = cleanText.match(githubRegex);
  if (githubMatch) github = githubMatch[0].startsWith("http") ? githubMatch[0] : `https://${githubMatch[0]}`;

  // Find website (excluding linkedin and github)
  const allUrls = cleanText.match(new RegExp(urlRegex, "g")) || [];
  for (const u of allUrls) {
    if (!u.includes("linkedin") && !u.includes("github") && !u.includes("gmail") && !u.includes("yahoo")) {
      website = u.startsWith("http") ? u : `https://${u}`;
      break;
    }
  }

  // Name extraction (first line of resume that is not contact information or a section title)
  let fullName = "Candidate Name";
  let jobTitle = "Professional";
  let nameLineIndex = 0;

  for (let i = 0; i < Math.min(lines.length, 5); i++) {
    const line = lines[i];
    if (
      line.length > 2 &&
      line.length < 45 &&
      !emailRegex.test(line) &&
      !phoneRegex.test(line) &&
      !line.includes("@") &&
      !line.toLowerCase().includes("resume") &&
      !line.toLowerCase().includes("curriculum vitae") &&
      !line.toLowerCase().startsWith("http")
    ) {
      fullName = line.replace(/[|,•*].*$/, "").trim();
      nameLineIndex = i;
      break;
    }
  }

  // Candidate title is often right after the name
  if (nameLineIndex + 1 < lines.length) {
    const nextLine = lines[nameLineIndex + 1];
    if (
      nextLine.length > 3 &&
      nextLine.length < 65 &&
      !emailRegex.test(nextLine) &&
      !phoneRegex.test(nextLine) &&
      !nextLine.includes("@") &&
      !nextLine.startsWith("http")
    ) {
      jobTitle = nextLine.replace(/[|,•*].*$/, "").trim();
    }
  }

  // Location heuristics (look for City, State / Country in top lines)
  const locationRegex = /\b([A-Z][a-zA-Z\s.-]+),\s*([A-Z]{2}|[A-Za-z\s]+)\b/;
  for (let i = 0; i < Math.min(lines.length, 8); i++) {
    const match = lines[i].match(locationRegex);
    if (match && !lines[i].includes("@") && !lines[i].toLowerCase().includes("university")) {
      location = match[0].trim();
      break;
    }
  }

  // 2. Identify Sections by Canonical Keywords
  type SectionType =
    | "summary"
    | "experience"
    | "education"
    | "skills"
    | "projects"
    | "certifications"
    | "other";

  interface SectionMarker {
    type: SectionType;
    startIndex: number;
    title: string;
  }

  const sectionPatterns: { type: SectionType; regex: RegExp }[] = [
    { type: "summary", regex: /^(?:summary|professional summary|executive summary|about me|about|profile|career objective|objective)$/i },
    { type: "experience", regex: /^(?:experience|work experience|professional experience|employment history|work history|career history)$/i },
    { type: "education", regex: /^(?:education|academic background|academic qualifications|degrees)$/i },
    { type: "skills", regex: /^(?:skills|technical skills|technologies|tools & technologies|core competencies|competencies|expertise|proficiencies)$/i },
    { type: "projects", regex: /^(?:projects|personal projects|technical projects|key projects|selected projects)$/i },
    { type: "certifications", regex: /^(?:certifications|certificates|licenses|credentials|awards)$/i },
  ];

  const markers: SectionMarker[] = [];

  lines.forEach((line, idx) => {
    // Strip numbering like "1. Experience" or colons
    const cleanHeader = line.replace(/^\d+[\.\)]\s*/, "").replace(/[:\-—]+$/, "").trim();
    for (const pattern of sectionPatterns) {
      if (pattern.regex.test(cleanHeader)) {
        markers.push({ type: pattern.type, startIndex: idx, title: cleanHeader });
        break;
      }
    }
  });

  // Sort markers by position
  markers.sort((a, b) => a.startIndex - b.startIndex);

  // Helper to slice lines for a section
  function getSectionLines(type: SectionType): string[] {
    const markerIdx = markers.findIndex((m) => m.type === type);
    if (markerIdx === -1) return [];
    const start = markers[markerIdx].startIndex + 1;
    const end = markerIdx + 1 < markers.length ? markers[markerIdx + 1].startIndex : lines.length;
    return lines.slice(start, end);
  }

  // 3. Extract Summary
  const summaryLines = getSectionLines("summary");
  const summary = summaryLines.join(" ").slice(0, 1000);

  // 4. Extract Experience
  const expLines = getSectionLines("experience");
  const experiences: Experience[] = [];
  const dateRegex = /\b((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4}|\d{1,2}\/\d{4}|\d{4})\s*(?:-|–|—|to)\s*((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4}|\d{1,2}\/\d{4}|\d{4}|Present|Current)\b/i;

  let currentExp: Partial<Experience> | null = null;
  let currentBullets: string[] = [];

  function commitCurrentExp() {
    if (currentExp && (currentExp.company || currentExp.position)) {
      experiences.push({
        id: `exp-${Date.now()}-${experiences.length}`,
        company: currentExp.company || "Enterprise Company",
        position: currentExp.position || "Professional Role",
        location: currentExp.location || "",
        startDate: currentExp.startDate || "",
        endDate: currentExp.endDate || "Present",
        current: Boolean(currentExp.current),
        bulletPoints: currentBullets.length > 0 ? currentBullets : ["Executed core technical initiatives and delivered measurable business outcomes."],
      });
    }
    currentExp = null;
    currentBullets = [];
  }

  for (let i = 0; i < expLines.length; i++) {
    const line = expLines[i];
    const dateMatch = line.match(dateRegex);

    if (dateMatch) {
      commitCurrentExp();
      const dateStr = dateMatch[0];
      const parts = dateStr.split(/\s*(?:-|–|—|to)\s*/i);
      const start = parts[0]?.trim() || "";
      const end = parts[1]?.trim() || "Present";
      const isCurrent = /present|current/i.test(end);

      // Line before date or line of date often contains Title or Company
      const remainder = line.replace(dateRegex, "").replace(/[|,•]/g, "").trim();
      const pos = remainder;
      let comp = "";

      if (i > 0 && !expLines[i - 1].startsWith("•") && !expLines[i - 1].startsWith("-")) {
        comp = expLines[i - 1];
      }

      currentExp = {
        position: pos || "Role",
        company: comp || "Company",
        startDate: start,
        endDate: end,
        current: isCurrent,
      };
    } else if (line.startsWith("•") || line.startsWith("-") || line.startsWith("*") || line.startsWith("▪") || /^\d+\.\s/.test(line)) {
      const cleanBullet = line.replace(/^[•\-\*▪\d\.\s]+/, "").trim();
      if (cleanBullet.length > 5) {
        currentBullets.push(cleanBullet);
      }
    } else if (currentExp) {
      // If we already have an active experience, treat text line as company/location details or bullet
      if (!currentExp.company || currentExp.company === "Company") {
        currentExp.company = line;
      } else if (line.length > 25) {
        currentBullets.push(line);
      }
    } else {
      // Start an experience block even without strict date format
      if (line.length > 3 && line.length < 60) {
        currentExp = {
          position: line,
          company: "",
          startDate: "2021",
          endDate: "Present",
          current: true,
        };
      }
    }
  }
  commitCurrentExp();

  // 5. Extract Education
  const eduLines = getSectionLines("education");
  const educations: Education[] = [];
  const degreeKeywords = ["bachelor", "master", "phd", "doctor", "b.s", "m.s", "b.a", "m.a", "associate", "degree", "diploma"];

  let currentEdu: Partial<Education> | null = null;

  for (let i = 0; i < eduLines.length; i++) {
    const line = eduLines[i];
    const isInst = /university|college|institute|academy|school/i.test(line);
    const hasDegree = degreeKeywords.some((d) => line.toLowerCase().includes(d));
    const yearMatch = line.match(/\b(19\d\d|20\d\d)\b/);

    if (isInst || hasDegree) {
      if (currentEdu && currentEdu.institution) {
        educations.push({
          id: `edu-${Date.now()}-${educations.length}`,
          institution: currentEdu.institution,
          degree: currentEdu.degree || "Bachelor's Degree",
          fieldOfStudy: currentEdu.fieldOfStudy || "",
          startDate: currentEdu.startDate || "",
          endDate: currentEdu.endDate || "",
          current: false,
          gpaOrHonors: currentEdu.gpaOrHonors || "",
          description: "",
        });
      }

      currentEdu = {
        institution: isInst ? line : "University / Institution",
        degree: hasDegree ? line : "Degree",
        endDate: yearMatch ? yearMatch[0] : "",
      };
    } else if (currentEdu) {
      if (yearMatch && !currentEdu.endDate) {
        currentEdu.endDate = yearMatch[0];
      } else if (line.toLowerCase().includes("gpa")) {
        currentEdu.gpaOrHonors = line;
      } else if (!currentEdu.fieldOfStudy) {
        currentEdu.fieldOfStudy = line;
      }
    }
  }
  if (currentEdu && currentEdu.institution) {
    educations.push({
      id: `edu-${Date.now()}-${educations.length}`,
      institution: currentEdu.institution,
      degree: currentEdu.degree || "Degree",
      fieldOfStudy: currentEdu.fieldOfStudy || "",
      startDate: currentEdu.startDate || "",
      endDate: currentEdu.endDate || "",
      current: false,
      gpaOrHonors: currentEdu.gpaOrHonors || "",
      description: "",
    });
  }

  // 6. Extract Skills & Categorize
  const skillLines = getSectionLines("skills");
  const extractedRawSkills: string[] = [];

  skillLines.forEach((line) => {
    // Split on commas, bullets, pipes, or slashes
    const tokens = line
      .replace(/^[^:]+:\s*/, "") // remove "Languages: "
      .split(/[,|•*;\/]/)
      .map((t) => t.trim())
      .filter((t) => t.length > 1 && t.length < 35);
    extractedRawSkills.push(...tokens);
  });

  // Categorize skills intelligently
  const languages: string[] = [];
  const frameworks: string[] = [];
  const infrastructure: string[] = [];
  const databases: string[] = [];
  const otherSkills: string[] = [];

  const dedupeSkills = Array.from(new Set(extractedRawSkills));

  dedupeSkills.forEach((sk) => {
    const low = sk.toLowerCase();
    if (LANGUAGE_KEYWORDS.has(low)) {
      languages.push(sk);
    } else if (FRAMEWORK_KEYWORDS.has(low)) {
      frameworks.push(sk);
    } else if (INFRA_KEYWORDS.has(low)) {
      infrastructure.push(sk);
    } else if (DATABASE_KEYWORDS.has(low)) {
      databases.push(sk);
    } else {
      otherSkills.push(sk);
    }
  });

  const skillCategories: SkillCategory[] = [];

  if (languages.length > 0) {
    skillCategories.push({
      id: `cat-languages`,
      name: "Programming Languages",
      skills: languages,
    });
  }
  if (frameworks.length > 0) {
    skillCategories.push({
      id: `cat-frameworks`,
      name: "Frameworks & Libraries",
      skills: frameworks,
    });
  }
  if (infrastructure.length > 0 || databases.length > 0) {
    skillCategories.push({
      id: `cat-infrastructure`,
      name: "Cloud, DevOps & Databases",
      skills: [...infrastructure, ...databases],
    });
  }
  if (otherSkills.length > 0 || skillCategories.length === 0) {
    skillCategories.push({
      id: `cat-competencies`,
      name: "Core Competencies",
      skills: otherSkills.length > 0 ? otherSkills.slice(0, 15) : ["Problem Solving", "System Architecture", "Agile Execution"],
    });
  }

  // 7. Extract Projects (if any)
  const projLines = getSectionLines("projects");
  const projects: Project[] = [];
  if (projLines.length > 0) {
    let currName = "";
    let currDesc = "";
    const currBullets: string[] = [];

    const commitProj = () => {
      if (!currName) return;
      const combinedDesc = [currDesc, ...currBullets].filter(Boolean).join("\n");
      projects.push({
        id: `proj-${Date.now()}-${projects.length}`,
        name: currName,
        description: combinedDesc,
        technologies: [],
      });
      currName = "";
      currDesc = "";
      currBullets.length = 0;
    };

    projLines.forEach((l) => {
      if (l.length < 40 && !l.startsWith("•") && !l.startsWith("-")) {
        commitProj();
        currName = l;
      } else if (l.startsWith("•") || l.startsWith("-")) {
        currBullets.push(l.replace(/^[•\-]\s*/, ""));
      } else {
        currDesc = currDesc ? `${currDesc} ${l}` : l;
      }
    });
    commitProj();
  }

  // 8. Extract Certifications (if any)
  const certLines = getSectionLines("certifications");
  const certifications: Certification[] = [];
  certLines.forEach((l, i) => {
    if (l.length > 3 && l.length < 70) {
      certifications.push({
        id: `cert-${Date.now()}-${i}`,
        name: l.replace(/^[•\-]\s*/, ""),
        issuer: "Accredited Provider",
        date: "2023",
      });
    }
  });

  return {
    personalInfo: {
      fullName,
      jobTitle,
      email,
      phone,
      location,
      website,
      linkedin,
      github,
      avatarUrl: "",
      summary,
    },
    experiences: experiences.length > 0 ? experiences : [
      {
        id: `exp-${Date.now()}`,
        company: "Previous Enterprise",
        position: jobTitle || "Software Engineer",
        location: location || "Remote",
        startDate: "2021",
        endDate: "Present",
        current: true,
        bulletPoints: ["Spearheaded core technical initiatives, optimizing system latency and team throughput."],
      }
    ],
    educations: educations.length > 0 ? educations : [
      {
        id: `edu-${Date.now()}`,
        institution: "University / College",
        degree: "Bachelor of Science",
        fieldOfStudy: "Computer Science or Related Field",
        startDate: "2017",
        endDate: "2021",
        current: false,
        gpaOrHonors: "",
        description: "",
      }
    ],
    skillCategories,
    projects,
    certifications,
    languages: [],
    volunteer: [],
    publications: [],
    awards: [],
    customSections: [],
    styling: DEFAULT_STYLING,
    sectionVisibility: DEFAULT_VISIBILITY,
  };
}
