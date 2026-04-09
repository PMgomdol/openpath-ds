"use client";

import { useState } from "react";

// ─── Checkbox ─────────────────────────────────────────────────
function Checkbox({ label, disabled, indeterminate }: { label: string; disabled?: boolean; indeterminate?: boolean }) {
  const [checked, setChecked] = useState(false);
  const isChecked = indeterminate ? false : checked;

  return (
    <label className={`flex items-center gap-3 cursor-pointer ${disabled ? "cursor-not-allowed opacity-50" : ""}`}>
      <button
        type="button"
        role="checkbox"
        aria-checked={indeterminate ? "mixed" : isChecked}
        disabled={disabled}
        onClick={() => !disabled && setChecked((v) => !v)}
        className={`
          w-5 h-5 rounded flex items-center justify-center border-2 transition-all duration-150 shrink-0
          ${isChecked || indeterminate
            ? "bg-mint-300 border-mint-300"
            : "bg-transparent border-neutral-200 dark:border-neutral-400"}
          ${!disabled && !isChecked && !indeterminate ? "hover:border-mint-300" : ""}
        `}
      >
        {indeterminate ? (
          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="white"><path d="M19 13H5v-2h14v2z"/></svg>
        ) : isChecked ? (
          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        ) : null}
      </button>
      <span className={`text-[14px] ${disabled ? "text-neutral-200" : "text-[var(--color-text-primary)]"}`}>{label}</span>
    </label>
  );
}

// ─── Radio ────────────────────────────────────────────────────
function RadioGroup({ options, disabled }: { options: string[]; disabled?: boolean }) {
  const [selected, setSelected] = useState(options[0]);
  return (
    <div className="space-y-3">
      {options.map((opt) => (
        <label key={opt} className={`flex items-center gap-3 cursor-pointer ${disabled ? "cursor-not-allowed" : ""}`}>
          <button
            type="button"
            disabled={disabled}
            onClick={() => !disabled && setSelected(opt)}
            className={`
              w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0
              ${selected === opt
                ? "border-mint-300 bg-white dark:bg-neutral-600"
                : "border-neutral-200 dark:border-neutral-400"}
              ${disabled ? "opacity-50" : !( selected === opt) ? "hover:border-mint-300" : ""}
            `}
          >
            {selected === opt && (
              <div className="w-2.5 h-2.5 rounded-full bg-mint-300" />
            )}
          </button>
          <span className={`text-[14px] ${disabled ? "text-neutral-200 opacity-50" : "text-[var(--color-text-primary)]"}`}>{opt}</span>
        </label>
      ))}
    </div>
  );
}

// ─── Toggle (Switch) ──────────────────────────────────────────
function Toggle({ label, defaultOn, disabled }: { label: string; defaultOn?: boolean; disabled?: boolean }) {
  const [on, setOn] = useState(defaultOn ?? false);
  return (
    <label className={`flex items-center gap-3 cursor-pointer ${disabled ? "cursor-not-allowed" : ""}`}>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        disabled={disabled}
        onClick={() => !disabled && setOn((v) => !v)}
        className={`
          relative w-11 h-6 rounded-full transition-all duration-200 shrink-0
          ${on
            ? (disabled ? "bg-neutral-100" : "bg-mint-300")
            : (disabled ? "bg-neutral-100" : "bg-neutral-200 dark:bg-neutral-400")}
        `}
      >
        <span className={`
          absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200
          ${on ? "translate-x-6" : "translate-x-1"}
        `} />
      </button>
      <span className={`text-[14px] ${disabled ? "text-neutral-200" : "text-[var(--color-text-primary)]"}`}>{label}</span>
    </label>
  );
}

