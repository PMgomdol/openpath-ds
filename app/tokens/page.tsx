"use client";

import { useState, useEffect } from "react";

// ─── Token Definitions ───────────────────────────────────────

type TokenRow = {
  variable: string;
  description: string;
  lightValue: string;
  darkValue?: string;
  preview?: "color" | "spacing" | "radius" | "shadow";
};

const COLOR_TOKENS: TokenRow[] = [
  // Interactive
  { variable: "--color-interactive-primary",  description: "브랜드 주요 인터랙션",   lightValue: "#28D7D2", darkValue: "#28D7D2", preview: "color" },
  { variable: "--color-interactive-hover",    description: "Hover 상태",             lightValue: "#1BB8B3", darkValue: "#6DDEDD", preview: "color" },
  { variable: "--color-interactive-pressed",  description: "Pressed 상태",           lightValue: "#0F9490", darkValue: "#A8EBEA", preview: "color" },
  { variable: "--color-interactive-disabled", description: "Disabled 상태",          lightValue: "#D8DCDE", darkValue: "#60707A", preview: "color" },
  // Text
  { variable: "--color-text-default",         description: "기본 텍스트",            lightValue: "#29363D", darkValue: "#FFFFFF",  preview: "color" },
  { variable: "--color-text-subtle",          description: "보조 텍스트",            lightValue: "#889298", darkValue: "#B0B8BC",  preview: "color" },
  { variable: "--color-text-disabled",        description: "비활성 텍스트",          lightValue: "#D8DCDE", darkValue: "#60707A",  preview: "color" },
  { variable: "--color-text-on-brand",        description: "브랜드 배경 위 텍스트",  lightValue: "#FFFFFF", darkValue: "#FFFFFF",  preview: "color" },
  // Background
  { variable: "--color-bg-default",           description: "기본 배경",              lightValue: "#FFFFFF", darkValue: "#29363D",  preview: "color" },
  { variable: "--color-bg-subtle",            description: "보조 배경",              lightValue: "#F4F5F5", darkValue: "#3D5060",  preview: "color" },
  { variable: "--color-bg-brand",             description: "브랜드 서브 배경",       lightValue: "#F3FCFC", darkValue: "#156565",  preview: "color" },
  // Border
  { variable: "--color-border-default",       description: "기본 테두리",            lightValue: "#D8DCDE", darkValue: "#60707A",  preview: "color" },
  { variable: "--color-border-brand",         description: "브랜드 테두리·포커스",   lightValue: "#28D7D2", darkValue: "#28D7D2",  preview: "color" },
  // Brand
  { variable: "--color-brand-primary",        description: "메인 브랜드 컬러",       lightValue: "#28D7D2", darkValue: "#28D7D2",  preview: "color" },
  // Status
  { variable: "--color-status-error",         description: "에러",                   lightValue: "#FF3257", darkValue: "#FF3257",  preview: "color" },
  { variable: "--color-status-success",       description: "성공",                   lightValue: "#28D7D2", darkValue: "#28D7D2",  preview: "color" },
  { variable: "--color-status-warning",       description: "경고",                   lightValue: "#EE706B", darkValue: "#EE706B",  preview: "color" },
];

const SPACING_TOKENS: TokenRow[] = [
  { variable: "--space-01", description: "아이콘 패딩, 미세 간격", lightValue: "4px",  preview: "spacing" },
  { variable: "--space-02", description: "컴포넌트 내부 간격",      lightValue: "8px",  preview: "spacing" },
  { variable: "--space-03", description: "Chip, Badge 패딩",       lightValue: "12px", preview: "spacing" },
  { variable: "--space-04", description: "기본 패딩, Mobile 거터", lightValue: "16px", preview: "spacing" },
  { variable: "--space-05", description: "중간 간격",               lightValue: "20px", preview: "spacing" },
  { variable: "--space-06", description: "섹션 내부, Desktop 거터",lightValue: "24px", preview: "spacing" },
  { variable: "--space-07", description: "카드·컨테이너 패딩",      lightValue: "32px", preview: "spacing" },
  { variable: "--space-08", description: "섹션 간 간격",            lightValue: "40px", preview: "spacing" },
  { variable: "--space-09", description: "대형 섹션 패딩",          lightValue: "48px", preview: "spacing" },
];

