"use client";

import React from "react";
import { useResumeStore } from "@/store/useResumeStore";
import {
  User,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Globe,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/common/SocialIcons";

export function PersonalInfoForm() {
  const { resume, updatePersonalInfo } = useResumeStore();
  const info = resume.personalInfo;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    updatePersonalInfo({ [e.target.name]: e.target.value });
  };

  const handleAiPolishSummary = () => {
    if (!info.summary.trim()) {
      updatePersonalInfo({
        summary:
          "High-performing professional with demonstrated expertise in leading technical initiatives, delivering resilient architectures, and driving measurable impact through innovative problem solving.",
      });
      return;
    }
    // Polish the current text
    const polished = `Results-driven and strategic ${
      info.jobTitle || "professional"
    } with extensive experience delivering scalable solutions. ${info.summary.trim()}`;
    updatePersonalInfo({ summary: polished });
  };

  return (
    <div className="space-y-4">
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
            onClick={handleAiPolishSummary}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            <Sparkles className="h-3 w-3 text-amber-500" />
            Enhance with AI
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
