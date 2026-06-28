# REAL PORTFOLIO CONTENT UPDATE — Riswan Ramadhan

## Objective

Update the current portfolio website content so it represents the real professional profile, real services, real experience, real projects, real exploration works, real social links, and real contact email of Riswan Ramadhan.

The website must no longer use old placeholder content such as fictional names, fictional companies, or dummy portfolio projects. Every visible portfolio item must be based on actual work, internship, product, UI/UX project, or exploration project done by Riswan Ramadhan.

This update focuses on content, data structure, project metadata, services, experience, selected work, project detail pages, tool icons, and contact/social information.

Keep the existing Apple-like monochrome portfolio UI style:

* clean
* modern
* premium
* soft shadows
* pill buttons
* editorial typography
* subtle motion
* minimal black/white/gray theme

Do not redesign the entire visual system unless required to make the real content fit properly.

---

## Primary Identity

Use this identity across the website:

```txt
Name: Riswan Ramadhan
Role: Software Engineer & Digital Product Builder
Secondary Role: Web Developer, UI/UX Designer, Founder of DekatLokal
Location: Makassar, Indonesia
Email: riswan@dekatlokal.com
Availability: Available for New Project
```

Recommended hero role copy:

```txt
Software Engineer
```

Recommended hero description:

```txt
I build fast, clean, and business-focused digital products — from websites, dashboards, admin systems, SEO-ready platforms, to UI/UX prototypes for real users and growing organizations.
```

Alternative shorter hero description:

```txt
Building SEO-ready websites, scalable dashboards, and thoughtful digital products for businesses, communities, and local brands.
```

---

## Contact & Social Links

Replace all old social links with these real links:

```ts
export const socialLinks = [
  {
    label: "Dribbble",
    href: "https://dribbble.com/riswanramadhan",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/riswannramadhan/",
  },
  {
    label: "LinkedIn",
    href: "https://id.linkedin.com/in/riswan-ramadhan-821781257",
  },
  {
    label: "Behance",
    href: "https://www.behance.net/riswanramadhan",
  },
  {
    label: "GitHub",
    href: "https://github.com/riswanramadhan",
  },
];
```

Contact email must be:

```txt
riswan@dekatlokal.com
```

All contact CTA buttons should use:

```txt
mailto:riswan@dekatlokal.com
```

Do not use:

```txt
hello@dekatlokal.com
```

---

## Navigation Counts

Update navigation count labels based on real data:

```txt
Work [12]
Service [4]
Experience [5]
Contact
```

Selected Work count:

* 6 Real Projects
* 6 Exploration Projects
* Total: 12

Service count:

* 4

Experience count:

* 5

---

# Services Section Update

## Required Service Order

The service section must show exactly these 4 services in this order:

1. Web Developer
2. SEO & Web Performance
3. UI/UX Design
4. Motion & Graphic Design

Do not use old placeholder services.

---

## Service 1 — Web Developer

### Title

```txt
WEB DEVELOPER
```

### Short Description

```txt
Building responsive, SEO-ready, and scalable websites using modern frontend and full-stack technologies.
```

### Full Description

```txt
I develop landing pages, company profiles, admin dashboards, internal systems, and dynamic platforms using Next.js, React, Laravel, Supabase, MySQL, and modern deployment workflows. My focus is not only making websites look good, but also making them fast, structured, maintainable, and useful for real business operations.
```

### Keywords

```txt
Next.js
React
Laravel
Supabase
MySQL
Admin Dashboard
Internal System
Company Profile
Deployment
Responsive Website
```

### Suggested Icon

Use a code/dev icon from lucide-react or real tech stack icons where appropriate.

---

## Service 2 — SEO & Web Performance

### Title

```txt
SEO & WEB PERFORMANCE
```

### Short Description

```txt
Improving website visibility, crawlability, structure, speed, and search readiness.
```

### Full Description

```txt
I optimize websites so they are easier to find, index, and understand by search engines. This includes technical SEO, metadata, sitemap, robots.txt, canonical URL, Open Graph image, favicon, structured content, semantic heading, page speed improvement, mobile responsiveness, and Google Search Console readiness.
```

### Keywords

```txt
Technical SEO
Metadata
Sitemap
Robots.txt
Canonical URL
Open Graph
Structured Content
Google Search Console
Page Speed
Core Web Vitals
```

