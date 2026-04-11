"use client";

import { useState } from "react";
import Radio from "@/components/ui/Radio";
import Checkbox from "@/components/ui/Checkbox";
import Switch from "@/components/ui/Switch";

// ─── Helpers ──────────────────────────────────────────────────

function SpecTable({ rows }: { rows: { attr: string; token: string; value: string }[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-b border-[var(--color-border-default)]" style={{ background: "var(--color-bg-subtle)" }}>
            {["속성", "Token", "Value"].map(h => (
              <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--color-text-subtle)" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.attr} className="border-b border-[var(--color-border-default)] last:border-0" style={{ background: i % 2 === 1 ? "var(--color-bg-subtle)" : undefined }}>
              <td className="px-4 py-3 font-medium" style={{ color: "var(--color-text-default)" }}>{row.attr}</td>
              <td className="px-4 py-3"><code className="text-[11px] font-mono text-[var(--color-interactive-pressed)]">{row.token}</code></td>
              <td className="px-4 py-3 font-mono text-[12px]" style={{ color: "var(--color-text-subtle)" }}>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DosDonts({ dos, donts }: { dos: string[]; donts: string[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="rounded-xl border-2 border-[var(--color-border-brand)] p-5" style={{ background: "var(--color-bg-brand)" }}>
        <p className="text-[14px] font-bold text-[var(--color-brand-primary)] mb-3">✓ Do</p>
        <ul className="space-y-2">
          {dos.map((d, i) => (
            <li key={i} className="flex gap-2 text-[13px]" style={{ color: "var(--color-text-default)" }}>
              <span className="text-[var(--color-brand-primary)] font-bold shrink-0">✓</span>{d}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border-2 p-5" style={{ borderColor: "var(--color-status-error)", background: "var(--color-bg-error)" }}>
        <p className="text-[14px] font-bold mb-3" style={{ color: "var(--color-status-error)" }}>✕ Don't</p>
        <ul className="space-y-2">
          {donts.map((d, i) => (
            <li key={i} className="flex gap-2 text-[13px]" style={{ color: "var(--color-status-error)" }}>
              <span className="font-bold shrink-0">✕</span>{d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Parent Checkbox that controls indeterminate state of children
function IndeterminateDemo() {
  const [childA, setChildA] = useState(true);
  const [childB, setChildB] = useState(false);

  const allChecked = childA && childB;
  const someChecked = childA || childB;

  return (
    <div className="space-y-1">
      <Checkbox
        label="전체 선택"
        checked={allChecked}
        indeterminate={someChecked && !allChecked}
        onChange={() => {
          const next = !allChecked;
          setChildA(next);
          setChildB(next);
        }}
      />
      <div className="pl-10 space-y-1">
        <Checkbox label="하위 항목 A" checked={childA} onChange={e => setChildA(e.target.checked)} />
        <Checkbox label="하위 항목 B" checked={childB} onChange={e => setChildB(e.target.checked)} />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────

export default function SelectionControlsPage() {
  return (
    <div className="px-8 py-10 max-w-[960px]">
      {/* Header */}
      <div className="mb-10 pb-8 border-b border-[var(--color-border-default)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[var(--color-brand-primary)]" />
          <span className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight mb-2" style={{ color: "var(--color-text-default)" }}>
          Selection Controls
        </h1>
        <p className="text-[16px] leading-relaxed max-w-[520px]" style={{ color: "var(--color-text-subtle)" }}>
          사용자의 선택을 받는 컨트롤 컴포넌트.
          <br />
          <span className="text-[var(--color-brand-primary)] font-medium">Checkbox</span> ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">Radio</span> ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">Switch</span>
        </p>
        {/* When to use which */}
        <div className="mt-5 overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-[var(--color-border-default)]" style={{ background: "var(--color-bg-subtle)" }}>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--color-text-subtle)" }}>상황</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--color-text-subtle)" }}>컴포넌트</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["여러 개 중 하나만 선택", "Radio"],
                ["여러 개 중 복수 선택 가능", "Checkbox"],
                ["제출 없이 즉시 반영되는 ON/OFF", "Switch"],
                ["제출 후 반영되는 ON/OFF", "Checkbox"],
              ].map(([s, c], i) => (
                <tr key={s} className="border-b border-[var(--color-border-default)] last:border-0" style={{ background: i % 2 === 1 ? "var(--color-bg-subtle)" : undefined }}>
                  <td className="px-4 py-2.5" style={{ color: "var(--color-text-default)" }}>{s}</td>
                  <td className="px-4 py-2.5 font-semibold text-[var(--color-interactive-pressed)]">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Checkbox ── */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Checkbox</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>체크박스</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>박스 20×20px · radius 4px · 라벨 간격 8px · 터치 영역 48dp</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-5 mb-6">
          <div className="rounded-xl border border-[var(--color-border-default)] p-5" style={{ background: "var(--color-bg-subtle)" }}>
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-text-subtle)" }}>Default</p>
            <div className="space-y-1">
              <Checkbox label="선택 항목 A" />
              <Checkbox label="선택 항목 B" defaultChecked />
              <Checkbox label="선택 항목 C" />
            </div>
          </div>
          <div className="rounded-xl border border-[var(--color-border-default)] p-5" style={{ background: "var(--color-bg-subtle)" }}>
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-text-subtle)" }}>Indeterminate</p>
            <IndeterminateDemo />
          </div>
          <div className="rounded-xl border border-[var(--color-border-default)] p-5" style={{ background: "var(--color-bg-subtle)" }}>
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-text-subtle)" }}>Disabled</p>
            <div className="space-y-1">
              <Checkbox label="비활성 (Unselected)" disabled />
              <Checkbox label="비활성 (Selected)" disabled defaultChecked />
            </div>
          </div>
        </div>
        <SpecTable rows={[
          { attr: "박스 크기",            token: "—",                           value: "20×20px" },
          { attr: "박스 radius",          token: "—",                           value: "4px" },
          { attr: "라벨 간격",            token: "space/02",                    value: "8px" },
          { attr: "터치 영역",            token: "—",                           value: "48×48px" },
          { attr: "라벨 폰트",            token: "type/body/md",                value: "16px Regular" },
          { attr: "박스 bg (Selected)",   token: "color/brand/primary",         value: "M300 #28D7D2" },
          { attr: "박스 border (기본)",   token: "color/border/default",        value: "N100 #D8DCDE" },
          { attr: "박스 border (Hover)",  token: "color/border/hover",          value: "N300 #889298" },
          { attr: "비활성",               token: "color/interactive/disabled",  value: "N100 #D8DCDE" },
        ]} />
        <div className="mt-5">
          <DosDonts
            dos={["복수 선택 또는 단일 동의(약관)에 사용", "Indeterminate는 전체선택 부모 항목에만 사용", "폼 제출 후 반영되는 토글에 사용"]}
            donts={["즉시 반영되는 설정에 Checkbox 사용 (Switch 사용)", "Indeterminate를 단독 컴포넌트로 사용", "제출 없이 바로 반영돼야 할 때 Checkbox 사용"]}
          />
        </div>
      </section>

      {/* ── Radio ── */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Radio</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>라디오 버튼</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>아이콘 20px · 간격 8px · 터치 영역 48dp</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5 mb-6">
          <div className="rounded-xl border border-[var(--color-border-default)] p-5" style={{ background: "var(--color-bg-subtle)" }}>
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-text-subtle)" }}>Default</p>
            <div className="space-y-1">
              <Radio name="demo-radio" label="옵션 A" defaultChecked />
              <Radio name="demo-radio" label="옵션 B" />
              <Radio name="demo-radio" label="옵션 C" />
            </div>
          </div>
          <div className="rounded-xl border border-[var(--color-border-default)] p-5" style={{ background: "var(--color-bg-subtle)" }}>
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-text-subtle)" }}>Disabled</p>
            <div className="space-y-1">
              <Radio name="demo-radio-disabled" label="비활성 A" defaultChecked disabled />
              <Radio name="demo-radio-disabled" label="비활성 B" disabled />
              <Radio name="demo-radio-disabled" label="비활성 C" disabled />
            </div>
          </div>
        </div>
        <SpecTable rows={[
          { attr: "아이콘 크기",       token: "—",                          value: "20px" },
          { attr: "라벨 간격",         token: "space/02",                   value: "8px" },
          { attr: "터치 영역",         token: "—",                          value: "48×48px" },
          { attr: "라벨 폰트",         token: "type/body/md",               value: "16px Regular" },
          { attr: "외곽선 (기본)",     token: "color/border/default",       value: "N100 #D8DCDE" },
          { attr: "외곽선 (Hover)",    token: "color/border/hover",         value: "N300 #889298" },
          { attr: "외곽선 (Selected)", token: "color/border/brand",         value: "M300 #28D7D2" },
          { attr: "내부 점 (Selected)",token: "color/brand/primary",        value: "M300 #28D7D2" },
          { attr: "비활성",            token: "color/interactive/disabled", value: "N100 #D8DCDE" },
        ]} />
        <div className="mt-5">
          <DosDonts
            dos={["선택지 2개 이상일 때만 Radio 사용", "기본값(default selected) 항상 지정", "선택지는 상호 배타적으로 구성"]}
            donts={["선택지가 1개일 때 Radio 사용 (Checkbox 사용)", "아무것도 선택 안 된 상태로 두기", "중복 선택 가능한 경우 Radio 사용"]}
          />
        </div>
      </section>

      {/* ── Switch ── */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">Switch</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>스위치</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>Track 52×32px · Thumb Off 24px / On 28px · 터치 영역 52×48dp</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5 mb-6">
          <div className="rounded-xl border border-[var(--color-border-default)] p-5" style={{ background: "var(--color-bg-subtle)" }}>
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-text-subtle)" }}>Default</p>
            <div className="space-y-4">
              <Switch label="알림 받기" />
              <Switch label="다크 모드" defaultChecked />
              <Switch label="자동 저장" defaultChecked />
            </div>
          </div>
          <div className="rounded-xl border border-[var(--color-border-default)] p-5" style={{ background: "var(--color-bg-subtle)" }}>
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-text-subtle)" }}>Disabled</p>
            <div className="space-y-4">
              <Switch label="비활성 (Off)" disabled />
              <Switch label="비활성 (On)" disabled defaultChecked />
            </div>
          </div>
        </div>
        <SpecTable rows={[
          { attr: "Track 크기",              token: "—",                          value: "52×32px" },
          { attr: "Track radius",             token: "—",                          value: "9999px" },
          { attr: "Thumb 크기 (Off)",         token: "—",                          value: "24px" },
          { attr: "Thumb 크기 (On/Pressed)",  token: "—",                          value: "28px" },
          { attr: "터치 영역",                token: "—",                          value: "52×48px" },
          { attr: "라벨 간격",                token: "space/02",                   value: "8px" },
          { attr: "Track (Off)",              token: "color/border/default",       value: "N100 #D8DCDE" },
          { attr: "Track (Off Hover)",        token: "color/border/hover",         value: "N300 #889298" },
          { attr: "Track (On)",               token: "color/brand/primary",        value: "M300 #28D7D2" },
          { attr: "Track (On Hover)",         token: "color/interactive/hover",    value: "M400 #1BB8B3" },
          { attr: "Track (Disabled)",         token: "color/interactive/disabled", value: "N100 #D8DCDE" },
          { attr: "Thumb (On/Off)",           token: "—",                          value: "White #FFFFFF" },
          { attr: "Thumb (Disabled)",         token: "color/bg/subtle",            value: "N20 #F4F5F5" },
        ]} />
        <div className="mt-5">
          <DosDonts
            dos={["설정 변경이 즉시 반영될 때 사용", "On/Off 두 상태만 있을 때 사용", "라벨은 항상 현재 상태 기준으로 작성"]}
            donts={["폼 안에 Switch 넣고 제출 후 반영", "3가지 이상 상태가 필요한 경우 Switch 사용", "\"알림을 켜시겠습니까?\" 같은 질문형 라벨"]}
          />
        </div>
      </section>
    </div>
  );
}
