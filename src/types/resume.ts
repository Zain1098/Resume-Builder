export type TemplateType =
  | "modern"
  | "classic"
  | "minimalist"
  | "tech"
  | "executive"
  | "student";

export type FontFamilyType = "sans" | "serif" | "poppins" | "mono";

export type PaperSize = "a4" | "letter";

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string; // City, Country/State (modern ATS standard)
  website: string;
  linkedin: string;
  github: string;
  avatarUrl: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bulletPoints: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpaOrHonors?: string;
  description?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  startDate?: string;
  endDate?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: "Native" | "Fluent" | "Professional" | "Intermediate" | "Basic";
}

export interface VolunteerExperience {
  id: string;
  organization: string;
  role: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

export interface Publication {
  id: string;
  title: string;
  publisher: string;
  date?: string;
  url?: string;
  description?: string;
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  description?: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description: string;
}

export interface CustomSection {
  id: string;
  heading: string;
  items: CustomSectionItem[];
}

export interface ResumeStyling {
  template: TemplateType;
  primaryColor: string;
  fontFamily: FontFamilyType;
  fontSize: "compact" | "normal" | "spacious";
  lineSpacing: "tight" | "normal" | "relaxed";
  sectionSpacing: "compact" | "normal" | "spacious";
  paperSize?: PaperSize;
  showPhoto?: boolean;
}

export interface SectionVisibility {
  personal?: boolean;
  summary?: boolean;
  experience?: boolean;
  skills?: boolean;
  education?: boolean;
  projects?: boolean;
  certifications?: boolean;
  languages?: boolean;
  volunteer?: boolean;
  publications?: boolean;
  awards?: boolean;
  custom?: boolean;
  [key: string]: boolean | undefined;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  educations: Education[];
  skillCategories: SkillCategory[];
  projects: Project[];
  certifications: Certification[];
  languages?: LanguageItem[];
  volunteer?: VolunteerExperience[];
  publications?: Publication[];
  awards?: AwardItem[];
  customSections: CustomSection[];
  styling: ResumeStyling;
  sectionVisibility?: SectionVisibility;
  sectionOrder?: string[];
}

export interface ResumeDocument {
  id: string;
  title: string;
  targetRole: string;
  isMaster: boolean;
  createdAt: string;
  updatedAt: string;
  atsScore: number;
  data: ResumeData;
}

export interface FormatCheckItem {
  id: string;
  name: string;
  status: "pass" | "warn" | "fail";
  message: string;
  category: "structure" | "typography" | "contact" | "content";
}

export interface ScoreBreakdown {
  overallScore: number;
  keywordMatch: number;
  skillsMatch: number;
  experienceRelevance: number;
  educationMatch: number;
  structureScore: number;
  contentQuality: number;
  formattingSafety: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  recommendedKeywords: string[];
  weakBulletPoints: {
    experienceId: string;
    bulletIndex: number;
    text: string;
    reason: string;
    suggestion: string;
  }[];
  actionableSuggestions: string[];
  formatChecks: FormatCheckItem[];
}

export interface JobAnalysis {
  id: string;
  title: string;
  company?: string;
  rawText: string;
  requiredSkills: string[];
  preferredSkills: string[];
  experienceRequirements: string[];
  educationRequirements: string[];
  responsibilities: string[];
  softSkills: string[];
  keywords: string[];
  analyzedAt: string;
}
