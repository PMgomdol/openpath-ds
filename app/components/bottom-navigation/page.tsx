"use client";

import { useState } from "react";

// ─── Spec (DESIGN.md)
// height: 80px
// icon: 24px, Active: color/brand/primary, Inactive: color/text/subtle
// Active indicator: 64×32px, radius 9999px, color/bg/brand M20
// label: 12px Medium (type/label/sm)
// shadow: elevation/surface/sticky → shadow/03 (0 4px 16px)
// badge: color/status/error #FF3257

const NAV_ITEMS = [
  { label: "홈",       key: "home" },
  { label: "탐색",     key: "search" },
  { label: "즐겨찾기", key: "favorite" },
  { label: "알림",     key: "notifications" },
  { label: "프로필",   key: "profile" },
];

function NavIcon({ name, className }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    home: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "w-6 h-6"}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
      </svg>
    ),
    search: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "w-6 h-6"}>
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
      </svg>
    ),
    favorite: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "w-6 h-6"}>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    ),
    notifications: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "w-6 h-6"}>
        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
      </svg>
    ),
    profile: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className ?? "w-6 h-6"}>
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    ),
  };
  return <>{icons[name]}</>;
}

function BottomNav({
  items,
  badgeIndex,
}: {
  items: typeof NAV_ITEMS;
  badgeIndex?: number;
}) {
  const [active, setActive] = useState(0);

  return (
    <div
      style={{
        background: "var(--color-bg-default)",
        boxShadow: "var(--shadow-03, 0 4px 16px rgba(21,27,30,0.12))",
        height: 80,
      }}
      className="w-full flex border-t border-[var(--color-border-default)]"
    >
      {items.map((item, i) => {
        const isActive = active === i;
        return (
          <button
            key={item.key}
            onClick={() => setActive(i)}
            className="flex-1 flex flex-col items-center justify-center gap-1 relative"
          >
            {/* Active indicator pill: 64×32px */}
            <div
              style={{
                width: 64,
                height: 32,
                borderRadius: 9999,
                background: isActive ? "var(--color-bg-brand)" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                transition: "background 0.15s",
              }}
            >
              <span
                style={{
                  color: isActive
                    ? "var(--color-brand-primary)"
                    : "var(--color-text-subtle)",
                  transition: "color 0.15s",
                  position: "relative",
                }}
              >
                <NavIcon name={item.key} className="w-6 h-6" />
                {badgeIndex === i && (
                  <span
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center"
                    style={{ background: "var(--color-status-error)" }}
                  >
                    3
                  </span>
                )}
              </span>
            </div>
            {/* Label: 12px Medium */}
            <span
              style={{
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.04em",
                color: isActive
                  ? "var(--color-brand-primary)"
                  : "var(--color-text-subtle)",
                transition: "color 0.15s",
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function BottomNavigationPage() {
  return (
    <div className="px-8 py-10 max-w-[960px]">
      <div className="mb-10 pb-8 border-b border-[var(--color-border-default)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight mb-2" style={{ color: "var(--color-text-default)" }}>
          Bottom Navigation
        </h1>
        <p className="text-[16px] leading-relaxed max-w-[520px]" style={{ color: "var(--color-text-subtle)" }}>
          모바일 하단 고정 탐색 컴포넌트.
          <br />
          <span className="text-mint-400 font-medium">64×32px Pill indicator</span> ·{" "}
          <span className="text-mint-400 font-medium">shadow/03</span> · 3~5개 탭.
        </p>
      </div>

      {/* Default — with label */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Default</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>라벨 포함 (5개 탭)</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>높이 80px · Active indicator 64×32px pill</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
          <div
            className="h-32 flex items-center justify-center text-[13px]"
            style={{ background: "var(--color-bg-subtle)", color: "var(--color-text-subtle)" }}
          >
            콘텐츠 영역
          </div>
          <BottomNav items={NAV_ITEMS} />
        </div>
      </section>

      {/* 3-tab */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">3 Tabs</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>3개 탭</h2>
        </div>
        <div className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
          <div
            className="h-24 flex items-center justify-center text-[13px]"
            style={{ background: "var(--color-bg-subtle)", color: "var(--color-text-subtle)" }}
          >
            콘텐츠 영역
          </div>
          <BottomNav items={NAV_ITEMS.slice(0, 3)} />
        </div>
      </section>

      {/* Badge */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Badge</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>Badge 포함</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>알림 아이콘에 뱃지 표시 · color/status/error #FF3257</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
          <div
            className="h-24 flex items-center justify-center text-[13px]"
            style={{ background: "var(--color-bg-subtle)", color: "var(--color-text-subtle)" }}
          >
            콘텐츠 영역
          </div>
          <BottomNav items={NAV_ITEMS} badgeIndex={3} />
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
                {["속성", "Value", "Token"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--color-text-subtle)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { attr: "높이",              value: "80px",              token: "—" },
                { attr: "아이콘 크기",        value: "24px",              token: "—" },
                { attr: "Active indicator",  value: "64px × 32px",       token: "—" },
                { attr: "Indicator radius",  value: "9999px",            token: "—" },
                { attr: "Indicator bg",      value: "M20 #F3FCFC",       token: "color/bg/brand" },
                { attr: "라벨 폰트",          value: "12px Medium",       token: "type/label/sm" },
                { attr: "Active 색",          value: "M300 #28D7D2",      token: "color/brand/primary" },
                { attr: "Inactive 색",        value: "N300 #889298",      token: "color/text/subtle" },
                { attr: "Background",         value: "White / N600",      token: "color/bg/default" },
                { attr: "Shadow",             value: "0 4px 16px",        token: "elevation/surface/sticky → shadow/03" },
                { attr: "Badge bg",           value: "#FF3257",           token: "color/status/error" },
                { attr: "탭 개수",             value: "3~5개",             token: "—" },
              ].map((row, i) => (
                <tr key={row.attr} className="border-b border-[var(--color-border-default)] last:border-0" style={{ background: i % 2 === 1 ? "var(--color-bg-subtle)" : undefined }}>
                  <td className="px-4 py-3 font-medium" style={{ color: "var(--color-text-default)" }}>{row.attr}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-mint-500">{row.value}</td>
                  <td className="px-4 py-3">
                    {row.token !== "—"
                      ? <code className="text-[11px] font-mono" style={{ color: "var(--color-text-subtle)" }}>{row.token}</code>
                      : <span style={{ color: "var(--color-border-default)" }}>—</span>}
                  </td>
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
              {["탭 3~5개 유지", "라벨은 1단어로 짧게", "Active 탭은 항상 1개만", "Pill indicator로 Active 강조"].map((t, i) => (
                <li key={i} className="flex gap-2 text-[13px]" style={{ color: "var(--color-text-default)" }}>
                  <span className="text-[var(--color-brand-primary)] font-bold shrink-0">✓</span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border-2 p-5" style={{ borderColor: "rgba(255,50,87,0.3)", background: "#FFF0F3" }}>
            <p className="text-[14px] font-bold mb-3" style={{ color: "var(--color-status-error)" }}>✕ Don't</p>
            <ul className="space-y-2">
              {["탭 2개 이하 또는 6개 이상", "긴 라벨로 탭 간격 붕괴", "Badge 없이 알림 표시", "Bottom Nav를 스크롤에 가리게 배치"].map((t, i) => (
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
