import { PrismaClient } from "@prisma/client";
import {NextResponse,NextRequest} from "next/server";

// export async function POST(req) {
//     const reqBody = await req.json();
//     return NextResponse.json({
//         message:"POST request for Create an account",
//         credential: reqBody
//     })
// }

export async function POST(req) {
    try{
        const reqbody = await req.json();
        if (!reqbody.name || !reqbody.email) throw new Error("xxxxx");

        const prisma = new PrismaClient();
        const result = await prisma.users.create({
            data: reqbody
        })

        return NextResponse.json({
            status: "success",
            data: result
        })
    } catch(error){
        return NextResponse.json({
            status: "error",
            data: error.message
        })
    }
}