import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import ThemeProvider from "@/components/ThemeProvider";
import PageTransition from "@/components/PageTransition";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://portfolio-liart-iota-82.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rahat Sultan — Software Engineer",
    template: "%s | Rahat Sultan",
  },
  description:
    "Final-year CS student specializing in AI/ML. Building full-stack web apps with Next.js, React, and Supabase. Open to entry-level software engineering roles.",
  keywords: [
    "Rahat Sultan",
    "Software Engineer",
    "Next.js",
    "React",
    "Supabase",
    "Full-stack",
    "AI",
    "Machine Learning",
    "Pakistan",
    "Portfolio",
  ],
  authors: [{ name: "Rahat Sultan", url: siteUrl }],
  creator: "Rahat Sultan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Rahat Sultan — Portfolio",
    title: "Rahat Sultan — Software Engineer",
    description:
      "Final-year CS student specializing in AI/ML. Building full-stack web apps with Next.js, React, and Supabase. Open to entry-level software engineering roles.",
    images: [
      {
        url: "/profile.jpg",
        width: 800,
        height: 800,
        alt: "Rahat Sultan — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahat Sultan — Software Engineer",
    description:
      "Final-year CS student specializing in AI/ML. Building full-stack web apps with Next.js, React, and Supabase.",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider>
          <PageTransition />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
