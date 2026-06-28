export type SocialIconName =
  | "Github"
  | "Instagram"
  | "Linkedin"
  | "Behance"
  | "Dribbble"
  | "User";

export type ProjectType = "Real Project" | "Exploration" | "UI/UX Design";
export type FilterCategory = "All" | "Real Project" | "Exploration";
export type ServiceIconName = "Code" | "Search" | "Layout" | "Palette";

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

export interface PortfolioProject {
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
  imageAlt: string;
  overview: string;
  challenge: string;
  solution: string;
  result: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  keywords: string[];
  featuredKeywords: string[];
  icon: ServiceIconName;
  image: string;
  imageAlt: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  highlights: string[];
  tools: string[];
  image: string;
  imageAlt: string;
}

export interface WorkFilter {
  label: FilterCategory;
  count: string;
}

export const siteMetadata = {
  title: "Riswan Ramadhan | Software Engineer & Digital Product Builder",
  description:
    "Portfolio of Riswan Ramadhan, a software engineer, web developer, UI/UX designer, and founder of DekatLokal based in Makassar, Indonesia.",
  keywords: [
    "Riswan Ramadhan",
    "Software Engineer",
    "Digital Product Builder",
    "Web Developer",
    "UI UX Designer",
    "DekatLokal",
    "Makassar",
  ],
  url: "https://dekatlokal.com",
};

export const profile = {
  name: "Riswan Ramadhan",
  firstName: "RISWAN",
  lastName: "RAMADHAN",
  role: "Software Engineer",
  professionalTitle: "Software Engineer & Digital Product Builder",
  secondaryRole: "Web Developer, UI/UX Designer, Founder of DekatLokal",
  location: "Makassar, Indonesia",
  description:
    "I build fast, clean, and business-focused digital products, from websites, dashboards, admin systems, and SEO-ready platforms to UI/UX prototypes for real users and growing organizations.",
  availability: "Available for New Project",
  primaryCta: "Let’s collaborate",
  contactCta: "Contact Me",
  email: "riswan@dekatlokal.com",
  emailHref: "mailto:riswan@dekatlokal.com",
  avatar: "/images/avatar.png",
  avatarAlt: "Portrait of Riswan Ramadhan",
  heroAvatarBlackWhite: "/images/avatarhero-blackwhite.webp",
  heroAvatarColor: "/images/avatarhero-color.webp",
  heroAvatarAlt: "Riswan Ramadhan standing with folded arms",
};

