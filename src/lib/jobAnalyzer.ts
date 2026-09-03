import { JobAnalysis, ResumeData } from "@/types/resume";

export const SEMANTIC_EQUIVALENCE_GROUPS: string[][] = [
  ["react", "react.js", "reactjs"],
  ["next.js", "nextjs", "next js"],
  ["node.js", "nodejs", "node js", "node"],
  ["typescript", "ts"],
  ["javascript", "js", "es6", "ecmascript"],
  ["rest", "rest api", "rest apis", "restful", "restful api", "restful apis"],
  ["postgresql", "postgres", "psql"],
  ["mongodb", "mongo"],
  ["aws", "amazon web services"],
  ["gcp", "google cloud", "google cloud platform"],
  ["azure", "microsoft azure"],
  ["kubernetes", "k8s"],
  ["docker", "containerization", "containers"],
  ["ci/cd", "cicd", "continuous integration", "continuous deployment"],
  ["graphql", "gql"],
  ["tailwind css", "tailwindcss", "tailwind"],
  ["vue", "vue.js", "vuejs"],
  ["angular", "angular.js", "angularjs"],
  ["redux", "redux toolkit", "rtk"],
  ["python", "py"],
  ["golang", "go programming", "go language"],
  ["unit testing", "jest", "cypress", "automated testing", "tdd"],
  ["ui/ux", "ui ux", "user interface", "user experience"],
  ["design systems", "figma design system", "component library"]
];

const COMMON_TECH_DICTIONARY = [
  "React", "Next.js", "TypeScript", "JavaScript", "Python", "Java", "C++", "C#", "Go", "Rust",
  "Node.js", "Express", "FastAPI", "Django", "Flask", "Spring Boot", "GraphQL", "REST APIs",
  "HTML5", "CSS3", "Tailwind CSS", "Redux", "Zustand", "Vue", "Angular", "Docker", "Kubernetes",
  "AWS", "Azure", "GCP", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Kafka", "Elasticsearch",
  "CI/CD", "Git", "GitHub", "Linux", "Microservices", "Agile", "Scrum", "Jira", "Figma",
  "Jest", "Cypress", "PyTorch", "TensorFlow", "Machine Learning", "LLM", "RAG", "SQL", "Snowflake"
];

const SOFT_SKILLS_DICTIONARY = [
  "Communication", "Leadership", "Mentorship", "Collaboration", "Problem Solving",
  "Project Management", "Cross-Functional", "Critical Thinking", "Agile Methodologies",
  "Stakeholder Management", "Adaptability", "Strategic Planning"
];

export function areSkillsEquivalent(skillA: string, skillB: string): boolean {
  const normA = skillA.trim().toLowerCase();
  const normB = skillB.trim().toLowerCase();
  if (normA === normB) return true;

  for (const group of SEMANTIC_EQUIVALENCE_GROUPS) {
    const hasA = group.some((g) => g === normA);
    const hasB = group.some((g) => g === normB);
    if (hasA && hasB) return true;
  }
  return false;
}

export function isSkillInText(skill: string, text: string): boolean {
  const lowerText = text.toLowerCase();
  const lowerSkill = skill.trim().toLowerCase();

  // Direct check
  const directRegex = new RegExp(`\\b${lowerSkill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
  if (directRegex.test(lowerText)) return true;

  // Semantic check
  for (const group of SEMANTIC_EQUIVALENCE_GROUPS) {
    if (group.some((g) => g === lowerSkill)) {
      for (const synonym of group) {
        const synRegex = new RegExp(`\\b${synonym.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
        if (synRegex.test(lowerText)) return true;
      }
    }
  }

  return false;
}

