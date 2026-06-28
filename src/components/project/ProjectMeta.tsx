import type { PortfolioProject } from "@/lib/portfolio-data";

export function ProjectMeta({ project }: { project: PortfolioProject }) {
  return (
    <aside className="rounded-[24px] border border-black/7 bg-white/72 p-6 shadow-[0_18px_55px_rgba(0,0,0,.07)] backdrop-blur-xl sm:p-7">
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/32">
        Project Information
      </p>
      <div className="mt-5 divide-y divide-black/8">
        {[
          ["Service", project.service],
          ["Timeline", project.timeline],
          ["Role", project.role],
        ].map(([label, value]) => (
          <div key={label} className="grid gap-2 py-4 first:pt-0 last:pb-0 sm:grid-cols-[76px_minmax(0,1fr)]">
            <p className="text-[11px] text-black/36">{label}</p>
            <p className="text-[15px] font-semibold leading-[1.35] tracking-[-0.02em] text-[#202020]">
              {value}
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
}
