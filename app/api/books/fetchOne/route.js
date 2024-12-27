/* eslint-disable @typescript-eslint/no-unused-vars */
import connect from "@/lib/connect";
import Book from "@/app/models/Book";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connect(); // Ensure database connection is established
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const book = await Book.findById(id);

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    return NextResponse.json(book, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error fetching book" }, { status: 500 });
  }
}
