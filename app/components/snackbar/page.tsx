"use client";

import { useState, useEffect } from "react";

type SnackbarVariant = "Default" | "Success" | "Error" | "Warning" | "Action";

interface SnackbarItem {
  id: number;
  variant: SnackbarVariant;
  message: string;
}

const VARIANT_CONFIG: Record<SnackbarVariant, { icon: string; bg: string; text: string; border: string }> = {
  Default: {
    icon: "💬",
    bg:   "bg-neutral-600",
    text: "text-white",
    border: "border-transparent",
  },
  Success: {
    icon: "✓",
    bg:   "bg-mint-500",
    text: "text-white",
    border: "border-transparent",
  },
  Error: {
    icon: "✕",
    bg:   "bg-[#FF3257]",
    text: "text-white",
    border: "border-transparent",
  },
  Warning: {
    icon: "⚠",
    bg:   "bg-[#EE706B]",
    text: "text-white",
    border: "border-transparent",
  },
  Action: {
    icon: "💬",
    bg:   "bg-neutral-600",
    text: "text-white",
    border: "border-transparent",
  },
};

let nextId = 1;

function SnackbarToast({ item, onDismiss }: { item: SnackbarItem; onDismiss: () => void }) {
  const cfg = VARIANT_CONFIG[item.variant];

  useEffect(() => {
    const t = setTimeout(onDismiss, 3000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div className={`
      flex items-center gap-3 px-4 py-3 rounded-lg shadow-elevation-2 min-w-[280px] max-w-sm
      ${cfg.bg} ${cfg.text} animate-[slideUp_0.2s_ease-out]
    `}>
      <span className="text-[16px] shrink-0">{cfg.icon}</span>
      <span className="text-[14px] font-medium flex-1">{item.message}</span>
      {item.variant === "Action" && (
        <button onClick={onDismiss} className="text-[13px] font-semibold text-mint-200 hover:text-mint-100 shrink-0 ml-2">
          실행취소
        </button>
      )}
      <button onClick={onDismiss} className="opacity-60 hover:opacity-100 transition-opacity shrink-0">
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
    </div>
  );
}

const DEMOS: { variant: SnackbarVariant; label: string; message: string }[] = [
  { variant: "Default",  label: "Default",  message: "변경 사항이 저장되었습니다." },
  { variant: "Success",  label: "Success",  message: "성공적으로 완료되었습니다." },
  { variant: "Error",    label: "Error",    message: "오류가 발생했습니다. 다시 시도해 주세요." },
  { variant: "Warning",  label: "Warning",  message: "세션이 곧 만료됩니다." },
  { variant: "Action",   label: "Action",   message: "항목이 삭제되었습니다." },
];

export default function SnackbarPage() {
  const [toasts, setToasts] = useState<SnackbarItem[]>([]);

  const show = (variant: SnackbarVariant, message: string) => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, variant, message }]);
  };

  const dismiss = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <div className="px-8 py-10 max-w-[960px]">
      <div className="mb-10 pb-8 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-primary)] mb-2">Snackbar</h1>
        <p className="text-[16px] text-[var(--color-text-secondary)] leading-relaxed max-w-[520px]">
          사용자 행동 결과를 일시적으로 알리는 피드백 컴포넌트.
          <br />
          화면 하단에 표시되며 3초 후 자동 사라집니다.
        </p>
      </div>

      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Interactive Demo</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">라이브 미리보기</h2>
          <p className="text-[14px] text-[var(--color-text-secondary)] mt-1">버튼 클릭 시 화면 하단에 Snackbar가 표시됩니다 (3초 자동 소멸)</p>
        </div>

        <div className="rounded-xl border border-[var(--color-border)] p-6 bg-[var(--color-bg-subtle)]">
          <div className="flex flex-wrap gap-3">
            {DEMOS.map(({ variant, label, message }) => (
              <button
                key={variant}
                onClick={() => show(variant, message)}
                className="px-4 py-2 rounded-md border border-[var(--color-border)] text-[13px] font-medium text-[var(--color-text-secondary)] hover:border-mint-300 hover:text-mint-400 transition-all"
              >
                {label} Snackbar
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Static Preview */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Variants</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">정적 Variant 갤러리</h2>
        </div>
        <div className="space-y-3">
          {DEMOS.map(({ variant, message }) => {
            const cfg = VARIANT_CONFIG[variant];
            return (
              <div key={variant} className={`flex items-center gap-3 px-4 py-3 rounded-lg ${cfg.bg} ${cfg.text} max-w-sm`}>
                <span className="text-[16px] shrink-0">{cfg.icon}</span>
                <span className="text-[14px] font-medium flex-1">{message}</span>
                {variant === "Action" && (
                  <span className="text-[13px] font-semibold text-mint-200 shrink-0 ml-2">실행취소</span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Spec */}
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
                { attr: "Radius",       value: "8px",              token: "radius/component/snackbar" },
                { attr: "Padding",      value: "12px 16px",        token: "space/03 / space/04" },
                { attr: "Font",         value: "14px Medium",      token: "type/label/md" },
                { attr: "Min width",    value: "280px",            token: "—" },
                { attr: "Max width",    value: "400px",            token: "—" },
                { attr: "Auto dismiss", value: "3000ms",           token: "—" },
                { attr: "Shadow",       value: "0 4px 12px",       token: "elevation/surface/overlay" },
                { attr: "Position",     value: "bottom center",    token: "—" },
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

      {/* Toast container */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center pointer-events-none">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <SnackbarToast item={t} onDismiss={() => dismiss(t.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}
