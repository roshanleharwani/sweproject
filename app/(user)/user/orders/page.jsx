/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { Search, Filter, Download, MapPin, CreditCard } from 'lucide-react'
import Image from "next/image"
import { motion } from "framer-motion"
import { useState ,useEffect} from "react"

export default function Orders() {
  const [selectedOrder, setSelectedOrder] = useState(null); // Initialize with null

  const [userOrders,setUserOrders] = useState([]);
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setUserOrders(data);
    }
    fetcher();
  }, []); // Add an empty dependency array to avoid infinite loop
  const totalOrders = userOrders.length;
  const deliveredOrders = userOrders.filter(order => order.status === 'Delivered').length;
  const inTransitOrders = userOrders.filter(order => order.status === 'In Transit').length;
  const processingOrders = userOrders.filter(order => order.status === 'Processing').length;

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
              { label: "Total Orders", value: totalOrders, color: "bg-blue-500" },
              { label: "Delivered", value: deliveredOrders, color: "bg-green-500" },
              { label: "In Transit", value: inTransitOrders, color: "bg-orange-500" },
              { label: "Processing", value: processingOrders, color: "bg-purple-500" },
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
                  {userOrders.length > 0 && userOrders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium">{order._id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="relative h-8 w-6">
                                <Image
                                  src={`/BookCovers/${item.bookId}.png`}
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
                      <TableCell>$ {order.total}</TableCell>
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
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                        >
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

        {/* Order Details Dialog */}
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}  >
          <DialogContent className="max-w-[80vw] ">
            <DialogHeader>
              <DialogTitle>Order Details - {selectedOrder?._id}</DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-6 flex justify-center items-center gap-5"> 
                {/* Order Status */}
                <div className="flex flex-col items-center justify-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    Ordered on {selectedOrder.date}
                  </span>
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    selectedOrder.status === "Delivered" ? "bg-green-100 text-green-700" :
                    selectedOrder.status === "In Transit" ? "bg-orange-100 text-orange-700" :
                    "bg-purple-100 text-purple-700"
                  }`}>
                    {selectedOrder.status}
                  </span>
                </div>

                {/* Order Items */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="relative h-16 w-12">
                              <Image
                                src={`/BookCovers/${item.bookId}.png`}
                                alt={item.title}
                                fill
                                className="rounded object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{item.title}</p>
                              <p className="text-sm text-muted-foreground">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                          </div>
                          <p className="font-medium">{item.price}</p>
                        </div>
                      ))}
                      <div className="flex justify-between border-t pt-4">
                        <p className="font-medium">Total</p>
                        <p className="font-medium">$ {selectedOrder.total}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Address */}
                <Card>
                  <CardHeader className="flex flex-row items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <CardTitle className="text-sm">Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium">{selectedOrder.address.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedOrder.address.address}
                      <br />
                      {selectedOrder.address.city}, {selectedOrder.address.state.upperCase} {selectedOrder.address.zip}
                      <br />
                      India
                    </p>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader className="flex flex-row items-center space-x-2 gap-5">
                    <CreditCard className="h-4 w-4" />
                    <CardTitle className="text-sm">Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium">{selectedOrder.payment}</p>
                    
                  </CardContent>
                </Card>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </motion.div>
    </main>
  )
}

