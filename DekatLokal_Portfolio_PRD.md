# PRD — Modern Portfolio Website ala Apple Ecosystem UI

## 1. Ringkasan Produk
Bangun website portfolio personal satu halaman untuk **Riswan Ramadhan** dengan gaya visual premium, minimal, editorial, dan modern. UI harus sangat mirip dengan referensi: monochrome, cloud/frosted background, glass frame, kartu putih/gelap, typography besar, tombol pill, dan animasi halus.

Website dibuat dari nol menggunakan **Next.js App Router + TypeScript + Tailwind CSS + Motion for React**, tanpa CMS, tanpa backend, dan semua konten boleh hard-coded agar mudah direvisi.

## 2. Tujuan Utama
1. Menampilkan personal brand Riswan sebagai web developer, product builder, dan founder DekatLokal.
2. Membuat kesan visual premium seperti website designer modern: clean, Apple-like, cinematic, dan tidak kaku.
3. Menyediakan lima section utama sesuai referensi gambar:
   - Hero/Profile Section
   - Selected Work/Portfolio Section
   - Service Section
   - Experience Section
   - Contact CTA Section
4. Menghasilkan codebase yang mudah diedit oleh AI/Codex di VSCode.

## 3. Design Direction dari Referensi
### Gaya utama
- **Monochrome premium**: putih, hitam, abu-abu, graphite.
- **Apple ecosystem UI**: clean spacing, soft shadow, glass surface, rounded card, typography besar, banyak whitespace.
- **Editorial portfolio**: heading pakai slash prefix seperti `/SERVICE`, `/EXPERIENCE`, `/SELECTED WORK`.
- **Cloud/frosted atmosphere**: background awan grayscale, blur, glass panel, soft vignette.
- **Minimal interaction**: hover terasa mahal, bukan ramai.

### Elemen visual wajib
- Background grayscale cloudy/soft mist.
- Panel utama berbentuk card besar dengan border putih tipis dan shadow.
- Hero dengan nama besar: sebagian outline, sebagian solid.
- Navbar pill/top navigation di dalam panel.
- Status pill: `Available for New Project` dengan dot hijau.
- Social buttons pill: Dribbble, Instagram, LinkedIn, Behance/GitHub.
- Button hitam pill dengan icon panah diagonal.
- Section portfolio dengan white card besar dan project cards 2 kolom.
- Section service dengan accordion/list besar, active item berwarna gelap.
- Section experience dengan card gelap, row list, image kecil miring.
- CTA section dengan headline besar centered.

## 4. Target User
1. Recruiter atau hiring manager yang melihat kemampuan teknis dan desain.
2. Partner/UMKM/instansi yang ingin melihat kualitas karya DekatLokal.
3. Dosen, mentor, dan pihak program yang ingin melihat kredibilitas portfolio.

## 5. Scope Fitur
### In scope
- Landing page single page.
- Smooth scroll antar section.
- Section hero, portfolio, service, experience, contact.
- Hard-coded data karya, layanan, pengalaman, dan social links.
- Responsive desktop/tablet/mobile.
- Animasi entrance, hover, accordion, parallax ringan.
- SEO dasar: metadata, Open Graph, title, description.

### Out of scope
- Dashboard admin.
- Backend database.
- Login/authentication.
- CMS.
- Blog dinamis.
- Form kontak backend. CTA cukup mailto/WhatsApp/link eksternal.

## 6. Tech Stack
- Framework: Next.js App Router + TypeScript.
- Styling: Tailwind CSS + CSS variables di `globals.css`.
- Animation: Motion for React.
- Icons: lucide-react.
- Font: gunakan `Geist` atau `Inter` via `next/font/google`.
- Deployment target: Vercel.

## 7. Struktur Halaman
Urutan landing page final:
1. `HeroSection`
2. `SelectedWorkSection`
3. `ServiceSection`
4. `ExperienceSection`
5. `ContactSection`

Catatan: referensi gambar menampilkan contact di awal, tetapi untuk portfolio personal lebih natural contact ditempatkan di akhir sebagai CTA penutup.

## 8. Detail Section

### 8.1 Hero Section
Tujuan: langsung menampilkan personal brand.

Konten awal:
- Nama: `RISWAN RAMADHAN`
- Role: `Software Engineer & Product Builder`
- Deskripsi: `Designing and building digital products for UMKM, communities, and impact-driven teams.`
- CTA utama: `Let's collaborate`
- CTA social: GitHub, Instagram, LinkedIn, Behance/Portfolio

Layout desktop:
- Outer page background grey cloudy.
- Hero card max-width 1180–1240px, height sekitar 720px.
- Card putih dengan inner border tipis.
- Top nav inside card, horizontal.
- Heading sangat besar di tengah, behind portrait/avatar.
- Kata pertama outline, kata kedua solid.
- Portrait/avatar di tengah bawah heading.
- Role dan CTA di kiri bawah.
- Social button stack di kanan.

Animasi:
- Card fade + scale in.
- Heading muncul dari opacity 0 dan y 28.
- Portrait naik pelan.
- Social buttons stagger.
- Cloud background bergerak sangat pelan.

### 8.2 Selected Work Section
Tujuan: menampilkan karya terbaik.

