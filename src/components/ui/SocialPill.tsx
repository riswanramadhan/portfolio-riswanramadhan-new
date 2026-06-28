import type { ElementType } from "react";
import Image from "next/image";
import { UserRound } from "lucide-react";
import {
  FaBehance,
  FaDribbble,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa6";

import {
  profile as portfolioProfile,
  type SocialIconName,
  type SocialLink,
} from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

const iconMap: Record<SocialIconName, ElementType> = {
  Github: FaGithub,
  Instagram: FaInstagram,
  Linkedin: FaLinkedinIn,
  Behance: FaBehance,
  Dribbble: FaDribbble,
  User: UserRound,
};

interface SocialPillProps {
  link: SocialLink;
  className?: string;
  compact?: boolean;
  inverted?: boolean;
  iconOnlyOnMobile?: boolean;
  iconOnly?: boolean;
  profile?: boolean;
}

export function SocialPill({
  link,
  className,
  compact = false,
  inverted = false,
  iconOnlyOnMobile = false,
  iconOnly = false,
  profile = false,
}: SocialPillProps) {
  const Icon = iconMap[link.icon];

  return (
    <a
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noreferrer" : undefined}
      aria-label={link.external ? `Visit ${link.label}` : link.label}
      data-social={link.icon.toLowerCase()}
      className={cn(
        "social-brand group inline-flex min-h-10 items-center rounded-full border px-4 py-2 text-[12px] font-medium shadow-[0_9px_24px_rgba(0,0,0,.09)] backdrop-blur-xl transition-[transform,background-color,border-color,color,box-shadow] duration-500 ease-[var(--ease-apple)] hover:-translate-y-0.5 hover:text-white hover:shadow-[0_14px_34px_rgba(0,0,0,.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2 sm:text-[13px]",
        profile ? "justify-start gap-2" : "justify-between gap-4",
        inverted
          ? "border-white/12 bg-white/7 text-white hover:bg-white/12"
          : "border-black/7 bg-white/72 text-[#222] hover:border-black/12 hover:bg-white",
        compact && "min-h-9 gap-2.5 px-3.5 py-1.5",
        iconOnlyOnMobile &&
          "size-10 min-h-10 justify-center gap-0 px-0 sm:size-auto sm:min-h-9 sm:justify-between sm:gap-2.5 sm:px-3.5",
        iconOnly && "size-10 min-h-10 justify-center gap-0 px-0",
        link.icon === "Github" && "hover:border-[#24292f] hover:bg-[#24292f]",
        link.icon === "Instagram" &&
          "hover:border-[#d62976] hover:bg-[linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)]",
        link.icon === "Linkedin" && "hover:border-[#0a66c2] hover:bg-[#0a66c2]",
        link.icon === "Behance" && "hover:border-[#1769ff] hover:bg-[#1769ff]",
        link.icon === "Dribbble" && "hover:border-[#ea4c89] hover:bg-[#ea4c89]",
        profile &&
          "w-auto min-w-0 gap-2 border-black bg-[#1c1c1e] py-1.5 pl-1.5 pr-3 text-white shadow-[0_12px_32px_rgba(0,0,0,.2)] hover:border-black hover:bg-black hover:shadow-[0_16px_40px_rgba(0,0,0,.3)]",
        className,
      )}
    >
      {profile ? (
        <>
          <span className="relative size-8 shrink-0 overflow-hidden rounded-full border border-white/18 bg-white/10">
            <Image
              src={portfolioProfile.avatar}
              alt=""
              fill
              sizes="32px"
              className="object-cover object-top"
            />
          </span>
          <span>{link.label}</span>
        </>
      ) : (
        <>
          <span
            className={
              iconOnly
                ? "sr-only"
                : iconOnlyOnMobile
                  ? "sr-only sm:not-sr-only"
                  : undefined
            }
          >
            {link.label}
          </span>
          <Icon
            className="social-brand__icon size-3.5 opacity-70 transition-transform duration-500 ease-[var(--ease-apple)] group-hover:opacity-100"
            aria-hidden="true"
          />
        </>
      )}
    </a>
  );
}
