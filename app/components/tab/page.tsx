"use client";

import { useState } from "react";

type TabVariant = "Underline" | "Filled" | "Boxed";

function TabGroup({ variant = "Underline", tabs }: { variant?: TabVariant; tabs: string[] }) {
  const [active, setActive] = useState(0);

  const containerClass = {
    Underline: "flex border-b border-[var(--color-border)] gap-0",
    Filled:    "flex gap-1 bg-[var(--color-bg-subtle)] rounded-lg p-1",
    Boxed:     "flex border border-[var(--color-border)] rounded-lg overflow-hidden",
  }[variant];

  const tabClass = (i: number) => {
    const isActive = active === i;
    if (variant === "Underline") {
      return `px-4 py-2.5 text-[14px] font-medium transition-all relative ${
        isActive
          ? "text-mint-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-mint-300"
          : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
      }`;
    }
    if (variant === "Filled") {
      return `px-4 py-2 text-[13px] font-medium rounded-md transition-all ${
        isActive
          ? "bg-white dark:bg-neutral-500 text-[var(--color-text-primary)] shadow-elevation-1"
          : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
      }`;
    }
    // Boxed
    return `px-4 py-2.5 text-[14px] font-medium transition-all flex-1 text-center ${
      isActive
        ? "bg-mint-300 text-white"
        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] border-l border-[var(--color-border)] first:border-0"
    }`;
  };

  return (
    <div>
      <div className={containerClass}>
        {tabs.map((tab, i) => (
          <button key={tab} onClick={() => setActive(i)} className={tabClass(i)}>
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-4 p-4 rounded-lg bg-[var(--color-bg-subtle)] text-[14px] text-[var(--color-text-secondary)]">
        <strong className="text-[var(--color-text-primary)]">{tabs[active]}</strong> 탭의 콘텐츠 영역입니다.
      </div>
    </div>
  );
}

export default function TabPage() {
  return (
    <div className="px-8 py-10 max-w-[960px]">
      <div className="mb-10 pb-8 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-primary)] mb-2">Tab</h1>
        <p className="text-[16px] text-[var(--color-text-secondary)] leading-relaxed max-w-[520px]">
          콘텐츠를 카테고리별로 전환하는 내비게이션 컴포넌트.
          <br />
          <span className="text-mint-400 font-medium">Underline</span> ·{" "}
          <span className="text-mint-400 font-medium">Filled</span> ·{" "}
          <span className="text-mint-400 font-medium">Boxed</span> 3가지 스타일.
        </p>
      </div>

      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Variants</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">Variant 갤러리</h2>
        </div>
        <div className="space-y-10">
          {(["Underline", "Filled", "Boxed"] as TabVariant[]).map((v) => (
            <div key={v}>
              <p className="text-[12px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-3">{v}</p>
              <TabGroup variant={v} tabs={["개요", "사용법", "스펙", "접근성"]} />
            </div>
          ))}
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
                { attr: "Active color",       value: "M300 #28D7D2",  token: "color/interactive/primary" },
                { attr: "Indicator height",   value: "2px",           token: "—" },
                { attr: "Tab font",           value: "14px Medium",   token: "type/label/md" },
                { attr: "Tab padding",        value: "10px 16px",     token: "space/04" },
                { attr: "Inactive text",      value: "N300",          token: "color/text/subtle" },
                { attr: "Border bottom",      value: "N100",          token: "color/border/default" },
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
