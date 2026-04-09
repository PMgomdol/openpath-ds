"use client";

import { useState } from "react";

// ─── Spec (DESIGN.md)
// Types: Informational / Warning / Error / Success
// Informational bg: color/bg/subtle N20 | accent: color/brand/primary M300
// Warning bg: #FFF8F0 | accent: color/status/warning #EE706B
// Error bg: #FFF0F3 | accent: color/status/error #FF3257
// Success bg: color/bg/brand M20 | accent: color/status/success #28D7D2
// Left accent border: 4px solid
// Padding H: 16px (space/04), V: 12px (space/03)
// Icon: 20px
// Title: 14px Medium (type/label/md)
// Body: 14px Regular (type/body/sm)
// Radius: 8px (radius/component/snackbar)

type BannerType = "Informational" | "Warning" | "Error" | "Success";

interface BannerConfig {
  bg: string;
  accent: string;
  titleColor: string;
  bodyColor: string;
  icon: React.ReactNode;
}

const BANNER_CONFIG: Record<BannerType, BannerConfig> = {
  Informational: {
    bg: "var(--color-bg-subtle)",
    accent: "var(--color-brand-primary)",
    titleColor: "var(--color-text-default)",
    bodyColor: "var(--color-text-subtle)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20 }}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
      </svg>
    ),
  },
  Warning: {
    bg: "#FFF8F0",
    accent: "var(--color-status-warning)",
    titleColor: "#7A4000",
    bodyColor: "#9A5200",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20 }}>
        <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
      </svg>
    ),
  },
  Error: {
    bg: "#FFF0F3",
    accent: "var(--color-status-error)",
    titleColor: "#8B0021",
    bodyColor: "#A00028",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20 }}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
      </svg>
    ),
  },
  Success: {
    bg: "var(--color-bg-brand)",
    accent: "var(--color-status-success)",
    titleColor: "var(--color-text-default)",
    bodyColor: "var(--color-text-subtle)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20 }}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14l-4-4 1.41-1.41L10 13.17l6.59-6.59L18 8l-8 8z"/>
      </svg>
    ),
  },
};

function Banner({
  type,
  title,
  description,
  actionLabel,
  dismissible = true,
}: {
  type: BannerType;
  title: string;
  description?: string;
  actionLabel?: string;
  dismissible?: boolean;
}) {
  const [dismissed, setDismissed] = useState(false);
  const cfg = BANNER_CONFIG[type];

  if (dismissed) return null;

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        borderRadius: 8,
        background: cfg.bg,
        // Left accent border 4px solid
        borderLeft: `4px solid ${cfg.accent}`,
        padding: "12px 16px 12px 12px",
      }}
    >
      {/* Icon 20px */}
      <span style={{ color: cfg.accent, flexShrink: 0, marginTop: 1 }}>
        {cfg.icon}
      </span>

      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Title: 14px Medium */}
        <p style={{ fontSize: 14, fontWeight: 500, color: cfg.titleColor, margin: 0 }}>
          {title}
        </p>
        {/* Body: 14px Regular */}
        {description && (
          <p style={{ fontSize: 14, fontWeight: 400, color: cfg.bodyColor, margin: "4px 0 0", lineHeight: 1.5 }}>
            {description}
          </p>
        )}
        {/* Action */}
        {actionLabel && (
          <button
            style={{
              marginTop: 8,
              fontSize: 13,
              fontWeight: 600,
              color: cfg.accent,
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              textDecoration: "underline",
              textUnderlineOffset: 2,
            }}
          >
            {actionLabel}
          </button>
        )}
      </div>

      {/* Dismiss X */}
      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          style={{
            flexShrink: 0,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: cfg.bodyColor,
            opacity: 0.5,
            padding: 0,
            lineHeight: 1,
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.5"; }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 16, height: 16 }}>
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      )}
    </div>
  );
}

