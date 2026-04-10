import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shape",
  description: "OpenPath DS M3 Shape Scale — 6단계 모서리 시스템",
};

const shapeScale = [
  { token: "shape/none", cssVar: "—",           value: "0dp",     m3Shape: "None",        usage: "전체 너비 컴포넌트 (Divider)" },
  { token: "shape/xs",   cssVar: "--shape-xs",   value: "4dp",     m3Shape: "Extra Small", usage: "Chip, Badge, Tooltip, Text Field, Snackbar" },
  { token: "shape/sm",   cssVar: "--shape-sm",   value: "8dp",     m3Shape: "Small",       usage: "Button (구형), Menu" },
  { token: "shape/md",   cssVar: "--shape-md",   value: "12dp",    m3Shape: "Medium",      usage: "Card (소형)" },
  { token: "shape/lg",   cssVar: "--shape-lg",   value: "16dp",    m3Shape: "Large",       usage: "Card, Dialog, Bottom Sheet, FAB" },
  { token: "shape/xl",   cssVar: "--shape-xl",   value: "28dp",    m3Shape: "Extra Large", usage: "Large FAB, Bottom Sheet (상단)" },
  { token: "shape/full", cssVar: "--shape-full", value: "9999dp",  m3Shape: "Full",        usage: "Pill Button, Switch Track, Badge" },
];

const componentMap = [
  { component: "Button",       token: "shape/full", value: "9999dp", note: "M3 기본 Pill" },
  { component: "Text Field",   token: "shape/xs",   value: "4dp",    note: "상단만 (Filled)" },
  { component: "Card",         token: "shape/lg",   value: "16dp",   note: "" },
  { component: "Dialog",       token: "shape/xl",   value: "28dp",   note: "" },
  { component: "Chip",         token: "shape/xs",   value: "4dp",    note: "M3 기준" },
  { component: "FAB (Standard)", token: "shape/lg", value: "16dp",   note: "Rounded Square — NOT pill" },
  { component: "FAB (Large)",  token: "shape/xl",   value: "28dp",   note: "" },
  { component: "Bottom Sheet", token: "shape/xl",   value: "28dp",   note: "상단만" },
  { component: "Snackbar",     token: "shape/xs",   value: "4dp",    note: "" },
  { component: "Switch Track", token: "shape/full", value: "9999dp", note: "Pill" },
  { component: "Bottom Nav Indicator", token: "shape/full", value: "9999dp", note: "64×32dp Pill" },
];

