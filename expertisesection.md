# Design Spec — Expertise Statement Section

## Objective

Create a new section for the portfolio homepage inspired by the provided reference image.

The section must be placed **after the Hero section** and **before the Selected Work section**.

This section should communicate the user’s core skill positioning as a modern digital product builder: UI/UX, frontend engineering, product thinking, UMKM digitalization, and project execution.

The visual style must stay consistent with the existing portfolio theme:

* Apple-inspired
* clean monochrome
* soft shadows
* floating pill elements
* premium minimal layout
* smooth scroll-based animation

---

## Target Placement

Update the homepage file:

```txt
src/app/page.tsx
```

Insert this section in this order:

```tsx
<HeroSection />
<ExpertiseStatementSection />
<SelectedWorkSection />
```

Create the new component here:

```txt
src/components/sections/ExpertiseStatementSection.tsx
```

---

## Section Name

Use:

```tsx
ExpertiseStatementSection
```

---

## Visual Reference Analysis

The reference image contains:

1. A clean white/very light gray full-width section.
2. A small italic greeting text at the top center: `Hallo!`
3. A large centered statement with multiple text lines.
4. Main text uses thin, rounded, modern typography.
5. Some parts of the sentence are darker, while other parts are disabled/light gray.
6. Around the statement, there are floating pill badges:

   * 3 badges on the left
   * 3 badges on the right
7. Each badge has:

   * circular colored icon
   * small text label
   * white/soft transparent pill background
   * soft shadow
   * slight rotation or organic placement
8. The section feels airy, calm, premium, and editorial.

---

## Content Direction

Use this content:

### Greeting

```txt
Hallo!
```

Style:

* centered
* italic serif
* font size desktop: 32px
* font size mobile: 22px
* color: `#333333`
* margin-bottom: 36px

Recommended class:

```tsx
className="font-serif italic text-[32px] text-neutral-800"
```

---

## Main Statement Text

Use this sentence:

```txt
I blend product thinking, clean interface design, and frontend engineering to build digital experiences that help local businesses grow.
```

The line break should visually become:

```txt
I blend product thinking,
clean interface design, and
frontend engineering to build digital
experiences that help local businesses grow.
```

The exact line break does not need to be hard-coded, but max-width must make the text wrap similarly.

Style:

* max width: `850px`
* centered
* font size desktop: `64px`
* font size laptop: `56px`
* font size tablet: `42px`
* font size mobile: `32px`
* line height: `1.08`
* font weight: `400`
* letter spacing: `-0.055em`
* text align center

Use a rounded modern sans-serif. If the project already uses a font, keep it consistent. If not, use `Inter`, `Geist`, or the existing global font.

---

## Scroll Text Animation Requirement

The statement text must initially appear as disabled/light gray.

When the user scrolls into this section, the text should progressively turn black, word by word or segment by segment.

Animation behavior:

* Initial text color: `#BDBDBD`
* Active text color: `#111111`
* Animation is controlled by scroll progress.
* As the section enters viewport, words start changing from gray to black.
* The animation should feel like the black color is filling the disabled text.
* Do not use a sudden fade.
* Do not animate letters one by one because it can feel noisy.
* Animate by word or phrase.

Use Motion for React:

```tsx
import { motion, useScroll, useTransform } from "motion/react";
```

Implementation direction:

* Create a `ref` for the section.
* Use `useScroll({ target: ref, offset: ["start 75%", "end 45%"] })`.
* Split the sentence into words.
* For every word, calculate a small progress range.
* Each word should have a color transform from `#BDBDBD` to `#111111`.

Example logic:

```tsx
const words = statement.split(" ");

const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ["start 75%", "end 45%"],
});
```

For each word:

```tsx
const start = index / words.length;
const end = start + 0.16;
const color = useTransform(scrollYProgress, [start, end], ["#BDBDBD", "#111111"]);
```

Then render:

```tsx
<motion.span style={{ color }}>
  {word}{" "}
</motion.span>
```

Important:
If React hook rules become an issue because `useTransform` is inside a map, create a child component:

```tsx
function AnimatedWord({ word, index, total, progress }) {
  const start = index / total;
  const end = Math.min(start + 0.18, 1);
  const color = useTransform(progress, [start, end], ["#BDBDBD", "#111111"]);

  return (
    <motion.span style={{ color }} className="inline-block">
      {word}&nbsp;
    </motion.span>
  );
}
```

---

## Floating Skill Pills

There must be 6 floating pills:

* 3 on the left
* 3 on the right

These should describe the user’s real skill profile.

### Left Pills

