'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, SortAsc } from 'lucide-react'
import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

export default function SearchPage() {
  const [priceRange, setPriceRange] = useState([0, 100])

  // Sample categories for demonstration
  const categories = [
    "Fiction",
    "Non-Fiction",
    "Science",
    "History",
    "Biography",
    "Self-Help",
    "Children's",
    "Business"
  ]

  // Sample books data
  const books = [
    {
      id: 1,
      title: "The Art of Programming",
      author: "John Smith",
      price: 29.99,
      category: "Technology",
      rating: 4.5,
      stock: "In Stock"
    },
    {
      id: 2,
      title: "Business Leadership",
      author: "Sarah Johnson",
      price: 24.99,
      category: "Business",
      rating: 4.8,
      stock: "Low Stock"
    },
    // Add more sample books...
  ].concat(Array(10).fill(null).map((_, i) => ({
    id: i + 3,
    title: `Sample Book ${i + 1}`,
    author: `Author ${i + 1}`,
    price: 19.99 + i,
    category: categories[i % categories.length],
    rating: 4 + Math.random(),
    stock: i % 3 === 0 ? "In Stock" : i % 3 === 1 ? "Low Stock" : "Pre-order"
  })))

  return (
    
      <main className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Search Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Search Books</h1>
            <p className="text-muted-foreground">Find your next favorite book from our collection</p>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-6">
                {/* Search Bar */}
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search by title, author, or ISBN..." className="pl-9" />
                  </div>
                  <Button>
                    Search
                  </Button>
                </div>

                {/* Filters */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span className="text-sm font-medium">Filters:</span>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category.toLowerCase()}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <div className="flex items-center gap-4">
                      <span className="text-sm">Price Range: ${priceRange[0]} - ${priceRange[1]}</span>
                      <div className="w-[200px]">
                        <Slider
                          defaultValue={[0, 100]}
                          max={100}
                          step={1}
                          value={priceRange}
                          onValueChange={setPriceRange}
                        />
                      </div>
                    </div>

                    <Select defaultValue="relevance">
                      <SelectTrigger className="w-[180px]">
                        <SortAsc className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="newest">Newest Arrivals</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {books.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-[3/4]">
                      <Image
                        src="/placeholder.svg"
                        alt={book.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Button
                        className="absolute bottom-4 left-4 right-4"
                        variant="secondary"
                      >
                        Add to Cart
                      </Button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold line-clamp-1">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-bold">${book.price.toFixed(2)}</span>
                        <span className={`text-xs ${
                          book.stock === "In Stock" ? "text-green-500" :
                          book.stock === "Low Stock" ? "text-orange-500" :
                          "text-blue-500"
                        }`}>
                          {book.stock}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="flex justify-center">
            <Button variant="outline">Load More Books</Button>
          </div>
        </motion.div>
      </main>
  )
}

