"use client";

import { useState } from "react";

// ─── Spec (DESIGN.md)
// track (active): color/brand/primary M300 #28D7D2
// track (inactive): color/border/default N100 #D8DCDE
// thumb Default: color/brand/primary M300 · size: 20px
// thumb Hover: color/interactive/hover M400 #1BB8B3
// thumb Pressed: color/interactive/pressed M500 #0F9490 · size: 28px
// thumb Disabled: color/interactive/disabled N100 #D8DCDE
// value label bg: color/brand/primary M300
// Track height: 4px | Touch area: 40px

// ─── CSS injection ─────────────────────────────────────────────

const SLIDER_CSS = `
  .op-slider {
    -webkit-appearance: none; appearance: none;
    width: 100%; height: 40px; background: transparent;
    cursor: pointer; outline: none;
  }
  .op-slider:disabled { cursor: not-allowed; }
  .op-slider::-webkit-slider-runnable-track { height: 4px; background: transparent; }
  .op-slider::-webkit-slider-thumb {
    -webkit-appearance: none; appearance: none;
    width: 20px; height: 20px; border-radius: 50%;
    background: var(--color-brand-primary, #28D7D2);
    cursor: pointer; margin-top: -8px;
    transition: background .15s, width .1s, height .1s, margin-top .1s, box-shadow .15s;
  }
  .op-slider:hover::-webkit-slider-thumb {
    background: var(--color-interactive-hover, #1BB8B3);
    box-shadow: 0 0 0 8px rgba(40,215,210,.12);
  }
  .op-slider:active::-webkit-slider-thumb {
    width: 28px; height: 28px; margin-top: -12px;
    background: var(--color-interactive-pressed, #0F9490);
    box-shadow: 0 0 0 10px rgba(40,215,210,.15);
  }
  .op-slider:disabled::-webkit-slider-thumb {
    background: var(--color-interactive-disabled, #D8DCDE);
    box-shadow: none; cursor: not-allowed;
  }
  .op-slider::-moz-range-track { height: 4px; background: transparent; }
  .op-slider::-moz-range-thumb {
    width: 20px; height: 20px; border-radius: 50%;
    background: var(--color-brand-primary, #28D7D2);
    border: none; cursor: pointer; transition: background .15s;
  }
  .op-slider:hover::-moz-range-thumb { background: var(--color-interactive-hover, #1BB8B3); }
  .op-slider:disabled::-moz-range-thumb { background: var(--color-interactive-disabled, #D8DCDE); }

  .op-range-input {
    -webkit-appearance: none; appearance: none;
    position: absolute; width: 100%; height: 40px;
    background: transparent; pointer-events: none; outline: none; top: 0;
  }
  .op-range-input::-webkit-slider-runnable-track { height: 4px; background: transparent; }
  .op-range-input::-webkit-slider-thumb {
    -webkit-appearance: none; appearance: none;
    width: 20px; height: 20px; border-radius: 50%;
    background: var(--color-brand-primary, #28D7D2);
    cursor: pointer; pointer-events: all; margin-top: -8px;
    transition: background .15s, box-shadow .15s;
  }
  .op-range-input::-webkit-slider-thumb:hover {
    background: var(--color-interactive-hover, #1BB8B3);
    box-shadow: 0 0 0 8px rgba(40,215,210,.12);
  }
  .op-range-input::-moz-range-thumb {
    width: 20px; height: 20px; border-radius: 50%;
    background: var(--color-brand-primary, #28D7D2);
    border: none; cursor: pointer; pointer-events: all;
  }
  .op-range-input::-moz-range-track { height: 4px; background: transparent; }
`;

// ─── Track background (custom render) ─────────────────────────

function TrackBg({ pct, disabled }: { pct: number; disabled?: boolean }) {
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: "50%", transform: "translateY(-50%)", height: 4, borderRadius: 2, pointerEvents: "none" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 2, background: "var(--color-border-default)" }} />
      <div style={{
        position: "absolute", left: 0, width: `${pct}%`, height: "100%", borderRadius: 2,
        background: disabled ? "var(--color-interactive-disabled)" : "var(--color-brand-primary)",
        transition: "width .05s",
      }} />
    </div>
  );
}

// ─── Value badge ───────────────────────────────────────────────

function ValueBadge({ value, disabled }: { value: number | string; disabled?: boolean }) {
  return (
    <span
      className="text-[13px] font-semibold px-2 py-0.5 rounded-md tabular-nums"
      style={{
        background: disabled ? "var(--color-interactive-disabled)" : "var(--color-brand-primary)",
        color: "#fff",
        minWidth: 40,
        display: "inline-block",
        textAlign: "center",
      }}
    >
      {value}
    </span>
  );
}

// ─── Continuous ────────────────────────────────────────────────

