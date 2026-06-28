# Codex Implementation Prompt — Portfolio Website

Copy this into Codex/VSCode agent.

```md
Build my personal portfolio website from zero using Next.js App Router, TypeScript, Tailwind CSS, Motion for React, and lucide-react.

Context:
I want the UI to closely match a premium Apple-inspired monochrome portfolio reference: cloudy grey background, white frosted hero card, dark graphite experience card, large uppercase typography, slash section labels like /SERVICE and /EXPERIENCE, pill buttons, subtle glassmorphism, soft shadows, and smooth modern animation.

Project rule:
- Use hard-coded content only.
- No CMS, no backend, no auth.
- Make all data easy to revise in `src/lib/portfolio-data.ts`.
- Build from scratch using Next.js full.
- Prioritize desktop visual fidelity to the reference first.

Install/use:
- Next.js App Router
- TypeScript
- Tailwind CSS
- motion
- lucide-react
- clsx
- tailwind-merge

Create this structure:

src/
  app/
    layout.tsx
    page.tsx
    globals.css
  components/
    layout/
      SiteShell.tsx
    sections/
      HeroSection.tsx
      SelectedWorkSection.tsx
      ServiceSection.tsx
      ExperienceSection.tsx
      ContactSection.tsx
    ui/
      StatusPill.tsx
      PillButton.tsx
      SectionFrame.tsx
      ProjectCard.tsx
      SocialPill.tsx
  lib/
    portfolio-data.ts
    animations.ts
    utils.ts
public/
  images/
    avatar.png
    cloud-bg.png
    projects/
      dekatlokal.png
      rbm-attendance.png
      growmates.png
      chayon.png

Design system:
- Background: grayscale cloudy/mist, #d7d7d5 base.
- Surface: white cards with thin white border and soft shadow.
- Dark section: #242424 graphite.
- Text: #111, #2b2b2b, muted #6f6f6f.
- Accent: green dot only #18d879.
- Font: Geist or Inter via next/font/google.
- Headings: uppercase, giant, tight tracking, premium editorial.
- Buttons: rounded pill, soft shadow, icon arrow diagonal.

Sections:
1. HeroSection
- Large white framed card, min-height 690px desktop.
- Top nav inside card: availability pill left, nav center, black CTA right.
- Huge name: first word outline, second word solid.
- Center portrait/avatar overlapping title.
- Left bottom role + description + black CTA.
- Right bottom social buttons vertical.

2. SelectedWorkSection
- White card with faint PORTFOLIO background text.
- Center heading /SELECTED WORK.
- Filter labels left and View All Work pill right.
- Two-column project grid with large images, titles, and tag pills.

3. ServiceSection
- Cloud background, no big white card.
- Heading /SERVICE left.
- Accordion list: active item dark horizontal card with title, desc, tilted mockup image, close X. Inactive items are huge text rows with arrow right and divider.

4. ExperienceSection
- Dark graphite framed card.
- Heading /EXPERIENCE, faint huge EXPERIENCE text behind.
- Right small text: 3+ years of building experience.
- Row list company/role/date with dividers.
- First row has tilted mockup image.

5. ContactSection
- Glass rectangle on cloudy background.
- Center status pill, headline HAVE A PROJECT IN MIND?, description, Contact Me button.
- Bottom social pill row spread horizontally.

Animations:
- Use Motion for React.
- Reveal sections on scroll using fade-up and stagger.
- Accordion active item animates smoothly with layout.
- Hover: buttons move -2px, arrows move x/y, project images scale 1.035.
- Cloud background subtle slow movement.
- Respect prefers-reduced-motion where possible.

Acceptance:
- `npm run dev` works.
- No TypeScript errors.
- No hydration errors.
- Desktop UI looks very close to reference.
- Mobile stacks cleanly.
- All content can be revised in `portfolio-data.ts`.
```
