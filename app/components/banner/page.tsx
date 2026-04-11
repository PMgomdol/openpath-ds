"use client";

import { useState } from "react";
import Banner from "@/components/ui/Banner";
import type { BannerVariant } from "@/components/ui/Banner";

// ── Demo data ──────────────────────────────────────────────────

const DEMOS: {
  variant: BannerVariant;
  title: string;
  description: string;
  actionLabel?: string;
}[] = [
  {
    variant: "info",
    title: "시스템 점검 안내",
    description:
      "2026년 4월 10일 오전 2시~4시 정기 점검이 진행됩니다. 서비스 이용에 참고해 주세요.",
  },
  {
    variant: "success",
    title: "변경 사항이 저장되었습니다.",
    description: "모든 설정이 성공적으로 업데이트되었습니다.",
  },
  {
    variant: "warning",
    title: "구독 만료 예정",
    description: "7일 후 구독이 만료됩니다. 지금 갱신하세요.",
    actionLabel: "갱신하기",
  },
  {
    variant: "error",
    title: "결제에 실패했습니다.",
    description: "카드 정보를 확인하고 다시 시도해 주세요.",
    actionLabel: "결제 정보 수정",
  },
];

const VARIANT_LABEL: Record<BannerVariant, string> = {
  info:    "Informational",
  success: "Success",
  warning: "Warning",
  error:   "Error",
};

// ── Dismissible gallery (reset button restores all) ────────────

function DismissibleGallery() {
  const [key, setKey] = useState(0);
  return (
    <div>
      <div className="space-y-3" key={key}>
        {DEMOS.map((d) => (
          <div key={d.variant}>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-subtle)] mb-2">
              {VARIANT_LABEL[d.variant]}
            </p>
            <Banner {...d} dismissible />
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        className="mt-4 text-[12px] font-medium text-[var(--color-brand-primary)] underline underline-offset-2 cursor-pointer bg-transparent border-none p-0"
      >
        모두 복원
      </button>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────

export default function BannerPage() {
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
          Banner
        </h1>
        <p className="text-[16px] text-[var(--color-text-subtle)] leading-relaxed max-w-[540px]">
          페이지 수준의 상태 알림 컴포넌트.
          <br />
          <span className="text-[var(--color-brand-primary)] font-medium">
            Info
          </span>{" "}
          ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">
            Warning
          </span>{" "}
          ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">
            Error
          </span>{" "}
          ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">
            Success
          </span>{" "}
          · 4px left accent · 닫기 버튼 · role=&quot;alert&quot;
        </p>
      </div>

      {/* Dismissible variants */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Variants
          </p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
            4종 Variant (닫기 가능)
          </h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            X 버튼으로 닫기 · &quot;모두 복원&quot;으로 재표시
          </p>
        </div>
        <div
          className="rounded-xl border border-[var(--color-border-default)] p-6"
          style={{ background: "var(--color-bg-subtle)" }}
        >
          <DismissibleGallery />
        </div>
      </section>

      {/* Non-dismissible */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Non-dismissible
          </p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
            닫기 불가 Banner
          </h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            필수 확인 안내 — dismissible=&#123;false&#125; 시 X 버튼 없음
          </p>
        </div>
        <Banner
          variant="error"
          title="이메일 인증이 필요합니다."
          description="서비스를 계속 이용하려면 이메일 인증을 완료해 주세요."
          actionLabel="인증 메일 재발송"
          dismissible={false}
        />
      </section>

      {/* Title only */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Title only
          </p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
            제목만 표시 (description 없음)
          </h2>
        </div>
        <div className="space-y-3">
          <Banner variant="info"    title="서비스가 정상 운영 중입니다." />
          <Banner variant="success" title="파일 업로드가 완료되었습니다." />
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
                { attr: "좌우 패딩",             value: "16px",          token: "space/04" },
                { attr: "상하 패딩",             value: "12px",          token: "space/03" },
                { attr: "좌측 accent border",    value: "4px solid",     token: "—" },
                { attr: "Radius",                value: "8px",           token: "shape/sm" },
                { attr: "아이콘 크기",            value: "20px",          token: "—" },
                { attr: "제목 폰트",              value: "14px Medium",   token: "type/label/md" },
                { attr: "본문 폰트",              value: "14px Regular",  token: "type/body/sm" },
                { attr: "닫기 터치 영역",         value: "48px (::after)", token: "—" },
                { attr: "ARIA",                  value: 'role="alert" aria-atomic="true"', token: "—" },
                { attr: "Info accent",           value: "M300 #28D7D2",  token: "color/brand/primary" },
                { attr: "Warning accent",        value: "#EE706B",       token: "color/status/warning" },
                { attr: "Error accent",          value: "#FF3257",       token: "color/status/error" },
                { attr: "Success accent",        value: "#28D7D2",       token: "color/status/success" },
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
                "닫기(X) 버튼 제공 (필수 확인 제외)",
                "페이지 상단 또는 섹션 상단 배치",
                "메시지 1~2줄로 간결하게",
                "액션은 간결한 동사형 라벨",
                "4px left accent border 유지",
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
                "닫기 없이 영구 노출",
                "콘텐츠 중간에 Banner 삽입",
                "같은 페이지에 Banner 2개 이상",
                "긴 설명 텍스트 (Dialog 사용)",
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
