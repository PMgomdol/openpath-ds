"use client";

import { useState } from "react";

type AppBarVariant = "Center" | "Small" | "Medium" | "Large";

function AppBarPreview({ variant }: { variant: AppBarVariant }) {
  const [scrolled, setScrolled] = useState(false);

  const shadowClass = scrolled ? "shadow-[0_4px_16px_0_rgba(21,27,30,0.12)]" : "";

  if (variant === "Center") {
    return (
      <div className={`w-full bg-[var(--color-bg-base,white)] dark:bg-neutral-600 border-b border-[var(--color-border)] ${shadowClass} transition-shadow`}>
        <div className="flex items-center justify-between px-4 h-14">
          <button className="p-2 rounded-full hover:bg-[var(--color-bg-subtle)] transition-colors">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--color-text-primary)]" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </button>
          <span className="text-[16px] font-bold text-[var(--color-text-primary)]">페이지 제목</span>
          <button className="p-2 rounded-full hover:bg-[var(--color-bg-subtle)] transition-colors">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--color-text-primary)]" fill="currentColor">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      </div>
    );
  }

  if (variant === "Small") {
    return (
      <div className={`w-full bg-[var(--color-bg-base,white)] dark:bg-neutral-600 border-b border-[var(--color-border)] ${shadowClass} transition-shadow`}>
        <div className="flex items-center gap-3 px-4 h-14">
          <button className="p-2 rounded-full hover:bg-[var(--color-bg-subtle)] transition-colors shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--color-text-primary)]" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </button>
          <span className="text-[18px] font-bold text-[var(--color-text-primary)] flex-1">페이지 제목</span>
          <div className="flex items-center gap-1">
            {["search", "more"].map((a) => (
              <button key={a} className="p-2 rounded-full hover:bg-[var(--color-bg-subtle)] transition-colors">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--color-text-primary)]" fill="currentColor">
                  {a === "search"
                    ? <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                    : <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                  }
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "Medium") {
    return (
      <div className={`w-full bg-[var(--color-bg-base,white)] dark:bg-neutral-600 border-b border-[var(--color-border)] ${shadowClass} transition-shadow`}>
        <div className="flex items-center justify-between px-4 h-14">
          <button className="p-2 rounded-full hover:bg-[var(--color-bg-subtle)] transition-colors">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--color-text-primary)]" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
          </button>
          <button className="p-2 rounded-full hover:bg-[var(--color-bg-subtle)] transition-colors">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--color-text-primary)]" fill="currentColor">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
        <div className="px-4 pb-5">
          <h2 className="text-[28px] font-bold text-[var(--color-text-primary)]">Medium 타이틀</h2>
        </div>
      </div>
    );
  }

  // Large
  return (
    <div className={`w-full bg-[var(--color-bg-base,white)] dark:bg-neutral-600 border-b border-[var(--color-border)] ${shadowClass} transition-shadow`}>
      <div className="flex items-center justify-between px-4 h-14">
        <button className="p-2 rounded-full hover:bg-[var(--color-bg-subtle)] transition-colors">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--color-text-primary)]" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </button>
        <button className="p-2 rounded-full hover:bg-[var(--color-bg-subtle)] transition-colors">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-[var(--color-text-primary)]" fill="currentColor">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </button>
      </div>
      <div className="px-4 pb-7">
        <h2 className="text-[36px] font-black text-[var(--color-text-primary)]">Large 타이틀</h2>
      </div>
    </div>
  );
}

export default function AppBarPage() {
  return (
    <div className="px-8 py-10 max-w-[960px]">
      <div className="mb-10 pb-8 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-primary)] mb-2">App Bar</h1>
        <p className="text-[16px] text-[var(--color-text-secondary)] leading-relaxed max-w-[520px]">
          화면 상단에 고정되어 탐색·액션을 제공하는 컴포넌트.
          <br />
          Elevation 3 — sticky 레이어.
        </p>
      </div>

      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Variants</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">Variant 갤러리</h2>
        </div>
        <div className="space-y-6">
          {(["Center", "Small", "Medium", "Large"] as AppBarVariant[]).map((v) => (
            <div key={v}>
              <p className="text-[12px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-2">{v} App Bar</p>
              <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
                <AppBarPreview variant={v} />
                <div className="px-4 py-3 bg-[var(--color-bg-subtle)] text-[12px] text-[var(--color-text-secondary)]">
                  페이지 콘텐츠 영역
                </div>
              </div>
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
                { attr: "Height (Small/Center)", value: "56px",           token: "—" },
                { attr: "Height (Medium)",       value: "112px",          token: "—" },
                { attr: "Height (Large)",        value: "152px",          token: "—" },
                { attr: "Elevation",             value: "sticky (Level 3)", token: "elevation/surface/sticky" },
                { attr: "Shadow",                value: "0 4px 16px",     token: "—" },
                { attr: "Background",            value: "White / N600",   token: "color/bg/default" },
                { attr: "Title font (Small)",    value: "18px Bold",      token: "type/title/sm" },
                { attr: "Title font (Medium)",   value: "28px Bold",      token: "type/headline/sm/mobile" },
                { attr: "Title font (Large)",    value: "36px Black",     token: "type/headline/lg/mobile" },
                { attr: "Padding H",             value: "16px",           token: "space/04" },
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
