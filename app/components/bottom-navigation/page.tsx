"use client";

import { useState } from "react";
import BottomNavigation from "@/components/ui/BottomNavigation";
import type { BottomNavItem } from "@/components/ui/BottomNavigation";
import { Home, Search, Heart, Bell, User } from "lucide-react";

// ── 공통 아이템 팩토리 (badge는 wrapper에서 주입) ────────────────
function makeItems(badgeKey?: string, badgeCount?: number): BottomNavItem[] {
  return [
    { key: "home",          icon: <Home size={24} />,   label: "홈" },
    { key: "search",        icon: <Search size={24} />, label: "탐색" },
    { key: "favorite",      icon: <Heart size={24} />,  label: "즐겨찾기" },
    { key: "notifications", icon: <Bell size={24} />,   label: "알림",   badge: badgeKey === "notifications" ? badgeCount : undefined },
    { key: "profile",       icon: <User size={24} />,   label: "프로필" },
  ];
}

// ── 상태 래퍼: 탭 전환 가능한 독립 데모 블록 ─────────────────────
function NavDemo({
  items,
  defaultKey = "home",
}: {
  items: BottomNavItem[];
  defaultKey?: string;
}) {
  const [active, setActive] = useState(defaultKey);
  return (
    <BottomNavigation
      items={items}
      activeKey={active}
      onChange={setActive}
      aria-label="데모 내비게이션"
    />
  );
}

export default function BottomNavigationPage() {
  return (
    <div className="px-8 py-10 max-w-[960px]">
      {/* Header */}
      <div className="mb-10 pb-8 border-b border-[var(--color-border-default)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]" />
          <span className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-default)] mb-2">Bottom Navigation</h1>
        <p className="text-[16px] text-[var(--color-text-subtle)] leading-relaxed max-w-[520px]">
          모바일 하단 고정 탐색 컴포넌트. M3 Active Indicator 패턴 적용.
          <br />
          <span className="text-[var(--color-brand-primary)] font-medium">64×32dp Pill indicator</span> ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">80dp 높이</span> · 3~5개 탭
        </p>
      </div>

      {/* 5-tab default */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Default — 5 Tabs</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">5개 탭 (라이브)</h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            탭을 클릭해 Active 전환을 확인하세요. Active Indicator는 64×32dp Pill.
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
          <div className="h-32 flex items-center justify-center text-[13px] bg-[var(--color-bg-subtle)] text-[var(--color-text-subtle)]">
            콘텐츠 영역
          </div>
          <NavDemo items={makeItems()} />
        </div>
      </section>

      {/* 3-tab */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">3 Tabs</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">3개 탭 (최소)</h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">M3 기준 최소 3개, 최대 5개.</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
          <div className="h-24 flex items-center justify-center text-[13px] bg-[var(--color-bg-subtle)] text-[var(--color-text-subtle)]">
            콘텐츠 영역
          </div>
          <NavDemo items={makeItems().slice(0, 3)} />
        </div>
      </section>

      {/* Badge */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Badge</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">Badge 포함</h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            알림 탭에 badge: 3 · <code className="font-mono text-[11px] px-1 py-0.5 bg-[var(--color-bg-subtle)] rounded">color/status/error #FF3257</code> · 99+ 처리
          </p>
        </div>
        <div className="rounded-xl border border-[var(--color-border-default)] overflow-hidden">
          <div className="h-24 flex items-center justify-center text-[13px] bg-[var(--color-bg-subtle)] text-[var(--color-text-subtle)]">
            콘텐츠 영역
          </div>
          <NavDemo items={makeItems("notifications", 3)} defaultKey="home" />
        </div>
      </section>

      {/* Spec Table */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Spec</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">스펙 테이블</h2>
        </div>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border-default)]">
                {["속성", "Value", "Token"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-bold text-[var(--color-text-subtle)] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { attr: "높이",               value: "80dp",          token: "—" },
                { attr: "아이콘 크기",         value: "24dp",          token: "—" },
                { attr: "Active indicator",   value: "64dp × 32dp",   token: "—" },
                { attr: "Indicator shape",    value: "9999dp (Pill)", token: "shape/full" },
                { attr: "Indicator bg",       value: "M20 #F3FCFC",   token: "color/bg/brand" },
                { attr: "라벨 폰트",           value: "12px Medium",   token: "type/label/md" },
                { attr: "Active 아이콘·라벨",  value: "M300 #28D7D2",  token: "color/brand/primary" },
                { attr: "Inactive 아이콘·라벨",value: "N300 #889298",  token: "color/text/subtle" },
                { attr: "Background",         value: "White / N600",  token: "color/bg/default" },
                { attr: "Border top",         value: "1px",           token: "color/border/default" },
                { attr: "Badge bg",           value: "#FF3257",       token: "color/status/error" },
                { attr: "탭 개수",             value: "3~5개",         token: "—" },
                { attr: "ARIA",               value: "role=tablist, role=tab, aria-selected", token: "—" },
              ].map((row, i) => (
                <tr key={row.attr} className={`border-b border-[var(--color-border-default)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}>
                  <td className="px-4 py-3 font-medium text-[var(--color-text-default)]">{row.attr}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-brand-primary)]">{row.value}</td>
                  <td className="px-4 py-3">
                    {row.token !== "—"
                      ? <code className="text-[11px] font-mono text-[var(--color-text-subtle)]">{row.token}</code>
                      : <span className="text-[var(--color-text-disabled)]">—</span>
                    }
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
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Guidelines</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">Do / Don&apos;t</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border-2 border-[var(--color-border-brand)] p-5 bg-[var(--color-bg-brand)]">
            <p className="text-[14px] font-bold text-[var(--color-brand-primary)] mb-3">✓ Do</p>
            <ul className="space-y-2">
              {[
                "탭 3~5개 유지",
                "라벨은 1단어, 짧고 명확하게",
                "Active 탭은 항상 1개만",
                "알림 표시는 반드시 Badge 사용",
              ].map((t) => (
                <li key={t} className="flex gap-2 text-[13px] text-[var(--color-text-default)]">
                  <span className="text-[var(--color-brand-primary)] font-bold shrink-0">›</span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border-2 p-5 bg-[var(--color-bg-error)]" style={{ borderColor: "var(--color-status-error)" }}>
            <p className="text-[14px] font-bold mb-3 text-[var(--color-status-error)]">✕ Don&apos;t</p>
            <ul className="space-y-2">
              {[
                "탭 2개 이하 또는 6개 이상",
                "긴 라벨로 탭 간격 붕괴",
                "색상만으로 Active 표현 (indicator 필수)",
                "스크롤 시 Bottom Nav가 가려지게 배치",
              ].map((t) => (
                <li key={t} className="flex gap-2 text-[13px] text-[var(--color-text-default)]">
                  <span className="text-[var(--color-status-error)] font-bold shrink-0">›</span>{t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
