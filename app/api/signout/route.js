/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";


export  function POST(request){
  const response = new NextResponse({
    status: 200,
    body: { message: "You have been signed out" }
  })

  response.cookies.set("auth-token","",{ expires: new Date(0) });
  return response;
}