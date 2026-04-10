import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Environment",
  description: "OpenPath DS 기술 환경 설정. Android AOS, 360dp, 국문 기준.",
};

const envRows = [
  { item: "플랫폼",       value: "Android (AOS)" },
  { item: "뷰포트",       value: "360 × 800dp (기본)" },
  { item: "언어",         value: "국문 기준" },
  { item: "디자인 툴",    value: "Figma" },
  { item: "핸드오프",     value: "Figma Dev Mode" },
  { item: "단위",         value: "dp (1dp = 1px @1x)" },
  { item: "컬럼 그리드",  value: "4컬럼, 마진 16dp, 거터 8dp" },
  { item: "멀티 테마",    value: "Openpath (민트) / Duotone (코랄)" },
  { item: "모드",         value: "Light / Dark" },
];

const gridRows = [
  { viewport: "Compact (< 600dp)",  col: "4컬럼",  margin: "16dp", gutter: "8dp",  note: "기본 타겟" },
  { viewport: "Medium (600~840dp)", col: "12컬럼", margin: "24dp", gutter: "16dp", note: "" },
  { viewport: "Expanded (> 840dp)", col: "12컬럼", margin: "24dp", gutter: "24dp", note: "" },
];

export default function EnvironmentPage() {
  return (
    <div className="px-8 py-10 max-w-[860px]">
      {/* Header */}
      <div className="mb-10 pb-8 border-b border-[var(--color-border-default)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]" />
          <span className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest">Foundation</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-default)] mb-2">Environment</h1>
        <p className="text-[16px] text-[var(--color-text-subtle)] leading-relaxed max-w-[520px]">
          DS 착수 전 선언하는 기술 환경. 플랫폼·단위·그리드 등 모든 수치의 기반이 되는 결정값.
        </p>
      </div>

      {/* Environment Table */}
      <section className="mb-16">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">설정값</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">기술 환경 선언</h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">강의 첫 챕터에서 선포하고 시작하는 환경 설정 테이블.</p>
        </div>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
                <th className="text-left px-5 py-3 text-[11px] font-bold text-[var(--color-text-subtle)] uppercase tracking-widest w-40">항목</th>
                <th className="text-left px-5 py-3 text-[11px] font-bold text-[var(--color-text-subtle)] uppercase tracking-widest">결정값</th>
              </tr>
            </thead>
            <tbody>
              {envRows.map((row, i) => (
                <tr key={row.item} className={`border-b border-[var(--color-border-default)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}>
                  <td className="px-5 py-3 font-semibold text-[var(--color-text-default)]">{row.item}</td>
                  <td className="px-5 py-3 font-mono text-[12px] text-[var(--color-brand-primary)]">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Grid System */}
      <section className="mb-16">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Layout Grid</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">Android 레이아웃 그리드</h2>
        </div>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
                {["뷰포트", "컬럼", "마진", "거터", "비고"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-bold text-[var(--color-text-subtle)] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {gridRows.map((row, i) => (
                <tr key={row.viewport} className={`border-b border-[var(--color-border-default)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}>
                  <td className="px-5 py-3 font-medium text-[var(--color-text-default)]">{row.viewport}</td>
                  <td className="px-5 py-3 font-mono text-[12px] text-[var(--color-brand-primary)]">{row.col}</td>
                  <td className="px-5 py-3 font-mono text-[12px] text-[var(--color-brand-primary)]">{row.margin}</td>
                  <td className="px-5 py-3 font-mono text-[12px] text-[var(--color-brand-primary)]">{row.gutter}</td>
                  <td className="px-5 py-3 text-[var(--color-text-subtle)]">
                    {row.note && <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-bg-brand)] text-[var(--color-brand-primary)] text-[11px] font-semibold">{row.note}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Grid Visual */}
      <section className="mb-16">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Visual</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">360dp 컬럼 그리드 시각화</h2>
        </div>
        <div className="rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-subtle)] p-6">
          <div className="max-w-[360px] mx-auto">
            <div className="flex gap-[8px] px-[16px]">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex-1 h-20 rounded-sm bg-[var(--color-brand-primary)]/20 border border-[var(--color-brand-primary)]/40 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-[var(--color-brand-primary)]">col {i + 1}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-2 px-0">
              <div className="flex items-center gap-1">
                <div className="w-[16px] h-[2px] bg-[var(--color-text-subtle)]" />
                <span className="text-[10px] text-[var(--color-text-subtle)]">16dp margin</span>
              </div>
              <span className="text-[10px] text-[var(--color-text-subtle)] font-mono">360dp</span>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-[var(--color-text-subtle)]">16dp margin</span>
                <div className="w-[16px] h-[2px] bg-[var(--color-text-subtle)]" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
