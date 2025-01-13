import { PrismaClient } from "@prisma/client";
import {NextResponse,NextRequest} from "next/server";
import { mysqlPool } from "@/lib/db";

// export async function POST(req) {
//     const reqBody = await req.json();
//     return NextResponse.json({
//         message:"POST request for Create an account",
//         credential: reqBody
//     })
// }

// export async function POST(req) {
//     try{
//         const reqbody = await req.json();
//         if (!reqbody.password || !reqbody.email) throw new Error("xxxxx");

//         const prisma = new PrismaClient();
//         const result = await prisma.users.create({
//             data: reqbody
//         })

//         return NextResponse.json({
//             status: "success",
//             data: result
//         })
//     } catch(error){
//         return NextResponse.json({
//             status: "error",
//             data: error.message
//         })
//     }
// }

export async function POST(req) {
    console.log(req);
    try{
        const reqbody = await req.json();
        if (!reqbody.username || !reqbody.password) throw new Error("Invalid login parameter");
        console.log("reqbody",reqbody);
        //const keys = Object.keys(reqbody);
        //const values = Object.values(reqbody);
        const promisePool = mysqlPool.promise()
        const [rows, fields] = await promisePool.query(
          `INSERT INTO users SET ?`,
          [reqbody]
        )
        return NextResponse.json(rows)

    } catch(error){
        return NextResponse.json({
            status: "error",
            message: error.message,
            affectedRows: 0
        })
    }

}