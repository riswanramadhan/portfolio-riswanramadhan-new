# PRD & Design Spec — Project Detail Page Portfolio

## Goal

Build a dedicated project detail page UI for the portfolio website that closely matches the uploaded reference screenshot.

The page should look like a premium Apple-inspired monochrome portfolio case study page: minimal, clean, spacious, soft-shadowed, and editorial. The page must be built in a Next.js App Router project using TypeScript, Tailwind CSS, Motion for React, and lucide-react.

This page is hard-coded for now but must be structured cleanly so content can be revised easily later.

---

## Target Route

Create a dynamic project detail route:

```txt
src/app/work/[slug]/page.tsx
```

Example active page:

```txt
/work/fragwater
```

Selected work cards on the landing page should be able to link to this project detail page.

---

## Required Files / Structure

Create or update this structure:

```txt
src/
  app/
    work/
      [slug]/
        page.tsx
  components/
    project/
      ProjectDetailHero.tsx
      ProjectPreviewFrame.tsx
      ProjectMeta.tsx
      ProjectCaseSection.tsx
    sections/
      ContactSection.tsx
  lib/
    portfolio-data.ts
```

If these folders do not exist, create them.

---

## Data Source

Use hard-coded data in:

```txt
src/lib/portfolio-data.ts
```

Add a `projects` array with this structure:

```ts
export const projects = [
  {
    slug: "fragwater",
    title: "FragWater",
    type: "Real Project",
    categories: ["Landing Page", "Kumpin Studio"],
    description:
      "A modern luxury fragrance brand brought to life through a clean, elegant, and high-end landing page experience.",
    service: "UI/UX Design, Web Design",
    timeline: "4 Weeks",
    tools: ["Framer", "Figma"],
    livePreviewUrl: "#",
    contactUrl: "#",
    previewImage: "/images/projects/fragwater-preview.png",
  },
];
```

If the actual image asset is not available, use a placeholder frame with a clean dark/light project preview mockup. But keep the layout identical so the user can replace the image later.

---

## Overall Visual Direction

The UI must feel like:

```txt
Apple ecosystem UI
Minimal editorial portfolio
Modern monochrome
Frosted glass / soft pill buttons
Premium creative studio case study
```

Avoid bright colors except:

* green status dot
* tool icons
* black CTA button

Use mostly:

* `#F5F5F3`
* `#FFFFFF`
* `#0F0F0F`
* `#222222`
* `#6F6F6F`
* `#DCDCDC`
* `#22C55E`

---

## Page Background

The entire page should have a soft, premium light background.

Use this style:

```css
background:
  radial-gradient(circle at 20% 10%, rgba(255,255,255,0.95), transparent 32%),
  radial-gradient(circle at 80% 0%, rgba(255,255,255,0.85), transparent 30%),
  linear-gradient(135deg, #f6f6f4 0%, #eeeeec 100%);
```

Add subtle noise or cloudy blur if already available in the landing page, but do not make it heavy.

The background should be fixed visually consistent across scroll.

---

## Desktop Layout

The project detail page must have a full-width layout with a large inner container.

Use:

```txt
max-width: 1360px
horizontal padding desktop: 64px to 88px
top padding: 32px
bottom padding: 120px
```

Main page structure:

```tsx
<main>
  <ProjectDetailHero />
  <ProjectPreviewFrame />
  <ProjectCaseContent />
  <ContactSection />
</main>
```

Important:
The same final contact/CTA section from the landing page must appear again at the bottom of this project detail page when the user scrolls down.

---

## Top Navigation Pills

### Back Button

Position:

* top left
* margin top around 28px
* margin left aligned with page container

Style:

* white pill
* height: 38px
* padding: `0 18px`
* border: `1px solid rgba(0,0,0,0.06)`
* border-radius: `999px`
* shadow: soft, subtle
* font size: 13px
* icon: lucide `ArrowLeft`
* label: `Back`

Behavior:

* link to `/` or `/#work`
* hover: slightly lift up, shadow stronger

