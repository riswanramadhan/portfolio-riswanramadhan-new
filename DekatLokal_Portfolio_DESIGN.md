# DESIGN.md — Visual System & Implementation Guide

## 1. Visual Identity
Website harus terasa seperti **Apple-inspired portfolio UI**: minimal, premium, monochrome, soft, berlapis, dan cinematic. Jangan gunakan warna brand biru besar. Fokus pada black/white/grey dengan aksen hijau kecil untuk availability.

Kata kunci desain:
- Apple ecosystem UI
- Monochrome editorial portfolio
- Frosted glass card
- Cloud/mist background
- Large typography
- Soft shadow
- Smooth micro-interactions
- Minimal but high-end

## 2. Design Tokens
Tambahkan CSS variables di `src/app/globals.css`.

```css
:root {
  --bg: #d7d7d5;
  --surface: #ffffff;
  --surface-soft: rgba(255, 255, 255, 0.72);
  --surface-glass: rgba(255, 255, 255, 0.56);
  --ink: #111111;
  --ink-soft: #2b2b2b;
  --muted: #6f6f6f;
  --line: rgba(17, 17, 17, 0.12);
  --dark: #242424;
  --dark-2: #1f1f1f;
  --dark-line: rgba(255, 255, 255, 0.13);
  --green: #18d879;
  --radius-sm: 12px;
  --radius-md: 18px;
  --radius-lg: 28px;
  --shadow-soft: 0 28px 80px rgba(0,0,0,0.14);
  --shadow-pill: 0 12px 30px rgba(0,0,0,0.18);
}
```

Tailwind global base:

```css
html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  color: var(--ink);
  overflow-x: hidden;
}
::selection {
  background: #111;
  color: #fff;
}
```

## 3. Typography
Gunakan `Geist` atau `Inter` via `next/font/google`.

Font behavior:
- Heading utama: uppercase, font-weight 700–800, letter-spacing -0.06em.
- Heading section: uppercase, weight 500–600.
- Body: 14–16px, line-height 1.45–1.65.
- Pills/button: 13–14px, weight 500.

Class guideline:

```tsx
const headingHero = "text-[clamp(64px,12vw,170px)] leading-[0.86] tracking-[-0.08em] uppercase";
const headingSection = "text-[clamp(38px,5vw,72px)] leading-none tracking-[-0.055em] uppercase";
const bodyText = "text-sm md:text-base leading-relaxed text-neutral-600";
```

## 4. Global Background
Buat `CloudBackground` sebagai layer fixed/absolute:
- Base color #d7d7d5.
- Pakai image `/images/cloud-bg.png` kalau tersedia.
- Jika belum ada image, buat CSS radial gradients yang menyerupai awan.
- Overlay blur dan opacity 0.55.
- Tambahkan noise/grain tipis via pseudo-element.

Contoh CSS:

```css
.cloud-bg {
  background:
    radial-gradient(circle at 18% 18%, rgba(255,255,255,.8), transparent 22%),
    radial-gradient(circle at 82% 22%, rgba(255,255,255,.72), transparent 26%),
    radial-gradient(circle at 50% 82%, rgba(255,255,255,.68), transparent 28%),
    linear-gradient(180deg, #d9d9d7, #cfcfcd);
}
```

## 5. Layout System
Page shell:

```tsx
<main className="relative min-h-screen overflow-hidden cloud-bg px-4 py-8 md:px-8 md:py-12">
  <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-16 md:gap-24">
    ...sections
  </div>
</main>
```

Section frame common:
- `max-w-[1180px] mx-auto`
- Desktop vertical padding: `py-10 md:py-14`
- Card border: `border border-white/70`
- Shadow: `shadow-[0_30px_90px_rgba(0,0,0,0.16)]`

## 6. UI Components

### 6.1 StatusPill
Visual:
- White pill, small shadow.
- Green dot.
- Text `Available for New Project`.

