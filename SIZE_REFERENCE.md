# Complete Size & Spacing Reference

**Current Global Scaling:**
- `spacingScale`: **0.82** (18% reduction from base)
- `fontSizeScale`: **0.93** (7% reduction from base)

**Baseline Unit:** 4px (all spacing is a multiple of this)

---

## 📐 PAGE DIMENSIONS

### A4 (Current)
- **Page Size:** 794px × 1123px (210mm × 297mm at 96 DPI)
- **Margins:**
  - Top: **24px**
  - Bottom: **48px**
  - Left: **32px**
  - Right: **32px**
- **Content Area:** 730px × 1051px
- **Sidebar Width:** **160px** (fixed, not scaled)
- **Date Column Width:** **180px** (fixed, not scaled)
- **Column Gap:** **12px** (fixed, not scaled)

---

## 🔤 TYPOGRAPHY

### Font Sizes (Base → Effective with 0.93 scale)

| Token | Base | Effective | Used For |
|-------|------|-----------|----------|
| `SIZE_XXL` | 24px | **22px** | Header name |
| `SIZE_XL` | 20px | **19px** | Section titles (Experience, Education) |
| `SIZE_LG` | 18px | **17px** | (Not currently used) |
| `SIZE_MD` | 14px | **13px** | Body text, bullets, sidebar titles |
| `SIZE_SM` | 12px | **11px** | Small text (dates, locations, sidebar body) |
| `SIZE_XS` | 11px | **10px** | (Not currently used) |

### Line Heights (Fixed, not scaled)

| Token | Value | Used For |
|-------|-------|----------|
| `LINE_HEIGHT_XXL` | **30px** | Header name |
| `LINE_HEIGHT_XL` | **26px** | Section titles |
| `LINE_HEIGHT_LG` | **22px** | (Not currently used) |
| `LINE_HEIGHT_MD` | **19px** | Body text, bullets |
| `LINE_HEIGHT_SM` | **15px** | Small text, sidebar body |
| `LINE_HEIGHT_XS` | **13px** | (Not currently used) |

### Font Weights
- `WEIGHT_BOLD`: **700** (Header name, company names, degree names, subsection labels)
- `WEIGHT_SEMIBOLD`: **600** (Sidebar section titles)
- `WEIGHT_MEDIUM`: **500** (Skill categories, project titles)
- `WEIGHT_NORMAL`: **400** (Body text)

---

## 📏 SPACING TOKENS

### Base Values → Effective (with 0.82 scale)

| Token | Base | Effective | Used For |
|-------|------|-----------|----------|
| `BASELINE` | 4px | **3px** | Baseline grid unit, header margin, experience block spacing |
| `MICRO` | 0px | **0px** | No spacing (role blocks, sidebar items) |
| `TINY` | 2px | **2px** | Minimal spacing (section title margin, experience grid row gap, projects) |
| `INLINE_SMALL` | 4px | **3px** | Sidebar padding, icon gaps |
| `INLINE_MEDIUM` | 8px | **7px** | (Not currently used) |
| `INLINE_LARGE` | 16px | **13px** | Experience grid column gap |
| `BLOCK_MINIMAL` | 4px | **3px** | Education item spacing (one baseline unit) |
| `BLOCK_TIGHT` | 8px | **7px** | Experience section spacing |
| `BLOCK_SMALL` | 12px | **10px** | (Not currently used) |
| `BLOCK_MEDIUM` | 16px | **13px** | (Not currently used) |
| `BLOCK_LARGE` | 24px | **20px** | (Not currently used) |
| `SECTION_TIGHT` | 8px | **7px** | (Not currently used) |
| `SECTION_SMALL` | 16px | **13px** | (Not currently used) |
| `SECTION_MEDIUM` | 24px | **20px** | Default section spacing |
| `SECTION_LARGE` | 32px | **26px** | (Not currently used) |
| `BULLET_GAP` | 0px | **0px** | Space between bullets |
| `BULLET_INDENT` | 16px | **13px** | Bullet point indent |
| `ROLE_BLOCK_GAP` | 0px | **0px** | Space between role blocks |
| `ROLE_META_GAP` | 4px | **3px** | (Not currently used) |

---

## 📄 COMPONENT-SPECIFIC SPACING

### HEADER
- **Top margin:** `0px`
- **Bottom margin:** `BASELINE` = **3px**
- **Font size:** `SIZE_XXL` = **22px**
- **Line height:** `LINE_HEIGHT_XXL` = **30px**

