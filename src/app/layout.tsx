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

export const metadata: Metadata = {
  title: "CareerCraft — AI ATS Resume Builder & Job Matcher",
  description:
    "Transform your resume with AI-driven ATS optimization, job description matching, keyword gap analysis, and clean PDF/Word exports.",
  keywords: [
    "ATS Resume Builder",
    "Resume Tailoring",
    "Job Matcher",
    "AI Resume",
    "ATS Analyzer",
    "Career Document Optimization",
  ],
  authors: [{ name: "CareerCraft" }],
  openGraph: {
    title: "CareerCraft — AI ATS Resume Builder & Job Matcher",
    description:
      "Transform your resume with AI-driven ATS optimization, job description matching, keyword gap analysis, and clean PDF/Word exports.",
    type: "website",
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
