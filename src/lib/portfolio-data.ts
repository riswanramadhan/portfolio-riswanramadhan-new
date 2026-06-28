export type SocialIconName =
  | "Github"
  | "Instagram"
  | "Linkedin"
  | "Behance"
  | "Dribbble"
  | "User";

export type FilterCategory = "All" | "Real Project" | "Exploration";

export interface NavItem {
  label: string;
  count?: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIconName;
  external?: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: Exclude<FilterCategory, "All">;
  type: string;
  categories: string[];
  description: string;
  service: string;
  timeline: string;
  tools: string[];
  livePreviewUrl: string;
  contactUrl: string;
  image: string;
  imageAlt: string;
  tags: string[];
  caseStudy: {
    overview: string;
    challenge: string;
    solution: string;
    result: string;
  };
}

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  deliverables: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  image?: string;
  imageAlt?: string;
}

export interface WorkFilter {
  label: FilterCategory;
  count: string;
}

export const siteMetadata = {
  title: "Riswan Ramadhan — Software Engineer & Product Builder",
  description:
    "The personal portfolio of Riswan Ramadhan, building clear and impactful digital products for businesses and communities.",
  keywords: [
    "Riswan Ramadhan",
    "Software Engineer",
    "Product Builder",
    "Frontend Developer",
    "UI UX Designer",
    "Makassar",
  ],
  url: "https://dekatlokal.com",
};

export const profile = {
  name: "Riswan Ramadhan",
  firstName: "RISWAN",
  lastName: "RAMADHAN",
  role: "Software Engineer & Product Builder",
  description:
    "Designing and building digital products for UMKM, communities, and impact-driven teams.",
  availability: "Available for New Project",
  primaryCta: "Let’s collaborate",
  contactCta: "Contact Me",
  email: "mailto:hello@dekatlokal.com",
  whatsapp: "https://wa.me/6280000000000",
  avatar: "/images/avatar.png",
  avatarAlt: "Abstract graphite portrait representing Riswan Ramadhan",
};

export const navItems: NavItem[] = [
  { label: "Work", count: "04", href: "/work" },
  { label: "Service", count: "04", href: "/service" },
  { label: "Experience", count: "05", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/",
    icon: "Github",
    external: true,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/",
    icon: "Instagram",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/",
    icon: "Linkedin",
    external: true,
  },
  {
    label: "Behance",
    href: "https://behance.net/",
    icon: "Behance",
    external: true,
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com/",
    icon: "Dribbble",
    external: true,
  },
];

export const contactLinks: SocialLink[] = [
  { label: profile.name, href: "/", icon: "User" },
  ...socialLinks,
];

export const workFilters: WorkFilter[] = [
  { label: "All", count: "04" },
  { label: "Real Project", count: "03" },
  { label: "Exploration", count: "01" },
];

export const projects: Project[] = [
  {
    id: "dekatlokal",
    slug: "dekatlokal",
    title: "DekatLokal — UMKM Digitalization Platform",
    category: "Real Project",
    type: "Platform",
    categories: ["UMKM Platform", "Independent Product"],
    description:
      "A focused digital platform that helps local businesses build a clearer online presence and connect with nearby customers.",
    service: "Product Design, Web Development",
    timeline: "Ongoing",
    tools: ["Next.js", "Figma", "SEO"],
    livePreviewUrl: "https://dekatlokal.com",
    contactUrl: "mailto:hello@dekatlokal.com",
    image: "/images/projects/dekatlokal.png",
    imageAlt:
      "Monochrome desktop and mobile marketplace dashboard mockup for DekatLokal",
    tags: ["Next.js", "UMKM", "SEO"],
    caseStudy: {
      overview:
        "DekatLokal brings local business discovery, storefront information, and practical digital tools into one coherent platform for Indonesian UMKM.",
      challenge:
        "Small businesses often manage fragmented information across social platforms, making them difficult to discover and harder to trust online.",
      solution:
        "A modular product system combines searchable business profiles, clear content hierarchy, responsive storefronts, and an SEO-minded technical foundation.",
      result:
        "The platform established a scalable base for onboarding local merchants while giving every business a clearer and more credible digital presence.",
    },
  },
  {
    id: "rbm-attendance",
    slug: "rbm-attendance",
    title: "RBM Attendance System",
    category: "Real Project",
    type: "Web App",
    categories: ["Internal Web App", "Rumah BUMN"],
    description:
      "A location-aware attendance dashboard designed to make daily check-ins and operational reporting simple and reliable.",
    service: "UI/UX Design, Web Application",
    timeline: "8 Weeks",
    tools: ["Supabase", "Next.js", "GPS"],
    livePreviewUrl: "#",
    contactUrl: "mailto:hello@dekatlokal.com",
    image: "/images/projects/rbm-attendance.png",
    imageAlt:
      "Dark attendance analytics dashboard with mobile location check-in mockup",
    tags: ["Supabase", "GPS", "Dashboard"],
    caseStudy: {
      overview:
        "The RBM Attendance System centralizes employee presence, location validation, and attendance reporting in a single responsive dashboard.",
      challenge:
        "Manual attendance records created inconsistent data, slow reporting, and limited visibility into where check-ins occurred.",
      solution:
        "The product pairs GPS-assisted check-ins with clear status feedback, role-based dashboards, and structured reporting powered by Supabase.",
      result:
        "Attendance became easier to verify and operational teams gained a cleaner, faster way to review daily activity and historical records.",
    },
  },
  {
    id: "growmates",
    slug: "growmates",
    title: "Growmates — Volunteer Platform Concept",
    category: "Exploration",
    type: "Product Design",
    categories: ["Product Concept", "Community"],
    description:
      "A community product concept that makes volunteer opportunities feel approachable, social, and easier to act on.",
    service: "Product Strategy, UI/UX Design",
    timeline: "4 Weeks",
    tools: ["Figma", "Research", "Prototyping"],
    livePreviewUrl: "#",
    contactUrl: "mailto:hello@dekatlokal.com",
    image: "/images/projects/growmates.png",
    imageAlt: "Two floating monochrome volunteer community app screens",
    tags: ["UI/UX", "Community", "Product"],
    caseStudy: {
      overview:
        "Growmates explores how a mobile-first experience can connect volunteers with meaningful initiatives and like-minded communities.",
      challenge:
        "Volunteer opportunities are often scattered, lack context, and ask users to commit before they understand the people or impact involved.",
      solution:
        "The concept uses interest-based discovery, concise opportunity cards, community signals, and a low-friction participation flow.",
      result:
        "The final prototype demonstrates a friendlier path from discovery to participation and a visual system that can grow with the community.",
    },
  },
  {
    id: "chayon",
    slug: "chayon",
    title: "Chayon Course Platform",
    category: "Real Project",
    type: "Website",
    categories: ["Course Platform", "Education"],
    description:
      "A structured online learning platform that presents courses, progress, and educational content through a calm, focused interface.",
    service: "Web Design, Full-stack Development",
    timeline: "6 Weeks",
    tools: ["Laravel", "Next.js", "Figma"],
    livePreviewUrl: "#",
    contactUrl: "mailto:hello@dekatlokal.com",
    image: "/images/projects/chayon.png",
    imageAlt:
      "Graphite desktop and tablet online learning platform mockup",
    tags: ["Laravel", "Next.js", "Course"],
    caseStudy: {
      overview:
        "Chayon is an online course experience designed around clear content discovery, comfortable learning sessions, and visible progress.",
      challenge:
        "Dense course catalogs and inconsistent lesson structures made it difficult for learners to understand value and maintain momentum.",
      solution:
        "A consistent course architecture, focused lesson workspace, responsive UI, and clear progress states were built across the platform.",
      result:
        "The resulting system gives learners a more predictable journey and provides the product team with reusable patterns for future courses.",
    },
  },
];

