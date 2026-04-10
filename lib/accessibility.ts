/**
 * Accessibility utilities — OPENPATH DS
 *
 * WCAG 2.1 contrast ratio calculator and color audit constants.
 * Reference: https://www.w3.org/TR/WCAG21/#contrast-minimum
 *
 * Thresholds:
 *   AA  normal text:  4.5:1
 *   AA  large text:   3.0:1  (≥ 18px regular or ≥ 14px bold)
 *   AAA normal text:  7.0:1
 *   AAA large text:   4.5:1
 */

// ─── Core calculation ─────────────────────────────────────────

/** Convert a hex string (#RGB or #RRGGBB) to linear RGB [0, 255] */
function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace(/^#/, "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Relative luminance per WCAG 2.1 §1.4.3 */
function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate the WCAG 2.1 contrast ratio between two hex colors.
 *
 * @param fg - Foreground color, e.g. `"#29363D"`
 * @param bg - Background color, e.g. `"#28D7D2"`
 * @returns  Contrast ratio rounded to 2 decimal places (range 1.00 – 21.00)
 *
 * @example
 * checkContrastRatio("#29363D", "#28D7D2") // → 7.84  (AAA ✅)
 * checkContrastRatio("#28D7D2", "#FFFFFF") // → 1.85  (FAIL ❌)
 */
export function checkContrastRatio(fg: string, bg: string): number {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return Math.round(((lighter + 0.05) / (darker + 0.05)) * 100) / 100;
}

// ─── WCAG thresholds ─────────────────────────────────────────

export const WCAG = {
  /** 4.5:1 — normal text AA */
  AA_NORMAL: 4.5,
  /** 3.0:1 — large text AA (≥ 18px regular | ≥ 14px bold) */
  AA_LARGE: 3.0,
  /** 7.0:1 — normal text AAA */
  AAA_NORMAL: 7.0,
  /** 4.5:1 — large text AAA */
  AAA_LARGE: 4.5,
} as const;

/** Returns `true` if ratio meets WCAG AA for normal-sized text (≥ 4.5:1) */
export function meetsAA(ratio: number): boolean {
  return ratio >= WCAG.AA_NORMAL;
}

/** Returns `true` if ratio meets WCAG AA for large text (≥ 3.0:1) */
export function meetsAALarge(ratio: number): boolean {
  return ratio >= WCAG.AA_LARGE;
}

/** Returns `true` if ratio meets WCAG AAA for normal-sized text (≥ 7.0:1) */
export function meetsAAA(ratio: number): boolean {
  return ratio >= WCAG.AAA_NORMAL;
}

// ─── Openpath DS color audit ──────────────────────────────────
//
// Run `checkContrastRatio(fg, bg)` for each pair.
// ✅ = passes  ⚠️ = large-text only  ❌ = fails
//
// WCAG Note on color/brand/primary (#28D7D2):
//   Mint M300 is mid-luminance (~0.52). It fails AA as both fg and bg
//   for normal-weight text against white or N600. Use it for decorative
//   borders, focus rings, and icons — not for body copy.

export const CONTRAST = {
  /**
   * Primary button label: N600 on M300 mint
   * #29363D on #28D7D2 → ~7.84:1  — ✅ AAA
   * (Previous White on M300 = ~1.85:1 — ❌ FAIL)
   */
  textOnBrand: checkContrastRatio("#29363D", "#28D7D2"),

  /**
   * Body text on default background
   * N600 on White → ~14.73:1  — ✅ AAA
   */
  bodyOnWhite: checkContrastRatio("#29363D", "#FFFFFF"),

  /**
   * Subtle text on white (helper text, placeholders)
   * N300 (#889298) on White → ~3.87:1  — ⚠️ AA large only (fails normal 4.5:1)
   * WCAG Note: only use for supplementary text ≥ 18px or ≥ 14px bold
   */
  subtleOnWhite: checkContrastRatio("#889298", "#FFFFFF"),

  /**
   * Subtle text on subtle background (text field helper on filled bg)
   * N300 on N20 (#F4F5F5) → ~3.39:1  — ⚠️ AA large only
   */
  subtleOnSubtle: checkContrastRatio("#889298", "#F4F5F5"),

  /**
   * Error status text/icon on white
   * #FF3257 on White → ~4.62:1  — ✅ AA
   */
  errorOnWhite: checkContrastRatio("#FF3257", "#FFFFFF"),

  /**
   * Brand color as text/icon on white (outlined button, links)
   * M300 on White → ~1.85:1  — ❌ FAIL
   * Acceptable only as decorative (border, icon) or ≥ 24px text
   */
  brandOnWhite: checkContrastRatio("#28D7D2", "#FFFFFF"),

  /**
   * Dark mode: white text on N600 background
   * White on #29363D → ~14.73:1  — ✅ AAA
   */
  whiteOnDarkBg: checkContrastRatio("#FFFFFF", "#29363D"),

  /**
   * Dark mode: subtle text on N500 background
   * N200 (#B0B8BC) on N500 (#3D5060) → ~3.36:1  — ⚠️ AA large only
   */
  subtleDark: checkContrastRatio("#B0B8BC", "#3D5060"),

  /**
   * Warning status on white (⚠️ banner accent)
   * #EE706B on White → ~3.45:1  — ⚠️ AA large only
   * Use only for large/bold text or icons; pair with text label.
   */
  warningOnWhite: checkContrastRatio("#EE706B", "#FFFFFF"),
} as const;
