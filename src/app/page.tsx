"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/common/Navbar";
import { EditorPanel } from "@/components/editor/EditorPanel";
import { PreviewPanel } from "@/components/preview/PreviewPanel";
import { useResumeStore } from "@/store/useResumeStore";

export default function Home() {
  const { previewTab } = useResumeStore();
  const [isMounted, setIsMounted] = useState(false);

  // Prevent SSR hydration mismatches with localStorage
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
          <p className="text-xs font-semibold text-slate-500">
            Loading CareerCraft Studio...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      {/* Top Bar Header */}
      <Navbar />

      {/* Main Split-Screen Workspace */}
      <main className="flex flex-1 overflow-hidden h-[calc(100vh-4rem)]">
        {/* Left Side: Dynamic Editor Form Panel */}
        <section
          id="editor-panel-section"
          className={`w-full lg:w-1/2 lg:border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 ${
            previewTab === "preview" ? "hidden lg:flex" : "flex"
          } flex-col h-full`}
        >
          <EditorPanel />
        </section>

        {/* Right Side: High-Fidelity Live A4 Preview */}
        <section
          id="resume-preview-container"
          className={`w-full lg:w-1/2 ${
            previewTab === "edit" ? "hidden lg:flex" : "flex"
          } flex-col h-full overflow-hidden`}
        >
          <PreviewPanel />
        </section>
      </main>
    </div>
  );
}
