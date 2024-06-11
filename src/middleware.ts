import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

export function middleware(request: NextRequest) {
    const cookieStore = cookies()
    const token = cookieStore.get('tokenCookie')


    if(!token) {
        return NextResponse.redirect(new URL("/",request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/user/:path*"]
}