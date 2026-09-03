import { NextRequest, NextResponse } from "next/server";
import {
  localImproveBulletPoint,
  localGenerateProfessionalSummary,
  generateCoverLetter,
  tailorResumeToJob,
  BulletStyle,
  CoverLetterTone
} from "@/lib/aiService";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (!action) {
      return NextResponse.json({ error: "Missing required action" }, { status: 400 });
    }

    if (action === "improveBullet") {
      const text = body.text || "";
      const style: BulletStyle = body.style || "professional";
      const result = localImproveBulletPoint(text, style);
      return NextResponse.json(result);
    }

    if (action === "generateSummary") {
      const { resume, targetRole, jobContext } = body;
      const summary = localGenerateProfessionalSummary(resume, targetRole, jobContext);
      return NextResponse.json({ summary });
    }

    if (action === "tailorResume") {
      const { resume, jobAnalysis } = body;
      if (!resume || !jobAnalysis) {
        return NextResponse.json({ error: "Missing resume or jobAnalysis" }, { status: 400 });
      }
      const tailoredResult = tailorResumeToJob(resume, jobAnalysis);
      return NextResponse.json(tailoredResult);
    }

    if (action === "coverLetter") {
      const { resume, jobText, tone } = body;
      const letter = await generateCoverLetter(resume, jobText || "", (tone as CoverLetterTone) || "professional");
      return NextResponse.json({ coverLetter: letter });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error) {
    console.error("AI API Error:", error);
    return NextResponse.json(
      { error: "Internal AI service failure", message: String(error) },
      { status: 500 }
    );
  }
}
