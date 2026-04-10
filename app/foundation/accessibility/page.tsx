import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "OpenPath DS 접근성 기준 — WCAG 2.1 AA, 터치 영역 48dp, Focus ring 3dp",
};

const contrastRows = [
  { combo: "White on M300 (#28D7D2)",   ratio: "2.1:1",  pass: false, note: "Primary 버튼에 흰 텍스트 사용 금지" },
  { combo: "N600 on M300 (#28D7D2)",    ratio: "4.8:1",  pass: true,  note: "color/text/on-brand 기본값" },
  { combo: "White on N600 (#29363D)",   ratio: "11.2:1", pass: true,  note: "다크 배경에 흰 텍스트" },
  { combo: "N300 on White",             ratio: "3.2:1",  pass: "large", note: "18sp 이상 대형 텍스트만 허용" },
  { combo: "N100 on White",             ratio: "1.4:1",  pass: false, note: "Disabled 전용 — 장식 요소" },
];

const ariaRows = [
  { component: "Button",          aria: "role=\"button\", aria-disabled" },
  { component: "Icon Button",     aria: "aria-label (필수)" },
  { component: "Switch (Toggle)", aria: "role=\"switch\", aria-checked" },
  { component: "Dialog / Modal",  aria: "role=\"dialog\", aria-modal, aria-labelledby" },
  { component: "Navigation",      aria: "role=\"navigation\", aria-label" },
  { component: "Tab",             aria: "role=\"tablist\", role=\"tab\", aria-selected" },
  { component: "Loading",         aria: "aria-busy=\"true\", aria-live=\"polite\"" },
  { component: "Error Message",   aria: "aria-describedby → helper text 연결" },
];

const checklist = [
  "모든 인터랙티브 요소 터치 영역 48×48dp 이상",
  "텍스트 대비율 4.5:1 이상 (18sp 이상 대형은 3:1)",
  "Focus indicator 3dp 이상",
  "아이콘 버튼에 aria-label 있음",
  "form 요소에 label 연결됨",
  "에러 메시지 aria-describedby 연결",
  "로딩 상태 aria-busy 처리",
  "색상만으로 정보 전달 안 함 (아이콘·텍스트 병행)",
];

