/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import {
  Search,
  BookOpen,
  BookText,
  Coffee,
  GraduationCap,
  Heart,
  ShoppingCart,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BookstoreLanding() {
  return (
    <div className="flex min-h-screen flex-col scroll-smooth">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">BookHaven</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="#category"
              className="text-sm font-medium hover:text-primary"
            >
              Categories
            </Link>
            <Link
              href="#best"
              className="text-sm font-medium hover:text-primary"
            >
              Best Sellers
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium hover:text-primary"
            >
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <a href="/sign-in">
              <Button>Sign In</Button>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="container px-4 py-16 md:py-24 lg:py-32">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <motion.div
                className="flex flex-col justify-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Discover Your Next Favorite Book
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Explore thousands of books from fiction to self-help. Find
                    your perfect read today.
                  </p>
                </div>
                <div className="flex max-w-md items-center space-x-2">
                  <Input
                    type="search"
                    placeholder="Search books, authors, or genres..."
                    className="flex-1"
                  />
                  <Button type="submit">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
              <motion.div
                className="relative hidden lg:block"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Image
                  src="/cover.jpg"
                  alt="Books Collection"
                  width={500}
                  height={300}
                  className="rounded-lg object-cover"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Books */}
        <section className="bg-muted py-16" id="best">
          <div className="container px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Featured Books
              </h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Handpicked selections just for you
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((book) => (
                <motion.div
                  key={book}
                  className="group relative overflow-hidden rounded-lg bg-background p-4 shadow-lg transition-shadow hover:shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: book * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="aspect-[3/4] relative">
                    <Image
                      src="/placeholder.svg"
                      alt={`Featured Book ${book}`}
                      fill
                      className="rounded object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold">Book Title {book}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Author Name
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-bold">$19.99</span>
                      <Button size="sm">Add to Cart</Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16" id="category">
          <div className="container px-4">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {[
                { icon: BookText, label: "Fiction" },
                { icon: Heart, label: "Romance" },
                { icon: Coffee, label: "Self Help" },
                { icon: GraduationCap, label: "Academic" },
                { icon: BookOpen, label: "Children" },
                { icon: BookText, label: "Mystery" },
              ].map((category, index) => (
                <motion.div
                  key={category.label}
                  className="group flex flex-col items-center space-y-4 rounded-lg bg-muted p-6 text-center transition-colors hover:bg-primary hover:text-primary-foreground"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <category.icon className="h-8 w-8" />
                  <h3 className="font-semibold">{category.label}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-muted py-16" id="about">
          <div className="container px-4">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              What Our Readers Say
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[1, 2, 3].map((testimonial) => (
                <motion.div
                  key={testimonial}
                  className="rounded-lg bg-background p-6 shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: testimonial * 0.1 }}
                  viewport={{ once: true }}
                >
                  <p className="mb-4 text-gray-500 dark:text-gray-400">
                    BookHaven has transformed how I discover and read books.
                    Their collection is vast and the service is excellent!
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-muted" />
                    <div>
                      <p className="font-semibold">Reader Name</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Book Enthusiast
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16">
          <div className="container px-4">
            <motion.div
              className="rounded-lg bg-primary p-8 text-primary-foreground md:p-12 lg:p-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl">
                  Stay Updated with New Releases
                </h2>
                <p className="mb-6 text-primary-foreground/90">
                  Subscribe to our newsletter and never miss out on new books
                  and exclusive offers.
                </p>
                <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 bg-background text-foreground"
                  />
                  <Button variant="secondary">
                    Subscribe
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container px-4 py-12">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold">About</h3>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <Link href="#" className="hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Support</h3>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Safety Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Community Guidelines
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <Link href="#" className="hover:text-primary">
                    Cookies Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <Link href="#" className="hover:text-primary">
                    info@bookhaven.com
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    +1 (555) 123-4567
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    Find a Store
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} BookHaven. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
