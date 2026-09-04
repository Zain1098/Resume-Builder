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
  BookOpen,
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
import { PublicationsForm } from "./PublicationsForm";
import { CustomSectionForm } from "./CustomSectionForm";
import { StyleCustomizer } from "./StyleCustomizer";

const CANONICAL_SECTIONS = [
  "personal",
  "experience",
  "skills",
  "education",
  "projects",
  "certifications",
  "languages",
  "awards",
  "volunteer",
  "publications",
  "custom",
];

export function EditorPanel() {
  const { resume, toggleSectionVisibility, reorderSections, activeSection } = useResumeStore();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    styling: false,
    personal: true,
    experience: true,
    skills: true,
    education: true,
    projects: true,
    certifications: true,
    languages: true,
    awards: false,
    volunteer: false,
    publications: false,
    custom: false,
  });

  React.useEffect(() => {
    if (activeSection) {
      setOpenSections((prev) => ({ ...prev, [activeSection]: true }));
      const el = document.getElementById(activeSection);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [activeSection]);

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleExpandAll = () => {
    const allOpen: { [key: string]: boolean } = { styling: true };
    CANONICAL_SECTIONS.forEach((key) => {
      allOpen[key] = true;
    });
    setOpenSections(allOpen);
  };

  const handleCollapseAll = () => {
    const allClosed: { [key: string]: boolean } = { styling: false };
    CANONICAL_SECTIONS.forEach((key) => {
      allClosed[key] = false;
    });
    setOpenSections(allClosed);
  };

  const totalSkillsCount = resume.skillCategories.reduce(
    (acc, cat) => acc + cat.skills.length,
    0
  );

  // Compute active order
  const currentOrder = resume.sectionOrder && resume.sectionOrder.length > 0
    ? Array.from(new Set([...resume.sectionOrder.filter((s) => CANONICAL_SECTIONS.includes(s)), ...CANONICAL_SECTIONS]))
    : CANONICAL_SECTIONS;

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= currentOrder.length) return;
    const newOrder = [...currentOrder];
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(targetIdx, 0, moved);
    reorderSections(newOrder);
  };

  const renderSectionItem = (sectionKey: string, index: number) => {
    const isVisible = resume.sectionVisibility?.[sectionKey] !== false;
    const canMoveUp = index > 0;
    const canMoveDown = index < currentOrder.length - 1;

    switch (sectionKey) {
      case "personal":
        return (
          <AccordionSection
            key="personal"
            id="personal"
            title="Personal Information"
            subtitle="Name, contact details, role title & summary"
            icon={User}
            isOpen={Boolean(openSections.personal)}
            onToggle={() => toggleSection("personal")}
            isVisible={isVisible}
            onToggleVisibility={() => toggleSectionVisibility("personal")}
            onMoveUp={() => handleMove(index, "up")}
            onMoveDown={() => handleMove(index, "down")}
            canMoveUp={canMoveUp}
            canMoveDown={canMoveDown}
          >
            <PersonalInfoForm />
          </AccordionSection>
        );

      case "experience":
        return (
          <AccordionSection
            key="experience"
            id="experience"
            title="Work Experience"
            subtitle="Employment history & quantified achievements"
            icon={Briefcase}
            badgeCount={resume.experiences.length}
            isOpen={Boolean(openSections.experience)}
            onToggle={() => toggleSection("experience")}
            isVisible={isVisible}
            onToggleVisibility={() => toggleSectionVisibility("experience")}
            onMoveUp={() => handleMove(index, "up")}
            onMoveDown={() => handleMove(index, "down")}
            canMoveUp={canMoveUp}
            canMoveDown={canMoveDown}
          >
            <ExperienceForm />
          </AccordionSection>
        );

      case "skills":
        return (
          <AccordionSection
            key="skills"
            id="skills"
            title="Skills & Technologies"
            subtitle="Languages, frameworks, tools & competencies"
            icon={Sparkles}
            badgeCount={totalSkillsCount}
            isOpen={Boolean(openSections.skills)}
            onToggle={() => toggleSection("skills")}
            isVisible={isVisible}
            onToggleVisibility={() => toggleSectionVisibility("skills")}
            onMoveUp={() => handleMove(index, "up")}
            onMoveDown={() => handleMove(index, "down")}
            canMoveUp={canMoveUp}
            canMoveDown={canMoveDown}
          >
            <SkillsForm />
          </AccordionSection>
        );

      case "education":
        return (
          <AccordionSection
            key="education"
            id="education"
            title="Education"
            subtitle="Degrees, universities, honors & GPA"
            icon={GraduationCap}
            badgeCount={resume.educations.length}
            isOpen={Boolean(openSections.education)}
            onToggle={() => toggleSection("education")}
            isVisible={isVisible}
            onToggleVisibility={() => toggleSectionVisibility("education")}
            onMoveUp={() => handleMove(index, "up")}
            onMoveDown={() => handleMove(index, "down")}
            canMoveUp={canMoveUp}
            canMoveDown={canMoveDown}
          >
            <EducationForm />
          </AccordionSection>
        );

      case "projects":
        return (
          <AccordionSection
            key="projects"
            id="projects"
            title="Projects & Portfolio"
            subtitle="Side projects, live demos & repositories"
            icon={FolderGit2}
            badgeCount={resume.projects.length}
            isOpen={Boolean(openSections.projects)}
            onToggle={() => toggleSection("projects")}
            isVisible={isVisible}
            onToggleVisibility={() => toggleSectionVisibility("projects")}
            onMoveUp={() => handleMove(index, "up")}
            onMoveDown={() => handleMove(index, "down")}
            canMoveUp={canMoveUp}
            canMoveDown={canMoveDown}
          >
            <ProjectsForm />
          </AccordionSection>
        );

      case "certifications":
        return (
          <AccordionSection
            key="certifications"
            id="certifications"
            title="Certifications & Credentials"
            subtitle="Professional licenses, cloud certs & credentials"
            icon={Award}
            badgeCount={resume.certifications.length}
            isOpen={Boolean(openSections.certifications)}
            onToggle={() => toggleSection("certifications")}
            isVisible={isVisible}
            onToggleVisibility={() => toggleSectionVisibility("certifications")}
            onMoveUp={() => handleMove(index, "up")}
            onMoveDown={() => handleMove(index, "down")}
            canMoveUp={canMoveUp}
            canMoveDown={canMoveDown}
          >
            <CertificationsForm />
          </AccordionSection>
        );

      case "languages":
        return (
          <AccordionSection
            key="languages"
            id="languages"
            title="Languages & Fluency"
            subtitle="Spoken and written language proficiencies"
            icon={Globe}
            badgeCount={resume.languages?.length || 0}
            isOpen={Boolean(openSections.languages)}
            onToggle={() => toggleSection("languages")}
            isVisible={isVisible}
            onToggleVisibility={() => toggleSectionVisibility("languages")}
            onMoveUp={() => handleMove(index, "up")}
            onMoveDown={() => handleMove(index, "down")}
            canMoveUp={canMoveUp}
            canMoveDown={canMoveDown}
          >
            <LanguagesForm />
          </AccordionSection>
        );

      case "awards":
        return (
          <AccordionSection
            key="awards"
            id="awards"
            title="Honors & Awards"
            subtitle="Competitions, scholarships, hackathons & recognition"
            icon={Award}
            badgeCount={resume.awards?.length || 0}
            isOpen={Boolean(openSections.awards)}
            onToggle={() => toggleSection("awards")}
            isVisible={isVisible}
            onToggleVisibility={() => toggleSectionVisibility("awards")}
            onMoveUp={() => handleMove(index, "up")}
            onMoveDown={() => handleMove(index, "down")}
            canMoveUp={canMoveUp}
            canMoveDown={canMoveDown}
          >
            <AwardsForm />
          </AccordionSection>
        );

      case "volunteer":
        return (
          <AccordionSection
            key="volunteer"
            id="volunteer"
            title="Volunteering & Community"
            subtitle="Non-profit, mentorship & leadership initiatives"
            icon={Heart}
            badgeCount={resume.volunteer?.length || 0}
            isOpen={Boolean(openSections.volunteer)}
            onToggle={() => toggleSection("volunteer")}
            isVisible={isVisible}
            onToggleVisibility={() => toggleSectionVisibility("volunteer")}
            onMoveUp={() => handleMove(index, "up")}
            onMoveDown={() => handleMove(index, "down")}
            canMoveUp={canMoveUp}
            canMoveDown={canMoveDown}
          >
            <VolunteerForm />
          </AccordionSection>
        );

      case "publications":
        return (
          <AccordionSection
            key="publications"
            id="publications"
            title="Publications & Research"
            subtitle="Research papers, patents, journal articles & citations"
            icon={BookOpen}
            badgeCount={resume.publications?.length || 0}
            isOpen={Boolean(openSections.publications)}
            onToggle={() => toggleSection("publications")}
            isVisible={isVisible}
            onToggleVisibility={() => toggleSectionVisibility("publications")}
            onMoveUp={() => handleMove(index, "up")}
            onMoveDown={() => handleMove(index, "down")}
            canMoveUp={canMoveUp}
            canMoveDown={canMoveDown}
          >
            <PublicationsForm />
          </AccordionSection>
        );

      case "custom":
        return (
          <AccordionSection
            key="custom"
            id="custom"
            title="Custom Sections"
            subtitle="Speaking engagements, interests, patents, etc."
            icon={Layers}
            badgeCount={resume.customSections.length}
            isOpen={Boolean(openSections.custom)}
            onToggle={() => toggleSection("custom")}
            isVisible={isVisible}
            onToggleVisibility={() => toggleSectionVisibility("custom")}
            onMoveUp={() => handleMove(index, "up")}
            onMoveDown={() => handleMove(index, "down")}
            canMoveUp={canMoveUp}
            canMoveDown={canMoveDown}
          >
            <CustomSectionForm />
          </AccordionSection>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-full flex-col space-y-4 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
      {/* ATS Analyzer Gauge Card */}
      <AtsScoreCard />

      {/* Templates & Styling (Always top utility) */}
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

      {/* Quick Section Controls Bar */}
      <div className="flex items-center justify-between px-1 text-xs pt-1 pb-0.5">
        <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
          Resume Content Sections ({currentOrder.length})
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExpandAll}
            className="text-[11px] font-semibold text-primary hover:underline transition"
          >
            Expand All
          </button>
          <span className="text-border-default">|</span>
          <button
            type="button"
            onClick={handleCollapseAll}
            className="text-[11px] font-medium text-text-muted hover:text-text-primary hover:underline transition"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Dynamic Ordered Resume Content Sections */}
      {currentOrder.map((sectionKey, index) => renderSectionItem(sectionKey, index))}
    </div>
  );
}
