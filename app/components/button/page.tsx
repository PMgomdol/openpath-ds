"use client";

import { useState } from "react";
import type { Metadata } from "next";

// ─── Types ───────────────────────────────────────────────────

type BtnType  = "Primary" | "Secondary" | "Text" | "Icon";
type BtnSize  = "S" | "M" | "L";
type BtnState = "Default" | "Disabled" | "Loading";

// ─── Tokens ──────────────────────────────────────────────────

const TOKEN = {
  primary: {
    bg:         { token: "color/component/button/primary/bg/default",   value: "#28D7D2" },
    bgHover:    { token: "color/component/button/primary/bg/hover",     value: "#1BB8B3" },
    bgPressed:  { token: "color/component/button/primary/bg/pressed",   value: "#0F9490" },
    bgDisabled: { token: "color/component/button/primary/bg/disabled",  value: "#D8DCDE" },
    text:       { token: "color/component/button/primary/text/default", value: "#FFFFFF" },
    textDisabled:{ token: "color/text/disabled",                        value: "#889298" },
  },
  secondary: {
    border:     { token: "color/component/button/secondary/border/default", value: "#28D7D2" },
    text:       { token: "color/component/button/secondary/text/default",   value: "#28D7D2" },
    bgHover:    { token: "color/bg/brand",                                  value: "#F3FCFC" },
  },
  textType: {
    text:       { token: "color/component/button/text/text/default",    value: "#28D7D2" },
    bgHover:    { token: "color/bg/brand",                              value: "#F3FCFC" },
  },
  size: {
    S: {
      height:   { token: "size/component/button/sm/height",    value: "32px" },
      padding:  { token: "space/padding/button/sm",             value: "6px 12px" },
      font:     { token: "type/label/sm",                       value: "12px Medium 0.04em" },
      radius:   { token: "radius/component/button/sm",          value: "4px" },
    },
    M: {
      height:   { token: "size/component/button/md/height",    value: "40px" },
      padding:  { token: "space/padding/button/md",             value: "10px 16px" },
      font:     { token: "type/label/md",                       value: "14px Medium 0.04em" },
      radius:   { token: "radius/component/button/md",          value: "8px" },
    },
    L: {
      height:   { token: "size/component/button/lg/height",    value: "48px" },
      padding:  { token: "space/padding/button/lg",             value: "12px 20px" },
      font:     { token: "type/label/lg",                       value: "16px Medium 0.04em" },
      radius:   { token: "radius/component/button/md",          value: "8px" },
    },
  },
} as const;

// ─── Size Styles ─────────────────────────────────────────────

const SIZE_CLASS: Record<BtnSize, { base: string; icon: string }> = {
  S: { base: "h-8 px-3 text-[12px] rounded",    icon: "h-8 w-8 rounded" },
  M: { base: "h-10 px-4 text-[14px] rounded-md", icon: "h-10 w-10 rounded-md" },
  L: { base: "h-12 px-5 text-[16px] rounded-md", icon: "h-12 w-12 rounded-md" },
};

// ─── Spinner ─────────────────────────────────────────────────

