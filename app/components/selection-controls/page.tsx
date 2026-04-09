"use client";

import { useState } from "react";

// ─── Checkbox ─────────────────────────────────────────────────
// box: 20×20px, radius 4px, gap 8px, label type/body/md

function Checkbox({
  label,
  disabled,
  indeterminate,
  defaultChecked,
}: {
  label: string;
  disabled?: boolean;
  indeterminate?: boolean;
  defaultChecked?: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked ?? false);
  const [hovered, setHovered] = useState(false);
  const isChecked = indeterminate ? false : checked;
  const showFill  = isChecked || indeterminate;

  const outerBorder = disabled
    ? "border-[var(--color-interactive-disabled)]"
    : showFill
      ? "border-[var(--color-brand-primary)]"
      : hovered
        ? "border-[var(--color-text-subtle)]"        // color/border/hover
        : "border-[var(--color-border-default)]";

  const outerBg = showFill && !disabled
    ? "bg-[var(--color-brand-primary)]"
    : showFill && disabled
      ? "bg-[var(--color-interactive-disabled)]"
      : "bg-transparent";

  return (
    <label
      className={`flex items-center gap-2 cursor-pointer ${disabled ? "cursor-not-allowed" : ""}`}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 40×40 touch area wrapper */}
      <span className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-colors"
        style={{ background: hovered && !disabled && !showFill ? "var(--color-bg-brand)" : undefined }}>
        <button
          type="button"
          role="checkbox"
          aria-checked={indeterminate ? "mixed" : isChecked}
          disabled={disabled}
          onClick={() => !disabled && !indeterminate && setChecked(v => !v)}
          className={`
            w-5 h-5 rounded flex items-center justify-center border-2 transition-all duration-150 shrink-0
            ${outerBorder} ${outerBg}
          `}
        >
          {indeterminate && (
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="white"><path d="M19 13H5v-2h14v2z"/></svg>
          )}
          {isChecked && !indeterminate && (
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          )}
        </button>
      </span>
      <span className={`text-[16px] leading-[1.5] ${disabled ? "text-[var(--color-text-disabled)]" : "text-[var(--color-text-default)]"}`}>
        {label}
      </span>
    </label>
  );
}

// ─── Radio ────────────────────────────────────────────────────
// icon 20px, gap 8px, touch 40×40, label type/body/md

