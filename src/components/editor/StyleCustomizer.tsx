"use client";

import React from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { TemplateType, FontFamilyType, PaperSize } from "@/types/resume";
import { Palette, Type, Layout, Check, FileText, Camera } from "lucide-react";

const TEMPLATES: { id: TemplateType; name: string; desc: string; badge: string }[] = [
  {
    id: "modern",
    name: "Modern Pro",
    desc: "Clean two-column sidebar layout, high ATS compliance.",
    badge: "Popular",
  },
  {
    id: "classic",
    name: "Harvard Classic",
    desc: "Single-column traditional serif Ivy League layout.",
    badge: "ATS Gold",
  },
  {
    id: "minimalist",
    name: "Minimalist Executive",
    desc: "Spacious Scandinavian design focused on typography.",
    badge: "Sleek",
  },
  {
    id: "tech",
    name: "Developer / Tech",
    desc: "Compact tags and project metrics for engineers.",
    badge: "Dev Choice",
  },
  {
    id: "executive",
    name: "Leadership Executive",
    desc: "Strategic summary, competencies matrix & leadership impact.",
    badge: "Executive",
  },
  {
    id: "student",
    name: "Student / Fresh Grad",
    desc: "Education, academic capstones & honors upfront.",
    badge: "Entry-Level",
  },
];

const COLOR_PALETTES = [
  { name: "Royal Blue", hex: "#2563eb" },
  { name: "Emerald Slate", hex: "#059669" },
  { name: "Deep Indigo", hex: "#4f46e5" },
  { name: "Crimson Red", hex: "#dc2626" },
  { name: "Midnight Onyx", hex: "#0f172a" },
  { name: "Teal Modern", hex: "#0d9488" },
  { name: "Purple Violet", hex: "#7c3aed" },
  { name: "Amber Bronze", hex: "#d97706" },
];

const FONT_OPTIONS: { id: FontFamilyType; name: string; preview: string; sampleClass: string }[] = [
  { id: "sans", name: "Modern Sans (Inter)", preview: "Clean, readable, modern", sampleClass: "font-sans" },
  { id: "serif", name: "Classic Serif (Merriweather)", preview: "Traditional, academic, elegant", sampleClass: "font-serif" },
  { id: "poppins", name: "Geometric (Poppins)", preview: "Friendly, stylish, crisp", sampleClass: "font-sans font-medium" },
  { id: "mono", name: "Technical (JetBrains Mono)", preview: "Developer, precise, structured", sampleClass: "font-mono" },
];

export function StyleCustomizer() {
  const { resume, setTemplate, setPrimaryColor, setFontFamily, updateStyling, setPaperSize } =
    useResumeStore();
  const styling = resume.styling;

  return (
    <div className="space-y-5">
      {/* 1. Template Selector */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2.5">
          <Layout className="h-3.5 w-3.5 text-blue-600" />
          <span>Resume Template (6 ATS-Compliant Layouts)</span>
        </div>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {TEMPLATES.map((tpl) => {
            const isSelected = styling.template === tpl.id;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => setTemplate(tpl.id)}
                className={`relative flex flex-col items-start rounded-xl border p-3 text-left transition-all ${
                  isSelected
                    ? "border-blue-600 bg-blue-50/50 shadow-sm ring-2 ring-blue-600/20 dark:border-blue-500 dark:bg-blue-950/40"
                    : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900"
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {tpl.name}
                  </span>
                  <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                    {tpl.badge}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  {tpl.desc}
                </p>
                {isSelected && (
                  <div className="absolute bottom-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
                    <Check className="h-3 w-3" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Paper Size & Photo Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200/60 dark:border-slate-800">
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
            <FileText className="h-3.5 w-3.5 text-blue-600" />
            <span>Paper Standard</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(["a4", "letter"] as PaperSize[]).map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setPaperSize(size)}
                className={`rounded-lg border py-1.5 text-center text-xs font-semibold uppercase transition ${
                  (styling.paperSize || "a4") === size
                    ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
                    : "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                {size === "a4" ? "A4 (Global)" : "US Letter"}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1">
            <Camera className="h-3.5 w-3.5 text-blue-600" />
            <span>Profile Photo Layout</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => updateStyling({ showPhoto: false })}
              className={`rounded-lg border py-1.5 text-center text-xs font-semibold transition ${
                !styling.showPhoto
                  ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
                  : "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              ATS Clean (No Photo)
            </button>
            <button
              type="button"
              onClick={() => updateStyling({ showPhoto: true })}
              className={`rounded-lg border py-1.5 text-center text-xs font-semibold transition ${
                styling.showPhoto
                  ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
                  : "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              Photo Resume
            </button>
          </div>
        </div>
      </div>

      {/* 3. Primary Accent Color */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2.5">
          <Palette className="h-3.5 w-3.5 text-blue-600" />
          <span>Accent Color</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {COLOR_PALETTES.map((c) => {
            const isSelected = styling.primaryColor === c.hex;
            return (
              <button
                key={c.hex}
                type="button"
                onClick={() => setPrimaryColor(c.hex)}
                title={c.name}
                className={`group relative flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-110 active:scale-95 ${
                  isSelected ? "ring-2 ring-blue-600 ring-offset-2 dark:ring-offset-slate-900" : ""
                }`}
                style={{ backgroundColor: c.hex }}
              >
                {isSelected && <Check className="h-4 w-4 text-white drop-shadow" />}
              </button>
            );
          })}

          <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2 py-1 dark:border-slate-800 dark:bg-slate-900">
            <input
              type="color"
              value={styling.primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="h-5 w-5 cursor-pointer rounded border-0 bg-transparent p-0"
            />
            <span className="font-mono text-[11px] text-slate-600 dark:text-slate-400">
              {styling.primaryColor.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Typography Selection */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2.5">
          <Type className="h-3.5 w-3.5 text-blue-600" />
          <span>Font Style</span>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {FONT_OPTIONS.map((f) => {
            const isSelected = styling.fontFamily === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFontFamily(f.id)}
                className={`flex flex-col items-start rounded-xl border p-2.5 text-left transition ${
                  isSelected
                    ? "border-blue-600 bg-blue-50/50 shadow-sm dark:border-blue-500 dark:bg-blue-950/40"
                    : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900"
                }`}
              >
                <span className={`text-xs font-bold text-slate-900 dark:text-white ${f.sampleClass}`}>
                  {f.name}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  {f.preview}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Density & Spacing */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 pt-2 border-t border-slate-200/60 dark:border-slate-800">
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Font Size Scale
          </label>
          <select
            value={styling.fontSize}
            onChange={(e) =>
              updateStyling({
                fontSize: e.target.value as "compact" | "normal" | "spacious",
              })
            }
            className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="compact">Compact (Fit more content on 1 page)</option>
            <option value="normal">Normal (Standard)</option>
            <option value="spacious">Spacious (Relaxed reading)</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Section Spacing
          </label>
          <select
            value={styling.sectionSpacing}
            onChange={(e) =>
              updateStyling({
                sectionSpacing: e.target.value as "compact" | "normal" | "spacious",
              })
            }
            className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="compact">Tight Margins</option>
            <option value="normal">Balanced Margins</option>
            <option value="spacious">Expanded Margins</option>
          </select>
        </div>
      </div>
    </div>
  );
}