### Availability Pill

Position:

* top right
* same vertical level as Back button

Style:

* white pill
* height: 38px
* padding: `0 18px`
* border radius full
* box shadow soft
* green dot at left, 8px circle
* text: `Available for New Project`
* font size: 13px
* weight: 500

---

## Hero Section Layout

Hero section starts below top pills.

Use desktop grid:

```txt
grid-template-columns: 1.35fr 0.75fr
gap: 96px
align-items: start
padding-top: 92px
```

Left column width around 560px.

Right column width around 320px and aligned to the right.

---

## Left Hero Content

### Category Pills

Render project categories as small pills.

Example:

* `Landing Page`
* `Kumpin Studio`

Style:

* height: 36px
* padding: `0 18px`
* background: white
* border: `1px solid rgba(0,0,0,0.06)`
* border-radius: `999px`
* font size: 13px
* shadow subtle
* display inline-flex
* gap between pills: 10px
* margin-bottom: 28px

### Title Row

Render:

```txt
FragWater /Real Project
```

But visually:

* `FragWater` large black
* `/Real Project` smaller gray, baseline aligned

Style:

* title font size desktop: `52px`
* line-height: `1`
* font weight: `600`
* letter spacing: `-0.04em`
* color: `#171717`

Type label:

* font size: `20px`
* color: `#6f6f6f`
* margin-left: `22px`
* font weight: `400`

On mobile, stack the type below title.

### Description

Text:

```txt
a modern luxury fragrance brand brought to life through a clean, elegant, and high-end landing page experience.
```

Style:

* max-width: 510px
* margin-top: 28px
* font size: 14px
* line height: 1.55
* color: `#5F5F5F`

### CTA Buttons

Two buttons:

1. Primary:

   * text: `Live Preview`
   * icon: `ArrowUpRight`
   * background: black
   * text: white
   * height: 44px
   * padding x: 22px
   * radius full
   * soft black shadow
   * hover lift

2. Secondary:

   * text: `Contact Me`
   * background: white
   * text: black
   * height: 44px
   * padding x: 22px
   * radius full
   * border subtle
   * shadow very soft

Button row:

* margin-top: 34px
* gap: 14px

---

## Right Meta Content

Right column contains project metadata.

Layout:

* vertical stack
* align text center or slightly right as in reference
* gap between groups: 48px

Each meta group:

* small label, light gray
* value below, black

Example:

```txt
Service
UI/UX Design, Web Design

Timeline
4 Weeks

Tools
[Framer Icon] [Figma Icon]
```

Style labels:

* font size: 13px
* color: `#B2B2B2`
* margin-bottom: 14px

Style values:

* font size: 20px
* font weight: 600
* color: `#202020`
* line height: 1.25

Tools:

* display flex
* gap: 14px
* justify center
* square card 48px x 48px
* background white
* border radius 10px
* border subtle
* soft shadow
* center icon

If actual tool icons are unavailable, create simple SVG/icon placeholders:

* Framer: blue stylized F
* Figma: multi-dot icon or lucide-like abstract icon

---

## Project Preview Frame

This is the large card that starts below hero and appears partially visible in the first viewport.

Position:

* margin-top: 92px from hero
* centered horizontally
* width: approximately 82% of viewport on desktop
* max-width: 1060px
* min-height visible around 480px

Frame style:

* background: rgba(255,255,255,0.62)
* border: `1px solid rgba(0,0,0,0.08)`
* border-radius: `14px`
* padding: `18px`
* box-shadow: `0 30px 80px rgba(0,0,0,0.08)`
* overflow: hidden

Inside image:

* use Next/Image if asset exists
* width full
* height auto
* border-radius: `8px`
* object-fit: cover
* display as a large website screenshot

If no image exists, create a placeholder mockup:

* left dark hero image
* right white editorial website columns
* preserve the look of the screenshot: a fragrance landing page with dark bottle visual on the left and editorial content on the right.

