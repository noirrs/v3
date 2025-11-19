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
  title: "Taha Kaçmaz - Backend Developer",
  description:
    "Backend developer with 5+ years of experience building scalable applications",
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
