"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/ui/header";
import { Toaster } from "react-hot-toast";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased m-4`}
      >
        <div className="min-h-screen bg-background">
          <Header />
          <Toaster position="top-right" />
          {children}
        </div>
      </body>
    </html>
  );
}
