"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Files,
  PenTool,
  ShieldCheck,
  Target,
} from "lucide-react";

export function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/resumes", label: "Resumes", icon: Files },
    { href: "/builder", label: "Builder", icon: PenTool },
    { href: "/ats-analyzer", label: "ATS Audit", icon: ShieldCheck },
    { href: "/job-matcher", label: "Job Match", icon: Target },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 block border-t border-slate-200 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 lg:hidden print:hidden safe-area-bottom">
      <div className="grid grid-cols-5 h-14">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === "/builder" && pathname === "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-bold"
                  : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "scale-110" : ""}`} />
              <span className="text-[10px] leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
