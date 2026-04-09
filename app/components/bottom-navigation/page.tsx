"use client";

import { useState } from "react";

const NAV_ITEMS = [
  { label: "홈",      icon: "H" },
  { label: "탐색",    icon: "S" },
  { label: "즐겨찾기", icon: "★" },
  { label: "프로필",  icon: "P" },
];

function BottomNav({ showLabel = true, badgeIndex }: { showLabel?: boolean; badgeIndex?: number }) {
  const [active, setActive] = useState(0);

  const icons: React.ReactNode[] = [
    // Home
    <svg key="h" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>,
    // Search
    <svg key="s" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>,
    // Favorite
    <svg key="fav" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
    // Profile
    <svg key="p" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>,
  ];

  return (
    <div className="w-full bg-[var(--color-bg-base,white)] dark:bg-neutral-600 border-t border-[var(--color-border)] shadow-[0_-4px_16px_0_rgba(21,27,30,0.08)]">
      <div className="flex">
        {NAV_ITEMS.map((item, i) => (
          <button
            key={item.label}
            onClick={() => setActive(i)}
            className={`
              flex-1 flex flex-col items-center justify-center gap-1 py-3 relative transition-all duration-150
              ${active === i ? "text-mint-400" : "text-neutral-300 hover:text-neutral-400"}
            `}
          >
            <span className="relative">
              {icons[i]}
              {badgeIndex === i && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF3257] text-white text-[9px] font-bold flex items-center justify-center">3</span>
              )}
            </span>
            {showLabel && (
              <span className={`text-[10px] font-medium tracking-[0.04em] ${active === i ? "text-mint-400" : ""}`}>
                {item.label}
              </span>
            )}
            {active === i && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-mint-300 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function BottomNavigationPage() {
  return (
    <div className="px-8 py-10 max-w-[960px]">
      <div className="mb-10 pb-8 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-primary)] mb-2">Bottom Navigation</h1>
        <p className="text-[16px] text-[var(--color-text-secondary)] leading-relaxed max-w-[520px]">
          모바일 화면 하단에 고정되어 최상위 탐색을 제공하는 컴포넌트.
          <br />
          3~5개 탭, 아이콘과 레이블로 구성됩니다.
        </p>
      </div>

      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Variants</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">Variant 갤러리</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <p className="text-[12px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-3">레이블 있음</p>
            <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
              <div className="h-32 bg-[var(--color-bg-subtle)] flex items-center justify-center text-[13px] text-[var(--color-text-secondary)]">콘텐츠 영역</div>
              <BottomNav showLabel />
            </div>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-3">레이블 없음</p>
            <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
              <div className="h-32 bg-[var(--color-bg-subtle)] flex items-center justify-center text-[13px] text-[var(--color-text-secondary)]">콘텐츠 영역</div>
              <BottomNav showLabel={false} />
            </div>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-3">Badge 있음</p>
            <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
              <div className="h-32 bg-[var(--color-bg-subtle)] flex items-center justify-center text-[13px] text-[var(--color-text-secondary)]">콘텐츠 영역</div>
              <BottomNav showLabel badgeIndex={2} />
            </div>
          </div>
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
                {["속성", "Value", "Token"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { attr: "Height",           value: "56px (icon) / 64px (label)", token: "—" },
                { attr: "Icon size",        value: "24dp",          token: "—" },
                { attr: "Label font",       value: "10px Medium",   token: "type/caption" },
                { attr: "Active color",     value: "M300 #28D7D2",  token: "color/interactive/primary" },
                { attr: "Inactive color",   value: "N300 #889298",  token: "color/text/subtle" },
                { attr: "Background",       value: "White / N600",  token: "color/bg/default" },
                { attr: "Elevation",        value: "sticky (Level 3)", token: "elevation/surface/sticky" },
                { attr: "Badge bg",         value: "#FF3257",       token: "color/status/error" },
              ].map((row, i) => (
                <tr key={row.attr} className={`border-b border-[var(--color-border)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}>
                  <td className="px-4 py-3 font-medium text-[var(--color-text-primary)]">{row.attr}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-mint-500 dark:text-mint-300">{row.value}</td>
                  <td className="px-4 py-3">
                    {row.token !== "—"
                      ? <code className="text-[11px] font-mono text-[var(--color-text-secondary)] bg-[var(--color-bg-subtle)] px-2 py-0.5 rounded">{row.token}</code>
                      : <span className="text-neutral-300">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
