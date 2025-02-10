import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
const font = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
