"use client";

import { useState } from "react";

type CardVariant = "Default" | "Outlined" | "Elevated" | "Filled";

function Card({ variant = "Default", interactive }: { variant?: CardVariant; interactive?: boolean }) {
  const base = `rounded-xl overflow-hidden transition-all duration-200 ${interactive ? "cursor-pointer" : ""}`;

  const variantClass = {
    Default:  "bg-[var(--color-bg-default)] shadow-elevation-1",
    Outlined: "bg-[var(--color-bg-default)] border border-[var(--color-border-default)]",
    Elevated: "bg-[var(--color-bg-default)] shadow-elevation-2",
    Filled:   "bg-[var(--color-bg-subtle)]",
  }[variant];

  const hoverClass = interactive ? {
    Default:  "hover:shadow-elevation-2",
    Outlined: "hover:border-mint-300",
    Elevated: "hover:shadow-elevation-3",
    Filled:   "hover:bg-mint-20 dark:hover:bg-mint-600/10",
  }[variant] : "";

  return (
    <div className={`${base} ${variantClass} ${hoverClass}`}>
      {/* 이미지 영역 */}
      <div className="h-36 bg-gradient-to-br from-mint-20 to-mint-100 dark:from-mint-600/20 dark:to-mint-600/40 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-10 h-10 text-mint-300 opacity-60" fill="currentColor">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
        </svg>
      </div>
      {/* 콘텐츠 */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">Card · {variant}</span>
        </div>
        <h3 className="text-[16px] font-bold text-[var(--color-text-primary)] mb-1">카드 제목</h3>
        <p className="text-[13px] text-[var(--color-text-secondary)] leading-relaxed">
          카드 컴포넌트는 관련 정보를 그룹화하여 표현합니다. Elevation 시스템으로 위계를 표현합니다.
        </p>
        {interactive && (
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[12px] text-mint-400 font-medium">자세히 보기 →</span>
            <span className="text-[11px] text-[var(--color-text-secondary)]">2026.04.09</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CardPage() {
  return (
    <div className="px-8 py-10 max-w-[960px]">
      <div className="mb-10 pb-8 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-primary)] mb-2">Card</h1>
        <p className="text-[16px] text-[var(--color-text-secondary)] leading-relaxed max-w-[520px]">
          관련 정보를 그룹화하고 계층을 표현하는 컨테이너 컴포넌트.
          <br />
          Elevation 시스템으로 레이어 위계를 시각화합니다.
        </p>
      </div>

      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Variants</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">Variant 갤러리</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {(["Default", "Outlined", "Elevated", "Filled"] as CardVariant[]).map((v) => (
            <Card key={v} variant={v} interactive />
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
                {["Variant", "Shadow", "Border", "Radius (sm/md)", "Token"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { variant: "Default",  shadow: "elevation-1 (0 1px 4px)",  border: "—",           radius: "12px / 16px", token: "elevation/surface/raised" },
                { variant: "Outlined", shadow: "—",                         border: "N100 #D8DCDE", radius: "12px / 16px", token: "color/border/default" },
                { variant: "Elevated", shadow: "elevation-2 (0 4px 12px)", border: "—",            radius: "12px / 16px", token: "elevation/surface/overlay" },
                { variant: "Filled",   shadow: "—",                         border: "—",            radius: "12px / 16px", token: "color/bg/subtle" },
              ].map((row, i) => (
                <tr key={row.variant} className={`border-b border-[var(--color-border)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}>
                  <td className="px-4 py-3 font-semibold text-[var(--color-text-primary)]">{row.variant}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-text-secondary)]">{row.shadow}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-text-secondary)]">{row.border}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-mint-500">{row.radius}</td>
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
