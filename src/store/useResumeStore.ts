import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ResumeData,
  PersonalInfo,
  Experience,
  Education,
  SkillCategory,
  Project,
  Certification,
  CustomSection,
  ResumeStyling,
  TemplateType,
  FontFamilyType,
} from "@/types/resume";

export const initialSampleResume: ResumeData = {
  personalInfo: {
    fullName: "Alex Morgan",
    jobTitle: "Senior Full Stack Software Engineer",
    email: "alex.morgan@example.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    website: "https://alexmorgan.dev",
    linkedin: "https://linkedin.com/in/alexmorgan",
    github: "https://github.com/alexmorgan",
    avatarUrl: "",
    summary:
      "Results-driven Software Engineer with 6+ years of experience building scalable, high-performance web applications and cloud architectures. Proven track record of spearheading microservices migration, optimizing frontend performance by 45%, and mentoring cross-functional teams in modern DevOps & agile workflows.",
  },
  experiences: [
    {
      id: "exp-1",
      company: "Apex Cloud Solutions",
      position: "Senior Full Stack Engineer",
      location: "San Francisco, CA",
      startDate: "2022-03",
      endDate: "Present",
      current: true,
      bulletPoints: [
        "Architected and deployed a multi-tenant SaaS dashboard serving 120,000+ daily active users using Next.js, Node.js, and AWS ECS.",
        "Engineered real-time data streaming pipelines with Apache Kafka and Redis, reducing latency by 40% across 5 core enterprise services.",
        "Championed automated CI/CD deployment pipelines on GitHub Actions, cutting release deployment cycles from 45 minutes to under 8 minutes.",
        "Mentored 6 junior/mid-level engineers through code reviews, design docs, and pair programming sessions.",
      ],
    },
    {
      id: "exp-2",
      company: "Nexus Labs",
      position: "Full Stack Software Developer",
      location: "Austin, TX",
      startDate: "2019-06",
      endDate: "2022-02",
      current: false,
      bulletPoints: [
        "Developed end-to-end e-commerce features with React, TypeScript, and GraphQL, contributing to a 28% uplift in checkout conversion rates.",
        "Integrated secure Stripe & PayPal payment gateways with webhook idempotency and automated fraud detection filters.",
        "Spearheaded database query optimization on PostgreSQL, decreasing heavy analytics query response times from 3.2s to 450ms.",
      ],
    },
    {
      id: "exp-3",
      company: "TechNova Innovations",
      position: "Junior Web Developer",
      location: "Remote",
      startDate: "2018-01",
      endDate: "2019-05",
      current: false,
      bulletPoints: [
        "Designed and maintained responsive landing pages and component libraries using React and Tailwind CSS.",
        "Integrated RESTful APIs and improved frontend unit test coverage from 42% to 88% using Jest and React Testing Library.",
      ],
    },
  ],
  educations: [
    {
      id: "edu-1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      startDate: "2014-09",
      endDate: "2018-05",
      current: false,
      gpaOrHonors: "3.85 GPA - Magna Cum Laude",
      description: "Focus on Distributed Systems, Cloud Computing, and Algorithms.",
    },
  ],
  skillCategories: [
    {
      id: "cat-1",
      name: "Languages & Core",
      skills: ["TypeScript", "JavaScript (ES6+)", "Python", "Go", "SQL", "HTML5/CSS3"],
    },
    {
      id: "cat-2",
      name: "Frameworks & Libraries",
      skills: ["React", "Next.js", "Node.js", "Express", "Tailwind CSS", "GraphQL", "Redux/Zustand"],
    },
    {
      id: "cat-3",
      name: "Cloud & DevOps",
      skills: ["AWS (S3, ECS, Lambda)", "Docker", "Kubernetes", "PostgreSQL", "MongoDB", "Redis", "Git", "CI/CD"],
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "CloudMetrics Monitoring Platform",
      description:
        "Open-source observability tool providing live CPU, memory, and API metrics with automated alert webhooks and anomaly detection.",
      technologies: ["Next.js", "TypeScript", "Go", "ClickHouse", "Tailwind CSS"],
      liveUrl: "https://cloudmetrics.dev",
      githubUrl: "https://github.com/alexmorgan/cloudmetrics",
      startDate: "2023-01",
      endDate: "2023-08",
    },
    {
      id: "proj-2",
      name: "DevSync AI Workspace",
      description:
        "Collaborative AI markdown notes editor with real-time multiplayer cursor synchronization via WebSockets and CRDTs.",
      technologies: ["React", "Node.js", "WebSockets", "OpenAI API", "PostgreSQL"],
      liveUrl: "https://devsync.app",
      githubUrl: "https://github.com/alexmorgan/devsync",
      startDate: "2022-04",
      endDate: "2022-10",
    },
  ],
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect – Associate",
      issuer: "Amazon Web Services (AWS)",
      date: "2023-07",
    },
    {
      id: "cert-2",
      name: "Meta Certified Front-End Developer",
      issuer: "Meta",
      date: "2022-01",
    },
  ],
  customSections: [],
  styling: {
    template: "modern",
    primaryColor: "#2563eb", // Royal blue
    fontFamily: "sans",
    fontSize: "normal",
    lineSpacing: "normal",
    sectionSpacing: "normal",
  },
};

