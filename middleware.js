import { NextResponse } from 'next/server';
import  { NextRequest } from 'next/server';

export function middleware(req) {
   const tokenData =  req.cookies.get('token');
   
   if(!tokenData) {
     return NextRequest.redirect(new URL('/auth/login', req.url))
   }
}

export const config = {
  matcher: ['/profile/:path*'],
}