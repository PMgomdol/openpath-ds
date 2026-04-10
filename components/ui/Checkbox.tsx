"use client";

import {
  InputHTMLAttributes,
  MutableRefObject,
  forwardRef,
  useEffect,
  useId,
  useRef,
} from "react";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Visible label text */
  label?: string;
  /**
   * Indeterminate state — some but not all sub-items selected.
   * Renders a dash (—) instead of a checkmark.
   */
  indeterminate?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, indeterminate = false, id: idProp, className = "", ...rest }, ref) => {
    const autoId = useId();
    const inputId = idProp ?? autoId;
    const localRef = useRef<HTMLInputElement>(null);

    // indeterminate is not a settable HTML attribute — must be set imperatively
    useEffect(() => {
      const el = localRef.current;
      if (el) el.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
      <label htmlFor={inputId} className={`op-checkbox ${className}`}>
        <input
          ref={(el) => {
            (localRef as MutableRefObject<HTMLInputElement | null>).current = el;
            if (typeof ref === "function") ref(el);
            else if (ref) (ref as MutableRefObject<HTMLInputElement | null>).current = el;
          }}
          id={inputId}
          type="checkbox"
          className="op-checkbox__input"
          {...rest}
        />
        <span className="op-checkbox__icon-wrap" aria-hidden="true">
          <span className="op-checkbox__box">
            {/* Checkmark */}
            <svg className="op-checkbox__check" viewBox="0 0 12 10" fill="none">
              <path
                d="M1.5 5L4.5 8L10.5 2"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/* Dash (indeterminate) */}
            <svg className="op-checkbox__dash" viewBox="0 0 12 2" fill="none">
              <path
                d="M1 1H11"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </span>
        {label && <span className="op-checkbox__label">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
export default Checkbox;
