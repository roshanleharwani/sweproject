/* eslint-disable @typescript-eslint/no-unused-vars */
import connect from "@/lib/connect";
import Book from "@/app/models/Book";
import { NextResponse } from "next/server";

export async function GET() {
  await connect(); // Ensure database connection is established
  try {
    const books = await Book.find(); // Fetch all books
    return NextResponse.json(books, { status: 200 }); // Return the fetched books
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error creating books" }, { status: 500 });
  }
}