export const navItems: NavItem[] = [
  { label: "Work", count: "12", href: "/work" },
  { label: "Service", count: "4", href: "/service" },
  { label: "Experience", count: "5", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks: SocialLink[] = [
  {
    label: "Dribbble",
    href: "https://dribbble.com/riswanramadhan",
    icon: "Dribbble",
    external: true,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/riswannramadhan/",
    icon: "Instagram",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://id.linkedin.com/in/riswan-ramadhan-821781257",
    icon: "Linkedin",
    external: true,
  },
  {
    label: "Behance",
    href: "https://www.behance.net/riswanramadhan",
    icon: "Behance",
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/riswanramadhan",
    icon: "Github",
    external: true,
  },
];

export const contactLinks: SocialLink[] = [
  { label: profile.name, href: "/", icon: "User" },
  ...socialLinks,
];

export const workFilters: WorkFilter[] = [
  { label: "All", count: "12" },
  { label: "Real Project", count: "6" },
  { label: "Exploration", count: "6" },
];

export const projects: PortfolioProject[] = [
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
    previewImage: "/images/projects/dekatlokal.png",
    imageAlt: "Temporary monochrome platform preview for DekatLokal",
    overview:
      "DekatLokal is a platform I founded to help local UMKM start digitalization with a more structured approach. The platform provides Digital Checkup, readiness mapping, recommendations, and website support for businesses that are ready to grow online.",
    challenge:
      "Many UMKM want to go digital, but they do not always know whether they need a website, better branding, Google presence, or operational preparation first.",
    solution:
      "I built a platform that guides UMKM through a simple Digital Checkup flow, presents their digital readiness, and connects them with the right next step such as assistance, website creation, or digital improvement.",
    result:
      "The website is live, SEO-ready, indexed by Google, and continues to be improved as DekatLokal grows with UMKM partners and internal team collaboration.",
  },
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
    previewImage: "/images/projects/growmates.png",
    imageAlt: "Temporary monochrome community preview for Growmates",
    overview:
      "Growmates is a dynamic platform for volunteer activities and donations. It helps users discover programs, register as volunteers, donate, and follow activities through a more organized digital flow.",
    challenge:
      "Volunteer and donation programs need a system that is easy for public users while still manageable for organizers behind the scenes.",
    solution:
      "I developed a dynamic website with user registration, donation features, admin panel, content management, and SEO-ready public pages to support volunteer operations.",
    result:
      "The platform is live, searchable on Google, and supports event operations through a more structured digital experience for volunteers, donors, and admins.",
  },
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
    previewImage: "/images/projects/dekatlokal.png",
    imageAlt: "Temporary monochrome catalog preview for Bhekti Art",
    overview:
      "Bhekti Art is a dynamic catalog website for handmade craft and art products. The website showcases products, categories, testimonials, contact information, and business identity in a more professional digital format.",
    challenge:
      "The brand needed a website that could present many products clearly while allowing content to be managed without editing code manually.",
    solution:
      "I built the website using Laravel and Laravel Filament, creating a dynamic admin panel for managing catalog content, product data, testimonials, and website information.",
    result:
      "The website is live, SEO-ready, indexed by Google, and gives Bhekti Art a more professional product showcase with admin-managed content.",
  },
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
    previewImage: "/images/projects/dekatlokal.png",
    imageAlt: "Temporary monochrome website preview for Raya Law Firm",
    overview:
      "Raya Law Firm is a multipage company profile website built to present the firm’s legal services, professional positioning, credibility, and consultation flow.",
    challenge:
      "A law firm website needs to feel credible, structured, and easy to navigate while explaining multiple legal services without overwhelming visitors.",
    solution:
      "I built a multipage website using Next.js and React, with structured pages, service sections, clear CTA, responsive layout, and SEO-ready page setup.",
    result:
      "The website is live, indexed by Google, and provides a professional digital presence for Raya Law Firm with clear information architecture.",
  },
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
    status: "Internal System",
    tools: ["Next.js", "React", "Supabase"],
    previewImage: "/images/projects/rbm-attendance.png",
    imageAlt: "Temporary monochrome dashboard preview for the Rumah BUMN attendance system",
    overview:
      "This attendance system was built for Rumah BUMN Makassar to support daily internship attendance operations for around 40 users with check-in and check-out flow.",
    challenge:
      "Manual attendance tracking can be inefficient when many interns need to submit daily attendance, manage profiles, and be monitored by different roles.",
    solution:
      "I built a dynamic role-based web system with check-in, check-out, profile editing, CRUD features, attendance data management, and dashboard views using Next.js, React, and Supabase.",
    result:
      "The system supports daily internal attendance operations with better structure, faster data access, and a more scalable workflow for monitoring intern activity.",
  },
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
    status: "Private / Event System",
    tools: ["Next.js", "React", "Supabase"],
    previewImage: "/images/projects/rbm-attendance.png",
    imageAlt: "Temporary monochrome dashboard preview for the offline-ready POS system",
    overview:
      "This POS system was built to support warung makan operations during an event, connecting cashier input with kitchen workflow and sales reporting.",
    challenge:
      "During events, food orders need to move quickly from cashier to kitchen while still recording payment method, order status, sales recap, and offline-safe data.",
    solution:
      "I built a web-based POS system with cashier order input, QRIS/cash payment options, realtime kitchen order status, sales summary, menu performance, filters, and local-first synchronization when the internet connection is unstable.",
    result:
      "The system helps orders move from cashier to kitchen more clearly, keeps sales data organized, and can continue working offline before syncing back to the database when the connection returns.",
  },
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
    status: "Prototype",
    tools: ["Next.js", "React", "Google Gemini"],
    previewImage: "/images/projects/chayon.png",
    imageAlt: "Temporary monochrome product preview for AI-Powered Career Analysis",
    overview:
      "AI-Powered Career Analysis was created to help students and job seekers understand what is missing between their current resume and the requirements of a target job.",
    challenge:
      "Many students do not know why their CV does not match a job description or what skills they should improve first.",
    solution:
      "I built an AI workflow where users upload or paste their resume and target job description. The system analyzes skill gaps, recommends a learning path, suggests portfolio projects, and supports interview preparation based on missing skills.",
    result:
      "The prototype was completed in 3 days from concept to development, showing how AI can turn career uncertainty into a clearer, actionable improvement roadmap.",
  },
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
    previewImage: "/images/projects/chayon.png",
    imageAlt: "Temporary monochrome product preview for SI ABAH",
    overview:
      "SI ABAH helps users create khutbah or Islamic speech drafts by selecting event type, speaker name, title, duration, tone, audience, language, and religious references.",
    challenge:
      "Creating a khutbah often takes time because the speaker needs to structure the topic, find suitable dalil, adjust tone, and prepare a delivery-ready script.",
    solution:
      "I built an AI generator using Google Gemini Flash that can produce outlines, scripts, dalil, summaries, and delivery tips in Bahasa Indonesia, Bugis, or Javanese, with print-ready output.",
    result:
      "The product was completed in 3 days as a live prototype and demonstrates how AI can assist contextual religious content drafting while still allowing human polishing.",
  },
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
    previewImage: "/images/projects/rbm-attendance.png",
    imageAlt: "Temporary monochrome dashboard preview for BBI Cash Tracker",
    overview:
      "BBI Cash Tracker is a lightweight sales tracker for recording packages sold, capital, profit, monthly revenue, and sales growth.",
    challenge:
      "Small sellers often need a fast and simple way to track profit and monthly growth without setting up a complex database or accounting system.",
    solution:
      "I built a local-first web app that stores data locally, calculates profit and growth, supports filtering, and allows JSON export for backup or transfer.",
    result:
      "The tool was completed in 1 day and provides a practical way to track sales and profit directly from the browser.",
  },
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
    status: "Design Study",
    tools: ["Figma"],
    previewImage: "/images/projects/dekatlokal.png",
    imageAlt: "Temporary monochrome web preview for the Web Redesign Collection",
    overview:
      "This project combines three website redesign studies: Adidas, Wise, and Danantara Indonesia. The work focused on improving interface clarity, visual hierarchy, spacing, and modern layout execution.",
    challenge:
      "Each brand has a different personality, so the redesign needed to keep the brand feeling while improving the layout and visual experience.",
    solution:
      "I used Figma to explore hero layouts, navigation structure, typography, visual hierarchy, card systems, and responsive web composition.",
    result:
      "The project strengthened my foundation in web UI design, layout consistency, and high-fidelity interface exploration.",
  },
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
    status: "Prototype",
    tools: ["Figma"],
    previewImage: "/images/projects/rbm-attendance.png",
    imageAlt: "Temporary monochrome dashboard preview for the EMR Hospital UI/UX project",
    overview:
      "EMR Hospital UI/UX is a full dashboard prototype for hospital operations, covering multiple modules from patient queue and examination to pharmacy, billing, and reporting.",
    challenge:
      "Hospital systems are complex because many roles and workflows are connected, from nurses and doctors to pharmacy and finance.",
    solution:
      "I designed a structured admin interface with clear modules, dashboard layout, master data, patient examination flow, medical records, pharmacy process, billing screens, and reporting pages.",
    result:
      "The prototype demonstrates my ability to design complex admin systems with interconnected workflows, not only simple landing pages.",
  },
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
    status: "Prototype",
    tools: ["Figma"],
    previewImage: "/images/projects/growmates.png",
    imageAlt: "Temporary monochrome mobile preview for Arung Culture",
    overview:
      "Arung Culture is a UI/UX design concept for a cultural platform that combines event discovery and traditional clothing rental in South Sulawesi.",
    challenge:
      "Cultural event information and traditional costume rental are often scattered, making it harder for users to discover, plan, and participate in cultural experiences.",
    solution:
      "I designed a platform experience that allows users to browse cultural events, view event details, explore traditional clothing, and rent costumes through a clear digital flow.",
    result:
      "The project shows my product design ability in building culturally relevant digital experiences with marketplace-like and event-oriented user flows.",
  },
];

