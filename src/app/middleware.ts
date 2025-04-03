import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_TOKEN } from "../utils/enums/misc";

export function middleware(request: NextRequest) {
    console.log("called   >>>>>>>>>>>>>")
  const token = request.cookies.get(ACCESS_TOKEN)?.value;


  if (!token) {

    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
    matcher: ["/"],
  };
