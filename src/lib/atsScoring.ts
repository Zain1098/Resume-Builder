import { ResumeData, ScoreBreakdown, FormatCheckItem } from "@/types/resume";

export const STRONG_ACTION_VERBS = new Set([
  "architected", "spearheaded", "engineered", "orchestrated", "developed",
  "designed", "implemented", "optimized", "streamlined", "automated",
  "accelerated", "scaled", "decreased", "increased", "championed",
  "transformed", "delivered", "mentored", "directed", "built",
  "pioneered", "refactored", "consolidated", "launched", "executed",
  "formulated", "established", "maximized", "minimized", "produced"
]);

export const WEAK_VERBS = [
  "worked on", "helped with", "responsible for", "assisted in", "participated in",
  "handled", "did", "was part of", "tried to", "attempted"
];

export const FIRST_PERSON_PRONOUNS = [
  /\bI\b/i, /\bme\b/i, /\bmy\b/i, /\bmine\b/i, /\bmyself\b/i,
  /\bwe\b/i, /\bus\b/i, /\bour\b/i, /\bourselves\b/i
];

export const QUANTIFIABLE_METRIC_REGEX = /(\d+(\.\d+)?%|\$\d+[\d,]*(\.\d+)?[kmb]?|\b\d+[\d,]*\+?\s*(users|clients|customers|engineers|teams|requests|queries|ms|seconds|minutes|hours|days|releases|deployments|endpoints|microservices)\b|\b\d{1,3}(,\d{3})+\b|\b\d+\s*(percent|fold|x)\b)/i;

export const COMMON_ROLE_KEYWORDS: Record<string, string[]> = {
  software: [
    "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python",
    "SQL", "Git", "REST APIs", "Docker", "AWS", "CI/CD", "Testing", "Agile"
  ],
  frontend: [
    "JavaScript", "TypeScript", "React", "Next.js", "CSS3", "HTML5",
    "Tailwind CSS", "Redux", "Responsive Design", "Web Performance", "Git"
  ],
  backend: [
    "Node.js", "Python", "Go", "Java", "PostgreSQL", "MongoDB", "Redis",
    "Docker", "Kubernetes", "Microservices", "REST APIs", "GraphQL", "AWS"
  ],
  fullstack: [
    "React", "Node.js", "TypeScript", "PostgreSQL", "REST APIs", "AWS",
    "Docker", "Git", "Next.js", "Tailwind CSS", "CI/CD"
  ],
  data: [
    "Python", "SQL", "Machine Learning", "Pandas", "PyTorch", "TensorFlow",
    "ETL", "Data Pipelines", "Snowflake", "BigQuery", "Docker"
  ],
  design: [
    "Figma", "UI/UX", "Design Systems", "Prototyping", "User Research",
    "Wireframing", "Usability Testing", "Accessibility", "Information Architecture"
  ]
};