export const services: Service[] = [
  {
    id: "ui-ux-design",
    number: "01",
    title: "UI/UX DESIGN",
    description:
      "Designing clear, scalable, and conversion-focused interfaces for dashboards, websites, and digital products.",
    image: "/images/projects/growmates.png",
    imageAlt: "Mobile community interface mockup",
    deliverables: ["Product strategy", "User flows", "Design systems"],
  },
  {
    id: "web-design-development",
    number: "02",
    title: "WEB DESIGN & DEV",
    description:
      "Building fast, responsive, and SEO-ready websites using thoughtful systems and modern frontend stacks.",
    image: "/images/projects/dekatlokal.png",
    imageAlt: "Desktop and mobile web platform mockup",
    deliverables: ["Responsive websites", "Frontend systems", "SEO foundations"],
  },
  {
    id: "branding",
    number: "03",
    title: "BRANDING",
    description:
      "Helping products and UMKM communicate their value through a focused identity and coherent digital presence.",
    image: "/images/projects/rbm-attendance.png",
    imageAlt: "Dark digital dashboard shown on a laptop",
    deliverables: ["Identity direction", "Digital guidelines", "Brand applications"],
  },
  {
    id: "motion-animation",
    number: "04",
    title: "MOTIONS & ANIMATIONS",
    description:
      "Adding subtle interaction and motion systems that make digital experiences feel alive, intuitive, and premium.",
    image: "/images/projects/chayon.png",
    imageAlt: "Dark course platform on desktop and tablet",
    deliverables: ["Interaction studies", "Motion direction", "UI transitions"],
  },
];

export const experiences: Experience[] = [
  {
    id: "dekatlokal",
    company: "DekatLokal",
    role: "Founder & Product Lead",
    period: "2025 — Now",
    image: "/images/projects/dekatlokal.png",
    imageAlt: "DekatLokal product dashboard mockup",
  },
  {
    id: "rumah-bumn",
    company: "Rumah BUMN Makassar",
    role: "Digital Marketing / Web Development Intern",
    period: "2025 — 2026",
    image: "/images/projects/rbm-attendance.png",
    imageAlt: "Rumah BUMN digital dashboard project preview",
  },
  {
    id: "kkn-parepare",
    company: "KKN Parepare",
    role: "Digital Product Initiator",
    period: "2025",
    image: "/images/projects/growmates.png",
    imageAlt: "Community-focused digital product preview",
  },
  {
    id: "chayon-course",
    company: "Chayon Online Course",
    role: "Fullstack Developer",
    period: "2025",
    image: "/images/projects/chayon.png",
    imageAlt: "Chayon online course platform preview",
  },
  {
    id: "freelance",
    company: "Freelance Web Projects",
    role: "UI/UX & Frontend Developer",
    period: "2024 — Now",
    image: "/images/projects/dekatlokal.png",
    imageAlt: "Selected freelance web interface preview",
  },
];

export const sectionContent = {
  work: {
    backgroundLabel: "PORTFOLIO",
    heading: "/SELECTED WORK",
    viewAll: "View All Work",
  },
  service: {
    heading: "/SERVICE",
  },
  experience: {
    backgroundLabel: "EXPERIENCE",
    heading: "/EXPERIENCE",
    metric: "3+ years of building experience",
  },
  contact: {
    heading: "HAVE A PROJECT IN MIND?",
    description:
      "Together, we can build digital products that are clear, impactful, and genuinely useful for real communities.",
  },
};