Class:
```tsx
"inline-flex items-center gap-2 rounded-full border border-black/5 bg-white/80 px-4 py-2 text-[13px] font-medium shadow-[0_10px_30px_rgba(0,0,0,.12)] backdrop-blur-xl"
```

### 6.2 PillButton
Variant dark:
```tsx
"inline-flex items-center gap-2 rounded-full bg-[#171717] px-5 py-3 text-sm font-medium text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,.14),0_12px_28px_rgba(0,0,0,.25)] transition hover:-translate-y-0.5"
```

Variant light:
```tsx
"inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/75 px-4 py-2 text-sm font-medium text-black shadow-sm backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-white"
```

### 6.3 SectionFrame
Reusable wrapper for white and dark cards.
Props:
- `variant: 'light' | 'dark' | 'glass'`
- `className`

### 6.4 SocialPill
Social button with icon from `lucide-react`:
- Github, Instagram, Linkedin, Dribbble/Globe, ExternalLink.
- Horizontal on contact; vertical on hero desktop.

## 7. Section Visual Specs

### 7.1 HeroSection
File: `src/components/sections/HeroSection.tsx`

Frame:
```tsx
<section id="home" className="relative mx-auto w-full max-w-[1180px] rounded-[8px] border border-white/70 bg-white shadow-[0_30px_90px_rgba(0,0,0,.16)]">
```

Size:
- Desktop min-height: 690px.
- Tablet: 620px.
- Mobile: auto, padding 28px.

Navbar:
- Position top inside frame.
- Grid: left status, center nav, right CTA.
- Top padding 32px, x padding 48px.
- Nav items: Work `[04]`, Service `[04]`, Experience `[05]`, Contact.
- Mobile: hide center nav, keep status + CTA.

Hero title:
- Text behind avatar.
- Use two spans:
  - `RISWAN` outline: `text-transparent [-webkit-text-stroke:2px_#111]`
  - `RAMADHAN` solid: `text-[#202020]`
- Position absolute/relative centered top 190px desktop.

Portrait:
- Use `/images/avatar.png` placeholder.
- Center bottom.
- Width desktop 520–600px.
- If image belum ada, buat placeholder silhouette/card gradient.
- Jangan pakai border berlebihan.

Left content:
- Position absolute left 58px bottom 100px.
- Role title 26px bold.
- Body 14px max-width 280px.
- Button under body.

Right socials:
- Position absolute right 70px bottom 86px.
- Stack vertical gap 18px.

Motion:
- Parent: initial opacity 0 y 30 scale .98; animate opacity 1 y 0 scale 1.
- Title: delay .15.
- Avatar: delay .25.
- Content/social: stagger .08.

### 7.2 SelectedWorkSection
File: `src/components/sections/SelectedWorkSection.tsx`

Frame:
- White card, max-width 1180, radius 8–12, padding desktop 96 top, 100 horizontal.
- Faint `PORTFOLIO` absolute top 35px center, font-size clamp 90–180px, color #f3f3f3, weight 700.

Header:
- `/SELECTED WORK` centered.
- Filter row left under heading.
- View button right under heading.

Project grid:
- `grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-16`
- Image area: height 320 desktop, bg #f4f4f4, overflow hidden.
- Project image object-cover.
- Card title: 28–32px, tracking tight.
- Tags: pill border #e5e5e5.

Hover:
- Card image scale 1.04.
- Floating arrow circle appears at image center/right for second project style.

### 7.3 ServiceSection
File: `src/components/sections/ServiceSection.tsx`

Container:
- max-width 1080.
- No large white card; use cloudy background directly.
- Padding top/bottom 80.

Heading:
- `/SERVICE`, top left, font 44–56 desktop.

Accordion:
- Active card height 175–195px desktop.
- Active dark background #242424, radius 8, shadow soft.
- Active content left: title 48px, desc 16px max 440.
- Active image: absolute top -34 right 250, width 260, rotate 6deg or -6deg.
- Close X right center.
- Inactive row: height 125px, title 48px, arrow right, border-bottom rgba(0,0,0,.14).

