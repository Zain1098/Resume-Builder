"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import {
  User,
  Briefcase,
  GraduationCap,
  Sparkles,
  FolderGit2,
  Award,
  Layers,
  Palette,
  Globe,
  Heart,
} from "lucide-react";
import { AccordionSection } from "./AccordionSection";
import { AtsScoreCard } from "./AtsScoreCard";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { ExperienceForm } from "./ExperienceForm";
import { EducationForm } from "./EducationForm";
import { SkillsForm } from "./SkillsForm";
import { ProjectsForm } from "./ProjectsForm";
import { CertificationsForm } from "./CertificationsForm";
import { LanguagesForm } from "./LanguagesForm";
import { AwardsForm } from "./AwardsForm";
import { VolunteerForm } from "./VolunteerForm";
import { CustomSectionForm } from "./CustomSectionForm";
import { StyleCustomizer } from "./StyleCustomizer";

export function EditorPanel() {
  const { resume } = useResumeStore();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    styling: false,
    personal: true,
    experience: true,
    skills: true,
    education: false,
    projects: false,
    certifications: false,
    languages: false,
    awards: false,
    volunteer: false,
    custom: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const totalSkillsCount = resume.skillCategories.reduce(
    (acc, cat) => acc + cat.skills.length,
    0
  );

  return (
    <div className="flex h-full flex-col space-y-4 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
      {/* ATS Analyzer Gauge Card */}
      <AtsScoreCard />

      {/* 1. Design & Templates Customizer */}
      <AccordionSection
        id="styling"
        title="Templates & Styling"
        subtitle="Choose from 6 ATS templates, paper size & accents"
        icon={Palette}
        isOpen={Boolean(openSections.styling)}
        onToggle={() => toggleSection("styling")}
      >
        <StyleCustomizer />
      </AccordionSection>

      {/* 2. Personal Information */}
      <AccordionSection
        id="personal"
        title="Personal Information"
        subtitle="Name, contact details, role title & summary"
        icon={User}
        isOpen={Boolean(openSections.personal)}
        onToggle={() => toggleSection("personal")}
      >
        <PersonalInfoForm />
      </AccordionSection>

      {/* 3. Work Experience */}
      <AccordionSection
        id="experience"
        title="Work Experience"
        subtitle="Employment history & quantified achievements"
        icon={Briefcase}
        badgeCount={resume.experiences.length}
        isOpen={Boolean(openSections.experience)}
        onToggle={() => toggleSection("experience")}
      >
        <ExperienceForm />
      </AccordionSection>

      {/* 4. Skills & Competencies */}
      <AccordionSection
        id="skills"
        title="Skills & Technologies"
        subtitle="Languages, frameworks, tools & competencies"
        icon={Sparkles}
        badgeCount={totalSkillsCount}
        isOpen={Boolean(openSections.skills)}
        onToggle={() => toggleSection("skills")}
      >
        <SkillsForm />
      </AccordionSection>

      {/* 5. Education */}
      <AccordionSection
        id="education"
        title="Education"
        subtitle="Degrees, universities, honors & GPA"
        icon={GraduationCap}
        badgeCount={resume.educations.length}
        isOpen={Boolean(openSections.education)}
        onToggle={() => toggleSection("education")}
      >
        <EducationForm />
      </AccordionSection>

      {/* 6. Projects */}
      <AccordionSection
        id="projects"
        title="Projects & Portfolio"
        subtitle="Side projects, live demos & repositories"
        icon={FolderGit2}
        badgeCount={resume.projects.length}
        isOpen={Boolean(openSections.projects)}
        onToggle={() => toggleSection("projects")}
      >
        <ProjectsForm />
      </AccordionSection>

      {/* 7. Certifications */}
      <AccordionSection
        id="certifications"
        title="Certifications & Credentials"
        subtitle="Professional licenses, cloud certs & credentials"
        icon={Award}
        badgeCount={resume.certifications.length}
        isOpen={Boolean(openSections.certifications)}
        onToggle={() => toggleSection("certifications")}
      >
        <CertificationsForm />
      </AccordionSection>

      {/* 8. Languages */}
      <AccordionSection
        id="languages"
        title="Languages & Fluency"
        subtitle="Spoken and written language proficiencies"
        icon={Globe}
        badgeCount={resume.languages?.length || 0}
        isOpen={Boolean(openSections.languages)}
        onToggle={() => toggleSection("languages")}
      >
        <LanguagesForm />
      </AccordionSection>

      {/* 9. Awards & Honors */}
      <AccordionSection
        id="awards"
        title="Honors & Awards"
        subtitle="Competitions, scholarships, hackathons & recognition"
        icon={Award}
        badgeCount={resume.awards?.length || 0}
        isOpen={Boolean(openSections.awards)}
        onToggle={() => toggleSection("awards")}
      >
        <AwardsForm />
      </AccordionSection>

      {/* 10. Volunteer & Community */}
      <AccordionSection
        id="volunteer"
        title="Volunteering & Community"
        subtitle="Non-profit, mentorship & leadership initiatives"
        icon={Heart}
        badgeCount={resume.volunteer?.length || 0}
        isOpen={Boolean(openSections.volunteer)}
        onToggle={() => toggleSection("volunteer")}
      >
        <VolunteerForm />
      </AccordionSection>

      {/* 11. Custom Sections */}
      <AccordionSection
        id="custom"
        title="Custom Sections"
        subtitle="Publications, patents, speaking engagements"
        icon={Layers}
        badgeCount={resume.customSections.length}
        isOpen={Boolean(openSections.custom)}
        onToggle={() => toggleSection("custom")}
      >
        <CustomSectionForm />
      </AccordionSection>
    </div>
  );
}