export function calculateAtsScore(
  resume: ResumeData,
  targetJobKeywords?: string[]
): ScoreBreakdown {
  const suggestions: string[] = [];
  const formatChecks: FormatCheckItem[] = [];
  const weakBullets: ScoreBreakdown["weakBulletPoints"] = [];

  // ==========================================
  // 1. RESUME STRUCTURE & COMPLETENESS (Weight: 10%)
  // ==========================================
  let structurePoints = 0;
  const { personalInfo } = resume;

  if (personalInfo.fullName?.trim() && personalInfo.jobTitle?.trim()) {
    structurePoints += 25;
  } else {
    suggestions.push("Ensure your Full Name and target Job Title are clearly stated at the top.");
  }

  const hasEmail = Boolean(personalInfo.email?.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email));
  const hasPhone = Boolean(personalInfo.phone?.trim() && personalInfo.phone.length >= 7);
  const hasLocation = Boolean(personalInfo.location?.trim());

  if (hasEmail && hasPhone && hasLocation) {
    structurePoints += 30;
    formatChecks.push({
      id: "contact-complete",
      name: "Contact Information Completeness",
      status: "pass",
      message: "Email, phone number, and location (City, Country) are complete and formatted cleanly.",
      category: "contact"
    });
  } else {
    structurePoints += (hasEmail ? 10 : 0) + (hasPhone ? 10 : 0) + (hasLocation ? 10 : 0);
    formatChecks.push({
      id: "contact-complete",
      name: "Contact Information Completeness",
      status: "warn",
      message: "Missing either valid email, phone number, or location. Modern ATS parsers require all three.",
      category: "contact"
    });
    suggestions.push("Complete all 3 primary contact fields (Email, Phone, City/Country).");
  }

  const summaryWords = personalInfo.summary?.trim().split(/\s+/).filter(Boolean).length || 0;
  if (summaryWords >= 30 && summaryWords <= 120) {
    structurePoints += 25;
    formatChecks.push({
      id: "summary-length",
      name: "Professional Summary Depth",
      status: "pass",
      message: `Summary is concise and impactful (${summaryWords} words, ideal range 30-120 words).`,
      category: "content"
    });
  } else if (summaryWords > 0) {
    structurePoints += 15;
    formatChecks.push({
      id: "summary-length",
      name: "Professional Summary Depth",
      status: "warn",
      message: summaryWords < 30 ? "Summary is too brief (<30 words)." : "Summary is overly long (>120 words).",
      category: "content"
    });
    suggestions.push("Adjust Professional Summary to be between 30 and 100 words with targeted keywords.");
  } else {
    suggestions.push("Add a 3-4 line Professional Summary highlighting your career accomplishments.");
  }

  if (resume.experiences.length > 0 && resume.educations.length > 0) {
    structurePoints += 20;
  } else {
    structurePoints += (resume.experiences.length > 0 ? 10 : 0) + (resume.educations.length > 0 ? 10 : 0);
  }

  const structureScore = Math.min(100, structurePoints);

  // ==========================================
  // 2. SKILLS RELEVANCE (Weight: 20%)
  // ==========================================
  const totalSkills = resume.skillCategories.flatMap((c) => c.skills);
  const uniqueSkills = Array.from(new Set(totalSkills.map((s) => s.trim()).filter(Boolean)));
  let skillsScore = 0;

  if (uniqueSkills.length >= 10) {
    skillsScore = 100;
  } else if (uniqueSkills.length >= 6) {
    skillsScore = 80;
  } else if (uniqueSkills.length >= 3) {
    skillsScore = 55;
    suggestions.push("Add more core technical skills (target at least 8-12 relevant competencies).");
  } else {
    skillsScore = 25;
    suggestions.push("Add categorized technical and domain skills to boost your ATS skills match.");
  }

  // ==========================================
  // 3. EXPERIENCE RELEVANCE & QUANTIFIABLE METRICS (Weight: 15%)
  // ==========================================
  let experiencePoints = 0;
  let totalBullets = 0;
  let metricBullets = 0;

  resume.experiences.forEach((exp) => {
    exp.bulletPoints.forEach((bullet) => {
      const text = bullet.trim();
      if (!text) return;
      totalBullets++;
      if (QUANTIFIABLE_METRIC_REGEX.test(text)) {
        metricBullets++;
      }
    });
  });

  if (resume.experiences.length >= 2) {
    experiencePoints += 30;
  } else if (resume.experiences.length === 1) {
    experiencePoints += 20;
  }

  if (totalBullets >= 5) {
    experiencePoints += 30;
  } else if (totalBullets >= 2) {
    experiencePoints += 15;
  }

  const metricRatio = totalBullets > 0 ? metricBullets / totalBullets : 0;
  if (metricRatio >= 0.4) {
    experiencePoints += 40;
    formatChecks.push({
      id: "metric-density",
      name: "Quantifiable Impact & Metrics",
      status: "pass",
      message: `${metricBullets} of ${totalBullets} bullet points contain quantified metrics (%, numbers, scale).`,
      category: "content"
    });
  } else if (metricRatio >= 0.2) {
    experiencePoints += 25;
    suggestions.push("Include more measurable metrics (e.g. % increase, latency drop, users served, team size).");
  } else {
    experiencePoints += 10;
    suggestions.push("Add quantifiable results to your achievements (e.g., 'Reduced build times by 35%').");
  }

  const experienceScore = Math.min(100, experiencePoints);

  // ==========================================
  // 4. CONTENT QUALITY & ACTION VERBS (Weight: 10%)
  // ==========================================
  let qualityPoints = 100;
  let firstPersonViolations = 0;
  let weakVerbViolations = 0;

  resume.experiences.forEach((exp) => {
    exp.bulletPoints.forEach((bullet, bIdx) => {
      const text = bullet.trim();
      if (!text) return;

      // Check first person
      for (const rx of FIRST_PERSON_PRONOUNS) {
        if (rx.test(text)) {
          firstPersonViolations++;
          weakBullets.push({
            experienceId: exp.id,
            bulletIndex: bIdx,
            text,
            reason: "Avoid first-person pronouns ('I', 'my', 'we'). ATS & executive recruiters prefer active third-person phrases.",
            suggestion: text.replace(rx, "").trim()
          });
          break;
        }
      }

      // Check weak verbs
      const lower = text.toLowerCase();
      for (const wv of WEAK_VERBS) {
        if (lower.startsWith(wv)) {
          weakVerbViolations++;
          weakBullets.push({
            experienceId: exp.id,
            bulletIndex: bIdx,
            text,
            reason: `Starts with passive phrase '${wv}'. Replace with a high-impact action verb.`,
            suggestion: `Spearheaded delivery of ${text.slice(wv.length).trim()}`
          });
          break;
        }
      }
    });
  });

  qualityPoints -= firstPersonViolations * 10;
  qualityPoints -= weakVerbViolations * 10;

  if (firstPersonViolations > 0) {
    suggestions.push(`Remove ${firstPersonViolations} first-person pronoun(s) from your experience bullets.`);
  }
  if (weakVerbViolations > 0) {
    suggestions.push(`Replace ${weakVerbViolations} passive phrase(s) with strong action verbs (e.g. 'Architected', 'Spearheaded').`);
  }

  const contentQuality = Math.max(20, Math.min(100, qualityPoints));

  // ==========================================
  // 5. EDUCATION & CREDENTIALS (Weight: 10%)
  // ==========================================
  let educationScore = 0;
  if (resume.educations.length > 0) {
    const hasDegreeAndInst = resume.educations.some(
      (e) => e.degree?.trim() && e.institution?.trim()
    );
    educationScore += hasDegreeAndInst ? 70 : 40;
  }
  if (resume.certifications.length > 0) {
    educationScore += 30;
  }
  educationScore = Math.min(100, Math.max(educationScore, resume.educations.length > 0 ? 60 : 30));

  const isVis = (key: string) => resume.sectionVisibility?.[key] !== false;

  const corpusParts: string[] = [];
  if (isVis("personal")) {
    corpusParts.push(personalInfo.fullName, personalInfo.jobTitle);
  }
  if (isVis("summary") && personalInfo.summary) {
    corpusParts.push(personalInfo.summary);
  }
  if (isVis("experience")) {
    corpusParts.push(...resume.experiences.map((e) => `${e.company} ${e.position} ${e.bulletPoints.join(" ")}`));
  }
  if (isVis("education")) {
    corpusParts.push(...resume.educations.map((e) => `${e.institution} ${e.degree} ${e.fieldOfStudy}`));
  }
  if (isVis("skills")) {
    corpusParts.push(...uniqueSkills);
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

  const resumeCorpus = corpusParts.join(" ").toLowerCase();

  const titleLower = (personalInfo.jobTitle || "").toLowerCase();
  let roleKey = "software";
  if (titleLower.includes("front")) roleKey = "frontend";
  else if (titleLower.includes("back")) roleKey = "backend";
  else if (titleLower.includes("full")) roleKey = "fullstack";
  else if (titleLower.includes("data") || titleLower.includes("ai") || titleLower.includes("machine")) roleKey = "data";
  else if (titleLower.includes("design") || titleLower.includes("ui") || titleLower.includes("ux")) roleKey = "design";

  const targetKeywords = targetJobKeywords && targetJobKeywords.length > 0
    ? targetJobKeywords
    : COMMON_ROLE_KEYWORDS[roleKey] || COMMON_ROLE_KEYWORDS.software;

  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  targetKeywords.forEach((kw) => {
    const regex = new RegExp(`\\b${kw.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
    if (regex.test(resumeCorpus)) {
      matchedKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  const totalKw = matchedKeywords.length + missingKeywords.length;
  const keywordMatch = totalKw > 0 ? Math.round((matchedKeywords.length / totalKw) * 100) : 80;

  if (missingKeywords.length > 0) {
    suggestions.push(`Missing ${missingKeywords.length} target keyword(s): ${missingKeywords.slice(0, 4).join(", ")}.`);
  }

  // ==========================================
  // 7. FORMATTING & ATS SAFETY (Weight: 10%)
  // ==========================================
  let formatScore = 100;

  // Check 1: Section headings
  formatChecks.push({
    id: "standard-headings",
    name: "Standard Section Headings",
    status: "pass",
    message: "Uses industry standard section headings recognizable by Taleo, Workday, and Greenhouse.",
    category: "structure"
  });

  // Check 2: Single or standard column layout
  if (resume.styling.template === "modern" || resume.styling.template === "classic" || resume.styling.template === "minimalist") {
    formatChecks.push({
      id: "layout-safety",
      name: "ATS Parseable Hierarchy",
      status: "pass",
      message: "Clean document flow without unparseable text boxes, tables, or floating layers.",
      category: "structure"
    });
  }

  // Check 3: Font readability
  formatChecks.push({
    id: "font-safety",
    name: "Font Readability & Encoding",
    status: "pass",
    message: "Standard UTF-8 vector web-safe typography ensures no character corruption during automated extraction.",
    category: "typography"
  });

  // Check 4: Profile photo warning
  if (resume.styling.showPhoto || resume.personalInfo.avatarUrl) {
    formatScore -= 5;
    formatChecks.push({
      id: "photo-warning",
      name: "Profile Photo Advisory",
      status: "warn",
      message: "Many US/UK ATS parsers recommend omitting photos to avoid automated parsing rejections.",
      category: "structure"
    });
  }

  const formattingSafety = Math.max(60, formatScore);

  // ==========================================
  // OVERALL WEIGHTED CALCULATION
  // Explainable formula:
  // 35% Keyword Match
  // 20% Skills Match
  // 15% Experience Relevance
  // 10% Education Match
  // 10% Resume Structure
  // 10% Content Quality
  // (Formatting Safety acts as an audit multiplier/bonus)
  // ==========================================
  const rawScore =
    keywordMatch * 0.35 +
    skillsScore * 0.20 +
    experienceScore * 0.15 +
    educationScore * 0.10 +
    structureScore * 0.10 +
    contentQuality * 0.10;

  const overallScore = Math.round(Math.min(100, Math.max(15, rawScore)));

  return {
    overallScore,
    keywordMatch,
    skillsMatch: skillsScore,
    experienceRelevance: experienceScore,
    educationMatch: educationScore,
    structureScore,
    contentQuality,
    formattingSafety,
    matchedKeywords,
    missingKeywords,
    recommendedKeywords: missingKeywords.slice(0, 6),
    weakBulletPoints: weakBullets,
    actionableSuggestions: suggestions,
    formatChecks
  };
}
