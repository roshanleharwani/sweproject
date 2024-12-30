import { NextResponse } from "next/server";
import connect from "@/lib/connect";
import Book from "@/app/models/Book";


export async function GET(){
    connect();
    try{
        const books = await Book.aggregate([{$sample:{size:4}}]);
        if(!books){
            return new Response(JSON.stringify({error: "No books found"}), {status: 404,})
        }
        return NextResponse.json(books, {status: 200})
    }catch(e){
        return NextResponse.json({message: e.message || "Internal Server Error"},{status: 500});
    }
}