"use client";

import { useState, useRef, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────

type FieldType  = "Filled" | "Outlined";
type FieldState = "Inactive" | "Hover" | "Focused" | "Activated" | "Error" | "Disabled";

// ─── Token Map ────────────────────────────────────────────────

const TOKENS = {
  filled: {
    Inactive:  { bg: "color/bg/subtle",   border: "color/border/default", label: "color/text/subtle",    text: "color/text/default",   helper: "color/text/subtle"   },
    Hover:     { bg: "color/bg/subtle",   border: "color/text/subtle",    label: "color/text/subtle",    text: "color/text/default",   helper: "color/text/subtle"   },
    Focused:   { bg: "color/bg/subtle",   border: "color/border/brand",   label: "color/brand/primary",  text: "color/text/default",   helper: "color/text/subtle"   },
    Activated: { bg: "color/bg/subtle",   border: "color/border/default", label: "color/text/subtle",    text: "color/text/default",   helper: "color/text/subtle"   },
    Error:     { bg: "color/bg/subtle",   border: "color/status/error",   label: "color/status/error",   text: "color/text/default",   helper: "color/status/error"  },
    Disabled:  { bg: "color/bg/subtle",   border: "transparent",          label: "color/text/disabled",  text: "color/text/disabled",  helper: "color/text/disabled" },
  },
  outlined: {
    Inactive:  { bg: "transparent",       border: "color/border/default", label: "color/text/subtle",    text: "color/text/default",   helper: "color/text/subtle"   },
    Hover:     { bg: "transparent",       border: "color/text/subtle",    label: "color/text/subtle",    text: "color/text/default",   helper: "color/text/subtle"   },
    Focused:   { bg: "transparent",       border: "color/border/brand",   label: "color/brand/primary",  text: "color/text/default",   helper: "color/text/subtle"   },
    Activated: { bg: "transparent",       border: "color/border/default", label: "color/text/subtle",    text: "color/text/default",   helper: "color/text/subtle"   },
    Error:     { bg: "transparent",       border: "color/status/error",   label: "color/status/error",   text: "color/text/default",   helper: "color/status/error"  },
    Disabled:  { bg: "transparent",       border: "color/border/default", label: "color/text/disabled",  text: "color/text/disabled",  helper: "color/text/disabled" },
  },
} as const;

// ─── CSS Variable helpers ──────────────────────────────────────

// State → Tailwind classes (border, bg, label color 등)
function getFieldClasses(type: FieldType, state: FieldState) {
  const isFilled   = type === "Filled";
  const isDisabled = state === "Disabled";
  const isFocused  = state === "Focused";
  const isError    = state === "Error";
  const isHover    = state === "Hover";

  const bgClass = isFilled
    ? "bg-[var(--color-bg-subtle)]"
    : "bg-transparent";

  const borderWidth = (isFocused || isError) ? "border-2" : "border";
  const borderColor =
    isError    ? "border-[#FF3257]"
    : isFocused ? "border-mint-300"
    : isHover   ? "border-neutral-300"
    : isDisabled ? (isFilled ? "border-transparent" : "border-neutral-100")
    : "border-neutral-100";

  const radius = isFilled ? "rounded-t-md" : "rounded-md";

  return { bgClass, borderWidth, borderColor, radius };
}

function getLabelColor(state: FieldState): string {
  if (state === "Error")    return "text-[#FF3257]";
  if (state === "Focused")  return "text-mint-300";
  if (state === "Disabled") return "text-neutral-200";
  return "text-neutral-300";
}

function getHelperColor(state: FieldState): string {
  if (state === "Error")    return "text-[#FF3257]";
  if (state === "Disabled") return "text-neutral-200";
  return "text-neutral-300";
}

// ─── TextField ────────────────────────────────────────────────

function TextField({
  type,
  state,
  label      = "레이블",
  placeholder = "텍스트를 입력하세요",
  helperText,
  prefix,
  suffix,
  dropdown,
}: {
  type:       FieldType;
  state:      FieldState;
  label?:     string;
  placeholder?: string;
  helperText?: string;
  prefix?:    string;
  suffix?:    string;
  dropdown?:  boolean;
}) {
  const [hover, setHover]   = useState(false);
  const [focus, setFocus]   = useState(false);
  const [value, setValue]   = useState(state === "Activated" ? "입력된 값 예시" : "");

  const isDisabled   = state === "Disabled";
  const effectState: FieldState = isDisabled ? "Disabled"
    : state === "Error"    ? "Error"
    : state === "Activated" ? "Activated"
    : focus                ? "Focused"
    : hover                ? "Hover"
    : value               ? "Activated"
    : "Inactive";

  const isFloating   = focus || value.length > 0 || state === "Activated" || state === "Error";
  const { bgClass, borderWidth, borderColor, radius } = getFieldClasses(type, effectState);
  const labelColor   = getLabelColor(effectState);
  const helperColor  = getHelperColor(effectState);

  return (
    <div className="w-full max-w-sm">
      <div
        className={`relative flex items-center ${bgClass} ${borderWidth} ${borderColor} ${radius} transition-all duration-150 overflow-hidden`}
        onMouseEnter={() => !isDisabled && setHover(true)}
        onMouseLeave={() => !isDisabled && setHover(false)}
      >
        {/* Prefix */}
        {prefix && (
          <span className="pl-4 pr-2 text-[16px] text-neutral-300 shrink-0 select-none pt-5 pb-2">
            {prefix}
          </span>
        )}

        {/* Input + floating label */}
        <div className="relative flex-1">
          {/* Floating label */}
          <label
            className={`
              absolute left-0 transition-all duration-150 pointer-events-none select-none
              ${isFloating
                ? "top-2 text-[11px] font-medium tracking-[0.04em] " + labelColor
                : "top-1/2 -translate-y-1/2 text-[16px] font-normal text-neutral-300"
              }
              ${!prefix ? (type === "Filled" ? "left-4" : "left-4") : ""}
            `}
          >
            {label}
          </label>

          <input
            type={dropdown ? "button" : "text"}
            disabled={isDisabled}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => !isDisabled && setFocus(true)}
            onBlur={() => !isDisabled && setFocus(false)}
            placeholder=""
            className={`
              w-full bg-transparent outline-none text-[16px]
              ${type === "Filled" ? "pt-6 pb-2 px-4" : "pt-5 pb-3 px-4"}
              ${prefix ? "px-0 pr-4" : ""}
              ${isDisabled ? "cursor-not-allowed text-neutral-200" : "text-[var(--color-text-primary)]"}
              ${dropdown ? "cursor-pointer text-left" : ""}
            `}
          />
        </div>

        {/* Suffix or Dropdown icon */}
        {(suffix || dropdown) && (
          <span className={`pr-4 shrink-0 text-[16px] ${effectState === "Focused" ? "text-mint-300" : "text-neutral-300"} pt-3 pb-2`}>
            {dropdown ? (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            ) : (
              suffix
            )}
          </span>
        )}
      </div>

      {/* Helper text */}
      {helperText && (
        <p className={`mt-1.5 text-[11px] leading-relaxed ${helperColor} px-1`}>
          {helperText}
        </p>
      )}
    </div>
  );
}

