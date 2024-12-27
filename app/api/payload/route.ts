/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function GET(request: NextRequest) {
  try {
    // Access the cookie
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized: Token missing" }, { status: 401 });
    }

    // Verify the token
    const response = jwt.verify(token, process.env.JWT_SECRET as string);

    // Return the decoded payload
    return NextResponse.json(response, { status: 200 });
  } catch (error : any) {
    return NextResponse.json(
      { error: "Invalid or expired token", details: error.message },
      { status: 400 }
    );
  }
}
