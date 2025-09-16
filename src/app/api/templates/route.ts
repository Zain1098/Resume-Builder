import { NextResponse } from "next/server";

const templates = [
  { slug: "classic", title: "Classic", isPaid: false },
  { slug: "modern", title: "Modern", isPaid: false },
  { slug: "creative", title: "Creative", isPaid: true },
];

export async function GET() {
  return NextResponse.json(templates);
}
