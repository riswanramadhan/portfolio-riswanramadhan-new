import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface PillButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "dark" | "light";
  icon?: boolean;
  className?: string;
  ariaLabel?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  target?: "_blank";
  rel?: string;
  disabled?: boolean;
}

export function PillButton({
  children,
  href,
  variant = "dark",
  icon = true,
  className,
  ariaLabel,
  onClick,
  type = "button",
  target,
  rel,
  disabled,
}: PillButtonProps) {
  const classes = cn(
    "group inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full px-5 py-2.5 text-[13px] font-medium transition-[transform,background-color,box-shadow] duration-500 ease-[var(--ease-apple)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-45",
    variant === "dark"
      ? "bg-[#171717] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,.14),0_12px_28px_rgba(0,0,0,.24)] hover:bg-black hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,.18),0_16px_34px_rgba(0,0,0,.28)]"
      : "border border-black/10 bg-white/72 text-black shadow-[0_8px_20px_rgba(0,0,0,.08)] backdrop-blur-xl hover:bg-white",
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {icon ? (
        <ArrowUpRight
          className="icon-motion-diagonal size-4 transition-transform duration-500 ease-[var(--ease-apple)]"
          strokeWidth={1.8}
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick}
        target={target}
        rel={rel}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
