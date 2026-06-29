import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { profile, siteMetadata } from "@/lib/portfolio-data";
import { NavigationProvider } from "@/components/navigation/NavigationProvider";

import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  title: siteMetadata.title,
  description: siteMetadata.description,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/images/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  keywords: siteMetadata.keywords,
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    type: "website",
    url: "/",
    siteName: `${profile.name} Portfolio`,
    images: [
      {
        url: "/images/projects/dekatlokal-work.webp",
        width: 2400,
        height: 1800,
        alt: "Riswan Ramadhan portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: ["/images/projects/dekatlokal-work.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geist.variable}>
        <NavigationProvider>{children}</NavigationProvider>
      </body>
    </html>
  );
}
