"use client";

import { useState } from "react";
import FAB from "@/components/ui/FAB";
import { Plus, Share2, Edit3, Heart } from "lucide-react";
import CodeBlock from "@/components/ui/CodeBlock";

// ── Code snippets ──────────────────────────────────────────────
const FAB_SNIPPETS = [
  {
    label: "Standard",
    code: `import FAB from "@/components/ui/FAB";
import { Plus } from "lucide-react";

// Standard FAB (md — 56dp)
<FAB
  size="md"
  icon={<Plus size={24} />}
  aria-label="추가하기"
  onClick={() => {}}
/>

// Small (40dp) / Large (96dp) variants
<FAB size="sm" icon={<Plus size={20} />} aria-label="추가하기" onClick={() => {}} />
<FAB size="lg" icon={<Plus size={28} />} aria-label="추가하기" onClick={() => {}} />`,
  },
  {
    label: "Extended",
    code: `import FAB from "@/components/ui/FAB";
import { Edit } from "lucide-react";

// Extended FAB — icon + label
<FAB
  size="extended"
  icon={<Edit size={24} />}
  label="작성하기"
  onClick={() => {}}
/>`,
  },
];

const speedActions = [
  { label: "공유",     icon: <Share2 size={18} /> },
  { label: "편집",     icon: <Edit3 size={18} /> },
  { label: "즐겨찾기", icon: <Heart size={18} /> },
];