export default function ShapePage() {
  return (
    <div className="px-8 py-10 max-w-[860px]">
      {/* Header */}
      <div className="mb-10 pb-8 border-b border-[var(--color-border-default)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]" />
          <span className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest">Style</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-default)] mb-2">Shape</h1>
        <p className="text-[16px] text-[var(--color-text-subtle)] leading-relaxed max-w-[520px]">
          M3는 Radius를 <span className="text-[var(--color-brand-primary)] font-medium">Shape</span>라 부릅니다.
          6단계 Shape Scale로 컴포넌트 모서리를 일관되게 관리합니다.
        </p>
      </div>

      {/* Visual Scale */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Scale</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">Shape Scale 시각화</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {shapeScale.filter(s => s.token !== "shape/none").map((shape) => {
            const radius = shape.value === "9999dp" ? "9999px" : shape.value.replace("dp", "px");
            return (
              <div key={shape.token} className="rounded-xl border border-[var(--color-border-default)] p-4 bg-[var(--color-bg-default)] flex flex-col items-center gap-3">
                <div
                  className="w-16 h-16 bg-[var(--color-brand-primary)]/15 border-2 border-[var(--color-brand-primary)]/40"
                  style={{ borderRadius: radius }}
                />
                <div className="text-center">
                  <p className="text-[12px] font-bold text-[var(--color-text-default)]">{shape.m3Shape}</p>
                  <p className="text-[11px] font-mono text-[var(--color-brand-primary)]">{shape.value}</p>
                  <code className="text-[10px] font-mono text-[var(--color-text-subtle)]">{shape.token}</code>
                </div>
              </div>
            );
          })}
          {/* Full / Pill special */}
          <div className="rounded-xl border border-[var(--color-border-default)] p-4 bg-[var(--color-bg-default)] flex flex-col items-center gap-3 sm:col-span-4">
            <div
              className="w-40 h-16 bg-[var(--color-brand-primary)]/15 border-2 border-[var(--color-brand-primary)]/40"
              style={{ borderRadius: "9999px" }}
            />
            <div className="text-center">
              <p className="text-[12px] font-bold text-[var(--color-text-default)]">Full — Pill</p>
              <p className="text-[11px] font-mono text-[var(--color-brand-primary)]">9999dp</p>
              <code className="text-[10px] font-mono text-[var(--color-text-subtle)]">shape/full</code>
            </div>
          </div>
        </div>
      </section>

      {/* Spec Table */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Spec</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">Shape Scale 스펙</h2>
        </div>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
                {["Token", "CSS 변수", "Value", "M3 Shape", "주요 사용처"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-bold text-[var(--color-text-subtle)] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shapeScale.map((row, i) => (
                <tr key={row.token} className={`border-b border-[var(--color-border-default)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}>
                  <td className="px-5 py-3 font-mono text-[12px] text-[var(--color-text-default)]">{row.token}</td>
                  <td className="px-5 py-3 font-mono text-[11px] text-[var(--color-brand-primary)]">
                    {row.cssVar !== "—"
                      ? <code className="px-1.5 py-0.5 rounded bg-[var(--color-bg-brand)] text-[var(--color-brand-primary)]">{row.cssVar}</code>
                      : <span className="text-[var(--color-text-disabled)]">—</span>
                    }
                  </td>
                  <td className="px-5 py-3 font-mono text-[12px] font-bold text-[var(--color-brand-primary)]">{row.value}</td>
                  <td className="px-5 py-3 text-[12px] text-[var(--color-text-default)]">{row.m3Shape}</td>
                  <td className="px-5 py-3 text-[12px] text-[var(--color-text-subtle)]">{row.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Component Map */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Component Map</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">컴포넌트별 Shape 연결</h2>
        </div>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
                {["컴포넌트", "Shape Token", "Value", "비고"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-bold text-[var(--color-text-subtle)] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {componentMap.map((row, i) => (
                <tr key={row.component} className={`border-b border-[var(--color-border-default)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}>
                  <td className="px-5 py-3 font-semibold text-[var(--color-text-default)]">{row.component}</td>
                  <td className="px-5 py-3 font-mono text-[12px] text-[var(--color-brand-primary)]">{row.token}</td>
                  <td className="px-5 py-3 font-mono text-[12px] font-bold text-[var(--color-brand-primary)]">{row.value}</td>
                  <td className="px-5 py-3 text-[12px] text-[var(--color-text-subtle)]">{row.note || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex items-start gap-2 px-4 py-3 rounded-lg bg-[var(--color-bg-brand)] border border-[var(--color-border-brand)]/30">
          <span className="text-[var(--color-brand-primary)] shrink-0">⚠️</span>
          <p className="text-[13px] text-[var(--color-text-default)]">
            <strong>M3 FAB는 shape/lg (Rounded Square)</strong>입니다. shape/full (Pill)이 아닙니다.
            이전 Material Design 2에서 변경된 중요한 차이입니다.
          </p>
        </div>
      </section>

      {/* CSS Variables */}
      <section className="mb-12">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">CSS Variables</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">CSS 변수</h2>
        </div>
        <div className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
          <div className="px-5 py-3 bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
            <p className="text-[11px] font-bold text-[var(--color-text-subtle)] uppercase tracking-widest">globals.css — :root</p>
          </div>
          <pre className="px-5 py-4 text-[12px] font-mono text-[var(--color-text-default)] bg-[var(--color-bg-default)] leading-relaxed overflow-x-auto">{`--shape-xs:   4px;
--shape-sm:   8px;
--shape-md:   12px;
--shape-lg:   16px;
--shape-xl:   28px;
--shape-full: 9999px;`}</pre>
        </div>
      </section>
    </div>
  );
}