export const services: Service[] = [
  {
    id: "web-developer",
    number: "01",
    title: "WEB DEVELOPER",
    shortDescription:
      "Building responsive, SEO-ready, and scalable websites using modern frontend and full-stack technologies.",
    fullDescription:
      "I develop landing pages, company profiles, admin dashboards, internal systems, and dynamic platforms using Next.js, React, Laravel, Supabase, MySQL, and modern deployment workflows. My focus is not only making websites look good, but also making them fast, structured, maintainable, and useful for real business operations.",
    keywords: [
      "Next.js",
      "React",
      "Laravel",
      "Supabase",
      "MySQL",
      "Admin Dashboard",
      "Internal System",
      "Company Profile",
      "Deployment",
      "Responsive Website",
    ],
    featuredKeywords: ["Next.js", "Laravel", "Admin Dashboard", "Responsive Website"],
    icon: "Code",
    image: "/images/projects/dekatlokal.png",
    imageAlt: "Temporary web development preview",
  },
  {
    id: "seo-web-performance",
    number: "02",
    title: "SEO & WEB PERFORMANCE",
    shortDescription:
      "Improving website visibility, crawlability, structure, speed, and search readiness.",
    fullDescription:
      "I optimize websites so they are easier to find, index, and understand by search engines. This includes technical SEO, metadata, sitemap, robots.txt, canonical URL, Open Graph image, favicon, structured content, semantic heading, page speed improvement, mobile responsiveness, and Google Search Console readiness.",
    keywords: [
      "Technical SEO",
      "Metadata",
      "Sitemap",
      "Robots.txt",
      "Canonical URL",
      "Open Graph",
      "Structured Content",
      "Google Search Console",
      "Page Speed",
      "Core Web Vitals",
    ],
    featuredKeywords: ["Technical SEO", "Metadata", "Page Speed", "Core Web Vitals"],
    icon: "Search",
    image: "/images/projects/dekatlokal.png",
    imageAlt: "Temporary SEO and web performance preview",
  },
  {
    id: "ui-ux-design",
    number: "03",
    title: "UI/UX DESIGN",
    shortDescription:
      "Designing clean, usable, and conversion-focused interfaces for websites, dashboards, and digital products.",
    fullDescription:
      "I design digital interfaces using Figma, from wireframes and layout exploration to high-fidelity UI and clickable prototypes. My UI/UX work focuses on clarity, hierarchy, user flow, visual consistency, and making complex systems easier to use.",
    keywords: [
      "Figma",
      "Wireframe",
      "Prototype",
      "Dashboard UI",
      "Web Design",
      "Design System",
      "User Flow",
      "Responsive Design",
      "Interface Design",
    ],
    featuredKeywords: ["Figma", "Wireframe", "Prototype", "Design System"],
    icon: "Layout",
    image: "/images/projects/growmates.png",
    imageAlt: "Temporary UI/UX design preview",
  },
  {
    id: "motion-graphic-design",
    number: "04",
    title: "MOTION & GRAPHIC DESIGN",
    shortDescription:
      "Creating visual assets, social media designs, motion content, posters, and brand visuals for digital communication.",
    fullDescription:
      "I create visual content for Instagram feeds, stories, highlights, posters, brand identity, presentation assets, and simple motion graphics. This skill helps me bridge product, marketing, and visual storytelling so a digital product can look consistent across website, social media, and campaign materials.",
    keywords: [
      "Poster Design",
      "Instagram Feed",
      "Instagram Story",
      "Brand Identity",
      "Motion Graphic",
      "Visual Campaign",
      "Social Media Design",
      "Creative Direction",
      "Content Design",
    ],
    featuredKeywords: ["Poster Design", "Brand Identity", "Motion Graphic", "Social Media Design"],
    icon: "Palette",
    image: "/images/projects/chayon.png",
    imageAlt: "Temporary motion and graphic design preview",
  },
];