### Suggested Icon

Use search, chart, performance, or web icon. For tools, use real icons where relevant.

### Important UI Note

This service must look as important as Web Developer and UI/UX Design. Do not make SEO appear like a small supporting skill. It is a core service.

---

## Service 3 — UI/UX Design

### Title

```txt
UI/UX DESIGN
```

### Short Description

```txt
Designing clean, usable, and conversion-focused interfaces for websites, dashboards, and digital products.
```

### Full Description

```txt
I design digital interfaces using Figma, from wireframes and layout exploration to high-fidelity UI and clickable prototypes. My UI/UX work focuses on clarity, hierarchy, user flow, visual consistency, and making complex systems easier to use.
```

### Keywords

```txt
Figma
Wireframe
Prototype
Dashboard UI
Web Design
Design System
User Flow
Responsive Design
Interface Design
```

### Suggested Icon

Use Figma icon, layout icon, or design icon.

---

## Service 4 — Motion & Graphic Design

### Title

```txt
MOTION & GRAPHIC DESIGN
```

### Short Description

```txt
Creating visual assets, social media designs, motion content, posters, and brand visuals for digital communication.
```

### Full Description

```txt
I create visual content for Instagram feeds, stories, highlights, posters, brand identity, presentation assets, and simple motion graphics. This skill helps me bridge product, marketing, and visual storytelling so a digital product can look consistent across website, social media, and campaign materials.
```

### Keywords

```txt
Poster Design
Instagram Feed
Instagram Story
Brand Identity
Motion Graphic
Visual Campaign
Social Media Design
Creative Direction
Content Design
```

### Suggested Icon

Use motion/video/pen/brush/image icon.

---

# Experience Section Update

## Display Order

Show experience from newest/current to oldest:

1. Founder — DekatLokal
2. Web Developer Intern — Rumah BUMN Makassar
3. UI/UX Designer, Fullstack Developer & Project Manager Intern — Chayon Online Course
4. Graphic Designer Intern — PT Pusat Andalan Sukses Terpadu
5. UI/UX Designer Intern — HesaLab

---

## Experience Data

Use this exact improved content.

```ts
export const experiences = [
  {
    company: "DekatLokal",
    role: "Founder",
    period: "Jan 2026 - Now",
    location: "Makassar, Indonesia",
    type: "Founder / Product Builder",
    summary:
      "Founded DekatLokal as a digital platform that helps UMKM understand their digital readiness through Digital Checkup, recommendations, website development, and continuous assistance.",
    highlights: [
      "Built DekatLokal as a platform for UMKM digital readiness, website creation, and digital assistance.",
      "Led product direction, UI/UX, website development, SEO structure, and platform positioning.",
      "Developed the foundation for DekatLokal Studio, a commercial B2B website service for company profiles, business websites, and digital product development.",
      "Managed collaboration, execution, and continuous iteration with a small team."
    ],
    tools: ["Next.js", "React", "Cloudflare", "Neon", "SEO", "Product Strategy"],
  },
  {
    company: "Rumah BUMN Makassar",
    role: "Web Developer Intern",
    period: "Nov 2025 - Feb 2026",
    location: "Makassar, Indonesia",
    type: "Internship",
    summary:
      "Developed websites for UMKM assisted by Rumah BUMN Makassar, focusing on professional digital presence, SEO readiness, deployment, and technical support.",
    highlights: [
      "Built and deployed websites for UMKM using Next.js and modern hosting workflow.",
      "Helped UMKM improve their online presence through structured website content, CTA, Google-friendly pages, and responsive design.",
      "Handled deployment, subdomain configuration, hosting setup, and technical maintenance.",
      "Contributed to internal digital tools including an attendance system for internship operations."
    ],
    tools: ["Next.js", "React", "Supabase", "Vercel", "SEO", "Cloudflare"],
  },
  {
    company: "Chayon Online Course",
    role: "UI/UX Designer, Fullstack Developer & Project Manager Intern",
    period: "Feb 2025 - Jun 2025",
    location: "Remote / Indonesia",
    type: "Internship",
    summary:
      "Contributed to the design, development, and project execution of Chayon Online Course digital products, including course website UI/UX and an article website platform.",
    highlights: [
      "Designed UI/UX for Chayon Online Course website using Figma.",
      "Developed a website article system using frontend and backend technologies.",
      "Handled fullstack development responsibilities from UI implementation to backend/admin functionality.",
      "Coordinated project progress, task flow, and execution as a project manager during development."
    ],
    tools: ["Figma", "Next.js", "Laravel", "Supabase", "Project Management"],
  },
  {
    company: "PT Pusat Andalan Sukses Terpadu",
    role: "Graphic Designer Intern",
    period: "Feb 2025 - Jun 2025",
    location: "Indonesia",
    type: "Internship",
    summary:
      "Created visual identity and social media design assets to support company branding and digital communication.",
    highlights: [
      "Designed visual identity assets for the company’s digital presence.",
      "Created Instagram feed, story, and highlight designs.",
      "Developed consistent visual layouts for brand communication.",
      "Supported content design needs for social media and digital campaigns."
    ],
    tools: ["Figma", "Canva", "Graphic Design", "Brand Identity", "Social Media Design"],
  },
  {
    company: "HesaLab",
    role: "UI/UX Designer Intern",
    period: "Feb 2025 - Mar 2025",
    location: "Indonesia",
    type: "Internship",
    summary:
      "Learned and practiced web design and UI/UX design using Figma through multiple redesign mini-projects.",
    highlights: [
      "Explored web design principles, visual hierarchy, layouting, and UI consistency.",
      "Created redesign concepts for Adidas, Wise, and Danantara Indonesia websites.",
      "Practiced Figma workflow from layout exploration to high-fidelity interface design.",
      "Strengthened foundational skills in UI structure, spacing, typography, and visual direction."
    ],
    tools: ["Figma", "UI Design", "UX Design", "Web Redesign", "Prototype"],
  },
];
```

