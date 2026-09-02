"use client";

export async function exportResumeToPdf(
  elementId: string = "resume-print-canvas",
  fileName: string = "Resume.pdf"
): Promise<boolean> {
  try {
    const target = document.getElementById(elementId);
    if (!target) {
      console.error("Resume element not found for PDF export");
      return false;
    }

    // Dynamically import to ensure client-only execution
    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");

    // Save current transform & width
    const originalTransform = target.style.transform;
    target.style.transform = "none";

    // Capture with high DPI
    const canvas = await html2canvas(target, {
      scale: 2.5, // Crisp retina quality
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
      windowWidth: 1000,
    });

    // Restore transform
    target.style.transform = originalTransform;

    const imgData = canvas.toDataURL("image/jpeg", 0.98);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgHeight, undefined, "FAST");
    heightLeft -= pdfHeight;

    // Subsequent pages if content overflows A4 height
    while (heightLeft > 5) {
      position = position - pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgHeight, undefined, "FAST");
      heightLeft -= pdfHeight;
    }

    pdf.save(fileName);
    return true;
  } catch (error) {
    console.error("Failed to generate PDF:", error);
    return false;
  }
}