The preview frame must look like it is emerging from the bottom of the initial viewport.

---

## Scroll Behavior

The page must be scrollable.

After the preview frame, add additional case content sections so the page feels complete.

Add these sections below preview:

1. Overview
2. Challenge
3. Solution
4. Result

Each section should be minimal and consistent with the same visual language.

Use a two-column editorial layout:

```txt
small uppercase/label on left
paragraph content on right
```

Style:

* max-width: 1060px
* margin: `100px auto`
* border-top: `1px solid rgba(0,0,0,0.08)`
* padding-top: 36px

Content can be hard-coded placeholder but professional.

Important:
At the very bottom of this project detail page, render the existing landing page final CTA/contact section again.

Use:

```tsx
<ContactSection />
```

The final contact section must still appear when the user scrolls down, using the same component/style as the landing page. Do not replace it with a simple footer.

---

## Animation Requirements

Use Motion for React.

Animations should be subtle and premium.

Required:

* page initial fade in
* Back button fade/slide from left
* Availability pill fade/slide from right
* hero left content fade up
* meta content fade up with slight delay
* preview frame fade up and slight scale from `0.98` to `1`
* hover lift on buttons and project frame

Do not over-animate.
Avoid bouncy animation.
Use smooth easing:

```ts
ease: [0.22, 1, 0.36, 1]
duration: 0.7
```

---

## Responsive Behavior

### Tablet

* reduce horizontal padding to 32px
* hero grid gap 48px
* title 44px
* preview width 92%

### Mobile

At max-width 768px:

* top pills stack naturally but remain at top:

  * Back left
  * Availability below or right depending available space
* hero becomes single column
* right meta content moves below left content
* meta groups align left
* title:

  * `FragWater` 42px
  * `/Real Project` 18px and can sit below if needed
* CTA buttons can stay inline if fit, otherwise wrap
* preview frame width 100%
* preview padding 10px
* project case sections single column

---

## Design Accuracy Checklist

The final result must match the reference image as closely as possible:

* [ ] Back pill top-left exists
* [ ] Availability pill top-right exists
* [ ] White/gray Apple-like background exists
* [ ] Left hero has category pills
* [ ] Title row says `FragWater /Real Project`
* [ ] Description matches reference
* [ ] Primary black `Live Preview` button exists
* [ ] Secondary white `Contact Me` button exists
* [ ] Right meta area contains Service, Timeline, Tools
* [ ] Tool cards are small white floating square buttons
* [ ] Large project preview card appears below hero
* [ ] Preview card has border, radius, shadow, and inner screenshot
* [ ] Page continues when scrolled
* [ ] Landing page final Contact/CTA section appears at the bottom
* [ ] All content is hard-coded and easy to edit from `src/lib/portfolio-data.ts`
* [ ] No default Next.js starter UI remains

---

## Implementation Notes

Use these imports where needed:

```ts
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
```

If `motion/react` import fails because of package version, use the correct installed Motion for React import according to the project setup.

Do not use external UI libraries.
Do not use shadcn for this page.
Do not add unnecessary dependencies.

Use Tailwind CSS for styling.

---

## Codex Task

Implement this project detail page in the current Next.js App Router project.

1. Create the dynamic route `src/app/work/[slug]/page.tsx`.
2. Add project data to `src/lib/portfolio-data.ts`.
3. Create `ProjectDetailHero`, `ProjectMeta`, `ProjectPreviewFrame`, and `ProjectCaseSection`.
4. Reuse the existing `ContactSection` from the landing page at the bottom of the project detail page.
5. Make sure the UI matches the uploaded screenshot as closely as possible.
6. Ensure responsive design works well.
7. Ensure the app runs without TypeScript or ESLint errors.
8. Do not overwrite unrelated existing landing page sections unless needed for linking selected work cards.
9. Add links from selected project cards on the homepage to `/work/fragwater`.
10. Keep everything hard-coded and easy to revise.

After implementation, run:

```bash
npm run lint
npm run dev
```

Fix all errors.