---

# Selected Work Section Update

## Work Categories

The selected work section must have filter tabs:

```txt
All
Real Project
Exploration
UI/UX Design
```

Recommended behavior:

* `All` shows all projects.
* `Real Project` shows real deployed/client/internal projects.
* `Exploration` shows personal experiments and AI/product experiments.
* `UI/UX Design` shows Figma/UI/UX-focused work.

---

## Selected Work Display Requirement

Use real project data only.

No placeholder projects like:

* BloomCare
* FragWater
* CryptoCalm
* fictional Microsoft/Facebook/Apple entries
* fictional case studies

The selected work must be replaced with the projects below.

---

# Real Projects

## Real Project 1 — DekatLokal

```ts
{
  slug: "dekatlokal",
  title: "DekatLokal",
  subtitle: "Digital Checkup & Website Platform for UMKM",
  type: "Real Project",
  categories: ["Platform", "UMKM Digitalization", "Founder Project"],
  description:
    "A digital platform that helps UMKM understand their digital readiness, receive recommendations, and build a more professional online presence through website and assistance.",
  service: "Web Development, Product Strategy, SEO",
  timeline: "1 Month Initial Build · Ongoing Iteration",
  role: "Founder, Product Builder, Web Developer",
  year: "2026",
  url: "https://dekatlokal.com",
  status: "Live",
  tools: ["Next.js", "React", "Cloudflare", "Neon", "SEO"],
  previewImage: "/images/projects/dekatlokal-preview.png",
  overview:
    "DekatLokal is a platform I founded to help local UMKM start digitalization with a more structured approach. The platform provides Digital Checkup, readiness mapping, recommendations, and website support for businesses that are ready to grow online.",
  challenge:
    "Many UMKM want to go digital, but they do not always know whether they need a website, better branding, Google presence, or operational preparation first.",
  solution:
    "I built a platform that guides UMKM through a simple Digital Checkup flow, presents their digital readiness, and connects them with the right next step such as assistance, website creation, or digital improvement.",
  result:
    "The website is live, SEO-ready, indexed by Google, and continues to be improved as DekatLokal grows with UMKM partners and internal team collaboration.",
}
```

---

## Real Project 2 — Growmates

