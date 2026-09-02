import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  if (!dateString) return "";
  if (dateString.toLowerCase() === "present") return "Present";
  
  const parts = dateString.split("-");
  if (parts.length === 1) return parts[0];
  
  const year = parts[0];
  const month = parts[1];
  
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const monthIdx = parseInt(month, 10) - 1;
  return monthIdx >= 0 && monthIdx < 12 ? `${monthNames[monthIdx]} ${year}` : `${month}/${year}`;
}
