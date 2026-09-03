"use client";

import React, { useRef } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import {
  User,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Globe,
  Sparkles,
  Camera,
  Trash2,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/common/SocialIcons";

export function PersonalInfoForm() {
  const { resume, updatePersonalInfo } = useResumeStore();
  const info = resume.personalInfo;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updatePersonalInfo({ [e.target.name]: e.target.value });
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      updatePersonalInfo({ avatarUrl: dataUrl });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    updatePersonalInfo({ avatarUrl: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const [isPolishing, setIsPolishing] = React.useState(false);

  const handleAiPolishSummary = async () => {
    setIsPolishing(true);
    try {
      const { generateProfessionalSummary } = await import("@/lib/aiService");
      const summary = await generateProfessionalSummary(resume, info.jobTitle);
      updatePersonalInfo({ summary });
    } finally {
      setIsPolishing(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Profile Photo / Avatar Upload Section */}
      <div className="flex items-center gap-4 p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-850/50">
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-slate-300 bg-white overflow-hidden dark:border-slate-700 dark:bg-slate-800 shadow-sm">
          {info.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={info.avatarUrl}
              alt="Avatar Preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <User className="h-6 w-6 text-slate-400" />
          )}
        </div>

        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Profile Photo (Optional)
          </label>
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition"
            >
              <Camera className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              <span>{info.avatarUrl ? "Change Photo" : "Upload Photo"}</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
            {info.avatarUrl && (
              <button
                type="button"
                onClick={handleRemoveAvatar}
                className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-100 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-400 transition"
              >
                <Trash2 className="h-3 w-3" />
                <span>Remove</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Name & Job Title */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Full Name *
          </label>
          <div className="relative mt-1">
            <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              name="fullName"
              value={info.fullName}
              onChange={handleChange}
              placeholder="e.g. Alex Morgan"
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Target Job Title *
          </label>
          <div className="relative mt-1">
            <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              name="jobTitle"
              value={info.jobTitle}
              onChange={handleChange}
              placeholder="e.g. Senior Full Stack Engineer"
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Email Address *
          </label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="email"
              name="email"
              value={info.email}
              onChange={handleChange}
              placeholder="e.g. alex@example.com"
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Phone Number *
          </label>
          <div className="relative mt-1">
            <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="tel"
              name="phone"
              value={info.phone}
              onChange={handleChange}
              placeholder="e.g. +1 (555) 019-2834"
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Location & Website */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Location (City, Country/State)
          </label>
          <div className="relative mt-1">
            <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              name="location"
              value={info.location}
              onChange={handleChange}
              placeholder="e.g. San Francisco, CA"
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Portfolio / Website URL
          </label>
          <div className="relative mt-1">
            <Globe className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="url"
              name="website"
              value={info.website}
              onChange={handleChange}
              placeholder="e.g. https://alexmorgan.dev"
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* LinkedIn & GitHub */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            LinkedIn Profile
          </label>
          <div className="relative mt-1">
            <span className="absolute left-3 top-2.5 text-slate-400">
              <LinkedinIcon className="h-4 w-4" />
            </span>
            <input
              type="url"
              name="linkedin"
              value={info.linkedin}
              onChange={handleChange}
              placeholder="e.g. linkedin.com/in/alexmorgan"
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            GitHub / GitLab
          </label>
          <div className="relative mt-1">
            <span className="absolute left-3 top-2.5 text-slate-400">
              <GithubIcon className="h-4 w-4" />
            </span>
            <input
              type="url"
              name="github"
              value={info.github}
              onChange={handleChange}
              placeholder="e.g. github.com/alexmorgan"
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <div>
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            Professional Summary
          </label>
          <button
            type="button"
            disabled={isPolishing}
            onClick={handleAiPolishSummary}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 disabled:opacity-50"
          >
            <Sparkles className="h-3 w-3 text-amber-500" />
            {isPolishing ? "Enhancing..." : "Enhance with AI"}
          </button>
        </div>
        <textarea
          name="summary"
          rows={3}
          value={info.summary}
          onChange={handleChange}
          placeholder="Write a concise 2-4 sentence overview of your background, key achievements, and core strengths..."
          className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white leading-relaxed"
        />
      </div>
    </div>
  );
}
