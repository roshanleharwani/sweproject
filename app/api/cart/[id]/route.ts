import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/connect";
import CartItem from "@/app/models/cartItems";
import jwt from "jsonwebtoken";
import User from "@/app/models/User";

// Helper function to verify user authentication
async function verifyAuth(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  if (!token) {
    return null;
  }

  const secret = process.env.JWT_SECRET as string;
  try {
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    return await User.findOne({ email: decoded.email });
  } catch (err) {
    console.error("JWT verification error:", err);
    return null;
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connect();
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { qty } = await request.json();
    if (qty < 1) {
      return NextResponse.json(
        { error: "Quantity must be at least 1" },
        { status: 400 }
      );
    }

    const cartItem = await CartItem.findOne({
      _id: params.id,
      user: user._id,
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    cartItem.qty = qty;
    await cartItem.save();

    return NextResponse.json(cartItem);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error updating cart item" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connect();
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cartItem = await CartItem.findOneAndDelete({
      _id: params.id,
      user: user._id,
    });

    if (!cartItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Error deleting cart item" },
      { status: 500 }
    );
  }
}
