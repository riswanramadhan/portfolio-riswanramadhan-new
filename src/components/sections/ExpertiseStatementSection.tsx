"use client";

import { useEffect, useRef, useState } from "react";
import {
  Code2,
  LayoutGrid,
  PenTool,
  Store,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

import { sectionContent } from "@/lib/portfolio-data";

const statement = sectionContent.expertise.statement;

interface Skill {
  label: string;
  icon: LucideIcon;
  color: string;
  desktopPosition: string;
}

const skills: Skill[] = [
  {
    label: "Product Strategy",
    icon: Zap,
    color: "#FF6A00",
    desktopPosition:
      "lg:left-3 lg:top-[116px] lg:rotate-[1deg] xl:left-16",
  },
  {
    label: "UI/UX Design",
    icon: PenTool,
    color: "#20A7F3",
    desktopPosition:
      "lg:left-6 lg:top-[245px] lg:-rotate-[2deg] xl:left-[92px]",
  },
  {
    label: "Frontend Dev",
    icon: Code2,
    color: "#3A3A3A",
    desktopPosition:
      "lg:left-2 lg:top-[380px] lg:-rotate-[3deg] xl:left-[58px]",
  },
  {
    label: "Design Systems",
    icon: LayoutGrid,
    color: "#FFCC00",
    desktopPosition:
      "lg:right-3 lg:top-[126px] lg:-rotate-[1deg] xl:right-16",
  },
  {
    label: "UMKM Digitalization",
    icon: Store,
    color: "#38E86B",
    desktopPosition:
      "lg:right-2 lg:top-[260px] lg:rotate-[2deg] xl:right-[52px]",
  },
  {
    label: "Project Execution",
    icon: Workflow,
    color: "#F15ACB",
    desktopPosition:
      "lg:right-5 lg:top-[390px] lg:rotate-[3deg] xl:right-[78px]",
  },
];

interface AnimatedWordProps {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
}

function AnimatedWord({
  word,
  index,
  total,
  progress,
  reducedMotion,
}: AnimatedWordProps) {
  const start = (index / total) * 0.72;
  const end = Math.min(start + 0.14, 0.82);
  const color = useTransform(
    progress,
    [start, end],
    ["#BDBDBD", "#111111"],
  );

  return (
    <motion.span
      aria-hidden="true"
      style={reducedMotion ? { color: "#111111" } : { color }}
      className="inline-block"
    >
      {word}
      {index < total - 1 ? "\u00a0" : null}
    </motion.span>
  );
}

interface HandwrittenHelloProps {
  reducedMotion: boolean;
}

const helloPaths = [
  "M18 72 C27 63 34 35 31 19 C29 9 21 12 20 28 C19 50 23 69 31 70 C40 71 41 48 50 48 C59 48 55 68 62 70",
  "M62 70 C71 70 80 64 80 56 C80 49 73 47 68 52 C61 59 66 71 78 71 C86 71 91 67 96 62",
  "M96 62 C105 54 116 39 116 22 C116 12 108 12 105 22 C101 38 103 59 111 68 C118 74 124 70 129 64",
  "M129 64 C138 55 148 39 148 22 C148 12 140 12 137 22 C133 38 136 61 144 69 C151 75 157 70 162 64",
  "M162 64 C165 50 180 45 190 52 C200 59 195 72 184 73 C173 75 166 68 168 58 C170 49 181 48 190 56 C200 65 208 71 220 68 C230 66 238 59 244 51",
] as const;

function HandwrittenHello({ reducedMotion }: HandwrittenHelloProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const isInView = useInView(svgRef, { amount: 0.65 });
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reducedMotion || !isInView) return;

    const cycleTimer = window.setInterval(() => {
      setCycle((current) => current + 1);
    }, 5000);

    return () => window.clearInterval(cycleTimer);
  }, [isInView, reducedMotion]);

  return (
    <motion.svg
      ref={svgRef}
      viewBox="0 0 262 92"
      role="img"
      aria-label="hello"
      className="mx-auto mb-7 h-auto w-[152px] overflow-visible sm:mb-9 sm:w-[190px]"
    >
      <title>hello</title>
      <AnimatePresence mode="wait">
        {isInView || reducedMotion ? (
          <motion.g
            key={cycle}
            initial={reducedMotion ? false : "hidden"}
            animate="visible"
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.22 }}
          >
            {helloPaths.map((path, index) => (
              <motion.path
                key={path}
                d={path}
                fill="none"
                stroke="#222222"
                strokeWidth="3.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={{
                  hidden: { pathLength: 0, opacity: 0 },
                  visible: {
                    pathLength: 1,
                    opacity: 1,
                    transition: {
                      pathLength: {
                        duration: reducedMotion ? 0 : 0.48,
                        delay: reducedMotion ? 0 : index * 0.28,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      opacity: {
                        duration: reducedMotion ? 0 : 0.12,
                        delay: reducedMotion ? 0 : index * 0.28,
                      },
                    },
                  },
                }}
              />
            ))}
          </motion.g>
        ) : null}
      </AnimatePresence>
    </motion.svg>
  );
}