const RADIUS_TOKENS: TokenRow[] = [
  { variable: "--radius-tooltip",   description: "Tooltip",            lightValue: "4px",    preview: "radius" },
  { variable: "--radius-button-sm", description: "Small Button",       lightValue: "4px",    preview: "radius" },
  { variable: "--radius-button-md", description: "Medium/Large Button",lightValue: "8px",    preview: "radius" },
  { variable: "--radius-input",     description: "Text Field",         lightValue: "8px",    preview: "radius" },
  { variable: "--radius-snackbar",  description: "Snackbar, Toast",    lightValue: "8px",    preview: "radius" },
  { variable: "--radius-card-sm",   description: "소형 Card",          lightValue: "12px",   preview: "radius" },
  { variable: "--radius-card-md",   description: "기본 Card",          lightValue: "16px",   preview: "radius" },
  { variable: "--radius-dialog",    description: "Dialog, Modal",      lightValue: "16px",   preview: "radius" },
  { variable: "--radius-chip",      description: "Chip, Badge, Tag",   lightValue: "9999px", preview: "radius" },
  { variable: "--radius-fab",       description: "FAB",                lightValue: "9999px", preview: "radius" },
];

const SHADOW_TOKENS: TokenRow[] = [
  { variable: "--shadow-01", description: "Card, List Item (Level 1)",        lightValue: "0 1px 4px rgba(21,27,30,0.08)",  preview: "shadow" },
  { variable: "--shadow-02", description: "Dropdown, Tooltip (Level 2)",      lightValue: "0 2px 8px rgba(21,27,30,0.12)",  preview: "shadow" },
  { variable: "--shadow-03", description: "App Bar, Bottom Nav (Level 3)",    lightValue: "0 4px 16px rgba(21,27,30,0.12)", preview: "shadow" },
  { variable: "--shadow-04", description: "Dialog, Modal, FAB (Level 4)",     lightValue: "0 8px 24px rgba(21,27,30,0.20)", preview: "shadow" },
];

// ─── Helper ───────────────────────────────────────────────────

function getCSSVar(variable: string): string {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
}

// ─── Preview cells ────────────────────────────────────────────

function ColorPreview({ variable }: { variable: string }) {
  const [color, setColor] = useState("");

  useEffect(() => {
    setColor(getCSSVar(variable));
  }, [variable]);

  const isLight = color === "#FFFFFF" || color === "#ffffff" || color === "white";

  return (
    <div
      className="w-7 h-7 rounded-md border border-black/10 shrink-0 transition-colors duration-200"
      style={{ backgroundColor: `var(${variable})` }}
      title={color}
    />
  );
}

function SpacingPreview({ value }: { value: string }) {
  const px = parseInt(value);
  const width = Math.min(px, 96);
  return (
    <div className="flex items-center gap-2">
      <div
        className="h-3 bg-mint-300 rounded-sm shrink-0 transition-all"
        style={{ width }}
      />
      <span className="text-[11px] font-mono text-[var(--color-text-subtle)]">{value}</span>
    </div>
  );
}

function RadiusPreview({ value }: { value: string }) {
  const r = parseInt(value) > 16 ? "9999px" : value;
  return (
    <div
      className="w-8 h-8 border-2 border-mint-300 bg-mint-20 dark:bg-mint-600/20 shrink-0"
      style={{ borderRadius: r }}
    />
  );
}

function ShadowPreview({ value }: { value: string }) {
  return (
    <div
      className="w-8 h-8 rounded-lg bg-[var(--color-bg-default)] shrink-0 border border-[var(--color-border-default)]"
      style={{ boxShadow: value }}
    />
  );
}

// ─── Token Row ────────────────────────────────────────────────

function TokenRowItem({ token, isDark }: { token: TokenRow; isDark: boolean }) {
  const [copied, setCopied] = useState(false);
  const [liveValue, setLiveValue] = useState("");

  useEffect(() => {
    setLiveValue(getCSSVar(token.variable));
  }, [token.variable, isDark]);

  const displayValue = token.preview === "color"
    ? (isDark && token.darkValue ? token.darkValue : token.lightValue)
    : token.lightValue;

  const copy = () => {
    navigator.clipboard.writeText(token.variable).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <tr className="border-b border-[var(--color-border-default)] last:border-0 hover:bg-[var(--color-bg-subtle)] transition-colors group">
      {/* 변수명 */}
      <td className="px-4 py-3">
        <button
          onClick={copy}
          className="flex items-center gap-2 text-left"
          title="클릭하여 복사"
        >
          <code className="text-[12px] font-mono text-mint-500 dark:text-mint-300 group-hover:text-mint-400 transition-colors">
            {token.variable}
          </code>
          <span className={`text-[10px] transition-all ${copied ? "text-mint-400 opacity-100" : "text-[var(--color-text-subtle)] opacity-0 group-hover:opacity-100"}`}>
            {copied ? "복사됨 ✓" : "복사"}
          </span>
        </button>
      </td>

      {/* 설명 */}
      <td className="px-4 py-3 text-[13px] text-[var(--color-text-subtle)]">
        {token.description}
      </td>

      {/* 값 */}
      <td className="px-4 py-3">
        <span className="text-[12px] font-mono text-[var(--color-text-default)]">
          {displayValue}
        </span>
        {token.preview === "color" && token.darkValue && token.darkValue !== token.lightValue && (
          <span className="ml-2 text-[10px] text-[var(--color-text-subtle)]">
            dark: {token.darkValue}
          </span>
        )}
      </td>

      {/* 프리뷰 */}
      <td className="px-4 py-3">
        {token.preview === "color"   && <ColorPreview variable={token.variable} />}
        {token.preview === "spacing" && <SpacingPreview value={token.lightValue} />}
        {token.preview === "radius"  && <RadiusPreview value={token.lightValue} />}
        {token.preview === "shadow"  && <ShadowPreview value={token.lightValue} />}
      </td>
    </tr>
  );
}

