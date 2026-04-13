"use client";

import { useState } from "react";
import Tabs from "@/components/ui/Tabs";
import type { TabItem } from "@/components/ui/Tabs";
import {
  LayoutList,
  Settings,
  Info,
  Code2,
  Star,
  BookOpen,
} from "lucide-react";
import CodeBlock from "@/components/ui/CodeBlock";

// ── Code snippets ──────────────────────────────────────────────
const TAB_SNIPPETS = [
  {
    label: "Primary",
    code: `import { useState } from "react";
import Tabs from "@/components/ui/Tabs";
import type { TabItem } from "@/components/ui/Tabs";

const TABS: TabItem[] = [
  { key: "overview", label: "개요" },
  { key: "settings", label: "설정" },
  { key: "info",     label: "정보", badge: 2 },
];

export function MyTabs() {
  const [active, setActive] = useState("overview");
  return (
    <Tabs
      variant="primary"
      items={TABS}
      activeKey={active}
      onChange={setActive}
    />
  );
}`,
  },
  {
    label: "Secondary",
    code: `import { useState } from "react";
import Tabs from "@/components/ui/Tabs";
import type { TabItem } from "@/components/ui/Tabs";
import { Map, Star, Calendar } from "lucide-react";

// Secondary tabs — pill background, often used as filters
const TABS: TabItem[] = [
  { key: "all",      label: "전체" },
  { key: "map",      label: "지도", icon: <Map size={18} /> },
  { key: "favorites",label: "즐겨찾기", icon: <Star size={18} /> },
  { key: "schedule", label: "일정", icon: <Calendar size={18} />, disabled: true },
];

export function MyFilterTabs() {
  const [active, setActive] = useState("all");
  return (
    <Tabs
      variant="secondary"
      items={TABS}
      activeKey={active}
      onChange={setActive}
    />
  );
}`,
  },
];

// ── Demo data sets ─────────────────────────────────────────

const primaryBasic: TabItem[] = [
  { key: "overview", label: "개요" },
  { key: "usage",    label: "사용법" },
  { key: "spec",     label: "스펙" },
  { key: "a11y",     label: "접근성" },
];

const primaryWithBadge: TabItem[] = [
  { key: "all",      label: "전체",  badge: 24 },
  { key: "active",   label: "진행중", badge: 8 },
  { key: "done",     label: "완료",  badge: 16 },
];

const primaryWithIcon: TabItem[] = [
  { key: "list",     label: "목록",  icon: <LayoutList size={20} /> },
  { key: "code",     label: "코드",  icon: <Code2 size={20} /> },
  { key: "docs",     label: "문서",  icon: <BookOpen size={20} /> },
  { key: "settings", label: "설정",  icon: <Settings size={20} /> },
];

const secondaryBasic: TabItem[] = [
  { key: "design",   label: "디자인" },
  { key: "dev",      label: "개발" },
  { key: "pm",       label: "기획" },
  { key: "marketing",label: "마케팅" },
];

const secondaryWithBadge: TabItem[] = [
  { key: "all",      label: "전체",  badge: 42 },
  { key: "new",      label: "신규",  badge: 7 },
  { key: "popular",  label: "인기",  badge: 15 },
];

const secondaryWithIcon: TabItem[] = [
  { key: "starred",  label: "즐겨찾기", icon: <Star size={20} /> },
  { key: "info",     label: "정보",     icon: <Info size={20} /> },
  { key: "settings", label: "설정",     icon: <Settings size={20} /> },
];

// ── Live demo wrapper ──────────────────────────────────────
function TabDemo({
  items,
  variant,
  defaultKey,
}: {
  items: TabItem[];
  variant: "primary" | "secondary";
  defaultKey?: string;
}) {
  const [active, setActive] = useState(defaultKey ?? items[0].key);

  return (
    <div>
      <Tabs
        variant={variant}
        items={items}
        activeKey={active}
        onChange={setActive}
        aria-label="데모 탭"
      />
      <div className="mt-4 px-5 py-4 rounded-xl border border-[var(--color-border-default)] text-[14px] text-[var(--color-text-subtle)]">
        <strong className="text-[var(--color-text-default)]">
          {items.find((i) => i.key === active)?.label}
        </strong>{" "}
        탭의 콘텐츠 영역입니다. (← 키보드 ← → 로 탭 전환 가능)
      </div>
    </div>
  );
}