```ts
{
  slug: "growmates",
  title: "Growmates",
  subtitle: "Volunteer & Donation Platform for Children-Focused Programs",
  type: "Real Project",
  categories: ["Web App", "Volunteer Platform", "Donation"],
  description:
    "A dynamic platform that connects volunteers and donors with children-focused programs through event registration, donation flow, and admin management.",
  service: "Web Development, UI Implementation, Dashboard System",
  timeline: "1 Month",
  role: "Web Developer",
  year: "2026",
  url: "https://growmates.dekatlokal.com/",
  status: "Live",
  tools: ["Next.js", "React", "Supabase", "SEO"],
  previewImage: "/images/projects/growmates-preview.png",
  overview:
    "Growmates is a dynamic platform for volunteer activities and donations. It helps users discover programs, register as volunteers, donate, and follow activities through a more organized digital flow.",
  challenge:
    "Volunteer and donation programs need a system that is easy for public users while still manageable for organizers behind the scenes.",
  solution:
    "I developed a dynamic website with user registration, donation features, admin panel, content management, and SEO-ready public pages to support volunteer operations.",
  result:
    "The platform is live, searchable on Google, and supports event operations through a more structured digital experience for volunteers, donors, and admins.",
}
```

---

## Real Project 3 — Bhekti Art

```ts
{
  slug: "bhekti-art",
  title: "Bhekti Art",
  subtitle: "Dynamic Catalog Website for Craft, Art, and Unique Products",
  type: "Real Project",
  categories: ["Catalog Website", "Admin Panel", "Laravel"],
  description:
    "A dynamic product catalog website for Bhekti Art, featuring handmade art products, product details, testimonials, and admin-managed content.",
  service: "Fullstack Web Development, Admin Panel, SEO",
  timeline: "Project Based",
  role: "Fullstack Developer",
  year: "2025",
  url: "https://bhekti.art",
  status: "Live",
  tools: ["Laravel", "Laravel Filament", "MySQL", "SEO"],
  previewImage: "/images/projects/bhekti-art-preview.png",
  overview:
    "Bhekti Art is a dynamic catalog website for handmade craft and art products. The website showcases products, categories, testimonials, contact information, and business identity in a more professional digital format.",
  challenge:
    "The brand needed a website that could present many products clearly while allowing content to be managed without editing code manually.",
  solution:
    "I built the website using Laravel and Laravel Filament, creating a dynamic admin panel for managing catalog content, product data, testimonials, and website information.",
  result:
    "The website is live, SEO-ready, indexed by Google, and gives Bhekti Art a more professional product showcase with admin-managed content.",
}
```

---

## Real Project 4 — Raya Law Firm

```ts
{
  slug: "raya-law-firm",
  title: "Raya Law Firm",
  subtitle: "Multipage Company Profile Website for a Professional Law Firm",
  type: "Real Project",
  categories: ["Company Profile", "Multipage Website", "Legal Service"],
  description:
    "A professional multipage company profile website for Raya Law Firm, designed to present legal services, firm credibility, and consultation CTA clearly.",
  service: "Web Development, Company Profile, SEO",
  timeline: "1 Month",
  role: "Web Developer",
  year: "2026",
  url: "https://www.rayalawfirm.com/",
  status: "Live",
  tools: ["Next.js", "React", "SEO"],
  previewImage: "/images/projects/raya-law-firm-preview.png",
  overview:
    "Raya Law Firm is a multipage company profile website built to present the firm’s legal services, professional positioning, credibility, and consultation flow.",
  challenge:
    "A law firm website needs to feel credible, structured, and easy to navigate while explaining multiple legal services without overwhelming visitors.",
  solution:
    "I built a multipage website using Next.js and React, with structured pages, service sections, clear CTA, responsive layout, and SEO-ready page setup.",
  result:
    "The website is live, indexed by Google, and provides a professional digital presence for Raya Law Firm with clear information architecture.",
}
```

---

## Real Project 5 — Rumah BUMN Makassar Attendance System

```ts
{
  slug: "rumah-bumn-attendance-system",
  title: "Rumah BUMN Makassar Attendance System",
  subtitle: "Internal Attendance System for Internship Operations",
  type: "Real Project",
  categories: ["Internal System", "Dashboard", "Attendance App"],
  description:
    "A dynamic internal attendance system for Rumah BUMN Makassar interns, supporting check-in, check-out, profile management, role-based access, and attendance monitoring.",
  service: "Web App Development, Dashboard System, Internal Tool",
  timeline: "2 Months",
  role: "Web Developer",
  year: "2026",
  url: "",
  status: "Internal System",
  tools: ["Next.js", "React", "Supabase"],
  previewImage: "/images/projects/rbm-attendance-preview.png",
  overview:
    "This attendance system was built for Rumah BUMN Makassar to support daily internship attendance operations for around 40 users with check-in and check-out flow.",
  challenge:
    "Manual attendance tracking can be inefficient when many interns need to submit daily attendance, manage profiles, and be monitored by different roles.",
  solution:
    "I built a dynamic role-based web system with check-in, check-out, profile editing, CRUD features, attendance data management, and dashboard views using Next.js, React, and Supabase.",
  result:
    "The system supports daily internal attendance operations with better structure, faster data access, and a more scalable workflow for monitoring intern activity.",
}
```

