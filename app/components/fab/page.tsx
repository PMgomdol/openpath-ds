"use client";

import { useState } from "react";

type FabSize = "Mini" | "Default" | "Extended" | "Large";

function FAB({ size = "Default", label, icon, disabled }: {
  size?: FabSize;
  label?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}) {
  const defaultIcon = (
    <svg viewBox="0 0 24 24" fill="currentColor" className={size === "Large" ? "w-8 h-8" : size === "Mini" ? "w-5 h-5" : "w-6 h-6"}>
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    </svg>
  );

  const base = `
    inline-flex items-center justify-center gap-2
    rounded-full bg-mint-300 text-white
    shadow-[0_8px_24px_-2px_rgba(21,27,30,0.20)]
    transition-all duration-150
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-mint-400 active:bg-mint-500 hover:shadow-[0_12px_32px_-2px_rgba(21,27,30,0.24)]"}
  `;

  if (size === "Mini")     return <button disabled={disabled} className={`${base} w-10 h-10`}>{icon ?? defaultIcon}</button>;
  if (size === "Default")  return <button disabled={disabled} className={`${base} w-14 h-14`}>{icon ?? defaultIcon}</button>;
  if (size === "Large")    return <button disabled={disabled} className={`${base} w-20 h-20`}>{icon ?? defaultIcon}</button>;
  // Extended
  return (
    <button disabled={disabled} className={`${base} px-5 py-3.5`}>
      {icon ?? defaultIcon}
      {label && <span className="text-[16px] font-medium tracking-[0.04em]">{label}</span>}
    </button>
  );
}

export default function FABPage() {
  const [showSpeed, setShowSpeed] = useState(false);
  const speedActions = [
    { label: "공유", icon: "↗" },
    { label: "편집", icon: "✎" },
    { label: "즐겨찾기", icon: "★" },
  ];

  return (
    <div className="px-8 py-10 max-w-[960px]">
      <div className="mb-10 pb-8 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-primary)] mb-2">FAB</h1>
        <p className="text-[16px] text-[var(--color-text-secondary)] leading-relaxed max-w-[520px]">
          화면의 주요 액션을 수행하는 Floating Action Button.
          <br />
          화면 우하단에 고정 배치되며 항상 가장 높은 Elevation을 가집니다.
        </p>
      </div>

      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Size Variants</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">Size 갤러리</h2>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] p-8 bg-[var(--color-bg-subtle)]">
          <div className="flex flex-wrap items-end gap-6">
            <div className="flex flex-col items-center gap-3">
              <FAB size="Mini" />
              <span className="text-[11px] text-[var(--color-text-secondary)]">Mini (40px)</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <FAB size="Default" />
              <span className="text-[11px] text-[var(--color-text-secondary)]">Default (56px)</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <FAB size="Large" />
              <span className="text-[11px] text-[var(--color-text-secondary)]">Large (80px)</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <FAB size="Extended" label="만들기" />
              <span className="text-[11px] text-[var(--color-text-secondary)]">Extended</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <FAB size="Default" disabled />
              <span className="text-[11px] text-[var(--color-text-secondary)]">Disabled</span>
            </div>
          </div>
        </div>
      </section>

      {/* Speed Dial */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Speed Dial</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">Speed Dial 데모</h2>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] p-8 bg-[var(--color-bg-subtle)] flex items-end justify-end min-h-[200px]">
          <div className="relative flex flex-col items-center gap-3">
            {showSpeed && (
              <div className="flex flex-col items-center gap-2 mb-2">
                {speedActions.map((a) => (
                  <div key={a.label} className="flex items-center gap-2">
                    <span className="text-[12px] font-medium text-[var(--color-text-secondary)] bg-[var(--color-bg-base,white)] dark:bg-neutral-600 px-2.5 py-1 rounded-lg shadow-elevation-1">
                      {a.label}
                    </span>
                    <button className="w-10 h-10 rounded-full bg-mint-100 dark:bg-mint-600/30 text-mint-500 dark:text-mint-300 flex items-center justify-center hover:bg-mint-200 transition-colors">
                      {a.icon}
                    </button>
                  </div>
                ))}
              </div>
            )}
            <FAB size="Default" icon={
              <svg viewBox="0 0 24 24" fill="currentColor" className={`w-6 h-6 transition-transform duration-200 ${showSpeed ? "rotate-45" : ""}`}>
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
            } />
          </div>
          <button
            onClick={() => setShowSpeed((v) => !v)}
            className="absolute bottom-6 right-24 text-[13px] text-mint-400 underline"
          >
            {showSpeed ? "닫기" : "Speed Dial 열기"}
          </button>
        </div>
      </section>

      <section className="mb-16">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Spec</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">스펙 테이블</h2>
        </div>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border)]">
                {["Size", "Diameter", "Icon Size", "Radius", "Token"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { size: "Mini",     dia: "40px",  icon: "20dp", radius: "9999px", token: "radius/component/fab" },
                { size: "Default",  dia: "56px",  icon: "24dp", radius: "9999px", token: "radius/component/fab" },
                { size: "Large",    dia: "80px",  icon: "32dp", radius: "9999px", token: "radius/component/fab" },
                { size: "Extended", dia: "56px h", icon: "24dp", radius: "9999px", token: "radius/component/fab" },
              ].map((row, i) => (
                <tr key={row.size} className={`border-b border-[var(--color-border)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}>
                  <td className="px-4 py-3 font-semibold text-[var(--color-text-primary)]">{row.size}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-mint-500">{row.dia}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-text-secondary)]">{row.icon}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-text-secondary)]">{row.radius}</td>
                  <td className="px-4 py-3"><code className="text-[11px] font-mono text-[var(--color-text-secondary)] bg-[var(--color-bg-subtle)] px-2 py-0.5 rounded">{row.token}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
