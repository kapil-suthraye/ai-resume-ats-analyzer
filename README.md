# Resume Scorer · AI-Powered ATS Diagnostic Engine

> **Live Application URL:**  
> 🔗 [https://resume-scorer-ai-powered-ats-diagnostic-engine.ai.studio/](https://resume-scorer-ai-powered-ats-diagnostic-engine.ai.studio/)

![ATS Engine v3.8](https://img.shields.io/badge/ATS%20Diagnostic%20Engine-v3.8%20Active-16A34A?style=for-the-badge)
![React 19](https://img.shields.io/badge/React-19.0.1-2563EB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-7.0.2-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.3.3-06B6D4?style=for-the-badge&logo=tailwindcss)
![Privacy](https://img.shields.io/badge/Privacy-Zero--Retention%20Memory-0F172A?style=for-the-badge)

---

## 📌 Executive Overview

**Resume Scorer** is an enterprise-grade applicant tracking system (ATS) diagnostic engine and resume optimization platform. Built for modern job seekers and hiring standards, the application transforms unstructured resume text into quantified competency metrics, simulated ATS compatibility scores, and prioritized bullet-by-bullet rewrites calibrated to elite corporate benchmarks (Google, Meta, Amazon).

The system emulates parsing algorithms across primary enterprise HRIS systems—**Workday, Greenhouse, Lever, and Oracle Taleo**—identifying parsing friction, semantic gaps, and unquantified accomplishments in real time.

---

## 🚀 Key Architectural Capabilities

### 1. 5-Axis Holistic Competency Radar
- **Technical Match (30%)**: Semantic alignment against target job requirements, frameworks, and libraries.
- **Domain Experience (20%)**: Temporal tenure modeling, seniority trajectory (Senior/Staff/Lead), and vertical relevance.
- **Leadership & Soft Skills (15%)**: Cross-squad impact, engineering mentorship, and stakeholder management signals.
- **Quantified Impact (20%)**: Audits accomplishment bullets against the **Google XYZ Formula** (*Accomplished [X] as measured by [Y] by doing [Z]*).
- **ATS Format & Readability (15%)**: Multi-column parsing safety, standard header hierarchy, and glyph integrity.
- **75-Point Industry Benchmark Overlay**: Visualizes candidate competencies against verified senior hires.

### 2. Multi-Format Resume Ingestion & Parsing
- **Zero-Hallucination Extraction**: Powered by `pdfjs-dist` and binary text decoders to extract genuine candidate career history from `.pdf`, `.docx`, and `.txt` files without fabricating data.
- **Volatile In-Memory Processing**: Resumes are parsed locally in browser memory with an ISO 27001 zero-retention guarantee.
- **Pre-Configured Industry Presets**:
  - *Sample 1:* Staff / Senior Full-Stack Engineer (Alex Chen)
  - *Sample 2:* Senior Product Manager · B2B SaaS (Sarah Jenkins)
  - *Sample 3:* Growth Marketing Director (Marcus Vance)

### 3. Actionable Bullet-by-Bullet Rewrites
- Side-by-side **Before vs. After** comparison with quantitative lift indicators (`+12` to `+18` pts).
- Elevates passive, task-based descriptions into high-leverage business accomplishments with statistical proofs (ARR lift, latency drops, SLA percentages, compute cost savings).
- Provides actionable rubric rationales for every suggestion.

### 4. Modified Resume PDF Generator (`.pdf`)
- **Direct PDF Download**: Automatically compiles an ATS-compliant single-column PDF resume with selected rewrites applied.
- **100% Readable Vector Typography**: Utilizes `jsPDF` with sanitized character encoding to eliminate Unicode mojibake (`â€¢`, `â€"`, `â€™`) and ensure clean, non-overlapping line heights.
- **Selective Customization**: Checkbox-level control to pick which rewrites to include, plus an option to inject missing target competencies.
- **Multi-Format Fallbacks**: Export as `.pdf`, Microsoft Word (`.doc`), Markdown (`.md`), or ATS Plain Text (`.txt`).

### 5. Adaptive Light & Dark Theme
- Built with high-contrast, WCAG AA compliant design tokens in Tailwind CSS v4.
- Automatic system preference detection (`prefers-color-scheme`) with persistent localStorage sync.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | [React 19](https://react.dev/) | Component architecture, state hooks, reactive UI |
| **Type Safety** | [TypeScript](https://www.typescriptlang.org/) | End-to-end interface contracts & type checking |
| **Styling & Theme** | [Tailwind CSS v4](https://tailwindcss.com/) | Design tokens, responsive grid, dynamic light/dark mode |
| **Build System** | [Vite 8](https://vitejs.dev/) | Lightning-fast HMR and optimized production bundles |
| **PDF Generation** | [jsPDF](https://github.com/parallax/jsPDF) | Programmatic client-side letter-format PDF compilation |
| **File Parsing** | [pdfjs-dist](https://mozilla.github.io/pdf.js/) | Robust in-browser PDF text and section extraction |
| **Icons & Typography** | Material Symbols & Google Fonts | *Plus Jakarta Sans* & *DM Sans* typographic pairing |

---

## 📋 Scoring Methodology & Diagnostic Rubrics

$$\text{Overall Score} = (0.30 \times \text{Tech}) + (0.20 \times \text{Domain}) + (0.15 \times \text{Leadership}) + (0.20 \times \text{Impact}) + (0.15 \times \text{ATS Format})$$

```
┌─────────────────────────────────┬────────────────────────────────────────────┐
│ Metric Dimension                │ Evaluation Target                          │
├─────────────────────────────────┼────────────────────────────────────────────┤
│ STAR Metric Density             │ ≥ 70% of bullets contain numerical proofs  │
│ Parsing Friction                │ 0 critical errors across major ATS schemas │
│ Keyword Saturation Ratio        │ ≥ 80% coverage of high-frequency JD terms  │
│ Structural Safety               │ Single-column layout, standard headings    │
└─────────────────────────────────┴────────────────────────────────────────────┘
```

---

## 💻 Local Development Setup

### Prerequisites
- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher

### Installation & Run

```bash
# 1. Clone the repository
git clone https://github.com/your-username/resume-scorer.git
cd resume-scorer

# 2. Install dependencies
npm install

# 3. Start development server (Port 3000)
npm run dev

# 4. Run type verification
npm run lint

# 5. Build for production
npm run build
```

---

## 🔒 Security & Privacy Architecture

- **Zero Data Retention**: Uploaded resumes never leave volatile memory and are never persisted to a database or shared with third parties.
- **Client-Side Processing**: PDF generation and file extraction execute entirely within the user's browser runtime.
- **Sanitized Outputs**: All exports undergo strict UTF-8 entity sanitization to safeguard candidate privacy and prevent injection attacks.

---

## 🌐 Live Deployment

Access the deployed application at:  
👉 **[https://resume-scorer-ai-powered-ats-diagnostic-engine.ai.studio/](https://resume-scorer-ai-powered-ats-diagnostic-engine.ai.studio/)**
