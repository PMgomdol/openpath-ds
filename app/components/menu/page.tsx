"use client";

import { useState, useEffect } from "react";

// ─── Spec (DESIGN.md)
// shadow: elevation/surface/overlay → shadow/02 (0 2px 8px)
// bg: color/bg/default (White Light / N600 Dark)
// item bg Hover: color/bg/subtle N20
// item bg Pressed: color/bg/brand M20
// item label: 16px Regular (type/body/md)
// item label Disabled: color/text/disabled N100
// item label Destructive: color/status/error #FF3257
// divider: color/border/default N100
// min-width: 112px | max-width: 280px | item height: 48px
// padding H: 16px | radius: 8px

type MenuItem = {
  label: string;
  icon?: React.ReactNode;
  shortcut?: string;
  danger?: boolean;
  divider?: boolean;
  disabled?: boolean;
};

const MENU_ITEMS: MenuItem[] = [
  {
    label: "편집하기",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>,
    shortcut: "⌘E",
  },
  {
    label: "복제하기",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>,
    shortcut: "⌘D",
  },
  {
    label: "공유하기",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>,
  },
  { label: "내보내기", disabled: true },
  { label: "", divider: true },
  {
    label: "삭제하기",
    icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>,
    danger: true,
    shortcut: "⌘⌫",
  },
];

