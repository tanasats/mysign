import { PrismaClient } from "@prisma/client";
import {NextResponse} from "next/server";
// export async function POST() {
//     return NextResponse.json({
//         message: "Post request for login"
//     })
// }

export async function POST(req) {
    try{
        const reqbody = await req.json();
        const prisma = new PrismaClient();
        const result = await prisma.users.findUnique({
            where: reqbody,
        })
        console.log(result)
        if(!result){
            return NextResponse.json({
                status: "fail",
                data: reqbody,
                message: "No user found!"
            });
        }else{
            console.log(result["email"])
            const expiredDuration = new Date(Date.now()+12*60*60*1000);
            console.log(expiredDuration);
            //const cookieString = `token=${result["email"]}; expires=${expiredDuration}; path=/`;
            const cookieString = `token=${result["email"]};expires=${expiredDuration.toDateString()}`;
            return NextResponse.json({
                status: "success",
                message: "Login Success",
            },
            {
                headers: {"set-cookie": cookieString},
            }
        )
        }



    }catch(error){
        return NextResponse.json({
            status: "error",
            data: error.message
        })
    }
}