function RadioGroup({ options, disabled }: { options: string[]; disabled?: boolean }) {
  const [selected, setSelected] = useState(options[0]);
  const [hovered, setHovered]   = useState<string | null>(null);

  return (
    <div className="space-y-1">
      {options.map((opt) => {
        const isSelected = selected === opt;
        const isHovered  = hovered === opt;
        const ringColor  = disabled
          ? "border-[var(--color-interactive-disabled)]"
          : isSelected
            ? "border-[var(--color-border-brand)]"
            : isHovered
              ? "border-[var(--color-text-subtle)]"
              : "border-[var(--color-border-default)]";

        return (
          <label
            key={opt}
            className={`flex items-center cursor-pointer ${disabled ? "cursor-not-allowed" : ""}`}
            onMouseEnter={() => !disabled && setHovered(opt)}
            onMouseLeave={() => setHovered(null)}
          >
            <span
              className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 transition-colors"
              style={{ background: isHovered && !disabled && !isSelected ? "var(--color-bg-brand)" : undefined }}
            >
              <button
                type="button"
                disabled={disabled}
                onClick={() => !disabled && setSelected(opt)}
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0 bg-transparent ${ringColor}`}
              >
                {isSelected && (
                  <div className={`w-2.5 h-2.5 rounded-full transition-colors ${disabled ? "bg-[var(--color-interactive-disabled)]" : "bg-[var(--color-brand-primary)]"}`} />
                )}
              </button>
            </span>
            <span className={`text-[16px] leading-[1.5] ${disabled ? "text-[var(--color-text-disabled)]" : "text-[var(--color-text-default)]"}`}>
              {opt}
            </span>
          </label>
        );
      })}
    </div>
  );
}

// ─── Switch ───────────────────────────────────────────────────
// Track: 52×32px, radius 9999px
// Thumb Off: 24px / On·Pressed: 28px

function Switch({
  label,
  defaultOn,
  disabled,
}: {
  label: string;
  defaultOn?: boolean;
  disabled?: boolean;
}) {
  const [on, setOn]         = useState(defaultOn ?? false);
  const [hovered, setHover] = useState(false);
  const [pressed, setPress] = useState(false);

  const thumbSize = (on && pressed) || pressed ? 28 : on ? 28 : 24;
  const thumbOffset = on ? `calc(100% - ${thumbSize}px - 4px)` : "4px";

  const trackBg = disabled
    ? "var(--color-interactive-disabled)"
    : on
      ? hovered
        ? "var(--color-interactive-hover)"
        : "var(--color-brand-primary)"
      : hovered
        ? "var(--color-text-subtle)"
        : "var(--color-border-default)";

  const thumbBg = disabled ? "var(--color-bg-subtle)" : "#FFFFFF";

  return (
    <label
      className={`flex items-center gap-2 cursor-pointer select-none ${disabled ? "cursor-not-allowed" : ""}`}
      onMouseEnter={() => !disabled && setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
    >
      <button
        type="button"
        role="switch"
        aria-checked={on}
        disabled={disabled}
        onClick={() => !disabled && setOn(v => !v)}
        onMouseDown={() => !disabled && setPress(true)}
        onMouseUp={() => setPress(false)}
        style={{ background: trackBg, width: 52, height: 32, borderRadius: 9999 }}
        className="relative shrink-0 transition-colors duration-200"
      >
        <span
          className="absolute top-1/2 -translate-y-1/2 rounded-full shadow-sm transition-all duration-200"
          style={{
            width: thumbSize,
            height: thumbSize,
            left: thumbOffset,
            background: thumbBg,
          }}
        />
      </button>
      <span className={`text-[16px] leading-[1.5] ${disabled ? "text-[var(--color-text-disabled)]" : "text-[var(--color-text-default)]"}`}>
        {label}
      </span>
    </label>
  );
}

// ─── Do/Don't ─────────────────────────────────────────────────

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
            <li key={i} className="flex gap-2 text-[13px] text-red-700 dark:text-red-300">
              <span className="font-bold shrink-0" style={{ color: "var(--color-status-error)" }}>✕</span>{d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ─── Spec Table ───────────────────────────────────────────────

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
              <td className="px-4 py-3"><code className="text-[11px] font-mono text-mint-500 dark:text-mint-300">{row.token}</code></td>
              <td className="px-4 py-3 font-mono text-[12px]" style={{ color: "var(--color-text-subtle)" }}>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────

export default function SelectionControlsPage() {
  return (
    <div className="px-8 py-10 max-w-[960px]">
      {/* 헤더 */}
      <div className="mb-10 pb-8 border-b border-[var(--color-border-default)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight mb-2" style={{ color: "var(--color-text-default)" }}>
          Selection Controls
        </h1>
        <p className="text-[16px] leading-relaxed max-w-[520px]" style={{ color: "var(--color-text-subtle)" }}>
          사용자의 선택을 받는 컨트롤 컴포넌트.
          <br />
          <span className="text-mint-400 font-medium">Checkbox</span> ·{" "}
          <span className="text-mint-400 font-medium">Radio</span> ·{" "}
          <span className="text-mint-400 font-medium">Switch</span>
        </p>
        {/* 언제 무엇을 */}
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
                  <td className="px-4 py-2.5 font-semibold text-mint-500 dark:text-mint-300">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Checkbox ── */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Checkbox</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>체크박스</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>박스 20×20px · radius 4px · 라벨 간격 8px</p>
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
            <div className="space-y-1">
              <Checkbox label="전체 선택" indeterminate />
              <Checkbox label="하위 항목 A" defaultChecked />
              <Checkbox label="하위 항목 B" />
            </div>
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
          { attr: "박스 크기",         token: "—",                           value: "20×20px" },
          { attr: "박스 radius",       token: "—",                           value: "4px" },
          { attr: "라벨 간격",         token: "space/02",                    value: "8px" },
          { attr: "터치 영역",         token: "—",                           value: "40×40px" },
          { attr: "라벨 폰트",         token: "type/body/md",                value: "16px Regular" },
          { attr: "박스 bg (Selected)", token: "color/brand/primary",        value: "M300 #28D7D2" },
          { attr: "박스 border (기본)", token: "color/border/default",       value: "N100 #D8DCDE" },
          { attr: "박스 border (Hover)", token: "color/text/subtle",         value: "N300 #889298" },
          { attr: "비활성",            token: "color/interactive/disabled",  value: "N100 #D8DCDE" },
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
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Radio</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>라디오 버튼</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>아이콘 20px · 간격 8px · 터치 영역 40×40px</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5 mb-6">
          <div className="rounded-xl border border-[var(--color-border-default)] p-5" style={{ background: "var(--color-bg-subtle)" }}>
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-text-subtle)" }}>Default</p>
            <RadioGroup options={["옵션 A", "옵션 B", "옵션 C"]} />
          </div>
          <div className="rounded-xl border border-[var(--color-border-default)] p-5" style={{ background: "var(--color-bg-subtle)" }}>
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-text-subtle)" }}>Disabled</p>
            <RadioGroup options={["비활성 A", "비활성 B", "비활성 C"]} disabled />
          </div>
        </div>
        <SpecTable rows={[
          { attr: "아이콘 크기",      token: "—",                          value: "20px" },
          { attr: "라벨 간격",        token: "space/02",                   value: "8px" },
          { attr: "터치 영역",        token: "—",                          value: "40×40px" },
          { attr: "라벨 폰트",        token: "type/body/md",               value: "16px Regular" },
          { attr: "외곽선 (기본)",    token: "color/border/default",       value: "N100 #D8DCDE" },
          { attr: "외곽선 (Hover)",   token: "color/text/subtle",          value: "N300 #889298" },
          { attr: "외곽선 (Selected)",token: "color/border/brand",         value: "M300 #28D7D2" },
          { attr: "내부 점 (Selected)",token: "color/brand/primary",       value: "M300 #28D7D2" },
          { attr: "비활성",           token: "color/interactive/disabled", value: "N100 #D8DCDE" },
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
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Switch</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>스위치</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>Track 52×32px · Thumb Off 24px / On·Pressed 28px</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5 mb-6">
          <div className="rounded-xl border border-[var(--color-border-default)] p-5" style={{ background: "var(--color-bg-subtle)" }}>
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-text-subtle)" }}>Default</p>
            <div className="space-y-4">
              <Switch label="알림 받기" />
              <Switch label="다크 모드" defaultOn />
              <Switch label="자동 저장" defaultOn />
            </div>
          </div>
          <div className="rounded-xl border border-[var(--color-border-default)] p-5" style={{ background: "var(--color-bg-subtle)" }}>
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-4" style={{ color: "var(--color-text-subtle)" }}>Disabled</p>
            <div className="space-y-4">
              <Switch label="비활성 (Off)" disabled />
              <Switch label="비활성 (On)" disabled defaultOn />
            </div>
          </div>
        </div>
        <SpecTable rows={[
          { attr: "Track 크기",          token: "—",                          value: "52×32px" },
          { attr: "Track radius",         token: "—",                          value: "9999px" },
          { attr: "Thumb 크기 (Off)",     token: "—",                          value: "24px" },
          { attr: "Thumb 크기 (On/Pressed)", token: "—",                       value: "28px" },
          { attr: "터치 영역",            token: "—",                          value: "52×40px" },
          { attr: "라벨 간격",            token: "space/02",                   value: "8px" },
          { attr: "Track (Off)",          token: "color/border/default",       value: "N100 #D8DCDE" },
          { attr: "Track (Off Hover)",    token: "color/text/subtle",          value: "N300 #889298" },
          { attr: "Track (On)",           token: "color/brand/primary",        value: "M300 #28D7D2" },
          { attr: "Track (On Hover)",     token: "color/interactive/hover",    value: "M400 #1BB8B3" },
          { attr: "Track (Disabled)",     token: "color/interactive/disabled", value: "N100 #D8DCDE" },
          { attr: "Thumb (On/Off)",       token: "—",                          value: "White #FFFFFF" },
          { attr: "Thumb (Disabled)",     token: "color/bg/subtle",            value: "N20 #F4F5F5" },
        ]} />
        <div className="mt-5">
          <DosDonts
            dos={["설정 변경이 즉시 반영될 때 사용", "On/Off 두 상태만 있을 때 사용"]}
            donts={["폼 안에 Switch 넣고 제출 후 반영", "3가지 이상 상태가 필요한 경우 Switch 사용"]}
          />
        </div>
      </section>
    </div>
  );
}
