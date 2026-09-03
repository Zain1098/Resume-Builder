"use client";

import React from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Plus, Trash2, Globe } from "lucide-react";
import { LanguageItem } from "@/types/resume";

export function LanguagesForm() {
  const { resume, addLanguage, updateLanguage, removeLanguage } = useResumeStore();
  const languages = resume.languages || [];

  return (
    <div className="space-y-3">
      {languages.map((lang) => (
        <div
          key={lang.id}
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/50 p-3 dark:border-slate-800 dark:bg-slate-900/50"
        >
          <div className="relative flex-1">
            <Globe className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={lang.language}
              onChange={(e) => updateLanguage(lang.id, { language: e.target.value })}
              placeholder="e.g. English, Spanish, German, Mandarin..."
              className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <select
            value={lang.proficiency}
            onChange={(e) =>
              updateLanguage(lang.id, {
                proficiency: e.target.value as LanguageItem["proficiency"],
              })
            }
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white shrink-0"
          >
            <option value="Native">Native / Bilingual</option>
            <option value="Fluent">Fluent</option>
            <option value="Professional">Professional Working</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Basic">Basic Elementary</option>
          </select>

          <button
            type="button"
            onClick={() => removeLanguage(lang.id)}
            className="p-1.5 text-slate-400 hover:text-red-500 transition shrink-0"
            title="Remove language"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addLanguage}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-2.5 text-xs font-semibold text-slate-700 hover:border-blue-500 hover:bg-blue-50/50 hover:text-blue-600 dark:border-slate-800 dark:text-slate-300 transition"
      >
        <Plus className="h-4 w-4" />
        <span>Add Language</span>
      </button>
    </div>
  );
}
