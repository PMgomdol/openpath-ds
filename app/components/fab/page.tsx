"use client";

import { useState } from "react";

// ─── Spec (DESIGN.md)
// Small: 40px, icon 24px, radius 9999px
// FAB: 56px, icon 24px, radius 9999px
// Large: 96px, icon 36px, radius 9999px
// Extended: 56px height, icon 24px, radius 9999px + 라벨
// shadow default: elevation/surface/sticky → shadow/03 (0 4px 16px)
// shadow hover/pressed: shadow/04 (0 8px 24px -2px)
// bg default: color/brand/primary M300
// bg hover: color/interactive/hover M400
// bg pressed: color/interactive/pressed M500
// icon: color/text/on-brand White

type FabType = "Small" | "FAB" | "Large" | "Extended";

function FAB({
  type = "FAB",
  label,
  icon,
  disabled,
}: {
  type?: FabType;
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}) {
  const iconSizes: Record<FabType, string> = {
    Small:    "w-6 h-6",
    FAB:      "w-6 h-6",
    Large:    "w-9 h-9",  // 36px
    Extended: "w-6 h-6",
  };

  const containerSizes: Record<FabType, React.CSSProperties> = {
    Small:    { width: 40, height: 40, borderRadius: 9999 },
    FAB:      { width: 56, height: 56, borderRadius: 9999 },
    Large:    { width: 96, height: 96, borderRadius: 9999 },
    Extended: { height: 56, borderRadius: 9999, paddingLeft: 16, paddingRight: 20, gap: 8 },
  };

  const defaultIcon = (
    <svg viewBox="0 0 24 24" fill="currentColor" className={iconSizes[type]}>
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    </svg>
  );

  return (
    <button
      disabled={disabled}
      style={{
        ...containerSizes[type],
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: disabled ? "var(--color-interactive-disabled)" : "var(--color-brand-primary)",
        color: "var(--color-text-on-brand, #FFFFFF)",
        boxShadow: disabled ? "none" : "var(--shadow-03, 0 4px 16px rgba(21,27,30,0.12))",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background 0.15s, box-shadow 0.15s",
        opacity: 1,
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        if (!disabled) {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.background = "var(--color-interactive-hover, #1BB8B3)";
          el.style.boxShadow = "var(--shadow-04, 0 8px 24px -2px rgba(21,27,30,0.20))";
        }
      }}
      onMouseLeave={e => {
        if (!disabled) {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.background = "var(--color-brand-primary)";
          el.style.boxShadow = "var(--shadow-03, 0 4px 16px rgba(21,27,30,0.12))";
        }
      }}
      onMouseDown={e => {
        if (!disabled) {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.background = "var(--color-interactive-pressed, #0F9490)";
          el.style.boxShadow = "var(--shadow-04, 0 8px 24px -2px rgba(21,27,30,0.20))";
        }
      }}
      onMouseUp={e => {
        if (!disabled) {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.background = "var(--color-interactive-hover, #1BB8B3)";
        }
      }}
    >
      {icon ?? defaultIcon}
      {type === "Extended" && label && (
        <span style={{ fontSize: 16, fontWeight: 500, letterSpacing: "0.04em", color: "#FFFFFF" }}>
          {label}
        </span>
      )}
    </button>
  );
}

