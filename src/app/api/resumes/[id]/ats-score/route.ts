import { NextResponse } from "next/server";
import { scoreResumeForAts } from "@/lib/ats/score";

type ResumePayload = { dataJSON: unknown };

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    resume?: ResumePayload;
    keywords?: string[];
  };
  const result = scoreResumeForAts(
    body.resume || { dataJSON: {} },
    body.keywords || [],
  );
  return NextResponse.json(result);
}
