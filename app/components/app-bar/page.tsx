"use client";

import { useState, useEffect, useRef } from "react";

// ─── Spec (DESIGN.md)
// Small: 64px / Medium: 112px / Large: 152px / Bottom: 80px
// 패딩: 16px (space/04)
// 아이콘: 24px
// 스크롤 전: elevation/surface/default (shadow 없음)
// 스크롤 후: elevation/surface/sticky → shadow/03 (0 4px 16px)
// bg 스크롤 전: color/bg/default / 스크롤 후: color/bg/subtle

type AppBarType = "Small" | "Medium" | "Large" | "Bottom";

const HEIGHTS: Record<AppBarType, number> = {
  Small:  64,
  Medium: 112,
  Large:  152,
  Bottom: 80,
};

const ICONS = {
  back: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
    </svg>
  ),
  menu: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </svg>
  ),
  more: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
    </svg>
  ),
  edit: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
    </svg>
  ),
  add: (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
    </svg>
  ),
};

function IconButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button
      className="w-10 h-10 flex items-center justify-center rounded-full transition-colors hover:bg-[var(--color-bg-subtle)] shrink-0"
      style={{ color: "var(--color-text-default)" }}
    >
      {icon}
    </button>
  );
}

function AppBarPreview({ type, scrolled }: { type: AppBarType; scrolled: boolean }) {
  const shadow = scrolled ? "var(--shadow-03, 0 4px 16px rgba(21,27,30,0.12))" : "none";
  const bg     = scrolled ? "var(--color-bg-subtle)" : "var(--color-bg-default)";

  if (type === "Small") {
    return (
      <div className="w-full transition-all duration-200" style={{ background: bg, boxShadow: shadow }}>
        <div className="flex items-center gap-1 px-4" style={{ height: 64 }}>
          <IconButton icon={ICONS.back} />
          <span className="flex-1 text-[18px] font-bold ml-1" style={{ color: "var(--color-text-default)" }}>
            페이지 제목
          </span>
          <IconButton icon={ICONS.search} />
          <IconButton icon={ICONS.more} />
        </div>
      </div>
    );
  }

  if (type === "Medium") {
    return (
      <div className="w-full transition-all duration-200" style={{ background: bg, boxShadow: shadow }}>
        <div className="flex items-center justify-between px-4" style={{ height: 64 }}>
          <IconButton icon={ICONS.back} />
          <div className="flex gap-1">
            <IconButton icon={ICONS.search} />
            <IconButton icon={ICONS.more} />
          </div>
        </div>
        <div className="px-4 pb-5">
          <h2 className="text-[28px] font-bold" style={{ color: "var(--color-text-default)" }}>Medium 타이틀</h2>
        </div>
      </div>
    );
  }

  if (type === "Large") {
    return (
      <div className="w-full transition-all duration-200" style={{ background: bg, boxShadow: shadow }}>
        <div className="flex items-center justify-between px-4" style={{ height: 64 }}>
          <IconButton icon={ICONS.back} />
          <div className="flex gap-1">
            <IconButton icon={ICONS.search} />
            <IconButton icon={ICONS.more} />
          </div>
        </div>
        <div className="px-4 pb-7">
          <h2 className="text-[36px] font-black tracking-tight" style={{ color: "var(--color-text-default)" }}>Large 타이틀</h2>
        </div>
      </div>
    );
  }

  // Bottom
  return (
    <div className="w-full transition-all duration-200" style={{ background: bg, boxShadow: "var(--shadow-03)" }}>
      <div className="flex items-center justify-between px-4" style={{ height: 80 }}>
        <IconButton icon={ICONS.menu} />
        <div className="flex gap-1">
          <IconButton icon={ICONS.search} />
          <IconButton icon={ICONS.edit} />
          <IconButton icon={ICONS.more} />
        </div>
        {/* FAB placeholder */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white"
          style={{ background: "var(--color-brand-primary)" }}
        >
          {ICONS.add}
        </div>
      </div>
    </div>
  );
}

function ScrollDemo({ type }: { type: AppBarType }) {
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    setScrolled((scrollRef.current?.scrollTop ?? 0) > 10);
  };

  return (
    <div className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
      <AppBarPreview type={type} scrolled={scrolled} />
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="overflow-y-auto"
        style={{ maxHeight: 160, background: "var(--color-bg-subtle)" }}
      >
        <div className="p-4" style={{ height: 400 }}>
          <p className="text-[13px]" style={{ color: "var(--color-text-subtle)" }}>
            ↑ 위 App Bar 위에서 스크롤하면 shadow/03 elevation이 나타납니다.
            {[...Array(8)].map((_, i) => (
              <span key={i} className="block mt-2">스크롤 콘텐츠 {i + 1}</span>
            ))}
          </p>
        </div>
      </div>
      <div className="px-4 py-2 border-t border-[var(--color-border-default)]">
        <p className="text-[11px]" style={{ color: "var(--color-text-subtle)" }}>
          상태: {scrolled ? "🟢 스크롤됨 — shadow/03 적용" : "⚪ 상단 — shadow 없음"}
        </p>
      </div>
    </div>
  );
}

