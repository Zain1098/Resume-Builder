"use client";

import React, { ReactNode } from "react";
import { ChevronDown, ChevronUp, Eye, EyeOff, LucideIcon } from "lucide-react";

interface AccordionSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  badgeCount?: number;
  isOpen: boolean;
  onToggle: () => void;
  isVisible?: boolean;
  onToggleVisibility?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  children: ReactNode;
}

export function AccordionSection({
  title,
  subtitle,
  icon: Icon,
  badgeCount,
  isOpen,
  onToggle,
  isVisible = true,
  onToggleVisibility,
  onMoveUp,
  onMoveDown,
  canMoveUp = false,
  canMoveDown = false,
  children,
}: AccordionSectionProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-200 dark:bg-slate-900 ${
        isVisible
          ? "border-slate-200 dark:border-slate-800"
          : "border-dashed border-amber-300/80 bg-amber-50/20 dark:border-amber-800/60 dark:bg-amber-950/10"
      }`}
    >
      <div className="flex w-full items-center justify-between px-4 py-3.5 sm:px-5 sm:py-4">
        {/* Left Side: Icon, Title, Subtitle, Status */}
        <button
          type="button"
          onClick={onToggle}
          className="flex flex-1 items-center gap-3 text-left transition group min-w-0"
        >
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
              !isVisible
                ? "bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
                : isOpen
                ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            <Icon className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <h3
                className={`text-sm font-semibold truncate ${
                  isVisible
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-500 dark:text-slate-400 line-through decoration-slate-400"
                }`}
              >
                {title}
              </h3>
              {badgeCount !== undefined && badgeCount > 0 && (
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.2 text-[11px] font-semibold text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                  {badgeCount}
                </span>
              )}
              {!isVisible && (
                <span className="inline-flex items-center rounded-full bg-amber-100 px-2 py-0.2 text-[10px] font-bold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                  Hidden
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </button>

        {/* Right Side: Reordering, Visibility Toggle, Accordion Chevron */}
        <div className="flex items-center gap-1 shrink-0 ml-2">
          {/* Move Up */}
          {onMoveUp && (
            <button
              type="button"
              disabled={!canMoveUp}
              onClick={(e) => {
                e.stopPropagation();
                onMoveUp();
              }}
              title="Move section up"
              className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-20 disabled:hover:bg-transparent dark:hover:bg-slate-800 dark:hover:text-slate-200 transition"
            >
              <ChevronUp className="h-4 w-4" />
            </button>
          )}

          {/* Move Down */}
          {onMoveDown && (
            <button
              type="button"
              disabled={!canMoveDown}
              onClick={(e) => {
                e.stopPropagation();
                onMoveDown();
              }}
              title="Move section down"
              className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-20 disabled:hover:bg-transparent dark:hover:bg-slate-800 dark:hover:text-slate-200 transition"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          )}

          {/* Visibility Eye Toggle */}
          {onToggleVisibility && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleVisibility();
              }}
              title={isVisible ? "Hide section from resume output" : "Show section on resume output"}
              className={`rounded p-1 transition ${
                isVisible
                  ? "text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  : "text-amber-600 bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:text-amber-400"
              }`}
            >
              {isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
          )}

          {/* Accordion Toggle Chevron */}
          <button
            type="button"
            onClick={onToggle}
            className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition ml-1"
          >
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-200 ${
                isOpen ? "rotate-180 text-blue-600" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-slate-100 px-5 py-4 dark:border-slate-800/80">
          {children}
        </div>
      )}
    </div>
  );
}
