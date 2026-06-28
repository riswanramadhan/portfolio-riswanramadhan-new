import type { ElementType } from "react";
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

interface TechIconProps {
  tool: string;
  inverted?: boolean;
  compact?: boolean;
  className?: string;
}

export function TechIcon({
  tool,
  inverted = false,
  compact = false,
  className,
}: TechIconProps) {
  const Icon = iconMap[tool] ?? Wrench;

  return (
    <span
      className={cn(
        "inline-flex min-h-9 items-center gap-2 rounded-full border px-3 py-2 text-[11px] font-medium shadow-[0_7px_20px_rgba(0,0,0,.055)] transition-[transform,background-color,border-color,box-shadow] duration-500 ease-[var(--ease-apple)] hover:-translate-y-0.5",
        inverted
          ? "border-white/12 bg-white/7 text-white/76 hover:border-white/20 hover:bg-white/11"
          : "border-black/8 bg-white/82 text-[#3f3f3f] hover:border-black/13 hover:bg-white hover:shadow-[0_11px_26px_rgba(0,0,0,.09)]",
        compact && "min-h-8 gap-1.5 px-2.5 py-1.5 text-[10px]",
        className,
      )}
    >
      <Icon className={cn("size-3.5 shrink-0", compact && "size-3")} aria-hidden="true" />
      <span>{tool}</span>
    </span>
  );
}
