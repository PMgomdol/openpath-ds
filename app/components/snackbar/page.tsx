"use client";

import { useState, useCallback } from "react";
import Snackbar from "@/components/ui/Snackbar";
import type { SnackbarVariant } from "@/components/ui/Snackbar";
import { X } from "lucide-react";

// ── Demo config ────────────────────────────────────────────
const DEMOS: {
  variant: SnackbarVariant;
  label: string;
  message: string;
  actionLabel?: string;
}[] = [
  {
    variant: "text",
    label: "Text only",
    message: "변경 사항이 저장되었습니다.",
  },
  {
    variant: "action",
    label: "With Action",
    message: "항목이 삭제되었습니다.",
    actionLabel: "실행취소",
  },
  {
    variant: "close",
    label: "With Close",
    message: "업데이트가 완료되었습니다.",
  },
];

// ── Interactive demo ───────────────────────────────────────
function InteractiveDemo() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(DEMOS[0]);

  const show = (demo: (typeof DEMOS)[number]) => {
    setOpen(false);                   // reset so timer restarts
    requestAnimationFrame(() => {
      setCurrent(demo);
      setOpen(true);
    });
  };

  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {DEMOS.map((demo) => (
          <button
            key={demo.variant}
            type="button"
            onClick={() => show(demo)}
            className="px-4 py-2.5 rounded-lg border text-[13px] font-medium transition-colors"
            style={{
              borderColor:
                open && current.variant === demo.variant
                  ? "var(--color-brand-primary)"
                  : "var(--color-border-default)",
              color:
                open && current.variant === demo.variant
                  ? "var(--color-brand-primary)"
                  : "var(--color-text-default)",
              background: "var(--color-bg-default)",
            }}
          >
            {demo.label}
          </button>
        ))}
      </div>
      <p className="text-[12px] text-[var(--color-text-subtle)] mt-3">
        버튼 클릭 → 하단 중앙 고정 표시. 4초 자동 소멸.
      </p>

      {/* The real Snackbar — fixed bottom-center, aria-live="polite" */}
      <Snackbar
        open={open}
        message={current.message}
        variant={current.variant}
        actionLabel={current.actionLabel}
        onAction={handleClose}
        onClose={handleClose}
        duration={4000}
      />
    </>
  );
}

