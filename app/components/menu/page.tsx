"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Menu from "@/components/ui/Menu";
import type { MenuEntry } from "@/components/ui/Menu";
import {
  Edit3,
  Copy,
  Share2,
  Download,
  Trash2,
  MoreVertical,
} from "lucide-react";
import CodeBlock from "@/components/ui/CodeBlock";

// ── Code snippets ──────────────────────────────────────────────
const MENU_SNIPPETS = [
  {
    label: "사용 예시",
    code: `import { useState } from "react";
import Menu from "@/components/ui/Menu";
import type { MenuEntry } from "@/components/ui/Menu";
import { Edit3, Copy, Trash2 } from "lucide-react";

const ITEMS: MenuEntry[] = [
  { key: "edit",   label: "편집하기", icon: <Edit3  size={20} />, shortcut: "⌘E" },
  { key: "copy",   label: "복제하기", icon: <Copy   size={20} />, shortcut: "⌘D" },
  { key: "div-1",  divider: true },
  { key: "delete", label: "삭제하기", icon: <Trash2 size={20} />, destructive: true },
];

export function MyMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <button onClick={() => setOpen(true)}>더보기</button>
      {open && (
        <Menu
          items={ITEMS}
          onAction={(key) => console.log(key)}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}`,
  },
];

// ── Demo items ─────────────────────────────────────────────
const BASE_ITEMS: MenuEntry[] = [
  { key: "edit",     label: "편집하기",  icon: <Edit3    size={20} />, shortcut: "⌘E" },
  { key: "copy",     label: "복제하기",  icon: <Copy     size={20} />, shortcut: "⌘D" },
  { key: "share",    label: "공유하기",  icon: <Share2   size={20} /> },
  { key: "export",   label: "내보내기",  icon: <Download size={20} />, disabled: true },
  { key: "div-1",    divider: true },
  { key: "delete",   label: "삭제하기",  icon: <Trash2   size={20} />, shortcut: "⌘⌫", destructive: true },
];

// ── click-outside hook ─────────────────────────────────────
function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

// ── Dropdown demo ──────────────────────────────────────────
function DropdownDemo() {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);
  useClickOutside(wrapRef, close);

  return (
    <div className="flex items-start gap-6 flex-wrap">
      <div ref={wrapRef} className="relative">
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border text-[14px] font-medium transition-colors"
          style={{
            borderColor: open
              ? "var(--color-brand-primary)"
              : "var(--color-border-default)",
            color: open
              ? "var(--color-brand-primary)"
              : "var(--color-text-default)",
            background: "var(--color-bg-default)",
          }}
        >
          더보기
          <MoreVertical size={16} />
        </button>

        {open && (
          <div className="absolute top-full left-0 mt-1 z-20">
            <Menu
              items={BASE_ITEMS}
              onAction={(key) => setLast(key)}
              onClose={close}
            />
          </div>
        )}
      </div>

      {last && (
        <p className="text-[13px] py-2.5 text-[var(--color-text-subtle)]">
          마지막 액션:{" "}
          <strong className="text-[var(--color-text-default)]">{last}</strong>
        </p>
      )}
    </div>
  );
}

// ── Context menu demo ──────────────────────────────────────
function ContextMenuDemo() {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [last, setLast] = useState<string | null>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const close = useCallback(() => setPos(null), []);

  // Close on click-outside the menu panel
  useEffect(() => {
    if (!pos) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current?.contains(e.target as Node)) return;
      close();
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [pos, close]);

  return (
    <div>
      <div
        role="region"
        aria-label="우클릭 데모 영역"
        onContextMenu={(e) => {
          e.preventDefault();
          setPos({ x: e.clientX, y: e.clientY });
        }}
        className="rounded-xl border-2 border-dashed flex items-center justify-center select-none cursor-context-menu"
        style={{
          minHeight: 160,
          borderColor: "var(--color-border-default)",
          background: "var(--color-bg-subtle)",
        }}
      >
        <p className="text-[14px] text-[var(--color-text-subtle)]">
          마우스 우클릭으로 Context Menu 열기
        </p>
      </div>

      {pos && (
        <div
          className="fixed z-50"
          style={{ top: pos.y, left: pos.x }}
        >
          <Menu
            ref={menuRef}
            items={BASE_ITEMS}
            onAction={(key) => setLast(key)}
            onClose={close}
          />
        </div>
      )}

      {last && (
        <p className="text-[13px] mt-3 text-[var(--color-text-subtle)]">
          마지막 액션:{" "}
          <strong className="text-[var(--color-text-default)]">{last}</strong>
        </p>
      )}
    </div>
  );
}