export const emptyResume: ResumeData = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    linkedin: "",
    github: "",
    avatarUrl: "",
    summary: "",
  },
  experiences: [],
  educations: [],
  skillCategories: [],
  projects: [],
  certifications: [],
  customSections: [],
  styling: {
    template: "modern",
    primaryColor: "#2563eb",
    fontFamily: "sans",
    fontSize: "normal",
    lineSpacing: "normal",
    sectionSpacing: "normal",
  },
};

interface ResumeState {
  resume: ResumeData;
  activeSection: string;
  zoomLevel: number;
  previewTab: "edit" | "preview";
  
  // Setters & Updaters
  setActiveSection: (section: string) => void;
  setZoomLevel: (zoom: number) => void;
  setPreviewTab: (tab: "edit" | "preview") => void;
  
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  
  // Experiences
  addExperience: () => void;
  updateExperience: (id: string, exp: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addBulletPoint: (expId: string) => void;
  updateBulletPoint: (expId: string, index: number, text: string) => void;
  removeBulletPoint: (expId: string, index: number) => void;
  
  // Educations
  addEducation: () => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  
  // Skills
  addSkillCategory: () => void;
  updateSkillCategory: (id: string, category: Partial<SkillCategory>) => void;
  removeSkillCategory: (id: string) => void;
  addSkillToCategory: (categoryId: string, skill: string) => void;
  removeSkillFromCategory: (categoryId: string, skillIndex: number) => void;
  
  // Projects
  addProject: () => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;
  
  // Certifications
  addCertification: () => void;
  updateCertification: (id: string, cert: Partial<Certification>) => void;
  removeCertification: (id: string) => void;
  
  // Custom Sections
  addCustomSection: () => void;
  updateCustomSection: (id: string, section: Partial<CustomSection>) => void;
  removeCustomSection: (id: string) => void;
  addCustomSectionItem: (sectionId: string) => void;
  updateCustomSectionItem: (sectionId: string, itemId: string, item: Partial<CustomSection["items"][0]>) => void;
  removeCustomSectionItem: (sectionId: string, itemId: string) => void;
  
  // Styling
  updateStyling: (styling: Partial<ResumeStyling>) => void;
  setTemplate: (template: TemplateType) => void;
  setPrimaryColor: (color: string) => void;
  setFontFamily: (font: FontFamilyType) => void;
  
  // Global Actions
  loadSampleData: () => void;
  clearResume: () => void;
  importResume: (data: ResumeData) => void;
}

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      resume: initialSampleResume,
      activeSection: "personal",
      zoomLevel: 100,
      previewTab: "edit",

      setActiveSection: (section) => set({ activeSection: section }),
      setZoomLevel: (zoom) => set({ zoomLevel: zoom }),
      setPreviewTab: (tab) => set({ previewTab: tab }),

      updatePersonalInfo: (info) =>
        set((state) => ({
          resume: {
            ...state.resume,
            personalInfo: { ...state.resume.personalInfo, ...info },
          },
        })),