Interaction:
- `useState(activeIndex)` default 0.
- On mouse enter/click set active.
- Motion layout transition for height and opacity.

### 7.4 ExperienceSection
File: `src/components/sections/ExperienceSection.tsx`

Outer:
- max-width 1180.
- Dark card with border frame.
- Padding 72 horizontal, 74 vertical.
- Background #242424.
- Text white.

Frame effect:
```tsx
"rounded-[6px] border border-white/70 bg-[#242424] p-2 shadow-[0_30px_90px_rgba(0,0,0,.2)]"
```
Inside:
```tsx
"relative overflow-hidden border border-white/30 bg-[#242424] px-10 py-12 md:px-16 md:py-16"
```

Faint background:
- Absolute text `EXPERIENCE` top -20 center.
- font-size 150px.
- color rgba(255,255,255,.035).

Header:
- Left `/EXPERIENCE`, 48px.
- Right `3+ years of building experience`.

Rows:
- Each row grid columns: left company/role, optional image middle, right date.
- Height 96px.
- Divider border top except first.
- Company: 18px white.
- Role: 17px #bdbdbd.
- Date: #c9c9c9.

Floating mockup:
- Only first row has image around center/right.
- width 170–220px.
- rotate 7deg.

### 7.5 ContactSection
File: `src/components/sections/ContactSection.tsx`

Container:
- max-width 1180.
- min-height 560.
- Relative with glass rectangle overlay.
- Top status centered.
- Heading centered uppercase 52–64px desktop.
- Body centered max-width 680.
- CTA button center.
- Social pills bottom spread.

Glass card:
```tsx
"relative overflow-hidden rounded-[6px] border border-white/50 bg-white/35 px-8 py-16 shadow-[0_30px_90px_rgba(0,0,0,.12)] backdrop-blur-md md:px-16 md:py-20"
```

## 8. Animation System
Use Motion for React.

Create file `src/lib/animations.ts`:

```ts
export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const softSpring = {
  type: "spring",
  stiffness: 90,
  damping: 18,
  mass: 0.8,
};
```

Guidelines:
- Use `whileInView="visible" viewport={{ once: true, margin: "-80px" }}` for sections.
- Use hover only small movement: y -4, scale 1.01, arrow x 3 y -3.
- Avoid excessive bouncing.
- Implement `prefers-reduced-motion` fallback if possible.

## 9. Data File Example
`src/lib/portfolio-data.ts`

```ts
export const profile = {
  name: "Riswan Ramadhan",
  firstName: "RISWAN",
  lastName: "RAMADHAN",
  role: "Software Engineer & Product Builder",
  description:
    "Designing and building digital products for UMKM, communities, and impact-driven teams.",
  availability: "Available for New Project",
  email: "mailto:hello@dekatlokal.com",
  whatsapp: "https://wa.me/6280000000000",
};

export const navItems = [
  { label: "Work", count: "04", href: "#work" },
  { label: "Service", count: "04", href: "#service" },
  { label: "Experience", count: "05", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/", icon: "Github" },
  { label: "Instagram", href: "https://instagram.com/", icon: "Instagram" },
  { label: "LinkedIn", href: "https://linkedin.com/", icon: "Linkedin" },
  { label: "Behance", href: "https://behance.net/", icon: "Globe" },
];

export const projects = [
  {
    title: "DekatLokal - UMKM Digitalization Platform",
    category: "Real Project",
    type: "Platform",
    image: "/images/projects/dekatlokal.png",
    tags: ["Next.js", "UMKM", "SEO"],
  },
  {
    title: "RBM Attendance System",
    category: "Real Project",
    type: "Web App",
    image: "/images/projects/rbm-attendance.png",
    tags: ["Supabase", "GPS", "Dashboard"],
  },
  {
    title: "Growmates - Volunteer Platform Concept",
    category: "Exploration",
    type: "Product Design",
    image: "/images/projects/growmates.png",
    tags: ["UI/UX", "Community", "Product"],
  },
  {
    title: "Chayon Course Platform",
    category: "Real Project",
    type: "Website",
    image: "/images/projects/chayon.png",
    tags: ["Laravel", "Next.js", "Course"],
  },
];

export const services = [
  {
    title: "UI/UX DESIGN",
    description:
      "Designing clear, scalable, and conversion-focused interfaces for dashboards, websites, and digital products.",
    image: "/images/projects/dekatlokal.png",
  },
  {
    title: "WEB DESIGN & DEV",
    description:
      "Building fast, responsive, and SEO-ready websites using modern frontend stacks.",
    image: "/images/projects/rbm-attendance.png",
  },
  {
    title: "BRANDING",
    description:
      "Helping products and UMKM communicate value through visual identity and digital presence.",
    image: "/images/projects/growmates.png",
  },
  {
    title: "MOTIONS & ANIMATIONS",
    description:
      "Adding subtle interactions and motion systems that make interfaces feel alive and premium.",
    image: "/images/projects/chayon.png",
  },
];

export const experiences = [
  {
    company: "DekatLokal",
    role: "Founder & Product Lead",
    period: "2025 - Now",
  },
  {
    company: "Rumah BUMN Makassar",
    role: "Digital Marketing / Web Development Intern",
    period: "2025 - 2026",
  },
  {
    company: "KKN Parepare",
    role: "Digital Product Initiator",
    period: "2025",
  },
  {
    company: "Chayon Online Course",
    role: "Fullstack Developer",
    period: "2025",
  },
  {
    company: "Freelance Web Projects",
    role: "UI/UX & Frontend Developer",
    period: "2024 - Now",
  },
];
```