export const experiences: Experience[] = [
  {
    id: "dekatlokal",
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
      "Managed collaboration, execution, and continuous iteration with a small team.",
    ],
    tools: ["Next.js", "React", "Cloudflare", "Neon", "SEO", "Product Strategy"],
    image: "/images/projects/dekatlokal.png",
    imageAlt: "Temporary DekatLokal platform preview",
  },
  {
    id: "rumah-bumn-makassar",
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
      "Contributed to internal digital tools including an attendance system for internship operations.",
    ],
    tools: ["Next.js", "React", "Supabase", "Vercel", "SEO", "Cloudflare"],
    image: "/images/projects/rbm-attendance.png",
    imageAlt: "Temporary Rumah BUMN attendance system preview",
  },
  {
    id: "chayon-online-course",
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
      "Coordinated project progress, task flow, and execution as a project manager during development.",
    ],
    tools: ["Figma", "Next.js", "Laravel", "Supabase", "Project Management"],
    image: "/images/projects/chayon.png",
    imageAlt: "Temporary Chayon course platform preview",
  },
  {
    id: "pt-pusat-andalan-sukses-terpadu",
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
      "Supported content design needs for social media and digital campaigns.",
    ],
    tools: ["Figma", "Canva", "Graphic Design", "Brand Identity", "Social Media Design"],
    image: "/images/projects/chayon.png",
    imageAlt: "Temporary graphic design preview",
  },
  {
    id: "hesalab",
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
      "Strengthened foundational skills in UI structure, spacing, typography, and visual direction.",
    ],
    tools: ["Figma", "UI Design", "UX Design", "Web Redesign", "Prototype"],
    image: "/images/projects/dekatlokal.png",
    imageAlt: "Temporary web redesign preview",
  },
];

