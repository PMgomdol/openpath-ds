"use client";

import { useState } from "react";

// ─── Spec (DESIGN.md)
// Modal: shadow/03 (elevation/surface/sticky), Scrim rgba(21,27,30,0.40)
// Standard: 콘텐츠 옆 고정
// bg: color/bg/default (White Light / N600 Dark)
// item bg Hover: color/bg/subtle N20
// item bg Active: color/bg/brand M20
// item label/icon Active: color/brand/primary M300
// max-width: 360px | item height: 56px | left/right padding: 16px
// item radius: 9999px | label: 14px Medium (type/label/md)

const DRAWER_ITEMS = [
  { section: "메인",   items: ["홈", "대시보드", "분석"] },
  { section: "콘텐츠", items: ["게시글", "미디어", "댓글"] },
  { section: "설정",   items: ["계정", "알림", "개인정보"] },
];

function NavIcon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    홈: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
    대시보드: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
    분석: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z",
    게시글: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z",
    미디어: "M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z",
    댓글: "M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z",
    계정: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
    알림: "M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z",
    개인정보: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z",
  };
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d={paths[name] ?? ""} />
    </svg>
  );
}

function DrawerContent({ onClose, modal }: { onClose: () => void; modal?: boolean }) {
  const [active, setActive] = useState("홈");

  return (
    <div
      style={{
        width: 360,
        maxWidth: "100%",
        height: "100%",
        background: "var(--color-bg-default)",
        boxShadow: "var(--shadow-03, 0 4px 16px rgba(21,27,30,0.12))",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div className="px-4 py-5 border-b border-[var(--color-border-default)]">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-[14px]"
            style={{ background: "var(--color-brand-primary)" }}
          >
            O
          </div>
          <div>
            <p className="text-[14px] font-bold" style={{ color: "var(--color-text-default)" }}>OpenPath</p>
            <p className="text-[11px]" style={{ color: "var(--color-text-subtle)" }}>Design System</p>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <div className="flex-1 overflow-y-auto py-2 px-2">
        {DRAWER_ITEMS.map(({ section, items }) => (
          <div key={section} className="mb-1">
            <p
              className="px-4 py-2 text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-text-subtle)" }}
            >
              {section}
            </p>
            {items.map((item) => {
              const isActive = active === item;
              return (
                <button
                  key={item}
                  onClick={() => { setActive(item); if (modal) onClose(); }}
                  style={{
                    height: 56,
                    borderRadius: 9999,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    paddingLeft: 16,
                    paddingRight: 16,
                    fontSize: 14,
                    fontWeight: 500,
                    letterSpacing: "0.04em",
                    background: isActive ? "var(--color-bg-brand)" : "transparent",
                    color: isActive ? "var(--color-brand-primary)" : "var(--color-text-subtle)",
                    transition: "background 0.15s, color 0.15s",
                    cursor: "pointer",
                    border: "none",
                    textAlign: "left",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "var(--color-bg-subtle)";
                  }}
                  onMouseLeave={e => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  }}
                >
                  <span style={{ color: isActive ? "var(--color-brand-primary)" : "var(--color-text-subtle)" }}>
                    <NavIcon name={item} />
                  </span>
                  {item}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function ModalDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Scrim: rgba(21,27,30,0.40) */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(21,27,30,0.40)" }}
        onClick={onClose}
      />
      <div className="relative z-10" style={{ maxWidth: 360, width: "100%" }}>
        <DrawerContent onClose={onClose} modal />
      </div>
    </div>
  );
}

export default function NavigationDrawerPage() {
  const [standardOpen, setStandardOpen] = useState(true);
  const [modalOpen, setModalOpen]       = useState(false);

  return (
    <div className="px-8 py-10 max-w-[960px]">
      <div className="mb-10 pb-8 border-b border-[var(--color-border-default)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight mb-2" style={{ color: "var(--color-text-default)" }}>
          Navigation Drawer
        </h1>
        <p className="text-[16px] leading-relaxed max-w-[520px]" style={{ color: "var(--color-text-subtle)" }}>
          사이드에서 슬라이드되는 탐색 패널.
          <br />
          <span className="text-mint-400 font-medium">Standard</span> (콘텐츠 옆 고정) ·{" "}
          <span className="text-mint-400 font-medium">Modal</span> (Scrim + 슬라이드 인).
        </p>
      </div>

      {/* Standard */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Standard</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>Standard Drawer</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>max-width 360px · item 56px · radius 9999px</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
          <div className="flex" style={{ minHeight: 360 }}>
            <div
              style={{
                width: standardOpen ? 360 : 0,
                overflow: "hidden",
                transition: "width 0.25s ease",
                flexShrink: 0,
                borderRight: standardOpen ? `1px solid var(--color-border-default)` : "none",
              }}
            >
              {standardOpen && <DrawerContent onClose={() => {}} />}
            </div>
            <div
              className="flex-1 flex flex-col p-6"
              style={{ background: "var(--color-bg-subtle)" }}
            >
              <button
                onClick={() => setStandardOpen(v => !v)}
                className="self-start px-3 py-1.5 rounded-md border text-[13px] font-medium transition-all mb-4 hover:border-mint-300 hover:text-mint-400"
                style={{ borderColor: "var(--color-border-default)", color: "var(--color-text-subtle)" }}
              >
                {standardOpen ? "Drawer 닫기" : "Drawer 열기"}
              </button>
              <div className="flex-1 flex items-center justify-center text-[14px]" style={{ color: "var(--color-text-subtle)" }}>
                메인 콘텐츠 영역
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Modal</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>Modal Drawer</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>Scrim rgba(21,27,30,0.40) · shadow/03</p>
        </div>
        <div
          className="rounded-xl border border-[var(--color-border-default)] p-6 flex items-start"
          style={{ background: "var(--color-bg-subtle)" }}
        >
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 rounded-md text-[14px] font-medium text-white transition-colors hover:opacity-90"
            style={{ background: "var(--color-brand-primary)" }}
          >
            Modal Drawer 열기
          </button>
        </div>
        <ModalDrawer open={modalOpen} onClose={() => setModalOpen(false)} />
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
                { attr: "너비 (최대)",       value: "360px",            token: "—" },
                { attr: "아이템 높이",        value: "56px",             token: "—" },
                { attr: "좌우 패딩",         value: "16px",             token: "space/04" },
                { attr: "아이템 radius",      value: "9999px",           token: "—" },
                { attr: "라벨 폰트",          value: "14px Medium",      token: "type/label/md" },
                { attr: "Active bg",          value: "M20 #F3FCFC",      token: "color/bg/brand" },
                { attr: "Active label/icon",  value: "M300 #28D7D2",     token: "color/brand/primary" },
                { attr: "Hover bg",           value: "N20 #F4F5F5",      token: "color/bg/subtle" },
                { attr: "Shadow (Modal)",     value: "0 4px 16px",       token: "elevation/surface/sticky → shadow/03" },
                { attr: "Scrim",              value: "rgba(21,27,30,0.40)", token: "—" },
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
              {["Active 항목은 항상 1개만", "Modal Drawer는 Scrim 클릭으로 닫기", "아이템 radius 9999px (Pill 형태)", "최대 너비 360px 준수"].map((t, i) => (
                <li key={i} className="flex gap-2 text-[13px]" style={{ color: "var(--color-text-default)" }}>
                  <span className="text-[var(--color-brand-primary)] font-bold shrink-0">✓</span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border-2 p-5" style={{ borderColor: "var(--color-status-error)", background: "var(--color-bg-error)" }}>
            <p className="text-[14px] font-bold mb-3" style={{ color: "var(--color-status-error)" }}>✕ Don't</p>
            <ul className="space-y-2">
              {["여러 항목 동시에 Active", "Scrim 없이 Modal Drawer 표시", "아이템 높이 56px 미만 축소", "Drawer 위에 또 다른 오버레이 표시"].map((t, i) => (
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
