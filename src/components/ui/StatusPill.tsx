import { cn } from "@/lib/utils";

interface StatusPillProps {
  label: string;
  className?: string;
  inverted?: boolean;
}

export function StatusPill({
  label,
  className,
  inverted = false,
}: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border px-4 py-2 text-[12px] font-medium tracking-[-0.01em] shadow-[0_10px_30px_rgba(0,0,0,.1)] backdrop-blur-xl sm:text-[13px]",
        inverted
          ? "border-white/10 bg-white/8 text-white"
          : "border-black/5 bg-white/78 text-[#1c1c1c]",
        className,
      )}
    >
      <span
        className="relative flex size-2 items-center justify-center"
        aria-hidden="true"
      >
        <span className="absolute size-2 animate-ping rounded-full bg-[#18d879]/35 motion-reduce:animate-none" />
        <span className="relative size-1.5 rounded-full bg-[#18d879] shadow-[0_0_0_3px_rgba(24,216,121,.12)]" />
      </span>
      {label}
    </span>
  );
}