export default function SelectionControlsPage() {
  return (
    <div className="px-8 py-10 max-w-[960px]">
      <div className="mb-10 pb-8 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-primary)] mb-2">Selection Controls</h1>
        <p className="text-[16px] text-[var(--color-text-secondary)] leading-relaxed max-w-[520px]">
          사용자의 선택을 받는 컨트롤 컴포넌트 집합.
          <br />
          <span className="text-mint-400 font-medium">Checkbox</span> ·{" "}
          <span className="text-mint-400 font-medium">Radio</span> ·{" "}
          <span className="text-mint-400 font-medium">Toggle (Switch)</span>
        </p>
      </div>

      {/* Checkbox */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Checkbox</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">체크박스</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="rounded-xl border border-[var(--color-border)] p-5 bg-[var(--color-bg-subtle)]">
            <p className="text-[11px] text-[var(--color-text-secondary)] mb-4 uppercase tracking-widest font-semibold">Default</p>
            <div className="space-y-4">
              <Checkbox label="선택 항목 A" />
              <Checkbox label="선택 항목 B" />
              <Checkbox label="선택 항목 C" />
            </div>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] p-5 bg-[var(--color-bg-subtle)]">
            <p className="text-[11px] text-[var(--color-text-secondary)] mb-4 uppercase tracking-widest font-semibold">Indeterminate</p>
            <div className="space-y-4">
              <Checkbox label="전체 선택" indeterminate />
              <Checkbox label="하위 항목 A" />
              <Checkbox label="하위 항목 B" />
            </div>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] p-5 bg-[var(--color-bg-subtle)]">
            <p className="text-[11px] text-[var(--color-text-secondary)] mb-4 uppercase tracking-widest font-semibold">Disabled</p>
            <div className="space-y-4">
              <Checkbox label="비활성 항목 A" disabled />
              <Checkbox label="비활성 항목 B" disabled />
            </div>
          </div>
        </div>
      </section>

      {/* Radio */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Radio</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">라디오 버튼</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="rounded-xl border border-[var(--color-border)] p-5 bg-[var(--color-bg-subtle)]">
            <p className="text-[11px] text-[var(--color-text-secondary)] mb-4 uppercase tracking-widest font-semibold">Default</p>
            <RadioGroup options={["옵션 A", "옵션 B", "옵션 C"]} />
          </div>
          <div className="rounded-xl border border-[var(--color-border)] p-5 bg-[var(--color-bg-subtle)]">
            <p className="text-[11px] text-[var(--color-text-secondary)] mb-4 uppercase tracking-widest font-semibold">Disabled</p>
            <RadioGroup options={["비활성 A", "비활성 B"]} disabled />
          </div>
        </div>
      </section>

      {/* Toggle */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Toggle</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">토글 스위치</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="rounded-xl border border-[var(--color-border)] p-5 bg-[var(--color-bg-subtle)]">
            <p className="text-[11px] text-[var(--color-text-secondary)] mb-4 uppercase tracking-widest font-semibold">Default</p>
            <div className="space-y-4">
              <Toggle label="알림 받기" />
              <Toggle label="다크 모드" defaultOn />
              <Toggle label="자동 저장" defaultOn />
            </div>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] p-5 bg-[var(--color-bg-subtle)]">
            <p className="text-[11px] text-[var(--color-text-secondary)] mb-4 uppercase tracking-widest font-semibold">Disabled</p>
            <div className="space-y-4">
              <Toggle label="비활성 (Off)" disabled />
              <Toggle label="비활성 (On)" disabled defaultOn />
            </div>
          </div>
        </div>
      </section>

      {/* Token spec */}
      <section className="mb-16">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Spec</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">토큰 참조</h2>
        </div>
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border)]">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-[var(--color-bg-subtle)] border-b border-[var(--color-border)]">
                {["컴포넌트", "속성", "Token", "Value"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { comp: "Checkbox / Radio", attr: "Selected color",    token: "color/interactive/primary",  value: "M300 #28D7D2" },
                { comp: "Checkbox / Radio", attr: "Disabled color",    token: "color/interactive/disabled", value: "N100 #D8DCDE" },
                { comp: "Checkbox / Radio", attr: "Border (default)",  token: "color/border/default",       value: "N100 #D8DCDE" },
                { comp: "Toggle",           attr: "Track (on)",        token: "color/interactive/primary",  value: "M300 #28D7D2" },
                { comp: "Toggle",           attr: "Track (off)",       token: "color/border/default",       value: "N100 #D8DCDE" },
                { comp: "Toggle",           attr: "Thumb",             token: "color/palette/system/white", value: "#FFFFFF" },
                { comp: "All",              attr: "Label font",        token: "type/body/sm",               value: "14px Regular" },
                { comp: "All",              attr: "Disabled text",     token: "color/text/disabled",        value: "N100 #D8DCDE" },
              ].map((row, i) => (
                <tr key={`${row.comp}-${row.attr}`} className={`border-b border-[var(--color-border)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}>
                  <td className="px-4 py-3 font-semibold text-[var(--color-text-primary)]">{row.comp}</td>
                  <td className="px-4 py-3 text-[var(--color-text-secondary)]">{row.attr}</td>
                  <td className="px-4 py-3"><code className="text-[11px] font-mono text-mint-500 dark:text-mint-300">{row.token}</code></td>
                  <td className="px-4 py-3 font-mono text-[12px] text-[var(--color-text-secondary)]">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
