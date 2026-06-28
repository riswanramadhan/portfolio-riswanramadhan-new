import type { ReactNode } from "react";

interface SiteShellProps {
  children: ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <main className="relative min-h-screen w-full overflow-clip bg-[var(--bg)]">
      {children}
    </main>
  );
}
