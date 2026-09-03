"use client";

import React from "react";
import { ResumeData } from "@/types/resume";
import { ModernTemplate } from "./templates/ModernTemplate";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { MinimalistTemplate } from "./templates/MinimalistTemplate";
import { TechTemplate } from "./templates/TechTemplate";
import { ExecutiveTemplate } from "./templates/ExecutiveTemplate";
import { StudentTemplate } from "./templates/StudentTemplate";

interface TemplateRendererProps {
  data: ResumeData;
}

export function TemplateRenderer({ data }: TemplateRendererProps) {
  const template = data.styling?.template || "modern";

  switch (template) {
    case "classic":
      return <ClassicTemplate data={data} />;
    case "minimalist":
      return <MinimalistTemplate data={data} />;
    case "tech":
      return <TechTemplate data={data} />;
    case "executive":
      return <ExecutiveTemplate data={data} />;
    case "student":
      return <StudentTemplate data={data} />;
    case "modern":
    default:
      return <ModernTemplate data={data} />;
  }
}
