import {NextResponse} from "next/server";

export async function POST() {
    return NextResponse.json({
        message: "POST request for api/test"
    })
}

export async function GET() {
    return NextResponse.json({
        message: "GET request for api/test"
    })
}