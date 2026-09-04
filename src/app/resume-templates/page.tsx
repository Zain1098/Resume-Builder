import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/common/Navbar";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Layers,
  Briefcase,
  Layout,
  Code2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "ATS-Friendly Resume Templates — Tested Single-Column Layouts (2026) | Resumist",
  description:
    "Explore 4 ATS-tested single-column resume templates designed for Workday, Greenhouse, Taleo, and Lever. Built with clean text layers and guaranteed parser compatibility.",
  alternates: {
    canonical: "https://resumist.app/resume-templates",
  },
  openGraph: {
    title: "ATS-Friendly Resume Templates — Tested Single-Column Layouts (2026) | Resumist",
    description:
      "Explore 4 ATS-tested single-column resume templates designed for Workday, Greenhouse, Taleo, and Lever.",
    url: "https://resumist.app/resume-templates",
  },
};

export default function ResumeTemplatesLandingPage() {
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
        name: "Resume Templates",
        item: "https://resumist.app/resume-templates",
      },
    ],
  };

  const templatesItemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Modern ATS Resume Template",
        description: "Contemporary sans-serif single-column layout optimized for modern tech, product, and high-growth venture roles.",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Professional ATS Resume Template",
        description: "Classic executive serif design engineered for finance, consulting, legal, and enterprise management positions.",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Minimal ATS Resume Template",
        description: "Stark typographic hierarchy with generous whitespace, favored by design leaders and generalists.",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Technical ATS Resume Template",
        description: "High-density layout featuring monospace accents and prioritized technical stacks for software and systems engineers.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(templatesItemListJsonLd) }}
      />
      <Navbar />

      <main className="flex-1 w-full pb-20">
        {/* Subheader */}
        <div className="w-full bg-surface border-b border-border-default px-4 sm:px-6 lg:px-12 py-5">
          <div className="max-w-5xl mx-auto">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-text-muted text-[11px] font-semibold uppercase tracking-wider mb-2">
              <Link href="/" className="hover:text-text-primary transition-colors">Home</Link>
              <span className="text-border-default">/</span>
              <span className="text-primary font-semibold">Templates</span>
            </nav>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-text-primary">
                  4 ATS-Tested Resume Templates for 2026
                </h1>
                <p className="text-sm sm:text-base text-text-muted max-w-3xl mt-2 leading-relaxed">
                  Engineered with zero tables, zero multi-column traps, and pure vector text layers. Guaranteed to pass automated screening across every major corporate ATS.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/builder"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-text-inverse hover:opacity-95 shadow-sm transition"
                >
                  <span>Open Builder</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 pt-10 space-y-12">
          {/* Answer-First Box */}
          <section className="rounded-xl border border-primary-container/30 bg-surface p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" />
              <span>Direct Answer Definition</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
              What Makes a Resume Template ATS-Friendly?
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              An <strong>ATS-Friendly Resume Template</strong> is a document blueprint designed to follow strict computer-vision and text extraction constraints. It enforces a <strong>single-column vertical reading stream</strong>, standard section titles (<em>Work Experience</em>, <em>Education</em>, <em>Skills</em>), standard typography (Inter, Garamond, Roboto), and exports pure selectable text rather than flattened bitmap graphics. These guarantees eliminate parsing errors in enterprise applicant databases like Workday, Greenhouse, Taleo, and Lever.
            </p>
          </section>

          {/* Template Cards Grid */}
          <section className="space-y-6">
            <div className="border-b border-border-default pb-4">
              <h2 className="text-2xl font-bold tracking-tight text-text-primary">
                Explore Resumist ATS Templates
              </h2>
              <p className="text-xs sm:text-sm text-text-muted mt-1">
                Every template is built with identical ATS-safe structural semantics while expressing distinct professional personalities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Template 1: Modern */}
              <div className="rounded-xl border border-border-default bg-surface p-6 space-y-4 shadow-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                      <Layout className="h-4 w-4" />
                      <span>Modern Template</span>
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-surface-container-low text-text-muted border border-border-default">
                      Most Popular
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">
                    Clean Sans-Serif with Subtle Emerald Accents
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Balanced typography with a left-aligned contact header and clear horizontal dividers between career stages. Highlights role progression, company tenures, and measurable business outcomes without visual clutter.
                  </p>
                  <div className="space-y-1 text-xs text-text-muted pt-2 border-t border-border-default">
                    <div><strong>Best for:</strong> Product Managers, Marketing Leaders, Growth &amp; SaaS Professionals</div>
                    <div><strong>Typography:</strong> Inter Sans / Clean Geometry</div>
                    <div><strong>ATS Compatibility:</strong> 100% Single-Column Verified</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border-default flex items-center justify-between">
                  <Link
                    href="/builder"
                    className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <span>Use Modern Template</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Template 2: Professional */}
              <div className="rounded-xl border border-border-default bg-surface p-6 space-y-4 shadow-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-secondary">
                      <Briefcase className="h-4 w-4" />
                      <span>Professional Template</span>
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-surface-container-low text-text-muted border border-border-default">
                      Executive Standard
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">
                    Classic Centered Serif Layout
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Formal editorial styling with centered candidate header, traditional serif headings, and conservative line-spacing. Projects seasoned leadership authority and institutional credibility.
                  </p>
                  <div className="space-y-1 text-xs text-text-muted pt-2 border-t border-border-default">
                    <div><strong>Best for:</strong> Investment Banking, Corporate Law, Management Consulting, Healthcare</div>
                    <div><strong>Typography:</strong> Traditional Editorial Serif</div>
                    <div><strong>ATS Compatibility:</strong> 100% Single-Column Verified</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border-default flex items-center justify-between">
                  <Link
                    href="/builder"
                    className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <span>Use Professional Template</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Template 3: Minimal */}
              <div className="rounded-xl border border-border-default bg-surface p-6 space-y-4 shadow-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-text-primary">
                      <Layers className="h-4 w-4" />
                      <span>Minimal Template</span>
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-surface-container-low text-text-muted border border-border-default">
                      High White-Space
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">
                    Stark Typographic Contrast &amp; Brevity
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Designed for candidates whose work speaks through concise, high-impact statements. Strips all decorative rules to maximize visual breathing room and readability.
                  </p>
                  <div className="space-y-1 text-xs text-text-muted pt-2 border-t border-border-default">
                    <div><strong>Best for:</strong> UI/UX Designers, Product Architects, Creative Directors, Founders</div>
                    <div><strong>Typography:</strong> Ultra-clean Minimalist Sans</div>
                    <div><strong>ATS Compatibility:</strong> 100% Single-Column Verified</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border-default flex items-center justify-between">
                  <Link
                    href="/builder"
                    className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <span>Use Minimal Template</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Template 4: Technical */}
              <div className="rounded-xl border border-border-default bg-surface p-6 space-y-4 shadow-xs flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-status-success">
                      <Code2 className="h-4 w-4" />
                      <span>Technical Template</span>
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-surface-container-low text-text-muted border border-border-default">
                      Engineer Focused
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">
                    High-Density Stack Matrix &amp; Repo Links
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Engineered to prioritize technical competencies, programming languages, infrastructure toolsets, and open-source contributions. Compact vertical spacing accommodates deep technical bullet points.
                  </p>
                  <div className="space-y-1 text-xs text-text-muted pt-2 border-t border-border-default">
                    <div><strong>Best for:</strong> Software Engineers, Cloud/DevOps Architects, Data Scientists, Security Specialists</div>
                    <div><strong>Typography:</strong> Technical Sans with Monospace accents</div>
                    <div><strong>ATS Compatibility:</strong> 100% Single-Column Verified</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border-default flex items-center justify-between">
                  <Link
                    href="/builder"
                    className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <span>Use Technical Template</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ATS Compliance Guarantee */}
          <section className="rounded-xl border border-border-default bg-surface p-6 sm:p-8 space-y-4">
            <h2 className="text-lg font-bold text-text-primary">
              Our 5-Point ATS Template Guarantee
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2 text-xs text-text-secondary">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-status-success shrink-0 mt-0.5" />
                <span>Zero complex multi-column grids or sidebars</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-status-success shrink-0 mt-0.5" />
                <span>Zero nested HTML tables or floating frames</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-status-success shrink-0 mt-0.5" />
                <span>Machine-readable standard section headers</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-status-success shrink-0 mt-0.5" />
                <span>Text-layer PDF export with zero bitmap rasterization</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-status-success shrink-0 mt-0.5" />
                <span>Full compatibility with Workday, Lever &amp; Greenhouse</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-status-success shrink-0 mt-0.5" />
                <span>Free instant switching between all 4 styles</span>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl bg-primary text-text-inverse p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">
                Customize Any Template with Live Preview
              </h2>
              <p className="text-xs sm:text-sm text-text-inverse/85 max-w-xl">
                Switch between templates with one click in the builder without retyping your career history.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/builder"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-surface text-primary px-6 py-3 text-xs font-bold hover:bg-surface-container-low transition shadow-xs"
              >
                <span>Customize in Builder</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
