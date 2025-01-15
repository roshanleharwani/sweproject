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
import { RangeSlider } from "@/components/ui/slider"
import { Search, Filter, SortAsc } from 'lucide-react'
import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import stringSimilarity from 'string-similarity'

export default function SearchPage() {
  const [priceRange, setPriceRange] = useState([0, 100])
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [order, setOrder] = useState('relevance')
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState("")

  const sortBooks = (booksToSort, sortOrder) => {
    const sorted = [...booksToSort];
    switch (sortOrder) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      default:
        return sorted;
    }
  };

  const router = useRouter();

  useEffect(() => {
    async function fetchBooks() {
      const response = await fetch('/api/books/fetchbooks/')
      const data = await response.json()
      setBooks(data)
      setFilteredBooks(data)
    }
    fetchBooks()
  }, [])

  // New search and filter effect
  useEffect(() => {
    let filtered = [...books];
    
    // Apply search term filter with string similarity
    if (searchTerm.trim()) {
      filtered = filtered.filter(book => {
        const searchTermLower = searchTerm.toLowerCase();
        const titleSimilarity = stringSimilarity.compareTwoStrings(
          book.title.toLowerCase(),
          searchTermLower
        );
        const authorSimilarity = stringSimilarity.compareTwoStrings(
          book.author.toLowerCase(),
          searchTermLower
        );
        // Consider a match if similarity is greater than 0.3 (30% similar)
        return titleSimilarity > 0.3 || authorSimilarity > 0.3 || 
               book.title.toLowerCase().includes(searchTermLower) ||
               book.author.toLowerCase().includes(searchTermLower);
      });
    }
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(book => 
        book.category.toLowerCase() === selectedCategory
      );
    }
    
    // Apply price range filter
    filtered = filtered.filter(book => 
      book.price >= priceRange[0] && book.price <= priceRange[1]
    );
    
    // Apply sorting
    filtered = sortBooks(filtered, order);
    
    setFilteredBooks(filtered);
  }, [searchTerm, selectedCategory, books, priceRange, order]);

  const redirect = (bookId) => {
    router.push(`/books/${bookId}`);
  };

  const handleCart = async (book, e) => {
    e.stopPropagation(); // Prevent redirect when clicking Add to Cart
    if (isAddingToCart) return;

    try {
      setIsAddingToCart(true);
      const response = await fetch('/api/cart/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          bookId: book._id,
          title: book.title, 
          author: book.author, 
          price: book.price, 
          qty: 1,
        }),
      });

      if (response.ok) {
        router.push('/user/cart');
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Error adding item to cart");
      }
    } catch (err) {
      console.error("An error occurred while adding item to cart", err);
      alert("An error occurred while adding item to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

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
                  <Input 
                    placeholder="Search by title or author..." 
                    className="pl-9" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="text-sm font-medium">Filters:</span>
                </div>
                <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
                  <Select defaultValue="all" onValueChange={setSelectedCategory}>
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
                      <RangeSlider
                        defaultValue={[0, 100]}
                        max={100}
                        step={1}
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                    </div>
                  </div>

                  <Select defaultValue="relevance" onValueChange={setOrder}>
                    <SelectTrigger className="w-[180px]">
                      <SortAsc className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredBooks.map((book, index) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => redirect(book._id)} 
            >
              <Card className="group overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={`/BookCovers/${book._id}.png`}
                      alt={book.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Button
                      className="absolute bottom-4 left-4 right-4"
                      variant="secondary"
                      onClick={(e) => handleCart(book, e)}
                      disabled={isAddingToCart || book.qty === 0}
                    >
                      {book.qty === 0 ? "Out of Stock" : isAddingToCart ? "Adding..." : "Add to Cart"}
                    </Button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold line-clamp-1">{book.title}</h3>
                    <p className="text-sm text-muted-foreground">{book.author}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="font-bold">${book.price.toFixed(2)}</span>
                      {
                        book.qty === 0 ? (
                          <span className="text-xs text-red-500">Out of Stock</span>
                        ) : book.qty < 10 ? (
                          <span className="text-xs text-yellow-500">{book.qty} Remaining </span>
                        ) : (
                          <span className="text-xs text-green-500">In Stock</span>
                        )
                      }
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </main>
  )
}

