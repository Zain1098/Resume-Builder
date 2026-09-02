# 📄 CareerCraft — Professional ATS Resume Builder

> A production-grade, real-time interactive Resume Builder built with **Next.js 15, React 19, TypeScript, Tailwind CSS, and Zustand**.

![CareerCraft](https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&auto=format&fit=crop&q=80)

---

## ✨ Key Features

- **⚡ Split-Screen Interactive Workspace:** Dual-panel editing experience with real-time A4 canvas live preview.
- **🎯 Real-Time ATS Optimization Score:** Built-in ATS compliance analyzer calculating profile completeness and actionable suggestions.
- **🎨 4 Professional ATS-Friendly Templates:**
  - **Modern Pro:** Clean two-column sidebar layout.
  - **Harvard Classic:** Traditional Ivy League single-column serif format.
  - **Minimalist Executive:** Spacious typography-focused Scandinavian design.
  - **Developer Tech:** Compact tech stack badges, GitHub/live project links, and code highlights.
- **💾 100% Persistent State:** Instant local storage auto-save via Zustand — never lose your work on page refresh.
- **🖨️ High-Fidelity Vector PDF Export:** Dedicated `@media print` engine generating selectable, searchable, ATS-ready PDFs.
- **✨ AI-Powered Polishers:**
  - One-click Professional Summary Enhancer.
  - Action-Verb Bullet Point Generator for quantifiable job impact.
- **🔄 JSON Import & Export:** Portable backup and restore capabilities for seamless data portability.
- **📱 Responsive & Mobile Optimized:** Dynamic tabbed editor/preview switcher for mobile and tablet screens.
- **🎨 Custom Styling Engine:** Real-time color palette picker, font switchers (*Inter, Serif, Poppins, Mono*), and margin density controls.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) with `persist` middleware
- **Icons:** [Lucide React](https://lucide.dev/)
- **Confetti Celebration:** `canvas-confetti`

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/resume-builder.git
cd resume-builder
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🌐 Deploying to Vercel

This project is fully optimized for **Vercel**:
1. Push your latest code to your GitHub repository.
2. Import the project in your [Vercel Dashboard](https://vercel.com).
3. Framework Preset will automatically be detected as **Next.js**.
4. Click **Deploy**!

---

## 📄 License
MIT License. Free to use and customize for your portfolio and production needs.
