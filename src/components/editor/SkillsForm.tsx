"use client";

import React, { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Plus, Trash2, X, Sparkles, Tag } from "lucide-react";

const SUGGESTED_SKILLS = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Tailwind CSS",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS",
  "Git",
  "GraphQL",
  "REST APIs",
  "CI/CD",
  "Redis",
  "Figma",
];

export function SkillsForm() {
  const {
    resume,
    addSkillCategory,
    updateSkillCategory,
    removeSkillCategory,
    addSkillToCategory,
    removeSkillFromCategory,
  } = useResumeStore();

  const [newSkillInput, setNewSkillInput] = useState<{ [catId: string]: string }>({});

  const categories = resume.skillCategories;

  const handleAddSkill = (catId: string) => {
    const text = newSkillInput[catId]?.trim();
    if (!text) return;
    addSkillToCategory(catId, text);
    setNewSkillInput((prev) => ({ ...prev, [catId]: "" }));
  };

  const handleKeyDown = (e: React.KeyboardEvent, catId: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill(catId);
    }
  };

  return (
    <div className="space-y-4">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/50"
        >
          {/* Category Header */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-200/60 dark:border-slate-800">
            <div className="flex-1">
              <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                Skill Group Name
              </label>
              <input
                type="text"
                value={cat.name}
                onChange={(e) =>
                  updateSkillCategory(cat.id, { name: e.target.value })
                }
                placeholder="e.g. Frontend, Backend, Tools..."
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <button
              type="button"
              onClick={() => removeSkillCategory(cat.id)}
              className="mt-4 text-slate-400 hover:text-red-500 transition p-1"
              title="Delete Category"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {/* Skill Badges / Tags */}
          <div className="mt-3">
            <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 bg-white rounded-lg border border-slate-200/80 dark:border-slate-800 dark:bg-slate-800/80">
              {cat.skills.length === 0 ? (
                <span className="text-xs text-slate-400 italic">
                  No skills added yet in this group.
                </span>
              ) : (
                cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkillFromCategory(cat.id, sIdx)}
                      className="hover:text-red-500 transition"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))
              )}
            </div>

            {/* Add Skill Input */}
            <div className="mt-2.5 flex items-center gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  value={newSkillInput[cat.id] || ""}
                  onChange={(e) =>
                    setNewSkillInput((prev) => ({
                      ...prev,
                      [cat.id]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => handleKeyDown(e, cat.id)}
                  placeholder="Type a skill and press Enter (e.g. Next.js)..."
                  className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pl-8 pr-3 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <button
                type="button"
                onClick={() => handleAddSkill(cat.id)}
                className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition shrink-0"
              >
                Add Skill
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Suggested Quick Add Pills */}
      <div className="rounded-xl border border-slate-200/80 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
          <Sparkles className="h-3.5 w-3.5 text-amber-500" />
          <span>Quick Add Popular Skills:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTED_SKILLS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                const targetCat = categories[0]?.id;
                if (targetCat) {
                  addSkillToCategory(targetCat, item);
                } else {
                  addSkillCategory();
                }
              }}
              className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-600 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-blue-950/40 dark:hover:text-blue-300 transition"
            >
              + {item}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={addSkillCategory}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 py-3 text-xs font-semibold text-slate-700 hover:border-blue-500 hover:bg-blue-50/50 hover:text-blue-600 dark:border-slate-800 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:bg-blue-950/20 transition"
      >
        <Plus className="h-4 w-4" />
        Add Skill Category
      </button>
    </div>
  );
}
