"use client";

import { useState } from "react";

function TokenBadge({ token, value }: { token: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(token).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="group flex items-center gap-2 px-3 py-1.5 rounded-md bg-[var(--color-bg-subtle)] border border-[var(--color-border)] hover:border-[var(--color-border-brand)] transition-all text-left w-full"
    >
      <code className="text-[11px] font-mono text-[var(--color-interactive-pressed)] flex-1 truncate">{token}</code>
      <span className="text-[11px] text-[var(--color-text-secondary)] shrink-0">{value}</span>
      <span className="text-[10px] text-[var(--color-text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0">{copied ? "복사됨" : "복사"}</span>
    </button>
  );
}

function ModalDemo() {
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState<"default" | "destructive">("default");

  return (
    <section className="mb-16">
      <div className="mb-5">
        <p className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Interactive Demo</p>
        <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">라이브 미리보기</h2>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
        <div className="flex flex-col items-center justify-center min-h-[180px] gap-4 bg-[var(--color-bg-subtle)] border-b border-[var(--color-border)] p-8">
          <div className="flex gap-3">
            <button onClick={() => { setVariant("default"); setOpen(true); }}
              className="px-5 py-2.5 rounded-md bg-[var(--color-interactive-primary)] text-[var(--color-text-on-brand)] text-[14px] font-medium hover:bg-[var(--color-interactive-hover)] transition-colors">
              모달 열기 (Default)
            </button>
            <button onClick={() => { setVariant("destructive"); setOpen(true); }}
              className="px-5 py-2.5 rounded-md border border-[var(--color-status-error)] text-[var(--color-status-error)] text-[14px] font-medium hover:bg-[var(--color-bg-error)] transition-colors">
              모달 열기 (Destructive)
            </button>
          </div>
        </div>

        <div className="p-6">
          <p className="text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-3">적용된 토큰</p>
          <div className="grid sm:grid-cols-2 gap-1.5">
            {[
              { token: "radius/component/dialog",     value: "16px" },
              { token: "elevation/surface/modal",      value: "Level 4 — 0 8px 24px -2px" },
              { token: "color/bg/default",             value: "Light: White / Dark: N600" },
              { token: "color/border/default",         value: "N100 #D8DCDE" },
              { token: "space/07",                     value: "32px (내부 패딩)" },
              { token: "color/component/button/primary/bg/default", value: "M300 #28D7D2" },
            ].map((t) => <TokenBadge key={t.token} token={t.token} value={t.value} />)}
          </div>
        </div>
      </div>

      {/* Modal overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop — click outside to dismiss */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          {/* Dialog panel */}
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative z-10 w-full max-w-sm mx-4 bg-[var(--color-bg-default)] rounded-xl [box-shadow:var(--shadow-04)] p-7 border border-[var(--color-border-default)]"
          >
            <h3 id="modal-title" className="text-[18px] font-bold text-[var(--color-text-primary)] mb-2">
              {variant === "destructive" ? "정말 삭제하시겠어요?" : "변경 사항을 저장할까요?"}
            </h3>
            <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed mb-6">
              {variant === "destructive"
                ? "삭제된 데이터는 복구할 수 없습니다. 신중하게 결정해 주세요."
                : "저장하지 않으면 작성한 내용이 사라집니다. 계속 진행하시겠어요?"}
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-md border border-[var(--color-border)] text-[14px] font-medium text-[var(--color-text-secondary)] hover:border-[var(--color-border-brand)] hover:text-[var(--color-interactive-hover)] transition-colors">
                취소
              </button>
              <button onClick={() => setOpen(false)}
                className={`px-4 py-2 rounded-md text-[14px] font-medium text-white transition-colors ${
                  variant === "destructive"
                    ? "bg-[var(--color-status-error)] hover:brightness-90"
                    : "bg-[var(--color-interactive-primary)] hover:bg-[var(--color-interactive-hover)]"
                }`}>
                {variant === "destructive" ? "삭제" : "저장하기"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function SpecTable() {
  const specs = [
    { attr: "Radius",         value: "16px",                  token: "radius/component/dialog" },
    { attr: "Elevation",      value: "0 8px 24px -2px",       token: "elevation/surface/modal (Level 4)" },
    { attr: "내부 패딩",      value: "32px",                  token: "space/07" },
    { attr: "Title 폰트",     value: "18px Medium",           token: "type/title/sm" },
    { attr: "Body 폰트",      value: "14px Regular",          token: "type/body/sm" },
    { attr: "Background",     value: "White / N600 (dark)",   token: "color/bg/default" },
    { attr: "최대 너비",      value: "480px (권장)",          token: "—" },
    { attr: "Overlay",        value: "black 40%",             token: "—" },
  ];

  return (
    <section className="mb-16">
      <div className="mb-5">
        <p className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Spec</p>
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
            {specs.map((row, i) => (
              <tr key={row.attr} className={`border-b border-[var(--color-border)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}>
                <td className="px-4 py-3 font-medium text-[var(--color-text-primary)]">{row.attr}</td>
                <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-interactive-pressed)]">{row.value}</td>
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
  );
}

export default function ModalPage() {
  return (
    <div className="px-8 py-10 max-w-[960px]">
      <div className="mb-10 pb-8 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]" />
          <span className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-primary)] mb-2">Modal</h1>
        <p className="text-[16px] text-[var(--color-text-secondary)] leading-relaxed max-w-[520px]">
          사용자의 주의가 필요한 작업 확인, 경고, 정보 전달에 사용하는 오버레이 컴포넌트.
          <br />
          <span className="text-[var(--color-brand-primary)] font-medium">Elevation 4</span> ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">Radius 16px</span>
        </p>
      </div>
      <ModalDemo />
      <SpecTable />
    </div>
  );
}
