"use client";

import { useState, useRef } from "react";
import AppBar from "@/components/ui/AppBar";
import type { AppBarAction, AppBarVariant } from "@/components/ui/AppBar";
import { ArrowLeft, Search, MoreVertical, Share2 } from "lucide-react";
import CodeBlock from "@/components/ui/CodeBlock";

// ── Code snippets ──────────────────────────────────────────────
const APPBAR_SNIPPETS = [
  {
    label: "Center-aligned",
    code: `import AppBar from "@/components/ui/AppBar";
import { ArrowLeft, Search, MoreVertical } from "lucide-react";

<AppBar
  variant="center"
  title="페이지 제목"
  navigationIcon={<ArrowLeft size={24} />}
  navigationLabel="뒤로"
  onNavigationClick={() => router.back()}
  actions={[
    { label: "검색", icon: <Search size={24} />, onClick: () => {} },
    { label: "더보기", icon: <MoreVertical size={24} />, onClick: () => {} },
  ]}
/>`,
  },
  {
    label: "Small",
    code: `import AppBar from "@/components/ui/AppBar";
import { Menu, Search } from "lucide-react";

// Small variant — title left-aligned next to nav icon
<AppBar
  variant="small"
  title="앱 이름"
  navigationIcon={<Menu size={24} />}
  navigationLabel="메뉴 열기"
  onNavigationClick={() => setDrawerOpen(true)}
  actions={[
    { label: "검색", icon: <Search size={24} />, onClick: () => {} },
  ]}
  scrolled={isScrolled}   // true → shadow/03 + bg-subtle
/>`,
  },
];

// ── Shared demo actions ───────────────────────────────────
const demoActions: AppBarAction[] = [
  { label: "검색", icon: <Search size={24} /> },
  { label: "공유", icon: <Share2 size={24} /> },
  { label: "더 보기", icon: <MoreVertical size={24} /> },
];

// ── Scroll-aware demo wrapper ─────────────────────────────
function AppBarDemo({
  variant,
  title,
  actions = demoActions,
}: {
  variant: AppBarVariant;
  title: string;
  actions?: AppBarAction[];
}) {
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    setScrolled((scrollRef.current?.scrollTop ?? 0) > 4);
  };

  return (
    <div className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
      <AppBar
        variant={variant}
        title={title}
        navigationIcon={<ArrowLeft size={24} />}
        navigationLabel="뒤로 가기"
        actions={actions}
        scrolled={scrolled}
      />
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="overflow-y-auto bg-[var(--color-bg-subtle)]"
        style={{ maxHeight: 160 }}
      >
        <div className="p-4" style={{ height: 400 }}>
          <p className="text-[13px] text-[var(--color-text-subtle)] mb-3">
            ↑ 여기서 스크롤하면 shadow/03 elevation이 나타납니다.
          </p>
          {Array.from({ length: 10 }, (_, i) => (
            <p key={i} className="text-[13px] text-[var(--color-text-subtle)] mt-2">
              스크롤 콘텐츠 {i + 1}
            </p>
          ))}
        </div>
      </div>
      <div className="px-4 py-2 border-t border-[var(--color-border-default)]">
        <span className="text-[11px] text-[var(--color-text-subtle)]">
          상태:{" "}
          <span
            className="font-medium"
            style={{
              color: scrolled
                ? "var(--color-brand-primary)"
                : "var(--color-text-disabled)",
            }}
          >
            {scrolled ? "스크롤됨 — shadow/03 적용" : "상단 — shadow 없음"}
          </span>
        </span>
      </div>
    </div>
  );
}

