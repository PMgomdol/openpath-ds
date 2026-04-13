"use client";

import { useState } from "react";
import NavigationDrawer from "@/components/ui/NavigationDrawer";
import type { DrawerSection } from "@/components/ui/NavigationDrawer";
import {
  Home,
  LayoutDashboard,
  BarChart2,
  FileText,
  Image,
  MessageSquare,
  User,
  Bell,
  Lock,
  Menu,
} from "lucide-react";
import CodeBlock from "@/components/ui/CodeBlock";

// ── Code snippets ──────────────────────────────────────────────
const DRAWER_SNIPPETS = [
  {
    label: "Modal",
    code: `import { useState } from "react";
import NavigationDrawer from "@/components/ui/NavigationDrawer";
import type { DrawerSection } from "@/components/ui/NavigationDrawer";
import { Home, Settings, User } from "lucide-react";

const SECTIONS: DrawerSection[] = [
  {
    items: [
      { key: "home",     label: "홈",  icon: <Home size={24} /> },
      { key: "profile",  label: "프로필", icon: <User size={24} /> },
    ],
  },
  {
    title: "관리",
    items: [
      { key: "settings", label: "설정", icon: <Settings size={24} /> },
    ],
  },
];

export function MyDrawer() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  return (
    <NavigationDrawer
      variant="modal"
      open={open}
      onClose={() => setOpen(false)}
      sections={SECTIONS}
      activeKey={active}
      onItemClick={setActive}
    />
  );
}`,
  },
  {
    label: "Standard",
    code: `import { useState } from "react";
import NavigationDrawer from "@/components/ui/NavigationDrawer";
import type { DrawerSection } from "@/components/ui/NavigationDrawer";
import { Home, Settings } from "lucide-react";

// Standard variant — collapses via width transition, no scrim
export function MyLayout() {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ display: "flex" }}>
      <NavigationDrawer
        variant="standard"
        open={open}
        sections={SECTIONS}
        activeKey={active}
        onItemClick={setActive}
      />
      <main>{/* page content */}</main>
    </div>
  );
}`,
  },
];

// ── Demo nav sections ──────────────────────────────────────
const SECTIONS: DrawerSection[] = [
  {
    title: "메인",
    items: [
      { key: "home",      label: "홈",       icon: <Home size={24} /> },
      { key: "dashboard", label: "대시보드",  icon: <LayoutDashboard size={24} /> },
      { key: "analytics", label: "분석",     icon: <BarChart2 size={24} /> },
    ],
  },
  {
    title: "콘텐츠",
    items: [
      { key: "posts",    label: "게시글", icon: <FileText size={24} /> },
      { key: "media",    label: "미디어", icon: <Image size={24} /> },
      { key: "comments", label: "댓글",  icon: <MessageSquare size={24} /> },
    ],
  },
  {
    title: "설정",
    items: [
      { key: "account",  label: "계정",    icon: <User size={24} /> },
      { key: "alerts",   label: "알림",    icon: <Bell size={24} /> },
      { key: "privacy",  label: "개인정보", icon: <Lock size={24} /> },
    ],
  },
];

// ── Shared drawer header ───────────────────────────────────
function DrawerHeader() {
  return (
    <div className="flex items-center gap-3">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-[14px] font-bold"
        style={{
          background: "var(--color-brand-primary)",
          color: "var(--color-text-on-brand)",
        }}
      >
        O
      </div>
      <div>
        <p className="text-[14px] font-bold text-[var(--color-text-default)]">
          OpenPath
        </p>
        <p className="text-[11px] text-[var(--color-text-subtle)]">
          Design System
        </p>
      </div>
    </div>
  );
}

