import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ResumeData,
  ResumeDocument,
  PersonalInfo,
  Experience,
  Education,
  SkillCategory,
  Project,
  Certification,
  LanguageItem,
  VolunteerExperience,
  Publication,
  AwardItem,
  CustomSection,
  ResumeStyling,
  TemplateType,
  FontFamilyType,
  PaperSize,
  JobAnalysis,
} from "@/types/resume";
import { calculateAtsScore } from "@/lib/atsScoring";

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
      gpaOrHonors: "3.85 GPA • Magna Cum Laude",
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
  languages: [
    { id: "lang-1", language: "English", proficiency: "Native" },
    { id: "lang-2", language: "Spanish", proficiency: "Professional" },
  ],
  volunteer: [],
  publications: [],
  awards: [],
  customSections: [],
  styling: {
    template: "modern",
    primaryColor: "#2563eb",
    fontFamily: "sans",
    fontSize: "normal",
    lineSpacing: "normal",
    sectionSpacing: "normal",
    paperSize: "a4",
    showPhoto: false,
  },
  sectionVisibility: {
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
  },
  sectionOrder: [
    "personal",
    "summary",
    "experience",
    "skills",
    "education",
    "projects",
    "certifications",
    "languages",
    "custom",
  ],
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
  languages: [],
  volunteer: [],
  publications: [],
  awards: [],
  customSections: [],
  styling: {
    template: "modern",
    primaryColor: "#2563eb",
    fontFamily: "sans",
    fontSize: "normal",
    lineSpacing: "normal",
    sectionSpacing: "normal",
    paperSize: "a4",
    showPhoto: false,
  },
  sectionVisibility: {
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
  },
};

const defaultInitialDocument: ResumeDocument = {
  id: "master-resume-1",
  title: "Master Career Profile",
  targetRole: "Senior Full Stack Software Engineer",
  isMaster: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  atsScore: 92,
  data: initialSampleResume,
};

interface ResumeState {
  resumes: ResumeDocument[];
  activeResumeId: string;
  masterResumeId: string;
  activeSection: string;
  zoomLevel: number;
  previewTab: "edit" | "preview";
  recentJobAnalyses: JobAnalysis[];

  // Resume Document Management
  createResume: (title: string, targetRole: string, copyFromMaster?: boolean) => string;
  createResumeFromData: (title: string, targetRole: string, data: ResumeData) => string;
  duplicateResume: (id: string) => string;
  renameResume: (id: string, newTitle: string, newTargetRole?: string) => void;
  deleteResume: (id: string) => void;
  setMasterResume: (id: string) => void;
  switchResume: (id: string) => void;
  createTailoredResume: (jobAnalysis: JobAnalysis, tailoredData: ResumeData) => string;

  // Active Resume Accessor
  getActiveResume: () => ResumeDocument;
  resume: ResumeData;

  // UI state
  setActiveSection: (section: string) => void;
  setZoomLevel: (zoom: number) => void;
  setPreviewTab: (tab: "edit" | "preview") => void;
  toggleSectionVisibility: (sectionKey: string) => void;
  reorderSections: (newOrder: string[]) => void;

  // Active Resume Modifiers
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

  // Languages
  addLanguage: () => void;
  updateLanguage: (id: string, lang: Partial<LanguageItem>) => void;
  removeLanguage: (id: string) => void;

  // Volunteer
  addVolunteer: () => void;
  updateVolunteer: (id: string, vol: Partial<VolunteerExperience>) => void;
  removeVolunteer: (id: string) => void;

  // Publications
  addPublication: () => void;
  updatePublication: (id: string, pub: Partial<Publication>) => void;
  removePublication: (id: string) => void;

  // Awards
  addAward: () => void;
  updateAward: (id: string, awd: Partial<AwardItem>) => void;
  removeAward: (id: string) => void;

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
  setPaperSize: (size: PaperSize) => void;

  // Global Actions
  loadSampleData: () => void;
  clearResume: () => void;
  importResume: (data: ResumeData) => void;
  saveJobAnalysis: (analysis: JobAnalysis) => void;
}

