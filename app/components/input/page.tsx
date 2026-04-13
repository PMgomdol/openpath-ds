"use client";

import { useState } from "react";
import TextField from "@/components/ui/TextField";
import CodeBlock from "@/components/ui/CodeBlock";

// ── Code snippets ──────────────────────────────────────────────
const INPUT_SNIPPETS = [
  {
    label: "Filled",
    code: `import { useState } from "react";
import TextField from "@/components/ui/TextField";

export function SearchField() {
  const [value, setValue] = useState("");
  return (
    <TextField
      variant="filled"
      label="검색어 입력"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      clearable
      helperText="Enter 키로 검색"
    />
  );
}`,
  },
  {
    label: "Outlined",
    code: `import { useState } from "react";
import TextField from "@/components/ui/TextField";

export function EmailField() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if (!email.includes("@")) setError("유효한 이메일 주소를 입력하세요.");
    else setError("");
  };

  return (
    <TextField
      variant="outlined"
      label="이메일"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onBlur={validate}
      error={error}
      prefix="✉"
    />
  );
}`,
  },
  {
    label: "Prefix / Suffix",
    code: `import TextField from "@/components/ui/TextField";

// Prefix text
<TextField variant="outlined" label="가격" prefix="₩" />

// Suffix text
<TextField variant="outlined" label="무게" suffix="kg" />

// Dropdown indicator
<TextField variant="filled" label="카테고리" dropdown />

// Clearable
<TextField variant="filled" label="검색" clearable />`,
  },
];

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
      className="group flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--color-bg-subtle)] border border-[var(--color-border-default)] hover:border-[var(--color-border-brand)] transition-all text-left w-full"
    >
      <code className="text-[11px] font-mono text-[var(--color-brand-primary)] flex-1 truncate">{token}</code>
      <span className="text-[11px] text-[var(--color-text-subtle)] shrink-0">{value}</span>
      <span className="text-[10px] text-[var(--color-text-subtle)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        {copied ? "복사됨" : "복사"}
      </span>
    </button>
  );
}

// ─── Interactive Demo ─────────────────────────────────────────

