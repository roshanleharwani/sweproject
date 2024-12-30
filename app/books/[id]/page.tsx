/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Header from '@/components/ui/header'
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {  Heart, ShoppingCart, Star, ChevronRight } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {useRouter} from "next/navigation"
// This would come from your API/database
const bookData = {
  id: "1",
  title: "",
  author: "",
  price: 0,
  rating: 0.0,
  reviews: 128,
  description: `
    The Great Gatsby, F. Scott Fitzgerald's third book, stands as the supreme achievement of his career. This exemplary novel of the Jazz Age has been acclaimed by generations of readers. The story is of the fabulously wealthy Jay Gatsby and his new love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted "gin was the national drink and sex the national obsession," it is an exquisitely crafted tale of America in the 1920s.
  `,
  details: {
    publisher: "Scribner",
    language: "English",
    paperback: "180 pages",
    isbn: "978-0743273565",
    dimensions: "5.31 x 0.5 x 8.25 inches",
  },
  images: [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ],
  
}

export default function BookDetail() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState("1")
  
  const router = useRouter();
  const [book, setBook] = useState(bookData)
  const id = window.location.pathname.split('/').pop();
  useEffect(() => {
    async function fetchBook() {
      const id = window.location.pathname.split('/').pop();
      const response = await fetch(`/api/books/fetchOne?id=${id}`);
      const data = await response.json();
      setBook(data);
    }
    fetchBook();
  }, [])

  const handleCart = async () => {
    try {
      const response = await fetch('/api/cart/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: book.title, 
          author: book.author, 
          price: book.price, 
          qty: parseInt(quantity), 
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
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/user/search" className="hover:text-foreground">
            Books
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{book.title}</span>
        </nav>

        {/* Product Section */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div 
              className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={book.images ? book.images[selectedImage] : `/BookCovers/${id}.png`}
                    alt={book.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 flex justify-center space-x-2 p-4">
                {bookData.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      index === selectedImage ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
            <div className="flex space-x-4 overflow-auto pb-2">
              {book.images ? book.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-[3/4] w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                    index === selectedImage ? "border-primary" : "border-transparent"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${book.title} - View ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              )) : null}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{book.title}</h1>
              <p className="text-lg text-muted-foreground">by {book.author}</p>
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(book.rating)
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({bookData.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-3xl font-bold">${book.price}</p>
              <div className="flex space-x-4">
                <Select value={quantity} onValueChange={setQuantity}>
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Quantity" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleCart} className="flex-1">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Tabs defaultValue="description">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Product Details</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="space-y-4">
                <p className="text-muted-foreground">{bookData.description}</p>
              </TabsContent>
              <TabsContent value="details">
                <dl className="space-y-4">
                  {Object.entries(bookData.details).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b pb-2">
                      <dt className="font-medium capitalize">{key}</dt>
                      <dd className="text-muted-foreground">{value}</dd>
                    </div>
                  ))}
                </dl>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        
      </main>
    </div>
  )
}

