"use client";

import { useState } from "react";

type ListDensity = "Default" | "Dense" | "Comfortable";

const LIST_ITEMS = [
  { primary: "홍길동", secondary: "지난주 대화 · 안녕하세요!", avatar: "홍", badge: "3" },
  { primary: "오픈패스 팀", secondary: "디자인 시스템 업데이트 완료", avatar: "O" },
  { primary: "김민준", secondary: "자료 확인 부탁드립니다.", avatar: "김" },
  { primary: "이서연", secondary: "오늘 회의 일정 공유드립니다.", avatar: "이", badge: "1" },
  { primary: "박지호", secondary: "피드백 반영했습니다!", avatar: "박" },
];

function ListItem({
  primary,
  secondary,
  avatar,
  badge,
  density,
  leading,
  trailing,
  divider,
  active,
  onClick,
}: {
  primary: string;
  secondary?: string;
  avatar?: string;
  badge?: string;
  density?: ListDensity;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  divider?: boolean;
  active?: boolean;
  onClick?: () => void;
}) {
  const py = density === "Dense" ? "py-2" : density === "Comfortable" ? "py-5" : "py-3";

  return (
    <div>
      <button
        onClick={onClick}
        className={`
          w-full flex items-center gap-3 px-4 ${py} transition-all text-left
          ${active
            ? "bg-mint-20 dark:bg-mint-600/20"
            : "hover:bg-[var(--color-bg-subtle)]"}
        `}
      >
        {/* Leading */}
        {leading ?? (avatar && (
          <div className="w-10 h-10 rounded-full bg-mint-100 dark:bg-mint-600/30 flex items-center justify-center text-[14px] font-bold text-mint-500 dark:text-mint-300 shrink-0">
            {avatar}
          </div>
        ))}

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className={`text-[14px] font-medium truncate ${active ? "text-mint-500 dark:text-mint-300" : "text-[var(--color-text-primary)]"}`}>
            {primary}
          </p>
          {secondary && (
            <p className="text-[12px] text-[var(--color-text-secondary)] truncate mt-0.5">{secondary}</p>
          )}
        </div>

        {/* Trailing */}
        {trailing ?? (badge && (
          <span className="w-5 h-5 rounded-full bg-[#FF3257] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
            {badge}
          </span>
        ))}
      </button>
      {divider && <div className="ml-16 mr-4 h-px bg-[var(--color-border)]" />}
    </div>
  );
}

function BasicList({ density = "Default" }: { density?: ListDensity }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
      {LIST_ITEMS.map((item, i) => (
        <ListItem
          key={item.primary}
          {...item}
          density={density}
          divider={i < LIST_ITEMS.length - 1}
          active={active === i}
          onClick={() => setActive(i === active ? null : i)}
        />
      ))}
    </div>
  );
}

function CheckableList() {
  const ITEMS = ["디자인 원칙 검토", "컴포넌트 스펙 확인", "토큰 시스템 정리", "다크모드 테스트", "접근성 감사"];
  const [checked, setChecked] = useState<number[]>([0, 2]);

  const toggle = (i: number) => setChecked((prev) =>
    prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
  );

  return (
    <div className="rounded-xl border border-[var(--color-border)] overflow-hidden">
      {ITEMS.map((item, i) => (
        <ListItem
          key={item}
          primary={item}
          divider={i < ITEMS.length - 1}
          onClick={() => toggle(i)}
          leading={
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
              checked.includes(i)
                ? "bg-mint-300 border-mint-300"
                : "bg-transparent border-neutral-200 dark:border-neutral-400"
            }`}>
              {checked.includes(i) && (
                <svg viewBox="0 0 24 24" className="w-3 h-3" fill="white">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              )}
            </div>
          }
        />
      ))}
    </div>
  );
}

export default function ListPage() {
  const [density, setDensity] = useState<ListDensity>("Default");

  return (
    <div className="px-8 py-10 max-w-[960px]">
      <div className="mb-10 pb-8 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-primary)] mb-2">List</h1>
        <p className="text-[16px] text-[var(--color-text-secondary)] leading-relaxed max-w-[520px]">
          아이템을 세로로 나열하는 기본 목록 컴포넌트.
          <br />
          아바타, 배지, 체크박스 등 다양한 Leading/Trailing 조합.
        </p>
      </div>

      {/* Basic List */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Basic List</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">기본 리스트 (아바타 + 배지)</h2>
        </div>

        {/* Density toggle */}
        <div className="flex gap-2 mb-4">
          {(["Dense", "Default", "Comfortable"] as ListDensity[]).map((d) => (
            <button
              key={d}
              onClick={() => setDensity(d)}
              className={`px-3 py-1.5 rounded-md text-[13px] font-medium border transition-all ${
                density === d
                  ? "bg-mint-300 text-white border-mint-300"
                  : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-mint-300 hover:text-mint-400"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <BasicList density={density} />
      </section>

      {/* Checkable List */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Checkable List</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">체크 리스트</h2>
        </div>
        <CheckableList />
      </section>

      {/* Spec */}
      <section className="mb-16">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Spec</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">스펙 테이블</h2>
        </div>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border)]">
                {["속성", "Dense", "Default", "Comfortable", "Token"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { attr: "Item height",  dense: "40px",  def: "56px",  comfort: "72px",  token: "—" },
                { attr: "Padding V",    dense: "8px",   def: "12px",  comfort: "20px",  token: "space/02 / space/03 / space/05" },
                { attr: "Padding H",    dense: "16px",  def: "16px",  comfort: "16px",  token: "space/04" },
                { attr: "Primary font", dense: "13px",  def: "14px",  comfort: "16px",  token: "type/body/sm → type/body/md" },
                { attr: "Avatar size",  dense: "32px",  def: "40px",  comfort: "48px",  token: "—" },
                { attr: "Active bg",    dense: "M20",   def: "M20",   comfort: "M20",   token: "color/bg/brand" },
                { attr: "Divider",      dense: "N100",  def: "N100",  comfort: "N100",  token: "color/border/default" },
              ].map((row, i) => (
                <tr key={row.attr} className={`border-b border-[var(--color-border)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}>
                  <td className="px-4 py-3 font-medium text-[var(--color-text-primary)]">{row.attr}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-text-secondary)]">{row.dense}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-mint-500">{row.def}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-text-secondary)]">{row.comfort}</td>
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
