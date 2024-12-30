'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Package, Heart, TrendingUp, MapPin, Clock, BadgeCheck } from 'lucide-react'
import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect,useState } from "react"
export default function Dashboard() {

  const sampleBooks = [
    { title: "The Great Adventure", price: "$19.99", qty: 5 ,_id:""},
    { title: "Mystery Manor", price: "$24.99", qty: 12 ,_id:""},
    { title: "Business Success", price: "$29.99", qty: 10 ,_id:""},
    { title: "Cooking Mastery", price: "$34.99", qty: 20 ,_id:""},
  ]
  const [totalOrders, setTotalOrders] = useState(0);
  const [transitOrder, setTransitOrder] = useState(0);
  const [books, setBooks] = useState(sampleBooks)

  useEffect(() => {
    const fetcher = async () => {
      try {
        const response = await fetch('/api/orders');
        
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        
        // Ensure the data is an array before using length or filter
        if (Array.isArray(data)) {
          setTotalOrders(data.length);
          setTransitOrder(data.filter((order) => order.status === 'In Transit').length);
        } else {
          console.error("Invalid data format: data is not an array");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetcher();
  }, []);

 

  useEffect(() => {
    const fetcher = async () => {
      try{
        const response = await fetch('/api/books/random');
        if (!response.ok) {
          console.error("Error fetching random books")
        }
        const data = await response.json();
        setBooks(data)
      }catch (error) {
        console.error("Error fetching random books:", error);
      }
    }
    fetcher();
  },[])
  
  return (


      <main className="container py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Welcome back, Book Lover!</h1>
          <p className="text-muted-foreground">Track your orders and discover new books</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            >
            <Card>
              <CardContent className="flex items-center p-6">
              <ShoppingCart className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <h3 className="text-2xl font-bold">{totalOrders}</h3>
              </div>
              </CardContent>
            </Card>
            </motion.div>

            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            >
            <Card>
              <CardContent className="flex items-center p-6">
              <Package className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">In Transit</p>
                <h3 className="text-2xl font-bold">{transitOrder}</h3>
              </div>
              </CardContent>
            </Card>
            </motion.div>

            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            >
            <Card>
              <CardContent className="flex items-center p-6">
              <Heart className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Wishlist Items</p>
                <h3 className="text-2xl font-bold">0</h3>
              </div>
              </CardContent>
            </Card>
            </motion.div>

            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            >
            <Card>
              <CardContent className="flex items-center p-6">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Savings</p>
                <h3 className="text-2xl font-bold">$ 0</h3>
              </div>
              </CardContent>
            </Card>
            </motion.div>
        </div>

        {/* Recent Orders and Recommendations */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { status: "Delivered", date: "Dec 24, 2023", items: 2 },
                    { status: "In Transit", date: "Dec 22, 2023", items: 1 },
                    { status: "Processing", date: "Dec 20, 2023", items: 3 },
                  ].map((order, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 rounded-lg border">
                      <div className="relative h-16 w-12">
                        <Image
                          src="/placeholder.svg"
                          alt={`Order ${index + 1}`}
                          fill
                          className="rounded object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">Order #{2023100 + index}</h4>
                          <span className={`text-sm ${
                            order.status === "Delivered" ? "text-green-500" :
                            order.status === "In Transit" ? "text-orange-500" :
                            "text-blue-500"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{order.items} items</p>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recommended for You</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {books.map((book, index) => (
                    <div key={index} className="space-y-2">
                      <div className="relative aspect-[3/4]">
                        <Image
                          src={`/BookCovers/${book._id}.png` || '/placeholder.svg'}
                          alt={book.title}
                          fill
                          className="rounded object-cover"
                        />
                      </div>
                      <h4 className="font-semibold text-sm">{book.title}</h4>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-bold">{book.price}</span>
                        <span className={`text-xs ${
                          book.qty > 10 ? "text-green-500" :
                          book.qty <= 10 ? "text-orange-500" :
                          "text-blue-500"
                        }`}>
                          {book.qty > 10 ? "In-Stock":`${book.qty} remaining`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Order Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { icon: BadgeCheck, text: "Order #2023100 has been delivered", time: "2 hours ago" },
                  { icon: Package, text: "Order #2023101 is out for delivery", time: "Yesterday" },
                  { icon: MapPin, text: "Order #2023102 has reached local facility", time: "2 days ago" },
                  { icon: Clock, text: "Order #2023103 is being processed", time: "3 days ago" },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <activity.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.text}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>

  )
}