export function analyzeJobDescription(rawText: string, title?: string, company?: string): JobAnalysis {
  const lines = rawText.split("\n").map((l) => l.trim()).filter(Boolean);
  const lowerAll = rawText.toLowerCase();

  const requiredSkills: Set<string> = new Set();
  const preferredSkills: Set<string> = new Set();
  const softSkills: Set<string> = new Set();
  const responsibilities: string[] = [];
  const experienceRequirements: string[] = [];
  const educationRequirements: string[] = [];

  let currentSection: "required" | "preferred" | "responsibilities" | "other" = "other";

  for (const line of lines) {
    const lower = line.toLowerCase();

    // Section classification
    if (
      lower.includes("required") ||
      lower.includes("must have") ||
      lower.includes("minimum qualifications") ||
      lower.includes("what you need") ||
      lower.includes("basic qualifications")
    ) {
      currentSection = "required";
      continue;
    } else if (
      lower.includes("preferred") ||
      lower.includes("nice to have") ||
      lower.includes("plus") ||
      lower.includes("bonus") ||
      lower.includes("desired")
    ) {
      currentSection = "preferred";
      continue;
    } else if (
      lower.includes("responsibilities") ||
      lower.includes("what you'll do") ||
      lower.includes("what you will do") ||
      lower.includes("role overview")
    ) {
      currentSection = "responsibilities";
      continue;
    }

    if (currentSection === "responsibilities" && (line.startsWith("•") || line.startsWith("-") || line.startsWith("*"))) {
      responsibilities.push(line.replace(/^[•\-*]\s*/, "").trim());
    }

    // Check years of experience
    const expMatch = line.match(/\b\d+\+?\s*(-|to)?\s*\d*\s*years?\s*(of\s*)?(experience|exp)?\b/i);
    if (expMatch && !experienceRequirements.includes(line)) {
      experienceRequirements.push(line.replace(/^[•\-*]\s*/, "").trim());
    }

    // Check education
    if (
      lower.includes("bachelor") ||
      lower.includes("master") ||
      lower.includes("degree") ||
      lower.includes("phd") ||
      lower.includes("computer science")
    ) {
      if (!educationRequirements.includes(line) && line.length < 150) {
        educationRequirements.push(line.replace(/^[•\-*]\s*/, "").trim());
      }
    }
  }

  // Scan for known technologies
  COMMON_TECH_DICTIONARY.forEach((tech) => {
    if (isSkillInText(tech, rawText)) {
      // Find context
      const idx = lowerAll.indexOf(tech.toLowerCase());
      const contextSnippet = lowerAll.substring(Math.max(0, idx - 150), Math.min(lowerAll.length, idx + 150));

      if (
        contextSnippet.includes("preferred") ||
        contextSnippet.includes("nice to have") ||
        contextSnippet.includes("bonus") ||
        contextSnippet.includes("plus")
      ) {
        preferredSkills.add(tech);
      } else {
        requiredSkills.add(tech);
      }
    }
  });

  // Soft skills
  SOFT_SKILLS_DICTIONARY.forEach((ss) => {
    if (isSkillInText(ss, rawText)) {
      softSkills.add(ss);
    }
  });

  const keywords = Array.from(new Set([...requiredSkills, ...preferredSkills, ...softSkills]));

  // Auto-detect title if not given
  let detectedTitle = title || "";
  if (!detectedTitle) {
    const firstFew = lines.slice(0, 3).join(" ");
    const roleMatch = firstFew.match(/(senior|lead|principal|junior|staff)?\s*(software|frontend|backend|full stack|data|devops|cloud|ui\/ux|product)\s*(engineer|developer|architect|designer)/i);
    detectedTitle = roleMatch ? roleMatch[0] : "Target Job Position";
  }

  return {
    id: `job-${Date.now()}`,
    title: detectedTitle,
    company: company || "",
    rawText,
    requiredSkills: Array.from(requiredSkills),
    preferredSkills: Array.from(preferredSkills),
    experienceRequirements: experienceRequirements.slice(0, 4),
    educationRequirements: educationRequirements.slice(0, 3),
    responsibilities: responsibilities.slice(0, 6),
    softSkills: Array.from(softSkills),
    keywords,
    analyzedAt: new Date().toISOString()
  };
}