1. `Product Strategy`
2. `UI/UX Design`
3. `Frontend Dev`

### Right Pills

1. `Design Systems`
2. `UMKM Digitalization`
3. `Project Execution`

---

## Pill Visual Style

Each pill:

* position absolute on desktop
* white or semi-transparent white background
* backdrop blur
* rounded full
* height: 48px
* padding left/right: 14px/18px
* display flex
* align center
* gap: 10px
* font size: 15px
* text color: `#2a2a2a`
* border: `1px solid rgba(255,255,255,0.7)`
* box shadow: `0 18px 45px rgba(0,0,0,0.08)`

Icon:

* circle size: 34px x 34px
* white lightning icon inside or lucide icon
* icon size: 17px
* circle background color depends on pill

Use lucide-react icons:

```tsx
import {
  Zap,
  PenTool,
  Code2,
  LayoutGrid,
  Store,
  Workflow
} from "lucide-react";
```

Icon mapping:

* Product Strategy: `Zap`, orange `#FF6A00`
* UI/UX Design: `PenTool`, blue `#20A7F3`
* Frontend Dev: `Code2`, dark gray `#3A3A3A`
* Design Systems: `LayoutGrid`, yellow `#FFCC00`
* UMKM Digitalization: `Store`, green `#38E86B`
* Project Execution: `Workflow`, pink `#F15ACB`

---

## Desktop Pill Positioning

The floating pills must surround the center text like the reference.

Use a relative section wrapper.

Suggested positioning:

```tsx
Product Strategy:
left: 64px;
top: 116px;
rotate: 1deg;

UI/UX Design:
left: 92px;
top: 245px;
rotate: -2deg;

Frontend Dev:
left: 58px;
top: 380px;
rotate: -3deg;

Design Systems:
right: 64px;
top: 126px;
rotate: -1deg;

UMKM Digitalization:
right: 52px;
top: 260px;
rotate: 2deg;

Project Execution:
right: 78px;
top: 390px;
rotate: 3deg;
```

Use responsive-safe Tailwind arbitrary classes or inline style.

---

## Mobile Behavior

On mobile:

* Do not keep pills absolutely floating around text because it will be cramped.
* Hide desktop floating layout below `md`.
* Render the 6 pills in a horizontal scroll or wrapping grid below the statement.

Mobile pill container:

* margin top: 36px
* display flex
* overflow-x-auto
* gap: 12px
* padding bottom: 12px
* no visible scrollbar if possible

Mobile text:

* font size: 32px
* line height: 1.12
* max width full
* horizontal padding 24px

---

## Section Layout

Section wrapper:

```tsx
<section
  ref={sectionRef}
  className="relative overflow-hidden px-6 py-28 sm:py-32 lg:py-40"
>
```

Inner container:

```tsx
<div className="relative mx-auto flex min-h-[560px] max-w-[1360px] items-center justify-center">
```

Center content:

```tsx
<div className="relative z-10 mx-auto max-w-[900px] text-center">
```

Add subtle background light effect:

```tsx
<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95),rgba(245,245,245,0.4)_45%,transparent_70%)]" />
```

---

## Animation for Floating Pills

Use Motion for React.

Each pill should:

* fade in
* move slightly upward on load
* have subtle floating loop animation
* have tiny hover lift

Initial:

```tsx
initial={{ opacity: 0, y: 18, scale: 0.96 }}
```

Animate:

```tsx
whileInView={{ opacity: 1, y: 0, scale: 1 }}
```

Transition:

```tsx
transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
```

Floating loop:
Use a nested `motion.div` inside the main animated wrapper:

```tsx
animate={{ y: [0, -8, 0] }}
transition={{
  duration: 4 + index * 0.35,
  repeat: Infinity,
  ease: "easeInOut",
}}
```

Hover:

```tsx
whileHover={{ y: -4, scale: 1.03 }}
```

Do not make the pills move too much. Keep it premium and subtle.

---

## Component Implementation Notes

Suggested component structure:

```tsx
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { Zap, PenTool, Code2, LayoutGrid, Store, Workflow } from "lucide-react";

const statement =
  "I blend product thinking, clean interface design, and frontend engineering to build digital experiences that help local businesses grow.";

const skills = [
  {
    label: "Product Strategy",
    icon: Zap,
    color: "#FF6A00",
    position: "left-[64px] top-[116px] rotate-[1deg]",
  },
  {
    label: "UI/UX Design",
    icon: PenTool,
    color: "#20A7F3",
    position: "left-[92px] top-[245px] -rotate-[2deg]",
  },
  {
    label: "Frontend Dev",
    icon: Code2,
    color: "#3A3A3A",
    position: "left-[58px] top-[380px] -rotate-[3deg]",
  },
  {
    label: "Design Systems",
    icon: LayoutGrid,
    color: "#FFCC00",
    position: "right-[64px] top-[126px] -rotate-[1deg]",
  },
  {
    label: "UMKM Digitalization",
    icon: Store,
    color: "#38E86B",
    position: "right-[52px] top-[260px] rotate-[2deg]",
  },
  {
    label: "Project Execution",
    icon: Workflow,
    color: "#F15ACB",
    position: "right-[78px] top-[390px] rotate-[3deg]",
  },
];
```

