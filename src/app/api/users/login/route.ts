import { dbConnect } from "@/dbConfig/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import User from "@/modals/userModal";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

dbConnect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody
        console.log(reqBody);
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 })
        }
        const isPasswordCorrect = await bcryptjs.compare(password, user.password)
        if (!isPasswordCorrect) {
            return NextResponse.json({ message: "Password is incorrect" }, { status: 400 })
        }
        const tokenData = {
            id: user._id,
            email: user.email,
            usename: user.username
        }
        const token = jwt.sign({
                id: user._id,
                email: user.email,
                usename: user.username
            }, 
            process.env.TOKEN_SECRET!,
            { expiresIn: "1d" }
        )
        const response = NextResponse.json(
            { message: "Login successful", success: true },
        )
        response.cookies.set("token", token, {httpOnly: true})
        return response
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}