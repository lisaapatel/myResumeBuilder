# Current Spacing Values Reference

**Current Scaling:** `spacingScale: 0.82`, `fontSizeScale: 0.93` (optimized for density)

## Base Token Values (from `src/tokens/spacing.ts`)

| Token | Base Value | Effective (×0.82) | Used For |
|-------|------------|-------------------|----------|
| `BASELINE` | 4px | **3px** | Baseline grid unit |
| `SECTION_TIGHT` | 8px | **7px** | Tight section spacing |
| `BLOCK_TIGHT` | 8px | **7px** | Tight block spacing |
| `BLOCK_MINIMAL` | 4px | **3px** | One baseline unit (new) |
| `TINY` | 2px | **2px** | Minimal spacing (2px) |
| `MICRO` | 0px | **0px** | No spacing |
| `INLINE_LARGE` | 16px | **13px** | Large inline spacing |
| `INLINE_SMALL` | 4px | **3px** | Small inline spacing |
| `BULLET_GAP` | 0px | **0px** | Space between bullets |
| `BULLET_INDENT` | 16px | **13px** | Bullet indent |

---

## EXPERIENCE SECTION

### Section Level
- **Section bottom margin:** `BLOCK_TIGHT` = **7px** (scaled from 8px)
- **Section title bottom margin:** `TINY` = **2px**

### Experience Block (Company)
- **Between companies:** `BASELINE` = **3px** (tokenized, scaled from 4px)
- **Grid column gap:** `INLINE_LARGE` = **13px** (scaled from 16px)
- **Grid row gap:** `TINY` = **2px**

### Role Block
- **Between roles (same company):** `MICRO` = **0px**
- **Between bullets:** `BULLET_GAP` = **0px**
- **Bullet indent:** `BULLET_INDENT` = **14px** (scaled from 16px)

---

## EDUCATION SECTION

### Section Level
- **Section bottom margin:** `BASELINE` = **3px** (scaled from 4px)
- **Section title bottom margin:** `TINY` = **2px**

### Education Items
- **Between education items:** `BLOCK_MINIMAL` = **3px** (one baseline unit, matches Experience density)
- **Last item bottom margin:** `0px`

---

## RIGHT COLUMN (SIDEBAR)

### Column Level
- **Sidebar padding:** Asymmetric
  - Top: `0px`
  - Right: `MICRO` = **0px** (minimal, toward page edge)
  - Bottom: `INLINE_SMALL` = **3px** (scaled from 4px)
  - Left: `INLINE_SMALL` = **3px** (scaled from 4px)
- **Column gap:** `12px` (from `PAGE.COLUMN_GAP`, reduced from 16px)

### Sidebar Sections
- **Between sections:** `TINY` = **2px**
- **First section top margin:** `0px`
- **Section title bottom margin:** `MICRO` = **0px**

### Website Section
- **Between items:** `MICRO` = **0px**
- **Item gap (icon to text):** `INLINE_SMALL` = **3px**

### Skills Section
- **Between skill groups:** `MICRO` = **0px** (except last)
- **Category bottom margin:** `0px`

### Projects Section
- **Between projects:** `TINY` = **2px** (except last)
- **Project title bottom margin:** `0px`

### Certifications Section
- **Between certifications:** `MICRO` = **0px** (except last)

---

## HEADER

- **Header bottom margin:** `BASELINE` = **3px** (tokenized, scaled from 4px, reduced from 6px)
- **Header top margin:** `0px`

---

## Summary of Changes Applied

✅ **Global scales optimized:**
- `spacingScale`: 0.85 → **0.82** (3.5% reduction)
- `fontSizeScale`: 0.95 → **0.93** (2% reduction)

✅ **Column balance:**
- Column gap: 16px → **12px** (25% reduction)
- Sidebar padding: Asymmetric (right: 0px, left/bottom: 3px)

✅ **Vertical efficiency:**
- Experience block spacing: Tokenized to `BASELINE` (3px)
- Education spacing: `BLOCK_TIGHT` → `BLOCK_MINIMAL` (7px → 3px)
- Header margin: Tokenized to `BASELINE` (6px → 3px)

All values are now tokenized and baseline-aligned.

---

## Current Issues

- Some values are hardcoded instead of using tokens
- Experience block spacing uses `4px` instead of a token
- Header spacing uses `6px` instead of a token

