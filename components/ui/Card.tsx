"use client";

import { HTMLAttributes, ImgHTMLAttributes, ReactNode, forwardRef } from "react";

// ─── Types ────────────────────────────────────────────────────

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Adds hover shadow (shadow/02) and pointer cursor */
  interactive?: boolean;
}

// ─── Sub-components ───────────────────────────────────────────

/** Image or custom media slot. Renders a placeholder div when `src` is omitted. */
export function CardMedia({
  src,
  alt = "",
  className = "",
  children,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement> & { children?: ReactNode }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={`op-card__media ${className}`} {...rest} />;
  }
  return (
    <div className={`op-card__media op-card__media--placeholder ${className}`}>
      {children ?? (
        <svg viewBox="0 0 24 24" width={40} height={40} fill="currentColor" aria-hidden="true">
          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
        </svg>
      )}
    </div>
  );
}

/** Padded content wrapper with vertical flex layout */
export function CardContent({ className = "", children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`op-card__content ${className}`} {...rest}>
      {children}
    </div>
  );
}

/** Small uppercase label above the title */
export function CardOverline({ className = "", children, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`op-card__overline ${className}`} {...rest}>
      {children}
    </p>
  );
}

/** Card heading — 16px bold, text-default */
export function CardTitle({ className = "", children, ...rest }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={`op-card__title ${className}`} {...rest}>
      {children}
    </h3>
  );
}

/** Body text — 14px regular, text-subtle */
export function CardBody({
  clamped = false,
  className = "",
  children,
  ...rest
}: HTMLAttributes<HTMLParagraphElement> & { clamped?: boolean }) {
  return (
    <p
      className={["op-card__body", clamped && "op-card__body--clamped", className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </p>
  );
}

/** 1px horizontal divider using border-default token */
export function CardDivider({ className = "", ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`op-card__divider ${className}`} role="separator" {...rest} />;
}

/** Flex row for action buttons — 16px top gap */
export function CardActions({ className = "", children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`op-card__actions ${className}`} {...rest}>
      {children}
    </div>
  );
}

/** Absolutely-positioned top-right slot for ⋮ or other trailing controls */
export function CardTrailing({ className = "", children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`op-card__trailing ${className}`} {...rest}>
      {children}
    </div>
  );
}

// ─── Card (container) ─────────────────────────────────────────

const CardBase = forwardRef<HTMLDivElement, CardProps>(
  ({ interactive = false, className = "", children, ...rest }, ref) => (
    <div
      ref={ref}
      className={["op-card", interactive && "op-card--interactive", className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </div>
  )
);
CardBase.displayName = "Card";

// Attach sub-components with proper casting
const Card = CardBase as typeof CardBase & {
  Media:    typeof CardMedia;
  Content:  typeof CardContent;
  Overline: typeof CardOverline;
  Title:    typeof CardTitle;
  Body:     typeof CardBody;
  Divider:  typeof CardDivider;
  Actions:  typeof CardActions;
  Trailing: typeof CardTrailing;
};

Card.Media    = CardMedia;
Card.Content  = CardContent;
Card.Overline = CardOverline;
Card.Title    = CardTitle;
Card.Body     = CardBody;
Card.Divider  = CardDivider;
Card.Actions  = CardActions;
Card.Trailing = CardTrailing;

export default Card;
