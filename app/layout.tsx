import type { Metadata } from "next";
import { Sora, JetBrains_Mono } from "next/font/google";
import SplashCursorToggle from "@/components/ui/SplashCursorToggle";
import ThemeToggle from "@/components/ui/ThemeToggle";
import ClientVisitorTracker from "@/components/ClientVisitorTracker";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Noir - Backend Developer",
  description:
    "I'm a backend developer with also experiences in frontend projects using NextJS and Tailwindcss",
  applicationName: "Noir",
  authors: [{ name: "Taha Kaçmaz", url: "https://noir.land" }],
  keywords: [
    "Noir",
    "Noirrs",
    "backend",
    "developer",
    "self-taught",
    "self-educated",
    "NextJS",
    "Tailwindcss",
    "noir.land",
  ],
  openGraph: {
    type: "website",
    url: "https://noir.land",
    title: "Noir - Backend Developer",
    description:
      "I'm a backend developer with also experiences in frontend projects using NextJS and Tailwindcss",
    images: [
      {
        url: "https://noir.land/assets/pp.png",
        width: 1200,
        height: 630,
        alt: "Noir",
      },
    ],
    siteName: "Noir",
  },
  twitter: {
    card: "summary_large_image",
    title: "noir.land",
    description:
      "I'm a backend developer with also experiences in frontend projects using NextJS and Tailwindcss",
    images: ["https://noir.land/assets/pp.png"],
    creator: "@noirrs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: "/assets/pp.png",
  },
  themeColor: "#6366f1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ClientVisitorTracker />
        <ThemeToggle />
        <SplashCursorToggle />
        {children}
      </body>
    </html>
  );
}