export default function AppBarPage() {
  return (
    <div className="px-8 py-10 max-w-[960px]">
      <div className="mb-10 pb-8 border-b border-[var(--color-border-default)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight mb-2" style={{ color: "var(--color-text-default)" }}>
          App Bar
        </h1>
        <p className="text-[16px] leading-relaxed max-w-[520px]" style={{ color: "var(--color-text-subtle)" }}>
          화면 상단(또는 하단)에 고정되어 탐색·액션을 제공하는 컴포넌트.
          <br />
          스크롤 시 <span className="text-mint-400 font-medium">shadow/03</span>이 나타납니다.
        </p>
      </div>

      {/* Variants */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Variants</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>Variant 갤러리</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>각 컨테이너 내부에서 스크롤하면 Elevation 변화를 확인할 수 있습니다.</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {(["Small", "Medium", "Large", "Bottom"] as AppBarType[]).map(type => (
            <div key={type}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[12px] font-semibold uppercase tracking-widest" style={{ color: "var(--color-text-subtle)" }}>{type}</p>
                <span className="text-[11px] font-mono" style={{ color: "var(--color-text-subtle)" }}>{HEIGHTS[type]}px</span>
              </div>
              <ScrollDemo type={type} />
            </div>
          ))}
        </div>
      </section>

      {/* Spec */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Spec</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>스펙 테이블</h2>
        </div>
        <div className="space-y-4">
          {/* 높이 */}
          <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[var(--color-border-default)]" style={{ background: "var(--color-bg-subtle)" }}>
                  {["Type", "높이", "Title 폰트"].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--color-text-subtle)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { type: "Small",  height: "64px",  font: "18px Bold — type/title/sm" },
                  { type: "Medium", height: "112px", font: "28px Bold — type/headline/sm/mobile" },
                  { type: "Large",  height: "152px", font: "36px Black — type/headline/lg/mobile" },
                  { type: "Bottom", height: "80px",  font: "—" },
                ].map((row, i) => (
                  <tr key={row.type} className="border-b border-[var(--color-border-default)] last:border-0" style={{ background: i % 2 === 1 ? "var(--color-bg-subtle)" : undefined }}>
                    <td className="px-4 py-3 font-semibold" style={{ color: "var(--color-text-default)" }}>{row.type}</td>
                    <td className="px-4 py-3 font-mono text-[12px] text-mint-500">{row.height}</td>
                    <td className="px-4 py-3 font-mono text-[12px]" style={{ color: "var(--color-text-subtle)" }}>{row.font}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* 공통 */}
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
                  { attr: "좌우 패딩",       value: "16px",            token: "space/04" },
                  { attr: "아이콘 크기",      value: "24px",            token: "—" },
                  { attr: "우측 액션 최대",   value: "3개",             token: "—" },
                  { attr: "Shadow (스크롤 전)", value: "없음",           token: "elevation/surface/default" },
                  { attr: "Shadow (스크롤 후)", value: "0 4px 16px",    token: "elevation/surface/sticky → shadow/03" },
                  { attr: "BG (기본)",         value: "White / N600",   token: "color/bg/default" },
                  { attr: "BG (스크롤 후)",    value: "N20 / N500",     token: "color/bg/subtle" },
                  { attr: "아이콘·타이틀 색",  value: "N600 / White",   token: "color/text/default" },
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
              {["스크롤 시 shadow/03으로 elevation 표시", "우측 액션 아이콘 최대 3개", "Bottom App Bar에 FAB 포함 가능", "Small은 기본 페이지 헤더에 사용"].map((t, i) => (
                <li key={i} className="flex gap-2 text-[13px]" style={{ color: "var(--color-text-default)" }}>
                  <span className="text-[var(--color-brand-primary)] font-bold shrink-0">✓</span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border-2 p-5" style={{ borderColor: "var(--color-status-error)", background: "var(--color-bg-error)" }}>
            <p className="text-[14px] font-bold mb-3" style={{ color: "var(--color-status-error)" }}>✕ Don't</p>
            <ul className="space-y-2">
              {["스크롤 무관하게 항상 shadow 표시", "아이콘 4개 이상 나열", "App Bar를 두 개 이상 중첩", "타이틀 없이 아이콘만 나열"].map((t, i) => (
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
