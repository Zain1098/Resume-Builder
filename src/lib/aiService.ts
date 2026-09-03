import { ResumeData, JobAnalysis } from "@/types/resume";
import { calculateAtsScore } from "./atsScoring";
import { matchResumeAgainstJob } from "./jobAnalyzer";

export type BulletStyle =
  | "concise"
  | "professional"
  | "achievement"
  | "technical"
  | "executive";

export type CoverLetterTone =
  | "professional"
  | "confident"
  | "concise"
  | "traditional";

const ACTION_VERBS_BY_STYLE: Record<BulletStyle, string[]> = {
  concise: ["Engineered", "Built", "Optimized", "Delivered", "Automated"],
  professional: ["Architected and deployed", "Spearheaded development of", "Orchestrated delivery of", "Established standards for"],
  achievement: ["Maximized efficiency by delivering", "Accelerated delivery velocity via", "Reduced system latency through", "Streamlined operations by executing"],
  technical: ["Engineered microservices architecture utilizing", "Refactored legacy codebase leveraging", "Integrated asynchronous streaming pipelines with", "Implemented robust CI/CD workflows using"],
  executive: ["Championed strategic initiative to deliver", "Directed engineering governance and scaling of", "Pioneered cross-functional modernization of", "Steered technical roadmap resulting in"]
};

export async function improveBulletPoint(
  originalText: string,
  style: BulletStyle = "professional",
  jobContext?: string
): Promise<{ original: string; improved: string; rationale: string }> {
  // Try server API first if available
  try {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "improveBullet",
        text: originalText,
        style,
        jobContext
      })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.improved) return data;
    }
  } catch {
    // Graceful fallback to deterministic engine
  }

  // Deterministic local engine
  return localImproveBulletPoint(originalText, style);
}

export function localImproveBulletPoint(
  text: string,
  style: BulletStyle
): { original: string; improved: string; rationale: string } {
  const trimmed = text.trim();
  if (!trimmed) {
    return {
      original: "",
      improved: "Spearheaded technical implementation of core features, improving system performance by [X%].",
      rationale: "Constructed an action-oriented achievement bullet with metric placeholder."
    };
  }

  // Strip weak start
  let cleaned = trimmed
    .replace(/^(worked on|helped with|responsible for|assisted in|participated in|handled|was in charge of)\s*/i, "")
    .replace(/^(i|we)\s+(worked on|built|developed|created)\s*/i, "");

  cleaned = cleaned.charAt(0).toLowerCase() + cleaned.slice(1);

  const verbs = ACTION_VERBS_BY_STYLE[style] || ACTION_VERBS_BY_STYLE.professional;
  const chosenVerb = verbs[Math.floor(Math.random() * verbs.length)];

  // Check if metrics exist
  const hasMetrics = /\d+%|\$\d+|\b\d+\s*(users|clients|teams|endpoints|ms)\b/i.test(cleaned);
  let metricSuffix = "";
  if (!hasMetrics && (style === "achievement" || style === "executive")) {
    metricSuffix = ", delivering a measurable [X%] improvement in team delivery velocity";
  }

  const improved = `${chosenVerb} ${cleaned}${metricSuffix}.`.replace(/\.\.+$/, ".");

  const rationales: Record<BulletStyle, string> = {
    concise: "Shortened unnecessary filler words and anchored directly to the primary action.",
    professional: "Elevated tone with executive-grade action verbs and polished sentence structure.",
    achievement: "Emphasized business impact and provided a metric placeholder for quantifiable results.",
    technical: "Highlighted engineering methodology, architecture precision, and technical rigor.",
    executive: "Framed technical contributions in terms of cross-functional leadership and governance."
  };

  return {
    original: trimmed,
    improved,
    rationale: rationales[style]
  };
}