export default function TabPage() {
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
          Tab
        </h1>
        <p className="text-[16px] text-[var(--color-text-subtle)] leading-relaxed max-w-[540px]">
          콘텐츠를 카테고리별로 전환하는 내비게이션 컴포넌트.
          <br />
          <span className="text-[var(--color-brand-primary)] font-medium">Primary</span>
          {" "}(2px indicator 라인) ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">Secondary</span>
          {" "}(Pill 배경) · <span className="text-[var(--color-brand-primary)] font-medium">role=tablist</span>
          {" "}ARIA 완전 지원
        </p>
      </div>

      {/* Primary */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Primary
          </p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
            Primary Tab
          </h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            하단 2px indicator 라인. 주요 콘텐츠 전환에 사용.{" "}
            <code className="text-[11px] font-mono px-1 py-0.5 bg-[var(--color-bg-subtle)] rounded">
              aria-selected
            </code>
            {" "}· 키보드 ←→ 내비게이션 지원.
          </p>
        </div>
        <div className="space-y-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-subtle)] mb-3">
              기본
            </p>
            <TabDemo items={primaryBasic} variant="primary" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-subtle)] mb-3">
              카운트 배지
            </p>
            <TabDemo items={primaryWithBadge} variant="primary" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-subtle)] mb-3">
              아이콘 + 라벨
            </p>
            <TabDemo items={primaryWithIcon} variant="primary" />
          </div>
        </div>
      </section>

      {/* Secondary */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Secondary
          </p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
            Secondary Tab
          </h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            Pill형 배경{" "}
            <code className="text-[11px] font-mono px-1 py-0.5 bg-[var(--color-bg-subtle)] rounded">
              color/bg/brand
            </code>
            . 서브 카테고리·필터 전환에 사용.
          </p>
        </div>
        <div className="space-y-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-subtle)] mb-3">
              기본
            </p>
            <TabDemo items={secondaryBasic} variant="secondary" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-subtle)] mb-3">
              카운트 배지
            </p>
            <TabDemo items={secondaryWithBadge} variant="secondary" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-subtle)] mb-3">
              아이콘 + 라벨
            </p>
            <TabDemo items={secondaryWithIcon} variant="secondary" />
          </div>
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
                {["속성", "Primary", "Secondary", "Token"].map((h) => (
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
                  attr: "탭 높이",
                  pri: "48px",
                  sec: "40px (pill)",
                  token: "—",
                },
                {
                  attr: "좌우 패딩",
                  pri: "16px",
                  sec: "16px",
                  token: "space/04",
                },
                {
                  attr: "라벨 폰트",
                  pri: "14px Medium",
                  sec: "14px Medium",
                  token: "type/label/md",
                },
                {
                  attr: "아이콘 크기",
                  pri: "20px",
                  sec: "20px",
                  token: "—",
                },
                {
                  attr: "Active 라벨",
                  pri: "M300 #28D7D2",
                  sec: "M300 #28D7D2",
                  token: "color/brand/primary",
                },
                {
                  attr: "Inactive 라벨",
                  pri: "N300 #889298",
                  sec: "N300 #889298",
                  token: "color/text/subtle",
                },
                {
                  attr: "Hover 라벨",
                  pri: "N600 #29363D",
                  sec: "N600 #29363D",
                  token: "color/text/default",
                },
                {
                  attr: "Indicator",
                  pri: "하단 2px 라인",
                  sec: "Pill 배경",
                  token: "—",
                },
                {
                  attr: "Indicator 색",
                  pri: "M300 #28D7D2",
                  sec: "M20 #F3FCFC",
                  token: "color/brand/primary / color/bg/brand",
                },
                {
                  attr: "하단 border",
                  pri: "1px N100 #D8DCDE",
                  sec: "—",
                  token: "color/border/default",
                },
                {
                  attr: "ARIA",
                  pri: "role=tablist · role=tab · aria-selected",
                  sec: "role=tablist · role=tab · aria-selected",
                  token: "—",
                },
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
                    {row.pri}
                  </td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-text-subtle)]">
                    {row.sec}
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
                "탭 2~5개 유지",
                "Active 탭은 항상 1개만",
                "Primary는 주요 콘텐츠 전환에 사용",
                "Secondary는 필터·서브 카테고리에 사용",
                "라벨 1~2 단어 이내로 짧게",
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
                "탭 6개 이상 나열 (스크롤 탭으로 전환)",
                "복수 탭 동시 Active",
                "Primary와 Secondary 혼용",
                "탭 라벨을 긴 문장으로 사용",
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

      <CodeBlock snippets={TAB_SNIPPETS} />
    </div>
  );
}
