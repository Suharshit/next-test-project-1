import { dbConnect } from "@/dbConfig/dbConnect";
import { NextRequest, NextResponse } from "next/server";


dbConnect()

export async function GET(requset: NextRequest){
    try {
        const response = NextResponse.json({
            message: "Logout Successfully",
            status: 200
        })
        response.cookies.set("token", "", {httpOnly: true, expires: new Date(0)})
        return response
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}