Konten project hard-coded:
1. DekatLokal — UMKM Digitalization Platform
2. RBM Attendance System — Web Attendance with GPS & Selfie
3. Growmates — Volunteer Platform Concept
4. Chayon Course Platform — Online Course Website

Layout:
- White card besar dengan radius 8–12px.
- Big faint background text: `PORTFOLIO` warna #f1f1f1.
- Heading centered: `/SELECTED WORK`.
- Filter pills: All, Real Project, Exploration.
- Button `View All Work` di kanan.
- Project grid 2 kolom.
- Project card image ratio 16:10, title besar, chips kategori.

Animasi:
- Project card reveal on scroll.
- Image hover scale 1.035.
- Button hover panah bergerak diagonal kecil.

### 8.3 Service Section
Tujuan: menunjukkan kemampuan inti.

Layanan:
1. UI/UX DESIGN
2. WEB DESIGN & DEV
3. BRANDING
4. MOTIONS & ANIMATIONS

Layout:
- Background cloudy tetap.
- Heading `/SERVICE` kiri atas.
- List item sangat besar, uppercase.
- Item aktif berupa dark card horizontal dengan deskripsi dan mockup kecil miring.
- Item lain berupa text besar + arrow kanan + border bawah.

Interaction:
- Saat hover/click item, item menjadi active dark card.
- Active card menampilkan title, deskripsi, image/mockup placeholder, dan icon X.
- Desktop: accordion vertical.
- Mobile: semua card bisa stack.

Animasi:
- Height/opacity transition smooth.
- Mockup image rotate sekitar -6deg.
- Arrow hover translate.

### 8.4 Experience Section
Tujuan: menampilkan kredibilitas.

Experience hard-coded:
1. DekatLokal — Founder & Product Lead — 2025 - Now
2. Rumah BUMN Makassar — Digital Marketing / Web Development Intern — 2025 - 2026
3. KKN Parepare — Digital Product Initiator — 2025
4. Chayon Online Course — Fullstack Developer — 2025
5. Freelance Web Projects — UI/UX & Frontend Developer — 2024 - Now

Layout:
- Dark graphite card #242424.
- Outer white border/frame.
- Heading `/EXPERIENCE` kiri atas.
- Faint background text `EXPERIENCE` besar di belakang.
- Right label: `3+ years of building experience` atau `9+ selected projects`.
- Row list: company/project, role, date kanan.
- Divider line #3d3d3d.
- Satu floating mockup image di row pertama, sedikit rotate.

Animasi:
- Dark card reveal scale.
- Rows stagger fade.
- Mockup floating subtle y movement.

### 8.5 Contact CTA Section
Tujuan: closing dan ajakan kerja sama.

Konten:
- Status pill: Available for New Project
- Heading: `HAVE A PROJECT IN MIND?`
- Subheading: `Together, we can build digital products that are clear, impactful, and useful for real communities.`
- Button: `Contact Me`
- Bottom social pills: Riswan Ramadhan, GitHub, Instagram, LinkedIn, Behance

Layout:
- Glass rectangle centered di cloudy background.
- Text centered.
- Bottom social navigation spread horizontal.

Animasi:
- CTA card fade in.
- Button hover glow shadow.
- Social pills hover upward 4px.

## 9. Data Hard-coded
Buat file `src/lib/portfolio-data.ts` untuk semua konten agar revisi mudah.

Data structure minimal:
- `profile`
- `navItems`
- `socialLinks`
- `projects`
- `services`
- `experiences`

## 10. Non-functional Requirements
- Lighthouse Performance target: 90+.
- First load ringan; gunakan gambar lokal di `/public` dan optimasi `next/image`.
- Animasi tidak boleh menyebabkan layout shift.
- Responsive minimal:
  - Desktop: 1280–1536px optimal.
  - Tablet: 768–1024px tetap rapi.
  - Mobile: 360–430px stack vertikal.
- Accessibility:
  - Link punya aria-label.
  - Kontras text cukup.
  - Support `prefers-reduced-motion` dengan mengurangi animasi.

## 11. Acceptance Criteria
1. Saat dibuka desktop, tampilannya terasa sangat mirip referensi: cloudy monochrome, card putih/dark, heading besar, pill buttons.
2. Lima section selesai dan dapat scroll smooth.
3. Semua konten bisa diubah dari `src/lib/portfolio-data.ts`.
4. Tidak ada error TypeScript/ESLint.
5. Tidak ada dependency UI kit berat seperti shadcn/radix kecuali sangat dibutuhkan.
6. Animasi terasa smooth, premium, dan tidak lebay.
7. Project bisa langsung deploy ke Vercel.

## 12. Path Pengerjaan Terbaik
Mulai dari project fresh:

```bash
npx create-next-app@latest riswan-portfolio --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
cd riswan-portfolio
npm i motion lucide-react clsx tailwind-merge
npm run dev
```

Kemudian buat struktur:

```txt
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
```

## 13. Prompt Eksekusi Utama untuk Codex
Gunakan file ini bersama `DESIGN.md`. Tugas Codex: bangun seluruh UI dari nol sesuai PRD dan DESIGN.md, dengan Next.js App Router, TypeScript, Tailwind CSS, Motion for React, lucide-react, data hard-coded, dan visual sedekat mungkin dengan referensi.