export default function AccessibilityPage() {
  return (
    <div className="px-8 py-10 max-w-[860px]">
      {/* Header */}
      <div className="mb-10 pb-8 border-b border-[var(--color-border-default)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]" />
          <span className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest">Foundation</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-default)] mb-2">Accessibility</h1>
        <p className="text-[16px] text-[var(--color-text-subtle)] leading-relaxed max-w-[520px]">
          M3 접근성 가이드라인 기반. <span className="text-[var(--color-brand-primary)] font-medium">WCAG 2.1 AA</span> 준수 목표.
          대비율 · 터치 영역 · Focus · ARIA 4개 축으로 관리합니다.
        </p>
      </div>

      {/* Color Contrast */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Color Contrast</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">색상 대비율</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-3 mb-5">
          {[
            { label: "일반 텍스트 (18sp 미만)", ratio: "4.5:1", standard: "WCAG AA" },
            { label: "대형 텍스트 (18sp 이상 / Bold 14sp 이상)", ratio: "3:1", standard: "WCAG AA" },
            { label: "UI 컴포넌트 (아이콘, 테두리)", ratio: "3:1", standard: "WCAG AA" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-[var(--color-border-default)] p-4 bg-[var(--color-bg-default)]">
              <p className="text-[11px] font-bold text-[var(--color-brand-primary)] mb-1">{item.standard}</p>
              <p className="text-[24px] font-black text-[var(--color-text-default)]">{item.ratio}</p>
              <p className="text-[12px] text-[var(--color-text-subtle)] leading-snug mt-1">{item.label}</p>
            </div>
          ))}
        </div>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
                {["색상 조합", "대비율", "AA 통과", "비고"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-bold text-[var(--color-text-subtle)] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {contrastRows.map((row, i) => (
                <tr key={row.combo} className={`border-b border-[var(--color-border-default)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}>
                  <td className="px-5 py-3 font-mono text-[12px] text-[var(--color-text-default)]">{row.combo}</td>
                  <td className="px-5 py-3 font-mono text-[12px] font-bold" style={{ color: row.pass === true ? "var(--color-status-success)" : row.pass === "large" ? "var(--color-status-warning)" : "var(--color-status-error)" }}>{row.ratio}</td>
                  <td className="px-5 py-3">
                    {row.pass === true
                      ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-bg-brand)] text-[var(--color-brand-primary)] text-[11px] font-bold">✓ 통과</span>
                      : row.pass === "large"
                      ? <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-bg-warning)] text-[var(--color-status-warning)] text-[11px] font-bold">△ 대형만</span>
                      : <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-bg-error)] text-[var(--color-status-error)] text-[11px] font-bold">✕ 불통과</span>
                    }
                  </td>
                  <td className="px-5 py-3 text-[12px] text-[var(--color-text-subtle)]">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex items-start gap-2 px-4 py-3 rounded-lg bg-[var(--color-bg-error)] border border-[var(--color-status-error)]/20">
          <span className="text-[var(--color-status-error)] shrink-0 mt-0.5">⚠️</span>
          <p className="text-[13px] text-[var(--color-text-default)]">
            <strong>중요:</strong> Primary 버튼(민트 배경)에 흰 텍스트는 대비율 2.1:1로 WCAG 불통과.
            <code className="mx-1 px-1.5 py-0.5 rounded bg-[var(--color-bg-subtle)] text-[11px] font-mono">--color-text-on-brand</code>는 반드시 N600 (#29363D)을 사용하세요.
          </p>
        </div>
      </section>

      {/* Touch Target */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Touch Target</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">터치 영역 최소 기준</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mb-5">
          <div className="rounded-xl border border-[var(--color-border-default)] p-5 bg-[var(--color-bg-default)]">
            <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-2">M3 최소 기준</p>
            <p className="text-[36px] font-black text-[var(--color-text-default)]">48×48<span className="text-[16px] font-normal ml-1">dp</span></p>
            <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">모든 인터랙티브 요소</p>
          </div>
          <div className="rounded-xl border border-[var(--color-border-default)] p-5 bg-[var(--color-bg-default)]">
            <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-2">구현 방법</p>
            <p className="text-[13px] text-[var(--color-text-default)] leading-relaxed">
              시각 크기가 48dp 미만인 경우 <code className="text-[var(--color-brand-primary)] text-[11px] font-mono">::after</code> pseudo-element로 확장.
              버튼은 <code className="text-[var(--color-brand-primary)] text-[11px] font-mono">min-height: 48px</code> 또는
              <code className="text-[var(--color-brand-primary)] text-[11px] font-mono"> ::after { "{height: 48px}" }</code>
            </p>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
                {["컴포넌트", "시각 크기", "터치 영역", "구현"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-bold text-[var(--color-text-subtle)] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { comp: "Button (md)", visual: "40dp",    touch: "48dp", impl: "::after { height: 48px }" },
                { comp: "Icon Button", visual: "32~48dp", touch: "48dp", impl: "::after { min-width/height: 48px }" },
                { comp: "Checkbox",    visual: "20dp",    touch: "48dp", impl: "input 48×48, icon-wrap 48×48" },
                { comp: "Radio",       visual: "20dp",    touch: "48dp", impl: "input 48×48, icon-wrap 48×48" },
                { comp: "Switch",      visual: "52×32dp", touch: "48dp", impl: "min-height: 48px" },
                { comp: "FAB (sm)",    visual: "40dp",    touch: "48dp", impl: "::after { inset: -4px }" },
                { comp: "List Item",   visual: "variable","touch": "48dp", impl: "min-height: 48px" },
              ].map((row, i) => (
                <tr key={row.comp} className={`border-b border-[var(--color-border-default)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}>
                  <td className="px-5 py-3 font-medium text-[var(--color-text-default)]">{row.comp}</td>
                  <td className="px-5 py-3 font-mono text-[12px] text-[var(--color-text-subtle)]">{row.visual}</td>
                  <td className="px-5 py-3 font-mono text-[12px] text-[var(--color-brand-primary)] font-bold">{row.touch}</td>
                  <td className="px-5 py-3 font-mono text-[11px] text-[var(--color-text-subtle)]">{row.impl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Focus Ring */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Focus Indicator</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">포커스 링</h2>
        </div>
        <div className="rounded-xl border border-[var(--color-border-default)] overflow-hidden mb-4">
          <div className="px-5 py-3 bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
            <p className="text-[11px] font-bold text-[var(--color-text-subtle)] uppercase tracking-widest">Global CSS</p>
          </div>
          <pre className="px-5 py-4 text-[12px] font-mono text-[var(--color-text-default)] bg-[var(--color-bg-default)] leading-relaxed overflow-x-auto">{`:focus-visible {
  outline: 3px solid var(--color-border-brand);
  outline-offset: 2px;
  border-radius: inherit;
}`}</pre>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { attr: "두께", value: "3dp", note: "M3 기준" },
            { attr: "색상", value: "--color-border-brand", note: "M300 민트" },
            { attr: "Offset", value: "2dp", note: "요소와 간격" },
          ].map((item) => (
            <div key={item.attr} className="rounded-lg border border-[var(--color-border-default)] p-4 bg-[var(--color-bg-default)]">
              <p className="text-[11px] font-bold text-[var(--color-text-subtle)] uppercase tracking-widest mb-1">{item.attr}</p>
              <p className="text-[16px] font-bold font-mono text-[var(--color-brand-primary)]">{item.value}</p>
              <p className="text-[11px] text-[var(--color-text-subtle)] mt-0.5">{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ARIA */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">ARIA</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">Semantic HTML & ARIA 속성</h2>
        </div>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
                {["컴포넌트", "필수 ARIA"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-bold text-[var(--color-text-subtle)] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ariaRows.map((row, i) => (
                <tr key={row.component} className={`border-b border-[var(--color-border-default)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}>
                  <td className="px-5 py-3 font-semibold text-[var(--color-text-default)]">{row.component}</td>
                  <td className="px-5 py-3 font-mono text-[12px] text-[var(--color-brand-primary)]">{row.aria}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Checklist */}
      <section className="mb-12">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Checklist</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">컴포넌트 완성 시 체크리스트</h2>
        </div>
        <div className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
          <ul>
            {checklist.map((item, i) => (
              <li key={item} className={`flex items-center gap-3 px-5 py-3.5 border-b border-[var(--color-border-default)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : "bg-[var(--color-bg-default)]"}`}>
                <span className="w-5 h-5 rounded border-2 border-[var(--color-border-default)] shrink-0 flex items-center justify-center">
                  <span className="sr-only">체크</span>
                </span>
                <span className="text-[13px] text-[var(--color-text-default)]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
