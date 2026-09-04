import { NextRequest, NextResponse } from "next/server";
import { parseResumeFromText, normalizeJsonResume } from "@/lib/resumeParser";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    // 1. Multipart Form Data (File Upload: PDF, JSON, TXT)
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;

      if (!file) {
        return NextResponse.json(
          { error: "No file was uploaded." },
          { status: 400 }
        );
      }

      const fileName = file.name.toLowerCase();
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // A. Handle JSON Files
      if (fileName.endsWith(".json") || file.type === "application/json") {
        const textContent = buffer.toString("utf-8");
        const jsonObject = JSON.parse(textContent);
        const structuredResume = normalizeJsonResume(jsonObject);

        return NextResponse.json({
          success: true,
          format: "json",
          data: structuredResume,
          summary: `Successfully parsed and validated ${file.name}.`,
        });
      }

      // B. Handle Plain Text Files (.txt)
      if (fileName.endsWith(".txt") || file.type.startsWith("text/")) {
        const textContent = buffer.toString("utf-8");
        const structuredResume = parseResumeFromText(textContent);

        return NextResponse.json({
          success: true,
          format: "text",
          data: structuredResume,
          summary: `Extracted resume sections from ${file.name}.`,
        });
      }

      // C. Handle PDF Files
      if (fileName.endsWith(".pdf") || file.type === "application/pdf") {
        let extractedText = "";

        // Attempt safe extraction via dynamic import if available
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const pdfParseModule: any = await import("pdf-parse");
          const PDFParser = pdfParseModule.PDFParse || pdfParseModule.default || pdfParseModule;
          if (typeof PDFParser === "function") {
            const parser = new PDFParser({ data: buffer });
            const parsed = await parser.getText();
            extractedText = parsed.text || "";
            if (typeof parser.destroy === "function") {
              await parser.destroy();
            }
          }
        } catch (dynErr) {
          console.warn("Server dynamic PDF parser fallback:", dynErr);
        }

        // Fallback: extract readable strings from raw PDF buffer
        if (!extractedText || extractedText.trim().length < 20) {
          extractedText = extractTextFromRawBuffer(buffer);
        }

        if (!extractedText.trim()) {
          return NextResponse.json(
            {
              error:
                "Unable to extract text from this PDF. It might be a scanned image or protected file. Please paste your resume text directly.",
            },
            { status: 422 }
          );
        }

        const structuredResume = parseResumeFromText(extractedText);
        return NextResponse.json({
          success: true,
          format: "pdf",
          data: structuredResume,
          extractedChars: extractedText.length,
          summary: `Extracted ${structuredResume.experiences.length} experiences, ${structuredResume.educations.length} educations, and ${structuredResume.skillCategories.reduce((acc, c) => acc + c.skills.length, 0)} skills from ${file.name}.`,
        });
      }

      return NextResponse.json(
        { error: "Unsupported file format. Please upload a .PDF, .JSON, or .TXT file." },
        { status: 400 }
      );
    }

    // 2. Direct JSON or Raw Text Payload
    const body = await req.json();

    if (body.json) {
      const structuredResume = normalizeJsonResume(body.json);
      return NextResponse.json({
        success: true,
        format: "json",
        data: structuredResume,
        summary: "Successfully parsed structured JSON resume.",
      });
    }

    if (body.text) {
      const text = String(body.text).trim();
      if (!text) {
        return NextResponse.json({ error: "Empty text provided." }, { status: 400 });
      }

      // Check if text is actually a JSON string
      if (text.startsWith("{") && text.endsWith("}")) {
        try {
          const parsed = JSON.parse(text);
          const structured = normalizeJsonResume(parsed);
          return NextResponse.json({
            success: true,
            format: "json",
            data: structured,
            summary: "Detected and imported JSON schema from text input.",
          });
        } catch {
          // Fall back to plain text extraction
        }
      }

      const structuredResume = parseResumeFromText(text);
      return NextResponse.json({
        success: true,
        format: "text",
        data: structuredResume,
        summary: `Extracted resume data (${structuredResume.experiences.length} experiences, ${structuredResume.educations.length} educations).`,
      });
    }

    return NextResponse.json(
      { error: "Missing file, text, or json payload." },
      { status: 400 }
    );
  } catch (error) {
    console.error("Resume Parse Error:", error);
    const message = error instanceof Error ? error.message : "Failed to parse resume.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function extractTextFromRawBuffer(buffer: Buffer): string {
  const raw = buffer.toString("latin1");
  const textPieces: string[] = [];

  const tjRegex = /\(([^)]+)\)\s*Tj/g;
  let match;
  while ((match = tjRegex.exec(raw)) !== null) {
    if (match[1]) textPieces.push(cleanPdfStr(match[1]));
  }

  const tjArrayRegex = /\[([^\]]+)\]\s*TJ/g;
  while ((match = tjArrayRegex.exec(raw)) !== null) {
    const inner = match[1];
    const subRegex = /\(([^)]+)\)/g;
    let subMatch;
    const subParts: string[] = [];
    while ((subMatch = subRegex.exec(inner)) !== null) {
      if (subMatch[1]) subParts.push(cleanPdfStr(subMatch[1]));
    }
    if (subParts.length > 0) textPieces.push(subParts.join(""));
  }

  return textPieces.join(" ");
}

function cleanPdfStr(s: string): string {
  return s
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\r")
    .replace(/\\t/g, "\t")
    .replace(/\\\(/g, "(")
    .replace(/\\\)/g, ")")
    .replace(/\\\\/g, "\\");
}