---

## Real Project 6 — Offline-Ready POS Cashier System

```ts
{
  slug: "offline-pos-cashier-system",
  title: "Offline-Ready POS Cashier System",
  subtitle: "Realtime Cashier & Kitchen Order System for Food Event Operations",
  type: "Real Project",
  categories: ["POS System", "Realtime App", "Offline-Ready"],
  description:
    "A cashier and kitchen order system for food event operations, supporting order input, QRIS/cash payment, realtime kitchen status, sales recap, and offline synchronization.",
  service: "Web App Development, Realtime System, POS Workflow",
  timeline: "1 Week",
  role: "Web Developer",
  year: "2026",
  url: "",
  status: "Private / Event System",
  tools: ["Next.js", "React", "Supabase"],
  previewImage: "/images/projects/pos-cashier-preview.png",
  overview:
    "This POS system was built to support warung makan operations during an event, connecting cashier input with kitchen workflow and sales reporting.",
  challenge:
    "During events, food orders need to move quickly from cashier to kitchen while still recording payment method, order status, sales recap, and offline-safe data.",
  solution:
    "I built a web-based POS system with cashier order input, QRIS/cash payment options, realtime kitchen order status, sales summary, menu performance, filters, and local-first synchronization when the internet connection is unstable.",
  result:
    "The system helps orders move from cashier to kitchen more clearly, keeps sales data organized, and can continue working offline before syncing back to the database when the connection returns.",
}
```

---

# Exploration Projects

## Exploration 1 — AI-Powered Career Analysis

```ts
{
  slug: "ai-powered-career-analysis",
  title: "AI-Powered Career Analysis",
  subtitle: "Bridge Your Career Gap",
  type: "Exploration",
  categories: ["AI Product", "Career Tech", "Prototype"],
  description:
    "An AI-powered tool that analyzes the gap between a resume and a target job description, then creates a personalized learning roadmap.",
  service: "AI Web App, Product Exploration, Frontend Development",
  timeline: "3 Days",
  role: "Solo Builder",
  year: "2026",
  url: "",
  status: "Prototype",
  tools: ["Next.js", "React", "Google Gemini"],
  previewImage: "/images/projects/ai-career-analysis-preview.png",
  overview:
    "AI-Powered Career Analysis was created to help students and job seekers understand what is missing between their current resume and the requirements of a target job.",
  challenge:
    "Many students do not know why their CV does not match a job description or what skills they should improve first.",
  solution:
    "I built an AI workflow where users upload or paste their resume and target job description. The system analyzes skill gaps, recommends a learning path, suggests portfolio projects, and supports interview preparation based on missing skills.",
  result:
    "The prototype was completed in 3 days from concept to development, showing how AI can turn career uncertainty into a clearer, actionable improvement roadmap.",
}
```

---

## Exploration 2 — SI ABAH / KhutbahKit

```ts
{
  slug: "si-abah-khutbahkit",
  title: "SI ABAH / KhutbahKit",
  subtitle: "AI Khutbah Generator for Contextual Islamic Speech Drafting",
  type: "Exploration",
  categories: ["AI Product", "Religious Tech", "Generator"],
  description:
    "An AI-powered khutbah and speech drafting tool that generates outline, script, dalil, summary, and delivery tips based on selected context and language.",
  service: "AI Web App, Frontend Development, Product Exploration",
  timeline: "3 Days",
  role: "Solo Builder",
  year: "2026",
  url: "https://si-abah.dekatlokal.com/",
  status: "Live Prototype",
  tools: ["Next.js", "React", "Google Gemini"],
  previewImage: "/images/projects/si-abah-preview.png",
  overview:
    "SI ABAH helps users create khutbah or Islamic speech drafts by selecting event type, speaker name, title, duration, tone, audience, language, and religious references.",
  challenge:
    "Creating a khutbah often takes time because the speaker needs to structure the topic, find suitable dalil, adjust tone, and prepare a delivery-ready script.",
  solution:
    "I built an AI generator using Google Gemini Flash that can produce outlines, scripts, dalil, summaries, and delivery tips in Bahasa Indonesia, Bugis, or Javanese, with print-ready output.",
  result:
    "The product was completed in 3 days as a live prototype and demonstrates how AI can assist contextual religious content drafting while still allowing human polishing.",
}
```

