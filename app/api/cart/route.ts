import connect from "@/lib/connect";
import CartItem from "@/app/models/cartItems";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Helper function to verify user authentication
async function verifyAuth(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  if (!token) {
    return null;
  }

  const secret = process.env.JWT_SECRET as string;
  const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
  return await User.findOne({ email: decoded.email });
}

export async function POST(request: NextRequest) {
  await connect(); // Ensure database connection is established
  try {
    const { title, author, price, qty } = await request.json();

    // Extract and verify the token from cookies
    const token = request.cookies.get("auth-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET as string; // Ensure this environment variable is set
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;

    // Find the user by email
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the cart already contains the book
    const existingCartItem = await CartItem.findOne({ title, user: user._id });
    if (existingCartItem) {
      // Update the quantity of the existing cart item
      existingCartItem.qty += qty;
      await existingCartItem.save();
      return NextResponse.json(existingCartItem, { status: 200 });
    }

    // Create a new cart item
    const cartItem = new CartItem({
      title,
      author,
      price,
      qty,
      user: user._id,
    });

    // Save the cart item
    await cartItem.save();

    return NextResponse.json(cartItem, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error adding item to cart" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  await connect();
  try {
    const token = request.cookies.get("auth-token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    const user = await User.findOne({ email: decoded.email });
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const cartItems = await CartItem.find({ user: user._id });
    return NextResponse.json(cartItems);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error fetching cart items" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  await connect();
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await CartItem.deleteMany({ user: user._id });

    return NextResponse.json({ message: "All items deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error deleting cart items" },
      { status: 500 }
    );
  }
}
