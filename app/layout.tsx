import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import AuthWatcher from "./auth/auth-watcher/AuthWatcher";
import { ProjectsWatcher } from "@/components/watcher/ProjectWatcher";

const defaultUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "LC Infraestructura",
  description: "Portal de control de contratos",
  icons: {
    icon: "/assets/icons/favicon.ico",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} antialiased bg-white`}
        suppressHydrationWarning={true}
      >
        <AuthWatcher />
        <ProjectsWatcher />
        {children}
      </body>
    </html>
  );
}
