import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/common/Navbar";
import { JobMatcherClient } from "./JobMatcherClient";
import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://resumist.app");

export const metadata: Metadata = {
  title: "Resume Job Description Matcher & Keyword Gap Analyzer",
  description:
    "Match your resume against any job description. Instantly identify missing required vs. preferred keywords, calculate ATS parity scores, and generate tailored resume versions factually.",
  alternates: {
    canonical: `${siteUrl}/job-matcher`,
  },
  openGraph: {
    title: "Resume Job Description Matcher & Keyword Gap Analyzer | Resumist",
    description:
      "Deconstruct job postings into required skills, preferred qualifications, and seniority signals. Close keyword gaps without artificial stuffing.",
    url: `${siteUrl}/job-matcher`,
    siteName: "Resumist",
    type: "website",
  },
};

const jobMatcherFaqs = [
  {
    question: "How does the Job Description Matcher work?",
    answer:
      "The tool deconstructs your pasted job posting into core architectural requirements: mandatory qualifications, preferred skills, experience requirements, and education prerequisites. It then compares this semantic tree against your resume's experiences and skills catalog to compute exact parity.",
  },
  {
    question: "What is the difference between Required and Preferred skills?",
    answer:
      "Required skills are mandatory filtering criteria that ATS algorithms and recruiters use to screen out applicants before human review. Preferred skills are bonus criteria that give your application an edge when ranking against other qualifying candidates.",
  },
  {
    question: "Does Resumist generate a separate tailored resume version?",
    answer:
      "Yes. When you click 'Tailor Resume to This Job', Resumist creates a dedicated copy in your Career Vault calibrated specifically to that job posting, leaving your Master Career Profile completely untouched.",
  },
];

export default function JobMatcherPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Job Matcher",
        item: `${siteUrl}/job-matcher`,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: jobMatcherFaqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg-canvas text-text-primary">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* Interactive Client Studio */}
      <JobMatcherClient />

      {/* Crawlable Answer-First Educational Section */}
      <section className="w-full bg-surface border-t border-border-default py-16 px-4 sm:px-6 lg:px-12 mt-12">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary block">
              SEMANTIC JOB DECONSTRUCTION
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-text-primary">
              How to Tailor Your Resume Without Lying or Keyword Stuffing
            </h2>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
              Recruiters and hiring managers spot generic AI buzzword stuffing immediately. Resumist uses an evidence-based matching methodology: identifying real overlaps between your authentic background and the employer&apos;s technical requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 bg-surface-container-low rounded-xl border border-border-default space-y-2">
              <span className="text-xs font-semibold text-text-primary block">
                1. Parse Requirements
              </span>
              <p className="text-xs text-text-muted leading-relaxed">
                Extract hard competencies (languages, cloud providers, domain protocols) and group them by seniority hierarchy.
              </p>
            </div>
            <div className="p-5 bg-surface-container-low rounded-xl border border-border-default space-y-2">
              <span className="text-xs font-semibold text-text-primary block">
                2. Identify True Gaps
              </span>
              <p className="text-xs text-text-muted leading-relaxed">
                Highlight skills you possess in real life that are omitted from your current resume draft or phrased non-standardly.
              </p>
            </div>
            <div className="p-5 bg-surface-container-low rounded-xl border border-border-default space-y-2">
              <span className="text-xs font-semibold text-text-primary block">
                3. Grounded Tailoring
              </span>
              <p className="text-xs text-text-muted leading-relaxed">
                Reframe existing accomplishments using the employer&apos;s terminology while preserving exact dates, employers, and numbers.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">
              Frequently Asked Questions on Job Matching
            </h3>
            <div className="space-y-3">
              {jobMatcherFaqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-surface-container-low rounded-xl border border-border-default p-4 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer font-semibold text-xs text-text-primary gap-4">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span>{faq.question}</span>
                    </div>
                    <span className="text-text-muted text-base transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="mt-2.5 pt-2.5 border-t border-border-default text-xs text-text-muted leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-border-default flex flex-wrap items-center justify-between gap-4 text-xs">
            <Link
              href="/builder"
              className="inline-flex items-center gap-1.5 text-primary font-semibold hover:underline"
            >
              <span>Launch 3-Pane Resume Studio</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/resume-job-matcher"
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              Read In-Depth Job Matching Guide →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
