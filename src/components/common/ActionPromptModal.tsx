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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-xl border border-border-default bg-surface p-6 shadow-2xl">
        <div className="flex items-start justify-between pb-3">
          <div className="flex items-center gap-3">
            {isDestructive ? (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-status-error/15 text-status-error border border-status-error/20">
                <AlertTriangle className="h-5 w-5" />
              </div>
            ) : mode === "confirm" ? (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-status-warning/15 text-status-warning border border-status-warning/20">
                <HelpCircle className="h-5 w-5" />
              </div>
            ) : (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-container/15 text-primary border border-primary-container/20">
                <Check className="h-5 w-5" />
              </div>
            )}
            <div>
              <h3 className="text-sm font-semibold text-text-primary">
                {title}
              </h3>
              {description && (
                <p className="text-xs text-text-muted mt-0.5 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-text-muted hover:text-text-primary hover:bg-surface-container-low transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          {mode === "prompt" && (
            <div className="space-y-1.5">
              {inputLabel && (
                <label className="block text-xs font-semibold text-text-muted">
                  {inputLabel}
                </label>
              )}
              <input
                type="text"
                autoFocus
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={inputPlaceholder}
                className="w-full rounded-xl border border-border-default bg-surface px-3.5 py-2 text-xs text-text-primary focus:border-primary-container focus:outline-none transition-colors placeholder:text-text-muted"
              />
            </div>
          )}

          <div className="mt-5 flex items-center justify-end gap-2 border-t border-border-default pt-4">
            {mode !== "alert" && (
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-border-default bg-surface px-4 py-2 text-xs font-medium text-text-primary hover:bg-surface-container-low transition"
              >
                {cancelText}
              </button>
            )}
            <button
              type="submit"
              className={`rounded-xl px-4 py-2 text-xs font-medium shadow-xs transition active:scale-[0.98] ${
                isDestructive
                  ? "bg-status-error text-white hover:bg-status-error/90"
                  : "bg-primary-container text-on-primary hover:bg-primary"
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
