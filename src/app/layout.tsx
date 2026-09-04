import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MobileBottomNav } from "@/components/common/MobileBottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#154539",
  width: "device-width",
  initialScale: 1,
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://careercraft.vercel.app");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Resumist — AI ATS Resume Builder & Career Vault",
    template: "%s | Resumist",
  },
  description:
    "Build high-scoring ATS-friendly resumes in minutes with AI. Real-time ATS parser diagnostic scoring, job description keyword gap matching, factual tailoring, and clean PDF/DOCX exports.",
  keywords: [
    "ATS Resume Builder",
    "Free ATS Resume Checker",
    "AI Resume Builder",
    "Resume Tailoring Tool",
    "Job Description Matcher",
    "ATS Score Calculator",
    "Career Vault",
    "Resume Keyword Matcher",
    "Machine Readable Resume PDF",
    "ATS Friendly Templates",
    "Cover Letter Generator",
    "LinkedIn Profile Optimizer",
  ],
  authors: [{ name: "Resumist Editorial", url: siteUrl }],
  creator: "Resumist",
  publisher: "Resumist",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "google9ded7b12075aa08c",
  },
  openGraph: {
    title: "Resumist — AI ATS Resume Builder & Career Vault",
    description:
      "Transform your resume with AI-driven ATS optimization, job description matching, keyword gap analysis, and clean PDF/Word exports.",
    url: siteUrl,
    siteName: "Resumist",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resumist — AI ATS Resume Builder & Career Vault",
    description:
      "Transform your resume with AI-driven ATS optimization, job description matching, keyword gap analysis, and clean PDF/Word exports.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#software`,
        name: "Resumist",
        url: siteUrl,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Career & Resume Builder",
        operatingSystem: "Web Browser (All Platforms)",
        description:
          "Professional AI ATS resume builder, diagnostic score calculator, job description keyword matcher, and factual tailoring studio.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        featureList: [
          "Real-time ATS parser compatibility score (Workday, Greenhouse, Lever)",
          "Target job description deconstruction and keyword gap analysis",
          "Factual bullet point tailoring using STAR and XYZ impact frameworks",
          "Master Career Vault for maintaining an immutable career source of truth",
          "Multi-version resume branching with side-by-side comparison matrix",
          "Single-column ATS compliant vector PDF and DOCX exports",
          "4 verified ATS visual templates (Modern, Professional, Minimal, Technical)",
          "Cover letter generator and LinkedIn profile headline optimizer",
        ],
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Resumist",
        url: siteUrl,
        logo: `${siteUrl}/icon.png`,
        description:
          "Editorial career document workspace and intelligent ATS resume optimization platform.",
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Resumist",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
      },
    ],
  };

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('careercraft-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full pb-14 lg:pb-0`}
      >
        {children}
        <MobileBottomNav />
      </body>
    </html>
  );
}