// ─── Section ──────────────────────────────────────────────────

function TokenSection({
  label,
  tokens,
  isDark,
}: {
  label: string;
  tokens: TokenRow[];
  isDark: boolean;
}) {
  return (
    <section className="mb-12">
      <div className="mb-4">
        <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Token</p>
        <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">{label}</h2>
        <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
          {tokens.length}개 토큰 — 클릭하여 변수명 복사
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
              {["CSS Variable", "설명", "Value", "Preview"].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 text-[11px] font-semibold text-[var(--color-text-subtle)] uppercase tracking-widest"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tokens.map((token) => (
              <TokenRowItem key={token.variable} token={token} isDark={isDark} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────

export default function TokensPage() {
  const [isDark, setIsDark] = useState(false);
  const [category, setCategory] = useState<"all" | "color" | "spacing" | "radius" | "shadow">("all");

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const CATEGORIES = [
    { key: "all",     label: "전체" },
    { key: "color",   label: "Color" },
    { key: "spacing", label: "Spacing" },
    { key: "radius",  label: "Radius" },
    { key: "shadow",  label: "Shadow" },
  ] as const;

  return (
    <div className="px-8 py-10 max-w-[1040px]">
      {/* 헤더 */}
      <div className="mb-10 pb-8 border-b border-[var(--color-border-default)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">Design Tokens</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-default)] mb-2">
          Tokens
        </h1>
        <p className="text-[16px] text-[var(--color-text-subtle)] leading-relaxed max-w-[560px]">
          모든 디자인 결정의 기반이 되는 토큰 시스템.
          <br />
          <span className="text-mint-400 font-medium">CSS 변수</span>로 등록되어 Light/Dark 모드를 자동 지원합니다.
        </p>

        {/* 요약 뱃지 */}
        <div className="flex flex-wrap gap-2 mt-5">
          {[
            { label: "Color",   count: COLOR_TOKENS.length },
            { label: "Spacing", count: SPACING_TOKENS.length },
            { label: "Radius",  count: RADIUS_TOKENS.length },
            { label: "Shadow",  count: SHADOW_TOKENS.length },
          ].map((v) => (
            <div key={v.label} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-bg-subtle)] border border-[var(--color-border-default)]">
              <span className="w-1.5 h-1.5 rounded-full bg-mint-300 shrink-0" />
              <span className="text-[12px] font-semibold text-[var(--color-text-default)]">{v.label}</span>
              <span className="text-[11px] text-[var(--color-text-subtle)]">{v.count}개</span>
            </div>
          ))}
        </div>

        {/* Dark mode 안내 */}
        <div className={`mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[12px] font-medium transition-all ${
          isDark
            ? "bg-mint-600/20 border-mint-600/30 text-mint-300"
            : "bg-[var(--color-bg-subtle)] border-[var(--color-border-default)] text-[var(--color-text-subtle)]"
        }`}>
          <span>{isDark ? "🌙" : "☀️"}</span>
          <span>{isDark ? "Dark 모드 — Color 값이 다크 토큰으로 표시됩니다" : "Light 모드 — 우측 상단 토글로 Dark 전환 시 Color 값이 바뀝니다"}</span>
        </div>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex gap-2 mb-10">
        {CATEGORIES.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setCategory(key)}
            className={`px-4 py-1.5 rounded-md text-[13px] font-medium border transition-all ${
              category === key
                ? "bg-mint-300 text-white border-mint-300"
                : "border-[var(--color-border-default)] text-[var(--color-text-subtle)] hover:border-mint-300 hover:text-mint-400"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Token Sections */}
      {(category === "all" || category === "color") && (
        <TokenSection label="Color" tokens={COLOR_TOKENS} isDark={isDark} />
      )}
      {(category === "all" || category === "spacing") && (
        <TokenSection label="Spacing" tokens={SPACING_TOKENS} isDark={isDark} />
      )}
      {(category === "all" || category === "radius") && (
        <TokenSection label="Radius" tokens={RADIUS_TOKENS} isDark={isDark} />
      )}
      {(category === "all" || category === "shadow") && (
        <TokenSection label="Shadow" tokens={SHADOW_TOKENS} isDark={isDark} />
      )}
    </div>
  );
}