---

## Exploration 3 — BBI Cash Tracker

```ts
{
  slug: "bbi-cash-tracker",
  title: "BBI Cash Tracker",
  subtitle: "Local-First Sales and Profit Tracking Tool",
  type: "Exploration",
  categories: ["Finance Tracker", "Local App", "Utility"],
  description:
    "A simple local-first web tracker for recording sold packages, capital, profit, monthly growth, and exporting data without requiring a database.",
  service: "Frontend Development, Local Data Tool, Utility App",
  timeline: "1 Day",
  role: "Solo Builder",
  year: "2026",
  url: "https://tracker.dekatlokal.com/",
  status: "Live",
  tools: ["Next.js", "React", "Local Storage"],
  previewImage: "/images/projects/bbi-cash-tracker-preview.png",
  overview:
    "BBI Cash Tracker is a lightweight sales tracker for recording packages sold, capital, profit, monthly revenue, and sales growth.",
  challenge:
    "Small sellers often need a fast and simple way to track profit and monthly growth without setting up a complex database or accounting system.",
  solution:
    "I built a local-first web app that stores data locally, calculates profit and growth, supports filtering, and allows JSON export for backup or transfer.",
  result:
    "The tool was completed in 1 day and provides a practical way to track sales and profit directly from the browser.",
}
```

---

## UI/UX Project 1 — Web Redesign Collection

```ts
{
  slug: "web-redesign-collection",
  title: "Web Redesign Collection",
  subtitle: "Adidas, Wise, and Danantara Indonesia Redesign Studies",
  type: "UI/UX Design",
  categories: ["UI Redesign", "Figma", "Internship Project"],
  description:
    "A collection of UI redesign studies created during HesaLab internship to practice layout, visual hierarchy, brand interpretation, and modern web interface design.",
  service: "UI/UX Design, Web Redesign",
  timeline: "2 Months",
  role: "UI/UX Designer",
  year: "2025",
  url: "",
  status: "Design Study",
  tools: ["Figma"],
  previewImage: "/images/projects/redesign-collection-preview.png",
  overview:
    "This project combines three website redesign studies: Adidas, Wise, and Danantara Indonesia. The work focused on improving interface clarity, visual hierarchy, spacing, and modern layout execution.",
  challenge:
    "Each brand has a different personality, so the redesign needed to keep the brand feeling while improving the layout and visual experience.",
  solution:
    "I used Figma to explore hero layouts, navigation structure, typography, visual hierarchy, card systems, and responsive web composition.",
  result:
    "The project strengthened my foundation in web UI design, layout consistency, and high-fidelity interface exploration.",
}
```

---

## UI/UX Project 2 — EMR Hospital UI/UX

```ts
{
  slug: "emr-hospital-uiux",
  title: "EMR Hospital UI/UX",
  subtitle: "Complex Hospital Admin Dashboard and Medical Workflow Prototype",
  type: "UI/UX Design",
  categories: ["Dashboard UI", "Healthcare System", "Prototype"],
  description:
    "A complex EMR hospital interface design covering dashboard, master data, patient flow, nurse and doctor examination, pharmacy, billing, queue, and reports.",
  service: "UI/UX Design, Dashboard System, Prototype",
  timeline: "2 Months",
  role: "UI/UX Designer",
  year: "2025",
  url: "",
  status: "Prototype",
  tools: ["Figma"],
  previewImage: "/images/projects/emr-hospital-preview.png",
  overview:
    "EMR Hospital UI/UX is a full dashboard prototype for hospital operations, covering multiple modules from patient queue and examination to pharmacy, billing, and reporting.",
  challenge:
    "Hospital systems are complex because many roles and workflows are connected, from nurses and doctors to pharmacy and finance.",
  solution:
    "I designed a structured admin interface with clear modules, dashboard layout, master data, patient examination flow, medical records, pharmacy process, billing screens, and reporting pages.",
  result:
    "The prototype demonstrates my ability to design complex admin systems with interconnected workflows, not only simple landing pages.",
}
```

