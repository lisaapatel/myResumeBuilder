# Resume Template Builder (React + TypeScript + Print-Accurate Layout)

A resume template builder focused on **pixel-perfect print/PDF output** and **one-page overflow protection**.
<img width="763" height="853" alt="Screenshot 2026-01-14 at 10 39 03 PM" src="https://github.com/user-attachments/assets/a99f40a7-fc0c-49f9-96c0-8bd667defc63" />


## Tech Stack

- **React 18**
- **TypeScript**
- **Vite**
- **react-feather** (icons)

## Quick Start

```bash
npm install
npm run dev
```

## Editing Your Resume Content

All resume content is stored in:

- `src/data/resume.data.ts`

Update `resumeData` (name, contact links, experience roles + bullets, education, skills, projects).

### Experience bullets

Bullets support an optional inline label via `subSection`, e.g.:

- `subSection: "Monetization"` → renders as `Monetization: ...`

## Printing / Exporting to PDF

- Click **Print** in the UI.
- If overflow is detected, printing is disabled (to prevent cutting content).
- Save as PDF from your browser print dialog.

## Useful Controls

### Command Bar

- **Cmd+K (macOS)** / **Ctrl+K (Windows)** opens the command bar:
  - Tighten/loosen spacing
  - Increase/decrease body font scale
  - Auto-fit to one page
  - Toggle baseline grid overlay
  - View overflow details

### Page Size Toggle

- Switch between **Letter** and **A4** in the UI.

## How It Works (Architecture)

### Deterministic page box (print accuracy)

- `src/app/PrintLayer.tsx` renders an exact pixel-sized “hard page box” for Letter/A4.
- `src/styles/print.css` hides the preview UI and prints only the isolated print tree.

### Overflow detection (one-page guard)

- `src/app/OverflowGuard.tsx` measures the rendered `.resume-page` height inside the hard page box.
- When content exceeds the printable area, it shows a warning and disables printing.

### Design tokens (consistent spacing & typography)

- `src/tokens/page.ts`: page size, margins, column widths, gutters
- `src/tokens/spacing.ts`: spacing scale tokens (including bullet indent)
- `src/tokens/typography.ts`: font sizes, weights, line heights

### Constraint-based scaling (fit to one page)

- `src/layout/constraints.ts` scales spacing and font sizes using:
  - `spacingScale`
  - `fontSizeScale`

These can be adjusted via the command bar to help your resume fit on one page without manual micro-tweaks.


