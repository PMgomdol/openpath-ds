import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Elevation",
  description: "레이어 위계를 그림자로 표현하는 오픈패스 Elevation 시스템",
};

// ─── 데이터 ──────────────────────────────────────────────────────

type ElevationLevel = {
  token: string;
  shadowToken: string | null;
  level: number;
  label: string;
  x: string;
  y: string;
  blur: string;
  spread: string;
  usage: string;
  // Light mode CSS shadow
  shadowCSS: string | null;
  // Dark mode: bg color to represent depth
  darkBg: string;
};

const elevations: ElevationLevel[] = [
  {
    token: "elevation/surface/default",
    shadowToken: null,
    level: 0,
    label: "Default",
    x: "—", y: "—", blur: "—", spread: "—",
    usage: "페이지 배경",
    shadowCSS: null,
    darkBg: "#29363D",   // N600 — base bg dark
  },
  {
    token: "elevation/surface/raised",
    shadowToken: "shadow/01",
    level: 1,
    label: "Raised",
    x: "0", y: "1px", blur: "4px", spread: "0",
    usage: "Card, List Item",
    shadowCSS: "0 1px 4px 0 rgba(21,27,30,0.08)",
    darkBg: "#3D5060",   // N500
  },
  {
    token: "elevation/surface/overlay",
    shadowToken: "shadow/02",
    level: 2,
    label: "Overlay",
    x: "0", y: "2px", blur: "8px", spread: "0",
    usage: "Dropdown, Menu, Tooltip",
    shadowCSS: "0 2px 8px 0 rgba(21,27,30,0.12)",
    darkBg: "#60707A",   // N400
  },
  {
    token: "elevation/surface/sticky",
    shadowToken: "shadow/03",
    level: 3,
    label: "Sticky",
    x: "0", y: "4px", blur: "16px", spread: "0",
    usage: "App Bar, Bottom Nav, Nav Drawer",
    shadowCSS: "0 4px 16px 0 rgba(21,27,30,0.16)",
    darkBg: "#60707A",   // N400 (same — sticky uses border instead in dark)
  },
  {
    token: "elevation/surface/modal",
    shadowToken: "shadow/04",
    level: 4,
    label: "Modal",
    x: "0", y: "8px", blur: "24px", spread: "-2px",
    usage: "Dialog, Modal, FAB",
    shadowCSS: "0 8px 24px -2px rgba(21,27,30,0.20)",
    darkBg: "#889298",   // N300
  },
];

type ShadowColorRow = {
  token: string;
  light: string;
  dark: string;
  desc: string;
};

const shadowColors: ShadowColorRow[] = [
  {
    token: "color/shadow/default",
    light: "rgba(21, 27, 30, 0.08)",
    dark:  "rgba(0, 0, 0, 0.00)",
    desc:  "Raised — Card, List Item",
  },
  {
    token: "color/shadow/medium",
    light: "rgba(21, 27, 30, 0.12)",
    dark:  "rgba(0, 0, 0, 0.00)",
    desc:  "Overlay — Dropdown, Tooltip",
  },
  {
    token: "color/shadow/strong",
    light: "rgba(21, 27, 30, 0.20)",
    dark:  "rgba(0, 0, 0, 0.00)",
    desc:  "Modal — Dialog, FAB",
  },
];

// ─── 컴포넌트: 섹션 헤더 ────────────────────────────────────────

function SectionHeader({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-6">
      <p className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
        {eyebrow}
      </p>
      <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">{title}</h2>
      {desc && (
        <p className="mt-1 text-[14px] text-[var(--color-text-secondary)] leading-relaxed">
          {desc}
        </p>
      )}
    </div>
  );
}

// ─── 컴포넌트: Elevation 카드 ────────────────────────────────────