const DEMOS: {
  type: BannerType;
  title: string;
  description: string;
  actionLabel?: string;
}[] = [
  {
    type: "Informational",
    title: "시스템 점검 안내",
    description: "2026년 4월 10일 오전 2시~4시 정기 점검이 진행됩니다. 서비스 이용에 참고해 주세요.",
  },
  {
    type: "Success",
    title: "변경 사항이 저장되었습니다.",
    description: "모든 설정이 성공적으로 업데이트되었습니다.",
  },
  {
    type: "Warning",
    title: "구독 만료 예정",
    description: "7일 후 구독이 만료됩니다. 지금 갱신하세요.",
    actionLabel: "갱신하기",
  },
  {
    type: "Error",
    title: "결제에 실패했습니다.",
    description: "카드 정보를 확인하고 다시 시도해 주세요.",
    actionLabel: "결제 정보 수정",
  },
];

export default function BannerPage() {
  return (
    <div className="px-8 py-10 max-w-[960px]">
      <div className="mb-10 pb-8 border-b border-[var(--color-border-default)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight mb-2" style={{ color: "var(--color-text-default)" }}>
          Banner
        </h1>
        <p className="text-[16px] leading-relaxed max-w-[520px]" style={{ color: "var(--color-text-subtle)" }}>
          페이지 수준의 상태 알림 컴포넌트.
          <br />
          <span className="text-mint-400 font-medium">4px left accent border</span> ·{" "}
          <span className="text-mint-400 font-medium">radius 8px</span> · 닫기 버튼 포함.
        </p>
      </div>

      {/* Variants */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Variants</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>Variant 갤러리</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>클릭하여 닫기 가능 · 페이지 새로고침으로 복원</p>
        </div>
        <div className="space-y-3">
          {DEMOS.map(d => (
            <Banner key={d.type} {...d} dismissible />
          ))}
        </div>
      </section>

      {/* Non-dismissible */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Non-dismissible</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>닫기 불가 Banner</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>필수 확인 안내 — 닫기 X 버튼 없음</p>
        </div>
        <Banner
          type="Error"
          title="이메일 인증이 필요합니다."
          description="서비스를 계속 이용하려면 이메일 인증을 완료해 주세요."
          actionLabel="인증 메일 재발송"
          dismissible={false}
        />
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
                { attr: "좌우 패딩",            value: "16px",         token: "space/04" },
                { attr: "상하 패딩",            value: "12px",         token: "space/03" },
                { attr: "좌측 accent border",   value: "4px solid",    token: "—" },
                { attr: "Radius",               value: "8px",          token: "radius/component/snackbar" },
                { attr: "아이콘 크기",           value: "20px",         token: "—" },
                { attr: "제목 폰트",             value: "14px Medium",  token: "type/label/md" },
                { attr: "본문 폰트",             value: "14px Regular", token: "type/body/sm" },
                { attr: "Informational bg",     value: "N20 #F4F5F5",  token: "color/bg/subtle" },
                { attr: "Informational accent", value: "M300 #28D7D2", token: "color/brand/primary" },
                { attr: "Warning bg",           value: "#FFF8F0",      token: "(추후 color/bg/warning)" },
                { attr: "Warning accent",       value: "#EE706B",      token: "color/status/warning" },
                { attr: "Error bg",             value: "#FFF0F3",      token: "(추후 color/bg/error)" },
                { attr: "Error accent",         value: "#FF3257",      token: "color/status/error" },
                { attr: "Success bg",           value: "M20 #F3FCFC",  token: "color/bg/brand" },
                { attr: "Success accent",       value: "#28D7D2",      token: "color/status/success" },
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
              {["닫기(X) 버튼 제공 (필수 확인 제외)", "페이지 상단 또는 섹션 상단 배치", "액션은 간결한 동사형 라벨", "4px left accent border 유지"].map((t, i) => (
                <li key={i} className="flex gap-2 text-[13px]" style={{ color: "var(--color-text-default)" }}>
                  <span className="text-[var(--color-brand-primary)] font-bold shrink-0">✓</span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border-2 p-5" style={{ borderColor: "rgba(255,50,87,0.3)", background: "#FFF0F3" }}>
            <p className="text-[14px] font-bold mb-3" style={{ color: "var(--color-status-error)" }}>✕ Don't</p>
            <ul className="space-y-2">
              {["닫기 없이 영구 노출", "콘텐츠 중간에 Banner 삽입", "같은 페이지에 Banner 2개 이상", "긴 본문 텍스트 (Dialog 사용)"].map((t, i) => (
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
