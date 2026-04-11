"use client";

import { useState } from "react";
import Slider, { RangeSlider } from "@/components/ui/Slider";
import type { SliderMark } from "@/components/ui/Slider";

// ── Discrete marks ─────────────────────────────────────────────

const QUALITY_MARKS: SliderMark[] = [
  { value: 0, label: "없음" },
  { value: 1, label: "매우 낮음" },
  { value: 2, label: "낮음" },
  { value: 3, label: "보통" },
  { value: 4, label: "높음" },
  { value: 5, label: "최대" },
];

// ── Page ───────────────────────────────────────────────────────

export default function SliderPage() {
  // Continuous
  const [volume, setVolume] = useState(40);
  // Discrete
  const [quality, setQuality] = useState(3);
  // Range
  const [priceRange, setPriceRange] = useState<[number, number]>([20, 75]);

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
          Slider
        </h1>
        <p className="text-[16px] text-[var(--color-text-subtle)] leading-relaxed max-w-[540px]">
          연속 또는 불연속 범위에서 값을 선택하는 인터랙션 컴포넌트.
          <br />
          <span className="text-[var(--color-brand-primary)] font-medium">
            Continuous
          </span>{" "}
          ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">
            Discrete
          </span>{" "}
          ·{" "}
          <span className="text-[var(--color-brand-primary)] font-medium">
            Range
          </span>{" "}
          · 터치 영역 48dp · Value label 표시
        </p>
      </div>

      {/* Continuous */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Continuous
          </p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
            Continuous Slider
          </h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            연속 값 선택 · Track 4px / Thumb 20→28px pressed · 48dp 터치 영역
          </p>
        </div>
        <div className="space-y-4">
          {/* Default */}
          <div>
            <p className="text-[11px] uppercase tracking-widest font-bold text-[var(--color-text-subtle)] mb-3">
              Default
            </p>
            <div
              className="rounded-xl border border-[var(--color-border-default)] p-6"
              style={{ background: "var(--color-bg-subtle)" }}
            >
              <Slider
                value={volume}
                onChange={setVolume}
                min={0}
                max={100}
                label="볼륨"
                formatValue={(v) => `${v}`}
              />
            </div>
          </div>

          {/* Disabled */}
          <div>
            <p className="text-[11px] uppercase tracking-widest font-bold text-[var(--color-text-subtle)] mb-3">
              Disabled
            </p>
            <div
              className="rounded-xl border border-[var(--color-border-default)] p-6"
              style={{ background: "var(--color-bg-subtle)" }}
            >
              <Slider
                value={40}
                onChange={() => {}}
                min={0}
                max={100}
                label="볼륨"
                disabled
                formatValue={(v) => `${v}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Discrete */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Discrete
          </p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
            Discrete Slider
          </h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            단계 값 선택 · step=1 · 틱 마크 + 레이블 표시
          </p>
        </div>
        <div
          className="rounded-xl border border-[var(--color-border-default)] p-6"
          style={{ background: "var(--color-bg-subtle)" }}
        >
          <Slider
            value={quality}
            onChange={setQuality}
            min={0}
            max={5}
            step={1}
            marks={QUALITY_MARKS}
            label="품질"
            formatValue={(v) => QUALITY_MARKS[v]?.label ?? String(v)}
          />
        </div>
      </section>

      {/* Range */}
      <section className="mb-14">
        <div className="mb-5">
          <p className="text-[11px] font-bold text-[var(--color-brand-primary)] uppercase tracking-widest mb-1">
            Range
          </p>
          <h2 className="text-[20px] font-bold text-[var(--color-text-default)]">
            Range Slider
          </h2>
          <p className="text-[13px] text-[var(--color-text-subtle)] mt-1">
            최솟값·최댓값 동시 지정 · 두 핸들 독립 조절
          </p>
        </div>
        <div
          className="rounded-xl border border-[var(--color-border-default)] p-6"
          style={{ background: "var(--color-bg-subtle)" }}
        >
          <RangeSlider
            value={priceRange}
            onChange={setPriceRange}
            min={0}
            max={100}
            minDistance={5}
            label="가격 범위"
            formatValue={(v) => `${v}만`}
          />
        </div>
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
                {["속성", "State", "Value", "Token"].map((h) => (
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
                { attr: "Track 높이",       state: "—",        value: "4px",                  token: "—" },
                { attr: "Thumb 크기",       state: "Default",  value: "20px",                 token: "—" },
                { attr: "Thumb 크기",       state: "Pressed",  value: "28px",                 token: "—" },
                { attr: "Touch 영역",       state: "—",        value: "48px (높이)",           token: "space/09" },
                { attr: "Track (active)",   state: "—",        value: "M300 #28D7D2",         token: "color/brand/primary" },
                { attr: "Track (inactive)", state: "—",        value: "N100 #D8DCDE",         token: "color/border/default" },
                { attr: "Thumb",            state: "Default",  value: "M300 #28D7D2",         token: "color/brand/primary" },
                { attr: "Thumb",            state: "Hover",    value: "M400 #1BB8B3",         token: "color/interactive/hover" },
                { attr: "Thumb",            state: "Pressed",  value: "M500 #0F9490",         token: "color/interactive/pressed" },
                { attr: "Thumb",            state: "Disabled", value: "N100 #D8DCDE",         token: "color/interactive/disabled" },
                { attr: "Value label bg",   state: "—",        value: "M300 #28D7D2",         token: "color/brand/primary" },
                { attr: "Value label text", state: "—",        value: "N600 #29363D",         token: "color/text/on-brand" },
                { attr: "Value label font", state: "—",        value: "12px Medium",          token: "—" },
              ].map((row, i) => (
                <tr
                  key={`${row.attr}-${row.state}`}
                  className={`border-b border-[var(--color-border-default)] last:border-0 ${
                    i % 2 === 1 ? "bg-[var(--color-bg-subtle)]" : ""
                  }`}
                >
                  <td className="px-4 py-3 font-medium text-[var(--color-text-default)]">
                    {row.attr}
                  </td>
                  <td className="px-4 py-3 text-[12px] text-[var(--color-text-subtle)]">
                    {row.state}
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
                "범위가 넓거나 정확한 값 불필요할 때 사용",
                "현재 값은 Value label로 항상 표시",
                "Discrete는 tick으로 단계 시각화",
                "Range는 두 핸들 교차 방지 (minDistance 적용)",
                "터치 영역 48dp 이상 확보",
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
                "정확한 숫자 입력 필요 시 (Text Field 사용)",
                "Value label 없이 Slider 단독 사용",
                "터치 영역 48dp 미만으로 축소",
                "Disabled 표현에 opacity 0.5 사용",
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