export default function FABPage() {
  const [showSpeed, setShowSpeed] = useState(false);

  return (
    <div className="px-8 py-10 max-w-[960px]">
      {/* Header */}
      <div className="mb-10 pb-8 border-b border-[var(--color-border-default)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]" />
          <span className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-default)] mb-2">FAB</h1>
        <p className="text-[16px] text-[var(--color-text-subtle)] leading-relaxed max-w-[520px]">
          화면의 주요 액션을 수행하는 Floating Action Button.
          <br />
          <span className="text-[var(--color-brand-primary)] font-medium">shape/lg (16px) Rounded Square</span> ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">shadow/03 → 04</span>
        </p>
      </div>

      {/* Size Gallery */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Size Variants</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">4가지 Size</h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            Small 40dp · FAB 56dp · Large 96dp · Extended 56dp+라벨 — 모두 <strong>Rounded Square</strong> (Pill 아님)
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-border-default)] p-8 bg-[var(--color-bg-subtle)]">
          <div className="flex flex-wrap items-end gap-10">
            <div className="flex flex-col items-center gap-3">
              <FAB size="sm" icon={<Plus size={24} />} aria-label="추가 (Small)" />
              <span className="text-[11px] text-[var(--color-text-subtle)]">Small (40dp)</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <FAB size="md" icon={<Plus size={24} />} aria-label="추가" />
              <span className="text-[11px] text-[var(--color-text-subtle)]">FAB (56dp)</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <FAB size="lg" icon={<Plus size={36} />} aria-label="추가 (Large)" />
              <span className="text-[11px] text-[var(--color-text-subtle)]">Large (96dp)</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <FAB size="extended" icon={<Plus size={24} />} label="만들기" />
              <span className="text-[11px] text-[var(--color-text-subtle)]">Extended</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <FAB size="md" icon={<Plus size={24} />} aria-label="추가" disabled />
              <span className="text-[11px] text-[var(--color-text-subtle)]">Disabled</span>
            </div>
          </div>
        </div>
      </section>

      {/* Speed Dial */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Speed Dial</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">Speed Dial 데모</h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">FAB 클릭 시 서브 액션 확장</p>
        </div>
        <div
          className="rounded-xl border border-[var(--color-border-default)] flex items-end justify-end p-6 bg-[var(--color-bg-subtle)]"
          style={{ minHeight: 240 }}
        >
          <div className="flex flex-col items-end gap-3">
            {showSpeed && (
              <>
                {speedActions.map((a) => (
                  <div key={a.label} className="flex items-center gap-3">
                    <span className="text-[12px] font-medium px-3 py-1.5 rounded-lg bg-[var(--color-bg-default)] text-[var(--color-text-subtle)]" style={{ boxShadow: "var(--shadow-02)" }}>
                      {a.label}
                    </span>
                    <button
                      className="w-10 h-10 rounded-xl flex items-center justify-center border-none cursor-pointer bg-[var(--color-bg-brand)] text-[var(--color-brand-primary)]"
                      onClick={() => setShowSpeed(false)}
                      aria-label={a.label}
                    >
                      {a.icon}
                    </button>
                  </div>
                ))}
              </>
            )}
            <FAB
              size="md"
              icon={
                <Plus
                  size={24}
                  style={{
                    transition: `transform var(--duration-medium) var(--motion-standard)`,
                    transform: showSpeed ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                />
              }
              aria-label={showSpeed ? "닫기" : "추가 액션 열기"}
              onClick={() => setShowSpeed((v) => !v)}
            />
          </div>
        </div>
      </section>

      {/* Spec Table */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Spec</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">스펙 테이블</h2>
        </div>

        {/* Size spec */}
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)] mb-4">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
                {["Type", "크기", "아이콘", "Shape", "Shape Token", "터치 영역"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-bold text-[var(--color-text-subtle)] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { type: "Small",    size: "40dp", icon: "24dp", shape: "16px", token: "shape/lg",  touch: "48dp (::after)" },
                { type: "FAB",      size: "56dp", icon: "24dp", shape: "16px", token: "shape/lg",  touch: "56dp" },
                { type: "Large",    size: "96dp", icon: "36dp", shape: "28px", token: "shape/xl",  touch: "96dp" },
                { type: "Extended", size: "56dp (높이)", icon: "24dp", shape: "16px", token: "shape/lg", touch: "56dp" },
              ].map((row, i) => (
                <tr key={row.type} className={`border-b border-[var(--color-border-default)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}>
                  <td className="px-4 py-3 font-semibold text-[var(--color-text-default)]">{row.type}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-brand-primary)]">{row.size}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-text-subtle)]">{row.icon}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-brand-primary)] font-bold">{row.shape}</td>
                  <td className="px-4 py-3"><code className="text-[11px] font-mono text-[var(--color-brand-primary)] bg-[var(--color-bg-brand)] px-1.5 py-0.5 rounded">{row.token}</code></td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-text-subtle)]">{row.touch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Color & Shadow spec */}
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
                {["속성", "State", "Value", "Token"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-bold text-[var(--color-text-subtle)] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { attr: "Background", state: "Default",       value: "M300 #28D7D2",  token: "color/brand/primary" },
                { attr: "Background", state: "Hover",         value: "M400 #1BB8B3",  token: "color/interactive/hover" },
                { attr: "Background", state: "Pressed",       value: "M500 #0F9490",  token: "color/interactive/pressed" },
                { attr: "Background", state: "Disabled",      value: "N100 #D8DCDE",  token: "color/interactive/disabled" },
                { attr: "Icon",       state: "—",             value: "N600 #29363D",  token: "color/text/on-brand" },
                { attr: "Shadow",     state: "Default",       value: "var(--shadow-03)", token: "shadow/03" },
                { attr: "Shadow",     state: "Hover",         value: "var(--shadow-04)", token: "shadow/04" },
              ].map((row, i) => (
                <tr key={`${row.attr}-${row.state}`} className={`border-b border-[var(--color-border-default)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}>
                  <td className="px-4 py-3 font-medium text-[var(--color-text-default)]">{row.attr}</td>
                  <td className="px-4 py-3 text-[var(--color-text-subtle)]">{row.state}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-brand-primary)]">{row.value}</td>
                  <td className="px-4 py-3"><code className="text-[11px] font-mono text-[var(--color-text-subtle)]">{row.token}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex items-start gap-2 px-4 py-3 rounded-lg bg-[var(--color-bg-brand)] border border-[var(--color-border-brand)]/30">
          <span className="text-[var(--color-brand-primary)] shrink-0">⚠️</span>
          <p className="text-[13px] text-[var(--color-text-default)]">
            <strong>M3 FAB는 shape/lg (16px Rounded Square)</strong>입니다. shape/full (Pill)이 아닙니다.
            M2 → M3에서 변경된 핵심 차이점. 아이콘 색상도 White가 아닌 <code className="font-mono text-[11px] px-1 py-0.5 bg-[var(--color-bg-subtle)] rounded">N600 #29363D</code> (WCAG AA 통과).
          </p>
        </div>
      </section>

      {/* Do / Don't */}
      <section className="mb-16">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Guidelines</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">Do / Don&apos;t</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border-2 border-[var(--color-border-brand)] p-5 bg-[var(--color-bg-brand)]">
            <p className="text-[14px] font-bold text-[var(--color-brand-primary)] mb-3">✓ Do</p>
            <ul className="space-y-2">
              {[
                "화면당 FAB 1개만 배치",
                "가장 중요한 단일 액션에 사용",
                "Hover 시 shadow/04로 elevation 강조",
                "Extended FAB에는 명확한 동사형 라벨",
              ].map((t) => (
                <li key={t} className="flex gap-2 text-[13px] text-[var(--color-text-default)]">
                  <span className="text-[var(--color-brand-primary)] font-bold shrink-0">›</span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border-2 p-5 bg-[var(--color-bg-error)]" style={{ borderColor: "var(--color-status-error)" }}>
            <p className="text-[14px] font-bold mb-3 text-[var(--color-status-error)]">✕ Don&apos;t</p>
            <ul className="space-y-2">
              {[
                "FAB 2개 이상 동시 노출",
                "shape/full (Pill)로 구현 — M3는 shape/lg",
                "Large FAB을 96dp 미만으로 사용",
                "Shadow 없이 FAB 배치",
              ].map((t) => (
                <li key={t} className="flex gap-2 text-[13px] text-[var(--color-text-default)]">
                  <span className="text-[var(--color-status-error)] font-bold shrink-0">›</span>{t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CodeBlock snippets={FAB_SNIPPETS} />
    </div>
  );
}