      // Experiences
      addExperience: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            experiences: [
              ...state.resume.experiences,
              {
                id: `exp-${Date.now()}`,
                company: "",
                position: "",
                location: "",
                startDate: "",
                endDate: "",
                current: false,
                bulletPoints: [""],
              },
            ],
          },
        })),

      updateExperience: (id, exp) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experiences: state.resume.experiences.map((item) =>
              item.id === id ? { ...item, ...exp } : item
            ),
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experiences: state.resume.experiences.filter((item) => item.id !== id),
          },
        })),

      addBulletPoint: (expId) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experiences: state.resume.experiences.map((item) =>
              item.id === expId
                ? { ...item, bulletPoints: [...item.bulletPoints, ""] }
                : item
            ),
          },
        })),

      updateBulletPoint: (expId, index, text) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experiences: state.resume.experiences.map((item) => {
              if (item.id !== expId) return item;
              const newPoints = [...item.bulletPoints];
              newPoints[index] = text;
              return { ...item, bulletPoints: newPoints };
            }),
          },
        })),

      removeBulletPoint: (expId, index) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experiences: state.resume.experiences.map((item) => {
              if (item.id !== expId) return item;
              return {
                ...item,
                bulletPoints: item.bulletPoints.filter((_, i) => i !== index),
              };
            }),
          },
        })),

      // Educations
      addEducation: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            educations: [
              ...state.resume.educations,
              {
                id: `edu-${Date.now()}`,
                institution: "",
                degree: "",
                fieldOfStudy: "",
                startDate: "",
                endDate: "",
                current: false,
                gpaOrHonors: "",
                description: "",
              },
            ],
          },
        })),

      updateEducation: (id, edu) =>
        set((state) => ({
          resume: {
            ...state.resume,
            educations: state.resume.educations.map((item) =>
              item.id === id ? { ...item, ...edu } : item
            ),
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            educations: state.resume.educations.filter((item) => item.id !== id),
          },
        })),

      // Skills
      addSkillCategory: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            skillCategories: [
              ...state.resume.skillCategories,
              {
                id: `cat-${Date.now()}`,
                name: "New Skill Group",
                skills: [],
              },
            ],
          },
        })),

      updateSkillCategory: (id, category) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skillCategories: state.resume.skillCategories.map((item) =>
              item.id === id ? { ...item, ...category } : item
            ),
          },
        })),

      removeSkillCategory: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skillCategories: state.resume.skillCategories.filter(
              (item) => item.id !== id
            ),
          },
        })),

      addSkillToCategory: (categoryId, skill) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skillCategories: state.resume.skillCategories.map((item) => {
              if (item.id !== categoryId) return item;
              if (item.skills.includes(skill.trim())) return item;
              return { ...item, skills: [...item.skills, skill.trim()] };
            }),
          },
        })),

      removeSkillFromCategory: (categoryId, skillIndex) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skillCategories: state.resume.skillCategories.map((item) => {
              if (item.id !== categoryId) return item;
              return {
                ...item,
                skills: item.skills.filter((_, i) => i !== skillIndex),
              };
            }),
          },
        })),

      // Projects
      addProject: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: [
              ...state.resume.projects,
              {
                id: `proj-${Date.now()}`,
                name: "",
                description: "",
                technologies: [],
                liveUrl: "",
                githubUrl: "",
                startDate: "",
                endDate: "",
              },
            ],
          },
        })),

      updateProject: (id, project) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.map((item) =>
              item.id === id ? { ...item, ...project } : item
            ),
          },
        })),

      removeProject: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.filter((item) => item.id !== id),
          },
        })),

      // Certifications
      addCertification: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            certifications: [
              ...state.resume.certifications,
              {
                id: `cert-${Date.now()}`,
                name: "",
                issuer: "",
                date: "",
                url: "",
              },
            ],
          },
        })),

      updateCertification: (id, cert) =>
        set((state) => ({
          resume: {
            ...state.resume,
            certifications: state.resume.certifications.map((item) =>
              item.id === id ? { ...item, ...cert } : item
            ),
          },
        })),

      removeCertification: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            certifications: state.resume.certifications.filter(
              (item) => item.id !== id
            ),
          },
        })),

      // Custom Sections
      addCustomSection: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            customSections: [
              ...state.resume.customSections,
              {
                id: `cust-${Date.now()}`,
                heading: "Additional Information",
                items: [
                  {
                    id: `item-${Date.now()}`,
                    title: "",
                    subtitle: "",
                    date: "",
                    description: "",
                  },
                ],
              },
            ],
          },
        })),

      updateCustomSection: (id, section) =>
        set((state) => ({
          resume: {
            ...state.resume,
            customSections: state.resume.customSections.map((item) =>
              item.id === id ? { ...item, ...section } : item
            ),
          },
        })),

      removeCustomSection: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            customSections: state.resume.customSections.filter(
              (item) => item.id !== id
            ),
          },
        })),

      addCustomSectionItem: (sectionId) =>
        set((state) => ({
          resume: {
            ...state.resume,
            customSections: state.resume.customSections.map((sec) =>
              sec.id === sectionId
                ? {
                    ...sec,
                    items: [
                      ...sec.items,
                      {
                        id: `item-${Date.now()}`,
                        title: "",
                        subtitle: "",
                        date: "",
                        description: "",
                      },
                    ],
                  }
                : sec
            ),
          },
        })),

      updateCustomSectionItem: (sectionId, itemId, item) =>
        set((state) => ({
          resume: {
            ...state.resume,
            customSections: state.resume.customSections.map((sec) =>
              sec.id === sectionId
                ? {
                    ...sec,
                    items: sec.items.map((it) =>
                      it.id === itemId ? { ...it, ...item } : it
                    ),
                  }
                : sec
            ),
          },
        })),

      removeCustomSectionItem: (sectionId, itemId) =>
        set((state) => ({
          resume: {
            ...state.resume,
            customSections: state.resume.customSections.map((sec) =>
              sec.id === sectionId
                ? {
                    ...sec,
                    items: sec.items.filter((it) => it.id !== itemId),
                  }
                : sec
            ),
          },
        })),

      // Styling
      updateStyling: (styling) =>
        set((state) => ({
          resume: {
            ...state.resume,
            styling: { ...state.resume.styling, ...styling },
          },
        })),

      setTemplate: (template) =>
        set((state) => ({
          resume: {
            ...state.resume,
            styling: { ...state.resume.styling, template },
          },
        })),

      setPrimaryColor: (color) =>
        set((state) => ({
          resume: {
            ...state.resume,
            styling: { ...state.resume.styling, primaryColor: color },
          },
        })),

      setFontFamily: (font) =>
        set((state) => ({
          resume: {
            ...state.resume,
            styling: { ...state.resume.styling, fontFamily: font },
          },
        })),

      // Global Actions
      loadSampleData: () => set({ resume: initialSampleResume }),
      clearResume: () => set({ resume: emptyResume }),
      importResume: (data) => set({ resume: data }),
    }),
    {
      name: "pro-resume-builder-storage-v1",
    }
  )
);
