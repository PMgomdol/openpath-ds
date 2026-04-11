"use client";

import { useState } from "react";
import {
  Inbox,
  Star,
  Send,
  FileText,
  Trash2,
  Bell,
  ChevronRight,
  Settings,
  User,
  Shield,
  Moon,
  Wifi,
} from "lucide-react";
import { List } from "@/components/ui/List";
import ListItem from "@/components/ui/List";
import type { ListLeading, ListTrailing } from "@/components/ui/List";

// ── Single-line + Leading Icon ──────────────────────────────────

const NAV_ITEMS: { icon: React.ReactNode; label: string }[] = [
  { icon: <Inbox    size={24} />, label: "받은 편지함" },
  { icon: <Star     size={24} />, label: "중요" },
  { icon: <Send     size={24} />, label: "보낸 편지함" },
  { icon: <FileText size={24} />, label: "임시보관함" },
  { icon: <Trash2   size={24} />, label: "휴지통" },
];

function SingleIconDemo() {
  const [active, setActive] = useState<number | null>(0);
  return (
    <List className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
      {NAV_ITEMS.map((item, i) => (
        <ListItem
          key={item.label}
          primary={item.label}
          leading={{ type: "icon", node: item.icon } satisfies ListLeading}
          selected={active === i}
          divider={i < NAV_ITEMS.length - 1}
          onClick={() => setActive(i)}
          trailing={
            active === i
              ? ({ type: "icon", node: <ChevronRight size={16} /> } satisfies ListTrailing)
              : undefined
          }
        />
      ))}
    </List>
  );
}

// ── Single-line + Leading Avatar ────────────────────────────────

const AVATAR_ITEMS = [
  { initials: "홍", name: "홍길동" },
  { initials: "O",  name: "오픈패스 팀" },
  { initials: "김", name: "김민준" },
  { initials: "이", name: "이서연" },
  { initials: "박", name: "박지호" },
];

function SingleAvatarDemo() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <List className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
      {AVATAR_ITEMS.map((item, i) => (
        <ListItem
          key={item.name}
          primary={item.name}
          leading={{ type: "avatar", text: item.initials } satisfies ListLeading}
          selected={active === i}
          divider={i < AVATAR_ITEMS.length - 1}
          onClick={() => setActive(active === i ? null : i)}
        />
      ))}
    </List>
  );
}

// ── Two-line + Avatar + Trailing text ──────────────────────────

const TWO_LINE_ITEMS = [
  { initials: "홍", name: "홍길동",    sub: "지난주 대화 · 안녕하세요!",         time: "오전 9:30" },
  { initials: "O",  name: "오픈패스",  sub: "디자인 시스템 업데이트 완료됐습니다.", time: "어제"   },
  { initials: "김", name: "김민준",    sub: "자료 확인 부탁드립니다.",             time: "월요일" },
  { initials: "이", name: "이서연",    sub: "오늘 회의 일정 공유드립니다.",         time: "화요일" },
  { initials: "박", name: "박지호",    sub: "피드백 반영했습니다!",               time: "수요일" },
];

function TwoLineDemo() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <List className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
      {TWO_LINE_ITEMS.map((item, i) => (
        <ListItem
          key={item.name}
          variant="two"
          primary={item.name}
          secondary={item.sub}
          leading={{ type: "avatar", text: item.initials } satisfies ListLeading}
          trailing={{ type: "text", text: item.time } satisfies ListTrailing}
          selected={active === i}
          divider={i < TWO_LINE_ITEMS.length - 1}
          onClick={() => setActive(active === i ? null : i)}
        />
      ))}
    </List>
  );
}

// ── Three-line + Avatar + Trailing text ────────────────────────

const THREE_LINE_ITEMS = [
  {
    initials: "홍",
    name: "홍길동",
    sub: "지난주 대화 · 안녕하세요! 오늘 미팅 일정 확인 부탁드립니다.",
    time: "오전 9:30",
  },
  {
    initials: "O",
    name: "오픈패스 팀",
    sub: "디자인 시스템 업데이트 완료됐습니다. 새 컴포넌트를 확인해보세요.",
    time: "어제",
  },
  {
    initials: "김",
    name: "김민준",
    sub: "제출된 자료 검토 후 피드백 드리겠습니다. 내일까지 확인 가능합니다.",
    time: "월요일",
  },
];

