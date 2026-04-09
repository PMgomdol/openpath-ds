"use client";

import { useState } from "react";

type ChipVariant = "Filled" | "Outlined" | "Filter" | "Input";

function Chip({
  label,
  variant = "Filled",
  selected,
  onToggle,
  onRemove,
  disabled,
  icon,
}: {
  label: string;
  variant?: ChipVariant;
  selected?: boolean;
  onToggle?: () => void;
  onRemove?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
}) {
  const base = `
    inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium
    transition-all duration-150 select-none
    ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
  `;

  if (variant === "Filled") {
    return (
      <span className={`${base} bg-mint-300 text-white`}>
        {icon && <span className="text-[14px]">{icon}</span>}
        {label}
      </span>
    );
  }

  if (variant === "Outlined") {
    return (
      <span className={`${base} border border-neutral-100 text-[var(--color-text-primary)] hover:border-mint-300 dark:border-neutral-400`}>
        {icon && <span className="text-[14px]">{icon}</span>}
        {label}
      </span>
    );
  }

  if (variant === "Filter") {
    return (
      <button
        disabled={disabled}
        onClick={!disabled ? onToggle : undefined}
        className={`${base} border transition-all ${
          selected
            ? "bg-mint-20 dark:bg-mint-600/20 border-mint-300 text-mint-500 dark:text-mint-300"
            : "border-neutral-100 dark:border-neutral-400 text-[var(--color-text-primary)] hover:border-mint-300"
        }`}
      >
        {selected && (
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        )}
        {label}
      </button>
    );
  }

  // Input chip (removable)
  return (
    <span className={`${base} bg-mint-20 dark:bg-mint-600/20 border border-mint-200 dark:border-mint-600/40 text-mint-600 dark:text-mint-300`}>
      {icon && <span className="text-[14px]">{icon}</span>}
      {label}
      {onRemove && (
        <button onClick={onRemove} className="ml-0.5 rounded-full hover:bg-mint-100 dark:hover:bg-mint-600/30 p-0.5 transition-colors">
          <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      )}
    </span>
  );
}

function FilterDemo() {
  const FILTERS = ["전체", "디자인", "개발", "마케팅", "기획", "UX 리서치"];
  const [selected, setSelected] = useState<string[]>(["전체"]);

  const toggle = (f: string) => {
    setSelected((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  return (
    <div>
      <p className="text-[11px] text-[var(--color-text-secondary)] mb-3 uppercase tracking-widest font-semibold">Filter Chips (멀티 선택)</p>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Chip key={f} label={f} variant="Filter" selected={selected.includes(f)} onToggle={() => toggle(f)} />
        ))}
      </div>
    </div>
  );
}

function InputChipDemo() {
  const [tags, setTags] = useState(["React", "TypeScript", "Design System"]);
  const [input, setInput] = useState("");

  const add = () => {
    const v = input.trim();
    if (v && !tags.includes(v)) setTags((t) => [...t, v]);
    setInput("");
  };

  return (
    <div>
      <p className="text-[11px] text-[var(--color-text-secondary)] mb-3 uppercase tracking-widest font-semibold">Input Chips (태그 입력)</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {tags.map((tag) => (
          <Chip key={tag} label={tag} variant="Input" onRemove={() => setTags((t) => t.filter((x) => x !== tag))} />
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="태그 입력 후 Enter"
          className="flex-1 px-3 py-1.5 rounded-full border border-neutral-100 dark:border-neutral-400 text-[13px] bg-transparent text-[var(--color-text-primary)] outline-none focus:border-mint-300"
        />
        <button onClick={add} className="px-3 py-1.5 rounded-full bg-mint-300 text-white text-[13px] font-medium hover:bg-mint-400 transition-colors">
          추가
        </button>
      </div>
    </div>
  );
}

export default function ChipsPage() {
  return (
    <div className="px-8 py-10 max-w-[960px]">
      <div className="mb-10 pb-8 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-primary)] mb-2">Chips</h1>
        <p className="text-[16px] text-[var(--color-text-secondary)] leading-relaxed max-w-[520px]">
          짧은 정보, 필터, 태그를 표현하는 소형 컴포넌트.
          <br />
          <span className="text-mint-400 font-medium">Filled</span> ·{" "}
          <span className="text-mint-400 font-medium">Outlined</span> ·{" "}
          <span className="text-mint-400 font-medium">Filter</span> ·{" "}
          <span className="text-mint-400 font-medium">Input</span> 4가지 Variant.
        </p>
      </div>

      {/* Variant Gallery */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Variants</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">Variant 갤러리</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="rounded-xl border border-[var(--color-border)] p-5 bg-[var(--color-bg-subtle)]">
            <p className="text-[11px] text-[var(--color-text-secondary)] mb-4 uppercase tracking-widest font-semibold">Filled</p>
            <div className="flex flex-wrap gap-2">
              <Chip label="디자인" variant="Filled" />
              <Chip label="개발" variant="Filled" />
              <Chip label="마케팅" variant="Filled" icon="🎨" />
            </div>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] p-5 bg-[var(--color-bg-subtle)]">
            <p className="text-[11px] text-[var(--color-text-secondary)] mb-4 uppercase tracking-widest font-semibold">Outlined</p>
            <div className="flex flex-wrap gap-2">
              <Chip label="디자인" variant="Outlined" />
              <Chip label="개발" variant="Outlined" />
              <Chip label="마케팅" variant="Outlined" icon="✨" />
            </div>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] p-5 bg-[var(--color-bg-subtle)]">
            <FilterDemo />
          </div>
          <div className="rounded-xl border border-[var(--color-border)] p-5 bg-[var(--color-bg-subtle)]">
            <InputChipDemo />
          </div>
        </div>
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
                {["속성", "Value", "Token"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold text-[var(--color-text-secondary)] uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { attr: "Height",        value: "32px",           token: "size/component/button/sm/height" },
                { attr: "Padding",       value: "6px 12px",       token: "space/03" },
                { attr: "Font",          value: "13px Medium",    token: "type/label/sm" },
                { attr: "Radius",        value: "9999px",         token: "radius/component/chip" },
                { attr: "Selected bg",  value: "M20 #F3FCFC",    token: "color/bg/brand" },
                { attr: "Selected border", value: "M300 #28D7D2", token: "color/border/brand" },
                { attr: "Default border", value: "N100 #D8DCDE",  token: "color/border/default" },
              ].map((row, i) => (
                <tr key={row.attr} className={`border-b border-[var(--color-border)] last:border-0 ${i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""}`}>
                  <td className="px-4 py-3 font-medium text-[var(--color-text-primary)]">{row.attr}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-mint-500 dark:text-mint-300">{row.value}</td>
                  <td className="px-4 py-3"><code className="text-[11px] font-mono text-[var(--color-text-secondary)] bg-[var(--color-bg-subtle)] px-2 py-0.5 rounded">{row.token}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
