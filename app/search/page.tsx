'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, Search, Loader2 } from 'lucide-react'
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import Image from "next/image"

// Simulated book data
const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 19.99,
    cover: "/placeholder.svg",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 15.99,
    cover: "/placeholder.svg",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    price: 12.99,
    cover: "/placeholder.svg",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 9.99,
    cover: "/placeholder.svg",
  },
  // Add more books as needed
]

export default function SearchResults() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">BookHaven</span>
          </Link>
          <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2 mx-4">
            <Input
              type="search"
              placeholder="Search books, authors, or genres..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </form>
          <nav className="flex items-center space-x-4">
            <Link href="/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Sign Up</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-4 py-8">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-[3/4] w-full rounded-lg bg-muted animate-pulse" />
                  <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
                  <div className="flex justify-between items-center">
                    <div className="h-4 w-[60px] bg-muted animate-pulse rounded" />
                    <div className="h-9 w-[100px] bg-muted animate-pulse rounded" />
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-bold mb-8">Search Results</h1>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {books.map((book) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="group relative overflow-hidden rounded-lg bg-background p-4 shadow-lg transition-shadow hover:shadow-xl"
                  >
                    <div className="aspect-[3/4] relative">
                      <Image
                        src={book.cover}
                        alt={book.title}
                        className="rounded object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-4">
                      <h3 className="font-semibold">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-bold">${book.price.toFixed(2)}</span>
                        <Button size="sm">Add to Cart</Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

