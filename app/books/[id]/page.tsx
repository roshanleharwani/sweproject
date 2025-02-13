"use client";
import Header from "@/components/ui/header";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { Heart, ShoppingCart, Star, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
// This would come from your API/database
const bookData = {
  category: "Self-Help",
  qty: 10,
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
};

export default function BookDetail() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState("1");

  const router = useRouter();
  const [book, setBook] = useState(bookData);
  const [wishedBook, setWishedBook] = useState(false);
  const id = window.location.pathname.split("/").pop();
  useEffect(() => {
    async function fetchBook() {
      const id = window.location.pathname.split("/").pop();
      const response = await fetch(`/api/books/fetchOne?id=${id}`);
      const data = await response.json();
      setBook(data);
    }
    fetchBook();
  }, []);

  useEffect(() => {
    async function fetcher() {
      const response = await fetch(`/api/wishlist/${id}`);
      if (response.ok) {
        setWishedBook(true);
      }
    }
    fetcher();
  });

  const handleCart = async () => {
    try {
      const response = await fetch("/api/cart/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId: id,
          title: book.title,
          author: book.author,
          price: book.price,
          qty: parseInt(quantity),
        }),
      });
      if (response.ok) {
        router.push("/user/cart");
        setTimeout(() => {
          toast.success("Item added to cart successfully");
        }, 1000); // Delay of 1 second
      } else {
      }
    } catch (err) {
      console.error("An error occurred while adding item to cart", err);
      toast.error("Error occurred while adding item to cart");
    }
  };
  const handleWishlist = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Check if the item exists in the wishlist
      const check = await fetch(`/api/wishlist/${id}`);
      if (check.ok) {
        const { _id } = await check.json();
        const itemId = _id;

        // Attempt to delete the item
        const res = await fetch("/api/wishlist/", {
          body: JSON.stringify({ itemId }),
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          toast.success("Item removed from wishlist");
          setWishedBook(false);
          return;
          // Update state after successful deletion
        } else {
          const errorData = await res.json();
          console.error("Error deleting item:", errorData.message);
          toast.error(errorData.message || "Error removing item from wishlist");
          return;
        }
      } else {
        console.log("Item not found in wishlist.");
      }

      // If not found, add the item to the wishlist
      const response = await fetch("/api/wishlist/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId: id,
          title: book.title,
          author: book.author,
          price: book.price,
          stock: book.qty > 10 ? "In-Stock" : "Low-Stock",
          category: book.category,
        }),
      });

      if (response.ok) {
        toast.success("Book added to Wishlist");
        setWishedBook(true);
      } else {
        const errorData = await response.json();
        console.error("Error adding item to wishlist:", errorData.message);
        toast.success("Error adding item to wishlist");
      }
    } catch (err) {
      console.error(
        "An unexpected error occurred while processing wishlist:",
        err
      );
      toast.error("An error occurred while processing wishlist.");
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
                    src={
                      book.images
                        ? book.images[selectedImage]
                        : `https://pub-7cf6be04756e4997be8420c6b6cdcacc.r2.dev/${id}.png`
                    }
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
                      index === selectedImage
                        ? "bg-primary"
                        : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
            <div className="flex space-x-4 overflow-auto pb-2">
              {book.images
                ? book.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-[3/4] w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                        index === selectedImage
                          ? "border-primary"
                          : "border-transparent"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${book.title} - View ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))
                : null}
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
                <Button onClick={handleWishlist} variant="outline" size="icon">
                  {wishedBook ? (
                    <Heart fill="red" className="h-4 w-4" />
                  ) : (
                    <Heart className="h-4 w-4" />
                  )}
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
                    <div
                      key={key}
                      className="flex justify-between border-b pb-2"
                    >
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
  );
}
