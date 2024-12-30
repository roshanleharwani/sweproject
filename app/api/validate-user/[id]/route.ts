import { NextResponse } from "next/server";
import User from "@/app/models/User";
import connect from '@/lib/connect';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const { id } = await  params;
    await connect();
    try {
        const user = await User.findOne({ resetToken: id });
        if (!user) {
            return NextResponse.json({ message: 'Invalid or expired reset token' }, { status: 400 });
        }
        return NextResponse.json({ userId: user._id }, { status: 200 });
    } catch (err: unknown) {
        return NextResponse.json({ message: err instanceof Error ? err.message : "Invalid or expired reset token" }, { status: 400 });
    }
}
