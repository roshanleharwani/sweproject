'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {  ShoppingCart, Heart, Trash2, MoveRight } from 'lucide-react'
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function WishlistPage() {
  // Sample wishlist data
  const wishlistItems = []
    // {
    //   id: 1,
    //   title: "The Art of Programming",
    //   author: "John Smith",
    //   price: 29.99,
    //   originalPrice: 34.99,
    //   stock: "In Stock",
    //   dateAdded: "Dec 20, 2023",
    //   image: "/placeholder.svg"
    // },
    // {
    //   id: 2,
    //   title: "Business Leadership",
    //   author: "Sarah Johnson",
    //   price: 24.99,
    //   originalPrice: 29.99,
    //   stock: "Low Stock",
    //   dateAdded: "Dec 21, 2023",
    //   image: "/placeholder.svg"
    // },
    // {
    //   id: 3,
    //   title: "The Great Adventure",
    //   author: "Michael Brown",
    //   price: 19.99,
    //   originalPrice: 19.99,
    //   stock: "In Stock",
    //   dateAdded: "Dec 22, 2023",
    //   image: "/placeholder.svg"
    // },
    // {
    //   id: 4,
    //   title: "Mystery Manor",
    //   author: "Emily Wilson",
    //   price: 22.99,
    //   originalPrice: 27.99,
    //   stock: "Out of Stock",
    //   dateAdded: "Dec 23, 2023",
    //   image: "/placeholder.svg"
    // }
  

  return (
    

      <main className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Wishlist Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold">My Wishlist</h1>
              <p className="text-muted-foreground">
                {wishlistItems.length} items in your wishlist
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Date Added</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="hidden sm:flex">
                Move All to Cart
                <MoveRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Wishlist Items */}
          <div className="space-y-4">
            {wishlistItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      {/* Checkbox and Image */}
                      <div className="flex items-center gap-4">
                        <Checkbox id={`select-${item.id}`} />
                        <div className="relative h-24 w-20">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="rounded-md object-cover"
                          />
                        </div>
                      </div>

                      {/* Book Details */}
                      <div className="flex flex-1 flex-col gap-1">
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">by {item.author}</p>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">${item.price}</span>
                          {item.originalPrice > item.price && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${item.originalPrice}
                            </span>
                          )}
                        </div>
                        <p className={`text-sm ${
                          item.stock === "In Stock" ? "text-green-500" :
                          item.stock === "Low Stock" ? "text-orange-500" :
                          "text-red-500"
                        }`}>
                          {item.stock}
                        </p>
                      </div>

                      {/* Date Added */}
                      <div className="hidden text-sm text-muted-foreground sm:block">
                        Added {item.dateAdded}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Add to Cart
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {wishlistItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 py-12"
            >
              <Heart className="h-12 w-12 text-muted-foreground" />
              <h2 className="text-xl font-semibold">Your wishlist is empty</h2>
              <p className="text-muted-foreground">
                {"Start adding books you'd like to purchase in the future"}
              </p>
              <Button asChild>
                <Link href="/user/search">Browse Books</Link>
              </Button>
            </motion.div>
          )}

          {/* Bottom Actions */}
          {wishlistItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-between rounded-lg bg-muted p-4"
            >
              <div className="flex items-center gap-4">
                <Checkbox id="select-all" />
                <label htmlFor="select-all" className="text-sm font-medium">
                  Select All Items
                </label>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  Remove Selected
                </Button>
                <Button size="sm">
                  Move Selected to Cart
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>
  )
}

