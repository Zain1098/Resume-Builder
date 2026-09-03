"use client";

import React, { useState, useEffect } from "react";
import { X, AlertTriangle, Check, HelpCircle } from "lucide-react";

interface ActionPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  mode?: "prompt" | "confirm" | "alert";
  inputLabel?: string;
  inputPlaceholder?: string;
  defaultValue?: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  onConfirm: (value?: string) => void;
}

export function ActionPromptModal({
  isOpen,
  onClose,
  title,
  description,
  mode = "prompt",
  inputLabel,
  inputPlaceholder,
  defaultValue = "",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = false,
  onConfirm,
}: ActionPromptModalProps) {
  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => {
    if (isOpen) {
      setInputValue(defaultValue);
    }
  }, [isOpen, defaultValue]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "prompt" && !inputValue.trim()) return;
    onConfirm(mode === "prompt" ? inputValue.trim() : undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-start justify-between pb-3">
          <div className="flex items-center gap-2.5">
            {isDestructive ? (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-400">
                <AlertTriangle className="h-5 w-5" />
              </div>
            ) : mode === "confirm" ? (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
                <HelpCircle className="h-5 w-5" />
              </div>
            ) : (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                <Check className="h-5 w-5" />
              </div>
            )}
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {title}
              </h3>
              {description && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          {mode === "prompt" && (
            <div className="space-y-1.5">
              {inputLabel && (
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {inputLabel}
                </label>
              )}
              <input
                type="text"
                autoFocus
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={inputPlaceholder}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          )}

          <div className="mt-5 flex items-center justify-end gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
            {mode !== "alert" && (
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 transition"
              >
                {cancelText}
              </button>
            )}
            <button
              type="submit"
              className={`rounded-xl px-4 py-2 text-xs font-semibold text-white shadow-sm transition active:scale-95 ${
                isDestructive
                  ? "bg-red-600 hover:bg-red-700 shadow-red-500/20"
                  : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/20"
              }`}
            >
              {confirmText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
