import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

export async function GET() {
    const prisma = new PrismaClient();
    const result = await prisma.users.findMany();
    console.log(result);
    return NextResponse.json({
        status: "success",
        data: result
    })
    
}