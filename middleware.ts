import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });

    if (!token) {
        return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
    }
}

// See "Matching Paths" below to learn more
// https://next-auth.js.org/configuration/nextjs#middleware
// 인증이 필요한 경로들
export const config = {
    matcher: ['/tube/:path*/submit', '/tube/create'],
};
