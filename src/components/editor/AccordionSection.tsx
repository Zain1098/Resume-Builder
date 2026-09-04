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
      className={`overflow-hidden rounded-xl border bg-surface shadow-xs transition-all duration-200 ${
        isVisible
          ? "border-border-default"
          : "border-dashed border-status-warning/60 bg-status-warning/5"
      }`}
    >
      <div className="flex w-full items-center justify-between px-4 py-3 sm:px-5 sm:py-3.5">
        {/* Left Side: Icon, Title, Subtitle, Status */}
        <button
          type="button"
          onClick={onToggle}
          className="flex flex-1 items-center gap-3 text-left transition group min-w-0"
        >
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
              !isVisible
                ? "bg-surface-container text-text-muted"
                : isOpen
                ? "bg-primary-container text-on-primary"
                : "bg-surface-container-low text-text-primary"
            }`}
          >
            <Icon className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <h3
                className={`text-sm font-semibold truncate ${
                  isVisible
                    ? "text-text-primary"
                    : "text-text-muted line-through decoration-text-muted/60"
                }`}
              >
                {title}
              </h3>
              {badgeCount !== undefined && badgeCount > 0 && (
                <span className="inline-flex items-center rounded-full bg-primary-fixed/30 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  {badgeCount}
                </span>
              )}
              {!isVisible && (
                <span className="inline-flex items-center rounded-full bg-status-warning/15 px-2 py-0.5 text-[10px] font-semibold text-status-warning">
                  Hidden
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-text-muted truncate mt-0.5">
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
              className="rounded p-1 text-text-muted hover:bg-surface-container-low hover:text-text-primary disabled:opacity-20 disabled:hover:bg-transparent transition"
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
              className="rounded p-1 text-text-muted hover:bg-surface-container-low hover:text-text-primary disabled:opacity-20 disabled:hover:bg-transparent transition"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          )}

          {/* Visibility Toggle */}
          {onToggleVisibility && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleVisibility();
              }}
              title={isVisible ? "Hide section in resume" : "Show section in resume"}
              className={`rounded p-1 transition ${
                isVisible
                  ? "text-text-muted hover:bg-surface-container-low hover:text-text-primary"
                  : "text-status-warning bg-status-warning/10 hover:bg-status-warning/20"
              }`}
            >
              {isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
          )}

          {/* Chevron */}
          <button
            type="button"
            onClick={onToggle}
            className="rounded p-1 text-text-muted hover:bg-surface-container-low hover:text-text-primary transition ml-1"
          >
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Accordion Body */}
      {isOpen && (
        <div className="border-t border-border-default p-4 sm:p-5 bg-surface">
          {children}
        </div>
      )}
    </div>
  );
}
