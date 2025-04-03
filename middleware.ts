import { ACCESS_TOKEN } from "@/utils/enums/misc";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    console.log('middleware >>>>>>>> ');
  const token = request.cookies.get(ACCESS_TOKEN)?.value;


  const url = new URL(request.url);
  const origin = url.origin;
  const pathname = url.pathname;

  if (token) {

    if (pathname === '/auth/login') {

      const referer = request.headers.get('referer');
  
      if (referer && !referer.includes('/auth/login')) {
        return NextResponse.redirect(referer);
      }
      
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  else {
    return NextResponse.redirect(new URL("/auth/login", request.url));

  }


  const requestHeaders = new Headers(request.headers);
  if (!pathname.includes(".")) {
    requestHeaders.set('x-origin', origin);
    requestHeaders.set('x-pathname', pathname);
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/:path*'], 
};







