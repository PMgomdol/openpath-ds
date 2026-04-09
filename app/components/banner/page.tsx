"use client";

import { useState } from "react";

type BannerVariant = "Info" | "Success" | "Warning" | "Error";

const BANNER_CONFIG: Record<BannerVariant, { bg: string; border: string; icon: string; iconColor: string; textColor: string }> = {
  Info:    { bg: "bg-mint-20 dark:bg-mint-600/10",          border: "border-mint-200 dark:border-mint-600/30", icon: "ℹ", iconColor: "text-mint-400",  textColor: "text-mint-600 dark:text-mint-300" },
  Success: { bg: "bg-mint-20 dark:bg-mint-600/10",          border: "border-mint-300",                         icon: "✓", iconColor: "text-mint-400",  textColor: "text-mint-600 dark:text-mint-300" },
  Warning: { bg: "bg-orange-50 dark:bg-[#EE706B]/10",       border: "border-[#EE706B]/40",                     icon: "⚠", iconColor: "text-[#EE706B]", textColor: "text-orange-700 dark:text-orange-300" },
  Error:   { bg: "bg-red-50 dark:bg-red-950/20",            border: "border-[#FF3257]/30",                     icon: "✕", iconColor: "text-[#FF3257]", textColor: "text-red-700 dark:text-red-300" },
};

function Banner({
  variant,
  title,
  description,
  action,
  dismissible,
}: {
  variant: BannerVariant;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  dismissible?: boolean;
}) {
  const [dismissed, setDismissed] = useState(false);
  const cfg = BANNER_CONFIG[variant];

  if (dismissed) return null;

  return (
    <div className={`rounded-xl border p-4 flex gap-3 ${cfg.bg} ${cfg.border}`}>
      <span className={`text-[18px] shrink-0 mt-0.5 ${cfg.iconColor}`}>{cfg.icon}</span>
      <div className="flex-1 min-w-0">
        <p className={`text-[14px] font-semibold ${cfg.textColor}`}>{title}</p>
        {description && (
          <p className={`text-[13px] mt-0.5 leading-relaxed ${cfg.textColor} opacity-80`}>{description}</p>
        )}
        {action && (
          <button
            onClick={action.onClick}
            className={`mt-2 text-[13px] font-semibold underline underline-offset-2 ${cfg.textColor}`}
          >
            {action.label}
          </button>
        )}
      </div>
      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          className={`shrink-0 opacity-50 hover:opacity-100 transition-opacity ${cfg.iconColor}`}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      )}
    </div>
  );
}

export default function BannerPage() {
  return (
    <div className="px-8 py-10 max-w-[960px]">
      <div className="mb-10 pb-8 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-primary)] mb-2">Banner</h1>
        <p className="text-[16px] text-[var(--color-text-secondary)] leading-relaxed max-w-[520px]">
          페이지 수준의 상태 알림 컴포넌트.
          <br />
          <span className="text-mint-400 font-medium">Info</span> ·{" "}
          <span className="text-mint-400 font-medium">Success</span> ·{" "}
          <span className="text-[#EE706B] font-medium">Warning</span> ·{" "}
          <span className="text-[#FF3257] font-medium">Error</span> 4가지 상태.
        </p>
      </div>

      {/* Variants */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Variants</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">Variant 갤러리</h2>
        </div>
        <div className="space-y-4">
          <Banner variant="Info"    title="시스템 점검 안내" description="2026년 4월 10일 오전 2시~4시 정기 점검이 진행됩니다." dismissible />
          <Banner variant="Success" title="변경 사항이 저장되었습니다." description="모든 설정이 성공적으로 업데이트되었습니다." dismissible />
          <Banner variant="Warning" title="구독 만료 예정" description="7일 후 구독이 만료됩니다. 지금 갱신하세요." action={{ label: "갱신하기", onClick: () => {} }} dismissible />
          <Banner variant="Error"   title="결제에 실패했습니다." description="카드 정보를 확인하고 다시 시도해 주세요." action={{ label: "결제 정보 수정", onClick: () => {} }} dismissible />
        </div>
      </section>

      {/* Without dismiss */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Non-dismissible</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">닫기 불가 Banner</h2>
        </div>
        <div className="space-y-4">
          <Banner variant="Error" title="이메일 인증이 필요합니다." description="서비스를 계속 이용하려면 이메일 인증을 완료해 주세요." action={{ label: "인증 메일 재발송", onClick: () => {} }} />
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
                { attr: "Radius",         value: "12px",         token: "radius/component/card/sm" },
                { attr: "Padding",        value: "16px",         token: "space/04" },
                { attr: "Title font",     value: "14px Semibold", token: "type/label/md" },
                { attr: "Body font",      value: "13px Regular", token: "type/body/sm" },
                { attr: "Info bg",        value: "M20 #F3FCFC",  token: "color/bg/brand" },
                { attr: "Info border",    value: "M200",         token: "color/palette/primary/M200" },
                { attr: "Error bg",       value: "red-50",       token: "—" },
                { attr: "Error border",   value: "#FF3257 30%",  token: "color/status/error" },
                { attr: "Warning bg",     value: "orange-50",    token: "—" },
                { attr: "Warning border", value: "#EE706B 40%",  token: "color/status/warning" },
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
