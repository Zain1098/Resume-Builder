"use client";

export async function exportResumeToPdf(
  elementId: string = "resume-print-canvas",
  fileName: string = "Resume.pdf",
  mode: "vector" | "canvas" = "vector"
): Promise<boolean> {
  // If vector mode requested, native high-fidelity print is preferred
  if (mode === "vector") {
    try {
      window.print();
      return true;
    } catch {
      // Fall through to canvas
    }
  }

  try {
    const target = document.getElementById(elementId);
    if (!target) {
      window.print();
      return true;
    }

    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");

    const originalTransform = target.style.transform;
    target.style.transform = "none";

    const canvas = await html2canvas(target, {
      scale: 2.5,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: 1000,
    });

    target.style.transform = originalTransform;

    const imgData = canvas.toDataURL("image/jpeg", 0.98);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = 210;
    const pdfHeight = 297;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgHeight, undefined, "FAST");
    heightLeft -= pdfHeight;

    while (heightLeft > 5) {
      position = position - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgHeight, undefined, "FAST");
      heightLeft -= pdfHeight;
    }

    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error("Canvas PDF export failed, falling back to print:", error);
    window.print();
    return true;
  }
}