// Helper to mutate active resume data and recalculate score
function updateActiveDoc(
  state: ResumeState,
  modifier: (data: ResumeData) => ResumeData
): Partial<ResumeState> {
  const activeId = state.activeResumeId;
  const currentDoc = state.resumes.find((r) => r.id === activeId) || state.resumes[0];
  if (!currentDoc) return {};

  const updatedData = modifier(currentDoc.data);
  const newScore = calculateAtsScore(updatedData).overallScore;

  const updatedResumes = state.resumes.map((doc) =>
    doc.id === activeId
      ? {
          ...doc,
          data: updatedData,
          atsScore: newScore,
          updatedAt: new Date().toISOString(),
        }
      : doc
  );

  return {
    resumes: updatedResumes,
    resume: updatedData,
  };
}

export const useResumeStore = create<ResumeState>()(
  persist(
    (set, get) => ({
      resumes: [defaultInitialDocument],
      activeResumeId: "master-resume-1",
      masterResumeId: "master-resume-1",
      resume: initialSampleResume,
      activeSection: "personal",
      zoomLevel: 100,
      previewTab: "edit",
      recentJobAnalyses: [],

      getActiveResume: () => {
        const state = get();
        return (
          state.resumes.find((r) => r.id === state.activeResumeId) ||
          state.resumes[0] ||
          defaultInitialDocument
        );
      },

      createResume: (title, targetRole, copyFromMaster = true) => {
        const state = get();
        const masterDoc =
          state.resumes.find((r) => r.id === state.masterResumeId) ||
          state.resumes[0];
        const baseData =
          copyFromMaster && masterDoc
            ? JSON.parse(JSON.stringify(masterDoc.data))
            : emptyResume;

        if (targetRole) {
          baseData.personalInfo.jobTitle = targetRole;
        }

        const newId = `resume-${Date.now()}`;
        const newDoc: ResumeDocument = {
          id: newId,
          title: title.trim() || "Untitled Resume",
          targetRole: targetRole.trim() || baseData.personalInfo.jobTitle || "General",
          isMaster: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          atsScore: calculateAtsScore(baseData).overallScore,
          data: baseData,
        };

        set({
          resumes: [newDoc, ...state.resumes],
          activeResumeId: newId,
          resume: baseData,
        });

        return newId;
      },

      createResumeFromData: (title, targetRole, data) => {
        const state = get();
        const clonedData: ResumeData = JSON.parse(JSON.stringify(data));
        if (targetRole) {
          clonedData.personalInfo.jobTitle = targetRole;
        }

        const newId = `resume-${Date.now()}`;
        const newDoc: ResumeDocument = {
          id: newId,
          title: title.trim() || "Imported Resume",
          targetRole: targetRole.trim() || clonedData.personalInfo.jobTitle || "General",
          isMaster: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          atsScore: calculateAtsScore(clonedData).overallScore,
          data: clonedData,
        };

        set({
          resumes: [newDoc, ...state.resumes],
          activeResumeId: newId,
          resume: clonedData,
        });

        return newId;
      },

      duplicateResume: (id) => {
        const state = get();
        const target = state.resumes.find((r) => r.id === id);
        if (!target) return "";

        const copyData = JSON.parse(JSON.stringify(target.data));
        const newId = `resume-${Date.now()}`;
        const duplicated: ResumeDocument = {
          id: newId,
          title: `${target.title} (Copy)`,
          targetRole: target.targetRole,
          isMaster: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          atsScore: target.atsScore,
          data: copyData,
        };

        set({
          resumes: [duplicated, ...state.resumes],
          activeResumeId: newId,
          resume: copyData,
        });

        return newId;
      },

      renameResume: (id, newTitle, newTargetRole) => {
        set((state) => ({
          resumes: state.resumes.map((r) =>
            r.id === id
              ? {
                  ...r,
                  title: newTitle.trim() || r.title,
                  targetRole: newTargetRole?.trim() || r.targetRole,
                  updatedAt: new Date().toISOString(),
                }
              : r
          ),
        }));
      },

      deleteResume: (id) => {
        const state = get();
        if (state.resumes.length <= 1) return; // Prevent deleting the last remaining resume

        const remaining = state.resumes.filter((r) => r.id !== id);
        let nextActiveId = state.activeResumeId;
        if (state.activeResumeId === id) {
          nextActiveId = remaining[0].id;
        }

        let nextMasterId = state.masterResumeId;
        if (state.masterResumeId === id) {
          remaining[0].isMaster = true;
          nextMasterId = remaining[0].id;
        }

        const nextActiveDoc = remaining.find((r) => r.id === nextActiveId) || remaining[0];

        set({
          resumes: remaining,
          activeResumeId: nextActiveId,
          masterResumeId: nextMasterId,
          resume: nextActiveDoc.data,
        });
      },

      setMasterResume: (id) => {
        set((state) => ({
          masterResumeId: id,
          resumes: state.resumes.map((r) => ({
            ...r,
            isMaster: r.id === id,
          })),
        }));
      },

      switchResume: (id) => {
        const state = get();
        const doc = state.resumes.find((r) => r.id === id);
        if (doc) {
          set({
            activeResumeId: id,
            resume: doc.data,
          });
        }
      },

      createTailoredResume: (jobAnalysis, tailoredData) => {
        const state = get();
        const newId = `tailored-${Date.now()}`;
        const score = calculateAtsScore(tailoredData, jobAnalysis.keywords).overallScore;

        const newDoc: ResumeDocument = {
          id: newId,
          title: `Tailored: ${jobAnalysis.title} ${jobAnalysis.company ? `@ ${jobAnalysis.company}` : ""}`.trim(),
          targetRole: jobAnalysis.title,
          isMaster: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          atsScore: score,
          data: tailoredData,
        };

        set({
          resumes: [newDoc, ...state.resumes],
          activeResumeId: newId,
          resume: tailoredData,
        });

        return newId;
      },

      setActiveSection: (section) => set({ activeSection: section }),
      setZoomLevel: (zoom) => set({ zoomLevel: zoom }),
      setPreviewTab: (tab) => set({ previewTab: tab }),

      toggleSectionVisibility: (sectionKey) => {
        set((state) =>
          updateActiveDoc(state, (data) => {
            const currentVis = data.sectionVisibility?.[sectionKey] !== false;
            return {
              ...data,
              sectionVisibility: {
                ...data.sectionVisibility,
                [sectionKey]: !currentVis,
              },
            };
          })
        );
      },

      reorderSections: (newOrder) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            sectionOrder: newOrder,
          }))
        );
      },

      updatePersonalInfo: (info) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            personalInfo: { ...data.personalInfo, ...info },
          }))
        );
      },

      // Experiences
      addExperience: () => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            experiences: [
              ...data.experiences,
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
          }))
        );
      },

      updateExperience: (id, exp) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            experiences: data.experiences.map((item) =>
              item.id === id ? { ...item, ...exp } : item
            ),
          }))
        );
      },

      removeExperience: (id) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            experiences: data.experiences.filter((item) => item.id !== id),
          }))
        );
      },

      addBulletPoint: (expId) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            experiences: data.experiences.map((item) =>
              item.id === expId
                ? { ...item, bulletPoints: [...item.bulletPoints, ""] }
                : item
            ),
          }))
        );
      },

      updateBulletPoint: (expId, index, text) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            experiences: data.experiences.map((item) => {
              if (item.id !== expId) return item;
              const newPoints = [...item.bulletPoints];
              newPoints[index] = text;
              return { ...item, bulletPoints: newPoints };
            }),
          }))
        );
      },

      removeBulletPoint: (expId, index) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            experiences: data.experiences.map((item) => {
              if (item.id !== expId) return item;
              return {
                ...item,
                bulletPoints: item.bulletPoints.filter((_, i) => i !== index),
              };
            }),
          }))
        );
      },

      // Educations
      addEducation: () => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            educations: [
              ...data.educations,
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
          }))
        );
      },

      updateEducation: (id, edu) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            educations: data.educations.map((item) =>
              item.id === id ? { ...item, ...edu } : item
            ),
          }))
        );
      },

      removeEducation: (id) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            educations: data.educations.filter((item) => item.id !== id),
          }))
        );
      },

      // Skills
      addSkillCategory: () => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            skillCategories: [
              ...data.skillCategories,
              {
                id: `cat-${Date.now()}`,
                name: "New Competency Group",
                skills: [],
              },
            ],
          }))
        );
      },

      updateSkillCategory: (id, category) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            skillCategories: data.skillCategories.map((item) =>
              item.id === id ? { ...item, ...category } : item
            ),
          }))
        );
      },

      removeSkillCategory: (id) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            skillCategories: data.skillCategories.filter((item) => item.id !== id),
          }))
        );
      },

      addSkillToCategory: (categoryId, skill) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            skillCategories: data.skillCategories.map((item) => {
              if (item.id !== categoryId) return item;
              if (item.skills.includes(skill.trim())) return item;
              return { ...item, skills: [...item.skills, skill.trim()] };
            }),
          }))
        );
      },

      removeSkillFromCategory: (categoryId, skillIndex) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            skillCategories: data.skillCategories.map((item) => {
              if (item.id !== categoryId) return item;
              return {
                ...item,
                skills: item.skills.filter((_, i) => i !== skillIndex),
              };
            }),
          }))
        );
      },

      // Projects
      addProject: () => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            projects: [
              ...data.projects,
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
          }))
        );
      },

      updateProject: (id, project) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            projects: data.projects.map((item) =>
              item.id === id ? { ...item, ...project } : item
            ),
          }))
        );
      },

      removeProject: (id) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            projects: data.projects.filter((item) => item.id !== id),
          }))
        );
      },

      // Certifications
      addCertification: () => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            certifications: [
              ...data.certifications,
              {
                id: `cert-${Date.now()}`,
                name: "",
                issuer: "",
                date: "",
                url: "",
              },
            ],
          }))
        );
      },

      updateCertification: (id, cert) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            certifications: data.certifications.map((item) =>
              item.id === id ? { ...item, ...cert } : item
            ),
          }))
        );
      },

      removeCertification: (id) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            certifications: data.certifications.filter((item) => item.id !== id),
          }))
        );
      },

      // Languages
      addLanguage: () => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            languages: [
              ...(data.languages || []),
              {
                id: `lang-${Date.now()}`,
                language: "",
                proficiency: "Professional",
              },
            ],
          }))
        );
      },

      updateLanguage: (id, lang) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            languages: (data.languages || []).map((l) =>
              l.id === id ? { ...l, ...lang } : l
            ),
          }))
        );
      },

      removeLanguage: (id) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            languages: (data.languages || []).filter((l) => l.id !== id),
          }))
        );
      },

      // Volunteer
      addVolunteer: () => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            volunteer: [
              ...(data.volunteer || []),
              {
                id: `vol-${Date.now()}`,
                organization: "",
                role: "",
                location: "",
                startDate: "",
                endDate: "",
                current: false,
                description: "",
              },
            ],
          }))
        );
      },

      updateVolunteer: (id, vol) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            volunteer: (data.volunteer || []).map((v) =>
              v.id === id ? { ...v, ...vol } : v
            ),
          }))
        );
      },

      removeVolunteer: (id) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            volunteer: (data.volunteer || []).filter((v) => v.id !== id),
          }))
        );
      },

      // Publications
      addPublication: () => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            publications: [
              ...(data.publications || []),
              {
                id: `pub-${Date.now()}`,
                title: "",
                publisher: "",
                date: "",
                description: "",
              },
            ],
          }))
        );
      },

      updatePublication: (id, pub) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            publications: (data.publications || []).map((p) =>
              p.id === id ? { ...p, ...pub } : p
            ),
          }))
        );
      },

      removePublication: (id) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            publications: (data.publications || []).filter((p) => p.id !== id),
          }))
        );
      },

      // Awards
      addAward: () => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            awards: [
              ...(data.awards || []),
              {
                id: `awd-${Date.now()}`,
                title: "",
                issuer: "",
                date: "",
                description: "",
              },
            ],
          }))
        );
      },

      updateAward: (id, awd) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            awards: (data.awards || []).map((a) =>
              a.id === id ? { ...a, ...awd } : a
            ),
          }))
        );
      },

      removeAward: (id) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            awards: (data.awards || []).filter((a) => a.id !== id),
          }))
        );
      },

      // Custom Sections
      addCustomSection: () => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            customSections: [
              ...data.customSections,
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
          }))
        );
      },

      updateCustomSection: (id, section) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            customSections: data.customSections.map((item) =>
              item.id === id ? { ...item, ...section } : item
            ),
          }))
        );
      },

      removeCustomSection: (id) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            customSections: data.customSections.filter((item) => item.id !== id),
          }))
        );
      },

      addCustomSectionItem: (sectionId) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            customSections: data.customSections.map((sec) =>
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
          }))
        );
      },

      updateCustomSectionItem: (sectionId, itemId, item) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            customSections: data.customSections.map((sec) =>
              sec.id === sectionId
                ? {
                    ...sec,
                    items: sec.items.map((it) =>
                      it.id === itemId ? { ...it, ...item } : it
                    ),
                  }
                : sec
            ),
          }))
        );
      },

      removeCustomSectionItem: (sectionId, itemId) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            customSections: data.customSections.map((sec) =>
              sec.id === sectionId
                ? {
                    ...sec,
                    items: sec.items.filter((it) => it.id !== itemId),
                  }
                : sec
            ),
          }))
        );
      },

      // Styling
      updateStyling: (styling) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            styling: { ...data.styling, ...styling },
          }))
        );
      },

      setTemplate: (template) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            styling: { ...data.styling, template },
          }))
        );
      },

      setPrimaryColor: (color) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            styling: { ...data.styling, primaryColor: color },
          }))
        );
      },

      setFontFamily: (font) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            styling: { ...data.styling, fontFamily: font },
          }))
        );
      },

      setPaperSize: (paperSize) => {
        set((state) =>
          updateActiveDoc(state, (data) => ({
            ...data,
            styling: { ...data.styling, paperSize },
          }))
        );
      },

      loadSampleData: () => {
        set((state) =>
          updateActiveDoc(state, () => JSON.parse(JSON.stringify(initialSampleResume)))
        );
      },

      clearResume: () => {
        set((state) =>
          updateActiveDoc(state, () => JSON.parse(JSON.stringify(emptyResume)))
        );
      },

      importResume: (data) => {
        set((state) =>
          updateActiveDoc(state, () => JSON.parse(JSON.stringify(data)))
        );
      },

      saveJobAnalysis: (analysis) => {
        set((state) => ({
          recentJobAnalyses: [
            analysis,
            ...state.recentJobAnalyses.filter((a) => a.id !== analysis.id).slice(0, 5),
          ],
        }));
      },
    }),
    {
      name: "pro-resume-builder-storage-v2",
      migrate: (persistedState: unknown) => {
        // Safe backward compatibility migration from v1 storage
        const state = persistedState as { resume?: ResumeData; resumes?: ResumeDocument[] };
        if (state && state.resume && (!state.resumes || state.resumes.length === 0)) {
          const legacyResume = state.resume;
          const score = calculateAtsScore(legacyResume).overallScore;
          const masterDoc: ResumeDocument = {
            id: "master-resume-migrated",
            title: "Master Profile",
            targetRole: legacyResume.personalInfo?.jobTitle || "Professional",
            isMaster: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            atsScore: score,
            data: legacyResume,
          };
          return {
            ...state,
            resumes: [masterDoc],
            activeResumeId: "master-resume-migrated",
            masterResumeId: "master-resume-migrated",
            resume: legacyResume,
          };
        }
        return persistedState;
      },
    }
  )
);
