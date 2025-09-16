import { NextResponse } from "next/server";

// In-memory store for demo purposes
type ResumeRecord = { id: string; [key: string]: unknown };
const store: Record<string, ResumeRecord> = {};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id && store[id]) return NextResponse.json(store[id]);
  return NextResponse.json(Object.values(store));
}

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, unknown> & {
    id?: string;
  };
  const id = body.id ?? crypto.randomUUID();
  const resume: ResumeRecord = { id, ...body } as ResumeRecord;
  store[id] = resume;
  return NextResponse.json(resume, { status: 201 });
}
