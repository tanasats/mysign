import { NextResponse, NextRequest } from 'next/server'
import jwt from "jsonwebtoken"
import { getToken } from './app/actions/tokenController';
import { getSession } from './lib/session';



// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    console.log("middleware()")
    let cookieToken = request.cookies.get('accessToken');
    //console.log("accessToken:", cookieToken);
    if (cookieToken === undefined) return NextResponse.redirect(new URL("/signin", request.url));
    //return NextResponse.redirect(new URL('/login', request.url))
    //  return NextResponse.next()


    const userSession = await getSession();
    //console.log("get session", userSession);
    if(userSession===null) return NextResponse.redirect(new URL("/signin", request.url));
    

    // Check the role and redirect based on the role
    console.log("userrole:", userSession.usertype);
    switch (userSession.usertype) {
        // case "staff":
        //     if (!request.nextUrl.pathname.startsWith("/staff")) {
        //         console.log("redirect to staff");
        //         return NextResponse.redirect(new URL("/staff", request.url));
        //     }
        //     break;
        // case "student":
        //     console.log("redirect to student");
        //     if (!request.nextUrl.pathname.startsWith("/student")) {
        //         return NextResponse.redirect(new URL("/student", request.url));
        //     }
        //     break;
             

        case "RECEPTIONIST":
            if (!request.nextUrl.pathname.startsWith("/profile")) {
                return NextResponse.redirect(new URL("/profile", request.url));
            }
            break;
        case "DOCTOR":
            if (
                !request.nextUrl.pathname.startsWith("/patients") &&
                !request.nextUrl.pathname.startsWith("/patientprofile") &&
                !request.nextUrl.pathname.startsWith("/complain") &&
                !request.nextUrl.pathname.startsWith("/report")
            ) {
                return NextResponse.redirect(new URL("/patients", request.url));
            }
            break;
        case "NURSE":
            // Add the paths that the nurse can access here
            if (!request.nextUrl.pathname.startsWith("/vitals")) {
                return NextResponse.redirect(new URL("/vitals", request.url));
            }
            break;
        case "PATHOLOGIST":
            // Add the paths that the pathologist can access here
            if (!request.nextUrl.pathname.startsWith("/image")) {
                return NextResponse.redirect(new URL("/image", request.url));
            }
            break;
        //default:
        //  return NextResponse.redirect(new URL("/login", request.url));
    }
    //console.log("----out from middleware---->")
}

export const config = {
    matcher: [
        // Match all routes except the ones that start with /login and api and the static folder
        "/((?!api|_next/static|_next/image|favicon.ico|signin).*)",
    ],
};