// ─── TokenBadge ───────────────────────────────────────────────

function TokenBadge({ token, value }: { token: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(token).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="group flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--color-bg-subtle)] border border-[var(--color-border)] hover:border-mint-300 transition-all duration-150 text-left w-full"
    >
      <code className="text-[11px] font-mono text-mint-500 dark:text-mint-300 flex-1 truncate">{token}</code>
      <span className="text-[11px] text-[var(--color-text-secondary)] shrink-0">{value}</span>
      <span className="text-[10px] text-[var(--color-text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        {copied ? "복사됨" : "복사"}
      </span>
    </button>
  );
}

// ─── Interactive Demo ─────────────────────────────────────────

function InteractiveDemo() {
  const [fieldType,  setFieldType]  = useState<FieldType>("Filled");
  const [fieldState, setFieldState] = useState<FieldState>("Inactive");

  const tokenMap = TOKENS[fieldType === "Filled" ? "filled" : "outlined"][fieldState];

  const tokenList = [
    { token: tokenMap.bg,     label: "Background",   value: fieldType === "Filled" ? "N20 #F4F5F5" : "transparent" },
    { token: tokenMap.border, label: "Border",       value: fieldState === "Focused" ? "M300 #28D7D2" : fieldState === "Error" ? "#FF3257" : "N100 #D8DCDE" },
    { token: tokenMap.label,  label: "Label color",  value: fieldState === "Focused" ? "M300" : fieldState === "Error" ? "#FF3257" : "N300" },
    { token: tokenMap.text,   label: "Input text",   value: "N600 #29363D" },
    { token: tokenMap.helper, label: "Helper text",  value: fieldState === "Error" ? "#FF3257" : "N300" },
    { token: "radius/component/input", label: "Radius", value: fieldType === "Filled" ? "8px (top)" : "8px (all)" },
    { token: "space/04", label: "Padding H", value: "16px" },
    { token: "type/body/md", label: "Input font", value: "16px Regular" },
  ];

  return (
    <section className="mb-16">
      <div className="mb-5">
        <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Interactive Demo</p>
        <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">라이브 미리보기</h2>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
        {/* 미리보기 영역 */}
        <div className="flex items-center justify-center min-h-[180px] px-8 py-12 bg-[var(--color-bg-subtle)] border-b border-[var(--color-border)]">
          <TextField
            type={fieldType}
            state={fieldState}
            label="이름"
            placeholder="홍길동"
            helperText={
              fieldState === "Error" ? "올바른 형식으로 입력해 주세요." :
              fieldState === "Disabled" ? undefined :
              "8자 이내로 입력하세요."
            }
          />
        </div>

        {/* 컨트롤 + 토큰 */}
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--color-border)]">
          <div className="p-6 space-y-5">
            {/* Type */}
            <div>
              <p className="text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-2">Type</p>
              <div className="flex gap-2">
                {(["Filled", "Outlined"] as FieldType[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setFieldType(t)}
                    className={`px-4 py-1.5 rounded-md text-[13px] font-medium border transition-all duration-100 ${
                      fieldType === t
                        ? "bg-mint-300 text-white border-mint-300"
                        : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-mint-300 hover:text-mint-400"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* State */}
            <div>
              <p className="text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-2">State</p>
              <div className="flex flex-wrap gap-2">
                {(["Inactive", "Hover", "Focused", "Activated", "Error", "Disabled"] as FieldState[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setFieldState(s)}
                    className={`px-3 py-1.5 rounded-md text-[13px] font-medium border transition-all duration-100 ${
                      fieldState === s
                        ? "bg-mint-300 text-white border-mint-300"
                        : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-mint-300 hover:text-mint-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 토큰 */}
          <div className="p-6">
            <p className="text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-3">
              적용된 토큰 <span className="text-mint-400">(클릭하여 복사)</span>
            </p>
            <div className="space-y-1.5">
              {tokenList.map((t) => (
                <TokenBadge key={t.token} token={t.token} value={t.value} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── State Gallery ────────────────────────────────────────────

function StateGallery() {
  const [activeType, setActiveType] = useState<FieldType>("Filled");
  const STATES: { state: FieldState; helper?: string; value?: string }[] = [
    { state: "Inactive",  helper: "8자 이내로 입력하세요." },
    { state: "Hover",     helper: "8자 이내로 입력하세요." },
    { state: "Focused",   helper: "8자 이내로 입력하세요." },
    { state: "Activated", helper: "8자 이내로 입력하세요." },
    { state: "Error",     helper: "올바른 형식으로 입력해 주세요." },
    { state: "Disabled" },
  ];

  return (
    <section className="mb-16">
      <div className="mb-5">
        <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">State Gallery</p>
        <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">전체 State 갤러리</h2>
        <p className="text-[14px] text-[var(--color-text-secondary)] mt-1">Filled / Outlined 타입별 State 시각화</p>
      </div>

      {/* Tab */}
      <div className="flex gap-2 mb-6">
        {(["Filled", "Outlined"] as FieldType[]).map((t) => (
          <button
            key={t}
            onClick={() => setActiveType(t)}
            className={`px-4 py-1.5 rounded-md text-[13px] font-medium border transition-all duration-100 ${
              activeType === t
                ? "bg-mint-300 text-white border-mint-300"
                : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-mint-300 hover:text-mint-400"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {STATES.map(({ state, helper }) => (
          <div key={state} className="rounded-xl border border-[var(--color-border)] p-5 bg-[var(--color-bg-subtle)]">
            <p className="text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-4">{state}</p>
            <TextField type={activeType} state={state} label="이름" helperText={helper} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Variant Gallery ──────────────────────────────────────────

function VariantGallery() {
  return (
    <section className="mb-16">
      <div className="mb-5">
        <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Variants</p>
        <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">Variant 데모</h2>
        <p className="text-[14px] text-[var(--color-text-secondary)] mt-1">Prefix / Suffix / Exposed Dropdown</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-8">
        {/* Prefix */}
        <div className="rounded-xl border border-[var(--color-border)] p-6">
          <p className="text-[12px] font-semibold text-[var(--color-text-secondary)] mb-1">Prefix</p>
          <p className="text-[11px] text-[var(--color-text-secondary)] mb-4">고정 단위·프로토콜 등 좌측 표시</p>
          <div className="space-y-4">
            <TextField type="Filled" state="Inactive" label="웹사이트" prefix="https://" />
            <TextField type="Outlined" state="Inactive" label="금액" prefix="₩" />
          </div>
        </div>

        {/* Suffix */}
        <div className="rounded-xl border border-[var(--color-border)] p-6">
          <p className="text-[12px] font-semibold text-[var(--color-text-secondary)] mb-1">Suffix</p>
          <p className="text-[11px] text-[var(--color-text-secondary)] mb-4">단위·액션 아이콘 우측 표시</p>
          <div className="space-y-4">
            <TextField type="Filled" state="Inactive" label="무게" suffix="kg" />
            <TextField type="Outlined" state="Inactive" label="이메일" suffix="@" />
          </div>
        </div>

        {/* Exposed Dropdown */}
        <div className="rounded-xl border border-[var(--color-border)] p-6 sm:col-span-2">
          <p className="text-[12px] font-semibold text-[var(--color-text-secondary)] mb-1">Exposed Dropdown</p>
          <p className="text-[11px] text-[var(--color-text-secondary)] mb-4">우측 chevron-down 아이콘 — 선택형 입력. 클릭 시 Menu 컴포넌트 트리거</p>
          <div className="flex flex-wrap gap-6">
            <TextField type="Filled" state="Inactive" label="지역 선택" dropdown />
            <TextField type="Outlined" state="Inactive" label="카테고리" dropdown />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Spec Table ───────────────────────────────────────────────

function SpecTable() {
  const sizeRows = [
    { attr: "높이",              value: "56px",        token: "—" },
    { attr: "Padding 좌우",      value: "16px",        token: "space/04" },
    { attr: "Padding 상하 (Filled)",  value: "top 16px / bottom 8px", token: "space/04 / space/02" },
    { attr: "Padding 상하 (Outlined)", value: "16px",   token: "space/04" },
    { attr: "Label (Inactive)",  value: "16px Regular", token: "type/body/md" },
    { attr: "Label (Focused·Activated)", value: "12px Medium", token: "type/label/sm" },
    { attr: "Input 폰트",        value: "16px Regular", token: "type/body/md" },
    { attr: "Helper 폰트",       value: "11px Regular", token: "type/caption" },
    { attr: "Border (기본)",     value: "1px",         token: "—" },
    { attr: "Border (Focused·Error)", value: "2px",    token: "—" },
    { attr: "Radius (Filled)",   value: "8px top only", token: "radius/component/input" },
    { attr: "Radius (Outlined)", value: "8px 전체",    token: "radius/component/input" },
  ];

  const stateRows = [
    { state: "Inactive",  bg: "color/bg/subtle",  border: "color/border/default", label: "color/text/subtle",   bw: "1px" },
    { state: "Hover",     bg: "color/bg/subtle",  border: "color/text/subtle",    label: "color/text/subtle",   bw: "1px" },
    { state: "Focused",   bg: "color/bg/subtle",  border: "color/border/brand",   label: "color/brand/primary", bw: "2px" },
    { state: "Activated", bg: "color/bg/subtle",  border: "color/border/default", label: "color/text/subtle",   bw: "1px" },
    { state: "Error",     bg: "color/bg/subtle",  border: "color/status/error",   label: "color/status/error",  bw: "2px" },
    { state: "Disabled",  bg: "color/bg/subtle",  border: "transparent",          label: "color/text/disabled", bw: "1px" },
  ];

  return (
    <section className="mb-16">
      <div className="mb-5">
        <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Spec</p>
        <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">스펙 테이블</h2>
      </div>

      {/* Size spec */}
      <div className="mb-8">
        <p className="text-[13px] font-semibold text-[var(--color-text-primary)] mb-3">Size 수치</p>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border)]">
                {["속성", "Value", "Token"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizeRows.map((row, i) => (
                <tr key={row.attr} className={`border-b border-[var(--color-border)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}>
                  <td className="px-4 py-3 text-[var(--color-text-primary)] font-medium">{row.attr}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-mint-500 dark:text-mint-300">{row.value}</td>
                  <td className="px-4 py-3">
                    {row.token !== "—" ? (
                      <code className="text-[11px] font-mono text-[var(--color-text-secondary)] bg-[var(--color-bg-subtle)] px-2 py-0.5 rounded">{row.token}</code>
                    ) : (
                      <span className="text-neutral-300">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Color tokens by state (Filled) */}
      <div>
        <p className="text-[13px] font-semibold text-[var(--color-text-primary)] mb-3">State별 Color Token (Filled 기준)</p>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border)]">
                {["State", "Background", "Border", "Label", "Border-Width"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stateRows.map((row, i) => (
                <tr key={row.state} className={`border-b border-[var(--color-border)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}>
                  <td className="px-4 py-3 font-semibold text-[var(--color-text-primary)]">{row.state}</td>
                  <td className="px-4 py-3">
                    <code className="text-[11px] font-mono text-mint-500 dark:text-mint-300">{row.bg}</code>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-[11px] font-mono text-[var(--color-text-secondary)]">{row.border}</code>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-[11px] font-mono text-[var(--color-text-secondary)]">{row.label}</code>
                  </td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-text-secondary)]">{row.bw}</td>
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
        <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Guidelines</p>
        <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">Do / Don&apos;t</h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-xl border-2 border-mint-300 bg-mint-20 dark:bg-mint-600/10 p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 rounded-full bg-mint-300 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            </div>
            <span className="text-[14px] font-bold text-mint-500 dark:text-mint-300">Do</span>
          </div>
          <ul className="space-y-3">
            {[
              "Error state에는 반드시 Helper text로 이유를 명시하세요.",
              "Placeholder는 예시값으로 사용하세요. (예: \"홍길동\", \"example@email.com\")",
              "Disabled는 반드시 별도 토큰(color/text/disabled)으로 처리하세요.",
              "Filled는 배경이 있는 폼, Outlined는 카드 위 사용을 권장합니다.",
              "Label이 Floating될 때 크기·색상 전환을 애니메이션으로 표현하세요.",
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-mint-600 dark:text-mint-200">
                <span className="font-bold shrink-0 text-mint-400">✓</span>{t}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border-2 border-system-error/30 bg-red-50 dark:bg-red-950/20 p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 rounded-full bg-[#FF3257] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="white"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </div>
            <span className="text-[14px] font-bold text-[#FF3257]">Don&apos;t</span>
          </div>
          <ul className="space-y-3">
            {[
              "Error border만 변경하고 메시지 없이 끝내지 마세요.",
              "Placeholder에 Label 역할을 시키지 마세요. 포커스 시 사라져서 혼란을 줍니다.",
              "Disabled를 opacity: 0.5로 처리하지 마세요. 전용 토큰을 사용하세요.",
              "색상을 하드코딩하지 마세요. 반드시 토큰을 참조하세요.",
              "Filled와 Outlined를 한 폼 내에서 혼용하지 마세요.",
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-red-700 dark:text-red-300">
                <span className="font-bold shrink-0 text-[#FF3257]">✕</span>{t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────

export default function InputPage() {
  return (
    <div className="px-8 py-10 max-w-[960px]">
      {/* 헤더 */}
      <div className="mb-10 pb-8 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-primary)] mb-2">
          Text Field
        </h1>
        <p className="text-[16px] text-[var(--color-text-secondary)] leading-relaxed max-w-[560px]">
          사용자 입력을 받는 기본 필드 컴포넌트.
          <br />
          <span className="text-mint-400 font-medium">Filled</span> ·{" "}
          <span className="text-mint-400 font-medium">Outlined</span> 두 타입과{" "}
          <span className="text-mint-400 font-medium">6가지 State</span>로 구성됩니다.
        </p>

        <div className="flex flex-wrap gap-2 mt-5">
          {[
            { label: "Filled",    desc: "배경색 + 하단 border" },
            { label: "Outlined",  desc: "투명 배경 + 전체 border" },
            { label: "Prefix",    desc: "좌측 고정 단위·프로토콜" },
            { label: "Suffix",    desc: "우측 단위·액션 아이콘" },
            { label: "Exposed Dropdown", desc: "chevron-down 선택형 Input" },
          ].map((v) => (
            <div key={v.label} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-bg-subtle)] border border-[var(--color-border)]">
              <span className="w-1.5 h-1.5 rounded-full bg-mint-300 shrink-0" />
              <span className="text-[12px] font-semibold text-[var(--color-text-primary)]">{v.label}</span>
              <span className="text-[11px] text-[var(--color-text-secondary)]">— {v.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <InteractiveDemo />
      <StateGallery />
      <VariantGallery />
      <SpecTable />
      <DosDonts />
    </div>
  );
}