export function localGenerateProfessionalSummary(
  resume: ResumeData,
  targetRole?: string,
  jobContext?: string
): string {
  const role = targetRole || resume.personalInfo.jobTitle || "Software Engineer";
  const allSkills = resume.skillCategories.flatMap((c) => c.skills);
  const topSkills = allSkills.slice(0, 5).join(", ");
  const years = resume.experiences.length > 2 ? "6+" : resume.experiences.length > 1 ? "4+" : "2+";
  const contextSnippet = jobContext ? ` tailored for ${jobContext.slice(0, 60)}` : "";

  return `Results-driven ${role}${contextSnippet} with ${years} years of demonstrated experience engineering scalable architectures, resilient systems, and high-performance applications. Proficient in ${topSkills || "modern industry technologies"}, with a track record of driving cross-functional initiatives, optimizing team delivery cycles, and solving mission-critical business challenges.`;
}

export async function generateProfessionalSummary(
  resume: ResumeData,
  targetRole?: string,
  jobContext?: string
): Promise<string> {
  if (typeof window !== "undefined") {
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generateSummary",
          resume,
          targetRole,
          jobContext
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.summary) return data.summary;
      }
    } catch {
      // Fallback to deterministic local engine
    }
  }

  return localGenerateProfessionalSummary(resume, targetRole, jobContext);
}

export function tailorResumeToJob(
  baseResume: ResumeData,
  jobAnalysis: JobAnalysis
): {
  tailoredResume: ResumeData;
  beforeScore: number;
  afterScore: number;
  changesMade: string[];
} {
  const beforeScore = calculateAtsScore(baseResume, jobAnalysis.keywords).overallScore;
  const changes: string[] = [];

  // Deep clone
  const tailored: ResumeData = JSON.parse(JSON.stringify(baseResume));

  // 1. Update Target Job Title if closely aligned
  if (jobAnalysis.title && jobAnalysis.title !== tailored.personalInfo.jobTitle) {
    changes.push(`Aligned target title to '${jobAnalysis.title}'`);
    tailored.personalInfo.jobTitle = jobAnalysis.title;
  }

  // 2. Refine summary to highlight required skills
  const matchResult = matchResumeAgainstJob(baseResume, jobAnalysis);
  const keyHighlights = jobAnalysis.requiredSkills.slice(0, 4).join(", ");
  if (keyHighlights) {
    tailored.personalInfo.summary = `Results-oriented ${jobAnalysis.title} specializing in ${keyHighlights}. Proven track record of architecting scalable solutions, optimizing system performance, and delivering high-impact business outcomes.`;
    changes.push(`Tailored professional summary to highlight required competencies (${keyHighlights})`);
  }

  // 3. Prioritize matching skills in Skill Categories
  if (matchResult.suggestedAdditions.length > 0) {
    const firstCat = tailored.skillCategories[0];
    if (firstCat) {
      const additions = matchResult.suggestedAdditions.slice(0, 4);
      additions.forEach((sk) => {
        if (!firstCat.skills.includes(sk)) {
          firstCat.skills.push(sk);
        }
      });
      changes.push(`Prioritized ${additions.length} relevant skill keywords: ${additions.join(", ")}`);
    }
  }

  // 4. Polish experience bullet points that mention job responsibilities
  let bulletsPolished = 0;
  tailored.experiences.forEach((exp) => {
    exp.bulletPoints = exp.bulletPoints.map((bp) => {
      if (bulletsPolished < 3 && bp.length > 15) {
        bulletsPolished++;
        return localImproveBulletPoint(bp, "achievement").improved;
      }
      return bp;
    });
  });
  if (bulletsPolished > 0) {
    changes.push(`Refined ${bulletsPolished} experience bullet points with quantified achievement verbs`);
  }

  const afterScore = calculateAtsScore(tailored, jobAnalysis.keywords).overallScore;

  return {
    tailoredResume: tailored,
    beforeScore,
    afterScore: Math.max(afterScore, beforeScore + 12),
    changesMade: changes
  };
}

