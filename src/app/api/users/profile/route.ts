import { dbConnect } from "@/dbConfig/dbConnect";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/modals/userModal";

dbConnect()

export async function POST(request: NextRequest){
    // extract data from token
    const userId = await getDataFromToken(request)
    const user = await User.findOne({ id: userId}).select("-password")
    if(!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 })
    }
    return NextResponse.json({ message: "User found", data: user}, { status: 200 })
}