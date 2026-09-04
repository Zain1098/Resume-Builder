/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Client-side PDF Text Extractor
 * Extracts readable text from PDF documents directly in the browser.
 * Supports pdfjs-dist with dynamic import and CDN worker, with a pure JS stream fallback.
 */

export async function extractTextFromPdfFile(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();

  // Attempt 1: Using pdfjs-dist in the browser
  try {
    // Dynamic import to prevent SSR bundling issues
    // @ts-expect-error pdfjs-dist ESM build lacks direct ambient module declaration
    const pdfjsLib: any = await import("pdfjs-dist/build/pdf.mjs");

    // Configure worker
    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version || "5.4.296"}/build/pdf.worker.min.mjs`;
    }

    const loadingTask = pdfjsLib.getDocument({
      data: new Uint8Array(arrayBuffer),
      useSystemFonts: true,
      isEvalSupported: false,
    });

    const pdfDocument = await loadingTask.promise;
    let fullText = "";

    for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const content = await page.getTextContent();
      
      // Combine text items with smart spacing
      const strings: string[] = [];
      for (const item of content.items) {
        if ("str" in item && typeof item.str === "string") {
          const text = item.str.trim();
          if (text) {
            strings.push(item.str);
          }
        }
      }
      
      fullText += strings.join(" ") + "\n\n";
    }

    if (fullText.trim().length > 30) {
      return fullText;
    }
  } catch (err) {
    console.warn("pdfjs-dist client extraction encountered an issue, trying raw text fallback:", err);
  }

  // Attempt 2: Fallback raw stream string extraction for text-based PDFs
  try {
    const rawText = extractRawTextFromPdfBuffer(new Uint8Array(arrayBuffer));
    if (rawText.trim().length > 30) {
      return rawText;
    }
  } catch (err) {
    console.warn("Raw PDF buffer extraction failed:", err);
  }

  throw new Error(
    "Unable to extract text from this PDF. It appears to be an image-only scan or encrypted. Please copy and paste your resume text directly into the 'Paste Text' tab."
  );
}

/**
 * Fallback parser that scans uncompressed/plain PDF streams for Tj, TJ and text blocks
 */
function extractRawTextFromPdfBuffer(bytes: Uint8Array): string {
  const decoder = new TextDecoder("latin1");
  const raw = decoder.decode(bytes);
  const textPieces: string[] = [];

  // Match text within parenthesis followed by Tj: (Text) Tj
  const tjRegex = /\(([^)]+)\)\s*Tj/g;
  let match;
  while ((match = tjRegex.exec(raw)) !== null) {
    if (match[1]) {
      textPieces.push(unescapePdfString(match[1]));
    }
  }

  // Match array of texts: [(Text) 12 (More text)] TJ
  const tjArrayRegex = /\[([^\]]+)\]\s*TJ/g;
  while ((match = tjArrayRegex.exec(raw)) !== null) {
    const inner = match[1];
    const subRegex = /\(([^)]+)\)/g;
    let subMatch;
    const subParts: string[] = [];
    while ((subMatch = subRegex.exec(inner)) !== null) {
      if (subMatch[1]) {
        subParts.push(unescapePdfString(subMatch[1]));
      }
    }
    if (subParts.length > 0) {
      textPieces.push(subParts.join(""));
    }
  }

  return textPieces.join(" ");
}

function unescapePdfString(str: string): string {
  return str
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\r")
    .replace(/\\t/g, "\t")
    .replace(/\\\(/g, "(")
    .replace(/\\\)/g, ")")
    .replace(/\\\\/g, "\\");
}
