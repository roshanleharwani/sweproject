"use client";

import "@/app/globals.css";
import Header from "@/components/ui/header";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`  antialiased m-4`}>
        <div className="min-h-screen bg-background">
          <Header />
          <Toaster position="top-right" />
          {children}
        </div>
      </body>
    </html>
  );
}