function Spinner({ color }: { color: string }) {
  return (
    <svg
      className="animate-spin shrink-0"
      style={{ width: 16, height: 16 }}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-25"
        cx="12" cy="12" r="10"
        stroke={color} strokeWidth="3"
      />
      <path
        className="opacity-80"
        fill={color}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ─── LiveButton ───────────────────────────────────────────────

function LiveButton({
  type,
  size,
  state,
  label = "버튼",
}: {
  type: BtnType;
  size: BtnSize;
  state: BtnState;
  label?: string;
}) {
  const isDisabled = state === "Disabled";
  const isLoading  = state === "Loading";
  const sc = SIZE_CLASS[size];

  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-medium tracking-[0.04em]
    transition-all duration-150 select-none shrink-0
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-brand)]
    ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}
  `;

  if (type === "Primary") {
    return (
      <button
        disabled={isDisabled}
        className={`
          ${baseClasses}
          ${sc.base}
          ${isDisabled
            ? "bg-neutral-100 text-neutral-300"
            : "bg-[var(--color-brand-primary)] text-[var(--color-text-on-brand)] hover:bg-[var(--color-interactive-hover)] active:bg-[var(--color-interactive-pressed)]"}
        `}
      >
        {isLoading && <Spinner color={isDisabled ? "#889298" : "#fff"} />}
        {label}
      </button>
    );
  }

  if (type === "Secondary") {
    return (
      <button
        disabled={isDisabled}
        className={`
          ${baseClasses}
          ${sc.base}
          border
          ${isDisabled
            ? "border-neutral-100 text-neutral-300"
            : "border-[var(--color-border-brand)] text-[var(--color-brand-primary)] hover:bg-[var(--color-bg-brand)] active:bg-[var(--color-bg-brand)]"}
        `}
      >
        {isLoading && <Spinner color={isDisabled ? "#D8DCDE" : "#28D7D2"} />}
        {label}
      </button>
    );
  }

  if (type === "Text") {
    return (
      <button
        disabled={isDisabled}
        className={`
          ${baseClasses}
          ${sc.base}
          bg-transparent
          ${isDisabled
            ? "text-neutral-300"
            : "text-[var(--color-brand-primary)] hover:bg-[var(--color-bg-brand)] active:bg-[var(--color-bg-brand)]"}
        `}
      >
        {isLoading && <Spinner color={isDisabled ? "#D8DCDE" : "#28D7D2"} />}
        {label}
      </button>
    );
  }

  // Icon-only
  return (
    <button
      disabled={isDisabled}
      className={`
        ${baseClasses}
        ${sc.icon}
        ${isDisabled
          ? "bg-neutral-100 text-neutral-300"
          : "bg-[var(--color-brand-primary)] text-[var(--color-text-on-brand)] hover:bg-[var(--color-interactive-hover)] active:bg-[var(--color-interactive-pressed)]"}
      `}
    >
      {isLoading
        ? <Spinner color={isDisabled ? "#889298" : "#fff"} />
        : (
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
        )
      }
    </button>
  );
}

// ─── TokenBadge ──────────────────────────────────────────────

function TokenBadge({ token, value }: { token: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(token).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="
        group flex items-center gap-2
        px-3 py-1.5 rounded-md
        bg-[var(--color-bg-subtle)]
        border border-[var(--color-border)]
        hover:border-[var(--color-border-brand)]
        transition-all duration-150
        text-left w-full
      "
    >
      <code className="text-[11px] font-mono text-[var(--color-interactive-pressed)] flex-1 truncate">
        {token}
      </code>
      <span className="text-[11px] text-[var(--color-text-secondary)] shrink-0">{value}</span>
      <span className="text-[10px] text-[var(--color-text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        {copied ? "복사됨" : "복사"}
      </span>
    </button>
  );
}

// ─── Interactive Demo ─────────────────────────────────────────

function InteractiveDemo() {
  const [type,  setType]  = useState<BtnType>("Primary");
  const [size,  setSize]  = useState<BtnSize>("M");
  const [state, setState] = useState<BtnState>("Default");

  const currentTokens = () => {
    const sizeTokens = TOKEN.size[size];
    if (state === "Disabled") {
      const bgToken = type === "Primary"
        ? TOKEN.primary.bgDisabled
        : null;
      return [
        ...(bgToken ? [bgToken] : []),
        TOKEN.primary.textDisabled,
        sizeTokens.radius,
        sizeTokens.padding,
        sizeTokens.font,
      ];
    }
    if (type === "Primary") {
      return [TOKEN.primary.bg, TOKEN.primary.text, sizeTokens.radius, sizeTokens.padding, sizeTokens.font];
    }
    if (type === "Secondary") {
      return [TOKEN.secondary.border, TOKEN.secondary.text, sizeTokens.radius, sizeTokens.padding, sizeTokens.font];
    }
    if (type === "Text") {
      return [TOKEN.textType.text, sizeTokens.radius, sizeTokens.padding, sizeTokens.font];
    }
    // Icon
    return [TOKEN.primary.bg, TOKEN.primary.text, sizeTokens.radius, sizeTokens.font];
  };

  return (
    <section className="mb-16">
      <div className="mb-5">
        <p className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Interactive Demo</p>
        <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">라이브 미리보기</h2>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
        {/* 미리보기 영역 */}
        <div className="
          flex items-center justify-center
          min-h-[160px] px-8 py-10
          bg-[var(--color-bg-subtle)]
          border-b border-[var(--color-border)]
        ">
          <LiveButton type={type} size={size} state={state} label="버튼 텍스트" />
        </div>

        {/* 컨트롤 + 토큰 */}
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--color-border)]">
          {/* 컨트롤 패널 */}
          <div className="p-6 space-y-5">
            {/* Type */}
            <div>
              <p className="text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-2">
                Type
              </p>
              <div className="flex flex-wrap gap-2">
                {(["Primary", "Secondary", "Text", "Icon"] as BtnType[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`
                      px-3 py-1.5 rounded-md text-[13px] font-medium border
                      transition-all duration-100
                      ${type === t
                        ? "bg-[var(--color-brand-primary)] text-[var(--color-text-on-brand)] border-[var(--color-border-brand)]"
                        : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-brand)] hover:text-[var(--color-interactive-hover)]"
                      }
                    `}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <p className="text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-2">
                Size
              </p>
              <div className="flex gap-2">
                {(["S", "M", "L"] as BtnSize[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`
                      px-4 py-1.5 rounded-md text-[13px] font-medium border
                      transition-all duration-100
                      ${size === s
                        ? "bg-[var(--color-brand-primary)] text-[var(--color-text-on-brand)] border-[var(--color-border-brand)]"
                        : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-brand)] hover:text-[var(--color-interactive-hover)]"
                      }
                    `}
                  >
                    {s}
                    <span className="ml-1 text-[11px] opacity-60">
                      {s === "S" ? "32px" : s === "M" ? "40px" : "48px"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* State */}
            <div>
              <p className="text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-2">
                State
              </p>
              <div className="flex gap-2">
                {(["Default", "Disabled", "Loading"] as BtnState[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => setState(st)}
                    className={`
                      px-3 py-1.5 rounded-md text-[13px] font-medium border
                      transition-all duration-100
                      ${state === st
                        ? "bg-[var(--color-brand-primary)] text-[var(--color-text-on-brand)] border-[var(--color-border-brand)]"
                        : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-brand)] hover:text-[var(--color-interactive-hover)]"
                      }
                    `}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 토큰 패널 */}
          <div className="p-6">
            <p className="text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-3">
              적용된 토큰 <span className="text-[var(--color-brand-primary)]">(클릭하여 복사)</span>
            </p>
            <div className="space-y-1.5">
              {currentTokens().map((t) => (
                <TokenBadge key={t.token} token={t.token} value={t.value} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Variant Gallery ──────────────────────────────────────────

const GALLERY_TYPES: BtnType[]  = ["Primary", "Secondary", "Text", "Icon"];
const GALLERY_SIZES: BtnSize[]  = ["S", "M", "L"];
const GALLERY_STATES: BtnState[] = ["Default", "Disabled", "Loading"];

function VariantGallery() {
  return (
    <section className="mb-16">
      <div className="mb-5">
        <p className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Variants</p>
        <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">전체 Variant 갤러리</h2>
        <p className="text-[14px] text-[var(--color-text-secondary)] mt-1">
          Type × Size × State 모든 조합
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border)]">
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest w-28">
                Type
              </th>
              {GALLERY_SIZES.map((size) =>
                GALLERY_STATES.map((state) => (
                  <th
                    key={`${size}-${state}`}
                    className="px-4 py-3 text-center text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest"
                  >
                    <span className="text-[var(--color-text-primary)]">{size}</span>
                    <span className="mx-1 opacity-30">/</span>
                    {state}
                  </th>
                ))
              )}
            </tr>
          </thead>
          <tbody>
            {GALLERY_TYPES.map((type, rowIdx) => (
              <tr
                key={type}
                className={`border-b border-[var(--color-border)] last:border-0 ${rowIdx % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}
              >
                <td className="px-4 py-4">
                  <span className="text-[13px] font-semibold text-[var(--color-text-primary)]">{type}</span>
                </td>
                {GALLERY_SIZES.map((size) =>
                  GALLERY_STATES.map((state) => (
                    <td key={`${size}-${state}`} className="px-4 py-4 text-center">
                      <div className="flex justify-center">
                        <LiveButton
                          type={type}
                          size={size}
                          state={state}
                          label={type === "Icon" ? undefined : "버튼"}
                        />
                      </div>
                    </td>
                  ))
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─── Spec Table ───────────────────────────────────────────────

function SpecTable() {
  const sizeSpecs = [
    {
      size: "S", label: "Small",
      height: "32px", padding: "6px 12px", font: "12px / Medium",
      radius: "4px", iconSize: "16dp",
      tokenHeight: "size/component/button/sm/height",
      tokenPad:    "space/padding/button/sm",
      tokenFont:   "type/label/sm",
      tokenRadius: "radius/component/button/sm",
    },
    {
      size: "M", label: "Medium",
      height: "40px", padding: "10px 16px", font: "14px / Medium",
      radius: "8px", iconSize: "20dp",
      tokenHeight: "size/component/button/md/height",
      tokenPad:    "space/padding/button/md",
      tokenFont:   "type/label/md",
      tokenRadius: "radius/component/button/md",
    },
    {
      size: "L", label: "Large",
      height: "48px", padding: "12px 20px", font: "16px / Medium",
      radius: "8px", iconSize: "24dp",
      tokenHeight: "size/component/button/lg/height",
      tokenPad:    "space/padding/button/lg",
      tokenFont:   "type/label/lg",
      tokenRadius: "radius/component/button/md",
    },
  ];

  const stateSpecs = [
    { state: "Default",  bg: "#28D7D2", text: "#FFFFFF", tokenBg: "color/component/button/primary/bg/default",   tokenText: "color/component/button/primary/text/default" },
    { state: "Hover",    bg: "#1BB8B3", text: "#FFFFFF", tokenBg: "color/component/button/primary/bg/hover",     tokenText: "color/component/button/primary/text/default" },
    { state: "Pressed",  bg: "#0F9490", text: "#FFFFFF", tokenBg: "color/component/button/primary/bg/pressed",   tokenText: "color/component/button/primary/text/default" },
    { state: "Disabled", bg: "#D8DCDE", text: "#889298", tokenBg: "color/component/button/primary/bg/disabled",  tokenText: "color/text/disabled" },
  ];

  return (
    <section className="mb-16">
      <div className="mb-5">
        <p className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Spec</p>
        <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">스펙 테이블</h2>
      </div>

      {/* Size 스펙 */}
      <div className="mb-8">
        <p className="text-[13px] font-semibold text-[var(--color-text-primary)] mb-3">Size 별 수치</p>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
          <table className="w-full min-w-[560px] text-[13px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border)]">
                {["Size", "Height", "Padding", "Font", "Radius", "Icon Size"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizeSpecs.map((row, i) => (
                <tr key={row.size} className={`border-b border-[var(--color-border)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}>
                  <td className="px-4 py-3 font-semibold text-[var(--color-text-primary)]">
                    {row.size}
                    <span className="ml-1.5 text-[11px] font-normal text-[var(--color-text-secondary)]">{row.label}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-[12px] text-[var(--color-interactive-pressed)]">{row.height}</span>
                    <div className="text-[10px] text-[var(--color-text-secondary)] mt-0.5 font-mono">{row.tokenHeight}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-[12px] text-[var(--color-text-primary)]">{row.padding}</span>
                    <div className="text-[10px] text-[var(--color-text-secondary)] mt-0.5 font-mono">{row.tokenPad}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-[12px] text-[var(--color-text-primary)]">{row.font}</span>
                    <div className="text-[10px] text-[var(--color-text-secondary)] mt-0.5 font-mono">{row.tokenFont}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-[12px] text-[var(--color-text-primary)]">{row.radius}</span>
                    <div className="text-[10px] text-[var(--color-text-secondary)] mt-0.5 font-mono">{row.tokenRadius}</div>
                  </td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-text-secondary)]">{row.iconSize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* State 스펙 (Primary 기준) */}
      <div>
        <p className="text-[13px] font-semibold text-[var(--color-text-primary)] mb-3">State 별 토큰 (Primary 기준)</p>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border)]">
                {["State", "Background", "Token", "Text", "Token"].map((h, i) => (
                  <th key={i} className="text-left px-4 py-3 text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stateSpecs.map((row, i) => (
                <tr key={row.state} className={`border-b border-[var(--color-border)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}>
                  <td className="px-4 py-3 font-semibold text-[var(--color-text-primary)]">{row.state}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block w-4 h-4 rounded shrink-0 border border-black/10"
                        style={{ backgroundColor: row.bg }}
                      />
                      <span className="font-mono text-[12px] text-[var(--color-text-primary)]">{row.bg}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-[11px] font-mono text-[var(--color-interactive-pressed)] bg-[var(--color-bg-brand)] px-2 py-0.5 rounded">
                      {row.tokenBg}
                    </code>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block w-4 h-4 rounded shrink-0 border border-black/10"
                        style={{ backgroundColor: row.text }}
                      />
                      <span className="font-mono text-[12px] text-[var(--color-text-primary)]">{row.text}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-[11px] font-mono text-[var(--color-interactive-pressed)] bg-[var(--color-bg-brand)] px-2 py-0.5 rounded">
                      {row.tokenText}
                    </code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── Do / Don't ───────────────────────────────────────────────

function DosDonts() {
  return (
    <section className="mb-16">
      <div className="mb-5">
        <p className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Guidelines</p>
        <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">Do / Don&apos;t</h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Do */}
        <div className="rounded-xl border-2 border-[var(--color-border-brand)] bg-[var(--color-bg-brand)] p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 rounded-full bg-[var(--color-brand-primary)] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="white">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </div>
            <span className="text-[14px] font-bold text-[var(--color-interactive-pressed)]">Do</span>
          </div>
          <ul className="space-y-3">
            {[
              { icon: "✓", text: "Primary 버튼은 한 화면에 1개만 사용하세요." },
              { icon: "✓", text: "버튼 텍스트는 동사로 시작하세요. (저장하기, 신청하기, 확인하기)" },
              { icon: "✓", text: "행동의 결과가 명확하도록 구체적인 레이블을 사용하세요." },
              { icon: "✓", text: "Secondary / Text 버튼은 Primary와 함께 계층 구조로 사용하세요." },
              { icon: "✓", text: "아이콘은 텍스트 앞에 배치하고 의미를 보완하는 역할로만 쓰세요." },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-[var(--color-interactive-pressed)]">
                <span className="font-bold shrink-0 text-[var(--color-brand-primary)]">{item.icon}</span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Don't */}
        <div className="rounded-xl border-2 border-system-error/30 bg-[var(--color-bg-error)] p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 rounded-full bg-[#FF3257] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="white">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </div>
            <span className="text-[14px] font-bold text-[#FF3257]">Don&apos;t</span>
          </div>
          <ul className="space-y-3">
            {[
              { text: "한 화면에 Primary 버튼을 2개 이상 사용하지 마세요." },
              { text: "\"확인\", \"OK\" 같은 모호한 레이블을 사용하지 마세요." },
              { text: "색상을 하드코딩하지 마세요. 반드시 토큰을 참조하세요." },
              { text: "State와 Type을 하나의 prop에 혼용하지 마세요." },
              { text: "다크모드 대응을 위해 컴포넌트를 별도로 복제하지 마세요." },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-[var(--color-status-error)]">
                <span className="font-bold shrink-0 text-[#FF3257]">✕</span>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─── Code Section ────────────────────────────────────────────

const BUTTON_SNIPPETS = [
  {
    label: "Primary",
    code: `<button
  style={{
    background: 'var(--color-brand-primary)',  // M300 #28D7D2
    color: 'var(--color-text-on-brand)',        // White
    borderRadius: 'var(--shape-full)',            // 9999px (Pill)
    padding: '10px 16px',
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: '0.04em',
    border: 'none',
    cursor: 'pointer',
  }}
>
  저장하기
</button>`,
  },
  {
    label: "Secondary",
    code: `<button
  style={{
    background: 'transparent',
    color: 'var(--color-brand-primary)',        // M300 #28D7D2
    borderRadius: 'var(--shape-full)',            // 9999px (Pill)
    padding: '10px 16px',
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: '0.04em',
    border: '1px solid var(--color-brand-primary)',
    cursor: 'pointer',
  }}
>
  취소하기
</button>`,
  },
  {
    label: "Text",
    code: `<button
  style={{
    background: 'transparent',
    color: 'var(--color-brand-primary)',        // M300 #28D7D2
    padding: '10px 16px',
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: '0.04em',
    border: 'none',
    cursor: 'pointer',
  }}
>
  더보기
</button>`,
  },
  {
    label: "Disabled",
    code: `<button
  disabled
  style={{
    background: 'var(--color-interactive-disabled)', // N100 #D8DCDE
    color: 'var(--color-text-disabled)',              // N100 #D8DCDE
    borderRadius: 'var(--shape-full)',
    padding: '10px 16px',
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: '0.04em',
    border: 'none',
    cursor: 'not-allowed',
  }}
>
  비활성 버튼
</button>`,
  },
];

function ButtonCodeSection() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(BUTTON_SNIPPETS[active].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="mb-16">
      <div className="mb-5">
        <p className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Code</p>
        <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">코드 스니펫</h2>
        <p className="text-[13px] mt-1 text-[var(--color-text-secondary)]">CSS 변수 기반 React 코드 예시 · 복사 후 바로 사용 가능</p>
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-[var(--color-border)] mb-0">
        {BUTTON_SNIPPETS.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setActive(i)}
            style={{ height: 40, padding: "0 16px" }}
            className={`relative text-[13px] font-medium tracking-[0.04em] transition-all shrink-0
              ${active === i ? "text-[var(--color-brand-primary)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"}`}
          >
            {s.label}
            {active === i && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ background: "var(--color-brand-primary)" }} />
            )}
          </button>
        ))}
      </div>

      {/* Code block */}
      <div className="relative rounded-b-xl rounded-tr-xl overflow-hidden border border-t-0 border-[var(--color-border)]" style={{ background: "var(--color-code-bg)" }}>
        <button
          onClick={copy}
          className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all"
          style={{
            background: copied ? "var(--color-code-copy-done-bg)" : "var(--color-code-copy-idle-bg)",
            color: copied ? "var(--color-brand-primary)" : "var(--color-code-copy-idle-text)",
            border: copied
              ? "1px solid var(--color-code-copy-done-border)"
              : "1px solid var(--color-code-copy-idle-border)",
          }}
        >
          {copied ? (
            <>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              복사됨
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
              복사
            </>
          )}
        </button>
        <pre className="p-5 text-[13px] leading-relaxed overflow-x-auto" style={{ color: "var(--color-code-text)", fontFamily: "'SF Mono', 'Fira Code', monospace" }}>
          <code>{BUTTON_SNIPPETS[active].code}</code>
        </pre>
      </div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────

export default function ButtonPage() {
  return (
    <div className="px-8 py-10 max-w-[960px]">

      {/* 페이지 헤더 */}
      <div className="mb-10 pb-8 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]" />
          <span className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest">
            Components
          </span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-primary)] mb-2">
          Button
        </h1>
        <p className="text-[16px] text-[var(--color-text-secondary)] leading-relaxed max-w-[520px]">
          사용자의 행동을 유도하는 가장 기본적인 인터랙션 컴포넌트.
          <br />
          <span className="text-[var(--color-brand-primary)] font-medium">Type</span> ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">Size</span> ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">State</span> 세 축으로 구성됩니다.
        </p>

        {/* 빠른 변형 요약 뱃지 */}
        <div className="flex flex-wrap gap-2 mt-5">
          {[
            { label: "Primary (Contained)", desc: "민트 배경 + 흰 텍스트" },
            { label: "Secondary (Outlined)", desc: "민트 테두리 + 민트 텍스트" },
            { label: "Text", desc: "텍스트만 민트" },
            { label: "Icon-only", desc: "아이콘 전용" },
          ].map((v) => (
            <div
              key={v.label}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-bg-subtle)] border border-[var(--color-border)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-primary)] shrink-0" />
              <span className="text-[12px] font-semibold text-[var(--color-text-primary)]">{v.label}</span>
              <span className="text-[11px] text-[var(--color-text-secondary)]">— {v.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <InteractiveDemo />
      <VariantGallery />
      <SpecTable />
      <DosDonts />
      <ButtonCodeSection />

    </div>
  );
}
