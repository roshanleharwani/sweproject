import { NextRequest, NextResponse } from 'next/server'
import connect from "@/lib/connect"
import User from "@/app/models/User"
import jwt from 'jsonwebtoken'
import Wishlist from '@/app/models/UserWishlist'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const token = request.cookies.get("auth-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    
    await connect();
    
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { id } = await params;
    console.log(id, user._id);
    
    const item = await Wishlist.findOne({ user: user._id, bookId: id });
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(item, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error fetching wishlist item" },
      { status: 500 }
    );
  }
}