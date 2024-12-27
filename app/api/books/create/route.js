/* eslint-disable @typescript-eslint/no-unused-vars */
import connect from "@/lib/connect";
import Book from "@/app/models/Book";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connect(); // Ensure database connection is established
  try {
    const books = await req.json(); // Parse the incoming JSON data
    let createdBooks;

    if (Array.isArray(books)) {
      // Handle multiple books
      createdBooks = await Book.insertMany(books);
    } else {
      // Handle single book
      createdBooks = await Book.create(books);
    }

    return NextResponse.json(createdBooks, { status: 201 }); // Return the created books
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error creating books" }, { status: 500 });
  }
}
