export type TemplateType = "modern" | "classic" | "minimalist" | "tech";

export type FontFamilyType = "sans" | "serif" | "poppins" | "mono";

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
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
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  educations: Education[];
  skillCategories: SkillCategory[];
  projects: Project[];
  certifications: Certification[];
  customSections: CustomSection[];
  styling: ResumeStyling;
}
