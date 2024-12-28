/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import UserOrders from '@/app/models/userOrders';
import jwt from 'jsonwebtoken';
import User from '@/app/models/User';
import connect from '@/lib/connect';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET as string;
    let decoded;
    try {
      decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { email } = decoded;
    await connect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { items, address, orderId, date, total, status } = await request.json();

    if (!items || !address || !orderId || !date || !total || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const order = new UserOrders({
      user: user._id,
      items:items,
      address,
      orderId: orderId,
      date,
      total,
      status
    });

    await order.save();
    return NextResponse.json(order);
  } catch (error) {
    console.error("Error processing order:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function GET(request:NextRequest){
  try {
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    const secret = process.env.JWT_SECRET as string;
    let decoded;
    try {
      decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    } catch (err) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    const { email } = decoded;
    await connect();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const orders = await UserOrders.find({ user: user._id });
    return NextResponse.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
    
}