import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type SectionFrameVariant = "light" | "white" | "soft" | "dark" | "glass";

interface SectionFrameProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: SectionFrameVariant;
}

const variantStyles: Record<SectionFrameVariant, string> = {
  light: "bg-[var(--surface-warm)] text-[var(--ink)]",
  white: "bg-white text-[var(--ink)]",
  soft: "bg-[var(--surface-soft)] text-[var(--ink)]",
  dark: "bg-[var(--dark)] text-white",
  glass: "bg-[var(--surface-warm)] text-[var(--ink)]",
};

export function SectionFrame({
  children,
  variant = "light",
  className,
  ...props
}: SectionFrameProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        variantStyles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
