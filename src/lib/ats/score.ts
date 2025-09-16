export type AtsBreakdown = {
  keywords: { score: number; missing: string[] };
  formatting: { score: number; issues: string[] };
  sections: { score: number; missing: string[] };
  length: { score: number; issues: string[] };
};

export type AtsResult = {
  score: number;
  breakdown: AtsBreakdown;
};

export function scoreResumeForAts(
  resume: { dataJSON: unknown },
  jobKeywords: string[] = [],
): AtsResult {
  const text = JSON.stringify(resume.dataJSON ?? {}).toLowerCase();
  const normalizedKeywords = (jobKeywords || []).map((k) => k.toLowerCase());

  const missingKeywords = normalizedKeywords.filter((k) => !text.includes(k));
  const keywordScore = normalizedKeywords.length
    ? Math.round(
        ((normalizedKeywords.length - missingKeywords.length) /
          normalizedKeywords.length) *
          100,
      )
    : 70;

  const requiredSections = ["summary", "experience", "education", "skills"];
  const missingSections = requiredSections.filter((s) => !text.includes(s));
  const sectionScore = Math.round(
    ((requiredSections.length - missingSections.length) /
      requiredSections.length) *
      100,
  );

  const issues: string[] = [];
  // Simple formatting heuristics: avoid images/html tags; prefer bullet count reasonable
  if (/<img|<script|<style/i.test(text))
    issues.push("Contains HTML tags that ATS may ignore.");
  // Measure bullets roughly by occurrences of "- " or "•"
  const bulletCount = (text.match(/\n-\s|•/g) || []).length;
  if (bulletCount < 3)
    issues.push("Very few bullet points; consider using concise bullets.");
  if (bulletCount > 60)
    issues.push("Too many bullets; condense to the most impactful.");
  const formattingScore = Math.max(0, 100 - issues.length * 15);

  const lengthIssues: string[] = [];
  const charCount = text.length;
  if (charCount < 1200)
    lengthIssues.push("Resume is short; add measurable achievements.");
  if (charCount > 15000)
    lengthIssues.push("Resume is long; reduce to 1-2 pages for most roles.");
  const lengthScore = Math.max(0, 100 - lengthIssues.length * 25);

  const breakdown: AtsBreakdown = {
    keywords: { score: keywordScore, missing: missingKeywords },
    formatting: { score: formattingScore, issues },
    sections: { score: sectionScore, missing: missingSections },
    length: { score: lengthScore, issues: lengthIssues },
  };

  // Weighted average
  const score = Math.round(
    keywordScore * 0.4 +
      sectionScore * 0.25 +
      formattingScore * 0.2 +
      lengthScore * 0.15,
  );

  return { score, breakdown };
}
