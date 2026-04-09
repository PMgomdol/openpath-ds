/**
 * OPENPATH DS — 컬러 토큰 (DESIGN.md 단일 출처)
 * UI에서는 이 맵을 참조하고, 표시용 hex는 resolvePaletteRef로 해석합니다.
 */

export type PaletteStop = {
  token: string;
  label: string;
  hex: string;
  badge?: string;
};

export const PRIMARY_MINT: PaletteStop[] = [
  { token: "color/palette/primary/M20", label: "M20", hex: "#F3FCFC" },
  { token: "color/palette/primary/M50", label: "M50", hex: "#D6F5F5" },
  { token: "color/palette/primary/M100", label: "M100", hex: "#A8EBEA" },
  { token: "color/palette/primary/M200", label: "M200", hex: "#6DDEDD" },
  {
    token: "color/palette/primary/M300",
    label: "M300",
    hex: "#28D7D2",
    badge: "Main Brand",
  },
  { token: "color/palette/primary/M400", label: "M400", hex: "#1BB8B3" },
  { token: "color/palette/primary/M500", label: "M500", hex: "#0F9490" },
  { token: "color/palette/primary/M600", label: "M600", hex: "#156565" },
];

/** DESIGN.md에 정의된 듀오톤 스텝 (D100/D200 미정의) */
export const DUOTONE_CORAL: PaletteStop[] = [
  { token: "color/palette/duotone/D20", label: "D20", hex: "#FFF1F1" },
  { token: "color/palette/duotone/D50", label: "D50", hex: "#FFD6D6" },
  {
    token: "color/palette/duotone/D300",
    label: "D300",
    hex: "#FE6565",
    badge: "Duotone Brand",
  },
  { token: "color/palette/duotone/D400", label: "D400", hex: "#E54D4D" },
  { token: "color/palette/duotone/D500", label: "D500", hex: "#C93838" },
  { token: "color/palette/duotone/D600", label: "D600", hex: "#A02828" },
];

export const NEUTRAL: PaletteStop[] = [
  { token: "color/palette/neutral/N20", label: "N20", hex: "#F4F5F5" },
  { token: "color/palette/neutral/N100", label: "N100", hex: "#D8DCDE" },
  { token: "color/palette/neutral/N200", label: "N200", hex: "#B0B8BC" },
  { token: "color/palette/neutral/N300", label: "N300", hex: "#889298" },
  { token: "color/palette/neutral/N400", label: "N400", hex: "#60707A" },
  { token: "color/palette/neutral/N500", label: "N500", hex: "#3D5060" },
  { token: "color/palette/neutral/N600", label: "N600", hex: "#29363D" },
];

export const SYSTEM_COLORS: PaletteStop[] = [
  { token: "color/palette/system/red", label: "Error", hex: "#FF3257" },
  { token: "color/palette/system/mint", label: "Success", hex: "#28D7D2" },
  { token: "color/palette/system/orange", label: "Warning", hex: "#EE706B" },
  { token: "color/palette/system/black", label: "Path Black", hex: "#151B1E" },
  { token: "color/palette/system/white", label: "Path White", hex: "#FFFFFF" },
];

/** M20, N100 등 → hex */
const REF_HEX: Record<string, string> = {};
for (const row of [
  ...PRIMARY_MINT,
  ...DUOTONE_CORAL,
  ...NEUTRAL,
]) {
  REF_HEX[row.label] = row.hex;
}
REF_HEX.White = "#FFFFFF";

const HEX_LITERAL = /^#[0-9A-Fa-f]{6}$/;

export function resolveSemanticValue(
  value: string,
  mode: "light" | "dark"
): string {
  const v = value.trim();
  if (HEX_LITERAL.test(v)) return v;
  if (v === "White") return "#FFFFFF";
  const hex = REF_HEX[v];
  if (hex) return hex;
  return mode === "dark" ? "#889298" : "#60707A";
}

export type SemanticRow = {
  token: string;
  light: string;
  dark: string;
};

export type SemanticGroup = {
  id: string;
  title: string;
  rows: SemanticRow[];
};

export const SEMANTIC_GROUPS: SemanticGroup[] = [
  {
    id: "brand",
    title: "color/brand",
    rows: [
      { token: "color/brand/primary", light: "M300", dark: "M300" },
    ],
  },
  {
    id: "text",
    title: "color/text",
    rows: [
      { token: "color/text/default", light: "N600", dark: "White" },
      { token: "color/text/subtle", light: "N300", dark: "N200" },
      { token: "color/text/disabled", light: "N100", dark: "N400" },
      { token: "color/text/on-brand", light: "White", dark: "White" },
    ],
  },
  {
    id: "bg",
    title: "color/bg",
    rows: [
      { token: "color/bg/default", light: "White", dark: "N600" },
      { token: "color/bg/subtle", light: "N20", dark: "N500" },
      { token: "color/bg/brand", light: "M20", dark: "M600" },
    ],
  },
  {
    id: "border",
    title: "color/border",
    rows: [
      { token: "color/border/default", light: "N100", dark: "N400" },
      { token: "color/border/brand", light: "M300", dark: "M300" },
    ],
  },
  {
    id: "status",
    title: "color/status",
    rows: [
      { token: "color/status/error", light: "#FF3257", dark: "#FF3257" },
      { token: "color/status/success", light: "#28D7D2", dark: "#28D7D2" },
      { token: "color/status/warning", light: "#EE706B", dark: "#EE706B" },
    ],
  },
  {
    id: "interactive",
    title: "color/interactive",
    rows: [
      { token: "color/interactive/primary", light: "M300", dark: "M300" },
      { token: "color/interactive/hover", light: "M400", dark: "M200" },
      { token: "color/interactive/pressed", light: "M500", dark: "M100" },
      { token: "color/interactive/disabled", light: "N100", dark: "N400" },
    ],
  },
];
