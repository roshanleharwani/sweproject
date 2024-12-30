import bcrypt from 'bcrypt';
import connect from '@/lib/connect';
import User from '@/app/models/User';
import { NextResponse } from 'next/server';

export async function PATCH(req){
    const {id,password} = await req.json();
    if(!id || !password ){
        return NextResponse.json({message:"All fields are required" ,status:401})
    }
    try{
        connect()
        const user = await User.findOne({resetToken: id});
        
        if (user) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            user.password = hash;
            user.resetToken = "";
            await user.save();
            return NextResponse.json({message: "Password reset successful", status: 200});
        } else {
            return NextResponse.json({message: "Invalid reset token", status: 400});
        }

    }catch(e){
        return NextResponse.json({message:e|| "Internal Server Error",status:500})
    }
}