"use client";
import { useUser, SignedIn, SignedOut } from "@clerk/nextjs";
import { useState } from "react";

const defaultResume = {
  title: "My Resume",
  summary: "Experienced developer with focus on React/Node.",
  experience: [
    {
      company: "Acme Inc",
      role: "Frontend Developer",
      bullets: ["Built UI", "Improved performance"],
    },
  ],
  education: [{ school: "State University", degree: "BS CS" }],
  skills: ["React", "Node", "TypeScript"],
};

type ResumeData = {
  title: string;
  summary: string;
  experience: { company: string; role: string; bullets: string[] }[];
  education: { school: string; degree: string }[];
  skills: string[];
};

function TemplateRenderer({ data }: { data: ResumeData }) {
  return (
    <div className="prose max-w-none bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">{data.title}</h1>
      <p className="mt-2">{data.summary}</p>
      <h2 className="mt-4 text-xl font-semibold">Experience</h2>
      <ul className="list-disc pl-5">
        {data.experience?.map(
          (
            exp: { company: string; role: string; bullets: string[] },
            idx: number,
          ) => (
            <li key={idx}>
              <strong>{exp.role}</strong> — {exp.company}
              <ul className="list-disc pl-5">
                {exp.bullets?.map((b: string, i: number) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </li>
          ),
        )}
      </ul>
      <h2 className="mt-4 text-xl font-semibold">Education</h2>
      <ul className="list-disc pl-5">
        {data.education?.map(
          (ed: { school: string; degree: string }, idx: number) => (
            <li key={idx}>
              {ed.degree} — {ed.school}
            </li>
          ),
        )}
      </ul>
      <h2 className="mt-4 text-xl font-semibold">Skills</h2>
      <p>{data.skills?.join(", ")}</p>
    </div>
  );
}

export default function EditorPage() {
  const { user } = useUser();
  const [data, setData] = useState<ResumeData>(defaultResume as ResumeData);

  return (
    <div className="mx-auto max-w-6xl p-6">
      <SignedOut>
        <div className="rounded-md border bg-yellow-50 p-4 text-yellow-900">
          Please sign in to save your resume.
        </div>
      </SignedOut>
      <SignedIn>
        <h1 className="mb-4 text-2xl font-semibold">Resume Editor</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium">Title</span>
              <input
                className="mt-1 w-full rounded-md border p-2"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Summary</span>
              <textarea
                className="mt-1 w-full rounded-md border p-2"
                rows={5}
                value={data.summary}
                onChange={(e) => setData({ ...data, summary: e.target.value })}
              />
            </label>
          </div>
          <TemplateRenderer data={data} />
        </div>
      </SignedIn>
    </div>
  );
}
