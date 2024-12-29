'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Package, Truck, ShoppingBag, ArrowRight } from 'lucide-react'
import Link from "next/link"
import { motion } from "framer-motion"

export default function OrderSuccessPage() {
  // Animation variants for the success icon
  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  }

  // Animation variants for the steps
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  const today = new Date();

  // Calculate the date 4 days from today
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + 6);

  // Format the dates
  const options = { month: 'long', day: 'numeric' }; // Format: "December 29"
  const formatter = new Intl.DateTimeFormat('en-US', options);

  const todayFormatted = formatter.format(today.getDate()+4);
  const futureDateFormatted = formatter.format(futureDate);

  // Combine the formatted dates
  const dateRange = `${todayFormatted} - ${futureDateFormatted}`;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Success Icon Animation */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={iconVariants}
              className="text-primary"
            >
              <CheckCircle2 className="w-24 h-24" />
            </motion.div>

            {/* Success Message */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold sm:text-3xl">Order Successfully Placed!</h1>
              <p className="text-muted-foreground">
                Thank you for your order. We'll send you a confirmation email shortly.
              </p>
            </div>

            {/* Order Details */}
            <div className="w-full space-y-2">
              <div className="flex justify-center gap-2">
           
              </div>
            </div>

            {/* Steps Animation */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="w-full py-8 space-y-4"
            >
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Order Confirmed</p>
                  <p className="text-sm text-muted-foreground">We've received your order</p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Package className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Order Processing</p>
                  <p className="text-sm text-muted-foreground">We're preparing your books</p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Truck className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Shipping Soon</p>
                  <p className="text-sm text-muted-foreground">Your books will be on their way</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 w-full"
            >
              <Button asChild className="flex-1">
                <Link href="/user/orders">
                  View Order
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/user/search">
                  Continue Shopping
                </Link>
              </Button>
            </motion.div>

            {/* Estimated Delivery */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-sm text-muted-foreground"
            >
               Estimated delivery: {dateRange}
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