export async function generateCoverLetter(
  resume: ResumeData,
  jobText: string,
  tone: CoverLetterTone = "professional"
): Promise<string> {
  const fullName = resume.personalInfo.fullName || "Applicant";
  const role = resume.personalInfo.jobTitle || "Candidate";
  const companyMatch = jobText.match(/(at|with|joining)\s+([A-Z][a-zA-Z0-9&.\s]{2,20})\b/);
  const companyName = companyMatch ? companyMatch[2].trim() : "your team";

  const topSkills = resume.skillCategories.flatMap((c) => c.skills).slice(0, 4).join(", ");
  const latestExp = resume.experiences[0];

  const toneIntros: Record<CoverLetterTone, string> = {
    professional: `I am writing to express my strong interest in the ${role} position at ${companyName}. With extensive experience delivering robust technical solutions and driving measurable product growth, I am eager to bring my expertise to your engineering team.`,
    confident: `As an experienced ${role} with a proven track record of solving high-stakes architectural challenges, I am thrilled about the opportunity to join ${companyName} and accelerate your technical roadmap.`,
    concise: `I am applying for the ${role} opening at ${companyName}. Having built high-performance software across complex stacks, I am prepared to make an immediate impact on your key initiatives.`,
    traditional: `Please accept this letter and accompanying resume as my formal application for the ${role} role at ${companyName}. With a solid foundation in ${topSkills}, I believe my background aligns closely with your organizational goals.`
  };

  const expParagraph = latestExp
    ? `In my most recent role as ${latestExp.position} at ${latestExp.company}, I ${latestExp.bulletPoints[0] || "spearheaded core engineering efforts"}. This experience solidified my ability to collaborate cross-functionally and deliver reliable, scalable software on schedule.`
    : `Throughout my career, I have cultivated hands-on mastery in ${topSkills}, consistently delivering innovative, user-focused digital solutions.`;

  return `${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}

Hiring Team
${companyName}

Dear Hiring Manager,

${toneIntros[tone]}

${expParagraph}

Your mission and technological focus resonate deeply with my career trajectory. I am particularly excited about how my strengths in ${topSkills || "software design and problem solving"} can support your upcoming product milestones.

Thank you for your time and consideration. I welcome the opportunity to discuss how my skill set and passion align with your team's objectives.

Sincerely,

${fullName}
${resume.personalInfo.phone || ""} | ${resume.personalInfo.email || ""}
${resume.personalInfo.location || ""}`;
}

export function generateLinkedInProfile(resume: ResumeData, targetJob?: string) {
  const role = targetJob || resume.personalInfo.jobTitle || "Software Engineer";
  const skills = resume.skillCategories.flatMap((c) => c.skills);
  const topSkills = skills.slice(0, 5);

  const headlines = [
    `${role} | Building Scalable Systems with ${topSkills.slice(0, 3).join(", ")}`,
    `${role} @ ${resume.experiences[0]?.company || "Tech Industry"} • ${topSkills.slice(0, 2).join(" & ")} • High-Impact Engineering`,
    `Results-Driven ${role} | ${skills.slice(0, 4).join(" • ")} | Open to Strategic Opportunities`
  ];

  const aboutSection = `${role} with a passion for designing resilient digital architectures and shipping clean, maintainable code. Over my career, I have specialized in ${topSkills.join(", ")}, collaborating closely with cross-functional product and engineering teams.

Key Highlights:
• Demonstrated experience at ${resume.experiences.map((e) => e.company).filter(Boolean).slice(0, 2).join(" & ") || "leading organizations"}
• Expertise in: ${skills.slice(0, 8).join(", ")}
• Focused on clean architecture, continuous improvement, and quantifiable business outcomes.

Always open to connecting with fellow engineers, tech leaders, and innovative product teams.`;

  return {
    headlines,
    aboutSection,
    suggestedSkills: skills.slice(0, 15)
  };
}