// ── Static preview (in-page, no fixed position) ────────────
// Renders .op-snackbar directly without the fixed region wrapper
function SnackbarPreview({
  message,
  variant,
  actionLabel = "실행취소",
}: {
  message: string;
  variant: SnackbarVariant;
  actionLabel?: string;
}) {
  return (
    <div className="op-snackbar" style={{ animation: "none", maxWidth: "100%" }}>
      <span className="op-snackbar__message">{message}</span>
      {variant === "action" && (
        <button type="button" className="op-snackbar__action" tabIndex={-1}>
          {actionLabel}
        </button>
      )}
      {variant === "close" && (
        <button
          type="button"
          className="op-snackbar__close"
          aria-label="닫기"
          tabIndex={-1}
        >
          <X size={18} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────
export default function SnackbarPage() {
  return (
    <div className="px-8 py-10 max-w-[960px]">
      {/* Header */}
      <div className="mb-10 pb-8 border-b border-[var(--color-border-default)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]" />
          <span className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest">
            Components
          </span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-default)] mb-2">
          Snackbar
        </h1>
        <p className="text-[16px] text-[var(--color-text-subtle)] leading-relaxed max-w-[540px]">
          사용자 행동 결과를 일시적으로 알리는 피드백 컴포넌트.
          <br />
          <span className="text-[var(--color-brand-primary)] font-medium">
            Text only
          </span>{" "}
          ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">
            With Action
          </span>{" "}
          ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">
            With Close
          </span>{" "}
          · 4초 자동 소멸 ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">
            aria-live=&quot;polite&quot;
          </span>
        </p>
      </div>

      {/* Interactive Demo */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Interactive Demo
          </p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
            라이브 미리보기
          </h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            버튼 클릭 → 화면 하단 중앙에 고정 표시 (4초 자동 소멸)
          </p>
        </div>
        <div
          className="rounded-xl border border-[var(--color-border-default)] p-6"
          style={{ background: "var(--color-bg-subtle)" }}
        >
          <InteractiveDemo />
        </div>
      </section>

      {/* Static gallery */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Variants
          </p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
            3종 Variant 미리보기
          </h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            실제 컴포넌트를 인-페이지 렌더링 (fixed 위치 없음).
          </p>
        </div>
        <div className="space-y-3">
          {DEMOS.map((demo) => (
            <div key={demo.variant}>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-subtle)] mb-2">
                {demo.label}
              </p>
              <SnackbarPreview
                message={demo.message}
                variant={demo.variant}
                actionLabel={demo.actionLabel}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Spec Table */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Spec
          </p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
            스펙 테이블
          </h2>
        </div>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
                {["속성", "Value", "Token"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-[11px] font-bold text-[var(--color-text-subtle)] uppercase tracking-widest"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { attr: "높이 (single line)", value: "48px (min-height)",       token: "—" },
                { attr: "좌우 패딩",          value: "16px",                    token: "space/04" },
                { attr: "Radius",             value: "8px",                     token: "shape/sm" },
                { attr: "최소 너비",          value: "288px",                   token: "—" },
                { attr: "최대 너비",          value: "568px",                   token: "—" },
                { attr: "폰트",               value: "14px Regular",            token: "type/body/sm" },
                { attr: "Shadow",             value: "0 4px 16px",              token: "shadow/03" },
                { attr: "Background (Light)", value: "N600 #29363D",            token: "color/text/default (반전)" },
                { attr: "Text (Light)",       value: "White #FFFFFF",           token: "color/bg/default (반전)" },
                { attr: "Action text",        value: "M300 #28D7D2",            token: "color/brand/primary" },
                { attr: "Action hover",       value: "M400 #1BB8B3",            token: "color/interactive/hover" },
                { attr: "위치",               value: "fixed bottom-center 24px", token: "space/06" },
                { attr: "노출 시간",          value: "4,000ms",                 token: "—" },
                { attr: "ARIA",               value: "aria-live=\"polite\" aria-atomic=\"true\"", token: "—" },
              ].map((row, i) => (
                <tr
                  key={row.attr}
                  className={`border-b border-[var(--color-border-default)] last:border-0 ${
                    i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-[var(--color-text-default)]">
                    {row.attr}
                  </td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-brand-primary)]">
                    {row.value}
                  </td>
                  <td className="px-4 py-3">
                    {row.token !== "—" ? (
                      <code className="text-[11px] font-mono text-[var(--color-text-subtle)]">
                        {row.token}
                      </code>
                    ) : (
                      <span className="text-[var(--color-text-disabled)]">—</span>
                    )}
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
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Guidelines
          </p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
            Do / Don&apos;t
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border-2 border-[var(--color-border-brand)] p-5 bg-[var(--color-bg-brand)]">
            <p className="text-[14px] font-bold text-[var(--color-brand-primary)] mb-3">
              ✓ Do
            </p>
            <ul className="space-y-2">
              {[
                "메시지 1~2줄 이내로 간결하게",
                "액션은 1개만 (실행취소, 확인 등)",
                "4초 후 자동 소멸 적용",
                "화면 하단 중앙에 fixed 배치",
                "aria-live=\"polite\"로 스크린 리더 지원",
              ].map((t) => (
                <li
                  key={t}
                  className="flex gap-2 text-[13px] text-[var(--color-text-default)]"
                >
                  <span className="text-[var(--color-brand-primary)] font-bold shrink-0">
                    ›
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="rounded-xl border-2 p-5 bg-[var(--color-bg-error)]"
            style={{ borderColor: "var(--color-status-error)" }}
          >
            <p
              className="text-[14px] font-bold mb-3"
              style={{ color: "var(--color-status-error)" }}
            >
              ✕ Don&apos;t
            </p>
            <ul className="space-y-2">
              {[
                "긴 설명 텍스트를 Snackbar에 사용",
                "액션 버튼 2개 이상 배치",
                "영구적으로 표시 (닫기 없이)",
                "중요한 오류를 Snackbar로만 처리",
              ].map((t) => (
                <li
                  key={t}
                  className="flex gap-2 text-[13px] text-[var(--color-text-default)]"
                >
                  <span
                    className="font-bold shrink-0"
                    style={{ color: "var(--color-status-error)" }}
                  >
                    ›
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
