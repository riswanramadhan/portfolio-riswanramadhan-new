import type { Project } from "@/lib/portfolio-data";

export function ProjectMeta({ project }: { project: Project }) {
  return (
    <aside className="grid grid-cols-2 gap-x-7 gap-y-9 border-t border-black/8 pt-7 sm:grid-cols-3 lg:grid-cols-1 lg:border-t-0 lg:pt-0 lg:text-right">
      <div>
        <p className="mb-2 text-[12px] text-black/36">Service</p>
        <p className="text-[17px] font-semibold leading-[1.25] tracking-[-0.025em] text-[#202020] sm:text-[19px]">
          {project.service}
        </p>
      </div>
      <div>
        <p className="mb-2 text-[12px] text-black/36">Timeline</p>
        <p className="text-[17px] font-semibold tracking-[-0.025em] text-[#202020] sm:text-[19px]">
          {project.timeline}
        </p>
      </div>
      <div className="col-span-2 sm:col-span-1">
        <p className="mb-3 text-[12px] text-black/36">Tools</p>
        <div className="flex flex-wrap gap-2 lg:justify-end">
          {project.tools.map((tool) => (
            <span
              key={tool}
              className="inline-flex min-h-10 items-center justify-center rounded-[11px] border border-black/6 bg-white px-3 text-[11px] font-semibold text-[#333] shadow-[0_8px_24px_rgba(0,0,0,.07)]"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
