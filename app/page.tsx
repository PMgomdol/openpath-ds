"use client";

import Link from "next/link";
import { ArrowRight, Zap, Layers, User } from "lucide-react";
import { useState } from "react";

const principles = [
  {
    icon: <Zap size={22} strokeWidth={2} />,
    en: "Clarity",
    ko: "명료함",
    description:
      "모든 UI 결정은 사용자가 즉시 이해할 수 있어야 합니다. 불필요한 장식 없이, 정보 위계만으로 의도를 전달합니다.",
    accent: "from-[var(--color-brand-primary)] to-[var(--color-interactive-hover)]",
    bg: "bg-[var(--color-bg-brand)]",
    border: "border-[var(--color-border-default)]",
  },
  {
    icon: <Layers size={22} strokeWidth={2} />,
    en: "Scalability",
    ko: "확장성",
    description:
      "토큰 기반 아키텍처로 설계됩니다. 브랜드가 성장해도 일관성을 잃지 않고, 새로운 제품에 즉시 적용할 수 있습니다.",
    accent: "from-[var(--color-category-foundation)] to-[var(--color-category-foundation-pressed)]",
    bg: "bg-[var(--color-category-foundation-bg)]",
    border: "border-[var(--color-category-foundation-border)]",
  },
  {
    icon: <User size={22} strokeWidth={2} />,
    en: "Autonomy",
    ko: "자립성",
    description:
      "디자이너와 개발자 모두 DS를 독립적으로 운용할 수 있도록 문서화합니다. 의존 없이 스스로 결정하는 팀을 만듭니다.",
    accent: "from-[var(--color-category-autonomy)] to-[var(--color-category-autonomy-pressed)]",
    bg: "bg-[var(--color-category-autonomy-bg)]",
    border: "border-[var(--color-category-autonomy-border)]",
  },
];

const quickLinks = [
  { label: "Color",       href: "/foundation/color",           desc: "민트 팔레트 & 중립색 · Style" },
  { label: "Shape",       href: "/style/shape",                desc: "M3 Shape Scale 6단계 · Style" },
  { label: "Principles",  href: "/foundation/principles",      desc: "Clarity · Scalability · Autonomy · Foundation" },
  { label: "Design Token",href: "/foundation/design-token",    desc: "3단계 토큰 구조 · Foundation" },
  { label: "Accessibility",href:"/foundation/accessibility",   desc: "WCAG AA · 터치 48dp · Foundation" },
  { label: "Button",      href: "/components/button",          desc: "라이브 데모 + 스펙 · Components" },
  { label: "FAB",         href: "/components/fab",             desc: "Rounded Square shape/lg · Components" },
  { label: "전체 토큰",   href: "/tokens",                     desc: "복사 가능한 토큰 테이블" },
];