export default function NavigationDrawerPage() {
  const [standardOpen, setStandardOpen] = useState(true);
  const [standardActive, setStandardActive] = useState("home");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalActive, setModalActive] = useState("home");

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
          Navigation Drawer
        </h1>
        <p className="text-[16px] text-[var(--color-text-subtle)] leading-relaxed max-w-[540px]">
          사이드에서 슬라이드되는 탐색 패널.
          <br />
          <span className="text-[var(--color-brand-primary)] font-medium">Standard</span>{" "}
          (콘텐츠 옆 고정) ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">Modal</span>{" "}
          (Scrim + 슬라이드 인) · 애니메이션{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">--motion-decelerate</span>
        </p>
      </div>

      {/* Standard */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Standard
          </p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
            Standard Drawer
          </h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            콘텐츠 옆에 고정. shadow 없음. 너비 360px,
            width 애니메이션{" "}
            <code className="text-[11px] font-mono px-1 py-0.5 bg-[var(--color-bg-subtle)] rounded">
              --motion-decelerate
            </code>
          </p>
        </div>
        <div
          className="rounded-xl border border-[var(--color-border-default)] overflow-hidden"
          style={{ minHeight: 400 }}
        >
          <div className="flex h-full" style={{ minHeight: 400 }}>
            {/* Standard drawer — flex sibling */}
            <NavigationDrawer
              variant="standard"
              open={standardOpen}
              sections={SECTIONS}
              activeKey={standardActive}
              onItemClick={setStandardActive}
              header={<DrawerHeader />}
              aria-label="스탠다드 내비게이션"
            />

            {/* Content area */}
            <div
              className="flex-1 flex flex-col p-6 min-w-0"
              style={{ background: "var(--color-bg-subtle)" }}
            >
              <button
                onClick={() => setStandardOpen((v) => !v)}
                className="self-start flex items-center gap-2 px-3 py-2 rounded-lg border text-[13px] font-medium mb-4 transition-colors"
                style={{
                  borderColor: "var(--color-border-default)",
                  color: "var(--color-text-subtle)",
                  background: "var(--color-bg-default)",
                }}
                aria-label={standardOpen ? "Drawer 닫기" : "Drawer 열기"}
              >
                <Menu size={16} />
                {standardOpen ? "Drawer 닫기" : "Drawer 열기"}
              </button>
              <div
                className="flex-1 flex items-center justify-center text-[14px] text-[var(--color-text-subtle)]"
              >
                <span>
                  현재 선택:{" "}
                  <strong className="text-[var(--color-text-default)]">
                    {SECTIONS.flatMap((s) => s.items).find(
                      (i) => i.key === standardActive
                    )?.label}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Modal
          </p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
            Modal Drawer
          </h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            Scrim{" "}
            <code className="text-[11px] font-mono px-1 py-0.5 bg-[var(--color-bg-subtle)] rounded">
              rgba(21,27,30,0.40)
            </code>{" "}
            + shadow/03. ESC 또는 Scrim 클릭으로 닫기.
          </p>
        </div>
        <div
          className="rounded-xl border border-[var(--color-border-default)] p-8 flex items-center gap-4"
          style={{ background: "var(--color-bg-subtle)" }}
        >
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-[14px] font-medium transition-opacity hover:opacity-90"
            style={{
              background: "var(--color-brand-primary)",
              color: "var(--color-text-on-brand)",
            }}
          >
            <Menu size={16} />
            Modal Drawer 열기
          </button>
          <p className="text-[13px] text-[var(--color-text-subtle)]">
            현재 선택:{" "}
            <strong className="text-[var(--color-text-default)]">
              {SECTIONS.flatMap((s) => s.items).find(
                (i) => i.key === modalActive
              )?.label}
            </strong>
          </p>
        </div>

        {/* Portal-like modal — NavigationDrawer uses position:fixed internally */}
        <NavigationDrawer
          variant="modal"
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          sections={SECTIONS}
          activeKey={modalActive}
          onItemClick={setModalActive}
          header={<DrawerHeader />}
          aria-label="모달 내비게이션"
        />
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

        {/* Size */}
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)] mb-4">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
                {["속성", "Modal", "Standard", "Token"].map((h) => (
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
                  attr: "너비 (최대)",
                  modal: "360px",
                  std: "360px",
                  token: "—",
                },
                {
                  attr: "아이템 높이",
                  modal: "56px",
                  std: "56px",
                  token: "—",
                },
                {
                  attr: "아이템 radius",
                  modal: "9999px (Pill)",
                  std: "9999px (Pill)",
                  token: "shape/full",
                },
                {
                  attr: "좌우 패딩",
                  modal: "16px",
                  std: "16px",
                  token: "space/04",
                },
                {
                  attr: "아이콘↔라벨 간격",
                  modal: "12px",
                  std: "12px",
                  token: "space/03",
                },
                {
                  attr: "라벨 폰트",
                  modal: "14px Medium",
                  std: "14px Medium",
                  token: "type/label/md",
                },
                {
                  attr: "Shadow",
                  modal: "shadow/03",
                  std: "없음",
                  token: "elevation/surface/sticky",
                },
                {
                  attr: "Scrim",
                  modal: "rgba(21,27,30,0.40)",
                  std: "—",
                  token: "—",
                },
                {
                  attr: "애니메이션",
                  modal: "translateX(-100%→0)",
                  std: "width 0→360px",
                  token: "--motion-decelerate",
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
                    {row.modal}
                  </td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-text-subtle)]">
                    {row.std}
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

        {/* Color tokens */}
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
                  attr: "Background",
                  state: "—",
                  value: "White / N600",
                  token: "color/bg/default",
                },
                {
                  attr: "Item bg",
                  state: "Inactive",
                  value: "transparent",
                  token: "—",
                },
                {
                  attr: "Item bg",
                  state: "Hover",
                  value: "N20 #F4F5F5",
                  token: "color/bg/subtle",
                },
                {
                  attr: "Item bg",
                  state: "Active",
                  value: "M20 #F3FCFC",
                  token: "color/bg/brand",
                },
                {
                  attr: "Item label",
                  state: "Inactive",
                  value: "N600 #29363D",
                  token: "color/text/default",
                },
                {
                  attr: "Item label",
                  state: "Active",
                  value: "M300 #28D7D2",
                  token: "color/brand/primary",
                },
                {
                  attr: "Item icon",
                  state: "Inactive",
                  value: "N300 #889298",
                  token: "color/text/subtle",
                },
                {
                  attr: "Item icon",
                  state: "Active",
                  value: "M300 #28D7D2",
                  token: "color/brand/primary",
                },
                {
                  attr: "Section divider",
                  state: "—",
                  value: "N100 #D8DCDE",
                  token: "color/border/default",
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
                  <td className="px-4 py-3 text-[var(--color-text-subtle)]">
                    {row.state}
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
                "Active 항목은 항상 1개만 (aria-current=\"page\")",
                "Modal Drawer는 Scrim 클릭 · ESC로 닫기",
                "섹션 구분 필요 시 title + divider",
                "Standard는 콘텐츠와 flex 형제로 배치",
                "아이템 높이 56px · radius 9999px 유지",
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
                "여러 항목 동시에 Active",
                "Scrim 없이 Modal Drawer 표시",
                "섹션 구분 없이 항목 8개 이상 나열",
                "Standard에 shadow/03 추가",
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

      <CodeBlock snippets={DRAWER_SNIPPETS} />
    </div>
  );
}
