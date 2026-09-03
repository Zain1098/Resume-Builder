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
  themeColor: "#2563eb",
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
    default: "CareerCraft — AI ATS Resume Builder & Job Matcher",
    template: "%s | CareerCraft",
  },
  description:
    "Build high-scoring ATS-friendly resumes in minutes with AI. Real-time ATS score analysis, keyword gap matching, job description tailoring, and clean PDF exports.",
  keywords: [
    "ATS Resume Builder",
    "Free AI Resume Builder",
    "Resume Tailoring",
    "Job Matcher",
    "AI Resume Maker",
    "ATS Analyzer",
    "ATS Score Checker",
    "Career Document Optimization",
    "Resume Keyword Matcher",
    "Cover Letter Generator",
    "LinkedIn Optimization",
    "ATS Friendly Templates",
    "Free Resume Maker",
  ],
  authors: [{ name: "CareerCraft", url: siteUrl }],
  creator: "CareerCraft",
  publisher: "CareerCraft",
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "google9ded7b12075aa08c",
  },
  openGraph: {
    title: "CareerCraft — AI ATS Resume Builder & Job Matcher",
    description:
      "Transform your resume with AI-driven ATS optimization, job description matching, keyword gap analysis, and clean PDF/Word exports.",
    url: siteUrl,
    siteName: "CareerCraft",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CareerCraft — AI ATS Resume Builder & Job Matcher",
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
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "CareerCraft",
              url: siteUrl,
              description:
                "AI-driven ATS optimization, job description matching, keyword gap analysis, and professional resume builder.",
              applicationCategory: "BusinessApplication",
              operatingSystem: "All",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
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
