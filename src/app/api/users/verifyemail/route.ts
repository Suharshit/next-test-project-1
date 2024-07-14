import { dbConnect } from "@/dbConfig/dbConnect"
import User from "@/modals/userModal"
import { NextRequest, NextResponse } from "next/server"

dbConnect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const { token } = reqBody

        console.log(token);
        const user = await User.findOne({ verifyToken: token, verifyExpires : {$gt: Date.now()} })
        if(!user){
            return NextResponse.json({ message: "Invalid token" }, { status: 401 })
        }
        console.log(user);
        user.isVerified = true
        user.verifyToken = undefined
        user.verifyExpires = undefined
        await user.save()
        return NextResponse.json({ message: "User verified successfully", success: true }, { status: 200 })
    } catch (error: any) {
        NextResponse.json({error: error.message}, {status: 500})
    }
}