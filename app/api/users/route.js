/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {generateToken} from "@/lib/auth/generateToken"

import connect from "@/lib/connect";
import User from "@/app/models/User";
import bcrypt from 'bcrypt';
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();
    const { firstName, lastName, email, password } = body;

    // Validate the request body fields
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Connect to the database
    await connect();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Prepare user data
    const data = {
      firstName,
      lastName,
      email,
      password: hash,
    };

    // Create the user in the database
    const result = await User.create(data);

    // Return success response
    const token = generateToken(result);
    const response = NextResponse.json(result, { status: 201 });
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 60, // 1 hour
      secure: process.env.NODE_ENV === 'production',
    });
    return response;
  } catch (error) {
    // Return error response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    // Parse the query parameters
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const password = searchParams.get('password');

    // Validate the query parameters
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Connect to the database
    await connect();

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
      const token = generateToken(user);
    // Return success response
    const response =  NextResponse.json(token,{ message: 'Sign-in successful' }, { status: 200 });
    
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 60, // 1 hour
      secure: (process.env.NODE_ENV === 'production') || false,
    });
    
    return response;
  } catch (error) {
    // Return error response
    return NextResponse.json({ error: error.message }, { status: 500 },{user:{email:email}});
  }
}