export default function FABPage() {
  const [showSpeed, setShowSpeed] = useState(false);
  const speedActions = [
    { label: "공유",     icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg> },
    { label: "편집",     icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg> },
    { label: "즐겨찾기", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> },
  ];

  return (
    <div className="px-8 py-10 max-w-[960px]">
      <div className="mb-10 pb-8 border-b border-[var(--color-border-default)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight mb-2" style={{ color: "var(--color-text-default)" }}>
          FAB
        </h1>
        <p className="text-[16px] leading-relaxed max-w-[520px]" style={{ color: "var(--color-text-subtle)" }}>
          화면의 주요 액션을 수행하는 Floating Action Button.
          <br />
          <span className="text-mint-400 font-medium">shadow/03</span> (기본) →{" "}
          <span className="text-mint-400 font-medium">shadow/04</span> (Hover) ·
          Large <span className="text-mint-400 font-medium">96px</span>.
        </p>
      </div>

      {/* Size gallery */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Size Variants</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>Size 갤러리</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>Small 40px · FAB 56px · Large 96px · Extended 56px+라벨</p>
        </div>
        <div
          className="rounded-xl border border-[var(--color-border-default)] p-8"
          style={{ background: "var(--color-bg-subtle)" }}
        >
          <div className="flex flex-wrap items-end gap-8">
            <div className="flex flex-col items-center gap-3">
              <FAB type="Small" />
              <span className="text-[11px]" style={{ color: "var(--color-text-subtle)" }}>Small (40px)</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <FAB type="FAB" />
              <span className="text-[11px]" style={{ color: "var(--color-text-subtle)" }}>FAB (56px)</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <FAB type="Large" />
              <span className="text-[11px]" style={{ color: "var(--color-text-subtle)" }}>Large (96px)</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <FAB type="Extended" label="만들기" />
              <span className="text-[11px]" style={{ color: "var(--color-text-subtle)" }}>Extended</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <FAB type="FAB" disabled />
              <span className="text-[11px]" style={{ color: "var(--color-text-subtle)" }}>Disabled</span>
            </div>
          </div>
        </div>
      </section>

      {/* Speed Dial */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Speed Dial</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>Speed Dial 데모</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>FAB 클릭으로 서브 액션 확장</p>
        </div>
        <div
          className="rounded-xl border border-[var(--color-border-default)] flex items-end justify-end p-6"
          style={{ background: "var(--color-bg-subtle)", minHeight: 240 }}
        >
          <div className="flex flex-col items-end gap-3">
            {showSpeed && (
              <>
                {speedActions.map((a) => (
                  <div key={a.label} className="flex items-center gap-3">
                    <span
                      className="text-[12px] font-medium px-3 py-1.5 rounded-lg"
                      style={{
                        background: "var(--color-bg-default)",
                        color: "var(--color-text-subtle)",
                        boxShadow: "var(--shadow-02)",
                      }}
                    >
                      {a.label}
                    </span>
                    <button
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                      style={{
                        background: "var(--color-bg-brand)",
                        color: "var(--color-brand-primary)",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {a.icon}
                    </button>
                  </div>
                ))}
              </>
            )}
            <button
              onClick={() => setShowSpeed(v => !v)}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <FAB
                type="FAB"
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                    style={{ transition: "transform 0.2s", transform: showSpeed ? "rotate(45deg)" : "none" }}
                  >
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                }
              />
            </button>
          </div>
        </div>
      </section>

      {/* Spec */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Spec</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>스펙 테이블</h2>
        </div>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[var(--color-border-default)]" style={{ background: "var(--color-bg-subtle)" }}>
                {["Type", "크기", "아이콘", "Radius", "Token"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--color-text-subtle)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { type: "Small",    size: "40px",       icon: "24px", radius: "9999px", token: "radius/component/fab" },
                { type: "FAB",      size: "56px",       icon: "24px", radius: "9999px", token: "radius/component/fab" },
                { type: "Large",    size: "96px",       icon: "36px", radius: "9999px", token: "radius/component/fab" },
                { type: "Extended", size: "56px (높이)", icon: "24px", radius: "9999px", token: "radius/component/fab" },
              ].map((row, i) => (
                <tr key={row.type} className="border-b border-[var(--color-border-default)] last:border-0" style={{ background: i % 2 === 1 ? "var(--color-bg-subtle)" : undefined }}>
                  <td className="px-4 py-3 font-semibold" style={{ color: "var(--color-text-default)" }}>{row.type}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-mint-500">{row.size}</td>
                  <td className="px-4 py-3 font-mono text-[12px]" style={{ color: "var(--color-text-subtle)" }}>{row.icon}</td>
                  <td className="px-4 py-3 font-mono text-[12px]" style={{ color: "var(--color-text-subtle)" }}>{row.radius}</td>
                  <td className="px-4 py-3"><code className="text-[11px] font-mono" style={{ color: "var(--color-text-subtle)" }}>{row.token}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[var(--color-border-default)]" style={{ background: "var(--color-bg-subtle)" }}>
                {["속성", "State", "Value", "Token"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--color-text-subtle)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { attr: "Shadow",     state: "Default",       value: "0 4px 16px",       token: "elevation/surface/sticky → shadow/03" },
                { attr: "Shadow",     state: "Hover/Pressed",  value: "0 8px 24px -2px",  token: "shadow/04" },
                { attr: "Background", state: "Default",       value: "M300 #28D7D2",      token: "color/brand/primary" },
                { attr: "Background", state: "Hover",         value: "M400 #1BB8B3",      token: "color/interactive/hover" },
                { attr: "Background", state: "Pressed",       value: "M500 #0F9490",      token: "color/interactive/pressed" },
                { attr: "Icon",       state: "—",             value: "White #FFFFFF",      token: "color/text/on-brand" },
              ].map((row, i) => (
                <tr key={`${row.attr}-${row.state}`} className="border-b border-[var(--color-border-default)] last:border-0" style={{ background: i % 2 === 1 ? "var(--color-bg-subtle)" : undefined }}>
                  <td className="px-4 py-3 font-medium" style={{ color: "var(--color-text-default)" }}>{row.attr}</td>
                  <td className="px-4 py-3" style={{ color: "var(--color-text-subtle)" }}>{row.state}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-mint-500">{row.value}</td>
                  <td className="px-4 py-3"><code className="text-[11px] font-mono" style={{ color: "var(--color-text-subtle)" }}>{row.token}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Do / Don't */}
      <section className="mb-16">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Guidelines</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>Do / Don't</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border-2 border-[var(--color-border-brand)] p-5" style={{ background: "var(--color-bg-brand)" }}>
            <p className="text-[14px] font-bold text-[var(--color-brand-primary)] mb-3">✓ Do</p>
            <ul className="space-y-2">
              {["가장 중요한 단일 액션 1개만", "스크롤 시 콘텐츠에 가려지지 않도록 고정", "Hover 시 shadow/04로 elevation 표시", "Extended FAB에는 명확한 동사형 라벨"].map((t, i) => (
                <li key={i} className="flex gap-2 text-[13px]" style={{ color: "var(--color-text-default)" }}>
                  <span className="text-[var(--color-brand-primary)] font-bold shrink-0">✓</span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border-2 p-5" style={{ borderColor: "var(--color-status-error)", background: "var(--color-bg-error)" }}>
            <p className="text-[14px] font-bold mb-3" style={{ color: "var(--color-status-error)" }}>✕ Don't</p>
            <ul className="space-y-2">
              {["FAB 2개 이상 동시 노출", "스크롤 시 FAB이 콘텐츠 위로 겹침", "Large FAB을 80px로 사용 (96px 준수)", "Shadow 없이 FAB 배치"].map((t, i) => (
                <li key={i} className="flex gap-2 text-[13px] text-red-700 dark:text-red-300">
                  <span className="font-bold shrink-0" style={{ color: "var(--color-status-error)" }}>✕</span>{t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
