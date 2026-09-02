"use client";

import React, { ReactNode } from "react";
import { ChevronDown, LucideIcon } from "lucide-react";

interface AccordionSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  badgeCount?: number;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export function AccordionSection({
  title,
  subtitle,
  icon: Icon,
  badgeCount,
  isOpen,
  onToggle,
  children,
}: AccordionSectionProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 dark:border-slate-800 dark:bg-slate-900">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-slate-50/70 dark:hover:bg-slate-800/50"
      >
        <div className="flex items-center gap-3.5">
          <div
            className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
              isOpen
                ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                {title}
              </h3>
              {badgeCount !== undefined && badgeCount > 0 && (
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                  {badgeCount}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        <div
          className={`text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-blue-600" : ""
          }`}
        >
          <ChevronDown className="h-5 w-5" />
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-slate-100 px-5 py-4 dark:border-slate-800/80">
          {children}
        </div>
      )}
    </div>
  );
}