export const sectionContent = {
  expertise: {
    statement:
      "I build clear, useful digital products that help businesses grow with confidence.",
  },
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
    metric: "5 roles across product, web development, and design",
  },
  contact: {
    heading: "HAVE A PROJECT IN MIND?",
    description:
      "Let’s build a website, dashboard, digital product, or visual system that feels clean, works fast, and supports your business goals.",
  },
};

export const pageContent = {
  work: {
    metadataDescription:
      "Real websites, digital products, AI explorations, and UI/UX work by Riswan Ramadhan.",
    description:
      "Websites, systems, product explorations, and UI/UX work built for real businesses, communities, and practical use.",
  },
  service: {
    metadataDescription:
      "Web development, SEO and web performance, UI/UX design, and visual design services by Riswan Ramadhan.",
    lead: "From business-ready websites and dashboards to thoughtful product interfaces and visual systems.",
    supporting:
      "Each engagement combines clear structure, practical implementation, performance, and a visual direction that supports real goals.",
    processHeading: "A clear working rhythm",
    process: [
      ["01", "Discover", "Understand the business, audience, constraints, and the real problem worth solving."],
      ["02", "Define", "Turn findings into a focused scope, content structure, and product direction."],
      ["03", "Build", "Design and develop a responsive, maintainable, and SEO-ready experience."],
      ["04", "Refine", "Test the details, improve performance, and prepare the product for real use."],
    ] as const,
  },
  experience: {
    metadataDescription:
      "Professional experience of Riswan Ramadhan across product building, web development, UI/UX, and visual design.",
    eyebrow: "Building real products since 2025",
    lead: "Learning through products and systems that serve businesses, teams, communities, and local brands.",
    principlesHeading: "Principles carried forward",
    principles: [
      ["Useful before decorative", "Every interface decision should help people understand, act, or work more effectively."],
      ["Structured to grow", "Maintainable systems and clear content foundations make future iteration easier."],
      ["Close to real needs", "The best direction comes from understanding the actual users, operations, and business context."],
    ] as const,
  },
  contact: {
    metadataDescription:
      "Contact Riswan Ramadhan for websites, dashboards, digital products, UI/UX, SEO, or visual design projects.",
  },
};