function MenuList({ onClose }: { onClose?: () => void }) {
  return (
    <div
      style={{
        background: "var(--color-bg-default)",
        borderRadius: 8,
        boxShadow: "var(--shadow-02, 0 2px 8px rgba(21,27,30,0.12))",
        minWidth: 112,
        maxWidth: 280,
        padding: "4px 0",
        border: "1px solid var(--color-border-default)",
      }}
    >
      {MENU_ITEMS.map((item, i) => {
        if (item.divider) {
          return (
            <div
              key={i}
              style={{ height: 1, margin: "4px 0", background: "var(--color-border-default)" }}
            />
          );
        }
        return (
          <button
            key={item.label}
            disabled={item.disabled}
            onClick={() => onClose?.()}
            style={{
              width: "100%",
              height: 48,
              display: "flex",
              alignItems: "center",
              gap: 12,
              paddingLeft: 16,
              paddingRight: 16,
              fontSize: 16,
              fontWeight: 400,
              color: item.disabled
                ? "var(--color-text-disabled)"
                : item.danger
                  ? "var(--color-status-error)"
                  : "var(--color-text-default)",
              background: "transparent",
              border: "none",
              cursor: item.disabled ? "not-allowed" : "pointer",
              transition: "background 0.1s",
              textAlign: "left",
            }}
            onMouseEnter={e => {
              if (!item.disabled) (e.currentTarget as HTMLButtonElement).style.background = "var(--color-bg-subtle)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            }}
            onMouseDown={e => {
              if (!item.disabled) (e.currentTarget as HTMLButtonElement).style.background = "var(--color-bg-brand)";
            }}
            onMouseUp={e => {
              if (!item.disabled) (e.currentTarget as HTMLButtonElement).style.background = "var(--color-bg-subtle)";
            }}
          >
            {item.icon && (
              <span style={{ color: item.danger ? "var(--color-status-error)" : "var(--color-text-subtle)", flexShrink: 0 }}>
                {item.icon}
              </span>
            )}
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.shortcut && (
              <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--color-text-subtle)", opacity: 0.6 }}>
                {item.shortcut}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function DropdownDemo() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [open]);

  return (
    <div className="relative inline-block">
      <button
        onClick={e => { e.stopPropagation(); setOpen(v => !v); }}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border text-[14px] font-medium transition-all hover:border-mint-300 hover:text-mint-400"
        style={{ borderColor: "var(--color-border-default)", color: "var(--color-text-default)" }}
      >
        더보기
        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
      </button>
      {open && (
        <div
          className="absolute top-full left-0 mt-1 z-20"
          onClick={e => e.stopPropagation()}
        >
          <MenuList onClose={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}

function ContextMenuDemo() {
  const [anchor, setAnchor] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!anchor) return;
    const close = () => setAnchor(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [anchor]);

  return (
    <div
      onContextMenu={e => {
        e.preventDefault();
        e.stopPropagation();
        setAnchor({ x: e.clientX, y: e.clientY });
      }}
      className="rounded-xl border-2 border-dashed p-10 flex items-center justify-center cursor-context-menu select-none text-[14px]"
      style={{ borderColor: "var(--color-border-default)", color: "var(--color-text-subtle)" }}
    >
      마우스 우클릭으로 Context Menu 열기
      {anchor && (
        <div
          className="fixed z-50"
          style={{ top: anchor.y, left: anchor.x }}
          onClick={e => e.stopPropagation()}
        >
          <MenuList onClose={() => setAnchor(null)} />
        </div>
      )}
    </div>
  );
}

export default function MenuPage() {
  return (
    <div className="px-8 py-10 max-w-[960px]">
      <div className="mb-10 pb-8 border-b border-[var(--color-border-default)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight mb-2" style={{ color: "var(--color-text-default)" }}>
          Menu
        </h1>
        <p className="text-[16px] leading-relaxed max-w-[520px]" style={{ color: "var(--color-text-subtle)" }}>
          컨텍스트 액션 목록을 표시하는 오버레이 컴포넌트.
          <br />
          <span className="text-mint-400 font-medium">shadow/02</span> ·{" "}
          <span className="text-mint-400 font-medium">radius 8px</span> · 아이템 높이 48px.
        </p>
      </div>

      {/* Dropdown */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Dropdown Menu</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>Dropdown Menu 데모</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>버튼 클릭 → 드롭다운 메뉴 표시</p>
        </div>
        <div
          className="rounded-xl border border-[var(--color-border-default)] p-8 flex items-start"
          style={{ background: "var(--color-bg-subtle)" }}
        >
          <DropdownDemo />
        </div>
      </section>

      {/* Context Menu */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Context Menu</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>Context Menu 데모</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>영역 우클릭 → Context Menu 표시</p>
        </div>
        <ContextMenuDemo />
      </section>

      {/* Static Gallery */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Static Preview</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>정적 미리보기</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>항목 구성: 일반 · Disabled · 구분선 · Destructive</p>
        </div>
        <div
          className="rounded-xl border border-[var(--color-border-default)] p-6 flex"
          style={{ background: "var(--color-bg-subtle)" }}
        >
          <MenuList />
        </div>
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
                { attr: "최소 너비",       value: "112px",           token: "—" },
                { attr: "최대 너비",       value: "280px",           token: "—" },
                { attr: "아이템 높이",     value: "48px",            token: "—" },
                { attr: "좌우 패딩",       value: "16px",            token: "space/04" },
                { attr: "Radius",          value: "8px",             token: "—" },
                { attr: "라벨 폰트",       value: "16px Regular",    token: "type/body/md" },
                { attr: "Shadow",          value: "0 2px 8px",       token: "elevation/surface/overlay → shadow/02" },
                { attr: "Background",      value: "White / N600",    token: "color/bg/default" },
                { attr: "Hover bg",        value: "N20 #F4F5F5",     token: "color/bg/subtle" },
                { attr: "Pressed bg",      value: "M20 #F3FCFC",     token: "color/bg/brand" },
                { attr: "Disabled 텍스트", value: "N100 #D8DCDE",    token: "color/text/disabled" },
                { attr: "Destructive 텍스트", value: "#FF3257",      token: "color/status/error" },
                { attr: "Divider",         value: "1px N100",        token: "color/border/default" },
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
              {["Destructive 액션은 하단 + 빨간 텍스트", "항목 5개 이하 권장", "비활성 항목은 color/text/disabled 사용", "Pressed 시 color/bg/brand 표시"].map((t, i) => (
                <li key={i} className="flex gap-2 text-[13px]" style={{ color: "var(--color-text-default)" }}>
                  <span className="text-[var(--color-brand-primary)] font-bold shrink-0">✓</span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border-2 p-5" style={{ borderColor: "var(--color-status-error)", background: "var(--color-bg-error)" }}>
            <p className="text-[14px] font-bold mb-3" style={{ color: "var(--color-status-error)" }}>✕ Don't</p>
            <ul className="space-y-2">
              {["Destructive 항목을 상단 배치", "항목 7개 이상 나열", "아이템 높이 48px 미만 축소", "라벨에 긴 문장 사용"].map((t, i) => (
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
