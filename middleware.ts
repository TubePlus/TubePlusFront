import { getToken } from 'next-auth/jwt';
import withAuth, { NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    console.log(req.nextUrl.pathname);
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role == ('MEMBER' || 'ADMIN'),
    },
    pages: {
      signIn: '/login',
    },
  },
);

// See "Matching Paths" below to learn more
// https://next-auth.js.org/configuration/nextjs#middleware
// 인증이 필요한 경로들
export const config = {
  matcher: [],
};
