'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Package, Heart, TrendingUp, MapPin, Clock, BadgeCheck } from 'lucide-react'
import Image from "next/image"
import { motion } from "framer-motion"

export default function Dashboard() {
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
          {[
            { title: "Total Orders", value: "8", icon: ShoppingCart, color: "text-blue-500" },
            { title: "In Transit", value: "2", icon: Package, color: "text-orange-500" },
            { title: "Wishlist Items", value: "15", icon: Heart, color: "text-red-500" },
            { title: "Savings", value: "$45.99", icon: TrendingUp, color: "text-green-500" },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="flex items-center p-6">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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
                  {[
                    { title: "The Great Adventure", price: "$19.99", stock: "In Stock" },
                    { title: "Mystery Manor", price: "$24.99", stock: "Low Stock" },
                    { title: "Business Success", price: "$29.99", stock: "In Stock" },
                    { title: "Cooking Mastery", price: "$34.99", stock: "Pre-order" },
                  ].map((book, index) => (
                    <div key={index} className="space-y-2">
                      <div className="relative aspect-[3/4]">
                        <Image
                          src="/placeholder.svg"
                          alt={book.title}
                          fill
                          className="rounded object-cover"
                        />
                      </div>
                      <h4 className="font-semibold text-sm">{book.title}</h4>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-bold">{book.price}</span>
                        <span className={`text-xs ${
                          book.stock === "In Stock" ? "text-green-500" :
                          book.stock === "Low Stock" ? "text-orange-500" :
                          "text-blue-500"
                        }`}>
                          {book.stock}
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