---

## UI/UX Project 3 — Arung Culture

```ts
{
  slug: "arung-culture",
  title: "Arung Culture",
  subtitle: "Cultural Event and Traditional Costume Rental Platform",
  type: "UI/UX Design",
  categories: ["Cultural Platform", "Event", "Rental"],
  description:
    "A UI/UX design project for a South Sulawesi cultural platform that helps users discover cultural events and rent traditional clothing through one digital experience.",
  service: "UI/UX Design, Product Design, Prototype",
  timeline: "2 Months",
  role: "UI/UX Designer",
  year: "2025",
  url: "",
  status: "Prototype",
  tools: ["Figma"],
  previewImage: "/images/projects/arung-culture-preview.png",
  overview:
    "Arung Culture is a UI/UX design concept for a cultural platform that combines event discovery and traditional clothing rental in South Sulawesi.",
  challenge:
    "Cultural event information and traditional costume rental are often scattered, making it harder for users to discover, plan, and participate in cultural experiences.",
  solution:
    "I designed a platform experience that allows users to browse cultural events, view event details, explore traditional clothing, and rent costumes through a clear digital flow.",
  result:
    "The project shows my product design ability in building culturally relevant digital experiences with marketplace-like and event-oriented user flows.",
}
```

---

# Recommended Project Data Structure

Create or update this file:

```txt
src/lib/portfolio-data.ts
```

Use this structure:

```ts
export type ProjectType = "Real Project" | "Exploration" | "UI/UX Design";

export type PortfolioProject = {
  slug: string;
  title: string;
  subtitle: string;
  type: ProjectType;
  categories: string[];
  description: string;
  service: string;
  timeline: string;
  role: string;
  year: string;
  url?: string;
  status: string;
  tools: string[];
  previewImage: string;
  overview: string;
  challenge: string;
  solution: string;
  result: string;
};

export const projects: PortfolioProject[] = [
  // Insert all 12 projects from this document here.
];
```

---

# Tool Icons Requirement

## Main Requirement

All project tools must use real icons, not plain text only.

Install and use:

```bash
npm install react-icons
```

Use icons from:

```ts
import {
  SiNextdotjs,
  SiReact,
  SiSupabase,
  SiLaravel,
  SiMysql,
  SiFigma,
  SiCloudflare,
  SiVercel,
  SiGoogle,
  SiGooglegemini,
  SiPostgresql,
} from "react-icons/si";
```

Important:

* Validate every imported icon with TypeScript.
* If one export does not exist in the installed version, replace it with the correct available export from `react-icons/si`.
* Do not leave broken imports.
* Do not remove the label even if the icon is not available.
* Each tool chip must have icon + label.

## Tool Icon Mapping

Create:

```txt
src/components/ui/TechIcon.tsx
```

Suggested mapping:

```ts
const iconMap = {
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
  SEO: SearchIconFromLucide,
  "Google Gemini": SiGooglegemini,
  "Local Storage": DatabaseIconFromLucide,
  "Project Management": WorkflowIconFromLucide,
  "Product Strategy": BoxesIconFromLucide,
  "Graphic Design": PenToolIconFromLucide,
  "Brand Identity": SparklesIconFromLucide,
  "Social Media Design": ImageIconFromLucide,
};
```

If exact brand icon is unavailable:

* Use the closest official parent technology icon.
* Example: Laravel Filament can use Laravel icon with label `Laravel Filament`.
* Neon can use PostgreSQL-like database icon only if no exact Neon icon exists.
* SEO can use lucide Search/ChartNoAxesCombined icon because SEO is a capability, not a brand.

## Tool Chip UI

Each tool chip should have:

* icon
* label
* white or transparent background
* subtle border
* hover lift
* soft shadow
* dark mode compatible if applicable

Style direction:

```txt
height: 34px - 40px
border-radius: 999px
padding: 8px 12px
font-size: 12px - 14px
gap: 8px
hover: translateY(-2px)
transition: smooth
```

