'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {  Search, Filter, Download } from 'lucide-react'
import Image from "next/image"
import { motion } from "framer-motion"

export default function Orders() {
  const orders = [
    {
      id: "ORD-2023-001",
      date: "Dec 24, 2023",
      total: "$59.98",
      status: "Delivered",
      items: [
        { title: "The Great Adventure", quantity: 1, price: "$29.99" },
        { title: "Mystery Manor", quantity: 1, price: "$29.99" }
      ]
    },
    {
      id: "ORD-2023-002",
      date: "Dec 22, 2023",
      total: "$34.99",
      status: "In Transit",
      items: [
        { title: "Business Success", quantity: 1, price: "$34.99" }
      ]
    },
    {
      id: "ORD-2023-003",
      date: "Dec 20, 2023",
      total: "$89.97",
      status: "Processing",
      items: [
        { title: "Cooking Mastery", quantity: 2, price: "$69.98" },
        { title: "Garden Guide", quantity: 1, price: "$19.99" }
      ]
    },
    {
      id: "ORD-2023-004",
      date: "Dec 18, 2023",
      total: "$49.99",
      status: "Delivered",
      items: [
        { title: "History Chronicles", quantity: 1, price: "$49.99" }
      ]
    }
  ]

  return (
          <main className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col gap-8">
            {/* Page Title */}
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold">My Orders</h1>
              <p className="text-muted-foreground">Track and manage your book orders</p>
            </div>

            {/* Order Summary Cards */}
            <div className="grid gap-4 md:grid-cols-4">
              {[
                { label: "Total Orders", value: "4", color: "bg-blue-500" },
                { label: "Delivered", value: "2", color: "bg-green-500" },
                { label: "In Transit", value: "1", color: "bg-orange-500" },
                { label: "Processing", value: "1", color: "bg-purple-500" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <div className={`h-2 w-2 rounded-full ${stat.color}`} />
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                          <p className="text-2xl font-bold">{stat.value}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Filters and Search */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-1 gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search orders..."
                        className="pl-9"
                      />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Orders</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="transit">In Transit</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" className="ml-auto">
                    <Download className="mr-2 h-4 w-4" />
                    Export Orders
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Orders Table */}
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="relative h-8 w-6">
                                  <Image
                                    src="/placeholder.svg"
                                    alt={item.title}
                                    fill
                                    className="rounded object-cover"
                                  />
                                </div>
                                <span className="text-sm">
                                  {item.title} x{item.quantity}
                                </span>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.total}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                            order.status === "Delivered" ? "bg-green-100 text-green-700" :
                            order.status === "In Transit" ? "bg-orange-100 text-orange-700" :
                            "bg-purple-100 text-purple-700"
                          }`}>
                            {order.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </main>
  )
}