function ContinuousSlider({ disabled }: { disabled?: boolean }) {
  const [value, setValue] = useState(40);
  const pct = value;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[12px]" style={{ color: "var(--color-text-subtle)" }}>볼륨</span>
        <ValueBadge value={value} disabled={disabled} />
      </div>
      <div style={{ position: "relative", height: 40, display: "flex", alignItems: "center" }}>
        <TrackBg pct={pct} disabled={disabled} />
        <input
          type="range" min={0} max={100} value={value} disabled={disabled}
          onChange={e => setValue(Number(e.target.value))}
          className="op-slider" style={{ position: "relative", zIndex: 1 }}
        />
      </div>
      <div className="flex justify-between">
        <span className="text-[11px]" style={{ color: "var(--color-text-subtle)" }}>0</span>
        <span className="text-[11px]" style={{ color: "var(--color-text-subtle)" }}>100</span>
      </div>
    </div>
  );
}

// ─── Discrete ─────────────────────────────────────────────────

const QUALITY_LABELS = ["없음", "매우 낮음", "낮음", "보통", "높음", "최대"];

function DiscreteSlider() {
  const [value, setValue] = useState(3);
  const pct = (value / 5) * 100;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[12px]" style={{ color: "var(--color-text-subtle)" }}>품질</span>
        <ValueBadge value={QUALITY_LABELS[value]} />
      </div>
      <div style={{ position: "relative", height: 40, display: "flex", alignItems: "center" }}>
        <TrackBg pct={pct} />
        {/* Tick dots */}
        <div style={{ position: "absolute", left: 10, right: 10, top: "50%", transform: "translateY(-50%)", display: "flex", justifyContent: "space-between", pointerEvents: "none", zIndex: 2 }}>
          {QUALITY_LABELS.map((_, i) => (
            <div key={i} style={{
              width: 4, height: 4, borderRadius: "50%",
              background: i <= value ? "rgba(255,255,255,0.85)" : "var(--color-text-subtle)",
              transition: "background .15s",
            }} />
          ))}
        </div>
        <input
          type="range" min={0} max={5} step={1} value={value}
          onChange={e => setValue(Number(e.target.value))}
          className="op-slider" style={{ position: "relative", zIndex: 3 }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {QUALITY_LABELS.map((l, i) => (
          <span key={l} className="text-[10px] text-center" style={{
            color: i === value ? "var(--color-brand-primary)" : "var(--color-text-subtle)",
            fontWeight: i === value ? 600 : 400,
            flex: 1, transition: "color .15s",
          }}>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Range ─────────────────────────────────────────────────────

function RangeSlider() {
  const [low, setLow]   = useState(20);
  const [high, setHigh] = useState(75);
  const lowPct  = low;
  const highPct = high;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[12px]" style={{ color: "var(--color-text-subtle)" }}>가격 범위</span>
        <span className="text-[13px] font-semibold" style={{ color: "var(--color-brand-primary)" }}>
          {low}만 원 — {high}만 원
        </span>
      </div>
      <div style={{ position: "relative", height: 40 }}>
        {/* Inactive track */}
        <div style={{ position: "absolute", left: 0, right: 0, top: "50%", transform: "translateY(-50%)", height: 4, borderRadius: 2, background: "var(--color-border-default)" }} />
        {/* Active range */}
        <div style={{
          position: "absolute",
          left: `${lowPct}%`, right: `${100 - highPct}%`,
          top: "50%", transform: "translateY(-50%)",
          height: 4, borderRadius: 2,
          background: "var(--color-brand-primary)",
          transition: "left .05s, right .05s",
        }} />
        <input type="range" min={0} max={100} value={low}
          className="op-range-input"
          style={{ zIndex: low > 90 ? 4 : 3 }}
          onChange={e => { const v = Number(e.target.value); if (v < high - 5) setLow(v); }}
        />
        <input type="range" min={0} max={100} value={high}
          className="op-range-input" style={{ zIndex: 4 }}
          onChange={e => { const v = Number(e.target.value); if (v > low + 5) setHigh(v); }}
        />
      </div>
      <div className="flex justify-between">
        <span className="text-[11px]" style={{ color: "var(--color-text-subtle)" }}>0</span>
        <span className="text-[11px]" style={{ color: "var(--color-text-subtle)" }}>100만</span>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────

export default function SliderPage() {
  return (
    <div className="px-8 py-10 max-w-[960px]">
      <style dangerouslySetInnerHTML={{ __html: SLIDER_CSS }} />

      {/* Header */}
      <div className="mb-10 pb-8 border-b border-[var(--color-border-default)]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-mint-300" />
          <span className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest">Components</span>
        </div>
        <h1 className="text-[40px] font-black tracking-tight mb-2" style={{ color: "var(--color-text-default)" }}>
          Slider
        </h1>
        <p className="text-[16px] leading-relaxed max-w-[520px]" style={{ color: "var(--color-text-subtle)" }}>
          연속 또는 불연속 범위에서 값을 선택하는 인터랙션 컴포넌트.
          <br />
          <span className="text-mint-400 font-medium">Continuous</span> ·{" "}
          <span className="text-mint-400 font-medium">Discrete</span> ·{" "}
          <span className="text-mint-400 font-medium">Range</span> 3가지 타입.
        </p>
      </div>

      {/* Continuous */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Continuous</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>Continuous Slider</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>연속 값 선택 · 드래그로 조절 · Track 4px / Thumb 20→28px</p>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-[11px] uppercase tracking-widest font-semibold mb-3" style={{ color: "var(--color-text-subtle)" }}>Default</p>
            <div className="rounded-xl border border-[var(--color-border-default)] p-6" style={{ background: "var(--color-bg-subtle)" }}>
              <ContinuousSlider />
            </div>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-widest font-semibold mb-3" style={{ color: "var(--color-text-subtle)" }}>Disabled</p>
            <div className="rounded-xl border border-[var(--color-border-default)] p-6" style={{ background: "var(--color-bg-subtle)" }}>
              <ContinuousSlider disabled />
            </div>
          </div>
        </div>
      </section>

      {/* Discrete */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Discrete</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>Discrete Slider</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>단계 값 선택 · step=1 · 틱 마크 표시</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border-default)] p-6" style={{ background: "var(--color-bg-subtle)" }}>
          <DiscreteSlider />
        </div>
      </section>

      {/* Range */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-semibold text-mint-400 uppercase tracking-widest mb-1">Range</p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--color-text-default)" }}>Range Slider</h2>
          <p className="text-[13px] mt-1" style={{ color: "var(--color-text-subtle)" }}>최솟값·최댓값 동시 지정 · 두 핸들 독립 조절</p>
        </div>
        <div className="rounded-xl border border-[var(--color-border-default)] p-6" style={{ background: "var(--color-bg-subtle)" }}>
          <RangeSlider />
        </div>
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
                {["속성", "State", "Value", "Token"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--color-text-subtle)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { attr: "Track 높이",      state: "—",        value: "4px",            token: "—" },
                { attr: "Thumb 크기",      state: "Default",  value: "20px",           token: "—" },
                { attr: "Thumb 크기",      state: "Pressed",  value: "28px",           token: "—" },
                { attr: "Touch 영역",      state: "—",        value: "높이 40px",      token: "—" },
                { attr: "Track (active)",  state: "—",        value: "M300 #28D7D2",   token: "color/brand/primary" },
                { attr: "Track (inactive)",state: "—",        value: "N100 #D8DCDE",   token: "color/border/default" },
                { attr: "Thumb",           state: "Default",  value: "M300 #28D7D2",   token: "color/brand/primary" },
                { attr: "Thumb",           state: "Hover",    value: "M400 #1BB8B3",   token: "color/interactive/hover" },
                { attr: "Thumb",           state: "Pressed",  value: "M500 #0F9490",   token: "color/interactive/pressed" },
                { attr: "Thumb",           state: "Disabled", value: "N100 #D8DCDE",   token: "color/interactive/disabled" },
                { attr: "Value label bg",  state: "—",        value: "M300 #28D7D2",   token: "color/brand/primary" },
              ].map((row, i) => (
                <tr key={`${row.attr}-${row.state}`} className="border-b border-[var(--color-border-default)] last:border-0" style={{ background: i % 2 === 1 ? "var(--color-bg-subtle)" : undefined }}>
                  <td className="px-4 py-3 font-medium" style={{ color: "var(--color-text-default)" }}>{row.attr}</td>
                  <td className="px-4 py-3 text-[12px]" style={{ color: "var(--color-text-subtle)" }}>{row.state}</td>
                  <td className="px-4 py-3 font-mono text-[12px] text-mint-500">{row.value}</td>
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
              {["범위가 넓거나 정확한 값 불필요할 때 사용", "현재 값은 항상 Value label로 표시", "Discrete는 tick으로 단계 시각화", "Range는 두 핸들이 교차하지 않도록"].map((t, i) => (
                <li key={i} className="flex gap-2 text-[13px]" style={{ color: "var(--color-text-default)" }}>
                  <span className="text-[var(--color-brand-primary)] font-bold shrink-0">✓</span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border-2 p-5" style={{ borderColor: "rgba(255,50,87,0.3)", background: "#FFF0F3" }}>
            <p className="text-[14px] font-bold mb-3" style={{ color: "var(--color-status-error)" }}>✕ Don't</p>
            <ul className="space-y-2">
              {["정확한 숫자 입력 필요 시 (Text Field 사용)", "값 표시 없이 Slider 단독 사용", "터치 영역 40px 미만으로 축소", "Disabled 표현에 opacity 0.5 사용"].map((t, i) => (
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
