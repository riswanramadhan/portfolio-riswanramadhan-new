import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { siteMetadata } from "@/lib/portfolio-data";
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
  keywords: siteMetadata.keywords,
  authors: [{ name: "Riswan Ramadhan" }],
  creator: "Riswan Ramadhan",
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    type: "website",
    url: "/",
    siteName: "Riswan Ramadhan Portfolio",
    images: [
      {
        url: "/images/projects/dekatlokal.png",
        width: 1536,
        height: 1024,
        alt: "Riswan Ramadhan portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: ["/images/projects/dekatlokal.png"],
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
