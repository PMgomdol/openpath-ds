"use client";

import { InputHTMLAttributes, forwardRef, useId } from "react";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Visible label text */
  label?: string;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, id: idProp, className = "", ...rest }, ref) => {
    const autoId = useId();
    const inputId = idProp ?? autoId;

    return (
      <label htmlFor={inputId} className={`op-switch ${className}`}>
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          role="switch"
          // aria-checked is automatically derived from the checked property by the browser.
          // Passing it explicitly here ensures compatibility with older AT.
          aria-checked={rest.checked}
          className="op-switch__input"
          {...rest}
        />
        <span className="op-switch__track" aria-hidden="true">
          <span className="op-switch__thumb" />
        </span>
        {label && <span className="op-switch__label">{label}</span>}
      </label>
    );
  }
);

Switch.displayName = "Switch";
export default Switch;
