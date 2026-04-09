"use client";

import { useState } from "react";

function Slider({
  min = 0,
  max = 100,
  step = 1,
  disabled,
  showTicks,
  label,
}: {
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showTicks?: boolean;
  label?: string;
}) {
  const [value, setValue] = useState(Math.floor((min + max) / 2));
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className={`w-full ${disabled ? "opacity-50" : ""}`}>
      {label && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-[13px] font-medium text-[var(--color-text-primary)]">{label}</span>
          <span className="text-[13px] font-mono text-mint-400 font-semibold">{value}</span>
        </div>
      )}
      <div className="relative">
        <div className="relative h-1.5 rounded-full bg-neutral-100 dark:bg-neutral-400">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-mint-300 transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={(e) => setValue(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer disabled:cursor-not-allowed h-1.5"
        />
        {/* Thumb */}
        <div
          className={`
            absolute top-1/2 -translate-y-1/2 -translate-x-1/2
            w-5 h-5 rounded-full bg-white border-2 border-mint-300 shadow-elevation-1
            transition-all pointer-events-none
            ${disabled ? "" : ""}
          `}
          style={{ left: `${pct}%` }}
        />
      </div>
      {showTicks && (
        <div className="flex justify-between mt-2">
          {[min, Math.floor((min+max)/2), max].map((v) => (
            <span key={v} className="text-[11px] font-mono text-[var(--color-text-secondary)]">{v}</span>
          ))}
        </div>
      )}
    </div>
  );
}

function RangeSlider({ label }: { label?: string }) {
  const [low, setLow]   = useState(20);
  const [high, setHigh] = useState(80);

  const pctLow  = low;
  const pctHigh = high;

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-[13px] font-medium text-[var(--color-text-primary)]">{label}</span>
          <span className="text-[13px] font-mono text-mint-400 font-semibold">{low} – {high}</span>
        </div>
      )}
      <div className="relative h-1.5 rounded-full bg-neutral-100 dark:bg-neutral-400">
        <div
          className="absolute inset-y-0 rounded-full bg-mint-300"
          style={{ left: `${pctLow}%`, right: `${100 - pctHigh}%` }}
        />
        {/* Low handle */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-2 border-mint-300 shadow-elevation-1 pointer-events-none"
          style={{ left: `${pctLow}%` }} />
        {/* High handle */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-2 border-mint-300 shadow-elevation-1 pointer-events-none"
          style={{ left: `${pctHigh}%` }} />
        {/* Low input */}
        <input type="range" min={0} max={high - 1} value={low} onChange={(e) => setLow(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-1.5" />
        {/* High input — layered on top */}
        <input type="range" min={low + 1} max={100} value={high} onChange={(e) => setHigh(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-1.5" />
      </div>
    </div>
  );
}

export default function SliderPage() {
  return (
    <div className="px-8 py-10 max-w-[960px]">
      <div className="mb-10 pb-8 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight text-[var(--color-text-primary)] mb-2">Slider</h1>
        <p className="text-[16px] text-[var(--color-text-secondary)] leading-relaxed max-w-[520px]">
          연속적인 범위에서 값을 선택하는 컨트롤.
          <br />
          볼륨, 밝기, 가격 범위 등에 사용합니다.
        </p>
      </div>

      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Variants</p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-primary)]">Variant 갤러리</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="rounded-xl border border-[var(--color-border)] p-6 bg-[var(--color-bg-subtle)] space-y-8">
            <Slider label="볼륨" showTicks />
            <Slider label="밝기" min={0} max={10} step={1} showTicks />
            <Slider label="불투명도 (%)" min={0} max={100} step={5} />
          </div>
          <div className="rounded-xl border border-[var(--color-border)] p-6 bg-[var(--color-bg-subtle)] space-y-8">
            <RangeSlider label="가격 범위 (만원)" />
            <Slider label="Disabled" disabled />
          </div>
        </div>
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
                { attr: "Track height",   value: "6px",            token: "—" },
                { attr: "Thumb size",     value: "20px",           token: "—" },
                { attr: "Active color",   value: "M300 #28D7D2",   token: "color/interactive/primary" },
                { attr: "Track (bg)",     value: "N100 #D8DCDE",   token: "color/border/default" },
                { attr: "Thumb border",   value: "M300 + White",   token: "color/interactive/primary" },
                { attr: "Disabled track", value: "N100 #D8DCDE",   token: "color/interactive/disabled" },
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
