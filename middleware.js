import { NextResponse } from 'next/server';

export function middleware(req) {
   const tokenData =  req.cookies.get('token');
   
   if(!tokenData) {
     return NextResponse.redirect(new URL('/auth/Login', req.url))
   }
}

export const config = {
  matcher: ['/profile/:path*','/cart'],
}