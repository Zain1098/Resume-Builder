import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import {
  FileCheck2,
  ArrowRight,
  HelpCircle,
  AlertTriangle,
  Zap,
  Columns,
  Cpu,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free ATS Resume Builder — ATS-Compliant Templates & Live Audit | Resumist",
  description:
    "Build ATS-friendly resumes engineered to parse cleanly through Workday, Taleo, Greenhouse, and Lever. Includes real-time ATS scoring, keyword matching, and single-column PDF export.",
  alternates: {
    canonical: "https://resumist.app/ats-resume-builder",
  },
  openGraph: {
    title: "Free ATS Resume Builder — ATS-Compliant Templates & Live Audit | Resumist",
    description:
      "Build ATS-friendly resumes engineered to parse cleanly through Workday, Taleo, Greenhouse, and Lever.",
    url: "https://resumist.app/ats-resume-builder",
  },
};

export default function AtsResumeBuilderLandingPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://resumist.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "ATS Resume Builder",
        item: "https://resumist.app/ats-resume-builder",
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is an ATS Resume Builder?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An ATS (Applicant Tracking System) resume builder is a specialized document tool that structures resume content into single-column, linearly parseable hierarchies. It strips incompatible design artifacts like multi-column tables, SVG progress bars, embedded images, and non-standard header names that cause corporate applicant parsers (such as Workday, Greenhouse, Taleo, and Lever) to fail or discard candidate data.",
        },
      },
      {
        "@type": "Question",
        name: "Why do resumes fail ATS screening?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Resumes predominantly fail ATS screening due to three issues: 1) Structural errors like two-column layouts, tables, and text boxes that scramble reading order into unreadable strings. 2) Missing role-critical keywords and hard skills required by recruiter search filters. 3) Unconventional section titles (e.g. 'My Journey' instead of 'Work Experience') that prevent the parser from cataloging dates and employers correctly.",
        },
      },
      {
        "@type": "Question",
        name: "Is PDF or Word DOCX better for ATS systems in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Both formats are supported by modern ATS software, but a clean, standard-conforming PDF created from text layers (rather than flattened raster images) is the industry standard. A properly exported PDF preserves precise typographical formatting across all recruiter operating systems without risking the layout reflows typical of Word DOCX files.",
        },
      },
      {
        "@type": "Question",
        name: "How does Resumist verify ATS compliance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Resumist incorporates a real-time 4-pillar audit engine directly inside the builder. It programmatically evaluates your document for contact completeness, quantifiable STAR metrics, standard section hierarchy, and skill keyword density, giving you an objective 0 to 100 compliance score before you apply.",
        },
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-bg-canvas text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />

      <main className="flex-1 w-full pb-20">
        {/* Breadcrumb & Subheader */}
        <div className="w-full bg-surface border-b border-border-default px-4 sm:px-6 lg:px-12 py-5">
          <div className="max-w-5xl mx-auto">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-text-muted text-[11px] font-semibold uppercase tracking-wider mb-2">
              <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
              <span className="text-border-default">/</span>
              <span className="text-primary font-semibold">ATS Resume Builder</span>
            </nav>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-text-primary">
                  The ATS Resume Builder Engineered for 100% Parser Accuracy
                </h1>
                <p className="text-sm sm:text-base text-text-muted max-w-3xl mt-2 leading-relaxed">
                  Design beautiful, recruiter-ready resumes guaranteed to parse flawlessly through Workday, Greenhouse, Taleo, and Lever without losing data or formatting.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/builder"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-text-inverse hover:opacity-95 shadow-sm transition"
                >
                  <span>Launch Builder</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 pt-10 space-y-12">
          {/* Answer-First Definition Box for AI Overviews & Searchers */}
          <section className="rounded-xl border border-primary-container/30 bg-surface p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
              <Cpu className="h-4 w-4" />
              <span>Direct Answer Definition</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
              What is an ATS Resume Builder?
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              An <strong>ATS Resume Builder</strong> is a resume creation software specifically calibrated to meet the data extraction algorithms of corporate <strong>Applicant Tracking Systems</strong> (such as Workday, Greenhouse, Taleo, and Lever). Unlike graphic design programs like Canva or Photoshop, an ATS resume builder enforces <strong>single-column vertical reading orders</strong>, standard typographical hierarchies, machine-readable standard section headings (<em>Work Experience</em>, <em>Education</em>, <em>Skills</em>), and text-layer preservation to guarantee 100% data extraction fidelity during automated candidate sorting.
            </p>
          </section>

          {/* 4 Core Pillars */}
          <section className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-text-primary">
                Why 75% of Resumes Fail ATS Screening
              </h2>
              <p className="text-xs sm:text-sm text-text-muted">
                Corporate recruiters do not read through every PDF manually. Resumes pass through automated OCR and text parsers before reaching human eyes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="rounded-xl border border-border-default bg-surface p-6 space-y-3">
                <div className="h-9 w-9 rounded-lg bg-surface-container-low border border-border-default flex items-center justify-center text-secondary">
                  <Columns className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-text-primary">
                  1. Multi-Column Parsing Scramble
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  When an applicant submits a two-column or sidebar resume, ATS parsers read horizontally across both columns simultaneously. This splices company names from Column 1 into skill lists in Column 2, generating garbled text that automated filters discard as invalid.
                </p>
              </div>

              <div className="rounded-xl border border-border-default bg-surface p-6 space-y-3">
                <div className="h-9 w-9 rounded-lg bg-surface-container-low border border-border-default flex items-center justify-center text-status-danger">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-text-primary">
                  2. Graphics, Rating Stars &amp; Skill Bars
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Graphic elements like &ldquo;5/5 star rating bars&rdquo; or skill circles are completely invisible to text extraction engines. The parser records 0 proficiency, and the applicant receives zero credit for their top competencies.
                </p>
              </div>

              <div className="rounded-xl border border-border-default bg-surface p-6 space-y-3">
                <div className="h-9 w-9 rounded-lg bg-surface-container-low border border-border-default flex items-center justify-center text-primary">
                  <FileCheck2 className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-text-primary">
                  3. Non-Standard Section Titles
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Creative section titles like &ldquo;Where I&apos;ve Made an Impact&rdquo; confuse parser classification models. Resumist standardizes nomenclature to universally parsed schema tokens: <em>Professional Experience</em>, <em>Education</em>, <em>Technical Skills</em>, and <em>Certifications</em>.
                </p>
              </div>

              <div className="rounded-xl border border-border-default bg-surface p-6 space-y-3">
                <div className="h-9 w-9 rounded-lg bg-surface-container-low border border-border-default flex items-center justify-center text-status-success">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-text-primary">
                  4. Measurable STAR Metric Deficits
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Modern recruiters configure keyword and semantic filters seeking evidence of impact (percentages, dollar amounts, scale). Resumist alerts you when bullet points lack measurable outcomes, ensuring high algorithmic scoring.
                </p>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="rounded-xl border border-border-default bg-surface overflow-hidden shadow-xs">
            <div className="p-6 border-b border-border-default">
              <h2 className="text-lg font-bold text-text-primary">
                Architectural Comparison: Generic Templates vs. Resumist ATS Engine
              </h2>
              <p className="text-xs text-text-muted mt-1">
                How document structure directly impacts your candidate ranking inside enterprise recruitment software.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-border-default text-text-muted font-semibold uppercase tracking-wider">
                    <th className="py-3 px-5">Design Attribute</th>
                    <th className="py-3 px-5 text-status-danger">Canva / Creative Templates</th>
                    <th className="py-3 px-5 text-primary">Resumist ATS Engine</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-default text-text-secondary">
                  <tr>
                    <td className="py-3 px-5 font-medium text-text-primary">Layout Structure</td>
                    <td className="py-3 px-5 text-status-danger">Two-column / complex grid (scrambles reading order)</td>
                    <td className="py-3 px-5 text-status-success font-medium">Linear single-column guaranteed sequence</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-5 font-medium text-text-primary">Typography &amp; Fonts</td>
                    <td className="py-3 px-5 text-status-danger">Custom script fonts (renders as image paths)</td>
                    <td className="py-3 px-5 text-status-success font-medium">Standard machine-readable sans &amp; serif glyphs</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-5 font-medium text-text-primary">Skill Representation</td>
                    <td className="py-3 px-5 text-status-danger">Visual progress bars (invisible to OCR)</td>
                    <td className="py-3 px-5 text-status-success font-medium">Categorized text keywords with boolean search indexing</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-5 font-medium text-text-primary">Real-Time Audit</td>
                    <td className="py-3 px-5 text-status-danger">None (pure cosmetic design)</td>
                    <td className="py-3 px-5 text-status-success font-medium">Instant 0-100 rubric scoring across 4 ATS pillars</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-5 font-medium text-text-primary">Export Format</td>
                    <td className="py-3 px-5 text-status-danger">Heavy flattened PDF or image-based export</td>
                    <td className="py-3 px-5 text-status-success font-medium">Pure selectable text-layer vector PDF</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQ Section with crawlable items */}
          <section className="space-y-6">
            <div className="border-b border-border-default pb-3">
              <h2 className="text-xl font-bold tracking-tight text-text-primary flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                <span>Frequently Asked Questions About ATS Resume Builders</span>
              </h2>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-border-default bg-surface p-5 space-y-2">
                <h3 className="text-sm font-semibold text-text-primary">
                  What is an ATS Resume Builder?
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  An ATS (Applicant Tracking System) resume builder is a specialized document tool that structures resume content into single-column, linearly parseable hierarchies. It strips incompatible design artifacts like multi-column tables, SVG progress bars, embedded images, and non-standard header names that cause corporate applicant parsers (such as Workday, Greenhouse, Taleo, and Lever) to fail or discard candidate data.
                </p>
              </div>

              <div className="rounded-xl border border-border-default bg-surface p-5 space-y-2">
                <h3 className="text-sm font-semibold text-text-primary">
                  Why do resumes fail ATS screening?
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Resumes predominantly fail ATS screening due to three issues: 1) Structural errors like two-column layouts, tables, and text boxes that scramble reading order into unreadable strings. 2) Missing role-critical keywords and hard skills required by recruiter search filters. 3) Unconventional section titles (e.g. &ldquo;My Journey&rdquo; instead of &ldquo;Work Experience&rdquo;) that prevent the parser from cataloging dates and employers correctly.
                </p>
              </div>

              <div className="rounded-xl border border-border-default bg-surface p-5 space-y-2">
                <h3 className="text-sm font-semibold text-text-primary">
                  Is PDF or Word DOCX better for ATS systems in 2026?
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Both formats are supported by modern ATS software, but a clean, standard-conforming PDF created from text layers (rather than flattened raster images) is the industry standard. A properly exported PDF preserves precise typographical formatting across all recruiter operating systems without risking the layout reflows typical of Word DOCX files.
                </p>
              </div>

              <div className="rounded-xl border border-border-default bg-surface p-5 space-y-2">
                <h3 className="text-sm font-semibold text-text-primary">
                  How does Resumist verify ATS compliance?
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Resumist incorporates a real-time 4-pillar audit engine directly inside the builder. It programmatically evaluates your document for contact completeness, quantifiable STAR metrics, standard section hierarchy, and skill keyword density, giving you an objective 0 to 100 compliance score before you apply.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Box */}
          <section className="rounded-2xl bg-primary text-text-inverse p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">
                Build Your ATS-Compliant Resume in Minutes
              </h2>
              <p className="text-xs sm:text-sm text-text-inverse/85 max-w-xl">
                Choose from 4 tested single-column layouts, test your score against our real-time 4-pillar audit, and export high-resolution PDFs. Free forever, no sign-up barrier.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                href="/builder"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-surface text-primary px-6 py-3 text-xs font-bold hover:bg-surface-container-low transition shadow-xs"
              >
                <span>Open Resume Builder</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/ats-analyzer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-text-inverse/30 px-5 py-3 text-xs font-semibold text-text-inverse hover:bg-text-inverse/10 transition"
              >
                <span>Check ATS Score</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
