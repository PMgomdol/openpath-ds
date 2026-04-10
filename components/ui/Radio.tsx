"use client";

import { InputHTMLAttributes, forwardRef, useId } from "react";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Visible label text */
  label?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, id: idProp, className = "", ...rest }, ref) => {
    const autoId = useId();
    const inputId = idProp ?? autoId;

    return (
      <label htmlFor={inputId} className={`op-radio ${className}`}>
        <input
          ref={ref}
          id={inputId}
          type="radio"
          className="op-radio__input"
          {...rest}
        />
        <span className="op-radio__icon-wrap" aria-hidden="true">
          <span className="op-radio__icon" />
        </span>
        {label && <span className="op-radio__label">{label}</span>}
      </label>
    );
  }
);

Radio.displayName = "Radio";
export default Radio;
