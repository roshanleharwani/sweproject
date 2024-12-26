'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShoppingCart, BookOpen, LogOut, User, Settings} from 'lucide-react'
import {MobileNav} from "@/components/ui/mobile-nav"
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
  const router = useRouter();
    const handleLogout = async (e:{ preventDefault: () => void }) => {
      e.preventDefault();
      try{
        const res = await fetch('/api/signout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        if(res.ok){
          alert("User logged out successfully");
          router.push('/sign-in');
        }else{
          const errorData = await res.json();
          alert(errorData.message || "Error logging out user");
        }
      }catch(err){
        console.error(err)
        alert("An error occurred while logging out");
      }
    };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased m-4`}
      >
        <div className="min-h-screen bg-background">

        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <MobileNav />
          <Link href="/user/home" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">BookHaven</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/user/home" className="text-sm font-medium text-primary">
            Home
          </Link>
          <Link href="/user/orders" className="text-sm font-medium hover:text-primary">
            My Orders
          </Link>
          <Link href="/user/search" className="text-sm font-medium hover:text-primary">
            Search Books
          </Link>
          <Link href="/user/wishlists" className="text-sm font-medium hover:text-primary">
            Wishlists
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative h-8 w-8 rounded-full bg-primary"
              >
                <span className="sr-only">Open user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    john@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
        {children}
        </div>
      </body>
    </html>
  );
}
