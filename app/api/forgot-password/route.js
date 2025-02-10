import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import connect from "@/lib/connect";
import User from '@/app/models/User';


export async function POST(req) {
        
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" },{status: 400});
  }
  const hash = Math.random().toString(36).substring(2, 15);
  try{

        connect();

        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        user.resetToken = hash;
        user.save();
        

  }catch(e){
    console.log(e);
  }


  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const baseUrl = process.env.NODE_ENV === 'production' ? process.env.PROD_BASE_URL : process.env.BASE_URL;
    if (!baseUrl) {
      throw new Error("BASE_URL environment variable is not defined");
    }
    const resetLink = `${baseUrl}/reset-password/${hash}`;

    const mailOptions = {
      from: `"BookHaven" <${process.env.EMAIL}>`,
      to: email,
      subject: "Password Reset Link",
      text: `Mail from BookHaven: Here is your password reset link: ${resetLink}`,
      html: `<p>Mail from <strong>BookHaven</strong>:</p><p>Here is your password reset link:</p><a href="${resetLink}">${resetLink}</a>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Password reset email sent successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send email." });
  }
}
