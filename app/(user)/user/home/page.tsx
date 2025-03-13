"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShoppingCart,
  Package,
  Heart,
  TrendingUp,
  MapPin,
  Clock,
  BadgeCheck,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const sampleBooks = [
    { title: "The Great Adventure", price: "$19.99", qty: 5, _id: "sample1" },
    { title: "Mystery Manor", price: "$24.99", qty: 12, _id: "sample2" },
    { title: "Business Success", price: "$29.99", qty: 10, _id: "sample3" },
    { title: "Cooking Mastery", price: "$34.99", qty: 20, _id: "sample4" },
  ];
  const [totalOrders, setTotalOrders] = useState(0);
  const [transitOrder, setTransitOrder] = useState(0);
  const [books, setBooks] = useState(sampleBooks);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const response = await fetch("/api/orders");

        if (!response.ok) {
          throw new Error(`Failed to fetch orders: ${response.status}`);
        }

        const data = await response.json();

        // Ensure the data is an array before using length or filter
        if (Array.isArray(data)) {
          setTotalOrders(data.length);
          setTransitOrder(
            data.filter((order) => order.status === "In Transit").length
          );
        } else {
          console.error("Invalid data format: data is not an array", data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
      }
    };

    fetcher();
  }, []);

  useEffect(() => {
    const fetcher = async () => {
      try {
        const response = await fetch("/api/books/random");
        if (!response.ok) {
          throw new Error(`Error fetching random books: ${response.status}`);
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setBooks(data);
        } else {
          console.error("Invalid books data format or empty array", data);
          // Keep using sample books if the API returns invalid data
        }
      } catch (error) {
        console.error("Error fetching random books:", error);
        // Keep using sample books if there's an error
      }
    };
    fetcher();
  }, []);

  // Sample recent orders for UI
  const recentOrders = [
    { status: "Delivered", date: "Dec 24, 2023", items: 2, id: 2023100 },
    { status: "In Transit", date: "Dec 22, 2023", items: 1, id: 2023101 },
    { status: "Processing", date: "Dec 20, 2023", items: 3, id: 2023102 },
  ];

  // Sample order updates for UI
  const orderUpdates = [
    {
      icon: BadgeCheck,
      text: "Order #2023100 has been delivered",
      time: "2 hours ago",
    },
    {
      icon: Package,
      text: "Order #2023101 is out for delivery",
      time: "Yesterday",
    },
    {
      icon: MapPin,
      text: "Order #2023102 has reached local facility",
      time: "2 days ago",
    },
    {
      icon: Clock,
      text: "Order #2023103 is being processed",
      time: "3 days ago",
    },
  ];

  return (
    <main className="container py-8">
      {/* Welcome Section */}
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Book Lover!</h1>
        <p className="text-muted-foreground">
          Track your orders and discover new books
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="animate-fadeIn">
          <Card>
            <CardContent className="flex items-center p-6">
              <ShoppingCart className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Orders
                </p>
                <h3 className="text-2xl font-bold">{totalOrders}</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="animate-fadeIn animation-delay-100">
          <Card>
            <CardContent className="flex items-center p-6">
              <Package className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  In Transit
                </p>
                <h3 className="text-2xl font-bold">{transitOrder}</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="animate-fadeIn animation-delay-200">
          <Card>
            <CardContent className="flex items-center p-6">
              <Heart className="h-8 w-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Wishlist Items
                </p>
                <h3 className="text-2xl font-bold">0</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="animate-fadeIn animation-delay-300">
          <Card>
            <CardContent className="flex items-center p-6">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Savings
                </p>
                <h3 className="text-2xl font-bold">$0</h3>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Orders and Recommendations */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <div className="animate-fadeIn animation-delay-400">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center space-x-4 p-4 rounded-lg border"
                  >
                    <div className="relative h-16 w-12">
                      <Image
                        src="/placeholder.svg"
                        alt={`Order ${order.id}`}
                        fill
                        className="rounded object-cover"
                        sizes="(max-width: 48px)"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Order #{order.id}</h4>
                        <span
                          className={`text-sm ${
                            order.status === "Delivered"
                              ? "text-green-500"
                              : order.status === "In Transit"
                              ? "text-orange-500"
                              : "text-blue-500"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {order.items} items
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="animate-fadeIn animation-delay-500">
          <Card>
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {books.map((book, index) => (
                  <div key={book._id || index} className="space-y-2">
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={
                          book._id
                            ? `https://pub-7cf6be04756e4997be8420c6b6cdcacc.r2.dev/${book._id}.png`
                            : "/placeholder.svg"
                        }
                        alt={book.title}
                        fill
                        className="rounded object-cover"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    </div>
                    <h4
                      className="font-semibold text-sm line-clamp-1"
                      title={book.title}
                    >
                      {book.title}
                    </h4>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-bold">{book.price}</span>
                      <span
                        className={`text-xs ${
                          book.qty > 10
                            ? "text-green-500"
                            : book.qty > 0
                            ? "text-orange-500"
                            : "text-red-500"
                        }`}
                      >
                        {book.qty > 10
                          ? "In-Stock"
                          : book.qty > 0
                          ? `${book.qty} remaining`
                          : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Order Updates */}
      <div className="animate-fadeIn animation-delay-600">
        <Card>
          <CardHeader>
            <CardTitle>Order Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orderUpdates.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <activity.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
