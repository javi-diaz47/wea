import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/protected/:path*", "/profile/:path*", "/create-offer/:path*"],
};