function InteractiveDemo() {
  const [variant, setVariant] = useState<"filled" | "outlined">("filled");
  const [hasError, setHasError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [value, setValue] = useState("");

  const tokenList = [
    { token: "color/bg/subtle",      value: variant === "filled" ? "N20 #F4F5F5" : "transparent" },
    { token: "color/border/default", value: "N100 #D8DCDE" },
    { token: "color/border/brand",   value: "M300 #28D7D2 (focused)" },
    { token: "color/text/subtle",    value: "N300 #889298 (label)" },
    { token: "color/brand/primary",  value: "M300 #28D7D2 (focused label)" },
    { token: "color/status/error",   value: "#FF3257 (error state)" },
    { token: "color/text/disabled",  value: "#D8DCDE (disabled)" },
    { token: "shape/xs",             value: variant === "filled" ? "4px top only" : "4px all" },
  ];

  return (
    <section className="mb-16">
      <div className="mb-5">
        <p className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Interactive Demo</p>
        <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">라이브 미리보기</h2>
        <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">직접 클릭하여 Hover · Focus · Populated 상태를 확인하세요.</p>
      </div>

      <div className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
        {/* Preview */}
        <div className="flex items-center justify-center min-h-[200px] px-8 py-12 bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
          <div className="w-full max-w-sm">
            <TextField
              variant={variant}
              label="이름"
              placeholder="홍길동"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              error={hasError ? "올바른 형식으로 입력해 주세요." : undefined}
              helperText={!hasError ? "8자 이내로 입력하세요." : undefined}
              disabled={isDisabled}
            />
          </div>
        </div>

        {/* Controls + Tokens */}
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--color-border-default)]">
          <div className="p-6 space-y-5">
            {/* Variant */}
            <div>
              <p className="text-[11px] font-semibold text-[var(--color-text-subtle)] uppercase tracking-widest mb-2">Variant</p>
              <div className="flex gap-2">
                {(["filled", "outlined"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={`px-4 py-1.5 rounded-md text-[13px] font-medium border transition-all ${
                      variant === v
                        ? "bg-[var(--color-brand-primary)] text-[var(--color-text-on-brand)] border-[var(--color-brand-primary)]"
                        : "border-[var(--color-border-default)] text-[var(--color-text-subtle)] hover:border-[var(--color-border-brand)] hover:text-[var(--color-brand-primary)]"
                    }`}
                  >
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* State overrides */}
            <div>
              <p className="text-[11px] font-semibold text-[var(--color-text-subtle)] uppercase tracking-widest mb-2">State Override</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => { setHasError(v => !v); setIsDisabled(false); }}
                  className={`px-3 py-1.5 rounded-md text-[13px] font-medium border transition-all ${
                    hasError
                      ? "bg-[var(--color-status-error)] text-white border-[var(--color-status-error)]"
                      : "border-[var(--color-border-default)] text-[var(--color-text-subtle)] hover:border-[var(--color-status-error)] hover:text-[var(--color-status-error)]"
                  }`}
                >
                  Error
                </button>
                <button
                  onClick={() => { setIsDisabled(v => !v); setHasError(false); }}
                  className={`px-3 py-1.5 rounded-md text-[13px] font-medium border transition-all ${
                    isDisabled
                      ? "bg-[var(--color-text-disabled)] text-white border-[var(--color-text-disabled)]"
                      : "border-[var(--color-border-default)] text-[var(--color-text-subtle)] hover:border-[var(--color-text-disabled)]"
                  }`}
                >
                  Disabled
                </button>
              </div>
            </div>
          </div>

          {/* Tokens */}
          <div className="p-6">
            <p className="text-[11px] font-semibold text-[var(--color-text-subtle)] uppercase tracking-widest mb-3">
              적용된 토큰 <span className="text-[var(--color-brand-primary)]">(클릭 복사)</span>
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

// ─── Variant Gallery ──────────────────────────────────────────

function VariantGallery() {
  const [clearValue, setClearValue] = useState("지울 수 있는 값");

  return (
    <section className="mb-16">
      <div className="mb-5">
        <p className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Variants</p>
        <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">Variant 데모</h2>
        <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">Prefix · Suffix · Clearable · Exposed Dropdown</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Prefix */}
        <div className="rounded-xl border border-[var(--color-border-default)] p-6">
          <p className="text-[12px] font-semibold text-[var(--color-text-subtle)] mb-1">Prefix</p>
          <p className="text-[11px] text-[var(--color-text-subtle)] mb-4">고정 단위·프로토콜 좌측 표시</p>
          <div className="space-y-4">
            <TextField variant="filled" label="웹사이트" placeholder="example.com" prefix="https://" />
            <TextField variant="outlined" label="금액" placeholder="0" prefix="₩" />
          </div>
        </div>

        {/* Suffix */}
        <div className="rounded-xl border border-[var(--color-border-default)] p-6">
          <p className="text-[12px] font-semibold text-[var(--color-text-subtle)] mb-1">Suffix</p>
          <p className="text-[11px] text-[var(--color-text-subtle)] mb-4">단위·액션 아이콘 우측 표시</p>
          <div className="space-y-4">
            <TextField variant="filled" label="무게" placeholder="0" suffix="kg" />
            <TextField variant="outlined" label="이메일" placeholder="user" suffix="@openpath.io" />
          </div>
        </div>

        {/* Error + Helper */}
        <div className="rounded-xl border border-[var(--color-border-default)] p-6">
          <p className="text-[12px] font-semibold text-[var(--color-text-subtle)] mb-1">Error + Helper</p>
          <p className="text-[11px] text-[var(--color-text-subtle)] mb-4">
            Error에는 반드시 Helper text로 사유 명시.{" "}
            <code className="text-[10px] bg-[var(--color-bg-subtle)] px-1 rounded">aria-describedby</code> 자동 연결
          </p>
          <div className="space-y-4">
            <TextField
              variant="filled"
              label="이메일"
              placeholder="user@example.com"
              defaultValue="invalid-email"
              error="올바른 이메일 형식으로 입력해 주세요."
            />
            <TextField
              variant="outlined"
              label="비밀번호"
              placeholder="8자 이상"
              helperText="영문·숫자·특수문자를 포함해 주세요."
            />
          </div>
        </div>

        {/* Clearable + Disabled */}
        <div className="rounded-xl border border-[var(--color-border-default)] p-6">
          <p className="text-[12px] font-semibold text-[var(--color-text-subtle)] mb-1">Clearable · Disabled</p>
          <p className="text-[11px] text-[var(--color-text-subtle)] mb-4">
            Disabled는 <code className="text-[10px] bg-[var(--color-bg-subtle)] px-1 rounded">color/text/disabled</code> 토큰. opacity 처리 금지
          </p>
          <div className="space-y-4">
            <TextField
              variant="filled"
              label="검색"
              placeholder="검색어를 입력하세요"
              value={clearValue}
              onChange={(e) => setClearValue(e.target.value)}
              clearable
              onClear={() => setClearValue("")}
            />
            <TextField
              variant="outlined"
              label="비활성 필드"
              placeholder="입력 불가"
              defaultValue="고정된 값"
              disabled
            />
          </div>
        </div>

        {/* Exposed Dropdown */}
        <div className="rounded-xl border border-[var(--color-border-default)] p-6 sm:col-span-2">
          <p className="text-[12px] font-semibold text-[var(--color-text-subtle)] mb-1">Exposed Dropdown</p>
          <p className="text-[11px] text-[var(--color-text-subtle)] mb-4">
            우측 chevron-down 아이콘 — 선택형 입력. 포커스 시 아이콘 색상이 brand/primary로 전환
          </p>
          <div className="flex flex-wrap gap-6">
            <div className="w-full max-w-xs">
              <TextField variant="filled" label="지역 선택" placeholder="선택하세요" dropdown />
            </div>
            <div className="w-full max-w-xs">
              <TextField variant="outlined" label="카테고리" placeholder="선택하세요" dropdown />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── State Reference ─────────────────────────────────────────

function StateReference() {
  const states = [
    {
      label: "Inactive",
      node: <TextField variant="filled" label="이름" placeholder="홍길동" helperText="8자 이내로 입력하세요." />,
    },
    {
      label: "Populated (값 입력됨)",
      node: <TextField variant="filled" label="이름" placeholder="홍길동" defaultValue="김민준" helperText="8자 이내로 입력하세요." />,
    },
    {
      label: "Error",
      node: <TextField variant="filled" label="이름" placeholder="홍길동" defaultValue="김@민준" error="특수문자는 사용할 수 없습니다." />,
    },
    {
      label: "Disabled",
      node: <TextField variant="filled" label="이름" placeholder="홍길동" defaultValue="편집 불가" disabled />,
    },
    {
      label: "Outlined — Inactive",
      node: <TextField variant="outlined" label="이름" placeholder="홍길동" helperText="8자 이내로 입력하세요." />,
    },
    {
      label: "Outlined — Error",
      node: <TextField variant="outlined" label="이름" placeholder="홍길동" defaultValue="김@민준" error="특수문자는 사용할 수 없습니다." />,
    },
  ];

  return (
    <section className="mb-16">
      <div className="mb-5">
        <p className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">State Reference</p>
        <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">State 참조</h2>
        <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
          Hover · Focus 상태는 CSS (:hover, :focus-within)가 자동 처리 — 직접 클릭해서 확인
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {states.map(({ label, node }) => (
          <div key={label} className="rounded-xl border border-[var(--color-border-default)] p-5 bg-[var(--color-bg-subtle)]">
            <p className="text-[11px] font-semibold text-[var(--color-text-subtle)] uppercase tracking-widest mb-4">{label}</p>
            {node}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Spec Table ───────────────────────────────────────────────

function SpecTable() {
  const sizeRows = [
    { attr: "높이",                       value: "56px",                     token: "—" },
    { attr: "Padding 좌우",               value: "16px",                     token: "space/04" },
    { attr: "Padding 상하 (Filled)",       value: "top 16px / bottom 8px",   token: "space/04 · space/02" },
    { attr: "Padding 상하 (Outlined)",     value: "16px",                     token: "space/04" },
    { attr: "Label 폰트 (Inactive)",       value: "16px Regular",             token: "type/body/md" },
    { attr: "Label 폰트 (Float)",          value: "12px Medium",              token: "type/label/sm" },
    { attr: "Input 폰트",                  value: "16px Regular",             token: "type/body/md" },
    { attr: "Helper 폰트",                 value: "12px Regular",             token: "type/caption" },
    { attr: "Border (기본·Populated)",     value: "1px",                      token: "—" },
    { attr: "Border (Focused·Error)",     value: "2px (box-shadow 기법)",    token: "—" },
    { attr: "Radius (Filled)",            value: "4px top-left / top-right", token: "shape/xs" },
    { attr: "Radius (Outlined)",          value: "4px 전체",                  token: "shape/xs" },
    { attr: "Float transition",           value: "250ms motion-standard",    token: "duration/medium · motion/standard" },
  ];

  const stateRows = [
    { state: "Inactive",  bg: "color/bg/subtle",  border: "color/border/default", label: "color/text/subtle",    bw: "1px" },
    { state: "Hover",     bg: "color/bg/subtle",  border: "color/text/subtle",    label: "color/text/subtle",    bw: "1px" },
    { state: "Focused",   bg: "color/bg/subtle",  border: "color/border/brand",   label: "color/brand/primary",  bw: "2px" },
    { state: "Populated", bg: "color/bg/subtle",  border: "color/border/default", label: "color/text/subtle",    bw: "1px" },
    { state: "Error",     bg: "color/bg/subtle",  border: "color/status/error",   label: "color/status/error",   bw: "2px" },
    { state: "Disabled",  bg: "color/bg/subtle",  border: "transparent",          label: "color/text/disabled",  bw: "1px" },
  ];

  return (
    <section className="mb-16">
      <div className="mb-5">
        <p className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Spec</p>
        <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">스펙 테이블</h2>
      </div>

      {/* Size */}
      <div className="mb-8">
        <p className="text-[13px] font-semibold text-[var(--color-text-default)] mb-3">Size 수치</p>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
                {["속성", "Value", "Token"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-[var(--color-text-subtle)] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizeRows.map((row, i) => (
                <tr key={row.attr} className={`border-b border-[var(--color-border-default)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}>
                  <td className="px-4 py-3 font-medium text-[var(--color-text-default)]">{row.attr}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-brand-primary)]">{row.value}</td>
                  <td className="px-4 py-3">
                    {row.token !== "—"
                      ? <code className="text-[11px] font-mono text-[var(--color-text-subtle)] bg-[var(--color-bg-subtle)] px-2 py-0.5 rounded">{row.token}</code>
                      : <span className="text-[var(--color-border-default)]">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* State color tokens (Filled) */}
      <div>
        <p className="text-[13px] font-semibold text-[var(--color-text-default)] mb-3">State별 Color Token — Filled</p>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
                {["State", "Background", "Border", "Label", "BW"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-[var(--color-text-subtle)] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stateRows.map((row, i) => (
                <tr key={row.state} className={`border-b border-[var(--color-border-default)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}>
                  <td className="px-4 py-3 font-semibold text-[var(--color-text-default)]">{row.state}</td>
                  <td className="px-4 py-3"><code className="text-[11px] font-mono text-[var(--color-brand-primary)]">{row.bg}</code></td>
                  <td className="px-4 py-3"><code className="text-[11px] font-mono text-[var(--color-text-subtle)]">{row.border}</code></td>
                  <td className="px-4 py-3"><code className="text-[11px] font-mono text-[var(--color-text-subtle)]">{row.label}</code></td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-text-subtle)]">{row.bw}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── Accessibility ────────────────────────────────────────────

function AccessibilitySection() {
  return (
    <section className="mb-16">
      <div className="mb-5">
        <p className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Accessibility</p>
        <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">접근성</h2>
      </div>

      <div className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
        {[
          {
            attr: "aria-describedby",
            detail: "helper text / error message를 input과 연결. ID 자동 생성 ({inputId}-helper)",
            status: "✅ 자동",
          },
          {
            attr: "aria-invalid",
            detail: "error prop이 있을 때 aria-invalid=\"true\" 자동 설정",
            status: "✅ 자동",
          },
          {
            attr: "<label htmlFor>",
            detail: "floating label이 실제 <label> 태그로 구현되어 클릭 시 포커스 이동",
            status: "✅ 자동",
          },
          {
            attr: "포커스 링",
            detail: "컨테이너 border 강조(brand color 2px)로 포커스 시각화 — outline: none on input",
            status: "✅ CSS",
          },
          {
            attr: "Clear 버튼 터치 영역",
            detail: "min-width: 48px (WCAG 2.5.5 Target Size AA 준수)",
            status: "✅ 48dp",
          },
          {
            attr: "disabled",
            detail: "color/text/disabled 토큰 사용. opacity 처리 금지",
            status: "✅ 토큰",
          },
        ].map((row, i) => (
          <div key={row.attr} className={`flex items-start gap-4 px-5 py-4 border-b border-[var(--color-border-default)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}>
            <code className="text-[12px] font-mono text-[var(--color-brand-primary)] shrink-0 pt-0.5 min-w-[140px]">{row.attr}</code>
            <p className="text-[13px] text-[var(--color-text-subtle)] flex-1">{row.detail}</p>
            <span className="text-[12px] font-medium text-[var(--color-brand-primary)] shrink-0">{row.status}</span>
          </div>
        ))}
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
        <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">Do / Don&apos;t</h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-xl border-2 border-[var(--color-border-brand)] p-5" style={{ background: "var(--color-bg-brand)" }}>
          <p className="text-[14px] font-bold text-[var(--color-brand-primary)] mb-3">✓ Do</p>
          <ul className="space-y-2">
            {[
              "Error state에는 반드시 Helper text로 이유 명시",
              "Placeholder는 예시값으로 (예: \"홍길동\")",
              "Disabled는 color/text/disabled 토큰 사용",
              "Filled는 배경 있는 폼, Outlined는 카드 위 사용",
              "Label floating 시 크기·색상 transition 적용",
            ].map((t, i) => (
              <li key={i} className="flex gap-2 text-[13px] text-[var(--color-text-default)]">
                <span className="text-[var(--color-brand-primary)] font-bold shrink-0">✓</span>{t}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border-2 p-5" style={{ borderColor: "var(--color-status-error)", background: "var(--color-bg-error)" }}>
          <p className="text-[14px] font-bold mb-3" style={{ color: "var(--color-status-error)" }}>✕ Don&apos;t</p>
          <ul className="space-y-2">
            {[
              "Error border만 바꾸고 메시지 없이 끝내기",
              "Placeholder에 Label 역할 시키기",
              "opacity: 0.5로 Disabled 처리",
              "색상 하드코딩 (반드시 CSS 변수 사용)",
              "한 폼 내에서 Filled + Outlined 혼용",
            ].map((t, i) => (
              <li key={i} className="flex gap-2 text-[13px]" style={{ color: "var(--color-status-error)" }}>
                <span className="font-bold shrink-0">✕</span>{t}
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
      {/* Header */}
      <div className="mb-10 pb-8 border-b border-[var(--color-border-default)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]" />
          <span className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-default)] mb-2">Text Field</h1>
        <p className="text-[16px] text-[var(--color-text-subtle)] leading-relaxed max-w-[560px]">
          텍스트 입력을 위한 기본 폼 컴포넌트. Filled · Outlined 두 가지 타입.
          <br />
          <span className="text-[var(--color-brand-primary)] font-medium">shape/xs 4dp</span> ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">Floating label</span> ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">aria-describedby 자동 연결</span>
        </p>
      </div>

      <InteractiveDemo />
      <VariantGallery />
      <StateReference />
      <AccessibilitySection />
      <SpecTable />
      <DosDonts />
      <CodeBlock snippets={INPUT_SNIPPETS} />
    </div>
  );
}
