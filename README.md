# 📄 Resumist — Free ATS Resume Builder & Career Vault

> A free, privacy-first, local-storage **ATS Resume Builder, Job Description Matcher, Cover Letter Studio, and LinkedIn Optimizer** built with **Next.js 15, React 19, TypeScript, Tailwind CSS v4, and Zustand**. No login, no watermarks, and no export paywalls.

🔗 **Live App:** [https://resume-builder-rho-hazel-32.vercel.app](https://resume-builder-rho-hazel-32.vercel.app)

---

## ✨ Key Features

- **⚡ 3-Pane Interactive Resume Studio (`/builder`):** Document Outline, structured Form Editor, and real-time A4/Letter Live Preview with auto-fit scaling.
- **🎨 6 ATS-Friendly Templates:**
  - **Modern Pro:** Clean modern layout with structured hierarchy.
  - **Harvard Classic:** Traditional single-column serif format.
  - **Minimalist:** Spacious, typography-focused executive design.
  - **Developer Tech:** Tech stack badges, GitHub, and live project links.
  - **Leadership Executive:** Senior leadership & impact-focused layout.
  - **Student / Graduate:** Education-first layout with Portfolio, GitHub, and LinkedIn links.
- **🎯 ATS Score Checker (`/ats-analyzer`):** Audits keyword coverage, quantified impact, parser safety, and raw plain-text extraction.
- **🔍 Job Description Matcher (`/job-matcher`):** Extracts required/preferred skills from any job posting, highlights missing keywords, and branches tailored resume versions.
- **✉️ Targeted Cover Letter Studio (`/cover-letter`):** Generates factually grounded cover letters synced to your active resume and target job posting, with `.txt` export.
- **💼 LinkedIn Profile Studio (`/linkedin`):** Generates recruiter-ready headlines, About narratives, and skill tags from your resume.
- **🗂️ Master Career Vault (`/resumes`):** Multi-version resume management with side-by-side comparison, duplication, and JSON backup/restore.
- **📥 PDF / JSON / Text Import:** Upload existing `.pdf`, `.json`, or `.txt` resumes to auto-populate builder fields.
- **🖨️ Clean Selectable-Text PDF & Word Export:** Direct `jsPDF` vector PDF generation (selectable text, no print-dialog lockups) and Word `.doc` export.
- **💾 100% Persistent Local-First State:** Auto-saves in `localStorage` via Zustand `persist` — your data stays in your browser.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) (`persist` middleware)
- **PDF Generation & Parsing:** `jspdf`, `html2canvas`, `pdf-parse`
- **Icons & Effects:** `lucide-react`, `canvas-confetti`

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Zain1098/Resume-Builder.git
cd Resume-Builder
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 📄 License
MIT License. Free to use and customize.