### SECTION (Experience, Education)
- **Title font size:** `SIZE_XL` = **19px**
- **Title line height:** `LINE_HEIGHT_XL` = **26px**
- **Title bottom margin:** `TINY` = **2px**
- **Section bottom margin:**
  - Experience: `BLOCK_TIGHT` = **7px**
  - Education: `BASELINE` = **3px** (custom)

### EXPERIENCE BLOCK
- **Between companies:** `BASELINE` = **3px**
- **Grid layout:**
  - Column gap: `INLINE_LARGE` = **13px**
  - Row gap: `TINY` = **2px**
  - Date column width: **180px** (fixed)

### ROLE BLOCK
- **Bottom margin:** `MICRO` = **0px**
- **Body font size:** `SIZE_MD` = **13px**
- **Body line height:** `LINE_HEIGHT_MD` = **19px**

### BULLET
- **Bottom margin:** `BULLET_GAP` = **0px**
- **Indent:** `BULLET_INDENT` = **13px**
- **Font size:** `SIZE_MD` = **13px**
- **Line height:** `LINE_HEIGHT_MD` = **19px**
- **Subsection label:** Bold, same size

### EDUCATION
- **Section bottom margin:** `BASELINE` = **3px** (custom)
- **Between items:** `BLOCK_MINIMAL` = **3px**
- **Last item bottom margin:** `0px`
- **Degree font:** Bold, `SIZE_MD` = **13px**
- **School/Year font:** `SIZE_SM` = **11px**, italic/grey

### TWO COLUMN LAYOUT
- **Column gap:** **12px** (fixed, not scaled)
- **Sidebar padding:**
  - Top: `0px`
  - Right: `MICRO` = **0px** (minimal, toward page edge)
  - Bottom: `INLINE_SMALL` = **3px**
  - Left: `INLINE_SMALL` = **3px**

### SIDEBAR SECTION
- **Section spacing:** `TINY` = **2px** (between sections)
- **Title font size:** `SIZE_MD` = **13px**
- **Title line height:** `LINE_HEIGHT_MD` = **19px**
- **Title bottom margin:** `MICRO` = **0px**
- **Body font size:** `SIZE_SM` = **11px**
- **Body line height:** `LINE_HEIGHT_SM` = **15px**
- **First section top margin:** `0px`

### SIDEBAR CONTENT ITEMS

#### Website Section
- **Item margin bottom:** `MICRO` = **0px**
- **Icon gap:** `INLINE_SMALL` = **3px**
- **Icon size:** `SIZE_SM` = **11px** (font-size)
- **Icon line height:** `LINE_HEIGHT_SM` = **15px**

#### Skills Section
- **Between skill groups:** `MICRO` = **0px** (last item: `0px`)
- **Category font:** Medium weight, `SIZE_SM` = **11px`
- **Items font:** Grey, `SIZE_SM` = **11px`

#### Projects Section
- **Between projects:** `TINY` = **2px** (last item: `0px`)
- **Title font:** Medium weight, `SIZE_SM` = **11px`
- **Description font:** Grey, `SIZE_SM` = **11px`

#### Certifications Section
- **Between certifications:** `MICRO` = **0px** (last item: `0px`)
- **Font:** Grey, `SIZE_SM` = **11px`

---

## 🎯 SUMMARY OF KEY VALUES

### Most Common Spacing
- **3px** (`BASELINE`): Header margin, experience blocks, education items
- **2px** (`TINY`): Section title margins, experience grid rows, projects
- **0px** (`MICRO`): Role blocks, sidebar items, bullets

### Most Common Font Sizes
- **22px**: Header name
- **19px**: Section titles
- **13px**: Body text, bullets, sidebar titles
- **11px**: Small text (dates, locations, sidebar body)

### Fixed Dimensions (Not Scaled)
- **160px**: Sidebar width
- **180px**: Date column width
- **12px**: Column gap
- **24px**: Top margin
- **32px**: Left/Right margins
- **48px**: Bottom margin

---

## 📊 SPACE EFFICIENCY

**Total Vertical Space Breakdown:**
- Top margin: **24px**
- Bottom margin: **48px**
- Usable content height: **1051px** (A4)

**Density Optimizations Applied:**
- Global spacing reduced by 18% (0.82 scale)
- Global font size reduced by 7% (0.93 scale)
- Column gap reduced: 16px → 12px (25% reduction)
- Sidebar padding asymmetric (right: 0px)
- Education spacing normalized to match Experience (3px)
- Header margin reduced: 6px → 3px (50% reduction)

---

*Last updated: After density optimizations*

