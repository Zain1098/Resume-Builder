import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import {
  BookOpen,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How to Make an ATS-Friendly Resume in 2026: The Complete Technical Guide | Resumist",
  description:
    "Master ATS resume compliance for Workday, Greenhouse, Taleo, and Lever. Learn parsing mechanics, single-column layouts, the Google XYZ formula, and keyword matching.",
  alternates: {
    canonical: "https://resumist.app/guides/ats-friendly-resume-guide",
  },
  openGraph: {
    title: "How to Make an ATS-Friendly Resume in 2026: The Complete Technical Guide | Resumist",
    description:
      "Master ATS resume compliance for Workday, Greenhouse, Taleo, and Lever. Learn parsing mechanics, single-column layouts, the Google XYZ formula, and keyword matching.",
    url: "https://resumist.app/guides/ats-friendly-resume-guide",
  },
};

export default function AtsFriendlyResumeGuidePage() {
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
        name: "Guides",
        item: "https://resumist.app/guides",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "ATS Resume Guide",
        item: "https://resumist.app/guides/ats-friendly-resume-guide",
      },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Make an ATS-Friendly Resume in 2026: The Complete Technical Guide",
    description: "An authoritative guide breaking down ATS parsing algorithms, single-column document structures, quantifiable bullet points, and recruiter search optimization.",
    author: {
      "@type": "Organization",
      name: "Resumist Editorial Team",
      url: "https://resumist.app",
    },
    publisher: {
      "@type": "Organization",
      name: "Resumist",
      url: "https://resumist.app",
    },
    datePublished: "2026-01-15T08:00:00+00:00",
    dateModified: "2026-09-01T12:00:00+00:00",
    mainEntityOfPage: "https://resumist.app/guides/ats-friendly-resume-guide",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is an ATS and why do companies use it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An Applicant Tracking System (ATS) is recruitment software that manages the end-to-end hiring process. Over 98% of Fortune 500 companies use an ATS to ingest thousands of job applications, extract candidate credentials into structured database records, and filter applicants based on qualifications and search queries.",
        },
      },
      {
        "@type": "Question",
        name: "Can ATS systems read two-column resumes in 2026?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "While some cutting-edge AI parsers attempt to segment columns, standard enterprise systems like Taleo and older Workday instances still read two columns left-to-right across the entire page width. This mixes skills, dates, and employers into unintelligible text blocks, causing automated scoring to fail.",
        },
      },
      {
        "@type": "Question",
        name: "What is Google's XYZ formula for resume bullet points?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Google's XYZ formula states: 'Accomplished [X] as measured by [Y], by doing [Z]'. It turns passive task descriptions into measurable business achievements that score heavily in ATS metric-detection algorithms.",
        },
      },
      {
        "@type": "Question",
        name: "Should I submit a PDF or DOCX file to an ATS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A text-layer PDF is recommended because it locks typographical formatting across all recruiter operating systems. However, ensure the PDF contains selectable text and does not render text as flattened images.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />

      <main className="flex-1 w-full pb-20">
        {/* Article Subheader */}
        <div className="w-full bg-surface border-b border-border-default px-4 sm:px-6 lg:px-12 py-6">
          <div className="max-w-4xl mx-auto">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-text-muted text-[11px] font-semibold uppercase tracking-wider mb-2">
              <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
              <span className="text-border-default">/</span>
              <span>Guides</span>
              <span className="text-border-default">/</span>
              <span className="text-primary font-semibold">ATS Resume Guide</span>
            </nav>
            <div className="space-y-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-medium bg-surface-container-low text-primary border border-border-default">
                Definitive Reference Guide (2026 Edition)
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-text-primary">
                How to Make an ATS-Friendly Resume in 2026
              </h1>
              <p className="text-sm sm:text-base text-text-muted max-w-2xl leading-relaxed">
                The definitive technical handbook for passing automated screening in Workday, Greenhouse, Taleo, and Lever without sacrificing human readability.
              </p>
            </div>
          </div>
        </div>

        {/* Guide Content Body */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 pt-10 space-y-12 leading-relaxed">
          {/* Executive Summary / Answer-First */}
          <section className="rounded-xl border border-primary-container/30 bg-surface p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
              <BookOpen className="h-4 w-4" />
              <span>Executive Summary</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              An <strong>ATS-friendly resume</strong> is an employment document engineered to be accurately ingested, tokenized, and indexed by automated recruitment software. In 2026, creating an ATS-compliant resume requires four foundational practices: <strong>1)</strong> Strict single-column vertical layout, <strong>2)</strong> Standard section header taxonomy (<em>Work Experience</em>, <em>Education</em>, <em>Skills</em>), <strong>3)</strong> Vector text-layer PDF export with zero bitmap rasterization, and <strong>4)</strong> Metric-driven bullet points structured according to the Google XYZ framework.
            </p>
          </section>

          {/* Section 1: How Modern ATS Parsers Work */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
              <span className="text-primary text-lg">01.</span>
              <span>How Modern ATS Parsers Ingest Your Resume</span>
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary">
              Corporate applicant tracking systems do not evaluate resumes like human readers. When you upload a resume to platforms like <strong>Workday</strong>, <strong>Greenhouse</strong>, <strong>iCIMS</strong>, or <strong>Lever</strong>, the software initiates a four-stage ingestion pipeline:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="rounded-xl border border-border-default bg-surface p-4 space-y-2">
                <div className="text-xs font-bold text-primary uppercase">Stage 1: Text Layer Extraction</div>
                <p className="text-xs text-text-secondary">
                  The parser converts the binary PDF or DOCX file into an unstructured stream of raw text characters, stripping all styling, colors, and margins.
                </p>
              </div>
              <div className="rounded-xl border border-border-default bg-surface p-4 space-y-2">
                <div className="text-xs font-bold text-secondary uppercase">Stage 2: Section Segmentation</div>
                <p className="text-xs text-text-secondary">
                  Pattern matching algorithms identify known section headers to partition the document into Contact, Work Experience, Education, and Skills bins.
                </p>
              </div>
              <div className="rounded-xl border border-border-default bg-surface p-4 space-y-2">
                <div className="text-xs font-bold text-status-success uppercase">Stage 3: Named Entity Recognition</div>
                <p className="text-xs text-text-secondary">
                  Machine learning models extract job titles, company names, employment date ranges, degree types, and institution names into relational database records.
                </p>
              </div>
              <div className="rounded-xl border border-border-default bg-surface p-4 space-y-2">
                <div className="text-xs font-bold text-text-primary uppercase">Stage 4: Recruiter Search Indexing</div>
                <p className="text-xs text-text-secondary">
                  Extracted keywords and hard skills are added to the employer&apos;s internal candidate search index, allowing recruiters to filter by boolean queries.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: 7 Sins That Break ATS */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
              <span className="text-status-danger text-lg">02.</span>
              <span>The 7 Formatting Traps That Cause Parsing Failures</span>
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary">
              If your resume contains any of the following elements, ATS parsers will either scramble your experience or discard the file entirely:
            </p>

            <div className="space-y-3 pt-2">
              <div className="rounded-xl border border-border-default bg-surface p-4 flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-status-danger shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <strong className="text-text-primary">Multi-Column Layouts &amp; Sidebars:</strong>
                  <p className="text-text-secondary">
                    Parsers read left-to-right across columns. A two-column resume causes the text in Column 1 and Column 2 to interlace into nonsense strings.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border-default bg-surface p-4 flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-status-danger shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <strong className="text-text-primary">Placing Contact Details Inside Headers and Footers:</strong>
                  <p className="text-text-secondary">
                    Many ATS engines completely ignore Word or PDF header/footer zones to prevent page numbers from repeating. Putting your email or phone number in a header makes you uncontactable.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border-default bg-surface p-4 flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-status-danger shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <strong className="text-text-primary">Graphic Skill Bars &amp; Rating Stars:</strong>
                  <p className="text-text-secondary">
                    An SVG circle or progress bar representing &ldquo;90% Python proficiency&rdquo; is ignored by OCR. The parser records 0 mentions of Python.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border-default bg-surface p-4 flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-status-danger shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <strong className="text-text-primary">Creative Non-Standard Section Titles:</strong>
                  <p className="text-text-secondary">
                    Using labels like &ldquo;My Journey&rdquo;, &ldquo;Where I&apos;ve Been&rdquo;, or &ldquo;Capabilities&rdquo; confuses machine learning classification models. Stick to standard industry taxonomy.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-border-default bg-surface p-4 flex items-start gap-3">
                <AlertTriangle className="h-4 w-4 text-status-danger shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <strong className="text-text-primary">Flattened Bitmap Image PDFs (Canva / Photoshop):</strong>
                  <p className="text-text-secondary">
                    If you cannot highlight and copy text from your PDF using your cursor, the ATS cannot extract it either. Ensure your document exports pure vector text layers.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: The Google XYZ Formula */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
              <span className="text-primary text-lg">03.</span>
              <span>Writing High-Scoring Bullet Points: Google&apos;s XYZ Formula</span>
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary">
              Recruiter search algorithms score candidates higher when bullet points contain quantifiable outcomes. Google&apos;s celebrated formula is the industry gold standard:
            </p>

            <div className="rounded-xl border border-primary-container/30 bg-surface-container-low p-5 text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">The Formula</span>
              <div className="text-base sm:text-lg font-bold text-text-primary">
                &ldquo;Accomplished [X] as measured by [Y], by doing [Z]&rdquo;
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="rounded-xl border border-status-danger/30 bg-surface p-4 space-y-2">
                <span className="text-[11px] font-bold text-status-danger uppercase">Weak (Passive Task Description)</span>
                <p className="text-xs text-text-secondary italic">
                  &ldquo;Responsible for improving database queries and maintaining internal applications.&rdquo;
                </p>
                <div className="text-[11px] text-text-muted">ATS detects: 0 metrics, no business outcome, generic passive verb.</div>
              </div>

              <div className="rounded-xl border border-status-success/30 bg-surface p-4 space-y-2">
                <span className="text-[11px] font-bold text-status-success uppercase">Optimized (Google XYZ Compliant)</span>
                <p className="text-xs text-text-secondary">
                  &ldquo;Reduced query latency by 43% across 12M daily transactions by re-indexing PostgreSQL relational tables and implementing Redis caching.&rdquo;
                </p>
                <div className="text-[11px] text-text-muted">ATS detects: 43% reduction, 12M scale metric, PostgreSQL, Redis, active action verb.</div>
              </div>
            </div>
          </section>

          {/* Section 4: Standard Hierarchy */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary flex items-center gap-2">
              <span className="text-primary text-lg">04.</span>
              <span>Canonical Section Hierarchy</span>
            </h2>
            <p className="text-xs sm:text-sm text-text-secondary">
              To achieve 100% data extraction across Workday and Greenhouse, structure your resume in the following exact sequence:
            </p>

            <ol className="list-decimal list-inside space-y-2 text-xs text-text-secondary pt-2">
              <li><strong>Contact Information:</strong> Full Name, Professional Email, Phone Number, City/State, LinkedIn &amp; GitHub URLs.</li>
              <li><strong>Professional Summary:</strong> 2 to 3 sentences highlighting executive discipline, core technical skills, and career scale.</li>
              <li><strong>Work Experience:</strong> Reverse-chronological order with Employer, Job Title, Location, and Start/End Dates (Month Year).</li>
              <li><strong>Education:</strong> Degree, Major, Institution, Graduation Year.</li>
              <li><strong>Technical Skills:</strong> Categorized text strings (Languages, Frameworks, Cloud/Databases, Methodologies).</li>
              <li><strong>Projects &amp; Certifications (Optional):</strong> Highlight public repositories and verified credential badges.</li>
            </ol>
          </section>

          {/* Verification Checklist */}
          <section className="rounded-xl border border-border-default bg-surface p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-bold text-text-primary">
              Pre-Submission ATS Checklist
            </h2>
            <div className="space-y-2.5 text-xs text-text-secondary">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-status-success shrink-0" />
                <span>Is your document formatted in a single linear column?</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-status-success shrink-0" />
                <span>Can you highlight and copy text in your exported PDF with a mouse cursor?</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-status-success shrink-0" />
                <span>Are all section titles standard (<em>Work Experience</em>, <em>Education</em>, <em>Skills</em>)?</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-status-success shrink-0" />
                <span>Does every employment entry have clear dates in MM/YYYY format?</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-status-success shrink-0" />
                <span>Have you tested your score on our free ATS analyzer before applying?</span>
              </div>
            </div>
          </section>

          {/* Internal Hub Linking */}
          <section className="border-t border-border-default pt-8 space-y-4">
            <h3 className="text-sm font-bold text-text-primary">Related ATS Career Optimization Tools:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <Link href="/ats-resume-builder" className="p-3 rounded-lg border border-border-default bg-surface hover:border-primary transition">
                <span className="font-semibold text-text-primary block">ATS Resume Builder</span>
                <span className="text-text-muted text-[11px]">Free Single-Column Studio</span>
              </Link>
              <Link href="/resume-ats-checker" className="p-3 rounded-lg border border-border-default bg-surface hover:border-primary transition">
                <span className="font-semibold text-text-primary block">ATS Score Checker</span>
                <span className="text-text-muted text-[11px]">Instant 4-Pillar Audit</span>
              </Link>
              <Link href="/resume-job-matcher" className="p-3 rounded-lg border border-border-default bg-surface hover:border-primary transition">
                <span className="font-semibold text-text-primary block">Job Relevancy Matcher</span>
                <span className="text-text-muted text-[11px]">Keyword Gap Analysis</span>
              </Link>
              <Link href="/resume-templates" className="p-3 rounded-lg border border-border-default bg-surface hover:border-primary transition">
                <span className="font-semibold text-text-primary block">ATS Templates</span>
                <span className="text-text-muted text-[11px]">4 Tested Designs</span>
              </Link>
            </div>
          </section>

          {/* CTA Box */}
          <section className="rounded-2xl bg-primary text-text-inverse p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">
                Put This Guide Into Practice
              </h2>
              <p className="text-xs sm:text-sm text-text-inverse/85 max-w-xl">
                Build your ATS-compliant resume today with Resumist. Automated scoring, real-time keyword gap detection, and vector PDF exports.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/builder"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-surface text-primary px-6 py-3 text-xs font-bold hover:bg-surface-container-low transition shadow-xs"
              >
                <span>Launch Free Builder</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
