'use client'

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from 'lucide-react'
import Link from "next/link"
import { useState } from "react"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col space-y-4">
          <Link
            href="/user/home"
            className="text-sm font-medium hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/user/orders"
            className="text-sm font-medium hover:text-primary"
            onClick={() => setOpen(false)}
          >
            My Orders
          </Link>
          <Link
            href="/user/search"
            className="text-sm font-medium hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Search Books
          </Link>
          <Link
            href="/user/wishlists"
            className="text-sm font-medium hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Wishlists
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

