/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShoppingCart, BookOpen, LogOut, User} from 'lucide-react'
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

import { useEffect, useState } from "react"
  
  
function Header() {
    const router = useRouter();
    const handleLogout = async (e:{ preventDefault: () => void }) => {
      e.preventDefault();
      try{
        const res = await fetch('/api/signout/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        });
        if(res.ok){
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

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");

    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const res = await fetch('/api/payload/');
          if (res.ok) {
            const user = await res.json();
            const name = user.firstName + " " + user.lastName;
            const email = user.email;
            setName(name);
            setEmail(email);
          } else {
            console.error("Failed to fetch user data");
          }
        } catch (err) {
          console.error("An error occurred while fetching user data", err);
        }
      };
    
      fetchUserData();
    }, []);
    const [items,setItems] = useState()
    useEffect(() => {
      const fetcher = async ()=>{
        try{
          const res = await fetch('/api/cart/');
          if(res.ok){
            const cart = await res.json();
            setItems(cart.length)
          }
        }
        catch(error){
          console.error(error);
        }
      }
      fetcher();
    },[])

    return (
    <>
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
          <Link href="/user/home" className="text-sm font-medium text-primary hover:bg-gray-200 p-2 rounded-2xl duration-300 ">
            Home
          </Link>
          <Link href="/user/orders" className="text-sm font-medium hover:text-primary hover:bg-gray-200 p-2 rounded-2xl duration-300 ">
            My Orders
          </Link>
          <Link href="/user/search" className="text-sm font-medium hover:text-primary hover:bg-gray-200 p-2 rounded-2xl duration-300 ">
            Search Books
          </Link>
          <Link href="/user/wishlists" className="text-sm font-medium hover:text-primary hover:bg-gray-200 p-2 rounded-2xl duration-300 ">
            Wishlists
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link href={`/user/cart`}>
            <Button variant="ghost" size="icon" className="relative   rounded-xl outline-none  ">
              <ShoppingCart size="lg" className="size-10 hover:bg-gray-200" />
              {items ? <div className="absolute size-4 bg-red-500 top-0 right-0 rounded-full text-xs text-white ">{items}</div> : null}
            </Button>
          </Link>
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
                  <p className="text-sm font-medium leading-none">{name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href="/user/profile" >
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                </Link>
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
        
    </>
    )
  }
  
  export default Header
