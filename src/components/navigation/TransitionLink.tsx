"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

import { useNavigationTransition } from "@/components/navigation/NavigationProvider";

interface TransitionLinkProps
  extends Omit<ComponentProps<typeof Link>, "href" | "onClick"> {
  href: string;
  transitionLabel?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export function TransitionLink({
  href,
  transitionLabel,
  onClick,
  children,
  ...props
}: TransitionLinkProps) {
  const { navigate } = useNavigationTransition();

  return (
    <Link
      href={href}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }
        event.preventDefault();
        navigate(href, transitionLabel, { x: event.clientX, y: event.clientY });
      }}
    >
      {children}
    </Link>
  );
}