export function matchResumeAgainstJob(
  resume: ResumeData,
  analysis: JobAnalysis
): {
  matchScore: number;
  matchedRequired: string[];
  missingRequired: string[];
  matchedPreferred: string[];
  missingPreferred: string[];
  matchedSoft: string[];
  missingSoft: string[];
  suggestedAdditions: string[];
} {
  const isVis = (key: string) => resume.sectionVisibility?.[key] !== false;

  const corpusParts: string[] = [];
  if (isVis("personal")) {
    corpusParts.push(resume.personalInfo.fullName, resume.personalInfo.jobTitle);
  }
  if (isVis("summary") && resume.personalInfo.summary) {
    corpusParts.push(resume.personalInfo.summary);
  }
  if (isVis("experience")) {
    corpusParts.push(...resume.experiences.map((e) => `${e.company} ${e.position} ${e.bulletPoints.join(" ")}`));
  }
  if (isVis("education")) {
    corpusParts.push(...resume.educations.map((e) => `${e.institution} ${e.degree} ${e.fieldOfStudy}`));
  }
  if (isVis("skills")) {
    corpusParts.push(...resume.skillCategories.flatMap((c) => c.skills));
  }
  if (isVis("projects")) {
    corpusParts.push(...resume.projects.map((p) => `${p.name} ${p.description} ${p.technologies.join(" ")}`));
  }
  if (isVis("certifications")) {
    corpusParts.push(...resume.certifications.map((c) => `${c.name} ${c.issuer}`));
  }
  if (isVis("languages") && resume.languages) {
    corpusParts.push(...resume.languages.map((l) => `${l.language} ${l.proficiency}`));
  }
  if (isVis("volunteer") && resume.volunteer) {
    corpusParts.push(...resume.volunteer.map((v) => `${v.organization} ${v.role} ${v.description || ""}`));
  }
  if (isVis("publications") && resume.publications) {
    corpusParts.push(...resume.publications.map((p) => `${p.title} ${p.publisher} ${p.description || ""}`));
  }
  if (isVis("awards") && resume.awards) {
    corpusParts.push(...resume.awards.map((a) => `${a.title} ${a.issuer} ${a.description || ""}`));
  }
  if (isVis("custom") && resume.customSections) {
    corpusParts.push(...resume.customSections.flatMap((c) => c.items.map((i) => `${i.title} ${i.subtitle || ""} ${i.description}`)));
  }

  const resumeText = corpusParts.join(" ");

  const matchedRequired: string[] = [];
  const missingRequired: string[] = [];
  const matchedPreferred: string[] = [];
  const missingPreferred: string[] = [];
  const matchedSoft: string[] = [];
  const missingSoft: string[] = [];

  analysis.requiredSkills.forEach((skill) => {
    if (isSkillInText(skill, resumeText)) {
      matchedRequired.push(skill);
    } else {
      missingRequired.push(skill);
    }
  });

  analysis.preferredSkills.forEach((skill) => {
    if (isSkillInText(skill, resumeText)) {
      matchedPreferred.push(skill);
    } else {
      missingPreferred.push(skill);
    }
  });

  analysis.softSkills.forEach((skill) => {
    if (isSkillInText(skill, resumeText)) {
      matchedSoft.push(skill);
    } else {
      missingSoft.push(skill);
    }
  });

  const totalReq = matchedRequired.length + missingRequired.length;
  const reqScore = totalReq > 0 ? (matchedRequired.length / totalReq) * 100 : 80;

  const totalPref = matchedPreferred.length + missingPreferred.length;
  const prefScore = totalPref > 0 ? (matchedPreferred.length / totalPref) * 100 : 70;

  const totalSoft = matchedSoft.length + missingSoft.length;
  const softScore = totalSoft > 0 ? (matchedSoft.length / totalSoft) * 100 : 80;

  // Weighted Job Match: 65% Required, 20% Preferred, 15% Soft
  const matchScore = Math.round(reqScore * 0.65 + prefScore * 0.20 + softScore * 0.15);

  const suggestedAdditions = [
    ...missingRequired,
    ...missingPreferred.slice(0, 3)
  ];

  return {
    matchScore: Math.max(10, Math.min(100, matchScore)),
    matchedRequired,
    missingRequired,
    matchedPreferred,
    missingPreferred,
    matchedSoft,
    missingSoft,
    suggestedAdditions
  };
}
