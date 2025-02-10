"use client";

import { Space_Grotesk } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/ui/header";
import { Toaster } from "react-hot-toast";
const font = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className}  antialiased m-4`}>
        <div className="min-h-screen bg-background">
          <Header />
          <Toaster position="top-right" />
          {children}
        </div>
      </body>
    </html>
  );
}
