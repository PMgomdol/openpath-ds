"use client";

import { useState } from "react";

// ─── Spec (DESIGN.md)
// Types: Single-line 48px / Two-line 64px / Three-line 88px
// Leading → 텍스트 간격: 16px (space/04)
// Leading 아이콘: 24px
// 좌우 패딩: 16px (space/04)
// 제목: 16px Regular (type/body/md)
// 서브텍스트: 14px Regular (type/body/sm)
// bg Default: color/bg/default
// bg Hover: color/bg/subtle N20
// bg Active/Selected: color/bg/brand M20
// title: color/text/default N600
// subtext: color/text/subtle N300
// icon (leading) Active: color/brand/primary M300
// divider: color/border/default N100 (마지막 아이템 아래 생략)

const AVATARS = ["홍", "O", "김", "이", "박"];

interface ListItemData {
  primary: string;
  secondary?: string;
  tertiary?: string;
  avatar?: string;
  badge?: string | number;
  trailing?: string;
}

const SINGLE_LINE_ITEMS: ListItemData[] = [
  { primary: "디자인 원칙 검토",      avatar: AVATARS[0] },
  { primary: "컴포넌트 스펙 확인",    avatar: AVATARS[1] },
  { primary: "토큰 시스템 정리",      avatar: AVATARS[2] },
  { primary: "다크모드 테스트",       avatar: AVATARS[3] },
  { primary: "접근성 감사",           avatar: AVATARS[4] },
];

const TWO_LINE_ITEMS: ListItemData[] = [
  { primary: "홍길동",       secondary: "지난주 대화 · 안녕하세요!",        avatar: AVATARS[0], badge: 3 },
  { primary: "오픈패스 팀",  secondary: "디자인 시스템 업데이트 완료",      avatar: AVATARS[1] },
  { primary: "김민준",       secondary: "자료 확인 부탁드립니다.",           avatar: AVATARS[2] },
  { primary: "이서연",       secondary: "오늘 회의 일정 공유드립니다.",      avatar: AVATARS[3], badge: 1 },
  { primary: "박지호",       secondary: "피드백 반영했습니다!",             avatar: AVATARS[4] },
];

const THREE_LINE_ITEMS: ListItemData[] = [
  {
    primary: "홍길동",
    secondary: "지난주 대화 · 안녕하세요! 오늘 미팅 일정 확인 부탁드립니다.",
    tertiary: "2026.04.08",
    avatar: AVATARS[0],
    trailing: "오전 9:30",
  },
  {
    primary: "오픈패스 팀",
    secondary: "디자인 시스템 업데이트 완료됐습니다. 새 컴포넌트를 확인해보세요.",
    tertiary: "2026.04.07",
    avatar: AVATARS[1],
    trailing: "어제",
  },
  {
    primary: "김민준",
    secondary: "제출된 자료 검토 후 피드백 드리겠습니다. 내일까지 확인 가능합니다.",
    tertiary: "2026.04.06",
    avatar: AVATARS[2],
    trailing: "월요일",
  },
];

function Avatar({ char, active }: { char: string; active?: boolean }) {
  return (
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 9999,
        background: active ? "var(--color-bg-brand)" : "var(--color-bg-subtle)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        fontWeight: 700,
        color: active ? "var(--color-brand-primary)" : "var(--color-text-subtle)",
        flexShrink: 0,
        transition: "background 0.15s, color 0.15s",
      }}
    >
      {char}
    </div>
  );
}

