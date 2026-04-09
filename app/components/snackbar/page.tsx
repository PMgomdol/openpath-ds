"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Spec (DESIGN.md)
// shadow: elevation/surface/modal → shadow/04  (0 8px 24px -2px)
// bg: N600 (Light) / White (Dark)
// text: White (Light) / N600 (Dark)
// action text: color/brand/primary M300
// height: 48px (single line)
// padding: 16px (space/04)
// radius: 8px (radius/component/snackbar)
// min-width: 288px / max-width: 568px
// font: 14px Regular (type/body/sm)
// 노출 시간: 4초

type SnackVariant = "Default" | "Success" | "Error" | "Warning" | "Action";

const VARIANT_LABEL: Record<SnackVariant, { icon: string; accentVar?: string }> = {
  Default: { icon: "💬" },
  Success: { icon: "✓",  accentVar: "var(--color-status-success)" },
  Error:   { icon: "✕",  accentVar: "var(--color-status-error)" },
  Warning: { icon: "⚠",  accentVar: "var(--color-status-warning)" },
  Action:  { icon: "💬" },
};

let uid = 0;

interface ToastItem { id: number; variant: SnackVariant; message: string }

function SnackbarItem({ item, onDismiss }: { item: ToastItem; onDismiss: () => void }) {
  const cfg = VARIANT_LABEL[item.variant];

  useEffect(() => {
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div
      className="flex items-center gap-3 rounded-lg"
      style={{
        // bg: N600 (Light) — CSS variable은 .dark에서 white로 반전
        background: "var(--color-text-default)",
        color: "var(--color-bg-default)",
        boxShadow: "var(--shadow-04, 0 8px 24px -2px rgba(21,27,30,0.20))",
        minWidth: 288,
        maxWidth: 568,
        minHeight: 48,
        padding: "0 var(--space-04, 16px)",
        fontSize: 14,
        lineHeight: 1.5,
        borderRadius: "var(--radius-snackbar, 8px)",
      }}
    >
      {cfg.accentVar ? (
        <span className="text-[16px] shrink-0 font-bold" style={{ color: cfg.accentVar }}>{cfg.icon}</span>
      ) : (
        <span className="text-[16px] shrink-0 opacity-70">{cfg.icon}</span>
      )}
      <span className="flex-1 font-normal">{item.message}</span>
      {item.variant === "Action" && (
        <button
          onClick={onDismiss}
          className="text-[13px] font-semibold shrink-0 ml-2 hover:opacity-80 transition-opacity"
          style={{ color: "var(--color-brand-primary)" }}
        >
          실행취소
        </button>
      )}
      <button
        onClick={onDismiss}
        className="shrink-0 opacity-50 hover:opacity-100 transition-opacity ml-1"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
    </div>
  );
}

const DEMOS: { variant: SnackVariant; label: string; message: string }[] = [
  { variant: "Default", label: "Default",  message: "변경 사항이 저장되었습니다." },
  { variant: "Success", label: "Success",  message: "성공적으로 완료되었습니다." },
  { variant: "Error",   label: "Error",    message: "오류가 발생했습니다. 다시 시도해 주세요." },
  { variant: "Warning", label: "Warning",  message: "세션이 곧 만료됩니다." },
  { variant: "Action",  label: "Action",   message: "항목이 삭제되었습니다." },
];

export default function SnackbarPage() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = (variant: SnackVariant, message: string) => {
    const id = ++uid;
    setToasts(prev => [...prev.slice(-2), { id, variant, message }]);
  };

  const dismiss = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <div className="px-8 py-10 max-w-[960px]">
      <div className="mb-10 pb-8 border-b border-[var(--color-border-default)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight mb-2" style={{ color: "var(--color-text-default)" }}>
          Snackbar
        </h1>
        <p className="text-[16px] leading-relaxed max-w-[520px]" style={{ color: "var(--color-text-subtle)" }}>
          사용자 행동 결과를 일시적으로 알리는 피드백 컴포넌트.
          <br />
          <span className="text-mint-400 font-medium">shadow/04</span> ·{" "}
          <span className="text-mint-400 font-medium">4초 자동 소멸</span> ·{" "}
          Action Chip 포함 가능.
        </p>
      </div>

      {/* Interactive Demo */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Interactive Demo</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>라이브 미리보기</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>버튼 클릭 → 화면 하단 중앙에 표시 (4초 자동 소멸)</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border-default)] p-6" style={{ background: "var(--color-bg-subtle)" }}>
          <div className="flex flex-wrap gap-3">
            {DEMOS.map(({ variant, label, message }) => (
              <button
                key={variant}
                onClick={() => show(variant, message)}
                className="px-4 py-2 rounded-md border text-[13px] font-medium transition-all hover:border-mint-300 hover:text-mint-400"
                style={{ borderColor: "var(--color-border-default)", color: "var(--color-text-subtle)" }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Static Gallery */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Variants</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>정적 Variant 갤러리</h2>
        </div>
        <div className="space-y-3">
          {DEMOS.map(({ variant, message }) => {
            const cfg = VARIANT_LABEL[variant];
            return (
              <div
                key={variant}
                className="flex items-center gap-3 rounded-lg"
                style={{
                  background: "var(--color-text-default)",
                  color: "var(--color-bg-default)",
                  minHeight: 48,
                  padding: "12px 16px",
                  borderRadius: 8,
                  fontSize: 14,
                  maxWidth: 568,
                  boxShadow: "var(--shadow-04)",
                }}
              >
                {cfg.accentVar
                  ? <span className="font-bold shrink-0" style={{ color: cfg.accentVar }}>{cfg.icon}</span>
                  : <span className="opacity-70 shrink-0">{cfg.icon}</span>
                }
                <span className="flex-1">{message}</span>
                {variant === "Action" && (
                  <span className="text-[13px] font-semibold shrink-0" style={{ color: "var(--color-brand-primary)" }}>실행취소</span>
                )}
              </div>
            );
          })}
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
                { attr: "높이 (single line)", value: "48px",                   token: "—" },
                { attr: "좌우 패딩",          value: "16px",                   token: "space/04" },
                { attr: "Radius",             value: "8px",                    token: "radius/component/snackbar" },
                { attr: "최소 너비",          value: "288px",                  token: "—" },
                { attr: "최대 너비",          value: "568px",                  token: "—" },
                { attr: "폰트",               value: "14px Regular",           token: "type/body/sm" },
                { attr: "Shadow",             value: "0 8px 24px -2px",        token: "elevation/surface/modal → shadow/04" },
                { attr: "Background (Light)", value: "N600 #29363D",           token: "color/text/default (반전)" },
                { attr: "Background (Dark)",  value: "White #FFFFFF",          token: "color/bg/default (반전)" },
                { attr: "Action text",        value: "M300 #28D7D2",           token: "color/brand/primary" },
                { attr: "노출 시간",          value: "4초",                    token: "—" },
                { attr: "위치",               value: "화면 하단 중앙",          token: "—" },
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
              {["메시지는 1~2줄 이내로 간결하게", "액션은 1개만 (실행취소 등)", "4초 후 자동 소멸 적용", "화면 하단 중앙에 고정 배치"].map((t, i) => (
                <li key={i} className="flex gap-2 text-[13px]" style={{ color: "var(--color-text-default)" }}>
                  <span className="text-[var(--color-brand-primary)] font-bold shrink-0">✓</span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border-2 p-5" style={{ borderColor: "var(--color-status-error)", background: "var(--color-bg-error)" }}>
            <p className="text-[14px] font-bold mb-3" style={{ color: "var(--color-status-error)" }}>✕ Don't</p>
            <ul className="space-y-2">
              {["긴 설명 텍스트를 Snackbar에 사용", "액션 버튼 2개 이상 배치", "영구적으로 표시되게 설정", "중요한 오류를 Snackbar로만 알리기"].map((t, i) => (
                <li key={i} className="flex gap-2 text-[13px] text-red-700 dark:text-red-300">
                  <span className="font-bold shrink-0" style={{ color: "var(--color-status-error)" }}>✕</span>{t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Toast container */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className="pointer-events-auto">
            <SnackbarItem item={t} onDismiss={() => dismiss(t.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}
