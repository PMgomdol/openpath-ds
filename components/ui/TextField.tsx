"use client";

import {
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useId,
} from "react";
import { ChevronDown, X } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────

type TextFieldVariant = "filled" | "outlined";

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "prefix"> {
  /** Filled: bg-subtle + bottom border. Outlined: full border. */
  variant?: TextFieldVariant;
  /** Floating label — also serves as accessible label */
  label?: string;
  /** Helper text shown below the field */
  helperText?: string;
  /**
   * Error message. Setting this triggers the error state.
   * Overrides helperText.
   */
  error?: string;
  /** Fixed text prepended inside the field (e.g. "₩", "https://") */
  prefix?: string;
  /** Fixed text or node appended inside the field (e.g. "kg") */
  suffix?: string | ReactNode;
  /** Appends a chevron-down icon; signals this is a select-like field */
  dropdown?: boolean;
  /** Shows an × button when the field has a value */
  clearable?: boolean;
  /** Called when the × clear button is clicked */
  onClear?: () => void;
}

// ─── Component ───────────────────────────────────────────────────

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      variant = "filled",
      label,
      helperText,
      error,
      prefix,
      suffix,
      dropdown = false,
      clearable = false,
      onClear,
      disabled,
      id: idProp,
      className = "",
      value,
      defaultValue,
      ...rest
    },
    ref
  ) => {
    const autoId = useId();
    const inputId = idProp ?? autoId;

    const hasError    = Boolean(error);
    const isDisabled  = Boolean(disabled);
    const hasSuffix   = suffix !== undefined && suffix !== null;
    const showClear   = clearable && !isDisabled && !dropdown;
    const innerMod    = prefix ? "op-field__inner--prefixed" : "op-field__inner--bare";

    // Data attributes drive all CSS state (no JS hover/focus tracking needed)
    const boxAttrs: Record<string, string | undefined> = {};
    if (hasError)   boxAttrs["data-error"]    = "";
    if (isDisabled) boxAttrs["data-disabled"] = "";

    // Helper line: error message takes priority over helperText
    const helperContent = error ?? helperText;
    const helperClass = [
      "op-field__helper",
      hasError    && "op-field__helper--error",
      isDisabled  && "op-field__helper--disabled",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={`op-field op-field--${variant} ${className}`}>
        {/* ── Box ── */}
        <div className="op-field__box" {...boxAttrs}>

          {/* Prefix */}
          {prefix && (
            <span className="op-field__affix op-field__affix--lead" aria-hidden="true">
              {prefix}
            </span>
          )}

          {/* Inner: floating label + input */}
          <div className={`op-field__inner ${innerMod}`}>
            {label && (
              <label htmlFor={inputId} className="op-field__label">
                {label}
              </label>
            )}
            <input
              ref={ref}
              id={inputId}
              disabled={isDisabled}
              aria-invalid={hasError || undefined}
              aria-describedby={helperContent ? `${inputId}-helper` : undefined}
              // Single space keeps :placeholder-shown working for floating label
              placeholder=" "
              value={value}
              defaultValue={defaultValue}
              className="op-field__input"
              {...rest}
            />
          </div>

          {/* Suffix */}
          {hasSuffix && !dropdown && !showClear && (
            <span className="op-field__affix op-field__affix--trail" aria-hidden="true">
              {suffix}
            </span>
          )}

          {/* Clear button */}
          {showClear && value && (
            <button
              type="button"
              tabIndex={-1}
              aria-label="입력 내용 지우기"
              className="op-field__trail-icon--clear"
              onClick={onClear}
            >
              <X size={18} />
            </button>
          )}

          {/* Dropdown chevron */}
          {dropdown && (
            <span className="op-field__trail-icon op-field__trail-icon--chevron" aria-hidden="true">
              <ChevronDown size={20} />
            </span>
          )}
        </div>

        {/* ── Helper / Error text ── */}
        {helperContent && (
          <p id={`${inputId}-helper`} className={helperClass}>
            {helperContent}
          </p>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";
export default TextField;