## 10. Component Rules for Codex
- Semua section harus client component hanya jika butuh Motion/interaksi. Jika tidak, server component boleh.
- Jangan buat backend.
- Jangan buat route tambahan kecuali perlu.
- Jangan gunakan warna biru sebagai warna utama.
- Jangan pakai template generik portfolio biasa.
- Jangan pakai card gradient warna-warni.
- Jangan pakai hero layout corporate biasa.
- Pastikan desktop visual mendekati referensi.

## 11. Implementation Checklist
1. Setup project Next.js + Tailwind + TypeScript.
2. Setup `globals.css` dengan tokens, background, base style.
3. Buat `portfolio-data.ts`.
4. Buat UI components: StatusPill, PillButton, SocialPill, SectionFrame, ProjectCard.
5. Buat HeroSection.
6. Buat SelectedWorkSection.
7. Buat ServiceSection accordion.
8. Buat ExperienceSection dark card.
9. Buat ContactSection.
10. Compose semua di `src/app/page.tsx`.
11. Tambahkan metadata di `layout.tsx`.
12. Test responsive.
13. Jalankan `npm run lint` dan fix error.

## 12. Exact Codex Prompt

```md
You are a senior frontend engineer and creative UI developer. Build a fresh Next.js portfolio website from scratch based on PRD.md and DESIGN.md.

Requirements:
- Use Next.js App Router, TypeScript, Tailwind CSS, Motion for React, lucide-react.
- Build a single-page portfolio with five sections: Hero, Selected Work, Services, Experience, Contact.
- The UI must closely match the provided reference style: monochrome Apple-inspired portfolio, cloudy grey background, frosted glass, white/dark framed cards, giant uppercase typography, pill buttons, soft shadow, premium spacing.
- Use hard-coded data in src/lib/portfolio-data.ts.
- Use reusable components in src/components/ui and sections in src/components/sections.
- Add subtle motion: reveal on scroll, staggered children, hover micro-interactions, accordion animation, slow cloud/parallax feeling.
- Do not use CMS/backend/auth.
- Do not use heavy UI kits.
- Prioritize desktop fidelity first, then responsive mobile.
- If image assets are missing, create elegant placeholders using gradients/noise/abstract mockups but keep layout identical.
- Ensure TypeScript passes and the app runs with npm run dev.

Start by creating the file structure, then implement globals.css, data, UI components, sections, and compose everything in app/page.tsx.
```
