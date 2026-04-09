"use client";

import { useState, useRef, useEffect } from "react";

type MenuItem = {
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  danger?: boolean;
  divider?: boolean;
  disabled?: boolean;
};

const MENU_ITEMS: MenuItem[] = [
  { label: "편집하기",   icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>, shortcut: "⌘E" },
  { label: "복제하기",   icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>, shortcut: "⌘D" },
  { label: "공유하기",   icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg> },
  { label: "비활성 항목", disabled: true },
  { label: "", divider: true },
  { label: "삭제하기", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>, danger: true, shortcut: "⌘⌫" },
];

function Menu({ open, anchor }: { open: boolean; anchor: { x: number; y: number } | null }) {
  if (!open || !anchor) return null;

  return (
    <div
      className="fixed z-50 bg-[var(--color-bg-base,white)] dark:bg-neutral-600 rounded-xl shadow-elevation-2 border border-[var(--color-border)] py-1 min-w-[200px]"
      style={{ top: anchor.y, left: anchor.x }}
    >
      {MENU_ITEMS.map((item, i) => {
        if (item.divider) {
          return <div key={i} className="my-1 h-px bg-[var(--color-border)]" />;
        }
        return (
          <button
            key={item.label}
            disabled={item.disabled}
            className={`
              w-full flex items-center gap-3 px-4 py-2.5 text-[14px] transition-all
              ${item.disabled
                ? "opacity-40 cursor-not-allowed text-[var(--color-text-secondary)]"
                : item.danger
                  ? "text-[#FF3257] hover:bg-red-50 dark:hover:bg-red-950/20"
                  : "text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)]"
              }
            `}
          >
            {item.icon && <span className={item.danger ? "text-[#FF3257]" : "text-neutral-300"}>{item.icon}</span>}
            <span className="flex-1 text-left">{item.label}</span>
            {item.shortcut && (
              <span className="text-[11px] font-mono text-[var(--color-text-secondary)] opacity-60">{item.shortcut}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function ContextMenuDemo() {
  const [menuState, setMenuState] = useState<{ open: boolean; anchor: { x: number; y: number } | null }>({ open: false, anchor: null });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = () => setMenuState({ open: false, anchor: null });
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = ref.current?.getBoundingClientRect();
    setMenuState({ open: true, anchor: { x: e.clientX, y: e.clientY } });
  };

  return (
    <div
      ref={ref}
      onContextMenu={handleRightClick}
      className="rounded-xl border-2 border-dashed border-[var(--color-border)] p-10 flex items-center justify-center cursor-context-menu select-none text-[14px] text-[var(--color-text-secondary)]"
    >
      마우스 우클릭 또는 아래 버튼으로 Context Menu 열기
      <Menu open={menuState.open} anchor={menuState.anchor} />
    </div>
  );
}

function DropdownMenuDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        className="flex items-center gap-2 px-4 py-2 rounded-md border border-[var(--color-border)] text-[14px] font-medium text-[var(--color-text-primary)] hover:border-mint-300 transition-all"
      >
        더보기
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-[var(--color-text-secondary)]" fill="currentColor">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-1 bg-[var(--color-bg-base,white)] dark:bg-neutral-600 rounded-xl shadow-elevation-2 border border-[var(--color-border)] py-1 min-w-[200px] z-20"
          onClick={(e) => e.stopPropagation()}
        >
          {MENU_ITEMS.map((item, i) => {
            if (item.divider) return <div key={i} className="my-1 h-px bg-[var(--color-border)]" />;
            return (
              <button
                key={item.label}
                disabled={item.disabled}
                onClick={() => setOpen(false)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-[14px] transition-all ${
                  item.disabled
                    ? "opacity-40 cursor-not-allowed text-[var(--color-text-secondary)]"
                    : item.danger
                      ? "text-[#FF3257] hover:bg-red-50 dark:hover:bg-red-950/20"
                      : "text-[var(--color-text-primary)] hover:bg-[var(--color-bg-subtle)]"
                }`}
              >
                {item.icon && <span className={item.danger ? "text-[#FF3257]" : "text-neutral-300"}>{item.icon}</span>}
                <span className="flex-1 text-left">{item.label}</span>
                {item.shortcut && <span className="text-[11px] font-mono text-[var(--color-text-secondary)] opacity-60">{item.shortcut}</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function MenuPage() {
  return (
    <div className="px-8 py-10 max-w-[960px]">
      <div className="mb-10 pb-8 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-primary)] mb-2">Menu</h1>
        <p className="text-[16px] text-[var(--color-text-secondary)] leading-relaxed max-w-[520px]">
          컨텍스트 액션 목록을 표시하는 오버레이 컴포넌트.
          <br />
          Dropdown Menu / Context Menu 두 가지 패턴.
        </p>
      </div>

      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Dropdown Menu</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">Dropdown Menu 데모</h2>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] p-8 bg-[var(--color-bg-subtle)] flex items-start justify-start">
          <DropdownMenuDemo />
        </div>
      </section>

      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Context Menu</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">Context Menu 데모</h2>
        </div>
        <ContextMenuDemo />
      </section>

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
                { attr: "Radius",        value: "12px",          token: "radius/component/card/sm" },
                { attr: "Shadow",        value: "0 4px 12px",    token: "elevation/surface/overlay" },
                { attr: "Min width",     value: "200px",         token: "—" },
                { attr: "Item height",   value: "44px",          token: "—" },
                { attr: "Item padding",  value: "10px 16px",     token: "space/04" },
                { attr: "Item font",     value: "14px Regular",  token: "type/body/sm" },
                { attr: "Hover bg",      value: "N20 #F4F5F5",   token: "color/bg/subtle" },
                { attr: "Danger text",   value: "#FF3257",       token: "color/status/error" },
                { attr: "Divider",       value: "1px N100",      token: "color/border/default" },
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
