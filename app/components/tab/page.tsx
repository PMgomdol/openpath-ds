"use client";

import { useState } from "react";

// ─── Tab 높이: 48px, 패딩: 16px, 폰트: type/label/md (14px Medium)
// Primary: 상단 indicator 라인 2px, color/brand/primary
// Secondary: Pill형 배경 color/bg/brand

type TabType = "Primary" | "Secondary";

function TabGroup({
  type,
  tabs,
  badge,
}: {
  type: TabType;
  tabs: { label: string; count?: number }[];
  badge?: boolean;
}) {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* Tab bar */}
      <div
        className={`flex ${type === "Primary" ? "border-b border-[var(--color-border-default)]" : "gap-1 p-1 rounded-xl"}`}
        style={type === "Secondary" ? { background: "var(--color-bg-subtle)" } : undefined}
      >
        {tabs.map((tab, i) => {
          const isActive = active === i;

          if (type === "Primary") {
            return (
              <button
                key={tab.label}
                onClick={() => setActive(i)}
                style={{ height: 48, padding: "0 16px" }}
                className={`
                  relative flex items-center gap-1.5 text-[14px] font-medium tracking-[0.04em] transition-all shrink-0
                  ${isActive ? "text-[var(--color-brand-primary)]" : "text-[var(--color-text-subtle)] hover:text-[var(--color-text-default)]"}
                `}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-semibold ${isActive ? "bg-mint-100 text-mint-500" : "bg-[var(--color-bg-subtle)] text-[var(--color-text-subtle)]"}`}>
                    {tab.count}
                  </span>
                )}
                {/* indicator 2px */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ background: "var(--color-brand-primary)" }} />
                )}
              </button>
            );
          }

          // Secondary — Pill
          return (
            <button
              key={tab.label}
              onClick={() => setActive(i)}
              style={{
                height: 40,
                padding: "0 16px",
                borderRadius: 9999,
                background: isActive ? "var(--color-bg-brand)" : "transparent",
              }}
              className={`
                flex items-center gap-1.5 text-[14px] font-medium tracking-[0.04em] transition-all
                ${isActive ? "text-[var(--color-brand-primary)]" : "text-[var(--color-text-subtle)] hover:text-[var(--color-text-default)]"}
              `}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-semibold ${isActive ? "bg-mint-200 text-mint-600" : "bg-[var(--color-border-default)] text-[var(--color-text-subtle)]"}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Content area */}
      <div
        className="mt-4 p-5 rounded-xl border border-[var(--color-border-default)] text-[14px]"
        style={{ color: "var(--color-text-subtle)" }}
      >
        <strong style={{ color: "var(--color-text-default)" }}>{tabs[active].label}</strong> 탭의 콘텐츠 영역입니다.
      </div>
    </div>
  );
}

function DosDonts() {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="rounded-xl border-2 border-[var(--color-border-brand)] p-5" style={{ background: "var(--color-bg-brand)" }}>
        <p className="text-[14px] font-bold text-[var(--color-brand-primary)] mb-3">✓ Do</p>
        <ul className="space-y-2">
          {["탭 2~5개 유지", "Active 탭은 항상 1개만", "Primary는 주요 콘텐츠 전환에 사용", "Secondary는 필터·서브 카테고리에 사용"].map((t, i) => (
            <li key={i} className="flex gap-2 text-[13px]" style={{ color: "var(--color-text-default)" }}>
              <span className="text-[var(--color-brand-primary)] font-bold shrink-0">✓</span>{t}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border-2 p-5" style={{ borderColor: "var(--color-status-error)", background: "var(--color-bg-error)" }}>
        <p className="text-[14px] font-bold mb-3" style={{ color: "var(--color-status-error)" }}>✕ Don't</p>
        <ul className="space-y-2">
          {["탭 6개 이상 나열 (스크롤 탭으로 전환)", "복수 탭 동시 Active", "Primary와 Secondary 혼용", "탭 라벨을 문장으로 사용"].map((t, i) => (
            <li key={i} className="flex gap-2 text-[13px] text-red-700 dark:text-red-300">
              <span className="font-bold shrink-0" style={{ color: "var(--color-status-error)" }}>✕</span>{t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function TabPage() {
  return (
    <div className="px-8 py-10 max-w-[960px]">
      <div className="mb-10 pb-8 border-b border-[var(--color-border-default)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight mb-2" style={{ color: "var(--color-text-default)" }}>Tab</h1>
        <p className="text-[16px] leading-relaxed max-w-[520px]" style={{ color: "var(--color-text-subtle)" }}>
          콘텐츠를 카테고리별로 전환하는 내비게이션 컴포넌트.
          <br />
          <span className="text-mint-400 font-medium">Primary</span> (indicator 라인) ·{" "}
          <span className="text-mint-400 font-medium">Secondary</span> (Pill 배경) 두 가지 타입.
        </p>
      </div>

      {/* Primary */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Primary</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>Primary Tab</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>상단 indicator 라인 2px · 주요 콘텐츠 전환</p>
        </div>
        <div className="space-y-6">
          <div>
            <p className="text-[11px] uppercase tracking-widest font-semibold mb-3" style={{ color: "var(--color-text-subtle)" }}>기본</p>
            <TabGroup type="Primary" tabs={[{ label: "개요" }, { label: "사용법" }, { label: "스펙" }, { label: "접근성" }]} />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-widest font-semibold mb-3" style={{ color: "var(--color-text-subtle)" }}>카운트 배지 포함</p>
            <TabGroup type="Primary" tabs={[{ label: "전체", count: 24 }, { label: "진행중", count: 8 }, { label: "완료", count: 16 }]} />
          </div>
        </div>
      </section>

      {/* Secondary */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Secondary</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>Secondary Tab</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>Pill형 배경 color/bg/brand · 서브 카테고리 전환</p>
        </div>
        <div className="space-y-6">
          <div>
            <p className="text-[11px] uppercase tracking-widest font-semibold mb-3" style={{ color: "var(--color-text-subtle)" }}>기본</p>
            <TabGroup type="Secondary" tabs={[{ label: "디자인" }, { label: "개발" }, { label: "마케팅" }, { label: "기획" }]} />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-widest font-semibold mb-3" style={{ color: "var(--color-text-subtle)" }}>카운트 배지 포함</p>
            <TabGroup type="Secondary" tabs={[{ label: "전체", count: 42 }, { label: "신규", count: 7 }, { label: "인기", count: 15 }]} />
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
                {["속성", "Primary", "Secondary", "Token"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--color-text-subtle)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { attr: "탭 높이",         pri: "48px",                   sec: "40px",           token: "—" },
                { attr: "좌우 패딩",       pri: "16px",                   sec: "16px",           token: "space/04" },
                { attr: "라벨 폰트",       pri: "14px Medium",            sec: "14px Medium",    token: "type/label/md" },
                { attr: "Active 색",       pri: "M300 #28D7D2",           sec: "M300 #28D7D2",   token: "color/brand/primary" },
                { attr: "Inactive 색",     pri: "N300 #889298",           sec: "N300 #889298",   token: "color/text/subtle" },
                { attr: "Indicator",       pri: "하단 2px 라인",           sec: "Pill 배경",       token: "—" },
                { attr: "Indicator 색",    pri: "M300 #28D7D2",           sec: "M20 #F3FCFC",    token: "color/brand/primary / color/bg/brand" },
                { attr: "하단 border",     pri: "N100 #D8DCDE",           sec: "—",              token: "color/border/default" },
              ].map((row, i) => (
                <tr key={row.attr} className="border-b border-[var(--color-border-default)] last:border-0" style={{ background: i % 2 === 1 ? "var(--color-bg-subtle)" : undefined }}>
                  <td className="px-4 py-3 font-medium" style={{ color: "var(--color-text-default)" }}>{row.attr}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-mint-500">{row.pri}</td>
                  <td className="px-4 py-3 font-mono text-[12px]" style={{ color: "var(--color-text-subtle)" }}>{row.sec}</td>
                  <td className="px-4 py-3">
                    {row.token !== "—"
                      ? <code className="text-[11px] font-mono text-[var(--color-text-subtle)]">{row.token}</code>
                      : <span style={{ color: "var(--color-border-default)" }}>—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <DosDonts />
    </div>
  );
}
