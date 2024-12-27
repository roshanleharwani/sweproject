/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/app/models/User";
import CartItem from "@/app/models/cartItems";
export async function GET(request: NextRequest) {
    try {
        // Access the cookie
        const token = request.cookies.get("auth-token")?.value;
    
        
        if (!token) {
              return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }
        
            const secret = process.env.JWT_SECRET as string; // Ensure this environment variable is set
            const decoded = jwt.verify(token, secret) as jwt.JwtPayload;


            const user = await User.findOne({ email: decoded.email });
            if (!user) {
                  return NextResponse.json({ error: "User not found" }, { status: 404 });
            }
            const cartItems = await CartItem.find({ user: user._id });
            return NextResponse.json(cartItems, { status: 200 });
    } catch (error : any) {
        return NextResponse.json(
        { error: "Invalid or expired token", details: error.message },
        { status: 400 }
        );
    }
}