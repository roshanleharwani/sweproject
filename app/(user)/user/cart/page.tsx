/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, CreditCard, Truck, Banknote } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
const indianStates = [
  ["ap", "Andhra Pradesh"],
  ["ar", "Arunachal Pradesh"],
  ["as", "Assam"],
  ["br", "Bihar"],
  ["cg", "Chhattisgarh"],
  ["ga", "Goa"],
  ["gj", "Gujarat"],
  ["hr", "Haryana"],
  ["hp", "Himachal Pradesh"],
  ["jh", "Jharkhand"],
  ["ka", "Karnataka"],
  ["kl", "Kerala"],
  ["mp", "Madhya Pradesh"],
  ["mh", "Maharashtra"],
  ["mn", "Manipur"],
  ["ml", "Meghalaya"],
  ["mz", "Mizoram"],
  ["nl", "Nagaland"],
  ["od", "Odisha"],
  ["pb", "Punjab"],
  ["rj", "Rajasthan"],
  ["sk", "Sikkim"],
  ["tn", "Tamil Nadu"],
  ["tg", "Telangana"],
  ["tr", "Tripura"],
  ["up", "Uttar Pradesh"],
  ["uk", "Uttarakhand"],
  ["wb", "West Bengal"],
  ["an", "Andaman and Nicobar Islands"],
  ["ch", "Chandigarh"],
  ["dn", "Dadra and Nagar Haveli and Daman and Diu"],
  ["dl", "Delhi"],
  ["jk", "Jammu and Kashmir"],
  ["la", "Ladakh"],
  ["ld", "Lakshadweep"],
  ["py", "Puducherry"],
];

export default function CartPage() {
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const router = useRouter();
  interface CartItem {
    _id: string;
    bookId: string;
    title: string;
    author: string;
    price: number;
    qty: number;
  }
  const [payment, setPayment] = useState("card");
  const [items, setItems] = useState<CartItem[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("Select State");
  const [zip, setZip] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await fetch("/api/cart/");
        if (res.ok) {
          const data = await res.json();
          setItems(data);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, []);

  const updateItemQuantity = async (itemId: string, newQty: number) => {
    if (newQty < 1) return;
    try {
      const res = await fetch(`/api/cart/${itemId}`, {
        method: "PATCH",
        body: JSON.stringify({ qty: newQty }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        toast.success("Quantity updated");
        setItems(
          items.map((item) =>
            item._id === itemId ? { ...item, qty: newQty } : item
          )
        );
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const res = await fetch(`/api/cart/${itemId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Item deleted successfully");
        setItems(items.filter((item) => item._id !== itemId));
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = items.length > 0 ? 4.99 : 0;
  const total = subtotal + shipping;
  const State = state.toUpperCase();
  const handlePlaceOrder = async () => {
    const orderData = {
      items: items.map((item) => ({
        _id: item._id,
        bookId: item.bookId,
        title: item.title,
        author: item.author,
        price: item.price,
        quantity: item.qty, // Add quantity field
      })),
      address: {
        name: `${firstName} ${lastName}`,
        address,
        city,
        state: State,
        zip,
      },
      orderId: `12345`,
      date: new Date().toLocaleDateString("en-GB"),
      total: total,
      payment: payment,
      status: "Processing",
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify(orderData),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        // Handle successful order placement
        toast.success("Order Placed successfully");
        await fetch("/api/cart", {
          method: "DELETE",
        });

        router.push("/user/order-success");
      } else {
        // Handle errors
        console.error("Error placing order:", await res.json());
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

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
            {step === "cart" ? "Shopping Cart" : "Checkout"}
          </h1>
          <p className="text-muted-foreground">
            {step === "cart"
              ? `${items.length} items in your cart`
              : "Complete your purchase"}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {step === "cart" ? (
              // Cart Items
              <Card>
                <CardHeader>
                  <CardTitle>Cart Items</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex gap-4">
                        <div className="relative h-24 w-16">
                          <Image
                            src={`https://pub-7cf6be04756e4997be8420c6b6cdcacc.r2.dev/${item.bookId}.png`}
                            alt={item.title}
                            fill
                            className="rounded object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {item.author}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  updateItemQuantity(item._id, item.qty - 1)
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span>{item.qty}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  updateItemQuantity(item._id, item.qty + 1)
                                }
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="font-semibold">
                              ${(item.price * item.qty).toFixed(2)}
                            </p>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500"
                              onClick={() => removeItem(item._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      {index < items.length - 1 && (
                        <Separator className="my-4" />
                      )}
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
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Street address</Label>
                    <Input
                      id="address"
                      placeholder="123 Main St"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Select onValueChange={(value) => setState(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {indianStates.map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP code</Label>
                      <Input
                        id="zip"
                        placeholder="12345"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                      />
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="font-semibold">Payment Method</h3>
                    <RadioGroup value={payment} onValueChange={setPayment}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="card" id="card" />
                        <Label
                          htmlFor="card"
                          className="flex items-center gap-2"
                        >
                          <CreditCard className="h-4 w-4" />
                          Credit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label
                          htmlFor="cash"
                          className="flex items-center gap-2"
                        >
                          <Banknote className="h-4 w-4" />
                          Cash On Delivery
                        </Label>
                      </div>
                    </RadioGroup>
                    {payment === "card" && (
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card number</Label>
                          <Input
                            id="cardNumber"
                            type="number"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-4 md:grid-cols-3">
                          <div className="space-y-2">
                            <Label htmlFor="expMonth">Expiration Month</Label>
                            <Select
                              onValueChange={(value) => setExpMonth(value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Month" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 12 }, (_, i) => (
                                  <SelectItem
                                    key={i + 1}
                                    value={String(i + 1).padStart(2, "0")}
                                  >
                                    {String(i + 1).padStart(2, "0")}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="expYear">Expiration Year</Label>
                            <Select
                              onValueChange={(value) => setExpYear(value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Year" />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 10 }, (_, i) => (
                                  <SelectItem
                                    key={i}
                                    value={String(new Date().getFullYear() + i)}
                                  >
                                    {new Date().getFullYear() + i}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input
                              id="cvv"
                              type="number"
                              placeholder="123"
                              min={100}
                              max={999}
                              onChange={(e) => setCvv(e.target.value)}
                              value={cvv}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          {items.length > 0 ? (
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
                  {step === "cart" ? (
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={() => setStep("checkout")}
                    >
                      Proceed to Checkout
                    </Button>
                  ) : (
                    <div className="space-y-2 w-full">
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handlePlaceOrder}
                      >
                        Place Order
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setStep("cart")}
                      >
                        Back to Cart
                      </Button>
                    </div>
                  )}
                </CardFooter>
              </Card>
            </div>
          ) : null}
        </div>
      </motion.div>
    </main>
  );
}
