import { NextResponse } from 'next/server'
import connect from "@/lib/connect"
import User from "@/app/models/User"
import jwt from 'jsonwebtoken'
import Wishlist from '@/app/models/UserWishlist'
export async function GET(request, { params }) {
    const token = request.cookies.get("auth-token")?.value;
      if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    const secret = process.env.JWT_SECRET;
      const decoded = jwt.verify(token, secret);
      await connect()
      const user = await User.findOne({ email: decoded.email });
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      const { id } = params;
      console.log(id,user._id)
      const item = await Wishlist.findOne({ user: user._id, bookId:id });
      
      if (!item) {
        return NextResponse.json({ error: "Item not found" }, { status: 404 });
      }
    return NextResponse.json(item, {status: 200});
}