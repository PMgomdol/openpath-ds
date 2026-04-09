"use client";

import { useState } from "react";

const DRAWER_ITEMS = [
  { section: "메인", items: ["홈", "대시보드", "분석"] },
  { section: "콘텐츠", items: ["게시글", "미디어", "댓글"] },
  { section: "설정", items: ["계정", "알림", "개인정보"] },
];

function NavigationDrawer({ open, onClose, modal }: { open: boolean; onClose: () => void; modal?: boolean }) {
  const [active, setActive] = useState("홈");

  const icons: Record<string, React.ReactNode> = {
    "홈": <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>,
    "대시보드": <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>,
    "분석": <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>,
    "게시글": <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>,
    "미디어": <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>,
    "댓글": <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z"/></svg>,
    "계정": <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>,
    "알림": <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>,
    "개인정보": <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>,
  };

  const drawerContent = (
    <div className="w-[280px] h-full bg-[var(--color-bg-base,white)] dark:bg-neutral-600 shadow-[0_4px_16px_0_rgba(21,27,30,0.12)] flex flex-col">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-mint-300 flex items-center justify-center text-white font-bold text-[14px]">O</div>
          <div>
            <p className="text-[14px] font-bold text-[var(--color-text-primary)]">OpenPath</p>
            <p className="text-[11px] text-[var(--color-text-secondary)]">Design System</p>
          </div>
        </div>
      </div>

      {/* Nav Items */}
      <div className="flex-1 overflow-y-auto py-2">
        {DRAWER_ITEMS.map(({ section, items }) => (
          <div key={section} className="mb-2">
            <p className="px-5 py-2 text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest">{section}</p>
            {items.map((item) => (
              <button
                key={item}
                onClick={() => { setActive(item); if (modal) onClose(); }}
                className={`
                  w-full flex items-center gap-3 px-5 py-2.5 text-[14px] font-medium transition-all
                  ${active === item
                    ? "bg-mint-20 dark:bg-mint-600/20 text-mint-500 dark:text-mint-300"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-subtle)] hover:text-[var(--color-text-primary)]"}
                `}
              >
                <span className={active === item ? "text-mint-400" : "text-neutral-300"}>{icons[item]}</span>
                {item}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  if (modal) {
    if (!open) return null;
    return (
      <div className="fixed inset-0 z-50 flex">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <div className="relative z-10">{drawerContent}</div>
      </div>
    );
  }

  return (
    <div className={`transition-all duration-300 overflow-hidden ${open ? "w-[280px]" : "w-0"}`}>
      {drawerContent}
    </div>
  );
}

export default function NavigationDrawerPage() {
  const [permanentOpen, setPermanentOpen] = useState(true);
  const [modalOpen, setModalOpen]         = useState(false);

  return (
    <div className="px-8 py-10 max-w-[960px]">
      <div className="mb-10 pb-8 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-primary)] mb-2">Navigation Drawer</h1>
        <p className="text-[16px] text-[var(--color-text-secondary)] leading-relaxed max-w-[520px]">
          사이드에서 슬라이드되는 탐색 패널.
          <br />
          Permanent (상시 표시) / Modal (오버레이) 두 가지 모드.
        </p>
      </div>

      {/* Permanent */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Permanent Mode</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">Permanent Drawer</h2>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
          <div className="flex">
            <NavigationDrawer open={permanentOpen} onClose={() => {}} />
            <div className="flex-1 p-6 bg-[var(--color-bg-subtle)] min-h-[320px] flex flex-col">
              <button
                onClick={() => setPermanentOpen((v) => !v)}
                className="self-start px-3 py-1.5 rounded-md border border-[var(--color-border)] text-[13px] font-medium text-[var(--color-text-secondary)] hover:border-mint-300 hover:text-mint-400 transition-all mb-4"
              >
                {permanentOpen ? "Drawer 닫기" : "Drawer 열기"}
              </button>
              <div className="flex-1 flex items-center justify-center text-[14px] text-[var(--color-text-secondary)]">
                메인 콘텐츠 영역
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Modal Mode</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">Modal Drawer</h2>
        </div>
        <div className="rounded-xl border border-[var(--color-border)] p-6 bg-[var(--color-bg-subtle)]">
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 rounded-md bg-mint-300 text-white text-[14px] font-medium hover:bg-mint-400 transition-colors"
          >
            Modal Drawer 열기
          </button>
        </div>
        <NavigationDrawer open={modalOpen} onClose={() => setModalOpen(false)} modal />
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
                { attr: "Width",          value: "280px",         token: "—" },
                { attr: "Elevation",      value: "sticky Level 3", token: "elevation/surface/sticky" },
                { attr: "Active item bg", value: "M20 #F3FCFC",   token: "color/bg/brand" },
                { attr: "Active text",    value: "M500 #0F9490",  token: "color/interactive/pressed" },
                { attr: "Item font",      value: "14px Medium",   token: "type/label/md" },
                { attr: "Section font",   value: "11px Semibold", token: "type/caption" },
                { attr: "Item padding",   value: "10px 20px",     token: "space/05 / space/04" },
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
