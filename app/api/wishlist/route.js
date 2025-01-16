import {  NextResponse } from "next/server";
import UserWishlist from "@/app/models/UserWishlist";
import connect from "@/lib/connect";
import jwt from "jsonwebtoken";
import User from "@/app/models/User";




export async function POST(request) {
    const { title, author, category, price, stock ,bookId} = await request.json();
    if (!title || !author || !category || !price || !stock || !bookId) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    await connect();
    try {
        const token = request.cookies.get("auth-token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const secret = process.env.JWT_SECRET  // Ensure this environment variable is set
        const decoded = jwt.verify(token, secret) ;

        // Find the user by email
        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const currentDate = new Date();
        const dateAdded = currentDate.toISOString().split('T')[0];
        const wishlist = new UserWishlist({ title, author, category, price, stock, dateAdded, user: user._id,bookId });
        await wishlist.save();

        return NextResponse.json({ message: "Wishlist item added successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error || "Something went wrong" }, { status: 500 });
    }
}


export async function GET(request){
    const token = request.cookies.get("auth-token")?.value;
    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        await connect()
        try{

            const secret = process.env.JWT_SECRET ; // Ensure this environment variable is set
            const decoded = jwt.verify(token, secret) ;
            const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const wishlist = await UserWishlist.find({ user: user._id });
        return NextResponse.json(wishlist, { status: 200 });
            
        }
        catch (error) {
            return NextResponse.json({ error: error || "Something went wrong" }, { status:500});
        }
}
export async function DELETE(request) {
    await connect();
    try {
      const token = request.cookies.get("auth-token")?.value;
      if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const secret = process.env.JWT_SECRET;
      const decoded = jwt.verify(token, secret);
      const user = await User.findOne({ email: decoded.email });
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      
      const response = await request.json();
      const itemId = response.itemId;
      if (!itemId) {
        return NextResponse.json({ error: "Missing itemId" }, { status: 400 });
      }
      console.log(itemId);
  
      await UserWishlist.deleteOne({_id: itemId});
  
      return NextResponse.json({ message: "Item deleted successfully" });
    } catch (err) {
      console.error(err);
      return NextResponse.json(
        { error: "Error deleting wishlist item" },
        { status: 500 }
      );
    }
  }