Use child components:

```tsx
function AnimatedWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = Math.min(start + 0.18, 1);
  const color = useTransform(progress, [start, end], ["#BDBDBD", "#111111"]);

  return (
    <motion.span style={{ color }} className="inline-block">
      {word}&nbsp;
    </motion.span>
  );
}
```

Skill pill component:

```tsx
function SkillPill({ skill, index, mobile = false }) {
  const Icon = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={
        mobile
          ? "shrink-0"
          : `absolute hidden lg:block ${skill.position}`
      }
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 4 + index * 0.35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{ y: -4, scale: 1.03 }}
        className="flex h-12 items-center gap-2.5 rounded-full border border-white/70 bg-white/75 px-3.5 pr-5 text-[15px] font-medium text-neutral-800 shadow-[0_18px_45px_rgba(0,0,0,0.08)] backdrop-blur-xl"
      >
        <span
          className="flex size-8 items-center justify-center rounded-full text-white shadow-sm"
          style={{ backgroundColor: skill.color }}
        >
          <Icon size={17} strokeWidth={2.4} />
        </span>
        <span className="whitespace-nowrap">{skill.label}</span>
      </motion.div>
    </motion.div>
  );
}
```

---

## Main Component Expected Output

The final component should roughly follow this structure:

```tsx
export function ExpertiseStatementSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const words = statement.split(" ");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 45%"],
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-28 sm:py-32 lg:py-40"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95),rgba(245,245,245,0.4)_45%,transparent_70%)]" />

      <div className="relative mx-auto flex min-h-[560px] max-w-[1360px] items-center justify-center">
        {skills.map((skill, index) => (
          <SkillPill key={skill.label} skill={skill} index={index} />
        ))}

        <div className="relative z-10 mx-auto max-w-[900px] text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-9 font-serif text-2xl italic text-neutral-800 sm:text-[32px]"
          >
            Hallo!
          </motion.p>

          <h2 className="text-[32px] font-normal leading-[1.12] tracking-[-0.055em] sm:text-[42px] md:text-[56px] lg:text-[64px]">
            {words.map((word, index) => (
              <AnimatedWord
                key={`${word}-${index}`}
                word={word}
                index={index}
                total={words.length}
                progress={scrollYProgress}
              />
            ))}
          </h2>

          <div className="mt-10 flex gap-3 overflow-x-auto pb-3 lg:hidden">
            {skills.map((skill, index) => (
              <SkillPill
                key={skill.label}
                skill={skill}
                index={index}
                mobile
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## Quality Checklist

Before finishing, verify:

* [ ] Section is placed after Hero and before Selected Work.
* [ ] The greeting `Hallo!` appears centered above the statement.
* [ ] The main statement is large, centered, and premium.
* [ ] Text starts disabled gray and turns black progressively on scroll.
* [ ] There are exactly 3 skill pills on the left and 3 on the right on desktop.
* [ ] Skill pills float subtly and feel organic.
* [ ] Pills use soft shadows, rounded full shape, and colored circular icons.
* [ ] Mobile layout does not break.
* [ ] Mobile pills become horizontal scroll or clean wrapping row.
* [ ] The section matches the existing Apple-like monochrome portfolio theme.
* [ ] No unrelated homepage section is changed.
* [ ] No extra dependency is installed except Motion and lucide-react if not already installed.
* [ ] TypeScript has no errors.
* [ ] ESLint passes.

---

## Codex Task

Implement only this new `ExpertiseStatementSection`.

Do not redesign the full homepage.

Steps:

1. Create `src/components/sections/ExpertiseStatementSection.tsx`.
2. Add the section to `src/app/page.tsx` after `<HeroSection />` and before `<SelectedWorkSection />`.
3. Use Motion for React for scroll-based word color animation.
4. Use lucide-react icons for the six floating skill pills.
5. Keep the style consistent with the previous Apple-like portfolio design.
6. Make the UI visually close to the uploaded reference.
7. Run lint and fix all TypeScript/ESLint errors.
