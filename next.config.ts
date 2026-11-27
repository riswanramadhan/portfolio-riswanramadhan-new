import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Hemat kuota Vercel Image Optimization (paket Hobby dipakai bersama semua project):
    // - cache hasil optimasi 31 hari (default Next 16 hanya 4 jam, jadi gambar
    //   yang sama ditransformasi ulang berkali-kali),
    // - satu format (WebP) dan 7 ukuran saja (default 15 ukuran per gambar).
    formats: ["image/webp"],
    minimumCacheTTL: 2678400,
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [128, 256, 384],
  },
};

export default nextConfig;
