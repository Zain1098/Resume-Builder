import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  title: "CareerCraft — Professional ATS Resume Builder",
  description:
    "Build job-winning, ATS-friendly resumes in real-time with customizable templates, instant scoring, AI enhancements, and crisp PDF export.",
  keywords: [
    "Resume Builder",
    "CV Maker",
    "ATS Resume",
    "Free Resume Builder",
    "Developer Resume",
    "Next.js Resume Builder",
  ],
  authors: [{ name: "CareerCraft" }],
  openGraph: {
    title: "CareerCraft — Professional ATS Resume Builder",
    description:
      "Craft modern, ATS-optimized resumes in seconds with live split-screen preview and vector PDF export.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        {children}
      </body>
    </html>
  );
}
