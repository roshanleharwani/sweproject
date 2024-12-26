'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, CreditCard, Truck } from 'lucide-react'

import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"

export default function CartPage() {
  const [step, setStep] = useState<'cart' | 'checkout'>('cart')
  
  // Sample cart items
  const cartItems = [
    {
      id: 1,
      title: "The Art of Programming",
      author: "John Smith",
      price: 29.99,
      quantity: 1,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Business Leadership",
      author: "Sarah Johnson",
      price: 24.99,
      quantity: 2,
      image: "/placeholder.svg"
    }
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = 4.99
  const total = subtotal + shipping

  return (

      
      <main className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold">
              {step === 'cart' ? 'Shopping Cart' : 'Checkout'}
            </h1>
            <p className="text-muted-foreground">
              {step === 'cart' 
                ? `${cartItems.length} items in your cart`
                : 'Complete your purchase'
              }
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {step === 'cart' ? (
                // Cart Items
                <Card>
                  <CardHeader>
                    <CardTitle>Cart Items</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="flex gap-4">
                          <div className="relative h-24 w-16">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="rounded object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col justify-between">
                            <div>
                              <h3 className="font-semibold">{item.title}</h3>
                              <p className="text-sm text-muted-foreground">{item.author}</p>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Button variant="outline" size="icon">
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span>{item.quantity}</span>
                                <Button variant="outline" size="icon">
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                              <Button variant="ghost" size="icon" className="text-red-500">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        {index < cartItems.length - 1 && <Separator className="my-4" />}
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              ) : (
                // Checkout Form
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Street address</Label>
                      <Input id="address" placeholder="123 Main St" />
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="City" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ny">New York</SelectItem>
                            <SelectItem value="ca">California</SelectItem>
                            {/* Add more states */}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP code</Label>
                        <Input id="zip" placeholder="12345" />
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-4">
                      <h3 className="font-semibold">Payment Method</h3>
                      <RadioGroup defaultValue="card">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            Credit Card
                          </Label>
                        </div>
                      </RadioGroup>
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card number</Label>
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid gap-4 md:grid-cols-3">
                          <div className="space-y-2">
                            <Label htmlFor="expMonth">Expiration Month</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Month" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 12 }, (_, i) => (
                                  <SelectItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                    {String(i + 1).padStart(2, '0')}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="expYear">Expiration Year</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Year" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 10 }, (_, i) => (
                                  <SelectItem key={i} value={String(new Date().getFullYear() + i)}>
                                    {new Date().getFullYear() + i}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      Shipping
                    </span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  {step === 'cart' ? (
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => setStep('checkout')}
                    >
                      Proceed to Checkout
                    </Button>
                  ) : (
                    <div className="space-y-2 w-full">
                      <Button className="w-full" size="lg">
                        Place Order
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setStep('cart')}
                      >
                        Back to Cart
                      </Button>
                    </div>
                  )}
                </CardFooter>
              </Card>
            </div>
          </div>
        </motion.div>
      </main>
  )
}

