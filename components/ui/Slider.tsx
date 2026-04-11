"use client";

import { forwardRef, useCallback, useId, HTMLAttributes } from "react";

// ── Types ──────────────────────────────────────────────────────

export interface SliderMark {
  value: number;
  label?: string;
}

export interface SliderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Current value */
  value: number;
  /** Called when value changes */
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  /** Step size. Use > 1 for discrete slider. Default: 1 */
  step?: number;
  /** Tick mark / label definitions for discrete variant */
  marks?: SliderMark[];
  /** Label shown above the track */
  label?: string;
  /** Whether to show the floating value label above the thumb. Default: true */
  showValueLabel?: boolean;
  /** Format the displayed value. Default: String(value) */
  formatValue?: (value: number) => string;
  disabled?: boolean;
}

export interface RangeSliderProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** [low, high] tuple */
  value: [number, number];
  onChange: (value: [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Minimum gap between the two thumbs */
  minDistance?: number;
  label?: string;
  formatValue?: (value: number) => string;
  disabled?: boolean;
}

// ── Helpers ────────────────────────────────────────────────────

function pct(value: number, min: number, max: number): number {
  return ((value - min) / (max - min)) * 100;
}

/**
 * Computes the CSS `left` offset for a floating label so it stays
 * fully inside the track while following the thumb.
 * At 0% the thumb left-edge is at 0, at 100% right-edge is at 100%.
 * thumb radius = 10px; label width ≈ 32px → half = 16px.
 */
function labelLeft(p: number): string {
  return `calc(${p}% + ${10 - p * 0.2}px)`;
}

// ── ValueLabel ─────────────────────────────────────────────────

function ValueLabel({
  text,
  pctVal,
  disabled,
}: {
  text: string;
  pctVal: number;
  disabled?: boolean;
}) {
  return (
    <div
      className="op-slider__label"
      style={{
        left: labelLeft(pctVal),
        background: disabled
          ? "var(--color-interactive-disabled)"
          : "var(--color-brand-primary)",
      }}
      aria-hidden="true"
    >
      {text}
      <span
        className="op-slider__label-arrow"
        style={{
          borderTopColor: disabled
            ? "var(--color-interactive-disabled)"
            : "var(--color-brand-primary)",
        }}
      />
    </div>
  );
}

// ── Track ──────────────────────────────────────────────────────

function Track({
  lowPct,
  highPct,
  disabled,
}: {
  lowPct: number;
  highPct: number;
  disabled?: boolean;
}) {
  return (
    <div className="op-slider__track">
      {/* Inactive full */}
      <div className="op-slider__track-bg" />
      {/* Active fill */}
      <div
        className="op-slider__track-fill"
        style={{
          left: `${lowPct}%`,
          right: `${100 - highPct}%`,
          background: disabled
            ? "var(--color-interactive-disabled)"
            : "var(--color-brand-primary)",
        }}
      />
    </div>
  );
}

// ── Slider (single thumb) ──────────────────────────────────────

const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      marks,
      label,
      showValueLabel = true,
      formatValue,
      disabled = false,
      className = "",
      ...rest
    },
    ref
  ) => {
    const inputId = useId();
    const p = pct(value, min, max);
    const displayValue = formatValue ? formatValue(value) : String(value);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(Number(e.target.value));
      },
      [onChange]
    );

    return (
      <div
        ref={ref}
        className={["op-slider-root", disabled ? "op-slider-root--disabled" : "", className]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {/* Label row */}
        {label && (
          <div className="op-slider__header">
            <label htmlFor={inputId} className="op-slider__label-text">
              {label}
            </label>
            <span
              className="op-slider__value-badge"
              style={{
                background: disabled
                  ? "var(--color-interactive-disabled)"
                  : "var(--color-brand-primary)",
              }}
            >
              {displayValue}
            </span>
          </div>
        )}

        {/* Thumb + track area */}
        <div className="op-slider__wrapper">
          {/* Floating value label above thumb */}
          {showValueLabel && (
            <ValueLabel text={displayValue} pctVal={p} disabled={disabled} />
          )}

          <Track lowPct={0} highPct={p} disabled={disabled} />

          {/* Tick marks for discrete */}
          {marks && marks.length > 0 && (
            <div className="op-slider__ticks" aria-hidden="true">
              {marks.map((m) => {
                const mp = pct(m.value, min, max);
                return (
                  <span
                    key={m.value}
                    className="op-slider__tick"
                    style={{
                      left: `calc(${mp}% + ${10 - mp * 0.2}px)`,
                      background:
                        m.value <= value
                          ? "rgba(255,255,255,0.75)"
                          : "var(--color-text-subtle)",
                    }}
                  />
                );
              })}
            </div>
          )}

          <input
            id={inputId}
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            disabled={disabled}
            onChange={handleChange}
            className="op-slider__input"
            aria-valuenow={value}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuetext={displayValue}
          />
        </div>

        {/* Tick labels for discrete */}
        {marks && marks.length > 0 && (
          <div className="op-slider__mark-labels" aria-hidden="true">
            {marks.map((m) => (
              <span
                key={m.value}
                className="op-slider__mark-label"
                style={{
                  color:
                    m.value === value
                      ? "var(--color-brand-primary)"
                      : "var(--color-text-subtle)",
                  fontWeight: m.value === value ? 600 : 400,
                }}
              >
                {m.label ?? m.value}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }
);

Slider.displayName = "Slider";

// ── RangeSlider (dual thumb) ───────────────────────────────────

const RangeSlider = forwardRef<HTMLDivElement, RangeSliderProps>(
  (
    {
      value,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      minDistance = 5,
      label,
      formatValue,
      disabled = false,
      className = "",
      ...rest
    },
    ref
  ) => {
    const [low, high] = value;
    const lowP = pct(low, min, max);
    const highP = pct(high, min, max);

    const displayLow = formatValue ? formatValue(low) : String(low);
    const displayHigh = formatValue ? formatValue(high) : String(high);

    const handleLow = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = Number(e.target.value);
        if (v < high - minDistance) onChange([v, high]);
      },
      [high, minDistance, onChange]
    );

    const handleHigh = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = Number(e.target.value);
        if (v > low + minDistance) onChange([low, v]);
      },
      [low, minDistance, onChange]
    );

    return (
      <div
        ref={ref}
        className={["op-slider-root", disabled ? "op-slider-root--disabled" : "", className]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {label && (
          <div className="op-slider__header">
            <span className="op-slider__label-text">{label}</span>
            <span className="op-slider__range-value" style={{ color: "var(--color-brand-primary)" }}>
              {displayLow} — {displayHigh}
            </span>
          </div>
        )}

        <div className="op-slider__wrapper op-slider__wrapper--range">
          {/* Low thumb label */}
          <ValueLabel text={displayLow} pctVal={lowP} disabled={disabled} />
          {/* High thumb label */}
          <ValueLabel text={displayHigh} pctVal={highP} disabled={disabled} />

          <Track lowPct={lowP} highPct={highP} disabled={disabled} />

          {/* Low thumb */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={low}
            disabled={disabled}
            onChange={handleLow}
            className="op-slider__input op-slider__input--range"
            style={{ zIndex: low > max - minDistance * 2 ? 4 : 3 }}
            aria-label="최솟값"
            aria-valuenow={low}
            aria-valuemin={min}
            aria-valuemax={high}
          />
          {/* High thumb */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={high}
            disabled={disabled}
            onChange={handleHigh}
            className="op-slider__input op-slider__input--range"
            style={{ zIndex: 4 }}
            aria-label="최댓값"
            aria-valuenow={high}
            aria-valuemin={low}
            aria-valuemax={max}
          />
        </div>
      </div>
    );
  }
);

RangeSlider.displayName = "RangeSlider";

export { RangeSlider };
export default Slider;