// ── Static preview ─────────────────────────────────────────
function StaticPreview() {
  return (
    <div className="flex gap-8 flex-wrap items-start">
      {/* Normal */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-subtle)] mb-3">
          기본
        </p>
        <Menu items={BASE_ITEMS} />
      </div>

      {/* Icon-only items */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-text-subtle)] mb-3">
          아이콘 없음
        </p>
        <Menu
          items={[
            { key: "new",    label: "새 파일" },
            { key: "open",   label: "열기",   shortcut: "⌘O" },
            { key: "save",   label: "저장",   shortcut: "⌘S" },
            { key: "div-1",  divider: true },
            { key: "close",  label: "닫기",   shortcut: "⌘W", disabled: true },
            { key: "div-2",  divider: true },
            { key: "quit",   label: "종료",   destructive: true },
          ]}
        />
      </div>
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────
export default function MenuPage() {
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
          Menu
        </h1>
        <p className="text-[16px] text-[var(--color-text-subtle)] leading-relaxed max-w-[540px]">
          컨텍스트 액션 목록을 표시하는 오버레이 컴포넌트.
          <br />
          <span className="text-[var(--color-brand-primary)] font-medium">Dropdown</span>{" "}
          (클릭 트리거) ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">Context</span>{" "}
          (우클릭) · click-outside 자동 닫힘 ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">shadow/02</span>
        </p>
      </div>

      {/* Dropdown */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Dropdown Menu
          </p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
            Dropdown Menu
          </h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            버튼 클릭으로 열기. 외부 클릭·ESC·항목 선택 시 닫힘.{" "}
            <code className="text-[11px] font-mono px-1 py-0.5 bg-[var(--color-bg-subtle)] rounded">
              aria-haspopup="menu"
            </code>{" "}
            +{" "}
            <code className="text-[11px] font-mono px-1 py-0.5 bg-[var(--color-bg-subtle)] rounded">
              aria-expanded
            </code>
          </p>
        </div>
        <div
          className="rounded-xl border border-[var(--color-border-default)] p-8"
          style={{ background: "var(--color-bg-subtle)" }}
        >
          <DropdownDemo />
        </div>
      </section>

      {/* Context */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Context Menu
          </p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
            Context Menu
          </h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            우클릭 좌표에 고정 위치로 메뉴 표시.
            외부 클릭·ESC·항목 선택 시 닫힘.
          </p>
        </div>
        <ContextMenuDemo />
      </section>

      {/* Static preview */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Static Preview
          </p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
            정적 미리보기
          </h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            일반 · Disabled · 구분선 · Destructive (하단 배치) 조합.
          </p>
        </div>
        <div
          className="rounded-xl border border-[var(--color-border-default)] p-8"
          style={{ background: "var(--color-bg-subtle)" }}
        >
          <StaticPreview />
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
                { attr: "최소 너비",      state: "—", value: "112px",                  token: "—" },
                { attr: "최대 너비",      state: "—", value: "280px",                  token: "—" },
                { attr: "아이템 높이",    state: "—", value: "48px",                   token: "—" },
                { attr: "좌우 패딩",      state: "—", value: "16px",                   token: "space/04" },
                { attr: "Radius",         state: "—", value: "4px",                    token: "shape/xs" },
                { attr: "라벨 폰트",      state: "—", value: "16px Regular",           token: "type/body/md" },
                { attr: "Shadow",         state: "—", value: "0 2px 8px",              token: "elevation/surface/overlay → shadow/02" },
                { attr: "Background",     state: "—", value: "White / N600",           token: "color/bg/default" },
                { attr: "Item bg",        state: "Hover",    value: "N20 #F4F5F5",     token: "color/bg/subtle" },
                { attr: "Item bg",        state: "Pressed",  value: "M20 #F3FCFC",     token: "color/bg/brand" },
                { attr: "Item label",     state: "Default",  value: "N600 #29363D",    token: "color/text/default" },
                { attr: "Item label",     state: "Disabled", value: "N100 #D8DCDE",    token: "color/text/disabled" },
                { attr: "Item label",     state: "Destructive", value: "#FF3257",      token: "color/status/error" },
                { attr: "Item icon",      state: "Default",  value: "N300 #889298",    token: "color/text/subtle" },
                { attr: "Divider",        state: "—", value: "1px N100 #D8DCDE",       token: "color/border/default" },
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
            <p className="text-[14px] font-bold text-[var(--color-brand-primary)] mb-3">
              ✓ Do
            </p>
            <ul className="space-y-2">
              {[
                "Destructive 항목은 하단에 배치 + 빨간 텍스트",
                "항목 5개 이하 권장",
                "트리거 요소 기준으로 정렬",
                "외부 클릭·ESC로 반드시 닫기 가능",
                "Disabled 항목은 color/text/disabled 사용",
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
                "Destructive 항목을 상단에 배치",
                "항목 7개 이상 나열",
                "화면 중앙에 Menu 띄우기",
                "아이템 높이 48px 미만 축소",
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

      <CodeBlock snippets={MENU_SNIPPETS} />
    </div>
  );
}