export default function HomePage() {
  return (
    <div className="px-8 py-12 max-w-[900px]">

      {/* Hero */}
      <section className="mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-bg-brand)] border border-[var(--color-border-default)] mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-primary)] animate-pulse" />
          <span className="text-[12px] font-semibold text-[var(--color-interactive-pressed)] tracking-wide">
            v0.1.0 — 기반 구조 구축 중
          </span>
        </div>

        <h1 className="text-[48px] leading-[1.15] font-black text-[var(--color-text-primary)] tracking-tight mb-4">
          오픈패스{" "}
          <span className="text-[var(--color-brand-primary)]">디자인 시스템</span>
        </h1>
        <p className="text-[18px] text-[var(--color-text-secondary)] leading-relaxed max-w-[560px] mb-8">
          명료함, 확장성, 자립성 위에 설계된 교육 브랜드 범용 DS.
          <br />
          토큰 기반으로 일관된 UI를 빠르게 구축합니다.
        </p>

        <div className="flex items-center gap-3">
          <Link
            href="/foundation/color"
            className="
              inline-flex items-center gap-2
              px-5 py-2.5 rounded-md
              bg-[var(--color-brand-primary)] hover:bg-[var(--color-interactive-hover)]
              text-[var(--color-text-on-brand)] text-[15px] font-semibold
              transition-colors duration-150
              shadow-elevation-1
            "
          >
            시작하기
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
          <Link
            href="/tokens"
            className="
              inline-flex items-center gap-2
              px-5 py-2.5 rounded-md
              text-[15px] font-semibold
              text-[var(--color-text-primary)]
              border border-[var(--color-border)]
              hover:border-[var(--color-border-brand)] hover:text-[var(--color-interactive-hover)]
              transition-colors duration-150
            "
          >
            토큰 보기
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-[var(--color-border)] mb-12" />

      {/* Principles */}
      <section className="mb-16">
        <div className="mb-6">
          <p className="text-[12px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Design Principles
          </p>
          <h2 className="text-[24px] font-bold text-[var(--color-text-primary)]">
            3가지 설계 원칙
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {principles.map((p) => (
            <div
              key={p.en}
              className={`
                group rounded-xl p-5
                ${p.bg} border ${p.border}
                transition-all duration-200
                hover:shadow-elevation-2 hover:-translate-y-0.5
              `}
            >
              {/* Icon */}
              <div
                className={`
                  inline-flex items-center justify-center
                  w-10 h-10 rounded-lg mb-4
                  bg-gradient-to-br ${p.accent}
                  text-[var(--color-text-on-brand)]
                `}
              >
                {p.icon}
              </div>

              <p className="text-[12px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest mb-0.5">
                {p.en}
              </p>
              <h3 className="text-[18px] font-bold text-[var(--color-text-primary)] mb-2">
                {p.ko}
              </h3>
              <p className="text-[14px] text-[var(--color-text-secondary)] leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* DS Structure Overview */}
      <section className="mb-16">
        <div className="mb-6">
          <p className="text-[12px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            M3 Structure
          </p>
          <h2 className="text-[24px] font-bold text-[var(--color-text-primary)]">
            디자인 시스템 구조
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              category: "Style",
              desc: "시각 요소",
              color: "text-[var(--color-interactive-pressed)]",
              bg: "bg-[var(--color-bg-brand)]",
              border: "border-[var(--color-border-default)]",
              items: ["Color", "Typography", "Spacing", "Shape", "Elevation", "Iconography"],
            },
            {
              category: "Foundation",
              desc: "환경·원칙·기반",
              color: "text-[var(--color-category-foundation)]",
              bg: "bg-[var(--color-category-foundation-bg)]",
              border: "border-[var(--color-category-foundation-border)]",
              items: ["Environment", "Principles", "Naming", "Design Token", "Accessibility", "Motion"],
            },
            {
              category: "Components",
              desc: "UI 구성 요소",
              color: "text-[var(--color-text-secondary)]",
              bg: "bg-[var(--color-bg-subtle)]",
              border: "border-[var(--color-border)]",
              items: ["Button", "Input", "Card", "FAB", "Bottom Navigation", "…16종"],
            },
          ].map((cat) => (
            <div key={cat.category} className={`rounded-xl p-5 border ${cat.bg} ${cat.border}`}>
              <p className={`text-[11px] font-bold uppercase tracking-widest mb-0.5 ${cat.color}`}>{cat.category}</p>
              <p className="text-[13px] text-[var(--color-text-secondary)] mb-3">{cat.desc}</p>
              <ul className="space-y-1">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-center gap-1.5 text-[13px] text-[var(--color-text-primary)]">
                    <span className={`w-1 h-1 rounded-full shrink-0 ${cat.color.replace("text-", "bg-")}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section>
        <div className="mb-6">
          <p className="text-[12px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Quick Links
          </p>
          <h2 className="text-[24px] font-bold text-[var(--color-text-primary)]">
            바로 탐색하기
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="
                group flex flex-col gap-1
                p-4 rounded-lg
                border border-[var(--color-border)]
                bg-[var(--color-bg-base)]
                hover:border-[var(--color-border-brand)] hover:shadow-elevation-1
                transition-all duration-150
              "
            >
              <span className="text-[14px] font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-interactive-hover)] transition-colors">
                {link.label}
              </span>
              <span className="text-[12px] text-[var(--color-text-secondary)]">
                {link.desc}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Theme Switch Demo */}
      <ThemeDemo />

      {/* Footer note */}
      <div className="mt-16 pt-8 border-t border-[var(--color-border)]">
        <p className="text-[13px] text-[var(--color-text-secondary)]">
          OpenPath Design System · Built with Next.js + Tailwind CSS
        </p>
      </div>
    </div>
  );
}

// ─── Theme Demo ───────────────────────────────────────────────

type Theme = "openpath" | "duotone";

const THEME_VARS: Record<Theme, Record<string, string>> = {
  openpath: {
    "--demo-primary":        "#28D7D2",
    "--demo-primary-hover":  "#1BB8B3",
    "--demo-primary-pressed":"#0F9490",
    "--demo-primary-light":  "#F3FCFC",
    "--demo-primary-border": "#28D7D2",
    "--demo-primary-dark":   "#156565",
  },
  duotone: {
    "--demo-primary":        "#FE6565",
    "--demo-primary-hover":  "#E54D4D",
    "--demo-primary-pressed":"#C93838",
    "--demo-primary-light":  "#FFF1F1",
    "--demo-primary-border": "#FE6565",
    "--demo-primary-dark":   "#A02828",
  },
};

function ThemeDemo() {
  const [theme, setTheme] = useState<Theme>("openpath");
  const vars = THEME_VARS[theme];

  const isOpenpath = theme === "openpath";

  return (
    <section className="mb-16 mt-4">
      <div className="border-t border-[var(--color-border)] pt-12 mb-8">
        <p className="text-[12px] font-semibold uppercase tracking-widest mb-1" style={{ color: vars["--demo-primary"] }}>
          Multi-Theme
        </p>
        <h2 className="text-[24px] font-bold text-[var(--color-text-primary)] mb-2">
          테마 전환 데모
        </h2>
        <p className="text-[14px] text-[var(--color-text-secondary)] max-w-[480px]">
          오픈패스 DS는 <strong>Openpath (민트)</strong> / <strong>Duotone (코랄)</strong> 두 테마를 지원합니다.
          CSS 변수 교체만으로 모든 컴포넌트 색상이 실시간 전환됩니다.
        </p>
      </div>

      {/* Toggle */}
      <div className="flex gap-2 mb-8">
        {(["openpath", "duotone"] as Theme[]).map(t => {
          const isActive = theme === t;
          const color = THEME_VARS[t]["--demo-primary"];
          return (
            <button
              key={t}
              onClick={() => setTheme(t)}
              style={{
                padding: "8px 20px",
                borderRadius: 9999,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s",
                background: isActive ? color : "transparent",
                color: isActive ? "var(--color-text-on-brand)" : "var(--color-text-subtle)",
                border: `2px solid ${isActive ? color : "var(--color-border-default)"}`,
              }}
            >
              {t === "openpath" ? "Openpath (민트)" : "Duotone (코랄)"}
            </button>
          );
        })}
      </div>

      {/* Live preview */}
      <div
        className="rounded-2xl border border-[var(--color-border)] p-6 transition-all duration-300"
        style={{ ...(vars as React.CSSProperties), background: "var(--color-bg-subtle)" }}
      >
        <div className="grid sm:grid-cols-3 gap-4">
          {/* Card */}
          <div
            className="rounded-xl p-5 col-span-1 sm:col-span-2"
            style={{ background: "var(--color-bg-default)", boxShadow: "var(--shadow-02)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-[var(--color-text-on-brand)] font-bold"
                style={{ background: vars["--demo-primary"] }}
              >
                O
              </div>
              <div>
                <p className="text-[14px] font-bold" style={{ color: "var(--color-text-default)" }}>
                  {isOpenpath ? "오픈패스 DS" : "듀오톤 DS"}
                </p>
                <p className="text-[12px]" style={{ color: "var(--color-text-subtle)" }}>
                  {isOpenpath ? "Mint #28D7D2" : "Coral #FE6565"}
                </p>
              </div>
            </div>
            <p className="text-[13px] leading-relaxed mb-4" style={{ color: "var(--color-text-subtle)" }}>
              토큰 기반 멀티 테마 시스템. CSS 변수 교체만으로 브랜드 색상이 전체 컴포넌트에 즉시 반영됩니다.
            </p>
            <div className="flex gap-2 flex-wrap">
              <button
                className="px-4 py-2 rounded-lg text-[13px] font-semibold text-[var(--color-text-on-brand)] transition-all"
                style={{ background: vars["--demo-primary"] }}
                onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = vars["--demo-primary-hover"]; }}
                onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = vars["--demo-primary"]; }}
              >
                시작하기
              </button>
              <button
                className="px-4 py-2 rounded-lg text-[13px] font-semibold transition-all"
                style={{
                  background: "transparent",
                  color: vars["--demo-primary"],
                  border: `1px solid ${vars["--demo-primary-border"]}`,
                }}
                onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = vars["--demo-primary-light"]; }}
                onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = "transparent"; }}
              >
                더 알아보기
              </button>
            </div>
          </div>

          {/* Color swatches */}
          <div className="flex flex-col gap-2">
            {[
              { label: "Primary",  key: "--demo-primary" },
              { label: "Hover",    key: "--demo-primary-hover" },
              { label: "Pressed",  key: "--demo-primary-pressed" },
              { label: "Light",    key: "--demo-primary-light" },
            ].map(({ label, key }) => (
              <div key={key} className="flex items-center gap-3 rounded-lg px-3 py-2" style={{ background: "var(--color-bg-default)" }}>
                <div className="w-7 h-7 rounded-md shrink-0 border border-[var(--color-border-default)]" style={{ background: vars[key] }} />
                <div>
                  <p className="text-[11px] font-semibold" style={{ color: "var(--color-text-default)" }}>{label}</p>
                  <p className="text-[10px] font-mono" style={{ color: "var(--color-text-subtle)" }}>{vars[key]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Token note */}
        <div
          className="mt-4 rounded-lg px-4 py-3 text-[12px] font-mono"
          style={{
            background: vars["--demo-primary-light"],
            color: vars["--demo-primary-pressed"],
            border: `1px solid ${vars["--demo-primary-border"]}20`,
          }}
        >
          {`--color-brand-primary: ${vars["--demo-primary"]}`}
        </div>
      </div>
    </section>
  );
}
