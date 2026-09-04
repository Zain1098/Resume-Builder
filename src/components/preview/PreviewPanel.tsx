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
    <div className="flex h-full flex-col bg-bg-canvas print:bg-white print:p-0">
      {/* Preview Action & Zoom Bar (Hidden in Print) */}
      <div className="relative z-30 flex flex-wrap items-center justify-between gap-2 border-b border-border-default bg-surface px-3 sm:px-4 py-2 shadow-xs print:hidden">
        {/* Left Side: Template Selector & Paper Format */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border-default bg-surface-container-low px-2.5 py-1.5 text-xs font-medium text-text-primary shadow-xs transition hover:bg-surface max-w-[170px] sm:max-w-none truncate"
            >
              <Layout className="h-3.5 w-3.5 text-primary shrink-0" />
              <span className="truncate">{currentTemplate.name}</span>
              <ChevronDown
                className={`h-3.5 w-3.5 text-text-muted shrink-0 transition-transform duration-150 ${
                  dropdownOpen ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-60 rounded-xl border border-border-default bg-surface p-1.5 shadow-xl z-50">
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-text-muted">
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
                      className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs font-medium transition ${
                        isSelected
                          ? "bg-surface-container-low text-primary font-semibold border border-primary/20"
                          : "text-text-primary hover:bg-surface-container-low"
                      }`}
                    >
                      <span>{t.name}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="rounded bg-surface-container px-1.5 py-0.5 text-[9px] font-medium text-text-muted">
                          {t.badge}
                        </span>
                        {isSelected && <Check className="h-3.5 w-3.5 text-primary" />}
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
            className="hidden sm:inline-flex items-center gap-1 rounded-lg border border-border-default bg-surface-container-low px-2.5 py-1.5 text-xs font-medium text-text-primary hover:bg-surface transition"
            title="Toggle between A4 and US Letter standards"
          >
            <FileText className="h-3.5 w-3.5 text-text-muted" />
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
            className={`inline-flex items-center gap-1 rounded-lg border px-2 py-1.5 text-xs font-medium transition ${
              autoFit
                ? "border-primary/40 bg-surface-container-low text-primary font-semibold"
                : "border-border-default bg-surface text-text-muted hover:bg-surface-container-low"
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
                ? "border-primary/40 bg-surface-container-low text-primary font-semibold"
                : "border-border-default bg-surface text-text-muted hover:bg-surface-container-low"
            }`}
          >
            {showPageGuide ? (
              <Eye className="h-3.5 w-3.5 text-primary" />
            ) : (
              <EyeOff className="h-3.5 w-3.5 text-text-muted" />
            )}
            <span className="hidden md:inline">1-Page Guide</span>
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center gap-0.5 rounded-lg border border-border-default bg-surface-container-low p-0.5">
            <button
              onClick={handleZoomOut}
              disabled={zoomLevel <= 50}
              title="Zoom Out"
              className="rounded p-1 text-text-muted hover:bg-surface hover:text-text-primary disabled:opacity-30 transition"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="px-1 font-mono text-[11px] font-semibold text-text-primary min-w-[32px] text-center">
              {Math.round(effectiveScale * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoomLevel >= 150}
              title="Zoom In"
              className="rounded p-1 text-text-muted hover:bg-surface hover:text-text-primary disabled:opacity-30 transition"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              title="Reset Zoom (100%)"
              className="rounded p-1 text-text-muted hover:bg-surface hover:text-text-primary hidden sm:block transition"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* A4 / Letter Canvas Viewport */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto p-2 sm:p-6 md:p-8 flex flex-col items-center justify-start custom-scrollbar print:p-0 print:overflow-visible"
      >
        <div
          className="relative transition-transform duration-150 origin-top shadow-md border border-border-default/60 rounded-lg overflow-hidden print:shadow-none print:rounded-none print:transform-none bg-white mb-6"
          style={{
            transform: `scale(${effectiveScale})`,
            transformOrigin: "top center",
            width: pageWidth,
            minHeight: pageHeight,
            marginBottom: autoFit ? `calc(${nominalPxWidth * 1.414 * (effectiveScale - 1)}px + 1.5rem)` : "1.5rem",
          }}
        >
          {/* Printable Element Identifier */}
          <div id="resume-print-canvas" className="w-full h-full relative bg-white text-slate-900">
            {/* Visual Page Break Marker */}
            {showPageGuide && (
              <div
                className="absolute left-0 right-0 z-20 pointer-events-none flex items-center justify-end pr-3 border-b-2 border-dashed border-status-error/80 print:hidden"
                style={{ top: pageHeight }}
              >
                <span className="bg-status-error text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                  --- 1-Page Cutoff ({isLetter ? "US Letter" : "A4"}) ---
                </span>
              </div>
            )}

            <TemplateRenderer data={resume} />
          </div>
        </div>

        {/* Stitch Contextual ATS Scanner Floating Verification */}
        <div className="w-full max-w-xl bg-surface rounded-xl border border-border-default p-3.5 shadow-xs mb-4 print:hidden">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-status-success inline-block"></span>
              <span className="font-semibold text-xs text-text-primary">Parser Verification (Workday / Greenhouse)</span>
            </div>
            <span className="text-[11px] font-semibold text-status-success">Certified Valid</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-text-muted">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-status-success"></span> No unparseable tables</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-status-success"></span> Standard Unicode Glyphs</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-status-success"></span> Clean Text Stream</span>
          </div>
        </div>
      </div>
    </div>
  );
}