---

# Selected Work Card Behavior

Each project card should display:

```txt
Project preview image
Project type badge
Project title
Subtitle or short description
Category pills
Tool icon chips
Hover arrow button
```

On card click:

* Go to `/work/[slug]`.

If project has a public URL:

* Project detail page should show `Live Preview` button.
* If project URL is empty/internal/private:

  * Hide `Live Preview`
  * Show status badge such as `Internal System`, `Private`, or `Prototype`.

---

# Project Detail Page Behavior

Every project must have a detail page:

```txt
/work/[slug]
```

The detail page should use the existing project detail UI previously created.

Each detail page must show:

* Back button
* Availability pill
* Category pills
* Project title
* Type label
* Description
* Service
* Timeline
* Role
* Year
* Status
* Tool icon chips
* Preview image
* Overview
* Challenge
* Solution
* Result
* Contact CTA section at bottom

The final Contact/CTA section from the landing page must still appear when the user scrolls to the bottom of each project detail page.

---

# Contact Section Update

Update final contact section copy to match Riswan’s real positioning.

## Heading

```txt
HAVE A PROJECT IN MIND?
```

## Description

```txt
Let’s build a website, dashboard, digital product, or visual system that feels clean, works fast, and supports your business goals.
```

## CTA Button

```txt
Contact Me
```

CTA link:

```txt
mailto:riswan@dekatlokal.com
```

## Social Pills

Use these:

* Riswan Ramadhan
* Dribbble
* Instagram
* LinkedIn
* Behance
* GitHub

---

# SEO Metadata Update

Update homepage metadata:

```ts
export const metadata = {
  title: "Riswan Ramadhan — Software Engineer & Digital Product Builder",
  description:
    "Portfolio of Riswan Ramadhan, a software engineer, web developer, UI/UX designer, and founder of DekatLokal based in Makassar, Indonesia.",
};
```

Project detail metadata should be dynamic:

* title: `${project.title} — Riswan Ramadhan`
* description: `Case study of ${project.title}: ${project.description}`

---

# Implementation Rules

1. Do not use placeholder companies or fictional projects.
2. Do not remove existing design quality.
3. Keep the Apple-like clean portfolio style.
4. Keep all content hard-coded for now.
5. Centralize all editable content in `src/lib/portfolio-data.ts`.
6. Use `react-icons` for real technology icons.
7. Use `lucide-react` only for general UI icons such as arrows, search, database, workflow, mail, etc.
8. Make sure all TypeScript types are clean.
9. Make sure all project detail pages work.
10. Make sure homepage filtering works.
11. Make sure all links open correctly.
12. Make sure email CTA uses `riswan@dekatlokal.com`.
13. Make sure there is no old dummy name, old dummy email, or old dummy company left.
14. Make sure selected work section includes 12 real/exploration/UIUX projects.
15. Run lint and fix all errors.

---

# Final QA Checklist

Before finishing, verify:

* [ ] Name is Riswan Ramadhan.
* [ ] Role is not fictional.
* [ ] Email is [riswan@dekatlokal.com](mailto:riswan@dekatlokal.com).
* [ ] Social links are real.
* [ ] Services are Web Developer, SEO & Web Performance, UI/UX Design, Motion & Graphic Design.
* [ ] Experience has 5 real entries.
* [ ] Selected Work has 12 real/exploration/UIUX entries.
* [ ] DekatLokal project exists.
* [ ] Growmates project exists.
* [ ] Bhekti Art project exists.
* [ ] Raya Law Firm project exists.
* [ ] Rumah BUMN Attendance System project exists.
* [ ] POS Cashier System project exists.
* [ ] AI Career Analysis project exists.
* [ ] SI ABAH / KhutbahKit project exists.
* [ ] BBI Cash Tracker project exists.
* [ ] Web Redesign Collection project exists.
* [ ] EMR Hospital UI/UX project exists.
* [ ] Arung Culture project exists.
* [ ] Tools display real icons with labels.
* [ ] Project detail pages render overview, challenge, solution, and result.
* [ ] Live Preview button only appears when URL exists.
* [ ] Internal/private projects do not show broken links.
* [ ] Contact section appears at bottom of project detail pages.
* [ ] Homepage still looks premium and polished.
* [ ] No TypeScript errors.
* [ ] No ESLint errors.
