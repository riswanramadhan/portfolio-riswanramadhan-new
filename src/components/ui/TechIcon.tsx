import {
  useId,
  type CSSProperties,
  type ElementType,
  type SVGProps,
} from "react";
import {
  Boxes,
  Database,
  Image as ImageIcon,
  LayoutDashboard,
  MonitorSmartphone,
  Palette,
  PenTool,
  Rocket,
  Search,
  ServerCog,
  Sparkles,
  Workflow,
  Wrench,
} from "lucide-react";
import {
  SiCloudflare,
  SiFigma,
  SiGooglegemini,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiPostgresql,
  SiReact,
  SiSupabase,
  SiVercel,
} from "react-icons/si";

import { cn } from "@/lib/utils";

const iconMap: Record<string, ElementType> = {
  "Next.js": SiNextdotjs,
  React: SiReact,
  Supabase: SiSupabase,
  Laravel: SiLaravel,
  "Laravel Filament": SiLaravel,
  MySQL: SiMysql,
  Figma: SiFigma,
  Cloudflare: SiCloudflare,
  Vercel: SiVercel,
  Neon: SiPostgresql,
  SEO: Search,
  "Google Gemini": SiGooglegemini,
  "Local Storage": Database,
  "Project Management": Workflow,
  "Product Strategy": Boxes,
  "Graphic Design": PenTool,
  "Brand Identity": Sparkles,
  "Social Media Design": ImageIcon,
  Canva: Palette,
  "UI Design": LayoutDashboard,
  "UX Design": Workflow,
  "Web Redesign": MonitorSmartphone,
  Prototype: Boxes,
  "Admin Dashboard": LayoutDashboard,
  "Internal System": ServerCog,
  Deployment: Rocket,
  "Responsive Website": MonitorSmartphone,
};

const brandColorMap: Record<string, string> = {
  "Next.js": "#000000",
  React: "#61DAFB",
  Supabase: "#3ECF8E",
  Laravel: "#FF2D20",
  "Laravel Filament": "#FF2D20",
  MySQL: "#4479A1",
  Cloudflare: "#F38020",
  Vercel: "#000000",
  Neon: "#4169E1",
  SEO: "#4285F4",
  "Local Storage": "#F59E0B",
  "Project Management": "#6366F1",
  "Product Strategy": "#8B5CF6",
  "Graphic Design": "#EC4899",
  "Brand Identity": "#F43F5E",
  "Social Media Design": "#F97316",
  Canva: "#00C4CC",
  "UI Design": "#7C3AED",
  "UX Design": "#0891B2",
  "Web Redesign": "#2563EB",
  Prototype: "#EA580C",
  "Admin Dashboard": "#0EA5E9",
  "Internal System": "#64748B",
  Deployment: "#10B981",
  "Responsive Website": "#06B6D4",
};

function FigmaBrandIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 38 57" fill="none" {...props}>
      <path d="M9.5 0H19V19H9.5A9.5 9.5 0 0 1 9.5 0Z" fill="#F24E1E" />
      <path d="M19 0H28.5A9.5 9.5 0 0 1 28.5 19H19V0Z" fill="#FF7262" />
      <path d="M9.5 19H19V38H9.5A9.5 9.5 0 0 1 9.5 19Z" fill="#A259FF" />
      <circle cx="28.5" cy="28.5" r="9.5" fill="#1ABCFE" />
      <path d="M19 47.5A9.5 9.5 0 1 1 0 47.5A9.5 9.5 0 0 1 9.5 38H19V47.5Z" fill="#0ACF83" />
    </svg>
  );
}

function GeminiBrandIcon(props: SVGProps<SVGSVGElement>) {
  const gradientId = `gemini-gradient-${useId().replace(/:/g, "")}`;

  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <defs>
        <linearGradient id={gradientId} x1="3" y1="21" x2="21" y2="3" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2A7FFF" />
          <stop offset=".48" stopColor="#8E75B2" />
          <stop offset="1" stopColor="#D96570" />
        </linearGradient>
      </defs>
      <path
        d="M12 1.25C12.76 7.28 16.72 11.24 22.75 12C16.72 12.76 12.76 16.72 12 22.75C11.24 16.72 7.28 12.76 1.25 12C7.28 11.24 11.24 7.28 12 1.25Z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}

interface TechIconProps {
  tool: string;
  inverted?: boolean;
  compact?: boolean;
  brandOnHover?: boolean;
  className?: string;
}

export function TechIcon({
  tool,
  inverted = false,
  compact = false,
  brandOnHover = true,
  className,
}: TechIconProps) {
  const Icon = iconMap[tool] ?? Wrench;
  const mappedBrandColor = brandColorMap[tool] ?? "#007AFF";
  const brandColor =
    inverted && (tool === "Next.js" || tool === "Vercel")
      ? "#FFFFFF"
      : mappedBrandColor;
  const MulticolorIcon =
    tool === "Figma"
      ? FigmaBrandIcon
      : tool === "Google Gemini"
        ? GeminiBrandIcon
        : null;
  const iconStyle = brandColor
    ? ({ "--tech-icon-color": brandColor } as CSSProperties)
    : undefined;

  return (
    <span
      style={iconStyle}
      className={cn(
        "group/tech inline-flex min-h-9 items-center gap-2 rounded-full border px-3 py-2 text-[11px] font-medium shadow-[0_7px_20px_rgba(0,0,0,.055)] transition-[transform,background-color,border-color,box-shadow] duration-500 ease-[var(--ease-apple)] hover:-translate-y-0.5",
        inverted
          ? "border-white/12 bg-white/7 text-white/76 hover:border-white/20 hover:bg-white/11"
          : "border-black/8 bg-white/82 text-[#3f3f3f] hover:border-black/13 hover:bg-white hover:shadow-[0_11px_26px_rgba(0,0,0,.09)]",
        compact && "min-h-8 gap-1.5 px-2.5 py-1.5 text-[10px]",
        className,
      )}
    >
      <span className={cn("relative size-3.5 shrink-0", compact && "size-3")} aria-hidden="true">
        <Icon
          className={cn(
            "absolute inset-0 size-full transition-[color,opacity,transform] duration-500 ease-[var(--ease-apple)]",
            brandOnHover && brandColor && !MulticolorIcon &&
              "scale-110 text-[var(--tech-icon-color)] md:scale-100 md:text-current md:group-hover/tech:scale-110 md:group-hover/tech:text-[var(--tech-icon-color)]",
            brandOnHover && MulticolorIcon &&
              "scale-90 opacity-0 md:scale-100 md:opacity-100 md:group-hover/tech:scale-90 md:group-hover/tech:opacity-0",
          )}
        />
        {brandOnHover && MulticolorIcon ? (
          <MulticolorIcon className="absolute inset-0 size-full scale-110 opacity-100 transition-[opacity,transform] duration-500 ease-[var(--ease-apple)] md:scale-90 md:opacity-0 md:group-hover/tech:scale-110 md:group-hover/tech:opacity-100" />
        ) : null}
      </span>
      <span>{tool}</span>
    </span>
  );
}