function SingleLineItem({
  item,
  active,
  divider,
  onClick,
}: {
  item: ListItemData;
  active: boolean;
  divider: boolean;
  onClick: () => void;
}) {
  return (
    <div>
      <button
        onClick={onClick}
        style={{
          width: "100%",
          height: 48,
          display: "flex",
          alignItems: "center",
          gap: 16,
          paddingLeft: 16,
          paddingRight: 16,
          background: active ? "var(--color-bg-brand)" : "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          transition: "background 0.15s",
        }}
        onMouseEnter={e => {
          if (!active) (e.currentTarget as HTMLButtonElement).style.background = "var(--color-bg-subtle)";
        }}
        onMouseLeave={e => {
          if (!active) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        }}
      >
        {item.avatar && <Avatar char={item.avatar} active={active} />}
        <span
          style={{
            flex: 1,
            fontSize: 16,
            fontWeight: 400,
            color: active ? "var(--color-brand-primary)" : "var(--color-text-default)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.primary}
        </span>
      </button>
      {divider && <div style={{ marginLeft: 72, marginRight: 16, height: 1, background: "var(--color-border-default)" }} />}
    </div>
  );
}

function TwoLineItem({
  item,
  active,
  divider,
  onClick,
}: {
  item: ListItemData;
  active: boolean;
  divider: boolean;
  onClick: () => void;
}) {
  return (
    <div>
      <button
        onClick={onClick}
        style={{
          width: "100%",
          height: 64,
          display: "flex",
          alignItems: "center",
          gap: 16,
          paddingLeft: 16,
          paddingRight: 16,
          background: active ? "var(--color-bg-brand)" : "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          transition: "background 0.15s",
        }}
        onMouseEnter={e => {
          if (!active) (e.currentTarget as HTMLButtonElement).style.background = "var(--color-bg-subtle)";
        }}
        onMouseLeave={e => {
          if (!active) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        }}
      >
        {item.avatar && <Avatar char={item.avatar} active={active} />}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <p style={{
            fontSize: 16,
            fontWeight: 400,
            color: active ? "var(--color-brand-primary)" : "var(--color-text-default)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            margin: 0,
          }}>
            {item.primary}
          </p>
          <p style={{
            fontSize: 14,
            fontWeight: 400,
            color: "var(--color-text-subtle)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            margin: "2px 0 0",
          }}>
            {item.secondary}
          </p>
        </div>
        {item.badge && (
          <span style={{
            width: 20,
            height: 20,
            borderRadius: 9999,
            background: "var(--color-status-error)",
            color: "#FFFFFF",
            fontSize: 10,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            {item.badge}
          </span>
        )}
      </button>
      {divider && <div style={{ marginLeft: 72, marginRight: 16, height: 1, background: "var(--color-border-default)" }} />}
    </div>
  );
}

function ThreeLineItem({
  item,
  active,
  divider,
  onClick,
}: {
  item: ListItemData;
  active: boolean;
  divider: boolean;
  onClick: () => void;
}) {
  return (
    <div>
      <button
        onClick={onClick}
        style={{
          width: "100%",
          height: 88,
          display: "flex",
          alignItems: "flex-start",
          gap: 16,
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 12,
          paddingBottom: 12,
          background: active ? "var(--color-bg-brand)" : "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          transition: "background 0.15s",
        }}
        onMouseEnter={e => {
          if (!active) (e.currentTarget as HTMLButtonElement).style.background = "var(--color-bg-subtle)";
        }}
        onMouseLeave={e => {
          if (!active) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
        }}
      >
        {item.avatar && <Avatar char={item.avatar} active={active} />}
        <div style={{ flex: 1, overflow: "hidden" }}>
          <p style={{
            fontSize: 16,
            fontWeight: 400,
            color: active ? "var(--color-brand-primary)" : "var(--color-text-default)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            margin: 0,
          }}>
            {item.primary}
          </p>
          <p style={{
            fontSize: 14,
            fontWeight: 400,
            color: "var(--color-text-subtle)",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            margin: "2px 0 0",
            lineHeight: 1.5,
          }}>
            {item.secondary}
          </p>
        </div>
        {item.trailing && (
          <span style={{ fontSize: 12, color: "var(--color-text-subtle)", flexShrink: 0, marginTop: 2 }}>
            {item.trailing}
          </span>
        )}
      </button>
      {divider && <div style={{ marginLeft: 72, marginRight: 16, height: 1, background: "var(--color-border-default)" }} />}
    </div>
  );
}

function CheckableList() {
  const ITEMS = ["디자인 원칙 검토", "컴포넌트 스펙 확인", "토큰 시스템 정리", "다크모드 테스트", "접근성 감사"];
  const [checked, setChecked] = useState<number[]>([0, 2]);

  return (
    <div className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
      {ITEMS.map((item, i) => {
        const isChecked = checked.includes(i);
        const isLast = i === ITEMS.length - 1;
        return (
          <div key={item}>
            <button
              onClick={() => setChecked(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])}
              style={{
                width: "100%",
                height: 48,
                display: "flex",
                alignItems: "center",
                gap: 16,
                paddingLeft: 16,
                paddingRight: 16,
                background: isChecked ? "var(--color-bg-brand)" : "transparent",
                border: "none",
                cursor: "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => {
                if (!isChecked) (e.currentTarget as HTMLButtonElement).style.background = "var(--color-bg-subtle)";
              }}
              onMouseLeave={e => {
                if (!isChecked) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
            >
              {/* Checkbox 20×20px, radius 4px */}
              <div style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                border: isChecked ? "none" : "2px solid var(--color-border-default)",
                background: isChecked ? "var(--color-brand-primary)" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.15s",
              }}>
                {isChecked && (
                  <svg viewBox="0 0 24 24" fill="white" style={{ width: 12, height: 12 }}>
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                )}
              </div>
              <span style={{
                fontSize: 16,
                fontWeight: 400,
                color: isChecked ? "var(--color-brand-primary)" : "var(--color-text-default)",
                flex: 1,
                textAlign: "left",
              }}>
                {item}
              </span>
            </button>
            {!isLast && <div style={{ marginLeft: 52, marginRight: 16, height: 1, background: "var(--color-border-default)" }} />}
          </div>
        );
      })}
    </div>
  );
}

export default function ListPage() {
  const [singleActive, setSingleActive] = useState<number | null>(null);
  const [twoActive,    setTwoActive]    = useState<number | null>(null);
  const [threeActive,  setThreeActive]  = useState<number | null>(null);

  return (
    <div className="px-8 py-10 max-w-[960px]">
      <div className="mb-10 pb-8 border-b border-[var(--color-border-default)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight mb-2" style={{ color: "var(--color-text-default)" }}>
          List
        </h1>
        <p className="text-[16px] leading-relaxed max-w-[520px]" style={{ color: "var(--color-text-subtle)" }}>
          아이템을 세로로 나열하는 기본 목록 컴포넌트.
          <br />
          <span className="text-mint-400 font-medium">Single 48px</span> ·{" "}
          <span className="text-mint-400 font-medium">Two-line 64px</span> ·{" "}
          <span className="text-mint-400 font-medium">Three-line 88px</span>.
        </p>
      </div>

      {/* Single-line */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Single-line</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>Single-line List (48px)</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>제목만 · 16px Regular · 클릭으로 Active 상태 토글</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
          {SINGLE_LINE_ITEMS.map((item, i) => (
            <SingleLineItem
              key={item.primary}
              item={item}
              active={singleActive === i}
              divider={i < SINGLE_LINE_ITEMS.length - 1}
              onClick={() => setSingleActive(singleActive === i ? null : i)}
            />
          ))}
        </div>
      </section>

      {/* Two-line */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Two-line</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>Two-line List (64px)</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>제목 16px + 서브텍스트 14px · 배지 포함</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
          {TWO_LINE_ITEMS.map((item, i) => (
            <TwoLineItem
              key={item.primary}
              item={item}
              active={twoActive === i}
              divider={i < TWO_LINE_ITEMS.length - 1}
              onClick={() => setTwoActive(twoActive === i ? null : i)}
            />
          ))}
        </div>
      </section>

      {/* Three-line */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Three-line</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>Three-line List (88px)</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>제목 + 서브텍스트 2줄 · Trailing 시간 표시</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
          {THREE_LINE_ITEMS.map((item, i) => (
            <ThreeLineItem
              key={item.primary}
              item={item}
              active={threeActive === i}
              divider={i < THREE_LINE_ITEMS.length - 1}
              onClick={() => setThreeActive(threeActive === i ? null : i)}
            />
          ))}
        </div>
      </section>

      {/* Checkable */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Checkable</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>체크 리스트</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>Leading: Checkbox 20×20px, radius 4px</p>
        </div>
        <CheckableList />
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
                {["속성", "Single-line", "Two-line", "Three-line", "Token"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--color-text-subtle)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { attr: "아이템 높이",   s: "48px",   t: "64px",  th: "88px",  token: "—" },
                { attr: "좌우 패딩",     s: "16px",   t: "16px",  th: "16px",  token: "space/04" },
                { attr: "Leading 아이콘", s: "24px",  t: "24px",  th: "24px",  token: "—" },
                { attr: "Leading→텍스트 간격", s: "16px", t: "16px", th: "16px", token: "space/04" },
                { attr: "제목 폰트",     s: "16px Regular", t: "16px Regular", th: "16px Regular", token: "type/body/md" },
                { attr: "서브텍스트",    s: "—",      t: "14px Regular", th: "14px Regular", token: "type/body/sm" },
                { attr: "Active bg",    s: "M20",    t: "M20",   th: "M20",   token: "color/bg/brand" },
                { attr: "Hover bg",     s: "N20",    t: "N20",   th: "N20",   token: "color/bg/subtle" },
                { attr: "Divider",      s: "N100",   t: "N100",  th: "N100",  token: "color/border/default" },
              ].map((row, i) => (
                <tr key={row.attr} className="border-b border-[var(--color-border-default)] last:border-0" style={{ background: i % 2 === 1 ? "var(--color-bg-subtle)" : undefined }}>
                  <td className="px-4 py-3 font-medium" style={{ color: "var(--color-text-default)" }}>{row.attr}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-mint-500">{row.s}</td>
                  <td className="px-4 py-3 font-mono text-[12px]" style={{ color: "var(--color-text-subtle)" }}>{row.t}</td>
                  <td className="px-4 py-3 font-mono text-[12px]" style={{ color: "var(--color-text-subtle)" }}>{row.th}</td>
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
              {["같은 List 안에서 Leading 요소 타입 통일", "Divider는 마지막 아이템 아래 생략", "Active 시 color/bg/brand 표시", "Leading 아이콘 Active는 color/brand/primary"].map((t, i) => (
                <li key={i} className="flex gap-2 text-[13px]" style={{ color: "var(--color-text-default)" }}>
                  <span className="text-[var(--color-brand-primary)] font-bold shrink-0">✓</span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border-2 p-5" style={{ borderColor: "rgba(255,50,87,0.3)", background: "#FFF0F3" }}>
            <p className="text-[14px] font-bold mb-3" style={{ color: "var(--color-status-error)" }}>✕ Don't</p>
            <ul className="space-y-2">
              {["아이콘/아바타/체크박스 혼용", "모든 아이템 아래 Divider 표시", "제목을 14px 미만으로 축소", "Three-line 아이템에 4줄 이상 서브텍스트"].map((t, i) => (
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
