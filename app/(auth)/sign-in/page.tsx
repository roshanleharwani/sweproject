/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen } from 'lucide-react'
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"


export default function SignIn() {
    const router = useRouter();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = async (e: { preventDefault: () => void }) => {
      e.preventDefault();

      if(!email || !password){
        alert("Please fill all fields");
        return;
      }
      try{

        const res = await fetch(`/api/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        if(res.ok){
            router.push('/user/home')

          }else{
            const errorData = await res.json();
            alert(errorData.message || "Incorrect email or password");
          }
        
      }catch(err){
        console.log("Error signing in user",err);
      }
    };
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6" />
            <span className="text-xl font-bold">BookHaven</span>
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="border-[1.5px] bg-white/10 p-4 shadow-lg rounded-lg max-w-2xl">
          <div className="space-y-1 text-center">
            <h2 className="text-2xl font-bold">Sign in</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary hover:underline underline-offset-4"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-4 mt-4">
            <Button type="submit" className="w-full">Sign in</Button>
            <div className="text-center text-sm">
              {"Don't have an account"} ?{" "}
              <Link href="/sign-up" className="text-primary hover:underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