export default function AppBarPage() {
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
          App Bar
        </h1>
        <p className="text-[16px] text-[var(--color-text-subtle)] leading-relaxed max-w-[520px]">
          화면 상단에 고정되어 탐색·액션을 제공하는 컴포넌트.
          <br />
          <span className="text-[var(--color-brand-primary)] font-medium">
            Center-aligned
          </span>{" "}
          ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">
            Small
          </span>{" "}
          · 스크롤 시{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">
            shadow/03
          </span>{" "}
          자동 적용
        </p>
      </div>

      {/* Center-aligned (기본) */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Default — Center-aligned
          </p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
            Center-aligned App Bar
          </h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            제목이 중앙에 위치. 좌측 네비 아이콘 + 우측 액션 아이콘 최대 3개.
            스크롤 컨테이너 내부에서 스크롤하세요.
          </p>
        </div>
        <AppBarDemo variant="center" title="페이지 제목" />
      </section>

      {/* Small */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Small
          </p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
            Small App Bar
          </h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            제목이 좌측 정렬. 기본 페이지 헤더에 사용.
          </p>
        </div>
        <AppBarDemo variant="small" title="페이지 제목" />
      </section>

      {/* No nav icon example */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Actions Only
          </p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
            네비 아이콘 없음 · 액션 1개
          </h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            루트 화면처럼 뒤로 가기 불필요한 경우.
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
          <AppBar
            variant="center"
            title="OpenPath"
            actions={[{ label: "검색", icon: <Search size={24} /> }]}
            scrolled={false}
          />
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

        {/* Size & Layout */}
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)] mb-4">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
                {["Variant", "높이", "제목 정렬", "Title 폰트", "터치 영역"].map((h) => (
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
                {
                  variant: "Center-aligned",
                  height: "64px",
                  align: "Center",
                  font: "22px Bold",
                  touch: "Nav · Action 48dp",
                },
                {
                  variant: "Small",
                  height: "64px",
                  align: "Left",
                  font: "22px Bold",
                  touch: "Nav · Action 48dp",
                },
              ].map((row, i) => (
                <tr
                  key={row.variant}
                  className={`border-b border-[var(--color-border-default)] last:border-0 ${
                    i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""
                  }`}
                >
                  <td className="px-4 py-3 font-semibold text-[var(--color-text-default)]">
                    {row.variant}
                  </td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-brand-primary)]">
                    {row.height}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-subtle)]">{row.align}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-text-subtle)]">
                    {row.font}
                  </td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-text-subtle)]">
                    {row.touch}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Color & Elevation */}
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
                {["속성", "State", "Value", "Token"].map((h) => (
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
                {
                  attr: "좌우 패딩",
                  state: "—",
                  value: "16px",
                  token: "space/04",
                },
                {
                  attr: "아이콘 크기",
                  state: "—",
                  value: "24px",
                  token: "—",
                },
                {
                  attr: "우측 액션 최대",
                  state: "—",
                  value: "3개",
                  token: "—",
                },
                {
                  attr: "Background",
                  state: "Default",
                  value: "White / N600",
                  token: "color/bg/default",
                },
                {
                  attr: "Background",
                  state: "Scrolled",
                  value: "N20 / N500",
                  token: "color/bg/subtle",
                },
                {
                  attr: "Shadow",
                  state: "Default",
                  value: "없음",
                  token: "elevation/surface/default",
                },
                {
                  attr: "Shadow",
                  state: "Scrolled",
                  value: "0 4px 16px rgba(21,27,30,0.12)",
                  token: "elevation/surface/sticky → shadow/03",
                },
                {
                  attr: "Title · Icon",
                  state: "—",
                  value: "N600 #29363D",
                  token: "color/text/default",
                },
                {
                  attr: "Icon",
                  state: "Hover",
                  value: "M400 #1BB8B3",
                  token: "color/interactive/hover",
                },
              ].map((row, i) => (
                <tr
                  key={`${row.attr}-${row.state}`}
                  className={`border-b border-[var(--color-border-default)] last:border-0 ${
                    i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-[var(--color-text-default)]">
                    {row.attr}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-text-subtle)]">{row.state}</td>
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
            <p className="text-[14px] font-bold text-[var(--color-brand-primary)] mb-3">✓ Do</p>
            <ul className="space-y-2">
              {[
                "스크롤 시 shadow/03으로 elevation 표시",
                "우측 액션 아이콘 최대 3개",
                "아이콘 버튼 터치 영역 48dp 확보",
                "Center-aligned는 루트·랜딩 화면에 사용",
                "Small은 서브 페이지 헤더에 사용",
              ].map((t) => (
                <li
                  key={t}
                  className="flex gap-2 text-[13px] text-[var(--color-text-default)]"
                >
                  <span className="text-[var(--color-brand-primary)] font-bold shrink-0">›</span>
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
                "스크롤 무관하게 항상 shadow 표시",
                "우측 아이콘 4개 이상 나열",
                "App Bar를 두 개 이상 중첩",
                "색상만으로 Active 아이콘 표시",
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

      <CodeBlock snippets={APPBAR_SNIPPETS} />
    </div>
  );
}