interface SkillPillProps {
  skill: Skill;
  index: number;
  mobile?: boolean;
  reducedMotion: boolean;
}

function SkillPill({
  skill,
  index,
  mobile = false,
  reducedMotion,
}: SkillPillProps) {
  const Icon = skill.icon;

  return (
    <motion.div
      initial={
        reducedMotion
          ? false
          : {
              opacity: 0,
              x: mobile ? (index % 2 === 0 ? -24 : 24) : index < 3 ? -28 : 28,
              y: 12,
              scale: 0.96,
            }
      }
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: reducedMotion ? 0 : 0.7,
        delay: reducedMotion ? 0 : index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={
        mobile
          ? "max-w-full"
          : `absolute z-20 hidden lg:block ${skill.desktopPosition}`
      }
    >
      <motion.div
        animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : {
                duration: 4 + index * 0.35,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        whileHover={
          reducedMotion
            ? undefined
            : {
                y: -4,
                scale: 1.03,
                borderColor: `${skill.color}75`,
                boxShadow: `0 18px 46px ${skill.color}35`,
              }
        }
        className={
          mobile
            ? "group/skill relative flex min-h-10 max-w-full items-center gap-2 overflow-hidden rounded-full border border-white/70 bg-white/82 py-1.5 pl-1.5 pr-3 text-[12px] font-medium text-[#2a2a2a] shadow-[0_12px_30px_rgba(0,0,0,0.07)] backdrop-blur-xl"
            : "group/skill relative flex h-12 items-center gap-2.5 overflow-hidden rounded-full border border-white/70 bg-white/80 py-[7px] pl-[7px] pr-[18px] text-[15px] font-medium text-[#2a2a2a] shadow-[0_18px_45px_rgba(0,0,0,0.08)] backdrop-blur-xl"
        }
      >
        <span
          className="pointer-events-none absolute inset-y-0 left-[-55%] w-[46%] -skew-x-12 opacity-0 blur-[1px] transition-all duration-700 ease-[var(--ease-apple)] group-hover/skill:left-[118%] group-hover/skill:opacity-100"
          style={{
            background: `linear-gradient(90deg, ${skill.color}00, ${skill.color}4d, ${skill.color}00)`,
          }}
          aria-hidden="true"
        />
        <span
          className={
            mobile
              ? "relative z-10 flex size-7 shrink-0 items-center justify-center rounded-full text-white shadow-sm"
              : "relative z-10 flex size-[34px] shrink-0 items-center justify-center rounded-full text-white shadow-sm"
          }
          style={{ backgroundColor: skill.color }}
        >
          <Icon
            size={mobile ? 14 : 17}
            strokeWidth={2.4}
            aria-hidden="true"
          />
        </span>
        <span className="relative z-10 whitespace-nowrap">{skill.label}</span>
      </motion.div>
    </motion.div>
  );
}

export function ExpertiseStatementSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reducedMotion = Boolean(useReducedMotion());
  const words = statement.split(" ");
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 45%"],
  });

  return (
    <section
      ref={sectionRef}
      id="expertise"
      aria-labelledby="expertise-statement-heading"
      className="relative overflow-hidden bg-[var(--surface-warm)] px-5 py-10 sm:px-6 sm:py-14 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95),rgba(245,245,245,0.4)_45%,transparent_70%)]"
      />

      <div className="relative mx-auto flex min-h-[400px] w-full max-w-[1360px] min-w-0 items-center justify-center sm:min-h-[460px] lg:min-h-[520px]">
        {skills.map((skill, index) => (
          <SkillPill
            key={skill.label}
            skill={skill}
            index={index}
            reducedMotion={reducedMotion}
          />
        ))}

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: reducedMotion ? 0 : 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10 mx-auto w-full min-w-0 text-center lg:max-w-[620px] xl:max-w-[760px] 2xl:max-w-[850px]"
        >
          <HandwrittenHello reducedMotion={reducedMotion} />

          <h2
            id="expertise-statement-heading"
            aria-label={statement}
            className="text-[32px] font-normal leading-[1.12] tracking-[-0.055em] sm:text-[42px] sm:leading-[1.08] lg:text-[56px] xl:text-[64px]"
          >
            {words.map((word, index) => (
              <AnimatedWord
                key={`${word}-${index}`}
                word={word}
                index={index}
                total={words.length}
                progress={scrollYProgress}
                reducedMotion={reducedMotion}
              />
            ))}
          </h2>

          <div className="mx-auto mt-7 flex w-full max-w-[620px] flex-wrap items-center justify-center gap-2.5 text-left sm:mt-9 sm:gap-3 lg:hidden">
            {skills.map((skill, index) => (
              <SkillPill
                key={skill.label}
                skill={skill}
                index={index}
                mobile
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