function ThreeLineDemo() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <List className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
      {THREE_LINE_ITEMS.map((item, i) => (
        <ListItem
          key={item.name}
          variant="three"
          primary={item.name}
          secondary={item.sub}
          leading={{ type: "avatar", text: item.initials } satisfies ListLeading}
          trailing={{ type: "text", text: item.time } satisfies ListTrailing}
          selected={active === i}
          divider={i < THREE_LINE_ITEMS.length - 1}
          onClick={() => setActive(active === i ? null : i)}
        />
      ))}
    </List>
  );
}

// ── Checkbox list ──────────────────────────────────────────────

const CHECK_ITEMS = [
  "디자인 원칙 검토",
  "컴포넌트 스펙 확인",
  "토큰 시스템 정리",
  "다크모드 테스트",
  "접근성 감사",
];

function CheckboxDemo() {
  const [checked, setChecked] = useState<number[]>([0, 2]);
  const toggle = (i: number) =>
    setChecked((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  return (
    <List className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
      {CHECK_ITEMS.map((label, i) => (
        <ListItem
          key={label}
          primary={label}
          leading={
            { type: "checkbox", checked: checked.includes(i) } satisfies ListLeading
          }
          selected={checked.includes(i)}
          divider={i < CHECK_ITEMS.length - 1}
          onClick={() => toggle(i)}
        />
      ))}
    </List>
  );
}

// ── Radio list ─────────────────────────────────────────────────

const QUALITY_OPTIONS = ["최대", "높음", "보통", "낮음", "자동"];

function RadioDemo() {
  const [selected, setSelected] = useState(2);
  return (
    <List className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
      {QUALITY_OPTIONS.map((label, i) => (
        <ListItem
          key={label}
          primary={label}
          leading={
            { type: "radio", checked: selected === i } satisfies ListLeading
          }
          selected={selected === i}
          divider={i < QUALITY_OPTIONS.length - 1}
          onClick={() => setSelected(i)}
        />
      ))}
    </List>
  );
}

// ── Settings list: Icon + Switch trailing ──────────────────────

function SettingsDemo() {
  const [switches, setSwitches] = useState([true, false, true, false]);
  const toggle = (i: number) =>
    setSwitches((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const SETTINGS: { icon: React.ReactNode; label: string; sub: string }[] = [
    { icon: <Bell   size={24} />, label: "알림",       sub: "앱 푸시 알림 받기" },
    { icon: <Moon   size={24} />, label: "다크모드",   sub: "화면 테마를 어둡게" },
    { icon: <Wifi   size={24} />, label: "Wi-Fi 전용", sub: "모바일 데이터 절약" },
    { icon: <Shield size={24} />, label: "보안 잠금",  sub: "생체 인증 사용" },
  ];

  return (
    <List className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
      {SETTINGS.map((item, i) => (
        <ListItem
          key={item.label}
          variant="two"
          primary={item.label}
          secondary={item.sub}
          leading={{ type: "icon", node: item.icon } satisfies ListLeading}
          trailing={
            {
              type: "switch",
              on: switches[i],
              onToggle: () => toggle(i),
              label: `${item.label} 토글`,
            } satisfies ListTrailing
          }
          divider={i < SETTINGS.length - 1}
        />
      ))}
    </List>
  );
}

// ── Disabled examples ──────────────────────────────────────────

function DisabledDemo() {
  const ITEMS: { icon: React.ReactNode; label: string; disabled: boolean }[] = [
    { icon: <User     size={24} />, label: "프로필 편집",   disabled: false },
    { icon: <Settings size={24} />, label: "고급 설정 (준비 중)", disabled: true },
    { icon: <Shield   size={24} />, label: "보안 설정",     disabled: false },
  ];
  return (
    <List className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
      {ITEMS.map((item, i) => (
        <ListItem
          key={item.label}
          primary={item.label}
          leading={{ type: "icon", node: item.icon } satisfies ListLeading}
          disabled={item.disabled}
          divider={i < ITEMS.length - 1}
          onClick={item.disabled ? undefined : () => {}}
        />
      ))}
    </List>
  );
}

// ── Page ───────────────────────────────────────────────────────

export default function ListPage() {
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
          List
        </h1>
        <p className="text-[16px] text-[var(--color-text-subtle)] leading-relaxed max-w-[540px]">
          아이템을 세로로 나열하는 기본 목록 컴포넌트.
          <br />
          <span className="text-[var(--color-brand-primary)] font-medium">
            Single 48px
          </span>{" "}
          ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">
            Two-line 64px
          </span>{" "}
          ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">
            Three-line 88px
          </span>{" "}
          · Leading(아이콘/아바타/Checkbox/Radio) ·
          Trailing(아이콘/텍스트/Switch)
        </p>
      </div>

      {/* Single-line · Icon leading */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Single-line · Leading Icon
          </p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
            Single-line (48px) — 아이콘 Leading
          </h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            클릭으로 선택 · 아이콘 24px · Active: 색상 변경 + Trailing 화살표
          </p>
        </div>
        <SingleIconDemo />
      </section>

      {/* Single-line · Avatar leading */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Single-line · Leading Avatar
          </p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
            Single-line (48px) — 아바타 Leading
          </h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            이니셜 40px 원형 아바타 · Active: bg-brand + 텍스트 brand-primary
          </p>
        </div>
        <SingleAvatarDemo />
      </section>

      {/* Two-line */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Two-line
          </p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
            Two-line (64px)
          </h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            제목 16px + 서브텍스트 14px · Trailing 시간 텍스트
          </p>
        </div>
        <TwoLineDemo />
      </section>

      {/* Three-line */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Three-line
          </p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
            Three-line (88px)
          </h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            서브텍스트 2줄 말줄임 (-webkit-line-clamp: 2)
          </p>
        </div>
        <ThreeLineDemo />
      </section>

      {/* Checkbox */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Leading Checkbox
          </p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
            Checkbox List
          </h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            20×20px · radius 4px · 항목 클릭으로 체크 토글
          </p>
        </div>
        <CheckboxDemo />
      </section>

      {/* Radio */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Leading Radio
          </p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
            Radio List
          </h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            단일 선택 · 20px 원형 · 내부 10px 점
          </p>
        </div>
        <RadioDemo />
      </section>

      {/* Switch trailing */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Trailing Switch
          </p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
            설정 목록 — Icon + Switch
          </h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            Two-line · Switch role=&quot;switch&quot; · 아이콘 클릭과 독립 동작
          </p>
        </div>
        <SettingsDemo />
      </section>

      {/* Disabled */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Disabled
          </p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
            Disabled 상태
          </h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            color/text/disabled 사용 · opacity 아닌 토큰으로 처리
          </p>
        </div>
        <DisabledDemo />
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
                {["속성", "Value", "Token"].map((h) => (
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
                { attr: "Single-line 높이",    value: "48px",            token: "—" },
                { attr: "Two-line 높이",       value: "64px",            token: "—" },
                { attr: "Three-line 높이",     value: "88px",            token: "—" },
                { attr: "좌우 패딩",           value: "16px",            token: "space/04" },
                { attr: "Leading 아이콘",      value: "24px",            token: "—" },
                { attr: "Avatar 크기",         value: "40px",            token: "—" },
                { attr: "Checkbox / Radio",    value: "20px",            token: "—" },
                { attr: "Leading → 텍스트 gap", value: "16px",           token: "space/04" },
                { attr: "제목 폰트",           value: "16px Regular",    token: "type/body/md" },
                { attr: "서브텍스트 폰트",     value: "14px Regular",    token: "type/body/sm" },
                { attr: "bg Hover",            value: "N20 #F4F5F5",     token: "color/bg/subtle" },
                { attr: "bg Selected",         value: "M20 #F3FCFC",     token: "color/bg/brand" },
                { attr: "icon Selected",       value: "M300 #28D7D2",    token: "color/brand/primary" },
                { attr: "Switch 너비",         value: "44px",            token: "—" },
                { attr: "Switch 높이",         value: "24px",            token: "—" },
                { attr: "Divider",             value: "1px",             token: "color/border/default" },
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
                "같은 List 안에서 Leading 요소 타입 통일",
                "Divider는 마지막 아이템 아래 생략",
                "Three-line 서브텍스트 2줄 말줄임",
                "Switch는 독립 버튼으로 구현 (role=switch)",
                "Disabled: color/text/disabled 토큰 사용",
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
                "아이콘·아바타·체크박스 혼용",
                "모든 아이템 아래 Divider 표시",
                "제목 16px 미만으로 축소",
                "Disabled에 opacity 0.5 사용",
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
    </div>
  );
}
