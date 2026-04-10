import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Motion",
  description: "OpenPath DS M3 Motion — Easing & Duration 시스템",
};

const easingRows = [
  { token: "motion/easing/standard",            curve: "cubic-bezier(0.2, 0, 0, 1)",   cssVar: "--motion-standard",   usage: "일반 화면 전환, 상태 변화" },
  { token: "motion/easing/standard-decelerate", curve: "cubic-bezier(0, 0, 0, 1)",     cssVar: "--motion-decelerate", usage: "화면 진입 (Enter)" },
  { token: "motion/easing/standard-accelerate", curve: "cubic-bezier(0.3, 0, 1, 1)",   cssVar: "--motion-accelerate", usage: "화면 퇴장 (Exit)" },
  { token: "motion/easing/emphasized",          curve: "cubic-bezier(0.2, 0, 0, 1)",   cssVar: "--motion-standard",   usage: "강조 전환 (FAB, Dialog)" },
];

const durationRows = [
  { token: "motion/duration/short1",  value: "50ms",  cssVar: "—",                  usage: "즉각 반응 (ripple)" },
  { token: "motion/duration/short2",  value: "100ms", cssVar: "--duration-short",   usage: "소형 상태 변화" },
  { token: "motion/duration/short3",  value: "150ms", cssVar: "—",                  usage: "아이콘 변환" },
  { token: "motion/duration/short4",  value: "200ms", cssVar: "—",                  usage: "Tooltip, Focus indicator" },
  { token: "motion/duration/medium1", value: "250ms", cssVar: "--duration-medium",  usage: "일반 컴포넌트 전환" },
  { token: "motion/duration/medium2", value: "300ms", cssVar: "—",                  usage: "Drawer, Bottom Sheet" },
  { token: "motion/duration/long1",   value: "350ms", cssVar: "—",                  usage: "전체 화면 전환" },
  { token: "motion/duration/long2",   value: "400ms", cssVar: "--duration-long",    usage: "Dialog, Modal" },
];

const usageRows = [
  { context: "버튼 hover/press",    easing: "standard",           duration: "short2 (100ms)" },
  { context: "테마 전환",           easing: "standard",           duration: "medium1 (250ms)" },
  { context: "Drawer 열기",         easing: "standard-decelerate", duration: "medium2 (300ms)" },
  { context: "Dialog 열기",         easing: "emphasized",         duration: "long2 (400ms)" },
  { context: "Snackbar 진입",       easing: "standard-decelerate", duration: "medium1 (250ms)" },
  { context: "Shadow 변화",         easing: "standard",           duration: "short4 (200ms)" },
  { context: "Switch thumb",        easing: "standard",           duration: "short4 (200ms)" },
  { context: "Card shadow hover",   easing: "standard",           duration: "short4 (200ms)" },
];

export default function MotionPage() {
  return (
    <div className="px-8 py-10 max-w-[860px]">
      {/* Header */}
      <div className="mb-10 pb-8 border-b border-[var(--color-border-default)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]" />
          <span className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest">Foundation</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-default)] mb-2">Motion</h1>
        <p className="text-[16px] text-[var(--color-text-subtle)] leading-relaxed max-w-[520px]">
          M3 Motion은 <span className="text-[var(--color-brand-primary)] font-medium">Easing + Duration</span> 조합으로 정의합니다.
          모든 애니메이션은 CSS 변수를 통해 일관되게 적용됩니다.
        </p>
      </div>

      {/* Easing */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Easing</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">이징 커브</h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">방향에 따라 진입/퇴장/강조로 나뉩니다.</p>
        </div>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
                {["Token", "Cubic Bezier", "CSS 변수", "용도"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-bold text-[var(--color-text-subtle)] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {easingRows.map((row, i) => (
                <tr key={row.token} className={`border-b border-[var(--color-border-default)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}>
                  <td className="px-5 py-3 font-mono text-[11px] text-[var(--color-text-default)]">{row.token}</td>
                  <td className="px-5 py-3 font-mono text-[11px] text-[var(--color-brand-primary)]">{row.curve}</td>
                  <td className="px-5 py-3 font-mono text-[11px] text-[var(--color-text-subtle)]">{row.cssVar}</td>
                  <td className="px-5 py-3 text-[12px] text-[var(--color-text-subtle)]">{row.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Duration */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Duration</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">지속 시간</h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">short1~4 · medium1~2 · long1~2 총 8단계. CSS 변수는 주요 3단계만 제공.</p>
        </div>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
                {["Token", "Value", "CSS 변수", "용도"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-bold text-[var(--color-text-subtle)] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {durationRows.map((row, i) => (
                <tr key={row.token} className={`border-b border-[var(--color-border-default)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}>
                  <td className="px-5 py-3 font-mono text-[11px] text-[var(--color-text-default)]">{row.token}</td>
                  <td className="px-5 py-3 font-mono text-[12px] font-bold text-[var(--color-brand-primary)]">{row.value}</td>
                  <td className="px-5 py-3 font-mono text-[11px] text-[var(--color-text-subtle)]">
                    {row.cssVar !== "—"
                      ? <code className="px-1.5 py-0.5 rounded bg-[var(--color-bg-brand)] text-[var(--color-brand-primary)]">{row.cssVar}</code>
                      : <span className="text-[var(--color-text-disabled)]">—</span>
                    }
                  </td>
                  <td className="px-5 py-3 text-[12px] text-[var(--color-text-subtle)]">{row.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CSS Variables */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">CSS Variables</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">적용된 CSS 변수</h2>
        </div>
        <div className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
          <div className="px-5 py-3 bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
            <p className="text-[11px] font-bold text-[var(--color-text-subtle)] uppercase tracking-widest">globals.css — :root</p>
          </div>
          <pre className="px-5 py-4 text-[12px] font-mono text-[var(--color-text-default)] bg-[var(--color-bg-default)] leading-relaxed overflow-x-auto">{`/* Easing */
--motion-standard:   cubic-bezier(0.2, 0, 0, 1.0);
--motion-decelerate: cubic-bezier(0, 0, 0, 1.0);
--motion-accelerate: cubic-bezier(0.3, 0, 1, 1);

/* Duration */
--duration-short:    100ms;   /* short2 */
--duration-medium:   250ms;   /* medium1 */
--duration-long:     400ms;   /* long2 */`}</pre>
        </div>
      </section>

      {/* Usage Rules */}
      <section className="mb-12">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Usage Rules</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">상황별 적용 규칙</h2>
        </div>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
                {["상황", "Easing", "Duration"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-[11px] font-bold text-[var(--color-text-subtle)] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {usageRows.map((row, i) => (
                <tr key={row.context} className={`border-b border-[var(--color-border-default)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}>
                  <td className="px-5 py-3 font-medium text-[var(--color-text-default)]">{row.context}</td>
                  <td className="px-5 py-3 font-mono text-[11px] text-[var(--color-brand-primary)]">{row.easing}</td>
                  <td className="px-5 py-3 font-mono text-[11px] text-[var(--color-text-subtle)]">{row.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
