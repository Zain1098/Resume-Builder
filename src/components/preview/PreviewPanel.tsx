"use client";

import React, { useState, useRef, useEffect } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { TemplateRenderer } from "./TemplateRenderer";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Layout,
  Eye,
  EyeOff,
  ChevronDown,
  Check,
  FileText,
  Smartphone,
} from "lucide-react";
import { TemplateType } from "@/types/resume";

const TEMPLATE_OPTIONS: { id: TemplateType; name: string; badge: string }[] = [
  { id: "modern", name: "Modern Pro", badge: "2-Col" },
  { id: "classic", name: "Harvard Classic", badge: "Serif" },
  { id: "minimalist", name: "Minimalist", badge: "Executive" },
  { id: "tech", name: "Developer Tech", badge: "Dev Stack" },
  { id: "executive", name: "Leadership Executive", badge: "Leadership" },
  { id: "student", name: "Student / Graduate", badge: "Entry" },
];

export function PreviewPanel() {
  const { resume, zoomLevel, setZoomLevel, setTemplate, setPaperSize } = useResumeStore();
  const [showPageGuide, setShowPageGuide] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [autoFit, setAutoFit] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Measure container for responsive auto-fit
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    handleResize();
    if (typeof window !== "undefined" && window.innerWidth < 820) {
      setAutoFit(true);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleZoomIn = () => {
    setAutoFit(false);
    if (zoomLevel < 150) setZoomLevel(zoomLevel + 10);
  };

  const handleZoomOut = () => {
    setAutoFit(false);
    if (zoomLevel > 50) setZoomLevel(zoomLevel - 10);
  };

  const handleResetZoom = () => {
    setAutoFit(false);
    setZoomLevel(100);
  };

  const currentTemplate =
    TEMPLATE_OPTIONS.find((t) => t.id === resume.styling.template) || TEMPLATE_OPTIONS[0];

  const isLetter = resume.styling.paperSize === "letter";
  const pageWidth = isLetter ? "215.9mm" : "210mm";
  const pageHeight = isLetter ? "279.4mm" : "297mm";

  // Approximate pixel width of A4 (210mm at 96dpi ≈ 794px, Letter ≈ 816px)
  const nominalPxWidth = isLetter ? 816 : 794;
  const paddingOffset = containerWidth < 480 ? 16 : 32;
  const fitScaleRatio = containerWidth > paddingOffset
    ? Math.min(1, Math.max(0.35, (containerWidth - paddingOffset) / nominalPxWidth))
    : 1;

  const effectiveScale = autoFit
    ? (fitScaleRatio * zoomLevel) / 100
    : zoomLevel / 100;

  return (
    <div className="flex h-full flex-col bg-slate-100/90 dark:bg-slate-950 print:bg-white print:p-0">
      {/* Preview Action & Zoom Bar (Hidden in Print) */}
      <div className="relative z-30 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-white px-3 sm:px-4 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900 print:hidden">
        {/* Left Side: Template Selector & Paper Format */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-900 shadow-sm transition hover:bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white max-w-[170px] sm:max-w-none truncate"
            >
              <Layout className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="truncate">{currentTemplate.name}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-slate-400 shrink-0 transition-transform duration-150 ${
                  dropdownOpen ? "rotate-180 text-blue-600" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-60 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-slate-800 dark:bg-slate-900 z-50">
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Select Layout Template
                </div>
                {TEMPLATE_OPTIONS.map((t) => {
                  const isSelected = resume.styling.template === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setTemplate(t.id);
                        setDropdownOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs font-semibold transition ${
                        isSelected
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                      }`}
                    >
                      <span>{t.name}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                          {t.badge}
                        </span>
                        {isSelected && <Check className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Paper Size Pill */}
          <button
            type="button"
            onClick={() => setPaperSize(isLetter ? "a4" : "letter")}
            className="hidden sm:inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            title="Toggle between A4 and US Letter standards"
          >
            <FileText className="h-3.5 w-3.5 text-slate-500" />
            <span>{isLetter ? "Letter" : "A4"}</span>
          </button>
        </div>

        {/* Right Side: Page Guide, Fit-to-screen & Zoom */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Fit-to-Screen Mode (Mobile optimized) */}
          <button
            type="button"
            onClick={() => setAutoFit(!autoFit)}
            title="Toggle Auto Fit to Screen Width"
            className={`inline-flex items-center gap-1 rounded-lg border px-2 py-1.5 text-xs font-semibold transition ${
              autoFit
                ? "border-blue-400 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-300"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-850 dark:text-slate-400"
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>Fit</span>
          </button>

          {/* Page Break Guide Toggle */}
          <button
            type="button"
            onClick={() => setShowPageGuide(!showPageGuide)}
            title="Toggle Visual 1-Page Boundary Line"
            className={`hidden xs:inline-flex items-center gap-1 rounded-lg border px-2 py-1.5 text-xs font-medium transition ${
              showPageGuide
                ? "border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-850 dark:text-slate-400"
            }`}
          >
            {showPageGuide ? (
              <Eye className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            ) : (
              <EyeOff className="h-3.5 w-3.5 text-slate-400" />
            )}
            <span className="hidden md:inline">1-Page Guide</span>
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center gap-0.5 rounded-lg border border-slate-200 bg-slate-50 p-0.5 dark:border-slate-800 dark:bg-slate-850">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 50}
              title="Zoom Out"
              className="rounded p-1 text-slate-600 hover:bg-white hover:text-slate-900 disabled:opacity-30 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="px-1 font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300 min-w-[32px] text-center">
              {Math.round(effectiveScale * 100)}%
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
              className="rounded p-1 text-slate-600 hover:bg-white hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 hidden sm:block"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* A4 / Letter Canvas Viewport */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-2 sm:p-6 md:p-8 flex items-start justify-center custom-scrollbar print:p-0 print:overflow-visible"
      >
        <div
          className="relative transition-transform duration-150 origin-top shadow-2xl rounded-lg overflow-hidden print:shadow-none print:rounded-none print:transform-none"
          style={{
            transform: `scale(${effectiveScale})`,
            transformOrigin: "top center",
            width: pageWidth,
            minHeight: pageHeight,
            marginBottom: autoFit ? `calc(${nominalPxWidth * 1.414 * (effectiveScale - 1)}px)` : undefined,
          }}
        >
          {/* Printable Element Identifier */}
          <div id="resume-print-canvas" className="w-full h-full relative">
            {/* Visual Page Break Marker */}
            {showPageGuide && (
              <div
                className="absolute left-0 right-0 z-20 pointer-events-none flex items-center justify-end pr-3 border-b-2 border-dashed border-rose-400/80 print:hidden"
                style={{ top: pageHeight }}
              >
                <span className="bg-rose-500 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                  --- 1-Page Cutoff ({isLetter ? "US Letter" : "A4"}) ---
                </span>
              </div>
            )}

            <TemplateRenderer data={resume} />
          </div>
        </div>
      </div>
    </div>
  );
}