function ElevationCard({ ev }: { ev: ElevationLevel }) {
  return (
    <div className="flex flex-col gap-4">
      {/* 카드 데모 영역 */}
      <div className="relative flex items-center justify-center h-[140px] rounded-xl bg-[var(--color-bg-subtle)] px-4">
        {/* 실제 그림자가 적용된 카드 */}
        <div
          className="w-full max-w-[160px] rounded-xl bg-[var(--color-bg-base)] px-4 py-4 transition-all duration-300"
          style={{
            boxShadow: ev.shadowCSS ?? "none",
            border: ev.level === 0 ? "1px solid var(--color-border)" : "none",
          }}
        >
          {/* 레벨 뱃지 */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-black"
              style={{
                backgroundColor: ev.level === 0 ? "var(--color-bg-subtle)" : "#28D7D2",
                color: ev.level === 0 ? "var(--color-text-secondary)" : "#156565",
              }}
            >
              {ev.level}
            </span>
            <span className="text-[12px] font-bold text-[var(--color-text-primary)]">
              {ev.label}
            </span>
          </div>
          {/* 더미 콘텐츠 라인 */}
          <div className="space-y-1.5">
            <div className="h-2 rounded-full bg-[var(--color-bg-subtle)] w-full" />
            <div className="h-2 rounded-full bg-[var(--color-bg-subtle)] w-4/5" />
            <div className="h-2 rounded-full bg-[var(--color-bg-subtle)] w-3/5" />
          </div>
        </div>
      </div>

      {/* 메타 정보 */}
      <div className="space-y-2">
        {/* 토큰명 */}
        <code className="text-[11px] font-mono text-[var(--color-interactive-pressed)] block leading-snug">
          {ev.token}
        </code>
        {ev.shadowToken && (
          <code className="text-[10px] font-mono text-[var(--color-text-secondary)] block">
            → {ev.shadowToken}
          </code>
        )}

        {/* Shadow 스펙 */}
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-subtle)] px-3 py-2.5 space-y-1.5">
          {ev.shadowCSS ? (
            <div className="grid grid-cols-4 gap-1">
              {[
                { label: "X",      value: ev.x },
                { label: "Y",      value: ev.y },
                { label: "Blur",   value: ev.blur },
                { label: "Spread", value: ev.spread },
              ].map(({ label, value }) => (
                <div key={label} className="text-center">
                  <p className="text-[9px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-0.5">
                    {label}
                  </p>
                  <code className="text-[11px] font-mono font-semibold text-[var(--color-text-primary)]">
                    {value}
                  </code>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-[var(--color-text-secondary)] text-center">
              Shadow 없음
            </p>
          )}
        </div>

        {/* 사용처 */}
        <p className="text-[11px] text-[var(--color-text-secondary)] leading-snug">
          {ev.usage}
        </p>
      </div>
    </div>
  );
}

// ─── 컴포넌트: Dark Mode 비교 시각화 ────────────────────────────

function DarkModeCompare() {
  // Light 측 — 실제 shadow로 위계 표현
  const lightLevels = [
    { label: "Raised",  shadow: "0 1px 4px 0 rgba(21,27,30,0.08)",  border: false },
    { label: "Overlay", shadow: "0 2px 8px 0 rgba(21,27,30,0.12)",  border: false },
    { label: "Modal",   shadow: "0 8px 24px -2px rgba(21,27,30,0.20)", border: false },
  ];

  // Dark 측 — 배경색 차이로 위계 표현
  const darkLevels = [
    { label: "Raised",  bg: "#3D5060" },
    { label: "Overlay", bg: "#60707A" },
    { label: "Modal",   bg: "#889298" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Light Mode */}
      <div className="rounded-2xl border border-[var(--color-border)] overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--color-border)] flex items-center justify-between">
          <p className="text-[12px] font-bold text-[var(--color-text-primary)]">Light Mode</p>
          <span className="text-[10px] font-semibold text-[var(--color-text-secondary)] bg-[var(--color-bg-subtle)] px-2 py-0.5 rounded-full">
            shadow로 위계
          </span>
        </div>
        <div className="p-5 bg-[#F4F5F5] space-y-3">
          {lightLevels.map((l) => (
            <div
              key={l.label}
              className="rounded-lg px-4 py-3 bg-white flex items-center justify-between"
              style={{ boxShadow: l.shadow }}
            >
              <span className="text-[12px] font-semibold text-[#29363D]">{l.label}</span>
              <code className="text-[10px] font-mono text-[#889298]">{l.shadow.split(" ").slice(0, 2).join(" ")} …</code>
            </div>
          ))}
        </div>
        <div className="px-4 py-2.5 bg-[var(--color-bg-subtle)] border-t border-[var(--color-border)]">
          <code className="text-[10px] font-mono text-[var(--color-text-secondary)]">
            color/shadow/default ~ strong — opacity 0.08 ~ 0.20
          </code>
        </div>
      </div>

      {/* Dark Mode */}
      <div className="rounded-2xl border border-[var(--color-border)] overflow-hidden">
        <div className="px-4 py-3 border-b border-[var(--color-border)] flex items-center justify-between">
          <p className="text-[12px] font-bold text-[var(--color-text-primary)]">Dark Mode</p>
          <span className="text-[10px] font-semibold text-[var(--color-interactive-pressed)] bg-[var(--color-bg-brand)] px-2 py-0.5 rounded-full">
            배경색으로 위계
          </span>
        </div>
        <div className="p-5 space-y-3" style={{ backgroundColor: "#29363D" }}>
          {darkLevels.map((l) => (
            <div
              key={l.label}
              className="rounded-lg px-4 py-3 flex items-center justify-between"
              style={{ backgroundColor: l.bg }}
            >
              <span className="text-[12px] font-semibold text-white">{l.label}</span>
              <code className="text-[10px] font-mono" style={{ color: "#B0B8BC" }}>{l.bg}</code>
            </div>
          ))}
        </div>
        <div className="px-4 py-2.5 bg-[var(--color-bg-subtle)] border-t border-[var(--color-border)]">
          <code className="text-[10px] font-mono text-[var(--color-text-secondary)]">
            color/shadow/* — opacity 0.00 (다크모드 shadow 전부 투명)
          </code>
        </div>
      </div>
    </div>
  );
}

// ─── 컴포넌트: Shadow Color Token 테이블 ────────────────────────

function ShadowColorTable({ rows }: { rows: ShadowColorRow[] }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] overflow-hidden">
      {/* 헤더 */}
      <div className="grid grid-cols-[2fr_2fr_2fr_1.5fr] px-5 py-3 bg-[var(--color-bg-subtle)] border-b border-[var(--color-border)]">
        {["Token", "Light", "Dark", "용도"].map((h) => (
          <span
            key={h}
            className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]"
          >
            {h}
          </span>
        ))}
      </div>

      {rows.map((row, idx) => (
        <div
          key={row.token}
          className={`grid grid-cols-[2fr_2fr_2fr_1.5fr] items-center px-5 py-4 transition-colors hover:bg-[var(--color-bg-subtle)] ${
            idx < rows.length - 1 ? "border-b border-[var(--color-border)]" : ""
          }`}
        >
          {/* 토큰 */}
          <code className="text-[12px] font-mono text-[var(--color-interactive-pressed)]">{row.token}</code>

          {/* Light */}
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-5 rounded border border-[var(--color-border)] flex-shrink-0"
              style={{ background: row.light }}
            >
              <div
                className="w-full h-full rounded"
                style={{ boxShadow: `inset 0 0 0 1px rgba(0,0,0,0.06)`, background: "white" }}
              />
            </div>
            <div
              className="w-5 h-5 rounded border border-[var(--color-border)] flex-shrink-0"
              style={{ boxShadow: `0 2px 6px 0 ${row.light}` }}
            />
            <code className="text-[10px] font-mono text-[var(--color-text-secondary)] leading-snug">
              {row.light}
            </code>
          </div>

          {/* Dark */}
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded border border-[var(--color-border)] bg-[#29363D] flex-shrink-0"
            />
            <code className="text-[10px] font-mono text-[var(--color-text-secondary)]">
              {row.dark}
            </code>
          </div>

          {/* 용도 */}
          <p className="text-[12px] text-[var(--color-text-secondary)]">{row.desc}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────

export default function ElevationPage() {
  return (
    <div className="px-8 py-10 max-w-[960px]">

      {/* 페이지 헤더 */}
      <div className="mb-10 pb-8 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]" />
          <span className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest">
            Foundation
          </span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-primary)] mb-2">
          Elevation
        </h1>
        <p className="text-[16px] text-[var(--color-text-secondary)] leading-relaxed max-w-[540px]">
          레이어 위계를 그림자로 표현. 다크모드에서는 shadow 대신 배경색 차이로 위계를 표현.
          <br />
          <span className="text-[var(--color-brand-primary)] font-medium">Level 0 (Default) → Level 4 (Modal)</span> 5단계.
        </p>
      </div>

      {/* ── Elevation Scale ──────────────────────────────────── */}
      <section className="mb-14">
        <SectionHeader
          eyebrow="Elevation Scale"
          title="5-Level Elevation System"
          desc="왼쪽에서 오른쪽으로 갈수록 그림자가 강해지며 레이어 위계가 높아집니다."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {elevations.map((ev) => (
            <ElevationCard key={ev.token} ev={ev} />
          ))}
        </div>

        {/* 레벨 단계 표시 바 */}
        <div className="mt-6 flex items-center gap-0 rounded-full overflow-hidden border border-[var(--color-border)]">
          {elevations.map((ev, idx) => (
            <div
              key={ev.token}
              className="flex-1 flex flex-col items-center py-2 text-center transition-colors hover:bg-[var(--color-bg-subtle)]"
              style={{
                borderRight: idx < elevations.length - 1 ? "1px solid var(--color-border)" : "none",
              }}
            >
              <span
                className="text-[11px] font-black mb-0.5"
                style={{ color: ev.level === 0 ? "var(--color-text-secondary)" : "#28D7D2" }}
              >
                {ev.level}
              </span>
              <span className="text-[9px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">
                {ev.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="border-t border-[var(--color-border)] mb-12" />

      {/* ── Dark Mode 설명 ───────────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader
          eyebrow="Dark Mode Rule"
          title="다크모드 위계 표현"
          desc='다크모드에서는 모든 shadow opacity가 0입니다. 위계는 color/bg/subtle(배경색 차이)로 표현합니다.'
        />

        {/* 규칙 요약 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {[
            {
              mode: "Light",
              icon: "☀️",
              rule: "Shadow로 위계 표현",
              detail: "opacity 0.08 ~ 0.20 범위의 그림자를 사용해 레이어 높이를 시각화합니다.",
              accent: "var(--color-border)",
            },
            {
              mode: "Dark",
              icon: "🌙",
              rule: "배경색으로 위계 표현",
              detail: "모든 shadow opacity = 0. N600 → N500 → N400 → N300 순으로 밝아지는 배경으로 위계를 표현합니다.",
              accent: "#28D7D2",
            },
          ].map((item) => (
            <div
              key={item.mode}
              className="rounded-xl border bg-[var(--color-bg-base)] px-5 py-4"
              style={{ borderColor: item.accent }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[14px]">{item.icon}</span>
                <p className="text-[13px] font-bold text-[var(--color-text-primary)]">
                  {item.mode} — {item.rule}
                </p>
              </div>
              <p className="text-[12px] text-[var(--color-text-secondary)] leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        <DarkModeCompare />

        {/* 금지 사항 */}
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-system-error/20 bg-system-error/5 px-4 py-3">
          <span className="text-[16px] mt-0.5 flex-shrink-0">⚠️</span>
          <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
            <span className="font-semibold text-[var(--color-text-primary)]">다크모드에서 shadow를 복제하지 마세요.</span>
            {" "}shadow opacity 0 토큰을 그대로 사용하고, 시각적 위계는 배경색 레이어로 처리합니다.
            이렇게 하면 Light / Dark 모드 전환 시 별도의 컴포넌트 복제 없이 토큰만으로 처리됩니다.
          </p>
        </div>
      </section>

      <div className="border-t border-[var(--color-border)] mb-12" />

      {/* ── Shadow Color Tokens ──────────────────────────────── */}
      <section className="mb-12">
        <SectionHeader
          eyebrow="Shadow Color Tokens"
          title="Shadow Color Token"
          desc="그림자 색상은 Path Black(#151B1E) 기반. Light는 opacity 0.08~0.20, Dark는 전부 0."
        />

        <ShadowColorTable rows={shadowColors} />

        {/* 색상 토큰 원칙 */}
        <div className="mt-5 rounded-xl bg-[var(--color-bg-subtle)] border border-[var(--color-border)] px-5 py-4">
          <p className="text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-3">
            Token Reference
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { token: "shadow/01", css: "0 1px 4px 0", color: "color/shadow/default",  usage: "Raised (Level 1)" },
              { token: "shadow/02", css: "0 2px 8px 0", color: "color/shadow/medium",   usage: "Overlay (Level 2)" },
              { token: "shadow/03", css: "0 4px 16px 0", color: "color/shadow/medium",  usage: "Sticky (Level 3)" },
              { token: "shadow/04", css: "0 8px 24px -2px", color: "color/shadow/strong", usage: "Modal (Level 4)" },
            ].map((row) => (
              <div
                key={row.token}
                className="rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-base)] px-3 py-3"
              >
                <code className="text-[11px] font-mono text-[var(--color-interactive-pressed)] block mb-1">{row.token}</code>
                <code className="text-[10px] font-mono text-[var(--color-text-secondary)] block mb-0.5">
                  {row.css} {"<"}color{">"}
                </code>
                <code className="text-[10px] font-mono text-[var(--color-text-secondary)] block mb-1.5">
                  → {row.color}
                </code>
                <span className="text-[10px] font-semibold text-[var(--color-text-secondary)] bg-[var(--color-bg-subtle)] border border-[var(--color-border)] px-2 py-0.5 rounded-full">
                  {row.usage}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
