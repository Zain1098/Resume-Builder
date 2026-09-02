"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { TemplateRenderer } from "./TemplateRenderer";
import { ZoomIn, ZoomOut, Maximize2, Layout, Eye, EyeOff } from "lucide-react";
import { TemplateType } from "@/types/resume";

export function PreviewPanel() {
  const { resume, zoomLevel, setZoomLevel, setTemplate } = useResumeStore();
  const [showPageGuide, setShowPageGuide] = useState(true);

  const handleZoomIn = () => {
    if (zoomLevel < 150) setZoomLevel(zoomLevel + 10);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 50) setZoomLevel(zoomLevel - 10);
  };

  const handleResetZoom = () => {
    setZoomLevel(100);
  };

  return (
    <div className="flex h-full flex-col bg-slate-100/80 dark:bg-slate-950 print:bg-white print:p-0">
      {/* Preview Action & Zoom Bar (Hidden in Print) */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-2.5 shadow-sm dark:border-slate-800 dark:bg-slate-900 print:hidden">
        {/* Template Quick Select */}
        <div className="flex items-center gap-2">
          <Layout className="h-4 w-4 text-slate-500" />
          <select
            value={resume.styling.template}
            onChange={(e) => setTemplate(e.target.value as TemplateType)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="modern">Modern Pro (2-Col)</option>
            <option value="classic">Harvard Classic (Serif)</option>
            <option value="minimalist">Minimalist Executive</option>
            <option value="tech">Developer Tech Stack</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {/* Page Break Guide Toggle */}
          <button
            type="button"
            onClick={() => setShowPageGuide(!showPageGuide)}
            title="Toggle Visual A4 1-Page Boundary Line"
            className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition ${
              showPageGuide
                ? "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-850 dark:text-slate-400"
            }`}
          >
            {showPageGuide ? (
              <>
                <Eye className="h-3.5 w-3.5 text-blue-600" />
                <span className="hidden sm:inline">Page 1 Guide: ON</span>
              </>
            ) : (
              <>
                <EyeOff className="h-3.5 w-3.5 text-slate-400" />
                <span className="hidden sm:inline">Page Guide: OFF</span>
              </>
            )}
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-850">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 50}
              title="Zoom Out"
              className="rounded p-1 text-slate-600 hover:bg-white hover:text-slate-900 disabled:opacity-30 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="px-1 font-mono text-xs font-semibold text-slate-700 dark:text-slate-300 min-w-[38px] text-center">
              {zoomLevel}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 150}
              title="Zoom In"
              className="rounded p-1 text-slate-600 hover:bg-white hover:text-slate-900 disabled:opacity-30 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              title="Reset Zoom (100%)"
              className="rounded p-1 text-slate-600 hover:bg-white hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* A4 Canvas Viewport */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-start justify-center custom-scrollbar print:p-0 print:overflow-visible">
        <div
          id="resume-print-canvas"
          className="resume-a4-page relative transition-transform duration-150 origin-top shadow-xl rounded-lg overflow-hidden print:shadow-none print:rounded-none print:transform-none"
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: "top center",
            width: "210mm",
            minHeight: "297mm",
          }}
        >
          {/* Visual Page Break Marker (At 297mm height) */}
          {showPageGuide && (
            <div
              className="absolute left-0 right-0 z-20 pointer-events-none flex items-center justify-end pr-3 border-b-2 border-dashed border-rose-400/80 print:hidden"
              style={{ top: "297mm" }}
            >
              <span className="bg-rose-500 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                --- 1-Page A4 Cutoff Boundary ---
              </span>
            </div>
          )}

          <TemplateRenderer data={resume} />
        </div>
      </div>
    </div>
  );
}
